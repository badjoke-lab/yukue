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
import maintenance02 from "../../../../data/public/matsuri/f2/maintenance-02.json";
import maintenance03 from "../../../../data/public/matsuri/f2/maintenance-03.json";
import maintenance04 from "../../../../data/public/matsuri/f2/maintenance-04.json";
import maintenance05 from "../../../../data/public/matsuri/f2/maintenance-05.json";
import maintenance06 from "../../../../data/public/matsuri/f2/maintenance-06.json";
import maintenance07 from "../../../../data/public/matsuri/f2/maintenance-07.json";
import maintenance08 from "../../../../data/public/matsuri/f2/maintenance-08.json";
import maintenance09 from "../../../../data/public/matsuri/f2/maintenance-09.json";
import corrections01 from "../../../../data/public/matsuri/f2/corrections-01.json";
import corrections02 from "../../../../data/public/matsuri/f2/corrections-02.json";
import corrections03 from "../../../../data/public/matsuri/f2/corrections-03.json";
import corrections04 from "../../../../data/public/matsuri/f2/corrections-04.json";
import corrections05 from "../../../../data/public/matsuri/f2/corrections-05.json";
import { buildMatsuriCanonicalDataset } from "./matsuri-canonical-dataset.mjs";

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
  maintenance02,
  maintenance03,
  maintenance04,
  maintenance05,
  maintenance06,
  maintenance07,
  maintenance08,
  maintenance09,
];

const correctionBundles = [
  corrections01,
  corrections02,
  corrections03,
  corrections04,
  corrections05,
];

const baseDataset = {
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
};

const canonicalBundle = buildMatsuriCanonicalDataset(
  baseDataset as unknown as Parameters<typeof buildMatsuriCanonicalDataset>[0],
  additiveBundles as unknown as Parameters<typeof buildMatsuriCanonicalDataset>[1],
  correctionBundles as unknown as Parameters<typeof buildMatsuriCanonicalDataset>[2],
) as unknown as Parameters<typeof buildPublicProjection>[0];

export const matsuriProjection = buildPublicProjection(canonicalBundle);

export function findMatsuriEntityDetail(entityId: string) {
  return matsuriProjection.html.entity_details.find(
    (detail) => detail.entity.id === entityId,
  );
}
