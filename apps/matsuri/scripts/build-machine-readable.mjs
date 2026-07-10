import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { generateMachineReadableBaseline } from "@badjoke-lab/yukue-machine-readable";
import { loadMatsuriProjection } from "./load-matsuri-projection.mjs";

const outputRoot = fileURLToPath(new URL("../dist/", import.meta.url));
const projection = loadMatsuriProjection();

const files = generateMachineReadableBaseline(projection, {
  projectId: "yukue-series",
  siteId: "matsuri",
  siteName: "祭のゆくえ",
  datasetType: "cultural-observation-registry",
  datasetVersion: "2026-07-10.d1",
  schemaVersion: "matsuri.v1",
  siteOrigin: process.env.MATSURI_PUBLIC_ORIGIN || undefined,
  sitemapPaths: [
    "/",
    "/festivals/",
    "/festivals/suneori-amagoi/",
    "/performances/",
    "/regions/",
    "/changes/",
    "/search/",
  ],
});

for (const file of files) {
  const relativePath = file.path.replace(/^\//, "");
  const outputPath = path.join(outputRoot, relativePath);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, file.content, "utf8");
}

console.log(`Generated ${files.length} machine-readable Matsuri public files.`);
