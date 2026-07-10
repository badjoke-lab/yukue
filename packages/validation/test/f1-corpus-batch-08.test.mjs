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

test("F1 corpus batches 01 through 08 pass cross-record validation with D1", () => {
  const result = validateDataset(loadExpandedBundle());
  assert.equal(result.ok, true, JSON.stringify(result.errors, null, 2));
  assert.deepEqual(result.errors, []);
});

test("F1 corpus batch 08 adds organization-heavy anniversary structure", () => {
  const batch = readJson(f1Directory, "batch-08.json");

  assert.equal(batch.entities.length, 3);
  assert.equal(
    batch.entities.filter((entity) => entity.entity_type === "organization").length,
    2,
  );
  assert.equal(batch.changeEvents.length, 1);
  assert.equal(batch.occurrences.length, 1);
  assert.equal(batch.relations.length, 3);
  assert.equal(batch.sources.length, 1);
  assert.equal(batch.evidence.length, 8);

  const committee = batch.entities.find(
    (entity) => entity.id === "org-hirosaki-neputa-300-committee",
  );
  assert.equal(committee?.entity_type, "organization");
  assert.equal(committee?.organization_kind, "festival_committee");

  const participantCouncil = batch.entities.find(
    (entity) => entity.id === "org-hirosaki-neputa-participant-council",
  );
  assert.equal(participantCouncil?.entity_type, "organization");
  assert.equal(participantCouncil?.organization_kind, "association");

  const relationTypes = batch.relations.map((relation) => relation.relation_type).sort();
  assert.deepEqual(relationTypes, [
    "organized_by",
    "part_of_tradition",
    "supported_by",
  ]);

  const organizedBy = batch.relations.find(
    (relation) => relation.id === "rel-hirosaki-neputa-300-organized-by-committee",
  );
  assert.equal(organizedBy?.source_entity_id, "fst-hirosaki-neputa-300");
  assert.equal(organizedBy?.target_entity_id, "org-hirosaki-neputa-300-committee");

  const supportedBy = batch.relations.find(
    (relation) => relation.id === "rel-hirosaki-neputa-300-supported-by-council",
  );
  assert.equal(
    supportedBy?.target_entity_id,
    "org-hirosaki-neputa-participant-council",
  );

  const anniversaryOccurrence = batch.occurrences.find(
    (occurrence) => occurrence.id === "occ-hirosaki-neputa-300-2022",
  );
  assert.equal(anniversaryOccurrence?.outcome, "held");
  assert.equal(anniversaryOccurrence?.scale, "expanded");
  assert.deepEqual(anniversaryOccurrence?.organizer_entity_ids, [
    "org-hirosaki-neputa-300-committee",
  ]);

  const anniversaryChange = batch.changeEvents.find(
    (event) => event.id === "chg-hirosaki-neputa-300-anniversary-2022",
  );
  assert.deepEqual(anniversaryChange?.subject_entity_ids, [
    "fst-hirosaki-neputa",
    "fst-hirosaki-neputa-300",
  ]);
  assert.equal(anniversaryChange?.effective_period?.start, "2022");
  assert.equal(anniversaryChange?.effective_period?.end, "2022");

  assert.equal(batch.images.length, 0);
});
