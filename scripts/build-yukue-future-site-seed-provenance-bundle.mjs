import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const artifactDirectory = path.resolve(
  repositoryRoot,
  process.env.YUKUE_SEED_ARTIFACT_DIR ?? ".artifacts/yukue-future-site-seeds",
);
const inventoryPath = path.join(artifactDirectory, "inventory.json");
const outputPath = path.join(artifactDirectory, "provenance.json");

assert(
  fs.existsSync(inventoryPath),
  `Future-site seed inventory is missing: ${inventoryPath}`,
);

const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
assert.equal(inventory.format_version, 1, "Unexpected seed inventory format_version.");
assert.equal(
  inventory.status,
  "candidate-seed-inventory-only",
  "Seed inventory is not in the accepted candidate-only state.",
);
assert.equal(
  inventory.boundaries?.activates_future_site,
  false,
  "Seed inventory must not activate a future site.",
);

const dataset = loadMatsuriDataset();
const entitiesById = new Map(dataset.entities.map((record) => [record.id, record]));
const placesById = new Map(dataset.places.map((record) => [record.id, record]));
const sourcesById = new Map(dataset.sources.map((record) => [record.id, record]));
const evidenceById = new Map(dataset.evidence.map((record) => [record.id, record]));
const relationsById = new Map(dataset.relations.map((record) => [record.id, record]));
const snapshotsById = new Map(dataset.stateSnapshots.map((record) => [record.id, record]));

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((left, right) =>
    String(left).localeCompare(String(right), "ja"),
  );
}

function preferredName(entity) {
  return (
    entity.names?.find((name) => name.is_preferred)?.value ??
    entity.names?.[0]?.value ??
    entity.id
  );
}

function selectedEntityRecord(entity) {
  return {
    id: entity.id,
    schema_version: entity.schema_version,
    record_version: entity.record_version,
    created_at: entity.created_at,
    updated_at: entity.updated_at,
    slug: entity.slug,
    entity_type: entity.entity_type,
    home_surface: entity.home_surface,
    tradition_scope: entity.tradition_scope,
    names: entity.names ?? [],
    summary_ja: entity.summary_ja ?? null,
    geographic_scope: entity.geographic_scope ?? null,
    primary_place_id: entity.primary_place_id ?? null,
    default_place_ids: entity.default_place_ids ?? [],
    external_links: entity.external_links ?? [],
    record_lifecycle: entity.record_lifecycle ?? null,
  };
}

const seedEntities = new Map();
const matsuriContextEntities = new Map();
const places = new Map();
const sources = new Map();
const evidence = new Map();
const relations = new Map();
const stateSnapshots = new Map();
const seedHandoffs = [];

function includeSource(sourceId, reason) {
  const source = sourcesById.get(sourceId);
  assert(source, `${reason} Source ${sourceId} is missing.`);
  sources.set(source.id, source);
}

function includeEvidence(evidenceId, expectedTargetType, expectedTargetId, reason) {
  const record = evidenceById.get(evidenceId);
  assert(record, `${reason} Evidence ${evidenceId} is missing.`);
  assert.equal(record.review_status, "approved", `${reason} Evidence ${evidenceId} is not approved.`);
  assert.equal(
    record.target_type,
    expectedTargetType,
    `${reason} Evidence ${evidenceId} target_type is ${record.target_type}.`,
  );
  assert.equal(
    record.target_id,
    expectedTargetId,
    `${reason} Evidence ${evidenceId} targets ${record.target_id}.`,
  );
  evidence.set(record.id, record);
  includeSource(record.source_id, `${reason} Evidence ${evidenceId}`);
  return record;
}

const inventorySeeds = inventory.sites.flatMap((site) => site.seeds ?? []);
assert.equal(
  inventorySeeds.length,
  inventory.totals.seeds,
  "Seed inventory total does not match site records.",
);

