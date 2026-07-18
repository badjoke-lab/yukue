# Development Schedule

**Status:** F2-24 completed / F2-25 owner access pending / F2-P01 through F2-P12 completed

This document defines the stable implementation order. It complements `roadmap.md` and `project-status.md`. The project is gate-driven rather than deadline-driven.

## Current position

```text
Foundation through Stage E  completed
F1 corpus expansion          completed
F2-01 through F2-24          completed
F2-M01                       completed
F2-M02                       completed
F2-P01 through F2-P12        completed
F2-25                        owner access pending
F2-26 through F2-28          operational hold
Actual Jinja start gate      blocked
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
F2-P01  Analytics record, validator, evidence templates, and F2-26–28 runbook — completed
F2-P02  Relation-backed future-site seed inventory and hosted extraction — completed
F2-P03  Future-site seed readiness and explicit gap audit — completed
F2-P04  Direct Entity-identity Evidence for five shrine seeds — completed
F2-P05  Seed handoff record references and hosted compatibility verification — completed
F2-P06  Self-contained public provenance bundle and reference closure — completed
F2-P07  Candidate artifact contract v1 and hosted enforcement — completed
F2-P08  Jinja start-gate record, validator, workflow, and inactive boundary — completed
F2-P09  大日霊貴神社 official provenance and versioned Entity correction — completed
F2-P10  all-family ordered correction contract and dedicated gate — completed
F2-P11  exact loader/projection bundle application-order contract — completed
F2-P12  one shared correction engine across the loader and HTML Projection — completed
```

Repository gate:

```text
pnpm gate:matsuri:repository
```

The repository gate includes dependency and workflow supply-chain checks, exact bundle inventory and order alignment, a single shared all-family correction engine, pending Analytics validation, and the blocked Jinja start-gate validator.

## Parallel preparation results

```text
F2-P02  5 Relation-backed seeds / Jinja 5 / Jiin 0 / Tomurai 0
F2-P03  readiness baseline / State 0 / direct identity Evidence 0
F2-P04  direct identity Evidence 5 / State 0 / official URL 4
F2-P05  Place 5 / Identity Evidence 5 / Relation Evidence 5
F2-P06  self-contained bundle: 5 seed Entities, 5 context Entities, 5 Places,
         6 Sources, 10 Evidence, 5 Relations, 0 State Snapshots
F2-P07  contract v1: 3 required files, 5 seeds, 5 handoffs,
         exact site IDs and candidate-only boundaries enforced
F2-P08  actual Jinja start gate remains blocked and early activation is rejected
F2-P09  official URL seeds 5 / Identity Evidence 6 / Sources 7 / Evidence 11
F2-P10  12 correction-capable families / 5 bundles / 5 corrected IDs / 6 records
F2-P11  19 additive slots / 5 correction slots / exact canonical order enforced
F2-P12  2 correction consumers / 1 shared engine / local duplicate implementations rejected
```

Hosted evidence:

```text
F2-P02 run                    29478631183 — success
F2-P03 run                    29479348339 — success
F2-P04 run                    29489701435 — success
F2-P05 run                    29490466083 — success
F2-P06 run                    29491507863 — success
F2-P07 run                    29492382041 — success
F2-P08 run                    29493210854 — success
F2-P10 correction run         29624424672 — success
F2-P10 repository CI          29624424628 — success
F2-P10 screenshots            29624424660 — success
F2-P11 bundle-order run       29630494012 — success
F2-P11 repository CI          29630494013 — success
F2-P11 release artifact       8425297044
F2-P12 correction run         29635048023 — success
F2-P12 bundle-order run       29635048060 — success
F2-P12 repository CI          29635048032 — success
F2-P12 screenshots            29635048050 — success
F2-P12 release artifact       8426823296
```

Current remaining seed gaps:

```text
阿蘇神社        State Snapshotなし
櫛田神社        State Snapshotなし
佐太神社        State Snapshotなし
大日霊貴神社    State Snapshotなし
秩父神社        State Snapshotなし
```

These results do not activate Jinja, assign priority, or claim publication readiness.

## Jinja start-gate prerequisites

```text
Matsuri F2-28 complete                 false
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
```

Before Jinja implementation:

```text
1. complete F2-28
2. complete Matsuri stabilization review
3. decide portal/Jinja implementation order
4. approve Jinja State specification and vocabulary
5. record explicit start authorization
6. pass the actual Jinja start gate
7. only then create apps/jinja
```

F2-28 alone is not sufficient to begin Jinja.

## Parallel maintenance

```text
F2-M01  full-page screenshot visual-review workflow — completed
F2-M02  Matsuri data freshness audit — completed
```

```text
Occurrences total                    26
Resolved Occurrences                 17
Closed-period unresolved              0
In-progress scheduled                 1
Future scheduled                      8
Specialist Entities with no Relation  0
Relations missing Evidence            0
```

Routine checks:

```text
博多祇園山笠 2026       outcome reviewed 2026-07-16 — held
YOSAKOIソーラン 2026    outcome reviewed 2026-07-16 — held
弘前ねぷた 2026         review after 2026-08-07
郡上おどり 2026         review after 2026-09-05
```

The 博多 and YOSAKOI results prove held outcomes but not structured scale values, so scale remains `unknown`. 弘前ねぷた remains `scheduled` until post-event Evidence is reviewed.

## External deployment and production verification

### Completed

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  deployed-origin smoke verification — completed
F2-19  exact canonical Matsuri hostname decision — completed
F2-20  Custom Domain activation, canonical build, HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  browser Pagefind Search verification on canonical origin — completed
F2-23  robots, canonical, sitemap, crawler-reachability review — completed
F2-24  Search Console sitemap submission and indexability check — completed
```

```text
Canonical origin          https://matsuri-yukue.badjoke-lab.com
Origin verification run   29191904624 — success
Search verification run   29193201911 — success
Crawler verification run  29230233384 — success
F2-24 preflight run        29232294960 — success
Search Console sitemap     success
Discovered pages           20
Representative live test  indexable
Indexing requests          3 submitted
```

F2-24 does not claim that any URL is already indexed.

### Cloudflare-dependent hold

```text
F2-25  Cloudflare Web Analytics activation — owner access pending
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

Exact resumption sequence:

```text
1. enable Cloudflare Web Analytics Automatic setup
2. record and validate F2-25 evidence
3. merge the F2-25 evidence change
4. verify the resulting production deployment as F2-26
5. verify production traffic privately as F2-27
6. run F2-28
```

Do not use a manual beacon, store an Analytics token, publish private metrics, or reuse a pre-activation deployment as F2-26 evidence.

## Work allowed before F2-25 completion

- maintain the pending Analytics record and launch-closure runbooks,
- complete factual and date-triggered Matsuri maintenance,
- improve Source, Evidence, Relation, and seed-provenance coverage,
- maintain seed inventory, provenance bundle, readiness, artifact contract, correction contract, bundle-order contract, shared correction engine, and Jinja start-gate guardrail,
- perform security and dependency maintenance,
- repair repository or production gates.

## Work not activated

```text
F2-25 through F2-28 completion claims
portal production deployment
future specialist-site production implementation
Jinja State specification approval
apps/jinja
Jinja Worker or hostname activation
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
