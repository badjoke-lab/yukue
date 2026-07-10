import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = path.join(repositoryRoot, "apps", "matsuri", "dist");

const requiredFiles = [
  "index.html",
  "about/index.html",
  "festivals/index.html",
  "performances/index.html",
  "organizations/index.html",
  "regions/index.html",
  "changes/index.html",
  "states/index.html",
  "states/active/index.html",
  "states/reduced_activity/index.html",
  "states/suspended/index.html",
  "states/dormant/index.html",
  "states/reviving/index.html",
  "states/discontinued/index.html",
  "states/unknown/index.html",
  "search/index.html",
  "methodology/index.html",
  "data/index.html",
  "status/index.html",
  "pagefind/pagefind.js",
  "version.json",
  "data/manifest.json",
  "data/entities.json",
  "data/events.json",
  "data/relations.json",
  "data/occurrences.json",
  "llms.txt",
  "ai.txt",
  "sitemap.xml",
];

const missing = requiredFiles.filter((relativePath) => {
  const absolutePath = path.join(outputRoot, relativePath);
  return !fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile();
});

if (missing.length > 0) {
  throw new Error(
    `Matsuri Pages artifact is incomplete. Missing:\n${missing
      .map((relativePath) => `- ${relativePath}`)
      .join("\n")}`,
  );
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

console.log(`Matsuri Pages artifact verified: ${requiredFiles.length} required files present.`);
