export const festivalKinds = [
  "shrine_festival",
  "temple_festival",
  "community_festival",
  "ritual_festival",
  "dance_festival",
  "procession_festival",
  "composite_festival",
  "other",
  "unknown",
] as const;

export type FestivalKind = (typeof festivalKinds)[number];

export const performanceKinds = [
  "kagura",
  "dengaku",
  "shishimai",
  "bon_odori",
  "puppet_theatre",
  "hayashi",
  "dance",
  "ritual_performance",
  "narrative_performance",
  "other",
  "unknown",
] as const;

export type PerformanceKind = (typeof performanceKinds)[number];

export const traditionUnitKinds = [
  "ritual",
  "procession",
  "float_tradition",
  "ceremony",
  "competition",
  "fire_rite",
  "other",
] as const;

export type TraditionUnitKind = (typeof traditionUnitKinds)[number];

export const organizationKinds = [
  "preservation_group",
  "festival_committee",
  "local_association",
  "religious_organization",
  "municipality",
  "public_agency",
  "foundation",
  "association",
  "other",
] as const;

export type OrganizationKind = (typeof organizationKinds)[number];

export const festivalStateCodes = [
  "active",
  "suspended",
  "dormant",
  "reviving",
  "discontinued",
  "unknown",
] as const;

export type FestivalStateCode = (typeof festivalStateCodes)[number];

export const folkPerformanceStateCodes = [
  "active",
  "reduced_activity",
  "suspended",
  "dormant",
  "reviving",
  "discontinued",
  "unknown",
] as const;

export type FolkPerformanceStateCode = (typeof folkPerformanceStateCodes)[number];

export const matsuriChangeEventTypes = [
  "suspension_started",
  "suspension_ended",
  "revival_activity_started",
  "revival_announced",
  "revival_completed",
  "format_changed",
  "schedule_rule_changed",
  "venue_changed",
  "organizer_changed",
  "preservation_group_formed",
  "preservation_group_reorganized",
  "merged_with",
  "renamed",
  "designation_added",
  "designation_changed",
  "designation_removed",
  "disaster_interruption",
  "discontinued",
  "other",
] as const;

export type MatsuriChangeEventType = (typeof matsuriChangeEventTypes)[number];

export const matsuriOccurrenceTypes = [
  "festival_edition",
  "festival_component",
  "performance",
  "ritual",
  "procession",
  "dedication",
  "other",
] as const;

export type MatsuriOccurrenceType = (typeof matsuriOccurrenceTypes)[number];

export const matsuriRelationTypes = [
  "held_at",
  "performed_at",
  "dedicated_at",
  "historically_dedicated_at",
  "hosted_by",
  "organized_by",
  "maintained_by",
  "supported_by",
  "member_of",
  "successor_of",
  "includes_performance",
  "includes_tradition",
  "includes_unit",
  "participates_in",
  "part_of_tradition",
  "ritually_associated_with",
  "historically_associated_with",
] as const;

export type MatsuriRelationType = (typeof matsuriRelationTypes)[number];
