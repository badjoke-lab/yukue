import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const topologyPath = path.join(
  repositoryRoot,
  "config",
  "yukue-deployment-topology.json",
);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(fs.existsSync(topologyPath), "Yukue deployment topology file is missing.");

const topology = JSON.parse(fs.readFileSync(topologyPath, "utf8"));
const matsuri = topology.sites?.find((site) => site.site_id === "matsuri");

assert(matsuri, "Deployment topology is missing the Matsuri site.");
assert(
  matsuri.canonical_origin === "https://matsuri-yukue.badjoke-lab.com",
  "Unexpected Matsuri canonical origin in deployment topology.",
);
assert(
  matsuri.deployment_status === "canonical-origin-verified",
  "Matsuri deployment topology must record a verified canonical origin.",
);
assert(
  matsuri.verification?.workflow_run_id === 29191904624 &&
    matsuri.verification?.https_reachable === true &&
    matsuri.verification?.manifest_origin_verified === true &&
    matsuri.verification?.canonical_sitemap_verified === true,
  "Matsuri canonical verification evidence is incomplete.",
);

const command = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const result = spawnSync(command, ["build:matsuri:pages"], {
  cwd: repositoryRoot,
  env: {
    ...process.env,
    MATSURI_PUBLIC_ORIGIN: matsuri.canonical_origin,
  },
  encoding: "utf8",
  stdio: "inherit",
});

if (result.error) throw result.error;
if (result.status !== 0) {
  throw new Error(`Matsuri Workers build failed with exit code ${String(result.status)}.`);
}

console.log(
  `Matsuri Workers artifact built with verified canonical origin ${matsuri.canonical_origin}`,
);
