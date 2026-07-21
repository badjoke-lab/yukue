# Matsuri Repository Baseline

**Status:** Machine-checked current maintenance record

## Purpose

The repository contains historical audit documents whose counts correctly describe the state at the time of each audit. Those historical values must not be rewritten whenever a later maintenance bundle is added.

The compact current baseline is therefore stored separately in:

```text
config/matsuri-repository-baseline.json
```

It records only values that must describe the current canonical repository state.

`docs/project-status.md` records the current phase, blockers, boundaries, and next actions. It must reference the machine baseline instead of duplicating exact current count tables.

## Verification

Run the focused verifier directly:

```text
node scripts/check-matsuri-repository-baseline.mjs
```

The verifier is also executed by:

```text
pnpm check:matsuri:bundle-inventory
pnpm gate:matsuri:repository
```

The verifier derives or validates current values and status markers from:

```text
apps/matsuri/scripts/load-matsuri-dataset.mjs
data/public/matsuri/f2/corrections-*.json
config/matsuri-analytics-activation.json
config/jinja-start-gate.json
docs/project-status.md
```

It rejects:

- stale F1, maintenance, or correction bundle totals,
- stale additive or correction application-slot totals,
- stale correction-record or corrected-logical-ID totals,
- stale public Entity or external-link-gap totals,
- false F2-25 through F2-28 boundary state,
- false Jinja start-gate or Jinja State Snapshot state,
- missing, extra, negative, or malformed baseline fields,
- a project status that omits the machine baseline or current blocked-gate markers,
- exact current count tables duplicated into `docs/project-status.md`.

## Current baseline

```text
F1 batches                         11
Maintenance bundles                13
Correction bundles                  8
Additive application slots         24
Correction application slots        8
Correction records                 16
Corrected logical IDs              14
Public Entities                    44
Entities without external links     0
```

```text
F2-25 owner access                 pending
F2-26 through F2-28                blocked
Jinja start gate                   blocked
Approved Jinja State Snapshots     0
```

## Update rule

When a reviewed maintenance or correction bundle changes a derived value, update `config/matsuri-repository-baseline.json` in the same pull request. The repository gate must fail when the file is not updated.

Historical audit documents keep their original verified counts. `docs/project-status.md` may summarize current position, but the JSON record and verifier remain the exact current count and boundary source.

Do not copy the current baseline table into `docs/project-status.md`. Link to the JSON and this document instead.

## Boundaries

This baseline does not activate Analytics, complete F2-25 through F2-28, authorize Jinja work, define a Jinja State vocabulary, or publish a future specialist site.