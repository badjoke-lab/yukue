# Development Schedule

**Status:** F2-28 completed / Detail C completed / Matsuri prefecture seed baseline 47 / 47 completed / NCS-02 measured / nationwide public corpus scaling active / stabilization reviewing / Jinja blocked

This project is gate-driven rather than deadline-driven.

## Current position

```text
Foundation through Stage E   completed
F1 corpus expansion           completed
F2-01 through F2-28           completed
F2-M01                        completed
F2-M02                        completed
F2-P01 through F2-P13         completed
Phase 9 Launch Preparation    completed
Phase 10 Stabilization        active
Phase 10A Detail C repair     completed
Phase 10B Prefecture seed     completed 47 / 47
Phase 10C Maintenance         active
Phase 10D Nationwide scaling  active
NCS-01                        completed
NCS-02                        measured / baseline recorded
NCS-03                        next
Corpus batches 11-43          completed
Stabilization review          reviewing
Formal review complete        false
Actual Jinja start gate       blocked
```

## Phase 10B — Prefecture seed baseline

Status: **Completed, but not nationwide corpus completion**

The 47 / 47 checkpoint proves only that every prefecture has at least one reviewed primary Matsuri record under the old breadth rule.

```text
Public Entities              120
Specialist primary records    57
Primary prefecture presence   47 / 47
```

The project must now grow the useful public corpus from dozens to hundreds and then thousands; candidate discovery alone is not completion.

## Phase 10C — Matsuri maintenance and stabilization

Status: **Active in parallel**

Priority maintenance remains due Occurrence review, historical gaps, Change Events, Relation/provenance improvement, Source/Evidence quality, stale-State/link correction, and public-product regression maintenance.

Maintenance must not consume the whole roadmap while public national breadth remains small.

## Phase 10D — Nationwide Matsuri public corpus scaling

Status: **Active**

Governing specification:

```text
docs/nationwide-corpus-scaling.md
```

The target is national-scale **public** coverage without a shallow directory.

### NCS sequence

```text
NCS-01  governing specification / schedule alignment                  completed
NCS-02  quality/depth classifier + measured baseline                  completed in current release train
NCS-03  national authoritative-source inventory                       next
NCS-04  deterministic candidate importer + identity/dedupe pipeline   pending
NCS-05  bulk candidate dry run + promotion-readiness audit             pending
NCS-06  bounded public-standard expansion pilot                        pending
NCS-07  cumulative 500 public_core primary Matsuri records             checkpoint
NCS-08  cumulative 1,000 public_core primary Matsuri records           checkpoint
NCS-09  source-inventory-derived national target and expansion         future
```

NCS-05 is not a public milestone by itself. NCS-06 must promote new records into the Public Projection.

### Public-standard rule

A new public record does **not** need multi-year history before publication.

It must, however, be a useful standalone record with:

```text
reviewed identity
substantive summary + description
geography
usual timing / recurrence where supportable
Place / distributed-place handling
authoritative public source or explicit reviewed source ceiling
approved Current State + Evidence
direct profile / identity Evidence
at least one dated observation anchor
identity / duplicate checks
```

A raw name + location + URL shell remains a candidate and cannot be published.

The dated observation anchor may be an evidence-backed Occurrence, including a current scheduled edition with normal freshness obligations, or an evidence-backed Change Event. Completed multi-year Occurrence history is a depth target, not the first-publication gate.

### NCS-02 measured baseline

```text
Specialist primary subjects                    57
  Festival                                      49
  Folk Performance                               8
Machine public_core                              0 / 57
Machine monitored                               21 / 57
Completed Occurrence history                    52 / 57
Evidence-backed Change Events                   57 / 57
Current State Evidence                          56 / 57
Direct profile Evidence                         39 / 57
Entity-level description present                 0 / 57
```

The zero `public_core` result reflects the newly added profile requirements, especially missing Entity-level descriptions. It does not mean the existing corpus is a directory.

Existing 57 records remain in the repair/deepening backlog, but they are **not** a ceiling on public corpus growth.

### Rejected over-restriction

The following previously proposed rules are rejected because they would keep the public corpus artificially small:

```text
new public record must already have a completed Occurrence
new public record must already have a Change Event
64.9% of every new release must already have multi-year history
candidate accumulation is acceptable while public count stays near 57
```

Quality is protected by the public-standard gate and a measured promotion/deepening backlog, not by requiring maximum history before first publication.

### Release guard objective

Before high-volume NCS-07 expansion, the machine guard must enforce:

```text
100% of new public records satisfy public_core
0 raw directory shells enter Public Projection
each release train contains net-new public records + repair/deepening work
history/promotion backlog is measured and bounded from NCS-06 pilot throughput
breadth pauses only when the measured backlog bound is exceeded
```

No arbitrary pre-pilot history ratio is used.

### Immediate execution order

```text
1. finish NCS-02 exact-head verification and merge the revised baseline/spec
2. build NCS-03 national authoritative-source inventory
3. build existing-57 repair/deepening worklist from measured gaps
4. implement NCS-04 importer, provenance capture, identity keys, duplicate/conflict queue
5. run NCS-05 bulk candidate dry run and promotion-readiness audit
6. fix importer/source-quality defects found by the dry run
7. run NCS-06 and actually publish a bounded batch of new public_core records
8. use NCS-06 throughput/backlog measurements to set the high-volume release guard
9. advance toward 500 then 1,000 public_core records while continuing history enrichment
10. keep due Occurrence freshness and production regressions green in parallel
```

## Parallel stabilization review

Stabilization remains active and independent. Owner-private Analytics / Search Console observations do not block NCS-03 through NCS-05 repository work.

Dated Occurrence reviews remain fail-closed; elapsed dates do not justify `held`.

## Future-site boundary

Jinja, Jiin, and Tomurai remain separately gated for activation, but each future site must have both a substantive public-record minimum and an explicit scale path beyond a tiny seed corpus.

State-free Shrine / Temple relation seeds may support Matsuri but cannot be promoted unchanged as finished specialist-site records.

## Work not activated

```text
portal production deployment
future specialist-site implementation
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
