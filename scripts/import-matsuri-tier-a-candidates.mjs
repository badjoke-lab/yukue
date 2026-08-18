import path from "node:path";

import {
  buildTierAReadinessReport,
  readCandidateBatch,
  repositoryRoot,
  writeTierAReadinessArtifacts,
} from "./lib/matsuri-tier-a-importer.mjs";

const args = process.argv.slice(2);

function argValue(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : null;
}

const inputArg = argValue("--input");
const outputArg = argValue("--output");

if (!inputArg || !outputArg) {
  console.error(
    "Usage: node scripts/import-matsuri-tier-a-candidates.mjs --input <candidate-batch.json> --output <artifact-dir>",
  );
  process.exit(2);
}

const inputPath = path.resolve(repositoryRoot, inputArg);
const outputRoot = path.resolve(repositoryRoot, outputArg);
const batch = readCandidateBatch(inputPath);

if (batch?.fixture_only !== true && batch?.contains_real_candidates !== true) {
  console.error(
    "Candidate batch must explicitly declare fixture_only=true or contains_real_candidates=true. NCS-04 never assumes an unlabeled file is safe input.",
  );
  process.exit(2);
}

const report = buildTierAReadinessReport(batch);
writeTierAReadinessArtifacts(report, outputRoot);

console.log(
  `Matsuri Tier A readiness: candidates=${report.counts.candidates}, ready=${report.counts.tier_a_ready}, blocked_input=${report.counts.blocked_input}, blocked_source=${report.counts.blocked_source}, blocked_identity=${report.counts.blocked_identity}, published=${report.counts.published}`,
);
console.log(`Wrote readiness-only artifacts to ${path.relative(repositoryRoot, outputRoot)}`);

if (report.publication_authorized || report.writes_canonical_public_data || report.writes_tier_a_publication_time) {
  throw new Error("NCS-04 boundary violation: readiness CLI must not authorize or perform publication.");
}
