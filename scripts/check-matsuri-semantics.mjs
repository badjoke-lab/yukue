import { deriveCurrentStates, validateDataset } from "../packages/validation/dist/index.js";
import { loadMatsuriDataset, matsuriF1BatchFiles } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = path.join(repositoryRoot, "apps", "matsuri", "dist");
const auditDate = process.env.MATSURI_AUDIT_DATE ?? new Date().toISOString().slice(0, 10);

const forbiddenStateCodes = new Set(["revived", "active_modified"]);
const forbiddenGenericRelationTypes = new Set([
  "associated_with",
  "related_to",
  "generic_association",
]);
const identityTypes = new Set([
  "festival",
  "tradition_unit",
  "folk_performance",
]);

function preferredName(entity) {
  return (
    entity.names.find((name) => name.is_preferred)?.value ??
    entity.names[0]?.value ??
    entity.id
  );
}

function normalizeIdentityText(value) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("ja")
    .replace(/[\s・･·,，.。'"「」『』()（）\-‐‑–—ー]/gu, "");
}

function geographicSignature(entity) {
  return entity.geographic_scope.areas
    .map((area) =>
      [area.prefecture_code, area.municipality_name_ja ?? ""]
        .join(":")
        .normalize("NFKC"),
    )
    .sort((a, b) => a.localeCompare(b))
    .join("|");
}

function upperBoundDate(value) {
  if (/^\d{4}$/u.test(value)) {
    return `${value}-12-31`;
  }

  if (/^\d{4}-\d{2}$/u.test(value)) {
    const [year, month] = value.split("-").map(Number);
    const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
    return `${value}-${String(lastDay).padStart(2, "0")}`;
  }

  if (/^\d{4}-\d{2}-\d{2}$/u.test(value)) {
    return value;
  }

  return undefined;
}

function relationConnects(relations, leftId, rightId) {
  return relations.some(
    (relation) =>
      (relation.source_entity_id === leftId && relation.target_entity_id === rightId) ||
      (relation.source_entity_id === rightId && relation.target_entity_id === leftId),
  );
}

function addError(errors, code, message, recordId) {
  errors.push({ code, message, ...(recordId ? { recordId } : {}) });
}

const dataset = loadMatsuriDataset();
const validation = validateDataset(dataset);
const errors = validation.errors.map((issue) => ({
  code: issue.code,
  message: issue.message,
  ...(issue.recordId ? { recordId: issue.recordId } : {}),
}));

const publicEntitiesFeed = JSON.parse(
  fs.readFileSync(path.join(outputRoot, "data", "entities.json"), "utf8"),
);
const publicEntitiesById = new Map(
  publicEntitiesFeed.records.map((entity) => [entity.id, entity]),
);
const entitiesById = new Map(dataset.entities.map((entity) => [entity.id, entity]));
const snapshotsById = new Map(
  dataset.stateSnapshots.map((snapshot) => [snapshot.id, snapshot]),
);

for (const [familyName, records] of Object.entries(dataset)) {
  if (!Array.isArray(records)) continue;

  for (const record of records) {
    if (
      Object.hasOwn(record, "review_status") &&
      record.review_status !== "approved"
    ) {
      addError(
        errors,
        "PUBLIC_RECORD_NOT_APPROVED",
        `${familyName} record ${record.id} has review_status=${String(record.review_status)}.`,
        record.id,
      );
    }
  }
}

for (const entity of dataset.entities) {
  if (Object.hasOwn(entity, "current_state")) {
    addError(
      errors,
      "CANONICAL_ENTITY_CONTAINS_CURRENT_STATE",
      `Entity ${entity.id} stores current_state directly instead of deriving it from State Snapshots.`,
      entity.id,
    );
  }

  if (Object.hasOwn(entity, "designation") || Object.hasOwn(entity, "designations")) {
    addError(
      errors,
      "DESIGNATION_FLATTENED_INTO_ENTITY",
      `Entity ${entity.id} contains designation data instead of using Designation records.`,
      entity.id,
    );
  }
}

for (const snapshot of dataset.stateSnapshots) {
  if (forbiddenStateCodes.has(snapshot.state_code)) {
    addError(
      errors,
      "FORBIDDEN_CURRENT_STATE_CODE",
      `State Snapshot ${snapshot.id} uses forbidden state code ${snapshot.state_code}.`,
      snapshot.id,
    );
  }

  if (Object.hasOwn(snapshot, "outcome")) {
    addError(
      errors,
      "STATE_SNAPSHOT_CONTAINS_OCCURRENCE_OUTCOME",
      `State Snapshot ${snapshot.id} contains an Occurrence outcome.`,
      snapshot.id,
    );
  }
}

const derived = deriveCurrentStates(dataset.stateSnapshots);
for (const issue of derived.issues.filter((issue) => issue.severity === "error")) {
  addError(errors, issue.code, issue.message, issue.recordId);
}

for (const state of derived.states) {
  const projectedEntity = publicEntitiesById.get(state.entityId);
  if (!projectedEntity) {
    addError(
      errors,
      "DERIVED_STATE_ENTITY_NOT_PUBLIC",
      `Derived Current State references missing public Entity ${state.entityId}.`,
      state.entityId,
    );
    continue;
  }

  if (
    projectedEntity.current_state?.state_code !== state.stateCode ||
    projectedEntity.current_state?.observed_at !== state.observedAt
  ) {
    addError(
      errors,
      "PUBLIC_CURRENT_STATE_DERIVATION_MISMATCH",
      `Public Entity ${state.entityId} Current State does not match approved State Snapshot derivation.`,
      state.entityId,
    );
  }
}

for (const occurrence of dataset.occurrences) {
  if (Object.hasOwn(occurrence, "state_code") || Object.hasOwn(occurrence, "current_state")) {
    addError(
      errors,
      "OCCURRENCE_CONTAINS_ENTITY_STATE",
      `Occurrence ${occurrence.id} contains Entity State data.`,
      occurrence.id,
    );
  }

  if (Object.hasOwn(occurrence, "event_type")) {
    addError(
      errors,
      "OCCURRENCE_CONTAINS_CHANGE_EVENT_TYPE",
      `Occurrence ${occurrence.id} contains a Change Event type.`,
      occurrence.id,
    );
  }

  if (occurrence.outcome === "scheduled") {
    const temporalValue = occurrence.temporal_extent.end ?? occurrence.temporal_extent.start;
    const upperBound = temporalValue ? upperBoundDate(temporalValue) : undefined;

    if (!upperBound) {
      addError(
        errors,
        "SCHEDULED_OCCURRENCE_WITHOUT_AUDITABLE_DATE",
        `Scheduled Occurrence ${occurrence.id} has no auditable temporal upper bound.`,
        occurrence.id,
      );
    } else if (upperBound < auditDate) {
      addError(
        errors,
        "PAST_OCCURRENCE_STILL_SCHEDULED",
        `Scheduled Occurrence ${occurrence.id} ended by ${upperBound}, before audit date ${auditDate}.`,
        occurrence.id,
      );
    }
  }
}

for (const change of dataset.changeEvents) {
  if (
    Object.hasOwn(change, "outcome") ||
    Object.hasOwn(change, "scale") ||
    Object.hasOwn(change, "occurrence_type")
  ) {
    addError(
      errors,
      "CHANGE_EVENT_CONTAINS_OCCURRENCE_FIELDS",
      `Change Event ${change.id} contains Occurrence-only fields.`,
      change.id,
    );
  }

  for (const snapshotId of change.resulting_state_snapshot_ids ?? []) {
    const snapshot = snapshotsById.get(snapshotId);
    if (
      snapshot &&
      !change.subject_entity_ids.includes(snapshot.entity_id)
    ) {
      addError(
        errors,
        "CHANGE_RESULT_STATE_SUBJECT_MISMATCH",
        `Change Event ${change.id} points to State Snapshot ${snapshotId} for another Entity.`,
        change.id,
      );
    }

    if (
      change.event_type === "revival_completed" &&
      snapshot &&
      snapshot.state_code !== "active"
    ) {
      addError(
        errors,
        "REVIVAL_COMPLETED_WITH_NON_ACTIVE_RESULT",
        `Revival completion ${change.id} points to non-active State Snapshot ${snapshotId}.`,
        change.id,
      );
    }
  }
}

for (const relation of dataset.relations) {
  if (relation.source_entity_id === relation.target_entity_id) {
    addError(
      errors,
      "SELF_RELATION",
      `Relation ${relation.id} links Entity ${relation.source_entity_id} to itself.`,
      relation.id,
    );
  }

  if (forbiddenGenericRelationTypes.has(relation.relation_type)) {
    addError(
      errors,
      "GENERIC_RELATION_TYPE",
      `Relation ${relation.id} uses generic relation type ${relation.relation_type}.`,
      relation.id,
    );
  }
}

const identityGroups = new Map();
for (const entity of dataset.entities.filter((item) => identityTypes.has(item.entity_type))) {
  const key = `${normalizeIdentityText(preferredName(entity))}|${geographicSignature(entity)}`;
  const group = identityGroups.get(key) ?? [];
  group.push(entity);
  identityGroups.set(key, group);
}

for (const group of identityGroups.values()) {
  if (group.length < 2) continue;

  for (let leftIndex = 0; leftIndex < group.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < group.length; rightIndex += 1) {
      const left = group[leftIndex];
      const right = group[rightIndex];
      if (!left || !right) continue;

      if (left.entity_type === right.entity_type) {
        addError(
          errors,
          "DUPLICATE_IDENTITY_CANDIDATE",
          `Entities ${left.id} and ${right.id} share type, preferred name, and geographic scope.`,
          left.id,
        );
      } else if (!relationConnects(dataset.relations, left.id, right.id)) {
        addError(
          errors,
          "UNEXPLAINED_CROSS_TYPE_IDENTITY_SPLIT",
          `Entities ${left.id} and ${right.id} share preferred name and geography but have no explicit Relation.`,
          left.id,
        );
      }
    }
  }
}

