import type { PlaceItem } from "@badjoke-lab/yukue-ui";

const pointKinds = new Set([
  "shrine",
  "temple",
  "park",
  "festival_ground",
  "performance_venue",
]);

const areaKinds = new Set([
  "procession_route",
  "distributed_tradition_area",
  "community_area",
]);

export interface MapUtilityPlace {
  name_ja: string;
  place_kind: string;
  prefecture_name_ja?: string;
  municipality_name_ja?: string;
  locality_ja?: string;
  street_address_ja?: string;
  latitude?: number;
  longitude?: number;
  coordinate_precision?: string;
}

export interface MapUtilityResult {
  classification: "verified-point" | "area-or-route" | "insufficient-location";
  item: PlaceItem;
}

function normalized(value: string | undefined): string {
  return value?.trim().replace(/\s+/gu, " ") ?? "";
}

function addressLabel(place: MapUtilityPlace): string {
  return [
    place.prefecture_name_ja,
    place.municipality_name_ja,
    place.locality_ja,
    place.street_address_ja,
  ]
    .map(normalized)
    .filter(Boolean)
    .join("");
}

function hasCoordinates(place: MapUtilityPlace): boolean {
  return Number.isFinite(place.latitude) && Number.isFinite(place.longitude);
}

function hasSpecificPointIdentity(place: MapUtilityPlace): boolean {
  if (!pointKinds.has(place.place_kind)) return false;
  if (hasCoordinates(place)) return true;
  if (normalized(place.street_address_ja) || normalized(place.locality_ja)) return true;

  const name = normalized(place.name_ja);
  const municipality = normalized(place.municipality_name_ja);
  if (!name || !municipality) return false;
  return name !== municipality && !name.endsWith("市内") && !name.endsWith("町内") && !name.endsWith("村内");
}

function queryFor(place: MapUtilityPlace): string {
  if (hasCoordinates(place)) return `${place.latitude},${place.longitude}`;
  return [normalized(place.name_ja), addressLabel(place)].filter(Boolean).join(" ");
}

export function mapUtilityForPlace(
  place: MapUtilityPlace,
  base: Omit<PlaceItem, "mapHref" | "embedUrl" | "mapStatus" | "mapUnavailableReason">,
): MapUtilityResult {
  if (areaKinds.has(place.place_kind)) {
    return {
      classification: "area-or-route",
      item: {
        ...base,
        mapStatus: "unavailable",
        mapUnavailableReason:
          "公式の経路図・範囲図、または検証済みの地理データが未登録のため、地域名だけの地図は表示していません。",
      },
    };
  }

  if (!hasSpecificPointIdentity(place)) {
    return {
      classification: "insufficient-location",
      item: {
        ...base,
        mapStatus: "unavailable",
        mapUnavailableReason:
          "会場を特定できる住所・座標が未登録のため、市区町村だけの地図は表示していません。",
      },
    };
  }

  const query = queryFor(place);
  return {
    classification: "verified-point",
    item: {
      ...base,
      mapStatus: "verified-point",
      mapHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
      embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`,
    },
  };
}
