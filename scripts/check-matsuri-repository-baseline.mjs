import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  loadMatsuriDataset,
  matsuriF1BatchFiles,
  matsuriF2CorrectionFiles,
  matsuriF2MaintenanceFiles,
  matsuriRecordFamilies,
} from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const f2Directory = path.join(repositoryRoot, "data", "public", "matsuri", "f2");

function read(relativePath) {
  return fs.readFileSync(path.join(repositoryRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function parseIsoDay(value) {
  if (typeof value !== "string") return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(value);
  if (!match) return null;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return date.toISOString().slice(0, 10) === value ? date : null;
}

function assertExactKeys(record, expectedKeys, label) {
  const actual = Object.keys(record).sort();
  const expected = [...expectedKeys].sort();
  assert(
    actual.length === expected.length && actual.every((key, index) => key === expected[index]),
    `${label} keys differ. actual=${JSON.stringify(actual)} expected=${JSON.stringify(expected)}`,
  );
}

const baseline = readJson("config/matsuri-repository-baseline.json");
const analytics = readJson("config/matsuri-analytics-activation.json");
const jinjaGate = readJson("config/jinja-start-gate.json");
const projectStatus = read("docs/project-status.md");
const baselineDocument = read("docs/matsuri-repository-baseline.md");

assert(baseline.schema_version === "matsuri.repository-baseline.v1", "Unexpected baseline schema");
assert(parseIsoDay(baseline.observed_on), "Baseline observed_on must be a real YYYY-MM-DD day");
assert(baseline.status === "repository-maintenance-current", "Unexpected baseline status");

const projectStatusUpdatedMatch = /^\*\*Last updated:\*\* (\d{4}-\d{2}-\d{2})$/mu.exec(projectStatus);
assert(projectStatusUpdatedMatch, "Project status must declare Last updated");
assert(parseIsoDay(projectStatusUpdatedMatch[1]), "Project status Last updated must be a real day");

for (const marker of [
  "config/matsuri-repository-baseline.json",
  "F2-25 — Cloudflare Web Analytics activation — completed",
  "F2-26 — post-activation production deployment — completed",
  "F2-27 — production traffic verification — completed",
  "F2-28 — active next gate",
  "Actual Jinja start gate — blocked",
]) {
  assert(projectStatus.includes(marker), `Project status is missing ${marker}`);
}

for (const marker of [
  "config/matsuri-repository-baseline.json",
  "docs/project-status.md",
  "does not repeat the current count or boundary values",
]) {
  assert(baselineDocument.includes(marker), `Baseline document is missing ${marker}`);
}

const forbiddenNarrativeCountPatterns = [
  /\bF1 batches\s+\d+/u,
  /\bMaintenance bundles\s+\d+/u,
  /\bCorrection bundles\s+\d+/u,
  /\bCorrection records\s+\d+/u,
  /\bPublic Entities\s+\d+/u,
  /\bEntities without external links\s+\d+/u,
];
for (const [relativePath, document] of [
  ["docs/project-status.md", projectStatus],
  ["docs/matsuri-repository-baseline.md", baselineDocument],
]) {
  for (const pattern of forbiddenNarrativeCountPatterns) {
    assert(!pattern.test(document), `${relativePath} duplicates machine baseline counts (${pattern})`);
  }
}

const expectedCountKeys = [
  "f1_batches",
  "maintenance_bundles",
  "correction_bundles",
  "additive_application_slots",
  "correction_application_slots",
  "correction_records",
  "corrected_logical_ids",
  "public_entities",
  "entities_without_external_links",
];
const expectedBoundaryKeys = [
  "f2_25_owner_access",
  "f2_26_through_f2_28",
  "jinja_start_gate",
  "jinja_state_snapshots",
];
assertExactKeys(baseline.counts, expectedCountKeys, "Baseline counts");
assertExactKeys(baseline.boundaries, expectedBoundaryKeys, "Baseline boundaries");

const correctionBundles = matsuriF2CorrectionFiles.map((fileName) =>
  JSON.parse(fs.readFileSync(path.join(f2Directory, fileName), "utf8")),
);
let correctionRecords = 0;
const correctedLogicalIds = new Set();
for (const [bundleIndex, bundle] of correctionBundles.entries()) {
  for (const familyName of matsuriRecordFamilies) {
    const records = bundle[familyName] ?? [];
    assert(Array.isArray(records), `${matsuriF2CorrectionFiles[bundleIndex]} ${familyName} must be an array`);
    for (const record of records) {
      assert(record && typeof record.id === "string" && record.id.length > 0, "Correction record needs id");
      correctionRecords += 1;
      correctedLogicalIds.add(`${familyName}:${record.id}`);
    }
  }
}

const dataset = loadMatsuriDataset();
const actualCounts = {
  f1_batches: matsuriF1BatchFiles.length,
  maintenance_bundles: matsuriF2MaintenanceFiles.length,
  correction_bundles: matsuriF2CorrectionFiles.length,
  additive_application_slots: matsuriF1BatchFiles.length + matsuriF2MaintenanceFiles.length,
  correction_application_slots: matsuriF2CorrectionFiles.length,
  correction_records: correctionRecords,
  corrected_logical_ids: correctedLogicalIds.size,
  public_entities: dataset.entities.length,
  entities_without_external_links: dataset.entities.filter(
    (entity) => !Array.isArray(entity.external_links) || entity.external_links.length === 0,
  ).length,
};
for (const key of expectedCountKeys) {
  assert(Number.isInteger(baseline.counts[key]) && baseline.counts[key] >= 0, `Invalid count ${key}`);
  assert(baseline.counts[key] === actualCounts[key], `Stale count ${key}: recorded=${baseline.counts[key]} actual=${actualCounts[key]}`);
}

const actualBoundaries = {
  f2_25_owner_access:
    analytics.status === "pending-owner-access" && analytics.claims?.f2_25_complete === false
      ? "pending"
      : "not-pending",
  f2_26_through_f2_28:
    analytics.status === "pending-owner-access" ||
    analytics.status === "analytics-enabled" ||
    analytics.claims?.f2_26_complete === false
      ? "blocked"
      : "not-blocked",
  jinja_start_gate:
    jinjaGate.status === "blocked-by-matsuri-launch-closure" &&
    jinjaGate.claims?.jinja_start_gate_passed === false
      ? "blocked"
      : "not-blocked",
  jinja_state_snapshots: jinjaGate.seed_baseline?.approved_state_snapshots,
};
for (const key of expectedBoundaryKeys) {
  assert(
    baseline.boundaries[key] === actualBoundaries[key],
    `Stale boundary ${key}: recorded=${JSON.stringify(baseline.boundaries[key])} actual=${JSON.stringify(actualBoundaries[key])}`,
  );
}

console.log(
  `Matsuri repository baseline is current as of ${baseline.observed_on}; F2-25 through F2-27 are complete, F2-28 is active, the Jinja start gate remains blocked, and narrative documents do not duplicate machine counts.`,
);
