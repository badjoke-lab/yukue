import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const recordPath = path.join(repositoryRoot, "config", "matsuri-stabilization-review.json");
const f2GatePath = path.join(repositoryRoot, "config", "matsuri-f2-launch-gate.json");
const jinjaGatePath = path.join(repositoryRoot, "config", "jinja-start-gate.json");
const projectStatusPath = path.join(repositoryRoot, "docs", "project-status.md");
const contractPath = path.join(repositoryRoot, "docs", "matsuri-stabilization-review.md");
const maintenanceAuditPath = path.join(
  repositoryRoot,
  "docs",
  "audits",
  "matsuri-stabilization-maintenance-review-2026-08-12.md",
);
const packagePath = path.join(repositoryRoot, "package.json");

const forbiddenKeys = new Set([
  "account_email",
  "account_id",
  "api_token",
  "analytics_token",
  "cloudflare_token",
  "verification_token",
  "visitor_id",
  "secret",
]);
const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/iu;
const expectedPrerequisiteKeys = [
  "f2_launch_complete",
  "minimum_observation_period_complete",
  "production_availability_reviewed",
  "canonical_and_https_reviewed",
  "canonical_search_reviewed",
  "crawler_and_sitemap_reviewed",
  "analytics_traffic_reviewed",
  "freshness_reviewed",
  "relation_coverage_reviewed",
  "evidence_and_corrections_reviewed",
  "maintenance_burden_recorded",
  "search_console_observation_recorded",
];
const operationalPrerequisiteKeys = expectedPrerequisiteKeys.filter(
  (key) => key !== "f2_launch_complete" && key !== "minimum_observation_period_complete",
);
const expectedObservationKeys = [
  "unresolved_critical_corrections",
  "production_deployment_failures",
  "manual_maintenance_burden",
  "search_console_observation",
];
const expectedClaimKeys = [
  "review_complete",
  "phase_11_gate_review_authorized",
  "jinja_stabilization_prerequisite_complete",
];
const expectedBoundaryKeys = [
  "elapsed_time_alone_does_not_complete_review",
  "search_engine_indexation_not_required",
  "no_automatic_future_site_activation",
  "private_analytics_metrics_must_not_be_committed",
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function parseIsoDay(value) {
  if (typeof value !== "string") return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(value);
  if (!match) return null;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return date.toISOString().slice(0, 10) === value ? date : null;
}

function addDays(day, count) {
  const result = new Date(day.getTime());
  result.setUTCDate(result.getUTCDate() + count);
  return result;
}

function assertExactKeys(record, expectedKeys, label) {
  assert(record && typeof record === "object" && !Array.isArray(record), `${label} must be an object`);
  const actual = Object.keys(record).sort();
  const expected = [...expectedKeys].sort();
  assert(
    actual.length === expected.length && actual.every((key, index) => key === expected[index]),
    `${label} keys differ. actual=${JSON.stringify(actual)} expected=${JSON.stringify(expected)}`,
  );
}

function inspectPrivacy(value, pointer = "$root") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => inspectPrivacy(item, `${pointer}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") {
    if (typeof value === "string" && emailPattern.test(value)) {
      throw new Error(`Stabilization record contains an email address at ${pointer}`);
    }
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    assert(!forbiddenKeys.has(key), `Stabilization record contains forbidden key ${pointer}.${key}`);
    inspectPrivacy(child, `${pointer}.${key}`);
  }
}

function completeFixture(record) {
  const clone = structuredClone(record);
  clone.status = "complete";
  clone.reviewed_on = clone.earliest_review_on;
  clone.review_evidence_document = "docs/audits/matsuri-stabilization-maintenance-review-2026-08-12.md";
  for (const key of expectedPrerequisiteKeys) clone.prerequisites[key] = true;
  clone.observations.unresolved_critical_corrections = 0;
  clone.observations.production_deployment_failures = 1;
  clone.observations.manual_maintenance_burden = "acceptable";
  clone.observations.search_console_observation = "recorded";
  for (const key of expectedClaimKeys) clone.claims[key] = true;
  return clone;
}

function observingFixture(record) {
  const clone = structuredClone(record);
  clone.status = "observing";
  clone.reviewed_on = null;
  clone.review_evidence_document = null;
  for (const key of operationalPrerequisiteKeys) clone.prerequisites[key] = false;
  clone.observations.unresolved_critical_corrections = null;
  clone.observations.production_deployment_failures = null;
  clone.observations.manual_maintenance_burden = "unrecorded";
  clone.observations.search_console_observation = "unrecorded";
  for (const key of expectedClaimKeys) clone.claims[key] = false;
  return clone;
}

function validateRecord(record, { today = new Date(), requireEvidenceFile = true } = {}) {
  inspectPrivacy(record);
  assert(record.format_version === 1, "Unexpected stabilization format_version");
  assert(record.site_id === "matsuri", "Unexpected stabilization site_id");
  assert(
    ["observing", "reviewing", "complete"].includes(record.status),
    `Unexpected stabilization status: ${record.status}`,
  );

  const startedOn = parseIsoDay(record.started_on);
  const earliestReviewOn = parseIsoDay(record.earliest_review_on);
  assert(startedOn, "started_on must be a real YYYY-MM-DD day");
  assert(earliestReviewOn, "earliest_review_on must be a real YYYY-MM-DD day");
  assert(Number.isInteger(record.minimum_observation_days), "minimum_observation_days must be an integer");
  assert(record.minimum_observation_days >= 14, "Stabilization observation must last at least 14 days");
  assert(
    addDays(startedOn, record.minimum_observation_days).toISOString().slice(0, 10) === record.earliest_review_on,
    "earliest_review_on must equal started_on plus minimum_observation_days",
  );
  const todayDay = parseIsoDay(today.toISOString().slice(0, 10));
  assert(startedOn <= todayDay, "Stabilization cannot start in the future");
  const minimumObservationPeriodComplete = todayDay >= earliestReviewOn;

  assertExactKeys(record.prerequisites, expectedPrerequisiteKeys, "Stabilization prerequisites");
  assertExactKeys(record.observations, expectedObservationKeys, "Stabilization observations");
  assertExactKeys(record.claims, expectedClaimKeys, "Stabilization claims");
  assertExactKeys(record.boundary, expectedBoundaryKeys, "Stabilization boundary");
  assert(record.prerequisites.f2_launch_complete === true, "F2 launch must be complete before stabilization");
  for (const key of expectedBoundaryKeys) {
    assert(record.boundary[key] === true, `Stabilization boundary ${key} must remain true`);
  }

  if (record.status === "observing") {
    assert(record.reviewed_on === null, "Observing record must not set reviewed_on");
    assert(record.review_evidence_document === null, "Observing record must not set review evidence");
    assert(
      record.prerequisites.minimum_observation_period_complete === minimumObservationPeriodComplete,
      `Observing record minimum_observation_period_complete must match calendar eligibility (${minimumObservationPeriodComplete})`,
    );
    for (const key of operationalPrerequisiteKeys) {
      assert(record.prerequisites[key] === false, `Observing record must keep ${key} false`);
    }
    assert(record.observations.unresolved_critical_corrections === null, "Observing record must not freeze correction count");
    assert(record.observations.production_deployment_failures === null, "Observing record must not freeze deployment-failure count");
    assert(record.observations.manual_maintenance_burden === "unrecorded", "Observing record must keep maintenance burden unrecorded");
    assert(record.observations.search_console_observation === "unrecorded", "Observing record must keep Search Console observation unrecorded");
    for (const key of expectedClaimKeys) {
      assert(record.claims[key] === false, `Observing record must keep ${key} false`);
    }
    return;
  }

  assert(record.prerequisites.minimum_observation_period_complete === true, `${record.status} requires completed minimum observation period`);
  assert(minimumObservationPeriodComplete, `${record.status} cannot begin before earliest_review_on`);

  if (record.status === "reviewing") {
    assert(record.reviewed_on === null, "Reviewing record must not set final reviewed_on");
    assert(record.review_evidence_document === null, "Reviewing record must not set final review evidence");
    assert(
      operationalPrerequisiteKeys.some((key) => record.prerequisites[key] === true),
      "Reviewing record must contain at least one completed operational review category",
    );
    for (const key of operationalPrerequisiteKeys) {
      assert(typeof record.prerequisites[key] === "boolean", `Reviewing prerequisite ${key} must be boolean`);
    }

    if (record.prerequisites.evidence_and_corrections_reviewed) {
      assert(
        Number.isInteger(record.observations.unresolved_critical_corrections) &&
          record.observations.unresolved_critical_corrections >= 0,
        "Reviewing correction review requires a non-negative unresolved critical-correction count",
      );
    } else {
      assert(record.observations.unresolved_critical_corrections === null, "Unreviewed corrections must not freeze a critical-correction count");
    }

    assert(
      record.observations.production_deployment_failures === null ||
        (Number.isInteger(record.observations.production_deployment_failures) &&
          record.observations.production_deployment_failures >= 0),
      "Reviewing deployment-failure count must be null or a non-negative integer",
    );

    if (record.prerequisites.maintenance_burden_recorded) {
      assert(
        ["low", "acceptable"].includes(record.observations.manual_maintenance_burden),
        "Recorded maintenance burden must be low or acceptable",
      );
    } else {
      assert(record.observations.manual_maintenance_burden === "unrecorded", "Unreviewed maintenance burden must remain unrecorded");
    }

    assert(
      record.prerequisites.search_console_observation_recorded ===
        (record.observations.search_console_observation === "recorded"),
      "Search Console prerequisite and observation must advance together",
    );
    for (const key of expectedClaimKeys) {
      assert(record.claims[key] === false, `Reviewing record must keep ${key} false`);
    }
    return;
  }

  const reviewedOn = parseIsoDay(record.reviewed_on);
  assert(reviewedOn, "Completed review must set a real reviewed_on day");
  assert(reviewedOn >= earliestReviewOn, "Completed review cannot precede earliest_review_on");
  assert(reviewedOn <= todayDay, "Completed review cannot use a future reviewed_on day");
  assert(
    typeof record.review_evidence_document === "string" && record.review_evidence_document.startsWith("docs/audits/"),
    "Completed review must reference a public-safe audit document",
  );
  if (requireEvidenceFile) {
    assert(fs.existsSync(path.join(repositoryRoot, record.review_evidence_document)), "Completed review evidence document is missing");
  }
  for (const key of expectedPrerequisiteKeys) {
    assert(record.prerequisites[key] === true, `Completed review requires ${key}`);
  }
  assert(record.observations.unresolved_critical_corrections === 0, "Completed review requires zero unresolved critical corrections");
  assert(
    Number.isInteger(record.observations.production_deployment_failures) && record.observations.production_deployment_failures >= 0,
    "Completed review requires a non-negative production deployment failure count",
  );
  assert(
    ["low", "acceptable"].includes(record.observations.manual_maintenance_burden),
    "Completed review requires acceptable maintenance burden",
  );
  assert(record.observations.search_console_observation === "recorded", "Completed review requires a Search Console observation");
  for (const key of expectedClaimKeys) {
    assert(record.claims[key] === true, `Completed review requires ${key}`);
  }
}

function assertRejects(label, callback) {
  let rejected = false;
  try {
    callback();
  } catch {
    rejected = true;
  }
  assert(rejected, `Negative fixture was not rejected: ${label}`);
}

const record = JSON.parse(fs.readFileSync(recordPath, "utf8"));
validateRecord(record);

assert(record.status === "reviewing", "Current Matsuri stabilization record must be in reviewing state");
for (const key of [
  "production_availability_reviewed",
  "canonical_and_https_reviewed",
  "canonical_search_reviewed",
  "crawler_and_sitemap_reviewed",
  "freshness_reviewed",
  "relation_coverage_reviewed",
  "evidence_and_corrections_reviewed",
  "maintenance_burden_recorded",
]) {
  assert(record.prerequisites[key] === true, `Current reviewing record must preserve completed review category ${key}`);
}
assert(record.prerequisites.analytics_traffic_reviewed === false, "Current Analytics traffic review must remain pending");
assert(record.prerequisites.search_console_observation_recorded === false, "Current Search Console review must remain pending");
assert(record.observations.unresolved_critical_corrections === 0, "Current reviewing record must contain zero known unresolved critical corrections");
assert(record.observations.production_deployment_failures === 1, "Current reviewing record must contain the one repository-recorded production deployment failure");
assert(record.observations.manual_maintenance_burden === "acceptable", "Current reviewing record must classify maintenance burden as acceptable");
assert(record.observations.search_console_observation === "unrecorded", "Current Search Console observation must remain unrecorded");
assert(fs.existsSync(maintenanceAuditPath), "Stabilization maintenance review audit is missing");

const maintenanceAudit = fs.readFileSync(maintenanceAuditPath, "utf8");
for (const marker of [
  "Known unresolved critical corrections   0",
  "Production deployment failures   1",
  "Manual maintenance burden   acceptable",
  "Cloudflare Web Analytics traffic receipt   pending",
  "Search Console observation                 pending",
]) {
  assert(maintenanceAudit.includes(marker), `Maintenance review audit is missing ${marker}`);
}

const f2Gate = JSON.parse(fs.readFileSync(f2GatePath, "utf8"));
assert(f2Gate.status === "complete" && f2Gate.claims?.f2_28_complete === true, "Stabilization record requires completed F2-28 gate");

const jinjaGate = JSON.parse(fs.readFileSync(jinjaGatePath, "utf8"));
assert(
  jinjaGate.matsuri_stabilization_record === "config/matsuri-stabilization-review.json",
  "Jinja gate must reference the stabilization record",
);
assert(
  jinjaGate.prerequisites?.matsuri_stabilization_review_complete ===
    record.claims.jinja_stabilization_prerequisite_complete,
  "Jinja stabilization prerequisite must match the stabilization record",
);

const projectStatus = fs.readFileSync(projectStatusPath, "utf8");
for (const marker of [
  "Matsuri stabilization review — reviewing / incomplete",
  "Earliest review       2026-08-10",
  "config/matsuri-stabilization-review.json",
  "Actual Jinja start gate — blocked",
]) {
  assert(projectStatus.includes(marker), `Project status is missing stabilization marker ${marker}`);
}
const contract = fs.readFileSync(contractPath, "utf8");
for (const marker of [
  "Elapsed time alone does not complete the review",
  "Search-engine indexation is not a completion requirement",
  "Review eligible       true",
  "Current status        reviewing",
  "observing -> reviewing -> complete",
]) {
  assert(contract.includes(marker), `Stabilization contract is missing ${marker}`);
}

const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
assert(
  packageJson.scripts?.["check:matsuri:stabilization-review"] ===
    "node scripts/check-matsuri-stabilization-review.mjs --verify-fixtures",
  "package.json is missing the stabilization validator script",
);
assert(
  packageJson.scripts?.["gate:matsuri:repository"]?.includes("pnpm check:matsuri:stabilization-review"),
  "Repository gate does not enforce the stabilization review",
);

if (process.argv.includes("--verify-fixtures")) {
  const staleEligibility = observingFixture(record);
  staleEligibility.prerequisites.minimum_observation_period_complete = false;
  assertRejects("elapsed minimum observation period not reflected", () =>
    validateRecord(staleEligibility, { today: new Date("2026-08-10T00:00:00Z") }),
  );

  const prematureEligibility = observingFixture(record);
  prematureEligibility.prerequisites.minimum_observation_period_complete = true;
  assertRejects("minimum observation period marked complete before earliest review", () =>
    validateRecord(prematureEligibility, { today: new Date("2026-08-09T00:00:00Z") }),
  );

  const prematureReviewing = structuredClone(record);
  assertRejects("reviewing before earliest review", () =>
    validateRecord(prematureReviewing, { today: new Date("2026-08-09T00:00:00Z") }),
  );

  const reviewingClaimLeak = structuredClone(record);
  reviewingClaimLeak.claims.review_complete = true;
  assertRejects("reviewing state contains completion claim", () => validateRecord(reviewingClaimLeak));

  const reviewingCorrectionCountRemoved = structuredClone(record);
  reviewingCorrectionCountRemoved.observations.unresolved_critical_corrections = null;
  assertRejects("reviewed corrections without explicit critical-correction count", () =>
    validateRecord(reviewingCorrectionCountRemoved),
  );

  const reviewingMaintenanceMismatch = structuredClone(record);
  reviewingMaintenanceMismatch.prerequisites.maintenance_burden_recorded = false;
  assertRejects("maintenance burden value recorded without prerequisite", () =>
    validateRecord(reviewingMaintenanceMismatch),
  );

  const beforeEarliest = completeFixture(record);
  beforeEarliest.reviewed_on = record.started_on;
  assertRejects("review completed before earliest_review_on", () =>
    validateRecord(beforeEarliest, { today: new Date("2026-08-10T00:00:00Z"), requireEvidenceFile: false }),
  );

  const elapsedTimeOnly = completeFixture(record);
  elapsedTimeOnly.prerequisites.maintenance_burden_recorded = false;
  assertRejects("elapsed time without required review evidence", () =>
    validateRecord(elapsedTimeOnly, { today: new Date("2026-08-10T00:00:00Z"), requireEvidenceFile: false }),
  );

  const unresolvedCriticalCorrection = completeFixture(record);
  unresolvedCriticalCorrection.observations.unresolved_critical_corrections = 1;
  assertRejects("unresolved critical correction", () =>
    validateRecord(unresolvedCriticalCorrection, { today: new Date("2026-08-10T00:00:00Z"), requireEvidenceFile: false }),
  );

  const indexationBoundaryRemoved = structuredClone(record);
  indexationBoundaryRemoved.boundary.search_engine_indexation_not_required = false;
  assertRejects("search-engine indexation boundary removed", () => validateRecord(indexationBoundaryRemoved));
}

console.log(
  `Matsuri stabilization review is ${record.status}; observation started ${record.started_on}, earliest review ${record.earliest_review_on}, minimum period complete ${record.prerequisites.minimum_observation_period_complete}, known critical corrections ${record.observations.unresolved_critical_corrections}, deployment failures ${record.observations.production_deployment_failures}, maintenance burden ${record.observations.manual_maintenance_burden}, completion claim ${record.claims.review_complete}.`,
);
