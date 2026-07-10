import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { validateDataset } from "../dist/index.js";

const d1Directory = new URL("../../../data/public/matsuri/d1/", import.meta.url);
const f1Directory = new URL("../../../data/public/matsuri/f1/", import.meta.url);
const batchFiles = [
  "batch-01.json",
  "batch-02.json",
  "batch-03.json",
  "batch-04.json",
];

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

test("F1 corpus batches 01 through 04 pass cross-record validation with D1", () => {
  const result = validateDataset(loadExpandedBundle());
  assert.equal(result.ok, true, JSON.stringify(result.errors, null, 2));
  assert.deepEqual(result.errors, []);
});

test("F1 corpus batch 04 deepens existing entities without adding shallow entities", () => {
  const batch = readJson(f1Directory, "batch-04.json");

  assert.equal(batch.entities.length, 0);
  assert.equal(batch.places.length, 0);
  assert.equal(batch.stateSnapshots.length, 0);
  assert.equal(batch.changeEvents.length, 2);
  assert.equal(batch.occurrences.length, 1);
  assert.equal(batch.sources.length, 2);
  assert.equal(batch.evidence.length, 3);

  const somaScheduleChange = batch.changeEvents.find(
    (event) => event.id === "chg-soma-schedule-rule-2024",
  );
  assert.equal(somaScheduleChange?.event_type, "schedule_rule_changed");
  assert.deepEqual(somaScheduleChange?.subject_entity_ids, ["fst-soma-nomaoi"]);
  assert.equal(somaScheduleChange?.decided_at, "2023-11-03");
  assert.equal(somaScheduleChange?.effective_period?.start, "2024");

  const takayamaRevival = batch.changeEvents.find(
    (event) => event.id === "chg-gion-takayama-revival-2022",
  );
  assert.equal(takayamaRevival?.event_type, "revival_completed");
  assert.deepEqual(takayamaRevival?.subject_entity_ids, ["unt-gion-takayama"]);
  assert.equal(takayamaRevival?.effective_period?.start, "2022");

  const takayamaReturn = batch.occurrences.find(
    (occurrence) => occurrence.id === "occ-gion-takayama-2022-return",
  );
  assert.equal(takayamaReturn?.subject_entity_id, "unt-gion-takayama");
  assert.equal(takayamaReturn?.occurrence_type, "procession");
  assert.equal(takayamaReturn?.temporal_extent.start, "2022-07-24");
  assert.equal(takayamaReturn?.outcome, "held");

  assert.equal(batch.images.length, 0);
});
