import type { EvidenceItem, RelationItem } from "@badjoke-lab/yukue-ui";
import { matsuriEntityDetails } from "./matsuri-projection.js";
import {
  entityPublicHref,
  entityTypeLabel,
  placeDataHref,
  placePublicSlug,
} from "./public-routes.js";

const placeKindLabels: Record<string, string> = {
  shrine: "神社",
  temple: "寺院",
  park: "公園",
  festival_ground: "祭場",
  performance_venue: "上演場所",
  procession_route: "巡行路",
  distributed_tradition_area: "伝承地域",
  community_area: "地区",
};

export interface MatsuriPlaceDetailViewModel {
  placeId: string;
  slug: string;
  title: string;
  description: string;
  name: string;
  kindLabel: string;
  address?: string;
  region: string;
  relatedRecords: RelationItem[];
  evidence: EvidenceItem[];
  dataHref: string;
  rawPlace: unknown;
}

function preferredName(entity: (typeof matsuriEntityDetails)[number]["entity"]): string {
  return (
    entity.names.find((name) => name.is_preferred)?.value ??
    entity.names[0]?.value ??
    entity.id
  );
}

function addressLabel(place: (typeof matsuriEntityDetails)[number]["places"][number]): string {
  return [
    place.prefecture_name_ja,
    place.municipality_name_ja,
    place.locality_ja,
    place.street_address_ja,
  ]
    .filter(Boolean)
    .join("");
}

const placeRecords = new Map<
  string,
  {
    place: (typeof matsuriEntityDetails)[number]["places"][number];
    relatedDetails: (typeof matsuriEntityDetails)[number][];
  }
>();

for (const detail of matsuriEntityDetails) {
  for (const place of detail.places) {
    const existing = placeRecords.get(place.id) ?? { place, relatedDetails: [] };
    if (!existing.relatedDetails.some((candidate) => candidate.entity.id === detail.entity.id)) {
      existing.relatedDetails.push(detail);
    }
    placeRecords.set(place.id, existing);
  }
}

export const matsuriPlaceDetails: MatsuriPlaceDetailViewModel[] = [...placeRecords.values()]
  .map(({ place, relatedDetails }) => {
    const address = addressLabel(place);
    const region = [place.prefecture_name_ja, place.municipality_name_ja]
      .filter(Boolean)
      .join(" ");
    const relatedRecords: RelationItem[] = relatedDetails
      .flatMap((detail) => {
        const href = entityPublicHref(detail.entity);
        if (!href) return [];
        return [
          {
            label: entityTypeLabel(detail.entity.entity_type),
            targetName: preferredName(detail.entity),
            href,
          },
        ];
      })
      .sort((a, b) => a.targetName.localeCompare(b.targetName, "ja"));

    const evidenceById = new Map<string, EvidenceItem>();
    for (const detail of relatedDetails) {
      for (const view of detail.evidence) {
        if (
          ["place", "location"].includes(view.evidence.target_type) &&
          view.evidence.target_id === place.id
        ) {
          evidenceById.set(view.evidence.id, {
            id: `evidence-${view.evidence.id}`,
            targetLabel: "場所・所在地",
            sourceTitle: view.source.title,
            supportSummary: view.evidence.summary_ja,
            sourceHref: view.source.url,
          });
        }
      }
    }

    return {
      placeId: place.id,
      slug: placePublicSlug(place),
      title: `${place.name_ja}｜祭のゆくえ`,
      description: `${place.name_ja}に関係する祭礼・民俗芸能と、その所在地の根拠を確認できる場所記録です。`,
      name: place.name_ja,
      kindLabel: placeKindLabels[place.place_kind] ?? "場所",
      ...(address ? { address } : {}),
      region,
      relatedRecords,
      evidence: [...evidenceById.values()],
      dataHref: placeDataHref(place),
      rawPlace: place,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name, "ja"));

export function findMatsuriPlaceDetail(slug: string) {
  return matsuriPlaceDetails.find((detail) => detail.slug === slug);
}
