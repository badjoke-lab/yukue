import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const jsonOutput = process.argv.includes("--json");
const requireClean = process.argv.includes("--require-clean");
const dataset = loadMatsuriDataset();

const specialistTypes = new Set(["festival", "folk_performance", "tradition_unit"]);
const contextTypes = new Set(["shrine", "temple"]);
const entitiesById = new Map(dataset.entities.map((entity) => [entity.id, entity]));

function preferredName(entity) {
  return (
    entity?.names?.find((name) => name.is_preferred)?.value ??
    entity?.names?.[0]?.value ??
    entity?.id ??
    "unknown"
  );
}

function entityPlaces(entity) {
  return new Set(
    [entity.primary_place_id, ...(entity.default_place_ids ?? [])].filter(Boolean),
  );
}

function relationConnects(leftId, rightId) {
  return dataset.relations.some(
    (relation) =>
      (relation.source_entity_id === leftId && relation.target_entity_id === rightId) ||
      (relation.source_entity_id === rightId && relation.target_entity_id === leftId),
  );
}

const relationCounts = new Map(dataset.entities.map((entity) => [entity.id, 0]));
for (const relation of dataset.relations) {
  relationCounts.set(
    relation.source_entity_id,
    (relationCounts.get(relation.source_entity_id) ?? 0) + 1,
  );
  relationCounts.set(
    relation.target_entity_id,
    (relationCounts.get(relation.target_entity_id) ?? 0) + 1,
  );
}

const specialistEntities = dataset.entities.filter((entity) =>
  specialistTypes.has(entity.entity_type),
);

const zeroRelationEntities = specialistEntities
  .filter((entity) => (relationCounts.get(entity.id) ?? 0) === 0)
  .map((entity) => ({
    entity_id: entity.id,
    entity_type: entity.entity_type,
    name_ja: preferredName(entity),
  }))
  .sort((left, right) => left.entity_id.localeCompare(right.entity_id));

const organizerRelationGaps = [];
for (const occurrence of dataset.occurrences) {
  for (const organizerId of occurrence.organizer_entity_ids ?? []) {
    const hasOrganizedBy = dataset.relations.some(
      (relation) =>
        relation.source_entity_id === occurrence.subject_entity_id &&
        relation.target_entity_id === organizerId &&
        relation.relation_type === "organized_by",
    );

    if (!hasOrganizedBy) {
      organizerRelationGaps.push({
        occurrence_id: occurrence.id,
        subject_entity_id: occurrence.subject_entity_id,
        subject_name_ja: preferredName(entitiesById.get(occurrence.subject_entity_id)),
        organizer_entity_id: organizerId,
        organizer_name_ja: preferredName(entitiesById.get(organizerId)),
      });
    }
  }
}

const occurrencePlacesBySubject = new Map();
for (const occurrence of dataset.occurrences) {
  const places = occurrencePlacesBySubject.get(occurrence.subject_entity_id) ?? new Set();
  for (const placeId of occurrence.venue_place_ids ?? []) places.add(placeId);
  occurrencePlacesBySubject.set(occurrence.subject_entity_id, places);
}

const contextEntities = dataset.entities.filter((entity) =>
  contextTypes.has(entity.entity_type),
);
const placeContextRelationGaps = [];

for (const subject of specialistEntities) {
  const subjectPlaces = entityPlaces(subject);
  for (const placeId of occurrencePlacesBySubject.get(subject.id) ?? []) {
    subjectPlaces.add(placeId);
  }

  for (const context of contextEntities) {
    const sharedPlaceIds = [...entityPlaces(context)].filter((placeId) =>
      subjectPlaces.has(placeId),
    );
    if (sharedPlaceIds.length === 0 || relationConnects(subject.id, context.id)) continue;

    placeContextRelationGaps.push({
      subject_entity_id: subject.id,
      subject_name_ja: preferredName(subject),
      context_entity_id: context.id,
      context_name_ja: preferredName(context),
      shared_place_ids: sharedPlaceIds.sort((left, right) => left.localeCompare(right)),
    });
  }
}

