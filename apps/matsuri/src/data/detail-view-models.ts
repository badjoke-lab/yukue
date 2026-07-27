import type {
  PublicEntityDetailProjection,
  PublicProjection,
} from "@badjoke-lab/yukue-observation-core";
import type {
  ChangeTimelineItem,
  DesignationItem,
  EvidenceItem,
  OccurrenceRow,
  OverviewItem,
  PlaceItem,
  RelationItem,
} from "@badjoke-lab/yukue-ui";
import {
  entityBrowseHref,
  entityDataHref,
  entityPublicHref,
  entityTypeLabel,
  placePublicHref,
} from "./public-routes.js";

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

const outcomeLabels: Record<string, string> = {
  scheduled: "開催予定",
  held: "開催確認済み",
  partially_held: "一部開催",
  postponed: "延期",
  rescheduled: "日程変更",
  cancelled: "中止",
  not_held: "未実施",
  unknown: "状況不明",
};

const scaleLabels: Record<string, string> = {
  normal: "通常",
  reduced: "縮小",
  expanded: "拡大",
  modified: "変更あり",
  unknown: "要確認",
};

const relationLabels: Record<string, string> = {
  held_at: "行われる場所",
  performed_at: "上演場所",
  dedicated_at: "奉納先",
  historically_dedicated_at: "歴史的な奉納先",
  hosted_by: "主催",
  organized_by: "運営主体",
  maintained_by: "維持・継承主体",
  supported_by: "支援主体",
  member_of: "所属",
  successor_of: "継承元",
  includes_performance: "含まれる芸能",
  includes_tradition: "含まれる伝承",
  includes_unit: "構成要素",
  participates_in: "参加する祭礼・行事",
  part_of_tradition: "属する伝承",
  ritually_associated_with: "儀礼上の関係",
  historically_associated_with: "歴史的な関係",
};

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

const evidenceTargetLabels: Record<string, string> = {
  state_snapshot: "現在状態",
  change_event: "変化の履歴",
  occurrence: "開催・上演記録",
  relation: "関係",
  designation: "指定",
  recurrence_pattern: "開催周期",
  entity_identity: "対象の同定",
  name_variant: "名称",
  location: "所在地",
  place: "場所",
};

const festivalKindLabels: Record<string, string> = {
  shrine_festival: "神社祭礼",
  temple_festival: "寺院行事",
  ritual_festival: "神事・儀礼",
  community_festival: "地域祭礼",
  composite_festival: "複合祭礼",
  seasonal_observance: "季節行事",
  other: "祭礼・行事",
  unknown: "分類確認中",
};

const performanceKindLabels: Record<string, string> = {
  kagura: "神楽",
  dengaku: "田楽",
  furyu: "風流",
  lion_dance: "獅子舞",
  bon_dance: "盆踊り",
  puppet_theatre: "人形芝居",
  ritual_performance: "神事芸能",
  other: "民俗芸能",
  unknown: "分類確認中",
};

type ProjectedEntity = PublicProjection["json"]["entities"][number];
type DetailEntity = PublicEntityDetailProjection["entity"];
type MatsuriProfileFields = {
  festival_kind?: string;
  performance_kind?: string;
  usual_months?: number[];
  recurrence_pattern?: {
    rule_text_ja?: string;
    date_rule_text_ja?: string;
  };
};

export interface RelationGroup {
  key: "organizations" | "religious-sites" | "records" | "other";
  title: string;
  items: RelationItem[];
}

export interface RecordUpdateItem {
  label: string;
  date: string;
  detail: string;
}

export interface MatsuriEntityDetailViewModel {
  entityId: string;
  entityType: string;
  title: string;
  description: string;
  name: string;
  reading?: string;
  identityKicker: string;
  browseHref: string;
  browseLabel: string;
  region: string;
  meta: string[];
  overviewTitle: string;
  overview: OverviewItem[];
  stateExplanation?: string;
  stateEvidenceHref?: string;
  aboutParagraphs: string[];
  places: PlaceItem[];
  placeContext?: string;
  occurrences: OccurrenceRow[];
  changes: ChangeTimelineItem[];
  relationGroups: RelationGroup[];
  designations: DesignationItem[];
  evidence: EvidenceItem[];
  officialHref?: string;
  dataHref: string;
  recordUpdates: RecordUpdateItem[];
  boundaryNotice?: string;
}

