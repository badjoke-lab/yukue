import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { applyTierAReviewDecisions } from "./lib/matsuri-tier-a-review-decisions.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map((arg) => {
  const [key, ...rest] = arg.replace(/^--/u, "").split("=");
  return [key, rest.join("=")];
}));

function required(name) {
  if (!args[name]) throw new Error(`--${name}=... is required`);
  return path.resolve(root, args[name]);
}

const candidateBatchPath = required("candidate-batch");
const decisionsPath = required("decisions");
const outPath = required("out");
const reportPath = required("report");

const result = applyTierAReviewDecisions(
  JSON.parse(fs.readFileSync(candidateBatchPath, "utf8")),
  JSON.parse(fs.readFileSync(decisionsPath, "utf8")),
);
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify(result.candidate_batch, null, 2)}\n`);
fs.writeFileSync(reportPath, `${JSON.stringify(result.report, null, 2)}\n`);
console.log(`Matsuri NCS-05 review decisions: ${result.report.approved} approved, ${result.report.rejected} rejected, ${result.report.untouched} untouched.`);
