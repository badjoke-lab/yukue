import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { buildSearchIndexRecords } from "@badjoke-lab/yukue-search";
import * as pagefind from "pagefind";
import { loadMatsuriProjection } from "./load-matsuri-projection.mjs";

const outputDirectory = fileURLToPath(new URL("../dist/pagefind/", import.meta.url));
const verificationDirectory = fileURLToPath(
  new URL("../.build-verification/", import.meta.url),
);
const verificationFile = fileURLToPath(
  new URL("../.build-verification/search-index.json", import.meta.url),
);

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

const projection = loadMatsuriProjection();
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

  fs.mkdirSync(verificationDirectory, { recursive: true });
  fs.writeFileSync(
    verificationFile,
    `${JSON.stringify(
      {
        site_id: "matsuri",
        source: "approved-public-projection",
        record_count: records.length,
        records: records.map((record) => ({
          id: record.id,
          entity_type: record.filters.entity_type[0] ?? null,
          current_state: record.filters.current_state[0] ?? null,
          url: resolveRecordUrl(record),
        })),
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  console.log(`Pagefind indexed ${records.length} Matsuri records.`);
} finally {
  await index.deleteIndex();
  await pagefind.close();
}
