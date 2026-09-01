import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";
import { buildTierAPublicationWave } from "./lib/matsuri-tier-a-publication-generator.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));

function arg(name, fallback = null) {
  const prefix = `--${name}=`;
  const match = process.argv.find((value) => value.startsWith(prefix));
  return match ? match.slice(prefix.length) : fallback;
}

const input = arg("input");
const output = arg("output", ".artifacts/matsuri-tier-a-publication-wave");
const wave = arg("wave");
const canonicalBundle = arg("canonical-bundle");
const generatedAt = arg("generated-at");
const limit = arg("limit", "100");
const phase = arg("phase", "NCS-07");

if (!input || !wave || !canonicalBundle || !generatedAt) {
  throw new Error("Usage: node scripts/generate-matsuri-tier-a-publication-wave.mjs --input=<reviewed-candidate-batch.json> --wave=<number> --canonical-bundle=<repo-relative-path> --generated-at=<ISO timestamp> [--limit=100] [--output=.artifacts/...] [--phase=NCS-07]");
}

const inputPath = path.resolve(root, input);
if (!inputPath.startsWith(`${root}${path.sep}`)) throw new Error("input must stay inside repository root");
const outputDir = path.resolve(root, output);
if (!outputDir.startsWith(`${root}${path.sep}`)) throw new Error("output must stay inside repository root");

const batch = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const dataset = loadMatsuriDataset();
const specialist = dataset.entities.filter((entity) => ["festival", "folk_performance"].includes(entity.entity_type));

const result = buildTierAPublicationWave(batch, {
  waveNumber: wave,
  canonicalBundle,
  generatedAt,
  limit,
  phase,
  currentCounts: {
    all_entities: dataset.entities.length,
    specialist_primary_entities: specialist.length,
  },
});

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "canonical-bundle.json"), `${JSON.stringify(result.bundle, null, 2)}\n`);
fs.writeFileSync(path.join(outputDir, "publication-wave.json"), `${JSON.stringify(result.config, null, 2)}\n`);
fs.writeFileSync(path.join(outputDir, "generation-report.json"), `${JSON.stringify({
  schema_version: result.schema_version,
  publication_authorized: result.publication_authorized,
  source_readiness_counts: result.source_readiness_counts,
  selected_count: result.selected_count,
  remaining_reviewed_ready: result.remaining_reviewed_ready,
}, null, 2)}\n`);

console.log(`Matsuri Tier A publication generation: selected=${result.selected_count}, remaining_reviewed_ready=${result.remaining_reviewed_ready}, output=${path.relative(root, outputDir)}, publication_authorized=false`);
