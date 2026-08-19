import fs from "node:fs";

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
const postPublicationTiers = new Set([
  "tier_a_index",
  "tier_b_verified",
  "tier_c_history_monitoring",
]);

let recordedVerification = null;
if (wave.status === "published_verified") {
  const relativeRecordPath = wave.production_verification?.record;
  if (typeof relativeRecordPath !== "string" || relativeRecordPath.length === 0) {
    throw new Error("published_verified wave is missing production_verification.record");
  }
  recordedVerification = JSON.parse(
    fs.readFileSync(new URL(`../${relativeRecordPath}`, import.meta.url), "utf8"),
  );
  if (recordedVerification.schema_version !== "matsuri.tier-a-production-verification.v1") {
    throw new Error("Unexpected production-verification schema");
  }
  if (
    recordedVerification.status !== "verified" ||
    recordedVerification.wave_id !== wave.wave_id ||
    recordedVerification.canonical_origin !== origin
  ) {
    throw new Error("Production-verification record does not match the publication wave");
  }
  if (
    recordedVerification.release_merge_commit !== wave.production_verification?.release_merge_commit ||
    recordedVerification.verified_at !== wave.production_verification?.verified_at ||
    recordedVerification.github_actions?.workflow_run_id !== wave.production_verification?.workflow_run_id ||
    recordedVerification.github_actions?.job_id !== wave.production_verification?.job_id
  ) {
    throw new Error("Publication-wave production_verification metadata does not match its record");
  }

  const recordedSelected = recordedVerification.selected_entities ?? [];
  const expectedSelected = selected.map((item) => ({ id: item.id, route: item.expected_route }));
  if (JSON.stringify(recordedSelected) !== JSON.stringify(expectedSelected)) {
    throw new Error("Production-verification selected entity set does not match the wave");
  }

  for (const flag of [
    "detail_html",
    "public_entity_json",
    "manifest_counts_match_feeds",
    "canonical_sitemap",
    "all_selected_entities_tier_a_index",
  ]) {
    if (recordedVerification.checks?.[flag] !== true) {
      throw new Error(`Production-verification record is missing successful check ${flag}`);
    }
  }
  if (
    recordedVerification.boundaries?.production_mutated_by_verifier !== false ||
    recordedVerification.boundaries?.future_sites_activated !== false ||
    recordedVerification.boundaries?.freshness_repaired_by_inference !== false
  ) {
    throw new Error("Production-verification boundaries are invalid");
  }
  if (
    recordedVerification.observed_counts?.entities !== wave.expected_repository_counts?.all_entities
  ) {
    throw new Error("Historic production entity count does not match the wave release checkpoint");
  }
  for (const field of ["entities", "events", "relations", "occurrences", "sitemap_entries"]) {
    if (!Number.isInteger(recordedVerification.observed_counts?.[field])) {
      throw new Error(`Historic production verification is missing integer count ${field}`);
    }
  }
}

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

async function fetchJson(pathname) {
  const result = await fetchText(pathname);
  if (!result.response.ok) {
    throw new Error(`${pathname} returned HTTP ${result.response.status}`);
  }
  const contentType = (result.response.headers.get("content-type") ?? "").toLowerCase();
  if (!contentType.includes("application/json")) {
    throw new Error(`${pathname} returned unexpected content-type ${contentType}`);
  }
  return JSON.parse(result.body);
}

function verifyFeed(name, feed) {
  if (!Array.isArray(feed.records)) throw new Error(`${name} feed has no records array`);
  if (!Number.isInteger(feed.record_count) || feed.record_count !== feed.records.length) {
    throw new Error(
      `${name} feed count mismatch: record_count=${String(feed.record_count)}, records=${feed.records.length}`,
    );
  }
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
  const [manifest, entities, events, relations, occurrences, sitemapResponse] = await Promise.all([
    fetchJson("/data/manifest.json"),
    fetchJson("/data/entities.json"),
    fetchJson("/data/events.json"),
    fetchJson("/data/relations.json"),
    fetchJson("/data/occurrences.json"),
    fetchText("/sitemap.xml"),
  ]);

  for (const [name, feed] of [
    ["Entity", entities],
    ["Event", events],
    ["Relation", relations],
    ["Occurrence", occurrences],
  ]) {
    verifyFeed(name, feed);
  }

  if (manifest.site_id !== "matsuri" || manifest.site_origin !== origin) {
    throw new Error(
      `Production manifest origin mismatch: site_id=${String(manifest.site_id)}, site_origin=${String(manifest.site_origin)}`,
    );
  }

  if (wave.status === "release_ready" && entities.record_count !== wave.expected_repository_counts?.all_entities) {
    throw new Error(
      `Release-ready public entity count is ${String(entities.record_count)}; expected ${String(wave.expected_repository_counts?.all_entities)}`,
    );
  }

  const measuredCounts = {
    entities: entities.record_count,
    events: events.record_count,
    relations: relations.record_count,
    occurrences: occurrences.record_count,
  };
  for (const [recordType, count] of Object.entries(measuredCounts)) {
    if (manifest.record_counts?.[recordType] !== count) {
      throw new Error(
        `Manifest ${recordType} count is ${String(manifest.record_counts?.[recordType])}; feed count is ${count}`,
      );
    }
  }

  if (!sitemapResponse.response.ok) {
    throw new Error(`/sitemap.xml returned HTTP ${sitemapResponse.response.status}`);
  }
  const sitemapLocations = [...sitemapResponse.body.matchAll(/<loc>(.*?)<\/loc>/gu)].map(
    (match) => match[1],
  );
  if (sitemapLocations.length === 0) throw new Error("Canonical sitemap has no <loc> entries");

  for (const item of selected) {
    const publicEntity = entities.records.find((record) => record.id === item.id);
    if (!publicEntity) throw new Error(`Production entity feed is missing ${item.id}`);
    if (wave.status === "release_ready") {
      if (publicEntity.coverage_tier !== "tier_a_index") {
        throw new Error(
          `${item.id} coverage_tier is ${String(publicEntity.coverage_tier)}; expected tier_a_index before publication verification`,
        );
      }
    } else if (!postPublicationTiers.has(publicEntity.coverage_tier)) {
      throw new Error(
        `${item.id} coverage_tier is ${String(publicEntity.coverage_tier)}; expected a public A/B/C tier after publication verification`,
      );
    }

    const page = await fetchText(item.expected_route);
    verifyHtml(item, page.response, page.body);

    const expectedLocation = `${origin}${item.expected_route}`;
    if (!sitemapLocations.includes(expectedLocation)) {
      throw new Error(`Canonical sitemap is missing ${expectedLocation}`);
    }
  }

  return {
    ...measuredCounts,
    sitemap_entries: sitemapLocations.length,
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
      `Matsuri NCS-06 production wave live surface verified at ${origin}: ${result.selected_count} selected records remain public.`,
    );
    console.log(`verified entities: ${result.selected_ids.join(", ")}`);
    console.log(
      `current production counts: entities=${result.entities}, events=${result.events}, relations=${result.relations}, occurrences=${result.occurrences}, sitemap_entries=${result.sitemap_entries}`,
    );
    if (recordedVerification) {
      console.log(
        `historic Tier A publication checkpoint preserved separately: entities=${recordedVerification.observed_counts.entities}, events=${recordedVerification.observed_counts.events}, relations=${recordedVerification.observed_counts.relations}, occurrences=${recordedVerification.observed_counts.occurrences}, sitemap_entries=${recordedVerification.observed_counts.sitemap_entries}.`,
      );
    }
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
