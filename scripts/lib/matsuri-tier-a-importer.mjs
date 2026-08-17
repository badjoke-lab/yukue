import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadMatsuriDataset } from "../../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const repositoryRoot = fileURLToPath(new URL("../../", import.meta.url));
const sourceInventoryPath = path.join(repositoryRoot, "config", "matsuri-national-source-inventory.json");

const allowedEntityTypes = new Set(["festival", "folk_performance"]);
const recognizedCandidateDimensions = new Set([
  "current_state",
  "occurrence_outcome",
  "organizer",
  "place",
  "relations",
  "coordinates",
  "history",
]);

function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizedText(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .trim()
    .replace(/\s+/gu, "")
    .toLocaleLowerCase("ja");
}

function validHttpUrl(value) {
  if (!nonEmptyString(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(String(value ?? ""))) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function preferredName(entity) {
  return (
    entity.names?.find((name) => name.is_preferred)?.value ??
    entity.names?.find((name) => name.kind === "canonical")?.value ??
    entity.names?.[0]?.value ??
    entity.id
  );
}

function geographyKey({ prefecture_code, municipality_name_ja, broader_scope_ja }) {
  const prefecture = normalizedText(prefecture_code);
  if (nonEmptyString(municipality_name_ja)) {
    return `${prefecture}:municipality:${normalizedText(municipality_name_ja)}`;
  }
  return `${prefecture}:scope:${normalizedText(broader_scope_ja)}`;
}

export function makeIdentityKey({ entity_type, name_ja, geography }) {
  return `${entity_type}:${normalizedText(name_ja)}:${geographyKey(geography)}`;
}

function existingIdentityIndex(dataset) {
  const index = new Map();
  for (const entity of dataset.entities) {
    if (!allowedEntityTypes.has(entity.entity_type)) continue;
    const name = preferredName(entity);
    for (const area of entity.geographic_scope?.areas ?? []) {
      if (!area.prefecture_code) continue;
      const key = makeIdentityKey({
        entity_type: entity.entity_type,
        name_ja: name,
        geography: {
          prefecture_code: area.prefecture_code,
          municipality_name_ja: area.municipality_name_ja,
          broader_scope_ja:
            area.municipality_name_ja ?? entity.geographic_scope?.description_ja ?? area.prefecture_name_ja,
        },
      });
      if (!index.has(key)) index.set(key, []);
      index.get(key).push(entity.id);
    }
  }
  return index;
}

export function loadNationalSourceInventory(inventoryPath = sourceInventoryPath) {
  return JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
}

function sourceGroups(inventory) {
  const groups = inventory.ncs04_contract_inputs ?? {};
  return {
    direct: new Set(groups.tier_a_direct_families ?? []),
    conditional: new Set(groups.tier_a_conditional_families ?? []),
    discovery: new Set(groups.discovery_only_families ?? []),
    supporting: new Set(groups.supporting_only_families ?? []),
  };
}

function sourceFamilyMap(inventory) {
  return new Map((inventory.source_families ?? []).map((family) => [family.id, family]));
}

function sourceFamilyRole(familyId, groups) {
  if (groups.direct.has(familyId)) return "direct";
  if (groups.conditional.has(familyId)) return "conditional";
  if (groups.discovery.has(familyId)) return "discovery";
  if (groups.supporting.has(familyId)) return "supporting";
  return "unknown";
}

function validateSourceObject(source, family, role, prefix) {
  const problems = [];
  if (!source || typeof source !== "object") {
    return [`${prefix}_missing`];
  }
  if (!validHttpUrl(source.url)) problems.push(`${prefix}_url_invalid`);
  if (!validDate(source.accessed_at)) problems.push(`${prefix}_accessed_at_invalid`);
  if (!nonEmptyString(source.publisher_name)) problems.push(`${prefix}_publisher_name_missing`);
  if (source.publisher_role_verified !== true) problems.push(`${prefix}_publisher_role_unverified`);

  if (role === "conditional" && family.id === "shrine_or_temple_official") {
    if (source.subject_relationship_verified !== true) {
      problems.push(`${prefix}_subject_relationship_unverified`);
    }
  }

  if (family.entry_url && validHttpUrl(family.entry_url)) {
    try {
      const expectedOrigin = new URL(family.entry_url).origin;
      const sourceOrigin = new URL(source.url).origin;
      if (family.id === "national_cultural_database" && expectedOrigin !== sourceOrigin) {
        problems.push(`${prefix}_origin_mismatch`);
      }
    } catch {
      problems.push(`${prefix}_origin_validation_failed`);
    }
  }

  return problems;
}

function effectiveSourceForCandidate(candidate, inventory) {
  const families = sourceFamilyMap(inventory);
  const groups = sourceGroups(inventory);
  const source = candidate.source;

  if (!source || typeof source !== "object") {
    return { status: "blocked", problems: ["source_missing"], source: null };
  }

  const family = families.get(source.family_id);
  if (!family) {
    return { status: "blocked", problems: ["source_family_unknown"], source: null };
  }

  const role = sourceFamilyRole(family.id, groups);
  if (role === "unknown") {
    return { status: "blocked", problems: ["source_family_unclassified"], source: null };
  }
  if (role === "supporting") {
    return { status: "blocked", problems: ["source_family_supporting_only"], source: null };
  }

  const discoveryProblems = validateSourceObject(source, family, role, "source");

  if (role === "discovery" || family.requires_underlying_source_resolution === true) {
    const resolved = source.resolved_source;
    if (!resolved || typeof resolved !== "object") {
      return {
        status: "blocked",
        problems: [...discoveryProblems, "underlying_source_unresolved"],
        source: null,
      };
    }

    const resolvedFamily = families.get(resolved.family_id);
    if (!resolvedFamily) {
      return {
        status: "blocked",
        problems: [...discoveryProblems, "resolved_source_family_unknown"],
        source: null,
      };
    }

    const resolvedRole = sourceFamilyRole(resolvedFamily.id, groups);
    if (!new Set(["direct", "conditional"]).has(resolvedRole)) {
      return {
        status: "blocked",
        problems: [...discoveryProblems, "resolved_source_not_tier_a_eligible"],
        source: null,
      };
    }

    const resolvedProblems = validateSourceObject(
      resolved,
      resolvedFamily,
      resolvedRole,
      "resolved_source",
    );
    const problems = [...discoveryProblems, ...resolvedProblems];
    if (problems.length > 0) {
      return { status: "blocked", problems, source: null };
    }

    return {
      status: "ready",
      problems: [],
      source: {
        discovery: {
          family_id: family.id,
          family_role: role,
          url: source.url,
          accessed_at: source.accessed_at,
          publisher_name: source.publisher_name,
          provider_record_id: source.provider_record_id ?? null,
        },
        effective: {
          family_id: resolvedFamily.id,
          family_role: resolvedRole,
          canonical_source_type: resolvedFamily.canonical_source_type_values?.[0] ?? null,
          publisher_role: resolvedFamily.publisher_role,
          publisher_name: resolved.publisher_name,
          url: resolved.url,
          accessed_at: resolved.accessed_at,
          provider_record_id: resolved.provider_record_id ?? null,
          rights: resolvedFamily.rights,
        },
      },
    };
  }

  if (discoveryProblems.length > 0) {
    return { status: "blocked", problems: discoveryProblems, source: null };
  }

  return {
    status: "ready",
    problems: [],
    source: {
      discovery: null,
      effective: {
        family_id: family.id,
        family_role: role,
        canonical_source_type: family.canonical_source_type_values?.[0] ?? null,
        publisher_role: family.publisher_role,
        publisher_name: source.publisher_name,
        url: source.url,
        accessed_at: source.accessed_at,
        provider_record_id: source.provider_record_id ?? null,
        rights: family.rights,
      },
    },
  };
}

function validateGeography(candidate, inventory) {
  const geography = candidate.geography;
  if (!geography || typeof geography !== "object") {
    return { problems: ["geography_missing"], normalized: null };
  }

  const prefecture = (inventory.prefectures ?? []).find(
    (item) => item.code === geography.prefecture_code,
  );
  if (!prefecture) {
    return { problems: ["prefecture_code_invalid"], normalized: null };
  }

  if (
    nonEmptyString(geography.prefecture_name_ja) &&
    geography.prefecture_name_ja.trim() !== prefecture.name_ja
  ) {
    return { problems: ["prefecture_name_mismatch"], normalized: null };
  }

  const municipality = nonEmptyString(geography.municipality_name_ja)
    ? geography.municipality_name_ja.trim()
    : null;
  const broaderScope = nonEmptyString(geography.broader_scope_ja)
    ? geography.broader_scope_ja.trim()
    : null;

  if (!municipality && !broaderScope) {
    return { problems: ["municipality_or_broader_scope_required"], normalized: null };
  }

  return {
    problems: [],
    normalized: {
      prefecture_code: prefecture.code,
      prefecture_name_ja: prefecture.name_ja,
      municipality_code: nonEmptyString(geography.municipality_code)
        ? geography.municipality_code.trim()
        : null,
      municipality_name_ja: municipality,
      broader_scope_ja: broaderScope,
    },
  };
}

function ignoredCandidateDimensions(candidate) {
  const claims = candidate.claims;
  if (!claims || typeof claims !== "object") return [];
  return Object.keys(claims)
    .filter((key) => recognizedCandidateDimensions.has(key))
    .sort();
}

function providerKey(source) {
  const effective = source?.effective;
  if (!effective?.provider_record_id) return null;
  return `${effective.family_id}:${normalizedText(effective.provider_record_id)}`;
}

function tierADraft(candidate, geography, source, identityKey) {
  return {
    schema_version: "matsuri.tier-a-draft.v1",
    candidate_id: candidate.candidate_id,
    coverage_tier: "tier_a_index",
    publication_status: "not_published",
    tier_a_published_at: null,
    identity: {
      key: identityKey,
      duplicate_status: "clear",
    },
    entity: {
      entity_type: candidate.entity_type,
      preferred_name: {
        value: candidate.name_ja.trim(),
        lang: "ja",
        kind: "canonical",
      },
      geographic_scope: {
        prefecture_code: geography.prefecture_code,
        prefecture_name_ja: geography.prefecture_name_ja,
        municipality_code: geography.municipality_code,
        municipality_name_ja: geography.municipality_name_ja,
        broader_scope_ja: geography.broader_scope_ja,
      },
    },
    source_provenance: source,
  };
}

export function buildTierAReadinessReport(batch, options = {}) {
  const inventory = options.inventory ?? loadNationalSourceInventory();
  const dataset = options.dataset ?? loadMatsuriDataset();
  const existing = existingIdentityIndex(dataset);
  const candidates = Array.isArray(batch?.candidates) ? batch.candidates : [];

  const seenCandidateIds = new Set();
  const seenIdentityKeys = new Map();
  const seenProviderKeys = new Map();
  const records = [];

  for (const candidate of candidates) {
    const problems = [];
    const warnings = [];

    if (!candidate || typeof candidate !== "object") {
      records.push({
        candidate_id: null,
        readiness: "blocked_input",
        problems: ["candidate_not_object"],
        warnings: [],
        tier_a_draft: null,
      });
      continue;
    }

    if (!nonEmptyString(candidate.candidate_id)) problems.push("candidate_id_missing");
    if (candidate.candidate_id && seenCandidateIds.has(candidate.candidate_id)) {
      problems.push("candidate_id_duplicate");
    }
    if (candidate.candidate_id) seenCandidateIds.add(candidate.candidate_id);

    if (!allowedEntityTypes.has(candidate.entity_type)) problems.push("entity_type_invalid");
    if (!nonEmptyString(candidate.name_ja)) problems.push("name_ja_missing");

    if (candidate.tier_a_published_at != null) {
      problems.push("publication_timestamp_not_allowed_in_ncs04");
    }

    const geographyResult = validateGeography(candidate, inventory);
    problems.push(...geographyResult.problems);

    const sourceResult = effectiveSourceForCandidate(candidate, inventory);
    problems.push(...sourceResult.problems);

    const ignored = ignoredCandidateDimensions(candidate);
    if (ignored.length > 0) {
      warnings.push(`candidate_claims_not_projected:${ignored.join(",")}`);
    }

    let identityKey = null;
    if (
      allowedEntityTypes.has(candidate.entity_type) &&
      nonEmptyString(candidate.name_ja) &&
      geographyResult.normalized
    ) {
      identityKey = makeIdentityKey({
        entity_type: candidate.entity_type,
        name_ja: candidate.name_ja,
        geography: geographyResult.normalized,
      });

      const existingIds = existing.get(identityKey) ?? [];
      if (existingIds.length > 0) {
        problems.push(`duplicate_existing:${existingIds.join(",")}`);
      }

      if (seenIdentityKeys.has(identityKey)) {
        problems.push(`duplicate_in_batch:${seenIdentityKeys.get(identityKey)}`);
      } else {
        seenIdentityKeys.set(identityKey, candidate.candidate_id ?? "unknown");
      }
    }

    if (sourceResult.source) {
      const key = providerKey(sourceResult.source);
      if (key) {
        const earlier = seenProviderKeys.get(key);
        if (earlier && earlier.identity_key !== identityKey) {
          problems.push(`provider_identity_conflict:${earlier.candidate_id}`);
        } else if (!earlier) {
          seenProviderKeys.set(key, {
            candidate_id: candidate.candidate_id ?? "unknown",
            identity_key: identityKey,
          });
        }
      }
    }

    const readiness =
      problems.length === 0
        ? "tier_a_ready"
        : problems.some((problem) => problem.startsWith("duplicate_")) ||
            problems.some((problem) => problem.startsWith("provider_identity_conflict"))
          ? "blocked_identity"
          : problems.some(
                (problem) =>
                  problem.startsWith("source_") ||
                  problem.startsWith("resolved_source_") ||
                  problem.startsWith("underlying_source_") ||
                  problem === "source_family_supporting_only",
              )
            ? "blocked_source"
            : "blocked_input";

    records.push({
      candidate_id: candidate.candidate_id ?? null,
      readiness,
      identity_key: identityKey,
      problems,
      warnings,
      effective_source_family: sourceResult.source?.effective?.family_id ?? null,
      discovery_source_family: sourceResult.source?.discovery?.family_id ?? null,
      tier_a_draft:
        readiness === "tier_a_ready"
          ? tierADraft(candidate, geographyResult.normalized, sourceResult.source, identityKey)
          : null,
    });
  }

  const counts = {
    candidates: records.length,
    tier_a_ready: records.filter((record) => record.readiness === "tier_a_ready").length,
    blocked_input: records.filter((record) => record.readiness === "blocked_input").length,
    blocked_source: records.filter((record) => record.readiness === "blocked_source").length,
    blocked_identity: records.filter((record) => record.readiness === "blocked_identity").length,
    published: 0,
  };

  return {
    schema_version: "matsuri.tier-a-readiness-report.v1",
    batch_id: batch?.batch_id ?? null,
    mode: "readiness_only",
    source_inventory_schema_version: inventory.schema_version,
    publication_authorized: false,
    writes_canonical_public_data: false,
    writes_tier_a_publication_time: false,
    counts,
    records,
  };
}

export function readCandidateBatch(inputPath) {
  return JSON.parse(fs.readFileSync(inputPath, "utf8"));
}

export function writeTierAReadinessArtifacts(report, outputRoot) {
  fs.mkdirSync(outputRoot, { recursive: true });
  const ready = report.records
    .filter((record) => record.readiness === "tier_a_ready")
    .map((record) => record.tier_a_draft);
  const blocked = report.records.filter((record) => record.readiness !== "tier_a_ready");

  fs.writeFileSync(
    path.join(outputRoot, "report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
  fs.writeFileSync(
    path.join(outputRoot, "tier-a-ready-drafts.json"),
    `${JSON.stringify(ready, null, 2)}\n`,
    "utf8",
  );
  fs.writeFileSync(
    path.join(outputRoot, "blocked-candidates.json"),
    `${JSON.stringify(blocked, null, 2)}\n`,
    "utf8",
  );
}

export { repositoryRoot };
