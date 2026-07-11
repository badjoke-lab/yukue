import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const packageManagerCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));

const rootPackagePath = path.join(repositoryRoot, "package.json");
const rootPackage = readJson(rootPackagePath);

const requiredRootScripts = [
  "build",
  "check",
  "typecheck",
  "build:matsuri:pages",
  "check:matsuri:pages",
  "check:matsuri:consistency",
  "check:matsuri:semantics",
  "check:matsuri:evidence",
];

const missingRootScripts = requiredRootScripts.filter(
  (scriptName) => !rootPackage.scripts?.[scriptName],
);

if (missingRootScripts.length > 0) {
  throw new Error(
    `Release verification cannot start. Missing root scripts:\n${missingRootScripts
      .map((scriptName) => `- ${scriptName}`)
      .join("\n")}`,
  );
}

const workspacePackagePaths = ["apps", "packages"].flatMap((workspaceRoot) => {
  const absoluteWorkspaceRoot = path.join(repositoryRoot, workspaceRoot);

  return fs
    .readdirSync(absoluteWorkspaceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(workspaceRoot, entry.name, "package.json"))
    .filter((relativePackagePath) =>
      fs.existsSync(path.join(repositoryRoot, relativePackagePath)),
    );
});

const workspaceReports = [];
const workspaceErrors = [];

for (const relativePackagePath of workspacePackagePaths) {
  const workspacePackage = readJson(path.join(repositoryRoot, relativePackagePath));
  const workspaceName = workspacePackage.name ?? relativePackagePath;
  const isSharedPackage =
    relativePackagePath.startsWith(`packages${path.sep}`) ||
    relativePackagePath.startsWith("packages/");

  if (!workspacePackage.scripts?.build) {
    workspaceErrors.push(`${workspaceName}: missing required build script`);
  }

  for (const scriptName of ["check", "typecheck"]) {
    if (workspacePackage.scripts?.[scriptName]) {
      continue;
    }

    if (isSharedPackage) {
      workspaceErrors.push(
        `${workspaceName}: missing required ${scriptName} script for a shared package`,
      );
    } else {
      workspaceReports.push(
        `${workspaceName}: ${scriptName} is not defined; the Astro application is validated through its build`,
      );
    }
  }
}

if (workspaceErrors.length > 0) {
  throw new Error(
    `Workspace release-contract errors:\n${workspaceErrors
      .map((message) => `- ${message}`)
      .join("\n")}`,
  );
}

console.log(
  `Release workspace contract verified: ${workspacePackagePaths.length} workspaces discovered.`,
);

for (const report of workspaceReports) {
  console.log(`[reported] ${report}`);
}

const stages = [
  {
    name: "Build all workspaces",
    command: packageManagerCommand,
    args: ["build"],
  },
  {
    name: "Run workspace checks",
    command: packageManagerCommand,
    args: ["check"],
  },
  {
    name: "Run workspace typechecks",
    command: packageManagerCommand,
    args: ["typecheck"],
  },
  {
    name: "Build and verify Matsuri Pages, public outputs, corpus semantics, and Evidence",
    command: packageManagerCommand,
    args: ["verify:matsuri:pages"],
  },
  {
    name: "Validate the deployed-site verifier syntax",
    command: process.execPath,
    args: ["--check", "scripts/check-matsuri-deployed.mjs"],
  },
];

for (const [index, stage] of stages.entries()) {
  console.log(`\n[${index + 1}/${stages.length}] ${stage.name}`);

  const result = spawnSync(stage.command, stage.args, {
    cwd: repositoryRoot,
    stdio: "inherit",
    env: process.env,
  });

  if (result.error) {
    throw new Error(`${stage.name} could not start: ${result.error.message}`);
  }

  if (result.status !== 0) {
    const termination = result.signal
      ? `signal ${result.signal}`
      : `exit code ${String(result.status)}`;
    throw new Error(`${stage.name} failed with ${termination}.`);
  }
}

console.log("\nRelease verification passed.");
