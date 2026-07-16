import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputDirectory = path.resolve(
  repositoryRoot,
  process.env.YUKUE_SEED_ARTIFACT_DIR ?? ".artifacts/yukue-future-site-seeds",
);

const futureSiteByEntityType = new Map([
  ["shrine", "jinja"],
  ["temple", "jiin"],
  ["cemetery", "tomurai"],
  ["columbarium", "tomurai"],
  ["burial_facility", "tomurai"],
]);
const matsuriSpecialistTypes = new Set([
  "festival",
  "folk_performance",
  "tradition_unit",
]);

function preferredName(entity) {
  return (
    entity.names?.find((name) => name.is_preferred)?.value ??
    entity.names?.[0]?.value ??
    entity.id
  );
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((left, right) =>
    String(left).localeCompare(String(right), "ja"),
  );
}

function officialUrls(entity) {
  return uniqueSorted(
    (entity.external_links ?? [])
      .filter((link) =>
        ["official", "official_organization"].includes(link.officiality),
      )
      .map((link) => link.url),
  );
}

const dataset = loadMatsuriDataset();
const entitiesById = new Map(dataset.entities.map((entity) => [entity.id, entity]));
const evidenceById = new Map(dataset.evidence.map((evidence) => [evidence.id, evidence]));
const seedsByEntityId = new Map();

for (const relation of dataset.relations) {
  if (relation.review_status !== "approved") continue;

  assert(
    Array.isArray(relation.evidence_ids) && relation.evidence_ids.length > 0,
    `Approved Relation ${relation.id} has no Evidence IDs.`,
  );

  const sourceEntity = entitiesById.get(relation.source_entity_id);
  const targetEntity = entitiesById.get(relation.target_entity_id);
  assert(sourceEntity, `Relation ${relation.id} source Entity is missing.`);
  assert(targetEntity, `Relation ${relation.id} target Entity is missing.`);

  const candidates = [
    {
      candidate: sourceEntity,
      matsuriEntity: targetEntity,
      direction: "candidate_to_matsuri",
    },
    {
      candidate: targetEntity,
      matsuriEntity: sourceEntity,
      direction: "matsuri_to_candidate",
    },
  ];

  for (const { candidate, matsuriEntity, direction } of candidates) {
    const candidateSiteId = futureSiteByEntityType.get(candidate.entity_type);
    if (!candidateSiteId) continue;
    if (!matsuriSpecialistTypes.has(matsuriEntity.entity_type)) continue;

    const relationEvidence = relation.evidence_ids.map((evidenceId) => {
      const evidence = evidenceById.get(evidenceId);
      assert(evidence, `Relation ${relation.id} Evidence ${evidenceId} is missing.`);
      assert.equal(
        evidence.review_status,
        "approved",
        `Relation ${relation.id} Evidence ${evidenceId} is not approved.`,
      );
      assert.equal(
        evidence.target_type,
        "relation",
        `Relation ${relation.id} Evidence ${evidenceId} does not target a Relation.`,
      );
      assert.equal(
        evidence.target_id,
        relation.id,
        `Relation ${relation.id} Evidence ${evidenceId} targets ${evidence.target_id}.`,
      );
      return evidence;
    });

    const existing = seedsByEntityId.get(candidate.id) ?? {
      entity_id: candidate.id,
      candidate_site_id: candidateSiteId,
      entity_type: candidate.entity_type,
      name_ja: preferredName(candidate),
      summary_ja: candidate.summary_ja ?? null,
      record_lifecycle: candidate.record_lifecycle ?? null,
      prefectures: uniqueSorted(
        (candidate.geographic_scope?.areas ?? []).map(
          (area) => area.prefecture_name_ja,
        ),
      ),
      municipalities: uniqueSorted(
        (candidate.geographic_scope?.areas ?? []).map(
          (area) => area.municipality_name_ja,
        ),
      ),
      official_urls: officialUrls(candidate),
      source_ids: [],
      relation_contexts: [],
      seed_status: "relation-backed-candidate",
    };

    assert.equal(
      existing.candidate_site_id,
      candidateSiteId,
      `Entity ${candidate.id} maps to conflicting future sites.`,
    );

    existing.source_ids = uniqueSorted([
      ...existing.source_ids,
      ...(candidate.names ?? []).flatMap((name) => name.source_ids ?? []),
      ...relationEvidence.map((evidence) => evidence.source_id),
    ]);

    if (!existing.relation_contexts.some((context) => context.relation_id === relation.id)) {
      existing.relation_contexts.push({
        relation_id: relation.id,
        relation_type: relation.relation_type,
        direction,
        matsuri_entity_id: matsuriEntity.id,
        matsuri_entity_type: matsuriEntity.entity_type,
        matsuri_name_ja: preferredName(matsuriEntity),
        evidence_ids: uniqueSorted(relation.evidence_ids),
      });
    }

    seedsByEntityId.set(candidate.id, existing);
  }
}

