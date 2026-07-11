import type { PublicProjection } from "@badjoke-lab/yukue-observation-core";

const stateLabels: Record<string, string> = {
  active: "継続中",
  reduced_activity: "活動縮小",
  suspended: "休止中",
  dormant: "長期休止",
  reviving: "復活活動中",
  discontinued: "終了",
  unknown: "要確認",
};

const eventLabels: Record<string, string> = {
  suspension_started: "休止開始",
  suspension_ended: "休止終了",
  revival_activity_started: "復活活動開始",
  revival_announced: "復活発表",
  revival_completed: "復活完了",
  format_changed: "開催形式変更",
  schedule_rule_changed: "開催日程規則変更",
  venue_changed: "会場変更",
  organizer_changed: "運営主体変更",
  preservation_group_formed: "保存組織結成",
  preservation_group_reorganized: "保存組織再編",
  merged_with: "統合",
  renamed: "名称変更",
  designation_added: "指定追加",
  designation_changed: "指定変更",
  designation_removed: "指定解除",
  disaster_interruption: "災害による中断",
  discontinued: "終了",
  other: "その他",
};

const publishedDetailIds = new Set(["fst-suneori-amagoi"]);

type ProjectedEntity = PublicProjection["json"]["entities"][number];

export interface BrowseEntityItem {
  id: string;
  name: string;
  typeLabel: string;
  region: string;
  stateCode?: string;
  stateLabel?: string;
  summary?: string;
  href?: string;
}

export interface RegionBrowseItem {
  prefectureCode: string;
  prefectureName: string;
  entityCount: number;
  municipalityNames: string[];
}

export interface ChangeBrowseItem {
  id: string;
  date: string;
  typeLabel: string;
  entityName: string;
  summary: string;
  href?: string;
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

function detailHref(entity: ProjectedEntity): string | undefined {
  if (!publishedDetailIds.has(entity.id)) return undefined;
  if (!entity.slug) return undefined;
  if (entity.entity_type === "festival") {
    return `/festivals/${entity.slug}/`;
  }
  return undefined;
}

function formatDate(value: string | undefined): string {
  if (!value) return "時期不明";
  const [year, month, day] = value.split("-");
  if (!year) return value;
  if (!month) return `${Number(year)}年`;
  if (!day) return `${Number(year)}年${Number(month)}月`;
  return `${Number(year)}年${Number(month)}月${Number(day)}日`;
}

function changeDate(
  change: PublicProjection["json"]["change_events"][number],
): string {
  const start =
    change.effective_period?.start ??
    change.announced_at ??
    change.decided_at;
  return formatDate(start);
}

function changeSortKey(
  change: PublicProjection["json"]["change_events"][number],
): string {
  return (
    change.effective_period?.start ??
    change.announced_at ??
    change.decided_at ??
    ""
  );
}

function toBrowseEntity(
  entity: ProjectedEntity,
  typeLabel: string,
): BrowseEntityItem {
  const stateCode = entity.current_state?.state_code;
  return {
    id: entity.id,
    name: preferredName(entity),
    typeLabel,
    region: regionLabel(entity),
    ...(stateCode
      ? {
          stateCode,
          stateLabel: stateLabels[stateCode] ?? "状態確認中",
        }
      : {}),
    ...(entity.summary_ja ? { summary: entity.summary_ja } : {}),
    ...(detailHref(entity) ? { href: detailHref(entity) } : {}),
  };
}

export function buildFestivalBrowseItems(
  projection: PublicProjection,
): BrowseEntityItem[] {
  return projection.json.entities
    .filter(
      (entity) =>
        entity.entity_type === "festival" ||
        entity.entity_type === "tradition_unit",
    )
    .map((entity) =>
      toBrowseEntity(
        entity,
        entity.entity_type === "tradition_unit" ? "祭礼構成要素" : "祭礼",
      ),
    )
    .sort((a, b) => a.name.localeCompare(b.name, "ja"));
}

export function buildPerformanceBrowseItems(
  projection: PublicProjection,
): BrowseEntityItem[] {
  return projection.json.entities
    .filter((entity) => entity.entity_type === "folk_performance")
    .map((entity) => toBrowseEntity(entity, "民俗芸能"))
    .sort((a, b) => a.name.localeCompare(b.name, "ja"));
}

export function buildRegionBrowseItems(
  projection: PublicProjection,
): RegionBrowseItem[] {
  const browsableEntities = projection.json.entities.filter((entity) =>
    ["festival", "tradition_unit", "folk_performance"].includes(
      entity.entity_type,
    ),
  );
  const regions = new Map<
    string,
    {
      prefectureName: string;
      entityIds: Set<string>;
      municipalityNames: Set<string>;
    }
  >();

  for (const entity of browsableEntities) {
    for (const area of entity.geographic_scope.areas) {
      const existing = regions.get(area.prefecture_code) ?? {
        prefectureName: area.prefecture_name_ja,
        entityIds: new Set<string>(),
        municipalityNames: new Set<string>(),
      };
      existing.entityIds.add(entity.id);
      if (area.municipality_name_ja) {
        existing.municipalityNames.add(area.municipality_name_ja);
      }
      regions.set(area.prefecture_code, existing);
    }
  }

  return [...regions.entries()]
    .map(([prefectureCode, region]) => ({
      prefectureCode,
      prefectureName: region.prefectureName,
      entityCount: region.entityIds.size,
      municipalityNames: [...region.municipalityNames].sort((a, b) =>
        a.localeCompare(b, "ja"),
      ),
    }))
    .sort((a, b) => a.prefectureCode.localeCompare(b.prefectureCode));
}

export function buildChangeBrowseItems(
  projection: PublicProjection,
): ChangeBrowseItem[] {
  const entitiesById = new Map(
    projection.json.entities.map((entity) => [entity.id, entity]),
  );

  return [...projection.json.change_events]
    .sort((a, b) => changeSortKey(b).localeCompare(changeSortKey(a)))
    .flatMap((change) => {
      const entity = change.subject_entity_ids
        .map((id) => entitiesById.get(id))
        .find((candidate) => candidate !== undefined);
      if (!entity) return [];
      return [
        {
          id: change.id,
          date: changeDate(change),
          typeLabel: eventLabels[change.event_type] ?? "変化",
          entityName: preferredName(entity),
          summary: change.summary_ja,
          ...(detailHref(entity) ? { href: detailHref(entity) } : {}),
        },
      ];
    });
}
