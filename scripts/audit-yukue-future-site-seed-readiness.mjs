import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const seedInventoryPath = path.resolve(
  repositoryRoot,
  process.env.YUKUE_SEED_INVENTORY_PATH ??
    ".artifacts/yukue-future-site-seeds/inventory.json",
);
const outputDirectory = path.resolve(
  repositoryRoot,
  process.env.YUKUE_SEED_READINESS_ARTIFACT_DIR ??
    ".artifacts/yukue-future-site-seed-readiness",
);

assert(
  fs.existsSync(seedInventoryPath),
  `Future-site seed inventory is missing: ${seedInventoryPath}. Run pnpm audit:yukue:future-site-seeds first.`,
);

const inventory = JSON.parse(fs.readFileSync(seedInventoryPath, "utf8"));
assert.equal(inventory.format_version, 1, "Unexpected seed inventory format_version.");
assert.equal(
  inventory.status,
  "candidate-seed-inventory-only",
  "Seed inventory is not in the accepted candidate-only state.",
);
assert.equal(
  inventory.boundaries?.activates_future_site,
  false,
  "Seed inventory must not activate a future site.",
);
assert.equal(
  inventory.boundaries?.includes_private_candidate_queue,
  false,
  "Seed inventory must not include a private candidate queue.",
);

const dataset = loadMatsuriDataset();
const entitiesById = new Map(dataset.entities.map((record) => [record.id, record]));
const placesById = new Map(dataset.places.map((record) => [record.id, record]));
const sourcesById = new Map(dataset.sources.map((record) => [record.id, record]));
const evidenceById = new Map(dataset.evidence.map((record) => [record.id, record]));
const relationsById = new Map(dataset.relations.map((record) => [record.id, record]));
const approvedSnapshotsByEntityId = new Map();

for (const snapshot of dataset.stateSnapshots) {
  if (snapshot.review_status !== "approved") continue;
  const snapshots = approvedSnapshotsByEntityId.get(snapshot.entity_id) ?? [];
  snapshots.push(snapshot);
  approvedSnapshotsByEntityId.set(snapshot.entity_id, snapshots);
}

const seeds = inventory.sites.flatMap((site) => site.seeds ?? []);
assert.equal(
  seeds.length,
  inventory.totals.seeds,
  "Seed inventory total does not match site records.",
);

function preferredName(entity) {
  return (
    entity.names?.find((name) => name.is_preferred)?.value ??
    entity.names?.[0]?.value ??
    entity.id
  );
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((left, right) =>
    String(left).localeCompare(String(right), "ja"),
  );
}

function addGap(gaps, code, severity, message) {
  gaps.push({ code, severity, message });
}

const seedReports = [];

