import type {
  ChangeEventRecord,
  EntityRecord,
  EvidenceRecord,
  OccurrenceRecord,
  PlaceRecord,
  RelationRecord,
  SourceRecord,
} from "@badjoke-lab/yukue-schemas/common";
import {
  deriveCurrentStates,
  validateDataset,
  type DatasetBundle,
} from "@badjoke-lab/yukue-validation";
import type {
  PublicCurrentState,
  PublicEntityDetailProjection,
  PublicEvidenceView,
  PublicJsonProjection,
  PublicProjectedEntity,
  PublicProjection,
  PublicRelationView,
} from "./types.js";
import { ProjectionBuildError } from "./types.js";

function byId<T extends { id: string }>(records: T[]): Map<string, T> {
  return new Map(records.map((record) => [record.id, record]));
}

function sortById<T extends { id: string }>(records: T[]): T[] {
  return [...records].sort((a, b) => a.id.localeCompare(b.id));
}

function occurrenceKey(record: OccurrenceRecord): string {
  return record.temporal_extent.start ?? record.temporal_extent.end ?? "";
}

function changeKey(record: ChangeEventRecord): string {
  return (
    record.effective_period?.start ??
    record.announced_at ??
    record.decided_at ??
    ""
  );
}

function sortOccurrences(records: OccurrenceRecord[]): OccurrenceRecord[] {
  return [...records].sort((a, b) => {
    const dateOrder = occurrenceKey(b).localeCompare(occurrenceKey(a));
    return dateOrder !== 0 ? dateOrder : a.id.localeCompare(b.id);
  });
}

function sortChanges(records: ChangeEventRecord[]): ChangeEventRecord[] {
  return [...records].sort((a, b) => {
    const dateOrder = changeKey(b).localeCompare(changeKey(a));
    return dateOrder !== 0 ? dateOrder : a.id.localeCompare(b.id);
  });
}

function approvedCanonicalBundle(bundle: DatasetBundle): DatasetBundle {
  return {
    entities: [...bundle.entities],
    places: [...bundle.places],
    stateSnapshots: bundle.stateSnapshots.filter(
      (record) => record.review_status === "approved",
    ),
    changeEvents: bundle.changeEvents.filter(
      (record) => record.review_status === "approved",
    ),
    occurrences: bundle.occurrences.filter(
      (record) => record.review_status === "approved",
    ),
    occurrenceSeries: [...bundle.occurrenceSeries],
    recurrencePatterns: [...bundle.recurrencePatterns],
    relations: bundle.relations.filter(
      (record) => record.review_status === "approved",
    ),
    designations: [...bundle.designations],
    sources: [...bundle.sources],
    evidence: bundle.evidence.filter(
      (record) => record.review_status === "approved",
    ),
    images: bundle.images.filter(
      (record) => record.review_status === "approved",
    ),
  };
}

function ensureValid(stage: string, bundle: DatasetBundle): void {
  const result = validateDataset(bundle);
  if (!result.ok) {
    throw new ProjectionBuildError(
      `Public Projection ${stage} validation failed.`,
      result.errors,
    );
  }
}

function buildCurrentStates(bundle: DatasetBundle): PublicCurrentState[] {
  const snapshots = byId(bundle.stateSnapshots);
  const result = deriveCurrentStates(bundle.stateSnapshots);

  if (result.issues.length > 0) {
    throw new ProjectionBuildError(
      "Public Projection Current State derivation failed.",
      result.issues,
    );
  }

  return result.states.map((state) => {
    const snapshot = snapshots.get(state.snapshotId);
    if (!snapshot) {
      throw new ProjectionBuildError(
        `Current State snapshot ${state.snapshotId} is missing.`,
        [],
      );
    }

    return {
      entity_id: state.entityId,
      snapshot_id: snapshot.id,
      state_schema: snapshot.state_schema,
      state_code: state.stateCode,
      observed_at: state.observedAt,
      basis_evidence_ids: [...snapshot.basis_evidence_ids],
      ...(snapshot.effective_period
        ? { effective_period: snapshot.effective_period }
        : {}),
    };
  });
}

