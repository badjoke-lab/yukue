import fs from "node:fs";
import path from "node:path";

import { buildNationalCandidatesFromCsv, repositoryRoot } from "./lib/matsuri-national-csv-acquisition.mjs";
import {
  buildTierAReadinessReport,
  writeTierAReadinessArtifacts,
} from "./lib/matsuri-tier-a-importer.mjs";

const args = process.argv.slice(2);

function argValue(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : null;
}

const inputArg = argValue("--input");
const outputArg = argValue("--output");
const accessedAt = argValue("--accessed-at");

if (!inputArg || !outputArg || !accessedAt) {
  console.error(
    "Usage: node scripts/run-matsuri-national-tier-a-readiness.mjs --input <official-export.csv> --output <artifact-dir> --accessed-at YYYY-MM-DD",
  );
  process.exit(2);
}

const inputPath = path.resolve(repositoryRoot, inputArg);
const outputRoot = path.resolve(repositoryRoot, outputArg);
const csv = fs.readFileSync(inputPath, "utf8");
const batch = buildNationalCandidatesFromCsv(csv, { accessedAt });
const report = buildTierAReadinessReport(batch);

fs.mkdirSync(outputRoot, { recursive: true });
fs.writeFileSync(
  path.join(outputRoot, "candidate-batch.json"),
  `${JSON.stringify(batch, null, 2)}\n`,
  "utf8",
);
writeTierAReadinessArtifacts(report, outputRoot);

const duplicateExisting = report.records.filter((record) =>
  record.problems.some((problem) => problem.startsWith("duplicate_existing:")),
).length;
const duplicateInBatch = report.records.filter((record) =>
  record.problems.some((problem) => problem.startsWith("duplicate_in_batch:")),
).length;

console.log(
  `Matsuri national readiness: input=${batch.counts.input_rows}, acquired=${batch.counts.candidates}, acquisition_skipped=${batch.counts.skipped}, ready=${report.counts.tier_a_ready}, blocked_input=${report.counts.blocked_input}, blocked_source=${report.counts.blocked_source}, blocked_identity=${report.counts.blocked_identity}, duplicate_existing=${duplicateExisting}, duplicate_in_batch=${duplicateInBatch}`,
);
console.log(`Wrote acquisition and readiness artifacts to ${path.relative(repositoryRoot, outputRoot)}`);

if (report.publication_authorized || report.writes_canonical_public_data || report.writes_tier_a_publication_time) {
  throw new Error("NCS-04 boundary violation: readiness runner must not authorize or perform publication.");
}
