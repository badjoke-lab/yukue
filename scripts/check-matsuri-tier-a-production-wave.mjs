import fs from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const wave = JSON.parse(
  fs.readFileSync(new URL("../config/matsuri-tier-a-publication-wave-001.json", import.meta.url), "utf8"),
);
const topology = JSON.parse(
  fs.readFileSync(new URL("../config/yukue-deployment-topology.json", import.meta.url), "utf8"),
);

const matsuri = topology.sites?.find((site) => site.site_id === "matsuri");
if (!matsuri?.canonical_origin) {
  throw new Error("Matsuri canonical origin is missing from deployment topology");
}
if (wave.schema_version !== "matsuri.tier-a-publication-wave.v1") {
  throw new Error(`Unexpected publication-wave schema: ${String(wave.schema_version)}`);
}
if (!new Set(["release_ready", "published_verified"]).has(wave.status)) {
  throw new Error(`Production smoke requires a release-ready wave; got ${String(wave.status)}`);
}

const origin = matsuri.canonical_origin.replace(/\/$/u, "");
const selected = wave.selected_entities ?? [];
if (selected.length === 0) throw new Error("Publication wave has no selected entities");

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchText(pathname) {
  const response = await fetch(`${origin}${pathname}`, {
    redirect: "follow",
    headers: {
      "user-agent": "yukue-ncs06-production-smoke/1.0",
      "cache-control": "no-cache",
    },
  });
  const body = await response.text();
  return { response, body };
}

function verifyHtml(item, response, body) {
  if (!response.ok) throw new Error(`${item.expected_route} returned HTTP ${response.status}`);
  if (!(response.headers.get("content-type") ?? "").toLowerCase().includes("text/html")) {
    throw new Error(`${item.expected_route} did not return HTML`);
  }
  const lower = body.toLowerCase();
  for (const marker of ["<html", "<main", "<h1"]) {
    if (!lower.includes(marker)) throw new Error(`${item.expected_route} is missing ${marker}`);
  }
}

async function verifyOnce() {
  const entityResponse = await fetchText("/data/entities.json");
  if (!entityResponse.response.ok) {
    throw new Error(`/data/entities.json returned HTTP ${entityResponse.response.status}`);
  }
  const entities = JSON.parse(entityResponse.body);
  if (!Array.isArray(entities.records)) throw new Error("Public entity feed has no records array");
  if (entities.record_count !== wave.expected_repository_counts?.all_entities) {
    throw new Error(
      `Public entity count is ${String(entities.record_count)}; expected ${String(wave.expected_repository_counts?.all_entities)}`,
    );
  }

  const sitemapResponse = await fetchText("/sitemap.xml");
  if (!sitemapResponse.response.ok) {
    throw new Error(`/sitemap.xml returned HTTP ${sitemapResponse.response.status}`);
  }

  for (const item of selected) {
    const publicEntity = entities.records.find((record) => record.id === item.id);
    if (!publicEntity) throw new Error(`Production entity feed is missing ${item.id}`);
    if (publicEntity.coverage_tier !== "tier_a_index") {
      throw new Error(
        `${item.id} coverage_tier is ${String(publicEntity.coverage_tier)}; expected tier_a_index`,
      );
    }

    const page = await fetchText(item.expected_route);
    verifyHtml(item, page.response, page.body);

    const expectedLocation = `${origin}${item.expected_route}`;
    if (!sitemapResponse.body.includes(`<loc>${expectedLocation}</loc>`)) {
      throw new Error(`Canonical sitemap is missing ${expectedLocation}`);
    }
  }

  return {
    entity_count: entities.record_count,
    selected_count: selected.length,
    selected_ids: selected.map((item) => item.id),
  };
}

const maxAttempts = Number(process.env.MATSURI_PRODUCTION_SMOKE_ATTEMPTS ?? "12");
const retryMilliseconds = Number(process.env.MATSURI_PRODUCTION_SMOKE_RETRY_MS ?? "10000");
let lastError;

for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  try {
    const result = await verifyOnce();
    console.log(
      `Matsuri NCS-06 production wave verified at ${origin}: ${result.selected_count} selected Tier A records, ${result.entity_count} public entities.`,
    );
    console.log(`verified entities: ${result.selected_ids.join(", ")}`);
    process.exit(0);
  } catch (error) {
    lastError = error;
    console.log(
      `production smoke attempt ${attempt}/${maxAttempts} not ready: ${error instanceof Error ? error.message : String(error)}`,
    );
    if (attempt < maxAttempts) await wait(retryMilliseconds);
  }
}

throw new Error(
  `Matsuri NCS-06 production wave did not verify after ${maxAttempts} attempts: ${lastError instanceof Error ? lastError.message : String(lastError)}`,
);
