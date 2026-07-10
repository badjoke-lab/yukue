import { buildPublicProjection } from "@badjoke-lab/yukue-observation-core";

import entities from "../../../../data/public/matsuri/d1/entities.json";
import evidence from "../../../../data/public/matsuri/d1/evidence.json";
import places from "../../../../data/public/matsuri/d1/places.json";
import records from "../../../../data/public/matsuri/d1/records.json";
import stateSnapshots from "../../../../data/public/matsuri/d1/state-snapshots.json";
import batch01 from "../../../../data/public/matsuri/f1/batch-01.json";

const canonicalBundle = {
  entities: [...entities, ...batch01.entities],
  places: [...places, ...batch01.places],
  stateSnapshots: [...stateSnapshots, ...batch01.stateSnapshots],
  changeEvents: [...records.changeEvents, ...batch01.changeEvents],
  occurrences: [...records.occurrences, ...batch01.occurrences],
  occurrenceSeries: [...records.occurrenceSeries, ...batch01.occurrenceSeries],
  recurrencePatterns: [
    ...records.recurrencePatterns,
    ...batch01.recurrencePatterns,
  ],
  relations: [...records.relations, ...batch01.relations],
  designations: [...records.designations, ...batch01.designations],
  sources: [...records.sources, ...batch01.sources],
  evidence: [...evidence, ...batch01.evidence],
  images: [...records.images, ...batch01.images],
} as unknown as Parameters<typeof buildPublicProjection>[0];

export const matsuriProjection = buildPublicProjection(canonicalBundle);

export function findMatsuriEntityDetail(entityId: string) {
  return matsuriProjection.html.entity_details.find(
    (detail) => detail.entity.id === entityId,
  );
}
