import assert from "node:assert/strict";
import { buildNationalCandidatesFromCsv } from "./lib/matsuri-national-csv-acquisition.mjs";

const csv = [
  '"台帳ID","管理対象ID","名称","棟名","文化財種類","種別1","種別2","国","時代","重文指定年月日","国宝指定年月日","都道府県、地域 ※美工品は「所有者住所（所在都道府県）」","所在地","保管施設の名称","所有者名","管理団体又は責任者","緯度","経度"',
  '"302","999001","架空祭礼","","重要無形民俗文化財","風俗慣習","祭礼（信仰）","","","","","北海道","北海道札幌市中央区","","","","43.0","141.3"',
  '"302","999002","架空神楽","","重要無形民俗文化財","民俗芸能","神楽","","","","","青森県","青森県青森市","","","","40.8","140.7"',
  '"302","999003","架空生業","","重要無形民俗文化財","風俗慣習","生産・生業","","","","","岩手県","岩手県盛岡市","","","","39.7","141.1"',
].join("\n");

const batch = buildNationalCandidatesFromCsv(csv, { accessedAt: "2026-09-01" });
assert.equal(batch.contains_real_candidates, true);
assert.equal(batch.counts.input_rows, 3);
assert.equal(batch.counts.candidates, 2);
assert.equal(batch.counts.skipped, 1);
assert.equal(batch.candidates[0].entity_type, "festival");
assert.equal(batch.candidates[0].candidate_id, "bunka-302-999001");
assert.equal(batch.candidates[0].source.url, "https://kunishitei.bunka.go.jp/heritage/detail/302/999001");
assert.equal(batch.candidates[0].source.provider_record_id, "302/999001");
assert.equal(batch.candidates[0].geography.prefecture_code, "01");
assert.equal(batch.candidates[0].geography.municipality_name_ja, "札幌市");
assert.equal(batch.candidates[1].entity_type, "folk_performance");
assert.equal(batch.candidates[1].geography.prefecture_code, "02");
assert.equal(batch.candidates[1].geography.municipality_name_ja, "青森市");
assert.equal(batch.skipped[0].reason, "subtype_not_matsuri_safe");
assert.equal(batch.candidates.some((candidate) => candidate.tier_a_published_at != null), false);
console.log(`National acquisition contract OK: candidates=${batch.counts.candidates}, skipped=${batch.counts.skipped}`);
