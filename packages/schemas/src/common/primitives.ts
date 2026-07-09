import type {
  ExternalLinkKind,
  ExternalLinkPlatform,
  GeographicScopeType,
  NameKind,
  Officiality,
  TemporalPrecision,
} from "./vocabularies.js";

export type RecordId = string;
export type PublicSlug = string;
export type SchemaVersion = `${string}.v${number}` | `${string}.v${number}.${number}`;
export type ISODate = string;
export type ISODateTime = string;
export type LanguageTag = string;

export interface RecordEnvelope {
  id: RecordId;
  schema_version: SchemaVersion;
  record_version: number;
}

export interface AuditedRecordEnvelope extends RecordEnvelope {
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface ValidPeriod {
  start?: ISODate | ISODateTime;
  end?: ISODate | ISODateTime;
}

export interface TemporalExtent {
  start?: ISODate | ISODateTime;
  end?: ISODate | ISODateTime;
  precision: TemporalPrecision;
  approximate?: boolean;
  display_text_ja?: string;
}

export interface NameVariant {
  value: string;
  lang: LanguageTag;
  script?: string;
  kind: NameKind;
  is_preferred: boolean;
  valid_from?: ISODate;
  valid_to?: ISODate;
  source_ids: RecordId[];
}

export interface AdministrativeLocationRef {
  prefecture_code?: string;
  prefecture_name_ja?: string;
  municipality_code?: string;
  municipality_name_ja?: string;
}

export interface GeographicScope {
  primary_location?: AdministrativeLocationRef;
  areas: AdministrativeLocationRef[];
  scope_type: GeographicScopeType;
  description_ja?: string;
}

export interface ExternalLink {
  kind: ExternalLinkKind;
  platform: ExternalLinkPlatform;
  label_ja?: string;
  url: string;
  owner_entity_id?: RecordId;
  is_primary: boolean;
  officiality: Officiality;
  valid_period?: ValidPeriod;
  last_checked_at?: ISODate;
}
