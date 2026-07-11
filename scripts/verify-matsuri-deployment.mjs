const originInput = process.argv[2] ?? process.env.MATSURI_DEPLOYMENT_ORIGIN;
const canonicalInput = process.env.MATSURI_EXPECT_CANONICAL_ORIGIN;

if (!originInput) {
  throw new Error(
    "Deployment origin is required. Pass it as the first argument or set MATSURI_DEPLOYMENT_ORIGIN.",
  );
}

function normalizeOrigin(value) {
  const url = new URL(value);
  if (!/^https?:$/.test(url.protocol)) {
    throw new Error(`Unsupported deployment origin protocol: ${url.protocol}`);
  }
  url.pathname = url.pathname.replace(/\/+$/, "");
  url.search = "";
  url.hash = "";
  return url.toString().replace(/\/$/, "");
}

const origin = normalizeOrigin(originInput);
const expectedCanonicalOrigin = canonicalInput
  ? normalizeOrigin(canonicalInput)
  : undefined;

const requiredPaths = [
  "/",
  "/about/",
  "/festivals/",
  "/performances/",
  "/organizations/",
  "/regions/",
  "/changes/",
  "/states/",
  "/search/",
  "/methodology/",
  "/data/",
  "/status/",
  "/version.json",
  "/data/manifest.json",
  "/data/entities.json",
  "/data/events.json",
  "/data/relations.json",
  "/data/occurrences.json",
  "/llms.txt",
  "/ai.txt",
  "/sitemap.xml",
  "/pagefind/pagefind.js",
];

async function fetchRequired(path) {
  const url = new URL(path, `${origin}/`).toString();
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`${path} returned ${response.status} ${response.statusText}`);
  }
  return response;
}

for (const path of requiredPaths) {
  await fetchRequired(path);
}

const versionResponse = await fetchRequired("/version.json");
const version = await versionResponse.json();
if (version.site_id !== "matsuri") {
  throw new Error(
    `Unexpected version site_id: ${String(version.site_id)} (expected matsuri)`,
  );
}

const manifestResponse = await fetchRequired("/data/manifest.json");
const manifest = await manifestResponse.json();
if (manifest.site_id !== "matsuri") {
  throw new Error(
    `Unexpected manifest site_id: ${String(manifest.site_id)} (expected matsuri)`,
  );
}

const entitiesResponse = await fetchRequired("/data/entities.json");
const entities = await entitiesResponse.json();
if (!Array.isArray(entities.records) || entities.records.length === 0) {
  throw new Error("Entity feed contains no public records.");
}
if (!entities.records.some((record) => record.id === "fst-suneori-amagoi")) {
  throw new Error("Known representative record fst-suneori-amagoi is missing.");
}

const searchResponse = await fetchRequired("/search/");
const searchHtml = await searchResponse.text();
if (!searchHtml.includes("pagefind")) {
  throw new Error("Search page does not reference Pagefind assets.");
}

const sitemapResponse = await fetchRequired("/sitemap.xml");
const sitemap = await sitemapResponse.text();
if (!sitemap.includes("<urlset")) {
  throw new Error("sitemap.xml does not contain a urlset element.");
}

if (expectedCanonicalOrigin) {
  if (manifest.site_origin !== expectedCanonicalOrigin) {
    throw new Error(
      `Manifest site_origin mismatch: ${String(manifest.site_origin)} (expected ${expectedCanonicalOrigin})`,
    );
  }

  const locValues = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );
  if (locValues.length === 0) {
    throw new Error("Canonical sitemap contains no loc entries.");
  }
  const invalidLoc = locValues.find(
    (value) => !value.startsWith(`${expectedCanonicalOrigin}/`) && value !== expectedCanonicalOrigin,
  );
  if (invalidLoc) {
    throw new Error(
      `Sitemap loc is outside expected canonical origin: ${invalidLoc}`,
    );
  }
}

console.log(
  `Matsuri deployment verified at ${origin}${
    expectedCanonicalOrigin
      ? ` with canonical origin ${expectedCanonicalOrigin}`
      : ""
  }.`,
);
