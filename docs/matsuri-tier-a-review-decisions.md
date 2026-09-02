# Matsuri NCS-05 human review decisions

This tool applies explicit human review decisions to an existing Matsuri candidate batch without granting publication authority.

## Boundaries

- The input decision set must declare `schema_version: matsuri.tier-a-review-decisions.v1`.
- `human_review_confirmed` must be `true`.
- Every decision must name a reviewer and valid review timestamp.
- `automation_self_approved` must always be `false`.
- Approval requires all five NCS-05 review dimensions to be true: identity, subject type, geography, source role, and name variant.
- When a candidate has no municipality and relies on `broader_scope_ja`, approval also requires `broader_scope_basis_verified: true`.
- The applicator never publishes, never writes canonical public data, and never writes a Tier A publication timestamp.

## CLI

```bash
node scripts/apply-matsuri-tier-a-review-decisions.mjs \
  --candidate-batch=.artifacts/candidate-batch.json \
  --decisions=.artifacts/review-decisions.json \
  --out=.artifacts/reviewed-candidate-batch.json \
  --report=.artifacts/review-decision-report.json
```

The resulting reviewed candidate batch may then be passed to the existing NCS-05 publication-readiness gate and, only after it passes, to the bounded NCS-07 publication generator.
