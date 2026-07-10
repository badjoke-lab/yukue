import { buildPublicProjection } from "@badjoke-lab/yukue-observation-core";

import entities from "../../../../data/public/matsuri/d1/entities.json";
import evidence from "../../../../data/public/matsuri/d1/evidence.json";
import places from "../../../../data/public/matsuri/d1/places.json";
import records from "../../../../data/public/matsuri/d1/records.json";
import stateSnapshots from "../../../../data/public/matsuri/d1/state-snapshots.json";
import batch01 from "../../../../data/public/matsuri/f1/batch-01.json";
import batch02 from "../../../../data/public/matsuri/f1/batch-02.json";
import batch03 from "../../../../data/public/matsuri/f1/batch-03.json";

const batches = [batch01, batch02, batch03];
const batchRecords = <TKey extends keyof (typeof batches)[number]>(key: TKey) =>
  batches.flatMap((batch) => batch[key]);

const canonicalBundle = {
  entities: [...entities, ...batchRecords("entities")],
  places: [...places, ...batchRecords("places")],
  stateSnapshots: [...stateSnapshots, ...batchRecords("stateSnapshots")],
  changeEvents: [...records.changeEvents, ...batchRecords("changeEvents")],
  occurrences: [...records.occurrences, ...batchRecords("occurrences")],
  occurrenceSeries: [
    ...records.occurrenceSeries,
    ...batchRecords("occurrenceSeries"),
  ],
  recurrencePatterns: [
    ...records.recurrencePatterns,
    ...batchRecords("recurrencePatterns"),
  ],
  relations: [...records.relations, ...batchRecords("relations")],
  designations: [...records.designations, ...batchRecords("designations")],
  sources: [...records.sources, ...batchRecords("sources")],
  evidence: [...evidence, ...batchRecords("evidence")],
  images: [...records.images, ...batchRecords("images")],
} as unknown as Parameters<typeof buildPublicProjection>[0];

export const matsuriProjection = buildPublicProjection(canonicalBundle);

export function findMatsuriEntityDetail(entityId: string) {
  return matsuriProjection.html.entity_details.find(
    (detail) => detail.entity.id === entityId,
  );
}
