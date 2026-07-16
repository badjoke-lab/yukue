import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const recordPath = path.join(repositoryRoot, "config", "jinja-start-gate.json");
const projectStatusPath = path.join(repositoryRoot, "docs", "project-status.md");
const packagePath = path.join(repositoryRoot, "package.json");
const forbiddenKeys = new Set([
  "account_email",
  "account_id",
  "api_token",
  "analytics_token",
  "cloudflare_token",
  "verification_token",
  "secret",
]);
const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/iu;
const matsuriSpecialistTypes = new Set(["festival", "folk_performance", "tradition_unit"]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function inspectPrivacy(value, pointer = "$root") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => inspectPrivacy(item, `${pointer}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") {
    if (typeof value === "string" && emailPattern.test(value)) {
      throw new Error(`Jinja start-gate record contains an email address at ${pointer}`);
    }
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenKeys.has(key)) {
      throw new Error(`Jinja start-gate record contains forbidden key ${pointer}.${key}`);
    }
    inspectPrivacy(child, `${pointer}.${key}`);
  }
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function officialUrls(entity) {
  return unique(
    (entity.external_links ?? [])
      .filter((link) => ["official", "official_organization"].includes(link.officiality))
      .map((link) => link.url),
  );
}

function deploymentConfigFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if ([".git", "node_modules", ".artifacts", ".release-candidate"].includes(entry.name)) continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...deploymentConfigFiles(absolutePath));
    } else if (/^(?:wrangler.*\.(?:jsonc|toml)|.*worker.*\.jsonc)$/iu.test(entry.name)) {
      files.push(absolutePath);
    }
  }
  return files;
}

const record = JSON.parse(fs.readFileSync(recordPath, "utf8"));
inspectPrivacy(record);
assert(record.format_version === 1, "Unexpected Jinja start-gate format_version");
assert(record.site_id === "jinja", "Unexpected Jinja start-gate site_id");
assert(record.next_specialist_site === "jinja", "Unexpected next specialist site");
assert(
  record.status === "blocked-by-matsuri-launch-closure",
  `Unexpected Jinja start-gate status: ${String(record.status)}`,
);

for (const key of [
  "matsuri_f2_28_complete",
  "matsuri_stabilization_review_complete",
  "portal_jinja_order_decided",
  "jinja_state_spec_approved",
  "explicit_start_authorization",
]) {
  assert(record.prerequisites?.[key] === false, `Pending Jinja start gate must keep ${key} false`);
}

assert(
  record.claims?.jinja_start_gate_passed === false &&
    record.claims?.jinja_application_creation_authorized === false &&
    record.claims?.jinja_worker_creation_authorized === false &&
    record.claims?.jinja_publication_authorized === false,
  "Pending Jinja record contains an activation or completion claim",
);
assert(
  record.boundary?.seed_preparation_does_not_activate_site === true &&
    record.boundary?.all_prerequisites_required === true &&
    record.boundary?.application_directory_must_remain_absent === true &&
    record.boundary?.worker_and_hostname_must_remain_inactive === true &&
    record.boundary?.missing_state_must_not_be_inferred === true,
  "Jinja start-gate boundary is incomplete",
);

assert(!fs.existsSync(path.join(repositoryRoot, "apps", "jinja")), "apps/jinja exists before authorization");
assert(
  !fs.existsSync(path.join(repositoryRoot, "wrangler.jinja.jsonc")) &&
    !fs.existsSync(path.join(repositoryRoot, "wrangler-jinja.jsonc")) &&
    !fs.existsSync(path.join(repositoryRoot, "config", "jinja-deployment.json")),
  "A Jinja deployment configuration exists before authorization",
);
for (const configPath of deploymentConfigFiles(repositoryRoot)) {
  const content = fs.readFileSync(configPath, "utf8");
  assert(
    !content.includes("jinja-yukue") && !content.includes("apps/jinja"),
    `Jinja deployment activation detected in ${path.relative(repositoryRoot, configPath)}`,
  );
}

const projectStatus = fs.readFileSync(projectStatusPath, "utf8");
assert(
  projectStatus.includes("F2-28  final F2 Launch Gate — blocked by F2-27"),
  "Project status no longer records F2-28 as blocked",
);
assert(
  projectStatus.includes("future specialist-site implementation"),
  "Project status does not preserve the inactive future-site boundary",
);

const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
assert(
  packageJson.scripts?.["check:yukue:jinja-start-gate"] ===
    "node scripts/check-jinja-start-gate-record.mjs",
  "package.json is missing the Jinja start-gate validator script",
);
assert(
  packageJson.scripts?.["gate:matsuri:repository"]?.includes("pnpm check:yukue:jinja-start-gate"),
  "Repository gate does not enforce the Jinja start-gate record",
);

const dataset = loadMatsuriDataset();
const entitiesById = new Map(dataset.entities.map((entity) => [entity.id, entity]));
const candidateIds = new Set();
for (const relation of dataset.relations) {
  if (relation.review_status !== "approved") continue;
  const source = entitiesById.get(relation.source_entity_id);
  const target = entitiesById.get(relation.target_entity_id);
  assert(source && target, `Approved Relation ${relation.id} references a missing Entity`);
  if (source.entity_type === "shrine" && matsuriSpecialistTypes.has(target.entity_type)) candidateIds.add(source.id);
  if (target.entity_type === "shrine" && matsuriSpecialistTypes.has(source.entity_type)) candidateIds.add(target.id);
}

const candidates = [...candidateIds].map((id) => entitiesById.get(id));
const identityEvidence = dataset.evidence.filter(
  (evidence) =>
    evidence.review_status === "approved" &&
    evidence.target_type === "entity_identity" &&
    candidateIds.has(evidence.target_id),
);
const placeReferences = candidates.reduce(
  (total, entity) => total + unique([entity.primary_place_id, ...(entity.default_place_ids ?? [])]).length,
  0,
);
const approvedStateSnapshots = dataset.stateSnapshots.filter(
  (snapshot) => snapshot.review_status === "approved" && candidateIds.has(snapshot.entity_id),
);
const candidatesWithOfficialUrl = candidates.filter((entity) => officialUrls(entity).length > 0);

const observed = {
  relation_backed_seeds: candidates.length,
  direct_identity_evidence: identityEvidence.length,
  place_references: placeReferences,
  approved_state_snapshots: approvedStateSnapshots.length,
  official_urls: candidatesWithOfficialUrl.length,
};
for (const [key, value] of Object.entries(observed)) {
  assert(record.seed_baseline?.[key] === value, `Jinja seed baseline ${key} expected ${value}`);
}
assert(record.seed_baseline?.source_site_id === "matsuri", "Unexpected seed source site");
assert(/^\d{4}-\d{2}-\d{2}$/u.test(record.seed_baseline?.observed_on), "Invalid seed observation date");

console.log(
  `Jinja start gate remains correctly blocked: ${candidates.length} seed(s), ${identityEvidence.length} identity Evidence, ${placeReferences} Place references, ${approvedStateSnapshots.length} approved shrine State Snapshots, ${candidatesWithOfficialUrl.length} official URLs.`,
);
