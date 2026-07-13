import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const rawOrigin = process.env.MATSURI_CHECK_ORIGIN;
const reportRoot = path.resolve(
  repositoryRoot,
  process.env.MATSURI_CRAWLER_REPORT_DIR ??
    "artifacts/matsuri-crawler-reachability",
);

if (!rawOrigin) {
  throw new Error(
    "MATSURI_CHECK_ORIGIN is required, for example https://matsuri-yukue.badjoke-lab.com",
  );
}

let parsedOrigin;
try {
  parsedOrigin = new URL(rawOrigin);
} catch {
  throw new Error(`Invalid MATSURI_CHECK_ORIGIN: ${rawOrigin}`);
}

if (parsedOrigin.protocol !== "https:") {
  throw new Error(`Crawler verification requires HTTPS: ${parsedOrigin.protocol}`);
}

parsedOrigin.pathname = "/";
parsedOrigin.search = "";
parsedOrigin.hash = "";
const origin = parsedOrigin.origin;

const userAgents = [
  { id: "generic", value: "yukue-crawler-reachability/1.0" },
  { id: "googlebot-label", value: "Googlebot" },
  { id: "bingbot-label", value: "bingbot" },
  { id: "ai-search-label", value: "OAI-SearchBot" },
];

const representativePaths = [
  "/",
  "/festivals/",
  "/festivals/suneori-amagoi/",
  "/search/",
  "/methodology/",
  "/data/",
  "/status/",
];

const discoveryPaths = [
  ["/robots.txt", "text/plain"],
  ["/sitemap.xml", "xml"],
  ["/llms.txt", "text/plain"],
  ["/ai.txt", "text/plain"],
  ["/version.json", "application/json"],
  ["/data/manifest.json", "application/json"],
];

const report = {
  format_version: 1,
  checked_at: new Date().toISOString(),
  origin,
  result: "running",
  robots: null,
  sitemap: null,
  sitemap_routes: [],
  representative_user_agent_checks: [],
  discovery_checks: [],
  limitations: [
    "A representative User-Agent header check does not prove access from a crawler operator's own network or verified IP ranges.",
    "robots.txt is a publication policy signal, not an authentication or access-control boundary.",
    "This gate verifies reachability and indexing directives; it does not prove search-engine submission or indexation.",
  ],
};

function ensureReportRoot() {
  fs.mkdirSync(reportRoot, { recursive: true });
}

