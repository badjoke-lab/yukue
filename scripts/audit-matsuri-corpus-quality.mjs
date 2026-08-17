import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const args = process.argv.slice(2);
const outputIndex = args.indexOf("--output");
const outputRoot =
  outputIndex >= 0 && args[outputIndex + 1]
    ? path.resolve(repositoryRoot, args[outputIndex + 1])
    : path.join(repositoryRoot, "artifacts", "matsuri-corpus-quality");

const dataset = loadMatsuriDataset();
const generatedAt = new Date();
const sourcesById = new Map(dataset.sources.map((source) => [source.id, source]));
const evidenceById = new Map(dataset.evidence.map((evidence) => [evidence.id, evidence]));
const placesById = new Map(dataset.places.map((place) => [place.id, place]));

const specialistPrimaryTypes = new Set(["festival", "folk_performance"]);
const legacyCoverageTypes = new Set(["festival", "folk_performance", "tradition_unit"]);
const completedOccurrenceOutcomes = new Set([
  "held",
  "partially_held",
  "postponed",
  "rescheduled",
  "cancelled",
  "not_held",
]);
const distributedScopeTypes = new Set([
  "multi_area",
  "multi_site",
  "route_based",
  "distributed",
]);
const profileEvidenceTargetTypes = new Set(["entity_identity", "name_variant", "location"]);
const tierBTargetDays = 7;

function entityName(entity) {
  return (
    entity.names?.find((name) => name.is_preferred)?.value ??
    entity.names?.find((name) => name.kind === "canonical")?.value ??
    entity.names?.[0]?.value ??
    entity.id
  );
}

function preferredName(entity) {
  return (
    entity.names?.find((name) => name.is_preferred) ??
    entity.names?.find((name) => name.kind === "canonical") ??
    entity.names?.[0] ??
    null
  );
}

function textLength(value) {
  return typeof value === "string" ? [...value.trim()].length : 0;
}

function approved(record) {
  return record.review_status === undefined || record.review_status === "approved";
}

function latestApprovedStateByEntity() {
  const latest = new Map();
  for (const snapshot of dataset.stateSnapshots) {
    if (!approved(snapshot)) continue;
    const current = latest.get(snapshot.entity_id);
    if (!current || String(snapshot.observed_at).localeCompare(String(current.observed_at)) > 0) {
      latest.set(snapshot.entity_id, snapshot);
    }
  }
  return latest;
}

function evidenceIdsAreApproved(ids, targetType, targetId) {
  if (!Array.isArray(ids) || ids.length === 0) return false;
  return ids.every((id) => {
    const evidence = evidenceById.get(id);
    return (
      evidence &&
      approved(evidence) &&
      evidence.target_type === targetType &&
      evidence.target_id === targetId &&
      sourcesById.has(evidence.source_id)
    );
  });
}

function directProfileEvidence(entityId) {
  return dataset.evidence.filter(
    (evidence) =>
      approved(evidence) &&
      evidence.target_id === entityId &&
      profileEvidenceTargetTypes.has(evidence.target_type) &&
      sourcesById.has(evidence.source_id),
  );
}

function identitySourceIds(entity, profileEvidence) {
  const ids = new Set();
  for (const sourceId of preferredName(entity)?.source_ids ?? []) {
    if (sourcesById.has(sourceId)) ids.add(sourceId);
  }
  for (const evidence of profileEvidence) {
    if (sourcesById.has(evidence.source_id)) ids.add(evidence.source_id);
  }
  return [...ids];
}

function preferredNameSourceBacked(entity) {
  const preferred = preferredName(entity);
  return Boolean(
    preferred &&
      Array.isArray(preferred.source_ids) &&
      preferred.source_ids.length > 0 &&
      preferred.source_ids.every((sourceId) => sourcesById.has(sourceId)),
  );
}

