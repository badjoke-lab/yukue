import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const candidateRoot = path.join(repositoryRoot, ".release-candidate");
const candidateSiteRoot = path.join(candidateRoot, "matsuri-site");
const releaseManifestPath = path.join(candidateRoot, "release-candidate.json");

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
  "audit:matsuri:freshness",
  "audit:matsuri:relations",
];

const requiredDocs = [
  "docs/release-verification.md",
  "docs/release-candidate.md",
  "docs/source-evidence-audit.md",
  "docs/browser-accessibility-audit.md",
  "docs/public-content-audit.md",
  "docs/repository-launch-readiness.md",
  "docs/cloudflare-pages-launch-runbook.md",
  "docs/deployment-topology.md",
  "docs/f2-20-custom-domain-activation.md",
  "docs/f2-22-canonical-search-verification.md",
  "docs/f2-23-crawler-reachability.md",
  "docs/f2-24-sitemap-submission-indexability.md",
  "docs/development-schedule.md",
  "docs/project-status.md",
  "docs/roadmap.md",
  "docs/deployment.md",
  "docs/decision-log.md",
  "docs/matsuri-data-freshness-audit.md",
  "docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md",
  "docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md",
  "docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md",
  "docs/audits/matsuri-f2-24-search-console-2026-07-14.md",
  "docs/audits/matsuri-f2-m02-candidate-inventory-2026-07-12.md",
  "docs/audits/matsuri-f2-m02-soma-outcome-2026-07-12.md",
  "docs/audits/matsuri-f2-m02-relation-inventory-2026-07-12.md",
  "docs/audits/matsuri-f2-m02-suneori-relation-2026-07-12.md",
  "docs/audits/matsuri-f2-m02-nunobashi-relation-2026-07-12.md",
];

const completedRepositoryIds = [
  "F2-07",
  "F2-08",
  "F2-09",
  "F2-10",
  "F2-11",
  "F2-12",
  "F2-13",
  "F2-14",
];
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
];
const pendingExternalIds = ["F2-25", "F2-26", "F2-27", "F2-28"];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function read(relativePath) {
  return fs.readFileSync(path.join(repositoryRoot, relativePath), "utf8");
}

const packageJson = JSON.parse(read("package.json"));
for (const scriptName of requiredScripts) {
  assert(
    typeof packageJson.scripts?.[scriptName] === "string",
    `Repository readiness requires package script ${scriptName}.`,
  );
}

for (const relativePath of requiredDocs) {
  assert(
    fs.existsSync(path.join(repositoryRoot, relativePath)),
    `Repository readiness document is missing: ${relativePath}`,
  );
}

assert(
  fs.existsSync(path.join(repositoryRoot, "wrangler.jsonc")),
  "Repository readiness requires wrangler.jsonc.",
);
assert(
  fs.existsSync(releaseManifestPath),
  "Release candidate manifest is missing. Run pnpm freeze:matsuri:release first.",
);
assert(
  fs.existsSync(candidateSiteRoot) && fs.statSync(candidateSiteRoot).isDirectory(),
  "Frozen Matsuri site directory is missing.",
);

