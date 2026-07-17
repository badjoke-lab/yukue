import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const requireLockfile = process.argv.includes("--require-lockfile");
const lockfilePath = path.join(repositoryRoot, "pnpm-lock.yaml");
const dependabotPath = path.join(repositoryRoot, ".github", "dependabot.yml");
const workflowsDirectory = path.join(repositoryRoot, ".github", "workflows");
const exactVersionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/u;
const dependencySections = ["dependencies", "devDependencies", "optionalDependencies"];
const ignoredDirectories = new Set([".git", ".release-candidate", ".wrangler", "artifacts", "dist", "node_modules", "test-results"]);
const violations = [];
const packageFiles = [];
let externalDependencyCount = 0;
let workspaceDependencyCount = 0;
let frozenInstallCount = 0;

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;

    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(absolutePath);
      continue;
    }

    if (entry.isFile() && entry.name === "package.json") {
      packageFiles.push(absolutePath);
    }
  }
}

for (const root of [repositoryRoot, path.join(repositoryRoot, "apps"), path.join(repositoryRoot, "packages")]) {
  if (!fs.existsSync(root)) continue;
  if (root === repositoryRoot) {
    packageFiles.push(path.join(repositoryRoot, "package.json"));
  } else {
    walk(root);
  }
}

const uniquePackageFiles = [...new Set(packageFiles)]
  .filter((filePath) => fs.existsSync(filePath))
  .sort((left, right) => left.localeCompare(right));

for (const filePath of uniquePackageFiles) {
  const relativePath = path.relative(repositoryRoot, filePath).split(path.sep).join("/");
  let packageJson;

  try {
    packageJson = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    violations.push(`${relativePath}: invalid JSON (${error instanceof Error ? error.message : String(error)})`);
    continue;
  }

  if (relativePath === "package.json" && packageJson.packageManager !== "pnpm@11.10.0") {
    violations.push(
      `${relativePath}: packageManager must remain exactly 'pnpm@11.10.0'; found ${JSON.stringify(packageJson.packageManager)}`,
    );
  }

  for (const section of dependencySections) {
    const dependencies = packageJson[section];
    if (dependencies === undefined) continue;
    if (dependencies === null || typeof dependencies !== "object" || Array.isArray(dependencies)) {
      violations.push(`${relativePath}: ${section} must be an object`);
      continue;
    }

    for (const [name, specifier] of Object.entries(dependencies)) {
      if (typeof specifier !== "string" || specifier.trim().length === 0) {
        violations.push(`${relativePath}: ${section}.${name} has an empty or non-string specifier`);
        continue;
      }

      if (specifier.startsWith("workspace:")) {
        workspaceDependencyCount += 1;
        continue;
      }

      externalDependencyCount += 1;
      if (!exactVersionPattern.test(specifier)) {
        violations.push(
          `${relativePath}: ${section}.${name} must use an exact released version; found '${specifier}'`,
        );
      }
    }
  }
}

if (requireLockfile) {
  if (!fs.existsSync(lockfilePath)) {
    violations.push("pnpm-lock.yaml is required for reproducible installs");
  } else {
    const lockfile = fs.readFileSync(lockfilePath, "utf8");
    for (const requiredMarker of ["lockfileVersion: '9.0'", "importers:", "packages:", "snapshots:"]) {
      if (!lockfile.includes(requiredMarker)) {
        violations.push(`pnpm-lock.yaml is missing required marker: ${requiredMarker}`);
      }
    }
  }
}

if (!fs.existsSync(dependabotPath)) {
  violations.push(".github/dependabot.yml is required for dependency maintenance");
} else {
  const dependabot = fs.readFileSync(dependabotPath, "utf8");
  const requiredDependabotPatterns = [
    [/package-ecosystem:\s*["']npm["']/u, 'package-ecosystem: "npm"'],
    [/versioning-strategy:\s*["']increase["']/u, 'versioning-strategy: "increase"'],
    [/prefix:\s*["']chore\(deps\)["']/u, 'prefix: "chore(deps)"'],
  ];

  for (const [pattern, expected] of requiredDependabotPatterns) {
    if (!pattern.test(dependabot)) {
      violations.push(`.github/dependabot.yml is missing required npm update setting: ${expected}`);
    }
  }
}

if (fs.existsSync(workflowsDirectory)) {
  const workflowFiles = fs
    .readdirSync(workflowsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.ya?ml$/u.test(entry.name))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  for (const fileName of workflowFiles) {
    const filePath = path.join(workflowsDirectory, fileName);
    const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/u);

    for (const [index, line] of lines.entries()) {
      if (!line.includes("pnpm install")) continue;
      const location = `${path.posix.join(".github", "workflows", fileName)}:${index + 1}`;

      if (line.includes("--no-frozen-lockfile")) {
        violations.push(`${location}: --no-frozen-lockfile is forbidden`);
        continue;
      }

      if (!line.includes("--frozen-lockfile")) {
        violations.push(`${location}: dependency installs must use --frozen-lockfile`);
        continue;
      }

      frozenInstallCount += 1;
    }
  }
}

if (uniquePackageFiles.length === 0) {
  violations.push("No package.json files were found");
}

if (externalDependencyCount === 0) {
  violations.push("No external dependencies were found; the dependency guard cannot verify an empty inventory");
}

if (frozenInstallCount === 0) {
  violations.push("No pnpm install --frozen-lockfile command was found in GitHub Actions workflows");
}

if (violations.length > 0) {
  throw new Error(
    `Node dependency reproducibility guard failed:\n${violations.map((violation) => `- ${violation}`).join("\n")}`,
  );
}

console.log(
  `Node dependency reproducibility guard passed: ${uniquePackageFiles.length} package manifests, ${externalDependencyCount} exact external dependencies, ${workspaceDependencyCount} workspace dependencies, ${frozenInstallCount} frozen workflow installs${requireLockfile ? ", pnpm-lock.yaml present" : ""}, weekly npm Dependabot enabled.`,
);
