import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { buildPublicProjection } from "@badjoke-lab/yukue-observation-core";
import { buildSearchIndexRecords } from "@badjoke-lab/yukue-search";
import * as pagefind from "pagefind";

const dataDirectory = new URL("../../../data/public/matsuri/d1/", import.meta.url);
const outputDirectory = fileURLToPath(new URL("../dist/pagefind/", import.meta.url));

function readJson(fileName) {
  const filePath = fileURLToPath(new URL(fileName, dataDirectory));
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadProjection() {
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

function resolveRecordUrl(record) {
  if (record.id === "fst-suneori-amagoi") {
    return "/festivals/suneori-amagoi/";
  }

  const entityType = record.filters.entity_type[0];
  if (entityType === "folk_performance") {
    return `/performances/#${record.id}`;
  }
  return `/festivals/#${record.id}`;
}

function assertNoErrors(stage, errors) {
  if (Array.isArray(errors) && errors.length > 0) {
    throw new Error(`${stage} failed:\n${errors.join("\n")}`);
  }
}

const projection = loadProjection();
const records = buildSearchIndexRecords(projection);
const { index, errors: createErrors } = await pagefind.createIndex({
  forceLanguage: "ja",
  keepIndexUrl: true,
  verbose: false,
});

assertNoErrors("Pagefind createIndex", createErrors);
if (!index) {
  throw new Error("Pagefind createIndex did not return an index.");
}

try {
  for (const record of records) {
    const { errors } = await index.addCustomRecord({
      url: resolveRecordUrl(record),
      content: record.content,
      language: "ja",
      meta: record.meta,
      filters: record.filters,
    });
    assertNoErrors(`Pagefind addCustomRecord ${record.id}`, errors);
  }

  fs.rmSync(outputDirectory, { recursive: true, force: true });
  const { errors } = await index.writeFiles({ outputPath: outputDirectory });
  assertNoErrors("Pagefind writeFiles", errors);

  console.log(`Pagefind indexed ${records.length} Matsuri records.`);
} finally {
  await index.deleteIndex();
  await pagefind.close();
}