function writeReport() {
  ensureReportRoot();
  fs.writeFileSync(
    path.join(reportRoot, "report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );

  const summary = [
    "# Matsuri crawler reachability",
    "",
    `Result: **${report.result}**`,
    "",
    `- Origin: \`${origin}\``,
    `- Checked at: \`${report.checked_at}\``,
    `- Sitemap routes: ${report.sitemap_routes.length}`,
    `- Representative UA checks: ${report.representative_user_agent_checks.length}`,
    `- Discovery checks: ${report.discovery_checks.length}`,
    "",
    "## Limitations",
    "",
    ...report.limitations.map((item) => `- ${item}`),
    "",
  ].join("\n");

  fs.writeFileSync(path.join(reportRoot, "report.md"), summary, "utf8");
}

function contentTypeMatches(actual, expected) {
  const normalized = actual.toLowerCase();
  if (expected === "xml") {
    return normalized.includes("xml") || normalized.includes("text/plain");
  }
  return normalized.includes(expected.toLowerCase());
}

async function fetchResource(pathname, userAgent, expectedContentType) {
  const url = new URL(pathname, `${origin}/`);
  const response = await fetch(url, {
    headers: {
      "user-agent": userAgent,
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,application/json;q=0.8,text/plain;q=0.7,*/*;q=0.5",
    },
    redirect: "follow",
  });

  const contentType = response.headers.get("content-type") ?? "";
  const xRobotsTag = response.headers.get("x-robots-tag") ?? "";
  const body = await response.text();

  if (!response.ok) {
    throw new Error(
      `${pathname} returned HTTP ${response.status} for User-Agent ${userAgent}`,
    );
  }
  if (!contentTypeMatches(contentType, expectedContentType)) {
    throw new Error(
      `${pathname} returned ${contentType}; expected ${expectedContentType}`,
    );
  }
  if (body.trim().length === 0) {
    throw new Error(`${pathname} returned an empty body`);
  }
  if (/\bnoindex\b/iu.test(xRobotsTag) || /\bnone\b/iu.test(xRobotsTag)) {
    throw new Error(`${pathname} returned blocking X-Robots-Tag: ${xRobotsTag}`);
  }

  return {
    url: response.url,
    status: response.status,
    content_type: contentType,
    x_robots_tag: xRobotsTag || null,
    body,
  };
}

function extractCanonical(html) {
  const tags = html.match(/<link\b[^>]*>/giu) ?? [];
  for (const tag of tags) {
    const rel = tag.match(/\brel\s*=\s*(["'])(.*?)\1/iu)?.[2] ?? "";
    if (!rel.split(/\s+/u).some((token) => token.toLowerCase() === "canonical")) {
      continue;
    }
    const href = tag.match(/\bhref\s*=\s*(["'])(.*?)\1/iu)?.[2];
    if (href) return href;
  }
  return null;
}

function extractMetaRobots(html) {
  const tags = html.match(/<meta\b[^>]*>/giu) ?? [];
  for (const tag of tags) {
    const name = tag.match(/\bname\s*=\s*(["'])(.*?)\1/iu)?.[2] ?? "";
    if (name.toLowerCase() !== "robots") continue;
    return tag.match(/\bcontent\s*=\s*(["'])(.*?)\1/iu)?.[2] ?? "";
  }
  return null;
}

function assertIndexableHtml(pathname, body) {
  const expectedUrl = new URL(pathname, `${origin}/`);
  expectedUrl.search = "";
  expectedUrl.hash = "";

  const canonical = extractCanonical(body);
  if (!canonical) {
    throw new Error(`${pathname} has no canonical link`);
  }

  const canonicalUrl = new URL(canonical, `${origin}/`);
  canonicalUrl.search = "";
  canonicalUrl.hash = "";
  if (canonicalUrl.href !== expectedUrl.href) {
    throw new Error(
      `${pathname} canonical mismatch: ${canonicalUrl.href} !== ${expectedUrl.href}`,
    );
  }

  const metaRobots = extractMetaRobots(body);
  if (metaRobots && /\b(?:noindex|none)\b/iu.test(metaRobots)) {
    throw new Error(`${pathname} has blocking meta robots: ${metaRobots}`);
  }

  return {
    canonical: canonicalUrl.href,
    meta_robots: metaRobots,
  };
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

try {
  const genericAgent = userAgents[0].value;
  const robotsResponse = await fetchResource(
    "/robots.txt",
    genericAgent,
    "text/plain",
  );
  const robots = robotsResponse.body;
  const sitemapDirective = `${origin}/sitemap.xml`;

  if (!/^User-agent:\s*\*\s*$/imu.test(robots)) {
    throw new Error("robots.txt is missing User-agent: *");
  }
  if (!/^Allow:\s*\/\s*$/imu.test(robots)) {
    throw new Error("robots.txt is missing Allow: /");
  }
  if (/^Disallow:\s*\/\s*$/imu.test(robots)) {
    throw new Error("robots.txt blocks the complete public site");
  }
  if (!new RegExp(`^Sitemap:\\s*${sitemapDirective.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")}\\s*$`, "imu").test(robots)) {
    throw new Error(`robots.txt is missing exact canonical Sitemap: ${sitemapDirective}`);
  }

  report.robots = {
    status: robotsResponse.status,
    content_type: robotsResponse.content_type,
    allows_public_root: true,
    blocks_public_root: false,
    sitemap: sitemapDirective,
  };

  const sitemapResponse = await fetchResource(
    "/sitemap.xml",
    genericAgent,
    "xml",
  );
  const locations = parseSitemapLocations(sitemapResponse.body);
  if (locations.length === 0) {
    throw new Error("sitemap.xml has no URL locations");
  }
  if (new Set(locations).size !== locations.length) {
    throw new Error("sitemap.xml contains duplicate locations");
  }

  for (const location of locations) {
    const url = new URL(location);
    if (url.origin !== origin) {
      throw new Error(`Sitemap location uses another origin: ${location}`);
    }
    if (url.search || url.hash) {
      throw new Error(`Sitemap location contains query or fragment: ${location}`);
    }
  }

  report.sitemap = {
    status: sitemapResponse.status,
    content_type: sitemapResponse.content_type,
    location_count: locations.length,
    canonical_origin_only: true,
    duplicate_count: 0,
  };

  for (const location of locations) {
    const url = new URL(location);
    const response = await fetchResource(url.pathname, genericAgent, "text/html");
    const indexability = assertIndexableHtml(url.pathname, response.body);
    report.sitemap_routes.push({
      path: url.pathname,
      status: response.status,
      canonical: indexability.canonical,
      meta_robots: indexability.meta_robots,
      x_robots_tag: response.x_robots_tag,
    });
  }

  for (const agent of userAgents) {
    for (const pathname of representativePaths) {
      const response = await fetchResource(pathname, agent.value, "text/html");
      const indexability = assertIndexableHtml(pathname, response.body);
      report.representative_user_agent_checks.push({
        user_agent_id: agent.id,
        path: pathname,
        status: response.status,
        canonical: indexability.canonical,
        meta_robots: indexability.meta_robots,
        x_robots_tag: response.x_robots_tag,
      });
    }
  }

  for (const agent of [userAgents[0], userAgents[3]]) {
    for (const [pathname, expectedContentType] of discoveryPaths) {
      const response = await fetchResource(
        pathname,
        agent.value,
        expectedContentType,
      );
      report.discovery_checks.push({
        user_agent_id: agent.id,
        path: pathname,
        status: response.status,
        content_type: response.content_type,
        x_robots_tag: response.x_robots_tag,
      });
    }
  }

  report.result = "passed";
  writeReport();
  console.log(
    `Matsuri crawler reachability passed for ${origin}: ${locations.length} sitemap routes, ${report.representative_user_agent_checks.length} representative UA checks, and ${report.discovery_checks.length} discovery checks.`,
  );
} catch (error) {
  report.result = "failed";
  report.error = error instanceof Error ? error.message : String(error);
  writeReport();
  throw error;
}
