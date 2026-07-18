# F2-P12 Matsuri Shared Correction Engine Audit

**Date:** 2026-07-18  
**Status:** Implementation complete / hosted verification pending  
**Scope:** Repository correction-engine consolidation and gate preservation only

## Purpose

F2-P10 made all twelve Matsuri record families correction-capable. F2-P11 made bundle application order explicit. One structural duplication remained: the canonical Node loader and the Astro HTML Public Projection each implemented their own correction function.

Those implementations were equivalent for current data, but separate functions could drift later without an immediate visible difference. One consumer could change missing-ID handling, version validation, duplicate-ID behavior, or replacement semantics while the other retained the old rules.

F2-P12 removes that duplicate implementation.

## Shared engine

Added:

```text
apps/matsuri/src/data/matsuri-record-overrides.mjs
apps/matsuri/src/data/matsuri-record-overrides.d.mts
```

The JavaScript module contains the only correction implementation. The declaration file gives the strict Astro and TypeScript consumer a generic versioned-record contract.

Consumers:

```text
apps/matsuri/scripts/load-matsuri-dataset.mjs
apps/matsuri/src/data/matsuri-projection.ts
```

The loader imports and re-exports `applyMatsuriRecordOverrides`. The HTML Public Projection imports the same function directly. The prior local Projection implementation was removed.

## Shared behavior

For a family with corrections, the engine:

1. builds the base stable-ID map,
2. rejects duplicate base IDs,
3. rejects corrections for a missing stable ID,
4. rejects an unchanged or lower `record_version`,
5. replaces the complete record object,
6. preserves base list order,
7. returns the original array unchanged when no corrections exist.

## Contract hardening

Updated:

```text
scripts/check-matsuri-correction-contract.mjs
.github/workflows/verify-matsuri-correction-contract.yml
```

The contract now verifies:

- the shared engine file exists,
- both consumers import that exact module,
- neither consumer defines a local correction function,
- exact complete-record replacement works for all twelve families,
- missing IDs fail for all twelve families,
- non-increasing versions fail for all twelve families,
- duplicate base IDs fail for all twelve families,
- current correction chains still expose their final records,
- all families still route through correction handling.

## Current baseline

```text
Correction consumers          2
Shared correction engines     1
Record families              12
Correction bundles            5
Corrected logical IDs         5
Correction records            6
Public record changes         0
```

## Repository gate

The existing command remains:

```text
pnpm check:matsuri:correction-contract
```

It runs inside:

```text
pnpm gate:matsuri:repository
```

The dedicated Workflow now watches both shared-engine files and identifies the shared-engine rule in its summary.

## Boundaries

F2-P12 does not:

- change current public facts, classifications, or record versions,
- introduce partial correction patches,
- reorder F1, maintenance, or correction bundles,
- activate F2-25 through F2-28,
- alter the blocked Jinja start gate,
- create a future-site application,
- add dynamic storage, ingestion, API, MCP, or billing infrastructure.

## Hosted verification

Pending GitHub Actions verification for the implementation branch.
