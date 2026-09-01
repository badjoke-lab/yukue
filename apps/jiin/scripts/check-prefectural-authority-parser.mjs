import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { discoverMunicipalityPages, parseChibaMunicipalityRoster, parseSourceUpdatedLabel, summarizeCandidates } from "./lib/chiba-prefectural-roster.mjs";

const appRoot = fileURLToPath(new URL("../", import.meta.url));
const fixtureDir = path.join(appRoot, "test", "fixtures");
const indexHtml = fs.readFileSync(path.join(fixtureDir, "chiba-roster-index.html"), "utf8");
const pageHtml = fs.readFileSync(path.join(fixtureDir, "chiba-roster-page.html"), "utf8");

const pages = discoverMunicipalityPages(indexHtml, "https://www.pref.chiba.lg.jp/gakuji/shuukyou/houjin/houjinmeibo.html");
assert.deepEqual(pages.map((page) => page.municipality_label), ["我孫子市", "柏市"]);

const candidates = parseChibaMunicipalityRoster(pageHtml, {
  sourceUrl: "https://www.pref.chiba.lg.jp/gakuji/shuukyou/houjin/abiko.html",
});
assert.equal(candidates.length, 2);
assert.deepEqual(candidates.map((candidate) => candidate.corporation_name), ["勝蔵院", "延命寺"]);
assert(candidates.every((candidate) => candidate.lineage === "仏教系"));
assert(candidates.every((candidate) => candidate.authority_scope === "public_authority_candidate_identity"));
assert(candidates.every((candidate) => candidate.canonical_promotion_authorized === false));
assert(candidates.every((candidate) => !Object.hasOwn(candidate, "representative") && !Object.hasOwn(candidate, "representative_officer")));
assert.equal(candidates[0].source_key, "12:220:023");
assert.equal(candidates[0].municipality, "我孫子市");
assert.equal(candidates[0].address, "布佐2285番地");
assert.match(candidates[0].candidate_id, /^jiin-pref-authority:12:[0-9a-f]{20}$/);
assert.equal(parseSourceUpdatedLabel(pageHtml), "令和8(2026)年8月27日");

const summary = summarizeCandidates(candidates);
assert.equal(summary.candidate_count, 2);
assert.deepEqual(summary.municipalities, [{ name: "我孫子市", count: 2 }]);
assert.deepEqual(summary.inclusive_organizations, [
  { name: "天台宗", count: 1 },
  { name: "真言宗豊山派", count: 1 },
]);

console.log("Jiin prefectural authority parser verified: Buddhist candidates only, representative-officer fields excluded, deterministic source keys preserved.");
