import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { validateDependabotConfig } from "./dependabot-config.mjs";

const dependabotPath = fileURLToPath(new URL("../.github/dependabot.yml", import.meta.url));
const source = fs.readFileSync(dependabotPath, "utf8");
const result = validateDependabotConfig(source);

function assertRejected(candidate, label) {
  try {
    validateDependabotConfig(candidate);
  } catch {
    return;
  }
  throw new Error(`Dependabot configuration contract accepted invalid fixture: ${label}`);
}

assertRejected(
  source.replace('    directory: "/"', '    directory: "/.github"'),
  "GitHub Actions directory misplaced while npm still uses root",
);
assertRejected(
  source.replace('      interval: "weekly"', '      interval: "daily"'),
  "GitHub Actions schedule changed while npm remains weekly",
);
assertRejected(
  source.replace('      prefix: "chore(actions)"', '      prefix: "chore(deps)"'),
  "GitHub Actions commit prefix replaced by npm prefix",
);
assertRejected(
  source.replace('    versioning-strategy: "increase"', '    versioning-strategy: "lockfile-only"'),
  "npm versioning strategy changed",
);

console.log(
  `Dependabot configuration contract passed: ${result.updateEntries} update entries, ecosystems ${result.ecosystems.join(", ")}, and four misplaced-setting fixtures rejected.`,
);
