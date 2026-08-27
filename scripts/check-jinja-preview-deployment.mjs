import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const gate = JSON.parse(fs.readFileSync(path.join(root, "config", "jinja-preview-deployment-gate.json"), "utf8"));
const implementationGate = JSON.parse(fs.readFileSync(path.join(root, "config", "jinja-implementation-gate.json"), "utf8"));
const startGate = JSON.parse(fs.readFileSync(path.join(root, "config", "jinja-start-gate.json"), "utf8"));
const specialistContract = JSON.parse(fs.readFileSync(path.join(root, "config", "jinja-specialist-contract.json"), "utf8"));
const wranglerText = fs.readFileSync(path.join(root, "wrangler.jinja.preview.jsonc"), "utf8");
const wrangler = JSON.parse(wranglerText.replace(/^\s*\/\/.*$/gmu, ""));
const canonical = JSON.parse(fs.readFileSync(path.join(root, "apps", "jinja", "data", "canonical.json"), "utf8"));
const packageText = fs.readFileSync(path.join(root, "apps", "jinja", "package.json"), "utf8");
const frameSource = fs.readFileSync(path.join(root, "apps", "jinja", "src", "components", "JinjaFrame.astro"), "utf8");
const homeSource = fs.readFileSync(path.join(root, "apps", "jinja", "src", "pages", "index.astro"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function sourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(entryPath);
    return /\.(astro|mjs|js|ts)$/u.test(entry.name) ? [entryPath] : [];
  });
}

assert(gate.status === "workers-dev-preview-authorized", "Jinja preview gate is not authorized");
assert(gate.claims?.worker_creation_authorized === true, "Jinja preview Worker is not authorized");
assert(gate.claims?.workers_dev_preview_publication_authorized === true, "Jinja workers.dev preview publication is not authorized");
assert(gate.claims?.custom_domain_activation_authorized === false, "Jinja custom domain must remain blocked for preview");
assert(gate.claims?.canonical_publication_authorized === false, "Jinja canonical publication must remain blocked for preview");
assert(gate.scope?.workers_dev_origin === "https://jinja-yukue.badjoke-lab.workers.dev", "Unexpected Jinja workers.dev preview origin");

assert(specialistContract.format_version === 1 && specialistContract.site_id === "jinja", "Unexpected Jinja specialist contract identity");
assert(specialistContract.status === "implementation_and_preview_active", "Jinja specialist contract has stale activation status");
assert(specialistContract.portal_blocks_jinja === false, "Jinja specialist contract must keep Portal non-blocking absent a concrete dependency");
assert(specialistContract.publication_tiers?.A?.matsuri_relation_alone_sufficient === false, "Matsuri Relation alone must never satisfy Jinja Tier A");
assert(specialistContract.publication_tiers?.A?.current_stage_surface === "workers_dev_noncanonical_preview", "Jinja Tier A surface must identify the current noncanonical preview stage");
assert(specialistContract.continuity_states?.includes("unknown"), "Jinja specialist contract must retain the explicit unknown continuity state");
assert(specialistContract.event_types?.includes("transferred") && specialistContract.event_types?.includes("administration_changed"), "Jinja specialist event vocabulary is incomplete");
assert(specialistContract.detail_sections?.includes("evidence") && specialistContract.detail_sections?.includes("machine_readable"), "Jinja specialist detail projection is incomplete");

