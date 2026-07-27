import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const args = process.argv.slice(2);
const outputIndex = args.indexOf("--output");
const outputRoot =
  outputIndex >= 0 && args[outputIndex + 1]
    ? path.resolve(repositoryRoot, args[outputIndex + 1])
    : path.join(repositoryRoot, "artifacts", "matsuri-corpus-coverage");

const prefectures = [
  ["01", "北海道"], ["02", "青森県"], ["03", "岩手県"], ["04", "宮城県"],
  ["05", "秋田県"], ["06", "山形県"], ["07", "福島県"], ["08", "茨城県"],
  ["09", "栃木県"], ["10", "群馬県"], ["11", "埼玉県"], ["12", "千葉県"],
  ["13", "東京都"], ["14", "神奈川県"], ["15", "新潟県"], ["16", "富山県"],
  ["17", "石川県"], ["18", "福井県"], ["19", "山梨県"], ["20", "長野県"],
  ["21", "岐阜県"], ["22", "静岡県"], ["23", "愛知県"], ["24", "三重県"],
  ["25", "滋賀県"], ["26", "京都府"], ["27", "大阪府"], ["28", "兵庫県"],
  ["29", "奈良県"], ["30", "和歌山県"], ["31", "鳥取県"], ["32", "島根県"],
  ["33", "岡山県"], ["34", "広島県"], ["35", "山口県"], ["36", "徳島県"],
  ["37", "香川県"], ["38", "愛媛県"], ["39", "高知県"], ["40", "福岡県"],
  ["41", "佐賀県"], ["42", "長崎県"], ["43", "熊本県"], ["44", "大分県"],
  ["45", "宮崎県"], ["46", "鹿児島県"], ["47", "沖縄県"],
].map(([code, name]) => ({ code, name }));

function increment(map, key, amount = 1) {
  map.set(key, (map.get(key) ?? 0) + amount);
}

function sortedObject(map) {
  return Object.fromEntries([...map.entries()].sort(([a], [b]) => a.localeCompare(b, "ja")));
}

function entityName(entity) {
  return (
    entity.names?.find((name) => name.is_preferred)?.value ??
    entity.names?.[0]?.value ??
    entity.id
  );
}

function latestApprovedStateByEntity(stateSnapshots) {
  const latest = new Map();
  for (const snapshot of stateSnapshots) {
    if (snapshot.review_status !== "approved") continue;
    const current = latest.get(snapshot.entity_id);
    if (!current || String(snapshot.observed_at).localeCompare(String(current.observed_at)) > 0) {
      latest.set(snapshot.entity_id, snapshot);
    }
  }
  return latest;
}

const dataset = loadMatsuriDataset();
const entitiesById = new Map(dataset.entities.map((entity) => [entity.id, entity]));
const latestState = latestApprovedStateByEntity(dataset.stateSnapshots);

const entityTypeCounts = new Map();
const prefectureEntityCounts = new Map();
const prefecturePrimaryCounts = new Map();
const stateCounts = new Map();
const occurrenceCounts = new Map();
const changeCounts = new Map();
const relationCounts = new Map();
const designationCounts = new Map();

for (const entity of dataset.entities) {
  increment(entityTypeCounts, entity.entity_type);
  const seenCodes = new Set();
  for (const area of entity.geographic_scope?.areas ?? []) {
    if (!area.prefecture_code || seenCodes.has(area.prefecture_code)) continue;
    seenCodes.add(area.prefecture_code);
    increment(prefectureEntityCounts, area.prefecture_code);
    if (["festival", "tradition_unit", "folk_performance"].includes(entity.entity_type)) {
      increment(prefecturePrimaryCounts, area.prefecture_code);
    }
  }
  const state = latestState.get(entity.id);
  if (state) increment(stateCounts, state.state_code);
}

for (const occurrence of dataset.occurrences) {
  increment(occurrenceCounts, occurrence.subject_entity_id);
}
for (const event of dataset.changeEvents) {
  for (const entityId of event.subject_entity_ids ?? []) increment(changeCounts, entityId);
}
for (const relation of dataset.relations) {
  increment(relationCounts, relation.source_entity_id);
  increment(relationCounts, relation.target_entity_id);
}
for (const designation of dataset.designations) {
  const entityId = designation.subject_entity_id ?? designation.entity_id;
  if (entityId) increment(designationCounts, entityId);
}

