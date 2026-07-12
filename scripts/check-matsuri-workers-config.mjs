import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const configPath = path.join(repositoryRoot, "wrangler.jsonc");
const topologyPath = path.join(
  repositoryRoot,
  "config",
  "yukue-deployment-topology.json",
);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(fs.existsSync(configPath), "wrangler.jsonc is missing.");
assert(fs.existsSync(topologyPath), "Yukue deployment topology is missing.");

const raw = fs.readFileSync(configPath, "utf8");
const config = JSON.parse(raw);
const topology = JSON.parse(fs.readFileSync(topologyPath, "utf8"));
const matsuri = topology.sites?.find((site) => site.site_id === "matsuri");

assert(matsuri, "Deployment topology is missing the Matsuri site.");
assert(config.name === "matsuri-yukue", "Wrangler name must be matsuri-yukue.");
assert(typeof config.compatibility_date === "string", "compatibility_date is required.");
assert(!Object.hasOwn(config, "main"), "Static Matsuri deployment must not define Worker main code.");
assert(
  config.assets?.directory === "./apps/matsuri/dist",
  "Wrangler assets.directory must be ./apps/matsuri/dist.",
);
assert(
  !Object.hasOwn(config.assets ?? {}, "binding"),
  "Static-only Matsuri deployment does not require an assets binding.",
);
assert(Array.isArray(config.routes), "Wrangler routes must configure the Matsuri Custom Domain.");
assert(config.routes.length === 1, "Wrangler must define exactly one Matsuri route.");
assert(
  config.routes[0]?.pattern === matsuri.canonical_hostname,
  "Wrangler Custom Domain must match the accepted Matsuri hostname.",
);
assert(
  config.routes[0]?.custom_domain === true,
  "Wrangler Matsuri route must use custom_domain=true.",
);
assert(
  matsuri.deployment_status === "canonical-origin-verified",
  "Matsuri topology must record a verified canonical origin.",
);
assert(
  matsuri.verification?.workflow_run_id === 29191904624 &&
    matsuri.verification?.verified_origin === matsuri.canonical_origin,
  "Matsuri Custom Domain verification evidence is missing.",
);

console.log(
  `Matsuri Workers Static Assets configuration is valid with verified Custom Domain ${matsuri.canonical_hostname}.`,
);
