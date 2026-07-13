import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = path.join(repositoryRoot, "apps", "matsuri", "dist");
const localOrigin = "https://matsuri.invalid";

const requiredRoutes = [
  "/",
  "/about/",
  "/festivals/",
  "/festivals/suneori-amagoi/",
  "/performances/",
  "/organizations/",
  "/regions/",
  "/changes/",
  "/states/",
  "/states/active/",
  "/states/reduced_activity/",
  "/states/suspended/",
  "/states/dormant/",
  "/states/reviving/",
  "/states/discontinued/",
  "/states/unknown/",
  "/search/",
  "/methodology/",
  "/data/",
  "/status/",
];

const requiredAssetFiles = [
  "pagefind/pagefind.js",
  "version.json",
  "data/manifest.json",
  "data/entities.json",
  "data/events.json",
  "data/relations.json",
  "data/occurrences.json",
  "llms.txt",
  "ai.txt",
  "robots.txt",
  "sitemap.xml",
];

const forbiddenUnpublishedRoutePatterns = [
  /^\/shrines(?:\/|$)/u,
  /^\/temples(?:\/|$)/u,
  /^\/jinja(?:\/|$)/u,
  /^\/jiin(?:\/|$)/u,
];

function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

function walkFiles(directory, relativeDirectory = "") {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name);
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkFiles(absolutePath, relativePath));
    } else if (entry.isFile()) {
      files.push(toPosixPath(relativePath));
    }
  }

  return files;
}

