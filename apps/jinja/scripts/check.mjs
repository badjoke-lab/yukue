import "./check-review-queue.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = fileURLToPath(new URL("../", import.meta.url));
const repoRoot = path.resolve(appRoot, "..", "..");
const gate = JSON.parse(fs.readFileSync(path.join(repoRoot, "config", "jinja-implementation-gate.json"), "utf8"));
const previewGate = JSON.parse(fs.readFileSync(path.join(repoRoot, "config", "jinja-preview-deployment-gate.json"), "utf8"));
const publicGate = JSON.parse(fs.readFileSync(path.join(repoRoot, "config", "jinja-start-gate.json"), "utf8"));
const html = fs.readFileSync(path.join(appRoot, "src", "index.html"), "utf8");

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
assert(publicGate.claims?.jinja_worker_preview_creation_authorized === true, "Public gate must recognize preview Worker authorization");
assert(publicGate.claims?.jinja_workers_dev_preview_publication_authorized === true, "Public gate must recognize workers.dev preview authorization");
assert(publicGate.claims?.jinja_custom_domain_activation_authorized === false, "Custom-domain activation unexpectedly authorized");
assert(publicGate.claims?.jinja_canonical_publication_authorized === false, "Canonical publication unexpectedly authorized");

assert(/<meta name="robots" content="noindex,nofollow"\s*\/>/u.test(html), "Public preview must remain noindex,nofollow");
assert(html.includes("Public preview."), "Jinja page must visibly state the workers.dev preview boundary");
assert(html.includes("workers.dev"), "Jinja page must identify the workers.dev preview scope");
assert(!html.includes("jinja-yukue.badjoke-lab.com"), "Public preview must not introduce a production custom hostname");

console.log("Jinja workers.dev preview boundary verified; custom-domain and canonical publication remain blocked.");
