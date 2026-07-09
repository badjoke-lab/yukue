import type { ValidationIssue } from "./types.js";

const forbiddenProjectionKeys = new Set([
  "internal_confidence",
  "review_notes",
  "reviewer_notes",
  "source_conflicts",
  "candidate_priority",
  "candidate_queue",
  "private_notes",
  "internal_notes",
  "monitoring_notes",
]);

export function validateProjectionSafety(value: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const visited = new WeakSet<object>();

  const walk = (current: unknown, path: string): void => {
    if (current === null || typeof current !== "object") return;
    if (visited.has(current)) return;
    visited.add(current);

    if (Array.isArray(current)) {
      current.forEach((item, index) => walk(item, `${path}[${index}]`));
      return;
    }

    for (const [key, child] of Object.entries(current)) {
      const childPath = path ? `${path}.${key}` : key;
      if (forbiddenProjectionKeys.has(key)) {
        issues.push({
          severity: "error",
          code: "PUBLIC_PROJECTION_PRIVATE_FIELD",
          message: `Public Projection contains forbidden private field ${key}.`,
          path: childPath,
        });
      }
      walk(child, childPath);
    }
  };

  walk(value, "");
  return issues;
}
