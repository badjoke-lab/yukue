import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const args = process.argv.slice(2);
const outputIndex = args.indexOf("--output");
const outputRoot =
  outputIndex >= 0 && args[outputIndex + 1]
    ? path.resolve(repositoryRoot, args[outputIndex + 1])
    : path.join(repositoryRoot, "artifacts", "matsuri-corpus-quality");

const dataset = loadMatsuriDataset();
const sourcesById = new Map(dataset.sources.map((source) => [source.id, source]));
const evidenceById = new Map(dataset.evidence.map((evidence) => [evidence.id, evidence]));
const placesById = new Map(dataset.places.map((place) => [place.id, place]));

const specialistPrimaryTypes = new Set(["festival", "folk_performance"]);
const legacyCoverageTypes = new Set(["festival", "folk_performance", "tradition_unit"]);
const completedOccurrenceOutcomes = new Set([
  "held",
  "partially_held",
  "postponed",
  "rescheduled",
  "cancelled",
  "not_held",
]);
const distributedScopeTypes = new Set([
  "multi_area",
  "multi_site",
  "route_based",
  "distributed",
]);

function entityName(entity) {
  return (
    entity.names?.find((name) => name.is_preferred)?.value ??
    entity.names?.find((name) => name.kind === "canonical")?.value ??
    entity.names?.[0]?.value ??
    entity.id
  );
}

function textLength(value) {
  return typeof value === "string" ? [...value.trim()].length : 0;
}

function approved(record) {
  return record.review_status === undefined || record.review_status === "approved";
}

function latestApprovedStateByEntity() {
  const latest = new Map();
  for (const snapshot of dataset.stateSnapshots) {
    if (!approved(snapshot)) continue;
    const current = latest.get(snapshot.entity_id);
    if (!current || String(snapshot.observed_at).localeCompare(String(current.observed_at)) > 0) {
      latest.set(snapshot.entity_id, snapshot);
    }
  }
  return latest;
}

function evidenceIdsAreApproved(ids, targetType, targetId) {
  if (!Array.isArray(ids) || ids.length === 0) return false;
  return ids.every((id) => {
    const evidence = evidenceById.get(id);
    return (
      evidence &&
      approved(evidence) &&
      evidence.target_type === targetType &&
      evidence.target_id === targetId &&
      sourcesById.has(evidence.source_id)
    );
  });
}

function directProfileEvidence(entityId) {
  return dataset.evidence.filter(
    (evidence) =>
      approved(evidence) &&
      evidence.target_id === entityId &&
      ["entity_identity", "name_variant", "location"].includes(evidence.target_type) &&
      sourcesById.has(evidence.source_id),
  );
}

function preferredNameSourceBacked(entity) {
  const preferred =
    entity.names?.find((name) => name.is_preferred) ??
    entity.names?.find((name) => name.kind === "canonical") ??
    entity.names?.[0];
  return (
    preferred &&
    Array.isArray(preferred.source_ids) &&
    preferred.source_ids.length > 0 &&
    preferred.source_ids.every((sourceId) => sourcesById.has(sourceId))
  );
}

function hasGeographicScope(entity) {
  const areas = entity.geographic_scope?.areas ?? [];
  if (areas.length === 0) return false;
  if (!areas.some((area) => area.prefecture_code || area.prefecture_name_ja)) return false;
  if (areas.some((area) => area.municipality_code || area.municipality_name_ja)) return true;
  return (
    distributedScopeTypes.has(entity.geographic_scope?.scope_type) &&
    textLength(entity.geographic_scope?.description_ja) > 0
  );
}

function hasTimingOrRecurrence(entity) {
  return Boolean(
    entity.recurrence_pattern?.pattern_type ||
      (Array.isArray(entity.usual_months) && entity.usual_months.length > 0) ||
      entity.usual_season ||
      textLength(entity.date_rule_text_ja) > 0 ||
      textLength(entity.traditional_calendar_text_ja) > 0,
  );
}

function hasPlaceModel(entity) {
  const placeIds = new Set([
    ...(entity.primary_place_id ? [entity.primary_place_id] : []),
    ...(entity.default_place_ids ?? []),
  ]);
  if ([...placeIds].some((placeId) => placesById.has(placeId))) return true;
  return (
    distributedScopeTypes.has(entity.geographic_scope?.scope_type) &&
    textLength(entity.geographic_scope?.description_ja) > 0
  );
}

