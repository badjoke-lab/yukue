import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const args = new Set(process.argv.slice(2));
const reportOnly = args.has("--report-only");
const origin = (process.env.MATSURI_CHECK_ORIGIN ?? "https://matsuri-yukue.badjoke-lab.com").replace(/\/$/u, "");

const local = loadMatsuriDataset();
const feeds = [
  ["entities", local.entities],
  ["events", local.changeEvents],
  ["relations", local.relations],
  ["occurrences", local.occurrences],
];

async function fetchFeed(name) {
  const response = await fetch(`${origin}/data/${name}.json`, {
    headers: { "user-agent": "yukue-production-drift-audit/1.0" },
    redirect: "follow",
  });
  if (!response.ok) throw new Error(`${name} feed returned HTTP ${response.status}`);
  const json = await response.json();
  if (!Array.isArray(json.records)) throw new Error(`${name} feed has no records array`);
  return json.records;
}

function ids(records) {
  return new Set(records.map((record) => record?.id).filter((id) => typeof id === "string" && id.length > 0));
}

const report = {
  schema_version: "matsuri.production-drift-audit.v1",
  origin,
  report_only: reportOnly,
  feeds: {},
};

let hasDeployedOnly = false;
for (const [name, localRecords] of feeds) {
  const deployedRecords = await fetchFeed(name);
  const localIds = ids(localRecords);
  const deployedIds = ids(deployedRecords);
  const deployedOnly = [...deployedIds].filter((id) => !localIds.has(id)).sort();
  const localOnly = [...localIds].filter((id) => !deployedIds.has(id)).sort();
  if (deployedOnly.length > 0) hasDeployedOnly = true;
  report.feeds[name] = {
    local_count: localRecords.length,
    deployed_count: deployedRecords.length,
    deployed_only: deployedOnly,
    local_only: localOnly,
  };
}

console.log(JSON.stringify(report, null, 2));

if (hasDeployedOnly && !reportOnly) {
  throw new Error("Production contains records that are absent from the current canonical dataset. Reconcile before deployment.");
}
