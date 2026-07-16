import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const recordPath = path.join(repositoryRoot, "config", "matsuri-analytics-activation.json");
const expectedOrigin = "https://matsuri-yukue.badjoke-lab.com";
const allowedStatuses = new Set([
  "pending-owner-access",
  "analytics-enabled",
  "post-activation-deployed",
  "traffic-verified",
]);
const forbiddenKeys = new Set([
  "account_email",
  "account_id",
  "analytics_token",
  "site_token",
  "beacon_token",
  "visitor_id",
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
      throw new Error(`Analytics record contains an email address at ${pointer}`);
    }
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenKeys.has(key)) {
      throw new Error(`Analytics record contains forbidden key ${pointer}.${key}`);
    }
    inspectPrivacy(child, `${pointer}.${key}`);
  }
}

function validEvidencePath(value, stage) {
  return (
    typeof value === "string" &&
    new RegExp(`^docs/audits/matsuri-${stage}-[a-z0-9-]+\\.md$`, "u").test(value) &&
    fs.existsSync(path.join(repositoryRoot, value))
  );
}

const record = JSON.parse(fs.readFileSync(recordPath, "utf8"));
inspectPrivacy(record);

assert(record.format_version === 1, "Unexpected analytics record format_version");
assert(record.site_id === "matsuri", "Unexpected analytics record site_id");
assert(record.canonical_origin === expectedOrigin, "Analytics canonical origin mismatch");
assert(record.provider === "cloudflare-web-analytics", "Unexpected analytics provider");
assert(record.activation_method === "automatic-setup", "Manual beacon activation is not accepted");
assert(allowedStatuses.has(record.status), `Unsupported analytics status: ${record.status}`);
assert(
  record.privacy?.manual_beacon_committed === false &&
    record.privacy?.analytics_token_committed === false &&
    record.privacy?.account_identity_committed === false &&
    record.privacy?.private_dashboard_export_committed === false &&
    record.privacy?.visitor_level_data_committed === false,
  "Analytics privacy boundary is incomplete",
);
assert(
  record.boundary?.owner_account_action_required === true &&
    record.boundary?.activation_does_not_equal_deployment === true &&
    record.boundary?.activation_does_not_equal_traffic_verification === true &&
    record.boundary?.private_metrics_remain_private === true,
  "Analytics progression boundary is incomplete",
);

const deployment = record.post_activation_deployment;
const traffic = record.traffic_verification;
const claims = record.claims;
assert(deployment?.required === true, "Post-activation deployment must remain required");
assert(traffic?.required === true, "Production traffic verification must remain required");
assert(traffic?.private_counts_published === false, "Private traffic counts must not be published");

if (record.status === "pending-owner-access") {
  assert(record.analytics_enabled === false, "Pending record must not claim Analytics enablement");
  assert(record.activated_at === null, "Pending record must not contain activated_at");
  assert(record.activation_observed_at === null, "Pending record must not contain activation_observed_at");
  assert(record.activation_evidence_document === null, "Pending record must not claim activation evidence");
  assert(deployment.completed === false, "Pending record must not claim deployment completion");
  assert(traffic.completed === false, "Pending record must not claim traffic verification");
  assert(
    claims?.f2_25_complete === false &&
      claims?.f2_26_complete === false &&
      claims?.f2_27_complete === false,
    "Pending record contains completed gate claims",
  );
  console.log("Matsuri Analytics record is valid and remains pending owner Cloudflare access.");
  process.exit(0);
}

assert(record.analytics_enabled === true, "Activated records require analytics_enabled true");
assert(validIsoTimestamp(record.activated_at), "Activated records require activated_at UTC timestamp");
assert(
  validIsoTimestamp(record.activation_observed_at),
  "Activated records require activation_observed_at UTC timestamp",
);
assert(
  validEvidencePath(record.activation_evidence_document, "f2-25"),
  "Activated records require an existing public-safe F2-25 audit",
);
assert(claims?.f2_25_complete === true, "Activated records require F2-25 completion");

if (record.status === "analytics-enabled") {
  assert(deployment.completed === false, "F2-25 must not claim F2-26 deployment completion");
  assert(traffic.completed === false, "F2-25 must not claim F2-27 traffic verification");
  assert(claims.f2_26_complete === false && claims.f2_27_complete === false, "Later gates claimed early");
  console.log("Matsuri F2-25 Analytics activation record is complete; F2-26 remains pending.");
  process.exit(0);
}

assert(deployment.completed === true, "Post-activation status requires completed deployment");
assert(/^[0-9a-f]{40}$/u.test(deployment.commit_sha), "Deployment commit SHA is invalid");
assert(validIsoTimestamp(deployment.deployed_at), "Deployment deployed_at is invalid");
assert(
  validEvidencePath(deployment.evidence_document, "f2-26"),
  "Post-activation deployment requires an existing public-safe F2-26 audit",
);
assert(claims.f2_26_complete === true, "Post-activation deployment requires F2-26 completion");

if (record.status === "post-activation-deployed") {
  assert(traffic.completed === false, "F2-26 must not claim F2-27 traffic verification");
  assert(claims.f2_27_complete === false, "F2-27 claimed early");
  console.log("Matsuri F2-26 post-activation deployment record is complete; F2-27 remains pending.");
  process.exit(0);
}

assert(traffic.completed === true, "Traffic-verified status requires completed traffic verification");
assert(validIsoTimestamp(traffic.verified_at), "Traffic verified_at is invalid");
assert(
  validEvidencePath(traffic.evidence_document, "f2-27"),
  "Traffic verification requires an existing public-safe F2-27 audit",
);
assert(claims.f2_27_complete === true, "Traffic verification requires F2-27 completion");
console.log("Matsuri F2-25 through F2-27 analytics record is complete; F2-28 may be evaluated separately.");
