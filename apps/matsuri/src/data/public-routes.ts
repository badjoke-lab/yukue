import type {
  PublicEntityDetailProjection,
  PublicProjection,
} from "@badjoke-lab/yukue-observation-core";

type ProjectedEntity = PublicProjection["json"]["entities"][number];
type DetailEntity = PublicEntityDetailProjection["entity"];
type PublicEntity = ProjectedEntity | DetailEntity;
type PublicPlace = PublicEntityDetailProjection["places"][number];

export const primaryDetailEntityTypes = Object.freeze([
  "festival",
  "tradition_unit",
  "folk_performance",
  "organization",
] as const);

export const seedReferenceEntityTypes = Object.freeze(["shrine", "temple"] as const);

function requireSlug(entity: PublicEntity): string {
  if (!entity.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(entity.slug)) {
    throw new Error(`Public Entity ${entity.id} requires a stable lowercase slug`);
  }
  return entity.slug;
}

export function entityRouteKind(entityType: string): string | undefined {
  switch (entityType) {
    case "festival":
    case "tradition_unit":
      return "festivals";
    case "folk_performance":
      return "performances";
    case "organization":
      return "organizations";
    case "shrine":
      return "shrines";
    case "temple":
      return "temples";
    default:
      return undefined;
  }
}

export function entityPublicHref(entity: PublicEntity): string | undefined {
  const routeKind = entityRouteKind(entity.entity_type);
  if (!routeKind) return undefined;
  const slug = requireSlug(entity);

  if (entity.entity_type === "shrine" || entity.entity_type === "temple") {
    return `/references/${routeKind}/${slug}/`;
  }

  return `/${routeKind}/${slug}/`;
}

export function entityDataHref(entity: PublicEntity): string | undefined {
  const routeKind = entityRouteKind(entity.entity_type);
  if (!routeKind) return undefined;
  return `/data/records/${routeKind}/${requireSlug(entity)}.json`;
}

export function entityBrowseHref(entityType: string): string {
  switch (entityType) {
    case "festival":
    case "tradition_unit":
      return "/festivals/";
    case "folk_performance":
      return "/performances/";
    case "organization":
      return "/organizations/";
    default:
      return "/search/";
  }
}

export function entityTypeLabel(entityType: string): string {
  switch (entityType) {
    case "festival":
      return "祭礼";
    case "tradition_unit":
      return "祭礼構成要素";
    case "folk_performance":
      return "民俗芸能";
    case "organization":
      return "組織";
    case "shrine":
      return "神社";
    case "temple":
      return "寺院";
    default:
      return "関連記録";
  }
}

export function placePublicSlug(place: PublicPlace): string {
  const slug = place.id.replace(/^plc-/u, "");
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(slug)) {
    throw new Error(`Public Place ${place.id} requires a stable route key`);
  }
  return slug;
}

export function placePublicHref(place: PublicPlace): string {
  return `/places/${placePublicSlug(place)}/`;
}

export function placeDataHref(place: PublicPlace): string {
  return `/data/places/${placePublicSlug(place)}.json`;
}
