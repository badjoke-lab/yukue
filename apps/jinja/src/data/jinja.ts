import canonical from "../../data/canonical.json";

type Entity = (typeof canonical.entities)[number];
type Place = (typeof canonical.places)[number];
type State = (typeof canonical.states)[number];
type Evidence = (typeof canonical.evidence)[number];
type Source = (typeof canonical.sources)[number];

const placeById = new Map(canonical.places.map((place) => [place.id, place]));
const stateByEntity = new Map(canonical.states.map((state) => [state.entity_id, state]));
const sourceById = new Map(canonical.sources.map((source) => [source.id, source]));

export const approvedShrines = canonical.entities
  .filter((entity) => entity.review_status === "approved")
  .map((entity) => ({
    entity,
    place: placeById.get(entity.current_place_id),
    state: stateByEntity.get(entity.id),
  }))
  .sort((a, b) => a.entity.canonical_name.localeCompare(b.entity.canonical_name, "ja"));

export function findShrine(id: string): { entity: Entity; place?: Place; state?: State } | undefined {
  const entity = canonical.entities.find((item) => item.id === id && item.review_status === "approved");
  if (!entity) return undefined;
  return {
    entity,
    place: placeById.get(entity.current_place_id),
    state: stateByEntity.get(entity.id),
  };
}

export function evidenceFor(entityId: string): Array<{ evidence: Evidence; source?: Source; targetLabel: string }> {
  const state = stateByEntity.get(entityId);
  const stateEvidenceIds = new Set(state?.evidence_ids ?? []);
  return canonical.evidence
    .filter((item) => item.review_status === "approved" && (item.target_id === entityId || stateEvidenceIds.has(item.id)))
    .map((evidence) => ({
      evidence,
      source: sourceById.get(evidence.source_id),
      targetLabel: evidence.target_type === "state" ? "現在の状況" : "名称・所在地",
    }));
}

export const regionCounts = [...approvedShrines.reduce((map, record) => {
  const prefecture = record.place?.prefecture ?? "所在地未確認";
  map.set(prefecture, (map.get(prefecture) ?? 0) + 1);
  return map;
}, new Map<string, number>())]
  .map(([prefecture, count]) => ({ prefecture, count }))
  .sort((a, b) => a.prefecture.localeCompare(b.prefecture, "ja"));

export const previewMetrics = [
  { value: String(approvedShrines.length), label: "掲載中の神社", href: "/shrines/" },
  { value: String(regionCounts.length), label: "掲載地域", href: "/regions/" },
  { value: String(canonical.states.length), label: "状況を確認できた神社", href: "/shrines/" },
  { value: String(canonical.events.length), label: "変化の記録", href: "/changes/" },
  { value: String(canonical.evidence.filter((item) => item.review_status === "approved").length), label: "確認に使った資料", href: "/methodology/" },
];

export const publicationStatus = canonical.publication_status;
export const canonicalData = canonical;
