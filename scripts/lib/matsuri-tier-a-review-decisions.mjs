function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validDateOrTimestamp(value) {
  if (!nonEmptyString(value)) return false;
  return !Number.isNaN(new Date(value).getTime());
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function applyTierAReviewDecisions(candidateBatch, decisionSet) {
  const batch = clone(candidateBatch ?? {});
  const candidates = Array.isArray(batch.candidates) ? batch.candidates : [];
  const decisions = Array.isArray(decisionSet?.decisions) ? decisionSet.decisions : [];
  if (decisionSet?.schema_version !== "matsuri.tier-a-review-decisions.v1") {
    throw new Error("review decisions schema_version must be matsuri.tier-a-review-decisions.v1");
  }
  if (decisionSet?.human_review_confirmed !== true) {
    throw new Error("review decisions must explicitly confirm human_review_confirmed=true");
  }

  const candidateMap = new Map(candidates.map((candidate) => [candidate.candidate_id, candidate]));
  const seen = new Set();
  let approved = 0;
  let rejected = 0;

  for (const decision of decisions) {
    const id = decision?.candidate_id;
    if (!nonEmptyString(id) || seen.has(id)) throw new Error(`duplicate or missing candidate_id in review decisions: ${id}`);
    seen.add(id);
    const candidate = candidateMap.get(id);
    if (!candidate) throw new Error(`review decision references unknown candidate: ${id}`);
    if (!validDateOrTimestamp(decision.reviewed_at)) throw new Error(`reviewed_at is invalid for ${id}`);
    if (!nonEmptyString(decision.reviewer)) throw new Error(`reviewer is required for ${id}`);
    if (decision.automation_self_approved !== false) throw new Error(`automation_self_approved must be false for ${id}`);
    if (!new Set(["approve", "reject"]).has(decision.decision)) throw new Error(`decision must be approve or reject for ${id}`);

    if (decision.decision === "reject") {
      candidate.review = {
        status: "rejected_for_tier_a_readiness",
        reviewed_at: decision.reviewed_at,
        reviewer: decision.reviewer,
        rejection_reason: nonEmptyString(decision.reason) ? decision.reason.trim() : "human_review_rejected",
        identity_reviewed: decision.identity_reviewed === true,
        subject_type_reviewed: decision.subject_type_reviewed === true,
        geography_reviewed: decision.geography_reviewed === true,
        source_role_reviewed: decision.source_role_reviewed === true,
        name_variant_reviewed: decision.name_variant_reviewed === true,
        automation_self_approved: false,
        broader_scope_basis_verified: decision.broader_scope_basis_verified === true,
      };
      rejected += 1;
      continue;
    }

    const required = [
      "identity_reviewed",
      "subject_type_reviewed",
      "geography_reviewed",
      "source_role_reviewed",
      "name_variant_reviewed",
    ];
    for (const field of required) {
      if (decision[field] !== true) throw new Error(`${field}=true is required to approve ${id}`);
    }
    const geography = candidate.geography ?? {};
    const hasMunicipality = nonEmptyString(geography.municipality_name_ja);
    const hasBroaderScope = nonEmptyString(geography.broader_scope_ja);
    if (!hasMunicipality && hasBroaderScope && decision.broader_scope_basis_verified !== true) {
      throw new Error(`broader_scope_basis_verified=true is required to approve ${id}`);
    }

    candidate.review = {
      status: "approved_for_tier_a_readiness",
      reviewed_at: decision.reviewed_at,
      reviewer: decision.reviewer,
      identity_reviewed: true,
      subject_type_reviewed: true,
      geography_reviewed: true,
      source_role_reviewed: true,
      name_variant_reviewed: true,
      automation_self_approved: false,
      broader_scope_basis_verified: hasMunicipality ? null : true,
    };
    approved += 1;
  }

  return {
    candidate_batch: batch,
    report: {
      schema_version: "matsuri.tier-a-review-decision-application.v1",
      batch_id: batch.batch_id ?? null,
      decisions: decisions.length,
      approved,
      rejected,
      untouched: candidates.length - decisions.length,
      publication_authorized: false,
      automation_self_approval_forbidden: true,
    },
  };
}
