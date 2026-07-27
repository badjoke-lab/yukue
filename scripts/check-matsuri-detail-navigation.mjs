import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = path.join(repositoryRoot, "apps", "matsuri", "dist");
const entitiesFile = path.join(outputRoot, "data", "entities.json");
const relationsFile = path.join(outputRoot, "data", "relations.json");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(outputRoot, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(outputRoot, relativePath));
}

function routeKind(entityType) {
  switch (entityType) {
    case "festival":
    case "tradition_unit":
      return "festivals";
    case "folk_performance":
      return "performances";
    case "organization":
      return "organizations";
    case "shrine":
      return "shrines";
    case "temple":
      return "temples";
    default:
      return null;
  }
}

function entityRoute(entity) {
  const kind = routeKind(entity.entity_type);
  if (!kind || !entity.slug) return null;
  if (["shrine", "temple"].includes(entity.entity_type)) {
    return `/references/${kind}/${entity.slug}/`;
  }
  return `/${kind}/${entity.slug}/`;
}

function entityJsonRoute(entity) {
  const kind = routeKind(entity.entity_type);
  if (!kind || !entity.slug) return null;
  return `/data/records/${kind}/${entity.slug}.json`;
}

function routeToFile(route) {
  const relative = route.replace(/^\//u, "");
  if (route.endsWith("/")) return `${relative}index.html`;
  return relative;
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function visibleText(html) {
  return decodeHtml(
    html
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/giu, " ")
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/giu, " ")
      .replace(/<[^>]+>/gu, " ")
      .replace(/\s+/gu, " ")
      .trim(),
  );
}

