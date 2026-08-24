import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const recordPath = path.join(repositoryRoot, "config", "matsuri-f2-launch-gate.json");
const expectedRuns = {
  repository_gate: 30262887402,
  analytics_progression: 30262887410,
  repository_baseline: 30262887530,
  canonical_origin: 30262887395,
  canonical_search: 30262887428,
  crawler_reachability: 30262887462,
  indexability_preflight: 30262887424,
  jinja_start_gate: 30262887458,
};
const expectedPrerequisites = [
  "repository_launch_readiness",
  "visual_review",
  "data_freshness_baseline",
  "external_verification_through_f2_27",
  "canonical_origin_gate",
  "canonical_search_gate",
  "crawler_reachability_gate",
  "indexability_preflight",
  "analytics_progression",
  "privacy_boundary",
  "jinja_guardrail",
];
const forbiddenKeys = new Set([
  "account_email",
  "account_id",
  "api_token",
  "analytics_token_value",
  "beacon_token",
  "visitor_id",
  "raw_page_views",
  "raw_visitors",
]);
const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/iu;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(repositoryRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function validIsoTimestamp(value) {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/u.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

function inspectPrivacy(value, pointer = "$root") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => inspectPrivacy(item, `${pointer}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") {
    if (typeof value === "string" && emailPattern.test(value)) {
      throw new Error(`F2 launch record contains an email address at ${pointer}`);
    }
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenKeys.has(key)) {
      throw new Error(`F2 launch record contains forbidden key ${pointer}.${key}`);
    }
    inspectPrivacy(child, `${pointer}.${key}`);
  }
}

const record = readJson("config/matsuri-f2-launch-gate.json");
const analytics = readJson("config/matsuri-analytics-activation.json");
const jinja = readJson("config/jinja-start-gate.json");
inspectPrivacy(record);

assert(record.format_version === 1, "Unexpected F2 launch gate format_version");
assert(record.site_id === "matsuri", "Unexpected F2 launch gate site_id");
assert(record.status === "complete", "F2 launch gate status must be complete");
assert(validIsoTimestamp(record.evaluated_at), "F2 launch gate evaluated_at must be a valid UTC timestamp");
assert(
  record.f2_27_merge_commit === "6a0ef91dad62fb7f5d65135d846b1cf6b6301d25",
  "Unexpected F2-27 merge commit",
);
assert(
  record.validation_head_sha === "f8115c65e0f7a1fbdebd9339ec26a6bb0da18cbc",
  "Unexpected F2-28 validation basis head",
);

const prerequisiteKeys = Object.keys(record.prerequisites ?? {}).sort();
assert(
  prerequisiteKeys.length === expectedPrerequisites.length &&
    expectedPrerequisites.every((key) => prerequisiteKeys.includes(key)),
  "F2 launch gate prerequisite inventory differs",
);
for (const key of expectedPrerequisites) {
  assert(record.prerequisites[key] === true, `F2 launch prerequisite ${key} must be true`);
}

const runKeys = Object.keys(record.verification_runs ?? {}).sort();
assert(
  runKeys.length === Object.keys(expectedRuns).length &&
    Object.keys(expectedRuns).every((key) => runKeys.includes(key)),
  "F2 launch gate run inventory differs",
);
for (const [key, runId] of Object.entries(expectedRuns)) {
  assert(record.verification_runs[key] === runId, `Unexpected verification run for ${key}`);
}

assert(record.release_artifact?.id === 8651652059, "Unexpected F2-28 release artifact ID");
assert(
  record.release_artifact?.digest ===
    "sha256:230ee6ab4f354d26e71d22a9c174d7dcc7f782f90bf5c9e0ff1278bbd401b5d8",
  "Unexpected F2-28 release artifact digest",
);

const expectedEvidence = [
  "docs/audits/matsuri-f2-25-analytics-activation-2026-07-27.md",
  "docs/audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md",
  "docs/audits/matsuri-f2-27-production-traffic-2026-07-27.md",
  "docs/audits/matsuri-f2-28-final-launch-gate-2026-07-27.md",
];
assert(
  JSON.stringify(record.evidence_documents) === JSON.stringify(expectedEvidence),
  "F2 launch gate evidence inventory differs",
);
for (const relativePath of expectedEvidence) {
  assert(fs.existsSync(path.join(repositoryRoot, relativePath)), `Missing F2 launch evidence ${relativePath}`);
}

assert(
  record.claims?.f2_28_complete === true &&
    record.claims?.indexation_claimed === false &&
    record.claims?.jinja_start_authorized === false,
  "F2 launch gate claims are invalid",
);
assert(
  record.privacy?.private_dashboard_screenshot_committed === false &&
    record.privacy?.raw_analytics_metrics_committed === false &&
    record.privacy?.account_identity_committed === false &&
    record.privacy?.analytics_token_committed === false &&
    record.privacy?.visitor_level_data_committed === false,
  "F2 launch gate privacy boundary is incomplete",
);

assert(
  analytics.status === "traffic-verified" &&
    analytics.claims?.f2_25_complete === true &&
    analytics.claims?.f2_26_complete === true &&
    analytics.claims?.f2_27_complete === true &&
    analytics.traffic_verification?.completed === true &&
    analytics.traffic_verification?.private_counts_published === false,
  "F2-27 Analytics progression is incomplete",
);
assert(
  jinja.status === "blocked-by-post-launch-prerequisites" &&
    jinja.prerequisites?.matsuri_f2_28_complete === true &&
    jinja.prerequisites?.matsuri_stabilization_review_complete === false &&
    jinja.claims?.jinja_canonical_start_gate_passed === false &&
    jinja.claims?.jinja_application_creation_authorized === true &&
    jinja.claims?.jinja_worker_preview_creation_authorized === true &&
    jinja.claims?.jinja_workers_dev_preview_publication_authorized === true &&
    jinja.claims?.jinja_custom_domain_activation_authorized === false &&
    jinja.claims?.jinja_canonical_publication_authorized === false &&
    jinja.preview_scope?.canonical === false &&
    jinja.preview_scope?.indexable === false,
  "Jinja canonical activation must remain blocked after F2-28 while the authorized workers.dev preview remains noncanonical and noindex",
);

const audit = read("docs/audits/matsuri-f2-28-final-launch-gate-2026-07-27.md");
assert(
  audit.includes("**Status:** Passed") &&
    audit.includes("F2-28 complete  true") &&
    audit.includes("Search-engine indexation claimed         false") &&
    audit.includes("Jinja start authorized                   false"),
  "F2-28 audit is incomplete",
);

const projectStatus = read("docs/project-status.md");
assert(projectStatus.includes("F2-28 — final F2 Launch Gate — completed"), "Project status lacks F2-28 completion");
assert(projectStatus.includes("Actual Jinja start gate — blocked"), "Project status no longer blocks Jinja canonical activation");

const packageJson = readJson("package.json");
assert(
  packageJson.scripts?.["check:matsuri:f2-launch-gate"] ===
    "node scripts/check-matsuri-f2-launch-gate.mjs",
  "package.json is missing the F2 launch gate validator",
);
assert(
  packageJson.scripts?.["gate:matsuri:repository"]?.includes("pnpm check:matsuri:f2-launch-gate"),
  "Repository gate does not enforce F2 launch completion",
);

const remainingJinjaPrerequisites = Object.entries(jinja.prerequisites ?? {}).filter(([, value]) => value === false).length;
console.log(
  `Matsuri F2-28 final launch gate is complete at ${record.evaluated_at}; indexation is not claimed, Jinja workers.dev preview may run, and Jinja canonical activation remains blocked with ${remainingJinjaPrerequisites} prerequisite(s) incomplete.`,
);
