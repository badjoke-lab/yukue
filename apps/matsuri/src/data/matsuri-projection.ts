import { buildPublicProjection } from "@badjoke-lab/yukue-observation-core";

import entities from "../../../../data/public/matsuri/d1/entities.json";
import evidence from "../../../../data/public/matsuri/d1/evidence.json";
import places from "../../../../data/public/matsuri/d1/places.json";
import records from "../../../../data/public/matsuri/d1/records.json";
import stateSnapshots from "../../../../data/public/matsuri/d1/state-snapshots.json";

const canonicalBundle = {
  entities,
  places,
  stateSnapshots,
  changeEvents: records.changeEvents,
  occurrences: records.occurrences,
  occurrenceSeries: records.occurrenceSeries,
  recurrencePatterns: records.recurrencePatterns,
  relations: records.relations,
  designations: records.designations,
  sources: records.sources,
  evidence,
  images: records.images,
} as unknown as Parameters<typeof buildPublicProjection>[0];

export const matsuriProjection = buildPublicProjection(canonicalBundle);

export function findMatsuriEntityDetail(entityId: string) {
  return matsuriProjection.html.entity_details.find(
    (detail) => detail.entity.id === entityId,
  );
}
