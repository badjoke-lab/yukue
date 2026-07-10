import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  buildPublicProjection,
  ProjectionBuildError,
} from "../dist/index.js";

const dataDirectory = new URL("../../../data/public/matsuri/d1/", import.meta.url);

function readJson(fileName) {
  const filePath = fileURLToPath(new URL(fileName, dataDirectory));
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadBundle() {
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

function detailById(projection, id) {
  return projection.html.entity_details.find((detail) => detail.entity.id === id);
}

function stateByEntity(projection, entityId) {
  return projection.json.current_states.find((state) => state.entity_id === entityId);
}

test("D2 projection builds HTML and JSON views from the D1 canonical sample", () => {
  const bundle = loadBundle();
  const projection = buildPublicProjection(bundle);

  assert.equal(projection.json.entities.length, bundle.entities.length);
  assert.equal(projection.html.entity_details.length, bundle.entities.length);
  assert.equal(stateByEntity(projection, "fst-suneori-amagoi")?.state_code, "active");
  assert.equal(stateByEntity(projection, "fst-nunokawa-hana-matsuri")?.state_code, "suspended");

  const suneori = detailById(projection, "fst-suneori-amagoi");
  assert.equal(suneori?.places.length, 2);
  assert.equal(suneori?.latest_occurrence?.id, "occ-suneori-2024");
  assert.equal(suneori?.occurrence_history.length, 1);

  const gion = detailById(projection, "fst-gion-matsuri");
  assert.equal(gion?.changes.length, 2);
  assert.equal(
    gion?.relations.some(
      (view) =>
        view.relation.relation_type === "includes_unit" &&
        view.target_entity.id === "unt-gion-takayama",
    ),
    true,
  );

  const hayachine = detailById(projection, "fpf-hayachine-kagura");
  assert.equal(
    hayachine?.relations.filter(
      (view) => view.relation.relation_type === "includes_performance",
    ).length,
    2,
  );

  const sada = detailById(projection, "fpf-sada-shin-noh");
  assert.equal(
    sada?.relations.some(
      (view) =>
        view.relation.relation_type === "dedicated_at" &&
        view.target_entity.id === "shr-sada-jinja",
    ),
    true,
  );

  const hana = detailById(projection, "fst-hana-matsuri-toei");
  assert.equal(hana?.entity.geographic_scope.scope_type, "distributed");
  assert.equal(projection.json.images.length, 0);
});

test("D2 projection rejects private fields that reach projected output", () => {
  const bundle = loadBundle();
  bundle.entities[0].internal_notes = "must not leave the projection boundary";

  assert.throws(
    () => buildPublicProjection(bundle),
    (error) => {
      assert.equal(error instanceof ProjectionBuildError, true);
      assert.equal(
        error.issues.some(
          (issue) => issue.code === "PUBLIC_PROJECTION_PRIVATE_FIELD",
        ),
        true,
      );
      return true;
    },
  );
});

test("D2 projection rejects approved records whose Evidence is removed by the approval boundary", () => {
  const bundle = loadBundle();
  const stateEvidence = bundle.evidence.find(
    (record) => record.id === "evd-suneori-state",
  );
  assert.ok(stateEvidence);
  stateEvidence.review_status = "candidate";

  assert.throws(
    () => buildPublicProjection(bundle),
    (error) => {
      assert.equal(error instanceof ProjectionBuildError, true);
      assert.equal(
        error.issues.some(
          (issue) =>
            issue.recordId === "sts-suneori-current" &&
            issue.path?.startsWith("basis_evidence_ids"),
        ),
        true,
      );
      return true;
    },
  );
});
