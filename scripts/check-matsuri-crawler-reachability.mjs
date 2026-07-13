import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const expectedOrigin = "https://matsuri-yukue.badjoke-lab.com";
const configuredOrigin = (process.env.MATSURI_CRAWLER_ORIGIN ?? "").replace(/\/$/u, "");
const reportPath = process.env.MATSURI_CRAWLER_REPORT
  ? path.resolve(repositoryRoot, process.env.MATSURI_CRAWLER_REPORT)
  : path.join(repositoryRoot, "crawler-verification.json");

const userAgents = [
  {
    name: "Googlebot",
    value:
      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  },
  {
    name: "Bingbot",
    value:
      "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  },
  {
    name: "OAI-SearchBot",
    value: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot",
  },
];

const representativePaths = [
  "/",
  "/search/",
  "/festivals/suneori-amagoi/",
  "/data/manifest.json",
  "/llms.txt",
  "/ai.txt",
];

const htmlPaths = ["/", "/search/", "/festivals/suneori-amagoi/"];

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
  const linkTags = html.match(/<link\b[^>]*>/giu) ?? [];
  const tag = linkTags.find((candidate) =>
    attribute(candidate, "rel")?.split(/\s+/u).includes("canonical"),
  );
  return tag ? attribute(tag, "href") : undefined;
}

function robotsMetaFromHtml(html) {
  const metaTags = html.match(/<meta\b[^>]*>/giu) ?? [];
  const tag = metaTags.find(
    (candidate) => attribute(candidate, "name")?.toLowerCase() === "robots",
  );
  return tag ? attribute(tag, "content") : undefined;
}

