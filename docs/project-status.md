# Project Status

**Last updated:** 2026-08-18

## Current phase

```text
Phase 10 — Matsuri Public Corpus Expansion, Nationwide Scaling, and Stabilization
```

## Current gate state

```text
F2-28 final launch gate — completed
Matsuri Detail C — completed
Matsuri prefecture seed baseline — completed 47 / 47
Matsuri nationwide public corpus scaling — active
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
Development schedule            docs/development-schedule.md
Corpus quality baseline         config/matsuri-corpus-quality-baseline.json
Corpus quality interpretation   docs/matsuri-corpus-quality-baseline.md
Repository counts               config/matsuri-repository-baseline.json
Jinja start boundary            config/jinja-start-gate.json
```

## Corrected coverage interpretation

The existing corpus has reviewed primary presence in all 47 prefectures, but this is only a geographic seed baseline.

Current specialist-primary public corpus:

```text
Festival             49
Folk Performance      8
Total                 57
```

The project is **not** allowed to treat those 57 as the practical endpoint while candidate records accumulate privately.

National scaling requires useful public-record growth from dozens to hundreds and then thousands where source coverage supports it.

## Public quality rule

Two bad outcomes are both prohibited:

```text
1. publish thousands of name + location + URL shells
2. keep the public corpus near 57 because every new subject is forced to have multi-year history before first publication
```

A raw shell remains a non-public candidate.

A new public `public_core` record is publishable once it has a useful standalone profile:

- reviewed identity and entity boundary;
- substantive Japanese summary + description;
- geography and Place/distributed-place handling;
- timing / recurrence where supportable;
- authoritative public source or explicit reviewed source ceiling;
- approved Current State + Evidence;
- direct profile / identity Evidence;
- at least one dated observation anchor;
- deterministic identity / duplicate checks.

The dated observation anchor may be an evidence-backed Occurrence, including a current scheduled edition with the normal freshness obligation, or an evidence-backed Change Event.

Completed multi-year Occurrence history is **not** required for first publication. It is a later depth dimension.

## NCS-02 measured baseline

From workflow run `32044096419`, job `95428357764`:

```text
Specialist primary subjects                    57
Machine public_core                              0 / 57
Machine monitored                               21 / 57
Completed Occurrence history                    52 / 57
Evidence-backed Change Events                   57 / 57
Current State Evidence                          56 / 57
Direct profile Evidence                         39 / 57
Entity-level description present                 0 / 57
```

The zero current `public_core` count reflects the newly added profile requirements, especially missing Entity-level descriptions. It does not mean the current 57 are directory shells.

Existing records remain in the repair/deepening backlog, but they are not a ceiling on new public growth.

## Rejected over-restriction

The following previously proposed rules are withdrawn:

```text
new public record must already have a completed Occurrence
new public record must already have a Change Event
64.9% of every new release must already have multi-year history
candidate accumulation is acceptable while public count stays near 57
```

Those rules over-coupled first publication and maximum history depth and would make national scaling impractically slow.

## Nationwide scaling track

```text
NCS-01  governing specification and schedule alignment — completed
NCS-02  machine quality/depth classifier + measured baseline — verifying
NCS-03  national authoritative-source inventory — next
NCS-04  deterministic candidate importer + identity/dedupe pipeline
NCS-05  bulk candidate dry run + promotion-readiness audit
NCS-06  bounded public-standard expansion pilot
NCS-07  cumulative 500 public_core primary Matsuri records
NCS-08  cumulative 1,000 public_core primary Matsuri records
NCS-09  source-inventory-derived national target
```

NCS-05 by itself does not count as public expansion. NCS-06 must actually promote new public records.

The NCS-06 pilot will measure review throughput and backlog growth. Those measurements will define the high-volume backlog bound for NCS-07 instead of importing the initial corpus's 64.9% multi-year history ratio as a publication gate.

## Matsuri maintenance remains active

Freshness, Source/Evidence correctness, historical Occurrence review, Change Events, Relations, stale links, and Detail C regressions continue in parallel.

Elapsed dates, event-page persistence, ticket sales, or absence of cancellation evidence do not justify `held`.

## Future-site boundary

Jinja, Jiin, and Tomurai remain separately gated for activation.

State-free Shrine / Temple relation seeds may support Matsuri but cannot be promoted unchanged as specialist-site public records.

Each future site must have both:

```text
a substantive non-shell public-record minimum
an explicit scale path beyond a tiny seed corpus
```

## Immediate next actions

```text
1. finish NCS-02 exact-head verification and merge the corrected classifier/spec
2. build NCS-03 national authoritative-source inventory
3. build the existing-57 repair/deepening worklist
4. implement NCS-04 candidate importer + dedupe/conflict queue
5. run NCS-05 bulk candidate dry run and promotion-readiness audit
6. fix importer/source-quality failures
7. run NCS-06 and actually publish a bounded batch of new public_core records
8. derive high-volume backlog guard from NCS-06 throughput
9. advance toward 500 then 1,000 public_core records while deepening history in parallel
```
