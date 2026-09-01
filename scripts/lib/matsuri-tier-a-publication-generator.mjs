import { buildTierAPublicationReadinessReport } from "./matsuri-tier-a-publication-readiness.mjs";

function requiredString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value.trim();
}

function padWaveNumber(value) {
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 999) {
    throw new Error(`waveNumber must be an integer between 1 and 999: ${value}`);
  }
  return String(parsed).padStart(3, "0");
}

function boundedLimit(value) {
  const parsed = Number.parseInt(String(value ?? 100), 10);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 100) {
    throw new Error(`limit must be an integer between 1 and 100: ${value}`);
  }
  return parsed;
}

function canonicalIds(draft) {
  const candidateId = requiredString(draft.candidate_id, "candidate_id");
  if (!/^[a-z0-9-]+$/u.test(candidateId)) {
    throw new Error(`${candidateId}: candidate_id must already be a stable ASCII identifier`);
  }
  const entityType = draft.entity?.entity_type;
  const prefix = entityType === "festival" ? "fst" : entityType === "folk_performance" ? "fpf" : null;
  if (!prefix) throw new Error(`${candidateId}: unsupported entity_type ${String(entityType)}`);
  return {
    entityId: `${prefix}-${candidateId}`,
    slug: candidateId,
    sourceId: `src-${candidateId}`,
    evidenceId: `evd-${candidateId}-identity`,
  };
}

function geographicScope(draft) {
  const geography = draft.entity?.geographic_scope ?? {};
  const prefectureName = requiredString(geography.prefecture_name_ja, `${draft.candidate_id}: prefecture_name_ja`);
  const prefectureCode = requiredString(geography.prefecture_code, `${draft.candidate_id}: prefecture_code`);
  const municipalityName = typeof geography.municipality_name_ja === "string" && geography.municipality_name_ja.trim()
    ? geography.municipality_name_ja.trim()
    : null;
  const broaderScope = typeof geography.broader_scope_ja === "string" && geography.broader_scope_ja.trim()
    ? geography.broader_scope_ja.trim()
    : null;

  if (!municipalityName && !broaderScope) {
    throw new Error(`${draft.candidate_id}: municipality or explicit broader_scope_ja is required`);
  }

  const area = {
    prefecture_code: prefectureCode,
    prefecture_name_ja: prefectureName,
  };
  if (municipalityName) area.municipality_name_ja = municipalityName;

  return {
    areas: [area],
    scope_type: "single_area",
    description_ja: municipalityName
      ? `${prefectureName}${municipalityName}で伝承される。`
      : broaderScope,
  };
}

function buildEntity(draft, ids, generatedAt) {
  const name = requiredString(draft.entity?.preferred_name?.value, `${draft.candidate_id}: preferred_name`);
  const common = {
    id: ids.entityId,
    schema_version: "matsuri.v1",
    record_version: 1,
    created_at: generatedAt,
    updated_at: generatedAt,
    slug: ids.slug,
    entity_type: draft.entity.entity_type,
    home_surface: "matsuri",
    tradition_scope: "unknown",
    names: [{
      value: name,
      lang: "ja",
      kind: "canonical",
      is_preferred: true,
      source_ids: [ids.sourceId],
    }],
    summary_ja: `文化庁「国指定文化財等データベース」に掲載される「${name}」のTier A索引記録。`,
    geographic_scope: geographicScope(draft),
    default_place_ids: [],
    external_links: [],
    record_lifecycle: "active",
    coverage_tier: "tier_a_index",
  };

  if (draft.entity.entity_type === "festival") {
    return {
      ...common,
      festival_kind: "other",
      usual_months: [],
      season_tags: [],
    };
  }

  return {
    ...common,
    performance_kind: "other",
    forms: [],
    usual_months: [],
    occurrence_series_ids: [],
  };
}

function buildSource(draft, ids) {
  const effective = draft.source_provenance?.effective ?? {};
  const name = requiredString(draft.entity?.preferred_name?.value, `${draft.candidate_id}: preferred_name`);
  return {
    id: ids.sourceId,
    schema_version: "common.v1",
    record_version: 1,
    source_type: "public_authority",
    title: `国指定文化財等データベース「${name}」`,
    publisher: requiredString(effective.publisher_name, `${draft.candidate_id}: publisher_name`),
    url: requiredString(effective.url, `${draft.candidate_id}: source url`),
    accessed_at: requiredString(effective.accessed_at, `${draft.candidate_id}: accessed_at`),
    language: "ja",
  };
}

