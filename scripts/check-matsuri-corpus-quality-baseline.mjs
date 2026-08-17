import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const baselinePath = path.join(repositoryRoot, "config", "matsuri-corpus-quality-baseline.json");
const auditScript = path.join(repositoryRoot, "scripts", "audit-matsuri-corpus-quality.mjs");
const outputRoot = fs.mkdtempSync(path.join(os.tmpdir(), "yukue-matsuri-quality-"));

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, child]) => [key, stable(child)]),
  );
}

function assertEqual(label, expected, actual) {
  const expectedJson = JSON.stringify(stable(expected));
  const actualJson = JSON.stringify(stable(actual));
  if (expectedJson !== actualJson) {
    throw new Error(
      `${label} drifted from config/matsuri-corpus-quality-baseline.json.\nexpected=${JSON.stringify(expected, null, 2)}\nactual=${JSON.stringify(actual, null, 2)}`,
    );
  }
}

function requireBoundary(boundaries, key, expected) {
  if (boundaries?.[key] !== expected) {
    throw new Error(`Matsuri A/B/C boundary ${key} must be ${expected}; got ${boundaries?.[key]}.`);
  }
}

try {
  execFileSync(process.execPath, [auditScript, "--output", outputRoot], {
    cwd: repositoryRoot,
    stdio: ["ignore", "pipe", "inherit"],
  });

  const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  const report = JSON.parse(fs.readFileSync(path.join(outputRoot, "report.json"), "utf8"));

  if (baseline.schema_version !== "matsuri.corpus-quality-baseline.v2") {
    throw new Error(`Unsupported Matsuri quality baseline schema: ${baseline.schema_version}`);
  }
  if (report.schema_version !== "matsuri.corpus-quality.v2") {
    throw new Error(`Unsupported Matsuri quality report schema: ${report.schema_version}`);
  }
  if (baseline.status !== "measurement-only") {
    throw new Error(`Matsuri quality baseline must remain measurement-only during NCS-02: ${baseline.status}`);
  }

  const boundaries = baseline.boundaries;
  requireBoundary(boundaries, "tier_a_is_public", true);
  requireBoundary(boundaries, "tier_b_target_days", 7);
  requireBoundary(boundaries, "tier_a_overdue_blocks_new_publication", false);
  requireBoundary(boundaries, "tier_a_auto_withdrawal_on_overdue", false);
  requireBoundary(boundaries, "completed_occurrence_required_for_tier_a", false);
  requireBoundary(boundaries, "change_event_required_for_tier_a", false);
  requireBoundary(boundaries, "multi_year_history_required_for_tier_a_or_b", false);
  requireBoundary(boundaries, "private_candidate_publication_authorized", false);
  requireBoundary(boundaries, "machine_tier_auto_approval_authorized", false);
  requireBoundary(boundaries, "bulk_public_release_authorized", false);
  requireBoundary(boundaries, "future_site_activation_authorized", false);

  if (report.tier_a_target?.target_days !== boundaries.tier_b_target_days) {
    throw new Error("Classifier Tier A→B target must match the committed seven-day baseline target.");
  }
  if (report.tier_a_target?.overdue_blocks_new_tier_a_publication !== false) {
    throw new Error("Overdue Tier A must remain a work-priority signal, not a global publication blocker.");
  }
  if (report.tier_a_target?.auto_withdraw_on_overdue !== false) {
    throw new Error("A valid Tier A record must not be auto-withdrawn merely because the target age elapsed.");
  }

  assertEqual("Corpus A/B/C counts", baseline.counts, report.counts);
  assertEqual("Corpus A/B/C by_entity_type", baseline.by_entity_type, report.by_entity_type);
  assertEqual(
    "Tier A missing dimensions",
    baseline.tier_a_missing_dimension_counts,
    report.tier_a_missing_dimension_counts,
  );
  assertEqual(
    "Tier A→B missing dimensions",
    baseline.tier_a_to_b_missing_dimension_counts,
    report.tier_a_to_b_missing_dimension_counts,
  );
  assertEqual(
    "Tier B→C missing history dimensions",
    baseline.tier_b_missing_history_dimension_counts,
    report.tier_b_missing_history_dimension_counts,
  );

  const coverageSummary = {
    prefecture_count: report.coverage.prefecture_count,
    municipality_count: report.coverage.municipality_count,
    source_family_entity_coverage: report.coverage.source_family_entity_coverage,
  };
  assertEqual("Corpus geographic/source-family coverage", baseline.coverage, coverageSummary);

  if (report.counts.public_primary_total !== report.counts.specialist_primary_subjects) {
    throw new Error(
      `Every current specialist primary public record must classify at A/B/C: ${report.counts.public_primary_total}/${report.counts.specialist_primary_subjects}.`,
    );
  }
  if (report.counts.below_tier_a !== 0) {
    throw new Error(`Current reviewed public corpus unexpectedly fell below Tier A: ${report.counts.below_tier_a}.`);
  }

  console.log(
    `Matsuri A/B/C baseline check passed: Tier A ${report.counts.tier_a_index}, Tier B ${report.counts.tier_b_verified}, Tier C ${report.counts.tier_c_history_monitoring}, public total ${report.counts.public_primary_total}; seven-day A→B target is non-blocking.`,
  );
} finally {
  fs.rmSync(outputRoot, { recursive: true, force: true });
}
