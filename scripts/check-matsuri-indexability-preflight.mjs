import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const rawOrigin = process.env.MATSURI_CHECK_ORIGIN;
const reportRoot = path.resolve(
  repositoryRoot,
  process.env.MATSURI_INDEXABILITY_REPORT_DIR ??
    "artifacts/matsuri-indexability-preflight",
);

if (!rawOrigin) {
  throw new Error(
    "MATSURI_CHECK_ORIGIN is required, for example https://matsuri-yukue.badjoke-lab.com",
  );
}

let originUrl;
try {
  originUrl = new URL(rawOrigin);
} catch {
  throw new Error(`Invalid MATSURI_CHECK_ORIGIN: ${rawOrigin}`);
}

if (originUrl.protocol !== "https:") {
  throw new Error(`Indexability preflight requires HTTPS: ${originUrl.protocol}`);
}

originUrl.pathname = "/";
originUrl.search = "";
originUrl.hash = "";
const origin = originUrl.origin;
const sitemapUrl = `${origin}/sitemap.xml`;
const robotsUrl = `${origin}/robots.txt`;
const userAgent = "yukue-indexability-preflight/1.0";

const report = {
  format_version: 1,
  checked_at: new Date().toISOString(),
  site_id: "matsuri",
  origin,
  sitemap_url: sitemapUrl,
  result: "running",
  technical_indexability: "unknown",
  search_engine_submission: {
    performed_by_this_check: false,
    owner_account_required: true,
    status: "not_performed",
    note:
      "This preflight does not use a search-engine owner account and cannot prove sitemap submission or indexation.",
  },
  robots: null,
  sitemap: null,
  routes: [],
  representative_routes: [],
  limitations: [
    "Technical indexability does not prove that a search engine has crawled or indexed a URL.",
    "A sitemap submission is a discovery hint and must not be represented as an indexation result.",
    "Search-engine owner-account evidence must be recorded separately without exposing private account identifiers.",
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

  const lines = [
    "# Matsuri F2-24 indexability preflight",
    "",
    `Result: **${report.result}**`,
    "",
    `- Origin: \`${origin}\``,
    `- Sitemap: \`${sitemapUrl}\``,
    `- Checked at: \`${report.checked_at}\``,
    `- Technical indexability: \`${report.technical_indexability}\``,
    `- Sitemap routes: ${report.routes.length}`,
    `- Search-engine submission performed: ${report.search_engine_submission.performed_by_this_check}`,
    "",
    "## Boundary",
    "",
    ...report.limitations.map((item) => `- ${item}`),
    "",
  ];

  fs.writeFileSync(path.join(reportRoot, "report.md"), lines.join("\n"), "utf8");
}

async function fetchText(url, expectedContentType) {
  const response = await fetch(url, {
    headers: {
      "user-agent": userAgent,
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.5",
    },
    redirect: "follow",
  });

  const contentType = response.headers.get("content-type") ?? "";
  const xRobotsTag = response.headers.get("x-robots-tag") ?? "";
  const body = await response.text();

  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }
  if (!contentType.toLowerCase().includes(expectedContentType.toLowerCase())) {
    throw new Error(
      `${url} returned ${contentType}; expected ${expectedContentType}`,
    );
  }
  if (body.trim().length === 0) {
    throw new Error(`${url} returned an empty body`);
  }

  return {
    requested_url: url,
    final_url: response.url,
    status: response.status,
    content_type: contentType,
    x_robots_tag: xRobotsTag || null,
    body,
  };
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function parseSitemapLocations(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gu)].map((match) =>
    decodeXml(match[1].trim()),
  );
}

