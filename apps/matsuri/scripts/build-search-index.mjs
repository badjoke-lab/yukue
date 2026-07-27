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
  const entityType = record.filters.entity_type[0];
  const slug = record.meta.slug;
  if (!slug) throw new Error(`Search record ${record.id} is missing slug metadata`);

  switch (entityType) {
    case "festival":
    case "tradition_unit":
      return `/festivals/${slug}/`;
    case "folk_performance":
      return `/performances/${slug}/`;
    case "organization":
      return `/organizations/${slug}/`;
    case "shrine":
      return `/references/shrines/${slug}/`;
    case "temple":
      return `/references/temples/${slug}/`;
    default:
      throw new Error(`Search record ${record.id} has unsupported entity type ${entityType}`);
  }
}

function assertNoErrors(stage, errors) {
  if (Array.isArray(errors) && errors.length > 0) {
    throw new Error(`${stage} failed:\n${errors.join("\n")}`);
  }
}

const projection = loadMatsuriProjection();
const entitiesById = new Map(
  projection.json.entities.map((entity) => [entity.id, entity]),
);
const records = buildSearchIndexRecords(projection).map((record) => {
  const entity = entitiesById.get(record.id);
  if (!entity?.slug) throw new Error(`Search Entity ${record.id} has no public slug`);
  return {
    ...record,
    meta: {
      ...record.meta,
      slug: entity.slug,
    },
  };
});
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

  console.log(`Pagefind indexed ${records.length} Matsuri records with direct detail URLs.`);
} finally {
  await index.deleteIndex();
  await pagefind.close();
}
