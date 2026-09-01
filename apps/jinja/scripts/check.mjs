import "./check-review-queue.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = fileURLToPath(new URL("../", import.meta.url));
const repoRoot = path.resolve(appRoot, "..", "..");
const gate = JSON.parse(fs.readFileSync(path.join(repoRoot, "config", "jinja-implementation-gate.json"), "utf8"));
const previewGate = JSON.parse(fs.readFileSync(path.join(repoRoot, "config", "jinja-preview-deployment-gate.json"), "utf8"));
const publicGate = JSON.parse(fs.readFileSync(path.join(repoRoot, "config", "jinja-start-gate.json"), "utf8"));
const packageText = fs.readFileSync(path.join(appRoot, "package.json"), "utf8");
const homeSource = fs.readFileSync(path.join(appRoot, "src", "pages", "index.astro"), "utf8");
const aboutSource = fs.readFileSync(path.join(appRoot, "src", "pages", "about", "index.astro"), "utf8");
const statusSource = fs.readFileSync(path.join(appRoot, "src", "pages", "status", "index.astro"), "utf8");
const frameSource = fs.readFileSync(path.join(appRoot, "src", "components", "JinjaFrame.astro"), "utf8");
const detailSource = fs.readFileSync(path.join(appRoot, "src", "components", "JinjaShrineDetailPage.astro"), "utf8");
const sharedTokens = fs.readFileSync(path.join(repoRoot, "packages", "ui", "src", "styles", "tokens.css"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(gate.claims?.jinja_application_creation_authorized === true, "Jinja application creation is not authorized");
assert(gate.claims?.jinja_local_and_ci_implementation_authorized === true, "Jinja local/CI implementation is not authorized");
assert(gate.claims?.jinja_worker_preview_creation_authorized === true, "Jinja preview Worker creation is not authorized");
assert(gate.claims?.jinja_workers_dev_preview_publication_authorized === true, "Jinja workers.dev preview publication is not authorized");
assert(gate.claims?.jinja_hostname_activation_authorized === false, "Jinja custom hostname must remain blocked");
assert(gate.claims?.jinja_canonical_publication_authorized === false, "Jinja canonical publication must remain blocked");

assert(previewGate.status === "workers-dev-preview-authorized", "Jinja workers.dev preview gate is not authorized");
assert(previewGate.claims?.worker_creation_authorized === true, "Jinja preview Worker creation gate is not authorized");
assert(previewGate.claims?.workers_dev_preview_publication_authorized === true, "Jinja workers.dev preview gate is not authorized");
assert(previewGate.claims?.custom_domain_activation_authorized === false, "Jinja custom-domain activation must remain blocked");
assert(previewGate.claims?.canonical_publication_authorized === false, "Jinja canonical publication gate must remain blocked");
assert(previewGate.claims?.search_engine_submission_authorized === false, "Jinja search-engine submission must remain blocked");

assert(publicGate.claims?.jinja_start_gate_passed === false, "Canonical public start gate unexpectedly passed");
assert(publicGate.claims?.jinja_canonical_start_gate_passed === false, "Canonical Jinja start gate unexpectedly passed");
assert(publicGate.claims?.jinja_custom_domain_activation_authorized === false, "Custom-domain activation unexpectedly authorized");
assert(publicGate.claims?.jinja_canonical_publication_authorized === false, "Canonical publication unexpectedly authorized");

assert(packageText.includes("astro build"), "Jinja preview must build as an Astro application");
assert(frameSource.includes("PageShell"), "Jinja must use the shared PageShell component");
assert(frameSource.includes("SiteHeader"), "Jinja must use the shared SiteHeader component");
assert(frameSource.includes("SiteFooter"), "Jinja must use the shared SiteFooter component");
assert(frameSource.includes('site="jinja"'), "Jinja frame must select the shared Jinja theme");
assert(frameSource.includes('robots="noindex,nofollow"'), "Jinja preview must remain noindex,nofollow");
assert(homeSource.includes("SearchForm"), "Jinja home must retain the shared search component");
assert(aboutSource.includes("公開前の試験版"), "Jinja About page must explain the preview status in visitor-facing language");
assert(statusSource.includes("workers.dev"), "Jinja status page must identify the workers.dev preview scope");
assert(detailSource.includes("OverviewGrid"), "Jinja detail pages must use the shared integrated overview");
assert(detailSource.includes("PlaceMap"), "Jinja detail pages must use the shared place/map treatment");
assert(detailSource.includes("EvidenceList"), "Jinja detail pages must use the shared evidence treatment");
assert(detailSource.includes('id="record-updates"'), "Jinja detail pages must expose update history");
assert(detailSource.includes('id="machine-data"'), "Jinja detail pages must retain the machine-readable data section");

for (const source of [homeSource, aboutSource, statusSource, frameSource, detailSource]) {
  assert(!source.includes("#101010"), "Jinja must not restore the temporary dark preview background");
  assert(!source.includes("font-family: system-ui"), "Jinja must not restore the temporary system-ui typography");
  assert(!source.includes("jinja-yukue.badjoke-lab.com"), "Public preview must not introduce a production custom hostname");
}

assert(sharedTokens.includes('--color-bg: #ffffff;'), "Shared Yukue UI background token changed unexpectedly");
assert(sharedTokens.includes('--font-family-mincho:'), "Shared Yukue UI Mincho font token missing");
assert(sharedTokens.includes('--accent-jinja: #a33a32;'), "Shared Jinja accent token missing");

console.log("Jinja workers.dev preview boundary and shrine-first shared UI architecture verified; custom-domain and canonical publication remain blocked.");