for (const seed of inventorySeeds) {
  const seedEntity = entitiesById.get(seed.entity_id);
  assert(seedEntity, `Seed Entity ${seed.entity_id} is missing.`);
  assert.equal(seedEntity.entity_type, seed.entity_type, `Seed ${seed.entity_id} entity_type drifted.`);
  seedEntities.set(seedEntity.id, selectedEntityRecord(seedEntity));

  const placeIds = uniqueSorted(seed.place_ids ?? []);
  assert(placeIds.length > 0, `Seed ${seed.entity_id} has no Place handoff.`);
  for (const placeId of placeIds) {
    const place = placesById.get(placeId);
    assert(place, `Seed ${seed.entity_id} Place ${placeId} is missing.`);
    places.set(place.id, place);
    for (const sourceId of place.source_ids ?? []) {
      includeSource(sourceId, `Place ${place.id}`);
    }
  }

  for (const name of seedEntity.names ?? []) {
    for (const sourceId of name.source_ids ?? []) {
      includeSource(sourceId, `Seed Entity ${seedEntity.id} name`);
    }
  }

  const identityEvidenceIds = uniqueSorted(seed.identity_evidence_ids ?? []);
  const identitySourceIds = [];
  for (const evidenceId of identityEvidenceIds) {
    const record = includeEvidence(
      evidenceId,
      "entity_identity",
      seedEntity.id,
      `Seed ${seedEntity.id} identity`,
    );
    identitySourceIds.push(record.source_id);
  }
  assert.deepEqual(
    uniqueSorted(identitySourceIds),
    uniqueSorted(seed.identity_source_ids ?? []),
    `Seed ${seedEntity.id} identity Source handoff drifted.`,
  );

  const snapshotIds = uniqueSorted(seed.approved_state_snapshot_ids ?? []);
  const stateEvidenceIds = [];
  for (const snapshotId of snapshotIds) {
    const snapshot = snapshotsById.get(snapshotId);
    assert(snapshot, `Seed ${seedEntity.id} State Snapshot ${snapshotId} is missing.`);
    assert.equal(snapshot.entity_id, seedEntity.id, `State Snapshot ${snapshotId} belongs to ${snapshot.entity_id}.`);
    assert.equal(snapshot.review_status, "approved", `State Snapshot ${snapshotId} is not approved.`);
    stateSnapshots.set(snapshot.id, snapshot);
    for (const evidenceId of snapshot.basis_evidence_ids ?? []) {
      includeEvidence(evidenceId, "state_snapshot", snapshot.id, `State Snapshot ${snapshot.id}`);
      stateEvidenceIds.push(evidenceId);
    }
  }

  const relationIds = [];
  const relationEvidenceIds = [];
  const matsuriEntityIds = [];
  for (const context of seed.relation_contexts ?? []) {
    const relation = relationsById.get(context.relation_id);
    assert(relation, `Seed ${seedEntity.id} Relation ${context.relation_id} is missing.`);
    assert.equal(relation.review_status, "approved", `Relation ${relation.id} is not approved.`);
    assert(
      relation.source_entity_id === seedEntity.id || relation.target_entity_id === seedEntity.id,
      `Relation ${relation.id} does not connect seed ${seedEntity.id}.`,
    );
    relations.set(relation.id, relation);
    relationIds.push(relation.id);

    const matsuriEntity = entitiesById.get(context.matsuri_entity_id);
    assert(matsuriEntity, `Relation ${relation.id} Matsuri Entity ${context.matsuri_entity_id} is missing.`);
    assert.equal(
      preferredName(matsuriEntity),
      context.matsuri_name_ja,
      `Relation ${relation.id} Matsuri Entity name drifted.`,
    );
    matsuriContextEntities.set(matsuriEntity.id, {
      id: matsuriEntity.id,
      entity_type: matsuriEntity.entity_type,
      name_ja: preferredName(matsuriEntity),
    });
    matsuriEntityIds.push(matsuriEntity.id);

    for (const evidenceId of context.evidence_ids ?? []) {
      includeEvidence(evidenceId, "relation", relation.id, `Relation ${relation.id}`);
      relationEvidenceIds.push(evidenceId);
    }
  }

  assert.deepEqual(
    uniqueSorted(relationEvidenceIds),
    uniqueSorted(seed.relation_evidence_ids ?? []),
    `Seed ${seedEntity.id} Relation Evidence handoff drifted.`,
  );

  seedHandoffs.push({
    entity_id: seedEntity.id,
    candidate_site_id: seed.candidate_site_id,
    entity_type: seedEntity.entity_type,
    name_ja: preferredName(seedEntity),
    place_ids: placeIds,
    identity_evidence_ids: identityEvidenceIds,
    identity_source_ids: uniqueSorted(identitySourceIds),
    approved_state_snapshot_ids: snapshotIds,
    state_evidence_ids: uniqueSorted(stateEvidenceIds),
    relation_ids: uniqueSorted(relationIds),
    relation_evidence_ids: uniqueSorted(relationEvidenceIds),
    matsuri_context_entity_ids: uniqueSorted(matsuriEntityIds),
    target_site_review_required: true,
  });
}

seedHandoffs.sort((left, right) =>
  `${left.candidate_site_id}:${left.name_ja}:${left.entity_id}`.localeCompare(
    `${right.candidate_site_id}:${right.name_ja}:${right.entity_id}`,
    "ja",
  ),
);

function sortedRecords(recordMap) {
  return [...recordMap.values()].sort((left, right) => left.id.localeCompare(right.id));
}

const bundle = {
  format_version: 1,
  generated_at: new Date().toISOString(),
  source_inventory_generated_at: inventory.generated_at,
  source_site_id: "matsuri",
  status: "candidate-provenance-bundle-only",
  totals: {
    seed_handoffs: seedHandoffs.length,
    seed_entities: seedEntities.size,
    matsuri_context_entities: matsuriContextEntities.size,
    places: places.size,
    sources: sources.size,
    evidence: evidence.size,
    relations: relations.size,
    state_snapshots: stateSnapshots.size,
  },
  seed_handoffs: seedHandoffs,
  records: {
    seed_entities: sortedRecords(seedEntities),
    matsuri_context_entities: sortedRecords(matsuriContextEntities),
    places: sortedRecords(places),
    sources: sortedRecords(sources),
    evidence: sortedRecords(evidence),
    relations: sortedRecords(relations),
    state_snapshots: sortedRecords(stateSnapshots),
  },
  boundaries: {
    publication_ready_claimed: false,
    future_site_activated: false,
    candidate_priority_assigned: false,
    missing_data_inferred: false,
    private_notes_included: false,
    uses_only_approved_public_records: true,
  },
};

assert.equal(bundle.totals.seed_handoffs, inventory.totals.seeds, "Provenance seed total drifted.");
assert.equal(bundle.totals.seed_entities, inventory.totals.seeds, "Provenance seed Entity total drifted.");
assert.equal(
  bundle.seed_handoffs.filter((seed) => seed.target_site_review_required).length,
  bundle.totals.seed_handoffs,
  "Every provenance handoff must require target-site review.",
);

fs.writeFileSync(outputPath, `${JSON.stringify(bundle, null, 2)}\n`, "utf8");

console.log(
  `Yukue future-site seed provenance bundle passed: ${bundle.totals.seed_handoffs} handoff(s), ${bundle.totals.sources} Source record(s), ${bundle.totals.evidence} Evidence record(s), ${bundle.totals.places} Place record(s), ${bundle.totals.relations} Relation record(s), ${bundle.totals.state_snapshots} State Snapshot record(s).`,
);
