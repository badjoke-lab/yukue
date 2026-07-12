# Project Roadmap

**Status:** Current phase-and-gate roadmap

This roadmap uses phases and gates rather than fixed daily deadlines. Detailed implementation order is defined in `development-schedule.md`; current position is defined in `project-status.md`.

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
F2-01 through F2-15
```

Status: **Completed**

The repository-ready candidate is reproducible, content-addressed, and verified. The active canonical origin is now recorded separately from the origin-neutral repository artifact.

### Repository visual and data maintenance

```text
F2-M01  exhaustive desktop/mobile full-page screenshot workflow — completed
F2-M02  Matsuri data freshness audit — completed
```

F2-M02 completion result:

```text
closed-period unresolved Occurrences  0
specialist Entities with no Relation  0
stale Current State candidates        0
stale external-link candidates        0
Relations missing Evidence            0
```

### External deployment and production verification

```text
F2-16  Cloudflare Workers Builds connection
F2-17  first Workers Static Assets deployment and reachable URL
F2-18  deployed-origin smoke verification
F2-19  exact canonical Matsuri hostname decision
F2-20  Custom Domain activation, canonical build, HTTPS verification
F2-21  canonical manifest and sitemap verification
F2-22  browser Search verification on canonical origin
F2-23  crawler-reachability review
F2-24  sitemap submission and indexability check
F2-25  Web Analytics activation
F2-26  post-activation deployment
F2-27  production traffic verification
F2-28  final F2 Launch Gate
```

External deployment through F2-21: **Completed**

Browser Search verification: **Next gate at F2-22**

Verified canonical baseline:

```text
Worker                  matsuri-yukue
Canonical origin        https://matsuri-yukue.badjoke-lab.com
Verification workflow   Verify Matsuri canonical origin gate
Verification run        29191904624 — success
Successful attempt      1 of 18
Activation merge        f978bc50a1ab51964687ec0457a448dc37b2aaf9
```

The verifier confirmed HTTPS, required public routes, Pagefind asset reachability, public JSON, exact `manifest.site_origin`, and canonical sitemap locations.

The portal and Matsuri remain separate applications and Workers. The portal hostname remains planned and is not attached to the Matsuri Worker.

Pending:

```text
F2-22 through F2-28
```

F2-22 must verify interactive Pagefind queries and result navigation in a real browser. F2-23 through F2-28 remain blocked until that passes.

## Phase 10 — Stabilization

After F2-28, observe indexation, search impressions, Search queries, corrections, public JSON access, referral signs, inquiries, API interest, and maintenance burden.

Status: **Not started — requires F2-28**

## Phase 11 — Next-site Gate

Review Matsuri maintenance burden, shared-package reuse, cross-site seed quality, Relation value, update pace, and external demand before adding the next public site application.

Status: **Deferred until stabilization evidence exists and an explicit gate review is completed**
