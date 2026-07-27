# Project Roadmap

**Status:** Phase 9 completed / Phase 10 Detail C completed / Matsuri corpus expansion active / stabilization observing

## Phase 0 through Phase 8

Foundation, reference documents, UI direction, data core, Public Projection, UI foundation, initial Matsuri surfaces, Search/Browse/machine-readable layer, and the initial corpus are completed.

The post-launch Detail C review corrected an important distinction: having Entity, Relation, Evidence, and State structures internally is not enough. Those structures must be navigable and understandable in the public product.

## Phase 9 — Launch Preparation

Status: **Completed**

```text
F2-01 through F2-15 — completed
F2-P01 through F2-P13 — completed
F2-M01 and F2-M02 — completed
F2-16 through F2-28 — completed
```

The final launch gate passed at `2026-07-27T11:45:20Z` after repository, canonical-origin, Search, crawler, indexability-preflight, Analytics, baseline, privacy, and Jinja-guardrail verification.

F2-28 does not claim that any URL is indexed.

## Phase 10 — Matsuri Content Expansion and Stabilization

Status: **Active**

### Phase 10A — Detail C product completion

Status: **Completed**

The accepted Detail C specification is now enforced as a product contract:

- every primary Matsuri Entity has a real detail page,
- every title in browse and search contexts opens a real detail,
- approved Relations are understandable and navigable in both directions,
- Places have public pages and reverse record links,
- Evidence identifies the claim it supports,
- every detail has individual public JSON,
- Shrine and Temple seed references remain State-free,
- sitemap, static checks, and Chromium navigation cover the expanded surface.

Contract:

```text
docs/matsuri-detail-c-implementation.md
```

### Phase 10B — Corpus expansion

Status: **Active**

The current priority is to increase both breadth and depth:

- broader regional coverage,
- more non-trivial Current States,
- more Year-by-Year Occurrences,
- more actual Change Events,
- deeper Organization and Place context,
- useful Shrine and Temple Relations,
- claim-level Evidence and Source coverage,
- real correction and maintenance cycles.

A larger list alone is not the target. The archive must explain what a record is, what is happening now, what changed, what it is related to, and why the record is trusted.

### Parallel stabilization review

Status: **Observing**

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Machine record        config/matsuri-stabilization-review.json
```

Observe and record production availability, deployment failures, canonical and HTTPS behavior, Search, crawler and sitemap behavior, Search Console, Analytics receipt, freshness, Relation and Evidence work, corrections, and maintenance burden.

Elapsed time alone does not complete Phase 10. Maintenance burden must be based on real expansion and maintenance work. Search-engine indexation is observed but is not required.

## Phase 11 — Portal and next-site gates

Status: **Deferred until corpus, stabilization evidence, and explicit gate review exist**

F2-28 and Detail C completion do not authorize the portal or Jinja. Remaining Jinja prerequisites are:

```text
Matsuri stabilization review          incomplete
Portal/Jinja implementation order     undecided
Jinja State specification             unapproved
Explicit start authorization          absent
```

Before starting the next specialist site, review Matsuri corpus usefulness, maintenance burden, shared-package reuse, cross-site seed quality, Relation value, update pace, and external demand.