for (const seed of seeds) {
  const entity = entitiesById.get(seed.entity_id);
  assert(entity, `Seed Entity is missing: ${seed.entity_id}`);
  assert.equal(
    entity.entity_type,
    seed.entity_type,
    `Seed ${seed.entity_id} entity_type drifted.`,
  );
  assert.equal(
    preferredName(entity),
    seed.name_ja,
    `Seed ${seed.entity_id} preferred name drifted.`,
  );

  const gaps = [];
  const placeIds = uniqueSorted([
    entity.primary_place_id,
    ...(entity.default_place_ids ?? []),
  ]);
  const missingPlaceIds = placeIds.filter((placeId) => !placesById.has(placeId));
  const approvedSnapshots = approvedSnapshotsByEntityId.get(entity.id) ?? [];
  const directIdentityEvidence = dataset.evidence.filter(
    (evidence) =>
      evidence.review_status === "approved" &&
      evidence.target_type === "entity_identity" &&
      evidence.target_id === entity.id,
  );
  const officialUrls = uniqueSorted(seed.official_urls ?? []);
  const sourceIds = uniqueSorted(seed.source_ids ?? []);
  const missingSourceIds = sourceIds.filter((sourceId) => !sourcesById.has(sourceId));

  let relationContextValid = true;
  const relationContextFindings = [];
  for (const context of seed.relation_contexts ?? []) {
    const relation = relationsById.get(context.relation_id);
    if (!relation || relation.review_status !== "approved") {
      relationContextValid = false;
      relationContextFindings.push({
        relation_id: context.relation_id,
        valid: false,
        problem: "missing-or-unapproved-relation",
      });
      continue;
    }

    const missingEvidenceIds = (context.evidence_ids ?? []).filter(
      (evidenceId) => !evidenceById.has(evidenceId),
    );
    const invalidEvidenceIds = (context.evidence_ids ?? []).filter((evidenceId) => {
      const evidence = evidenceById.get(evidenceId);
      return (
        evidence &&
        (evidence.review_status !== "approved" ||
          evidence.target_type !== "relation" ||
          evidence.target_id !== relation.id)
      );
    });

    const valid = missingEvidenceIds.length === 0 && invalidEvidenceIds.length === 0;
    if (!valid) relationContextValid = false;
    relationContextFindings.push({
      relation_id: relation.id,
      relation_type: relation.relation_type,
      valid,
      missing_evidence_ids: missingEvidenceIds,
      invalid_evidence_ids: invalidEvidenceIds,
    });
  }

  const hasSummary = typeof entity.summary_ja === "string" && entity.summary_ja.trim() !== "";
  const hasGeographicScope =
    Array.isArray(entity.geographic_scope?.areas) &&
    entity.geographic_scope.areas.length > 0;
  const hasPlaceReference = placeIds.length > 0 && missingPlaceIds.length === 0;
  const hasApprovedState = approvedSnapshots.length > 0;
  const hasSourceCoverage = sourceIds.length > 0 && missingSourceIds.length === 0;
  const hasRelationContext =
    Array.isArray(seed.relation_contexts) &&
    seed.relation_contexts.length > 0 &&
    relationContextValid;
  const hasOfficialUrl = officialUrls.length > 0;
  const hasDirectIdentityEvidence = directIdentityEvidence.length > 0;

  if (!hasSummary) {
    addGap(gaps, "missing-summary", "blocking-context", "No public Japanese summary is available.");
  }
  if (!hasGeographicScope) {
    addGap(
      gaps,
      "missing-geographic-scope",
      "blocking-context",
      "No geographic scope area is available.",
    );
  }
  if (placeIds.length === 0) {
    addGap(gaps, "missing-place-reference", "blocking-context", "No primary or default Place is referenced.");
  } else if (missingPlaceIds.length > 0) {
    addGap(
      gaps,
      "missing-place-record",
      "blocking-context",
      `Referenced Place records are missing: ${missingPlaceIds.join(", ")}`,
    );
  }
  if (!hasApprovedState) {
    addGap(
      gaps,
      "missing-approved-state-snapshot",
      "blocking-context",
      "No approved State Snapshot is available.",
    );
  }
  if (!hasSourceCoverage) {
    addGap(
      gaps,
      "missing-source-coverage",
      "blocking-context",
      missingSourceIds.length > 0
        ? `Referenced Source records are missing: ${missingSourceIds.join(", ")}`
        : "No public Source coverage is available.",
    );
  }
  if (!hasRelationContext) {
    addGap(
      gaps,
      "invalid-relation-context",
      "blocking-context",
      "The approved Relation and Evidence context is incomplete or invalid.",
    );
  }
  if (!hasOfficialUrl) {
    addGap(
      gaps,
      "missing-official-url",
      "target-site-research",
      "No official public URL is currently attached to the seed Entity.",
    );
  }
  if (!hasDirectIdentityEvidence) {
    addGap(
      gaps,
      "missing-direct-identity-evidence",
      "target-site-research",
      "No approved Evidence record directly targets the Entity identity.",
    );
  }

  const blockingContextGaps = gaps.filter(
    (gap) => gap.severity === "blocking-context",
  );

  seedReports.push({
    entity_id: entity.id,
    candidate_site_id: seed.candidate_site_id,
    entity_type: entity.entity_type,
    name_ja: preferredName(entity),
    checks: {
      summary: hasSummary,
      geographic_scope: hasGeographicScope,
      place_reference: hasPlaceReference,
      approved_state_snapshot: hasApprovedState,
      source_coverage: hasSourceCoverage,
      approved_relation_context: hasRelationContext,
      official_url: hasOfficialUrl,
      direct_identity_evidence: hasDirectIdentityEvidence,
    },
    counts: {
      place_references: placeIds.length,
      approved_state_snapshots: approvedSnapshots.length,
      source_records: sourceIds.length,
      official_urls: officialUrls.length,
      direct_identity_evidence: directIdentityEvidence.length,
      relation_contexts: seed.relation_contexts.length,
    },
    references: {
      place_ids: placeIds,
      source_ids: sourceIds,
      official_urls: officialUrls,
      state_snapshot_ids: uniqueSorted(approvedSnapshots.map((record) => record.id)),
      direct_identity_evidence_ids: uniqueSorted(
        directIdentityEvidence.map((record) => record.id),
      ),
    },
    relation_context_findings: relationContextFindings,
    cross_site_context_status:
      blockingContextGaps.length === 0 ? "context-complete" : "context-incomplete",
    target_site_review_required: true,
    gaps,
  });
}