function buildEvidence(draft, ids) {
  const name = requiredString(draft.entity?.preferred_name?.value, `${draft.candidate_id}: preferred_name`);
  const accessedAt = requiredString(draft.source_provenance?.effective?.accessed_at, `${draft.candidate_id}: accessed_at`);
  return {
    id: ids.evidenceId,
    schema_version: "common.v1",
    record_version: 1,
    source_id: ids.sourceId,
    target_type: "entity_identity",
    target_id: ids.entityId,
    assertion_code: "supports_entity_identity",
    summary_ja: `文化庁データベースは「${name}」の名称と地理的範囲を記録している。`,
    captured_at: accessedAt,
    review_status: "approved",
  };
}

export function buildTierAPublicationWave(reviewedCandidateBatch, options = {}) {
  const publicationReadiness = buildTierAPublicationReadinessReport(reviewedCandidateBatch, options.readinessOptions ?? {});
  const ready = publicationReadiness.records.filter((record) => record.readiness === "tier_a_ready");
  const limit = boundedLimit(options.limit);
  const selected = ready.slice(0, limit);
  if (selected.length === 0) {
    throw new Error("No NCS-05 reviewed Tier A candidates are eligible for publication generation");
  }

  const generatedAt = requiredString(options.generatedAt, "generatedAt");
  const wave = padWaveNumber(options.waveNumber);
  const canonicalBundle = requiredString(options.canonicalBundle, "canonicalBundle");
  const currentAllEntities = Number(options.currentCounts?.all_entities);
  const currentSpecialist = Number(options.currentCounts?.specialist_primary_entities);
  if (!Number.isInteger(currentAllEntities) || currentAllEntities < 0) throw new Error("currentCounts.all_entities must be a non-negative integer");
  if (!Number.isInteger(currentSpecialist) || currentSpecialist < 0) throw new Error("currentCounts.specialist_primary_entities must be a non-negative integer");

  const entities = [];
  const sources = [];
  const evidence = [];
  const selectedEntities = [];

  for (const record of selected) {
    const draft = record.tier_a_draft;
    if (!draft) throw new Error(`${record.candidate_id}: tier_a_draft missing after NCS-05 approval`);
    const ids = canonicalIds(draft);
    entities.push(buildEntity(draft, ids, generatedAt));
    sources.push(buildSource(draft, ids));
    evidence.push(buildEvidence(draft, ids));
    selectedEntities.push({
      id: ids.entityId,
      slug: ids.slug,
      entity_type: draft.entity.entity_type,
      expected_route: draft.entity.entity_type === "festival" ? `/festivals/${ids.slug}/` : `/performances/${ids.slug}/`,
      source_id: ids.sourceId,
      evidence_id: ids.evidenceId,
      candidate_id: draft.candidate_id,
    });
  }

  const bundle = { entities, sources, evidence };
  const config = {
    schema_version: "matsuri.tier-a-publication-wave.v1",
    phase: options.phase ?? "NCS-07",
    wave_id: `ncs07-tier-a-wave-${wave}`,
    status: "staged",
    canonical_bundle: canonicalBundle,
    selected_entities: selectedEntities,
    expected_repository_counts: {
      all_entities: currentAllEntities + selected.length,
      specialist_primary_entities: currentSpecialist + selected.length,
    },
    boundaries: {
      matsuri_only: true,
      future_sites_activated: false,
      requires_current_state: false,
      requires_occurrence: false,
      requires_change_event: false,
      requires_place: false,
      requires_relation: false,
      requires_coordinates: false,
      requires_organizer: false,
      requires_history: false,
    },
  };

  return {
    schema_version: "matsuri.tier-a-publication-generation.v1",
    publication_authorized: false,
    source_readiness_counts: publicationReadiness.counts,
    selected_count: selected.length,
    remaining_reviewed_ready: Math.max(0, ready.length - selected.length),
    bundle,
    config,
  };
}
