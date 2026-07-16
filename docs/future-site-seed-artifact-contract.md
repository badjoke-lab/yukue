# Yukue Future-site Seed Artifact Contract

**Status:** F2-P07 repository implementation / hosted verification pending

## Purpose

F2-P07 freezes the current candidate-artifact structure as a machine-readable contract. It prevents accidental field removal, boundary reversal, file omission, site-ID drift, or mismatch between `inventory.json` and `provenance.json`.

This is an internal repository validation contract for public-safe artifacts. It is not a future-site API promise and does not activate another application.

## Contract file

```text
config/yukue-future-site-seed-artifact-contract.json
```

```text
contract_id       yukue-future-site-seed-artifacts
contract_version  1
```

## Validation command

```text
pnpm check:yukue:future-site-seed-artifact-contract
```

The standard generation command runs the validator automatically:

```text
pnpm audit:yukue:future-site-seeds
```

## Required artifact files

```text
inventory.json
provenance.json
summary.md
```

## Inventory contract

The contract fixes:

- `format_version: 1`,
- `status: candidate-seed-inventory-only`,
- the required top-level fields,
- the required per-seed fields,
- `seed_status: relation-backed-candidate`,
- the exact site IDs `jinja`, `jiin`, and `tomurai`,
- the candidate-only boundary booleans.

It also verifies balanced totals, unique seed Entity IDs, typed string arrays, and at least one Relation context per seed.

## Provenance contract

The contract fixes:

- `format_version: 1`,
- `status: candidate-provenance-bundle-only`,
- required top-level fields,
- required handoff fields,
- required record families,
- exact candidate-only boundary booleans,
- `target_site_review_required: true` for every handoff.

It verifies that:

- the provenance bundle identifies the exact generated inventory,
- handoff Entity IDs equal inventory seed Entity IDs,
- record-family totals equal actual record counts,
- record IDs are unique within each family,
- required reference fields remain arrays of strings,
- the Markdown summary preserves the seed total.

## Change rule

A deliberate breaking change requires all of the following in one bounded change:

1. update the contract file,
2. increment `contract_version`,
3. update the builder and validator,
4. update the governing documentation,
5. run hosted artifact generation and readiness verification,
6. record the compatibility effect explicitly.

Do not silently remove fields or reverse boundary flags while leaving `contract_version` unchanged.

## Boundary

The contract does not:

- publish these artifacts as a stable external API,
- authorize Jinja, Jiin, or Tomurai implementation,
- infer missing State or official URLs,
- assign candidate priority,
- expose private research notes,
- change F2-25 through F2-28.
