import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { validateDataset } from "../dist/index.js";

const d1Directory = new URL("../../../data/public/matsuri/d1/", import.meta.url);
const f1Directory = new URL("../../../data/public/matsuri/f1/", import.meta.url);

function readJson(directory, fileName) {
  const filePath = fileURLToPath(new URL(fileName, directory));
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadExpandedBundle() {
  const records = readJson(d1Directory, "records.json");
  const batch01 = readJson(f1Directory, "batch-01.json");

  return {
    entities: [...readJson(d1Directory, "entities.json"), ...batch01.entities],
    places: [...readJson(d1Directory, "places.json"), ...batch01.places],
    stateSnapshots: [
      ...readJson(d1Directory, "state-snapshots.json"),
      ...batch01.stateSnapshots,
    ],
    changeEvents: [...records.changeEvents, ...batch01.changeEvents],
    occurrences: [...records.occurrences, ...batch01.occurrences],
    occurrenceSeries: [
      ...records.occurrenceSeries,
      ...batch01.occurrenceSeries,
    ],
    recurrencePatterns: [
      ...records.recurrencePatterns,
      ...batch01.recurrencePatterns,
    ],
    relations: [...records.relations, ...batch01.relations],
    designations: [...records.designations, ...batch01.designations],
    sources: [...records.sources, ...batch01.sources],
    evidence: [...readJson(d1Directory, "evidence.json"), ...batch01.evidence],
    images: [...records.images, ...batch01.images],
  };
}

function countBy(records, key, value) {
  return records.filter((record) => record[key] === value).length;
}

test("F1 corpus batch 01 passes cross-record validation with D1 baseline", () => {
  const result = validateDataset(loadExpandedBundle());
  assert.equal(result.ok, true, JSON.stringify(result.errors, null, 2));
  assert.deepEqual(result.errors, []);
});

test("F1 corpus batch 01 expands records with balanced observation coverage", () => {
  const batch = readJson(f1Directory, "batch-01.json");

  assert.equal(batch.entities.length, 5);
  assert.equal(countBy(batch.entities, "entity_type", "festival"), 2);
  assert.equal(countBy(batch.entities, "entity_type", "folk_performance"), 1);
  assert.equal(countBy(batch.entities, "entity_type", "organization"), 1);
  assert.equal(countBy(batch.entities, "entity_type", "shrine"), 1);

  assert.equal(batch.stateSnapshots.length, 3);
  assert.ok(
    batch.stateSnapshots.every((snapshot) => snapshot.review_status === "approved"),
  );
  assert.equal(batch.occurrences.length, 2);
  assert.equal(batch.changeEvents.length, 1);
  assert.equal(batch.relations.length, 2);
  assert.equal(batch.evidence.length, 12);

  assert.ok(
    batch.relations.some(
      (relation) =>
        relation.source_entity_id === "fst-tokushima-awaodori" &&
        relation.relation_type === "organized_by" &&
        relation.target_entity_id === "org-awaodori-mirai",
    ),
  );

  assert.ok(
    batch.relations.some(
      (relation) =>
        relation.source_entity_id === "fst-chichibu-yomatsuri" &&
        relation.relation_type === "ritually_associated_with" &&
        relation.target_entity_id === "shr-chichibu-jinja",
    ),
  );

  assert.ok(
    batch.changeEvents.some(
      (event) =>
        event.event_type === "designation_added" &&
        event.subject_entity_ids.includes("fpf-gujo-odori"),
    ),
  );

  assert.equal(batch.images.length, 0);
});
