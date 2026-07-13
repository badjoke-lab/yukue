import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = path.join(repositoryRoot, "apps", "matsuri", "dist");
const configuredOrigin = process.env.MATSURI_PUBLIC_ORIGIN;
const canonicalOrigin = configuredOrigin?.replace(/\/$/u, "");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function htmlFiles(directory, relativeDirectory = "") {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = path.join(relativeDirectory, entry.name);
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(absolutePath, relativePath);
    return entry.isFile() && entry.name === "index.html"
      ? [relativePath.split(path.sep).join("/")]
      : [];
  });
}

function htmlPathToRoute(relativePath) {
  if (relativePath === "index.html") return "/";
  return `/${relativePath.slice(0, -"index.html".length)}`;
}

function attribute(tag, name) {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "iu"),
  );
  return match?.[2];
}

function canonicalFromHtml(html) {
  const linkTags = html.match(/<link\b[^>]*>/giu) ?? [];
  const canonicalTag = linkTags.find((tag) => {
    const rel = attribute(tag, "rel");
    return rel?.split(/\s+/u).includes("canonical");
  });
  return canonicalTag ? attribute(canonicalTag, "href") : undefined;
}

function robotsMetaFromHtml(html) {
  const metaTags = html.match(/<meta\b[^>]*>/giu) ?? [];
  const robotsTag = metaTags.find(
    (tag) => attribute(tag, "name")?.toLowerCase() === "robots",
  );
  return robotsTag ? attribute(robotsTag, "content") : undefined;
}

assert(fs.existsSync(outputRoot), "Matsuri dist artifact is missing.");

const robotsPath = path.join(outputRoot, "robots.txt");
const sitemapPath = path.join(outputRoot, "sitemap.xml");
assert(fs.existsSync(robotsPath), "Matsuri robots.txt is missing.");
assert(fs.existsSync(sitemapPath), "Matsuri sitemap.xml is missing.");

const robots = fs.readFileSync(robotsPath, "utf8");
const sitemap = fs.readFileSync(sitemapPath, "utf8");
const routes = htmlFiles(outputRoot).map(htmlPathToRoute).sort();

assert(robots.includes("User-agent: *"), "robots.txt must define User-agent: *.");

if (canonicalOrigin) {
  assert(
    canonicalOrigin === "https://matsuri-yukue.badjoke-lab.com",
    `Unexpected canonical origin: ${canonicalOrigin}`,
  );
  assert(robots.includes("Allow: /"), "Canonical robots.txt must allow public crawling.");
  assert(
    !/^Disallow:\s*\/$/mu.test(robots),
    "Canonical robots.txt must not disallow the complete site.",
  );
  assert(
    robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`),
    "Canonical robots.txt must advertise the exact sitemap URL.",
  );
} else {
  assert(
    /^Disallow:\s*\/$/mu.test(robots),
    "Origin-neutral robots.txt must disallow crawling.",
  );
  assert(
    !/^Sitemap:/mu.test(robots),
    "Origin-neutral robots.txt must not advertise a production sitemap.",
  );
}

const sitemapLocations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/gu)].map(
  (match) => match[1],
);
assert(sitemapLocations.length === routes.length, "Sitemap and HTML route counts differ.");

for (const route of routes) {
  const relativePath = route === "/" ? "index.html" : `${route.slice(1)}index.html`;
  const html = fs.readFileSync(path.join(outputRoot, relativePath), "utf8");
  const canonical = canonicalFromHtml(html);
  const robotsMeta = robotsMetaFromHtml(html);

  assert(robotsMeta, `Missing robots meta on ${route}.`);

  if (canonicalOrigin) {
    const expectedCanonical = `${canonicalOrigin}${route}`;
    assert(
      canonical === expectedCanonical,
      `Unexpected canonical URL on ${route}: ${String(canonical)}; expected ${expectedCanonical}.`,
    );
    assert(
      robotsMeta.toLowerCase().includes("index") &&
        robotsMeta.toLowerCase().includes("follow") &&
        !robotsMeta.toLowerCase().includes("noindex"),
      `Canonical route ${route} is not indexable: ${robotsMeta}.`,
    );
    assert(
      sitemapLocations.includes(expectedCanonical),
      `Sitemap is missing canonical route ${expectedCanonical}.`,
    );
  } else {
    assert(!canonical, `Origin-neutral route ${route} must not emit canonical URL ${canonical}.`);
    assert(
      robotsMeta.toLowerCase().includes("noindex") &&
        robotsMeta.toLowerCase().includes("nofollow"),
      `Origin-neutral route ${route} must use noindex,nofollow: ${robotsMeta}.`,
    );
    assert(
      sitemapLocations.includes(route),
      `Origin-neutral sitemap is missing path ${route}.`,
    );
  }
}

console.log(
  `Matsuri crawler artifact passed in ${canonicalOrigin ? "canonical" : "origin-neutral"} mode: ${routes.length} HTML routes, robots policy, canonical metadata, and sitemap inventory agree.`,
);
