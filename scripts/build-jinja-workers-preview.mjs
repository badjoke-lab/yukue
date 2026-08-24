import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const gate = JSON.parse(fs.readFileSync(path.join(root, "config", "jinja-preview-deployment-gate.json"), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(gate.status === "workers-dev-preview-authorized", "Jinja workers.dev preview is not authorized");
assert(gate.scope?.workers_dev_origin === "https://jinja-yukue.badjoke-lab.workers.dev", "Unexpected Jinja preview origin");
assert(gate.claims?.custom_domain_activation_authorized === false, "Preview build must not activate a custom domain");

const command = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const result = spawnSync(command, ["--filter", "@badjoke-lab/yukue-jinja", "build"], {
  cwd: root,
  env: {
    ...process.env,
    JINJA_PUBLIC_ORIGIN: gate.scope.workers_dev_origin,
    JINJA_PUBLICATION_MODE: "public_preview_noncanonical",
  },
  encoding: "utf8",
  stdio: "inherit",
});

if (result.error) throw result.error;
if (result.status !== 0) throw new Error(`Jinja preview build failed with exit code ${String(result.status)}.`);

const dist = path.join(root, "apps", "jinja", "dist");
assert(fs.existsSync(path.join(dist, "index.html")), "Jinja preview build did not produce index.html");
fs.copyFileSync(path.join(root, "apps", "jinja", "data", "canonical.json"), path.join(dist, "data.json"));
console.log(`Jinja workers.dev preview artifact built for ${gate.scope.workers_dev_origin}`);
