# Project Roadmap

**Status:** Phase 9 completed / Phase 10 Matsuri stabilization observing

## Phase 0 through Phase 8

Foundation, reference documents, UI direction, data core, Public Projection, UI foundation, Matsuri MVP surfaces, Search/Browse/machine-readable layer, and the initial corpus expansion are completed.

## Phase 9 — Launch Preparation

Status: **Completed**

```text
F2-01 through F2-15 — completed
F2-P01 through F2-P13 — completed
F2-M01 and F2-M02 — completed
F2-16 through F2-28 — completed
```

The final launch gate passed at `2026-07-27T11:45:20Z` after repository, canonical-origin, Search, crawler, indexability-preflight, Analytics, baseline, privacy, and Jinja-guardrail verification.

```text
F2-27 merge commit  6a0ef91dad62fb7f5d65135d846b1cf6b6301d25
F2-28 machine record config/matsuri-f2-launch-gate.json
F2-28 audit          docs/audits/matsuri-f2-28-final-launch-gate-2026-07-27.md
```

F2-28 does not claim that any URL is indexed.

## Phase 10 — Matsuri Stabilization

Status: **Active / observing**

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Machine record        config/matsuri-stabilization-review.json
```

Observe and record:

- production availability and deployment failures,
- canonical hostname and HTTPS behavior,
- Search behavior,
- crawler and sitemap behavior,
- Search Console observation without requiring indexation,
- Analytics traffic receipt without publishing metrics,
- freshness, Relation, Evidence, and correction work,
- manual maintenance burden,
- public Search and machine-readable-layer signals.

Elapsed time alone does not complete Phase 10. Completion requires the machine record, all review categories, zero unresolved critical corrections, a recorded deployment-failure count, acceptable maintenance burden, and a public-safe final audit.

Repository maintenance performed during this phase remains bounded by the public data, privacy, and evidence policies.

## Phase 11 — Portal and next-site gates

Status: **Deferred until stabilization evidence and explicit gate review exist**

F2-28 completion does not authorize the portal or Jinja. Remaining Jinja prerequisites are:

```text
Matsuri stabilization review          incomplete
Portal/Jinja implementation order     undecided
Jinja State specification             unapproved
Explicit start authorization          absent
```

Review Matsuri maintenance burden, shared-package reuse, cross-site seed quality, Relation value, update pace, and external demand before formal portal deployment or adding the next public specialist application.
