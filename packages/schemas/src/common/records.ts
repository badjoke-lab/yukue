import type {
  CommonEntityType,
  CoordinatePrecision,
  EvidenceTargetType,
  OccurrenceOutcome,
  OccurrenceScale,
  RecordLifecycle,
  RecurrencePatternType,
  ReviewStatus,
  RightsReviewStatus,
  TraditionScope,
} from "./vocabularies.js";
import type {
  AuditedRecordEnvelope,
  ExternalLink,
  GeographicScope,
  ISODate,
  ISODateTime,
  NameVariant,
  PublicSlug,
  RecordEnvelope,
  RecordId,
  TemporalExtent,
  ValidPeriod,
} from "./primitives.js";

export interface EntityRecord<
  TEntityType extends CommonEntityType = CommonEntityType,
> extends AuditedRecordEnvelope {
  slug?: PublicSlug;
  entity_type: TEntityType;
  home_surface: string;
  tradition_scope: TraditionScope;
  names: NameVariant[];
  summary_ja: string;
  description_ja?: string;
  geographic_scope: GeographicScope;
  primary_place_id?: RecordId;
  default_place_ids: RecordId[];
  external_links: ExternalLink[];
  record_lifecycle: RecordLifecycle;
  superseded_by?: RecordId;
}

export interface PlaceRecord extends RecordEnvelope {
  name_ja: string;
  place_kind: string;
  country_code: string;
  prefecture_code?: string;
  prefecture_name_ja?: string;
  municipality_code?: string;
  municipality_name_ja?: string;
  locality_ja?: string;
  street_address_ja?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  coordinate_precision: CoordinatePrecision;
  map_label_ja?: string;
  source_ids: RecordId[];
}

export interface StateSnapshotRecord<
  TStateCode extends string = string,
> extends RecordEnvelope {
  entity_id: RecordId;
  state_schema: string;
  state_code: TStateCode;
  effective_period?: ValidPeriod;
  observed_at: ISODate | ISODateTime;
  basis_evidence_ids: RecordId[];
  review_status: ReviewStatus;
}

export interface ChangeEventRecord<
  TEventType extends string = string,
> extends RecordEnvelope {
  event_type: TEventType;
  subject_entity_ids: RecordId[];
  decided_at?: ISODate | ISODateTime;
  announced_at?: ISODate | ISODateTime;
  effective_period?: ValidPeriod;
  summary_ja: string;
  resulting_state_snapshot_ids: RecordId[];
  related_relation_ids: RecordId[];
  evidence_ids: RecordId[];
  review_status: ReviewStatus;
}

export interface OccurrenceRecord<
  TOccurrenceType extends string = string,
> extends RecordEnvelope {
  subject_entity_id: RecordId;
  series_id?: RecordId;
  occurrence_type: TOccurrenceType;
  temporal_extent: TemporalExtent;
  outcome: OccurrenceOutcome;
  scale: OccurrenceScale;
  venue_place_ids: RecordId[];
  organizer_entity_ids: RecordId[];
  evidence_ids: RecordId[];
  review_status: ReviewStatus;
}

export interface OccurrenceSeriesRecord<
  TSeriesType extends string = string,
> extends RecordEnvelope {
  subject_entity_id: RecordId;
  series_type: TSeriesType;
  name_ja?: string;
  recurrence_pattern_id?: RecordId;
  default_venue_place_ids: RecordId[];
  valid_period?: ValidPeriod;
  evidence_ids: RecordId[];
}

export interface RecurrencePatternRecord extends RecordEnvelope {
  pattern_type: RecurrencePatternType;
  rule_text_ja?: string;
  rrule?: string;
  valid_period?: ValidPeriod;
  evidence_ids: RecordId[];
}

export interface RelationRecord<
  TRelationType extends string = string,
> extends RecordEnvelope {
  source_entity_id: RecordId;
  relation_type: TRelationType;
  target_entity_id: RecordId;
  valid_period?: ValidPeriod;
  evidence_ids: RecordId[];
  review_status: ReviewStatus;
}

export interface DesignationRecord extends RecordEnvelope {
  designation_name_ja: string;
  subject_entity_ids: RecordId[];
  designation_system: string;
  designation_level?: string;
  authority_entity_id?: RecordId;
  valid_period?: ValidPeriod;
  evidence_ids: RecordId[];
}

export interface SourceRecord extends RecordEnvelope {
  source_type: string;
  title: string;
  publisher?: string;
  url: string;
  archive_url?: string;
  published_at?: ISODate | ISODateTime;
  updated_at_source?: ISODate | ISODateTime;
  accessed_at: ISODate | ISODateTime;
  language: string;
}

export interface EvidenceRecord extends RecordEnvelope {
  source_id: RecordId;
  target_type: EvidenceTargetType;
  target_id: RecordId;
  assertion_code: string;
  locator?: string;
  summary_ja: string;
  public_quote?: string;
  captured_at?: ISODate | ISODateTime;
  review_status: ReviewStatus;
}

export interface ImageAssetRecord extends AuditedRecordEnvelope {
  entity_id: RecordId;
  asset_path?: string;
  public_url?: string;
  title_ja?: string;
  caption_ja?: string;
  alt_text_ja: string;
  image_kind: string;
  is_primary: boolean;
  display_order: number;
  photographer_name?: string;
  credit_text: string;
  credit_url?: string;
  provider_name?: string;
  provider_url?: string;
  source_page_url?: string;
  license_type: string;
  license_name?: string;
  license_url?: string;
  commercial_use_allowed: boolean;
  modification_allowed?: boolean;
  attribution_required: boolean;
  acquired_via: string;
  permission_record_ref?: string;
  taken_at?: ISODate | ISODateTime;
  place_id?: RecordId;
  width?: number;
  height?: number;
  mime_type?: string;
  file_size_bytes?: number;
  review_status: ReviewStatus;
  rights_review_status: RightsReviewStatus;
}

export type CommonRecord =
  | EntityRecord
  | PlaceRecord
  | StateSnapshotRecord
  | ChangeEventRecord
  | OccurrenceRecord
  | OccurrenceSeriesRecord
  | RecurrencePatternRecord
  | RelationRecord
  | DesignationRecord
  | SourceRecord
  | EvidenceRecord
  | ImageAssetRecord;
