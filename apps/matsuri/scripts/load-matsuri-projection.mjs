import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { buildPublicProjection } from "@badjoke-lab/yukue-observation-core";

const d1Directory = new URL("../../../data/public/matsuri/d1/", import.meta.url);
const f1Directory = new URL("../../../data/public/matsuri/f1/", import.meta.url);
const f1BatchFiles = [
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

export function loadMatsuriProjection() {
  const records = readJson(d1Directory, "records.json");
  const batches = f1BatchFiles.map((fileName) => readJson(f1Directory, fileName));
  const batchRecords = (key) => batches.flatMap((batch) => batch[key]);

  return buildPublicProjection({
    entities: [
      ...readJson(d1Directory, "entities.json"),
      ...batchRecords("entities"),
    ],
    places: [
      ...readJson(d1Directory, "places.json"),
      ...batchRecords("places"),
    ],
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
  });
}
