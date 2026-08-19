import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const jsonOutput = process.argv.includes("--json");
const requireClean = process.argv.includes("--require-clean");
const verifyFixtures = process.argv.includes("--verify-fixtures");
const dataset = loadMatsuriDataset();

const specialistTypes = new Set(["festival", "folk_performance", "tradition_unit"]);
const contextTypes = new Set(["shrine", "temple"]);

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

function relationConnects(relations, leftId, rightId) {
  return relations.some(
    (relation) =>
      (relation.source_entity_id === leftId && relation.target_entity_id === rightId) ||
      (relation.source_entity_id === rightId && relation.target_entity_id === leftId),
  );
}

function relationIsRequiredForEntity(entity) {
  return entity?.coverage_tier !== "tier_a_index";
}

function buildRelationCoverageReport(inputDataset) {
  const entitiesById = new Map(inputDataset.entities.map((entity) => [entity.id, entity]));
  const relationCounts = new Map(inputDataset.entities.map((entity) => [entity.id, 0]));

  for (const relation of inputDataset.relations) {
    relationCounts.set(
      relation.source_entity_id,
      (relationCounts.get(relation.source_entity_id) ?? 0) + 1,
    );
    relationCounts.set(
      relation.target_entity_id,
      (relationCounts.get(relation.target_entity_id) ?? 0) + 1,
    );
  }

  const specialistEntities = inputDataset.entities.filter((entity) =>
    specialistTypes.has(entity.entity_type),
  );
  const relationRequiredSpecialists = specialistEntities.filter(relationIsRequiredForEntity);
  const tierARelationOptionalSpecialists = specialistEntities.filter(
    (entity) => !relationIsRequiredForEntity(entity),
  );

  const zeroRelationEntities = relationRequiredSpecialists
    .filter((entity) => (relationCounts.get(entity.id) ?? 0) === 0)
    .map((entity) => ({
      entity_id: entity.id,
      entity_type: entity.entity_type,
      name_ja: preferredName(entity),
    }))
    .sort((left, right) => left.entity_id.localeCompare(right.entity_id));

  const tierAWithoutRelationEntities = tierARelationOptionalSpecialists
    .filter((entity) => (relationCounts.get(entity.id) ?? 0) === 0)
    .map((entity) => ({
      entity_id: entity.id,
      entity_type: entity.entity_type,
      name_ja: preferredName(entity),
    }))
    .sort((left, right) => left.entity_id.localeCompare(right.entity_id));

  const organizerRelationGaps = [];
  for (const occurrence of inputDataset.occurrences) {
    for (const organizerId of occurrence.organizer_entity_ids ?? []) {
      const hasOrganizedBy = inputDataset.relations.some(
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
  for (const occurrence of inputDataset.occurrences) {
    const places = occurrencePlacesBySubject.get(occurrence.subject_entity_id) ?? new Set();
    for (const placeId of occurrence.venue_place_ids ?? []) places.add(placeId);
    occurrencePlacesBySubject.set(occurrence.subject_entity_id, places);
  }

  const contextEntities = inputDataset.entities.filter((entity) =>
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
      if (
        sharedPlaceIds.length === 0 ||
        relationConnects(inputDataset.relations, subject.id, context.id)
      ) {
        continue;
      }

      placeContextRelationGaps.push({
        subject_entity_id: subject.id,
        subject_name_ja: preferredName(subject),
        context_entity_id: context.id,
        context_name_ja: preferredName(context),
        shared_place_ids: sharedPlaceIds.sort((left, right) => left.localeCompare(right)),
      });
    }
  }

  const relationsMissingEvidence = inputDataset.relations
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
    entities_total: inputDataset.entities.length,
    specialist_entities_checked: specialistEntities.length,
    relation_required_specialists: relationRequiredSpecialists.length,
    tier_a_relation_optional_specialists: tierARelationOptionalSpecialists.length,
    tier_a_without_relation: tierAWithoutRelationEntities.length,
    relations_total: inputDataset.relations.length,
    zero_relation_specialists: zeroRelationEntities.length,
    organizer_relation_gaps: organizerRelationGaps.length,
    place_context_relation_gaps: placeContextRelationGaps.length,
    relations_missing_evidence: relationsMissingEvidence.length,
  };

  return {
    summary,
    zero_relation_entities: zeroRelationEntities,
    tier_a_without_relation_entities: tierAWithoutRelationEntities,
    organizer_relation_gaps: organizerRelationGaps,
    place_context_relation_gaps: placeContextRelationGaps,
    relations_missing_evidence: relationsMissingEvidence,
  };
}

function gapCounts(report) {
  return {
    zero_relation_specialists: report.summary.zero_relation_specialists,
    organizer_relation_gaps: report.summary.organizer_relation_gaps,
    place_context_relation_gaps: report.summary.place_context_relation_gaps,
    relations_missing_evidence: report.summary.relations_missing_evidence,
  };
}

function assertCleanRelationCoverage(report, label = "canonical dataset") {
  const counts = gapCounts(report);
  const totalGapCount = Object.values(counts).reduce((total, count) => total + count, 0);

  if (totalGapCount > 0) {
    throw new Error(
      `Matsuri relation coverage contract failed for ${label}: ${Object.entries(counts)
        .map(([name, count]) => `${name}=${count}`)
        .join(", ")}`,
    );
  }
}

function printReport(report) {
  const { summary } = report;
  console.log("Matsuri relation coverage audit");
  console.log(`Entities total: ${summary.entities_total}`);
  console.log(`Specialist Entities checked: ${summary.specialist_entities_checked}`);
  console.log(`Relation-required specialists: ${summary.relation_required_specialists}`);
  console.log(`Explicit Tier A specialists where Relation is optional: ${summary.tier_a_relation_optional_specialists}`);
  console.log(`Explicit Tier A specialists with no Relation: ${summary.tier_a_without_relation}`);
  console.log(`Relations total: ${summary.relations_total}`);
  console.log(`Relation-required specialists with no Relation: ${summary.zero_relation_specialists}`);
  console.log(`Occurrence organizer Relation gaps: ${summary.organizer_relation_gaps}`);
  console.log(`Place-context Relation gaps: ${summary.place_context_relation_gaps}`);
  console.log(`Relations missing Evidence: ${summary.relations_missing_evidence}`);

  if (report.zero_relation_entities.length > 0) {
    console.log("\nRelation-required specialists with no Relation:");
    for (const candidate of report.zero_relation_entities) {
      console.log(
        `- ${candidate.entity_id} | ${candidate.entity_type} | ${candidate.name_ja}`,
      );
    }
  }

  if (report.tier_a_without_relation_entities.length > 0) {
    console.log("\nExplicit Tier A specialists with no Relation (allowed at Tier A):");
    for (const candidate of report.tier_a_without_relation_entities) {
      console.log(
        `- ${candidate.entity_id} | ${candidate.entity_type} | ${candidate.name_ja}`,
      );
    }
  }

  if (report.organizer_relation_gaps.length > 0) {
    console.log("\nOccurrence organizer Relation gaps:");
    for (const candidate of report.organizer_relation_gaps) {
      console.log(
        `- ${candidate.occurrence_id} | ${candidate.subject_entity_id} -> ${candidate.organizer_entity_id}`,
      );
    }
  }

  if (report.place_context_relation_gaps.length > 0) {
    console.log("\nPlace-context Relation gaps:");
    for (const candidate of report.place_context_relation_gaps) {
      console.log(
        `- ${candidate.subject_entity_id} -> ${candidate.context_entity_id} | ${candidate.shared_place_ids.join(", ")}`,
      );
    }
  }

  if (report.relations_missing_evidence.length > 0) {
    console.log("\nRelations missing Evidence:");
    for (const candidate of report.relations_missing_evidence) {
      console.log(
        `- ${candidate.relation_id} | ${candidate.source_entity_id} -> ${candidate.target_entity_id}`,
      );
    }
  }
}

function cloneDataset(inputDataset) {
  return structuredClone(inputDataset);
}

function expectFixtureRejected(name, fixtureDataset, expectedGap) {
  const fixtureReport = buildRelationCoverageReport(fixtureDataset);
  if (!expectedGap(fixtureReport)) {
    throw new Error(`Relation coverage negative fixture did not create its expected gap: ${name}`);
  }

  let rejected = false;
  try {
    assertCleanRelationCoverage(fixtureReport, name);
  } catch {
    rejected = true;
  }

  if (!rejected) {
    throw new Error(`Relation coverage negative fixture unexpectedly passed: ${name}`);
  }

  console.log(`[fixture rejected] ${name}`);
}

function verifyNegativeFixtures(inputDataset) {
  const specialist = inputDataset.entities.find(
    (entity) =>
      specialistTypes.has(entity.entity_type) &&
      relationIsRequiredForEntity(entity) &&
      inputDataset.relations.some(
        (relation) =>
          relation.source_entity_id === entity.id || relation.target_entity_id === entity.id,
      ),
  );
  if (!specialist) {
    throw new Error("Unable to build zero-Relation specialist fixture.");
  }
  const zeroRelationFixture = cloneDataset(inputDataset);
  zeroRelationFixture.relations = zeroRelationFixture.relations.filter(
    (relation) =>
      relation.source_entity_id !== specialist.id && relation.target_entity_id !== specialist.id,
  );
  expectFixtureRejected(
    "zero-Relation relation-required specialist",
    zeroRelationFixture,
    (report) => report.summary.zero_relation_specialists > 0,
  );

  const tierA = inputDataset.entities.find(
    (entity) => specialistTypes.has(entity.entity_type) && entity.coverage_tier === "tier_a_index",
  );
  if (tierA) {
    const tierAFixture = cloneDataset(inputDataset);
    tierAFixture.relations = tierAFixture.relations.filter(
      (relation) =>
        relation.source_entity_id !== tierA.id && relation.target_entity_id !== tierA.id,
    );
    const tierAReport = buildRelationCoverageReport(tierAFixture);
    if (tierAReport.zero_relation_entities.some((item) => item.entity_id === tierA.id)) {
      throw new Error("Explicit Tier A no-Relation fixture was incorrectly treated as a contract gap.");
    }
    console.log("[fixture accepted] explicit Tier A without Relation");
  }

  const organizerOccurrence = inputDataset.occurrences.find((occurrence) =>
    (occurrence.organizer_entity_ids ?? []).some((organizerId) =>
      inputDataset.relations.some(
        (relation) =>
          relation.source_entity_id === occurrence.subject_entity_id &&
          relation.target_entity_id === organizerId &&
          relation.relation_type === "organized_by",
      ),
    ),
  );
  if (!organizerOccurrence) {
    throw new Error("Unable to build organizer Relation fixture.");
  }
  const organizerId = organizerOccurrence.organizer_entity_ids.find((candidateId) =>
    inputDataset.relations.some(
      (relation) =>
        relation.source_entity_id === organizerOccurrence.subject_entity_id &&
        relation.target_entity_id === candidateId &&
        relation.relation_type === "organized_by",
    ),
  );
  const organizerFixture = cloneDataset(inputDataset);
  organizerFixture.relations = organizerFixture.relations.filter(
    (relation) =>
      !(
        relation.source_entity_id === organizerOccurrence.subject_entity_id &&
        relation.target_entity_id === organizerId &&
        relation.relation_type === "organized_by"
      ),
  );
  expectFixtureRejected(
    "Occurrence organizer Relation gap",
    organizerFixture,
    (report) => report.summary.organizer_relation_gaps > 0,
  );

  const occurrencePlacesBySubject = new Map();
  for (const occurrence of inputDataset.occurrences) {
    const places = occurrencePlacesBySubject.get(occurrence.subject_entity_id) ?? new Set();
    for (const placeId of occurrence.venue_place_ids ?? []) places.add(placeId);
    occurrencePlacesBySubject.set(occurrence.subject_entity_id, places);
  }
  const specialistEntities = inputDataset.entities.filter((entity) =>
    specialistTypes.has(entity.entity_type),
  );
  const contextEntities = inputDataset.entities.filter((entity) =>
    contextTypes.has(entity.entity_type),
  );
  let placeContextPair;
  for (const subject of specialistEntities) {
    const subjectPlaces = entityPlaces(subject);
    for (const placeId of occurrencePlacesBySubject.get(subject.id) ?? []) {
      subjectPlaces.add(placeId);
    }
    for (const context of contextEntities) {
      const sharesPlace = [...entityPlaces(context)].some((placeId) =>
        subjectPlaces.has(placeId),
      );
      if (
        sharesPlace &&
        relationConnects(inputDataset.relations, subject.id, context.id)
      ) {
        placeContextPair = { subject, context };
        break;
      }
    }
    if (placeContextPair) break;
  }
  if (!placeContextPair) {
    throw new Error("Unable to build Place-context Relation fixture.");
  }
  const placeContextFixture = cloneDataset(inputDataset);
  placeContextFixture.relations = placeContextFixture.relations.filter(
    (relation) =>
      !(
        (relation.source_entity_id === placeContextPair.subject.id &&
          relation.target_entity_id === placeContextPair.context.id) ||
        (relation.source_entity_id === placeContextPair.context.id &&
          relation.target_entity_id === placeContextPair.subject.id)
      ),
  );
  expectFixtureRejected(
    "Place-context Relation gap",
    placeContextFixture,
    (report) => report.summary.place_context_relation_gaps > 0,
  );

  const evidenceRelation = inputDataset.relations.find(
    (relation) => Array.isArray(relation.evidence_ids) && relation.evidence_ids.length > 0,
  );
  if (!evidenceRelation) {
    throw new Error("Unable to build missing Relation Evidence fixture.");
  }
  const missingEvidenceFixture = cloneDataset(inputDataset);
  const fixtureRelation = missingEvidenceFixture.relations.find(
    (relation) => relation.id === evidenceRelation.id,
  );
  fixtureRelation.evidence_ids = [];
  expectFixtureRejected(
    "Relation missing Evidence",
    missingEvidenceFixture,
    (report) => report.summary.relations_missing_evidence > 0,
  );

  console.log("Matsuri relation coverage fixtures passed: 4 negative fixtures rejected and explicit Tier A no-Relation behavior accepted when present.");
}

if (jsonOutput && verifyFixtures) {
  throw new Error("--json and --verify-fixtures cannot be combined.");
}

const report = buildRelationCoverageReport(dataset);

if (jsonOutput) {
  console.log(JSON.stringify(report, null, 2));
} else {
  printReport(report);
}

if (requireClean) {
  assertCleanRelationCoverage(report);
  console.log("Matsuri relation coverage contract passed with no required Relation gaps; explicit Tier A records may remain Relation-free until evidence-backed promotion work adds one.");
}

if (verifyFixtures) {
  verifyNegativeFixtures(dataset);
}