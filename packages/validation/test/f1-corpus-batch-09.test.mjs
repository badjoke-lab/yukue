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

test("F1 corpus batches 01 through 09 pass cross-record validation with D1", () => {
  const result = validateDataset(loadExpandedBundle());
  assert.equal(result.ok, true, JSON.stringify(result.errors, null, 2));
  assert.deepEqual(result.errors, []);
});

test("F1 corpus batch 09 preserves folk-performance continuity and uncertainty", () => {
  const batch = readJson(f1Directory, "batch-09.json");
  const context = readJson(f1Directory, "batch-09-context.json");

  assert.equal(batch.entities.length, 2);
  assert.equal(batch.places.length, 1);
  assert.equal(batch.stateSnapshots.length, 1);
  assert.equal(batch.changeEvents.length, 2);
  assert.equal(batch.occurrences.length, 0);
  assert.equal(batch.occurrenceSeries.length, 1);
  assert.equal(batch.recurrencePatterns.length, 1);
  assert.equal(batch.relations.length, 2);
  assert.equal(batch.sources.length, 3);
  assert.equal(batch.evidence.length, 9);
  assert.equal(batch.images.length, 0);

  assert.equal(context.entities.length, 1);
  assert.equal(context.entities[0].id, "shr-dainichireiki-jinja");
  assert.equal(context.entities[0].entity_type, "shrine");
  assert.equal(context.entities[0].primary_place_id, "plc-dainichireiki-jinja");
  assert.equal(context.places.length, 0);
  assert.equal(context.changeEvents.length, 0);
  assert.equal(context.relations.length, 0);
  assert.equal(context.evidence.length, 0);

  const performance = batch.entities.find(
    (entity) => entity.id === "fpf-dainichido-bugaku",
  );
  assert.equal(performance?.entity_type, "folk_performance");
  assert.equal(performance?.performance_kind, "ritual_performance");
  assert.equal(performance?.tradition_scope, "collective");
  assert.equal(performance?.forms.length, 9);

  const preservationGroup = batch.entities.find(
    (entity) => entity.id === "org-dainichido-bugaku-hozonkai",
  );
  assert.equal(preservationGroup?.entity_type, "organization");
  assert.equal(preservationGroup?.organization_kind, "preservation_group");

  const suspension = batch.changeEvents.find(
    (event) => event.id === "chg-dainichido-historical-suspension",
  );
  assert.equal(suspension?.event_type, "suspension_started");
  assert.equal("effective_period" in suspension, false);

  const restart = batch.changeEvents.find(
    (event) => event.id === "chg-dainichido-historical-restart",
  );
  assert.equal(restart?.event_type, "suspension_ended");
  assert.equal("effective_period" in restart, false);

  const currentState = batch.stateSnapshots.find(
    (snapshot) => snapshot.id === "sts-dainichido-current",
  );
  assert.equal(currentState?.state_code, "active");

  const recurrence = batch.recurrencePatterns.find(
    (pattern) => pattern.id === "rec-dainichido-annual",
  );
  assert.equal(recurrence?.pattern_type, "annual");
  assert.equal(recurrence?.rule_text_ja, "毎年1月2日");

  const maintainedBy = batch.relations.find(
    (relation) => relation.id === "rel-dainichido-maintained-by-hozonkai",
  );
  assert.equal(maintainedBy?.relation_type, "maintained_by");
  assert.equal(maintainedBy?.source_entity_id, "fpf-dainichido-bugaku");
  assert.equal(maintainedBy?.target_entity_id, "org-dainichido-bugaku-hozonkai");

  const performedAt = batch.relations.find(
    (relation) => relation.id === "rel-dainichido-performed-at-jinja",
  );
  assert.equal(performedAt?.relation_type, "performed_at");
  assert.equal(performedAt?.source_entity_id, "fpf-dainichido-bugaku");
  assert.equal(performedAt?.target_entity_id, "shr-dainichireiki-jinja");
});
