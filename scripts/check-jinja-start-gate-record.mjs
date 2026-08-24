import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const startGate = JSON.parse(fs.readFileSync(path.join(repositoryRoot, "config", "jinja-start-gate.json"), "utf8"));
const implementationGate = JSON.parse(fs.readFileSync(path.join(repositoryRoot, "config", "jinja-implementation-gate.json"), "utf8"));
const previewGate = JSON.parse(fs.readFileSync(path.join(repositoryRoot, "config", "jinja-preview-deployment-gate.json"), "utf8"));
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
inspectPrivacy(previewGate);

assert(startGate.format_version === 1 && startGate.site_id === "jinja", "Unexpected Jinja canonical start-gate identity");
assert(startGate.next_specialist_site === "jinja", "Unexpected next specialist site");
assert(startGate.status === "blocked-by-post-launch-prerequisites", `Unexpected Jinja canonical start-gate status: ${String(startGate.status)}`);
assert(startGate.matsuri_stabilization_record === "config/matsuri-stabilization-review.json", "Jinja canonical start gate must reference Matsuri stabilization");
assert(startGate.prerequisites?.matsuri_f2_28_complete === true, "Jinja canonical start gate requires Matsuri F2-28 completion");
assert(startGate.prerequisites?.matsuri_stabilization_review_complete === stabilization.claims?.jinja_stabilization_prerequisite_complete, "Jinja stabilization prerequisite must match Matsuri stabilization");
for (const key of ["portal_jinja_order_decided", "jinja_state_spec_approved", "explicit_start_authorization"]) {
  assert(startGate.prerequisites?.[key] === true, `Jinja prerequisite ${key} must be complete before implementation`);
}
const allCanonicalPrerequisitesComplete = Object.values(startGate.prerequisites).every(Boolean);
assert(startGate.claims?.jinja_canonical_start_gate_passed === allCanonicalPrerequisitesComplete, "Jinja canonical start-gate completion claim must exactly match prerequisites");
assert(startGate.claims?.jinja_application_creation_authorized === true, "Jinja application creation must remain authorized");
assert(startGate.claims?.jinja_worker_preview_creation_authorized === true, "Jinja preview Worker must be authorized");
assert(startGate.claims?.jinja_workers_dev_preview_publication_authorized === true, "Jinja workers.dev preview publication must be authorized");
assert(startGate.claims?.jinja_custom_domain_activation_authorized === false, "Jinja custom domain must remain blocked");
assert(startGate.claims?.jinja_canonical_publication_authorized === false, "Jinja canonical publication must remain blocked");
assert(startGate.preview_scope?.origin === "https://jinja-yukue.badjoke-lab.workers.dev", "Unexpected Jinja preview origin");
assert(startGate.preview_scope?.canonical === false && startGate.preview_scope?.indexable === false, "Jinja preview must remain noncanonical and nonindexable");

assert(implementationGate.format_version === 1 && implementationGate.site_id === "jinja", "Unexpected Jinja implementation-gate identity");
assert(implementationGate.status === "implementation-and-preview-authorized", "Jinja implementation/preview gate is not authorized");
assert(Object.values(implementationGate.prerequisites ?? {}).every(Boolean), "Jinja implementation prerequisites are incomplete");
assert(implementationGate.deferred_private_operations?.blocks_application_implementation === false, "Deferred owner observations incorrectly block Jinja implementation");
assert(implementationGate.deferred_private_operations?.blocks_workers_dev_preview === false, "Deferred owner observations incorrectly block Jinja workers.dev preview");
assert(implementationGate.deferred_private_operations?.blocks_custom_domain_or_canonical_activation === true, "Deferred owner observations must block custom-domain/canonical activation");
assert(implementationGate.claims?.jinja_application_creation_authorized === true, "Jinja application creation is not authorized");
assert(implementationGate.claims?.jinja_local_and_ci_implementation_authorized === true, "Jinja local/CI implementation is not authorized");
assert(implementationGate.claims?.jinja_worker_preview_creation_authorized === true, "Jinja preview Worker is not authorized");
assert(implementationGate.claims?.jinja_workers_dev_preview_publication_authorized === true, "Jinja workers.dev preview is not authorized");
assert(implementationGate.claims?.jinja_hostname_activation_authorized === false, "Jinja custom hostname must remain blocked");
assert(implementationGate.claims?.jinja_canonical_publication_authorized === false, "Jinja canonical publication must remain blocked");
assert(implementationGate.boundary?.no_private_observation_is_inferred === true && implementationGate.boundary?.matsuri_stabilization_review_remains_incomplete === true && implementationGate.boundary?.jinja_canonical_start_gate_remains_blocked === true && implementationGate.boundary?.workers_dev_preview_must_be_noindex === true && implementationGate.boundary?.no_custom_domain_or_canonical_route === true && implementationGate.boundary?.seed_records_require_jinja_specific_review === true && implementationGate.boundary?.missing_state_must_not_be_inferred === true, "Jinja implementation/preview boundary is incomplete");