assert(specialistContract.activation?.repository_local_implementation_authorized === implementationGate.claims?.jinja_local_and_ci_implementation_authorized, "Jinja specialist contract disagrees with implementation gate");
assert(specialistContract.activation?.workers_dev_preview_authorized === gate.claims?.workers_dev_preview_publication_authorized, "Jinja specialist contract disagrees with workers.dev preview gate");
assert(specialistContract.activation?.workers_dev_origin === gate.scope?.workers_dev_origin, "Jinja specialist contract has a different workers.dev origin");
assert(specialistContract.activation?.custom_domain_authorized === gate.claims?.custom_domain_activation_authorized, "Jinja specialist contract disagrees on custom-domain authorization");
assert(specialistContract.activation?.canonical_publication_authorized === gate.claims?.canonical_publication_authorized, "Jinja specialist contract disagrees on canonical publication");
assert(specialistContract.activation?.search_submission_authorized === gate.claims?.search_engine_submission_authorized, "Jinja specialist contract disagrees on Search submission");
assert(specialistContract.activation?.indexable === gate.scope?.indexable, "Jinja specialist contract disagrees on indexability");
assert(specialistContract.activation?.canonical_activation_requires_completed_matsuri_stabilization === true, "Jinja canonical activation must remain stabilization-gated");
assert(startGate.prerequisites?.matsuri_stabilization_review_complete === false, "This preview contract expects the later canonical start gate to remain stabilization-blocked");

assert(specialistContract.boundaries?.apps_jinja_allowed === true, "Jinja specialist contract must allow the authorized application");
assert(specialistContract.boundaries?.preview_worker_allowed === true, "Jinja specialist contract must allow the authorized preview Worker");
assert(specialistContract.boundaries?.workers_dev_public_preview_allowed === true, "Jinja specialist contract must allow the authorized workers.dev preview");
assert(specialistContract.boundaries?.custom_hostname_or_route_allowed === false, "Jinja specialist contract must block custom hostname/routes");
assert(specialistContract.boundaries?.canonical_public_records_allowed === false, "Jinja specialist contract must block canonical publication");
assert(specialistContract.boundaries?.search_submission_allowed === false, "Jinja specialist contract must block Search submission");
assert(specialistContract.boundaries?.infer_state_from_matsuri === false, "Jinja State must not be inferred from Matsuri");
assert(specialistContract.boundaries?.specialist_contract_itself_grants_activation === false, "The specialist data contract must not grant activation by itself");
assert(specialistContract.boundaries?.jiin_active === false && specialistContract.boundaries?.tomurai_active === false, "Jinja work must not activate Jiin or Tomurai");

assert(wrangler.name === "jinja-yukue", "Unexpected Jinja Worker name");
assert(wrangler.workers_dev === true, "Jinja preview must enable workers.dev");
assert(wrangler.assets?.directory === "./apps/jinja/dist", "Unexpected Jinja preview asset directory");
assert(!("routes" in wrangler), "Jinja preview must not define routes or a custom domain");
assert(canonical.publication_status === "public_preview_noncanonical", "Jinja canonical store must identify the noncanonical public preview state");
assert(packageText.includes('"@badjoke-lab/yukue-ui": "workspace:*"'), "Jinja preview must depend on the shared Yukue UI workspace package");
assert(packageText.includes("astro build"), "Jinja preview must be built as an Astro application");
assert(frameSource.includes('robots="noindex,nofollow"'), "Jinja preview must remain noindex,nofollow");
assert(frameSource.includes("@badjoke-lab/yukue-ui/components/PageShell.astro"), "Jinja frame must import PageShell through the shared UI workspace package");
assert(frameSource.includes("@badjoke-lab/yukue-ui/components/SiteHeader.astro"), "Jinja frame must import SiteHeader through the shared UI workspace package");
assert(frameSource.includes("@badjoke-lab/yukue-ui/components/SiteFooter.astro"), "Jinja frame must import SiteFooter through the shared UI workspace package");
assert(homeSource.includes("Public preview."), "Jinja preview page must identify itself as a public preview");
assert(homeSource.includes("workers.dev"), "Jinja preview page must identify the workers.dev scope");

for (const filePath of sourceFiles(path.join(root, "apps", "jinja", "src"))) {
  const source = fs.readFileSync(filePath, "utf8");
  const relative = path.relative(root, filePath);
  assert(!source.includes("packages/ui/src"), `${relative} must not bypass @badjoke-lab/yukue-ui with a direct packages/ui/src import`);
}

console.log(`Jinja workers.dev Astro + specialist contract verified: ${gate.scope.workers_dev_origin}`);
