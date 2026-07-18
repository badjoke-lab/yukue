# F2-P12 Matsuri Shared Correction Engine Audit

**Date:** 2026-07-18  
**Status:** Passed  
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

## Verified baseline

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

The dedicated Workflow watches both shared-engine files and identifies the shared-engine rule in its summary.

## Hosted verification

Implementation head:

```text
c643560be3c9b08375bd5e9ca9770684e936d2fd
```

Successful runs:

```text
Correction contract           29635048023 — success
Bundle inventory and order    29635048060 — success
Repository CI                 29635048032 — success
Full-page screenshots         29635048050 — success
Future-site seed inventory    29635048056 — success
Future-site seed readiness    29635048033 — success
Jinja start-gate              29635048039 — success
```

The repository CI completed the full launch-readiness gate, including the shared correction contract, exact bundle order, public build, browser verification, pending Analytics boundary, blocked Jinja boundary, and release-candidate freeze.

Artifacts:

```text
Release artifact      8426823296
Release digest        sha256:71e24fa155be7cff3e5366592179ddfddaa3e2ef6dbd17a76dbb8d8ee91800cc
Screenshot artifact   8426817176
Screenshot digest     sha256:8498f410ae47d0ee0c97e682e8c4248b1a564af6d3cb8d5cd8ff81992a5ad758
```

## Boundaries

F2-P12 does not:

- change current public facts, classifications, or record versions,
- introduce partial correction patches,
- reorder F1, maintenance, or correction bundles,
- activate F2-25 through F2-28,
- alter the blocked Jinja start gate,
- create a future-site application,
- add dynamic storage, ingestion, API, MCP, or billing infrastructure.
