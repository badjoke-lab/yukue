import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const appRoot = fileURLToPath(new URL("../", import.meta.url));
const repositoryRoot = path.resolve(appRoot, "../..");
const inventoryDir = path.join(repositoryRoot, ".artifacts", "jiin-future-site-seeds");
const queueDir = path.join(repositoryRoot, ".artifacts", "jiin-review-queue");

const result = spawnSync(process.execPath, ["scripts/build-yukue-future-site-seed-inventory.mjs"], {
  cwd: repositoryRoot,
  env: { ...process.env, YUKUE_SEED_ARTIFACT_DIR: inventoryDir },
  encoding: "utf8",
  stdio: "inherit",
});
if (result.error) throw result.error;
if (result.status !== 0) throw new Error(`Future-site seed inventory failed with exit code ${String(result.status)}.`);

const inventory = JSON.parse(fs.readFileSync(path.join(inventoryDir, "inventory.json"), "utf8"));
const jiinSite = inventory.sites.find((site) => site.site_id === "jiin");
if (!jiinSite) throw new Error("Future-site inventory has no Jiin site section.");

const candidates = jiinSite.seeds.map((seed) => {
  const blockers = [
    "jiin_authoritative_identity_source_required",
    "jiin_entity_boundary_and_dedupe_review_required",
  ];
  if (!seed.place_ids?.length) blockers.push("jiin_geography_required");
  if (!seed.official_urls?.length) blockers.push("temple_official_url_not_present_in_seed");

  return {
    candidate_id: `jiin-seed:${seed.entity_id}`,
    source_site_id: "matsuri",
    source_entity_id: seed.entity_id,
    name_ja: seed.name_ja,
    prefectures: seed.prefectures ?? [],
    municipalities: seed.municipalities ?? [],
    place_ids: seed.place_ids ?? [],
    official_urls_from_seed: seed.official_urls ?? [],
    matsuri_identity_evidence_ids: seed.identity_evidence_ids ?? [],
    matsuri_relation_evidence_ids: seed.relation_evidence_ids ?? [],
    relation_contexts: seed.relation_contexts ?? [],
    review_status: "pending_jiin_specialist_review",
    canonical_promotion_authorized: false,
    blockers,
  };
});

const queue = {
  format_version: 1,
  site_id: "jiin",
  generated_at: new Date().toISOString(),
  source: "matsuri_relation_backed_future_site_seed_inventory",
  status: "review_queue_only",
  candidate_count: candidates.length,
  promotion_rule: "No candidate may enter apps/jiin/data/canonical.json until Jiin-specific authoritative identity evidence, geography, entity-boundary review, and deterministic dedupe pass.",
  candidates,
};

fs.rmSync(queueDir, { recursive: true, force: true });
fs.mkdirSync(queueDir, { recursive: true });
fs.writeFileSync(path.join(queueDir, "queue.json"), `${JSON.stringify(queue, null, 2)}\n`, "utf8");

const summary = [
  "# Jiin Matsuri Seed Review Queue",
  "",
  `- Generated at: \`${queue.generated_at}\``,
  `- Candidate count: ${queue.candidate_count}`,
  "- Canonical promotion authorized: false for every generated candidate",
  "",
  "Matsuri/Jinja/cemetery/directory relations are discovery seeds only. Jiin-specific authoritative identity evidence and entity-boundary/dedupe review are mandatory before Tier A promotion.",
  "",
].join("\n");
fs.writeFileSync(path.join(queueDir, "summary.md"), summary, "utf8");

console.log(`Jiin review queue built: ${queue.candidate_count} candidate(s); canonical promotion remains blocked.`);
