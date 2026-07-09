import type {
  ChangeEventRecord,
  EntityRecord,
  EvidenceRecord,
  ImageAssetRecord,
  OccurrenceRecord,
  PlaceRecord,
  RelationRecord,
  StateSnapshotRecord,
} from "../src/common/index.js";

const entity = {
  id: "ent-example",
  schema_version: "common.v1",
  record_version: 1,
  created_at: "2026-07-10T00:00:00Z",
  updated_at: "2026-07-10T00:00:00Z",
  slug: "example",
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
  summary_ja: "共通契約の型確認用fixture。",
  geographic_scope: {
    areas: [{ prefecture_code: "11", prefecture_name_ja: "埼玉県" }],
    scope_type: "single_site",
  },
  primary_place_id: "plc-example",
  default_place_ids: ["plc-example"],
  external_links: [],
  record_lifecycle: "active",
} satisfies EntityRecord<"festival">;

const place = {
  id: "plc-example",
  schema_version: "common.v1",
  record_version: 1,
  name_ja: "例示地点",
  place_kind: "shrine",
  country_code: "JP",
  prefecture_code: "11",
  prefecture_name_ja: "埼玉県",
  coordinate_precision: "venue",
  source_ids: ["src-example"],
} satisfies PlaceRecord;

const snapshot = {
  id: "sts-example",
  schema_version: "common.v1",
  record_version: 1,
  entity_id: entity.id,
  state_schema: "matsuri.festival.v1",
  state_code: "active",
  observed_at: "2026-07-10",
  basis_evidence_ids: ["evd-state"],
  review_status: "approved",
} satisfies StateSnapshotRecord<"active" | "suspended">;

const change = {
  id: "chg-example",
  schema_version: "common.v1",
  record_version: 1,
  event_type: "revival_completed",
  subject_entity_ids: [entity.id],
  effective_period: { start: "1976" },
  summary_ja: "復活を確認した例示イベント。",
  resulting_state_snapshot_ids: [snapshot.id],
  related_relation_ids: [],
  evidence_ids: ["evd-change"],
  review_status: "approved",
} satisfies ChangeEventRecord<"revival_completed">;

const occurrence = {
  id: "occ-example",
  schema_version: "common.v1",
  record_version: 1,
  subject_entity_id: entity.id,
  occurrence_type: "festival_edition",
  temporal_extent: {
    start: "2024-08-04",
    end: "2024-08-04",
    precision: "day",
  },
  outcome: "held",
  scale: "normal",
  venue_place_ids: [place.id],
  organizer_entity_ids: [],
  evidence_ids: ["evd-occurrence"],
  review_status: "approved",
} satisfies OccurrenceRecord<"festival_edition">;

const relation = {
  id: "rel-example",
  schema_version: "common.v1",
  record_version: 1,
  source_entity_id: entity.id,
  relation_type: "held_at",
  target_entity_id: "shr-example",
  evidence_ids: ["evd-relation"],
  review_status: "approved",
} satisfies RelationRecord<"held_at">;

const evidence = {
  id: "evd-state",
  schema_version: "common.v1",
  record_version: 1,
  source_id: "src-example",
  target_type: "state_snapshot",
  target_id: snapshot.id,
  assertion_code: "supports_current_state",
  summary_ja: "現在状態の根拠を示すfixture。",
  review_status: "approved",
} satisfies EvidenceRecord;

const image = {
  id: "img-example",
  schema_version: "common.v1",
  record_version: 1,
  created_at: "2026-07-10T00:00:00Z",
  updated_at: "2026-07-10T00:00:00Z",
  entity_id: entity.id,
  public_url: "https://example.invalid/image.jpg",
  alt_text_ja: "行事の様子を示す型確認用fixture画像",
  image_kind: "festival_scene",
  is_primary: true,
  display_order: 1,
  credit_text: "Photo by Example",
  license_type: "direct_permission",
  commercial_use_allowed: true,
  attribution_required: true,
  acquired_via: "direct_permission",
  review_status: "approved",
  rights_review_status: "approved",
} satisfies ImageAssetRecord;

void [entity, place, snapshot, change, occurrence, relation, evidence, image];
