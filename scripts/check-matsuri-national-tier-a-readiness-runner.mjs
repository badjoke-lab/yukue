import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "matsuri-national-readiness-"));
const inputPath = path.join(tempRoot, "official-export.csv");
const outputPath = path.join(tempRoot, "artifacts");

const csv = [
  "名称,種別２,所在都道府県、地域,所在地,詳細URL,管理番号",
  "全国取得契約祭礼,祭礼（信仰）,北海道,札幌市中央区,https://kunishitei.bunka.go.jp/heritage/detail/302/999991,999991",
  "全国取得契約神楽,神楽,青森県,青森市,https://kunishitei.bunka.go.jp/heritage/detail/302/999992,999992",
  "全国取得契約生業,生産・生業,岩手県,盛岡市,https://kunishitei.bunka.go.jp/heritage/detail/302/999993,999993",
].join("\n");
fs.writeFileSync(inputPath, csv, "utf8");

const result = spawnSync(
  process.execPath,
  [
    "scripts/run-matsuri-national-tier-a-readiness.mjs",
    "--input",
    inputPath,
    "--output",
    outputPath,
    "--accessed-at",
    "2026-09-01",
  ],
  { cwd: repositoryRoot, encoding: "utf8" },
);

assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
assert.match(result.stdout, /input=3/u);
assert.match(result.stdout, /acquired=2/u);
assert.match(result.stdout, /acquisition_skipped=1/u);
assert.match(result.stdout, /ready=2/u);

const batch = JSON.parse(fs.readFileSync(path.join(outputPath, "candidate-batch.json"), "utf8"));
const report = JSON.parse(fs.readFileSync(path.join(outputPath, "report.json"), "utf8"));
const ready = JSON.parse(fs.readFileSync(path.join(outputPath, "tier-a-ready-drafts.json"), "utf8"));
const blocked = JSON.parse(fs.readFileSync(path.join(outputPath, "blocked-candidates.json"), "utf8"));

assert.equal(batch.counts.input_rows, 3);
assert.equal(batch.counts.candidates, 2);
assert.equal(batch.counts.skipped, 1);
assert.equal(report.counts.tier_a_ready, 2);
assert.equal(report.counts.published, 0);
assert.equal(ready.length, 2);
assert.equal(blocked.length, 0);
assert.equal(report.publication_authorized, false);
assert.equal(report.writes_canonical_public_data, false);
assert.equal(report.writes_tier_a_publication_time, false);

console.log("National Matsuri acquisition-to-readiness runner contract OK.");
