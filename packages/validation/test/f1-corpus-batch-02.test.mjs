import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { validateDataset } from "../dist/index.js";

const d1Directory = new URL("../../../data/public/matsuri/d1/", import.meta.url);
const f1Directory = new URL("../../../data/public/matsuri/f1/", import.meta.url);
const batchFiles = ["batch-01.json", "batch-02.json"];

function readJson(directory, fileName) {
  const filePath = fileURLToPath(new URL(fileName, directory));
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadExpandedBundle() {
  const records = readJson(d1Directory, "records.json");
  const batches = batchFiles.map((fileName) => readJson(f1Directory, fileName));
  const batchRecords = (key) => batches.flatMap((batch) => batch[key]);

  return {
    entities: [
      ...readJson(d1Directory, "entities.json"),
      ...batchRecords("entities"),
    ],
    places: [...readJson(d1Directory, "places.json"), ...batchRecords("places")],
    stateSnapshots: [
      ...readJson(d1Directory, "state-snapshots.json"),
      ...batchRecords("stateSnapshots"),
    ],
    changeEvents: [...records.changeEvents, ...batchRecords("changeEvents")],
    occurrences: [...records.occurrences, ...batchRecords("occurrences")],
    occurrenceSeries: [
      ...records.occurrenceSeries,
      ...batchRecords("occurrenceSeries"),
    ],
    recurrencePatterns: [
      ...records.recurrencePatterns,
      ...batchRecords("recurrencePatterns"),
    ],
    relations: [...records.relations, ...batchRecords("relations")],
    designations: [...records.designations, ...batchRecords("designations")],
    sources: [...records.sources, ...batchRecords("sources")],
    evidence: [
      ...readJson(d1Directory, "evidence.json"),
      ...batchRecords("evidence"),
    ],
    images: [...records.images, ...batchRecords("images")],
  };
}

function countBy(records, key, value) {
  return records.filter((record) => record[key] === value).length;
}

test("F1 corpus batches 01 and 02 pass cross-record validation with D1", () => {
  const result = validateDataset(loadExpandedBundle());
  assert.equal(result.ok, true, JSON.stringify(result.errors, null, 2));
  assert.deepEqual(result.errors, []);
});

test("F1 corpus batch 02 adds festival, performance, organization, and history depth", () => {
  const batch = readJson(f1Directory, "batch-02.json");

  assert.equal(batch.entities.length, 7);
  assert.equal(countBy(batch.entities, "entity_type", "festival"), 3);
  assert.equal(countBy(batch.entities, "entity_type", "folk_performance"), 1);
  assert.equal(countBy(batch.entities, "entity_type", "organization"), 3);

  assert.equal(batch.stateSnapshots.length, 4);
  assert.equal(batch.occurrences.length, 3);
  assert.equal(batch.changeEvents.length, 1);
  assert.equal(batch.relations.length, 4);
  assert.equal(batch.evidence.length, 16);

  assert.ok(
    batch.relations.some(
      (relation) =>
        relation.source_entity_id === "fst-yamaga-toro-matsuri" &&
        relation.relation_type === "includes_performance" &&
        relation.target_entity_id === "fpf-yamaga-toro-odori",
    ),
  );

  assert.ok(
    batch.relations.some(
      (relation) =>
        relation.source_entity_id === "fpf-yamaga-toro-odori" &&
        relation.relation_type === "maintained_by" &&
        relation.target_entity_id === "org-yamaga-toro-odori-hozonkai",
    ),
  );

  assert.ok(
    batch.changeEvents.some(
      (event) =>
        event.event_type === "preservation_group_formed" &&
        event.subject_entity_ids.includes("fpf-yamaga-toro-odori"),
    ),
  );

  assert.ok(
    batch.occurrences.some(
      (occurrence) =>
        occurrence.id === "occ-yamaga-sennin-odori-2026" &&
        occurrence.outcome === "scheduled",
    ),
  );

  assert.equal(batch.images.length, 0);
});
