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
const expectedFinalRuns = {
  repository_gate: 30262887402,
  analytics_progression: 30262887410,
  repository_baseline: 30262887530,
  canonical_origin: 30262887395,
  canonical_search: 30262887428,
  crawler_reachability: 30262887462,
  indexability_preflight: 30262887424,
  jinja_start_gate: 30262887458,
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(repositoryRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

const requiredScripts = [
  "verify:release",
  "freeze:matsuri:release",
  "check:yukue:deployment-topology",
  "check:yukue:jinja-start-gate",
  "check:matsuri:pages",
  "check:matsuri:detail-navigation",
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
  "check:matsuri:f2-launch-gate",
  "check:matsuri:stabilization-review",
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
  "docs/jinja-start-gate.md",
  "docs/matsuri-detail-c-implementation.md",
  "docs/matsuri-stabilization-review.md",
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
  "docs/audits/matsuri-f2-28-final-launch-gate-2026-07-27.md",
  "docs/audits/matsuri-stabilization-start-2026-07-27.md",
];
const requiredConfig = [
  "config/matsuri-analytics-activation.json",
  "config/matsuri-f2-launch-gate.json",
  "config/matsuri-stabilization-review.json",
  "config/matsuri-repository-baseline.json",
  "config/jinja-start-gate.json",
];

const packageJson = readJson("package.json");
for (const scriptName of requiredScripts) {
  assert(typeof packageJson.scripts?.[scriptName] === "string", `Missing script ${scriptName}`);
}
for (const relativePath of [...requiredDocs, ...requiredConfig]) {
  assert(fs.existsSync(path.join(repositoryRoot, relativePath)), `Missing required file ${relativePath}`);
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
    "repository-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-launch-complete-stabilization-observing",
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
assert(
  manifest.final_f2_launch_gate_verification?.evaluated_at === "2026-07-27T11:45:20Z" &&
    manifest.final_f2_launch_gate_verification?.f2_27_merge_commit ===
      "6a0ef91dad62fb7f5d65135d846b1cf6b6301d25" &&
    manifest.final_f2_launch_gate_verification?.validation_head_sha ===
      "f8115c65e0f7a1fbdebd9339ec26a6bb0da18cbc" &&
    JSON.stringify(manifest.final_f2_launch_gate_verification?.verification_runs) ===
      JSON.stringify(expectedFinalRuns) &&
    manifest.final_f2_launch_gate_verification?.release_artifact?.id === 8651652059 &&
    manifest.final_f2_launch_gate_verification?.release_artifact?.digest ===
      "sha256:230ee6ab4f354d26e71d22a9c174d7dcc7f782f90bf5c9e0ff1278bbd401b5d8" &&
    manifest.final_f2_launch_gate_verification?.evidence_document ===
      "docs/audits/matsuri-f2-28-final-launch-gate-2026-07-27.md" &&
    manifest.final_f2_launch_gate_verification?.f2_28_complete === true &&
    manifest.final_f2_launch_gate_verification?.indexation_claimed === false &&
    manifest.final_f2_launch_gate_verification?.jinja_start_authorized === false,
  "F2-28 evidence is incomplete",
);
assert(
  manifest.stabilization_review?.status === "observing" &&
    manifest.stabilization_review?.started_on === "2026-07-27" &&
    manifest.stabilization_review?.earliest_review_on === "2026-08-10" &&
    manifest.stabilization_review?.review_complete === false &&
    manifest.stabilization_review?.phase_11_gate_review_authorized === false &&
    manifest.stabilization_review?.jinja_stabilization_prerequisite_complete === false &&
    manifest.stabilization_review?.indexation_required === false,
  "Stabilization evidence is incomplete",
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
  "F2-28",
];
for (const id of completedExternalIds) {
  assert(
    manifest.completed_external_work.some((value) => value.startsWith(id)),
    `Completed external work missing ${id}`,
  );
}
assert(
  Array.isArray(manifest.external_pending_work) && manifest.external_pending_work.length === 0,
  "No F2 launch work may remain pending after F2-28",
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

const launchGate = readJson("config/matsuri-f2-launch-gate.json");
const stabilization = readJson("config/matsuri-stabilization-review.json");
const jinja = readJson("config/jinja-start-gate.json");
const projectStatus = read("docs/project-status.md");
const developmentSchedule = read("docs/development-schedule.md");
const roadmap = read("docs/roadmap.md");
const detailContract = read("docs/matsuri-detail-c-implementation.md");
const f228Audit = read("docs/audits/matsuri-f2-28-final-launch-gate-2026-07-27.md");
const stabilizationStartAudit = read("docs/audits/matsuri-stabilization-start-2026-07-27.md");

assert(
  launchGate.status === "complete" &&
    launchGate.claims?.f2_28_complete === true &&
    launchGate.claims?.indexation_claimed === false &&
    launchGate.claims?.jinja_start_authorized === false,
  "Final F2 launch record is incomplete",
);
assert(
  stabilization.status === "observing" &&
    stabilization.started_on === "2026-07-27" &&
    stabilization.minimum_observation_days === 14 &&
    stabilization.earliest_review_on === "2026-08-10" &&
    stabilization.reviewed_on === null &&
    stabilization.review_evidence_document === null &&
    stabilization.claims?.review_complete === false &&
    stabilization.claims?.phase_11_gate_review_authorized === false &&
    stabilization.claims?.jinja_stabilization_prerequisite_complete === false &&
    stabilization.boundary?.elapsed_time_alone_does_not_complete_review === true &&
    stabilization.boundary?.search_engine_indexation_not_required === true,
  "Matsuri stabilization observation record is incomplete",
);
assert(
  jinja.status === "blocked-by-post-launch-prerequisites" &&
    jinja.matsuri_stabilization_record === "config/matsuri-stabilization-review.json" &&
    jinja.prerequisites?.matsuri_f2_28_complete === true &&
    jinja.prerequisites?.matsuri_stabilization_review_complete ===
      stabilization.claims.jinja_stabilization_prerequisite_complete &&
    jinja.prerequisites?.portal_jinja_order_decided === false &&
    jinja.prerequisites?.jinja_state_spec_approved === false &&
    jinja.prerequisites?.explicit_start_authorization === false &&
    jinja.claims?.jinja_start_gate_passed === false,
  "Jinja is not correctly blocked during Matsuri stabilization",
);
assert(
  projectStatus.includes("F2-28 — final F2 Launch Gate — completed") &&
    projectStatus.includes("Phase 10 Stabilization — active") &&
    projectStatus.includes("Matsuri Detail C implementation — completed") &&
    projectStatus.includes("Matsuri prefecture breadth target — completed 47 / 47") &&
    projectStatus.includes("Matsuri depth-first corpus maintenance — active") &&
    projectStatus.includes("Matsuri stabilization review — observing / review eligible") &&
    projectStatus.includes("Earliest review       2026-08-10") &&
    projectStatus.includes("Actual Jinja start gate — blocked"),
  "Project status does not reflect Detail C completion, 47/47 prefecture breadth, depth-first maintenance, and bounded stabilization",
);
assert(
  developmentSchedule.includes("F2-01 through F2-28           completed") &&
    developmentSchedule.includes("Phase 10A Detail C repair     completed") &&
    developmentSchedule.includes("Phase 10B Prefecture breadth  completed 47 / 47") &&
    developmentSchedule.includes("Phase 10C Depth maintenance   active") &&
    developmentSchedule.includes("Stabilization review          observing") &&
    developmentSchedule.includes("Formal review eligible        true") &&
    developmentSchedule.includes("Actual Jinja start gate       blocked"),
  "Development schedule does not reflect the completed breadth target and active depth-first post-launch track",
);
assert(
  roadmap.includes("## Phase 9 — Launch Preparation") &&
    roadmap.includes("Status: **Completed**") &&
    roadmap.includes("## Phase 10 — Matsuri Content Expansion and Stabilization") &&
    roadmap.includes("### Phase 10A — Detail C product completion") &&
    roadmap.includes("### Phase 10B — Prefecture breadth") &&
    roadmap.includes("### Phase 10C — Depth-first maintenance") &&
    roadmap.includes("Status: **Review eligible / Observing**") &&
    roadmap.includes("Earliest review       2026-08-10"),
  "Roadmap does not reflect Detail C completion, completed prefecture breadth, active depth-first maintenance, and bounded stabilization",
);
assert(
  detailContract.includes("**Status:** Required implementation contract") &&
    detailContract.includes("a primary public Entity lacks a detail route") &&
    detailContract.includes("an approved Relation is absent from either available endpoint page") &&
    detailContract.includes("a Shrine or Temple reference page contains a Current State claim"),
  "Detail C implementation contract is incomplete",
);
assert(
  f228Audit.includes("**Status:** Passed") &&
    f228Audit.includes("F2-28 complete  true") &&
    f228Audit.includes("Search-engine indexation claimed         false") &&
    f228Audit.includes("Jinja start authorized                   false"),
  "F2-28 audit is incomplete",
);
assert(
  stabilizationStartAudit.includes("**Status:** Observation started") &&
    stabilizationStartAudit.includes("Earliest review        2026-08-10") &&
    stabilizationStartAudit.includes("Search-engine indexation is not required and is not claimed"),
  "Stabilization start audit is incomplete",
);

console.log(
  `Matsuri repository readiness gate passed: ${manifest.public_routes.length} routes, ${manifest.artifact_file_count} files, ${manifest.artifact_size_bytes} bytes, SHA-256 ${manifest.artifact_sha256}; Detail C is complete, prefecture breadth is complete at 47/47, depth-first maintenance is active, stabilization is observing and review-eligible, indexation is not required, and Jinja remains blocked.`,
);