function routeToHtmlFile(route) {
  if (route === "/") return "index.html";

  const withoutLeadingSlash = route.replace(/^\//u, "");
  if (route.endsWith("/")) return `${withoutLeadingSlash}index.html`;
  if (route.endsWith(".html")) return withoutLeadingSlash;
  return `${withoutLeadingSlash}/index.html`;
}

function htmlFileToRoute(relativePath) {
  if (relativePath === "index.html") return "/";
  return `/${relativePath.slice(0, -"index.html".length)}`;
}

function decodeXmlEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function decodeHtmlAttribute(value) {
  return decodeXmlEntities(value).replaceAll("&#39;", "'");
}

function normalizeSitemapLocation(location) {
  const decoded = decodeXmlEntities(location.trim());
  const url = new URL(decoded, localOrigin);
  return url.pathname;
}

function targetExists(pathname, fileSet) {
  if (pathname === "/") return fileSet.has("index.html");

  const relativePath = pathname.replace(/^\//u, "");
  const candidates = [relativePath];

  if (pathname.endsWith("/")) {
    candidates.push(`${relativePath}index.html`);
  } else {
    candidates.push(`${relativePath}/index.html`, `${relativePath}.html`);
  }

  return candidates.some((candidate) => fileSet.has(candidate));
}

if (!fs.existsSync(outputRoot) || !fs.statSync(outputRoot).isDirectory()) {
  throw new Error(
    `Matsuri Pages artifact is missing: ${path.relative(repositoryRoot, outputRoot)}`,
  );
}

const artifactFiles = walkFiles(outputRoot).sort((a, b) => a.localeCompare(b));
const artifactFileSet = new Set(artifactFiles);

const requiredFiles = [
  ...requiredRoutes.map(routeToHtmlFile),
  ...requiredAssetFiles,
];
const missingRequiredFiles = requiredFiles.filter(
  (relativePath) => !artifactFileSet.has(relativePath),
);

if (missingRequiredFiles.length > 0) {
  throw new Error(
    `Matsuri Pages artifact is incomplete. Missing:\n${missingRequiredFiles
      .map((relativePath) => `- ${relativePath}`)
      .join("\n")}`,
  );
}

const publicRoutes = artifactFiles
  .filter((relativePath) => relativePath.endsWith("index.html"))
  .filter(
    (relativePath) =>
      !relativePath.startsWith("pagefind/") &&
      !relativePath.startsWith("_astro/"),
  )
  .map(htmlFileToRoute)
  .sort((a, b) => a.localeCompare(b));
const publicRouteSet = new Set(publicRoutes);

const sitemapContent = fs.readFileSync(
  path.join(outputRoot, "sitemap.xml"),
  "utf8",
);
const sitemapLocations = [
  ...sitemapContent.matchAll(/<loc>([\s\S]*?)<\/loc>/gu),
].map((match) => normalizeSitemapLocation(match[1]));
const sitemapRouteSet = new Set(sitemapLocations);

const duplicateSitemapRoutes = sitemapLocations.filter(
  (route, index) => sitemapLocations.indexOf(route) !== index,
);
const routesMissingFromSitemap = publicRoutes.filter(
  (route) => !sitemapRouteSet.has(route),
);
const sitemapRoutesWithoutHtml = [...sitemapRouteSet]
  .filter((route) => !publicRouteSet.has(route))
  .sort((a, b) => a.localeCompare(b));

const sitemapErrors = [];

if (duplicateSitemapRoutes.length > 0) {
  sitemapErrors.push(
    `duplicate sitemap routes:\n${[...new Set(duplicateSitemapRoutes)]
      .sort((a, b) => a.localeCompare(b))
      .map((route) => `  - ${route}`)
      .join("\n")}`,
  );
}

if (routesMissingFromSitemap.length > 0) {
  sitemapErrors.push(
    `generated HTML routes missing from sitemap:\n${routesMissingFromSitemap
      .map((route) => `  - ${route}`)
      .join("\n")}`,
  );
}

if (sitemapRoutesWithoutHtml.length > 0) {
  sitemapErrors.push(
    `sitemap routes without generated HTML:\n${sitemapRoutesWithoutHtml
      .map((route) => `  - ${route}`)
      .join("\n")}`,
  );
}

if (sitemapErrors.length > 0) {
  throw new Error(`Matsuri sitemap inventory mismatch:\n${sitemapErrors.join("\n")}`);
}

const brokenInternalLinks = [];
const forbiddenInternalLinks = [];
const hrefPattern = /\bhref\s*=\s*(["'])(.*?)\1/giu;

for (const route of publicRoutes) {
  const htmlFile = routeToHtmlFile(route);
  const html = fs.readFileSync(path.join(outputRoot, htmlFile), "utf8");

  for (const match of html.matchAll(hrefPattern)) {
    const rawHref = decodeHtmlAttribute(match[2].trim());

    if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("//")) {
      continue;
    }

    if (/^[a-z][a-z\d+.-]*:/iu.test(rawHref)) {
      continue;
    }

    const resolvedUrl = new URL(rawHref, `${localOrigin}${route}`);
    const pathname = resolvedUrl.pathname;

    if (
      forbiddenUnpublishedRoutePatterns.some((pattern) => pattern.test(pathname))
    ) {
      forbiddenInternalLinks.push(`${route} -> ${rawHref} (${pathname})`);
      continue;
    }

    if (!targetExists(pathname, artifactFileSet)) {
      brokenInternalLinks.push(`${route} -> ${rawHref} (${pathname})`);
    }
  }
}

if (forbiddenInternalLinks.length > 0 || brokenInternalLinks.length > 0) {
  const linkErrors = [];

  if (forbiddenInternalLinks.length > 0) {
    linkErrors.push(
      `links to unpublished Shrine or Temple detail surfaces:\n${[
        ...new Set(forbiddenInternalLinks),
      ]
        .sort((a, b) => a.localeCompare(b))
        .map((link) => `  - ${link}`)
        .join("\n")}`,
    );
  }

  if (brokenInternalLinks.length > 0) {
    linkErrors.push(
      `broken internal links:\n${[...new Set(brokenInternalLinks)]
        .sort((a, b) => a.localeCompare(b))
        .map((link) => `  - ${link}`)
        .join("\n")}`,
    );
  }

  throw new Error(`Matsuri static-link integrity failed:\n${linkErrors.join("\n")}`);
}

const manifest = JSON.parse(
  fs.readFileSync(path.join(outputRoot, "data", "manifest.json"), "utf8"),
);

if (manifest.site_id !== "matsuri") {
  throw new Error(
    `Unexpected manifest site_id: ${String(manifest.site_id)} (expected matsuri)`,
  );
}

const version = JSON.parse(
  fs.readFileSync(path.join(outputRoot, "version.json"), "utf8"),
);

if (version.site_id !== "matsuri") {
  throw new Error(
    `Unexpected version site_id: ${String(version.site_id)} (expected matsuri)`,
  );
}

const robots = fs.readFileSync(path.join(outputRoot, "robots.txt"), "utf8");
if (!robots.includes("User-agent: *")) {
  throw new Error("Matsuri robots.txt is missing the wildcard user-agent policy.");
}
if (manifest.site_origin) {
  if (!robots.includes("Allow: /") || robots.includes("Disallow: /")) {
    throw new Error("Canonical Matsuri robots.txt must allow the public site.");
  }
  if (!robots.includes(`Sitemap: ${manifest.site_origin}/sitemap.xml`)) {
    throw new Error("Canonical Matsuri robots.txt must advertise the canonical sitemap.");
  }
} else if (!robots.includes("Disallow: /")) {
  throw new Error("Origin-neutral Matsuri artifacts must discourage crawling.");
}

console.log(
  `Matsuri Pages artifact verified: ${requiredFiles.length} required files, ${publicRoutes.length} public routes, ${sitemapLocations.length} sitemap routes, robots policy valid, and all internal links valid.`,
);