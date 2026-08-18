import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const builtMode = process.argv.includes("--built");
const config = JSON.parse(
  fs.readFileSync(path.join(root, "config", "matsuri-tier-a-publication-wave-001.json"), "utf8"),
);
const bundle = JSON.parse(
  fs.readFileSync(path.join(root, config.canonical_bundle), "utf8"),
);
const dataset = loadMatsuriDataset();
const failures = [];

const selected = config.selected_entities ?? [];
if (config.schema_version !== "matsuri.tier-a-publication-wave.v1") failures.push("unexpected_schema_version");
if (config.phase !== "NCS-06") failures.push("unexpected_phase");
if (!new Set(["staged", "release_ready", "published_verified"]).has(config.status)) failures.push("invalid_status");
if (selected.length !== 3) failures.push(`expected_3_selected_entities_got_${selected.length}`);
if (new Set(selected.map((item) => item.id)).size !== selected.length) failures.push("duplicate_selected_entity_ids");

const entityById = new Map(dataset.entities.map((record) => [record.id, record]));
const sourceById = new Map(dataset.sources.map((record) => [record.id, record]));
const evidenceById = new Map(dataset.evidence.map((record) => [record.id, record]));
const rawEntityById = new Map((bundle.entities ?? []).map((record) => [record.id, record]));

for (const item of selected) {
  const entity = entityById.get(item.id);
  const rawEntity = rawEntityById.get(item.id);
  const source = sourceById.get(item.source_id);
  const evidence = evidenceById.get(item.evidence_id);

  if (!entity || !rawEntity) {
    failures.push(`${item.id}:entity_missing`);
    continue;
  }
  if (entity.entity_type !== item.entity_type) failures.push(`${item.id}:entity_type_mismatch`);
  if (entity.slug !== item.slug) failures.push(`${item.id}:slug_mismatch`);
  if (rawEntity.coverage_tier !== "tier_a_index") failures.push(`${item.id}:tier_a_metadata_missing`);

  const areas = entity.geographic_scope?.areas ?? [];
  if (!areas.some((area) => area.prefecture_name_ja || area.prefecture_code)) failures.push(`${item.id}:prefecture_missing`);
  if (!areas.some((area) => area.municipality_name_ja || area.municipality_code)) failures.push(`${item.id}:municipality_missing`);

  const preferred = entity.names?.find((name) => name.is_preferred) ?? entity.names?.[0];
  if (!preferred?.source_ids?.includes(item.source_id)) failures.push(`${item.id}:preferred_name_source_missing`);

  if (!source) failures.push(`${item.id}:source_missing`);
  else {
    if (source.publisher !== "文化庁") failures.push(`${item.id}:source_publisher_mismatch`);
    if (source.source_type !== "public_authority") failures.push(`${item.id}:source_type_mismatch`);
    if (!/^https:\/\/kunishitei\.bunka\.go\.jp\//u.test(source.url ?? "")) failures.push(`${item.id}:source_url_not_agency_database`);
    if (!/^\d{4}-\d{2}-\d{2}$/u.test(source.accessed_at ?? "")) failures.push(`${item.id}:source_access_date_missing`);
  }

  if (!evidence) failures.push(`${item.id}:identity_evidence_missing`);
  else {
    if (evidence.source_id !== item.source_id) failures.push(`${item.id}:identity_evidence_source_mismatch`);
    if (evidence.target_type !== "entity_identity" || evidence.target_id !== item.id) failures.push(`${item.id}:identity_evidence_target_mismatch`);
    if (evidence.review_status !== "approved") failures.push(`${item.id}:identity_evidence_not_approved`);
  }

  if (dataset.stateSnapshots.some((record) => record.entity_id === item.id)) failures.push(`${item.id}:unexpected_current_state`);
  if (dataset.occurrences.some((record) => record.subject_entity_id === item.id)) failures.push(`${item.id}:unexpected_occurrence`);
  if (dataset.changeEvents.some((record) => (record.subject_entity_ids ?? []).includes(item.id))) failures.push(`${item.id}:unexpected_change_event`);
  if (dataset.relations.some((record) => JSON.stringify(record).includes(item.id))) failures.push(`${item.id}:unexpected_relation`);
  if ((entity.default_place_ids ?? []).length > 0 || entity.primary_place_id) failures.push(`${item.id}:unexpected_place_link`);

  if (config.status === "staged") {
    if (rawEntity.tier_a_published_at !== undefined && rawEntity.tier_a_published_at !== null) failures.push(`${item.id}:staged_publication_timestamp_present`);
  } else {
    if (!config.publication_timestamp) failures.push("publication_timestamp_missing");
    if (rawEntity.tier_a_published_at !== config.publication_timestamp) failures.push(`${item.id}:publication_timestamp_mismatch`);
  }
}

const specialist = dataset.entities.filter((entity) => ["festival", "folk_performance"].includes(entity.entity_type));
if (dataset.entities.length !== config.expected_repository_counts.all_entities) failures.push(`all_entities_${dataset.entities.length}`);
if (specialist.length !== config.expected_repository_counts.specialist_primary_entities) failures.push(`specialist_primary_${specialist.length}`);

if (builtMode) {
  const dist = path.join(root, "apps", "matsuri", "dist");
  const publicFeedPath = path.join(dist, "data", "entities.json");
  const sitemapPath = path.join(dist, "sitemap.xml");
  if (!fs.existsSync(publicFeedPath)) failures.push("built_entity_feed_missing");
  if (!fs.existsSync(sitemapPath)) failures.push("built_sitemap_missing");
  if (fs.existsSync(publicFeedPath)) {
    const publicFeed = JSON.parse(fs.readFileSync(publicFeedPath, "utf8"));
    for (const item of selected) {
      const publicEntity = publicFeed.records?.find((record) => record.id === item.id);
      if (!publicEntity) failures.push(`${item.id}:built_public_json_missing`);
      else if (publicEntity.coverage_tier !== "tier_a_index") failures.push(`${item.id}:built_public_tier_metadata_missing`);
    }
  }
  const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
  for (const item of selected) {
    const htmlPath = path.join(dist, item.expected_route.replace(/^\//u, ""), "index.html");
    if (!fs.existsSync(htmlPath)) failures.push(`${item.id}:detail_html_missing`);
    if (!sitemap.includes(item.expected_route)) failures.push(`${item.id}:sitemap_route_missing`);
  }
}

if (config.boundaries?.matsuri_only !== true || config.boundaries?.future_sites_activated !== false) failures.push("future_site_boundary_invalid");

if (failures.length > 0) {
  throw new Error(`Matsuri NCS-06 publication wave failed:\n- ${failures.join("\n- ")}`);
}

console.log(`Matsuri NCS-06 wave OK: ${selected.length} selected, ${dataset.entities.length} entities, ${specialist.length} specialist primary, status=${config.status}${builtMode ? ", built outputs verified" : ""}.`);