for (const designation of dataset.designations) {
  for (const entityId of designation.subject_entity_ids) {
    if (!entitiesById.has(entityId)) {
      addError(
        errors,
        "DESIGNATION_SUBJECT_MISSING",
        `Designation ${designation.id} references missing Entity ${entityId}.`,
        designation.id,
      );
    }
  }
}

if (errors.length > 0) {
  throw new Error(
    `Matsuri semantic audit failed with ${errors.length} issue(s):\n${errors
      .map(
        (issue) =>
          `- [${issue.code}]${issue.recordId ? ` ${issue.recordId}:` : ""} ${issue.message}`,
      )
      .join("\n")}`,
  );
}

if (validation.warnings.length > 0) {
  console.log(
    `Matsuri validation warnings (${validation.warnings.length}):\n${validation.warnings
      .map((issue) => `- [${issue.code}] ${issue.message}`)
      .join("\n")}`,
  );
}

console.log(
  `Matsuri semantic audit passed for D1 plus ${matsuriF1BatchFiles.length} F1 files: ${dataset.entities.length} Entities, ${dataset.stateSnapshots.length} State Snapshots, ${dataset.occurrences.length} Occurrences, ${dataset.changeEvents.length} Change Events, ${dataset.relations.length} Relations, and ${dataset.designations.length} Designations as of ${auditDate}.`,
);
