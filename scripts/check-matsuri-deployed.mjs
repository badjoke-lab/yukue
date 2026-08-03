import fs from "node:fs";
import { fileURLToPath } from "node:url";

const args = new Set(process.argv.slice(2));
const canonicalMode = args.has("--canonical");
const rawOrigin = process.env.MATSURI_CHECK_ORIGIN;
const productionBaseline = JSON.parse(
  fs.readFileSync(
    fileURLToPath(
      new URL("../config/matsuri-production-baseline.json", import.meta.url),
    ),
    "utf8",
  ),
);

if (productionBaseline.schema_version !== "matsuri.production-baseline.v1") {
  throw new Error(
    `Unexpected production baseline schema: ${String(productionBaseline.schema_version)}`,
  );
}

if (!/^\d{4}-\d{2}-\d{2}$/.test(productionBaseline.observed_on ?? "")) {
  throw new Error(
    "Production baseline observed_on must use YYYY-MM-DD",
  );
}

if (!/^[0-9a-f]{40}$/.test(productionBaseline.release_merge_commit ?? "")) {
  throw new Error(
    "Production baseline release_merge_commit must be a 40-character commit SHA",
  );
}

function assertUniqueStringArray(fieldName, values) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error(`Production baseline ${fieldName} must be a non-empty array`);
  }

  if (values.some((value) => typeof value !== "string" || value.length === 0)) {
    throw new Error(
      `Production baseline ${fieldName} must contain non-empty strings`,
    );
  }

  if (new Set(values).size !== values.length) {
    throw new Error(`Production baseline ${fieldName} contains duplicate values`);
  }
}

const expectedCountFields = [
  "entities",
  "events",
  "relations",
  "occurrences",
  "sitemap_entries",
];
for (const field of expectedCountFields) {
  const value = productionBaseline.expected_counts?.[field];
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(
      `Production baseline expected_counts.${field} must be a positive integer`,
    );
  }
}

assertUniqueStringArray("required_routes", productionBaseline.required_routes);
for (const pathname of productionBaseline.required_routes) {
  if (!pathname.startsWith("/") || !pathname.endsWith("/")) {
    throw new Error(
      `Production baseline route must be root-relative and end with a slash: ${pathname}`,
    );
  }
}

assertUniqueStringArray("required_entities", productionBaseline.required_entities);

if (
  !Array.isArray(productionBaseline.occurrence_assertions) ||
  productionBaseline.occurrence_assertions.length === 0
) {
  throw new Error(
    "Production baseline occurrence_assertions must be a non-empty array",
  );
}

const occurrenceAssertionIds = productionBaseline.occurrence_assertions.map(
  (assertion) => assertion?.id,
);
assertUniqueStringArray("occurrence_assertions ids", occurrenceAssertionIds);
for (const assertion of productionBaseline.occurrence_assertions) {
  if (!Number.isInteger(assertion.record_version) || assertion.record_version <= 0) {
    throw new Error(
      `Occurrence assertion ${assertion.id} record_version must be a positive integer`,
    );
  }
  if (typeof assertion.outcome !== "string" || assertion.outcome.length === 0) {
    throw new Error(`Occurrence assertion ${assertion.id} requires outcome`);
  }
  if (typeof assertion.scale !== "string" || assertion.scale.length === 0) {
    throw new Error(`Occurrence assertion ${assertion.id} requires scale`);
  }
}

if (!rawOrigin) {
  throw new Error(
    "MATSURI_CHECK_ORIGIN is required, for example https://example.pages.dev",
  );
}

let parsedOrigin;
try {
  parsedOrigin = new URL(rawOrigin);
} catch {
  throw new Error(`Invalid MATSURI_CHECK_ORIGIN: ${rawOrigin}`);
}

if (!["http:", "https:"].includes(parsedOrigin.protocol)) {
  throw new Error(
    `MATSURI_CHECK_ORIGIN must use http or https: ${parsedOrigin.protocol}`,
  );
}

parsedOrigin.pathname = "/";
parsedOrigin.search = "";
parsedOrigin.hash = "";
const origin = parsedOrigin.origin;

const checks = [
  ["/", "text/html"],
  ["/about/", "text/html"],
  ["/festivals/", "text/html"],
  ["/performances/", "text/html"],
  ["/organizations/", "text/html"],
  ["/regions/", "text/html"],
  ["/changes/", "text/html"],
  ["/states/", "text/html"],
  ["/search/", "text/html"],
  ["/methodology/", "text/html"],
  ["/data/", "text/html"],
  ["/status/", "text/html"],
  ["/pagefind/pagefind.js", "javascript"],
  ["/version.json", "application/json"],
  ["/data/manifest.json", "application/json"],
  ["/data/entities.json", "application/json"],
  ["/data/events.json", "application/json"],
  ["/data/relations.json", "application/json"],
  ["/data/occurrences.json", "application/json"],
  ["/llms.txt", "text/plain"],
  ["/ai.txt", "text/plain"],
  ["/sitemap.xml", "xml"],
  ...(canonicalMode
    ? productionBaseline.required_routes.map((pathname) => [pathname, "text/html"])
    : []),
];