function hasGeographicScope(entity) {
  const areas = entity.geographic_scope?.areas ?? [];
  if (areas.length === 0) return false;
  if (!areas.some((area) => area.prefecture_code || area.prefecture_name_ja)) return false;
  if (areas.some((area) => area.municipality_code || area.municipality_name_ja)) return true;
  return (
    distributedScopeTypes.has(entity.geographic_scope?.scope_type) &&
    textLength(entity.geographic_scope?.description_ja) > 0
  );
}

function hasTimingOrRecurrence(entity) {
  return Boolean(
    entity.recurrence_pattern?.pattern_type ||
      (Array.isArray(entity.usual_months) && entity.usual_months.length > 0) ||
      entity.usual_season ||
      textLength(entity.date_rule_text_ja) > 0 ||
      textLength(entity.traditional_calendar_text_ja) > 0,
  );
}

function hasPlaceModel(entity) {
  const placeIds = new Set([
    ...(entity.primary_place_id ? [entity.primary_place_id] : []),
    ...(entity.default_place_ids ?? []),
  ]);
  if ([...placeIds].some((placeId) => placesById.has(placeId))) return true;
  return (
    distributedScopeTypes.has(entity.geographic_scope?.scope_type) &&
    textLength(entity.geographic_scope?.description_ja) > 0
  );
}

function hasReviewedAuthoritativeIdentitySource(sourceIds) {
  return sourceIds.some((sourceId) => {
    const source = sourcesById.get(sourceId);
    return Boolean(
      source &&
        typeof source.url === "string" &&
        /^https?:\/\//u.test(source.url) &&
        textLength(source.source_type) > 0 &&
        textLength(source.accessed_at) > 0,
    );
  });
}

function occurrenceYear(occurrence) {
  const candidates = [
    occurrence.temporal_extent?.start,
    occurrence.temporal_extent?.start_date,
    occurrence.temporal_extent?.date,
    occurrence.start_date,
    occurrence.date,
  ];
  for (const candidate of candidates) {
    if (typeof candidate !== "string") continue;
    const match = candidate.match(/^(\d{4})/u);
    if (match) return match[1];
  }
  return null;
}

function normalizedIdentityKey(entity) {
  const name = entityName(entity).normalize("NFKC").replace(/\s+/gu, "").toLocaleLowerCase("ja");
  const areas = entity.geographic_scope?.areas ?? [];
  const geography = areas
    .map(
      (area) =>
        `${area.prefecture_code ?? area.prefecture_name_ja ?? ""}:${area.municipality_code ?? area.municipality_name_ja ?? ""}`,
    )
    .sort()
    .join("|");
  return `${entity.entity_type}:${name}:${geography}`;
}

function publicationTimestamp(entity) {
  return entity.tier_a_published_at ?? entity.publication?.tier_a_published_at ?? null;
}

function publicationAge(entity, tier) {
  if (tier !== "tier_a_index") {
    return {
      tier_a_published_at: publicationTimestamp(entity),
      age_days: null,
      target_at: null,
      status: "not_currently_tier_a",
      overdue: false,
      due_within_48h: false,
    };
  }

  const raw = publicationTimestamp(entity);
  if (!raw) {
    return {
      tier_a_published_at: null,
      age_days: null,
      target_at: null,
      status: "publication_metadata_missing",
      overdue: false,
      due_within_48h: false,
    };
  }

  const publishedAt = new Date(raw);
  if (Number.isNaN(publishedAt.getTime())) {
    return {
      tier_a_published_at: raw,
      age_days: null,
      target_at: null,
      status: "publication_metadata_invalid",
      overdue: false,
      due_within_48h: false,
    };
  }

  const targetAt = new Date(publishedAt.getTime() + tierBTargetDays * 24 * 60 * 60 * 1000);
  const ageDays = (generatedAt.getTime() - publishedAt.getTime()) / (24 * 60 * 60 * 1000);
  const overdue = generatedAt.getTime() > targetAt.getTime();
  const dueWithin48h = !overdue && targetAt.getTime() - generatedAt.getTime() <= 48 * 60 * 60 * 1000;
  return {
    tier_a_published_at: publishedAt.toISOString(),
    age_days: Number(ageDays.toFixed(3)),
    target_at: targetAt.toISOString(),
    status: overdue ? "overdue" : dueWithin48h ? "due_within_48h" : "within_target",
    overdue,
    due_within_48h: dueWithin48h,
  };
}

