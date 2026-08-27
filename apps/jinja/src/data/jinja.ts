import canonical from "../../data/canonical.json";

type Entity = (typeof canonical.entities)[number];
type Place = (typeof canonical.places)[number];
type Evidence = (typeof canonical.evidence)[number];
type Source = (typeof canonical.sources)[number];

const placeById = new Map(canonical.places.map((place) => [place.id, place]));
const sourceById = new Map(canonical.sources.map((source) => [source.id, source]));

export const approvedShrines = canonical.entities
  .filter((entity) => entity.review_status === "approved")
  .map((entity) => ({
    entity,
    place: placeById.get(entity.current_place_id),
  }))
  .sort((a, b) => a.entity.canonical_name.localeCompare(b.entity.canonical_name, "ja"));

export function findShrine(id: string): { entity: Entity; place?: Place } | undefined {
  const entity = canonical.entities.find((item) => item.id === id && item.review_status === "approved");
  if (!entity) return undefined;
  return { entity, place: placeById.get(entity.current_place_id) };
}

export function evidenceFor(entityId: string): Array<{ evidence: Evidence; source?: Source }> {
  return canonical.evidence
    .filter((item) => item.target_id === entityId && item.review_status === "approved")
    .map((evidence) => ({ evidence, source: sourceById.get(evidence.source_id) }));
}

export const regionCounts = [...approvedShrines.reduce((map, record) => {
  const prefecture = record.place?.prefecture ?? "所在地未確認";
  map.set(prefecture, (map.get(prefecture) ?? 0) + 1);
  return map;
}, new Map<string, number>())]
  .map(([prefecture, count]) => ({ prefecture, count }))
  .sort((a, b) => a.prefecture.localeCompare(b.prefecture, "ja"));

export const previewMetrics = [
  { value: String(approvedShrines.length), label: "review済み神社", href: "/shrines/" },
  { value: String(regionCounts.length), label: "都道府県", href: "/regions/" },
  { value: String(canonical.states.length), label: "確認済みCurrent State", href: "/changes/" },
  { value: String(canonical.events.length), label: "確認済みChange Event", href: "/changes/" },
  { value: String(canonical.evidence.filter((item) => item.review_status === "approved").length), label: "Evidence", href: "/methodology/#evidence" },
];

export const publicationStatus = canonical.publication_status;
export const canonicalData = canonical;
