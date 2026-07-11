import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const auditDate = process.env.MATSURI_AUDIT_DATE ?? new Date().toISOString().slice(0, 10);
const currentStateMaxAgeDays = Number(
  process.env.MATSURI_CURRENT_STATE_MAX_AGE_DAYS ?? "730",
);

if (!/^\d{4}-\d{2}-\d{2}$/u.test(auditDate)) {
  throw new Error(`MATSURI_AUDIT_DATE must use YYYY-MM-DD: ${auditDate}`);
}

if (!Number.isInteger(currentStateMaxAgeDays) || currentStateMaxAgeDays < 1) {
  throw new Error(
    `MATSURI_CURRENT_STATE_MAX_AGE_DAYS must be a positive integer: ${String(currentStateMaxAgeDays)}`,
  );
}

const dataset = loadMatsuriDataset();
const sourcesById = new Map(dataset.sources.map((source) => [source.id, source]));
const evidenceById = new Map(dataset.evidence.map((evidence) => [evidence.id, evidence]));
const errors = [];

const criticalTargetSpecs = [
  {
    family: "State Snapshot",
    records: dataset.stateSnapshots,
    targetType: "state_snapshot",
    evidenceField: "basis_evidence_ids",
    assertionPrefix: "supports_current_state",
  },
  {
    family: "Change Event",
    records: dataset.changeEvents,
    targetType: "change_event",
    evidenceField: "evidence_ids",
    assertionPrefix: "supports_change_event",
  },
  {
    family: "Occurrence",
    records: dataset.occurrences,
    targetType: "occurrence",
    evidenceField: "evidence_ids",
    assertionPrefix: "supports_occurrence",
  },
  {
    family: "Relation",
    records: dataset.relations,
    targetType: "relation",
    evidenceField: "evidence_ids",
    assertionPrefix: "supports_relation",
  },
  {
    family: "Designation",
    records: dataset.designations,
    targetType: "designation",
    evidenceField: "evidence_ids",
    assertionPrefix: "supports_designation",
  },
  {
    family: "Recurrence Pattern",
    records: dataset.recurrencePatterns,
    targetType: "recurrence_pattern",
    evidenceField: "evidence_ids",
    assertionPrefix: "supports_recurrence",
  },
];

function addError(code, message, recordId) {
  errors.push({ code, message, ...(recordId ? { recordId } : {}) });
}

function dateOnly(value) {
  if (typeof value !== "string") return undefined;
  const candidate = value.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/u.test(candidate) ? candidate : undefined;
}

function utcDay(value) {
  const normalized = dateOnly(value);
  if (!normalized) return undefined;
  const milliseconds = Date.parse(`${normalized}T00:00:00Z`);
  return Number.isNaN(milliseconds) ? undefined : milliseconds;
}

function daysBetween(earlier, later) {
  const earlierDay = utcDay(earlier);
  const laterDay = utcDay(later);
  if (earlierDay === undefined || laterDay === undefined) return undefined;
  return Math.floor((laterDay - earlierDay) / 86_400_000);
}

function validatePublicUrl(value, label, recordId) {
  let url;
  try {
    url = new URL(value);
  } catch {
    addError("INVALID_SOURCE_URL", `${label} is not a valid URL: ${String(value)}`, recordId);
    return;
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    addError(
      "UNSUPPORTED_SOURCE_URL_PROTOCOL",
      `${label} must use HTTP or HTTPS: ${value}`,
      recordId,
    );
  }

  const hostname = url.hostname.toLowerCase();
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "example.com" ||
    hostname.endsWith(".example.com") ||
    hostname.endsWith(".invalid")
  ) {
    addError("PLACEHOLDER_SOURCE_URL", `${label} uses a placeholder host: ${value}`, recordId);
  }

  if (url.username || url.password) {
    addError("SOURCE_URL_CONTAINS_CREDENTIALS", `${label} contains URL credentials.`, recordId);
  }
}

function referencedSourceIds() {
  const ids = new Set(dataset.evidence.map((evidence) => evidence.source_id));

  for (const entity of dataset.entities) {
    for (const name of entity.names ?? []) {
      for (const sourceId of name.source_ids ?? []) ids.add(sourceId);
    }
  }

  for (const place of dataset.places) {
    for (const sourceId of place.source_ids ?? []) ids.add(sourceId);
  }

  return ids;
}

