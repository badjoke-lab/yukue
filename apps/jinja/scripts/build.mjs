import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = fileURLToPath(new URL("../", import.meta.url));
const source = path.join(appRoot, "src", "index.html");
const dist = path.join(appRoot, "dist");

if (!fs.existsSync(source)) throw new Error("Missing Jinja preview source");
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.copyFileSync(source, path.join(dist, "index.html"));
console.log("Built Jinja implementation preview (non-public).");
