# Development Schedule

**Status:** F2-20 completed / F2-21 next

This document defines the stable implementation order. It complements:

- `roadmap.md` — long-range phases and gates,
- `project-status.md` — current position,
- this file — concrete work-package sequence.

The project is gate-driven rather than deadline-driven. Stable work-package IDs are independent from GitHub PR numbers.

## Current position

```text
Foundation through Stage E  completed
F1 corpus expansion          completed
F2-01 through F2-20          completed
F2-M01                       completed
F2-M02                       completed
F2-21 through F2-28          operational hold
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
F2-01 through F2-15 — completed
```

Repository gate:

```text
pnpm gate:matsuri:repository
```

The gate includes deployment-topology, Workers configuration, static artifact, consistency, semantics, Evidence, content, browser, release-candidate, freshness, and Relation checks.

### Block M — Parallel maintenance work

```text
F2-M01  full-page screenshot visual-review workflow — completed
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

Future maintenance:

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
F2-19  exact canonical Matsuri hostname decision — completed
F2-20  Custom Domain activation and canonical-origin verification — completed
```

Evidence:

```text
Worker                         matsuri-yukue
Workers origin                 https://matsuri-yukue.badjoke-lab.workers.dev/
Active canonical origin        https://matsuri-yukue.badjoke-lab.com/
Initial verification workflow  GitHub Actions run 29182976642 — success
Canonical verification gate    GitHub Actions run 29191904624 — success
Portal hostname                yukue.badjoke-lab.com — reserved
```

The portal and Matsuri are separate Workers. The specialist site must not be nested below the portal path.

#### Current hold

```text
F2-21  canonical manifest and sitemap verification as a recorded gate — hold
F2-22  browser Pagefind Search verification on canonical origin — hold
F2-23  robots, canonical, sitemap, crawler-reachability review — hold
F2-24  search-engine sitemap submission and indexability check — hold
F2-25  Cloudflare Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

The hold now begins at F2-21. The canonical origin is active and externally verified.

#### F2-21 execution order

```text
1. preserve the successful canonical verification workflow evidence
2. record manifest.site_origin = https://matsuri-yukue.badjoke-lab.com
3. record canonical sitemap locations from the live origin
4. confirm workers.dev remains non-canonical
5. update the repository gate and status documents
6. mark F2-21 complete only after the recorded evidence is reproducible
```

#### F2-22 execution order

After F2-21:

```text
1. open the live canonical Search surface in Chromium
2. load Pagefind runtime assets from the canonical origin
3. run representative Japanese queries
4. confirm result links stay on the canonical origin
5. record desktop and mobile browser evidence
```

## Work allowed during the hold

- F2-21 evidence formalization,
- reviewed factual corrections,
- date-triggered Occurrence outcome maintenance,
- Current State, Source, Evidence, and Relation maintenance,
- security and dependency maintenance,
- repairs required to keep the repository gate green,
- deployed canonical-origin checks,
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
