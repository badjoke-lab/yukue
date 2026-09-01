import { buildTierAPublicationWave } from "./lib/matsuri-tier-a-publication-generator.mjs";

const reviewed = {
  schema_version: "matsuri.tier-a-candidate-batch.v1",
  batch_id: "ncs07-publication-generator-fixture",
  fixture_only: true,
  contains_real_candidates: false,
  candidates: [
    {
      candidate_id: "synthetic-pub-001",
      entity_type: "festival",
      name_ja: "試験祭一",
      geography: { prefecture_code: "13", prefecture_name_ja: "東京都", broader_scope_ja: "東京都内の複数地域" },
      source: { family_id: "national_cultural_database", url: "https://kunishitei.bunka.go.jp/heritage/detail/312/pub-001", accessed_at: "2026-09-01", publisher_name: "文化庁", publisher_role_verified: true, provider_record_id: "fixture-pub-001" },
      review: { status: "approved_for_tier_a_readiness", reviewed_at: "2026-09-01T00:00:00Z", identity_reviewed: true, subject_type_reviewed: true, geography_reviewed: true, source_role_reviewed: true, name_variant_reviewed: true, automation_self_approved: false, broader_scope_basis_verified: true },
    },
    {
      candidate_id: "synthetic-pub-002",
      entity_type: "folk_performance",
      name_ja: "試験芸能二",
      geography: { prefecture_code: "45", prefecture_name_ja: "宮崎県", municipality_name_ja: "西都市" },
      source: { family_id: "national_cultural_database", url: "https://kunishitei.bunka.go.jp/heritage/detail/302/pub-002", accessed_at: "2026-09-01", publisher_name: "文化庁", publisher_role_verified: true, provider_record_id: "fixture-pub-002" },
      review: { status: "approved_for_tier_a_readiness", reviewed_at: "2026-09-01T00:00:00Z", identity_reviewed: true, subject_type_reviewed: true, geography_reviewed: true, source_role_reviewed: true, name_variant_reviewed: true, automation_self_approved: false },
    },
    {
      candidate_id: "synthetic-unreviewed-003",
      entity_type: "festival",
      name_ja: "未審査祭三",
      geography: { prefecture_code: "01", prefecture_name_ja: "北海道", broader_scope_ja: "北海道内" },
      source: { family_id: "national_cultural_database", url: "https://kunishitei.bunka.go.jp/heritage/detail/312/pub-003", accessed_at: "2026-09-01", publisher_name: "文化庁", publisher_role_verified: true, provider_record_id: "fixture-pub-003" },
    },
  ],
};

const result = buildTierAPublicationWave(reviewed, {
  waveNumber: 9,
  canonicalBundle: "data/public/matsuri/f1/batch-21.json",
  generatedAt: "2026-09-01T00:00:00Z",
  limit: 100,
  currentCounts: { all_entities: 211, specialist_primary_entities: 148 },
});

const failures = [];
if (result.publication_authorized !== false) failures.push("publication_authorized_must_remain_false");
if (result.selected_count !== 2) failures.push(`expected_2_selected_got_${result.selected_count}`);
if (result.source_readiness_counts.blocked_review !== 1) failures.push(`expected_1_blocked_review_got_${result.source_readiness_counts.blocked_review}`);
if (result.bundle.entities.length !== 2 || result.bundle.sources.length !== 2 || result.bundle.evidence.length !== 2) failures.push("bundle_cardinality_mismatch");
if (result.config.status !== "staged") failures.push("wave_must_be_staged");
if (result.config.selected_entities.length !== 2) failures.push("selected_entities_mismatch");
if (result.config.expected_repository_counts.all_entities !== 213) failures.push("all_entities_count_mismatch");
if (result.config.expected_repository_counts.specialist_primary_entities !== 150) failures.push("specialist_count_mismatch");
const broader = result.bundle.entities.find((entity) => entity.id === "fst-synthetic-pub-001");
if (!broader || broader.geographic_scope.description_ja !== "東京都内の複数地域") failures.push("broader_scope_not_preserved");
if (broader?.geographic_scope.areas?.[0]?.municipality_name_ja) failures.push("unsupported_municipality_inferred");
if (result.bundle.entities.some((entity) => entity.tier_a_published_at !== undefined)) failures.push("staged_publication_timestamp_written");
if (result.bundle.entities.some((entity) => entity.primary_place_id || (entity.default_place_ids ?? []).length > 0)) failures.push("unsupported_place_projected");

const one = buildTierAPublicationWave(reviewed, {
  waveNumber: 10,
  canonicalBundle: "data/public/matsuri/f1/batch-22.json",
  generatedAt: "2026-09-01T00:00:00Z",
  limit: 1,
  currentCounts: { all_entities: 211, specialist_primary_entities: 148 },
});
if (one.selected_count !== 1 || one.remaining_reviewed_ready !== 1) failures.push("bounded_limit_not_enforced");

if (failures.length) {
  throw new Error(`Matsuri Tier A publication generator failed:\n- ${failures.join("\n- ")}`);
}

console.log(`Matsuri Tier A publication generator OK: reviewed_ready=${result.source_readiness_counts.tier_a_ready}, selected=${result.selected_count}, blocked_review=${result.source_readiness_counts.blocked_review}, publication_authorized=${result.publication_authorized}.`);
