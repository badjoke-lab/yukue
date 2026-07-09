import type {
  FestivalEntityRecord,
  FestivalStateCode,
  FestivalStateSnapshotRecord,
  FolkPerformanceEntityRecord,
  FolkPerformanceStateSnapshotRecord,
  MatsuriChangeEventRecord,
  MatsuriOccurrenceRecord,
  MatsuriRelationRecord,
} from "../src/matsuri/index.js";

const festival = {
  id: "fst-example",
  schema_version: "matsuri.v1",
  record_version: 1,
  created_at: "2026-07-10T00:00:00Z",
  updated_at: "2026-07-10T00:00:00Z",
  slug: "example-festival",
  entity_type: "festival",
  home_surface: "matsuri",
  tradition_scope: "standalone",
  names: [
    {
      value: "例祭",
      lang: "ja",
      kind: "canonical",
      is_preferred: true,
      source_ids: ["src-example"],
    },
  ],
  summary_ja: "Matsuri拡張の型確認用fixture。",
  geographic_scope: {
    areas: [{ prefecture_code: "11", prefecture_name_ja: "埼玉県" }],
    scope_type: "route_based",
  },
  default_place_ids: ["plc-start", "plc-end"],
  external_links: [],
  record_lifecycle: "active",
  festival_kind: "ritual_festival",
  recurrence_pattern: {
    pattern_type: "quadrennial",
    rule_text_ja: "4年に1度",
    evidence_ids: ["evd-recurrence"],
  },
  usual_months: [8],
  usual_season: "summer",
  date_rule_text_ja: "閏年の8月第一日曜日",
  usual_duration_days: 1,
  season_tags: ["summer"],
} satisfies FestivalEntityRecord;

const performance = {
  id: "prf-example",
  schema_version: "matsuri.v1",
  record_version: 1,
  created_at: "2026-07-10T00:00:00Z",
  updated_at: "2026-07-10T00:00:00Z",
  entity_type: "folk_performance",
  home_surface: "matsuri",
  tradition_scope: "standalone",
  names: [
    {
      value: "例示神楽",
      lang: "ja",
      kind: "canonical",
      is_preferred: true,
      source_ids: ["src-example"],
    },
  ],
  summary_ja: "民俗芸能拡張の型確認用fixture。",
  geographic_scope: {
    areas: [],
    scope_type: "single_site",
  },
  default_place_ids: [],
  external_links: [],
  record_lifecycle: "active",
  performance_kind: "kagura",
  forms: [],
  usual_months: [],
  occurrence_series_ids: [],
} satisfies FolkPerformanceEntityRecord;

const festivalState = {
  id: "sts-festival",
  schema_version: "matsuri.v1",
  record_version: 1,
  entity_id: festival.id,
  state_schema: "matsuri.festival.v1",
  state_code: "reviving",
  observed_at: "2026-07-10",
  basis_evidence_ids: ["evd-state"],
  review_status: "approved",
} satisfies FestivalStateSnapshotRecord;

const performanceState = {
  id: "sts-performance",
  schema_version: "matsuri.v1",
  record_version: 1,
  entity_id: performance.id,
  state_schema: "matsuri.folk-performance.v1",
  state_code: "reduced_activity",
  observed_at: "2026-07-10",
  basis_evidence_ids: ["evd-performance-state"],
  review_status: "approved",
} satisfies FolkPerformanceStateSnapshotRecord;

const change = {
  id: "chg-example",
  schema_version: "matsuri.v1",
  record_version: 1,
  event_type: "revival_completed",
  subject_entity_ids: [festival.id],
  effective_period: { start: "1976" },
  summary_ja: "復活完了の例示イベント。",
  resulting_state_snapshot_ids: [festivalState.id],
  related_relation_ids: [],
  evidence_ids: ["evd-change"],
  review_status: "approved",
} satisfies MatsuriChangeEventRecord;

const occurrence = {
  id: "occ-example",
  schema_version: "matsuri.v1",
  record_version: 1,
  subject_entity_id: festival.id,
  occurrence_type: "festival_edition",
  temporal_extent: {
    start: "2024-08-04",
    end: "2024-08-04",
    precision: "day",
  },
  outcome: "held",
  scale: "normal",
  venue_place_ids: ["plc-start", "plc-end"],
  organizer_entity_ids: [],
  evidence_ids: ["evd-occurrence"],
  review_status: "approved",
} satisfies MatsuriOccurrenceRecord;

const relation = {
  id: "rel-example",
  schema_version: "matsuri.v1",
  record_version: 1,
  source_entity_id: festival.id,
  relation_type: "maintained_by",
  target_entity_id: "org-preservation-group",
  evidence_ids: ["evd-relation"],
  review_status: "approved",
} satisfies MatsuriRelationRecord;

// @ts-expect-error revived is a Change Event outcome/history concept, not a Current State value.
const invalidRevivedState: FestivalStateCode = "revived";

// @ts-expect-error modifications belong in Change Event history, not Current State.
const invalidModifiedState: FestivalStateCode = "active_modified";

void [
  festival,
  performance,
  festivalState,
  performanceState,
  change,
  occurrence,
  relation,
  invalidRevivedState,
  invalidModifiedState,
];
