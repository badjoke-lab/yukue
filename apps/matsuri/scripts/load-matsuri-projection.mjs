import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { buildPublicProjection } from "@badjoke-lab/yukue-observation-core";

const dataDirectory = new URL("../../../data/public/matsuri/d1/", import.meta.url);

function readJson(fileName) {
  const filePath = fileURLToPath(new URL(fileName, dataDirectory));
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function loadMatsuriProjection() {
  const records = readJson("records.json");

  return buildPublicProjection({
    entities: readJson("entities.json"),
    places: readJson("places.json"),
    stateSnapshots: readJson("state-snapshots.json"),
    changeEvents: records.changeEvents,
    occurrences: records.occurrences,
    occurrenceSeries: records.occurrenceSeries,
    recurrencePatterns: records.recurrencePatterns,
    relations: records.relations,
    designations: records.designations,
    sources: records.sources,
    evidence: readJson("evidence.json"),
    images: records.images,
  });
}
