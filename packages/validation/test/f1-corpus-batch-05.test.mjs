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

test("F1 corpus batches 01 through 05 pass cross-record validation with D1", () => {
  const result = validateDataset(loadExpandedBundle());
  assert.equal(result.ok, true, JSON.stringify(result.errors, null, 2));
  assert.deepEqual(result.errors, []);
});

test("F1 corpus batch 05 records long-hiatus revival and recurrence depth", () => {
  const batch = readJson(f1Directory, "batch-05.json");

  assert.equal(batch.entities.length, 1);
  assert.equal(batch.places.length, 1);
  assert.equal(batch.stateSnapshots.length, 1);
  assert.equal(batch.changeEvents.length, 1);
  assert.equal(batch.occurrences.length, 2);
  assert.equal(batch.occurrenceSeries.length, 2);
  assert.equal(batch.recurrencePatterns.length, 2);
  assert.equal(batch.sources.length, 1);
  assert.equal(batch.evidence.length, 7);

  const revival = batch.changeEvents.find(
    (event) => event.id === "chg-nunobashi-revival-1996",
  );
  assert.equal(revival?.event_type, "revival_completed");
  assert.deepEqual(revival?.subject_entity_ids, ["fst-nunobashi-kanjoe"]);
  assert.equal(revival?.effective_period?.start, "1996");

  const revivalOccurrence = batch.occurrences.find(
    (occurrence) => occurrence.id === "occ-nunobashi-1996-revival",
  );
  assert.equal(revivalOccurrence?.outcome, "held");
  assert.equal(revivalOccurrence?.temporal_extent.precision, "year");
  assert.equal(revivalOccurrence?.series_id, "ser-nunobashi-triennial");

  const nunobashiPattern = batch.recurrencePatterns.find(
    (pattern) => pattern.id === "rec-nunobashi-triennial",
  );
  assert.equal(nunobashiPattern?.pattern_type, "triennial");

  const suneoriPattern = batch.recurrencePatterns.find(
    (pattern) => pattern.id === "rec-suneori-amagoi-quadrennial",
  );
  assert.equal(suneoriPattern?.pattern_type, "quadrennial");

  const suneoriSchedule = batch.occurrences.find(
    (occurrence) => occurrence.id === "occ-suneori-2028-schedule",
  );
  assert.equal(suneoriSchedule?.subject_entity_id, "fst-suneori-amagoi");
  assert.equal(suneoriSchedule?.outcome, "scheduled");
  assert.equal(suneoriSchedule?.temporal_extent.display_text_ja, "2028年夏");

  assert.equal(batch.images.length, 0);
});
