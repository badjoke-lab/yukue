import fs from "node:fs";
import path from "node:path";
import { repositoryRoot } from "./lib/matsuri-national-csv-acquisition.mjs";
import { acquireBunkaDetails, buildCandidateBatchFromBunkaDetails } from "./lib/matsuri-bunka-detail-acquisition.mjs";
import { buildTierAReadinessReport, writeTierAReadinessArtifacts } from "./lib/matsuri-tier-a-importer.mjs";

const args = process.argv.slice(2);
function argValue(name, fallback = null) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
}

const outputArg = argValue("--output");
const accessedAt = argValue("--accessed-at");
const minId = Number(argValue("--min-id", "1"));
const maxId = Number(argValue("--max-id", "1000"));
const concurrency = Number(argValue("--concurrency", "4"));
const delayMs = Number(argValue("--delay-ms", "125"));
if (!outputArg || !/^\d{4}-\d{2}-\d{2}$/u.test(String(accessedAt ?? ""))) {
  console.error("Usage: node scripts/run-matsuri-bunka-detail-readiness.mjs --output <artifact-dir> --accessed-at YYYY-MM-DD [--min-id 1] [--max-id 1000] [--concurrency 4] [--delay-ms 125]");
  process.exit(2);
}
if (!Number.isInteger(minId) || !Number.isInteger(maxId) || minId < 1 || maxId < minId || maxId > 2000) {
  throw new Error("Bunka detail ID range must satisfy 1 <= min-id <= max-id <= 2000.");
}

const acquisition = await acquireBunkaDetails({ minId, maxId, concurrency, delayMs });
const outputRoot = path.resolve(repositoryRoot, outputArg);
fs.mkdirSync(outputRoot, { recursive: true });
fs.writeFileSync(path.join(outputRoot, "detail-acquisition.json"), `${JSON.stringify(acquisition, null, 2)}\n`, "utf8");
if (acquisition.safe === 0) {
  throw new Error(`No Matsuri-safe Bunka detail records found in ${minId}..${maxId}; inspect detail-acquisition.json.`);
}
const batch = buildCandidateBatchFromBunkaDetails(acquisition.records, accessedAt);
const report = buildTierAReadinessReport(batch);
fs.writeFileSync(path.join(outputRoot, "candidate-batch.json"), `${JSON.stringify(batch, null, 2)}\n`, "utf8");
writeTierAReadinessArtifacts(report, outputRoot);

const duplicateExisting = report.records.filter((record) => record.problems.some((problem) => problem.startsWith("duplicate_existing:"))).length;
const duplicateInBatch = report.records.filter((record) => record.problems.some((problem) => problem.startsWith("duplicate_in_batch:"))).length;
console.log(`Bunka detail readiness: range=${minId}..${maxId}, scanned=${acquisition.scanned}, detail_records=${acquisition.records.length}, safe=${acquisition.safe}, fetch_errors=${acquisition.errors.length}, acquired=${batch.counts.candidates}, ready=${report.counts.tier_a_ready}, blocked_input=${report.counts.blocked_input}, blocked_source=${report.counts.blocked_source}, blocked_identity=${report.counts.blocked_identity}, duplicate_existing=${duplicateExisting}, duplicate_in_batch=${duplicateInBatch}`);
if (report.publication_authorized || report.writes_canonical_public_data || report.writes_tier_a_publication_time) {
  throw new Error("NCS-04 boundary violation: detail readiness runner must not publish.");
}
