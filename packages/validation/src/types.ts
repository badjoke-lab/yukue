import type {
  ChangeEventRecord,
  DesignationRecord,
  EntityRecord,
  EvidenceRecord,
  ImageAssetRecord,
  OccurrenceRecord,
  OccurrenceSeriesRecord,
  PlaceRecord,
  RecurrencePatternRecord,
  RelationRecord,
  SourceRecord,
  StateSnapshotRecord,
} from "@badjoke-lab/yukue-schemas/common";

export interface DatasetBundle {
  entities: EntityRecord[];
  places: PlaceRecord[];
  stateSnapshots: StateSnapshotRecord[];
  changeEvents: ChangeEventRecord[];
  occurrences: OccurrenceRecord[];
  occurrenceSeries: OccurrenceSeriesRecord[];
  recurrencePatterns: RecurrencePatternRecord[];
  relations: RelationRecord[];
  designations: DesignationRecord[];
  sources: SourceRecord[];
  evidence: EvidenceRecord[];
  images: ImageAssetRecord[];
  publicProjection?: unknown;
}

export type ValidationSeverity = "error" | "warning";

export interface ValidationIssue {
  severity: ValidationSeverity;
  code: string;
  message: string;
  recordId?: string;
  path?: string;
}

export interface ValidationResult {
  ok: boolean;
  issues: ValidationIssue[];
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

export interface DerivedCurrentState {
  entityId: string;
  snapshotId: string;
  stateCode: string;
  observedAt: string;
}
