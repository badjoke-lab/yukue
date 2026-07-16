# Matsuri Bundle Inventory Guard Audit

**Date:** 2026-07-16  
**Status:** Repository guard implemented / initial hosted verification passed

## Purpose

Maintenance batch 07 exposed that the canonical machine-readable loader and the HTML Public Projection could enumerate different additive and correction bundle sets.

The existing consistency check detected the drift only because two new Occurrences changed a visible count. An Evidence-only or Source-only maintenance batch could have remained absent from HTML without changing the occurrence count.

## Guard

```text
pnpm check:matsuri:bundle-inventory
```

The guard imports the canonical inventory arrays exported by:

```text
apps/matsuri/scripts/load-matsuri-dataset.mjs
```

It compares them with JSON imports in:

```text
apps/matsuri/src/data/matsuri-projection.ts
```

It fails on:

- a loader bundle missing from the HTML projection,
- an HTML bundle absent from the loader,
- duplicate imports,
- references to nonexistent files,
- F1, maintenance, or correction inventory drift.

The command is included in:

```text
pnpm gate:matsuri:repository
```

A dedicated path-filtered workflow also runs whenever the loaders, public Matsuri bundles, guard script, workflow, or package scripts change.

## Verified inventory

```text
F1 batches           11
Maintenance batches  7
Correction bundles   4
```

## Initial hosted verification

```text
Head       54c5dae3fb143768cbf89a7444376021cde78840
Workflow   Verify Matsuri bundle inventory
Run        29498678423
Conclusion success
```

The same head also preserved seed artifact, readiness, Analytics pending-state, Jinja start-gate, canonical Search, and F2-24 indexability checks. Full repository CI and screenshot verification are recorded in the pull request before merge.

## Boundary

This guard changes no canonical record, UI design, Entity State, future-site activation, Cloudflare configuration, or F2-25 through F2-28 claim.
