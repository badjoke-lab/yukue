import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const workflowsDirectory = path.join(repositoryRoot, ".github", "workflows");
const workflowFiles = fs
  .readdirSync(workflowsDirectory, { withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.ya?ml$/u.test(entry.name))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

const deprecatedActions = [
  {
    name: "actions/checkout",
    pattern: /actions\/checkout@v([1-5])\b/gu,
    required: "actions/checkout@v6",
  },
  {
    name: "actions/setup-node",
    pattern: /actions\/setup-node@v([1-5])\b/gu,
    required: "actions/setup-node@v6",
  },
];

const violations = [];
const counts = new Map(deprecatedActions.map((action) => [action.name, 0]));

for (const fileName of workflowFiles) {
  const filePath = path.join(workflowsDirectory, fileName);
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/u);

  for (const [index, line] of lines.entries()) {
    for (const action of deprecatedActions) {
      const currentPattern = new RegExp(action.pattern.source, action.pattern.flags);
      const matches = [...line.matchAll(currentPattern)];
      if (matches.length === 0) continue;

      counts.set(action.name, (counts.get(action.name) ?? 0) + matches.length);
      for (const match of matches) {
        violations.push(
          `${path.posix.join(".github", "workflows", fileName)}:${index + 1}: ${match[0]} must be replaced with ${action.required}`,
        );
      }
    }
  }
}

if (violations.length > 0) {
  throw new Error(
    `GitHub Actions Node runtime guard failed:\n${violations.map((violation) => `- ${violation}`).join("\n")}`,
  );
}

console.log(
  `GitHub Actions Node runtime guard passed: ${workflowFiles.length} workflow files checked; no checkout or setup-node major below v6.`,
);