for (const source of dataset.sources) {
  if (typeof source.title !== "string" || source.title.trim().length < 3) {
    addError("SOURCE_TITLE_MISSING", `Source ${source.id} has no usable title.`, source.id);
  }

  if (typeof source.publisher !== "string" || source.publisher.trim().length < 2) {
    addError("SOURCE_PUBLISHER_MISSING", `Source ${source.id} has no usable publisher.`, source.id);
  }

  if (typeof source.language !== "string" || source.language.trim().length < 2) {
    addError("SOURCE_LANGUAGE_MISSING", `Source ${source.id} has no language marker.`, source.id);
  }

  validatePublicUrl(source.url, `Source ${source.id} URL`, source.id);
  if (source.archive_url) {
    validatePublicUrl(source.archive_url, `Source ${source.id} archive URL`, source.id);
  }

  const accessedAt = dateOnly(source.accessed_at);
  if (!accessedAt) {
    addError("SOURCE_ACCESSED_AT_INVALID", `Source ${source.id} has invalid accessed_at.`, source.id);
  } else if (accessedAt > auditDate) {
    addError(
      "SOURCE_ACCESSED_IN_FUTURE",
      `Source ${source.id} accessed_at ${accessedAt} is after audit date ${auditDate}.`,
      source.id,
    );
  }

  for (const field of ["published_at", "updated_at_source"]) {
    if (!source[field]) continue;
    const normalized = dateOnly(source[field]);
    if (!normalized) {
      addError(
        "SOURCE_DATE_INVALID",
        `Source ${source.id} has invalid ${field}: ${String(source[field])}.`,
        source.id,
      );
    } else if (normalized > auditDate) {
      addError(
        "SOURCE_DATE_IN_FUTURE",
        `Source ${source.id} ${field} ${normalized} is after audit date ${auditDate}.`,
        source.id,
      );
    }
  }
}

for (const sourceId of referencedSourceIds()) {
  if (!sourcesById.has(sourceId)) {
    addError("REFERENCED_SOURCE_MISSING", `Referenced Source ${sourceId} does not exist.`, sourceId);
  }
}

const referencedSourceIdSet = referencedSourceIds();
for (const source of dataset.sources) {
  if (!referencedSourceIdSet.has(source.id)) {
    addError("UNUSED_PUBLIC_SOURCE", `Source ${source.id} is not referenced by public data.`, source.id);
  }
}

for (const evidence of dataset.evidence) {
  if (evidence.review_status !== "approved") {
    addError(
      "EVIDENCE_NOT_APPROVED",
      `Evidence ${evidence.id} has review_status=${String(evidence.review_status)}.`,
      evidence.id,
    );
  }

  if (!sourcesById.has(evidence.source_id)) {
    addError(
      "EVIDENCE_SOURCE_MISSING",
      `Evidence ${evidence.id} references missing Source ${evidence.source_id}.`,
      evidence.id,
    );
  }

  if (typeof evidence.summary_ja !== "string" || evidence.summary_ja.trim().length < 15) {
    addError(
      "EVIDENCE_SUMMARY_TOO_SHORT",
      `Evidence ${evidence.id} has no sufficiently descriptive Japanese summary.`,
      evidence.id,
    );
  }

  if (typeof evidence.assertion_code !== "string" || evidence.assertion_code.trim().length < 4) {
    addError(
      "EVIDENCE_ASSERTION_CODE_MISSING",
      `Evidence ${evidence.id} has no usable assertion_code.`,
      evidence.id,
    );
  }

  const capturedAt = dateOnly(evidence.captured_at);
  if (!capturedAt) {
    addError(
      "EVIDENCE_CAPTURED_AT_MISSING",
      `Evidence ${evidence.id} has no valid captured_at date.`,
      evidence.id,
    );
  } else if (capturedAt > auditDate) {
    addError(
      "EVIDENCE_CAPTURED_IN_FUTURE",
      `Evidence ${evidence.id} captured_at ${capturedAt} is after audit date ${auditDate}.`,
      evidence.id,
    );
  }

  const source = sourcesById.get(evidence.source_id);
  if (source && evidence.summary_ja.trim() === source.title.trim()) {
    addError(
      "EVIDENCE_SUMMARY_ONLY_REPEATS_TITLE",
      `Evidence ${evidence.id} repeats only the Source title.`,
      evidence.id,
    );
  }
}

const criticalEvidenceReferences = new Map();