const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, "utf8"));
assert(releaseManifest.format_version === 1, "Unexpected release manifest format_version.");
assert(releaseManifest.project_id === "yukue-series", "Unexpected release project_id.");
assert(releaseManifest.site_id === "matsuri", "Unexpected release site_id.");
assert(
  releaseManifest.release_status ===
    "repository-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-pending",
  `Unexpected release_status: ${String(releaseManifest.release_status)}`,
);
assert(
  releaseManifest.artifact_origin_mode === "origin-neutral-repository-candidate",
  "Release candidate must preserve the origin-neutral artifact mode.",
);
assert(
  releaseManifest.canonical_hostname_decision === "matsuri-yukue.badjoke-lab.com",
  "Release candidate does not record the accepted Matsuri canonical hostname.",
);
assert(
  releaseManifest.canonical_origin_decision === "https://matsuri-yukue.badjoke-lab.com" &&
    releaseManifest.canonical_origin === "https://matsuri-yukue.badjoke-lab.com",
  "Release candidate does not record the verified Matsuri canonical origin.",
);
assert(
  releaseManifest.portal_origin_decision === "https://yukue.badjoke-lab.com",
  "Release candidate does not record the accepted portal origin decision.",
);
assert(
  releaseManifest.canonical_origin_verification?.workflow_run_id === 29191904624 &&
    releaseManifest.canonical_origin_verification?.https_reachable === true &&
    releaseManifest.canonical_origin_verification?.manifest_origin_verified === true &&
    releaseManifest.canonical_origin_verification?.canonical_sitemap_verified === true,
  "Release candidate does not preserve successful canonical verification evidence.",
);
assert(
  releaseManifest.canonical_search_verification?.workflow_run_id === 29193201911 &&
    releaseManifest.canonical_search_verification?.job_id === 86651403427 &&
    releaseManifest.canonical_search_verification?.artifact_id === 8260207484 &&
    releaseManifest.canonical_search_verification?.runtime_errors_absent === true,
  "Release candidate does not preserve successful F2-22 canonical Search evidence.",
);
assert(
  releaseManifest.crawler_reachability_verification?.workflow_run_id === 29230233384 &&
    releaseManifest.crawler_reachability_verification?.artifact_id === 8271238535 &&
    releaseManifest.crawler_reachability_verification?.robots_verified === true &&
    releaseManifest.crawler_reachability_verification?.sitemap_verified === true &&
    releaseManifest.crawler_reachability_verification?.self_canonical_verified === true &&
    releaseManifest.crawler_reachability_verification?.indexing_directives_verified === true,
  "Release candidate does not preserve successful F2-23 crawler evidence.",
);
assert(
  releaseManifest.search_engine_submission_verification?.search_engine ===
    "google-search-console" &&
    releaseManifest.search_engine_submission_verification?.property_type === "url-prefix" &&
    releaseManifest.search_engine_submission_verification?.submission_result === "success" &&
    releaseManifest.search_engine_submission_verification?.discovered_pages === 20 &&
    releaseManifest.search_engine_submission_verification?.representative_live_tests >= 1 &&
    releaseManifest.search_engine_submission_verification?.indexing_requests >= 3 &&
    releaseManifest.search_engine_submission_verification?.indexation_claimed === false,
  "Release candidate does not preserve successful F2-24 Search Console evidence.",
);
assert(
  typeof releaseManifest.source_commit === "string" &&
    /^[0-9a-f]{40}$/u.test(releaseManifest.source_commit),
  `Release candidate source_commit is unavailable or invalid: ${String(releaseManifest.source_commit)}`,
);
assert(
  Array.isArray(releaseManifest.public_routes) && releaseManifest.public_routes.length > 0,
  "Release candidate has no public routes.",
);
assert(
  Array.isArray(releaseManifest.machine_readable_files) &&
    releaseManifest.machine_readable_files.length > 0,
  "Release candidate has no machine-readable inventory.",
);
assert(
  Array.isArray(releaseManifest.files) &&
    releaseManifest.files.length === releaseManifest.artifact_file_count,
  "Release candidate file inventory does not match artifact_file_count.",
);
assert(
  Array.isArray(releaseManifest.completed_external_work),
  "Release candidate does not record completed external work.",
);
assert(
  Array.isArray(releaseManifest.external_pending_work),
  "Release candidate does not record pending external work.",
);

for (const id of completedRepositoryIds) {
  assert(
    releaseManifest.completed_repository_work.some((value) => value.startsWith(id)),
    `Release candidate does not record completed repository work ${id}.`,
  );
}
for (const id of completedExternalIds) {
  assert(
    releaseManifest.completed_external_work.some((value) => value.startsWith(id)),
    `Release candidate does not record completed external work ${id}.`,
  );
}
for (const id of pendingExternalIds) {
  assert(
    releaseManifest.external_pending_work.some((value) => value.startsWith(id)),
    `Release candidate does not preserve pending external work ${id}.`,
  );
}
assert(
  !releaseManifest.external_pending_work.some((value) => value.startsWith("F2-24")),
  "Release candidate still records F2-24 as pending.",
);

let totalBytes = 0;
const aggregateLines = [];
for (const file of releaseManifest.files) {
  const absolutePath = path.join(candidateSiteRoot, file.path);
  assert(fs.existsSync(absolutePath), `Frozen file is missing: ${file.path}`);
  const stat = fs.statSync(absolutePath);
  assert(stat.isFile(), `Frozen inventory path is not a file: ${file.path}`);
  assert(stat.size === file.size_bytes, `Frozen file size changed: ${file.path}`);
  const digest = sha256File(absolutePath);
  assert(digest === file.sha256, `Frozen file SHA-256 changed: ${file.path}`);
  totalBytes += stat.size;
  aggregateLines.push(`${file.path}\u0000${file.size_bytes}\u0000${file.sha256}`);
}
assert(
  totalBytes === releaseManifest.artifact_size_bytes,
  "Frozen artifact total byte count does not match the release manifest.",
);
const aggregateDigest = crypto
  .createHash("sha256")
  .update(aggregateLines.join("\n"))
  .digest("hex");
