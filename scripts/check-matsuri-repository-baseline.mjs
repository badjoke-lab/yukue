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

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repositoryRoot, relativePath), "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
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

assert(
  baseline.schema_version === "matsuri.repository-baseline.v1",
  "Matsuri repository baseline schema_version must be matsuri.repository-baseline.v1.",
);
assert(
  /^\d{4}-\d{2}-\d{2}$/u.test(baseline.observed_on),
  "Matsuri repository baseline observed_on must use YYYY-MM-DD.",
);
assert(
  baseline.status === "repository-maintenance-current",
  "Matsuri repository baseline status must remain repository-maintenance-current.",
);

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

assertExactKeys(baseline.counts, expectedCountKeys, "Matsuri repository baseline counts");
assertExactKeys(baseline.boundaries, expectedBoundaryKeys, "Matsuri repository baseline boundaries");

const correctionBundles = matsuriF2CorrectionFiles.map((fileName) =>
  JSON.parse(fs.readFileSync(path.join(f2Directory, fileName), "utf8")),
);
let correctionRecords = 0;
const correctedLogicalIds = new Set();

for (const [bundleIndex, bundle] of correctionBundles.entries()) {
  for (const familyName of matsuriRecordFamilies) {
    const records = bundle[familyName] ?? [];
    assert(
      Array.isArray(records),
      `Correction bundle ${matsuriF2CorrectionFiles[bundleIndex]} family ${familyName} must be an array.`,
    );

    for (const record of records) {
      assert(
        record && typeof record.id === "string" && record.id.length > 0,
        `Correction bundle ${matsuriF2CorrectionFiles[bundleIndex]} family ${familyName} contains a record without a stable id.`,
      );
      correctionRecords += 1;
      correctedLogicalIds.add(`${familyName}:${record.id}`);
    }
  }
}

const dataset = loadMatsuriDataset();
const entitiesWithoutExternalLinks = dataset.entities.filter(
  (entity) => !Array.isArray(entity.external_links) || entity.external_links.length === 0,
).length;

const actualCounts = {
  f1_batches: matsuriF1BatchFiles.length,
  maintenance_bundles: matsuriF2MaintenanceFiles.length,
  correction_bundles: matsuriF2CorrectionFiles.length,
  additive_application_slots: matsuriF1BatchFiles.length + matsuriF2MaintenanceFiles.length,
  correction_application_slots: matsuriF2CorrectionFiles.length,
  correction_records: correctionRecords,
  corrected_logical_ids: correctedLogicalIds.size,
  public_entities: dataset.entities.length,
  entities_without_external_links: entitiesWithoutExternalLinks,
};

for (const key of expectedCountKeys) {
  assert(
    Number.isInteger(baseline.counts[key]) && baseline.counts[key] >= 0,
    `Matsuri repository baseline count ${key} must be a non-negative integer.`,
  );
  assert(
    baseline.counts[key] === actualCounts[key],
    `Matsuri repository baseline count ${key} is stale: recorded=${baseline.counts[key]} actual=${actualCounts[key]}.`,
  );
}

const actualBoundaries = {
  f2_25_owner_access:
    analytics.status === "pending-owner-access" && analytics.claims?.f2_25_complete === false
      ? "pending"
      : "not-pending",
  f2_26_through_f2_28:
    analytics.post_activation_deployment?.completed === false &&
    analytics.traffic_verification?.completed === false &&
    analytics.claims?.f2_26_complete === false &&
    analytics.claims?.f2_27_complete === false &&
    jinjaGate.prerequisites?.matsuri_f2_28_complete === false
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
    `Matsuri repository baseline boundary ${key} is stale: recorded=${JSON.stringify(baseline.boundaries[key])} actual=${JSON.stringify(actualBoundaries[key])}.`,
  );
}

console.log(
  `Matsuri repository baseline is current: ${actualCounts.f1_batches} F1 batches, ${actualCounts.maintenance_bundles} maintenance bundles, ${actualCounts.correction_bundles} correction bundles, ${actualCounts.correction_records} correction records across ${actualCounts.corrected_logical_ids} logical IDs, and ${actualCounts.public_entities} public Entities.`,
);
