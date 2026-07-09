import type {
  RecordId,
  RecurrencePatternType,
  ValidPeriod,
} from "../common/index.js";
import type {
  FestivalKind,
  OrganizationKind,
  PerformanceKind,
  TraditionUnitKind,
} from "./vocabularies.js";

export interface MatsuriRecurrencePattern {
  pattern_type: RecurrencePatternType;
  rule_text_ja?: string;
  rrule?: string;
  valid_period?: ValidPeriod;
  evidence_ids: RecordId[];
}

export interface FestivalProfile {
  festival_kind: FestivalKind;
  recurrence_pattern?: MatsuriRecurrencePattern;
  usual_months: number[];
  usual_season?: string;
  date_rule_text_ja?: string;
  traditional_calendar_text_ja?: string;
  usual_duration_days?: number;
  season_tags: string[];
  public_notes_ja?: string;
}

export interface FolkPerformanceProfile {
  performance_kind: PerformanceKind;
  forms: string[];
  recurrence_pattern?: MatsuriRecurrencePattern;
  usual_months: number[];
  usual_season?: string;
  date_rule_text_ja?: string;
  occurrence_series_ids: RecordId[];
  public_notes_ja?: string;
}

export interface TraditionUnitProfile {
  unit_kind: TraditionUnitKind;
  parent_festival_ids: RecordId[];
  public_notes_ja?: string;
}

export interface OrganizationProfile {
  organization_kind: OrganizationKind;
  official_url?: string;
  public_notes_ja?: string;
}
