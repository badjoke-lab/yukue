import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const contractPath = path.join(
  repositoryRoot,
  "config/yukue-future-site-seed-artifact-contract.json",
);
const artifactDirectory = path.resolve(
  repositoryRoot,
  process.env.YUKUE_SEED_ARTIFACT_DIR ?? ".artifacts/yukue-future-site-seeds",
);

function readJson(filePath) {
  assert(fs.existsSync(filePath), `Required JSON file is missing: ${filePath}`);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function assertObject(value, label) {
  assert(
    value !== null && typeof value === "object" && !Array.isArray(value),
    `${label} must be an object.`,
  );
}

function assertFields(record, fields, label) {
  assertObject(record, label);
  for (const field of fields) {
    assert(
      Object.hasOwn(record, field),
      `${label} is missing required field ${field}.`,
    );
  }
}

function assertStringArray(value, label) {
  assert(Array.isArray(value), `${label} must be an array.`);
  for (const item of value) {
    assert.equal(typeof item, "string", `${label} contains a non-string value.`);
  }
}

function assertBoundaryValues(actual, expected, label) {
  assertObject(actual, label);
  for (const [field, expectedValue] of Object.entries(expected)) {
    assert.equal(
      actual[field],
      expectedValue,
      `${label}.${field} must remain ${String(expectedValue)}.`,
    );
  }
}

const contract = readJson(contractPath);
assert.equal(contract.contract_version, 1, "Unexpected artifact contract version.");
assert.equal(
  contract.contract_id,
  "yukue-future-site-seed-artifacts",
  "Unexpected artifact contract ID.",
);

for (const fileName of contract.required_files) {
  const filePath = path.join(artifactDirectory, fileName);
  assert(fs.existsSync(filePath), `Required seed artifact is missing: ${fileName}`);
  assert(fs.statSync(filePath).isFile(), `Required seed artifact is not a file: ${fileName}`);
  assert(fs.statSync(filePath).size > 0, `Required seed artifact is empty: ${fileName}`);
}

const inventory = readJson(path.join(artifactDirectory, "inventory.json"));
const provenance = readJson(path.join(artifactDirectory, "provenance.json"));
const summaryText = fs.readFileSync(path.join(artifactDirectory, "summary.md"), "utf8");

assertFields(
  inventory,
  contract.inventory.required_top_level_fields,
  "inventory",
);
assert.equal(
  inventory.format_version,
  contract.inventory.format_version,
  "Inventory format_version changed without a contract version change.",
);
assert.equal(
  inventory.status,
  contract.inventory.status,
  "Inventory status changed outside the accepted candidate-only state.",
);
assert.equal(inventory.source_site_id, "matsuri", "Inventory source_site_id must remain matsuri.");
assertBoundaryValues(
  inventory.boundaries,
  contract.inventory.required_boundary_values,
  "inventory.boundaries",
);

assert(Array.isArray(inventory.sites), "Inventory sites must be an array.");
assert.deepEqual(
  [...inventory.sites.map((site) => site.site_id)].sort(),
  [...contract.inventory.required_site_ids].sort(),
  "Inventory site IDs changed without a contract change.",
);

const inventorySeeds = inventory.sites.flatMap((site) => site.seeds ?? []);
assert.equal(
  inventorySeeds.length,
  inventory.totals.seeds,
  "Inventory seed total does not match site seed records.",
);
assert.equal(
  new Set(inventorySeeds.map((seed) => seed.entity_id)).size,
  inventorySeeds.length,
  "Inventory contains duplicate seed Entity IDs.",
);

for (const seed of inventorySeeds) {
  assertFields(seed, contract.inventory.required_seed_fields, `inventory seed ${seed.entity_id}`);
  assert.equal(
    seed.seed_status,
    contract.inventory.required_seed_status,
    `Inventory seed ${seed.entity_id} status changed.`,
  );
  for (const field of [
    "prefectures",
    "municipalities",
    "default_place_ids",
    "place_ids",
    "official_urls",
    "source_ids",
    "identity_evidence_ids",
    "identity_source_ids",
    "approved_state_snapshot_ids",
    "relation_evidence_ids",
  ]) {
    assertStringArray(seed[field], `inventory seed ${seed.entity_id}.${field}`);
  }
  assert(Array.isArray(seed.relation_contexts), `Inventory seed ${seed.entity_id} relation_contexts must be an array.`);
  assert(seed.relation_contexts.length > 0, `Inventory seed ${seed.entity_id} has no Relation context.`);
}

assertFields(
  provenance,
  contract.provenance.required_top_level_fields,
  "provenance",
);
assert.equal(
  provenance.format_version,
  contract.provenance.format_version,
  "Provenance format_version changed without a contract version change.",
);
assert.equal(
  provenance.status,
  contract.provenance.status,
  "Provenance status changed outside the accepted candidate-only state.",
);
assert.equal(provenance.source_site_id, "matsuri", "Provenance source_site_id must remain matsuri.");
assert.equal(
  provenance.source_inventory_generated_at,
  inventory.generated_at,
  "Provenance does not identify the exact generated inventory.",
);
assertBoundaryValues(
  provenance.boundaries,
  contract.provenance.required_boundary_values,
  "provenance.boundaries",
);

assert(Array.isArray(provenance.seed_handoffs), "Provenance seed_handoffs must be an array.");
assert.equal(
  provenance.seed_handoffs.length,
  inventorySeeds.length,
  "Provenance handoff total does not match inventory seed total.",
);
assert.deepEqual(
  [...provenance.seed_handoffs.map((handoff) => handoff.entity_id)].sort(),
  [...inventorySeeds.map((seed) => seed.entity_id)].sort(),
  "Provenance handoff Entity IDs do not match inventory seed Entity IDs.",
);

for (const handoff of provenance.seed_handoffs) {
  assertFields(
    handoff,
    contract.provenance.required_handoff_fields,
    `provenance handoff ${handoff.entity_id}`,
  );
  assert.equal(
    handoff.target_site_review_required,
    true,
    `Provenance handoff ${handoff.entity_id} must require target-site review.`,
  );
  for (const field of [
    "place_ids",
    "identity_evidence_ids",
    "identity_source_ids",
    "approved_state_snapshot_ids",
    "state_evidence_ids",
    "relation_ids",
    "relation_evidence_ids",
    "matsuri_context_entity_ids",
  ]) {
    assertStringArray(handoff[field], `provenance handoff ${handoff.entity_id}.${field}`);
  }
}

assertObject(provenance.records, "provenance.records");
for (const family of contract.provenance.required_record_families) {
  assert(Array.isArray(provenance.records[family]), `Provenance record family ${family} must be an array.`);
  assert.equal(
    provenance.records[family].length,
    provenance.totals[family],
    `Provenance total for ${family} does not match record count.`,
  );
  assert.equal(
    new Set(provenance.records[family].map((record) => record.id)).size,
    provenance.records[family].length,
    `Provenance record family ${family} contains duplicate IDs.`,
  );
}

assert(summaryText.includes("Yukue Future-site Seed Inventory"), "summary.md has an unexpected heading.");
assert(
  summaryText.includes(`Total relation-backed seeds: ${inventory.totals.seeds}`),
  "summary.md does not preserve the inventory seed total.",
);

console.log(
  `Yukue future-site seed artifact contract passed: contract v${contract.contract_version}, ${inventorySeeds.length} seed(s), ${provenance.seed_handoffs.length} provenance handoff(s), ${contract.required_files.length} required file(s).`,
);
