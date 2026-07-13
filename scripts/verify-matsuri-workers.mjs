import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const topology = JSON.parse(
  fs.readFileSync(
    path.join(repositoryRoot, "config", "yukue-deployment-topology.json"),
    "utf8",
  ),
);
const matsuri = topology.sites?.find((site) => site.site_id === "matsuri");

if (!matsuri) throw new Error("Deployment topology is missing the Matsuri site.");
if (matsuri.canonical_origin !== "https://matsuri-yukue.badjoke-lab.com") {
  throw new Error("Unexpected Matsuri canonical origin.");
}

const command = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

function run(args, { canonical = false } = {}) {
  const result = spawnSync(command, args, {
    cwd: repositoryRoot,
    env: canonical
      ? {
          ...process.env,
          MATSURI_PUBLIC_ORIGIN: matsuri.canonical_origin,
        }
      : process.env,
    encoding: "utf8",
    stdio: "inherit",
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      `Command failed with exit code ${String(result.status)}: pnpm ${args.join(" ")}`,
    );
  }
}

run(["check:yukue:deployment-topology"]);
run(["check:matsuri:workers-config"]);
run(["build:matsuri:workers"]);
run(["check:matsuri:pages"]);
run(["check:matsuri:canonical-metadata"], { canonical: true });
run(["check:matsuri:consistency"], { canonical: true });

console.log(
  `Matsuri Workers artifact verified with canonical origin ${matsuri.canonical_origin}, absolute self-canonical links, and indexable robots metadata.`,
);
