import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const baselinePath = path.join(root, "config", "matsuri-tier-a-dry-run-baseline.json");
const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
const failures = [];

if (baseline.schema_version !== "matsuri.tier-a-dry-run-baseline.v1") failures.push("schema_version");
if (baseline.phase !== "NCS-05" || baseline.status !== "completed") failures.push("phase_or_status");
const count = baseline.input_scope?.candidate_count ?? 0;
if (count < 1) failures.push("candidate_count");
if (baseline.input_scope?.real_candidate_queue_committed !== false) failures.push("private_queue_committed");
if (baseline.input_scope?.candidate_identifiers_disclosed !== false) failures.push("candidate_identifiers_disclosed");
if (baseline.input_scope?.candidate_urls_disclosed !== false) failures.push("candidate_urls_disclosed");
if ((baseline.ncs04_base_result?.source_resolution_success ?? 0) < 1) failures.push("no_real_source_resolution_success");

const review = baseline.ncs05_review_result ?? {};
const accounted = ["tier_a_ready", "blocked_review", "blocked_input", "blocked_source", "blocked_identity"]
  .reduce((sum, key) => sum + (review[key] ?? 0), 0);
if (accounted !== count) failures.push(`count_mismatch:${accounted}/${count}`);
if ((review.tier_a_ready ?? 0) < 1) failures.push("no_tier_a_ready_real_source_candidate");
if (review.published !== 0) failures.push("published_must_be_zero");

const boundaries = baseline.boundaries ?? {};
for (const key of ["publication_authorized", "writes_canonical_public_data", "writes_tier_a_publication_time", "unsupported_tier_b_or_c_claims_projected", "future_sites_activated"]) {
  if (boundaries[key] !== false) failures.push(`${key}_must_be_false`);
}
if (boundaries.automation_must_not_self_approve !== true) failures.push("automation_self_approval_guard_missing");
if (baseline.rights_and_reuse?.images_imported !== false) failures.push("images_imported");

const serialized = JSON.stringify(baseline);
if (/https?:\/\//u.test(serialized)) failures.push("baseline_contains_candidate_url");

if (failures.length) {
  throw new Error(`Matsuri NCS-05 dry-run baseline failed:\n- ${failures.join("\n- ")}`);
}
console.log(`Matsuri NCS-05 dry-run baseline OK: ${count} real-source candidates, ${review.tier_a_ready} ready, ${review.published} published.`);
