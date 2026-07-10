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
  "batch-08.json",
  "batch-09.json",
  "batch-09-context.json",
  "batch-10.json",
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

test("F1 corpus batches 01 through 10 pass cross-record validation with D1", () => {
  const result = validateDataset(loadExpandedBundle());
  assert.equal(result.ok, true, JSON.stringify(result.errors, null, 2));
  assert.deepEqual(result.errors, []);
});

test("F1 corpus batch 10 adds a three-year folk-performance continuity sequence", () => {
  const batch = readJson(f1Directory, "batch-10.json");

  assert.equal(batch.entities.length, 2);
  assert.equal(batch.places.length, 1);
  assert.equal(batch.stateSnapshots.length, 1);
  assert.equal(batch.changeEvents.length, 2);
  assert.equal(batch.occurrences.length, 3);
  assert.equal(batch.occurrenceSeries.length, 1);
  assert.equal(batch.recurrencePatterns.length, 1);
  assert.equal(batch.relations.length, 1);
  assert.equal(batch.sources.length, 3);
  assert.equal(batch.evidence.length, 10);
  assert.equal(batch.images.length, 0);

  const performance = batch.entities.find(
    (entity) => entity.id === "fpf-yosakoi-soran-performance",
  );
  assert.equal(performance?.entity_type, "folk_performance");
  assert.equal(performance?.performance_kind, "dance");
  assert.equal(performance?.tradition_scope, "collective");
  assert.deepEqual(performance?.forms, ["パレード形式", "ステージ形式"]);

  const organization = batch.entities.find(
    (entity) => entity.id === "org-yosakoi-soran-committee",
  );
  assert.equal(organization?.entity_type, "organization");
  assert.equal(organization?.organization_kind, "festival_committee");

  const occurrenceOutcomes = batch.occurrences
    .map((occurrence) => [occurrence.temporal_extent.start, occurrence.outcome])
    .sort((a, b) => a[0].localeCompare(b[0]));
  assert.deepEqual(occurrenceOutcomes, [
    ["2020", "cancelled"],
    ["2021", "cancelled"],
    ["2022", "held"],
  ]);

  for (const occurrence of batch.occurrences) {
    assert.equal(occurrence.subject_entity_id, "fpf-yosakoi-soran-performance");
    assert.equal(occurrence.series_id, "ser-yosakoi-soran-annual");
    assert.deepEqual(occurrence.organizer_entity_ids, [
      "org-yosakoi-soran-committee",
    ]);
  }

  const suspension = batch.changeEvents.find(
    (event) => event.id === "chg-yosakoi-soran-suspension-2020",
  );
  assert.equal(suspension?.event_type, "suspension_started");
  assert.equal(suspension?.effective_period?.start, "2020");

  const restart = batch.changeEvents.find(
    (event) => event.id === "chg-yosakoi-soran-suspension-ended-2022",
  );
  assert.equal(restart?.event_type, "suspension_ended");
  assert.equal(restart?.effective_period?.start, "2022");

  const currentState = batch.stateSnapshots.find(
    (snapshot) => snapshot.id === "sts-yosakoi-soran-current",
  );
  assert.equal(currentState?.state_code, "active");

  const recurrence = batch.recurrencePatterns.find(
    (pattern) => pattern.id === "rec-yosakoi-soran-annual",
  );
  assert.equal(recurrence?.pattern_type, "annual");
  assert.equal(recurrence?.rule_text_ja, "毎年6月");

  const organizedBy = batch.relations.find(
    (relation) => relation.id === "rel-yosakoi-soran-organized-by-committee",
  );
  assert.equal(organizedBy?.relation_type, "organized_by");
  assert.equal(organizedBy?.source_entity_id, "fpf-yosakoi-soran-performance");
  assert.equal(organizedBy?.target_entity_id, "org-yosakoi-soran-committee");
});
