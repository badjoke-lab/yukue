# Project Status

**Last updated:** 2026-07-11

## Current phase

```text
Execution Stage F — Launch Preparation
```

## Current gate state

```text
F2-15 — Repository Launch Readiness Gate — completed
F2-16–F2-28 — External deployment and production verification — Operational hold
```

`祭のゆくえ` has completed repository-side launch preparation. The reviewed data, static application, Search artifact, machine-readable output, internal navigation, semantic rules, Evidence, public content, browser behavior, and release-candidate artifact pass the unified repository gate.

This does **not** mean that a public production deployment exists.

## Completed implementation

### Foundation and reference layer

- Yukue Series monorepo,
- portal and Matsuri application foundations,
- shared package foundations,
- GitHub Actions baseline,
- public project reference documents,
- repository `AGENTS.md` hierarchy,
- Home H1 Search First Hybrid,
- Detail C Integrated Overview,
- Basic Profile + Observation product model,
- static-first architecture,
- real-image-only policy,
- map-ready Place model,
- Mincho-only public typography direction,
- four-site accent palette.

Palette:

```text
祭のゆくえ      #284B63
神社のゆくえ    #A33A32
寺院のゆくえ    #684B78
弔いのゆくえ    #486457
```

### Stages A through E

```text
Stage A  shared UI foundation
Stage B  Matsuri Home and representative Detail surfaces
Stage C  schemas and cross-record validation
Stage D  representative canonical data and Public Projection
Stage E  Browse, Pagefind Search, and machine-readable baseline
```

### F1 corpus expansion

F1 batches 01 through 10 are completed and validated.

The corpus covers:

- Festivals,
- Folk Performances,
- Tradition Units,
- Organizations,
- Shrine context seeds,
- Current State Snapshots,
- held, cancelled, partially held, scheduled, and unknown-outcome Occurrences,
- Change Events,
- precise Relations,
- Designations,
- Sources and Evidence.

Current State remains separate from annual Occurrence outcomes. Revival remains a Change Event and State transition rather than a normal `revived` Current State value.

### F2 repository launch preparation

```text
F2-01  Pages build and artifact contract — completed
F2-02  public reference and secondary browse surfaces — completed
F2-03  deployed and canonical verification tooling — completed
F2-04  deployment verifier hardening — completed
F2-05  analytics policy baseline — completed
F2-06  schedule and status realignment — completed
F2-07  unified release verification — completed
F2-08  static route and internal-link integrity — completed
F2-09  HTML, JSON, Search, and sitemap consistency — completed
F2-10  public data semantic audit — completed
F2-11  Source and Evidence audit — completed
F2-12  responsive and accessibility browser audit — completed
F2-13  public content, empty-state, and image-boundary audit — completed
F2-14  release-candidate artifact freeze — completed
F2-15  Repository Launch Readiness Gate — completed
```

## Repository gate command

```text
pnpm gate:matsuri:repository
```

The gate runs:

```text
pnpm verify:release
pnpm freeze:matsuri:release
node scripts/check-matsuri-readiness-gate.mjs
```

The verified repository contract includes:

- workspace build,
- shared checks and typechecks,
- exact Matsuri Pages build,
- static route and internal-link checks,
- sitemap inventory checks,
- HTML / JSON / Search consistency,
- corpus semantic audit,
- Source and Evidence audit,
- Current State freshness checks,
- public-content and image-boundary audit,
- 20 public routes across desktop, tablet, and mobile Chromium,
- automated WCAG A/AA checks on desktop and mobile,
- release-candidate freeze,
- per-file and aggregate SHA-256 verification.

## Current public artifact shape

The repository-ready static candidate contains:

```text
20 public HTML routes
Pagefind static Search artifact
9 machine-readable baseline files
version and manifest metadata
public Entity, Event, Relation, and Occurrence feeds
llms.txt
ai.txt
sitemap.xml
```

The exact file count, byte count, route list, record counts, and SHA-256 values are generated for each candidate in:

```text
.release-candidate/release-candidate.json
```

CI uploads the verified candidate as a 30-day workflow artifact.

## Current external state

```text
Cloudflare Pages project       not created or connected by this schedule
public deployment URL          not issued
canonical production origin    not configured
production Search              not browser-verified
crawler reachability           not verified
search-engine indexability     not verified
Web Analytics                  not enabled
production traffic             not verified
```

The public Status page states these boundaries explicitly.

## External work under Operational hold

```text
F2-16  create or connect the Cloudflare Pages project
F2-17  first Pages deployment and reachable URL acquisition
F2-18  deployed-origin smoke verification
F2-19  canonical public origin and domain decision
F2-20  configure MATSURI_PUBLIC_ORIGIN and redeploy
F2-21  canonical manifest and sitemap verification
F2-22  production browser Pagefind Search verification
F2-23  robots, canonical, sitemap, and crawler-reachability review
F2-24  sitemap submission and indexability check
F2-25  enable Cloudflare Web Analytics
F2-26  deploy after Analytics activation
F2-27  verify production traffic
F2-28  final F2 Launch Gate
```

Do not select F2-16 or later as active work until an explicit governing-document update removes the hold.

## Work allowed while held

- approved factual corrections,
- Current State freshness updates,
- Occurrence outcome corrections after scheduled dates pass,
- Source and Evidence maintenance,
- security or dependency maintenance,
- repairs required to keep the repository gate green,
- regeneration of the release candidate after an accepted public change.

Do not invent additional prelaunch product scope merely because external deployment remains held.

## Not committed to the MVP

- Stats,
- Compare,
- dynamic API,
- MCP,
- paid API,
- x402 billing,
- D1 canonical database,
- real-time ingestion,
- complex graph visualization.

## Next activation condition

There is no active implementation package after F2-15 while the external hold remains in force.

The next scheduled package is F2-16 only after the hold is explicitly removed. Until then, the project remains in repository-ready maintenance state.
