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
import batch20 from "../../../../data/public/matsuri/f1/batch-20.json";
import batch21 from "../../../../data/public/matsuri/f1/batch-21.json";
import batch22 from "../../../../data/public/matsuri/f1/batch-22.json";
import batch23 from "../../../../data/public/matsuri/f1/batch-23.json";
import batch24 from "../../../../data/public/matsuri/f1/batch-24.json";
import batch25 from "../../../../data/public/matsuri/f1/batch-25.json";
import maintenance99 from "../../../../data/public/matsuri/f2/maintenance-99.json";
import { matsuriProjection as baseProjection } from "./matsuri-projection.js";

const waveBundle = {
  entities: [...batch14.entities, ...batch15.entities, ...batch16.entities, ...batch17.entities, ...batch18.entities, ...batch19.entities, ...batch20.entities, ...batch21.entities, ...batch22.entities, ...batch23.entities, ...batch24.entities, ...batch25.entities],
  places: [],
  stateSnapshots: [...maintenance99.stateSnapshots],
  changeEvents: [],
  occurrences: [...maintenance99.occurrences],
  occurrenceSeries: [],
  recurrencePatterns: [],
  relations: [],
  designations: [],
  sources: [...batch14.sources, ...batch15.sources, ...batch16.sources, ...batch17.sources, ...batch18.sources, ...batch19.sources, ...batch20.sources, ...batch21.sources, ...batch22.sources, ...batch23.sources, ...batch24.sources, ...batch25.sources, ...maintenance99.sources],
  evidence: [...batch14.evidence, ...batch15.evidence, ...batch16.evidence, ...batch17.evidence, ...batch18.evidence, ...batch19.evidence, ...batch20.evidence, ...batch21.evidence, ...batch22.evidence, ...batch23.evidence, ...batch24.evidence, ...batch25.evidence, ...maintenance99.evidence],
  images: [...batch14.images, ...batch15.images, ...batch16.images, ...batch17.images, ...batch18.images, ...batch19.images, ...batch20.images, ...batch21.images, ...batch22.images, ...batch23.images, ...batch24.images, ...batch25.images],
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
    current_states: [...baseProjection.json.current_states, ...waveProjection.json.current_states],
    sources: [...baseProjection.json.sources, ...waveProjection.json.sources],
    evidence: [...baseProjection.json.evidence, ...waveProjection.json.evidence],
    occurrences: [...baseProjection.json.occurrences, ...waveProjection.json.occurrences],
  },
};

export const matsuriEntityDetails = matsuriProjection.html.entity_details;

export function findMatsuriEntityDetail(entityId: string) {
  return matsuriEntityDetails.find((detail) => detail.entity.id === entityId);
}
