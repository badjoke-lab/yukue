import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { validateDataset } from "../dist/index.js";

const d1Directory = new URL("../../../data/public/matsuri/d1/", import.meta.url);
const f1Directory = new URL("../../../data/public/matsuri/f1/", import.meta.url);
const batchFiles = ["batch-01.json", "batch-02.json", "batch-03.json"];

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

test("F1 corpus batches 01 through 03 pass cross-record validation with D1", () => {
  const result = validateDataset(loadExpandedBundle());
  assert.equal(result.ok, true, JSON.stringify(result.errors, null, 2));
  assert.deepEqual(result.errors, []);
});

test("F1 corpus batch 03 prioritizes occurrence and change-history depth", () => {
  const batch = readJson(f1Directory, "batch-03.json");

  assert.equal(batch.entities.length, 5);
  assert.equal(batch.stateSnapshots.length, 2);
  assert.equal(batch.occurrences.length, 6);
  assert.equal(batch.changeEvents.length, 3);
  assert.equal(batch.relations.length, 3);
  assert.equal(batch.evidence.length, 16);

  const kawagoeOutcomes = batch.occurrences
    .filter((occurrence) => occurrence.subject_entity_id === "fst-kawagoe-matsuri")
    .map((occurrence) => occurrence.outcome);
  assert.deepEqual(kawagoeOutcomes, ["cancelled", "cancelled", "scheduled"]);

  const hakataHistory = batch.occurrences.filter(
    (occurrence) => occurrence.subject_entity_id === "fst-hakata-gion-yamakasa",
  );
  assert.equal(hakataHistory.length, 3);
  assert.equal(hakataHistory[0].outcome, "partially_held");
  assert.equal(hakataHistory[0].scale, "reduced");
  assert.equal(hakataHistory[1].outcome, "partially_held");
  assert.equal(hakataHistory[2].outcome, "scheduled");

  assert.ok(
    batch.changeEvents.some(
      (event) =>
        event.event_type === "suspension_started" &&
        event.subject_entity_ids.includes("fst-kawagoe-matsuri"),
    ),
  );

  assert.equal(
    batch.changeEvents.filter(
      (event) =>
        event.event_type === "format_changed" &&
        event.subject_entity_ids.includes("fst-hakata-gion-yamakasa"),
    ).length,
    2,
  );

  assert.ok(
    batch.relations.some(
      (relation) =>
        relation.source_entity_id === "fst-hakata-gion-yamakasa" &&
        relation.relation_type === "ritually_associated_with" &&
        relation.target_entity_id === "shr-kushida-jinja",
    ),
  );

  assert.equal(batch.images.length, 0);
});
