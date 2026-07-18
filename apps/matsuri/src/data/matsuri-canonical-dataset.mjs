import { applyMatsuriRecordOverrides } from "./matsuri-record-overrides.mjs";

export const matsuriRecordFamilies = [
  "entities",
  "places",
  "stateSnapshots",
  "changeEvents",
  "occurrences",
  "occurrenceSeries",
  "recurrencePatterns",
  "relations",
  "designations",
  "sources",
  "evidence",
  "images",
];

const matsuriRecordFamilyLabels = {
  entities: "Entity",
  places: "Place",
  stateSnapshots: "State Snapshot",
  changeEvents: "Change Event",
  occurrences: "Occurrence",
  occurrenceSeries: "Occurrence Series",
  recurrencePatterns: "Recurrence Pattern",
  relations: "Relation",
  designations: "Designation",
  sources: "Source",
  evidence: "Evidence",
  images: "Image",
};

function collectBundleRecords(bundles, familyName, bundleKind) {
  const records = [];

  for (const [index, bundle] of bundles.entries()) {
    if (!bundle || typeof bundle !== "object" || Array.isArray(bundle)) {
      throw new Error(`Matsuri ${bundleKind} bundle ${index + 1} must be an object.`);
    }

    const familyRecords = bundle[familyName];
    if (familyRecords === undefined) continue;
    if (!Array.isArray(familyRecords)) {
      throw new Error(
        `Matsuri ${bundleKind} bundle ${index + 1} family ${familyName} must be an array.`,
      );
    }

    records.push(...familyRecords);
  }

  return records;
}

export function buildMatsuriCanonicalDataset(
  baseDataset,
  additiveBundles,
  correctionBundles,
) {
  if (!baseDataset || typeof baseDataset !== "object" || Array.isArray(baseDataset)) {
    throw new Error("Matsuri base dataset must be an object.");
  }
  if (!Array.isArray(additiveBundles)) {
    throw new Error("Matsuri additive bundles must be an array.");
  }
  if (!Array.isArray(correctionBundles)) {
    throw new Error("Matsuri correction bundles must be an array.");
  }

  return Object.fromEntries(
    matsuriRecordFamilies.map((familyName) => {
      const baseRecords = baseDataset[familyName];
      if (!Array.isArray(baseRecords)) {
        throw new Error(`Matsuri base dataset family ${familyName} must be an array.`);
      }

      const accumulatedRecords = [
        ...baseRecords,
        ...collectBundleRecords(additiveBundles, familyName, "additive"),
      ];
      const correctedRecords = applyMatsuriRecordOverrides(
        accumulatedRecords,
        collectBundleRecords(correctionBundles, familyName, "correction"),
        matsuriRecordFamilyLabels[familyName],
      );

      return [familyName, correctedRecords];
    }),
  );
}
