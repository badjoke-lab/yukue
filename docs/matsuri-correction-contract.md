# Matsuri Correction and Canonical Dataset Contract

**Status:** F2-P10 through F2-P13 completed

## Purpose

Matsuri public data is append-only at the batch-file level. When an approved record must be corrected, the original D1, F1, or maintenance file remains unchanged and a later correction bundle replaces the complete logical record by stable ID.

The contract evolved in four bounded steps:

- **F2-P10** made ordered complete-record corrections available to all twelve record families.
- **F2-P11** made exact bundle application order machine-enforced.
- **F2-P12** replaced two local correction functions with one shared correction engine.
- **F2-P13** replaced two local twelve-family assembly paths with one shared canonical dataset assembler and extended duplicate-ID validation to families with no corrections.

## Record families

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

The accepted family names and final family order are defined once in:

```text
apps/matsuri/src/data/matsuri-canonical-dataset.mjs
```

## Canonical consumers

```text
apps/matsuri/scripts/load-matsuri-dataset.mjs
apps/matsuri/src/data/matsuri-projection.ts
```

The Node loader reads canonical JSON through the filesystem. The Astro projection imports the same JSON statically. Both consumers provide their D1 base arrays and ordered bundle arrays to the same `buildMatsuriCanonicalDataset()` function.

Neither consumer may implement its own family loop, bundle extraction helper, correction helper, or final assembly path.

## Shared canonical dataset assembler

Implementation:

```text
apps/matsuri/src/data/matsuri-canonical-dataset.mjs
apps/matsuri/src/data/matsuri-canonical-dataset.d.mts
```

The assembler owns:

1. the twelve family names and family labels,
2. base-family validation,
3. additive bundle extraction,
4. correction bundle extraction,
5. base + additive accumulation,
6. ordered correction application,
7. final family ordering.

The base dataset must be an object containing an array for every accepted family. Additive and correction inputs must be arrays of bundle objects. A present family value in a bundle must be an array.

## Shared correction engine

Implementation:

```text
apps/matsuri/src/data/matsuri-record-overrides.mjs
apps/matsuri/src/data/matsuri-record-overrides.d.mts
```

The assembler imports this engine. The canonical consumers do not implement or import an alternative correction function.

For every family, the engine:

1. builds a stable-ID map for the accumulated base and additive records,
2. rejects duplicate accumulated IDs even when the family has no corrections,
3. rejects a correction for a missing stable ID,
4. rejects an unchanged or lower `record_version`,
5. replaces the complete record object,
6. preserves accumulated list order,
7. returns the original accumulated array when no correction exists after validation.

## Complete replacement semantics

A correction is a complete record replacement, not a partial object merge.

For each corrected record:

1. the stable `id` must already exist in the accumulated D1, F1, maintenance, or earlier-correction dataset,
2. `record_version` must be a positive integer,
3. `record_version` must be greater than the previous version of the same logical record,
4. correction bundles are applied in exact declared order,
5. the final canonical record equals the last correction record exactly,
6. correction records do not create a second record or change list order,
7. an empty or omitted family array makes no change.

A correction bundle may omit unused family keys. Any present key must name one of the twelve accepted families and contain an array.

## Bundle application order

The canonical loader declarations remain authoritative:

```text
matsuriF1BatchFiles
matsuriF2MaintenanceFiles
matsuriF2CorrectionFiles
```

The HTML Public Projection must preserve:

```text
additiveBundles
  all matsuriF1BatchFiles in declared order
  followed by all matsuriF2MaintenanceFiles in declared order

correctionBundles
  all matsuriF2CorrectionFiles in declared order
```

Import declaration order is not treated as application order. The bundle gate reads the actual array initializers and resolves each imported identifier to its repository path.

## Why these rules are required

Complete replacement keeps each public record auditable as a versioned object. It prevents deleted fields from surviving accidentally and makes the final record reproducible.

Exact order parity prevents two consumers from applying the same files with different semantics.

One correction engine prevents missing-ID, version, duplicate-ID, and replacement behavior from drifting between consumers.

One canonical dataset assembler prevents family mapping, additive accumulation, and correction routing from drifting while current public output still happens to look correct.

