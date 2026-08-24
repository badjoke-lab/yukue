import { loadMatsuriDataset } from "../../matsuri/scripts/load-matsuri-dataset.mjs";

const dataset = loadMatsuriDataset();
const entitiesById = new Map(dataset.entities.map((entity) => [entity.id, entity]));
const matsuriTypes = new Set(["festival", "folk_performance", "tradition_unit"]);

function officialUrls(entity) {
  return [...new Set((entity.external_links ?? [])
    .filter((link) => ["official", "official_organization"].includes(link.officiality))
    .map((link) => link.url)
    .filter(Boolean))];
}

const relationMap = new Map();
for (const relation of dataset.relations) {
  if (relation.review_status !== "approved") continue;
  const source = entitiesById.get(relation.source_entity_id);
  const target = entitiesById.get(relation.target_entity_id);
  if (!source || !target) continue;

  let shrine;
  let matsuri;
  if (source.entity_type === "shrine" && matsuriTypes.has(target.entity_type)) {
    shrine = source;
    matsuri = target;
  } else if (target.entity_type === "shrine" && matsuriTypes.has(source.entity_type)) {
    shrine = target;
    matsuri = source;
  } else {
    continue;
  }

  const urls = officialUrls(shrine);
  if (urls.length === 0) continue;

  const entry = relationMap.get(shrine.id) ?? {
    matsuri_entity_id: shrine.id,
    name: shrine.canonical_name ?? shrine.name ?? shrine.id,
    official_urls: urls,
    place_ids: [...new Set([shrine.primary_place_id, ...(shrine.default_place_ids ?? [])].filter(Boolean))],
    related_matsuri: [],
  };
  entry.related_matsuri.push({
    relation_id: relation.id,
    relation_type: relation.relation_type,
    entity_id: matsuri.id,
    name: matsuri.canonical_name ?? matsuri.name ?? matsuri.id,
  });
  relationMap.set(shrine.id, entry);
}

const candidates = [...relationMap.values()]
  .map((candidate) => ({
    ...candidate,
    related_matsuri: candidate.related_matsuri.sort((a, b) => a.entity_id.localeCompare(b.entity_id)),
  }))
  .sort((a, b) => a.matsuri_entity_id.localeCompare(b.matsuri_entity_id));

const output = {
  format_version: 1,
  purpose: "Research candidates only; not Jinja publication approval.",
  selection_rule: "Approved Matsuri relation-backed shrine entities with at least one existing official/official_organization URL.",
  candidate_count: candidates.length,
  candidates,
};

if (process.argv.includes("--summary")) {
  const summary = {
    candidate_count: candidates.length,
    first_candidates: candidates.slice(0, 10).map((candidate) => ({
      matsuri_entity_id: candidate.matsuri_entity_id,
      name: candidate.name,
      official_urls: candidate.official_urls,
      place_ids: candidate.place_ids,
      related_matsuri: candidate.related_matsuri.map((relation) => ({
        relation_id: relation.relation_id,
        entity_id: relation.entity_id,
        name: relation.name,
      })),
    })),
  };
  process.stdout.write(`JINJA_TIER_A_AUDIT_SUMMARY=${JSON.stringify(summary)}\n`);
} else {
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
}
