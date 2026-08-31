import fs from "node:fs";
import path from "node:path";
import { buildNationalCandidatesFromCsv, repositoryRoot } from "./lib/matsuri-national-csv-acquisition.mjs";

const args = process.argv.slice(2);
function arg(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : null;
}

const input = arg("--input");
const output = arg("--output");
const accessedAt = arg("--accessed-at");
if (!input || !output || !accessedAt) {
  console.error("Usage: node scripts/acquire-matsuri-national-candidates.mjs --input <official-export.csv> --output <candidate-batch.json> --accessed-at YYYY-MM-DD");
  process.exit(2);
}

const inputPath = path.resolve(repositoryRoot, input);
const outputPath = path.resolve(repositoryRoot, output);
const csv = fs.readFileSync(inputPath, "utf8");
const batch = buildNationalCandidatesFromCsv(csv, { accessedAt });
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(batch, null, 2)}\n`, "utf8");
console.log(`National Matsuri acquisition: input=${batch.counts.input_rows}, candidates=${batch.counts.candidates}, skipped=${batch.counts.skipped}`);
console.log(`Wrote candidate batch: ${path.relative(repositoryRoot, outputPath)}`);
