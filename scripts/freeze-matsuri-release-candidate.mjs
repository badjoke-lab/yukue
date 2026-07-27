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

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repositoryRoot, relativePath), "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

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
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function sourceCommit() {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA;
  const result = spawnSync("git", ["rev-parse", "HEAD"], {
    cwd: repositoryRoot,
    encoding: "utf8",
  });
  return result.status === 0 ? result.stdout.trim() : null;
}

const topology = readJson("config/yukue-deployment-topology.json");
const searchEngineSubmission = readJson("config/matsuri-search-engine-submission.json");
const analytics = readJson("config/matsuri-analytics-activation.json");
const matsuriTopology = topology.sites.find((site) => site.site_id === "matsuri");
const crawlerVerification = matsuriTopology?.verification?.crawler_reachability;
const canonicalSearchVerification = {
  provider: "github_actions",
  workflow_name: "Verify Matsuri canonical Search",
  workflow_run_id: 29193201911,
  job_id: 86651403427,
  verified_origin: "https://matsuri-yukue.badjoke-lab.com",
  head_sha: "ec1a84bdf4321bee0c7ecbcc702abe3bbba81b9e",
  pull_request_merge_sha: "290d63e1b930616867e2108e393e2f5a537eeee8",
  artifact_id: 8260207484,
  artifact_name: "matsuri-canonical-search-290d63e1b930616867e2108e393e2f5a537eeee8",
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

assert(matsuriTopology, "Accepted deployment topology is missing Matsuri");
assert(matsuriTopology.deployment_status === "canonical-origin-verified", "Matsuri origin is not verified");
assert(
  matsuriTopology.verification?.workflow_run_id === 29191904624 &&
    matsuriTopology.verification?.https_reachable === true &&
    matsuriTopology.verification?.manifest_origin_verified === true &&
    matsuriTopology.verification?.canonical_sitemap_verified === true,
  "Canonical verification evidence is incomplete",
);
assert(
  crawlerVerification?.workflow_run_id === 29230233384 &&
    crawlerVerification?.artifact_id === 8271238535 &&
    crawlerVerification?.robots_verified === true &&
    crawlerVerification?.sitemap_verified === true &&
    crawlerVerification?.self_canonical_verified === true &&
    crawlerVerification?.indexing_directives_verified === true,
  "Crawler verification evidence is incomplete",
);
assert(
  searchEngineSubmission.status === "submitted-indexability-checked" &&
    searchEngineSubmission.submission_result === "success" &&
    searchEngineSubmission.claims?.f2_24_complete === true &&
    searchEngineSubmission.claims?.indexation_claimed === false,
  "F2-24 evidence is incomplete",
);
assert(
  analytics.status === "post-activation-deployed" &&
    analytics.analytics_enabled === true &&
    analytics.activation_method === "automatic-setup" &&
    analytics.claims?.f2_25_complete === true &&
    analytics.claims?.f2_26_complete === true &&
    analytics.claims?.f2_27_complete === false &&
    analytics.post_activation_deployment?.completed === true,
  "F2-26 Analytics progression evidence is incomplete",
);

if (process.env.MATSURI_PUBLIC_ORIGIN) {
  throw new Error("Repository release freeze requires an origin-neutral build");
}
assert(fs.existsSync(sourceRoot) && fs.statSync(sourceRoot).isDirectory(), "Matsuri dist is missing");

const manifest = readJson("apps/matsuri/dist/data/manifest.json");
const version = readJson("apps/matsuri/dist/version.json");
assert(!Object.hasOwn(manifest, "site_origin"), "Origin-neutral manifest must omit site_origin");

fs.rmSync(candidateRoot, { recursive: true, force: true });
fs.mkdirSync(candidateRoot, { recursive: true });
fs.cpSync(sourceRoot, candidateSiteRoot, { recursive: true });

const files = walkFiles(candidateSiteRoot).sort((a, b) => a.localeCompare(b));
const fileEntries = files.map((relativePath) => {
  const absolutePath = path.join(candidateSiteRoot, relativePath);
  const stat = fs.statSync(absolutePath);
  return { path: relativePath, size_bytes: stat.size, sha256: sha256File(absolutePath) };
});
const publicRoutes = files
  .filter((relativePath) => relativePath.endsWith("index.html"))
  .filter((relativePath) => !relativePath.startsWith("pagefind/") && !relativePath.startsWith("_astro/"))
  .map((relativePath) =>
    relativePath === "index.html" ? "/" : `/${relativePath.slice(0, -"index.html".length)}`,
  )
  .sort((a, b) => a.localeCompare(b));
const sitemap = fs.readFileSync(path.join(candidateSiteRoot, "sitemap.xml"), "utf8");
const sitemapRoutes = [...sitemap.matchAll(/<loc>([\s\S]*?)<\/loc>/gu)]
  .map((match) => new URL(match[1].trim(), localOrigin).pathname)
  .sort((a, b) => a.localeCompare(b));
assert(
  publicRoutes.length === sitemapRoutes.length &&
    publicRoutes.every((route, index) => route === sitemapRoutes[index]),
  "Frozen route inventory does not match sitemap",
);

const aggregateHash = crypto
  .createHash("sha256")
  .update(
    fileEntries
      .map((entry) => `${entry.path}\u0000${entry.size_bytes}\u0000${entry.sha256}`)
      .join("\n"),
  )
  .digest("hex");

const completedExternalWork = [
  "F2-16 Cloudflare Workers Builds connection",
  "F2-17 first Workers Static Assets deployment and reachable URL acquisition",
  "F2-18 deployed-origin smoke verification",
  "F2-19 exact canonical Matsuri hostname decision",
  "F2-20 custom-domain attachment, canonical build, and HTTPS verification",
  "F2-21 canonical manifest and sitemap verification",
  "F2-22 browser Pagefind Search verification on canonical production origin",
  "F2-23 robots, canonical, sitemap, and crawler-reachability review",
  "F2-24 Search Console sitemap submission and indexability check",
  "F2-25 Cloudflare Web Analytics Automatic setup observed enabled",
  "F2-26 post-activation main production deployment",
];

const releaseManifest = {
  format_version: 1,
  project_id: version.project_id,
  site_id: version.site_id,
  source_commit: sourceCommit(),
  dataset_version: version.dataset_version,
  schema_version: version.schema_version,
  release_status:
    "repository-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-deployed-f2-27-pending",
  artifact_origin_mode: "origin-neutral-repository-candidate",
  canonical_hostname_decision: matsuriTopology.canonical_hostname,
  canonical_origin_decision: matsuriTopology.canonical_origin,
  portal_origin_decision: topology.portal.canonical_origin,
  canonical_origin: matsuriTopology.canonical_origin,
  canonical_origin_verification: matsuriTopology.verification,
  canonical_search_verification: canonicalSearchVerification,
  crawler_reachability_verification: crawlerVerification,
  search_engine_submission_verification: {
    search_engine: searchEngineSubmission.search_engine,
    property_type: searchEngineSubmission.property_type,
    sitemap_url: searchEngineSubmission.sitemap_url,
    submitted_on: searchEngineSubmission.submitted_on,
    submission_observed_at: searchEngineSubmission.submission_observed_at,
    submission_result: searchEngineSubmission.submission_result,
    discovered_pages: searchEngineSubmission.discovered_pages,
    representative_live_tests: searchEngineSubmission.representative_url_inspections.length,
    indexing_requests: searchEngineSubmission.indexing_requests.length,
    evidence_document: searchEngineSubmission.submission_evidence_document,
    indexation_claimed: searchEngineSubmission.claims.indexation_claimed,
  },
  analytics_activation_verification: {
    provider: analytics.provider,
    activation_method: analytics.activation_method,
    activation_time_basis: analytics.activation_time_basis,
    activated_at: analytics.activated_at,
    activation_observed_at: analytics.activation_observed_at,
    evidence_document: analytics.activation_evidence_document,
    f2_25_complete: analytics.claims.f2_25_complete,
  },
  post_activation_deployment_verification: {
    commit_sha: analytics.post_activation_deployment.commit_sha,
    cloudflare_build_id: analytics.post_activation_deployment.cloudflare_build_id,
    deployed_at: analytics.post_activation_deployment.deployed_at,
    evidence_document: analytics.post_activation_deployment.evidence_document,
    f2_26_complete: analytics.claims.f2_26_complete,
  },
  verification_command: "pnpm verify:release",
  completed_repository_work: [
    "F2-07 unified release verification",
    "F2-08 static route and internal-link integrity",
    "F2-09 HTML, JSON, Search, and sitemap consistency",
    "F2-10 public data semantic audit",
    "F2-11 Source and Evidence audit",
    "F2-12 responsive and accessibility browser audit",
    "F2-13 public content, empty-state, and image-boundary audit",
    "F2-14 release-candidate artifact freeze",
  ],
  completed_external_work: completedExternalWork,
  external_pending_work: [
    "F2-27 verify production traffic",
    "F2-28 final F2 Launch Gate",
  ],
  record_counts: manifest.record_counts,
  machine_readable_files: manifest.files,
  public_routes: publicRoutes,
  artifact_file_count: fileEntries.length,
  artifact_size_bytes: fileEntries.reduce((total, entry) => total + entry.size_bytes, 0),
  artifact_sha256: aggregateHash,
  files: fileEntries,
};

fs.writeFileSync(
  path.join(candidateRoot, "release-candidate.json"),
  `${JSON.stringify(releaseManifest, null, 2)}\n`,
  "utf8",
);

const summary = `# Matsuri Release Candidate\n\nStatus: **repository verified; canonical origin, browser Search, crawler reachability, sitemap submission, technical indexability, Analytics activation, and post-activation production deployment verified; F2-27 pending**\n\n- Source commit: \`${releaseManifest.source_commit ?? "unavailable"}\`\n- Dataset version: \`${releaseManifest.dataset_version}\`\n- Schema version: \`${releaseManifest.schema_version}\`\n- Artifact origin mode: \`${releaseManifest.artifact_origin_mode}\`\n- Public routes: ${publicRoutes.length}\n- Artifact files: ${releaseManifest.artifact_file_count}\n- Artifact bytes: ${releaseManifest.artifact_size_bytes}\n- Artifact SHA-256: \`${aggregateHash}\`\n- F2-25 observation: \`${analytics.activation_observed_at}\`\n- F2-26 deployment: \`${analytics.post_activation_deployment.deployed_at}\`\n- Next external gate: F2-27 production traffic verification\n\nF2-16 through F2-26 are complete. F2-27 and F2-28 remain external work. No indexation or traffic-receipt claim is made.\n`;
fs.writeFileSync(path.join(candidateRoot, "README.md"), summary, "utf8");

console.log(
  `Matsuri release candidate frozen: ${publicRoutes.length} routes, ${fileEntries.length} files, ${releaseManifest.artifact_size_bytes} bytes, SHA-256 ${aggregateHash}; F2-26 deployment verified at ${analytics.post_activation_deployment.deployed_at}; F2-27 and F2-28 remain pending.`,
);
