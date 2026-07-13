import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = path.join(repositoryRoot, "apps", "matsuri", "dist");
const configuredOrigin = process.env.MATSURI_PUBLIC_ORIGIN?.replace(/\/$/u, "");
const fallbackOrigin = "https://matsuri.invalid";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "iu"))?.[2];
}

function canonicalFromHtml(html) {
  const tags = html.match(/<link\b[^>]*>/giu) ?? [];
  const tag = tags.find((candidate) =>
    attribute(candidate, "rel")
      ?.split(/\s+/u)
      .some((token) => token.toLowerCase() === "canonical"),
  );
  return tag ? attribute(tag, "href") : undefined;
}

function robotsMetaFromHtml(html) {
  const tags = html.match(/<meta\b[^>]*>/giu) ?? [];
  const tag = tags.find(
    (candidate) => attribute(candidate, "name")?.toLowerCase() === "robots",
  );
  return tag ? attribute(tag, "content") : undefined;
}

function routeToHtmlPath(pathname) {
  if (pathname === "/") return path.join(outputRoot, "index.html");
  const relative = pathname.replace(/^\//u, "");
  return path.join(outputRoot, relative, "index.html");
}

assert(fs.existsSync(outputRoot), "Matsuri dist artifact is missing.");

const sitemapPath = path.join(outputRoot, "sitemap.xml");
assert(fs.existsSync(sitemapPath), "Matsuri sitemap.xml is missing.");

const sitemap = fs.readFileSync(sitemapPath, "utf8");
const locations = [...sitemap.matchAll(/<loc>([\s\S]*?)<\/loc>/gu)].map((match) =>
  decodeXml(match[1].trim()),
);
assert(locations.length > 0, "Matsuri sitemap.xml contains no locations.");

for (const location of locations) {
  const resolved = new URL(location, fallbackOrigin);
  const pathname = resolved.pathname;
  const htmlPath = routeToHtmlPath(pathname);
  assert(fs.existsSync(htmlPath), `Sitemap route has no HTML artifact: ${pathname}.`);

  const html = fs.readFileSync(htmlPath, "utf8");
  const canonical = canonicalFromHtml(html);
  const robotsMeta = robotsMetaFromHtml(html);
  assert(robotsMeta, `Missing robots meta on ${pathname}.`);

  const normalizedRobots = robotsMeta.toLowerCase();

  if (configuredOrigin) {
    assert(
      configuredOrigin === "https://matsuri-yukue.badjoke-lab.com",
      `Unexpected MATSURI_PUBLIC_ORIGIN: ${configuredOrigin}.`,
    );
    const expectedCanonical = `${configuredOrigin}${pathname}`;
    assert(
      location === expectedCanonical,
      `Canonical sitemap location mismatch: ${location} !== ${expectedCanonical}.`,
    );
    assert(
      canonical === expectedCanonical,
      `Canonical link mismatch on ${pathname}: ${String(canonical)} !== ${expectedCanonical}.`,
    );
    assert(
      normalizedRobots.includes("index") &&
        normalizedRobots.includes("follow") &&
        !normalizedRobots.includes("noindex") &&
        !normalizedRobots.includes("none"),
      `Canonical route ${pathname} is not indexable: ${robotsMeta}.`,
    );
  } else {
    assert(
      location === pathname,
      `Origin-neutral sitemap location must be path-only: ${location}.`,
    );
    assert(!canonical, `Origin-neutral route ${pathname} emitted canonical ${canonical}.`);
    assert(
      normalizedRobots.includes("noindex") && normalizedRobots.includes("nofollow"),
      `Origin-neutral route ${pathname} must use noindex,nofollow: ${robotsMeta}.`,
    );
  }
}

console.log(
  `Matsuri canonical metadata passed in ${configuredOrigin ? "canonical" : "origin-neutral"} mode for ${locations.length} sitemap routes.`,
);