const primaryEntityTypes = new Set(["festival", "tradition_unit", "folk_performance"]);
const entityCoverage = dataset.entities
  .filter((entity) => primaryEntityTypes.has(entity.entity_type))
  .map((entity) => {
    const occurrences = occurrenceCounts.get(entity.id) ?? 0;
    const changes = changeCounts.get(entity.id) ?? 0;
    const relations = relationCounts.get(entity.id) ?? 0;
    const designations = designationCounts.get(entity.id) ?? 0;
    const externalLinks = entity.external_links?.length ?? 0;
    const state = latestState.get(entity.id)?.state_code ?? null;
    const score =
      Math.min(occurrences, 3) * 3 +
      Math.min(changes, 3) * 2 +
      Math.min(relations, 3) * 2 +
      Math.min(designations, 1) +
      Math.min(externalLinks, 1) +
      (state ? 1 : 0);
    return {
      id: entity.id,
      slug: entity.slug,
      name: entityName(entity),
      entity_type: entity.entity_type,
      prefectures: [...new Set((entity.geographic_scope?.areas ?? []).map((area) => area.prefecture_name_ja).filter(Boolean))],
      state,
      occurrences,
      changes,
      relations,
      designations,
      external_links: externalLinks,
      density_score: score,
    };
  })
  .sort((a, b) => a.density_score - b.density_score || a.name.localeCompare(b.name, "ja"));

const prefectureCoverage = prefectures.map((prefecture) => ({
  prefecture_code: prefecture.code,
  prefecture_name_ja: prefecture.name,
  all_entities: prefectureEntityCounts.get(prefecture.code) ?? 0,
  primary_entities: prefecturePrimaryCounts.get(prefecture.code) ?? 0,
}));

const missingPrefectures = prefectureCoverage.filter((item) => item.primary_entities === 0);
const thinPrefectures = prefectureCoverage.filter(
  (item) => item.primary_entities > 0 && item.primary_entities <= 1,
);
const sparseEntities = entityCoverage.filter(
  (item) => item.occurrences === 0 || item.changes === 0 || item.relations === 0,
);

const report = {
  schema_version: "matsuri.corpus-coverage.v1",
  generated_at: new Date().toISOString(),
  counts: {
    entities: dataset.entities.length,
    places: dataset.places.length,
    state_snapshots: dataset.stateSnapshots.length,
    change_events: dataset.changeEvents.length,
    occurrences: dataset.occurrences.length,
    occurrence_series: dataset.occurrenceSeries.length,
    recurrence_patterns: dataset.recurrencePatterns.length,
    relations: dataset.relations.length,
    designations: dataset.designations.length,
    sources: dataset.sources.length,
    evidence: dataset.evidence.length,
  },
  entity_types: sortedObject(entityTypeCounts),
  current_states: sortedObject(stateCounts),
  prefecture_coverage: prefectureCoverage,
  missing_prefectures: missingPrefectures,
  thin_prefectures: thinPrefectures,
  primary_entity_coverage: entityCoverage,
  sparse_primary_entities: sparseEntities,
  selection_rule: {
    next_additive_batch:
      "Prefer a primary cultural Entity from an uncovered prefecture with official or public-authority Sources that support Identity, Place, Current State, Occurrence, Change, Relation, and Evidence in one bounded bundle.",
    next_depth_batch:
      "Prefer existing primary Entities with zero Occurrences, zero Change Events, or zero Relations before adding low-evidence records.",
  },
};

const markdown = [
  "# Matsuri corpus coverage audit",
  "",
  `Generated: ${report.generated_at}`,
  "",
  "## Corpus totals",
  "",
  ...Object.entries(report.counts).map(([key, value]) => `- ${key}: ${value}`),
  "",
  "## Entity types",
  "",
  ...Object.entries(report.entity_types).map(([key, value]) => `- ${key}: ${value}`),
  "",
  "## Current states",
  "",
  ...Object.entries(report.current_states).map(([key, value]) => `- ${key}: ${value}`),
  "",
  `## Prefecture gaps (${missingPrefectures.length})`,
  "",
  ...(missingPrefectures.length > 0
    ? missingPrefectures.map((item) => `- ${item.prefecture_code} ${item.prefecture_name_ja}`)
    : ["- None"]),
  "",
  `## Thin prefectures (${thinPrefectures.length})`,
  "",
  ...(thinPrefectures.length > 0
    ? thinPrefectures.map(
        (item) => `- ${item.prefecture_code} ${item.prefecture_name_ja}: ${item.primary_entities} primary Entity`,
      )
    : ["- None"]),
  "",
  `## Sparse primary Entities (${sparseEntities.length})`,
  "",
  ...sparseEntities.map(
    (item) =>
      `- ${item.name} (${item.entity_type}, ${item.prefectures.join(" / ") || "地域不明"}): occurrences=${item.occurrences}, changes=${item.changes}, relations=${item.relations}, score=${item.density_score}`,
  ),
  "",
  "## Next-batch rule",
  "",
  `- Additive: ${report.selection_rule.next_additive_batch}`,
  `- Depth: ${report.selection_rule.next_depth_batch}`,
  "",
].join("\n");

fs.mkdirSync(outputRoot, { recursive: true });
fs.writeFileSync(path.join(outputRoot, "report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
fs.writeFileSync(path.join(outputRoot, "report.md"), markdown, "utf8");

console.log(markdown);
console.log(`Wrote Matsuri corpus coverage audit to ${path.relative(repositoryRoot, outputRoot)}`);
