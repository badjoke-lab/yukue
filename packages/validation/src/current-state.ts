import type { StateSnapshotRecord } from "@badjoke-lab/yukue-schemas/common";
import type { DerivedCurrentState, ValidationIssue } from "./types.js";

export interface CurrentStateDerivationResult {
  states: DerivedCurrentState[];
  issues: ValidationIssue[];
}

export function deriveCurrentStates(
  snapshots: StateSnapshotRecord[],
): CurrentStateDerivationResult {
  const approved = snapshots.filter((snapshot) => snapshot.review_status === "approved");
  const byEntity = new Map<string, StateSnapshotRecord[]>();
  const issues: ValidationIssue[] = [];

  for (const snapshot of approved) {
    const group = byEntity.get(snapshot.entity_id) ?? [];
    group.push(snapshot);
    byEntity.set(snapshot.entity_id, group);

    if (snapshot.basis_evidence_ids.length === 0) {
      issues.push({
        severity: "error",
        code: "APPROVED_STATE_WITHOUT_EVIDENCE",
        message: `Approved State Snapshot ${snapshot.id} has no basis evidence.`,
        recordId: snapshot.id,
        path: "basis_evidence_ids",
      });
    }
  }

  const states: DerivedCurrentState[] = [];

  for (const [entityId, group] of byEntity) {
    const sorted = [...group].sort((a, b) =>
      String(b.observed_at).localeCompare(String(a.observed_at)),
    );
    const latest = sorted[0];
    if (!latest) continue;

    const latestObservedAt = String(latest.observed_at);
    const latestCandidates = sorted.filter(
      (snapshot) => String(snapshot.observed_at) === latestObservedAt,
    );
    const stateCodes = new Set(latestCandidates.map((snapshot) => snapshot.state_code));

    if (stateCodes.size > 1) {
      issues.push({
        severity: "error",
        code: "CURRENT_STATE_AMBIGUOUS",
        message: `Entity ${entityId} has conflicting approved State Snapshots at ${latestObservedAt}.`,
        recordId: entityId,
        path: "stateSnapshots",
      });
      continue;
    }

    states.push({
      entityId,
      snapshotId: latest.id,
      stateCode: latest.state_code,
      observedAt: latestObservedAt,
    });
  }

  return { states, issues };
}
