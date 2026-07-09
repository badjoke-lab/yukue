import type {
  ChangeEventRecord,
  EntityRecord,
  OccurrenceRecord,
  RelationRecord,
  StateSnapshotRecord,
} from "../common/index.js";
import type {
  FestivalProfile,
  FolkPerformanceProfile,
  OrganizationProfile,
  TraditionUnitProfile,
} from "./profiles.js";
import type {
  FestivalStateCode,
  FolkPerformanceStateCode,
  MatsuriChangeEventType,
  MatsuriOccurrenceType,
  MatsuriRelationType,
} from "./vocabularies.js";

export type FestivalEntityRecord = EntityRecord<"festival"> & FestivalProfile;

export type FolkPerformanceEntityRecord = EntityRecord<"folk_performance"> & FolkPerformanceProfile;

export type TraditionUnitEntityRecord = EntityRecord<"tradition_unit"> & TraditionUnitProfile;

export type OrganizationEntityRecord = EntityRecord<"organization"> & OrganizationProfile;

export type ShrineSeedEntityRecord = EntityRecord<"shrine">;

export type TempleSeedEntityRecord = EntityRecord<"temple">;

export type MatsuriEntityRecord =
  | FestivalEntityRecord
  | FolkPerformanceEntityRecord
  | TraditionUnitEntityRecord
  | OrganizationEntityRecord
  | ShrineSeedEntityRecord
  | TempleSeedEntityRecord;

export type FestivalStateSnapshotRecord = StateSnapshotRecord<FestivalStateCode>;

export type FolkPerformanceStateSnapshotRecord = StateSnapshotRecord<FolkPerformanceStateCode>;

export type MatsuriStateSnapshotRecord =
  | FestivalStateSnapshotRecord
  | FolkPerformanceStateSnapshotRecord;

export type MatsuriChangeEventRecord = ChangeEventRecord<MatsuriChangeEventType>;

export type MatsuriOccurrenceRecord = OccurrenceRecord<MatsuriOccurrenceType>;

export type MatsuriRelationRecord = RelationRecord<MatsuriRelationType>;
