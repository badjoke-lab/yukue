# F2-P10 Matsuri Correction Contract Audit

**Date:** 2026-07-18  
**Status:** Passed  
**Scope:** Repository correction infrastructure and gate preservation only

## Purpose

F2-P09 introduced the first Entity correction and exposed a structural asymmetry: the canonical loader and HTML Public Projection applied correction bundles only to the record families that had already needed corrections.

That behavior was correct for the current data, but it left a future failure mode. A later Place, State Snapshot, Change Event, Relation, Source, Image, or other correction could be added to an imported correction bundle while one or both consumers silently retained the older record.

F2-P10 removes that family-specific gap and makes correction coverage explicit and machine-enforced.

## Implementation

Both consumers now apply ordered corrections to all accepted record families:

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

Changed consumers:

```text
apps/matsuri/scripts/load-matsuri-dataset.mjs
apps/matsuri/src/data/matsuri-projection.ts
```

The canonical loader exports the family inventory and uses one generic correction pass over the complete base dataset. The HTML Public Projection uses `correctedRecords()` for every family instead of only Entity, Occurrence, and Evidence.

## Contract check

Added:

```text
scripts/check-matsuri-correction-contract.mjs
pnpm check:matsuri:correction-contract
.github/workflows/verify-matsuri-correction-contract.yml
```

The contract rejects:

- correction bundle keys outside the accepted family inventory,
- non-array family values,
- missing or empty record IDs,
- non-positive or non-integer `record_version`,
- repeated corrections whose versions do not increase in bundle order,
- a correction that does not replace an existing stable ID,
- canonical output that differs from the last correction record,
- a Public Projection family that bypasses `correctedRecords()`.

The helper is also exercised with a synthetic complete-record replacement for each of the twelve families.

## Current correction inventory

Before F2-P10, the repository contains:

```text
Correction bundles          5
Correction records          6
Corrected logical IDs       5
Currently corrected families
  Entity                    1 ID
  Occurrence                3 IDs
  Evidence                  1 ID
```

F2-P10 does not alter those records or their public values. It expands the enforced correction path for future approved corrections.

## Repository gate

The correction check is inserted after bundle-inventory validation in:

```text
pnpm gate:matsuri:repository
```

The dedicated workflow runs on relevant pull requests, main pushes, and manual dispatch.

## Hosted verification

Implementation head:

```text
e679800617b70eda2d3734c9cd3bff8ddc8e29c0
```

Successful GitHub Actions runs:

```text
CI                                      29624424628
Correction contract                     29624424672
Bundle inventory                        29624424631
Canonical Search                        29624424630
F2-24 indexability preflight            29624424636
Full-page screenshots                   29624424660
Analytics activation record             29624424642
Future-site seed inventory              29624424673
Future-site seed readiness              29624424655
Jinja start-gate                        29624424653
```

Generated evidence:

```text
Release candidate artifact        8423354099
Release candidate digest          sha256:9a46f79c8270e1ac40db4fa0b35699dc46acb67e8fb0aebb05867238cd5a36ba
Screenshot artifact               8423349387
Screenshot digest                 sha256:3bc85369c9e8ffffecf7e9a1ef35652e1d76985fd58754bd8e82c63f98d624d0
```

The dedicated contract passed with all twelve declared record families, five correction bundles, five corrected logical IDs, and six ordered correction records. The integrated repository gate, public projection, Search, screenshot, seed, Analytics-pending, and Jinja-blocked baselines remained green.

## Boundaries

F2-P10 does not:

- change current Entity, State, Occurrence, Relation, Source, or Evidence facts,
- convert correction records into partial patches,
- infer or generate missing records,
- activate F2-25 through F2-28,
- change the blocked Jinja start gate,
- add a future-site application,
- add dynamic storage, ingestion, API, MCP, or billing infrastructure.
