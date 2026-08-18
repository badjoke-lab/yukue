import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  buildTierAReadinessReport,
  loadNationalSourceInventory,
} from "./lib/matsuri-tier-a-importer.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const fixturePath = path.join(
  repositoryRoot,
  "fixtures",
  "matsuri-tier-a-importer",
  "synthetic-candidates.json",
);
const contractPath = path.join(
  repositoryRoot,
  "config",
  "matsuri-tier-a-importer-contract.json",
);
const cliPath = path.join(repositoryRoot, "scripts", "import-matsuri-tier-a-candidates.mjs");

function fail(message) {
  throw new Error(`Matsuri Tier A importer check failed: ${message}`);
}

function require(condition, message) {
  if (!condition) fail(message);
}

const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const inventory = loadNationalSourceInventory();

require(fixture.fixture_only === true, "fixture batch must be explicitly synthetic");
require(fixture.contains_real_candidates === false, "fixture batch must not contain private/real candidates");
require(contract.schema_version === "matsuri.tier-a-importer-contract.v1", "unexpected importer contract schema");
require(contract.phase === "NCS-04", "importer contract phase must be NCS-04");
require(contract.mode === "readiness_only", "NCS-04 importer must remain readiness-only");
require(contract.boundaries?.writes_canonical_public_data === false, "NCS-04 must not write canonical public data");
require(contract.boundaries?.publishes_tier_a === false, "NCS-04 must not publish Tier A records");
require(contract.boundaries?.writes_tier_a_published_at === false, "NCS-04 must not write Tier A publication time");
require(contract.boundaries?.ncs05_dry_run_authorized === false, "NCS-04 contract must not pre-authorize NCS-05 completion");
require(contract.boundaries?.ncs06_publication_authorized === false, "NCS-04 must not authorize NCS-06 publication");
require(contract.boundaries?.future_sites_activated === false, "NCS-04 must not activate future sites");
require(contract.tier_a_draft?.tier_a_published_at === null, "Tier A draft publication time must be null");
require(contract.tier_a_draft?.canonical_id_assigned === false, "NCS-04 must not assign canonical IDs");
require(contract.tier_a_draft?.slug_assigned === false, "NCS-04 must not assign public slugs");

const report = buildTierAReadinessReport(fixture, { inventory });

require(report.schema_version === "matsuri.tier-a-readiness-report.v1", "unexpected readiness report schema");
require(report.mode === "readiness_only", "readiness report mode drifted");
require(report.publication_authorized === false, "readiness report must not authorize publication");
require(report.writes_canonical_public_data === false, "readiness report must not write public canonical data");
require(report.writes_tier_a_publication_time === false, "readiness report must not write publication time");

const expectedCounts = {
  candidates: 14,
  tier_a_ready: 6,
  blocked_input: 2,
  blocked_source: 3,
  blocked_identity: 3,
  published: 0,
};
require(
  JSON.stringify(report.counts) === JSON.stringify(expectedCounts),
  `fixture readiness counts drifted: expected ${JSON.stringify(expectedCounts)}, got ${JSON.stringify(report.counts)}`,
);

const recordsById = new Map(report.records.map((record) => [record.candidate_id, record]));
for (const candidate of fixture.candidates) {
  const record = recordsById.get(candidate.candidate_id);
  require(record, `missing report record for ${candidate.candidate_id}`);
  require(
    record.readiness === candidate.expected_readiness,
    `${candidate.candidate_id}: expected ${candidate.expected_readiness}, got ${record.readiness}`,
  );
}

function problemIncludes(candidateId, prefix) {
  return recordsById
    .get(candidateId)
    ?.problems.some((problem) => problem === prefix || problem.startsWith(`${prefix}:`));
}

require(problemIncludes("synthetic-discovery-unresolved-001", "underlying_source_unresolved"), "discovery-only source must block without underlying-source resolution");
require(problemIncludes("synthetic-conditional-unverified-001", "source_publisher_role_unverified"), "conditional source must require verified publisher role");
require(problemIncludes("synthetic-existing-duplicate-001", "duplicate_existing"), "existing public identity duplicate must block");
require(problemIncludes("synthetic-batch-duplicate-001", "duplicate_in_batch"), "same-batch identity duplicate must block");
require(problemIncludes("synthetic-provider-conflict-001", "provider_identity_conflict"), "provider record identity conflict must block");
require(problemIncludes("synthetic-missing-scope-001", "municipality_or_broader_scope_required"), "Tier A geography must require municipality or explicit broader scope");
require(problemIncludes("synthetic-supporting-only-001", "source_family_supporting_only"), "supporting-only source must not establish Tier A readiness");
require(problemIncludes("synthetic-publication-time-forbidden-001", "publication_timestamp_not_allowed_in_ncs04"), "candidate-supplied Tier A publication time must be rejected");

