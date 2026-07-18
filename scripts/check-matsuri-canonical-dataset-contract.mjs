import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildMatsuriCanonicalDataset,
  matsuriRecordFamilies,
} from "../apps/matsuri/src/data/matsuri-canonical-dataset.mjs";
import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
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
const assemblerPath = path.join(
  repositoryRoot,
  "apps",
  "matsuri",
  "src",
  "data",
  "matsuri-canonical-dataset.mjs",
);
const declarationPath = path.join(
  repositoryRoot,
  "apps",
  "matsuri",
  "src",
  "data",
  "matsuri-canonical-dataset.d.mts",
);

assert(fs.existsSync(assemblerPath), "Shared Matsuri dataset assembler is missing.");
assert(fs.existsSync(declarationPath), "Shared Matsuri dataset declaration is missing.");

const baseDataset = Object.fromEntries(
  matsuriRecordFamilies.map((familyName) => [
    familyName,
    [
      {
        id: `base-${familyName}`,
        schema_version: "contract.v1",
        record_version: 1,
        marker: "base",
      },
    ],
  ]),
);
const additiveBundle = Object.fromEntries(
  matsuriRecordFamilies.map((familyName) => [
    familyName,
    [
      {
        id: `additive-${familyName}`,
        schema_version: "contract.v1",
        record_version: 1,
        marker: "additive",
      },
    ],
  ]),
);
const correctionBundle = Object.fromEntries(
  matsuriRecordFamilies.map((familyName) => [
    familyName,
    [
      {
        id: `base-${familyName}`,
        schema_version: "contract.v1",
        record_version: 2,
        marker: "corrected",
      },
    ],
  ]),
);

const syntheticDataset = buildMatsuriCanonicalDataset(
  baseDataset,
  [additiveBundle],
  [correctionBundle],
);

for (const familyName of matsuriRecordFamilies) {
  assert.deepEqual(
    syntheticDataset[familyName],
    [correctionBundle[familyName][0], additiveBundle[familyName][0]],
    `Shared dataset assembler does not preserve base order and exact correction semantics for ${familyName}.`,
  );
}

const missingFamilyDataset = { ...baseDataset };
delete missingFamilyDataset.images;
assert.throws(
  () => buildMatsuriCanonicalDataset(missingFamilyDataset, [], []),
  /base dataset family images must be an array/u,
  "Shared dataset assembler accepts a missing base family.",
);
assert.throws(
  () =>
    buildMatsuriCanonicalDataset(
      baseDataset,
      [{ entities: { id: "not-an-array" } }],
      [],
    ),
  /additive bundle 1 family entities must be an array/u,
  "Shared dataset assembler accepts a non-array additive family.",
);
assert.throws(
  () =>
    buildMatsuriCanonicalDataset(
      baseDataset,
      [],
      [{ entities: { id: "not-an-array" } }],
    ),
  /correction bundle 1 family entities must be an array/u,
  "Shared dataset assembler accepts a non-array correction family.",
);
assert.throws(
  () =>
    buildMatsuriCanonicalDataset(
      baseDataset,
      [
        {
          entities: [
            {
              ...baseDataset.entities[0],
              marker: "duplicate-additive-id",
            },
          ],
        },
      ],
      [],
    ),
  /base records contain duplicate ID/u,
  "Shared dataset assembler accepts duplicate accumulated IDs when no correction exists.",
);

const loaderSource = fs.readFileSync(loaderPath, "utf8");
const projectionSource = fs.readFileSync(projectionPath, "utf8");
for (const [consumerName, consumerSource] of [
  ["Canonical loader", loaderSource],
  ["HTML Public Projection", projectionSource],
]) {
  assert(
    /buildMatsuriCanonicalDataset\s*\(/u.test(consumerSource),
    `${consumerName} does not call the shared dataset assembler.`,
  );
  for (const forbiddenPattern of [
    /const\s+bundleRecords\s*=/u,
    /const\s+additiveRecords\s*=/u,
    /const\s+correctionRecords\s*=/u,
    /const\s+correctedRecords\s*=/u,
    /matsuriRecordFamilies\.map\s*\(/u,
  ]) {
    assert(
      !forbiddenPattern.test(consumerSource),
      `${consumerName} reintroduces local dataset assembly logic.`,
    );
  }
}

const dataset = loadMatsuriDataset();
assert.deepEqual(
  Object.keys(dataset),
  [...matsuriRecordFamilies],
  "Canonical loader family order differs from the shared assembler contract.",
);
for (const familyName of matsuriRecordFamilies) {
  const records = dataset[familyName];
  assert(Array.isArray(records), `Canonical dataset family ${familyName} is not an array.`);
  const ids = records.map((record) => record.id);
  assert.equal(
    new Set(ids).size,
    ids.length,
    `Canonical dataset family ${familyName} contains duplicate IDs.`,
  );
}

console.log(
  `Matsuri canonical dataset contract passed: ${matsuriRecordFamilies.length} shared families, 2 consumers, one assembler, and duplicate-ID validation with or without corrections.`,
);
