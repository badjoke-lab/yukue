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
  ValidPeriod,
} from "@badjoke-lab/yukue-schemas/common";
import type { ValidationIssue } from "@badjoke-lab/yukue-validation";

export interface PublicCurrentState {
  entity_id: string;
  snapshot_id: string;
  state_schema: string;
  state_code: string;
  observed_at: string;
  basis_evidence_ids: string[];
  effective_period?: ValidPeriod;
}

export interface PublicProjectedEntity extends EntityRecord {
  current_state?: PublicCurrentState;
  latest_occurrence?: OccurrenceRecord;
}

export interface PublicEvidenceView {
  evidence: EvidenceRecord;
  source: SourceRecord;
}

export interface PublicRelationView {
  relation: RelationRecord;
  direction: "outgoing" | "incoming";
  source_entity: EntityRecord;
  target_entity: EntityRecord;
}

export interface PublicEntityDetailProjection {
  entity: EntityRecord;
  current_state?: PublicCurrentState;
  places: PlaceRecord[];
  latest_occurrence?: OccurrenceRecord;
  occurrence_history: OccurrenceRecord[];
  changes: ChangeEventRecord[];
  relations: PublicRelationView[];
  designations: DesignationRecord[];
  images: ImageAssetRecord[];
  evidence: PublicEvidenceView[];
  sources: SourceRecord[];
}

export interface PublicHtmlProjection {
  entity_details: PublicEntityDetailProjection[];
}

export interface PublicJsonProjection {
  entities: PublicProjectedEntity[];
  places: PlaceRecord[];
  state_snapshots: StateSnapshotRecord[];
  current_states: PublicCurrentState[];
  change_events: ChangeEventRecord[];
  occurrences: OccurrenceRecord[];
  occurrence_series: OccurrenceSeriesRecord[];
  recurrence_patterns: RecurrencePatternRecord[];
  relations: RelationRecord[];
  designations: DesignationRecord[];
  sources: SourceRecord[];
  evidence: EvidenceRecord[];
  images: ImageAssetRecord[];
}

export interface PublicProjection {
  html: PublicHtmlProjection;
  json: PublicJsonProjection;
}

export class ProjectionBuildError extends Error {
  readonly issues: ValidationIssue[];

  constructor(message: string, issues: ValidationIssue[]) {
    super(message);
    this.name = "ProjectionBuildError";
    this.issues = issues;
  }
}
