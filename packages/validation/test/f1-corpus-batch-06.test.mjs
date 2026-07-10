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

test("F1 corpus batches 01 through 06 pass cross-record validation with D1", () => {
  const result = validateDataset(loadExpandedBundle());
  assert.equal(result.ok, true, JSON.stringify(result.errors, null, 2));
  assert.deepEqual(result.errors, []);
});

test("F1 corpus batch 06 separates shrine disaster recovery from festival continuity", () => {
  const batch = readJson(f1Directory, "batch-06.json");

  assert.equal(batch.entities.length, 2);
  assert.equal(batch.places.length, 2);
  assert.equal(batch.stateSnapshots.length, 1);
  assert.equal(batch.changeEvents.length, 2);
  assert.equal(batch.occurrences.length, 1);
  assert.equal(batch.occurrenceSeries.length, 1);
  assert.equal(batch.recurrencePatterns.length, 1);
  assert.equal(batch.relations.length, 1);
  assert.equal(batch.sources.length, 3);
  assert.equal(batch.evidence.length, 7);

  const disasterEvent = batch.changeEvents.find(
    (event) => event.id === "chg-aso-jinja-disaster-interruption-2016",
  );
  assert.equal(disasterEvent?.event_type, "disaster_interruption");
  assert.deepEqual(disasterEvent?.subject_entity_ids, ["shr-aso-jinja"]);
  assert.equal(
    disasterEvent?.subject_entity_ids.includes("fst-aso-onda-matsuri"),
    false,
  );

  const restorationEnd = batch.changeEvents.find(
    (event) => event.id === "chg-aso-jinja-restoration-ended-2025",
  );
  assert.equal(restorationEnd?.event_type, "other");
  assert.equal(restorationEnd?.announced_at, "2025-02-17");
  assert.deepEqual(restorationEnd?.subject_entity_ids, ["shr-aso-jinja"]);

  const currentState = batch.stateSnapshots.find(
    (snapshot) => snapshot.id === "sts-aso-onda-current",
  );
  assert.equal(currentState?.entity_id, "fst-aso-onda-matsuri");
  assert.equal(currentState?.state_code, "active");

  const currentOccurrence = batch.occurrences.find(
    (occurrence) => occurrence.id === "occ-aso-onda-2026-schedule",
  );
  assert.equal(currentOccurrence?.subject_entity_id, "fst-aso-onda-matsuri");
  assert.equal(currentOccurrence?.temporal_extent.start, "2026-07-28");
  assert.equal(currentOccurrence?.outcome, "scheduled");

  const shrineRelation = batch.relations.find(
    (relation) => relation.id === "rel-aso-onda-dedicated-at-jinja",
  );
  assert.equal(shrineRelation?.source_entity_id, "fst-aso-onda-matsuri");
  assert.equal(shrineRelation?.relation_type, "dedicated_at");
  assert.equal(shrineRelation?.target_entity_id, "shr-aso-jinja");

  assert.equal(batch.images.length, 0);
});
