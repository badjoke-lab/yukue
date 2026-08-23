import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const startGate = JSON.parse(fs.readFileSync(path.join(repositoryRoot, "config", "jinja-start-gate.json"), "utf8"));
const implementationGate = JSON.parse(fs.readFileSync(path.join(repositoryRoot, "config", "jinja-implementation-gate.json"), "utf8"));
const stabilization = JSON.parse(fs.readFileSync(path.join(repositoryRoot, "config", "matsuri-stabilization-review.json"), "utf8"));
const projectStatus = fs.readFileSync(path.join(repositoryRoot, "docs", "project-status.md"), "utf8");
const packageJson = JSON.parse(fs.readFileSync(path.join(repositoryRoot, "package.json"), "utf8"));
const matsuriSpecialistTypes = new Set(["festival", "folk_performance", "tradition_unit"]);
const forbiddenKeys = new Set(["account_email", "account_id", "api_token", "analytics_token", "cloudflare_token", "verification_token", "secret"]);
const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/iu;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
function unique(values) {
  return [...new Set(values.filter(Boolean))];
}
function inspectPrivacy(value, pointer = "$root") {
  if (Array.isArray(value)) return value.forEach((item, i) => inspectPrivacy(item, `${pointer}[${i}]`));
  if (!value || typeof value !== "object") {
    if (typeof value === "string" && emailPattern.test(value)) throw new Error(`Jinja gate record contains an email address at ${pointer}`);
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenKeys.has(key)) throw new Error(`Jinja gate record contains forbidden key ${pointer}.${key}`);
    inspectPrivacy(child, `${pointer}.${key}`);
  }
}
function officialUrls(entity) {
  return unique((entity.external_links ?? []).filter((link) => ["official", "official_organization"].includes(link.officiality)).map((link) => link.url));
}
function deploymentConfigFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if ([".git", "node_modules", ".artifacts", ".release-candidate"].includes(entry.name)) continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...deploymentConfigFiles(absolutePath));
    else if (/^(?:wrangler.*\.(?:jsonc|toml)|.*worker.*\.jsonc)$/iu.test(entry.name)) files.push(absolutePath);
  }
  return files;
}

inspectPrivacy(startGate);
inspectPrivacy(implementationGate);

assert(startGate.format_version === 1 && startGate.site_id === "jinja", "Unexpected Jinja public start-gate identity");
assert(startGate.next_specialist_site === "jinja", "Unexpected next specialist site");
assert(startGate.status === "blocked-by-post-launch-prerequisites", `Unexpected Jinja public start-gate status: ${String(startGate.status)}`);
assert(startGate.matsuri_stabilization_record === "config/matsuri-stabilization-review.json", "Jinja public start gate must reference Matsuri stabilization");
assert(startGate.prerequisites?.matsuri_f2_28_complete === true, "Jinja public start gate requires Matsuri F2-28 completion");
assert(startGate.prerequisites?.matsuri_stabilization_review_complete === stabilization.claims?.jinja_stabilization_prerequisite_complete, "Jinja stabilization prerequisite must match Matsuri stabilization");
for (const key of ["portal_jinja_order_decided", "jinja_state_spec_approved", "explicit_start_authorization"]) {
  assert(startGate.prerequisites?.[key] === true, `Jinja prerequisite ${key} must be complete before implementation`);
}
const allPublicPrerequisitesComplete = Object.values(startGate.prerequisites).every(Boolean);
assert(startGate.claims?.jinja_start_gate_passed === allPublicPrerequisitesComplete, "Jinja public start-gate completion claim must exactly match prerequisites");
assert(startGate.claims?.jinja_worker_creation_authorized === false, "Jinja public gate must not authorize a Worker yet");
assert(startGate.claims?.jinja_publication_authorized === false, "Jinja public gate must not authorize publication yet");

