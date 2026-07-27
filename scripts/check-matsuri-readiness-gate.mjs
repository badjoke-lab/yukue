import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const candidateRoot = path.join(repositoryRoot, ".release-candidate");
const candidateSiteRoot = path.join(candidateRoot, "matsuri-site");
const releaseManifestPath = path.join(candidateRoot, "release-candidate.json");
const expectedTrafficRoutes = [
  "/",
  "/festivals/",
  "/search/",
  "/festivals/suneori-amagoi/",
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(repositoryRoot, relativePath), "utf8");
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

const requiredScripts = [
  "verify:release",
  "freeze:matsuri:release",
  "check:yukue:deployment-topology",
  "check:matsuri:pages",
  "check:matsuri:workers-config",
  "check:matsuri:consistency",
  "check:matsuri:canonical-metadata",
  "check:matsuri:semantics",
  "check:matsuri:evidence",
  "check:matsuri:content",
  "check:matsuri:browser",
  "check:matsuri:canonical-search",
  "check:matsuri:crawler-reachability",
  "check:matsuri:indexability-preflight",
  "check:matsuri:search-engine-submission-record",
  "check:matsuri:analytics-activation-record",
  "audit:matsuri:freshness",
  "audit:matsuri:relations",
];
const requiredDocs = [
  "docs/release-verification.md",
  "docs/release-candidate.md",
  "docs/repository-launch-readiness.md",
  "docs/cloudflare-pages-launch-runbook.md",
  "docs/deployment-topology.md",
  "docs/f2-25-cloudflare-web-analytics.md",
  "docs/f2-26-f2-28-launch-closure.md",
  "docs/development-schedule.md",
  "docs/project-status.md",
  "docs/roadmap.md",
  "docs/deployment.md",
  "docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md",
  "docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md",
  "docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md",
  "docs/audits/matsuri-f2-24-search-console-2026-07-14.md",
  "docs/audits/matsuri-f2-25-analytics-activation-2026-07-27.md",
  "docs/audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md",
  "docs/audits/matsuri-f2-27-production-traffic-2026-07-27.md",
];

const packageJson = JSON.parse(read("package.json"));
for (const scriptName of requiredScripts) {
  assert(typeof packageJson.scripts?.[scriptName] === "string", `Missing script ${scriptName}`);
}
for (const relativePath of requiredDocs) {
  assert(fs.existsSync(path.join(repositoryRoot, relativePath)), `Missing document ${relativePath}`);
}
assert(fs.existsSync(path.join(repositoryRoot, "wrangler.jsonc")), "Missing wrangler.jsonc");
assert(fs.existsSync(releaseManifestPath), "Missing release candidate manifest");
assert(fs.existsSync(candidateSiteRoot), "Missing frozen Matsuri site");

const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, "utf8"));
assert(manifest.format_version === 1, "Unexpected manifest format");
assert(manifest.project_id === "yukue-series", "Unexpected project_id");
assert(manifest.site_id === "matsuri", "Unexpected site_id");
assert(
  manifest.release_status ===
    "repository-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-28-pending",
  `Unexpected release_status: ${String(manifest.release_status)}`,
);
assert(manifest.artifact_origin_mode === "origin-neutral-repository-candidate", "Wrong artifact mode");
assert(
  manifest.canonical_origin === "https://matsuri-yukue.badjoke-lab.com" &&
    manifest.canonical_origin_decision === "https://matsuri-yukue.badjoke-lab.com" &&
    manifest.canonical_hostname_decision === "matsuri-yukue.badjoke-lab.com",
  "Canonical decision mismatch",
);
assert(manifest.portal_origin_decision === "https://yukue.badjoke-lab.com", "Portal decision mismatch");
assert(
  manifest.canonical_origin_verification?.workflow_run_id === 29191904624 &&
    manifest.canonical_origin_verification?.https_reachable === true &&
    manifest.canonical_origin_verification?.manifest_origin_verified === true &&
    manifest.canonical_origin_verification?.canonical_sitemap_verified === true,
  "Canonical evidence is incomplete",
);
assert(
  manifest.canonical_search_verification?.workflow_run_id === 29193201911 &&
    manifest.canonical_search_verification?.job_id === 86651403427 &&
    manifest.canonical_search_verification?.artifact_id === 8260207484 &&
    manifest.canonical_search_verification?.runtime_errors_absent === true,
  "Canonical Search evidence is incomplete",
);
assert(
  manifest.crawler_reachability_verification?.workflow_run_id === 29230233384 &&
    manifest.crawler_reachability_verification?.artifact_id === 8271238535 &&
    manifest.crawler_reachability_verification?.robots_verified === true &&
    manifest.crawler_reachability_verification?.sitemap_verified === true &&
    manifest.crawler_reachability_verification?.self_canonical_verified === true,
  "Crawler evidence is incomplete",
);
assert(
  manifest.search_engine_submission_verification?.submission_result === "success" &&
    manifest.search_engine_submission_verification?.discovered_pages === 20 &&
    manifest.search_engine_submission_verification?.representative_live_tests >= 1 &&
    manifest.search_engine_submission_verification?.indexing_requests >= 3 &&
    manifest.search_engine_submission_verification?.indexation_claimed === false,
  "F2-24 evidence is incomplete",
);
assert(
  manifest.analytics_activation_verification?.provider === "cloudflare-web-analytics" &&
    manifest.analytics_activation_verification?.activation_method === "automatic-setup" &&
    manifest.analytics_activation_verification?.activation_time_basis ===
      "pre-existing-automatic-setup-observed" &&
    manifest.analytics_activation_verification?.activation_observed_at ===
      "2026-07-27T09:37:29Z" &&
    manifest.analytics_activation_verification?.f2_25_complete === true,
  "F2-25 evidence is incomplete",
);
assert(
  manifest.post_activation_deployment_verification?.commit_sha ===
    "108ac4e88407e1263229eb40bc88d76855e90131" &&
    manifest.post_activation_deployment_verification?.cloudflare_build_id ===
      "7026144e-1ce0-4927-9060-64919c3a4002" &&
    manifest.post_activation_deployment_verification?.deployed_at ===
      "2026-07-27T10:34:17Z" &&
    manifest.post_activation_deployment_verification?.evidence_document ===
      "docs/audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md" &&
    manifest.post_activation_deployment_verification?.f2_26_complete === true,
  "F2-26 evidence is incomplete",
);
assert(
  manifest.production_traffic_verification?.verified_at === "2026-07-27T11:26:58Z" &&
    manifest.production_traffic_verification?.evidence_document ===
      "docs/audits/matsuri-f2-27-production-traffic-2026-07-27.md" &&
    manifest.production_traffic_verification?.traffic_observed === true &&
    manifest.production_traffic_verification?.private_counts_published === false &&
    manifest.production_traffic_verification?.f2_27_complete === true &&
    JSON.stringify(manifest.production_traffic_verification?.representative_routes) ===
      JSON.stringify(expectedTrafficRoutes),
  "F2-27 evidence is incomplete",
);
assert(typeof manifest.source_commit === "string" && /^[0-9a-f]{40}$/u.test(manifest.source_commit), "Invalid source_commit");
assert(Array.isArray(manifest.public_routes) && manifest.public_routes.length > 0, "No public routes");
assert(Array.isArray(manifest.files) && manifest.files.length === manifest.artifact_file_count, "File inventory mismatch");

