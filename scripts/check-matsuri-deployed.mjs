const args = new Set(process.argv.slice(2));
const canonicalMode = args.has("--canonical");
const rawOrigin = process.env.MATSURI_CHECK_ORIGIN;

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

const bodies = new Map();
for (const [pathname, contentType] of checks) {
  bodies.set(pathname, await fetchText(pathname, contentType));
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

  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );

  if (locations.length === 0) {
    throw new Error("Sitemap contains no <loc> entries");
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

  console.log(`canonical origin verified: ${origin}`);
  console.log(`canonical sitemap entries verified: ${locations.length}`);
}

console.log(
  `Matsuri deployed verification passed for ${origin}${canonicalMode ? " in canonical mode" : ""}.`,
);
