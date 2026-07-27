import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { generateMachineReadableBaseline } from "@badjoke-lab/yukue-machine-readable";
import { loadMatsuriProjection } from "./load-matsuri-projection.mjs";

const outputRoot = fileURLToPath(new URL("../dist/", import.meta.url));
const projection = loadMatsuriProjection();

function walkHtmlRoutes(directory, relativeDirectory = "") {
  const routes = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (["pagefind", "_astro"].includes(entry.name)) continue;
    const relativePath = path.join(relativeDirectory, entry.name);
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      routes.push(...walkHtmlRoutes(absolutePath, relativePath));
      continue;
    }
    if (!entry.isFile() || entry.name !== "index.html") continue;
    const normalized = relativePath.split(path.sep).join("/");
    routes.push(normalized === "index.html" ? "/" : `/${normalized.slice(0, -"index.html".length)}`);
  }
  return routes;
}

const sitemapPaths = [...new Set(walkHtmlRoutes(outputRoot))].sort((a, b) =>
  a.localeCompare(b),
);

if (sitemapPaths.length < 2 || !sitemapPaths.includes("/")) {
  throw new Error("Generated Matsuri HTML inventory is not sufficient to build sitemap.xml");
}

const files = generateMachineReadableBaseline(projection, {
  projectId: "yukue-series",
  siteId: "matsuri",
  siteName: "祭のゆくえ",
  datasetType: "cultural-observation-registry",
  datasetVersion: "2026-07-10.d1",
  schemaVersion: "matsuri.v1",
  siteOrigin: process.env.MATSURI_PUBLIC_ORIGIN || undefined,
  sitemapPaths,
});

for (const file of files) {
  const relativePath = file.path.replace(/^\//u, "");
  const outputPath = path.join(outputRoot, relativePath);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, file.content, "utf8");
}

console.log(
  `Generated ${files.length} machine-readable Matsuri public files and sitemap coverage for ${sitemapPaths.length} HTML routes.`,
);
