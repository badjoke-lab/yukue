# Project Status

**Last updated:** 2026-08-18

## Current phase

```text
Phase 10 — Matsuri Content Expansion, Nationwide Scaling, and Stabilization
```

## Current gate state

```text
F2-15 — Repository Launch Readiness Gate — completed
F2-M01 — Full-page screenshot visual-review workflow — completed
F2-M02 — Matsuri data freshness audit — completed
F2-16 through F2-27 — completed
F2-28 — final F2 Launch Gate — completed
F2-P01 through F2-P13 — completed
Phase 9 Launch Preparation — completed
Phase 10 Stabilization — active
Matsuri Detail C implementation — completed
Matsuri prefecture seed baseline — completed 47 / 47
Matsuri nationwide corpus scaling — active
Matsuri maintenance / historical depth — active in parallel
Matsuri stabilization review — reviewing / incomplete
Actual Jinja start gate — blocked
future specialist-site implementation — not activated
```

## Current sources of truth

```text
Nationwide scaling contract     docs/nationwide-corpus-scaling.md
Current repository counts       config/matsuri-repository-baseline.json
Current production baseline     config/matsuri-production-baseline.json
Analytics progression           config/matsuri-analytics-activation.json
Final F2 launch gate            config/matsuri-f2-launch-gate.json
Stabilization review            config/matsuri-stabilization-review.json
Stabilization review contract   docs/matsuri-stabilization-review.md
Detail C implementation         docs/matsuri-detail-c-implementation.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

## Corrected Matsuri coverage interpretation

The existing corpus established reviewed primary presence in all 47 prefectures. That remains a useful milestone, but it is now classified only as a **prefecture seed baseline**.

It does not mean:

```text
nationwide Matsuri corpus complete
municipality coverage complete
national discovery coverage sufficient
new Entity breadth no longer required
```

The previous depth-first-only direction is superseded by the nationwide scaling contract.

Current verified Batch 43 checkpoint remains:

```text
Entities          120
Places            108
State Snapshots    56
Change Events     106
Occurrences       166
Relations          70
Designations       29
Sources           318
Evidence           699
Primary prefecture presence 47 / 47
```

These totals include supporting Organizations, Shrines, Places, and other record types; raw Entity count is not used as a substitute for primary Matsuri coverage.

## Public-record quality rule

Nationwide scaling is not permission to publish thin records.

Index-like entries containing only name, location, and link are allowed only as **non-public candidates**. They do not enter the Public Projection and do not count as public coverage.

Every newly published primary Festival or Folk Performance must satisfy the substantive minimum in `docs/nationwide-corpus-scaling.md`, including:

- reviewed identity and Basic Profile;
- substantive summary / description;
- evidence-bounded geography, timing, recurrence, and Place handling;
- approved Current State Snapshot with Evidence;
- at least one completed dated Occurrence with a non-`scheduled` outcome, or an evidence-backed Change Event when completed Occurrence evidence cannot responsibly be established;
- Source / Evidence coverage across profile and observation dimensions;
- deterministic identity / duplicate checks.

The current reviewed records are not a special rich legacy tier. New public records are governed by the same product direction.

## Nationwide scaling track

Governing issue:

```text
#267 — Redesign nationwide corpus scaling and public quality gates
```

Implementation sequence:

```text
NCS-01  governing specification and schedule alignment — completed
NCS-02  machine quality/depth classifier over existing corpus — next
NCS-03  national authoritative-source inventory
NCS-04  deterministic candidate importer + identity/dedupe pipeline
NCS-05  non-public bulk dry run and error audit
NCS-06  first public-quality expansion pilot
NCS-07  cumulative 500 public-quality primary Matsuri records
NCS-08  cumulative 1,000 public-quality primary Matsuri records
NCS-09  source-inventory-derived national coverage target
```

500 and 1,000 are scale checkpoints only. They are not completion claims.

Before NCS-06, a machine release guard must prevent bulk growth from materially degrading corpus depth. Every expansion release train must include substantive depth upgrades in addition to new public Entities.

## Matsuri maintenance remains active

Existing correctness and freshness work continues in parallel:

```text
pnpm audit:matsuri:freshness
pnpm audit:matsuri:relations
pnpm check:matsuri:evidence
pnpm check:matsuri:bundle-inventory
pnpm check:matsuri:detail-navigation
pnpm check:matsuri:stabilization-review
```

Due Occurrences remain fail-closed. Elapsed dates, event-page persistence, ticket sales, or absence of cancellation evidence do not justify `held`.

Maintenance is no longer allowed to consume the entire product roadmap while national corpus breadth remains small.

## Stabilization review

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Current status        reviewing
Review eligible       true
Formal review complete false
```

Current owner-private observations still required by the existing stabilization contract remain separate from NCS repository work.

## Jinja and future-site boundary

```text
Matsuri F2-28 complete                 true
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
Actual Jinja start gate                blocked
```

State-free Shrine and Temple seeds may continue to support Matsuri Relations and candidate preparation.

They must not be promoted unchanged into public 神社のゆくえ / 寺院のゆくえ records.

Before Jinja, Jiin, or Tomurai activation, each site requires its own substantive public-record minimum, source inventory, ingestion/dedupe path, machine quality/depth metrics, and public quality gate under `docs/nationwide-corpus-scaling.md`.

## Immediate next actions

```text
1. implement NCS-02 machine quality/depth classifier over the current corpus
2. measure current public_core / history_enriched / monitored distribution
3. define the first bulk-release guard from that measured baseline
4. build NCS-03 national authoritative-source inventory
5. implement NCS-04 private candidate importer and deterministic identity/dedupe checks
6. run NCS-05 at bulk scale without publishing candidate shells
7. audit quality, provenance, duplicate rate, and source ceilings
8. only then allow NCS-06 public-quality expansion
9. continue due Occurrence / freshness corrections in parallel
10. keep future specialist sites blocked until their existing and new quality prerequisites are satisfied
```