function relationViewsForEntity(
  entityId: string,
  relations: RelationRecord[],
  entitiesById: Map<string, EntityRecord>,
): PublicRelationView[] {
  const views: PublicRelationView[] = [];

  for (const relation of relations) {
    if (
      relation.source_entity_id !== entityId &&
      relation.target_entity_id !== entityId
    ) {
      continue;
    }

    const sourceEntity = entitiesById.get(relation.source_entity_id);
    const targetEntity = entitiesById.get(relation.target_entity_id);
    if (!sourceEntity || !targetEntity) continue;

    views.push({
      relation,
      direction:
        relation.source_entity_id === entityId ? "outgoing" : "incoming",
      source_entity: sourceEntity,
      target_entity: targetEntity,
    });
  }

  return views.sort((a, b) => a.relation.id.localeCompare(b.relation.id));
}

function collectEvidenceTargetIds(
  entity: EntityRecord,
  detailPlaces: PlaceRecord[],
  currentState: PublicCurrentState | undefined,
  occurrences: OccurrenceRecord[],
  changes: ChangeEventRecord[],
  relationViews: PublicRelationView[],
  designationIds: string[],
  recurrencePatternIds: string[],
): Set<string> {
  return new Set([
    entity.id,
    ...detailPlaces.map((place) => place.id),
    ...(currentState ? [currentState.snapshot_id] : []),
    ...occurrences.map((record) => record.id),
    ...changes.map((record) => record.id),
    ...relationViews.map((view) => view.relation.id),
    ...designationIds,
    ...recurrencePatternIds,
  ]);
}

function evidenceViews(
  evidence: EvidenceRecord[],
  sourcesById: Map<string, SourceRecord>,
  targetIds: Set<string>,
): PublicEvidenceView[] {
  const views: PublicEvidenceView[] = [];

  for (const record of evidence) {
    if (!targetIds.has(record.target_id)) continue;
    const source = sourcesById.get(record.source_id);
    if (!source) continue;
    views.push({ evidence: record, source });
  }

  return views.sort((a, b) => a.evidence.id.localeCompare(b.evidence.id));
}

function sourcesForDetail(
  entity: EntityRecord,
  places: PlaceRecord[],
  evidence: PublicEvidenceView[],
  sourcesById: Map<string, SourceRecord>,
): SourceRecord[] {
  const ids = new Set<string>();

  for (const name of entity.names) {
    for (const sourceId of name.source_ids) ids.add(sourceId);
  }

  for (const place of places) {
    for (const sourceId of place.source_ids) ids.add(sourceId);
  }

  for (const view of evidence) ids.add(view.source.id);

  return [...ids]
    .map((id) => sourcesById.get(id))
    .filter((source): source is SourceRecord => source !== undefined)
    .sort((a, b) => a.id.localeCompare(b.id));
}

