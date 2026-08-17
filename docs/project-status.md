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
NCS-01 governing docs — completed
NCS-02 quality classifier/baseline — measured / exact-head verification active
NCS-03 national source inventory — next
Matsuri maintenance / historical depth — active in parallel
Matsuri stabilization review — reviewing / incomplete
Actual Jinja start gate — blocked
future specialist-site implementation — not activated
```

## Current sources of truth

```text
Nationwide scaling contract     docs/nationwide-corpus-scaling.md
Corpus quality baseline         config/matsuri-corpus-quality-baseline.json
Corpus quality interpretation   docs/matsuri-corpus-quality-baseline.md
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
- at least one evidence-backed completed dated Occurrence with a non-`scheduled` outcome;
- at least one evidence-backed Change Event;
- Source / Evidence coverage across profile and observation dimensions;
- deterministic identity / duplicate checks.

A Change Event does not substitute for completed Occurrence history for newly published primary Matsuri records.

The current reviewed records are not a special rich legacy tier. Existing and new public records are governed by the same product direction.

## NCS-02 measured quality baseline

Exact measurement from workflow run `32044096419`, job `95428357764` and its per-record artifact:

```text
Specialist primary subjects                    57
  Festival                                      49
  Folk Performance                               8
Machine public_core                              0 / 57
Machine history_enriched                         0 / 57
Machine monitored                               21 / 57
At least 1 completed Occurrence year            52 / 57  (91.2%)
At least 2 completed Occurrence years           37 / 57  (64.9%)
Evidence-backed Change Events                   57 / 57
Current State Evidence                          56 / 57
Direct profile Evidence                         39 / 57
```

Measured machine-minimum gaps:

```text
Entity description missing               57
Direct profile Evidence missing           18
Completed Occurrence history missing       5
Authoritative external link missing        3
Approved Current State missing             1
Current State Evidence missing             1
Timing / recurrence signal missing         1
```

The zero `public_core` count is deliberate and is not fixed by weakening the contract. The current corpus has significant historical/observation depth, but all 57 specialist-primary records remain in scope for quality deepening because they currently lack Entity-level `description_ja` under the newly tightened contract.

The five existing specialist-primary records without completed Occurrence history are legacy promotion-backlog records, not precedent for publishing new records without completed history.

## Measured anti-shallow floor

For NCS-06-or-later public expansion:

```text
new public_core pass rate                         100%
new records with >=2 completed Occurrence years  >= ceil(new_count * 37 / 57)
corpus-wide >=2-year history proportion           >= 37 / 57
```

The `37 / 57` history-depth floor comes from the pre-expansion corpus itself rather than an arbitrary convenient percentage.

Bulk public release remains unauthorized. The history floor is defined, but the remaining bounded promotion-backlog rule and full NCS-06 release guard are still pending. Machine classification never auto-approves publication.

## Nationwide scaling track

Governing issue:

```text
#267 — Redesign nationwide corpus scaling and public quality gates
```

Implementation sequence:

```text
NCS-01  governing specification and schedule alignment — completed
NCS-02  machine quality/depth classifier + measured baseline — completing exact-head verification
NCS-03  national authoritative-source inventory — next
NCS-04  deterministic candidate importer + identity/dedupe pipeline
NCS-05  non-public bulk dry run and error audit
NCS-06  first public-quality expansion pilot — blocked by full release gate
NCS-07  cumulative 500 public-quality primary Matsuri records
NCS-08  cumulative 1,000 public-quality primary Matsuri records
NCS-09  source-inventory-derived national coverage target
```

500 and 1,000 are scale checkpoints only. They are not completion claims.

Before NCS-06, the remaining machine release guard must enforce the bounded promotion backlog as well as the already measured history-depth floor. Every expansion release train must include substantive depth upgrades in addition to new public Entities, and the existing 57 are not exempt from that deepening work.

## Matsuri maintenance remains active

Existing correctness and freshness work continues in parallel:

```text
pnpm audit:matsuri:freshness
pnpm audit:matsuri:relations
pnpm check:matsuri:evidence
pnpm check:matsuri:quality-baseline
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

Each future site must also define a measured anti-shallow-expansion rule appropriate to its own State/history model rather than mechanically copying Matsuri Occurrence thresholds.

## Immediate next actions

```text
1. finish NCS-02 baseline drift verification and merge the classifier/baseline
2. build NCS-03 national authoritative-source inventory
3. generate the existing-57 promotion/deepening worklist from measured gaps
4. implement NCS-04 private candidate importer and deterministic identity/dedupe checks
5. run NCS-05 at bulk scale without publishing candidate shells
6. audit quality, provenance, duplicate rate, and source ceilings
7. implement the remaining bounded promotion-backlog release guard while preserving the measured 37 / 57 history floor
8. only then allow NCS-06 public-quality expansion
9. continue due Occurrence / freshness corrections in parallel
10. keep future specialist sites blocked until their existing and new quality prerequisites are satisfied
```