const relationsMissingEvidence = dataset.relations
  .filter(
    (relation) =>
      !Array.isArray(relation.evidence_ids) || relation.evidence_ids.length === 0,
  )
  .map((relation) => ({
    relation_id: relation.id,
    relation_type: relation.relation_type,
    source_entity_id: relation.source_entity_id,
    target_entity_id: relation.target_entity_id,
  }))
  .sort((left, right) => left.relation_id.localeCompare(right.relation_id));

const summary = {
  entities_total: dataset.entities.length,
  specialist_entities_checked: specialistEntities.length,
  relations_total: dataset.relations.length,
  zero_relation_specialists: zeroRelationEntities.length,
  organizer_relation_gaps: organizerRelationGaps.length,
  place_context_relation_gaps: placeContextRelationGaps.length,
  relations_missing_evidence: relationsMissingEvidence.length,
};

const report = {
  summary,
  zero_relation_entities: zeroRelationEntities,
  organizer_relation_gaps: organizerRelationGaps,
  place_context_relation_gaps: placeContextRelationGaps,
  relations_missing_evidence: relationsMissingEvidence,
};

if (jsonOutput) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log("Matsuri relation coverage audit");
  console.log(`Entities total: ${summary.entities_total}`);
  console.log(`Specialist Entities checked: ${summary.specialist_entities_checked}`);
  console.log(`Relations total: ${summary.relations_total}`);
  console.log(`Specialists with no Relation: ${summary.zero_relation_specialists}`);
  console.log(`Occurrence organizer Relation gaps: ${summary.organizer_relation_gaps}`);
  console.log(`Place-context Relation gaps: ${summary.place_context_relation_gaps}`);
  console.log(`Relations missing Evidence: ${summary.relations_missing_evidence}`);

  if (zeroRelationEntities.length > 0) {
    console.log("\nSpecialists with no Relation:");
    for (const candidate of zeroRelationEntities) {
      console.log(
        `- ${candidate.entity_id} | ${candidate.entity_type} | ${candidate.name_ja}`,
      );
    }
  }

  if (organizerRelationGaps.length > 0) {
    console.log("\nOccurrence organizer Relation gaps:");
    for (const candidate of organizerRelationGaps) {
      console.log(
        `- ${candidate.occurrence_id} | ${candidate.subject_entity_id} -> ${candidate.organizer_entity_id}`,
      );
    }
  }

  if (placeContextRelationGaps.length > 0) {
    console.log("\nPlace-context Relation gaps:");
    for (const candidate of placeContextRelationGaps) {
      console.log(
        `- ${candidate.subject_entity_id} -> ${candidate.context_entity_id} | ${candidate.shared_place_ids.join(", ")}`,
      );
    }
  }

  if (relationsMissingEvidence.length > 0) {
    console.log("\nRelations missing Evidence:");
    for (const candidate of relationsMissingEvidence) {
      console.log(
        `- ${candidate.relation_id} | ${candidate.source_entity_id} -> ${candidate.target_entity_id}`,
      );
    }
  }
}

const gapCounts = {
  zero_relation_specialists: summary.zero_relation_specialists,
  organizer_relation_gaps: summary.organizer_relation_gaps,
  place_context_relation_gaps: summary.place_context_relation_gaps,
  relations_missing_evidence: summary.relations_missing_evidence,
};
const totalGapCount = Object.values(gapCounts).reduce((total, count) => total + count, 0);

if (requireClean && totalGapCount > 0) {
  throw new Error(
    `Matsuri relation coverage contract failed: ${Object.entries(gapCounts)
      .map(([name, count]) => `${name}=${count}`)
      .join(", ")}`,
  );
}

if (requireClean) {
  console.log("Matsuri relation coverage contract passed with no reported gaps.");
}
