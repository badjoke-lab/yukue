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
  "docs/development-schedule.md",
  "docs/project-status.md",
  "docs/roadmap.md",
  "docs/deployment.md",
  "docs/decision-log.md",
  "docs/matsuri-data-freshness-audit.md",
  "docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md",
  "docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md",
  "docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md",
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
];
const pendingExternalIds = ["F2-24", "F2-25", "F2-26", "F2-27", "F2-28"];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

const packageJson = JSON.parse(
  fs.readFileSync(path.join(repositoryRoot, "package.json"), "utf8"),
);

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
    "repository-verified-crawler-reachability-verified-sitemap-submission-pending",
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
  "Release candidate does not preserve the successful canonical verification evidence.",
);
assert(
  releaseManifest.canonical_search_verification?.workflow_run_id === 29193201911 &&
    releaseManifest.canonical_search_verification?.job_id === 86651403427 &&
    releaseManifest.canonical_search_verification?.verified_origin ===
      "https://matsuri-yukue.badjoke-lab.com" &&
    releaseManifest.canonical_search_verification?.artifact_id === 8260207484 &&
    releaseManifest.canonical_search_verification?.artifact_digest ===
      "sha256:29c05992a887951d91caa8f5bd4588d88b0bac97230353cba4381ec4ff0eb884" &&
    releaseManifest.canonical_search_verification?.desktop_chromium_verified === true &&
    releaseManifest.canonical_search_verification?.mobile_chromium_verified === true &&
    releaseManifest.canonical_search_verification?.exact_name_query_verified === true &&
    releaseManifest.canonical_search_verification?.structured_filters_verified === true &&
    releaseManifest.canonical_search_verification?.no_result_state_verified === true &&
    releaseManifest.canonical_search_verification?.result_navigation_verified === true &&
    releaseManifest.canonical_search_verification?.runtime_errors_absent === true,
  "Release candidate does not preserve successful F2-22 canonical Search evidence.",
);
assert(
  releaseManifest.crawler_reachability_verification?.workflow_run_id === 29230233384 &&
    releaseManifest.crawler_reachability_verification?.artifact_id === 8271238535 &&
    releaseManifest.crawler_reachability_verification?.artifact_digest ===
      "sha256:ae292efac09e25fc9ad0cefd0a7de3c40d4a38c28472734035d728ecd26f2506" &&
    releaseManifest.crawler_reachability_verification?.robots_verified === true &&
    releaseManifest.crawler_reachability_verification?.sitemap_verified === true &&
    releaseManifest.crawler_reachability_verification?.self_canonical_verified === true &&
    releaseManifest.crawler_reachability_verification?.indexing_directives_verified === true &&
    releaseManifest.crawler_reachability_verification?.representative_user_agents_verified === true &&
    releaseManifest.crawler_reachability_verification?.public_discovery_files_verified === true,
  "Release candidate does not preserve successful F2-23 crawler evidence.",
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
  !releaseManifest.external_pending_work.some((value) => value.startsWith("F2-23")),
  "Release candidate still records F2-23 as pending.",
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

const developmentSchedule = fs.readFileSync(
  path.join(repositoryRoot, "docs", "development-schedule.md"),
  "utf8",
);
const projectStatus = fs.readFileSync(
  path.join(repositoryRoot, "docs", "project-status.md"),
  "utf8",
);
const roadmap = fs.readFileSync(path.join(repositoryRoot, "docs", "roadmap.md"), "utf8");
const freshnessAudit = fs.readFileSync(
  path.join(repositoryRoot, "docs", "matsuri-data-freshness-audit.md"),
  "utf8",
);
const deploymentTopology = fs.readFileSync(
  path.join(repositoryRoot, "docs", "deployment-topology.md"),
  "utf8",
);
const activationAudit = fs.readFileSync(
  path.join(repositoryRoot, "docs", "audits", "matsuri-f2-20-canonical-activation-2026-07-12.md"),
  "utf8",
);
const searchAudit = fs.readFileSync(
  path.join(repositoryRoot, "docs", "audits", "matsuri-f2-22-canonical-search-2026-07-12.md"),
  "utf8",
);
const crawlerAudit = fs.readFileSync(
  path.join(repositoryRoot, "docs", "audits", "matsuri-f2-23-crawler-reachability-2026-07-13.md"),
  "utf8",
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
  projectStatus.includes("F2-16 through F2-23 — completed"),
  "Project status does not record F2-16 through F2-23 completion.",
);
assert(
  projectStatus.includes("F2-24 through F2-28 — operational hold"),
  "Project status does not record the F2-24 boundary.",
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
    activationAudit.includes("Conclusion\nsuccess") &&
    activationAudit.includes("F2-20  custom-domain attachment, canonical build, HTTPS verification — completed") &&
    activationAudit.includes("F2-21  canonical manifest and sitemap verification — completed"),
  "Canonical activation audit is incomplete.",
);
assert(
  searchAudit.includes("Run ID\n29193201911") &&
    searchAudit.includes("Job ID\n86651403427") &&
    searchAudit.includes("Conclusion\nsuccess") &&
    searchAudit.includes("Artifact ID\n8260207484") &&
    searchAudit.includes("F2-22  browser Pagefind Search verification — completed"),
  "Canonical Search audit is incomplete.",
);
assert(
  crawlerAudit.includes("Run ID\n29230233384") &&
    crawlerAudit.includes("Conclusion\nsuccess") &&
    crawlerAudit.includes("Artifact ID\n8271238535") &&
    crawlerAudit.includes("F2-23  robots, canonical, sitemap, crawler-reachability review — completed"),
  "Crawler reachability audit is incomplete.",
);
assert(
  roadmap.includes("External deployment through F2-23: **Completed**") &&
    roadmap.includes("Sitemap submission and indexability: **Next gate at F2-24**"),
  "Roadmap does not reflect F2-23 completion and the F2-24 next gate.",
);

console.log(
  `Matsuri repository readiness gate passed: ${releaseManifest.public_routes.length} routes, ${releaseManifest.artifact_file_count} files, ${releaseManifest.artifact_size_bytes} bytes, SHA-256 ${releaseManifest.artifact_sha256}; F2-16 through F2-23 and F2-M02 are complete; crawler reachability verified by run 29230233384; F2-24 through F2-28 remain pending.`,
);
