import { buildPublicProjection } from "@badjoke-lab/yukue-observation-core";

import entities from "../../../../data/public/matsuri/d1/entities.json";
import evidence from "../../../../data/public/matsuri/d1/evidence.json";
import places from "../../../../data/public/matsuri/d1/places.json";
import records from "../../../../data/public/matsuri/d1/records.json";
import stateSnapshots from "../../../../data/public/matsuri/d1/state-snapshots.json";
import batch01 from "../../../../data/public/matsuri/f1/batch-01.json";
import batch02 from "../../../../data/public/matsuri/f1/batch-02.json";
import batch03 from "../../../../data/public/matsuri/f1/batch-03.json";
import batch04 from "../../../../data/public/matsuri/f1/batch-04.json";
import batch05 from "../../../../data/public/matsuri/f1/batch-05.json";
import batch06 from "../../../../data/public/matsuri/f1/batch-06.json";
import batch07 from "../../../../data/public/matsuri/f1/batch-07.json";
import batch08 from "../../../../data/public/matsuri/f1/batch-08.json";
import batch09 from "../../../../data/public/matsuri/f1/batch-09.json";
import batch09Context from "../../../../data/public/matsuri/f1/batch-09-context.json";
import batch10 from "../../../../data/public/matsuri/f1/batch-10.json";
import maintenance01 from "../../../../data/public/matsuri/f2/maintenance-01.json";
import corrections01 from "../../../../data/public/matsuri/f2/corrections-01.json";

type CanonicalRecord = {
  id: string;
  record_version: number;
  [key: string]: unknown;
};

const additiveBundles = [
  batch01,
  batch02,
  batch03,
  batch04,
  batch05,
  batch06,
  batch07,
  batch08,
  batch09,
  batch09Context,
  batch10,
  maintenance01,
];

const additiveRecords = (key: string): CanonicalRecord[] =>
  additiveBundles.flatMap((bundle) => {
    const recordsForKey = (bundle as Record<string, unknown>)[key];
    return Array.isArray(recordsForKey) ? (recordsForKey as CanonicalRecord[]) : [];
  });

function applyRecordOverrides(
  baseRecords: CanonicalRecord[],
  overrides: CanonicalRecord[],
): CanonicalRecord[] {
  if (overrides.length === 0) return baseRecords;

  const recordsById = new Map(baseRecords.map((record) => [record.id, record]));

  for (const override of overrides) {
    const previous = recordsById.get(override.id);
    if (!previous) {
      throw new Error(
        `Matsuri projection correction ${override.id} does not replace an existing record.`,
      );
    }
    if (override.record_version <= previous.record_version) {
      throw new Error(
        `Matsuri projection correction ${override.id} must increase record_version above ${previous.record_version}.`,
      );
    }
    recordsById.set(override.id, override);
  }

  return baseRecords.map((record) => recordsById.get(record.id) ?? record);
}

const occurrenceRecords = [
  ...(records.occurrences as CanonicalRecord[]),
  ...additiveRecords("occurrences"),
];
const evidenceRecords = [
  ...(evidence as CanonicalRecord[]),
  ...additiveRecords("evidence"),
];

const canonicalBundle = {
  entities: [...entities, ...additiveRecords("entities")],
  places: [...places, ...additiveRecords("places")],
  stateSnapshots: [...stateSnapshots, ...additiveRecords("stateSnapshots")],
  changeEvents: [...records.changeEvents, ...additiveRecords("changeEvents")],
  occurrences: applyRecordOverrides(
    occurrenceRecords,
    corrections01.occurrences as CanonicalRecord[],
  ),
  occurrenceSeries: [
    ...records.occurrenceSeries,
    ...additiveRecords("occurrenceSeries"),
  ],
  recurrencePatterns: [
    ...records.recurrencePatterns,
    ...additiveRecords("recurrencePatterns"),
  ],
  relations: [...records.relations, ...additiveRecords("relations")],
  designations: [...records.designations, ...additiveRecords("designations")],
  sources: [...records.sources, ...additiveRecords("sources")],
  evidence: applyRecordOverrides(
    evidenceRecords,
    corrections01.evidence as CanonicalRecord[],
  ),
  images: [...records.images, ...additiveRecords("images")],
} as unknown as Parameters<typeof buildPublicProjection>[0];

export const matsuriProjection = buildPublicProjection(canonicalBundle);

export function findMatsuriEntityDetail(entityId: string) {
  return matsuriProjection.html.entity_details.find(
    (detail) => detail.entity.id === entityId,
  );
}
