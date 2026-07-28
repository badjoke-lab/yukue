import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = path.join(repositoryRoot, "apps", "matsuri", "dist");
const artifactRoot = path.join(repositoryRoot, "artifacts", "matsuri-map-utility");

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

function text(html, selectorPattern) {
  const match = html.match(selectorPattern);
  return match
    ? decodeHtml(match[1].replace(/<[^>]+>/gu, " ")).replace(/\s+/gu, " ").trim()
    : undefined;
}

function routeFor(filePath) {
  const relative = path.relative(outputRoot, path.dirname(filePath)).split(path.sep).join("/");
  return relative ? `/${relative}/` : "/";
}

if (!fs.existsSync(outputRoot)) {
  throw new Error("Matsuri build output is missing; run pnpm build:matsuri:pages first");
}

const records = [];
for (const filePath of walkHtml(outputRoot)) {
  const html = fs.readFileSync(filePath, "utf8");
  if (!html.includes("data-detail-page") && !html.includes("data-place-detail-page")) continue;
  if (!html.includes("data-place-item")) continue;

  const mapTag = html.match(/<div\b[^>]*class=["'][^"']*yk-place-map[^"']*["'][^>]*>/iu)?.[0];
  if (!mapTag) continue;

  const placeRows = [...html.matchAll(/<article\b[^>]*\bdata-place-item(?:=["'][^"']*["'])?[^>]*>/giu)].map(
    (match) => match[0],
  );
  const eligiblePlaceCount = placeRows.filter(
    (row) => attribute(row, "data-map-eligible") === "true",
  ).length;
  const route = routeFor(filePath);
  const h1 = text(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/iu) ?? route;
  const detailType = html.includes("data-place-detail-page") ? "place" : "entity";
  const hasMap = attribute(mapTag, "data-has-map") === "true";

  records.push({
    route,
    title: h1,
    detail_type: detailType,
    status: hasMap ? "anchored" : "location-gap",
    map_mode: attribute(mapTag, "data-map-mode") ?? "missing",
    anchor: attribute(mapTag, "data-map-anchor") ?? null,
    place_count: placeRows.length,
    eligible_place_count: eligiblePlaceCount,
  });
}

records.sort((a, b) => a.route.localeCompare(b.route));
const anchored = records.filter((record) => record.status === "anchored");
const gaps = records.filter((record) => record.status === "location-gap");
const summary = {
  generated_at: new Date().toISOString(),
  checked_detail_count: records.length,
  anchored_detail_count: anchored.length,
  location_gap_count: gaps.length,
  entity_anchor_count: anchored.filter((record) => record.detail_type === "entity").length,
  place_anchor_count: anchored.filter((record) => record.detail_type === "place").length,
};
const report = { schema_version: 1, summary, records };

fs.mkdirSync(artifactRoot, { recursive: true });
fs.writeFileSync(
  path.join(artifactRoot, "map-utility-audit.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);

const markdown = [
  "# Matsuri map utility audit",
  "",
  `- Checked Place-bearing details: ${summary.checked_detail_count}`,
  `- Useful anchored maps: ${summary.anchored_detail_count}`,
  `- Explicit location gaps: ${summary.location_gap_count}`,
  `- Entity anchors: ${summary.entity_anchor_count}`,
  `- Place anchors: ${summary.place_anchor_count}`,
  "",
  "## Location gaps requiring research",
  "",
  ...(gaps.length > 0
    ? gaps.map((record) => `- \`${record.route}\` — ${record.title}`)
    : ["- None"]),
  "",
  "## Anchored details",
  "",
  ...anchored.map((record) => `- \`${record.route}\` — ${record.title} → ${record.anchor}`),
  "",
];
fs.writeFileSync(path.join(artifactRoot, "map-utility-audit.md"), markdown.join("\n"), "utf8");

console.log(
  `Matsuri map utility audit wrote ${records.length} records: ${anchored.length} anchored and ${gaps.length} location gaps.`,
);
