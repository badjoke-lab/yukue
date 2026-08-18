import { buildTierAReadinessReport } from "./matsuri-tier-a-importer.mjs";

function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validDateOrTimestamp(value) {
  if (!nonEmptyString(value)) return false;
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
}

export function reviewProblems(candidate) {
  const review = candidate?.review;
  if (!review || typeof review !== "object") return ["review_missing"];

  const problems = [];
  if (review.status !== "approved_for_tier_a_readiness") {
    problems.push("review_status_not_approved");
  }
  if (!validDateOrTimestamp(review.reviewed_at)) {
    problems.push("reviewed_at_invalid");
  }
  if (review.identity_reviewed !== true) problems.push("identity_review_unapproved");
  if (review.subject_type_reviewed !== true) problems.push("subject_type_review_unapproved");
  if (review.geography_reviewed !== true) problems.push("geography_review_unapproved");
  if (review.source_role_reviewed !== true) problems.push("source_role_review_unapproved");
  if (review.name_variant_reviewed !== true) problems.push("name_variant_review_unapproved");
  if (review.automation_self_approved !== false) {
    problems.push("automation_self_approval_forbidden");
  }

  const geography = candidate?.geography;
  const hasMunicipality = nonEmptyString(geography?.municipality_name_ja);
  const hasBroaderScope = nonEmptyString(geography?.broader_scope_ja);
  if (!hasMunicipality && hasBroaderScope && review.broader_scope_basis_verified !== true) {
    problems.push("broader_scope_basis_unverified");
  }

  return problems;
}

export function buildTierAPublicationReadinessReport(batch, options = {}) {
  const base = buildTierAReadinessReport(batch, options);
  const candidates = Array.isArray(batch?.candidates) ? batch.candidates : [];

  const records = base.records.map((record, index) => {
    const candidate = candidates[index];
    if (record.readiness !== "tier_a_ready") {
      return {
        ...record,
        ncs04_readiness: record.readiness,
        review_problems: [],
      };
    }

    const problems = reviewProblems(candidate);
    if (problems.length === 0) {
      return {
        ...record,
        ncs04_readiness: record.readiness,
        review_problems: [],
      };
    }

    return {
      ...record,
      ncs04_readiness: record.readiness,
      readiness: "blocked_review",
      review_problems: problems,
      tier_a_draft: null,
    };
  });

  const counts = {
    candidates: records.length,
    tier_a_ready: records.filter((record) => record.readiness === "tier_a_ready").length,
    blocked_input: records.filter((record) => record.readiness === "blocked_input").length,
    blocked_source: records.filter((record) => record.readiness === "blocked_source").length,
    blocked_identity: records.filter((record) => record.readiness === "blocked_identity").length,
    blocked_review: records.filter((record) => record.readiness === "blocked_review").length,
    published: 0,
  };

  return {
    schema_version: "matsuri.tier-a-publication-readiness-report.v1",
    phase: "NCS-05",
    batch_id: batch?.batch_id ?? null,
    mode: "publication_readiness_dry_run",
    source_inventory_schema_version: base.source_inventory_schema_version,
    publication_authorized: false,
    writes_canonical_public_data: false,
    writes_tier_a_publication_time: false,
    automation_must_not_self_approve: true,
    counts,
    records,
  };
}
