import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildTierAReviewPacket } from "./lib/matsuri-tier-a-review-packet.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map((arg) => {
  const [key, ...rest] = arg.replace(/^--/u, "").split("=");
  return [key, rest.join("=")];
}));

function required(name) {
  if (!args[name]) throw new Error(`--${name}=... is required`);
  return path.resolve(root, args[name]);
}

const batchPath = required("candidate-batch");
const reportPath = required("ncs04-report");
const outPath = required("out");
const packet = buildTierAReviewPacket(
  JSON.parse(fs.readFileSync(batchPath, "utf8")),
  JSON.parse(fs.readFileSync(reportPath, "utf8")),
  { maxItems: args["max-items"] ?? 100 },
);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify(packet, null, 2)}\n`);
console.log(`Matsuri NCS-05 review packet: ${packet.counts.technically_ready} technically ready across ${packet.counts.pages} page(s); ${packet.counts.excluded} excluded.`);
