import assert from "node:assert/strict";
import { applyTierAReviewDecisions } from "./lib/matsuri-tier-a-review-decisions.mjs";
import { buildTierAPublicationReadinessReport } from "./lib/matsuri-tier-a-publication-readiness.mjs";

const baseCandidate = {
  candidate_id: "bunka-312-999",
  entity_type: "festival",
  name_ja: "架空祭礼",
  geography: { prefecture_name_ja: "東京都", municipality_name_ja: "", broader_scope_ja: "東京都" },
  source: { publisher_role: "public_authority", url: "https://example.invalid/official", accessed_at: "2026-09-01" },
};
const batch = {
  schema_version: "matsuri.tier-a-candidate-batch.v1",
  batch_id: "synthetic-review-decisions",
  candidates: [baseCandidate],
};
const decisions = {
  schema_version: "matsuri.tier-a-review-decisions.v1",
  human_review_confirmed: true,
  decisions: [{
    candidate_id: "bunka-312-999",
    decision: "approve",
    reviewed_at: "2026-09-02T00:00:00Z",
    reviewer: "human-reviewer",
    identity_reviewed: true,
    subject_type_reviewed: true,
    geography_reviewed: true,
    source_role_reviewed: true,
    name_variant_reviewed: true,
    broader_scope_basis_verified: true,
    automation_self_approved: false,
  }],
};

const applied = applyTierAReviewDecisions(batch, decisions);
assert.equal(applied.report.approved, 1);
assert.equal(applied.report.rejected, 0);
assert.equal(applied.candidate_batch.candidates[0].review.status, "approved_for_tier_a_readiness");
assert.equal(applied.candidate_batch.candidates[0].review.automation_self_approved, false);

const readiness = buildTierAPublicationReadinessReport(applied.candidate_batch);
assert.equal(readiness.counts.tier_a_ready, 1);
assert.equal(readiness.counts.blocked_review, 0);
assert.equal(readiness.publication_authorized, false);

assert.throws(() => applyTierAReviewDecisions(batch, { ...decisions, human_review_confirmed: false }), /human_review_confirmed=true/u);
assert.throws(() => applyTierAReviewDecisions(batch, {
  ...decisions,
  decisions: [{ ...decisions.decisions[0], automation_self_approved: true }],
}), /automation_self_approved must be false/u);
assert.throws(() => applyTierAReviewDecisions(batch, {
  ...decisions,
  decisions: [{ ...decisions.decisions[0], broader_scope_basis_verified: false }],
}), /broader_scope_basis_verified=true/u);

console.log("Matsuri NCS-05 review decision applicator check passed.");
