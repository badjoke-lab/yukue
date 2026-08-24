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
for (const [collection, records] of Object.entries(data)) {
  if (!Array.isArray(records)) continue;
  const contract = schema.collections[collection];
  if (!contract) continue;
  for (const record of records) {
    for (const key of contract.required) assert(record[key] !== undefined && record[key] !== null && record[key] !== "", `${collection} ${record.id ?? "<unknown>"} missing ${key}`);
    assert(!ids.has(record.id), `Duplicate canonical id: ${record.id}`);
    ids.add(record.id);
    if (collection === "entities") {
      assert(record.review_status === "approved", `Entity ${record.id} is not reviewed`);
      assert(["A", "B", "C"].includes(record.tier), `Entity ${record.id} has invalid tier`);
    }
    if (collection === "states") assert(schema.continuity_states.includes(record.continuity_state), `State ${record.id} has invalid continuity_state`);
    if (collection === "events") assert(schema.event_types.includes(record.event_type), `Event ${record.id} has invalid event_type`);
  }
}

assert(data.entities.length === 0 || data.sources.length > 0, "Jinja entities require specialist Sources");
assert(data.entities.length === 0 || data.evidence.length > 0, "Jinja entities require specialist Evidence");
console.log(`Jinja canonical model verified: ${data.entities.length} entities, ${data.states.length} states, ${data.events.length} events, publication_status=${data.publication_status}.`);
