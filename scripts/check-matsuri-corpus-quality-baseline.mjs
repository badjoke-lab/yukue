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

try {
  execFileSync(process.execPath, [auditScript, "--output", outputRoot], {
    cwd: repositoryRoot,
    stdio: ["ignore", "pipe", "inherit"],
  });

  const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  const report = JSON.parse(fs.readFileSync(path.join(outputRoot, "report.json"), "utf8"));

  if (baseline.schema_version !== "matsuri.corpus-quality-baseline.v1") {
    throw new Error(`Unsupported Matsuri quality baseline schema: ${baseline.schema_version}`);
  }
  if (baseline.status !== "measurement-only") {
    throw new Error(`Matsuri quality baseline must remain measurement-only during NCS-02: ${baseline.status}`);
  }
  if (baseline.boundaries?.bulk_public_release_authorized !== false) {
    throw new Error("NCS-02 baseline must not authorize bulk public release.");
  }
  if (baseline.boundaries?.thin_candidate_publication_authorized !== false) {
    throw new Error("NCS-02 baseline must not authorize thin candidate publication.");
  }
  if (baseline.boundaries?.machine_public_core_auto_approval_authorized !== false) {
    throw new Error("NCS-02 baseline must not authorize machine auto-approval.");
  }
  if (baseline.boundaries?.existing_records_exempt_from_quality_deepening !== false) {
    throw new Error("Existing records must remain inside the quality-deepening scope.");
  }
  if (baseline.boundaries?.history_depth_floor_defined !== true) {
    throw new Error("NCS-02 must preserve the measured history-depth floor before nationwide public expansion.");
  }
  if (baseline.boundaries?.release_threshold_defined !== false) {
    throw new Error("NCS-02 must not claim the full bulk-release guard is complete before backlog bounds are implemented.");
  }

  assertEqual("Corpus quality counts", baseline.counts, report.counts);
  assertEqual("Corpus quality by_entity_type", baseline.by_entity_type, report.by_entity_type);
  assertEqual("Corpus quality unmet_check_counts", baseline.unmet_check_counts, report.unmet_check_counts);

  const expectedHistoryReference = {
    denominator_specialist_primary_subjects: report.counts.specialist_primary_subjects,
    at_least_one_completed_occurrence_year: report.counts.with_completed_occurrence_history,
    at_least_two_completed_occurrence_years:
      report.counts.with_multi_year_completed_occurrence_history,
    minimum_new_release_multi_year_numerator:
      report.counts.with_multi_year_completed_occurrence_history,
    minimum_new_release_multi_year_denominator: report.counts.specialist_primary_subjects,
  };
  assertEqual(
    "Corpus history-depth reference",
    baseline.history_depth_reference,
    expectedHistoryReference,
  );

  console.log(
    `Matsuri corpus quality baseline check passed: ${report.counts.specialist_primary_subjects} specialist primary subjects, ${report.counts.with_completed_occurrence_history} with completed Occurrence history, ${report.counts.with_multi_year_completed_occurrence_history} with multi-year completed Occurrence history; bulk publication remains blocked.`,
  );
} finally {
  fs.rmSync(outputRoot, { recursive: true, force: true });
}
