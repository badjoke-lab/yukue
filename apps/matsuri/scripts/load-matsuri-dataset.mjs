import fs from "node:fs";
import { fileURLToPath } from "node:url";

import {
  buildMatsuriCanonicalDataset,
  matsuriRecordFamilies,
} from "../src/data/matsuri-canonical-dataset.mjs";
import { applyMatsuriRecordOverrides } from "../src/data/matsuri-record-overrides.mjs";

export {
  applyMatsuriRecordOverrides,
  buildMatsuriCanonicalDataset,
  matsuriRecordFamilies,
};

const d1Directory = new URL("../../../data/public/matsuri/d1/", import.meta.url);
const f1Directory = new URL("../../../data/public/matsuri/f1/", import.meta.url);
const f2Directory = new URL("../../../data/public/matsuri/f2/", import.meta.url);

export const matsuriF1BatchFiles = [
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

export const matsuriF2MaintenanceFiles = [
  "maintenance-01.json",
  "maintenance-02.json",
  "maintenance-03.json",
  "maintenance-04.json",
  "maintenance-05.json",
  "maintenance-06.json",
  "maintenance-07.json",
  "maintenance-08.json",
  "maintenance-09.json",
  "maintenance-10.json",
  "maintenance-11.json",
  "maintenance-12.json",
  "maintenance-13.json",
];
export const matsuriF2CorrectionFiles = [
  "corrections-01.json",
  "corrections-02.json",
  "corrections-03.json",
  "corrections-04.json",
  "corrections-05.json",
  "corrections-06.json",
  "corrections-07.json",
  "corrections-08.json",
  "corrections-09.json",
];

function readJson(directory, fileName) {
  const filePath = fileURLToPath(new URL(fileName, directory));
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function loadMatsuriDataset() {
  const records = readJson(d1Directory, "records.json");
  const batches = matsuriF1BatchFiles.map((fileName) =>
    readJson(f1Directory, fileName),
  );
  const maintenance = matsuriF2MaintenanceFiles.map((fileName) =>
    readJson(f2Directory, fileName),
  );
  const corrections = matsuriF2CorrectionFiles.map((fileName) =>
    readJson(f2Directory, fileName),
  );

  const baseDataset = {
    entities: readJson(d1Directory, "entities.json"),
    places: readJson(d1Directory, "places.json"),
    stateSnapshots: readJson(d1Directory, "state-snapshots.json"),
    changeEvents: records.changeEvents,
    occurrences: records.occurrences,
    occurrenceSeries: records.occurrenceSeries,
    recurrencePatterns: records.recurrencePatterns,
    relations: records.relations,
    designations: records.designations,
    sources: records.sources,
    evidence: readJson(d1Directory, "evidence.json"),
    images: records.images,
  };

  return buildMatsuriCanonicalDataset(
    baseDataset,
    [...batches, ...maintenance],
    corrections,
  );
}