const latestState = latestApprovedStateByEntity();
const occurrencesByEntity = new Map();
const changesByEntity = new Map();

for (const occurrence of dataset.occurrences) {
  if (!approved(occurrence)) continue;
  const items = occurrencesByEntity.get(occurrence.subject_entity_id) ?? [];
  items.push(occurrence);
  occurrencesByEntity.set(occurrence.subject_entity_id, items);
}

for (const event of dataset.changeEvents) {
  if (!approved(event)) continue;
  for (const entityId of event.subject_entity_ids ?? []) {
    const items = changesByEntity.get(entityId) ?? [];
    items.push(event);
    changesByEntity.set(entityId, items);
  }
}

const specialistEntities = dataset.entities.filter((entity) => specialistPrimaryTypes.has(entity.entity_type));
const duplicateKeyCounts = new Map();
for (const entity of specialistEntities) {
  const key = normalizedIdentityKey(entity);
  duplicateKeyCounts.set(key, (duplicateKeyCounts.get(key) ?? 0) + 1);
}

const records = dataset.entities
  .filter((entity) => legacyCoverageTypes.has(entity.entity_type))
  .map((entity) => {
    const specialistPrimary = specialistPrimaryTypes.has(entity.entity_type);
    const state = latestState.get(entity.id);
    const occurrences = occurrencesByEntity.get(entity.id) ?? [];
    const changeEvents = changesByEntity.get(entity.id) ?? [];
    const evidencedOccurrences = occurrences.filter((occurrence) =>
      evidenceIdsAreApproved(occurrence.evidence_ids, "occurrence", occurrence.id),
    );
    const completedOccurrences = evidencedOccurrences.filter((occurrence) =>
      completedOccurrenceOutcomes.has(occurrence.outcome),
    );
    const evidencedChangeEvents = changeEvents.filter((event) =>
      evidenceIdsAreApproved(event.evidence_ids, "change_event", event.id),
    );
    const scheduledOccurrences = evidencedOccurrences.filter(
      (occurrence) => occurrence.outcome === "scheduled" || occurrence.outcome === "unknown",
    );
    const completedYears = new Set(completedOccurrences.map(occurrenceYear).filter(Boolean));
    const profileEvidence = directProfileEvidence(entity.id);
    const profileSourceIds = identitySourceIds(entity, profileEvidence);
    const stateEvidence = state
      ? evidenceIdsAreApproved(state.basis_evidence_ids, "state_snapshot", state.id)
      : false;

    const tierAChecks = {
      specialist_primary_type: specialistPrimary,
      preferred_name_source_backed: preferredNameSourceBacked(entity),
      geographic_scope_present: hasGeographicScope(entity),
      authoritative_identity_source_present: hasReviewedAuthoritativeIdentitySource(profileSourceIds),
      source_verification_date_present: profileSourceIds.some(
        (sourceId) => textLength(sourcesById.get(sourceId)?.accessed_at) > 0,
      ),
      identity_duplicate_clear: specialistPrimary
        ? (duplicateKeyCounts.get(normalizedIdentityKey(entity)) ?? 0) === 1
        : false,
    };

    const tierBChecks = {
      substantive_summary_or_description_present:
        textLength(entity.summary_ja) >= 20 || textLength(entity.description_ja) >= 40,
      approved_current_state_present: Boolean(state),
      current_state_evidence_present: stateEvidence,
      place_model_present: hasPlaceModel(entity),
      timing_or_recurrence_present: hasTimingOrRecurrence(entity),
      direct_profile_evidence_present: profileEvidence.length > 0,
      dated_observation_anchor_present:
        evidencedOccurrences.length > 0 || evidencedChangeEvents.length > 0,
    };

    const tierA = specialistPrimary && Object.values(tierAChecks).every(Boolean);
    const tierB = tierA && Object.values(tierBChecks).every(Boolean);

    const tierCSignals = {
      multi_year_completed_occurrence_history: completedYears.size >= 2,
      multiple_completed_occurrences: completedOccurrences.length >= 2,
      multiple_evidence_backed_change_events: evidencedChangeEvents.length >= 2,
      active_freshness_monitoring: scheduledOccurrences.length > 0,
    };
    const tierC = tierB && Object.values(tierCSignals).some(Boolean);
    const coverageTier = tierC
      ? "tier_c_history_monitoring"
      : tierB
        ? "tier_b_verified"
        : tierA
          ? "tier_a_index"
          : "below_tier_a";

    const tierAMissing = Object.entries(tierAChecks)
      .filter(([, value]) => !value)
      .map(([key]) => key);
    const tierBMissing = Object.entries(tierBChecks)
      .filter(([, value]) => !value)
      .map(([key]) => key);
    const tierCMissing = Object.entries(tierCSignals)
      .filter(([, value]) => !value)
      .map(([key]) => key);
    const age = publicationAge(entity, coverageTier);

    return {
      id: entity.id,
      slug: entity.slug,
      name: entityName(entity),
      entity_type: entity.entity_type,
      specialist_primary: specialistPrimary,
      coverage_tier: coverageTier,
      tier_a_checks: tierAChecks,
      tier_b_checks: tierBChecks,
      tier_c_signals: tierCSignals,
      tier_a_missing_dimensions: tierAMissing,
      tier_b_missing_dimensions: tierBMissing,
      tier_c_missing_dimensions: tierCMissing,
      tier_a_publication: age,
      evidence_and_history: {
        direct_profile_evidence: profileEvidence.length,
        identity_source_ids: profileSourceIds,
        evidenced_occurrences: evidencedOccurrences.length,
        completed_occurrences: completedOccurrences.length,
        completed_occurrence_years: [...completedYears].sort(),
        change_events: evidencedChangeEvents.length,
        scheduled_or_unknown_occurrences: scheduledOccurrences.length,
      },
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name, "ja"));

const specialistRecords = records.filter((record) => record.specialist_primary);
const tierARecords = specialistRecords.filter((record) => record.coverage_tier === "tier_a_index");
const tierBRecords = specialistRecords.filter((record) => record.coverage_tier === "tier_b_verified");
const tierCRecords = specialistRecords.filter(
  (record) => record.coverage_tier === "tier_c_history_monitoring",
);
const belowTierARecords = specialistRecords.filter((record) => record.coverage_tier === "below_tier_a");

function countMissing(recordsToCount, key) {
  const counts = {};
  for (const record of recordsToCount) {
    for (const dimension of record[key] ?? []) {
      counts[dimension] = (counts[dimension] ?? 0) + 1;
    }
  }
  return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
}

function areaKey(area, level) {
  if (level === "prefecture") return area.prefecture_code ?? area.prefecture_name_ja ?? null;
  const prefecture = area.prefecture_code ?? area.prefecture_name_ja ?? "";
  const municipality = area.municipality_code ?? area.municipality_name_ja ?? null;
  return municipality ? `${prefecture}:${municipality}` : null;
}

const prefectures = new Set();
const municipalities = new Set();
for (const entity of specialistEntities) {
  for (const area of entity.geographic_scope?.areas ?? []) {
    const prefecture = areaKey(area, "prefecture");
    const municipality = areaKey(area, "municipality");
    if (prefecture) prefectures.add(prefecture);
    if (municipality) municipalities.add(municipality);
  }
}

const sourceFamilyEntitySets = new Map();
for (const record of specialistRecords) {
  for (const sourceId of record.evidence_and_history.identity_source_ids) {
    const family = sourcesById.get(sourceId)?.source_type ?? "unknown";
    if (!sourceFamilyEntitySets.has(family)) sourceFamilyEntitySets.set(family, new Set());
    sourceFamilyEntitySets.get(family).add(record.id);
  }
}
const sourceFamilyCoverage = Object.fromEntries(
  [...sourceFamilyEntitySets.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([family, entityIds]) => [family, entityIds.size]),
);

const report = {
  schema_version: "matsuri.corpus-quality.v2",
  generated_at: generatedAt.toISOString(),
  governing_spec: "docs/nationwide-corpus-scaling.md",
  mode: "measurement_only",
  release_gate_authorized: false,
  classifier_notes: {
    tier_a_index:
      "Public Index. Requires reviewed identity, geography, authoritative/source-backed identity provenance, source verification date, and duplicate-clear identity. Current State, completed Occurrence, Change Event, Place, organizer, Relation, coordinates, and multi-year history are not Tier A prerequisites.",
    tier_b_verified:
      "Public Verified. Requires Tier A plus substantive profile text, evidence-backed Current State, place/timing treatment, direct profile Evidence, and a dated observation anchor. Multi-year history is not required.",
    tier_c_history_monitoring:
      "Public History / Monitoring. Requires Tier B plus longitudinal depth or an active freshness-monitoring obligation.",
    tier_a_target:
      "A→B is targeted within seven calendar days. Overdue Tier A is visible and prioritized but never creates a global stop, never expires automatically, and never justifies invented facts.",
    existing_publication_age:
      "Legacy records without tier_a_published_at are reported with publication_metadata_missing. The classifier does not invent publication timestamps or mark them overdue from repository age.",
  },
  counts: {
    all_entities: dataset.entities.length,
    legacy_primary_subjects: records.length,
    specialist_primary_subjects: specialistRecords.length,
    tier_a_index: tierARecords.length,
    tier_b_verified: tierBRecords.length,
    tier_c_history_monitoring: tierCRecords.length,
    below_tier_a: belowTierARecords.length,
    public_primary_total: tierARecords.length + tierBRecords.length + tierCRecords.length,
    tier_a_overdue: tierARecords.filter((record) => record.tier_a_publication.overdue).length,
    tier_a_due_within_48h: tierARecords.filter((record) => record.tier_a_publication.due_within_48h)
      .length,
    tier_a_publication_metadata_missing: tierARecords.filter(
      (record) => record.tier_a_publication.status === "publication_metadata_missing",
    ).length,
    with_completed_occurrence_history: specialistRecords.filter(
      (record) => record.evidence_and_history.completed_occurrences > 0,
    ).length,
    with_multi_year_completed_occurrence_history: specialistRecords.filter(
      (record) => record.evidence_and_history.completed_occurrence_years.length >= 2,
    ).length,
    with_change_events: specialistRecords.filter(
      (record) => record.evidence_and_history.change_events > 0,
    ).length,
    with_current_state_evidence: specialistRecords.filter(
      (record) => record.tier_b_checks.current_state_evidence_present,
    ).length,
    with_direct_profile_evidence: specialistRecords.filter(
      (record) => record.tier_b_checks.direct_profile_evidence_present,
    ).length,
  },
  by_entity_type: Object.fromEntries(
    [...new Set(records.map((record) => record.entity_type))]
      .sort()
      .map((entityType) => {
        const typed = records.filter((record) => record.entity_type === entityType);
        return [
          entityType,
          {
            records: typed.length,
            tier_a_index: typed.filter((record) => record.coverage_tier === "tier_a_index").length,
            tier_b_verified: typed.filter((record) => record.coverage_tier === "tier_b_verified").length,
            tier_c_history_monitoring: typed.filter(
              (record) => record.coverage_tier === "tier_c_history_monitoring",
            ).length,
            below_tier_a: typed.filter((record) => record.coverage_tier === "below_tier_a").length,
          },
        ];
      }),
  ),
  tier_a_missing_dimension_counts: countMissing(belowTierARecords, "tier_a_missing_dimensions"),
  tier_a_to_b_missing_dimension_counts: countMissing(tierARecords, "tier_b_missing_dimensions"),
  tier_b_missing_history_dimension_counts: countMissing(tierBRecords, "tier_c_missing_dimensions"),
  coverage: {
    prefecture_count: prefectures.size,
    prefectures: [...prefectures].sort(),
    municipality_count: municipalities.size,
    municipalities: [...municipalities].sort(),
    source_family_entity_coverage: sourceFamilyCoverage,
  },
  growth: {
    candidate_count: null,
    candidate_count_status: "not_available_from_public_canonical_dataset",
    new_public_growth: null,
    new_public_growth_status: "baseline_measurement_no_prior_checkpoint",
  },
  tier_a_target: {
    target_days: tierBTargetDays,
    overdue_blocks_new_tier_a_publication: false,
    auto_withdraw_on_overdue: false,
  },
  records,
};

const markdown = [
  "# Matsuri corpus A/B/C quality baseline",
  "",
  `Generated: ${report.generated_at}`,
  "",
  "**Mode:** measurement only — this report classifies the current public corpus but does not itself authorize an NCS-06 bulk publication wave.",
  "",
  "## Governing contract",
  "",
  `- ${report.governing_spec}`,
  "- Tier A is a valid public Index tier.",
  "- Completed Occurrence, Change Event, and multi-year history are not Tier A publication prerequisites.",
  "- A→B is a seven-day work target, not a global release blocker.",
  "- A machine classification never replaces required review or Evidence boundaries.",
  "",
  "## Counts",
  "",
  ...Object.entries(report.counts).map(([key, value]) => `- ${key}: ${value}`),
  "",
  "## Coverage",
  "",
  `- prefecture_count: ${report.coverage.prefecture_count}`,
  `- municipality_count: ${report.coverage.municipality_count}`,
  `- source_family_entity_coverage: ${JSON.stringify(report.coverage.source_family_entity_coverage)}`,
  "",
  "## Tier A → B work queue dimensions",
  "",
  ...(Object.keys(report.tier_a_to_b_missing_dimension_counts).length > 0
    ? Object.entries(report.tier_a_to_b_missing_dimension_counts).map(
        ([key, value]) => `- ${key}: ${value}`,
      )
    : ["- None"]),
  "",
  "## Tier A overdue / age metadata",
  "",
  `- due_within_48h: ${report.counts.tier_a_due_within_48h}`,
  `- overdue: ${report.counts.tier_a_overdue}`,
  `- publication_metadata_missing: ${report.counts.tier_a_publication_metadata_missing}`,
  "- Missing legacy publication timestamps are not converted into invented ages or overdue status.",
  "",
  "## Records",
  "",
  ...specialistRecords.map(
    (record) =>
      `- ${record.name} (${record.id}): ${record.coverage_tier}; A-missing=[${record.tier_a_missing_dimensions.join(", ")}]; B-missing=[${record.tier_b_missing_dimensions.join(", ")}]; C-missing=[${record.tier_c_missing_dimensions.join(", ")}]`,
  ),
  "",
].join("\n");

fs.mkdirSync(outputRoot, { recursive: true });
fs.writeFileSync(path.join(outputRoot, "report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
fs.writeFileSync(path.join(outputRoot, "report.md"), `${markdown}\n`, "utf8");

console.log(markdown);
console.log(`Wrote Matsuri corpus A/B/C quality baseline to ${path.relative(repositoryRoot, outputRoot)}`);
