# Matsuri Repository Baseline

**Status:** Machine-checked current maintenance record

## Purpose

The repository contains historical audit documents whose counts correctly describe the state at the time of each audit. Those historical values must not be rewritten whenever a later maintenance bundle is added.

The compact current baseline is therefore stored separately in:

```text
config/matsuri-repository-baseline.json
```

It records only values that must describe the current canonical repository state.

`docs/project-status.md` records the current phase, blockers, boundaries, and next actions. It must reference the machine baseline instead of duplicating exact current count or boundary values.

This document explains the contract but deliberately does not repeat the current count or boundary values. The JSON record is the only current-value source.

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
docs/matsuri-repository-baseline.md
```

It rejects:

- stale F1, maintenance, or correction bundle totals,
- stale additive or correction application-slot totals,
- stale correction-record or corrected-logical-ID totals,
- stale public Entity or external-link-gap totals,
- false F2-25 through F2-28 boundary state,
- false Jinja start-gate or Jinja State Snapshot state,
- missing, extra, negative, or malformed baseline fields,
- invalid calendar days in the machine baseline or Project Status update marker,
- a project status that omits the machine baseline or current blocked-gate markers,
- exact current count tables duplicated into either narrative status document.

## Current values

Read the exact current values from:

```text
config/matsuri-repository-baseline.json
```

Then run the verifier. A successful result confirms that the stored counts and boundaries still match the canonical loader, correction bundles, public Entity projection, Analytics record, Jinja start-gate record, and narrative-document boundaries.

No prose table in this file is authoritative. This prevents an explanatory document from silently retaining an older count after the machine baseline changes.

## Update rule

When a reviewed maintenance or correction bundle changes a derived value, update `config/matsuri-repository-baseline.json` in the same pull request. The repository gate must fail when the file is not updated.

Update `observed_on` with a valid calendar day when the machine baseline itself is reviewed or changed.

Historical audit documents keep their original verified counts. Narrative current-status documents may summarize the repository position, but they must not copy the exact current baseline table.

## Boundaries

This baseline does not activate Analytics, complete F2-25 through F2-28, authorize Jinja work, define a Jinja State vocabulary, or publish a future specialist site.
