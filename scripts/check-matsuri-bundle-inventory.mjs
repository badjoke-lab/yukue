import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  matsuriF1BatchFiles,
  matsuriF2CorrectionFiles,
  matsuriF2MaintenanceFiles,
} from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";
import "./check-matsuri-repository-baseline.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const projectionPath = path.join(
  repositoryRoot,
  "apps",
  "matsuri",
  "src",
  "data",
  "matsuri-projection.ts",
);
const currentProjectionPath = path.join(
  repositoryRoot,
  "apps",
  "matsuri",
  "src",
  "data",
  "matsuri-projection-current.ts",
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

function assertOrderedInventory(actual, expected, label) {
  if (
    actual.length !== expected.length ||
    actual.some((value, index) => value !== expected[index])
  ) {
    throw new Error(
      `${label} order mismatch:\nactual: ${JSON.stringify(actual)}\nexpected: ${JSON.stringify(expected)}`,
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

function extractArrayIdentifiers(source, arrayName) {
  const arrayPattern = new RegExp(
    `const\\s+${arrayName}\\s*=\\s*\\[([\\s\\S]*?)\\];`,
    "u",
  );
  const match = arrayPattern.exec(source);
  assert(match, `Matsuri HTML projection is missing ${arrayName}.`);

  const body = match[1]
    .replace(/\/\*[\s\S]*?\*\//gu, "")
    .replace(/\/\/.*$/gmu, "");
  const identifiers = body
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  for (const identifier of identifiers) {
    assert(
      /^[A-Za-z_$][\w$]*$/u.test(identifier),
      `${arrayName} contains unsupported expression ${JSON.stringify(identifier)}; use imported bundle identifiers only.`,
    );
  }

  assert(
    new Set(identifiers).size === identifiers.length,
    `${arrayName} contains a duplicate bundle identifier.`,
  );

  return identifiers;
}

assert(fs.existsSync(projectionPath), "Matsuri HTML projection source is missing");
assert(fs.existsSync(currentProjectionPath), "Matsuri current HTML projection source is missing");

const projectionSource = fs.readFileSync(projectionPath, "utf8");
const currentProjectionSource = fs.readFileSync(currentProjectionPath, "utf8");
const importPattern =
  /import\s+([A-Za-z_$][\w$]*)\s+from\s+["']\.\.\/\.\.\/\.\.\/\.\.\/data\/public\/matsuri\/(f1|f2)\/([^"']+\.json)["'];?/gu;
const projectionImports = { f1: [], f2: [] };
const projectionImportsByIdentifier = new Map();

for (const match of projectionSource.matchAll(importPattern)) {
  const [, identifier, directory, fileName] = match;
  assert(!projectionImportsByIdentifier.has(identifier), `Matsuri HTML projection reuses imported bundle identifier ${identifier}.`);
  const importRecord = { identifier, directory, fileName };
  projectionImports[directory].push(importRecord);
  projectionImportsByIdentifier.set(identifier, importRecord);
}

const currentProjectionImports = { f1: [], f2: [] };
for (const match of currentProjectionSource.matchAll(importPattern)) {
  const [, identifier, directory, fileName] = match;
  currentProjectionImports[directory].push({ identifier, directory, fileName });
}

for (const [directory, imports] of Object.entries(projectionImports)) {
  const files = imports.map((item) => item.fileName);
  assert(new Set(files).size === files.length, `Matsuri HTML projection imports a duplicate ${directory} bundle`);
}
for (const [directory, imports] of Object.entries(currentProjectionImports)) {
  const files = imports.map((item) => item.fileName);
  assert(new Set(files).size === files.length, `Matsuri current HTML projection imports a duplicate ${directory} bundle`);
}

function resolveOrderedBundlePaths(arrayName) {
  return extractArrayIdentifiers(projectionSource, arrayName).map((identifier) => {
    const importRecord = projectionImportsByIdentifier.get(identifier);
    assert(importRecord, `${arrayName} references ${identifier}, which is not an imported Matsuri F1 or F2 bundle.`);
    return `${importRecord.directory}/${importRecord.fileName}`;
  });
}

const expectedF2Files = [...matsuriF2MaintenanceFiles, ...matsuriF2CorrectionFiles];
const baseF1Files = projectionImports.f1.map((item) => item.fileName);
const baseF1Set = new Set(baseF1Files);
const overlayF1Files = currentProjectionImports.f1.map((item) => item.fileName);
const combinedF1Files = [...baseF1Files, ...overlayF1Files];
const expectedOverlayF1Files = matsuriF1BatchFiles.filter((fileName) => !baseF1Set.has(fileName));

const baseF2Files = projectionImports.f2.map((item) => item.fileName);
const baseF2Set = new Set(baseF2Files);
const overlayF2Files = currentProjectionImports.f2.map((item) => item.fileName);
const combinedF2Files = [...baseF2Files, ...overlayF2Files];
const expectedOverlayF2Files = expectedF2Files.filter((fileName) => !baseF2Set.has(fileName));
const baseMaintenanceFiles = matsuriF2MaintenanceFiles.filter((fileName) => baseF2Set.has(fileName));
const baseCorrectionFiles = matsuriF2CorrectionFiles.filter((fileName) => baseF2Set.has(fileName));

const expectedBaseAdditiveOrder = [
  ...matsuriF1BatchFiles.filter((fileName) => baseF1Set.has(fileName)).map((fileName) => `f1/${fileName}`),
  ...baseMaintenanceFiles.map((fileName) => `f2/${fileName}`),
];
const expectedCorrectionOrder = baseCorrectionFiles.map((fileName) => `f2/${fileName}`);

assertFilesExist("f1", matsuriF1BatchFiles, "Canonical loader F1 inventory");
assertFilesExist("f2", matsuriF2MaintenanceFiles, "Canonical loader maintenance inventory");
assertFilesExist("f2", matsuriF2CorrectionFiles, "Canonical loader correction inventory");

assertExactInventory(combinedF1Files, matsuriF1BatchFiles, "Matsuri F1 loader/current-projection");
assert(overlayF1Files.length > 0, "Matsuri current projection must contain at least the newest F1 wave.");
assertOrderedInventory(overlayF1Files, expectedOverlayF1Files, "Matsuri current projection contiguous F1 suffix");
assert(
  overlayF1Files.at(-1) === matsuriF1BatchFiles.at(-1),
  `Matsuri current projection must include the newest F1 wave; actual tail: ${JSON.stringify(overlayF1Files)}`,
);

assertExactInventory(combinedF2Files, expectedF2Files, "Matsuri F2 loader/current-projection");
assertOrderedInventory(overlayF2Files, expectedOverlayF2Files, "Matsuri current projection contiguous F2 suffix");
assertOrderedInventory(resolveOrderedBundlePaths("additiveBundles"), expectedBaseAdditiveOrder, "Matsuri base additive bundle application");
assertOrderedInventory(resolveOrderedBundlePaths("correctionBundles"), expectedCorrectionOrder, "Matsuri correction bundle application");
assert(
  /import\s+\{\s*matsuriProjection\s+as\s+baseProjection\s*\}\s+from\s+["']\.\/matsuri-projection\.js["']/u.test(currentProjectionSource),
  "Matsuri current projection must extend the validated base projection.",
);

console.log(
  `Matsuri bundle inventory is aligned across canonical loader, base projection, and current wave overlay: ${matsuriF1BatchFiles.length} F1 batch(es), ${matsuriF2MaintenanceFiles.length} maintenance batch(es), and ${matsuriF2CorrectionFiles.length} correction bundle(s).`,
);
