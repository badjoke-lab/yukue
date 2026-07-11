import fs from "node:fs";
import { fileURLToPath } from "node:url";

const d1Directory = new URL("../../../data/public/matsuri/d1/", import.meta.url);
const f1Directory = new URL("../../../data/public/matsuri/f1/", import.meta.url);
const f2Directory = new URL("../../../data/public/matsuri/f2/", import.meta.url);

export const matsuriF1BatchFiles = [
  "batch-01.json",
  "batch-02.json",
  "batch-03.json",
  "batch-04.json",
  "batch-05.json",
  "batch-06.json",
  "batch-07.json",
  "batch-08.json",
  "batch-09.json",
  "batch-09-context.json",
  "batch-10.json",
];

export const matsuriF2CorrectionFiles = ["corrections-01.json"];

function readJson(directory, fileName) {
  const filePath = fileURLToPath(new URL(fileName, directory));
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function applyRecordOverrides(records, overrides, familyName) {
  if (overrides.length === 0) return records;

  const recordsById = new Map(records.map((record) => [record.id, record]));

  for (const override of overrides) {
    const previous = recordsById.get(override.id);
    if (!previous) {
      throw new Error(
        `Matsuri ${familyName} correction ${override.id} does not replace an existing record.`,
      );
    }

    if (override.record_version <= previous.record_version) {
      throw new Error(
        `Matsuri ${familyName} correction ${override.id} must increase record_version above ${previous.record_version}.`,
      );
    }

    recordsById.set(override.id, override);
  }

  return records.map((record) => recordsById.get(record.id));
}

export function loadMatsuriDataset() {
  const records = readJson(d1Directory, "records.json");
  const batches = matsuriF1BatchFiles.map((fileName) =>
    readJson(f1Directory, fileName),
  );
  const corrections = matsuriF2CorrectionFiles.map((fileName) =>
    readJson(f2Directory, fileName),
  );
  const batchRecords = (key) => batches.flatMap((batch) => batch[key] ?? []);
  const correctionRecords = (key) =>
    corrections.flatMap((correction) => correction[key] ?? []);

  const occurrences = [
    ...records.occurrences,
    ...batchRecords("occurrences"),
  ];
  const evidence = [
    ...readJson(d1Directory, "evidence.json"),
    ...batchRecords("evidence"),
  ];

  return {
    entities: [
      ...readJson(d1Directory, "entities.json"),
      ...batchRecords("entities"),
    ],
    places: [
      ...readJson(d1Directory, "places.json"),
      ...batchRecords("places"),
    ],
    stateSnapshots: [
      ...readJson(d1Directory, "state-snapshots.json"),
      ...batchRecords("stateSnapshots"),
    ],
    changeEvents: [...records.changeEvents, ...batchRecords("changeEvents")],
    occurrences: applyRecordOverrides(
      occurrences,
      correctionRecords("occurrences"),
      "Occurrence",
    ),
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
    evidence: applyRecordOverrides(
      evidence,
      correctionRecords("evidence"),
      "Evidence",
    ),
    images: [...records.images, ...batchRecords("images")],
  };
}