function preferredName(entity: ProjectedEntity | DetailEntity): string {
  return (
    entity.names.find((name) => name.is_preferred)?.value ??
    entity.names[0]?.value ??
    entity.id
  );
}

function readingName(entity: DetailEntity): string | undefined {
  return entity.names.find((name) => name.kind === "reading")?.value;
}

function formatDate(value: string | undefined): string {
  if (!value) return "日付不明";
  const [year, month, day] = value.split("-");
  if (!year) return value;
  if (!month) return `${Number(year)}年`;
  if (!day) return `${Number(year)}年${Number(month)}月`;
  return `${Number(year)}年${Number(month)}月${Number(day)}日`;
}

function formatPeriod(period: { start?: string; end?: string } | undefined): string {
  if (!period) return "時期不明";
  if (period.start && period.end && period.start !== period.end) {
    return `${formatDate(period.start)}〜${formatDate(period.end)}`;
  }
  return formatDate(period.start ?? period.end);
}

function regionLabel(entity: ProjectedEntity | DetailEntity): string {
  const labels = entity.geographic_scope.areas.map((area) =>
    [area.prefecture_name_ja, area.municipality_name_ja].filter(Boolean).join(" "),
  );
  return [...new Set(labels)].join("・");
}

function addressLabel(place: PublicEntityDetailProjection["places"][number]): string | undefined {
  const value = [
    place.prefecture_name_ja,
    place.municipality_name_ja,
    place.locality_ja,
    place.street_address_ja,
  ]
    .filter(Boolean)
    .join("");
  return value || undefined;
}

function recurrenceLabel(entity: DetailEntity): string | undefined {
  const profile = entity as typeof entity & MatsuriProfileFields;
  const explicit =
    profile.recurrence_pattern?.date_rule_text_ja ??
    profile.recurrence_pattern?.rule_text_ja;
  if (explicit) return explicit;
  if (!profile.usual_months || profile.usual_months.length === 0) return undefined;
  return `${profile.usual_months.join("・")}月`;
}

function kindLabel(entity: DetailEntity): string | undefined {
  const profile = entity as typeof entity & MatsuriProfileFields;
  if (entity.entity_type === "festival" && profile.festival_kind) {
    return festivalKindLabels[profile.festival_kind] ?? profile.festival_kind;
  }
  if (entity.entity_type === "folk_performance" && profile.performance_kind) {
    return performanceKindLabels[profile.performance_kind] ?? profile.performance_kind;
  }
  return undefined;
}

function evidenceId(value: string): string {
  return `evidence-${value}`;
}

function evidenceHref(
  detail: PublicEntityDetailProjection,
  targetType: string,
  targetId: string | undefined,
): string | undefined {
  if (!targetId) return undefined;
  const match = detail.evidence.find(
    (view) =>
      view.evidence.target_type === targetType &&
      view.evidence.target_id === targetId,
  );
  return match ? `#${evidenceId(match.evidence.id)}` : undefined;
}

function relationGroupKey(entityType: string): RelationGroup["key"] {
  if (entityType === "organization") return "organizations";
  if (entityType === "shrine" || entityType === "temple") return "religious-sites";
  if (["festival", "tradition_unit", "folk_performance"].includes(entityType)) {
    return "records";
  }
  return "other";
}

const relationGroupTitles: Record<RelationGroup["key"], string> = {
  organizations: "運営・継承する団体",
  "religious-sites": "関係する神社・寺院",
  records: "関連する祭礼・民俗芸能",
  other: "その他の関係",
};