assert(
  aggregateDigest === releaseManifest.artifact_sha256,
  "Frozen artifact aggregate SHA-256 does not match the release manifest.",
);

const developmentSchedule = read("docs/development-schedule.md");
const projectStatus = read("docs/project-status.md");
const roadmap = read("docs/roadmap.md");
const freshnessAudit = read("docs/matsuri-data-freshness-audit.md");
const deploymentTopology = read("docs/deployment-topology.md");
const activationAudit = read(
  "docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md",
);
const searchAudit = read("docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md");
const crawlerAudit = read(
  "docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md",
);
const submissionAudit = read(
  "docs/audits/matsuri-f2-24-search-console-2026-07-14.md",
);

for (const id of [...completedRepositoryIds, "F2-15", ...completedExternalIds]) {
  assert(developmentSchedule.includes(id), `Development schedule is missing ${id}.`);
}
for (const id of pendingExternalIds) {
  assert(
    developmentSchedule.includes(id),
    `Development schedule is missing pending external work ${id}.`,
  );
}
assert(
  projectStatus.includes("F2-16 through F2-24 — completed"),
  "Project status does not record F2-16 through F2-24 completion.",
);
assert(
  projectStatus.includes("F2-25 — active next gate"),
  "Project status does not record F2-25 as the active next gate.",
);
assert(
  projectStatus.includes("F2-M02 — Matsuri data freshness audit — completed"),
  "Project status does not record F2-M02 completion.",
);
assert(
  developmentSchedule.includes("F2-M02  Matsuri data freshness audit — completed"),
  "Development schedule does not record F2-M02 completion.",
);
assert(
  roadmap.includes("F2-M02  Matsuri data freshness audit — completed"),
  "Roadmap does not record F2-M02 completion.",
);
assert(
  freshnessAudit.includes("**Status:** F2-M02 completed / routine date-triggered maintenance continues"),
  "Matsuri freshness audit does not record F2-M02 completion.",
);
assert(
  freshnessAudit.includes("Closed-period unresolved            0") &&
    freshnessAudit.includes("Specialists with no Relation          0") &&
    freshnessAudit.includes("Relations missing Evidence             0"),
  "Matsuri freshness audit does not preserve the completed zero-candidate results.",
);
assert(
  deploymentTopology.includes("yukue.badjoke-lab.com") &&
    deploymentTopology.includes("matsuri-yukue.badjoke-lab.com") &&
    deploymentTopology.includes("must not be nested below the portal path"),
  "Deployment topology does not preserve the accepted portal and Matsuri separation.",
);
assert(
  activationAudit.includes("Run ID\n29191904624") &&
    activationAudit.includes("Conclusion\nsuccess"),
  "Canonical activation audit is incomplete.",
);
assert(
  searchAudit.includes("Run ID\n29193201911") &&
    searchAudit.includes("Artifact ID\n8260207484") &&
    searchAudit.includes("Conclusion\nsuccess"),
  "Canonical Search audit is incomplete.",
);
assert(
  crawlerAudit.includes("Run ID\n29230233384") &&
    crawlerAudit.includes("Artifact ID\n8271238535") &&
    crawlerAudit.includes("Conclusion\nsuccess"),
  "Crawler reachability audit is incomplete.",
);
assert(
  submissionAudit.includes("Submission status    success") &&
    submissionAudit.includes("Discovered pages     20") &&
    submissionAudit.includes("Live test result\nindexable") &&
    submissionAudit.includes("F2-24 complete                   true"),
  "Search Console submission audit is incomplete.",
);
assert(
  roadmap.includes("External deployment through F2-24: **Completed**") &&
    roadmap.includes("F2-25  Web Analytics activation — next"),
  "Roadmap does not reflect F2-24 completion and the F2-25 next gate.",
);

console.log(
  `Matsuri repository readiness gate passed: ${releaseManifest.public_routes.length} routes, ${releaseManifest.artifact_file_count} files, ${releaseManifest.artifact_size_bytes} bytes, SHA-256 ${releaseManifest.artifact_sha256}; F2-16 through F2-24 and F2-M02 are complete; Search Console sitemap submission verified with ${releaseManifest.search_engine_submission_verification.discovered_pages} discovered pages; F2-25 through F2-28 remain pending.`,
);
