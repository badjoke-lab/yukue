# Project Status

**Last updated:** 2026-07-12

## Current phase

```text
Execution Stage F — Launch Preparation
```

## Current gate state

```text
F2-15 — Repository Launch Readiness Gate — completed
F2-M01 — Full-page screenshot visual-review workflow — completed
F2-16 — Cloudflare Pages project connection — active
F2-17–F2-28 — pending in fixed order
```

The external operational hold was removed on 2026-07-12.

`祭のゆくえ` has completed repository-side launch preparation and the first exhaustive screenshot visual-review baseline. The active task is now the first Cloudflare Pages Git-integration setup.

This does not mean that a public deployment URL, canonical origin, production Search, crawler reachability, indexability, Web Analytics, or production traffic has been verified.

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
F2-M01 full-page screenshot visual-review workflow — completed
```

## Active package: F2-16

### Goal

Create and connect the Cloudflare Pages project for Matsuri using GitHub Git integration.

### Governing documents

```text
docs/cloudflare-pages-launch-runbook.md
docs/deployment.md
docs/technical-architecture.md
```

### Required Pages settings

```text
Project name       matsuri-yukue
Repository         badjoke-lab/yukue
Production branch  main
Framework preset   None
Root directory     repository root / blank
Build command      pnpm build:matsuri:pages
Build output       apps/matsuri/dist
Build system       v3 / current default
NODE_VERSION       24
PNPM_VERSION       11.10.0
```

Do not set `MATSURI_PUBLIC_ORIGIN` during F2-16 or the first deployment.

Do not add the Cloudflare Astro SSR adapter, Pages Functions, a custom domain, or Web Analytics.

### F2-16 completion condition

```text
GitHub repository connected
Cloudflare Pages project created
project name recorded
production branch recorded
build settings recorded
first production build started
```

The dashboard's `Save and Deploy` action may start F2-17 immediately after F2-16 setup.

## Next pending package

### F2-17 — First deployment and reachable URL

Completion requires:

```text
Cloudflare build success
production pages.dev URL issued
URL reachable
source commit recorded
build environment recorded
```

Expected project-derived hostname:

```text
https://matsuri-yukue.pages.dev
```

Do not assume this URL until Cloudflare displays and serves it.

## Deployed-origin verification capability

A manual GitHub Actions workflow is available:

```text
Verify Matsuri deployed origin
```

For F2-18 use:

```text
origin     exact issued pages.dev origin
canonical  false
```

Canonical mode remains disabled until F2-20.

## Repository gate command

```text
pnpm gate:matsuri:repository
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

A green repository gate is required before and during external activation, but it does not prove deployed behavior.

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

Current repository release status:

```text
repository-verified-external-activation-active
```

## Current external state

```text
Cloudflare Pages project       not yet verified as created
public deployment URL          not issued or recorded
canonical production origin    not configured
production Search              not browser-verified
crawler reachability           not verified
search-engine indexability     not verified
Web Analytics                  not enabled
production traffic             not verified
```

The public Status page now states that Cloudflare Pages activation has started and that the public URL remains subject to first-deployment verification.

## Remaining external sequence

```text
F2-16  Cloudflare Pages project connection — active
F2-17  first Pages deployment and reachable URL — pending
F2-18  deployed-origin smoke verification — pending
F2-19  canonical public origin and domain decision — pending
F2-20  configure MATSURI_PUBLIC_ORIGIN and redeploy — pending
F2-21  canonical manifest and sitemap verification — pending
F2-22  production browser Pagefind Search verification — pending
F2-23  robots, canonical, sitemap, and crawler-reachability review — pending
F2-24  sitemap submission and indexability check — pending
F2-25  enable Cloudflare Web Analytics — pending
F2-26  deploy after Analytics activation — pending
F2-27  verify production traffic — pending
F2-28  final F2 Launch Gate — pending
```

## Work allowed during activation

- Cloudflare Pages setup according to the runbook,
- first-deployment diagnosis,
- deployed-origin verification,
- approved factual corrections,
- Current State freshness updates,
- Occurrence outcome corrections after scheduled dates pass,
- Source and Evidence maintenance,
- security or dependency maintenance,
- repairs required to keep the repository gate green,
- screenshot capture and human visual review for non-trivial UI changes.

Do not invent additional prelaunch product scope.

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

## Immediate next action

Connect `badjoke-lab/yukue` to the Cloudflare Pages project `matsuri-yukue` using the exact settings above, then record the issued production URL and build result.