seedReports.sort((left, right) =>
  `${left.candidate_site_id}:${left.name_ja}:${left.entity_id}`.localeCompare(
    `${right.candidate_site_id}:${right.name_ja}:${right.entity_id}`,
    "ja",
  ),
);

const gapCounts = new Map();
for (const seed of seedReports) {
  for (const gap of seed.gaps) {
    gapCounts.set(gap.code, (gapCounts.get(gap.code) ?? 0) + 1);
  }
}

const report = {
  format_version: 1,
  generated_at: new Date().toISOString(),
  source_inventory_generated_at: inventory.generated_at,
  status: "public-seed-readiness-audit-only",
  totals: {
    seeds: seedReports.length,
    context_complete: seedReports.filter(
      (seed) => seed.cross_site_context_status === "context-complete",
    ).length,
    context_incomplete: seedReports.filter(
      (seed) => seed.cross_site_context_status === "context-incomplete",
    ).length,
    with_official_url: seedReports.filter((seed) => seed.checks.official_url).length,
    without_official_url: seedReports.filter((seed) => !seed.checks.official_url).length,
    with_approved_state_snapshot: seedReports.filter(
      (seed) => seed.checks.approved_state_snapshot,
    ).length,
    with_direct_identity_evidence: seedReports.filter(
      (seed) => seed.checks.direct_identity_evidence,
    ).length,
    without_direct_identity_evidence: seedReports.filter(
      (seed) => !seed.checks.direct_identity_evidence,
    ).length,
  },
  gap_counts: Object.fromEntries(
    [...gapCounts.entries()].sort(([left], [right]) => left.localeCompare(right)),
  ),
  seeds: seedReports,
  boundaries: {
    publication_ready_claimed: false,
    future_site_activated: false,
    candidate_priority_assigned: false,
    missing_data_inferred: false,
    private_notes_included: false,
  },
};

assert.equal(
  report.totals.context_complete + report.totals.context_incomplete,
  report.totals.seeds,
  "Context readiness totals do not balance.",
);

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(
  path.join(outputDirectory, "readiness.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);

const summaryLines = [
  "# Yukue Future-site Seed Readiness Audit",
  "",
  `Status: **${report.status}**`,
  "",
  `- Total seeds: ${report.totals.seeds}`,
  `- Cross-site context complete: ${report.totals.context_complete}`,
  `- Cross-site context incomplete: ${report.totals.context_incomplete}`,
  `- With official URL: ${report.totals.with_official_url}`,
  `- Without official URL: ${report.totals.without_official_url}`,
  `- With approved State Snapshot: ${report.totals.with_approved_state_snapshot}`,
  `- With direct identity Evidence: ${report.totals.with_direct_identity_evidence}`,
  `- Without direct identity Evidence: ${report.totals.without_direct_identity_evidence}`,
  "",
  "## Seed findings",
  "",
];

for (const seed of seedReports) {
  const gapText =
    seed.gaps.length === 0
      ? "no detected gaps"
      : seed.gaps.map((gap) => gap.code).join(", ");
  summaryLines.push(
    `- ${seed.candidate_site_id} / ${seed.name_ja} (\`${seed.entity_id}\`) — ${seed.cross_site_context_status}; ${gapText}`,
  );
}

summaryLines.push(
  "",
  "## Boundary",
  "",
  "This audit does not claim publication readiness, activate a future site, assign candidate priority, or infer missing facts.",
);

fs.writeFileSync(
  path.join(outputDirectory, "summary.md"),
  `${summaryLines.join("\n")}\n`,
  "utf8",
);

console.log(
  `Yukue future-site seed readiness audit passed: ${report.totals.seeds} seed(s), ${report.totals.context_complete} context-complete, ${report.totals.context_incomplete} context-incomplete, ${report.totals.with_official_url} with official URL, ${report.totals.with_direct_identity_evidence} with direct identity Evidence.`,
);
