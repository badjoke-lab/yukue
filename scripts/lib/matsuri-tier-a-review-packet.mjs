function nonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function byCandidateId(records = []) {
  return new Map(records.map((record) => [record.candidate_id, record]));
}

export function buildTierAReviewPacket(candidateBatch, ncs04Report, options = {}) {
  const candidates = Array.isArray(candidateBatch?.candidates) ? candidateBatch.candidates : [];
  const reportRecords = byCandidateId(ncs04Report?.records ?? []);
  const maxItems = Number.parseInt(String(options.maxItems ?? 100), 10);
  if (!Number.isInteger(maxItems) || maxItems < 1 || maxItems > 100) {
    throw new Error(`maxItems must be an integer between 1 and 100: ${options.maxItems}`);
  }

  const eligible = [];
  const excluded = [];

  for (const candidate of candidates) {
    const technical = reportRecords.get(candidate.candidate_id);
    if (!technical) {
      excluded.push({ candidate_id: candidate.candidate_id, reason: "missing_ncs04_record" });
      continue;
    }
    if (technical.readiness !== "tier_a_ready") {
      excluded.push({ candidate_id: candidate.candidate_id, reason: technical.readiness, problems: technical.problems ?? [] });
      continue;
    }

    const geography = candidate.geography ?? {};
    const hasMunicipality = nonEmpty(geography.municipality_name_ja);
    const hasBroaderScope = nonEmpty(geography.broader_scope_ja);
    if (!hasMunicipality && !hasBroaderScope) {
      excluded.push({ candidate_id: candidate.candidate_id, reason: "geography_review_basis_missing" });
      continue;
    }

    eligible.push({
      candidate_id: candidate.candidate_id,
      entity_type: candidate.entity_type,
      name_ja: candidate.name_ja,
      geography,
      source: candidate.source,
      technical_readiness: technical.readiness,
      technical_warnings: technical.warnings ?? [],
      review: {
        status: "needs_human_review",
        reviewed_at: null,
        identity_reviewed: false,
        subject_type_reviewed: false,
        geography_reviewed: false,
        source_role_reviewed: false,
        name_variant_reviewed: false,
        automation_self_approved: false,
        broader_scope_basis_verified: hasMunicipality ? null : false,
      },
    });
  }

  eligible.sort((a, b) => a.candidate_id.localeCompare(b.candidate_id, "en"));
  const pages = [];
  for (let index = 0; index < eligible.length; index += maxItems) {
    const pageItems = eligible.slice(index, index + maxItems);
    pages.push({
      page: pages.length + 1,
      count: pageItems.length,
      candidates: pageItems,
    });
  }

  return {
    schema_version: "matsuri.tier-a-review-packet.v1",
    phase: "NCS-05",
    batch_id: candidateBatch?.batch_id ?? null,
    automation_self_approval_forbidden: true,
    max_items_per_page: maxItems,
    counts: {
      input_candidates: candidates.length,
      technically_ready: eligible.length,
      excluded: excluded.length,
      pages: pages.length,
    },
    pages,
    excluded,
  };
}
