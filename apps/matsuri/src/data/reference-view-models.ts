import type { PublicProjection } from "@badjoke-lab/yukue-observation-core";
import type { BrowseEntityItem } from "./browse-view-models.js";

const stateOrder = [
  "active",
  "reduced_activity",
  "suspended",
  "dormant",
  "reviving",
  "discontinued",
  "unknown",
] as const;

const stateLabels: Record<string, string> = {
  active: "継続中",
  reduced_activity: "活動縮小",
  suspended: "休止中",
  dormant: "長期休止",
  reviving: "復活活動中",
  discontinued: "終了",
  unknown: "要確認",
};

type ProjectedEntity = PublicProjection["json"]["entities"][number];

export interface StateBrowseSummary {
  stateCode: string;
  label: string;
  count: number;
  href: string;
}

function preferredName(entity: ProjectedEntity): string {
  return (
    entity.names.find((name) => name.is_preferred)?.value ??
    entity.names[0]?.value ??
    entity.id
  );
}

function regionLabel(entity: ProjectedEntity): string {
  const labels = entity.geographic_scope.areas.map((area) =>
    [area.prefecture_name_ja, area.municipality_name_ja]
      .filter(Boolean)
      .join(" "),
  );
  return [...new Set(labels)].join("・");
}

function entityTypeLabel(entityType: string): string {
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
      return entityType;
  }
}

function entityHashHref(entity: ProjectedEntity): string {
  if (entity.entity_type === "organization") {
    return `/organizations/#${entity.id}`;
  }
  if (entity.entity_type === "folk_performance") {
    return `/performances/#${entity.id}`;
  }
  return `/festivals/#${entity.id}`;
}

function toBrowseItem(entity: ProjectedEntity): BrowseEntityItem {
  const stateCode = entity.current_state?.state_code;
  return {
    id: entity.id,
    name: preferredName(entity),
    typeLabel: entityTypeLabel(entity.entity_type),
    region: regionLabel(entity),
    ...(stateCode
      ? { stateLabel: stateLabels[stateCode] ?? "状態確認中" }
      : {}),
    ...(entity.summary_ja ? { summary: entity.summary_ja } : {}),
    href: entityHashHref(entity),
  };
}

export function buildOrganizationBrowseItems(
  projection: PublicProjection,
): BrowseEntityItem[] {
  return projection.json.entities
    .filter((entity) => entity.entity_type === "organization")
    .map(toBrowseItem)
    .sort((a, b) => a.name.localeCompare(b.name, "ja"));
}

export function buildStateBrowseSummaries(
  projection: PublicProjection,
): StateBrowseSummary[] {
  const counts = new Map<string, number>();
  for (const state of projection.json.current_states) {
    counts.set(state.state_code, (counts.get(state.state_code) ?? 0) + 1);
  }

  return stateOrder.map((stateCode) => ({
    stateCode,
    label: stateLabels[stateCode] ?? stateCode,
    count: counts.get(stateCode) ?? 0,
    href: `/states/${stateCode}/`,
  }));
}

export function buildStateBrowseItems(
  projection: PublicProjection,
  stateCode: string,
): BrowseEntityItem[] {
  return projection.json.entities
    .filter((entity) => entity.current_state?.state_code === stateCode)
    .map(toBrowseItem)
    .sort((a, b) => a.name.localeCompare(b.name, "ja"));
}

export function stateLabel(stateCode: string): string {
  return stateLabels[stateCode] ?? stateCode;
}
