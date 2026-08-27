import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const gate = JSON.parse(fs.readFileSync(path.join(root, "config", "jinja-preview-deployment-gate.json"), "utf8"));
const wranglerText = fs.readFileSync(path.join(root, "wrangler.jinja.preview.jsonc"), "utf8");
const wrangler = JSON.parse(wranglerText.replace(/^\s*\/\/.*$/gmu, ""));
const canonical = JSON.parse(fs.readFileSync(path.join(root, "apps", "jinja", "data", "canonical.json"), "utf8"));
const packageText = fs.readFileSync(path.join(root, "apps", "jinja", "package.json"), "utf8");
const frameSource = fs.readFileSync(path.join(root, "apps", "jinja", "src", "components", "JinjaFrame.astro"), "utf8");
const homeSource = fs.readFileSync(path.join(root, "apps", "jinja", "src", "pages", "index.astro"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(gate.status === "workers-dev-preview-authorized", "Jinja preview gate is not authorized");
assert(gate.claims?.worker_creation_authorized === true, "Jinja preview Worker is not authorized");
assert(gate.claims?.workers_dev_preview_publication_authorized === true, "Jinja workers.dev preview publication is not authorized");
assert(gate.claims?.custom_domain_activation_authorized === false, "Jinja custom domain must remain blocked for preview");
assert(gate.claims?.canonical_publication_authorized === false, "Jinja canonical publication must remain blocked for preview");
assert(gate.scope?.workers_dev_origin === "https://jinja-yukue.badjoke-lab.workers.dev", "Unexpected Jinja workers.dev preview origin");
assert(wrangler.name === "jinja-yukue", "Unexpected Jinja Worker name");
assert(wrangler.workers_dev === true, "Jinja preview must enable workers.dev");
assert(wrangler.assets?.directory === "./apps/jinja/dist", "Unexpected Jinja preview asset directory");
assert(!("routes" in wrangler), "Jinja preview must not define routes or a custom domain");
assert(canonical.publication_status === "public_preview_noncanonical", "Jinja canonical store must identify the noncanonical public preview state");
assert(packageText.includes("astro build"), "Jinja preview must be built as an Astro application");
assert(frameSource.includes('robots="noindex,nofollow"'), "Jinja preview must remain noindex,nofollow");
assert(frameSource.includes("PageShell") && frameSource.includes("SiteHeader") && frameSource.includes("SiteFooter"), "Jinja preview must use the shared Yukue shell");
assert(homeSource.includes("Public preview."), "Jinja preview page must identify itself as a public preview");
assert(homeSource.includes("workers.dev"), "Jinja preview page must identify the workers.dev scope");

console.log(`Jinja workers.dev Astro preview contract verified: ${gate.scope.workers_dev_origin}`);
