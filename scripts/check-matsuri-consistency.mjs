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
}

const statusHtml = fs.readFileSync(path.join(outputRoot, "status", "index.html"), "utf8");
const statusCounts = parseStatusCounts(statusHtml);
assertEqual(statusCounts.get("entities"), feeds.entities.records.length, "status entity count mismatch");
assertEqual(statusCounts.get("events"), feeds.events.records.length, "status event count mismatch");
assertEqual(statusCounts.get("relations"), feeds.relations.records.length, "status relation count mismatch");
assertEqual(statusCounts.get("occurrences"), feeds.occurrences.records.length, "status occurrence count mismatch");

const entityStateById = new Map(
  feeds.entities.records.map((entity) => [entity.id, entity.current_state?.state_code ?? "unknown"]),
);
for (const stateCode of stateCodes) {
  const stateHtml = fs.readFileSync(
    path.join(outputRoot, "states", stateCode, "index.html"),
    "utf8",
  );
  const rows = parseStateRows(stateHtml);
  const expectedIds = feeds.entities.records
    .filter((entity) => (entity.current_state?.state_code ?? "unknown") === stateCode)
    .map((entity) => entity.id);
  assertArrayEqual(
    rows.map((row) => row.id),
    expectedIds,
    `state page ${stateCode} entity IDs mismatch`,
  );
  for (const row of rows) {
    assertEqual(
      row.stateCode,
      entityStateById.get(row.id),
      `state page ${stateCode} row state mismatch for ${row.id}`,
    );
  }
}

const searchVerification = JSON.parse(fs.readFileSync(searchVerificationPath, "utf8"));
const expectedSearchRecords = feeds.entities.records.filter((entity) =>
  searchableEntityTypes.has(entity.entity_type),
);
assertEqual(
  searchVerification.record_count,
  expectedSearchRecords.length,
  "Pagefind input record count mismatch",
);

for (const entity of expectedSearchRecords) {
  const indexed = searchVerification.records.find((record) => record.id === entity.id);
  if (!indexed) throw new Error(`Pagefind input is missing entity ${entity.id}`);
  assertEqual(indexed.entity_type, entity.entity_type, `Pagefind entity type mismatch for ${entity.id}`);
  assertEqual(
    indexed.current_state,
    entity.current_state?.state_code ?? "unknown",
    `Pagefind Current State mismatch for ${entity.id}`,
  );
  assertEqual(indexed.url, expectedSearchUrl(entity), `Pagefind URL mismatch for ${entity.id}`);
}

const sitemapLocations = parseSitemapLocations(
  fs.readFileSync(path.join(outputRoot, "sitemap.xml"), "utf8"),
);
if (process.env.MATSURI_PUBLIC_ORIGIN) {
  const origin = process.env.MATSURI_PUBLIC_ORIGIN.replace(/\/$/u, "");
  assertEqual(manifest.site_origin, origin, "manifest site_origin mismatch");
  for (const location of sitemapLocations) {
    if (!location.startsWith(`${origin}/`) && location !== origin) {
      throw new Error(`sitemap location is outside configured origin: ${location}`);
    }
  }
} else {
  if (Object.hasOwn(manifest, "site_origin")) {
    throw new Error("origin-neutral manifest must omit site_origin");
  }
  for (const location of sitemapLocations) {
    if (!location.startsWith("/")) {
      throw new Error(`origin-neutral sitemap must use path-only locations: ${location}`);
    }
  }
}

console.log(
  `Matsuri public-output consistency passed: ${feeds.entities.records.length} entities, ${feeds.events.records.length} events, ${feeds.relations.records.length} relations, ${feeds.occurrences.records.length} occurrences, ${sitemapLocations.length} sitemap locations, ${expectedManifestFiles.length} manifest files, and ${searchVerification.record_count} Pagefind input records agree.`,
);