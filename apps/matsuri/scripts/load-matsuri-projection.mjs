import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { buildPublicProjection } from "@badjoke-lab/yukue-observation-core";

const d1Directory = new URL("../../../data/public/matsuri/d1/", import.meta.url);
const f1Directory = new URL("../../../data/public/matsuri/f1/", import.meta.url);

function readJson(directory, fileName) {
  const filePath = fileURLToPath(new URL(fileName, directory));
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function loadMatsuriProjection() {
  const records = readJson(d1Directory, "records.json");
  const batch01 = readJson(f1Directory, "batch-01.json");

  return buildPublicProjection({
    entities: [
      ...readJson(d1Directory, "entities.json"),
      ...batch01.entities,
    ],
    places: [...readJson(d1Directory, "places.json"), ...batch01.places],
    stateSnapshots: [
      ...readJson(d1Directory, "state-snapshots.json"),
      ...batch01.stateSnapshots,
    ],
    changeEvents: [...records.changeEvents, ...batch01.changeEvents],
    occurrences: [...records.occurrences, ...batch01.occurrences],
    occurrenceSeries: [
      ...records.occurrenceSeries,
      ...batch01.occurrenceSeries,
    ],
    recurrencePatterns: [
      ...records.recurrencePatterns,
      ...batch01.recurrencePatterns,
    ],
    relations: [...records.relations, ...batch01.relations],
    designations: [...records.designations, ...batch01.designations],
    sources: [...records.sources, ...batch01.sources],
    evidence: [
      ...readJson(d1Directory, "evidence.json"),
      ...batch01.evidence,
    ],
    images: [...records.images, ...batch01.images],
  });
}
