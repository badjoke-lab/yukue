import type { DatasetBundle, ValidationIssue } from "./types.js";

interface IdentifiedRecord {
  id: string;
  schema_version: string;
  record_version: number;
}

const schemaVersionPattern = /^[a-z][a-z0-9-]*\.v\d+(?:\.\d+)?$/;

function idSet(records: IdentifiedRecord[]): Set<string> {
  return new Set(records.map((record) => record.id));
}

function checkReference(
  issues: ValidationIssue[],
  value: string | undefined,
  targetIds: Set<string>,
  recordId: string,
  path: string,
  code = "REFERENCE_NOT_FOUND",
): void {
  if (!value) return;
  if (!targetIds.has(value)) {
    issues.push({
      severity: "error",
      code,
      message: `Record ${recordId} references missing ID ${value} at ${path}.`,
      recordId,
      path,
    });
  }
}

function checkReferences(
  issues: ValidationIssue[],
  values: string[],
  targetIds: Set<string>,
  recordId: string,
  path: string,
  code = "REFERENCE_NOT_FOUND",
): void {
  values.forEach((value, index) =>
    checkReference(issues, value, targetIds, recordId, `${path}[${index}]`, code),
  );
}

export function validateReferences(bundle: DatasetBundle): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const groups: Array<[string, IdentifiedRecord[]]> = [
    ["entities", bundle.entities],
    ["places", bundle.places],
    ["stateSnapshots", bundle.stateSnapshots],
    ["changeEvents", bundle.changeEvents],
    ["occurrences", bundle.occurrences],
    ["occurrenceSeries", bundle.occurrenceSeries],
    ["recurrencePatterns", bundle.recurrencePatterns],
    ["relations", bundle.relations],
    ["designations", bundle.designations],
    ["sources", bundle.sources],
    ["evidence", bundle.evidence],
    ["images", bundle.images],
  ];

  const seenIds = new Map<string, string>();

  for (const [groupName, records] of groups) {
    for (const record of records) {
      const previousGroup = seenIds.get(record.id);
      if (previousGroup) {
        issues.push({
          severity: "error",
          code: "DUPLICATE_RECORD_ID",
          message: `Record ID ${record.id} appears in both ${previousGroup} and ${groupName}.`,
          recordId: record.id,
          path: groupName,
        });
      } else {
        seenIds.set(record.id, groupName);
      }

      if (!schemaVersionPattern.test(record.schema_version)) {
        issues.push({
          severity: "error",
          code: "INVALID_SCHEMA_VERSION",
          message: `Record ${record.id} has invalid schema_version ${record.schema_version}.`,
          recordId: record.id,
          path: "schema_version",
        });
      }

      if (!Number.isInteger(record.record_version) || record.record_version < 1) {
        issues.push({
          severity: "error",
          code: "INVALID_RECORD_VERSION",
          message: `Record ${record.id} must have a positive integer record_version.`,
          recordId: record.id,
          path: "record_version",
        });
      }
    }
  }

  const entityIds = idSet(bundle.entities);
  const placeIds = idSet(bundle.places);
  const stateSnapshotIds = idSet(bundle.stateSnapshots);
  const occurrenceSeriesIds = idSet(bundle.occurrenceSeries);
  const recurrencePatternIds = idSet(bundle.recurrencePatterns);
  const relationIds = idSet(bundle.relations);
  const designationIds = idSet(bundle.designations);
  const changeEventIds = idSet(bundle.changeEvents);
  const occurrenceIds = idSet(bundle.occurrences);
  const sourceIds = idSet(bundle.sources);
  const evidenceIds = idSet(bundle.evidence);

  for (const entity of bundle.entities) {
    checkReference(issues, entity.primary_place_id, placeIds, entity.id, "primary_place_id");
    checkReferences(issues, entity.default_place_ids, placeIds, entity.id, "default_place_ids");
    checkReference(issues, entity.superseded_by, entityIds, entity.id, "superseded_by");

    entity.names.forEach((name, nameIndex) => {
      checkReferences(
        issues,
        name.source_ids,
        sourceIds,
        entity.id,
        `names[${nameIndex}].source_ids`,
      );
    });

    entity.external_links.forEach((link, linkIndex) => {
      checkReference(
        issues,
        link.owner_entity_id,
        entityIds,
        entity.id,
        `external_links[${linkIndex}].owner_entity_id`,
      );
    });
  }

  for (const place of bundle.places) {
    checkReferences(issues, place.source_ids, sourceIds, place.id, "source_ids");
  }

  for (const snapshot of bundle.stateSnapshots) {
    checkReference(issues, snapshot.entity_id, entityIds, snapshot.id, "entity_id");
    checkReferences(
      issues,
      snapshot.basis_evidence_ids,
      evidenceIds,
      snapshot.id,
      "basis_evidence_ids",
    );
  }

  for (const change of bundle.changeEvents) {
    checkReferences(issues, change.subject_entity_ids, entityIds, change.id, "subject_entity_ids");
    checkReferences(
      issues,
      change.resulting_state_snapshot_ids,
      stateSnapshotIds,
      change.id,
      "resulting_state_snapshot_ids",
    );
    checkReferences(
      issues,
      change.related_relation_ids,
      relationIds,
      change.id,
      "related_relation_ids",
    );
    checkReferences(issues, change.evidence_ids, evidenceIds, change.id, "evidence_ids");
  }

  for (const occurrence of bundle.occurrences) {
    checkReference(issues, occurrence.subject_entity_id, entityIds, occurrence.id, "subject_entity_id");
    checkReference(issues, occurrence.series_id, occurrenceSeriesIds, occurrence.id, "series_id");
    checkReferences(issues, occurrence.venue_place_ids, placeIds, occurrence.id, "venue_place_ids");
    checkReferences(
      issues,
      occurrence.organizer_entity_ids,
      entityIds,
      occurrence.id,
      "organizer_entity_ids",
    );
    checkReferences(issues, occurrence.evidence_ids, evidenceIds, occurrence.id, "evidence_ids");
  }

  for (const series of bundle.occurrenceSeries) {
    checkReference(issues, series.subject_entity_id, entityIds, series.id, "subject_entity_id");
    checkReference(
      issues,
      series.recurrence_pattern_id,
      recurrencePatternIds,
      series.id,
      "recurrence_pattern_id",
    );
    checkReferences(
      issues,
      series.default_venue_place_ids,
      placeIds,
      series.id,
      "default_venue_place_ids",
    );
    checkReferences(issues, series.evidence_ids, evidenceIds, series.id, "evidence_ids");
  }

  for (const pattern of bundle.recurrencePatterns) {
    checkReferences(issues, pattern.evidence_ids, evidenceIds, pattern.id, "evidence_ids");
  }

  for (const relation of bundle.relations) {
    checkReference(
      issues,
      relation.source_entity_id,
      entityIds,
      relation.id,
      "source_entity_id",
      "RELATION_ENDPOINT_NOT_FOUND",
    );
    checkReference(
      issues,
      relation.target_entity_id,
      entityIds,
      relation.id,
      "target_entity_id",
      "RELATION_ENDPOINT_NOT_FOUND",
    );
    checkReferences(issues, relation.evidence_ids, evidenceIds, relation.id, "evidence_ids");
  }

  for (const designation of bundle.designations) {
    checkReferences(
      issues,
      designation.subject_entity_ids,
      entityIds,
      designation.id,
      "subject_entity_ids",
    );
    checkReference(
      issues,
      designation.authority_entity_id,
      entityIds,
      designation.id,
      "authority_entity_id",
    );
    checkReferences(issues, designation.evidence_ids, evidenceIds, designation.id, "evidence_ids");
  }

  const targetSets = new Map<string, Set<string>>([
    ["state_snapshot", stateSnapshotIds],
    ["change_event", changeEventIds],
    ["occurrence", occurrenceIds],
    ["relation", relationIds],
    ["designation", designationIds],
    ["recurrence_pattern", recurrencePatternIds],
    ["entity_identity", entityIds],
    ["name_variant", entityIds],
    ["location", entityIds],
    ["place", placeIds],
  ]);

  for (const evidence of bundle.evidence) {
    checkReference(
      issues,
      evidence.source_id,
      sourceIds,
      evidence.id,
      "source_id",
      "EVIDENCE_SOURCE_NOT_FOUND",
    );

    const targetIds = targetSets.get(evidence.target_type);
    if (!targetIds || !targetIds.has(evidence.target_id)) {
      issues.push({
        severity: "error",
        code: "EVIDENCE_TARGET_NOT_FOUND",
        message: `Evidence ${evidence.id} targets missing ${evidence.target_type} record ${evidence.target_id}.`,
        recordId: evidence.id,
        path: "target_id",
      });
    }
  }

  for (const image of bundle.images) {
    checkReference(
      issues,
      image.entity_id,
      entityIds,
      image.id,
      "entity_id",
      "IMAGE_ENTITY_NOT_FOUND",
    );
    checkReference(issues, image.place_id, placeIds, image.id, "place_id");
  }

  return issues;
}
