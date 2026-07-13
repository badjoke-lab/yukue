import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = path.join(repositoryRoot, "apps", "matsuri", "dist");
const searchVerificationPath = path.join(
  repositoryRoot,
  "apps",
  "matsuri",
  ".build-verification",
  "search-index.json",
);

const feedSpecs = {
  entities: {
    path: "data/entities.json",
    recordType: "entity",
  },
  events: {
    path: "data/events.json",
    recordType: "change_event",
  },
  relations: {
    path: "data/relations.json",
    recordType: "relation",
  },
  occurrences: {
    path: "data/occurrences.json",
    recordType: "occurrence",
  },
};

const expectedManifestFiles = [
  "/version.json",
  "/data/manifest.json",
  "/data/entities.json",
  "/data/events.json",
  "/data/relations.json",
  "/data/occurrences.json",
  "/llms.txt",
  "/ai.txt",
  "/robots.txt",
  "/sitemap.xml",
];

const stateCodes = [
  "active",
  "reduced_activity",
  "suspended",
  "dormant",
  "reviving",
  "discontinued",
  "unknown",
];

const searchableEntityTypes = new Set([
  "festival",
  "tradition_unit",
  "folk_performance",
]);

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(outputRoot, relativePath), "utf8"));
}

function sorted(values) {
  return [...values].sort((a, b) => a.localeCompare(b));
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}: ${JSON.stringify(actual)} !== ${JSON.stringify(expected)}`);
  }
}

function assertArrayEqual(actual, expected, message) {
  const actualSorted = sorted(actual);
  const expectedSorted = sorted(expected);

  if (
    actualSorted.length !== expectedSorted.length ||
    actualSorted.some((value, index) => value !== expectedSorted[index])
  ) {
    throw new Error(
      `${message}:\nactual: ${JSON.stringify(actualSorted)}\nexpected: ${JSON.stringify(expectedSorted)}`,
    );
  }
}

function parseStatusCounts(html) {
  const counts = new Map();
  const pattern = /<dd\b[^>]*data-record-count="([^"]+)"[^>]*>\s*(\d+)\s*<\/dd>/giu;

  for (const match of html.matchAll(pattern)) {
    counts.set(match[1], Number(match[2]));
  }

  return counts;
}

function parseStateRows(html) {
  const rows = [];
  const pattern = /<article\b[^>]*data-entity-id="([^"]+)"[^>]*data-current-state="([^"]+)"[^>]*>/giu;

  for (const match of html.matchAll(pattern)) {
    rows.push({ id: match[1], stateCode: match[2] });
  }

  return rows;
}

function parseSitemapLocations(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gu)].map((match) =>
    match[1]
      .trim()
      .replaceAll("&amp;", "&")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&quot;", '"')
      .replaceAll("&apos;", "'"),
  );
}

function expectedSearchUrl(entity) {
  if (entity.id === "fst-suneori-amagoi") {
    return "/festivals/suneori-amagoi/";
  }

  if (entity.entity_type === "folk_performance") {
    return `/performances/#${entity.id}`;
  }

  return `/festivals/#${entity.id}`;
}

const version = readJson("version.json");
const manifest = readJson("data/manifest.json");
const feeds = Object.fromEntries(
  Object.entries(feedSpecs).map(([key, spec]) => [key, readJson(spec.path)]),
);

for (const key of [
  "project_id",
  "site_id",
  "dataset_version",
  "schema_version",
]) {
  assertEqual(manifest[key], version[key], `manifest/version ${key} mismatch`);

  for (const [feedKey, feed] of Object.entries(feeds)) {
    assertEqual(feed[key], version[key], `${feedKey}/version ${key} mismatch`);
  }
}

assertEqual(version.site_id, "matsuri", "unexpected version site_id");
assertEqual(manifest.site_id, "matsuri", "unexpected manifest site_id");
assertArrayEqual(manifest.files, expectedManifestFiles, "manifest file inventory mismatch");
assertEqual(
  manifest.data_safety?.canonical_only,
  true,
  "manifest canonical_only must be true",
);
assertEqual(
  manifest.data_safety?.approved_projection_only,
  true,
  "manifest approved_projection_only must be true",
);

for (const [feedKey, spec] of Object.entries(feedSpecs)) {
  const feed = feeds[feedKey];
  assertEqual(feed.record_type, spec.recordType, `${feedKey} record_type mismatch`);
  assertEqual(
    feed.record_count,
    feed.records.length,
    `${feedKey} record_count does not match records length`,
  );
  assertEqual(
    manifest.record_counts[feedKey],
    feed.records.length,
    `manifest ${feedKey} count mismatch`,
  );

  const ids = feed.records.map((record) => record.id);
  assertEqual(
    new Set(ids).size,
    ids.length,
    `${feedKey} feed contains duplicate record IDs`,
  );
}

