import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = fileURLToPath(new URL("../", import.meta.url));
const repoRoot = path.resolve(appRoot, "..", "..");
const gate = JSON.parse(fs.readFileSync(path.join(repoRoot, "config", "jinja-implementation-gate.json"), "utf8"));
const publicGate = JSON.parse(fs.readFileSync(path.join(repoRoot, "config", "jinja-start-gate.json"), "utf8"));
const html = fs.readFileSync(path.join(appRoot, "src", "index.html"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(gate.claims?.jinja_application_creation_authorized === true, "Jinja application creation is not authorized");
assert(gate.claims?.jinja_local_and_ci_implementation_authorized === true, "Jinja local/CI implementation is not authorized");
assert(gate.claims?.jinja_worker_creation_authorized === false, "Jinja Worker must remain blocked");
assert(gate.claims?.jinja_hostname_activation_authorized === false, "Jinja hostname must remain blocked");
assert(gate.claims?.jinja_publication_authorized === false, "Jinja publication must remain blocked");
assert(publicGate.claims?.jinja_start_gate_passed === false, "Public start gate unexpectedly passed");
assert(/<meta name="robots" content="noindex,nofollow"\s*\/>/u.test(html), "Implementation preview must remain noindex,nofollow");
assert(html.includes("Not public."), "Implementation preview must visibly state the non-public boundary");
assert(!html.includes("jinja-yukue.badjoke-lab.com"), "Implementation preview must not introduce a production hostname");

console.log("Jinja implementation-only workspace boundary verified.");
