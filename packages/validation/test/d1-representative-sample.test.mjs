import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { validateDataset } from "../dist/index.js";

const dataDirectory = new URL("../../../data/public/matsuri/d1/", import.meta.url);

function readJson(fileName) {
  const filePath = fileURLToPath(new URL(fileName, dataDirectory));
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadRepresentativeBundle() {
  const records = readJson("records.json");

  return {
    entities: readJson("entities.json"),
    places: readJson("places.json"),
    stateSnapshots: readJson("state-snapshots.json"),
    changeEvents: records.changeEvents,
    occurrences: records.occurrences,
    occurrenceSeries: records.occurrenceSeries,
    recurrencePatterns: records.recurrencePatterns,
    relations: records.relations,
    designations: records.designations,
    sources: records.sources,
    evidence: readJson("evidence.json"),
    images: records.images,
  };
}

function byId(records, id) {
  return records.find((record) => record.id === id);
}

test("D1 representative canonical sample passes C3 validation", () => {
  const result = validateDataset(loadRepresentativeBundle());
  assert.equal(result.ok, true, JSON.stringify(result.errors, null, 2));
  assert.deepEqual(result.errors, []);
});

test("D1 sample preserves the intended structural cases", () => {
  const bundle = loadRepresentativeBundle();

  const suneori = byId(bundle.entities, "fst-suneori-amagoi");
  assert.equal(suneori?.geographic_scope.scope_type, "route_based");
  assert.equal(suneori?.default_place_ids.length, 2);

  const soma = byId(bundle.entities, "fst-soma-nomaoi");
  assert.equal(soma?.tradition_scope, "umbrella");
  assert.equal(soma?.geographic_scope.scope_type, "multi_area");
  assert.equal(
    byId(bundle.occurrences, "occ-soma-2026-schedule")?.series_id,
    "ser-soma-nomaoi-annual",
  );

  assert.ok(
    bundle.relations.some(
      (relation) =>
        relation.source_entity_id === "fst-gion-matsuri" &&
        relation.relation_type === "includes_unit" &&
        relation.target_entity_id === "unt-gion-takayama",
    ),
  );
  assert.equal(
    bundle.changeEvents.filter((event) =>
      event.subject_entity_ids.includes("fst-gion-matsuri"),
    ).length,
    2,
  );

  const hayachine = byId(bundle.entities, "fpf-hayachine-kagura");
  assert.equal(hayachine?.tradition_scope, "collective");
  assert.equal(
    bundle.relations.filter(
      (relation) =>
        relation.source_entity_id === "fpf-hayachine-kagura" &&
        relation.relation_type === "includes_performance",
    ).length,
    2,
  );

  assert.ok(
    bundle.relations.some(
      (relation) =>
        relation.source_entity_id === "fpf-sada-shin-noh" &&
        relation.relation_type === "dedicated_at" &&
        relation.target_entity_id === "shr-sada-jinja",
    ),
  );

  const hana = byId(bundle.entities, "fst-hana-matsuri-toei");
  assert.equal(hana?.geographic_scope.scope_type, "distributed");
  assert.equal(
    byId(bundle.stateSnapshots, "sts-nunokawa-current")?.state_code,
    "suspended",
  );

  assert.equal(bundle.images.length, 0);
});
