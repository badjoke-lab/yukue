import assert from "node:assert/strict";
import { parseBunkaDetailHtml, buildCandidateBatchFromBunkaDetails } from "./lib/matsuri-bunka-detail-acquisition.mjs";

const html = `<!doctype html><html><body><h1>国指定文化財等 データベース</h1><div>主情報</div><div>名称 ： 松前神楽</div><div>種別１ ： 民俗芸能</div><div>種別２ ： 神楽</div><div>所在都道府県、地域 ： 北海道</div><div>所在地 ： 北海道松前郡松前町</div></body></html>`;
const record = parseBunkaDetailHtml(html, 302, 777);
assert.ok(record);
assert.equal(record.name, "松前神楽");
assert.equal(record.subtype, "神楽");
assert.equal(record.prefecture, "北海道");
assert.equal(record.safe, true);
assert.equal(record.url, "https://kunishitei.bunka.go.jp/heritage/detail/302/777");

const batch = buildCandidateBatchFromBunkaDetails([record], "2026-09-01");
assert.equal(batch.counts.candidates, 1);
assert.equal(batch.candidates[0].candidate_id, "bunka-302-777");
assert.equal(batch.candidates[0].entity_type, "folk_performance");
assert.equal(batch.candidates[0].geography.prefecture_code, "01");
assert.equal(batch.candidates[0].geography.municipality_name_ja, "松前郡松前町");
assert.equal(batch.candidates[0].source.provider_record_id, "302/777");
assert.equal(batch.candidates[0].tier_a_published_at ?? null, null);
console.log("Bunka detail fallback contract OK");
