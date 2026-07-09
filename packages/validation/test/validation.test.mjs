import assert from "node:assert/strict";
import test from "node:test";

import {
  deriveCurrentStates,
  validateDataset,
} from "../dist/index.js";

function makeValidBundle() {
  const source = {
    id: "src-official",
    schema_version: "common.v1",
    record_version: 1,
    source_type: "municipality",
    title: "Official record",
    url: "https://example.invalid/source",
    accessed_at: "2026-07-10",
    language: "ja",
  };

  const entity = {
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
        source_ids: [source.id],
      },
    ],
    summary_ja: "validation fixture",
    geographic_scope: {
      areas: [{ prefecture_code: "11", prefecture_name_ja: "埼玉県" }],
      scope_type: "single_site",
    },
    primary_place_id: "plc-example",
    default_place_ids: ["plc-example"],
    external_links: [],
    record_lifecycle: "active",
  };

  const place = {
    id: "plc-example",
    schema_version: "common.v1",
    record_version: 1,
    name_ja: "例示地点",
    place_kind: "shrine",
    country_code: "JP",
    coordinate_precision: "venue",
    source_ids: [source.id],
  };

  const snapshot = {
    id: "sts-example",
    schema_version: "matsuri.v1",
    record_version: 1,
    entity_id: entity.id,
    state_schema: "matsuri.festival.v1",
    state_code: "active",
    observed_at: "2026-07-10",
    basis_evidence_ids: ["evd-state"],
    review_status: "approved",
  };

  const occurrence = {
    id: "occ-example",
    schema_version: "matsuri.v1",
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
  };

  const evidenceState = {
    id: "evd-state",
    schema_version: "common.v1",
    record_version: 1,
    source_id: source.id,
    target_type: "state_snapshot",
    target_id: snapshot.id,
    assertion_code: "supports_current_state",
    summary_ja: "State fixture evidence",
    review_status: "approved",
  };

  const evidenceOccurrence = {
    id: "evd-occurrence",
    schema_version: "common.v1",
    record_version: 1,
    source_id: source.id,
    target_type: "occurrence",
    target_id: occurrence.id,
    assertion_code: "supports_occurrence",
    summary_ja: "Occurrence fixture evidence",
    review_status: "approved",
  };

  return {
    entities: [entity],
    places: [place],
    stateSnapshots: [snapshot],
    changeEvents: [],
    occurrences: [occurrence],
    occurrenceSeries: [],
    recurrencePatterns: [],
    relations: [],
    designations: [],
    sources: [source],
    evidence: [evidenceState, evidenceOccurrence],
    images: [],
    publicProjection: {
      entities: [{ id: entity.id, name_ja: "例祭" }],
    },
  };
}

test("valid dataset passes all C3 checks", () => {
  const result = validateDataset(makeValidBundle());
  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, []);
});

test("Current State derives from latest approved snapshot", () => {
  const bundle = makeValidBundle();
  bundle.stateSnapshots.push({
    ...bundle.stateSnapshots[0],
    id: "sts-newer",
    state_code: "reviving",
    observed_at: "2026-07-11",
  });

  const result = deriveCurrentStates(bundle.stateSnapshots);
  assert.equal(result.issues.length, 0);
  assert.equal(result.states[0]?.stateCode, "reviving");
  assert.equal(result.states[0]?.snapshotId, "sts-newer");
});

test("invalid cross-record bundle reports structural failures", () => {
  const bundle = makeValidBundle();

  bundle.places.push({
    ...bundle.places[0],
    id: bundle.entities[0].id,
  });

  bundle.relations.push({
    id: "rel-broken",
    schema_version: "matsuri.v1",
    record_version: 1,
    source_entity_id: bundle.entities[0].id,
    relation_type: "held_at",
    target_entity_id: "ent-missing",
    evidence_ids: [],
    review_status: "approved",
  });

  bundle.evidence.push({
    id: "evd-broken-target",
    schema_version: "common.v1",
    record_version: 1,
    source_id: bundle.sources[0].id,
    target_type: "occurrence",
    target_id: "occ-missing",
    assertion_code: "broken",
    summary_ja: "broken target",
    review_status: "approved",
  });

  bundle.publicProjection = {
    entity: {
      id: bundle.entities[0].id,
      internal_confidence: 0.8,
    },
  };

  const result = validateDataset(bundle);
  const codes = new Set(result.errors.map((issue) => issue.code));

  assert.equal(result.ok, false);
  assert.equal(codes.has("DUPLICATE_RECORD_ID"), true);
  assert.equal(codes.has("RELATION_ENDPOINT_NOT_FOUND"), true);
  assert.equal(codes.has("EVIDENCE_TARGET_NOT_FOUND"), true);
  assert.equal(codes.has("PUBLIC_PROJECTION_PRIVATE_FIELD"), true);
});

test("ambiguous latest approved State Snapshots fail derivation", () => {
  const bundle = makeValidBundle();
  bundle.stateSnapshots.push({
    ...bundle.stateSnapshots[0],
    id: "sts-conflict",
    state_code: "suspended",
  });

  const result = validateDataset(bundle);
  assert.equal(
    result.errors.some((issue) => issue.code === "CURRENT_STATE_AMBIGUOUS"),
    true,
  );
});

test("approved images enforce rights gate and one-primary rule", () => {
  const bundle = makeValidBundle();
  const baseImage = {
    schema_version: "common.v1",
    record_version: 1,
    created_at: "2026-07-10T00:00:00Z",
    updated_at: "2026-07-10T00:00:00Z",
    entity_id: bundle.entities[0].id,
    public_url: "https://example.invalid/image.jpg",
    alt_text_ja: "行事の様子",
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
  };

  bundle.images.push(
    { ...baseImage, id: "img-one" },
    {
      ...baseImage,
      id: "img-two",
      display_order: 2,
      rights_review_status: "pending",
    },
  );

  const result = validateDataset(bundle);
  const codes = new Set(result.errors.map((issue) => issue.code));

  assert.equal(codes.has("MULTIPLE_PRIMARY_IMAGES"), true);
  assert.equal(codes.has("IMAGE_RIGHTS_NOT_APPROVED"), true);
});