const seeds = [...seedsByEntityId.values()]
  .map((seed) => ({
    ...seed,
    relation_contexts: seed.relation_contexts.sort((left, right) =>
      left.relation_id.localeCompare(right.relation_id),
    ),
  }))
  .sort((left, right) =>
    `${left.candidate_site_id}:${left.name_ja}:${left.entity_id}`.localeCompare(
      `${right.candidate_site_id}:${right.name_ja}:${right.entity_id}`,
      "ja",
    ),
  );

assert(seeds.length > 0, "No relation-backed future-site seeds were found.");
assert.equal(
  new Set(seeds.map((seed) => seed.entity_id)).size,
  seeds.length,
  "Future-site seed inventory contains duplicate Entity IDs.",
);

const siteDefinitions = [
  { site_id: "jinja", entity_types: ["shrine"] },
  { site_id: "jiin", entity_types: ["temple"] },
  {
    site_id: "tomurai",
    entity_types: ["cemetery", "columbarium", "burial_facility"],
  },
];

const sites = siteDefinitions.map((definition) => ({
  ...definition,
  seed_count: seeds.filter((seed) => seed.candidate_site_id === definition.site_id)
    .length,
  seeds: seeds.filter((seed) => seed.candidate_site_id === definition.site_id),
}));

const report = {
  format_version: 1,
  generated_at: new Date().toISOString(),
  source_site_id: "matsuri",
  status: "candidate-seed-inventory-only",
  eligibility_rule:
    "Approved Matsuri Relation with approved Relation Evidence connecting a future-site Entity to a Matsuri specialist Entity.",
  totals: {
    seeds: seeds.length,
    relation_contexts: seeds.reduce(
      (total, seed) => total + seed.relation_contexts.length,
      0,
    ),
    jinja: sites.find((site) => site.site_id === "jinja").seed_count,
    jiin: sites.find((site) => site.site_id === "jiin").seed_count,
    tomurai: sites.find((site) => site.site_id === "tomurai").seed_count,
  },
  sites,
  boundaries: {
    activates_future_site: false,
    creates_public_application: false,
    establishes_research_priority: false,
    includes_private_candidate_queue: false,
    uses_only_approved_public_records: true,
  },
};

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(
  path.join(outputDirectory, "inventory.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);

const summaryLines = [
  "# Yukue Future-site Seed Inventory",
  "",
  `Status: **${report.status}**`,
  "",
  `- Generated at: \`${report.generated_at}\``,
  `- Total relation-backed seeds: ${report.totals.seeds}`,
  `- Jinja seeds: ${report.totals.jinja}`,
  `- Jiin seeds: ${report.totals.jiin}`,
  `- Tomurai seeds: ${report.totals.tomurai}`,
  `- Relation contexts: ${report.totals.relation_contexts}`,
  "",
  "## Seeds",
  "",
];

for (const seed of seeds) {
  summaryLines.push(
    `- ${seed.candidate_site_id} / ${seed.name_ja} (\`${seed.entity_id}\`) — ${seed.relation_contexts.length} Relation context(s)`,
  );
}

summaryLines.push(
  "",
  "## Boundary",
  "",
  "This artifact does not activate Jinja, Jiin, or Tomurai, create a public application, rank candidates, or expose a private research queue.",
);

fs.writeFileSync(
  path.join(outputDirectory, "summary.md"),
  `${summaryLines.join("\n")}\n`,
  "utf8",
);

console.log(
  `Yukue future-site seed inventory passed: ${report.totals.seeds} seed(s), ${report.totals.relation_contexts} relation context(s), Jinja ${report.totals.jinja}, Jiin ${report.totals.jiin}, Tomurai ${report.totals.tomurai}.`,
);
