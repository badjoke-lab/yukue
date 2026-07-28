import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = path.join(repositoryRoot, "apps", "matsuri", "dist");
const verifyFixtures = process.argv.includes("--verify-fixtures");

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

function countMarker(html, marker) {
  return (html.match(new RegExp(`\\b${marker}(?:=["'][^"']*["'])?`, "giu")) ?? []).length;
}

function extractPlaceRows(html) {
  return [...html.matchAll(/<article\b[^>]*\bdata-place-item(?:=["'][^"']*["'])?[^>]*>[\s\S]*?<\/article>/giu)].map(
    (match) => ({
      html: match[0],
      openingTag: match[0].slice(0, match[0].indexOf(">") + 1),
    }),
  );
}

function validateMapHtml(html, label) {
  const errors = [];
  const placeRows = extractPlaceRows(html);
  if (placeRows.length === 0) return errors;

  const mapTag = html.match(/<div\b[^>]*class=["'][^"']*yk-place-map[^"']*["'][^>]*>/iu)?.[0];
  if (!mapTag) {
    errors.push(`${label}: Place rows exist but the map container is missing`);
    return errors;
  }

  const eligibleRows = placeRows.filter(
    (row) => attribute(row.openingTag, "data-map-eligible") === "true",
  );
  const ineligibleRows = placeRows.filter(
    (row) => attribute(row.openingTag, "data-map-eligible") !== "true",
  );
  const hasMap = attribute(mapTag, "data-has-map");
  const mode = attribute(mapTag, "data-map-mode");
  const provider = attribute(mapTag, "data-map-provider");
  const anchor = attribute(mapTag, "data-map-anchor");
  const iframeTags = [...html.matchAll(/<iframe\b[^>]*\bdata-embedded-map(?:=["'][^"']*["'])?[^>]*>/giu)].map(
    (match) => match[0],
  );
  const mapLinkTags = [...html.matchAll(/<a\b[^>]*\bdata-place-map-link(?:=["'][^"']*["'])?[^>]*>/giu)].map(
    (match) => match[0],
  );

  for (const row of ineligibleRows) {
    if (/\bdata-place-map-link\b/iu.test(row.html)) {
      errors.push(`${label}: route, area, or unresolved Place row exposes a misleading map link`);
    }
  }

  if (eligibleRows.length === 0) {
    if (hasMap !== "false") errors.push(`${label}: no concrete anchor exists but data-has-map is not false`);
    if (mode !== "unavailable") errors.push(`${label}: no concrete anchor must use unavailable mode`);
    if (provider !== "none") errors.push(`${label}: unavailable map must declare provider none`);
    if (iframeTags.length !== 0) errors.push(`${label}: unavailable map must not render an iframe`);
    if (mapLinkTags.length !== 0) errors.push(`${label}: unavailable map must not render external map links`);
    if (!/\bdata-map-unavailable\b/iu.test(html)) {
      errors.push(`${label}: unavailable map requires an explicit public explanation`);
    }
    return errors;
  }

  if (hasMap !== "true") errors.push(`${label}: concrete anchor exists but data-has-map is not true`);
  if (!["point", "primary-anchor"].includes(mode ?? "")) {
    errors.push(`${label}: concrete anchor has invalid map mode ${String(mode)}`);
  }
  if (placeRows.length > 1 && mode !== "primary-anchor") {
    errors.push(`${label}: multiple Places must map a reviewed primary anchor, not an area or arbitrary representative`);
  }
  if (placeRows.length === 1 && mode !== "point") {
    errors.push(`${label}: one concrete Place must use point mode`);
  }
  if (provider !== "google-maps-query") {
    errors.push(`${label}: mapped page must declare the approved map provider`);
  }
  if (!anchor?.trim()) errors.push(`${label}: mapped page must declare its anchor Place name`);

  if (iframeTags.length !== 1) {
    errors.push(`${label}: expected exactly one embedded map iframe, found ${iframeTags.length}`);
  } else {
    const iframe = iframeTags[0];
    const src = attribute(iframe, "src");
    const title = attribute(iframe, "title");
    if (!src?.startsWith("https://www.google.com/maps?")) {
      errors.push(`${label}: embedded map must use the approved HTTPS query endpoint`);
    } else {
      const url = new URL(src);
      const query = url.searchParams.get("q")?.trim();
      if (!query) errors.push(`${label}: embedded map query is empty`);
      if (anchor && query && !query.includes(anchor)) {
        errors.push(`${label}: embedded map query does not identify the declared anchor ${anchor}`);
      }
      if (url.searchParams.get("output") !== "embed") {
        errors.push(`${label}: embedded map output must be embed`);
      }
      if (url.searchParams.has("key")) {
        errors.push(`${label}: public HTML must not contain a map API key`);
      }
    }
    if (!title?.trim()) errors.push(`${label}: embedded map iframe requires a title`);
    if (!/\bloading=["']lazy["']/iu.test(iframe)) {
      errors.push(`${label}: embedded map iframe must load lazily`);
    }
  }

  if (mapLinkTags.length !== eligibleRows.length) {
    errors.push(`${label}: expected ${eligibleRows.length} concrete-Place map links, found ${mapLinkTags.length}`);
  }
  for (const mapLink of mapLinkTags) {
    const href = attribute(mapLink, "href");
    if (!href?.startsWith("https://www.google.com/maps/search/?")) {
      errors.push(`${label}: external map link does not use the approved search endpoint`);
      continue;
    }
    const url = new URL(href);
    if (url.searchParams.get("api") !== "1" || !url.searchParams.get("query")?.trim()) {
      errors.push(`${label}: external map link is missing api=1 or a query`);
    }
    if (url.searchParams.has("key")) {
      errors.push(`${label}: external map link must not contain an API key`);
    }
  }

  return errors;
}

function verifyNegativeFixtures() {
  const validPoint = `
    <div class="yk-place-map" data-has-map="true" data-map-mode="point" data-map-provider="google-maps-query" data-map-anchor="白鬚神社">
      <article data-place-item data-map-eligible="true"><p>白鬚神社</p><a data-place-map-link href="https://www.google.com/maps/search/?api=1&query=%E7%99%BD%E9%AC%9A%E7%A5%9E%E7%A4%BE">地図</a></article>
      <iframe data-embedded-map src="https://www.google.com/maps?q=%E7%99%BD%E9%AC%9A%E7%A5%9E%E7%A4%BE&output=embed" title="地図" loading="lazy"></iframe>
    </div>`;
  assert(validateMapHtml(validPoint, "valid point fixture").length === 0, "Valid point fixture was rejected");

  const areaOnlyWithMap = `
    <div class="yk-place-map" data-has-map="true" data-map-mode="primary-anchor" data-map-provider="google-maps-query" data-map-anchor="阿蘇市">
      <article data-place-item data-map-eligible="false"><p>御田祭神幸区域</p><a data-place-map-link href="https://www.google.com/maps/search/?api=1&query=%E9%98%BF%E8%98%87%E5%B8%82">地図</a></article>
      <iframe data-embedded-map src="https://www.google.com/maps?q=%E9%98%BF%E8%98%87%E5%B8%82&output=embed" title="地図" loading="lazy"></iframe>
    </div>`;
  assert(
    validateMapHtml(areaOnlyWithMap, "municipality fixture").some((error) => error.includes("misleading map link") || error.includes("must not render an iframe")),
    "Municipality-only map fixture was not rejected",
  );

  const mixedWrongAnchor = `
    <div class="yk-place-map" data-has-map="true" data-map-mode="primary-anchor" data-map-provider="google-maps-query" data-map-anchor="阿蘇神社">
      <article data-place-item data-map-eligible="true"><p>阿蘇神社</p><a data-place-map-link href="https://www.google.com/maps/search/?api=1&query=%E9%98%BF%E8%98%87%E7%A5%9E%E7%A4%BE">地図</a></article>
      <article data-place-item data-map-eligible="false"><p>御田祭神幸区域</p></article>
      <iframe data-embedded-map src="https://www.google.com/maps?q=%E9%98%BF%E8%98%87%E5%B8%82&output=embed" title="地図" loading="lazy"></iframe>
    </div>`;
  assert(
    validateMapHtml(mixedWrongAnchor, "wrong anchor fixture").some((error) => error.includes("does not identify the declared anchor")),
    "Route-over-anchor fixture was not rejected",
  );

  const leakedKey = validPoint.replace("output=embed", "output=embed&key=secret");
  assert(
    validateMapHtml(leakedKey, "API key fixture").some((error) => error.includes("must not contain a map API key")),
    "API-key fixture was not rejected",
  );
}

assert(fs.existsSync(outputRoot), "Matsuri build output is missing; run pnpm build:matsuri:pages first");

const detailFiles = walkHtml(outputRoot).flatMap((filePath) => {
  const html = fs.readFileSync(filePath, "utf8");
  if (!html.includes("data-detail-page") && !html.includes("data-place-detail-page")) return [];
  return [{ filePath, html }];
});
const errors = [];
let checkedDetails = 0;
let mappedDetails = 0;
let unavailableDetails = 0;
let mappedEntityDetails = 0;
let mappedPlaceDetails = 0;
let placeRows = 0;
let eligiblePlaceRows = 0;

for (const { filePath, html } of detailFiles) {
  const currentPlaceRows = extractPlaceRows(html);
  if (currentPlaceRows.length === 0) continue;
  const route = `/${path.relative(outputRoot, path.dirname(filePath)).split(path.sep).join("/")}/`.replace(/^\/\.\//u, "/");
  const mapTag = html.match(/<div\b[^>]*class=["'][^"']*yk-place-map[^"']*["'][^>]*>/iu)?.[0];
  const hasMap = mapTag ? attribute(mapTag, "data-has-map") : undefined;
  const currentEligible = currentPlaceRows.filter(
    (row) => attribute(row.openingTag, "data-map-eligible") === "true",
  ).length;

  checkedDetails += 1;
  placeRows += currentPlaceRows.length;
  eligiblePlaceRows += currentEligible;
  if (hasMap === "true") {
    mappedDetails += 1;
    if (html.includes("data-place-detail-page")) mappedPlaceDetails += 1;
    else mappedEntityDetails += 1;
  } else {
    unavailableDetails += 1;
  }
  errors.push(...validateMapHtml(html, route));
}

if (verifyFixtures) verifyNegativeFixtures();

if (errors.length > 0) {
  throw new Error(`Matsuri map utility audit failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
}

assert(checkedDetails > 0, "No Matsuri detail page with Place records was checked");
assert(mappedEntityDetails > 0, "No Matsuri Entity detail page with a useful map anchor was checked");
assert(mappedPlaceDetails > 0, "No Matsuri Place detail page with a useful map anchor was checked");
console.log(
  `Matsuri map utility verified: ${checkedDetails} Place-bearing details, ${mappedDetails} useful anchored maps (${mappedEntityDetails} Entity and ${mappedPlaceDetails} Place details), ${unavailableDetails} explicit no-map states, ${placeRows} Place rows, ${eligiblePlaceRows} concrete map links, zero municipality-only substitutes, zero route-over-anchor regressions, zero API keys, and ${verifyFixtures ? "all negative fixtures rejected" : "fixtures not requested"}.`,
);
