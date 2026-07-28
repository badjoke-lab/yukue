import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = path.join(repositoryRoot, "apps", "matsuri", "dist");
const registryPath = path.join(repositoryRoot, "config", "matsuri-official-map-links.json");
const verifyFixtures = process.argv.includes("--verify-fixtures");
const dataset = loadMatsuriDataset();
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const specialistTypes = new Set(["festival", "tradition_unit", "folk_performance"]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function walkHtml(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (["_astro", "pagefind"].includes(entry.name)) continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkHtml(absolutePath));
    if (entry.isFile() && entry.name === "index.html") files.push(absolutePath);
  }
  return files;
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "iu"));
  return match ? decodeHtml(match[1]) : undefined;
}

function routeFor(filePath) {
  const relative = path.relative(outputRoot, path.dirname(filePath)).split(path.sep).join("/");
  return relative ? `/${relative}/` : "/";
}

function placeRows(html) {
  return [...html.matchAll(/<article\b[^>]*\bdata-place-item(?:=["'][^"']*["'])?[^>]*>[\s\S]*?<\/article>/giu)].map(
    (match) => ({
      html: match[0],
      openingTag: match[0].slice(0, match[0].indexOf(">") + 1),
    }),
  );
}

function tags(html, marker, tagName = "a") {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*\\b${marker}(?:=["'][^"']*["'])?[^>]*>`, "giu"))].map(
    (match) => match[0],
  );
}

function validateRegistry() {
  assert(registry.schema_version === "matsuri.official-map-links.v1", "Official map registry schema mismatch");
  assert(Array.isArray(registry.records), "Official map registry records are missing");
  const entityIds = new Set(dataset.entities.map((row) => row.id));
  const placeIds = new Set(dataset.places.map((row) => row.id));
  const sourceIds = new Set(dataset.sources.map((row) => row.id));
  const keys = new Set();

  for (const record of registry.records) {
    const key = `${record.entity_id}|${record.place_id}|${record.url}`;
    assert(!keys.has(key), `Duplicate official map registry record ${key}`);
    keys.add(key);
    assert(entityIds.has(record.entity_id), `Official map record references missing Entity ${record.entity_id}`);
    assert(placeIds.has(record.place_id), `Official map record references missing Place ${record.place_id}`);
    assert(sourceIds.has(record.source_id), `Official map record references missing Source ${record.source_id}`);
    assert(/^https:\/\//u.test(record.url), `Official map URL must use HTTPS: ${record.url}`);
    assert(record.entity_route.startsWith("/") && record.entity_route.endsWith("/"), `Invalid entity route ${record.entity_route}`);
    assert(record.place_route.startsWith("/") && record.place_route.endsWith("/"), `Invalid place route ${record.place_route}`);
    assert(record.label_ja?.trim(), `Official map record ${key} has no label`);
    assert(record.place_name_ja?.trim(), `Official map record ${key} has no Place name`);
    const supportingEvidence = dataset.evidence.filter(
      (row) =>
        row.source_id === record.source_id &&
        row.target_type === "place" &&
        row.target_id === record.place_id &&
        row.review_status === "approved",
    );
    assert(
      supportingEvidence.length > 0,
      `Official map record ${key} lacks approved Place Evidence from ${record.source_id}`,
    );
  }
}

function validateDetail(html, route) {
  const errors = [];
  const rows = placeRows(html);
  if (rows.length === 0) return { errors, status: "no-places", entityType: undefined };
  const mapTag = html.match(/<div\b[^>]*class=["'][^"']*yk-place-map[^"']*["'][^>]*>/iu)?.[0];
  if (!mapTag) return { errors: [`${route}: Place rows exist but map container is missing`], status: "invalid" };

  const articleTag = html.match(/<article\b[^>]*\bdata-detail-page[^>]*>/iu)?.[0];
  const entityType = articleTag ? attribute(articleTag, "data-entity-type") : undefined;
  const concreteCount = rows.filter((row) => attribute(row.openingTag, "data-map-eligible") === "true").length;
  const googleLinks = tags(html, "data-place-map-link");
  const officialLinks = tags(html, "data-official-map-link");
  const uniqueOfficialHrefs = new Set(officialLinks.map((tag) => attribute(tag, "href")).filter(Boolean));
  const iframes = tags(html, "data-embedded-map", "iframe");
  const hasMap = attribute(mapTag, "data-has-map");
  const mode = attribute(mapTag, "data-map-mode");
  const provider = attribute(mapTag, "data-map-provider");
  const anchor = attribute(mapTag, "data-map-anchor");
  const expectedRegistry = registry.records.filter(
    (record) => record.entity_route === route || record.place_route === route,
  );

  for (const expected of expectedRegistry) {
    if (!uniqueOfficialHrefs.has(expected.url)) {
      errors.push(`${route}: approved official map URL was not rendered: ${expected.url}`);
    }
  }
  for (const link of officialLinks) {
    const href = attribute(link, "href");
    const sourceId = attribute(link, "data-source-id");
    if (!href || !/^https:\/\//u.test(href)) errors.push(`${route}: official map link is not HTTPS`);
    if (!sourceId || !dataset.sources.some((row) => row.id === sourceId)) {
      errors.push(`${route}: official map link has no valid Source id`);
    }
  }

  if (concreteCount > 0) {
    if (hasMap !== "true") errors.push(`${route}: concrete anchor exists but data-has-map is not true`);
    if (!["point", "primary-anchor"].includes(mode ?? "")) errors.push(`${route}: concrete anchor has invalid mode ${String(mode)}`);
    if (provider !== "google-maps-query") errors.push(`${route}: concrete anchor must use Google query provider`);
    if (!anchor?.trim()) errors.push(`${route}: concrete anchor name is missing`);
    if (iframes.length !== 1) errors.push(`${route}: concrete anchor requires exactly one iframe`);
    if (googleLinks.length !== concreteCount) errors.push(`${route}: expected ${concreteCount} concrete map links, found ${googleLinks.length}`);
    if (iframes[0]) {
      const src = attribute(iframes[0], "src");
      if (!src?.startsWith("https://www.google.com/maps?")) errors.push(`${route}: invalid Google map iframe endpoint`);
      else {
        const url = new URL(src);
        if (url.searchParams.get("output") !== "embed") errors.push(`${route}: Google map iframe lacks output=embed`);
        const query = url.searchParams.get("q") ?? "";
        if (!query.includes(anchor ?? "")) errors.push(`${route}: iframe query does not identify anchor ${String(anchor)}`);
        if (url.searchParams.has("key")) errors.push(`${route}: map API key leaked`);
      }
    }
    return { errors, status: "anchored", entityType };
  }

  if (officialLinks.length > 0) {
    if (hasMap !== "true") errors.push(`${route}: official map coverage must declare data-has-map=true`);
    if (mode !== "official-map") errors.push(`${route}: official map coverage must use official-map mode`);
    if (provider !== "official-source") errors.push(`${route}: official map coverage must use official-source provider`);
    if (iframes.length !== 0) errors.push(`${route}: official route map must not render a municipality iframe`);
    if (googleLinks.length !== 0) errors.push(`${route}: official route map must not expose Google point links`);
    if (!html.includes("data-official-map-panel")) errors.push(`${route}: official map panel is missing`);
    return { errors, status: "official-map", entityType };
  }

  if (hasMap !== "false") errors.push(`${route}: uncovered location must declare data-has-map=false`);
  if (mode !== "unavailable") errors.push(`${route}: uncovered location must use unavailable mode`);
  if (provider !== "none") errors.push(`${route}: uncovered location must use provider none`);
  if (iframes.length !== 0 || googleLinks.length !== 0) errors.push(`${route}: uncovered location must not render a substitute map`);
  if (!html.includes("data-map-unavailable")) errors.push(`${route}: uncovered location explanation is missing`);
  if (specialistTypes.has(entityType)) errors.push(`${route}: Festival or Folk Performance lacks both a concrete anchor and approved official map`);
  return { errors, status: "unavailable", entityType };
}

function verifyNegativeFixtures() {
  const municipalityOnly = `<article data-detail-page data-entity-type="festival"><div class="yk-place-map" data-has-map="true" data-map-mode="point" data-map-provider="google-maps-query" data-map-anchor="阿蘇市"><article data-place-item data-map-eligible="false"></article><iframe data-embedded-map src="https://www.google.com/maps?q=%E9%98%BF%E8%98%87%E5%B8%82&output=embed"></iframe></div></article>`;
  assert(validateDetail(municipalityOnly, "/fixture/municipality/").errors.length > 0, "Municipality-only fixture was not rejected");
  const uncoveredFestival = `<article data-detail-page data-entity-type="festival"><div class="yk-place-map" data-has-map="false" data-map-mode="unavailable" data-map-provider="none"><article data-place-item data-map-eligible="false"></article><div data-map-unavailable></div></div></article>`;
  assert(validateDetail(uncoveredFestival, "/fixture/uncovered/").errors.some((row) => row.includes("lacks both")), "Uncovered Festival fixture was not rejected");
  const unregisteredOfficial = `<article data-detail-page data-entity-type="festival"><div class="yk-place-map" data-has-map="true" data-map-mode="official-map" data-map-provider="official-source"><article data-place-item data-map-eligible="false"><a data-official-map-link data-source-id="missing" href="https://example.org/map">map</a></article><div data-official-map-panel></div></div></article>`;
  assert(validateDetail(unregisteredOfficial, "/fixture/official/").errors.length > 0, "Unregistered official-map fixture was not rejected");
}

assert(fs.existsSync(outputRoot), "Matsuri build output is missing; run pnpm build:matsuri:pages first");
validateRegistry();
const errors = [];
const counts = { anchored: 0, officialMap: 0, unavailable: 0, checked: 0 };
for (const filePath of walkHtml(outputRoot)) {
  const html = fs.readFileSync(filePath, "utf8");
  if (!html.includes("data-detail-page") && !html.includes("data-place-detail-page")) continue;
  if (!html.includes("data-place-item")) continue;
  const route = routeFor(filePath);
  const result = validateDetail(html, route);
  errors.push(...result.errors);
  counts.checked += 1;
  if (result.status === "anchored") counts.anchored += 1;
  if (result.status === "official-map") counts.officialMap += 1;
  if (result.status === "unavailable") counts.unavailable += 1;
}
if (verifyFixtures) verifyNegativeFixtures();
if (errors.length > 0) throw new Error(`Matsuri map utility v2 failed:\n${errors.map((row) => `- ${row}`).join("\n")}`);
console.log(`Matsuri map utility v2 verified: ${counts.checked} Place-bearing details, ${counts.anchored} concrete anchors, ${counts.officialMap} approved official maps, ${counts.unavailable} remaining non-specialist Place gaps, zero uncovered Festival/Folk Performance pages, and ${verifyFixtures ? "all negative fixtures rejected" : "fixtures not requested"}.`);