function relationTargetHref(entity: DetailEntity): string {
  return (
    entityPublicHref(entity) ??
    entity.external_links.find((link) => link.is_primary)?.url ??
    `/search/?q=${encodeURIComponent(preferredName(entity))}`
  );
}

export function buildMatsuriEntityDetailViewModel(
  detail: PublicEntityDetailProjection,
): MatsuriEntityDetailViewModel {
  const entity = detail.entity;
  const name = preferredName(entity);
  const region = regionLabel(entity);
  const recurrence = recurrenceLabel(entity);
  const typeLabel = entityTypeLabel(entity.entity_type);
  const profileKind = kindLabel(entity);
  const officialLink =
    entity.external_links.find((link) => link.is_primary) ?? entity.external_links[0];
  const publicDataHref = entityDataHref(entity);
  if (!publicDataHref) {
    throw new Error(`Entity ${entity.id} has no public machine-readable route`);
  }

  const overview: OverviewItem[] = [];
  if (detail.current_state) {
    overview.push({
      label: "現在状態",
      value: stateLabels[detail.current_state.state_code] ?? detail.current_state.state_code,
      accent: true,
    });
    overview.push({
      label: "最終確認",
      value: formatDate(detail.current_state.observed_at),
    });
  }
  if (detail.latest_occurrence) {
    overview.push({
      label: "直近の開催・上演",
      value: `${formatPeriod(detail.latest_occurrence.temporal_extent)}　${outcomeLabels[detail.latest_occurrence.outcome] ?? detail.latest_occurrence.outcome}`,
    });
  }
  if (recurrence) overview.push({ label: "例年時期・周期", value: recurrence });
  if (region) overview.push({ label: "地域", value: region });
  if (detail.places.length > 0) {
    overview.push({
      label: "主な場所",
      value: detail.places.map((place) => place.name_ja).join("、"),
    });
  }
  if (officialLink) {
    overview.push({
      label: "公式情報",
      value: "公式・公的情報を見る",
      href: officialLink.url,
    });
  }

  const currentStateEvidence = detail.current_state
    ? detail.evidence.find(
        (view) =>
          view.evidence.target_type === "state_snapshot" &&
          view.evidence.target_id === detail.current_state?.id,
      )
    : undefined;

  const places: PlaceItem[] = detail.places.map((place) => ({
    name: place.name_ja,
    ...(addressLabel(place) ? { address: addressLabel(place) } : {}),
    ...(placeKindLabels[place.place_kind]
      ? { contextLabel: placeKindLabels[place.place_kind] }
      : {}),
    detailHref: placePublicHref(place),
  }));

  const occurrences: OccurrenceRow[] = detail.occurrence_history.map((occurrence) => ({
    date: formatPeriod(occurrence.temporal_extent),
    outcome: outcomeLabels[occurrence.outcome] ?? occurrence.outcome,
    scale: scaleLabels[occurrence.scale] ?? occurrence.scale,
  }));

  const changes: ChangeTimelineItem[] = detail.changes.map((change) => ({
    date: formatPeriod(change.effective_period),
    typeLabel: eventLabels[change.event_type] ?? "変化",
    summary: change.summary_ja,
    ...(evidenceHref(detail, "change_event", change.id)
      ? { evidenceHref: evidenceHref(detail, "change_event", change.id) }
      : {}),
  }));

  const groupedRelations = new Map<RelationGroup["key"], RelationItem[]>();
  for (const view of detail.relations) {
    const otherEntity =
      view.direction === "outgoing" ? view.target_entity : view.source_entity;
    const key = relationGroupKey(otherEntity.entity_type);
    const item: RelationItem = {
      label: relationLabels[view.relation.relation_type] ?? view.relation.relation_type,
      targetName: preferredName(otherEntity),
      href: relationTargetHref(otherEntity),
      ...(evidenceHref(detail, "relation", view.relation.id)
        ? { evidenceHref: evidenceHref(detail, "relation", view.relation.id) }
        : {}),
      ...(view.relation.valid_period
        ? { validityPeriod: formatPeriod(view.relation.valid_period) }
        : {}),
    };
    groupedRelations.set(key, [...(groupedRelations.get(key) ?? []), item]);
  }

  const relationOrder: RelationGroup["key"][] = [
    "organizations",
    "religious-sites",
    "records",
    "other",
  ];
  const relationGroups = relationOrder.flatMap((key) => {
    const items = groupedRelations.get(key) ?? [];
    return items.length > 0 ? [{ key, title: relationGroupTitles[key], items }] : [];
  });

  const designations: DesignationItem[] = detail.designations.map((designation) => ({
    name: designation.designation_name_ja,
    system: designation.designation_system,
    authority: designation.designation_level,
    ...(designation.valid_period
      ? { validPeriod: formatPeriod(designation.valid_period) }
      : {}),
    ...(evidenceHref(detail, "designation", designation.id)
      ? { sourceHref: evidenceHref(detail, "designation", designation.id) }
      : {}),
  }));

  const evidence: EvidenceItem[] = detail.evidence.map((view) => ({
    id: evidenceId(view.evidence.id),
    targetLabel:
      evidenceTargetLabels[view.evidence.target_type] ?? view.evidence.target_type,
    sourceTitle: view.source.title,
    supportSummary: view.evidence.summary_ja,
    sourceHref: view.source.url,
  }));

  const aboutParagraphs = [entity.summary_ja, entity.description_ja].filter(
    (value): value is string => Boolean(value),
  );

  const recordUpdates: RecordUpdateItem[] = [];
  if (entity.created_at) {
    recordUpdates.push({
      label: "初回記録",
      date: formatDate(entity.created_at.slice(0, 10)),
      detail: "この公開記録を作成しました。",
    });
  }
  if (entity.updated_at && entity.updated_at !== entity.created_at) {
    recordUpdates.push({
      label: entity.record_version > 1 ? "公開記録を改訂" : "公開記録を更新",
      date: formatDate(entity.updated_at.slice(0, 10)),
      detail: `公開データの記録バージョンは${entity.record_version}です。`,
    });
  }

  const isSeedReference = entity.entity_type === "shrine" || entity.entity_type === "temple";

  return {
    entityId: entity.id,
    entityType: entity.entity_type,
    title: `${name}｜祭のゆくえ`,
    description: `${name}について、現在の確認情報、履歴、関係、根拠資料をたどれる公開記録です。`,
    name,
    ...(readingName(entity) ? { reading: readingName(entity) } : {}),
    identityKicker: isSeedReference ? `${typeLabel}参照記録` : `${typeLabel}記録`,
    browseHref: entityBrowseHref(entity.entity_type),
    browseLabel: isSeedReference ? "関連先" : typeLabel,
    region,
    meta: [typeLabel, region, profileKind, recurrence].filter(
      (value): value is string => Boolean(value),
    ),
    overviewTitle: detail.current_state ? "現在どうなっているか" : "基本情報",
    overview,
    ...(currentStateEvidence?.evidence.summary_ja
      ? { stateExplanation: currentStateEvidence.evidence.summary_ja }
      : {}),
    ...(currentStateEvidence
      ? { stateEvidenceHref: `#${evidenceId(currentStateEvidence.evidence.id)}` }
      : {}),
    aboutParagraphs,
    places,
    ...(entity.geographic_scope.description_ja
      ? { placeContext: entity.geographic_scope.description_ja }
      : {}),
    occurrences,
    changes,
    relationGroups,
    designations,
    evidence,
    ...(officialLink ? { officialHref: officialLink.url } : {}),
    dataHref: publicDataHref,
    recordUpdates,
    ...(isSeedReference
      ? {
          boundaryNotice:
            "このページは祭礼・民俗芸能との確認済みの関係を示す参照記録です。神社・寺院自体の現在状態、管理状態、法人状態は祭のゆくえでは判定していません。",
        }
      : {}),
  };
}
