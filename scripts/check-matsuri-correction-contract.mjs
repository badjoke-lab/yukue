import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  loadMatsuriDataset,
  matsuriF2CorrectionFiles,
  matsuriRecordFamilies,
} from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";
import { applyMatsuriRecordOverrides } from "../apps/matsuri/src/data/matsuri-record-overrides.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const correctionDirectory = path.join(
  repositoryRoot,
  "data",
  "public",
  "matsuri",
  "f2",
);
const loaderPath = path.join(
  repositoryRoot,
  "apps",
  "matsuri",
  "scripts",
  "load-matsuri-dataset.mjs",
);
const projectionPath = path.join(
  repositoryRoot,
  "apps",
  "matsuri",
  "src",
  "data",
  "matsuri-projection.ts",
);
const sharedHelperPath = path.join(
  repositoryRoot,
  "apps",
  "matsuri",
  "src",
  "data",
  "matsuri-record-overrides.mjs",
);
const sharedDatasetPath = path.join(
  repositoryRoot,
  "apps",
  "matsuri",
  "src",
  "data",
  "matsuri-canonical-dataset.mjs",
);

const allowedFamilies = new Set(matsuriRecordFamilies);
const correctionChains = new Map();
let correctionRecordCount = 0;

function chainKey(familyName, recordId) {
  return `${familyName}:${recordId}`;
}

assert(fs.existsSync(sharedHelperPath), "Shared Matsuri correction engine is missing.");
assert(fs.existsSync(sharedDatasetPath), "Shared Matsuri dataset assembler is missing.");

for (const fileName of matsuriF2CorrectionFiles) {
  const absolutePath = path.join(correctionDirectory, fileName);
  assert(fs.existsSync(absolutePath), `Correction bundle is missing: ${fileName}`);

  const bundle = JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  assert(
    bundle && typeof bundle === "object" && !Array.isArray(bundle),
    `Correction bundle ${fileName} must contain an object.`,
  );

  for (const [familyName, records] of Object.entries(bundle)) {
    assert(
      allowedFamilies.has(familyName),
      `Correction bundle ${fileName} contains unsupported family ${familyName}.`,
    );
    assert(
      Array.isArray(records),
      `Correction bundle ${fileName} family ${familyName} must be an array.`,
    );

    for (const record of records) {
      assert(
        record && typeof record === "object" && !Array.isArray(record),
        `Correction bundle ${fileName} family ${familyName} contains a non-object record.`,
      );
      assert(
        typeof record.id === "string" && record.id.length > 0,
        `Correction bundle ${fileName} family ${familyName} contains a record without an ID.`,
      );
      assert(
        Number.isInteger(record.record_version) && record.record_version > 0,
        `Correction ${familyName}:${record.id} in ${fileName} has an invalid record_version.`,
      );

      const key = chainKey(familyName, record.id);
      const chain = correctionChains.get(key) ?? [];
      const previous = chain.at(-1);
      if (previous) {
        assert(
          record.record_version > previous.record.record_version,
          `Correction chain ${key} does not increase record_version: ${previous.record.record_version} -> ${record.record_version}.`,
        );
      }

      chain.push({ fileName, record });
      correctionChains.set(key, chain);
      correctionRecordCount += 1;
    }
  }
}

for (const familyName of matsuriRecordFamilies) {
  const syntheticBase = [
    {
      id: `contract-${familyName}`,
      schema_version: "contract.v1",
      record_version: 1,
      marker: "base",
    },
  ];
  const syntheticOverride = {
    ...syntheticBase[0],
    record_version: 2,
    marker: "corrected",
  };

  assert.deepEqual(
    applyMatsuriRecordOverrides(syntheticBase, [syntheticOverride], familyName),
    [syntheticOverride],
    `Shared correction engine does not replace ${familyName} records exactly.`,
  );
  assert.throws(
    () =>
      applyMatsuriRecordOverrides(
        syntheticBase,
        [{ ...syntheticOverride, id: `missing-${familyName}` }],
        familyName,
      ),
    /does not replace an existing record/u,
    `Shared correction engine accepts a missing ${familyName} stable ID.`,
  );
  assert.throws(
    () =>
      applyMatsuriRecordOverrides(
        syntheticBase,
        [{ ...syntheticOverride, record_version: 1 }],
        familyName,
      ),
    /must increase record_version/u,
    `Shared correction engine accepts a non-increasing ${familyName} version.`,
  );
  assert.throws(
    () =>
      applyMatsuriRecordOverrides(
        [...syntheticBase, { ...syntheticBase[0] }],
        [syntheticOverride],
        familyName,
      ),
    /base records contain duplicate ID/u,
    `Shared correction engine accepts duplicate ${familyName} base IDs with corrections.`,
  );
  assert.throws(
    () =>
      applyMatsuriRecordOverrides(
        [...syntheticBase, { ...syntheticBase[0] }],
        [],
        familyName,
      ),
    /base records contain duplicate ID/u,
    `Shared correction engine accepts duplicate ${familyName} base IDs without corrections.`,
  );
}

const loaderSource = fs.readFileSync(loaderPath, "utf8");
const projectionSource = fs.readFileSync(projectionPath, "utf8");
const sharedDatasetSource = fs.readFileSync(sharedDatasetPath, "utf8");

assert(
  /import\s*\{\s*applyMatsuriRecordOverrides\s*\}\s*from\s*["']\.\/matsuri-record-overrides\.mjs["']/u.test(
    sharedDatasetSource,
  ),
  "Shared dataset assembler does not import the shared correction engine.",
);
assert(
  /import\s*\{[\s\S]*buildMatsuriCanonicalDataset[\s\S]*\}\s*from\s*["']\.\.\/src\/data\/matsuri-canonical-dataset\.mjs["']/u.test(
    loaderSource,
  ),
  "Canonical loader does not import the shared dataset assembler.",
);
assert(
  /import\s*\{\s*buildMatsuriCanonicalDataset\s*\}\s*from\s*["']\.\/matsuri-canonical-dataset\.mjs["']/u.test(
    projectionSource,
  ),
  "HTML Public Projection does not import the shared dataset assembler.",
);
for (const [consumerName, consumerSource] of [
  ["Canonical loader", loaderSource],
  ["HTML Public Projection", projectionSource],
]) {
  assert(
    !/function\s+apply(?:Matsuri)?RecordOverrides\s*\(/u.test(consumerSource),
    `${consumerName} reintroduces a local correction-engine implementation.`,
  );
}

const dataset = loadMatsuriDataset();
for (const familyName of matsuriRecordFamilies) {
  assert(
    Array.isArray(dataset[familyName]),
    `Canonical loader did not return record family ${familyName}.`,
  );
}

for (const [key, chain] of correctionChains.entries()) {
  const separatorIndex = key.indexOf(":");
  const familyName = key.slice(0, separatorIndex);
  const recordId = key.slice(separatorIndex + 1);
  const finalCorrection = chain.at(-1);
  const finalRecord = dataset[familyName].find((record) => record.id === recordId);

  assert(
    finalRecord,
    `Final corrected record ${familyName}:${recordId} is missing from the canonical dataset.`,
  );
  assert.deepEqual(
    finalRecord,
    finalCorrection.record,
    `Canonical dataset does not expose the final correction from ${finalCorrection.fileName} for ${familyName}:${recordId}.`,
  );
}

console.log(
  `Matsuri shared correction contract passed: ${matsuriRecordFamilies.length} record families, ${matsuriF2CorrectionFiles.length} correction bundles, ${correctionChains.size} corrected IDs, and ${correctionRecordCount} correction records.`,
);
