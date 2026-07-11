import { buildPublicProjection } from "@badjoke-lab/yukue-observation-core";
import { loadMatsuriDataset } from "./load-matsuri-dataset.mjs";

export function loadMatsuriProjection() {
  return buildPublicProjection(loadMatsuriDataset());
}