async function fetchText(pathname, expectedContentType) {
  const url = `${origin}${pathname}`;
  const response = await fetch(url, {
    headers: { "user-agent": "yukue-launch-verifier/1.0" },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`${pathname} returned HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes(expectedContentType.toLowerCase())) {
    throw new Error(
      `${pathname} returned unexpected content-type ${contentType}; expected ${expectedContentType}`,
    );
  }

  const body = await response.text();
  if (body.trim().length === 0) {
    throw new Error(`${pathname} returned an empty response body`);
  }

  console.log(`ok ${pathname} ${response.status} ${contentType}`);
  return body;
}

function assertRecordCount(feedName, feed, expectedCount) {
  if (!Array.isArray(feed.records)) {
    throw new Error(`${feedName} feed does not contain a records array`);
  }

  if (feed.record_count !== expectedCount) {
    throw new Error(
      `${feedName} record_count mismatch: ${String(feed.record_count)} (expected ${expectedCount})`,
    );
  }

  if (feed.records.length !== expectedCount) {
    throw new Error(
      `${feedName} records length mismatch: ${feed.records.length} (expected ${expectedCount})`,
    );
  }
}

function assertRequiredRouteHtml(pathname, html) {
  const normalized = html.toLowerCase();
  for (const marker of ["<html", "<main", "<h1"]) {
    if (!normalized.includes(marker)) {
      throw new Error(
        `Required production route ${pathname} is missing structural marker ${marker}`,
      );
    }
  }
}

const bodies = new Map();
for (const [pathname, contentType] of checks) {
  bodies.set(pathname, await fetchText(pathname, contentType));
}

if (canonicalMode) {
  for (const pathname of productionBaseline.required_routes) {
    assertRequiredRouteHtml(pathname, bodies.get(pathname));
  }
}

const version = JSON.parse(bodies.get("/version.json"));
if (version.site_id !== "matsuri") {
  throw new Error(
    `Unexpected version site_id: ${String(version.site_id)} (expected matsuri)`,
  );
}

const manifest = JSON.parse(bodies.get("/data/manifest.json"));
if (manifest.site_id !== "matsuri") {
  throw new Error(
    `Unexpected manifest site_id: ${String(manifest.site_id)} (expected matsuri)`,
  );
}

const entities = JSON.parse(bodies.get("/data/entities.json"));
if (!Array.isArray(entities.records) || entities.records.length === 0) {
  throw new Error("Entity feed contains no public records");
}

if (!entities.records.some((record) => record.id === "fst-suneori-amagoi")) {
  throw new Error(
    "Representative record fst-suneori-amagoi is missing from the deployed entity feed",
  );
}

const events = JSON.parse(bodies.get("/data/events.json"));
const relations = JSON.parse(bodies.get("/data/relations.json"));
const occurrences = JSON.parse(bodies.get("/data/occurrences.json"));

const searchHtml = bodies.get("/search/");
if (!searchHtml.toLowerCase().includes("pagefind")) {
  throw new Error("Search page does not reference Pagefind assets");
}

const sitemap = bodies.get("/sitemap.xml");
if (!sitemap.includes("<urlset")) {
  throw new Error("Sitemap does not contain a <urlset> element");
}

if (canonicalMode) {
  if (manifest.site_origin !== origin) {
    throw new Error(
      `Manifest site_origin mismatch: ${String(manifest.site_origin)} (expected ${origin})`,
    );
  }

  const expectedCounts = productionBaseline.expected_counts;
  assertRecordCount("Entity", entities, expectedCounts.entities);
  assertRecordCount("Event", events, expectedCounts.events);
  assertRecordCount("Relation", relations, expectedCounts.relations);
  assertRecordCount("Occurrence", occurrences, expectedCounts.occurrences);

  for (const [recordType, expectedCount] of [
    ["entities", expectedCounts.entities],
    ["events", expectedCounts.events],
    ["relations", expectedCounts.relations],
    ["occurrences", expectedCounts.occurrences],
  ]) {
    if (manifest.record_counts?.[recordType] !== expectedCount) {
      throw new Error(
        `Manifest ${recordType} count mismatch: ${String(manifest.record_counts?.[recordType])} (expected ${expectedCount})`,
      );
    }
  }

  for (const entityId of productionBaseline.required_entities) {
    if (!entities.records.some((record) => record.id === entityId)) {
      throw new Error(
        `Required production Entity ${entityId} is missing from the deployed feed`,
      );
    }
  }

  for (const assertion of productionBaseline.occurrence_assertions) {
    const occurrence = occurrences.records.find(
      (record) => record.id === assertion.id,
    );
    if (!occurrence) {
      throw new Error(
        `Required production Occurrence ${assertion.id} is missing from the deployed feed`,
      );
    }

    for (const field of ["record_version", "outcome", "scale"]) {
      if (occurrence[field] !== assertion[field]) {
        throw new Error(
          `Occurrence ${assertion.id} ${field} mismatch: ${String(occurrence[field])} (expected ${String(assertion[field])})`,
        );
      }
    }
  }

  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );

  if (locations.length === 0) {
    throw new Error("Sitemap contains no <loc> entries");
  }

  if (locations.length !== expectedCounts.sitemap_entries) {
    throw new Error(
      `Sitemap entry-count mismatch: ${locations.length} (expected ${expectedCounts.sitemap_entries})`,
    );
  }

  const invalidLocations = locations.filter(
    (location) => !location.startsWith(`${origin}/`) && location !== `${origin}/`,
  );

  if (invalidLocations.length > 0) {
    throw new Error(
      `Sitemap contains non-canonical locations:\n${invalidLocations
        .map((location) => `- ${location}`)
        .join("\n")}`,
    );
  }

  for (const pathname of productionBaseline.required_routes) {
    const expectedLocation = `${origin}${pathname}`;
    if (!locations.includes(expectedLocation)) {
      throw new Error(
        `Required production route is missing from the canonical sitemap: ${expectedLocation}`,
      );
    }
  }

  console.log(`canonical origin verified: ${origin}`);
  console.log(`canonical sitemap entries verified: ${locations.length}`);
  console.log(
    `production baseline verified: ${productionBaseline.release_merge_commit}`,
  );
}

console.log(
  `Matsuri deployed verification passed for ${origin}${canonicalMode ? " in canonical mode" : ""}.`,
);
