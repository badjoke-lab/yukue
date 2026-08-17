import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const inventoryPath = path.join(repositoryRoot, "config", "matsuri-national-source-inventory.json");
const docsPath = path.join(repositoryRoot, "docs", "matsuri-national-source-inventory.md");

function fail(message) {
  throw new Error(`Matsuri national source inventory check failed: ${message}`);
}

function require(condition, message) {
  if (!condition) fail(message);
}

const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
const docs = fs.readFileSync(docsPath, "utf8");

require(inventory.schema_version === "matsuri.national-source-inventory.v1", "unexpected schema version");
require(inventory.phase === "NCS-03", "phase must be NCS-03");
require(inventory.status === "accepted_inventory", "inventory status must be accepted_inventory");
require(inventory.governing_spec === "docs/nationwide-corpus-scaling.md", "governing spec mismatch");

require(inventory.scope?.site === "matsuri", "site scope must remain Matsuri");
require(inventory.scope?.prefecture_count_required === 47, "prefecture control count must remain 47");
require(inventory.scope?.future_sites_activated === false, "future sites must remain inactive");
require(inventory.scope?.candidate_importer_activated === false, "NCS-03 must not activate the NCS-04 importer");
require(inventory.scope?.bulk_public_release_authorized === false, "NCS-03 must not authorize an NCS-06 bulk public wave");

const prefectures = inventory.prefectures ?? [];
require(prefectures.length === 47, `expected 47 prefectures, found ${prefectures.length}`);
const prefectureCodes = prefectures.map((item) => item.code);
const expectedPrefectureCodes = Array.from({ length: 47 }, (_, index) => String(index + 1).padStart(2, "0"));
require(JSON.stringify(prefectureCodes) === JSON.stringify(expectedPrefectureCodes), "prefecture codes must be exactly 01 through 47 in order");
require(new Set(prefectures.map((item) => item.name_ja)).size === 47, "prefecture names must be unique");

const families = inventory.source_families ?? [];
const byId = new Map(families.map((family) => [family.id, family]));
require(byId.size === families.length, "source family ids must be unique");

const requiredFamilies = [
  "national_cultural_database",
  "cultural_heritage_online",
  "japan_search",
  "prefectural_cultural_property_registry",
  "municipal_cultural_property_registry",
  "municipality_official",
  "official_tourism_body",
  "official_organization",
  "shrine_or_temple_official",
  "academic_or_institutional",
  "credible_news",
];
for (const id of requiredFamilies) {
  require(byId.has(id), `missing required source family ${id}`);
}

const validSuitability = new Set([
  "direct",
  "conditional_direct",
  "discovery_then_resolve",
  "discovery_only",
  "supporting_only",
]);
for (const family of families) {
  require(typeof family.label === "string" && family.label.length > 0, `${family.id}: label required`);
  require(typeof family.publisher_role === "string" && family.publisher_role.length > 0, `${family.id}: publisher_role required`);
  require(validSuitability.has(family.tier_a_identity_suitability), `${family.id}: invalid Tier A suitability`);
  require(typeof family.tier_b_claim_suitability === "string" && family.tier_b_claim_suitability.length > 0, `${family.id}: Tier B suitability required`);
  require(family.enumeration && typeof family.enumeration === "object", `${family.id}: enumeration contract required`);
  require(Array.isArray(family.enumeration.methods) && family.enumeration.methods.length > 0, `${family.id}: enumeration methods required`);
  require(family.rights && typeof family.rights === "object", `${family.id}: rights contract required`);
  require(typeof family.rights.text_reuse === "string" && family.rights.text_reuse.length > 0, `${family.id}: text reuse rule required`);
  require(typeof family.rights.image_reuse === "string" && family.rights.image_reuse.length > 0, `${family.id}: image reuse rule required`);
  require(typeof family.rights.bulk_copy_policy === "string" && family.rights.bulk_copy_policy.length > 0, `${family.id}: bulk copy policy required`);
  require(Array.isArray(family.known_limits) && family.known_limits.length > 0, `${family.id}: known limits required`);
}

