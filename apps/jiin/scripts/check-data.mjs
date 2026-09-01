import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = fileURLToPath(new URL("../", import.meta.url));
const schema = JSON.parse(fs.readFileSync(path.join(appRoot, "data", "schema.json"), "utf8"));
const data = JSON.parse(fs.readFileSync(path.join(appRoot, "data", "canonical.json"), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(schema.site_id === "jiin" && data.site_id === "jiin", "Unexpected Jiin site_id");
assert(["implementation_only", "public_preview_noncanonical"].includes(data.publication_status), "Unexpected Jiin publication_status");
for (const name of Object.keys(schema.collections)) assert(Array.isArray(data[name]), `Missing canonical collection: ${name}`);

const ids = new Set();
const idsByCollection = new Map();
for (const [collection, records] of Object.entries(data)) {
  if (!Array.isArray(records)) continue;
  const contract = schema.collections[collection];
  if (!contract) continue;
  const collectionIds = new Set();
  idsByCollection.set(collection, collectionIds);
  for (const record of records) {
    for (const key of contract.required) {
      assert(record[key] !== undefined && record[key] !== null && record[key] !== "", `${collection} ${record.id ?? "<unknown>"} missing ${key}`);
    }
    assert(!ids.has(record.id), `Duplicate canonical id: ${record.id}`);
    ids.add(record.id);
    collectionIds.add(record.id);
    if (collection === "entities") {
      assert(record.review_status === "approved", `Entity ${record.id} is not reviewed`);
      assert(["A", "B", "C"].includes(record.tier), `Entity ${record.id} has invalid tier`);
      assert(Array.isArray(record.identity_evidence_ids) && record.identity_evidence_ids.length > 0, `Entity ${record.id} requires specialist identity Evidence`);
    }
    if (collection === "organizations") assert(schema.organization_types.includes(record.organization_type), `Organization ${record.id} has invalid organization_type`);
    if (collection === "facilities") assert(schema.facility_types.includes(record.facility_type), `Facility ${record.id} has invalid facility_type`);
    if (collection === "external_subjects") assert(schema.external_subject_types.includes(record.subject_type), `External subject ${record.id} has invalid subject_type`);
    if (collection === "states") assert(schema.continuity_states.includes(record.continuity_state), `State ${record.id} has invalid continuity_state`);
    if (collection === "events") assert(schema.event_types.includes(record.event_type), `Event ${record.id} has invalid event_type`);
    if (collection === "relations") assert(schema.relation_types.includes(record.relation_type), `Relation ${record.id} has invalid relation_type`);
  }
}

const entityIds = idsByCollection.get("entities") ?? new Set();
const organizationIds = idsByCollection.get("organizations") ?? new Set();
const facilityIds = idsByCollection.get("facilities") ?? new Set();
const externalSubjectIds = idsByCollection.get("external_subjects") ?? new Set();
const placeIds = idsByCollection.get("places") ?? new Set();
const sourceIds = idsByCollection.get("sources") ?? new Set();
const evidenceIds = idsByCollection.get("evidence") ?? new Set();
const targetCollections = {
  entity: entityIds,
  organization: organizationIds,
  facility: facilityIds,
  external_subject: externalSubjectIds,
  state: idsByCollection.get("states") ?? new Set(),
  event: idsByCollection.get("events") ?? new Set(),
  relation: idsByCollection.get("relations") ?? new Set(),
};

for (const evidence of data.evidence) {
  assert(sourceIds.has(evidence.source_id), `Evidence ${evidence.id} references missing Source ${evidence.source_id}`);
  const targets = targetCollections[evidence.target_type];
  assert(targets, `Evidence ${evidence.id} has unsupported target_type ${evidence.target_type}`);
  assert(targets.has(evidence.target_id), `Evidence ${evidence.id} references missing ${evidence.target_type} ${evidence.target_id}`);
}

for (const entity of data.entities) {
  assert(placeIds.has(entity.current_place_id), `Entity ${entity.id} references missing Place ${entity.current_place_id}`);
  for (const evidenceId of entity.identity_evidence_ids) {
    assert(evidenceIds.has(evidenceId), `Entity ${entity.id} references missing identity Evidence ${evidenceId}`);
    const evidence = data.evidence.find((item) => item.id === evidenceId);
    assert(evidence?.target_type === "entity" && evidence.target_id === entity.id, `Entity ${entity.id} identity Evidence ${evidenceId} must target that Entity directly`);
    const source = data.sources.find((item) => item.id === evidence.source_id);
    assert(source?.authority_scope === "temple_identity" || source?.authority_scope === "public_authority_temple_identity", `Entity ${entity.id} identity Evidence ${evidenceId} lacks Jiin-acceptable identity authority`);
  }
}

const stateEntityIds = new Set();
for (const state of data.states) {
  assert(entityIds.has(state.entity_id), `State ${state.id} references missing Entity ${state.entity_id}`);
  assert(!stateEntityIds.has(state.entity_id), `Entity ${state.entity_id} has more than one current State record`);
  stateEntityIds.add(state.entity_id);
  assert(Array.isArray(state.evidence_ids) && state.evidence_ids.length > 0, `State ${state.id} requires direct Evidence`);
  for (const evidenceId of state.evidence_ids) {
    assert(evidenceIds.has(evidenceId), `State ${state.id} references missing Evidence ${evidenceId}`);
    const evidence = data.evidence.find((item) => item.id === evidenceId);
    assert(evidence?.target_type === "state" && evidence.target_id === state.id, `State ${state.id} Evidence ${evidenceId} must target that State directly`);
  }
}

for (const event of data.events) {
  assert(entityIds.has(event.entity_id), `Event ${event.id} references missing Entity ${event.entity_id}`);
  assert(Array.isArray(event.evidence_ids) && event.evidence_ids.length > 0, `Event ${event.id} requires direct Evidence`);
}

const relationTargets = {
  entity: entityIds,
  organization: organizationIds,
  facility: facilityIds,
  external_subject: externalSubjectIds,
};
for (const relation of data.relations) {
  assert(entityIds.has(relation.source_entity_id), `Relation ${relation.id} references missing source Entity ${relation.source_entity_id}`);
  const targets = relationTargets[relation.target_kind];
  assert(targets, `Relation ${relation.id} has unsupported target_kind ${relation.target_kind}`);
  assert(targets.has(relation.target_id), `Relation ${relation.id} references missing ${relation.target_kind} ${relation.target_id}`);
  assert(Array.isArray(relation.evidence_ids) && relation.evidence_ids.length > 0, `Relation ${relation.id} requires direct Evidence`);
}

for (const facility of data.facilities) {
  if (facility.place_id) assert(placeIds.has(facility.place_id), `Facility ${facility.id} references missing Place ${facility.place_id}`);
}

console.log(`Jiin canonical model verified: ${data.entities.length} temples, ${data.states.length} states, ${data.events.length} events, ${data.relations.length} relations, publication_status=${data.publication_status}.`);