function hrefs(html) {
  return [...html.matchAll(/\bhref\s*=\s*(["'])(.*?)\1/giu)].map((match) =>
    decodeHtml(match[2]),
  );
}

assert(exists("data/entities.json"), "Missing generated Entity data");
assert(exists("data/relations.json"), "Missing generated Relation data");

const entityEnvelope = JSON.parse(fs.readFileSync(entitiesFile, "utf8"));
const relationEnvelope = JSON.parse(fs.readFileSync(relationsFile, "utf8"));
const entities = entityEnvelope.records ?? [];
const relations = (relationEnvelope.records ?? []).filter(
  (relation) => relation.review_status === "approved",
);
const entitiesById = new Map(entities.map((entity) => [entity.id, entity]));
const detailEntities = entities.filter((entity) => routeKind(entity.entity_type));
const primaryEntities = detailEntities.filter((entity) =>
  ["festival", "tradition_unit", "folk_performance", "organization"].includes(
    entity.entity_type,
  ),
);
const seedEntities = detailEntities.filter((entity) =>
  ["shrine", "temple"].includes(entity.entity_type),
);

assert(primaryEntities.length > 1, "Detail navigation regressed to a one-record implementation");

const errors = [];
const generatedDetailRoutes = new Set();
for (const entity of detailEntities) {
  const route = entityRoute(entity);
  const jsonRoute = entityJsonRoute(entity);
  if (!route || !jsonRoute) {
    errors.push(`Entity ${entity.id} has no stable public route`);
    continue;
  }

  generatedDetailRoutes.add(route);
  const htmlFile = routeToFile(route);
  if (!exists(htmlFile)) {
    errors.push(`Missing detail HTML for ${entity.id}: ${route}`);
    continue;
  }
  if (!exists(routeToFile(jsonRoute))) {
    errors.push(`Missing individual JSON for ${entity.id}: ${jsonRoute}`);
  }

  const html = read(htmlFile);
  const text = visibleText(html);
  if (!html.includes("data-detail-page")) {
    errors.push(`Detail page marker missing for ${entity.id}`);
  }
  if (!html.includes('id="machine-data"')) {
    errors.push(`Machine-readable section missing for ${entity.id}`);
  }
  if (!hrefs(html).includes(jsonRoute)) {
    errors.push(`Detail page does not link its own JSON for ${entity.id}`);
  }
  if ((html.match(/<h1\b/giu) ?? []).length !== 1) {
    errors.push(`Detail page must contain one h1 for ${entity.id}`);
  }

  const expectedRelations = relations.filter(
    (relation) =>
      relation.source_entity_id === entity.id || relation.target_entity_id === entity.id,
  ).length;
  const renderedRelations = (html.match(/data-relation-row/gu) ?? []).length;
  const relationTargets = (html.match(/data-relation-target/gu) ?? []).length;
  if (renderedRelations !== expectedRelations) {
    errors.push(
      `Relation count mismatch for ${entity.id}: expected ${expectedRelations}, rendered ${renderedRelations}`,
    );
  }
  if (relationTargets !== renderedRelations) {
    errors.push(
      `Unlinked Relation target for ${entity.id}: rows ${renderedRelations}, targets ${relationTargets}`,
    );
  }

  for (const href of hrefs(html)) {
    if (href.startsWith("/places/") && href.endsWith("/")) {
      if (!exists(routeToFile(href))) errors.push(`Broken Place detail link: ${route} -> ${href}`);
    }
    if (href.startsWith("/data/records/") || href.startsWith("/data/places/")) {
      if (!exists(routeToFile(href))) errors.push(`Broken individual JSON link: ${route} -> ${href}`);
    }
  }

  if (seedEntities.some((seed) => seed.id === entity.id)) {
    if (!html.includes('id="reference-boundary"')) {
      errors.push(`Seed reference boundary missing for ${entity.id}`);
    }
    if (/<dt[^>]*class="yk-overview__label"[^>]*>\s*現在状態\s*<\/dt>/u.test(html)) {
      errors.push(`Shrine or Temple Current State was inferred for ${entity.id}`);
    }
  }

  for (const rawCode of [
    "entity_type",
    "record_lifecycle",
    "review_status",
    "state_snapshot",
    "change_event",
    "occurrence",
    "relation",
  ]) {
    if (new RegExp(`(?:^|\\s)${rawCode}(?:$|\\s)`, "u").test(text)) {
      errors.push(`Raw internal code visible on ${route}: ${rawCode}`);
    }
  }
}

const browseContracts = [
  ["festivals/index.html", primaryEntities.filter((entity) => ["festival", "tradition_unit"].includes(entity.entity_type))],
  ["performances/index.html", primaryEntities.filter((entity) => entity.entity_type === "folk_performance")],
  ["organizations/index.html", primaryEntities.filter((entity) => entity.entity_type === "organization")],
];

for (const [browseFile, expectedEntities] of browseContracts) {
  const html = read(browseFile);
  for (const entity of expectedEntities) {
    const route = entityRoute(entity);
    const rowPattern = new RegExp(
      `<article[^>]*data-entity-id=["']${entity.id}["'][\\s\\S]*?<\\/article>`,
      "u",
    );
    const row = html.match(rowPattern)?.[0];
    if (!row) {
      errors.push(`Browse row missing for ${entity.id} in ${browseFile}`);
      continue;
    }
    if (!route || !hrefs(row).includes(route)) {
      errors.push(`Browse title is not linked to real detail route for ${entity.id}`);
    }
  }
}

for (const relation of relations) {
  const source = entitiesById.get(relation.source_entity_id);
  const target = entitiesById.get(relation.target_entity_id);
  if (!source || !target) {
    errors.push(`Approved Relation ${relation.id} references a missing Entity`);
    continue;
  }
  const sourceRoute = entityRoute(source);
  const targetRoute = entityRoute(target);
  if (sourceRoute && targetRoute) {
    const sourceHtml = read(routeToFile(sourceRoute));
    const targetHtml = read(routeToFile(targetRoute));
    if (!hrefs(sourceHtml).includes(targetRoute)) {
      errors.push(`Relation ${relation.id} is not navigable source -> target`);
    }
    if (!hrefs(targetHtml).includes(sourceRoute)) {
      errors.push(`Relation ${relation.id} is not navigable target -> source`);
    }
  }
}

const placeRoutes = new Set();
for (const route of generatedDetailRoutes) {
  const html = read(routeToFile(route));
  for (const href of hrefs(html)) {
    if (href.startsWith("/places/") && href.endsWith("/")) placeRoutes.add(href);
  }
}
for (const placeRoute of placeRoutes) {
  const html = read(routeToFile(placeRoute));
  if (!html.includes("data-place-detail-page")) {
    errors.push(`Place detail marker missing: ${placeRoute}`);
  }
  const relatedTargets = hrefs(html).filter((href) => generatedDetailRoutes.has(href));
  if (relatedTargets.length === 0) {
    errors.push(`Place detail has no reverse record link: ${placeRoute}`);
  }
  const placeJsonHref = hrefs(html).find((href) => href.startsWith("/data/places/"));
  if (!placeJsonHref || !exists(routeToFile(placeJsonHref))) {
    errors.push(`Place detail has no working individual JSON: ${placeRoute}`);
  }
}

if (errors.length > 0) {
  throw new Error(`Matsuri Detail C navigation failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
}

console.log(
  `Matsuri Detail C navigation verified: ${primaryEntities.length} primary Entity details, ${seedEntities.length} Shrine/Temple seed references, ${placeRoutes.size} Place details, ${relations.length} approved Relations, and individual JSON for every generated record.`,
);
