# Project Roadmap

**Status:** Current phase-and-gate roadmap

This roadmap uses phases and gates rather than fixed daily deadlines.

Detailed implementation order is defined in `development-schedule.md`. Current position is defined in `project-status.md`.

## Phase 0 — Foundation

Goal: monorepo, portal skeleton, Matsuri skeleton, shared packages, and CI baseline.

Status: **Completed**

## Phase 1 — Project Reference Documents

Goal: public-safe implementation references, policies, roadmap, schedule, status, and decision log.

Status: **Completed**

## Phase 2 — UI Direction Review

Goal: accepted Home H1, Detail C, visual direction, typography, palette, tokens, and UI foundation.

Status: **Completed**

## Phase 3 — Data Core

Goal: common and Matsuri schemas, cross-record validation, Place and Image contracts, and representative canonical data.

Status: **Completed**

## Phase 4 — Public Projection

Goal: approved-only deterministic HTML-facing and JSON-facing projection with private-field leak prevention.

Status: **Completed**

## Phase 5 — UI Foundation

Goal: shared responsive shell, navigation, state, history, relation, evidence, place, and image patterns.

Status: **Completed**

## Phase 6 — Matsuri MVP Surfaces

Goal: Projection-backed Home, Detail, Browse, Search, Reference, Data, Methodology, and Status surfaces.

Status: **Completed**

## Phase 7 — Search, Browse, and Machine-readable Layer

Goal: Pagefind Search, initial filters, public JSON feeds, manifest, version, discovery text, and sitemap.

Status: **Completed**

## Phase 8 — Initial Corpus Expansion

Goal: balanced reviewed coverage across identity, Current State, Occurrence history, Change Events, Relations, Designations, Sources, and Evidence.

Status: **Completed through F1 batches 01–10**

## Phase 9 — Launch Preparation

Phase 9 is implemented as F2 work packages.

### Repository baselines

```text
F2-01  Pages build and artifact contract
F2-02  public reference and secondary browse surfaces
F2-03  deployed and canonical verification tooling
F2-04  deployment verifier hardening
F2-05  analytics policy baseline
F2-06  schedule and status realignment
```

Status: **Completed**

### Repository launch readiness

```text
F2-07  unified release verification
F2-08  static route and internal-link integrity
F2-09  HTML, JSON, Search, and sitemap consistency
F2-10  public data semantic audit
F2-11  Source and Evidence audit
F2-12  responsive and accessibility browser audit
F2-13  public content, empty-state, and image-boundary audit
F2-14  release-candidate artifact freeze
F2-15  Repository Launch Readiness Gate
```

Repository Launch Readiness: **Completed**

The repository-ready candidate is reproducible, content-addressed, and verified without selecting a production origin.

### Repository visual-review maintenance

```text
F2-M01  exhaustive desktop/mobile full-page screenshot workflow
```

Status: **Completed**

The repository retains successful full-page renders, capture manifests, screenshot integrity reports, contact sheets, and desktop/mobile archives from a local GitHub Actions preview. The first exhaustive baseline captured all 20 routes on desktop and mobile and completed human visual review.

The workflow remains available for future non-trivial UI maintenance.

### External deployment and production verification

```text
F2-16  Cloudflare Pages project connection
F2-17  first deployment and reachable URL
F2-18  deployed-origin smoke verification
F2-19  canonical origin and domain decision
F2-20  canonical-origin configuration and redeployment
F2-21  canonical manifest and sitemap verification
F2-22  production browser Search verification
F2-23  crawler-reachability review
F2-24  sitemap submission and indexability check
F2-25  Web Analytics activation
F2-26  post-activation deployment
F2-27  production traffic verification
F2-28  final F2 Launch Gate
```

External deployment and production verification: **Active at F2-16**

The operational hold was removed on 2026-07-12.

Current external state:

```text
F2-16  active
F2-17–F2-28  pending in fixed order
```

The first deployment uses Cloudflare Pages Git integration, project name `matsuri-yukue`, production branch `main`, repository-root build command `pnpm build:matsuri:pages`, and output directory `apps/matsuri/dist`.

Do not enable a custom domain, canonical origin, Search indexing work, or Analytics before the corresponding gate.

## Phase 10 — Stabilization

After F2-28, observe:

- indexation,
- search impressions and organic clicks,
- Search queries and zero-result searches,
- corrections and Source access,
- AI referral signs,
- public JSON access,
- research and media inquiries,
- API interest,
- maintenance burden.

Status: **Not started — requires F2-28**

## Phase 11 — Next-site Gate

Review Matsuri maintenance burden, shared-package reuse, cross-site seed quality, relation value, update pace, and external demand before adding the next public site application.

Status: **Deferred until stabilization evidence exists and an explicit gate review is completed**
