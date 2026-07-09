export const commonEntityTypes = [
  "festival",
  "folk_performance",
  "tradition_unit",
  "organization",
  "shrine",
  "temple",
  "cemetery",
  "columbarium",
  "burial_facility",
] as const;

export type CommonEntityType = (typeof commonEntityTypes)[number];

export const traditionScopes = [
  "standalone",
  "umbrella",
  "component",
  "collective",
  "unknown",
] as const;

export type TraditionScope = (typeof traditionScopes)[number];

export const nameKinds = [
  "canonical",
  "official",
  "common",
  "former",
  "alternate",
  "reading",
  "romanized",
  "english",
  "local",
  "historical",
] as const;

export type NameKind = (typeof nameKinds)[number];

export const geographicScopeTypes = [
  "single_site",
  "single_area",
  "multi_site",
  "multi_area",
  "route_based",
  "distributed",
  "unknown",
] as const;

export type GeographicScopeType = (typeof geographicScopeTypes)[number];

export const recordLifecycles = [
  "active",
  "superseded",
  "withdrawn",
  "merged_record",
] as const;

export type RecordLifecycle = (typeof recordLifecycles)[number];

export const reviewStatuses = [
  "candidate",
  "needs_review",
  "needs_information",
  "conflicted",
  "approved",
  "rejected",
  "on_hold",
  "superseded",
] as const;

export type ReviewStatus = (typeof reviewStatuses)[number];

export const temporalPrecisions = [
  "day",
  "month",
  "year",
  "range",
  "season",
  "unknown",
] as const;

export type TemporalPrecision = (typeof temporalPrecisions)[number];

export const recurrencePatternTypes = [
  "annual",
  "biennial",
  "triennial",
  "quadrennial",
  "monthly",
  "seasonal",
  "irregular",
  "custom",
  "unknown",
] as const;

export type RecurrencePatternType = (typeof recurrencePatternTypes)[number];

export const occurrenceOutcomes = [
  "scheduled",
  "held",
  "partially_held",
  "postponed",
  "rescheduled",
  "cancelled",
  "not_held",
  "unknown",
] as const;

export type OccurrenceOutcome = (typeof occurrenceOutcomes)[number];

export const occurrenceScales = [
  "normal",
  "reduced",
  "expanded",
  "modified",
  "unknown",
] as const;

export type OccurrenceScale = (typeof occurrenceScales)[number];

export const coordinatePrecisions = [
  "exact",
  "venue",
  "approximate",
  "municipality",
  "unknown",
] as const;

export type CoordinatePrecision = (typeof coordinatePrecisions)[number];

export const externalLinkKinds = [
  "official_website",
  "organizer_website",
  "preservation_group_website",
  "municipality_page",
  "official_tourism_page",
  "social",
  "video_channel",
  "other",
] as const;

export type ExternalLinkKind = (typeof externalLinkKinds)[number];

export const externalLinkPlatforms = [
  "web",
  "x",
  "instagram",
  "facebook",
  "youtube",
  "tiktok",
  "other",
] as const;

export type ExternalLinkPlatform = (typeof externalLinkPlatforms)[number];

export const officialityValues = [
  "official",
  "official_organization",
  "public_authority",
  "unknown",
] as const;

export type Officiality = (typeof officialityValues)[number];

export const evidenceTargetTypes = [
  "state_snapshot",
  "change_event",
  "occurrence",
  "relation",
  "designation",
  "recurrence_pattern",
  "entity_identity",
  "name_variant",
  "location",
  "place",
] as const;

export type EvidenceTargetType = (typeof evidenceTargetTypes)[number];

export const rightsReviewStatuses = [
  "pending",
  "approved",
  "rejected",
] as const;

export type RightsReviewStatus = (typeof rightsReviewStatuses)[number];
