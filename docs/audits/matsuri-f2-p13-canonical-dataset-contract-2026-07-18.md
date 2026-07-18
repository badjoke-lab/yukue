# F2-P13 Matsuri Canonical Dataset Contract Audit

**Date:** 2026-07-18  
**Status:** Passed  
**Scope:** Shared canonical dataset assembly and repository gate preservation only

## Purpose

F2-P12 removed the duplicated correction function, but the canonical Node loader and Astro HTML Public Projection still assembled the twelve Matsuri record families independently.

Each consumer separately combined D1 records, F1 batches, maintenance bundles, and correction bundles. The bundle inventory and order gates proved that the same files were present in the same order, but they did not remove the possibility that one consumer could map a family incorrectly, omit additive records for one family, or bypass duplicate-ID validation when no corrections existed.

F2-P13 removes that remaining assembly duplication.

## Shared assembler

Added:

```text
apps/matsuri/src/data/matsuri-canonical-dataset.mjs
apps/matsuri/src/data/matsuri-canonical-dataset.d.mts
```

The shared assembler owns:

- the twelve accepted record-family names,
- family labels used by correction diagnostics,
- additive bundle extraction,
- correction bundle extraction,
- base + additive accumulation,
- ordered full-record correction application,
- final family ordering.

Consumers:

```text
apps/matsuri/scripts/load-matsuri-dataset.mjs
apps/matsuri/src/data/matsuri-projection.ts
```

Both consumers now provide only their D1 base arrays and ordered bundle arrays. They call the same `buildMatsuriCanonicalDataset()` implementation.

## Duplicate-ID hardening

`applyMatsuriRecordOverrides()` previously returned before building its stable-ID map when a family had no corrections. A duplicate ID in the accumulated base and additive records was therefore not rejected by that helper unless the same family also had a correction record.

F2-P13 moves the no-correction return after stable-ID validation. Duplicate accumulated IDs now fail for every family, with or without corrections.

## Contract

Added:

```text
scripts/check-matsuri-canonical-dataset-contract.mjs
.github/workflows/verify-matsuri-canonical-dataset-contract.yml
pnpm check:matsuri:canonical-dataset-contract
```

The contract verifies:

1. the shared assembler and its declaration exist,
2. all twelve families are assembled through one function,
3. base order is preserved,
4. additive records are appended in declared order,
5. corrections replace the complete record without changing list order,
6. a missing base-family array fails,
7. a non-array additive or correction family fails,
8. duplicate accumulated IDs fail even without corrections,
9. neither consumer reintroduces local bundle extraction or family assembly,
10. the actual loader returns exactly the twelve accepted families in canonical order,
11. every current family has unique final IDs.

The existing correction contract was updated to require the shared assembler to import the single correction engine.

## Verified baseline

```text
Dataset consumers              2
Shared dataset assemblers      1
Shared correction engines      1
Record families               12
F1 batches                    11
Maintenance bundles            8
Additive application slots    19
Correction bundles             5
Public record changes           0
```

## Initial hosted verification

Implementation head:

```text
ae83ba4f73e851224d084afe39b21f69c78b1ad5
```

Successful runs:

```text
Canonical dataset contract     29640821913 — success
Correction contract            29640822064 — success
Bundle inventory and order     29640821894 — success
Repository CI                  29640821886 — success
Canonical Search               29640821879 — success
Full-page screenshots          29640821923 — success
F2-24 indexability preflight   29640821944 — success
Analytics activation record    29640821880 — success
Future-site seed inventory     29640821887 — success
Future-site seed readiness     29640821877 — success
Jinja start-gate               29640821957 — success
```

Artifacts:

```text
Release artifact      8428563901
Release digest        sha256:187ed4f919cd5d42ccb8e4e2de037f315a311132c266bd2500c9bc25529f1dd8
Screenshot artifact   8428556898
Screenshot digest     sha256:225d8a7c5b31432579ae9bb3e329b75cde2692f04168f99df32f1a5a0840619e
```

The repository CI completed the full launch-readiness gate, including the new dataset contract, shared correction contract, exact bundle order, static build, browser checks, pending Analytics boundary, blocked Jinja boundary, and release-candidate freeze.

## Boundaries

F2-P13 does not:

- change any current public fact, classification, or record version,
- reorder F1, maintenance, or correction bundles,
- introduce partial correction patches,
- activate F2-25 through F2-28,
- alter the blocked Jinja start gate,
- create a future-site application,
- add dynamic storage, ingestion, API, MCP, or billing infrastructure.
