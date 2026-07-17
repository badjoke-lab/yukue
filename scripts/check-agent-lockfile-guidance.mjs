import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const agentsPath = path.join(repositoryRoot, "AGENTS.md");
const violations = [];

if (!fs.existsSync(agentsPath)) {
  violations.push("AGENTS.md is required at the repository root");
} else {
  const agents = fs.readFileSync(agentsPath, "utf8");
  const frozenInstallCommand = /^pnpm install --frozen-lockfile\s*$/mu;
  const mutableInstallCommand = /^pnpm install --no-frozen-lockfile\s*$/mu;

  if (!frozenInstallCommand.test(agents)) {
    violations.push("AGENTS.md baseline commands must include 'pnpm install --frozen-lockfile'");
  }

  if (mutableInstallCommand.test(agents)) {
    violations.push("AGENTS.md must not instruct agents to run 'pnpm install --no-frozen-lockfile'");
  }

  if (!agents.includes("The committed `pnpm-lock.yaml` is required.")) {
    violations.push("AGENTS.md must state that the committed pnpm-lock.yaml is required");
  }

  if (!agents.includes("update and review the lockfile in the same bounded dependency change")) {
    violations.push("AGENTS.md must preserve the bounded lockfile-update instruction");
  }
}

if (violations.length > 0) {
  throw new Error(
    `Agent lockfile guidance guard failed:\n${violations.map((violation) => `- ${violation}`).join("\n")}`,
  );
}

console.log("Agent lockfile guidance guard passed: frozen install required and mutable-install bypass prohibited.");
