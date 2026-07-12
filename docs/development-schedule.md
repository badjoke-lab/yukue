# Development Schedule

**Status:** F2-M02 completed / domain-dependent launch work on hold

This document defines the stable implementation order. It complements:

- `roadmap.md` — long-range phases and gates,
- `project-status.md` — current position,
- this file — concrete work-package sequence.

The project is gate-driven rather than deadline-driven. Stable work-package IDs are independent from GitHub PR numbers.

## Current position

```text
Foundation through Stage E  completed
F1 corpus expansion          completed
F2-01 through F2-18          completed
F2-M01                       completed
F2-M02                       completed
F2-19 through F2-28          operational hold
```

## Foundation through Stage E

```text
Foundation  monorepo, app skeletons, shared packages, CI — completed
Stage A     shared UI foundation — completed
Stage B     Matsuri static surfaces — completed
Stage C     data core — completed
Stage D     canonical data and Public Projection — completed
Stage E     Browse, Pagefind Search, machine-readable layer — completed
```

## F1 — Corpus expansion

Status: **Completed through validated batches 01–10**

Coverage includes Festivals, Folk Performances, Tradition Units, Organizations, Shrine context seeds, Occurrence history, Change Events, Relations, Designations, Sources, and Evidence.

## F2 — Launch preparation

### Block A — Repository work

```text
F2-01  static build and artifact contract — completed
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

Repository gate:

```text
pnpm gate:matsuri:repository
```

### Block M — Parallel maintenance work

```text
F2-M01  full-page screenshot visual-review workflow — completed
F2-M02  Matsuri data freshness audit — completed
```

#### F2-M02 completed sequence

1. established the Occurrence, Current State, external-link, and Relation candidate inventories,
2. reviewed all approved non-future scheduled and unresolved Occurrences,
3. confirmed zero stale Current State candidates at the fixed audit date,
4. confirmed zero stale external-link candidates at the fixed audit date,
5. resolved the initial zero-Relation specialist inventory with evidence-backed bounded batches,
6. corrected the 2026 相馬野馬追 outcome from `unknown` to `held`,
7. ran the full repository gate and screenshot workflow,
8. recorded remaining future-date review points without treating them as current defects.

Completion result:

```text
closed-period unresolved Occurrences  0
specialist Entities with no Relation  0
stale Current State candidates        0
stale external-link candidates        0
Relations missing Evidence            0
```

Governing document:

```text
docs/matsuri-data-freshness-audit.md
```

F2-M02 did not attach a domain, set `MATSURI_PUBLIC_ORIGIN`, declare a canonical origin, submit a sitemap, enable Analytics, or claim final launch completion.

Future-dated Occurrence checks continue as normal maintenance:

```text
博多祇園山笠 2026  review after 2026-07-15
郡上おどり 2026    review after 2026-09-05
```

### Block B — External deployment and production verification

#### Completed

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment and reachable URL — completed
F2-18  deployed-origin smoke verification — completed
```

Evidence:

```text
Worker                  matsuri-yukue
Permanent origin        https://matsuri-yukue.badjoke-lab.workers.dev/
Verified deployment     https://f757f092-matsuri-yukue.badjoke-lab.workers.dev/
Verification workflow   GitHub Actions run 29182976642 — success
Verified source commit  f6fdd5055c2712838ef30ed54048abf7f0674b4c
```

#### Operational hold

```text
F2-19  exact canonical Matsuri subdomain decision — hold
F2-20  attach custom domain, configure MATSURI_PUBLIC_ORIGIN, redeploy — hold
F2-21  canonical manifest and sitemap verification — hold
F2-22  browser Pagefind Search verification on canonical origin — hold
F2-23  robots, canonical, sitemap, crawler-reachability review — hold
F2-24  search-engine sitemap submission and indexability check — hold
F2-25  Cloudflare Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

The hold begins at F2-19 because the next steps depend on the exact custom domain and canonical origin. The existing Workers origin remains available for maintenance checks but is not canonical.

## Work allowed during the hold

- reviewed factual corrections,
- date-triggered Occurrence outcome maintenance,
- Current State freshness maintenance,
- Source and Evidence maintenance,
- Relation improvements when new evidence appears,
- security and dependency maintenance,
- repairs required to keep the repository gate green,
- deployed Workers-origin maintenance checks,
- screenshot-based visual review for non-trivial UI changes.

## Work not activated by the hold

```text
Stats
Compare
dynamic API
MCP
paid API
x402 billing
D1 canonical database
real-time ingestion
complex graph visualization
```

## Documentation rule

Before implementation:

1. read root `AGENTS.md`,
2. read the nearest nested `AGENTS.md`,
3. read `docs/project-status.md`,
4. read this schedule,
5. read the governing specification.

Update the governing document when behavior changes, `decision-log.md` when a decision changes, `project-status.md` when current position changes, and this schedule when implementation order changes.
