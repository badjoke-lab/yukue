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
  SnapshotMetric,
} from "@badjoke-lab/yukue-ui";

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
  revival_completed: "復活",
  discontinuation_confirmed: "終了確認",
  schedule_changed: "開催時期変更",
  place_changed: "場所変更",
  organizer_changed: "運営主体変更",
  organization_restructured: "組織再編",
  designation_changed: "指定変更",
};

const outcomeLabels: Record<string, string> = {
  scheduled: "開催予定",
  held: "開催",
  partially_held: "一部開催",
  postponed: "延期",
  rescheduled: "日程変更",
  cancelled: "中止",
  not_held: "未実施",
  unknown: "要確認",
};

const scaleLabels: Record<string, string> = {
  normal: "通常",
  reduced: "縮小",
  expanded: "拡大",
  modified: "変更あり",
  unknown: "要確認",
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

type ProjectedEntity = PublicProjection["json"]["entities"][number];

type MatsuriProfileFields = {
  festival_kind?: string;
  performance_kind?: string;
  usual_months?: number[];
  recurrence_pattern?: {
    rule_text_ja?: string;
    date_rule_text_ja?: string;
  };
};

function preferredName(entity: ProjectedEntity | PublicEntityDetailProjection["entity"]): string {
  return (
    entity.names.find((name) => name.is_preferred)?.value ??
    entity.names[0]?.value ??
    entity.id
  );
}

function readingName(entity: PublicEntityDetailProjection["entity"]): string | undefined {
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

function regionLabel(entity: ProjectedEntity | PublicEntityDetailProjection["entity"]): string {
  const regions = entity.geographic_scope.areas.map((area) =>
    [area.prefecture_name_ja, area.municipality_name_ja].filter(Boolean).join(" "),
  );
  return [...new Set(regions)].join("・");
}

function entityHref(entity: ProjectedEntity | PublicEntityDetailProjection["entity"]): string {
  const slug = entity.slug ?? entity.id;
  switch (entity.entity_type) {
    case "festival":
    case "tradition_unit":
      return `/festivals/${slug}/`;
    case "folk_performance":
      return `/performances/${slug}/`;
    case "organization":
      return `/organizations/${slug}/`;
    default:
      return `/${entity.entity_type}/${slug}/`;
  }
}

function occurrenceDate(occurrence: PublicProjection["json"]["occurrences"][number]): string {
  return formatPeriod(occurrence.temporal_extent);
}

function occurrenceSortKey(occurrence: PublicProjection["json"]["occurrences"][number]): string {
  return occurrence.temporal_extent.start ?? occurrence.temporal_extent.end ?? "";
}

function changeSortKey(change: PublicProjection["json"]["change_events"][number]): string {
  return change.effective_period?.start ?? change.announced_at ?? change.decided_at ?? "";
}

function recurrenceLabel(entity: PublicEntityDetailProjection["entity"]): string | undefined {
  const profile = entity as typeof entity & MatsuriProfileFields;
  const explicit =
    profile.recurrence_pattern?.date_rule_text_ja ??
    profile.recurrence_pattern?.rule_text_ja;
  if (explicit) return explicit;
  if (!profile.usual_months || profile.usual_months.length === 0) return undefined;
  return `${profile.usual_months.join("・")}月`;
}

function entityKindLabel(entity: PublicEntityDetailProjection["entity"]): string | undefined {
  const profile = entity as typeof entity & MatsuriProfileFields;
  if (entity.entity_type === "festival" && profile.festival_kind) {
    return festivalKindLabels[profile.festival_kind] ?? profile.festival_kind;
  }
  if (entity.entity_type === "folk_performance" && profile.performance_kind) {
    return performanceKindLabels[profile.performance_kind] ?? profile.performance_kind;
  }
  return undefined;
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

export interface MatsuriHomeViewModel {
  metrics: SnapshotMetric[];
  changes: Array<{
    date: string;
    type: string;
    name: string;
    summary: string;
    href: string;
  }>;
  occurrences: OccurrenceRow[];
}

export function buildMatsuriHomeViewModel(
  projection: PublicProjection,
): MatsuriHomeViewModel {
  const states = projection.json.current_states;
  const countState = (stateCode: string) =>
    states.filter((state) => state.state_code === stateCode).length;

  const metrics: SnapshotMetric[] = [
    { label: "継続中", value: countState("active"), href: "/states/active/" },
    { label: "休止中", value: countState("suspended"), href: "/states/suspended/" },
    { label: "長期休止", value: countState("dormant"), href: "/states/dormant/" },
    { label: "復活活動中", value: countState("reviving"), href: "/states/reviving/" },
    { label: "要確認", value: countState("unknown"), href: "/states/unknown/" },
  ];

  const entitiesById = new Map(
    projection.json.entities.map((entity) => [entity.id, entity]),
  );

  const changes = [...projection.json.change_events]
    .sort((a, b) => changeSortKey(b).localeCompare(changeSortKey(a)))
    .slice(0, 3)
    .flatMap((change) => {
      const subject = change.subject_entity_ids
        .map((id) => entitiesById.get(id))
        .find((entity) => entity !== undefined);
      if (!subject) return [];
      return [
        {
          date: formatPeriod(change.effective_period),
          type: eventLabels[change.event_type] ?? change.event_type,
          name: preferredName(subject),
          summary: change.summary_ja,
          href: entityHref(subject),
        },
      ];
    });

  const occurrences: OccurrenceRow[] = [...projection.json.occurrences]
    .sort((a, b) => occurrenceSortKey(b).localeCompare(occurrenceSortKey(a)))
    .slice(0, 3)
    .flatMap((occurrence) => {
      const subject = entitiesById.get(occurrence.subject_entity_id);
      if (!subject) return [];
      return [
        {
          date: occurrenceDate(occurrence),
          name: preferredName(subject),
          region: regionLabel(subject),
          outcome: outcomeLabels[occurrence.outcome] ?? occurrence.outcome,
          href: entityHref(subject),
        },
      ];
    });

  return { metrics, changes, occurrences };
}

export interface FestivalDetailViewModel {
  title: string;
  description: string;
  name: string;
  reading?: string;
  region: string;
  meta: string[];
  overview: OverviewItem[];
  aboutParagraphs: string[];
  places: PlaceItem[];
  placeContext?: string;
  occurrences: OccurrenceRow[];
  changes: ChangeTimelineItem[];
  relations: RelationItem[];
  designations: DesignationItem[];
  evidence: EvidenceItem[];
}

export function buildFestivalDetailViewModel(
  detail: PublicEntityDetailProjection,
): FestivalDetailViewModel {
  const entity = detail.entity;
  const name = preferredName(entity);
  const region = regionLabel(entity);
  const recurrence = recurrenceLabel(entity);
  const kind = entityKindLabel(entity);
  const officialLink = entity.external_links.find((link) => link.is_primary) ?? entity.external_links[0];

  const overview: OverviewItem[] = [];
  if (detail.current_state) {
    overview.push({
      label: "現在状態",
      value: stateLabels[detail.current_state.state_code] ?? detail.current_state.state_code,
      accent: true,
    });
    overview.push({
      label: "確認日",
      value: formatDate(detail.current_state.observed_at),
    });
  }
  if (detail.latest_occurrence) {
    overview.push({
      label: "直近の実施",
      value: `${occurrenceDate(detail.latest_occurrence)}　${outcomeLabels[detail.latest_occurrence.outcome] ?? detail.latest_occurrence.outcome}`,
    });
  }
  if (recurrence) overview.push({ label: "通常開催", value: recurrence });
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

  const places: PlaceItem[] = detail.places.map((place) => ({
    name: place.name_ja,
    ...(addressLabel(place) ? { address: addressLabel(place) } : {}),
    ...(placeKindLabels[place.place_kind]
      ? { contextLabel: placeKindLabels[place.place_kind] }
      : {}),
  }));

  const occurrences: OccurrenceRow[] = detail.occurrence_history.map((occurrence) => ({
    date: occurrenceDate(occurrence),
    outcome: outcomeLabels[occurrence.outcome] ?? occurrence.outcome,
    scale: scaleLabels[occurrence.scale] ?? occurrence.scale,
  }));

  const changes: ChangeTimelineItem[] = detail.changes.map((change) => ({
    date: formatPeriod(change.effective_period),
    typeLabel: eventLabels[change.event_type] ?? change.event_type,
    summary: change.summary_ja,
    evidenceHref: "#evidence",
  }));

  const relations: RelationItem[] = detail.relations.map((view) => {
    const otherEntity =
      view.direction === "outgoing" ? view.target_entity : view.source_entity;
    return {
      label: relationLabels[view.relation.relation_type] ?? view.relation.relation_type,
      targetName: preferredName(otherEntity),
      href: entityHref(otherEntity),
      ...(view.relation.valid_period
        ? { validityPeriod: formatPeriod(view.relation.valid_period) }
        : {}),
    };
  });

  const designations: DesignationItem[] = detail.designations.map((designation) => ({
    name: designation.designation_name_ja,
    system: designation.designation_system,
    authority: designation.designation_level,
    ...(designation.valid_period
      ? { validPeriod: formatPeriod(designation.valid_period) }
      : {}),
    sourceHref: "#evidence",
  }));

  const evidence: EvidenceItem[] = detail.evidence.map((view) => ({
    targetLabel:
      evidenceTargetLabels[view.evidence.target_type] ?? view.evidence.target_type,
    sourceTitle: view.source.title,
    supportSummary: view.evidence.summary_ja,
    sourceHref: view.source.url,
  }));

  const aboutParagraphs = [entity.summary_ja, entity.description_ja].filter(
    (value): value is string => Boolean(value),
  );

  return {
    title: `${name}｜祭のゆくえ`,
    description: `${name}の基本情報、現在状態、開催履歴、変化、関係する場所と組織、根拠資料を記録します。`,
    name,
    ...(readingName(entity) ? { reading: readingName(entity) } : {}),
    region,
    meta: [region, kind, recurrence].filter((value): value is string => Boolean(value)),
    overview,
    aboutParagraphs,
    places,
    ...(entity.geographic_scope.description_ja
      ? { placeContext: entity.geographic_scope.description_ja }
      : {}),
    occurrences,
    changes,
    relations,
    designations,
    evidence,
  };
}