assert(previewGate.format_version === 1 && previewGate.site_id === "jinja", "Unexpected Jinja preview gate identity");
assert(previewGate.status === "workers-dev-preview-authorized", "Jinja preview gate is not authorized");
assert(previewGate.claims?.worker_creation_authorized === true && previewGate.claims?.workers_dev_preview_publication_authorized === true, "Jinja preview gate does not authorize workers.dev publication");
assert(previewGate.claims?.custom_domain_activation_authorized === false && previewGate.claims?.canonical_publication_authorized === false && previewGate.claims?.search_engine_submission_authorized === false, "Jinja preview gate exceeds its noncanonical scope");
assert(previewGate.scope?.workers_dev_origin === "https://jinja-yukue.badjoke-lab.workers.dev" && previewGate.scope?.custom_domain === false && previewGate.scope?.canonical === false && previewGate.scope?.indexable === false, "Jinja preview scope is invalid");

const appPath = path.join(repositoryRoot, "apps", "jinja");
assert(fs.existsSync(appPath), "apps/jinja is missing after implementation authorization");
const previewConfigPath = path.join(repositoryRoot, "wrangler.jinja.preview.jsonc");
assert(fs.existsSync(previewConfigPath), "Jinja workers.dev preview configuration is missing");
for (const configPath of deploymentConfigFiles(repositoryRoot)) {
  const content = fs.readFileSync(configPath, "utf8");
  if (!content.includes("jinja-yukue") && !content.includes("apps/jinja")) continue;
  const relative = path.relative(repositoryRoot, configPath);
  assert(relative === "wrangler.jinja.preview.jsonc", `Unexpected Jinja deployment configuration: ${relative}`);
  assert(!content.includes('"routes"') && !content.includes("custom_domain"), "Jinja preview deployment must not define a custom domain or route");
}

assert(projectStatus.includes("F2-28 — final F2 Launch Gate — completed"), "Project status does not record F2-28 completion");
assert(projectStatus.includes("Phase 10 Stabilization — active"), "Project status does not record stabilization");
assert(projectStatus.includes("Actual Jinja start gate — blocked"), "Project status must continue to block Jinja canonical activation before stabilization completion");
assert(packageJson.scripts?.["check:yukue:jinja-start-gate"] === "node scripts/check-jinja-start-gate-record.mjs", "package.json is missing the Jinja gate validator script");
assert(packageJson.scripts?.["check:jinja:preview-deployment"] === "node scripts/check-jinja-preview-deployment.mjs", "package.json is missing the Jinja preview deployment validator script");
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

const remainingCanonicalPrerequisites = Object.entries(startGate.prerequisites).filter(([, value]) => value === false).length;
console.log(`Jinja workers.dev preview authorized; canonical activation remains blocked: stabilization=${stabilization.status}, ${remainingCanonicalPrerequisites} canonical prerequisite(s) incomplete, ${candidates.length} seed(s), ${identityEvidence.length} identity Evidence, ${placeReferences} Place references, ${approvedStateSnapshots.length} approved shrine State Snapshots, ${candidatesWithOfficialUrl.length} official URLs.`);
