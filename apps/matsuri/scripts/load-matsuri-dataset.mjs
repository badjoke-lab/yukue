import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { buildMatsuriCanonicalDataset, matsuriRecordFamilies } from "../src/data/matsuri-canonical-dataset.mjs";
import { applyMatsuriRecordOverrides } from "../src/data/matsuri-record-overrides.mjs";
export { applyMatsuriRecordOverrides, buildMatsuriCanonicalDataset, matsuriRecordFamilies };
const d1Directory = new URL("../../../data/public/matsuri/d1/", import.meta.url);
const f1Directory = new URL("../../../data/public/matsuri/f1/", import.meta.url);
const f2Directory = new URL("../../../data/public/matsuri/f2/", import.meta.url);
export const matsuriF1BatchFiles = ["batch-01.json","batch-02.json","batch-03.json","batch-04.json","batch-05.json","batch-06.json","batch-07.json","batch-08.json","batch-09.json","batch-09-context.json","batch-10.json","batch-11.json","batch-12.json"];
export const matsuriF2MaintenanceFiles = ["maintenance-01.json","maintenance-02.json","maintenance-03.json","maintenance-04.json","maintenance-05.json","maintenance-06.json","maintenance-07.json","maintenance-08.json","maintenance-09.json","maintenance-10.json","maintenance-11.json","maintenance-12.json","maintenance-13.json","maintenance-14.json","maintenance-15.json","maintenance-16.json","maintenance-17.json","maintenance-18.json","maintenance-19.json","maintenance-20.json","maintenance-21.json","maintenance-22.json","maintenance-23.json","maintenance-24.json","maintenance-25.json","maintenance-26.json","maintenance-27.json","maintenance-28.json","maintenance-29.json","maintenance-30.json","maintenance-31.json","maintenance-32.json","maintenance-33.json","maintenance-34.json","maintenance-35.json","maintenance-36.json","maintenance-37.json","maintenance-38.json","maintenance-39.json","maintenance-40.json","maintenance-41.json","maintenance-42.json","maintenance-43.json","maintenance-44.json","maintenance-45.json","maintenance-46.json","maintenance-47.json","maintenance-48.json","maintenance-49.json","maintenance-50.json","maintenance-51.json","maintenance-52.json","maintenance-53.json","maintenance-54.json","maintenance-55.json","maintenance-56.json","maintenance-57.json"];
export const matsuriF2CorrectionFiles = ["corrections-01.json","corrections-02.json","corrections-03.json","corrections-04.json","corrections-05.json","corrections-06.json","corrections-07.json","corrections-08.json","corrections-09.json","corrections-10.json","corrections-11.json","corrections-12.json","corrections-13.json","corrections-14.json","corrections-15.json","corrections-16.json","corrections-17.json"];
function readJson(directory, fileName) { const filePath = fileURLToPath(new URL(fileName, directory)); return JSON.parse(fs.readFileSync(filePath, "utf8")); }
export function loadMatsuriDataset() {
  const records = readJson(d1Directory, "records.json");
  const batches = matsuriF1BatchFiles.map((fileName) => readJson(f1Directory, fileName));
  const maintenance = matsuriF2MaintenanceFiles.map((fileName) => readJson(f2Directory, fileName));
  const corrections = matsuriF2CorrectionFiles.map((fileName) => readJson(f2Directory, fileName));
  const baseDataset = { entities: readJson(d1Directory, "entities.json"), places: readJson(d1Directory, "places.json"), stateSnapshots: readJson(d1Directory, "state-snapshots.json"), changeEvents: records.changeEvents, occurrences: records.occurrences, occurrenceSeries: records.occurrenceSeries, recurrencePatterns: records.recurrencePatterns, relations: records.relations, designations: records.designations, sources: records.sources, evidence: readJson(d1Directory, "evidence.json"), images: records.images };
  return buildMatsuriCanonicalDataset(baseDataset, [...batches, ...maintenance], corrections);
}
