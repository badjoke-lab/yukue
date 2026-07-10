import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { buildPublicProjection } from "@badjoke-lab/yukue-observation-core";
import {
  baselineFileInventory,
  generateMachineReadableBaseline,
} from "../dist/index.js";

const dataDirectory = new URL("../../../data/public/matsuri/d1/", import.meta.url);

function readJson(fileName) {
  const filePath = fileURLToPath(new URL(fileName, dataDirectory));
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadProjection() {
  const records = readJson("records.json");
  return buildPublicProjection({
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
  });
}

const config = {
  projectId: "yukue-series",
  siteId: "matsuri",
  siteName: "祭のゆくえ",
  datasetType: "cultural-observation-registry",
  datasetVersion: "2026-07-10.d1",
  schemaVersion: "matsuri.v1",
  siteOrigin: "https://matsuri.example",
  sitemapPaths: [
    "/",
    "/festivals/",
    "/festivals/suneori-amagoi/",
    "/performances/",
    "/regions/",
    "/changes/",
    "/search/",
  ],
};

function byPath(files, path) {
  const file = files.find((candidate) => candidate.path === path);
  assert.ok(file, `missing generated file: ${path}`);
  return file;
}

function assertForbiddenKeysAbsent(value, forbiddenKeys, path = "$root") {
  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      assertForbiddenKeysAbsent(item, forbiddenKeys, `${path}[${index}]`),
    );
    return;
  }

  if (!value || typeof value !== "object") return;

  for (const [key, child] of Object.entries(value)) {
    assert.equal(
      forbiddenKeys.has(key),
      false,
      `forbidden key ${key} found at ${path}`,
    );
    assertForbiddenKeysAbsent(child, forbiddenKeys, `${path}.${key}`);
  }
}

test("baseline generator emits the exact required E3 file inventory", () => {
  const files = generateMachineReadableBaseline(loadProjection(), config);
  assert.deepEqual(
    files.map((file) => file.path).sort(),
    [...baselineFileInventory].sort(),
  );
  assert.equal(files.length, 9);
});

test("manifest counts and safety markers match Public Projection", () => {
  const projection = loadProjection();
  const files = generateMachineReadableBaseline(projection, config);
  const manifest = JSON.parse(byPath(files, "/data/manifest.json").content);

  assert.deepEqual(manifest.record_counts, {
    entities: projection.json.entities.length,
    events: projection.json.change_events.length,
    relations: projection.json.relations.length,
    occurrences: projection.json.occurrences.length,
  });
  assert.equal(manifest.data_safety.canonical_only, true);
  assert.equal(manifest.data_safety.approved_projection_only, true);
  assert.deepEqual(manifest.files, [...baselineFileInventory]);
  assert.equal(manifest.site_origin, "https://matsuri.example");
});

test("entity feed preserves projected Current State and public record counts", () => {
  const projection = loadProjection();
  const files = generateMachineReadableBaseline(projection, config);
  const feed = JSON.parse(byPath(files, "/data/entities.json").content);

  assert.equal(feed.record_count, projection.json.entities.length);
  const suneori = feed.records.find((record) => record.id === "fst-suneori-amagoi");
  assert.equal(suneori.current_state.state_code, "active");
  const nunokawa = feed.records.find(
    (record) => record.id === "fst-nunokawa-hana-matsuri",
  );
  assert.equal(nunokawa.current_state.state_code, "suspended");
});

test("generated JSON feeds contain no forbidden internal object keys", () => {
  const files = generateMachineReadableBaseline(loadProjection(), config);
  const forbiddenKeys = new Set([
    "internal_notes",
    "review_notes",
    "internal_confidence",
    "source_conflicts",
  ]);

  for (const path of [
    "/version.json",
    "/data/manifest.json",
    "/data/entities.json",
    "/data/events.json",
    "/data/relations.json",
    "/data/occurrences.json",
  ]) {
    const value = JSON.parse(byPath(files, path).content);
    assertForbiddenKeysAbsent(value, forbiddenKeys);
  }
});

test("discovery files explain dataset limits and sitemap honors configured origin", () => {
  const files = generateMachineReadableBaseline(loadProjection(), config);
  const llms = byPath(files, "/llms.txt").content;
  const ai = byPath(files, "/ai.txt").content;
  const sitemap = byPath(files, "/sitemap.xml").content;

  assert.match(llms, /人気ランキングではありません/);
  assert.match(llms, /Public Projection/);
  assert.match(ai, /public_manifest: \/data\/manifest\.json/);
  assert.match(
    sitemap,
    /<loc>https:\/\/matsuri\.example\/festivals\/<\/loc>/,
  );
});

test("development sitemap uses public paths when no canonical origin is configured", () => {
  const projection = loadProjection();
  const files = generateMachineReadableBaseline(projection, {
    ...config,
    siteOrigin: undefined,
  });
  const sitemap = byPath(files, "/sitemap.xml").content;

  assert.match(sitemap, /<loc>\/festivals\/<\/loc>/);
  assert.doesNotMatch(sitemap, /matsuri\.example/);
});