const resolvedRecord = recordsById.get("synthetic-discovery-resolved-001");
require(resolvedRecord.readiness === "tier_a_ready", "resolved discovery fixture should be Tier A-ready");
require(resolvedRecord.discovery_source_family === "cultural_heritage_online", "discovery source family must be retained for provenance");
require(resolvedRecord.effective_source_family === "municipal_cultural_property_registry", "resolved effective source family must be used for Tier A readiness");

const directRecord = recordsById.get("synthetic-direct-001");
require(
  directRecord.warnings.includes("candidate_claims_not_projected:coordinates,current_state"),
  "candidate Tier B/C claims must be reported as non-projected",
);

const forbiddenDraftKeys = [
  "current_state",
  "occurrence_outcome",
  "organizer",
  "place",
  "relations",
  "coordinates",
  "history",
];
for (const record of report.records.filter((item) => item.readiness === "tier_a_ready")) {
  const draft = record.tier_a_draft;
  require(draft, `${record.candidate_id}: ready record must contain a Tier A draft`);
  require(draft.coverage_tier === "tier_a_index", `${record.candidate_id}: wrong coverage tier`);
  require(draft.publication_status === "not_published", `${record.candidate_id}: draft must remain not_published`);
  require(draft.tier_a_published_at === null, `${record.candidate_id}: publication time must remain null`);
  require(draft.id === undefined, `${record.candidate_id}: NCS-04 must not assign canonical id`);
  require(draft.slug === undefined, `${record.candidate_id}: NCS-04 must not assign slug`);
  const serialized = JSON.stringify(draft);
  for (const key of forbiddenDraftKeys) {
    require(!serialized.includes(`\"${key}\"`), `${record.candidate_id}: Tier A draft leaked ${key}`);
  }
  require(draft.source_provenance?.effective?.rights, `${record.candidate_id}: effective source rights must be retained`);
  require(draft.source_provenance?.effective?.publisher_role, `${record.candidate_id}: publisher role must be retained`);
  require(draft.source_provenance?.effective?.accessed_at, `${record.candidate_id}: source access date must be retained`);
}

const broader = recordsById.get("synthetic-broader-scope-001")?.tier_a_draft;
require(broader?.entity?.geographic_scope?.municipality_name_ja === null, "broader-scope fixture must not invent municipality");
require(broader?.entity?.geographic_scope?.broader_scope_ja === "沖縄県内の複数地域", "broader-scope fixture must preserve explicit scope text");

const outputRoot = fs.mkdtempSync(path.join(os.tmpdir(), "yukue-tier-a-importer-"));
try {
  execFileSync(
    process.execPath,
    [
      cliPath,
      "--input",
      path.relative(repositoryRoot, fixturePath),
      "--output",
      path.relative(repositoryRoot, outputRoot),
    ],
    { cwd: repositoryRoot, stdio: ["ignore", "pipe", "inherit"] },
  );

  const cliReport = JSON.parse(fs.readFileSync(path.join(outputRoot, "report.json"), "utf8"));
  const readyDrafts = JSON.parse(
    fs.readFileSync(path.join(outputRoot, "tier-a-ready-drafts.json"), "utf8"),
  );
  const blocked = JSON.parse(
    fs.readFileSync(path.join(outputRoot, "blocked-candidates.json"), "utf8"),
  );

  require(JSON.stringify(cliReport.counts) === JSON.stringify(expectedCounts), "CLI report counts differ from library report");
  require(readyDrafts.length === expectedCounts.tier_a_ready, "CLI ready draft count mismatch");
  require(blocked.length === expectedCounts.candidates - expectedCounts.tier_a_ready, "CLI blocked candidate count mismatch");
  require(readyDrafts.every((draft) => draft.tier_a_published_at === null), "CLI artifact wrote Tier A publication time");
  require(readyDrafts.every((draft) => draft.publication_status === "not_published"), "CLI artifact changed publication status");
} finally {
  fs.rmSync(outputRoot, { recursive: true, force: true });
}

console.log(
  `Matsuri NCS-04 Tier A importer passed: candidates=${report.counts.candidates}, ready=${report.counts.tier_a_ready}, blocked_source=${report.counts.blocked_source}, blocked_identity=${report.counts.blocked_identity}, blocked_input=${report.counts.blocked_input}, published=${report.counts.published}.`,
);