const completedExternalIds = [
  "F2-16",
  "F2-17",
  "F2-18",
  "F2-19",
  "F2-20",
  "F2-21",
  "F2-22",
  "F2-23",
  "F2-24",
  "F2-25",
  "F2-26",
  "F2-27",
];
for (const id of completedExternalIds) {
  assert(
    manifest.completed_external_work.some((value) => value.startsWith(id)),
    `Completed external work missing ${id}`,
  );
}
assert(
  manifest.external_pending_work.length === 1 &&
    manifest.external_pending_work[0].startsWith("F2-28"),
  "Only F2-28 may remain pending",
);

let totalBytes = 0;
const aggregateLines = [];
for (const file of manifest.files) {
  const absolutePath = path.join(candidateSiteRoot, file.path);
  assert(fs.existsSync(absolutePath) && fs.statSync(absolutePath).isFile(), `Frozen file missing ${file.path}`);
  const stat = fs.statSync(absolutePath);
  assert(stat.size === file.size_bytes, `Frozen size changed ${file.path}`);
  const digest = sha256File(absolutePath);
  assert(digest === file.sha256, `Frozen digest changed ${file.path}`);
  totalBytes += stat.size;
  aggregateLines.push(`${file.path}\u0000${file.size_bytes}\u0000${file.sha256}`);
}
assert(totalBytes === manifest.artifact_size_bytes, "Artifact byte count mismatch");
assert(
  crypto.createHash("sha256").update(aggregateLines.join("\n")).digest("hex") ===
    manifest.artifact_sha256,
  "Artifact aggregate digest mismatch",
);

const projectStatus = read("docs/project-status.md");
const developmentSchedule = read("docs/development-schedule.md");
const roadmap = read("docs/roadmap.md");
const f225Audit = read("docs/audits/matsuri-f2-25-analytics-activation-2026-07-27.md");
const f226Audit = read("docs/audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md");
const f227Audit = read("docs/audits/matsuri-f2-27-production-traffic-2026-07-27.md");

for (const id of [...completedExternalIds, "F2-15", "F2-M02"]) {
  assert(developmentSchedule.includes(id), `Development schedule missing ${id}`);
}
assert(
  projectStatus.includes("F2-27 — production traffic verification — completed") &&
    projectStatus.includes("F2-28 — active next gate"),
  "Project status does not advance through F2-27",
);
assert(
  roadmap.includes("External deployment through F2-27: **Completed**") &&
    roadmap.includes("F2-28  final F2 Launch Gate — next"),
  "Roadmap does not advance through F2-27",
);
assert(
  f225Audit.includes("Automatic setup observed enabled") &&
    f225Audit.includes("2026-07-27T09:37:29Z") &&
    f225Audit.includes("F2-25 complete                    true"),
  "F2-25 audit is incomplete",
);
assert(
  f226Audit.includes("108ac4e88407e1263229eb40bc88d76855e90131") &&
    f226Audit.includes("7026144e-1ce0-4927-9060-64919c3a4002") &&
    f226Audit.includes("2026-07-27T10:34:17Z") &&
    f226Audit.includes("F2-26 complete                    true"),
  "F2-26 audit is incomplete",
);
assert(
  f227Audit.includes("matsuri-yukue.badjoke-lab.com") &&
    f227Audit.includes("2026-07-27T11:26:58Z") &&
    f227Audit.includes("Traffic observed\nyes") &&
    f227Audit.includes("F2-27 complete  true") &&
    f227Audit.includes("Private dashboard screenshot stored false"),
  "F2-27 audit is incomplete",
);

console.log(
  `Matsuri repository readiness gate passed: ${manifest.public_routes.length} routes, ${manifest.artifact_file_count} files, ${manifest.artifact_size_bytes} bytes, SHA-256 ${manifest.artifact_sha256}; F2-16 through F2-27 are complete and F2-28 is the only remaining launch gate.`,
);
