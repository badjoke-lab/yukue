import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

export const repositoryRoot = fileURLToPath(new URL("../../", import.meta.url));
export const matsuriDistRoot = path.join(repositoryRoot, "apps", "matsuri", "dist");
export const matsuriScreenshotRoot = path.join(
  repositoryRoot,
  "artifacts",
  "matsuri-screenshots",
);

export function argValue(name, fallback) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? fallback : process.argv[index + 1];
}

export function selectedDeviceNames(value) {
  if (value === "all") return ["desktop", "mobile"];
  if (value === "desktop" || value === "mobile") return [value];
  throw new Error(`Unsupported Matsuri screenshot device selection: ${String(value)}`);
}

export function toPosix(value) {
  return value.split(path.sep).join("/");
}

export function safeScreenshotFilename(route) {
  if (route === "/") return "home.png";

  const stem = route
    .replace(/^\/+|\/+$/gu, "")
    .split("/")
    .map((segment) =>
      segment
        .normalize("NFKD")
        .replace(/[^a-zA-Z0-9_-]+/gu, "-")
        .replace(/^-+|-+$/gu, "")
        .toLowerCase(),
    )
    .filter(Boolean)
    .join("__");

  return `${stem || "page"}.png`;
}

export async function discoverGeneratedPublicRoutes(root = matsuriDistRoot) {
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
    throw new Error(
      `Matsuri build output is missing: ${path.relative(repositoryRoot, root)}. Run pnpm build:matsuri:pages first.`,
    );
  }

  const routes = [];

  function walk(directory, relativeDirectory = "") {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const relativePath = path.join(relativeDirectory, entry.name);
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        if (entry.name === "pagefind" || entry.name === "_astro") continue;
        walk(absolutePath, relativePath);
        continue;
      }

      if (!entry.isFile() || entry.name !== "index.html") continue;

      if (relativePath === "index.html") {
        routes.push("/");
      } else {
        routes.push(`/${toPosix(relativeDirectory).replace(/^\/+|\/+$/gu, "")}/`);
      }
    }
  }

  walk(root);
  return [...new Set(routes)].sort((a, b) => a.localeCompare(b));
}

export function compareRouteInventories(actual, expected, label) {
  const actualSorted = [...new Set(actual)].sort((a, b) => a.localeCompare(b));
  const expectedSorted = [...new Set(expected)].sort((a, b) => a.localeCompare(b));
  const missing = expectedSorted.filter((route) => !actualSorted.includes(route));
  const unexpected = actualSorted.filter((route) => !expectedSorted.includes(route));

  if (missing.length > 0 || unexpected.length > 0) {
    throw new Error(
      `${label} route inventory mismatch.\nMissing: ${JSON.stringify(missing)}\nUnexpected: ${JSON.stringify(unexpected)}`,
    );
  }

  return true;
}

export function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

export function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd ?? repositoryRoot,
      stdio: options.stdio ?? "inherit",
      env: options.env ?? process.env,
    });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      const termination = signal ? `signal ${signal}` : `exit code ${String(code)}`;
      reject(new Error(`${command} ${args.join(" ")} failed with ${termination}.`));
    });
  });
}

export async function zipDirectory(sourceDirectory, outputFile) {
  if (!fs.existsSync(sourceDirectory) || !fs.statSync(sourceDirectory).isDirectory()) {
    throw new Error(`Cannot archive missing screenshot directory: ${sourceDirectory}`);
  }

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.rmSync(outputFile, { force: true });

  await runCommand("zip", ["-qr", path.resolve(outputFile), "."], {
    cwd: sourceDirectory,
  });
}
