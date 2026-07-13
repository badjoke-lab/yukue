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
const canonicalSearchVerification = {
  provider: "github_actions",
  workflow_name: "Verify Matsuri canonical Search",
  workflow_run_id: 29193201911,
  job_id: 86651403427,
  verified_origin: "https://matsuri-yukue.badjoke-lab.com",
  head_sha: "ec1a84bdf4321bee0c7ecbcc702abe3bbba81b9e",
  pull_request_merge_sha: "290d63e1b930616867e2108e393e2f5a537eeee8",
  artifact_id: 8260207484,
  artifact_name:
    "matsuri-canonical-search-290d63e1b930616867e2108e393e2f5a537eeee8",
  artifact_digest:
    "sha256:29c05992a887951d91caa8f5bd4588d88b0bac97230353cba4381ec4ff0eb884",
  desktop_chromium_verified: true,
  mobile_chromium_verified: true,
  exact_name_query_verified: true,
  structured_filters_verified: true,
  no_result_state_verified: true,
  result_navigation_verified: true,
  runtime_errors_absent: true,
};
const crawlerReachabilityVerification = {
  provider: "github_actions",
  workflow_name: "Verify Matsuri crawler reachability",
  workflow_run_id: 29230475619,
  job_id: 86753387839,
  verified_origin: "https://matsuri-yukue.badjoke-lab.com",
  head_sha: "62588bf5821cb5b86f5fc1b70d52dc0ca4c5c412",
  pull_request_merge_sha: "fe899d7004cc3f2c9b35df448c36750a7352b0dc",
  artifact_id: 8271321515,
  artifact_name:
    "matsuri-crawler-reachability-fe899d7004cc3f2c9b35df448c36750a7352b0dc",
  artifact_digest:
    "sha256:ed678ef3be66522db2f54ff4fbec3a561297a7eea9a6ad75071cbec89acff648",
  robots_policy_verified: true,
  sitemap_route_count: 20,
  sitemap_canonical_origin_only: true,
  sitemap_duplicate_count: 0,
  self_canonical_route_count: 20,
  indexable_route_count: 20,
  blocking_x_robots_tag_count: 0,
  representative_user_agent_checks: 28,
  discovery_file_checks: 12,
};

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
  "F2-22 browser Pagefind Search verification on canonical production origin",
  "F2-23 robots, canonical, sitemap, and crawler-reachability review",
];

const externalPendingWork = [
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
  release_status:
    "repository-verified-canonical-origin-browser-search-and-crawler-reachability-verified-sitemap-submission-pending",
  artifact_origin_mode: "origin-neutral-repository-candidate",
  canonical_hostname_decision: matsuriTopology.canonical_hostname,
  canonical_origin_decision: matsuriTopology.canonical_origin,
  portal_origin_decision: topology.portal.canonical_origin,
  canonical_origin: matsuriTopology.canonical_origin,
  canonical_origin_verification: matsuriTopology.verification,
  canonical_search_verification: canonicalSearchVerification,
  crawler_reachability_verification: crawlerReachabilityVerification,
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
  `Status: **repository verified; canonical origin verified; browser Search verified; crawler reachability verified; sitemap submission pending**\n\n` +
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
  `- Canonical Search workflow run: \`${canonicalSearchVerification.workflow_run_id}\`\n` +
  `- Crawler reachability workflow run: \`${crawlerReachabilityVerification.workflow_run_id}\`\n` +
  `- Next external gate: F2-24 sitemap submission and indexability check\n\n` +
  `The copied site under \`matsuri-site/\` is the origin-neutral static artifact that passed \`pnpm verify:release\`. ` +
  `The active canonical deployment, browser Search result, and crawler-facing production surface are recorded separately through verified external evidence. ` +
  `F2-16 through F2-23 are complete. F2-24 through F2-28 remain external work.\n`;

fs.writeFileSync(path.join(candidateRoot, "README.md"), summary, "utf8");

console.log(
  `Matsuri release candidate frozen: ${publicRoutes.length} routes, ${fileEntries.length} files, ${releaseManifest.artifact_size_bytes} bytes, SHA-256 ${aggregateHash}; canonical origin run ${matsuriTopology.verification.workflow_run_id}; browser Search run ${canonicalSearchVerification.workflow_run_id}; crawler reachability run ${crawlerReachabilityVerification.workflow_run_id}; F2-24 sitemap submission remains pending.`,
);
