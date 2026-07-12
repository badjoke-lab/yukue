import fs from "node:fs";
import path from "node:path";
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

assert(topology.schema_version === 1, "Unexpected deployment topology schema version.");
assert(topology.decision_id === "F2-19", "Deployment topology must record F2-19.");
assert(topology.decision_status === "accepted", "F2-19 topology is not accepted.");
assert(topology.parent_zone === "badjoke-lab.com", "Unexpected parent DNS zone.");

assert(topology.portal?.site_id === "portal", "Portal site_id is invalid.");
assert(topology.portal?.app_path === "apps/portal", "Portal app path is invalid.");
assert(topology.portal?.worker_name === "yukue-portal", "Portal Worker name is invalid.");
assert(
  topology.portal?.canonical_hostname === "yukue.badjoke-lab.com",
  "Portal canonical hostname is invalid.",
);
assert(
  topology.portal?.canonical_origin === "https://yukue.badjoke-lab.com",
  "Portal canonical origin is invalid.",
);

const expectedSites = {
  matsuri: {
    app_path: "apps/matsuri",
    worker_name: "matsuri-yukue",
    canonical_hostname: "matsuri-yukue.badjoke-lab.com",
    canonical_origin: "https://matsuri-yukue.badjoke-lab.com",
    deployment_status: "custom-domain-configured-deployment-pending",
  },
  jinja: {
    app_path: "apps/jinja",
    worker_name: "jinja-yukue",
    canonical_hostname: "jinja-yukue.badjoke-lab.com",
    canonical_origin: "https://jinja-yukue.badjoke-lab.com",
    deployment_status: "future-site-gate",
  },
  jiin: {
    app_path: "apps/jiin",
    worker_name: "jiin-yukue",
    canonical_hostname: "jiin-yukue.badjoke-lab.com",
    canonical_origin: "https://jiin-yukue.badjoke-lab.com",
    deployment_status: "future-site-gate",
  },
  tomurai: {
    app_path: "apps/tomurai",
    worker_name: "tomurai-yukue",
    canonical_hostname: "tomurai-yukue.badjoke-lab.com",
    canonical_origin: "https://tomurai-yukue.badjoke-lab.com",
    deployment_status: "future-site-gate",
  },
};

assert(Array.isArray(topology.sites), "Deployment topology sites must be an array.");
assert(
  topology.sites.length === Object.keys(expectedSites).length,
  "Deployment topology site count is invalid.",
);

for (const [siteId, expected] of Object.entries(expectedSites)) {
  const actual = topology.sites.find((site) => site.site_id === siteId);
  assert(actual, `Deployment topology is missing site ${siteId}.`);
  for (const [key, value] of Object.entries(expected)) {
    assert(actual[key] === value, `${siteId}.${key} is invalid.`);
  }
}

const workers = [topology.portal.worker_name, ...topology.sites.map((site) => site.worker_name)];
const hostnames = [
  topology.portal.canonical_hostname,
  ...topology.sites.map((site) => site.canonical_hostname),
];
const origins = [
  topology.portal.canonical_origin,
  ...topology.sites.map((site) => site.canonical_origin),
];

assert(new Set(workers).size === workers.length, "Worker names must be unique.");
assert(new Set(hostnames).size === hostnames.length, "Canonical hostnames must be unique.");
assert(new Set(origins).size === origins.length, "Canonical origins must be unique.");

for (let index = 0; index < hostnames.length; index += 1) {
  assert(
    origins[index] === `https://${hostnames[index]}`,
    `Canonical origin does not match hostname ${hostnames[index]}.`,
  );
  assert(
    hostnames[index].endsWith(`.${topology.parent_zone}`),
    `Hostname is outside the accepted parent zone: ${hostnames[index]}.`,
  );
}

assert(topology.invariants?.separate_public_sites === true, "Public sites must remain separate.");
assert(
  topology.invariants?.separate_cloudflare_workers === true,
  "Each public site must use a separate Cloudflare Worker.",
);
assert(
  topology.invariants?.specialist_sites_nested_under_portal_path === false,
  "Specialist sites must not be nested below a portal path.",
);
assert(
  topology.invariants?.workers_dev_is_canonical === false,
  "workers.dev origins must not be canonical.",
);
assert(
  topology.invariants?.custom_domain_required_for_canonical_activation === true,
  "Canonical activation must require a custom domain.",
);
assert(
  topology.invariants?.dedicated_parent_domain_migration_supported === true,
  "A later dedicated-domain migration must remain supported.",
);

console.log(
  "Yukue deployment topology passed: portal yukue.badjoke-lab.com; Matsuri matsuri-yukue.badjoke-lab.com; F2-20 custom-domain configuration prepared; separate Workers; no path nesting.",
);