## Machine checks

```text
pnpm check:matsuri:bundle-inventory
pnpm check:matsuri:canonical-dataset-contract
pnpm check:matsuri:correction-contract
```

### Bundle inventory and order

The bundle check validates:

- loader and Projection import the same F1 and F2 inventory,
- every declared bundle path exists,
- `additiveBundles` preserves F1-then-maintenance order,
- `correctionBundles` preserves declared correction order,
- array entries are unique direct imported identifiers.

### Canonical dataset contract

The dataset check validates:

- the assembler and declaration exist,
- both consumers call the shared assembler,
- all twelve families use the shared family order,
- base order and additive order are preserved,
- exact correction replacement remains intact,
- missing base families fail,
- non-array additive and correction family values fail,
- duplicate accumulated IDs fail with or without corrections,
- local bundle extraction or assembly logic is not reintroduced,
- the actual loader returns exactly the accepted families with unique final IDs.

### Correction contract

The correction check validates:

- correction bundle paths exist,
- correction bundle keys use accepted families only,
- every correction record has a non-empty ID and positive integer version,
- repeated corrections increase versions in bundle order,
- the shared assembler imports the shared correction engine,
- complete replacement works for all twelve families,
- missing IDs, non-increasing versions, and duplicate accumulated IDs fail,
- the actual loader exposes each final correction record.

All three commands run inside:

```text
pnpm gate:matsuri:repository
```

Dedicated workflows:

```text
Verify Matsuri bundle inventory
Verify Matsuri canonical dataset contract
Verify Matsuri correction contract
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

```text
Implementation head       c643560be3c9b08375bd5e9ca9770684e936d2fd
Correction contract run   29635048023 — success
Bundle inventory run      29635048060 — success
Repository CI run         29635048032 — success
Screenshot run            29635048050 — success
Release artifact          8426823296
Release digest            sha256:71e24fa155be7cff3e5366592179ddfddaa3e2ef6dbd17a76dbb8d8ee91800cc
Screenshot artifact       8426817176
Screenshot digest         sha256:8498f410ae47d0ee0c97e682e8c4248b1a564af6d3cb8d5cd8ff81992a5ad758
```

### F2-P13

```text
Implementation head       ae83ba4f73e851224d084afe39b21f69c78b1ad5
Dataset contract run      29640821913 — success
Correction contract run   29640822064 — success
Bundle inventory run      29640821894 — success
Repository CI run         29640821886 — success
Canonical Search run      29640821879 — success
Screenshot run            29640821923 — success
Release artifact          8428563901
Release digest            sha256:187ed4f919cd5d42ccb8e4e2de037f315a311132c266bd2500c9bc25529f1dd8
Screenshot artifact       8428556898
Screenshot digest         sha256:225d8a7c5b31432579ae9bb3e329b75cde2692f04168f99df32f1a5a0840619e
```

Audit records:

```text
docs/audits/matsuri-f2-p10-correction-contract-2026-07-18.md
docs/audits/matsuri-f2-p11-bundle-order-contract-2026-07-18.md
docs/audits/matsuri-f2-p12-shared-correction-engine-2026-07-18.md
docs/audits/matsuri-f2-p13-canonical-dataset-contract-2026-07-18.md
```

## Failure examples

The gate fails when:

- a base dataset omits one accepted family,
- a present additive or correction family is not an array,
- accumulated D1, F1, or maintenance records contain a duplicate stable ID,
- a correction attempts to create a new stable ID,
- a version is unchanged or lower,
- a correction bundle contains an unsupported family,
- the final canonical record differs from the last correction record,
- either consumer reintroduces local family assembly or correction logic,
- the correct bundle files are applied in the wrong order,
- the loader returns a different family inventory or order.

## Boundaries

F2-P10 through F2-P13 change canonical dataset, correction, and verification infrastructure only. They do not:

- alter any current public fact, classification, or record version,
- infer missing data,
- activate F2-25 through F2-28,
- create the Jinja application or define shrine State,
- change the series topology,
- add dynamic storage, ingestion, API, MCP, or billing infrastructure.
