import { deriveCurrentStates } from "./current-state.js";
import { validateImageGate } from "./image-gate.js";
import { validateProjectionSafety } from "./projection-safety.js";
import { validateReferences } from "./references.js";
import type { DatasetBundle, ValidationIssue, ValidationResult } from "./types.js";

export function validateDataset(bundle: DatasetBundle): ValidationResult {
  const issues: ValidationIssue[] = [];

  issues.push(...validateReferences(bundle));

  const currentStateResult = deriveCurrentStates(bundle.stateSnapshots);
  issues.push(...currentStateResult.issues);

  issues.push(...validateImageGate(bundle.images));

  if (bundle.publicProjection !== undefined) {
    issues.push(...validateProjectionSafety(bundle.publicProjection));
  }

  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");

  return {
    ok: errors.length === 0,
    issues,
    errors,
    warnings,
  };
}
