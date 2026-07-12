# Development Schedule

**Status:** F2-21 completed / F2-22 browser Search verification next

This document defines the stable implementation order. It complements `roadmap.md` and `project-status.md`. The project is gate-driven rather than deadline-driven.

## Current position

```text
Foundation through Stage E  completed
F1 corpus expansion          completed
F2-01 through F2-21          completed
F2-M01                       completed
F2-M02                       completed
F2-22 through F2-28          operational hold
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

## F2 — Launch preparation

### Repository work

```text
F2-01 through F2-15 — completed
```

Repository gate:

```text
pnpm gate:matsuri:repository
```

### Parallel maintenance

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

Routine date-triggered checks:

```text
博多祇園山笠 2026  review after 2026-07-15
郡上おどり 2026    review after 2026-09-05
```

### External deployment and production verification

#### Completed

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  deployed-origin smoke verification — completed
F2-19  exact canonical Matsuri hostname decision — completed
F2-20  Custom Domain activation, canonical build, HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
```

Canonical evidence:

```text
Canonical origin          https://matsuri-yukue.badjoke-lab.com
Verification workflow     Verify Matsuri canonical origin gate
Verification run          29191904624 — success
Successful attempt        1 of 18
Activation merge          f978bc50a1ab51964687ec0457a448dc37b2aaf9
```

The verifier confirmed required routes, Pagefind asset reachability, public JSON, exact `manifest.site_origin`, and canonical sitemap locations.

Evidence record:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
```

#### Next gate and hold

```text
F2-22  browser Pagefind Search verification on canonical origin — next
F2-23  robots, canonical, sitemap, crawler-reachability review — hold
F2-24  search-engine sitemap submission and indexability check — hold
F2-25  Cloudflare Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

F2-22 must use a real browser to submit queries, observe Pagefind results, and follow result navigation. HTTP asset reachability from F2-20/F2-21 is not sufficient.

## Work allowed before F2-22 completion

- F2-22 browser verification tooling and evidence,
- reviewed factual and date-triggered maintenance,
- Source, Evidence, and Relation corrections,
- security and dependency maintenance,
- repairs required to keep repository and canonical-origin gates green.

## Work not activated

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

Before implementation, read root and nearest `AGENTS.md`, `project-status.md`, this schedule, and the governing specification. Update status, roadmap, and decision records when their governed state changes.
