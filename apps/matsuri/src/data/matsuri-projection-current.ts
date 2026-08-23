import {
  buildPublicProjection,
  type PublicProjection,
} from "@badjoke-lab/yukue-observation-core";
import batch14 from "../../../../data/public/matsuri/f1/batch-14.json";
import batch15 from "../../../../data/public/matsuri/f1/batch-15.json";
import batch16 from "../../../../data/public/matsuri/f1/batch-16.json";
import batch17 from "../../../../data/public/matsuri/f1/batch-17.json";
import batch18 from "../../../../data/public/matsuri/f1/batch-18.json";
import batch19 from "../../../../data/public/matsuri/f1/batch-19.json";
import { matsuriProjection as baseProjection } from "./matsuri-projection.js";

const waveBundle = {
  entities: [...batch14.entities, ...batch15.entities, ...batch16.entities, ...batch17.entities, ...batch18.entities, ...batch19.entities],
  places: [],
  stateSnapshots: [],
  changeEvents: [],
  occurrences: [],
  occurrenceSeries: [],
  recurrencePatterns: [],
  relations: [],
  designations: [],
  sources: [...batch14.sources, ...batch15.sources, ...batch16.sources, ...batch17.sources, ...batch18.sources, ...batch19.sources],
  evidence: [...batch14.evidence, ...batch15.evidence, ...batch16.evidence, ...batch17.evidence, ...batch18.evidence, ...batch19.evidence],
  images: [...batch14.images, ...batch15.images, ...batch16.images, ...batch17.images, ...batch18.images, ...batch19.images],
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
