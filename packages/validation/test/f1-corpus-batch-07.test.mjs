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
  "batch-05.json",
  "batch-06.json",
  "batch-07.json",
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

test("F1 corpus batches 01 through 07 pass cross-record validation with D1", () => {
  const result = validateDataset(loadExpandedBundle());
  assert.equal(result.ok, true, JSON.stringify(result.errors, null, 2));
  assert.deepEqual(result.errors, []);
});

test("F1 corpus batch 07 records two cancelled editions followed by a held return edition", () => {
  const batch = readJson(f1Directory, "batch-07.json");

  assert.equal(batch.entities.length, 1);
  assert.equal(batch.places.length, 1);
  assert.equal(batch.stateSnapshots.length, 1);
  assert.equal(batch.changeEvents.length, 2);
  assert.equal(batch.occurrences.length, 3);
  assert.equal(batch.occurrenceSeries.length, 1);
  assert.equal(batch.recurrencePatterns.length, 1);
  assert.equal(batch.sources.length, 2);
  assert.equal(batch.evidence.length, 8);

  const outcomes = batch.occurrences.map((occurrence) => occurrence.outcome);
  assert.deepEqual(outcomes, ["cancelled", "cancelled", "held"]);

  const years = batch.occurrences.map((occurrence) => occurrence.temporal_extent.start);
  assert.deepEqual(years, ["2020", "2021", "2022"]);

  const suspensionStarted = batch.changeEvents.find(
    (event) => event.id === "chg-hirosaki-neputa-suspension-2020",
  );
  assert.equal(suspensionStarted?.event_type, "suspension_started");
  assert.equal(suspensionStarted?.effective_period?.start, "2020");

  const suspensionEnded = batch.changeEvents.find(
    (event) => event.id === "chg-hirosaki-neputa-suspension-ended-2022",
  );
  assert.equal(suspensionEnded?.event_type, "suspension_ended");
  assert.equal(suspensionEnded?.effective_period?.start, "2022");

  const currentState = batch.stateSnapshots.find(
    (snapshot) => snapshot.id === "sts-hirosaki-neputa-current",
  );
  assert.equal(currentState?.state_code, "active");

  const recurrence = batch.recurrencePatterns.find(
    (pattern) => pattern.id === "rec-hirosaki-neputa-annual",
  );
  assert.equal(recurrence?.pattern_type, "annual");
  assert.equal(recurrence?.rule_text_ja, "毎年8月1日から7日");

  assert.equal(batch.images.length, 0);
});