async function request(pathname, userAgent) {
  const url = `${configuredOrigin}${pathname}`;
  const response = await fetch(url, {
    headers: {
      "user-agent": userAgent,
      accept: pathname.endsWith(".json")
        ? "application/json,text/plain;q=0.9,*/*;q=0.8"
        : "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.7",
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

assert(configuredOrigin, "MATSURI_CRAWLER_ORIGIN is required.");
assert(
  configuredOrigin === expectedOrigin,
  `Unexpected crawler origin: ${configuredOrigin}; expected ${expectedOrigin}.`,
);

const report = {
  format_version: 1,
  origin: configuredOrigin,
  checked_at: new Date().toISOString(),
  user_agents: userAgents.map((agent) => agent.name),
  representative_paths: representativePaths,
  robots: {},
  sitemap: {},
  canonical_pages: [],
  crawler_requests: [],
};

const genericAgent = "YukueCrawlerVerification/1.0";
const robotsResponse = await request("/robots.txt", genericAgent);
assert(robotsResponse.status === 200, `robots.txt returned ${robotsResponse.status}.`);
assert(
  robotsResponse.finalUrl === `${configuredOrigin}/robots.txt`,
  `robots.txt redirected to ${robotsResponse.finalUrl}.`,
);
assert(
  robotsResponse.contentType.toLowerCase().includes("text/plain"),
  `Unexpected robots.txt content type: ${robotsResponse.contentType}.`,
);
assert(
  robotsResponse.body.includes("User-agent: *") &&
    robotsResponse.body.includes("Allow: /") &&
    !/^Disallow:\s*\/$/mu.test(robotsResponse.body),
  "robots.txt does not allow the complete public site.",
);
assert(
  robotsResponse.body.includes(`Sitemap: ${configuredOrigin}/sitemap.xml`),
  "robots.txt does not advertise the exact canonical sitemap.",
);
report.robots = {
  status: robotsResponse.status,
  content_type: robotsResponse.contentType,
  allows_public_site: true,
  sitemap: `${configuredOrigin}/sitemap.xml`,
};

const sitemapResponse = await request("/sitemap.xml", genericAgent);
assert(sitemapResponse.status === 200, `sitemap.xml returned ${sitemapResponse.status}.`);
assert(
  sitemapResponse.finalUrl === `${configuredOrigin}/sitemap.xml`,
  `sitemap.xml redirected to ${sitemapResponse.finalUrl}.`,
);
assert(
  /(?:application|text)\/xml/iu.test(sitemapResponse.contentType),
  `Unexpected sitemap content type: ${sitemapResponse.contentType}.`,
);
const sitemapLocations = [
  ...sitemapResponse.body.matchAll(/<loc>(.*?)<\/loc>/gu),
].map((match) => match[1]);
assert(sitemapLocations.length > 0, "sitemap.xml contains no locations.");
assert(
  new Set(sitemapLocations).size === sitemapLocations.length,
  "sitemap.xml contains duplicate locations.",
);
for (const location of sitemapLocations) {
  const url = new URL(location);
  assert(
    url.origin === configuredOrigin,
    `Sitemap location uses a non-canonical origin: ${location}.`,
  );
  assert(!url.search && !url.hash, `Sitemap location is not clean: ${location}.`);
}
report.sitemap = {
  status: sitemapResponse.status,
  content_type: sitemapResponse.contentType,
  location_count: sitemapLocations.length,
  all_locations_canonical: true,
};

for (const pathname of htmlPaths) {
  const response = await request(pathname, genericAgent);
  assert(response.status === 200, `${pathname} returned ${response.status}.`);
  const expectedUrl = `${configuredOrigin}${pathname}`;
  assert(response.finalUrl === expectedUrl, `${pathname} resolved to ${response.finalUrl}.`);
  assert(
    response.contentType.toLowerCase().includes("text/html"),
    `${pathname} returned ${response.contentType} instead of HTML.`,
  );
  assert(
    !response.xRobotsTag?.toLowerCase().includes("noindex"),
    `${pathname} is blocked by X-Robots-Tag: ${response.xRobotsTag}.`,
  );
  assert(
    !/just a moment|checking your browser|cf-chl-/iu.test(response.body),
    `${pathname} returned a challenge page.`,
  );
  const canonical = canonicalFromHtml(response.body);
  const robotsMeta = robotsMetaFromHtml(response.body);
  assert(canonical === expectedUrl, `${pathname} canonical is ${String(canonical)}.`);
  assert(robotsMeta, `${pathname} is missing robots meta.`);
  assert(
    robotsMeta.toLowerCase().includes("index") &&
      robotsMeta.toLowerCase().includes("follow") &&
      !robotsMeta.toLowerCase().includes("noindex"),
    `${pathname} robots meta is not indexable: ${robotsMeta}.`,
  );
  assert(
    sitemapLocations.includes(expectedUrl),
    `${pathname} is missing from the canonical sitemap.`,
  );
  report.canonical_pages.push({
    path: pathname,
    status: response.status,
    canonical,
    robots_meta: robotsMeta,
    x_robots_tag: response.xRobotsTag,
  });
}

for (const agent of userAgents) {
  for (const pathname of representativePaths) {
    const response = await request(pathname, agent.value);
    assert(
      response.status === 200,
      `${agent.name} received ${response.status} for ${pathname}.`,
    );
    assert(
      response.finalUrl === `${configuredOrigin}${pathname}`,
      `${agent.name} was redirected for ${pathname} to ${response.finalUrl}.`,
    );
    assert(
      !/just a moment|checking your browser|cf-chl-/iu.test(response.body),
      `${agent.name} received a challenge page for ${pathname}.`,
    );
    assert(
      !response.xRobotsTag?.toLowerCase().includes("noindex"),
      `${agent.name} received noindex for ${pathname}.`,
    );
    report.crawler_requests.push({
      user_agent: agent.name,
      path: pathname,
      status: response.status,
      content_type: response.contentType,
      final_url: response.finalUrl,
    });
  }
}

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log(
  `Matsuri crawler reachability passed: robots and ${sitemapLocations.length} sitemap locations valid; ${htmlPaths.length} canonical HTML pages valid; ${report.crawler_requests.length} representative crawler requests succeeded. Report: ${path.relative(repositoryRoot, reportPath)}`,
);
