# F2-P11 Matsuri Bundle Order Contract Audit

**Date:** 2026-07-18  
**Status:** Passed  
**Scope:** Repository bundle-order verification and gate preservation only

## Purpose

F2-P10 established ordered complete-record corrections across all twelve Matsuri record families. During follow-up review, one enforcement gap remained: `scripts/check-matsuri-bundle-inventory.mjs` compared imported bundle filenames as sorted sets.

That proved inventory equality, but it did not prove that the HTML Public Projection applied those bundles in canonical loader order. The same files could be present while `additiveBundles` or `correctionBundles` used a different sequence.

F2-P11 makes application order explicit and machine-enforced.

## Canonical sequences

The canonical loader exports three ordered declarations:

```text
matsuriF1BatchFiles
matsuriF2MaintenanceFiles
matsuriF2CorrectionFiles
```

The HTML Public Projection must apply:

```text
additiveBundles
  F1 batches in matsuriF1BatchFiles order
  then maintenance bundles in matsuriF2MaintenanceFiles order

correctionBundles
  correction bundles in matsuriF2CorrectionFiles order
```

## Implementation

Updated:

```text
scripts/check-matsuri-bundle-inventory.mjs
.github/workflows/verify-matsuri-bundle-inventory.yml
docs/matsuri-correction-contract.md
```

The inventory checker now:

1. parses each Matsuri F1 and F2 JSON import with its local identifier,
2. preserves the existing set-level inventory and file-existence checks,
3. parses the actual `additiveBundles` and `correctionBundles` array initializers,
4. rejects duplicate identifiers and non-identifier expressions,
5. resolves each identifier to its repository-relative bundle path,
6. compares the resolved arrays to the canonical loader declarations without sorting.

## Failure conditions

The check rejects:

- a missing, extra, duplicate, or nonexistent bundle,
- F1 or maintenance bundles applied outside declared order,
- maintenance bundles placed before or interleaved with F1 bundles,
- correction bundles applied outside `matsuriF2CorrectionFiles` order,
- an array entry that is not a direct imported bundle identifier,
- an identifier that does not resolve to an imported Matsuri F1 or F2 bundle.

## Verified baseline

```text
F1 batches                    11
Maintenance bundles            8
Correction bundles             5
Additive application slots    19
Correction application slots   5
Public record changes           0
```

F2-P11 changes verification infrastructure only. It does not reorder current bundles or alter any public record.

## Repository gate

The strengthened command remains:

```text
pnpm check:matsuri:bundle-inventory
```

It runs inside:

```text
pnpm gate:matsuri:repository
```

The dedicated workflow remains:

```text
Verify Matsuri bundle inventory
```

## Hosted verification

Implementation head:

```text
921641cb6ca7bcfc45ca712d8d056c3d1eac2b13
```

Successful runs:

```text
Bundle inventory and order   29630494012 — success
Repository CI                29630494013 — success
```

The repository CI completed the full launch-readiness gate, including the strengthened bundle check, correction contract, public build, browser verification, pending Analytics boundary, blocked Jinja boundary, and release-candidate freeze.

Release artifact:

```text
Artifact ID   8425297044
Digest        sha256:f83b569a5c95dacecfd32ac5bef7f12bd30f4b1bae7614b72dc7296eec78196d
```

## Boundaries

F2-P11 does not:

- change public facts, classifications, or record versions,
- introduce partial correction patches,
- activate F2-25 through F2-28,
- alter the blocked Jinja start gate,
- create a future-site application,
- add dynamic storage, ingestion, API, MCP, or billing infrastructure.