for (const spec of criticalTargetSpecs) {
  for (const record of spec.records) {
    const evidenceIds = record[spec.evidenceField] ?? [];
    if (!Array.isArray(evidenceIds) || evidenceIds.length === 0) {
      addError(
        "CRITICAL_RECORD_WITHOUT_EVIDENCE",
        `${spec.family} ${record.id} has no ${spec.evidenceField}.`,
        record.id,
      );
      continue;
    }

    const referenceKey = `${spec.targetType}:${record.id}`;
    const referencedIds = criticalEvidenceReferences.get(referenceKey) ?? new Set();

    for (const evidenceId of evidenceIds) {
      referencedIds.add(evidenceId);
      const evidence = evidenceById.get(evidenceId);
      if (!evidence) {
        addError(
          "CRITICAL_EVIDENCE_MISSING",
          `${spec.family} ${record.id} references missing Evidence ${evidenceId}.`,
          record.id,
        );
        continue;
      }

      if (evidence.target_type !== spec.targetType || evidence.target_id !== record.id) {
        addError(
          "EVIDENCE_TARGET_MISMATCH",
          `${spec.family} ${record.id} references Evidence ${evidence.id} targeting ${evidence.target_type}:${evidence.target_id}.`,
          record.id,
        );
      }

      if (!evidence.assertion_code.startsWith(spec.assertionPrefix)) {
        addError(
          "EVIDENCE_ASSERTION_MISMATCH",
          `Evidence ${evidence.id} for ${spec.family} ${record.id} uses assertion_code=${evidence.assertion_code}; expected prefix ${spec.assertionPrefix}.`,
          evidence.id,
        );
      }
    }

    criticalEvidenceReferences.set(referenceKey, referencedIds);
  }
}

const criticalTargetTypes = new Set(criticalTargetSpecs.map((spec) => spec.targetType));
for (const evidence of dataset.evidence) {
  if (!criticalTargetTypes.has(evidence.target_type)) continue;

  const key = `${evidence.target_type}:${evidence.target_id}`;
  if (!criticalEvidenceReferences.get(key)?.has(evidence.id)) {
    addError(
      "EVIDENCE_NOT_LINKED_FROM_TARGET",
      `Evidence ${evidence.id} targets ${key} but that record does not link back to it.`,
      evidence.id,
    );
  }
}

for (const snapshot of dataset.stateSnapshots.filter(
  (record) => record.review_status === "approved",
)) {
  const sourceTypes = [];
  let freshestEvidenceDate;

  for (const evidenceId of snapshot.basis_evidence_ids) {
    const evidence = evidenceById.get(evidenceId);
    if (!evidence) continue;
    const source = sourcesById.get(evidence.source_id);
    if (!source) continue;

    sourceTypes.push(source.source_type);
    const evidenceDate = dateOnly(evidence.captured_at) ?? dateOnly(source.accessed_at);
    if (evidenceDate && (!freshestEvidenceDate || evidenceDate > freshestEvidenceDate)) {
      freshestEvidenceDate = evidenceDate;
    }
  }

  if (sourceTypes.length > 0 && sourceTypes.every((sourceType) => /social/iu.test(sourceType))) {
    addError(
      "CURRENT_STATE_SOCIAL_ONLY",
      `State Snapshot ${snapshot.id} relies only on social-media Sources.`,
      snapshot.id,
    );
  }

  if (!freshestEvidenceDate) {
    addError(
      "CURRENT_STATE_FRESHNESS_UNKNOWN",
      `State Snapshot ${snapshot.id} has no auditable Evidence capture or Source access date.`,
      snapshot.id,
    );
    continue;
  }

  const ageDays = daysBetween(freshestEvidenceDate, auditDate);
  if (ageDays === undefined) {
    addError(
      "CURRENT_STATE_FRESHNESS_INVALID",
      `State Snapshot ${snapshot.id} Evidence freshness could not be calculated.`,
      snapshot.id,
    );
  } else if (ageDays > currentStateMaxAgeDays) {
    addError(
      "CURRENT_STATE_EVIDENCE_STALE",
      `State Snapshot ${snapshot.id} freshest Evidence is ${ageDays} days old; maximum is ${currentStateMaxAgeDays}.`,
      snapshot.id,
    );
  }
}

if (errors.length > 0) {
  throw new Error(
    `Matsuri Source and Evidence audit failed with ${errors.length} issue(s):\n${errors
      .map(
        (issue) =>
          `- [${issue.code}]${issue.recordId ? ` ${issue.recordId}:` : ""} ${issue.message}`,
      )
      .join("\n")}`,
  );
}

const criticalRecordCount = criticalTargetSpecs.reduce(
  (sum, spec) => sum + spec.records.length,
  0,
);

console.log(
  `Matsuri Source and Evidence audit passed: ${dataset.sources.length} Sources, ${dataset.evidence.length} Evidence records, ${criticalRecordCount} critical target records, Current State freshness <= ${currentStateMaxAgeDays} days, audit date ${auditDate}.`,
);