function buildEntityDetails(
  bundle: DatasetBundle,
  currentStates: PublicCurrentState[],
): PublicEntityDetailProjection[] {
  const entitiesById = byId(bundle.entities);
  const placesById = byId(bundle.places);
  const sourcesById = byId(bundle.sources);
  const currentStateByEntity = new Map(
    currentStates.map((state) => [state.entity_id, state]),
  );

  return sortById(bundle.entities).map((entity) => {
    const placeIds = new Set([
      ...(entity.primary_place_id ? [entity.primary_place_id] : []),
      ...entity.default_place_ids,
    ]);
    const places = [...placeIds]
      .map((id) => placesById.get(id))
      .filter((place): place is PlaceRecord => place !== undefined);

    const occurrenceHistory = sortOccurrences(
      bundle.occurrences.filter(
        (record) => record.subject_entity_id === entity.id,
      ),
    );
    const latestOccurrence = occurrenceHistory[0];
    const changes = sortChanges(
      bundle.changeEvents.filter((record) =>
        record.subject_entity_ids.includes(entity.id),
      ),
    );
    const relations = relationViewsForEntity(
      entity.id,
      bundle.relations,
      entitiesById,
    );
    const designations = sortById(
      bundle.designations.filter((record) =>
        record.subject_entity_ids.includes(entity.id),
      ),
    );
    const images = [...bundle.images]
      .filter((record) => record.entity_id === entity.id)
      .sort((a, b) => {
        if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
        return a.display_order - b.display_order;
      });
    const currentState = currentStateByEntity.get(entity.id);

    const series = bundle.occurrenceSeries.filter(
      (record) => record.subject_entity_id === entity.id,
    );
    const recurrencePatternIds = series
      .map((record) => record.recurrence_pattern_id)
      .filter((id): id is string => id !== undefined);

    const targetIds = collectEvidenceTargetIds(
      entity,
      places,
      currentState,
      occurrenceHistory,
      changes,
      relations,
      designations.map((record) => record.id),
      recurrencePatternIds,
    );
    const evidence = evidenceViews(bundle.evidence, sourcesById, targetIds);
    const sources = sourcesForDetail(entity, places, evidence, sourcesById);

    return {
      entity,
      ...(currentState ? { current_state: currentState } : {}),
      places,
      ...(latestOccurrence ? { latest_occurrence: latestOccurrence } : {}),
      occurrence_history: occurrenceHistory,
      changes,
      relations,
      designations,
      images,
      evidence,
      sources,
    };
  });
}

function buildJsonProjection(
  bundle: DatasetBundle,
  currentStates: PublicCurrentState[],
): PublicJsonProjection {
  const stateByEntity = new Map(
    currentStates.map((state) => [state.entity_id, state]),
  );
  const occurrencesByEntity = new Map<string, OccurrenceRecord[]>();

  for (const occurrence of bundle.occurrences) {
    const group = occurrencesByEntity.get(occurrence.subject_entity_id) ?? [];
    group.push(occurrence);
    occurrencesByEntity.set(occurrence.subject_entity_id, group);
  }

  const entities: PublicProjectedEntity[] = sortById(bundle.entities).map(
    (entity) => {
      const currentState = stateByEntity.get(entity.id);
      const latestOccurrence = sortOccurrences(
        occurrencesByEntity.get(entity.id) ?? [],
      )[0];

      return {
        ...entity,
        ...(currentState ? { current_state: currentState } : {}),
        ...(latestOccurrence ? { latest_occurrence: latestOccurrence } : {}),
      };
    },
  );

  return {
    entities,
    places: sortById(bundle.places),
    state_snapshots: sortById(bundle.stateSnapshots),
    current_states: [...currentStates].sort((a, b) =>
      a.entity_id.localeCompare(b.entity_id),
    ),
    change_events: sortById(bundle.changeEvents),
    occurrences: sortById(bundle.occurrences),
    occurrence_series: sortById(bundle.occurrenceSeries),
    recurrence_patterns: sortById(bundle.recurrencePatterns),
    relations: sortById(bundle.relations),
    designations: sortById(bundle.designations),
    sources: sortById(bundle.sources),
    evidence: sortById(bundle.evidence),
    images: sortById(bundle.images),
  };
}

export function buildPublicProjection(
  canonicalBundle: DatasetBundle,
): PublicProjection {
  ensureValid("canonical input", canonicalBundle);

  const approvedBundle = approvedCanonicalBundle(canonicalBundle);
  ensureValid("approved record boundary", approvedBundle);

  const currentStates = buildCurrentStates(approvedBundle);
  const json = buildJsonProjection(approvedBundle, currentStates);
  const projection: PublicProjection = {
    html: {
      entity_details: buildEntityDetails(approvedBundle, currentStates),
    },
    json,
  };

  ensureValid("output", {
    ...approvedBundle,
    entities: json.entities,
    publicProjection: projection,
  });

  return projection;
}
