import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = fileURLToPath(new URL("../", import.meta.url));
const schema = JSON.parse(fs.readFileSync(path.join(appRoot, "data", "schema.json"), "utf8"));
const data = JSON.parse(fs.readFileSync(path.join(appRoot, "data", "canonical.json"), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(schema.site_id === "jinja" && data.site_id === "jinja", "Unexpected Jinja site_id");
assert(["implementation_only", "public_preview_noncanonical"].includes(data.publication_status), "Unexpected Jinja publication_status");
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
    for (const key of contract.required) assert(record[key] !== undefined && record[key] !== null && record[key] !== "", `${collection} ${record.id ?? "<unknown>"} missing ${key}`);
    assert(!ids.has(record.id), `Duplicate canonical id: ${record.id}`);
    ids.add(record.id);
    collectionIds.add(record.id);
    if (collection === "entities") {
      assert(record.review_status === "approved", `Entity ${record.id} is not reviewed`);
      assert(["A", "B", "C"].includes(record.tier), `Entity ${record.id} has invalid tier`);
    }
    if (collection === "states") assert(schema.continuity_states.includes(record.continuity_state), `State ${record.id} has invalid continuity_state`);
    if (collection === "events") assert(schema.event_types.includes(record.event_type), `Event ${record.id} has invalid event_type`);
  }
}

const entityIds = idsByCollection.get("entities") ?? new Set();
const sourceIds = idsByCollection.get("sources") ?? new Set();
const evidenceIds = idsByCollection.get("evidence") ?? new Set();
const targetCollections = {
  entity: idsByCollection.get("entities") ?? new Set(),
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

for (const relation of data.relations) {
  assert(entityIds.has(relation.source_entity_id), `Relation ${relation.id} references missing source Entity ${relation.source_entity_id}`);
  assert(Array.isArray(relation.evidence_ids) && relation.evidence_ids.length > 0, `Relation ${relation.id} requires direct Evidence`);
}

assert(data.entities.length === 0 || data.sources.length > 0, "Jinja entities require specialist Sources");
assert(data.entities.length === 0 || data.evidence.length > 0, "Jinja entities require specialist Evidence");
console.log(`Jinja canonical model verified: ${data.entities.length} entities, ${data.states.length} states, ${data.events.length} events, publication_status=${data.publication_status}.`);
