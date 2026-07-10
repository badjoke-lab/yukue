import type { PublicProjection } from "@badjoke-lab/yukue-observation-core";

const browsableEntityTypes = new Set([
  "festival",
  "tradition_unit",
  "folk_performance",
]);

const entityTypeLabels: Record<string, string> = {
  festival: "祭礼",
  tradition_unit: "祭礼構成要素",
  folk_performance: "民俗芸能",
};

const stateLabels: Record<string, string> = {
  active: "継続中",
  reduced_activity: "活動縮小",
  suspended: "休止中",
  dormant: "長期休止",
  reviving: "復活活動中",
  discontinued: "終了",
  unknown: "要確認",
};

export interface SearchIndexRecord {
  id: string;
  content: string;
  meta: {
    title: string;
    type_label: string;
    region: string;
    state_label: string;
    summary: string;
  };
  filters: {
    entity_type: string[];
    prefecture: string[];
    current_state: string[];
  };
}

export interface SearchFilterOption {
  value: string;
  label: string;
}

export interface SearchFilterOptions {
  entityTypes: SearchFilterOption[];
  prefectures: SearchFilterOption[];
  currentStates: SearchFilterOption[];
}

type ProjectedEntity = PublicProjection["json"]["entities"][number];

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

function uniqueNonEmpty(values: Array<string | undefined>): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value)))];
}

function entityChangeText(
  projection: PublicProjection,
  entityId: string,
): string[] {
  return projection.json.change_events
    .filter((change) => change.subject_entity_ids.includes(entityId))
    .map((change) => change.summary_ja);
}

function entityRelationText(
  projection: PublicProjection,
  entityId: string,
  entitiesById: Map<string, ProjectedEntity>,
): string[] {
  const names: string[] = [];

  for (const relation of projection.json.relations) {
    if (relation.source_entity_id === entityId) {
      const target = entitiesById.get(relation.target_entity_id);
      if (target) names.push(preferredName(target));
    }
    if (relation.target_entity_id === entityId) {
      const source = entitiesById.get(relation.source_entity_id);
      if (source) names.push(preferredName(source));
    }
  }

  return uniqueNonEmpty(names);
}

export function buildSearchIndexRecords(
  projection: PublicProjection,
): SearchIndexRecord[] {
  const entitiesById = new Map(
    projection.json.entities.map((entity) => [entity.id, entity]),
  );

  return projection.json.entities
    .filter((entity) => browsableEntityTypes.has(entity.entity_type))
    .map((entity) => {
      const title = preferredName(entity);
      const typeLabel = entityTypeLabels[entity.entity_type] ?? "記録";
      const region = regionLabel(entity);
      const stateCode = entity.current_state?.state_code;
      const stateLabel = stateCode ? stateLabels[stateCode] ?? "状態確認中" : "";
      const prefectures = uniqueNonEmpty(
        entity.geographic_scope.areas.map((area) => area.prefecture_code),
      );
      const nameText = entity.names.map((name) => name.value);
      const areaText = entity.geographic_scope.areas.flatMap((area) => [
        area.prefecture_name_ja,
        area.municipality_name_ja,
      ]);
      const contentParts = uniqueNonEmpty([
        ...nameText,
        entity.summary_ja,
        entity.description_ja,
        ...areaText,
        region,
        typeLabel,
        stateLabel,
        ...entityChangeText(projection, entity.id),
        ...entityRelationText(projection, entity.id, entitiesById),
      ]);

      return {
        id: entity.id,
        content: contentParts.join("\n"),
        meta: {
          title,
          type_label: typeLabel,
          region,
          state_label: stateLabel,
          summary: entity.summary_ja ?? "",
        },
        filters: {
          entity_type: [entity.entity_type],
          prefecture: prefectures,
          current_state: stateCode ? [stateCode] : [],
        },
      };
    })
    .sort((a, b) => a.meta.title.localeCompare(b.meta.title, "ja"));
}

export function buildSearchFilterOptions(
  projection: PublicProjection,
): SearchFilterOptions {
  const records = buildSearchIndexRecords(projection);
  const presentEntityTypes = new Set(
    records.flatMap((record) => record.filters.entity_type),
  );
  const presentPrefectures = new Set(
    records.flatMap((record) => record.filters.prefecture),
  );
  const presentStates = new Set(
    records.flatMap((record) => record.filters.current_state),
  );

  const prefectureLabels = new Map<string, string>();
  for (const entity of projection.json.entities) {
    for (const area of entity.geographic_scope.areas) {
      prefectureLabels.set(area.prefecture_code, area.prefecture_name_ja);
    }
  }

  return {
    entityTypes: [...presentEntityTypes]
      .map((value) => ({
        value,
        label: entityTypeLabels[value] ?? value,
      }))
      .sort((a, b) => a.label.localeCompare(b.label, "ja")),
    prefectures: [...presentPrefectures]
      .map((value) => ({
        value,
        label: prefectureLabels.get(value) ?? value,
      }))
      .sort((a, b) => a.value.localeCompare(b.value)),
    currentStates: [...presentStates]
      .map((value) => ({
        value,
        label: stateLabels[value] ?? "状態確認中",
      }))
      .sort((a, b) => a.label.localeCompare(b.label, "ja")),
  };
}
