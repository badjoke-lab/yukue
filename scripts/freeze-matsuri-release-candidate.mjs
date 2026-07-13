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
const topology = JSON.parse(
  fs.readFileSync(
    path.join(repositoryRoot, "config", "yukue-deployment-topology.json"),
    "utf8",
  ),
);
const matsuriTopology = topology.sites.find((site) => site.site_id === "matsuri");

if (!matsuriTopology) {
  throw new Error("Accepted deployment topology is missing the Matsuri site.");
}
if (matsuriTopology.deployment_status !== "canonical-origin-verified") {
  throw new Error("Matsuri canonical origin is not recorded as verified.");
}
if (
  matsuriTopology.verification?.workflow_run_id !== 29191904624 ||
  matsuriTopology.verification?.https_reachable !== true ||
  matsuriTopology.verification?.manifest_origin_verified !== true ||
  matsuriTopology.verification?.canonical_sitemap_verified !== true
) {
  throw new Error("Matsuri canonical verification evidence is incomplete.");
}
if (
  matsuriTopology.search_verification?.workflow_run_id !== 29227617530 ||
  matsuriTopology.search_verification?.browser !== "chromium" ||
  matsuriTopology.search_verification?.exact_result_count !== 1 ||
  matsuriTopology.search_verification?.filtered_result_count !== 1 ||
  matsuriTopology.search_verification?.empty_result_count !== 0 ||
  matsuriTopology.search_verification?.page_error_count !== 0 ||
  matsuriTopology.search_verification?.console_error_count !== 0 ||
  matsuriTopology.search_verification?.application_request_failure_count !== 0
) {
  throw new Error("Matsuri F2-22 browser Search verification evidence is incomplete.");
}

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

const completedExternalWork = [
  "F2-16 Cloudflare Workers Builds connection",
  "F2-17 first Workers Static Assets deployment and reachable URL acquisition",
  "F2-18 deployed-origin smoke verification",
  "F2-19 exact canonical Matsuri hostname decision",
  "F2-20 custom-domain attachment, canonical build, and HTTPS verification",
  "F2-21 canonical manifest and sitemap verification",
  "F2-22 canonical browser Pagefind Search verification",
];

const externalPendingWork = [
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
    "Repository release-candidate freeze requires an origin-neutral build; unset MATSURI_PUBLIC_ORIGIN before freezing.",
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
    `Origin-neutral repository release candidate must not contain manifest.site_origin: ${String(manifest.site_origin)}`,
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
  .map((relativePath) =>
    relativePath === "index.html"
      ? "/"
      : `/${relativePath.slice(0, -"index.html".length)}`,
  )
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
  release_status: "repository-verified-canonical-origin-and-browser-search-verified-crawler-review-pending",
  artifact_origin_mode: "origin-neutral-repository-candidate",
  canonical_hostname_decision: matsuriTopology.canonical_hostname,
  canonical_origin_decision: matsuriTopology.canonical_origin,
  portal_origin_decision: topology.portal.canonical_origin,
  canonical_origin: matsuriTopology.canonical_origin,
  canonical_origin_verification: matsuriTopology.verification,
  browser_search_verification: matsuriTopology.search_verification,
  verification_command: "pnpm verify:release",
  completed_repository_work: completedRepositoryWork,
  completed_external_work: completedExternalWork,
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

const summary =
  `# Matsuri Release Candidate\n\n` +
  `Status: **repository verified; canonical origin and browser Search verified; crawler review pending**\n\n` +
  `- Source commit: \`${releaseManifest.source_commit ?? "unavailable"}\`\n` +
  `- Dataset version: \`${releaseManifest.dataset_version}\`\n` +
  `- Schema version: \`${releaseManifest.schema_version}\`\n` +
  `- Artifact origin mode: \`${releaseManifest.artifact_origin_mode}\`\n` +
  `- Public routes: ${publicRoutes.length}\n` +
  `- Artifact files: ${releaseManifest.artifact_file_count}\n` +
  `- Artifact bytes: ${releaseManifest.artifact_size_bytes}\n` +
  `- Artifact SHA-256: \`${aggregateHash}\`\n` +
  `- Verified canonical origin: \`${releaseManifest.canonical_origin}\`\n` +
  `- Canonical verification workflow run: \`${matsuriTopology.verification.workflow_run_id}\`\n` +
  `- Browser Search verification workflow run: \`${matsuriTopology.search_verification.workflow_run_id}\`\n` +
  `- Browser Search evidence artifact: \`${matsuriTopology.search_verification.artifact_name}\`\n` +
  `- Next external gate: F2-23 crawler-reachability review\n\n` +
  `The copied site under \`matsuri-site/\` is the origin-neutral static artifact that passed \`pnpm verify:release\`. ` +
  `The active canonical deployment and live browser Search behavior are recorded separately through verified external evidence. ` +
  `F2-16 through F2-22 are complete. F2-23 through F2-28 remain external work.\n`;

fs.writeFileSync(path.join(candidateRoot, "README.md"), summary, "utf8");

console.log(
  `Matsuri release candidate frozen: ${publicRoutes.length} routes, ${fileEntries.length} files, ${releaseManifest.artifact_size_bytes} bytes, SHA-256 ${aggregateHash}; canonical origin verified by run ${matsuriTopology.verification.workflow_run_id}; browser Search verified by run ${matsuriTopology.search_verification.workflow_run_id}; crawler review pending F2-23.`,
);