assert(implementationGate.format_version === 1 && implementationGate.site_id === "jinja", "Unexpected Jinja implementation-gate identity");
assert(implementationGate.status === "implementation-authorized", "Jinja implementation gate is not authorized");
assert(Object.values(implementationGate.prerequisites ?? {}).every(Boolean), "Jinja implementation prerequisites are incomplete");
assert(implementationGate.deferred_private_operations?.blocks_application_implementation === false, "Deferred owner observations incorrectly block Jinja implementation");
assert(implementationGate.deferred_private_operations?.blocks_worker_or_hostname_activation === true, "Deferred owner observations must block Worker/hostname activation");
assert(implementationGate.deferred_private_operations?.blocks_publication === true, "Deferred owner observations must block publication");
assert(implementationGate.claims?.jinja_application_creation_authorized === true, "Jinja application creation is not authorized by the implementation gate");
assert(implementationGate.claims?.jinja_local_and_ci_implementation_authorized === true, "Jinja local/CI implementation is not authorized");
assert(implementationGate.claims?.jinja_worker_creation_authorized === false, "Implementation gate must not authorize a Jinja Worker");
assert(implementationGate.claims?.jinja_hostname_activation_authorized === false, "Implementation gate must not authorize a Jinja hostname");
assert(implementationGate.claims?.jinja_publication_authorized === false, "Implementation gate must not authorize public Jinja records");
assert(implementationGate.boundary?.no_private_observation_is_inferred === true && implementationGate.boundary?.matsuri_stabilization_review_remains_incomplete === true && implementationGate.boundary?.jinja_start_gate_remains_blocked === true && implementationGate.boundary?.no_worker_hostname_route_or_publication === true && implementationGate.boundary?.seed_records_require_jinja_specific_review === true && implementationGate.boundary?.missing_state_must_not_be_inferred === true, "Jinja implementation boundary is incomplete");

const appPath = path.join(repositoryRoot, "apps", "jinja");
if (fs.existsSync(appPath)) {
  assert(implementationGate.claims.jinja_application_creation_authorized === true, "apps/jinja exists without implementation authorization");
}
assert(!fs.existsSync(path.join(repositoryRoot, "wrangler.jinja.jsonc")) && !fs.existsSync(path.join(repositoryRoot, "wrangler-jinja.jsonc")) && !fs.existsSync(path.join(repositoryRoot, "config", "jinja-deployment.json")), "A Jinja deployment configuration exists before public activation authorization");
for (const configPath of deploymentConfigFiles(repositoryRoot)) {
  const content = fs.readFileSync(configPath, "utf8");
  assert(!content.includes("jinja-yukue") && !content.includes("apps/jinja"), `Jinja deployment activation detected in ${path.relative(repositoryRoot, configPath)}`);
}

assert(projectStatus.includes("F2-28 — final F2 Launch Gate — completed"), "Project status does not record F2-28 completion");
assert(projectStatus.includes("Phase 10 Stabilization — active"), "Project status does not record stabilization");
assert(projectStatus.includes("Actual Jinja start gate — blocked"), "Project status no longer blocks Jinja public activation before stabilization completion");
assert(packageJson.scripts?.["check:yukue:jinja-start-gate"] === "node scripts/check-jinja-start-gate-record.mjs", "package.json is missing the Jinja gate validator script");
assert(packageJson.scripts?.["gate:matsuri:repository"]?.includes("pnpm check:matsuri:stabilization-review") && packageJson.scripts?.["gate:matsuri:repository"]?.includes("pnpm check:yukue:jinja-start-gate"), "Repository gate does not enforce stabilization and Jinja records");

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
const identityEvidence = dataset.evidence.filter((evidence) => evidence.review_status === "approved" && evidence.target_type === "entity_identity" && candidateIds.has(evidence.target_id));
const placeReferences = candidates.reduce((total, entity) => total + unique([entity.primary_place_id, ...(entity.default_place_ids ?? [])]).length, 0);
const approvedStateSnapshots = dataset.stateSnapshots.filter((snapshot) => snapshot.review_status === "approved" && candidateIds.has(snapshot.entity_id));
const candidatesWithOfficialUrl = candidates.filter((entity) => officialUrls(entity).length > 0);
const observed = {
  relation_backed_seeds: candidates.length,
  direct_identity_evidence: identityEvidence.length,
  place_references: placeReferences,
  approved_state_snapshots: approvedStateSnapshots.length,
  official_urls: candidatesWithOfficialUrl.length,
};
for (const [key, value] of Object.entries(observed)) assert(startGate.seed_baseline?.[key] === value, `Jinja seed baseline ${key} expected ${value}`);
assert(startGate.seed_baseline?.source_site_id === "matsuri", "Unexpected seed source site");
assert(/^\d{4}-\d{2}-\d{2}$/u.test(startGate.seed_baseline?.observed_on), "Invalid seed observation date");

const remainingPublicPrerequisites = Object.entries(startGate.prerequisites).filter(([, value]) => value === false).length;
console.log(`Jinja implementation authorized; public activation remains blocked: stabilization=${stabilization.status}, ${remainingPublicPrerequisites} public prerequisite(s) incomplete, app_present=${fs.existsSync(appPath)}, ${candidates.length} seed(s), ${identityEvidence.length} identity Evidence, ${placeReferences} Place references, ${approvedStateSnapshots.length} approved shrine State Snapshots, ${candidatesWithOfficialUrl.length} official URLs.`);
