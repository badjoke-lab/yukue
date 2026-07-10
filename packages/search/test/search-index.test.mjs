import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { buildPublicProjection } from "@badjoke-lab/yukue-observation-core";
import {
  buildSearchFilterOptions,
  buildSearchIndexRecords,
} from "../dist/index.js";

const dataDirectory = new URL("../../../data/public/matsuri/d1/", import.meta.url);

function readJson(fileName) {
  const filePath = fileURLToPath(new URL(fileName, dataDirectory));
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadProjection() {
  const records = readJson("records.json");
  const bundle = {
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
  return buildPublicProjection(bundle);
}

test("search records cover browsable Matsuri entities with structured filters", () => {
  const projection = loadProjection();
  const records = buildSearchIndexRecords(projection);

  assert.equal(records.length, 10);
  assert.equal(
    records.some((record) => record.filters.entity_type[0] === "organization"),
    false,
  );

  const suneori = records.find((record) => record.id === "fst-suneori-amagoi");
  assert.ok(suneori);
  assert.equal(suneori.meta.title, "脚折雨乞");
  assert.deepEqual(suneori.filters.entity_type, ["festival"]);
  assert.deepEqual(suneori.filters.prefecture, ["11"]);
  assert.deepEqual(suneori.filters.current_state, ["active"]);
  assert.match(suneori.content, /鶴ヶ島市/);

  const nunokawa = records.find(
    (record) => record.id === "fst-nunokawa-hana-matsuri",
  );
  assert.deepEqual(nunokawa?.filters.current_state, ["suspended"]);

  const takayama = records.find((record) => record.id === "unt-gion-takayama");
  assert.deepEqual(takayama?.filters.current_state, []);
});

test("search filter options expose public Japanese labels", () => {
  const projection = loadProjection();
  const options = buildSearchFilterOptions(projection);

  assert.equal(
    options.entityTypes.some(
      (option) => option.value === "folk_performance" && option.label === "民俗芸能",
    ),
    true,
  );
  assert.equal(
    options.prefectures.some(
      (option) => option.value === "11" && option.label === "埼玉県",
    ),
    true,
  );
  assert.equal(
    options.currentStates.some(
      (option) => option.value === "suspended" && option.label === "休止中",
    ),
    true,
  );
});
