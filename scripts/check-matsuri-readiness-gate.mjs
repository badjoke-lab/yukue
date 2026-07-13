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
  "check:matsuri:canonical-metadata",
  "check:matsuri:consistency",
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

assert(fs.existsSync(path.join(repositoryRoot, "wrangler.jsonc")), "Repository readiness requires wrangler.jsonc.");
assert(fs.existsSync(releaseManifestPath), "Release candidate manifest is missing. Run pnpm freeze:matsuri:release first.");
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
    "repository-verified-canonical-origin-browser-search-and-crawler-reachability-verified-sitemap-submission-pending",
  `Unexpected release_status: ${String(releaseManifest.release_status)}`,
);
assert(
  releaseManifest.artifact_origin_mode === "origin-neutral-repository-candidate",
  "Release candidate must preserve the origin-neutral artifact mode.",
);
assert(
  releaseManifest.canonical_hostname_decision === "matsuri-yukue.badjoke-lab.com" &&
    releaseManifest.canonical_origin === "https://matsuri-yukue.badjoke-lab.com" &&
    releaseManifest.portal_origin_decision === "https://yukue.badjoke-lab.com",
  "Release candidate does not preserve the accepted deployment topology.",
);
assert(
  releaseManifest.canonical_origin_verification?.workflow_run_id === 29191904624 &&
    releaseManifest.canonical_origin_verification?.https_reachable === true &&
    releaseManifest.canonical_origin_verification?.manifest_origin_verified === true &&
    releaseManifest.canonical_origin_verification?.canonical_sitemap_verified === true,
  "Release candidate does not preserve canonical-origin evidence.",
);
assert(
  releaseManifest.canonical_search_verification?.workflow_run_id === 29193201911 &&
    releaseManifest.canonical_search_verification?.job_id === 86651403427 &&
    releaseManifest.canonical_search_verification?.artifact_id === 8260207484 &&
    releaseManifest.canonical_search_verification?.artifact_digest ===
      "sha256:29c05992a887951d91caa8f5bd4588d88b0bac97230353cba4381ec4ff0eb884" &&
    releaseManifest.canonical_search_verification?.desktop_chromium_verified === true &&
    releaseManifest.canonical_search_verification?.mobile_chromium_verified === true &&
    releaseManifest.canonical_search_verification?.runtime_errors_absent === true,
  "Release candidate does not preserve F2-22 canonical Search evidence.",
);
assert(
  releaseManifest.crawler_reachability_verification?.workflow_run_id === 29230475619 &&
    releaseManifest.crawler_reachability_verification?.job_id === 86753387839 &&
    releaseManifest.crawler_reachability_verification?.artifact_id === 8271321515 &&
    releaseManifest.crawler_reachability_verification?.artifact_digest ===
      "sha256:ed678ef3be66522db2f54ff4fbec3a561297a7eea9a6ad75071cbec89acff648" &&
    releaseManifest.crawler_reachability_verification?.robots_policy_verified === true &&
    releaseManifest.crawler_reachability_verification?.sitemap_route_count === 20 &&
    releaseManifest.crawler_reachability_verification?.sitemap_canonical_origin_only === true &&
    releaseManifest.crawler_reachability_verification?.sitemap_duplicate_count === 0 &&
    releaseManifest.crawler_reachability_verification?.self_canonical_route_count === 20 &&
    releaseManifest.crawler_reachability_verification?.indexable_route_count === 20 &&
    releaseManifest.crawler_reachability_verification?.blocking_x_robots_tag_count === 0 &&
    releaseManifest.crawler_reachability_verification?.representative_user_agent_checks === 28 &&
    releaseManifest.crawler_reachability_verification?.discovery_file_checks === 12,
  "Release candidate does not preserve F2-23 crawler reachability evidence.",
);
assert(
  typeof releaseManifest.source_commit === "string" && /^[0-9a-f]{40}$/u.test(releaseManifest.source_commit),
  `Release candidate source_commit is unavailable or invalid: ${String(releaseManifest.source_commit)}`,
);
assert(Array.isArray(releaseManifest.public_routes) && releaseManifest.public_routes.length === 20, "Release candidate must contain 20 public routes.");
assert(
  Array.isArray(releaseManifest.files) && releaseManifest.files.length === releaseManifest.artifact_file_count,
  "Release candidate file inventory does not match artifact_file_count.",
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
assert(totalBytes === releaseManifest.artifact_size_bytes, "Frozen artifact byte count mismatch.");
const aggregateDigest = crypto.createHash("sha256").update(aggregateLines.join("\n")).digest("hex");
assert(aggregateDigest === releaseManifest.artifact_sha256, "Frozen artifact aggregate SHA-256 mismatch.");

const developmentSchedule = read("docs/development-schedule.md");
const projectStatus = read("docs/project-status.md");
const roadmap = read("docs/roadmap.md");
const freshnessAudit = read("docs/matsuri-data-freshness-audit.md");
const deploymentTopology = read("docs/deployment-topology.md");
const activationAudit = read("docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md");
const searchAudit = read("docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md");
const crawlerAudit = read("docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md");

for (const id of [...completedRepositoryIds, "F2-15", ...completedExternalIds, ...pendingExternalIds]) {
  assert(developmentSchedule.includes(id), `Development schedule is missing ${id}.`);
}
assert(projectStatus.includes("F2-16 through F2-23 — completed"), "Project status does not record F2-23 completion.");
assert(projectStatus.includes("F2-24 through F2-28 — operational hold"), "Project status does not record the F2-24 boundary.");
assert(projectStatus.includes("F2-M02 — Matsuri data freshness audit — completed"), "Project status does not record F2-M02 completion.");
assert(developmentSchedule.includes("F2-M02  Matsuri data freshness audit — completed"), "Development schedule does not record F2-M02 completion.");
assert(roadmap.includes("F2-M02  Matsuri data freshness audit — completed"), "Roadmap does not record F2-M02 completion.");
assert(
  roadmap.includes("External deployment through F2-23: **Completed**") &&
    roadmap.includes("Sitemap submission: **Next gate at F2-24**"),
  "Roadmap does not reflect the F2-24 boundary.",
);
assert(
  freshnessAudit.includes("**Status:** F2-M02 completed / routine date-triggered maintenance continues") &&
    freshnessAudit.includes("Closed-period unresolved            0") &&
    freshnessAudit.includes("Specialists with no Relation          0") &&
    freshnessAudit.includes("Relations missing Evidence             0"),
  "Matsuri freshness audit does not preserve completed results.",
);
assert(
  deploymentTopology.includes("yukue.badjoke-lab.com") &&
    deploymentTopology.includes("matsuri-yukue.badjoke-lab.com") &&
    deploymentTopology.includes("must not be nested below the portal path"),
  "Deployment topology does not preserve portal and Matsuri separation.",
);
assert(
  activationAudit.includes("Run ID\n29191904624") &&
    activationAudit.includes("Conclusion\nsuccess"),
  "Canonical activation audit is incomplete.",
);
assert(
  searchAudit.includes("Run ID\n29193201911") &&
    searchAudit.includes("Artifact ID\n8260207484") &&
    searchAudit.includes("F2-22  browser Pagefind Search verification — completed"),
  "Canonical Search audit is incomplete.",
);
assert(
  crawlerAudit.includes("Run ID\n29230475619") &&
    crawlerAudit.includes("Job ID\n86753387839") &&
    crawlerAudit.includes("Artifact ID\n8271321515") &&
    crawlerAudit.includes("sitemap locations         20") &&
    crawlerAudit.includes("Total checks          28") &&
    crawlerAudit.includes("Total checks       12") &&
    crawlerAudit.includes("F2-23  crawler-reachability review — completed"),
  "Crawler reachability audit is incomplete.",
);

console.log(
  `Matsuri repository readiness gate passed: ${releaseManifest.public_routes.length} routes, ${releaseManifest.artifact_file_count} files, ${releaseManifest.artifact_size_bytes} bytes, SHA-256 ${releaseManifest.artifact_sha256}; F2-16 through F2-23 and F2-M02 are complete; F2-24 through F2-28 remain pending.`,
);
