import assert from "node:assert/strict";
import { buildNationalCandidatesFromCsv } from "./lib/matsuri-national-csv-acquisition.mjs";

const csv = [
  "名称,種別２,所在都道府県、地域,所在地,詳細URL,管理番号",
  "架空祭礼,祭礼（信仰）,北海道,札幌市中央区,https://kunishitei.bunka.go.jp/heritage/detail/302/999001,999001",
  "架空神楽,神楽,青森県,青森市,https://kunishitei.bunka.go.jp/heritage/detail/302/999002,999002",
  "架空生業,生産・生業,岩手県,盛岡市,https://kunishitei.bunka.go.jp/heritage/detail/302/999003,999003",
].join("\n");

const batch = buildNationalCandidatesFromCsv(csv, { accessedAt: "2026-09-01" });
assert.equal(batch.contains_real_candidates, true);
assert.equal(batch.counts.input_rows, 3);
assert.equal(batch.counts.candidates, 2);
assert.equal(batch.counts.skipped, 1);
assert.equal(batch.candidates[0].entity_type, "festival");
assert.equal(batch.candidates[0].geography.prefecture_code, "01");
assert.equal(batch.candidates[0].geography.municipality_name_ja, "札幌市");
assert.equal(batch.candidates[1].entity_type, "folk_performance");
assert.equal(batch.candidates[1].geography.prefecture_code, "02");
assert.equal(batch.skipped[0].reason, "subtype_not_matsuri_safe");
assert.equal(batch.candidates.some((candidate) => candidate.tier_a_published_at != null), false);
console.log(`National acquisition contract OK: candidates=${batch.counts.candidates}, skipped=${batch.counts.skipped}`);
