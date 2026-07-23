import { loadMatsuriDataset } from "../apps/matsuri/scripts/load-matsuri-dataset.mjs";

const isoDayPattern = /^(\d{4})-(\d{2})-(\d{2})$/u;

function parseIsoDay(value) {
  if (typeof value !== "string") return null;
  const match = value.match(isoDayPattern);
  if (!match) return null;

  const [, yearText, monthText, dayText] = match;
  const date = new Date(Date.UTC(Number(yearText), Number(monthText) - 1, Number(dayText)));
  return date.toISOString().slice(0, 10) === value ? date : null;
}

function entityUpdatedDay(entity) {
  if (typeof entity.updated_at !== "string") return null;
  return parseIsoDay(entity.updated_at.slice(0, 10));
}

export function validateMatsuriExternalLinkMaintenance(entities, options = {}) {
  const asOfText = options.asOf ?? new Date().toISOString().slice(0, 10);
  const asOf = parseIsoDay(asOfText);
  if (!asOf) {
    throw new Error(
      `External-link maintenance as-of date must use a valid YYYY-MM-DD value: ${String(asOfText)}`,
    );
  }

  if (!Array.isArray(entities) || entities.length === 0) {
    throw new Error("External-link maintenance contract requires a non-empty Entity array.");
  }

  const violations = [];
  let externalLinkCount = 0;
  let primaryLinkCount = 0;

  for (const entity of entities) {
    const entityId = typeof entity?.id === "string" ? entity.id : "<missing-entity-id>";
    const updatedAt = entityUpdatedDay(entity ?? {});
    if (!updatedAt) {
      violations.push(`${entityId}: updated_at must contain a valid ISO calendar day`);
    }

    const links = entity?.external_links;
    if (!Array.isArray(links) || links.length === 0) {
      violations.push(`${entityId}: at least one external link is required`);
      continue;
    }

    const primaryLinks = links.filter((link) => link?.is_primary === true);
    if (primaryLinks.length !== 1) {
      violations.push(
        `${entityId}: exactly one primary external link is required; found ${primaryLinks.length}`,
      );
    }
    primaryLinkCount += primaryLinks.length;

    const seenUrls = new Set();
    for (const [index, link] of links.entries()) {
      externalLinkCount += 1;
      const location = `${entityId}.external_links[${index}]`;
      if (link === null || typeof link !== "object" || Array.isArray(link)) {
        violations.push(`${location}: external link must be an object`);
        continue;
      }

      if (typeof link.url !== "string" || link.url.trim().length === 0) {
        violations.push(`${location}: url is required`);
      } else {
        try {
          const parsedUrl = new URL(link.url);
          if (parsedUrl.protocol !== "https:") {
            violations.push(`${location}: url must use https`);
          }
        } catch {
          violations.push(`${location}: url must be absolute and valid`);
        }

        if (seenUrls.has(link.url)) {
          violations.push(`${location}: duplicate external-link url ${link.url}`);
        }
        seenUrls.add(link.url);
      }

      const checkedAt = parseIsoDay(link.last_checked_at);
      if (!checkedAt) {
        violations.push(`${location}: last_checked_at must use a valid YYYY-MM-DD calendar day`);
        continue;
      }

      if (checkedAt > asOf) {
        violations.push(
          `${location}: last_checked_at ${link.last_checked_at} is after as-of ${asOfText}`,
        );
      }
      if (updatedAt && checkedAt > updatedAt) {
        violations.push(
          `${location}: last_checked_at ${link.last_checked_at} is after Entity updated_at ${entity.updated_at}`,
        );
      }
    }
  }

  if (violations.length > 0) {
    throw new Error(
      `Matsuri external-link maintenance contract failed:\n${violations
        .map((violation) => `- ${violation}`)
        .join("\n")}`,
    );
  }

  return {
    entityCount: entities.length,
    externalLinkCount,
    primaryLinkCount,
    asOf: asOfText,
  };
}

function assertRejected(entities, label, options) {
  try {
    validateMatsuriExternalLinkMaintenance(entities, options);
  } catch {
    return;
  }
  throw new Error(`External-link maintenance contract accepted invalid fixture: ${label}`);
}

const dataset = loadMatsuriDataset();
const result = validateMatsuriExternalLinkMaintenance(dataset.entities);
const fixture = dataset.entities.find((entity) => entity.external_links?.length > 0);
if (!fixture) {
  throw new Error("No Entity with an external link is available for contract fixtures.");
}

const makeFixture = () => structuredClone(fixture);

{
  const candidate = makeFixture();
  candidate.external_links = [];
  assertRejected([candidate], "Entity without external links");
}
{
  const candidate = makeFixture();
  candidate.external_links[0].is_primary = false;
  assertRejected([candidate], "Entity without a primary external link");
}
{
  const candidate = makeFixture();
  candidate.external_links.push({
    ...candidate.external_links[0],
    url: `${candidate.external_links[0].url}duplicate`,
  });
  assertRejected([candidate], "Entity with multiple primary external links");
}
{
  const candidate = makeFixture();
  delete candidate.external_links[0].last_checked_at;
  assertRejected([candidate], "external link without last_checked_at");
}
{
  const candidate = makeFixture();
  candidate.external_links[0].last_checked_at = "2026-02-30";
  assertRejected([candidate], "external link with an invalid calendar day");
}
{
  const candidate = makeFixture();
  candidate.external_links[0].last_checked_at = "9999-12-31";
  candidate.updated_at = "9999-12-31T00:00:00Z";
  assertRejected([candidate], "external link checked after the contract as-of date", {
    asOf: "2026-07-23",
  });
}
{
  const candidate = makeFixture();
  candidate.updated_at = "2026-07-01T00:00:00Z";
  candidate.external_links[0].last_checked_at = "2026-07-02";
  assertRejected([candidate], "external link checked after Entity updated_at", {
    asOf: "2026-07-23",
  });
}

console.log(
  `Matsuri external-link maintenance contract passed: ${result.entityCount} Entities, ${result.externalLinkCount} external links, ${result.primaryLinkCount} primary links, and seven invalid fixtures rejected.`,
);