const entityRecords = feeds.entities.records;
const currentStateRecords = entityRecords.filter((entity) => entity.current_state);
const statusHtml = fs.readFileSync(path.join(outputRoot, "status", "index.html"), "utf8");
const statusCounts = parseStatusCounts(statusHtml);
const expectedStatusCounts = {
  entities: entityRecords.length,
  current_states: currentStateRecords.length,
  occurrences: feeds.occurrences.records.length,
  events: feeds.events.records.length,
  relations: feeds.relations.records.length,
};

for (const [key, expectedCount] of Object.entries(expectedStatusCounts)) {
  if (!statusCounts.has(key)) {
    throw new Error(`Status HTML is missing data-record-count=${key}`);
  }
  assertEqual(statusCounts.get(key), expectedCount, `Status HTML ${key} count mismatch`);
}

for (const stateCode of stateCodes) {
  const expectedIds = entityRecords
    .filter((entity) => entity.current_state?.state_code === stateCode)
    .map((entity) => entity.id);
  const stateHtml = fs.readFileSync(
    path.join(outputRoot, "states", stateCode, "index.html"),
    "utf8",
  );
  const rows = parseStateRows(stateHtml);

  for (const row of rows) {
    assertEqual(
      row.stateCode,
      stateCode,
      `State page ${stateCode} contains entity ${row.id} with another state`,
    );
  }

  assertArrayEqual(
    rows.map((row) => row.id),
    expectedIds,
    `State page ${stateCode} entity inventory mismatch`,
  );
}

if (!fs.existsSync(searchVerificationPath)) {
  throw new Error(
    `Pagefind verification sidecar is missing: ${path.relative(repositoryRoot, searchVerificationPath)}`,
  );
}

const searchVerification = JSON.parse(
  fs.readFileSync(searchVerificationPath, "utf8"),
);
assertEqual(searchVerification.site_id, "matsuri", "search sidecar site_id mismatch");
assertEqual(
  searchVerification.source,
  "approved-public-projection",
  "search sidecar source mismatch",
);
assertEqual(
  searchVerification.record_count,
  searchVerification.records.length,
  "search sidecar record_count mismatch",
);

const expectedSearchEntities = entityRecords.filter((entity) =>
  searchableEntityTypes.has(entity.entity_type),
);
assertArrayEqual(
  searchVerification.records.map((record) => record.id),
  expectedSearchEntities.map((entity) => entity.id),
  "Pagefind input entity inventory mismatch",
);

const entitiesById = new Map(entityRecords.map((entity) => [entity.id, entity]));
for (const record of searchVerification.records) {
  const entity = entitiesById.get(record.id);
  if (!entity) {
    throw new Error(`Pagefind sidecar contains unknown entity ${record.id}`);
  }

  assertEqual(
    record.entity_type,
    entity.entity_type,
    `Pagefind entity_type mismatch for ${record.id}`,
  );
  assertEqual(
    record.current_state,
    entity.current_state?.state_code ?? null,
    `Pagefind current_state mismatch for ${record.id}`,
  );
  assertEqual(
    record.url,
    expectedSearchUrl(entity),
    `Pagefind URL mismatch for ${record.id}`,
  );
}

const sitemapLocations = parseSitemapLocations(
  fs.readFileSync(path.join(outputRoot, "sitemap.xml"), "utf8"),
);
const configuredOrigin = process.env.MATSURI_PUBLIC_ORIGIN?.replace(/\/$/u, "");

if (configuredOrigin) {
  assertEqual(
    manifest.site_origin,
    configuredOrigin,
    "manifest site_origin does not match MATSURI_PUBLIC_ORIGIN",
  );

  const configuredUrl = new URL(configuredOrigin);
  if (
    configuredUrl.hostname === "localhost" ||
    configuredUrl.hostname === "127.0.0.1" ||
    configuredUrl.hostname.endsWith(".invalid")
  ) {
    throw new Error(`Placeholder or local MATSURI_PUBLIC_ORIGIN is not allowed: ${configuredOrigin}`);
  }

  for (const location of sitemapLocations) {
    if (!location.startsWith(`${configuredOrigin}/`) && location !== configuredOrigin) {
      throw new Error(`Sitemap location does not use configured origin: ${location}`);
    }
  }
} else {
  if (Object.hasOwn(manifest, "site_origin")) {
    throw new Error(
      `manifest.site_origin must be absent when MATSURI_PUBLIC_ORIGIN is unset: ${manifest.site_origin}`,
    );
  }

  for (const location of sitemapLocations) {
    if (!location.startsWith("/") || /^[a-z][a-z\d+.-]*:/iu.test(location)) {
      throw new Error(
        `Development sitemap must use path-only locations when MATSURI_PUBLIC_ORIGIN is unset: ${location}`,
      );
    }
  }
}

console.log(
  `Matsuri public outputs are consistent: ${entityRecords.length} entities, ${currentStateRecords.length} current states, ${searchVerification.records.length} Pagefind records, ${sitemapLocations.length} sitemap locations, and ${expectedManifestFiles.length} manifest files.`,
);