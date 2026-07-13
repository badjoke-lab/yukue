import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const configPath = path.join(
  repositoryRoot,
  "config",
  "matsuri-search-engine-submission.json",
);
const reportRoot = path.join(
  repositoryRoot,
  "artifacts",
  "matsuri-indexability-preflight",
);
const expectedOrigin = "https://matsuri-yukue.badjoke-lab.com";
const expectedSitemap = `${expectedOrigin}/sitemap.xml`;
const expectedProperty = `${expectedOrigin}/`;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function attribute(tag, name) {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "iu"),
  );
  return match?.[2];
}

function canonicalFromHtml(html) {
  const tags = html.match(/<link\b[^>]*>/giu) ?? [];
  const canonicalTag = tags.find((tag) =>
    attribute(tag, "rel")
      ?.split(/\s+/u)
      .some((token) => token.toLowerCase() === "canonical"),
  );
  return canonicalTag ? attribute(canonicalTag, "href") : undefined;
}

function robotsMetaFromHtml(html) {
  const tags = html.match(/<meta\b[^>]*>/giu) ?? [];
  const robotsTag = tags.find(
    (tag) => attribute(tag, "name")?.toLowerCase() === "robots",
  );
  return robotsTag ? attribute(robotsTag, "content") : undefined;
}

