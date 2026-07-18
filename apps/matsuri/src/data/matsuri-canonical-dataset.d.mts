import type { MatsuriVersionedRecord } from "./matsuri-record-overrides.mjs";

export type MatsuriRecordFamily =
  | "entities"
  | "places"
  | "stateSnapshots"
  | "changeEvents"
  | "occurrences"
  | "occurrenceSeries"
  | "recurrencePatterns"
  | "relations"
  | "designations"
  | "sources"
  | "evidence"
  | "images";

export type MatsuriCanonicalDataset = Record<
  MatsuriRecordFamily,
  MatsuriVersionedRecord[]
>;

export declare const matsuriRecordFamilies: readonly MatsuriRecordFamily[];

export declare function buildMatsuriCanonicalDataset(
  baseDataset: Record<
    MatsuriRecordFamily,
    ReadonlyArray<MatsuriVersionedRecord>
  >,
  additiveBundles: ReadonlyArray<Record<string, unknown>>,
  correctionBundles: ReadonlyArray<Record<string, unknown>>,
): MatsuriCanonicalDataset;