function hasAuthoritativeExternalLink(entity) {
  return (entity.external_links ?? []).some((link) => {
    if (typeof link.url !== "string" || !/^https?:\/\//u.test(link.url)) return false;
    return (
      ["official_organization", "public_authority"].includes(link.officiality) ||
      ["official_website", "municipality_website", "official_tourism"].includes(link.kind)
    );
  });
}

function occurrenceYear(occurrence) {
  const candidates = [
    occurrence.temporal_extent?.start,
    occurrence.temporal_extent?.start_date,
    occurrence.temporal_extent?.date,
    occurrence.start_date,
    occurrence.date,
  ];
  for (const candidate of candidates) {
    if (typeof candidate !== "string") continue;
    const match = candidate.match(/^(\d{4})/u);
    if (match) return match[1];
  }
  return null;
}

const latestState = latestApprovedStateByEntity();
const occurrencesByEntity = new Map();
const changesByEntity = new Map();

for (const occurrence of dataset.occurrences) {
  if (!approved(occurrence)) continue;
  const items = occurrencesByEntity.get(occurrence.subject_entity_id) ?? [];
  items.push(occurrence);
  occurrencesByEntity.set(occurrence.subject_entity_id, items);
}

for (const event of dataset.changeEvents) {
  if (!approved(event)) continue;
  for (const entityId of event.subject_entity_ids ?? []) {
    const items = changesByEntity.get(entityId) ?? [];
    items.push(event);
    changesByEntity.set(entityId, items);
  }
}

const records = dataset.entities
  .filter((entity) => legacyCoverageTypes.has(entity.entity_type))
  .map((entity) => {
    const specialistPrimary = specialistPrimaryTypes.has(entity.entity_type);
    const state = latestState.get(entity.id);
    const occurrences = occurrencesByEntity.get(entity.id) ?? [];
    const changeEvents = changesByEntity.get(entity.id) ?? [];
    const completedOccurrences = occurrences.filter(
      (occurrence) =>
        completedOccurrenceOutcomes.has(occurrence.outcome) &&
        evidenceIdsAreApproved(occurrence.evidence_ids, "occurrence", occurrence.id),
    );
    const evidencedChangeEvents = changeEvents.filter((event) =>
      evidenceIdsAreApproved(event.evidence_ids, "change_event", event.id),
    );
    const scheduledOccurrences = occurrences.filter(
      (occurrence) => occurrence.outcome === "scheduled" || occurrence.outcome === "unknown",
    );
    const completedYears = new Set(completedOccurrences.map(occurrenceYear).filter(Boolean));
    const profileEvidence = directProfileEvidence(entity.id);
    const stateEvidence = state
      ? evidenceIdsAreApproved(state.basis_evidence_ids, "state_snapshot", state.id)
      : false;

    const checks = {
      specialist_primary_type: specialistPrimary,
      preferred_name_source_backed: preferredNameSourceBacked(entity),
      summary_present: textLength(entity.summary_ja) > 0,
      description_present: textLength(entity.description_ja) > 0,
      geographic_scope_present: hasGeographicScope(entity),
      timing_or_recurrence_present: hasTimingOrRecurrence(entity),
      place_model_present: hasPlaceModel(entity),
      authoritative_external_link_present: hasAuthoritativeExternalLink(entity),
      approved_current_state_present: Boolean(state),
      current_state_evidence_present: stateEvidence,
      direct_profile_evidence_present: profileEvidence.length > 0,
      completed_occurrence_or_change_present:
        completedOccurrences.length > 0 || evidencedChangeEvents.length > 0,
    };

    const machineCheckableMinimum =
      specialistPrimary && Object.values(checks).every(Boolean);
    const historyEnriched =
      machineCheckableMinimum &&
      (completedYears.size >= 2 || evidencedChangeEvents.length >= 1 || completedOccurrences.length >= 3);
    const monitored = specialistPrimary && scheduledOccurrences.length > 0;
    const unmetChecks = Object.entries(checks)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    return {
      id: entity.id,
      slug: entity.slug,
      name: entityName(entity),
      entity_type: entity.entity_type,
      specialist_primary: specialistPrimary,
      summary_characters: textLength(entity.summary_ja),
      description_characters: textLength(entity.description_ja),
      checks,
      machine_classification: {
        public_core: machineCheckableMinimum,
        history_enriched: historyEnriched,
        monitored,
      },
      evidence_and_history: {
        direct_profile_evidence: profileEvidence.length,
        completed_occurrences: completedOccurrences.length,
        completed_occurrence_years: [...completedYears].sort(),
        change_events: evidencedChangeEvents.length,
        scheduled_or_unknown_occurrences: scheduledOccurrences.length,
      },
      unmet_checks: unmetChecks,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name, "ja"));

const specialistRecords = records.filter((record) => record.specialist_primary);
const publicCoreRecords = specialistRecords.filter(
  (record) => record.machine_classification.public_core,
);
const historyEnrichedRecords = specialistRecords.filter(
  (record) => record.machine_classification.history_enriched,
);
const monitoredRecords = specialistRecords.filter(
  (record) => record.machine_classification.monitored,
);

const unmetCheckCounts = {};
for (const record of specialistRecords) {
  for (const check of record.unmet_checks) {
    unmetCheckCounts[check] = (unmetCheckCounts[check] ?? 0) + 1;
  }
}

const report = {
  schema_version: "matsuri.corpus-quality.v1",
  generated_at: new Date().toISOString(),
  governing_spec: "docs/nationwide-corpus-scaling.md",
  mode: "measurement_only",
  release_gate_authorized: false,
  classifier_notes: {
    public_core:
      "Conservative machine-checkable subset of the governing public minimum. Human review of prose substance and source ceilings remains required; a true result does not auto-approve publication.",
    history_enriched:
      "Requires public_core plus at least two completed Occurrence years, at least one evidenced Change Event, or at least three completed evidenced Occurrences.",
    monitored:
      "Has at least one approved Occurrence still carrying scheduled or unknown outcome and therefore an active freshness/review obligation.",
    tradition_unit:
      "Reported for legacy corpus visibility but excluded from specialist public_core counts because the current governing Matsuri public minimum explicitly names Festival and Folk Performance primary records.",
  },
  counts: {
    all_entities: dataset.entities.length,
    legacy_primary_subjects: records.length,
    specialist_primary_subjects: specialistRecords.length,
    public_core_machine: publicCoreRecords.length,
    history_enriched_machine: historyEnrichedRecords.length,
    monitored_machine: monitoredRecords.length,
    below_public_core_machine: specialistRecords.length - publicCoreRecords.length,
    with_completed_occurrence_history: specialistRecords.filter(
      (record) => record.evidence_and_history.completed_occurrences > 0,
    ).length,
    with_change_events: specialistRecords.filter(
      (record) => record.evidence_and_history.change_events > 0,
    ).length,
    with_current_state_evidence: specialistRecords.filter(
      (record) => record.checks.current_state_evidence_present,
    ).length,
    with_direct_profile_evidence: specialistRecords.filter(
      (record) => record.checks.direct_profile_evidence_present,
    ).length,
  },
  by_entity_type: Object.fromEntries(
    [...new Set(records.map((record) => record.entity_type))]
      .sort()
      .map((entityType) => [
        entityType,
        {
          records: records.filter((record) => record.entity_type === entityType).length,
          public_core_machine: records.filter(
            (record) =>
              record.entity_type === entityType && record.machine_classification.public_core,
          ).length,
          history_enriched_machine: records.filter(
            (record) =>
              record.entity_type === entityType && record.machine_classification.history_enriched,
          ).length,
          monitored_machine: records.filter(
            (record) =>
              record.entity_type === entityType && record.machine_classification.monitored,
          ).length,
        },
      ]),
  ),
  unmet_check_counts: Object.fromEntries(
    Object.entries(unmetCheckCounts).sort(([a], [b]) => a.localeCompare(b)),
  ),
  records,
};

const markdown = [
  "# Matsuri corpus quality baseline",
  "",
  `Generated: ${report.generated_at}`,
  "",
  "**Mode:** measurement only — this report does not authorize bulk public release.",
  "",
  "## Governing contract",
  "",
  `- ${report.governing_spec}`,
  "- Thin candidate records remain non-public.",
  "- A machine `public_core=true` result never replaces required human review.",
  "",
  "## Counts",
  "",
  ...Object.entries(report.counts).map(([key, value]) => `- ${key}: ${value}`),
  "",
  "## Unmet machine-checkable minimum dimensions",
  "",
  ...(Object.keys(report.unmet_check_counts).length > 0
    ? Object.entries(report.unmet_check_counts).map(([key, value]) => `- ${key}: ${value}`)
    : ["- None"]),
  "",
  "## By entity type",
  "",
  ...Object.entries(report.by_entity_type).flatMap(([entityType, counts]) => [
    `### ${entityType}`,
    "",
    ...Object.entries(counts).map(([key, value]) => `- ${key}: ${value}`),
    "",
  ]),
  "## Records below machine public_core",
  "",
  ...(specialistRecords.filter((record) => !record.machine_classification.public_core).length > 0
    ? specialistRecords
        .filter((record) => !record.machine_classification.public_core)
        .map(
          (record) =>
            `- ${record.name} (${record.id}): ${record.unmet_checks.join(", ")}`,
        )
    : ["- None"]),
  "",
].join("\n");

fs.mkdirSync(outputRoot, { recursive: true });
fs.writeFileSync(path.join(outputRoot, "report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
fs.writeFileSync(path.join(outputRoot, "report.md"), `${markdown}\n`, "utf8");

console.log(markdown);
console.log(`Wrote Matsuri corpus quality baseline to ${path.relative(repositoryRoot, outputRoot)}`);
