import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = path.join(repositoryRoot, "apps", "matsuri", "dist");
const verifyFixtures = process.argv.includes("--verify-fixtures");

const areaContextPattern =
  /巡行|運行|区域|市街地|周辺|複数地点|複数会場|複数地域|各地区|会場群|街路|コース|道じゅねー/u;
const areaLabels = new Set(["巡行路", "伝承地域", "地区"]);

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

function extractContextLabels(html) {
  return [...html.matchAll(/<p\b[^>]*class=["'][^"']*yk-place-item__context[^"']*["'][^>]*>([^<]+)<\/p>/giu)]
    .map((match) => decodeHtml(match[1]).trim())
    .filter(Boolean);
}

function extractContextDescription(html) {
  const match = html.match(/<p\b[^>]*class=["'][^"']*yk-map-context[^"']*["'][^>]*>([\s\S]*?)<\/p>/iu);
  return match ? decodeHtml(match[1].replace(/<[^>]+>/gu, " ")).replace(/\s+/gu, " ").trim() : "";
}

function validateMapHtml(html, label) {
  const errors = [];
  const placeCount = countMarker(html, "data-place-item");
  if (placeCount === 0) return errors;

  const mapTag = html.match(/<div\b[^>]*class=["'][^"']*yk-place-map[^"']*["'][^>]*>/iu)?.[0];
  if (!mapTag) {
    errors.push(`${label}: Place rows exist but the map container is missing`);
    return errors;
  }

  const hasMap = attribute(mapTag, "data-has-map");
  const mode = attribute(mapTag, "data-map-mode");
  const provider = attribute(mapTag, "data-map-provider");
  if (hasMap !== "true") errors.push(`${label}: data-has-map must be true`);
  if (!["point", "representative", "area"].includes(mode ?? "")) {
    errors.push(`${label}: invalid or missing map mode ${String(mode)}`);
  }
  if (provider !== "google-maps-query") {
    errors.push(`${label}: map provider marker is missing or unexpected`);
  }

  const iframeTags = [...html.matchAll(/<iframe\b[^>]*\bdata-embedded-map(?:=["'][^"']*["'])?[^>]*>/giu)].map(
    (match) => match[0],
  );
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
      if (!url.searchParams.get("q")?.trim()) errors.push(`${label}: embedded map query is empty`);
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

  const mapLinkTags = [...html.matchAll(/<a\b[^>]*\bdata-place-map-link(?:=["'][^"']*["'])?[^>]*>/giu)].map(
    (match) => match[0],
  );
  if (mapLinkTags.length !== placeCount) {
    errors.push(`${label}: expected ${placeCount} external map links, found ${mapLinkTags.length}`);
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

  const contextLabels = extractContextLabels(html);
  const contextDescription = extractContextDescription(html);
  const requiresAreaMode =
    contextLabels.some((contextLabel) => areaLabels.has(contextLabel)) ||
    areaContextPattern.test(contextDescription);
  if (requiresAreaMode && mode !== "area") {
    errors.push(`${label}: route, distributed, or area context must use area map mode`);
  }
  if (!requiresAreaMode && placeCount > 1 && mode !== "representative") {
    errors.push(`${label}: multiple point-like places must use representative map mode`);
  }
  if (!requiresAreaMode && placeCount === 1 && mode !== "point") {
    errors.push(`${label}: one point-like place must use point map mode`);
  }
  if (["area", "representative"].includes(mode ?? "") && !/class=["'][^"']*yk-map-note/iu.test(html)) {
    errors.push(`${label}: non-point maps require an explanatory note`);
  }

  return errors;
}

function verifyNegativeFixtures() {
  const base = `
    <p class="yk-map-context">埼玉県鶴ヶ島市の単一会場。</p>
    <div class="yk-place-map" data-has-map="true" data-map-mode="point" data-map-provider="google-maps-query">
      <article data-place-item><p class="yk-place-item__context">神社</p><a data-place-map-link href="https://www.google.com/maps/search/?api=1&query=test">地図</a></article>
      <iframe data-embedded-map src="https://www.google.com/maps?q=test&output=embed" title="地図" loading="lazy"></iframe>
    </div>`;
  assert(validateMapHtml(base, "valid fixture").length === 0, "Valid map fixture was rejected");

  const missingIframe = base.replace(/<iframe[\s\S]*?<\/iframe>/u, "");
  assert(
    validateMapHtml(missingIframe, "missing iframe fixture").some((error) => error.includes("exactly one embedded map iframe")),
    "Missing-iframe fixture was not rejected",
  );

  const routeAsPoint = base.replace("単一会場", "巡行路").replace("神社", "巡行路");
  assert(
    validateMapHtml(routeAsPoint, "route point fixture").some((error) => error.includes("must use area map mode")),
    "Route-as-point fixture was not rejected",
  );

  const leakedKey = base.replace("output=embed", "output=embed&key=secret");
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
let mappedDetails = 0;
let mappedEntityDetails = 0;
let mappedPlaceDetails = 0;
let placeRows = 0;
let pointMaps = 0;
let representativeMaps = 0;
let areaMaps = 0;

for (const { filePath, html } of detailFiles) {
  const currentPlaceRows = countMarker(html, "data-place-item");
  if (currentPlaceRows === 0) continue;
  const route = `/${path.relative(outputRoot, path.dirname(filePath)).split(path.sep).join("/")}/`.replace(/^\/\.\//u, "/");
  const mapTag = html.match(/<div\b[^>]*class=["'][^"']*yk-place-map[^"']*["'][^>]*>/iu)?.[0];
  const mode = mapTag ? attribute(mapTag, "data-map-mode") : undefined;
  if (mode === "point") pointMaps += 1;
  if (mode === "representative") representativeMaps += 1;
  if (mode === "area") areaMaps += 1;
  if (html.includes("data-place-detail-page")) mappedPlaceDetails += 1;
  else mappedEntityDetails += 1;
  mappedDetails += 1;
  placeRows += currentPlaceRows;
  errors.push(...validateMapHtml(html, route));
}

if (verifyFixtures) verifyNegativeFixtures();

if (errors.length > 0) {
  throw new Error(`Matsuri embedded-map coverage failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
}

assert(mappedEntityDetails > 0, "No Matsuri Entity detail page with Place records was checked");
assert(mappedPlaceDetails > 0, "No Matsuri Place detail page was checked");
console.log(
  `Matsuri embedded-map coverage verified: ${mappedDetails} detail pages (${mappedEntityDetails} Entity details and ${mappedPlaceDetails} Place details), ${placeRows} Place rows, ${pointMaps} point maps, ${representativeMaps} representative maps, ${areaMaps} area maps, zero API keys, and ${verifyFixtures ? "all negative fixtures rejected" : "fixtures not requested"}.`,
);