function extractLinkCanonical(html) {
  const tags = html.match(/<link\b[^>]*>/giu) ?? [];
  for (const tag of tags) {
    const rel = tag.match(/\brel\s*=\s*(["'])(.*?)\1/iu)?.[2] ?? "";
    if (!rel.split(/\s+/u).some((token) => token.toLowerCase() === "canonical")) {
      continue;
    }
    return tag.match(/\bhref\s*=\s*(["'])(.*?)\1/iu)?.[2] ?? null;
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

function extractTitle(html) {
  return html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/iu)?.[1]?.trim() ?? "";
}

function extractH1Count(html) {
  return (html.match(/<h1\b/giu) ?? []).length;
}

function normalizeUrl(value) {
  const url = new URL(value);
  url.search = "";
  url.hash = "";
  return url.href;
}

function hasBlockingRobots(value) {
  return /(?:^|[\s,])(?:noindex|none)(?:$|[\s,])/iu.test(value ?? "");
}

function isRepresentative(pathname) {
  return new Set([
    "/",
    "/festivals/",
    "/festivals/suneori-amagoi/",
    "/search/",
    "/methodology/",
    "/data/",
    "/status/",
  ]).has(pathname);
}

try {
  const robotsResponse = await fetchText(robotsUrl, "text/plain");
  const robots = robotsResponse.body;

  if (!/^User-agent:\s*\*\s*$/imu.test(robots)) {
    throw new Error("robots.txt is missing User-agent: *");
  }
  if (!/^Allow:\s*\/\s*$/imu.test(robots)) {
    throw new Error("robots.txt is missing Allow: /");
  }
  if (/^Disallow:\s*\/\s*$/imu.test(robots)) {
    throw new Error("robots.txt blocks the complete public site");
  }
  if (
    !robots
      .split(/\r?\n/u)
      .some((line) => line.trim() === `Sitemap: ${sitemapUrl}`)
  ) {
    throw new Error(`robots.txt is missing exact Sitemap directive: ${sitemapUrl}`);
  }

  report.robots = {
    url: robotsUrl,
    status: robotsResponse.status,
    public_root_allowed: true,
    public_root_blocked: false,
    exact_sitemap_directive: true,
  };

  const sitemapResponse = await fetchText(sitemapUrl, "xml");
  const locations = parseSitemapLocations(sitemapResponse.body);
  if (locations.length === 0) {
    throw new Error("sitemap.xml has no URL locations");
  }
  if (new Set(locations).size !== locations.length) {
    throw new Error("sitemap.xml contains duplicate URL locations");
  }

  for (const location of locations) {
    const parsed = new URL(location);
    if (parsed.protocol !== "https:") {
      throw new Error(`Sitemap URL is not HTTPS: ${location}`);
    }
    if (parsed.origin !== origin) {
      throw new Error(`Sitemap URL uses another origin: ${location}`);
    }
    if (parsed.search || parsed.hash) {
      throw new Error(`Sitemap URL contains a query or fragment: ${location}`);
    }
  }

  report.sitemap = {
    url: sitemapUrl,
    status: sitemapResponse.status,
    location_count: locations.length,
    duplicate_count: 0,
    https_only: true,
    canonical_origin_only: true,
  };

  for (const location of locations) {
    const expected = normalizeUrl(location);
    const response = await fetchText(location, "text/html");
    const finalUrl = normalizeUrl(response.final_url);
    const canonicalValue = extractLinkCanonical(response.body);
    const metaRobots = extractMetaRobots(response.body);
    const title = extractTitle(response.body);
    const h1Count = extractH1Count(response.body);

    if (finalUrl !== expected) {
      throw new Error(`${location} redirects to another final URL: ${finalUrl}`);
    }
    if (!canonicalValue) {
      throw new Error(`${location} has no canonical link`);
    }

    const canonical = normalizeUrl(new URL(canonicalValue, location).href);
    if (canonical !== expected) {
      throw new Error(`${location} canonical mismatch: ${canonical}`);
    }
    if (hasBlockingRobots(metaRobots)) {
      throw new Error(`${location} has blocking meta robots: ${metaRobots}`);
    }
    if (hasBlockingRobots(response.x_robots_tag)) {
      throw new Error(
        `${location} has blocking X-Robots-Tag: ${response.x_robots_tag}`,
      );
    }
    if (!title) {
      throw new Error(`${location} has no non-empty title`);
    }
    if (h1Count !== 1) {
      throw new Error(`${location} has ${h1Count} h1 elements; expected exactly 1`);
    }

    const result = {
      url: location,
      status: response.status,
      final_url: response.final_url,
      canonical,
      meta_robots: metaRobots,
      x_robots_tag: response.x_robots_tag,
      title_present: true,
      h1_count: h1Count,
      technically_indexable: true,
    };
    report.routes.push(result);
    if (isRepresentative(new URL(location).pathname)) {
      report.representative_routes.push(result);
    }
  }

  report.result = "passed";
  report.technical_indexability = "passed";
  writeReport();
  console.log(
    `Matsuri F2-24 indexability preflight passed for ${origin}: ${report.routes.length} sitemap routes and ${report.representative_routes.length} representative routes are technically indexable. Search-engine submission was not performed.`,
  );
} catch (error) {
  report.result = "failed";
  report.technical_indexability = "failed";
  report.error = error instanceof Error ? error.message : String(error);
  writeReport();
  throw error;
}
