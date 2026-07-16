import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  matsuriF1BatchFiles,
  matsuriF2CorrectionFiles,
  matsuriF2MaintenanceFiles,
} from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const projectionPath = path.join(
  repositoryRoot,
  "apps",
  "matsuri",
  "src",
  "data",
  "matsuri-projection.ts",
);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function sorted(values) {
  return [...values].sort((a, b) => a.localeCompare(b));
}

function assertExactInventory(actual, expected, label) {
  const actualSorted = sorted(actual);
  const expectedSorted = sorted(expected);

  if (
    actualSorted.length !== expectedSorted.length ||
    actualSorted.some((value, index) => value !== expectedSorted[index])
  ) {
    throw new Error(
      `${label} inventory mismatch:\nactual: ${JSON.stringify(actualSorted)}\nexpected: ${JSON.stringify(expectedSorted)}`,
    );
  }
}

function assertFilesExist(directory, files, label) {
  for (const fileName of files) {
    const absolutePath = path.join(repositoryRoot, "data", "public", "matsuri", directory, fileName);
    assert(fs.existsSync(absolutePath), `${label} references missing file ${directory}/${fileName}`);
    assert(fs.statSync(absolutePath).isFile(), `${label} path is not a file: ${directory}/${fileName}`);
  }
}

assert(fs.existsSync(projectionPath), "Matsuri HTML projection source is missing");

const projectionSource = fs.readFileSync(projectionPath, "utf8");
const importPattern =
  /from\s+["']\.\.\/\.\.\/\.\.\/\.\.\/data\/public\/matsuri\/(f1|f2)\/([^"']+\.json)["']/gu;
const projectionImports = { f1: [], f2: [] };

for (const match of projectionSource.matchAll(importPattern)) {
  projectionImports[match[1]].push(match[2]);
}

for (const [directory, files] of Object.entries(projectionImports)) {
  assert(
    new Set(files).size === files.length,
    `Matsuri HTML projection imports a duplicate ${directory} bundle`,
  );
}

const expectedF2Files = [
  ...matsuriF2MaintenanceFiles,
  ...matsuriF2CorrectionFiles,
];

assertFilesExist("f1", matsuriF1BatchFiles, "Canonical loader F1 inventory");
assertFilesExist("f2", matsuriF2MaintenanceFiles, "Canonical loader maintenance inventory");
assertFilesExist("f2", matsuriF2CorrectionFiles, "Canonical loader correction inventory");

assertExactInventory(
  projectionImports.f1,
  matsuriF1BatchFiles,
  "Matsuri F1 loader/projection",
);
assertExactInventory(
  projectionImports.f2,
  expectedF2Files,
  "Matsuri F2 loader/projection",
);

console.log(
  `Matsuri bundle inventory is aligned: ${matsuriF1BatchFiles.length} F1 batch(es), ${matsuriF2MaintenanceFiles.length} maintenance batch(es), and ${matsuriF2CorrectionFiles.length} correction bundle(s).`,
);