async function fetchText(url, accept) {
  const response = await fetch(url, {
    headers: {
      accept,
      "user-agent": "Yukue-F2-24-Indexability-Preflight/1.0",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(30_000),
  });
  const body = await response.text();
  return {
    url,
    finalUrl: response.url,
    status: response.status,
    contentType: response.headers.get("content-type") ?? "",
    xRobotsTag: response.headers.get("x-robots-tag"),
    body,
  };
}

assert(fs.existsSync(configPath), "F2-24 submission configuration is missing.");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

assert(config.schema_version === 1, "Unexpected F2-24 config schema version.");
assert(config.gate_id === "F2-24", "Submission config must identify F2-24.");
assert(config.canonical_origin === expectedOrigin, "Unexpected canonical origin.");
assert(config.sitemap_url === expectedSitemap, "Unexpected canonical sitemap URL.");
assert(
  config.google_search_console?.property_type === "url-prefix",
  "Google Search Console property type must remain URL-prefix.",
);
assert(
  config.google_search_console?.property === expectedProperty,
  "Google Search Console URL-prefix property is incorrect.",
);
assert(
  config.google_search_console?.ownership_status === "external-access-pending",
  "Ownership must remain pending until external evidence is recorded.",
);
assert(
  config.google_search_console?.sitemaps_report_submission === "not-recorded",
  "Search Console submission must not be claimed without evidence.",
);
assert(
  config.google_search_console?.indexability_status === "not-verified",
  "Indexability must remain unverified before F2-24 external evidence.",
);
assert(
  config.google_search_console?.indexation_status === "not-claimed",
  "Indexation must not be claimed before search-engine evidence.",
);
assert(
  config.boundaries?.robots_discovery_is_not_search_console_submission === true &&
    config.boundaries?.submission_is_not_indexation === true &&
    config.boundaries?.indexability_is_not_indexation === true &&
    config.boundaries?.no_account_identifier_in_public_repository === true &&
    config.boundaries?.no_oauth_token_in_public_repository === true,
  "F2-24 safety boundaries are incomplete.",
);

const [robotsResponse, sitemapResponse, homeResponse, manifestResponse] =
  await Promise.all([
    fetchText(`${expectedOrigin}/robots.txt`, "text/plain,*/*;q=0.8"),
    fetchText(expectedSitemap, "application/xml,text/xml,*/*;q=0.8"),
    fetchText(`${expectedOrigin}/`, "text/html,*/*;q=0.8"),
    fetchText(`${expectedOrigin}/data/manifest.json`, "application/json,*/*;q=0.8"),
  ]);

for (const response of [
  robotsResponse,
  sitemapResponse,
  homeResponse,
  manifestResponse,
]) {
  assert(response.status === 200, `${response.url} returned ${response.status}.`);
  assert(response.finalUrl === response.url, `${response.url} redirected to ${response.finalUrl}.`);
  assert(
    !response.xRobotsTag?.toLowerCase().includes("noindex"),
    `${response.url} is blocked by X-Robots-Tag: ${response.xRobotsTag}.`,
  );
}

assert(
  robotsResponse.body.includes("User-agent: *") &&
    robotsResponse.body.includes("Allow: /") &&
    robotsResponse.body.includes(`Sitemap: ${expectedSitemap}`) &&
    !/^Disallow:\s*\/$/mu.test(robotsResponse.body),
  "Live robots.txt does not expose the intended public sitemap policy.",
);

const sitemapLocations = [
  ...sitemapResponse.body.matchAll(/<loc>(.*?)<\/loc>/gu),
].map((match) => match[1]);
assert(sitemapLocations.length > 0, "Live sitemap has no URL locations.");
assert(
  new Set(sitemapLocations).size === sitemapLocations.length,
  "Live sitemap contains duplicate locations.",
);
for (const location of sitemapLocations) {
  const url = new URL(location);
  assert(url.origin === expectedOrigin, `Sitemap URL is outside canonical origin: ${location}.`);
  assert(!url.search && !url.hash, `Sitemap URL is not clean: ${location}.`);
}

const homeCanonical = canonicalFromHtml(homeResponse.body);
const homeRobots = robotsMetaFromHtml(homeResponse.body);
assert(homeCanonical === `${expectedOrigin}/`, `Homepage canonical is ${String(homeCanonical)}.`);
assert(homeRobots, "Homepage robots meta is missing.");
const normalizedHomeRobots = homeRobots.toLowerCase();
assert(
  normalizedHomeRobots.includes("index") &&
    normalizedHomeRobots.includes("follow") &&
    !normalizedHomeRobots.includes("noindex"),
  `Homepage is not indexable: ${homeRobots}.`,
);

const manifest = JSON.parse(manifestResponse.body);
assert(manifest.site_id === "matsuri", "Live manifest site_id is not matsuri.");
assert(manifest.site_origin === expectedOrigin, "Live manifest site_origin is incorrect.");

const report = {
  format_version: 1,
  gate_id: "F2-24",
  checked_at: new Date().toISOString(),
  canonical_origin: expectedOrigin,
  sitemap_url: expectedSitemap,
  google_search_console: {
    property_type: config.google_search_console.property_type,
    property: config.google_search_console.property,
    ownership_status: config.google_search_console.ownership_status,
    robots_txt_sitemap_discovery: "verified-active",
    sitemaps_report_submission: config.google_search_console.sitemaps_report_submission,
    indexability_status: "technical-preflight-passed-external-console-pending",
    indexation_status: config.google_search_console.indexation_status,
  },
  live_checks: {
    robots_status: robotsResponse.status,
    sitemap_status: sitemapResponse.status,
    homepage_status: homeResponse.status,
    manifest_status: manifestResponse.status,
    sitemap_location_count: sitemapLocations.length,
    homepage_canonical: homeCanonical,
    homepage_robots: homeRobots,
    x_robots_tag_blocking: false,
    manifest_origin: manifest.site_origin,
  },
  boundaries: {
    search_console_ownership_verified: false,
    search_console_submission_recorded: false,
    indexation_claimed: false,
  },
};

const markdown = `# Matsuri F2-24 Indexability Preflight\n\n` +
  `- Checked at: ${report.checked_at}\n` +
  `- Canonical origin: ${expectedOrigin}\n` +
  `- Sitemap: ${expectedSitemap}\n` +
  `- Sitemap URL count: ${sitemapLocations.length}\n` +
  `- robots.txt discovery: verified active\n` +
  `- Homepage self-canonical: verified\n` +
  `- Indexable HTML directives: verified\n` +
  `- Search Console ownership: external access pending\n` +
  `- Search Console Sitemaps report submission: not recorded\n` +
  `- Indexation: not claimed\n`;

fs.rmSync(reportRoot, { recursive: true, force: true });
fs.mkdirSync(reportRoot, { recursive: true });
fs.writeFileSync(
  path.join(reportRoot, "report.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);
fs.writeFileSync(path.join(reportRoot, "report.md"), markdown, "utf8");

console.log(
  `Matsuri F2-24 preflight passed: ${sitemapLocations.length} canonical sitemap URLs, robots discovery active, homepage indexable; Search Console ownership and explicit submission remain pending.`,
);
