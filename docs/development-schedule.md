# Development Schedule

**Status:** F2-22 completed / F2-23 crawler-reachability review next

This document defines the stable implementation order. It complements `roadmap.md` and `project-status.md`. The project is gate-driven rather than deadline-driven.

## Current position

```text
Foundation through Stage E  completed
F1 corpus expansion          completed
F2-01 through F2-22          completed
F2-M01                       completed
F2-M02                       completed
F2-23 through F2-28          operational hold
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
F2-22  canonical browser Pagefind Search verification — completed
```

Canonical HTTP evidence:

```text
Canonical origin          https://matsuri-yukue.badjoke-lab.com
Verification workflow     Verify Matsuri canonical origin gate
Verification run          29191904624 — success
```

Canonical browser Search evidence:

```text
Verification workflow     Verify Matsuri canonical browser Search
Verification run          29227617530 — success
Exact query               脚折雨乞 → 1 result
Filtered query            雨乞 + 埼玉県 → 1 result
Empty query               0 results
Destination               /festivals/suneori-amagoi/
Browser errors            0
Application failures      0
Screenshots               4
```

Evidence records:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-browser-search-2026-07-13.md
```

#### Next gate and hold

```text
F2-23  robots, canonical, sitemap, crawler-reachability review — next
F2-24  search-engine sitemap submission and indexability check — hold
F2-25  Cloudflare Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

F2-23 must review the live crawler surface before any search-engine submission. Required evidence includes `robots.txt`, sitemap declaration and reachability, page canonical links, crawler-visible response behavior, and absence of unintended crawler blocking.

## Work allowed before F2-23 completion

- F2-23 crawler-surface verification tooling and evidence,
- reviewed factual and date-triggered maintenance,
- Source, Evidence, and Relation corrections,
- security and dependency maintenance,
- repairs required to keep repository, canonical-origin, and browser Search gates green.

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
