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
  "check:matsuri:pages",
  "check:matsuri:consistency",
  "check:matsuri:semantics",
  "check:matsuri:evidence",
  "check:matsuri:content",
  "check:matsuri:browser",
];

const requiredDocs = [
  "docs/release-verification.md",
  "docs/release-candidate.md",
  "docs/source-evidence-audit.md",
  "docs/browser-accessibility-audit.md",
  "docs/public-content-audit.md",
  "docs/repository-launch-readiness.md",
  "docs/development-schedule.md",
  "docs/project-status.md",
  "docs/roadmap.md",
  "docs/deployment.md",
  "docs/decision-log.md",
];

const completedIds = [
  "F2-07",
  "F2-08",
  "F2-09",
  "F2-10",
  "F2-11",
  "F2-12",
  "F2-13",
  "F2-14",
];

const pendingIds = [
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
  releaseManifest.release_status === "repository-verified-external-deployment-held",
  `Unexpected release_status: ${String(releaseManifest.release_status)}`,
);
assert(
  releaseManifest.canonical_origin === null,
  "Repository-ready candidate must not claim a canonical production origin.",
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

for (const id of completedIds) {
  assert(
    releaseManifest.completed_repository_work.some((value) => value.startsWith(id)),
    `Release candidate does not record completed repository work ${id}.`,
  );
}

for (const id of pendingIds) {
  assert(
    releaseManifest.external_pending_work.some((value) => value.startsWith(id)),
    `Release candidate does not preserve pending external work ${id}.`,
  );
}

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
const roadmap = fs.readFileSync(
  path.join(repositoryRoot, "docs", "roadmap.md"),
  "utf8",
);

for (const id of [...completedIds, "F2-15"]) {
  assert(
    developmentSchedule.includes(id),
    `Development schedule is missing ${id}.`,
  );
}
for (const id of pendingIds) {
  assert(
    developmentSchedule.includes(id),
    `Development schedule is missing held external work ${id}.`,
  );
}
assert(
  projectStatus.includes("F2-15 — Repository Launch Readiness Gate — completed"),
  "Project status does not record F2-15 completion.",
);
assert(
  projectStatus.includes("F2-16–F2-28") && projectStatus.includes("Operational hold"),
  "Project status does not preserve the external operational hold.",
);
assert(
  roadmap.includes("Repository Launch Readiness: **Completed**") &&
    roadmap.includes("External deployment and production verification: **Operational hold**"),
  "Roadmap does not reflect repository readiness and the external hold.",
);

console.log(
  `Matsuri F2-15 repository readiness gate passed: ${releaseManifest.public_routes.length} routes, ${releaseManifest.artifact_file_count} files, ${releaseManifest.artifact_size_bytes} bytes, SHA-256 ${releaseManifest.artifact_sha256}; F2-16 through F2-28 remain held.`,
);
