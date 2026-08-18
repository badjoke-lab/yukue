import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildTierAPublicationReadinessReport } from "./lib/matsuri-tier-a-publication-readiness.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const fixturePath = path.join(root, "fixtures", "matsuri-tier-a-publication-readiness", "synthetic-reviewed-candidates.json");
const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
const report = buildTierAPublicationReadinessReport(fixture);

const byId = new Map(report.records.map((record) => [record.candidate_id, record]));
const failures = [];

for (const candidate of fixture.candidates) {
  const record = byId.get(candidate.candidate_id);
  if (!record) {
    failures.push(`${candidate.candidate_id}:missing_report_record`);
    continue;
  }
  if (record.readiness !== candidate.expected_ncs05_readiness) {
    failures.push(`${candidate.candidate_id}:expected_${candidate.expected_ncs05_readiness}_got_${record.readiness}`);
  }
  if (candidate.expected_review_problem && !record.review_problems.includes(candidate.expected_review_problem)) {
    failures.push(`${candidate.candidate_id}:missing_${candidate.expected_review_problem}`);
  }
}

for (const record of report.records.filter((item) => item.readiness === "tier_a_ready")) {
  if (record.tier_a_draft?.publication_status !== "not_published") {
    failures.push(`${record.candidate_id}:publication_status_changed`);
  }
  if (record.tier_a_draft?.tier_a_published_at !== null) {
    failures.push(`${record.candidate_id}:tier_a_published_at_written`);
  }
}

if (report.publication_authorized !== false) failures.push("publication_authorized_must_be_false");
if (report.writes_canonical_public_data !== false) failures.push("canonical_write_must_be_false");
if (report.writes_tier_a_publication_time !== false) failures.push("publication_time_write_must_be_false");
if (report.automation_must_not_self_approve !== true) failures.push("automation_self_approval_guard_missing");
if (report.counts.published !== 0) failures.push("published_count_must_be_zero");
if (report.counts.tier_a_ready !== 2) failures.push(`expected_2_ready_got_${report.counts.tier_a_ready}`);
if (report.counts.blocked_review !== 4) failures.push(`expected_4_blocked_review_got_${report.counts.blocked_review}`);

if (failures.length) {
  throw new Error(`Matsuri NCS-05 publication-readiness gate failed:\n- ${failures.join("\n- ")}`);
}

console.log(`Matsuri NCS-05 review gate OK: ${report.counts.tier_a_ready} ready, ${report.counts.blocked_review} blocked_review, published ${report.counts.published}.`);
