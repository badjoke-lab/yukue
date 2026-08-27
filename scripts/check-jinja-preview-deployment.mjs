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

console.log(`Jinja workers.dev Astro preview contract verified: ${gate.scope.workers_dev_origin}`);