const national = byId.get("national_cultural_database");
require(national.tier_a_identity_suitability === "direct", "national cultural database must remain direct Tier A identity source");
require(national.requires_underlying_source_resolution === false, "national cultural database must not require aggregator resolution");
require(national.enumeration?.current_csv_limit === 2000, "current national CSV ceiling must remain recorded as 2,000 until reverified");
require(national.enumeration?.must_verify_partition_completeness === true, "national CSV partition completeness must be verified");
require(national.rights?.text_reuse === "permitted_with_attribution", "national database text reuse rule must preserve attribution requirement");
require(national.rights?.image_reuse === "permission_required_per_item_or_rightsholder", "national database images must not be assumed reusable");

for (const id of ["cultural_heritage_online", "japan_search"]) {
  const family = byId.get(id);
  require(family.requires_underlying_source_resolution === true, `${id}: underlying source resolution must remain mandatory`);
  require(["discovery_then_resolve", "discovery_only"].includes(family.tier_a_identity_suitability), `${id}: aggregator must remain discovery-only/resolve-first`);
}
require(byId.get("cultural_heritage_online").rights?.text_reuse === "not_assumed", "Cultural Heritage Online must not be treated as bulk-reusable text");

const localScale = (inventory.scale_references ?? []).find((item) => item.id === "local-designated-intangible-folk-2025-05-01");
require(localScale, "local-designation scale reference missing");
require(localScale.prefectural_count === 1732, "prefectural local-designation reference drifted");
require(localScale.municipal_count === 6523, "municipal local-designation reference drifted");
require(localScale.total_count === 8255, "local-designation total reference drifted");
require(localScale.prefectural_count + localScale.municipal_count === localScale.total_count, "local-designation scale reference arithmetic mismatch");
require(/not a count of all Japanese festivals/i.test(localScale.interpretation), "scale reference must explicitly reject festival-total interpretation");

const nationalScale = (inventory.scale_references ?? []).find((item) => item.id === "national-important-intangible-folk-2026-08-01");
require(nationalScale?.total_count === 342, "2026-08-01 national Important Intangible Folk Cultural Property count must be recorded as 342");

const ncs04 = inventory.ncs04_contract_inputs ?? {};
const groups = [
  ["tier_a_direct_families", ["national_cultural_database", "prefectural_cultural_property_registry", "municipal_cultural_property_registry", "municipality_official", "official_organization"]],
  ["tier_a_conditional_families", ["official_tourism_body", "shrine_or_temple_official"]],
  ["discovery_only_families", ["cultural_heritage_online", "japan_search"]],
  ["supporting_only_families", ["academic_or_institutional", "credible_news"]],
];
for (const [key, requiredIds] of groups) {
  require(Array.isArray(ncs04[key]), `${key} must be an array`);
  for (const id of requiredIds) require(ncs04[key].includes(id), `${key} missing ${id}`);
}
require(Array.isArray(ncs04.requirements) && ncs04.requirements.length >= 7, "NCS-04 handoff requirements are incomplete");
require(ncs04.requirements.some((line) => /do not infer Current State/i.test(line)), "NCS-04 handoff must preserve no-inference Current State boundary");
require(ncs04.requirements.some((line) => /actual Tier A publication time/i.test(line)), "NCS-04 handoff must require authentic Tier A publication time");

const requiredDocPhrases = [
  "public Tier A records",
  "NCS-04 candidate + Tier A importer",
  "2,000 records or fewer",
  "8,255",
  "count of Japanese festivals",
  "Cultural Heritage Online",
  "Japan Search",
  "discovery-only",
  "no importer is activated",
  "no bulk public release is authorized",
];
for (const phrase of requiredDocPhrases) {
  require(docs.includes(phrase), `documentation missing required phrase: ${phrase}`);
}

console.log(
  `Matsuri NCS-03 source inventory passed: ${families.length} source families, ${prefectures.length} prefectures, national CSV ceiling ${national.enumeration.current_csv_limit}, local intangible-folk scale reference ${localScale.total_count}.`,
);
