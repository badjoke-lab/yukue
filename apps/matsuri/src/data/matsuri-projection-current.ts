import {
  buildPublicProjection,
  type PublicProjection,
} from "@badjoke-lab/yukue-observation-core";
import batch14 from "../../../../data/public/matsuri/f1/batch-14.json";
import { matsuriProjection as baseProjection } from "./matsuri-projection.js";

const waveBundle = {
  entities: batch14.entities,
  places: [],
  stateSnapshots: [],
  changeEvents: [],
  occurrences: [],
  occurrenceSeries: [],
  recurrencePatterns: [],
  relations: [],
  designations: [],
  sources: batch14.sources,
  evidence: batch14.evidence,
  images: batch14.images,
};

const waveProjection = buildPublicProjection(
  waveBundle as unknown as Parameters<typeof buildPublicProjection>[0],
);

export const matsuriProjection: PublicProjection = {
  html: {
    entity_details: [
      ...baseProjection.html.entity_details,
      ...waveProjection.html.entity_details,
    ],
  },
  json: {
    ...baseProjection.json,
    entities: [...baseProjection.json.entities, ...waveProjection.json.entities],
    sources: [...baseProjection.json.sources, ...waveProjection.json.sources],
    evidence: [...baseProjection.json.evidence, ...waveProjection.json.evidence],
  },
};

export const matsuriEntityDetails = matsuriProjection.html.entity_details;

export function findMatsuriEntityDetail(entityId: string) {
  return matsuriEntityDetails.find((detail) => detail.entity.id === entityId);
}
