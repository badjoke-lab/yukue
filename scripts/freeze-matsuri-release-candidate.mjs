import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const sourceRoot = path.join(repositoryRoot, "apps", "matsuri", "dist");
const candidateRoot = path.join(repositoryRoot, ".release-candidate");
const candidateSiteRoot = path.join(candidateRoot, "matsuri-site");
const localOrigin = "https://matsuri.invalid";

const completedRepositoryWork = [
  "F2-07 unified release verification",
  "F2-08 static route and internal-link integrity",
  "F2-09 HTML, JSON, Search, and sitemap consistency",
  "F2-10 public data semantic audit",
  "F2-11 Source and Evidence audit",
  "F2-12 responsive and accessibility browser audit",
  "F2-13 public content, empty-state, and image-boundary audit",
  "F2-14 release-candidate artifact freeze",
];

const externalPendingWork = [
  "F2-16 create or connect the Cloudflare Pages project",
  "F2-17 first Pages deployment and reachable URL acquisition",
  "F2-18 deployed-origin smoke verification",
  "F2-19 canonical public origin and domain decision",
  "F2-20 configure MATSURI_PUBLIC_ORIGIN and redeploy",
  "F2-21 canonical manifest and sitemap verification",
  "F2-22 browser Pagefind Search verification on production",
  "F2-23 robots, canonical, sitemap, and crawler-reachability review",
  "F2-24 search-engine sitemap submission and indexability check",
  "F2-25 enable Cloudflare Web Analytics",
  "F2-26 deploy after Analytics activation",
  "F2-27 verify production traffic",
  "F2-28 final F2 Launch Gate",
];

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function walkFiles(directory, relativeDirectory = "") {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = path.join(relativeDirectory, entry.name);
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkFiles(absolutePath, relativePath);
    if (entry.isFile()) return [toPosix(relativePath)];
    return [];
  });
}

function sha256File(filePath) {
  const hash = crypto.createHash("sha256");
  hash.update(fs.readFileSync(filePath));
  return hash.digest("hex");
}

function htmlFileToRoute(relativePath) {
  if (relativePath === "index.html") return "/";
  return `/${relativePath.slice(0, -"index.html".length)}`;
}

function sourceCommit() {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA;

  const result = spawnSync("git", ["rev-parse", "HEAD"], {
    cwd: repositoryRoot,
    encoding: "utf8",
  });
  if (result.status === 0) return result.stdout.trim();
  return null;
}

if (process.env.MATSURI_PUBLIC_ORIGIN) {
  throw new Error(
    "F2-14 repository release-candidate freeze requires MATSURI_PUBLIC_ORIGIN to remain unset while external deployment is held.",
  );
}

if (!fs.existsSync(sourceRoot) || !fs.statSync(sourceRoot).isDirectory()) {
  throw new Error(
    "Matsuri dist artifact is missing. Run pnpm verify:release successfully before freezing a release candidate.",
  );
}

const manifest = JSON.parse(
  fs.readFileSync(path.join(sourceRoot, "data", "manifest.json"), "utf8"),
);
const version = JSON.parse(
  fs.readFileSync(path.join(sourceRoot, "version.json"), "utf8"),
);

if (Object.hasOwn(manifest, "site_origin")) {
  throw new Error(
    `Repository release candidate must not contain a production site_origin while deployment is held: ${String(manifest.site_origin)}`,
  );
}

fs.rmSync(candidateRoot, { recursive: true, force: true });
fs.mkdirSync(candidateRoot, { recursive: true });
fs.cpSync(sourceRoot, candidateSiteRoot, { recursive: true });

const files = walkFiles(candidateSiteRoot).sort((a, b) => a.localeCompare(b));
const fileEntries = files.map((relativePath) => {
  const absolutePath = path.join(candidateSiteRoot, relativePath);
  const stat = fs.statSync(absolutePath);
  return {
    path: relativePath,
    size_bytes: stat.size,
    sha256: sha256File(absolutePath),
  };
});

const publicRoutes = files
  .filter((relativePath) => relativePath.endsWith("index.html"))
  .filter(
    (relativePath) =>
      !relativePath.startsWith("pagefind/") &&
      !relativePath.startsWith("_astro/"),
  )
  .map(htmlFileToRoute)
  .sort((a, b) => a.localeCompare(b));

const sitemap = fs.readFileSync(path.join(candidateSiteRoot, "sitemap.xml"), "utf8");
const sitemapRoutes = [...sitemap.matchAll(/<loc>([\s\S]*?)<\/loc>/gu)]
  .map((match) => new URL(match[1].trim(), localOrigin).pathname)
  .sort((a, b) => a.localeCompare(b));

if (
  publicRoutes.length !== sitemapRoutes.length ||
  publicRoutes.some((route, index) => route !== sitemapRoutes[index])
) {
  throw new Error("Frozen public route inventory does not match sitemap.xml.");
}

const aggregateHash = crypto
  .createHash("sha256")
  .update(
    fileEntries
      .map((entry) => `${entry.path}\u0000${entry.size_bytes}\u0000${entry.sha256}`)
      .join("\n"),
  )
  .digest("hex");

const releaseManifest = {
  format_version: 1,
  project_id: version.project_id,
  site_id: version.site_id,
  source_commit: sourceCommit(),
  dataset_version: version.dataset_version,
  schema_version: version.schema_version,
  release_status: "repository-verified-external-deployment-held",
  canonical_origin: null,
  verification_command: "pnpm verify:release",
  completed_repository_work: completedRepositoryWork,
  external_pending_work: externalPendingWork,
  record_counts: manifest.record_counts,
  machine_readable_files: manifest.files,
  public_routes: publicRoutes,
  artifact_file_count: fileEntries.length,
  artifact_size_bytes: fileEntries.reduce(
    (total, entry) => total + entry.size_bytes,
    0,
  ),
  artifact_sha256: aggregateHash,
  files: fileEntries,
};

fs.writeFileSync(
  path.join(candidateRoot, "release-candidate.json"),
  `${JSON.stringify(releaseManifest, null, 2)}\n`,
  "utf8",
);

const summary = `# Matsuri Release Candidate\n\n` +
  `Status: **repository verified; external deployment held**\n\n` +
  `- Source commit: \`${releaseManifest.source_commit ?? "unavailable"}\`\n` +
  `- Dataset version: \`${releaseManifest.dataset_version}\`\n` +
  `- Schema version: \`${releaseManifest.schema_version}\`\n` +
  `- Public routes: ${publicRoutes.length}\n` +
  `- Artifact files: ${releaseManifest.artifact_file_count}\n` +
  `- Artifact bytes: ${releaseManifest.artifact_size_bytes}\n` +
  `- Artifact SHA-256: \`${aggregateHash}\`\n` +
  `- Canonical origin: not configured\n\n` +
  `The copied site under \`matsuri-site/\` is the exact static artifact that passed \`pnpm verify:release\`. ` +
  `Cloudflare deployment, canonical-origin, production Search, crawler, indexing, and Analytics checks remain outside this candidate.\n`;

fs.writeFileSync(path.join(candidateRoot, "README.md"), summary, "utf8");

console.log(
  `Matsuri release candidate frozen: ${publicRoutes.length} routes, ${fileEntries.length} files, ${releaseManifest.artifact_size_bytes} bytes, SHA-256 ${aggregateHash}.`,
);
