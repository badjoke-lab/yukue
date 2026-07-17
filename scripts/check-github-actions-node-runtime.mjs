import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const workflowsDirectory = path.join(repositoryRoot, ".github", "workflows");
const dependabotPath = path.join(repositoryRoot, ".github", "dependabot.yml");
const workflowFiles = fs
  .readdirSync(workflowsDirectory, { withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.ya?ml$/u.test(entry.name))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

const usesPattern = /^\s*uses:\s*([^\s@]+)@([^\s#]+)(?:\s+#\s*(\S+))?\s*$/u;
const fullCommitShaPattern = /^[0-9a-f]{40}$/u;
const versionCommentPattern = /^v(\d+)(?:\.\d+\.\d+)?$/u;
const minimumMajors = new Map([
  ["actions/checkout", 6],
  ["actions/setup-node", 6],
]);

const violations = [];
const actionCounts = new Map();
let remoteActionReferences = 0;
let localActionReferences = 0;
let leastPrivilegeWorkflows = 0;

function validateTopLevelPermissions(fileName, lines) {
  const workflowPath = path.posix.join(".github", "workflows", fileName);
  const jobsIndex = lines.findIndex((line) => /^jobs:\s*$/u.test(line));

  if (jobsIndex === -1) {
    violations.push(`${workflowPath}: missing top-level jobs block`);
    return;
  }

  const permissionCandidates = lines
    .map((line, index) => ({ line, index }))
    .filter(({ line, index }) => index < jobsIndex && /^permissions:/u.test(line));

  if (permissionCandidates.length === 0) {
    violations.push(
      `${workflowPath}: missing explicit top-level permissions block; required:\n  permissions:\n    contents: read`,
    );
    return;
  }

  if (permissionCandidates.length > 1) {
    violations.push(`${workflowPath}: multiple top-level permissions declarations are not allowed`);
    return;
  }

  const [{ line: declaration, index: permissionsIndex }] = permissionCandidates;
  const scalarValue = declaration.match(/^permissions:\s*(\S.*)$/u)?.[1];
  if (scalarValue) {
    violations.push(
      `${workflowPath}:${permissionsIndex + 1}: scalar permissions value '${scalarValue}' is not allowed; use an explicit contents: read block`,
    );
    return;
  }

  const entries = [];
  for (let index = permissionsIndex + 1; index < jobsIndex; index += 1) {
    const line = lines[index];
    if (line.trim().length === 0 || /^\s*#/u.test(line)) continue;
    if (/^\S/u.test(line)) break;
    entries.push({ line: line.trim(), index });
  }

  const normalizedEntries = entries.map(({ line }) => line);
  if (normalizedEntries.length !== 1 || normalizedEntries[0] !== "contents: read") {
    violations.push(
      `${workflowPath}:${permissionsIndex + 1}: top-level permissions must contain only 'contents: read'; found ${JSON.stringify(normalizedEntries)}`,
    );
    return;
  }

  leastPrivilegeWorkflows += 1;
}

for (const fileName of workflowFiles) {
  const filePath = path.join(workflowsDirectory, fileName);
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/u);

  validateTopLevelPermissions(fileName, lines);

  for (const [index, line] of lines.entries()) {
    if (!/^\s*uses:/u.test(line)) continue;

    const location = `${path.posix.join(".github", "workflows", fileName)}:${index + 1}`;
    const rawReference = line.replace(/^\s*uses:\s*/u, "").trim();

    if (rawReference.startsWith("./")) {
      localActionReferences += 1;
      continue;
    }

    const match = line.match(usesPattern);
    if (!match) {
      violations.push(`${location}: unsupported or malformed remote action reference: ${rawReference}`);
      continue;
    }

    const [, actionName, reference, versionComment] = match;
    remoteActionReferences += 1;
    actionCounts.set(actionName, (actionCounts.get(actionName) ?? 0) + 1);

    if (!fullCommitShaPattern.test(reference)) {
      violations.push(
        `${location}: ${actionName}@${reference} must be pinned to a full-length 40-character commit SHA`,
      );
    }

    const versionMatch = versionComment?.match(versionCommentPattern);
    if (!versionMatch) {
      violations.push(
        `${location}: ${actionName}@${reference} must retain a same-line version comment such as # v6 for Dependabot`,
      );
      continue;
    }

    const minimumMajor = minimumMajors.get(actionName);
    const documentedMajor = Number.parseInt(versionMatch[1], 10);
    if (minimumMajor !== undefined && documentedMajor < minimumMajor) {
      violations.push(
        `${location}: ${actionName} must document major v${minimumMajor} or later, found ${versionComment}`,
      );
    }
  }
}

if (remoteActionReferences === 0) {
  violations.push("No remote GitHub Actions references were found; the supply-chain guard cannot verify an empty inventory.");
}

if (!fs.existsSync(dependabotPath)) {
  violations.push(".github/dependabot.yml is required to keep pinned GitHub Actions references current.");
} else {
  const dependabot = fs.readFileSync(dependabotPath, "utf8");
  const requiredDependabotPatterns = [
    [/^version:\s*2\s*$/mu, "version: 2"],
    [/package-ecosystem:\s*["']github-actions["']/u, 'package-ecosystem: "github-actions"'],
    [/directory:\s*["']\/["']/u, 'directory: "/"'],
    [/interval:\s*["']weekly["']/u, 'interval: "weekly"'],
  ];

  for (const [pattern, expected] of requiredDependabotPatterns) {
    if (!pattern.test(dependabot)) {
      violations.push(`.github/dependabot.yml is missing required GitHub Actions update setting: ${expected}`);
    }
  }
}

if (violations.length > 0) {
  throw new Error(
    `GitHub Actions supply-chain guard failed:\n${violations.map((violation) => `- ${violation}`).join("\n")}`,
  );
}

const actionInventory = [...actionCounts.entries()]
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([name, count]) => `${name}=${count}`)
  .join(", ");

console.log(
  `GitHub Actions supply-chain guard passed: ${workflowFiles.length} workflow files, ${remoteActionReferences} remote references pinned to full SHAs, ${localActionReferences} local references, ${leastPrivilegeWorkflows} workflows restricted to contents: read, weekly Dependabot enabled; ${actionInventory}.`,
);
