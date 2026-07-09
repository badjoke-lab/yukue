# Project Roadmap

**Status:** Current phase-and-gate roadmap

This roadmap uses phases and gates rather than fixed daily deadlines.

## Phase 0 — Foundation

Goal: monorepo, portal skeleton, Matsuri skeleton, shared package skeletons, CI baseline.

Status: **Completed**

## Phase 1 — Project Reference Documents

Goal: repository documentation index, product specification, data model reference, Matsuri MVP specification, information architecture, technical architecture, roadmap, verification policy, source policy, image policy, decision log, and project status.

Gate: public-safe project references are available in the repository and used during implementation.

Status: **In progress**

## Phase 2 — UI Direction Review

Goal:

```text
Home H1 mockups
Detail C mockups
desktop comparison
mobile comparison
visual direction decision
```

Gate: visual direction accepted.

Status: **Next**

## Phase 3 — Data Core

Implementation:

```text
common schemas
Matsuri extensions
Place schema
Image Asset schema
validation
sample canonical data
```

Gate: schema validation, referential integrity, and sample-data validation pass.

## Phase 4 — Public Projection

Implementation: Public Projection pipeline, public JSON, JSON-LD baseline, manifest, version, llms.txt, ai.txt, and sitemap.

Gate: HTML/JSON consistency, projection leak check, and machine-readable checks pass.

## Phase 5 — UI Foundation

Implementation: design tokens, typography, layout primitives, navigation shell, state presentation, timeline pattern, evidence presentation, image gallery/lightbox, and map treatment.

Gate: desktop, mobile, and accessibility baselines pass.

## Phase 6 — Matsuri MVP Surfaces

Implement accepted Home and detail structures, browse surfaces, search, Changes, Methodology, Data, and Status.

## Phase 7 — Search and Browse

Implement Pagefind, type filter, prefecture filter, state filter, and zero-result behavior.

## Phase 8 — Initial Corpus Expansion

Expand reviewed entities, occurrences, changes, relations, and evidence while monitoring review burden and model fit.

## Phase 9 — Launch Preparation

Deploy to Cloudflare, connect domain, validate canonical URLs and sitemap, confirm indexing, add analytics baseline, and publish public documentation.

## Phase 10 — Stabilization

Observe indexation, search impressions, organic clicks, search queries, zero-result searches, corrections, source clicks, AI referral signs, public JSON access, research inquiries, media inquiries, and API interest.

## Phase 11 — Next-site Gate

Review Matsuri maintenance burden, shared package reuse, cross-site seed quality, relation value, update pace, and external demand before adding the next public site application.
