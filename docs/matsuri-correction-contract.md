# Matsuri Correction Contract

**Status:** F2-P10 and F2-P11 completed / F2-P12 shared-engine verification pending

## Purpose

Matsuri public data is append-only at the batch-file level. When an approved record must be corrected, the original D1, F1, or maintenance file remains unchanged and a later correction bundle replaces the complete logical record by stable ID.

F2-P10 makes that behavior uniform for every public record family and adds a machine-enforced contract so that a newly introduced correction cannot be silently ignored by either canonical consumer.

F2-P11 makes bundle application order part of the same contract. Importing the correct file set is insufficient: the HTML Public Projection must apply F1 batches, maintenance bundles, and correction bundles in the same declared order as the canonical loader.

F2-P12 removes the remaining duplicated correction implementation. The canonical loader and HTML Public Projection must import one shared correction engine instead of maintaining equivalent local functions.

## Correctable record families

```text
entities
places
stateSnapshots
changeEvents
occurrences
occurrenceSeries
recurrencePatterns
relations
designations
sources
evidence
images
```

Both canonical consumers must route all twelve families through ordered correction handling:

```text
apps/matsuri/scripts/load-matsuri-dataset.mjs
apps/matsuri/src/data/matsuri-projection.ts
```

## Shared correction engine

The only correction implementation is:

```text
apps/matsuri/src/data/matsuri-record-overrides.mjs
```

Type information for the Astro and TypeScript consumer is declared in:

```text
apps/matsuri/src/data/matsuri-record-overrides.d.mts
```

The canonical loader imports and re-exports the shared function for existing script consumers. The HTML Public Projection imports the same module directly. Neither consumer may define a local correction function.

This single-engine rule prevents future semantic drift such as one consumer accepting a missing stable ID, allowing a non-increasing version, handling duplicate base IDs differently, or producing a different replacement result.

## Correction semantics

A correction is a complete record replacement, not a partial object merge.

For each corrected record:

1. the stable `id` must already exist in the accumulated D1, F1, maintenance, or earlier-correction dataset,
2. `record_version` must be a positive integer,
3. `record_version` must be greater than the previous version of the same logical record,
4. correction bundles are applied in the exact order declared by `matsuriF2CorrectionFiles`,
5. the final canonical record must equal the last correction record exactly,
6. correction records do not create a second record or change list order,
7. duplicate stable IDs in the base record list are rejected when a family enters correction handling,
8. an empty or omitted family array makes no change.

A correction bundle may omit unused family keys. Any present key must name one of the twelve accepted families and contain an array.

## Bundle application order

The canonical loader declarations are authoritative:

```text
matsuriF1BatchFiles
matsuriF2MaintenanceFiles
matsuriF2CorrectionFiles
```

The HTML Public Projection must preserve these sequences exactly:

```text
additiveBundles
  all matsuriF1BatchFiles in declared order
  followed by all matsuriF2MaintenanceFiles in declared order

correctionBundles
  all matsuriF2CorrectionFiles in declared order
```

Import declaration order is not treated as application order. The machine check reads the actual array initializers and resolves each imported identifier back to its repository path.

The projection arrays may contain imported bundle identifiers only. Reordering, duplication, omission, an extra import, a nonexistent file, or an expression in place of a direct bundle identifier fails the gate.

## Why the complete replacement, order, and shared-engine rules are required

Complete replacement keeps each public record auditable as a versioned object. It avoids hidden inheritance from an older record, prevents deleted fields from surviving accidentally, and makes the final canonical state reproducible from the declared bundle order.

Order parity prevents two canonical consumers from applying the same file set with different semantics. This is especially important when one stable ID has more than one approved correction version.

A shared engine prevents the two consumers from gradually implementing different validity checks or replacement behavior while current data still happens to produce the same visible output.

## Machine checks

```text
pnpm check:matsuri:correction-contract
pnpm check:matsuri:bundle-inventory
```

The correction check validates:

- correction bundle paths declared by the canonical loader exist,
- correction bundle keys use only accepted record families,
- every correction record has a non-empty ID and positive integer `record_version`,
- repeated corrections for one ID increase versions in bundle order,
- one shared override helper performs exact full-record replacement for all twelve families,
- missing stable IDs, non-increasing versions, and duplicate base IDs are rejected,
- both consumers import the shared helper,
- neither consumer contains a local correction implementation,
- the canonical loader returns every family and exposes the final correction,
- the HTML Public Projection routes every family through `correctedRecords()`.

The bundle check validates:

- canonical loader and HTML Public Projection import the same F1 and F2 bundle inventory,
- every declared bundle path exists,
- `additiveBundles` preserves F1-then-maintenance order,
- `correctionBundles` preserves declared correction order,
- array entries are unique direct imported identifiers.

Both commands run inside the repository launch-readiness gate and in dedicated GitHub Actions workflows:

```text
Verify Matsuri correction contract
Verify Matsuri bundle inventory
```

## Hosted verification

### F2-P10

```text
Implementation head       e679800617b70eda2d3734c9cd3bff8ddc8e29c0
Correction contract run   29624424672 — success
Repository CI run         29624424628 — success
Screenshot run            29624424660 — success
```

### F2-P11

```text
Implementation head       921641cb6ca7bcfc45ca712d8d056c3d1eac2b13
Bundle inventory run      29630494012 — success
Repository CI run         29630494013 — success
Release artifact          8425297044
Release digest            sha256:f83b569a5c95dacecfd32ac5bef7f12bd30f4b1bae7614b72dc7296eec78196d
```

### F2-P12

Pending hosted verification for the shared-engine implementation branch.

See:

```text
docs/audits/matsuri-f2-p10-correction-contract-2026-07-18.md
docs/audits/matsuri-f2-p11-bundle-order-contract-2026-07-18.md
docs/audits/matsuri-f2-p12-shared-correction-engine-2026-07-18.md
```

## Failure examples

The gate fails when:

- a correction attempts to create a new stable ID,
- a version is unchanged or lower,
- corrected base records contain a duplicate stable ID,
- a bundle contains an unknown family,
- a present family value is not an array,
- the final canonical dataset does not equal the last correction record,
- either consumer stops importing the shared correction engine,
- either consumer reintroduces a local correction implementation,
- a Public Projection family bypasses correction handling,
- the projection has the correct bundle files but applies them in another order,
- `additiveBundles` places maintenance before F1 or interleaves the sequences,
- `correctionBundles` differs from `matsuriF2CorrectionFiles` order.

## Boundaries

F2-P10 through F2-P12 change correction and bundle-verification infrastructure only. They do not:

- alter any current public fact or classification,
- infer missing data,
- activate F2-25 through F2-28,
- create the Jinja application or define shrine State,
- change the series topology,
- add dynamic storage, ingestion, API, or billing infrastructure.
