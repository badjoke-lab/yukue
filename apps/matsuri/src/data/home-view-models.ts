import type { PublicProjection } from "@badjoke-lab/yukue-observation-core";
import type { OccurrenceRow, SnapshotMetric } from "@badjoke-lab/yukue-ui";
import { entityPublicHref } from "./public-routes.js";

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

type ProjectedEntity = PublicProjection["json"]["entities"][number];

function preferredName(entity: ProjectedEntity): string {
  return (
    entity.names.find((name) => name.is_preferred)?.value ??
    entity.names[0]?.value ??
    entity.id
  );
}

function regionLabel(entity: ProjectedEntity): string {
  const regions = entity.geographic_scope.areas.map((area) =>
    [area.prefecture_name_ja, area.municipality_name_ja].filter(Boolean).join(" "),
  );
  return [...new Set(regions)].join("・");
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

function occurrenceSortKey(
  occurrence: PublicProjection["json"]["occurrences"][number],
): string {
  return occurrence.temporal_extent.start ?? occurrence.temporal_extent.end ?? "";
}

function changeSortKey(
  change: PublicProjection["json"]["change_events"][number],
): string {
  return change.effective_period?.start ?? change.announced_at ?? change.decided_at ?? "";
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
    { label: stateLabels.active, value: countState("active"), href: "/states/active/" },
    { label: stateLabels.suspended, value: countState("suspended"), href: "/states/suspended/" },
    { label: stateLabels.dormant, value: countState("dormant"), href: "/states/dormant/" },
    { label: stateLabels.reviving, value: countState("reviving"), href: "/states/reviving/" },
    { label: stateLabels.unknown, value: countState("unknown"), href: "/states/unknown/" },
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
      const href = entityPublicHref(subject);
      if (!href) return [];
      return [
        {
          date: formatPeriod(change.effective_period),
          type: eventLabels[change.event_type] ?? "変化",
          name: preferredName(subject),
          summary: change.summary_ja,
          href,
        },
      ];
    });

  const occurrences: OccurrenceRow[] = [...projection.json.occurrences]
    .sort((a, b) => occurrenceSortKey(b).localeCompare(occurrenceSortKey(a)))
    .slice(0, 3)
    .flatMap((occurrence) => {
      const subject = entitiesById.get(occurrence.subject_entity_id);
      if (!subject) return [];
      const href = entityPublicHref(subject);
      if (!href) return [];
      return [
        {
          date: formatPeriod(occurrence.temporal_extent),
          name: preferredName(subject),
          region: regionLabel(subject),
          outcome: outcomeLabels[occurrence.outcome] ?? occurrence.outcome,
          href,
        },
      ];
    });

  return { metrics, changes, occurrences };
}
