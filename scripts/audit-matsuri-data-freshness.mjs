import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const dataRoot = path.join(repositoryRoot, "apps", "matsuri", "dist", "data");

function readOption(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function parseIsoDay(value, boundary) {
  if (typeof value !== "string" || !/^\d{4}(?:-\d{2})?(?:-\d{2})?$/u.test(value)) {
    throw new Error(`Unsupported temporal value: ${String(value)}`);
  }

  const [yearText, monthText, dayText] = value.split("-");
  const year = Number(yearText);

  if (dayText) {
    return new Date(Date.UTC(year, Number(monthText) - 1, Number(dayText)));
  }

  if (monthText) {
    const month = Number(monthText);
    return boundary === "end"
      ? new Date(Date.UTC(year, month, 0))
      : new Date(Date.UTC(year, month - 1, 1));
  }

  return boundary === "end"
    ? new Date(Date.UTC(year, 11, 31))
    : new Date(Date.UTC(year, 0, 1));
}

function formatDay(date) {
  return date.toISOString().slice(0, 10);
}

function daysBetween(earlier, later) {
  return Math.floor((later.getTime() - earlier.getTime()) / 86_400_000);
}

function readFeed(name) {
  const filePath = path.join(dataRoot, name);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing generated public feed: ${path.relative(repositoryRoot, filePath)}`);
  }
  const feed = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!Array.isArray(feed.records)) {
    throw new Error(`Generated feed has no records array: ${name}`);
  }
  return feed;
}

const asOfText = readOption("--as-of") ?? new Date().toISOString().slice(0, 10);
if (!/^\d{4}-\d{2}-\d{2}$/u.test(asOfText)) {
  throw new Error("--as-of must use YYYY-MM-DD.");
}
const asOf = parseIsoDay(asOfText, "start");
const stateStaleDays = Number(readOption("--state-stale-days") ?? "180");
const linkStaleDays = Number(readOption("--link-stale-days") ?? "180");
const jsonOnly = process.argv.includes("--json");

if (!Number.isInteger(stateStaleDays) || stateStaleDays < 1) {
  throw new Error("--state-stale-days must be a positive integer.");
}
if (!Number.isInteger(linkStaleDays) || linkStaleDays < 1) {
  throw new Error("--link-stale-days must be a positive integer.");
}

const occurrenceFeed = readFeed("occurrences.json");
const entityFeed = readFeed("entities.json");
const entities = new Map(entityFeed.records.map((record) => [record.id, record]));

function entityName(entityId) {
  const entity = entities.get(entityId);
  const preferred = entity?.names?.find(
    (name) => name.lang === "ja" && name.kind === "canonical" && name.is_preferred,
  );
  return preferred?.value ?? entityId;
}

const unresolvedOutcomes = new Set(["scheduled", "unknown"]);
const occurrenceBuckets = {
  closed_unresolved: [],
  in_progress: [],
  future: [],
  resolved: [],
};

for (const occurrence of occurrenceFeed.records) {
  const startText = occurrence.temporal_extent?.start;
  const endText = occurrence.temporal_extent?.end ?? startText;
  const start = parseIsoDay(startText, "start");
  const end = parseIsoDay(endText, "end");

  if (end < start) {
    throw new Error(`Occurrence ${occurrence.id} ends before it starts.`);
  }

  const item = {
    id: occurrence.id,
    subject_entity_id: occurrence.subject_entity_id,
    subject_name_ja: entityName(occurrence.subject_entity_id),
    start: startText,
    end: endText,
    outcome: occurrence.outcome,
    scale: occurrence.scale,
    evidence_ids: occurrence.evidence_ids ?? [],
  };

  if (!unresolvedOutcomes.has(occurrence.outcome)) {
    occurrenceBuckets.resolved.push(item);
  } else if (end < asOf) {
    occurrenceBuckets.closed_unresolved.push(item);
  } else if (start <= asOf && asOf <= end) {
    occurrenceBuckets.in_progress.push(item);
  } else {
    occurrenceBuckets.future.push(item);
  }
}

const staleStates = [];
const staleLinks = [];
let currentStateCount = 0;
let checkedLinkCount = 0;

for (const entity of entityFeed.records) {
  if (entity.current_state?.observed_at) {
    currentStateCount += 1;
    const observedAt = parseIsoDay(entity.current_state.observed_at, "start");
    const ageDays = daysBetween(observedAt, asOf);
    if (ageDays > stateStaleDays) {
      staleStates.push({
        entity_id: entity.id,
        entity_name_ja: entityName(entity.id),
        state_code: entity.current_state.state_code,
        observed_at: entity.current_state.observed_at,
        age_days: ageDays,
        basis_evidence_ids: entity.current_state.basis_evidence_ids ?? [],
      });
    }
  }

  for (const link of entity.external_links ?? []) {
    if (!link.last_checked_at) continue;
    checkedLinkCount += 1;
    const checkedAt = parseIsoDay(link.last_checked_at, "start");
    const ageDays = daysBetween(checkedAt, asOf);
    if (ageDays > linkStaleDays) {
      staleLinks.push({
        entity_id: entity.id,
        entity_name_ja: entityName(entity.id),
        url: link.url,
        kind: link.kind,
        last_checked_at: link.last_checked_at,
        age_days: ageDays,
      });
    }
  }
}

for (const bucket of Object.values(occurrenceBuckets)) {
  bucket.sort((left, right) =>
    left.start.localeCompare(right.start) || left.id.localeCompare(right.id),
  );
}
staleStates.sort((left, right) => right.age_days - left.age_days || left.entity_id.localeCompare(right.entity_id));
staleLinks.sort((left, right) => right.age_days - left.age_days || left.entity_id.localeCompare(right.entity_id));

const report = {
  format_version: 1,
  project_id: occurrenceFeed.project_id,
  site_id: occurrenceFeed.site_id,
  dataset_version: occurrenceFeed.dataset_version,
  schema_version: occurrenceFeed.schema_version,
  as_of: asOfText,
  thresholds: {
    state_stale_days: stateStaleDays,
    link_stale_days: linkStaleDays,
  },
  counts: {
    occurrences_total: occurrenceFeed.records.length,
    occurrence_closed_unresolved: occurrenceBuckets.closed_unresolved.length,
    occurrence_in_progress: occurrenceBuckets.in_progress.length,
    occurrence_future: occurrenceBuckets.future.length,
    occurrence_resolved: occurrenceBuckets.resolved.length,
    entities_total: entityFeed.records.length,
    current_states_checked: currentStateCount,
    stale_current_states: staleStates.length,
    external_links_checked: checkedLinkCount,
    stale_external_links: staleLinks.length,
  },
  candidates: {
    occurrence_closed_unresolved: occurrenceBuckets.closed_unresolved,
    occurrence_in_progress: occurrenceBuckets.in_progress,
    occurrence_future: occurrenceBuckets.future,
    stale_current_states: staleStates,
    stale_external_links: staleLinks,
  },
};

if (jsonOnly) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  console.log(`Matsuri data freshness audit as of ${asOfText}`);
  console.log(`Dataset: ${report.dataset_version}; schema: ${report.schema_version}`);
  console.log(`Occurrences: ${report.counts.occurrences_total}`);
  console.log(`- closed unresolved: ${report.counts.occurrence_closed_unresolved}`);
  console.log(`- in progress: ${report.counts.occurrence_in_progress}`);
  console.log(`- future unresolved: ${report.counts.occurrence_future}`);
  console.log(`- resolved: ${report.counts.occurrence_resolved}`);
  console.log(`Current states checked: ${currentStateCount}; stale: ${staleStates.length}`);
  console.log(`External links checked: ${checkedLinkCount}; stale: ${staleLinks.length}`);

  for (const candidate of occurrenceBuckets.closed_unresolved) {
    console.log(
      `[candidate] ${candidate.id} | ${candidate.subject_name_ja} | ${candidate.start}–${candidate.end} | ${candidate.outcome}`,
    );
  }
}
