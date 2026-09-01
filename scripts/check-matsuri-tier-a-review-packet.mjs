import { buildTierAReviewPacket } from "./lib/matsuri-tier-a-review-packet.mjs";

const batch = {
  schema_version: "matsuri.tier-a-candidate-batch.v1",
  batch_id: "fixture-review-packet",
  candidates: [
    { candidate_id: "a", entity_type: "festival", name_ja: "A祭", geography: { prefecture_name_ja: "青森県", prefecture_code: "02", municipality_name_ja: "青森市" }, source: { family_id: "national_cultural_database" } },
    { candidate_id: "b", entity_type: "folk_performance", name_ja: "B神楽", geography: { prefecture_name_ja: "秋田県", prefecture_code: "05", broader_scope_ja: "秋田県内の複数地域" }, source: { family_id: "national_cultural_database" } },
    { candidate_id: "c", entity_type: "festival", name_ja: "C祭", geography: { prefecture_name_ja: "岩手県", prefecture_code: "03" }, source: { family_id: "national_cultural_database" } },
  ],
};
const report = {
  records: [
    { candidate_id: "a", readiness: "tier_a_ready", warnings: [] },
    { candidate_id: "b", readiness: "tier_a_ready", warnings: [] },
    { candidate_id: "c", readiness: "blocked_identity", problems: ["existing_identity_conflict"] },
  ],
};

const packet = buildTierAReviewPacket(batch, report, { maxItems: 1 });
const failures = [];
if (packet.counts.technically_ready !== 2) failures.push(`ready_${packet.counts.technically_ready}`);
if (packet.counts.excluded !== 1) failures.push(`excluded_${packet.counts.excluded}`);
if (packet.counts.pages !== 2) failures.push(`pages_${packet.counts.pages}`);
const first = packet.pages[0].candidates[0];
const second = packet.pages[1].candidates[0];
if (first.review.automation_self_approved !== false) failures.push("automation_self_approved");
if (first.review.status !== "needs_human_review") failures.push("review_status");
if (second.review.broader_scope_basis_verified !== false) failures.push("broader_scope_review_not_required");
if (packet.excluded[0].reason !== "blocked_identity") failures.push("blocked_reason");
if (failures.length) throw new Error(`Matsuri Tier A review packet check failed: ${failures.join(", ")}`);
console.log("Matsuri Tier A review packet check OK: review remains human-only and technically blocked candidates are excluded.");
