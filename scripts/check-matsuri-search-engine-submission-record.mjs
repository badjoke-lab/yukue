import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const recordPath = path.join(
  repositoryRoot,
  "config",
  "matsuri-search-engine-submission.json",
);
const expectedOrigin = "https://matsuri-yukue.badjoke-lab.com";
const expectedSitemap = `${expectedOrigin}/sitemap.xml`;
const allowedPropertyTypes = new Set(["domain", "url-prefix"]);
const allowedStatus = new Set([
  "pending-owner-action",
  "submitted-indexability-checked",
]);
const allowedIndexStatus = new Set([
  "indexed",
  "not-indexed",
  "unknown",
]);
const allowedLiveTestResult = new Set([
  "indexable",
  "not-indexable",
  "not-run",
]);
const forbiddenKeys = new Set([
  "account_email",
  "owner_email",
  "account_id",
  "owner_account_id",
  "verification_token",
  "private_token",
]);
const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/iu;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function validIsoTimestamp(value) {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/u.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

function inspectPrivacy(value, pointer = "$root") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => inspectPrivacy(item, `${pointer}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") {
    if (typeof value === "string" && emailPattern.test(value)) {
      throw new Error(`Public submission record contains an email address at ${pointer}`);
    }
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    if (forbiddenKeys.has(key)) {
      throw new Error(`Public submission record contains forbidden key ${pointer}.${key}`);
    }
    inspectPrivacy(child, `${pointer}.${key}`);
  }
}

const record = JSON.parse(fs.readFileSync(recordPath, "utf8"));
inspectPrivacy(record);

assert(record.format_version === 1, "Unexpected submission record format_version");
assert(record.site_id === "matsuri", "Unexpected submission record site_id");
assert(record.canonical_origin === expectedOrigin, "Canonical origin mismatch");
assert(record.sitemap_url === expectedSitemap, "Canonical sitemap URL mismatch");
assert(
  record.search_engine === "google-search-console",
  "F2-24 primary search engine must remain google-search-console",
);
assert(allowedStatus.has(record.status), `Unsupported F2-24 status: ${record.status}`);
assert(
  record.privacy?.exclude_account_email === true &&
    record.privacy?.exclude_account_identifier === true &&
    record.privacy?.exclude_private_property_tokens === true &&
    record.privacy?.public_safe_evidence_only === true,
  "Submission record privacy boundary is incomplete",
);
assert(
  record.boundary?.submission_does_not_equal_indexation === true &&
    record.boundary?.owner_account_action_required === true &&
    record.boundary?.analytics_not_authorized === true,
  "Submission record gate boundary is incomplete",
);

if (record.status === "pending-owner-action") {
  assert(record.property_type === null, "Pending record must not claim a property type");
  assert(record.ownership_verified === false, "Pending record must not claim ownership");
  assert(record.submitted === false, "Pending record must not claim submission");
  assert(record.submitted_at === null, "Pending record must not contain submitted_at");
  assert(record.submission_result === null, "Pending record must not claim a result");
  assert(
    record.submission_evidence_document === null,
    "Pending record must not claim an evidence document",
  );
  assert(
    Array.isArray(record.representative_url_inspections) &&
      record.representative_url_inspections.length === 0,
    "Pending record must not claim URL Inspection results",
  );
  assert(
    record.claims?.technical_indexability_verified === false &&
      record.claims?.sitemap_submission_verified === false &&
      record.claims?.indexation_claimed === false &&
      record.claims?.f2_24_complete === false,
    "Pending record contains a completed F2-24 claim",
  );

  console.log(
    "Matsuri F2-24 submission record is valid and remains pending owner-account action.",
  );
  process.exit(0);
}

assert(
  allowedPropertyTypes.has(record.property_type),
  `Unsupported Search Console property type: ${record.property_type}`,
);
assert(record.ownership_verified === true, "Completed F2-24 requires verified ownership");
assert(record.submitted === true, "Completed F2-24 requires sitemap submission");
assert(validIsoTimestamp(record.submitted_at), "Completed F2-24 requires a UTC submitted_at timestamp");
assert(
  record.submission_result === "success",
  "Completed F2-24 requires submission_result success",
);
assert(
  typeof record.submission_evidence_document === "string" &&
    /^docs\/audits\/matsuri-f2-24-[a-z0-9-]+\.md$/u.test(
      record.submission_evidence_document,
    ) &&
    fs.existsSync(path.join(repositoryRoot, record.submission_evidence_document)),
  "Completed F2-24 requires an existing public-safe audit document",
);
assert(
  Array.isArray(record.representative_url_inspections) &&
    record.representative_url_inspections.length >= 3,
  "Completed F2-24 requires at least three representative URL Inspection records",
);

const inspectedUrls = new Set();
for (const [index, inspection] of record.representative_url_inspections.entries()) {
  const prefix = `representative_url_inspections[${index}]`;
  const url = new URL(inspection.url);
  assert(url.origin === expectedOrigin, `${prefix}.url uses another origin`);
  assert(!url.search && !url.hash, `${prefix}.url must not contain query or fragment`);
  assert(!inspectedUrls.has(url.href), `${prefix}.url is duplicated`);
  inspectedUrls.add(url.href);
  assert(validIsoTimestamp(inspection.checked_at), `${prefix}.checked_at is invalid`);
  assert(
    inspection.method === "google-search-console-url-inspection",
    `${prefix}.method is unsupported`,
  );
  assert(
    allowedIndexStatus.has(inspection.index_status),
    `${prefix}.index_status is unsupported`,
  );
  assert(
    allowedLiveTestResult.has(inspection.live_test_result),
    `${prefix}.live_test_result is unsupported`,
  );
  assert(
    inspection.live_test_result === "indexable",
    `${prefix} does not establish technical indexability`,
  );
  assert(
    typeof inspection.public_safe_note === "string" &&
      inspection.public_safe_note.trim().length > 0,
    `${prefix}.public_safe_note is required`,
  );
}

assert(
  record.claims?.technical_indexability_verified === true &&
    record.claims?.sitemap_submission_verified === true &&
    record.claims?.indexation_claimed === false &&
    record.claims?.f2_24_complete === true,
  "Completed record claims do not match the F2-24 completion boundary",
);

console.log(
  `Matsuri F2-24 submission record is complete: ${record.representative_url_inspections.length} representative URL inspections, submission ${record.submitted_at}, no indexation claim.`,
);
