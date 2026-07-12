import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const configPath = path.join(repositoryRoot, "wrangler.jsonc");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(fs.existsSync(configPath), "wrangler.jsonc is missing.");

const raw = fs.readFileSync(configPath, "utf8");
const config = JSON.parse(raw);

assert(config.name === "matsuri-yukue", "Wrangler name must be matsuri-yukue.");
assert(typeof config.compatibility_date === "string", "compatibility_date is required.");
assert(!Object.hasOwn(config, "main"), "Static Matsuri deployment must not define Worker main code.");
assert(
  config.assets?.directory === "./apps/matsuri/dist",
  "Wrangler assets.directory must be ./apps/matsuri/dist.",
);
assert(
  !Object.hasOwn(config.assets ?? {}, "binding"),
  "Static-only Matsuri deployment does not require an assets binding.",
);

console.log("Matsuri Workers Static Assets configuration is valid.");
