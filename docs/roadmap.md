# Project Roadmap

**Status:** Current phase-and-gate roadmap

This roadmap uses phases and gates rather than fixed daily deadlines.

Detailed implementation order is defined in `development-schedule.md`. Current position is defined in `project-status.md`.

## Phase 0 — Foundation

Goal: monorepo, portal skeleton, Matsuri skeleton, shared package skeletons, and CI baseline.

Status: **Completed**

## Phase 1 — Project Reference Documents

Goal: repository documentation index, product specification, data model reference, Matsuri MVP specification, information architecture, technical architecture, roadmap, verification policy, source policy, image policy, decision log, and project status.

Gate: public-safe project references are available in the repository and used during implementation.

Status: **Completed**

## Phase 2 — UI Direction Review

Goal:

```text
Home H1 direction
Detail C direction
desktop and mobile interpretation
visual direction decision
design tokens
shared UI foundation specification
```

Gate: visual direction accepted and implementation-ready.

Status: **Completed**

## Phase 3 — Data Core

Implementation:

```text
common schemas
Matsuri extensions
Place schema
Image Asset schema
cross-record validation
representative canonical data
```

Gate: schema validation, referential integrity, semantic invariants, and representative sample validation pass.

Status: **Completed**

## Phase 4 — Public Projection

Implementation: Public Projection pipeline, HTML-facing views, public JSON-facing views, projection leak checks, and deterministic output ordering.

Gate: approved-only projection, Current State derivation, referential consistency, and private-field leak checks pass.

Status: **Completed**

## Phase 5 — UI Foundation

Implementation: design tokens, typography, layout primitives, navigation shell, state presentation, timeline pattern, evidence presentation, image gallery/lightbox, and map treatment.

Gate: desktop, mobile, and accessibility baselines pass for the initial shared patterns.

Status: **Completed**

## Phase 6 — Matsuri MVP Surfaces

Implementation: accepted Home H1 and Detail C structures, public reference surfaces, and secondary browse support.

Gate: Projection-backed public surfaces render without fixture-only public claims or invented routes.

Status: **Completed**

## Phase 7 — Search, Browse, and Machine-readable Layer

Implementation:

```text
Festival browse
Folk Performance browse
Organization browse
Region browse
Change browse
Current State browse
Pagefind full-text search
Entity Type filter
Prefecture filter
Current State filter
public JSON feeds
manifest
version.json
llms.txt
ai.txt
sitemap
```

Gate: public discovery outputs derive from approved Public Projection and remain mutually consistent.

Status: **Completed**

## Phase 8 — Initial Corpus Expansion

Goal: expand reviewed Entities, Occurrences, Change Events, Relations, Designations, Sources, and Evidence without maximizing shallow Entity count.

Gate: balanced coverage across identity, State, history, relation, and evidence layers.

Status: **Completed through F1 batches 01–10**

## Phase 9 — Launch Preparation

Phase 9 is implemented as F2 work packages.

### Repository launch baselines

```text
F2-01  Pages build and artifact contract
F2-02  public reference and secondary browse surfaces
F2-03  deployed and canonical verification tooling
F2-04  deployment verifier hardening
F2-05  analytics policy baseline
```

Status: **Completed**

### Repository-only launch readiness

```text
F2-06  schedule and status realignment
F2-07  unified release verification command
F2-08  static route and internal-link integrity
F2-09  HTML, JSON, Search, and sitemap consistency
F2-10  public data semantic audit
F2-11  Source and Evidence audit
F2-12  full responsive and accessibility audit
F2-13  public content, empty-state, and image-boundary audit
F2-14  release-candidate artifact freeze
F2-15  repository Launch Readiness Gate
```

Status: **In progress — F2-06 active**

### External deployment and production verification

```text
F2-16  Cloudflare Pages project connection
F2-17  first deployment and reachable URL
F2-18  deployed-origin smoke verification
F2-19  canonical origin and domain decision
F2-20  canonical-origin configuration and redeployment
F2-21  canonical manifest and sitemap verification
F2-22  browser Search verification
F2-23  crawler-reachability review
F2-24  sitemap submission and indexability check
F2-25  Web Analytics activation
F2-26  post-activation deployment
F2-27  production traffic verification
F2-28  final F2 Launch Gate
```

Status: **Operational hold**

The hold does not block F2-06 through F2-15. F2-16 or later becomes active only after an explicit governing-document update removes the hold.

## Phase 10 — Stabilization

After F2-28, observe:

- indexation,
- search impressions,
- organic clicks,
- search queries,
- zero-result searches,
- corrections,
- source clicks,
- AI referral signs,
- public JSON access,
- research inquiries,
- media inquiries,
- API interest,
- maintenance burden.

Status: **Not started**

## Phase 11 — Next-site Gate

Review Matsuri maintenance burden, shared package reuse, cross-site seed quality, relation value, update pace, and external demand before adding the next public site application.

Status: **Deferred until stabilization evidence exists and an explicit gate review is completed**
