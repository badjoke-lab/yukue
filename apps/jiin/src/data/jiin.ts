import canonicalJson from "../../data/canonical.json";

export interface Temple {
  id: string;
  canonical_name: string;
  review_status: "approved";
  tier: "A" | "B" | "C";
  verified_at: string;
  current_place_id: string;
  identity_evidence_ids: string[];
  reading?: string;
  aliases?: string[];
  former_names?: string[];
  mountain_name?: string;
  in_name?: string;
  official_links?: string[];
  founded_summary?: string;
  founder_summary?: string;
  principal_object_summary?: string;
  notes?: string;
}

export interface Place {
  id: string;
  prefecture: string;
  municipality: string;
  review_status: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  verified_at?: string;
}

export interface State {
  id: string;
  entity_id: string;
  continuity_state: string;
  review_status: string;
  verified_at: string;
  evidence_ids: string[];
  basis_summary?: string;
}

export interface Evidence {
  id: string;
  target_type: string;
  target_id: string;
  source_id: string;
  review_status: string;
  verified_at: string;
  summary: string;
}

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
  source_type: string;
  accessed_at: string;
  authority_scope: string;
}

interface CanonicalData {
  format_version: number;
  site_id: "jiin";
  publication_status: "implementation_only" | "public_preview_noncanonical";
  entities: Temple[];
  organizations: Array<Record<string, unknown> & { id: string }>;
  facilities: Array<Record<string, unknown> & { id: string }>;
  external_subjects: Array<Record<string, unknown> & { id: string }>;
  states: State[];
  events: Array<Record<string, unknown> & { id: string }>;
  relations: Array<Record<string, unknown> & { id: string }>;
  evidence: Evidence[];
  sources: Source[];
  places: Place[];
}

const canonical = canonicalJson as CanonicalData;
const placeById = new Map(canonical.places.map((place) => [place.id, place]));
const stateByEntity = new Map(canonical.states.map((state) => [state.entity_id, state]));
const sourceById = new Map(canonical.sources.map((source) => [source.id, source]));

export const approvedTemples = canonical.entities
  .filter((entity) => entity.review_status === "approved")
  .map((entity) => ({
    entity,
    place: placeById.get(entity.current_place_id),
    state: stateByEntity.get(entity.id),
  }))
  .sort((a, b) => a.entity.canonical_name.localeCompare(b.entity.canonical_name, "ja"));

export function findTemple(id: string): { entity: Temple; place?: Place; state?: State } | undefined {
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

export const regionCounts = [...approvedTemples.reduce((map, record) => {
  const prefecture = record.place?.prefecture ?? "所在地未確認";
  map.set(prefecture, (map.get(prefecture) ?? 0) + 1);
  return map;
}, new Map<string, number>())]
  .map(([prefecture, count]) => ({ prefecture, count }))
  .sort((a, b) => a.prefecture.localeCompare(b.prefecture, "ja"));

export const previewMetrics = [
  { value: String(approvedTemples.length), label: "掲載中の寺院", href: "/temples/" },
  { value: String(regionCounts.length), label: "掲載地域", href: "/regions/" },
  { value: String(canonical.states.length), label: "状況を確認できた寺院", href: "/temples/" },
  { value: String(canonical.events.length), label: "変化の記録", href: "/changes/" },
  { value: String(canonical.evidence.filter((item) => item.review_status === "approved").length), label: "確認に使った資料", href: "/methodology/" },
];

export const publicationStatus = canonical.publication_status;
export const canonicalData = canonical;
