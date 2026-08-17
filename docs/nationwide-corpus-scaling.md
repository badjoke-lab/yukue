# Nationwide Corpus Scaling and Public-Record Quality Contract

**Status:** Accepted governing specification / public A→B→C model

This document governs nationwide corpus expansion for the Yukue Series and must be read before Matsuri corpus expansion, future-site corpus work, or bulk-ingestion changes.

## Purpose

The Yukue Series must scale from dozens of records to national coverage without waiting for every subject to have deep history before it can appear publicly.

The governing model is:

```text
Tier A  Public Index
  ↓ target: within 7 calendar days
Tier B  Public Verified
  ↓ continuous deepening
Tier C  Public History / Monitoring
```

Tier A is intentionally public. It is the national discovery layer. Tier B is the normal verified product layer. Tier C is the deepest longitudinal layer.

A private candidate stage may exist before Tier A for parsing, dedupe, and review, but candidate count is not a product result.

47 / 47 prefecture presence remains only the initial geographic seed baseline. It is not nationwide corpus completion.

## Tier A — Public Index

Tier A exists so nationally useful breadth can be published quickly without inventing Current State or history.

A Matsuri Tier A primary record requires at least:

1. reviewed canonical name / identity boundary;
2. subject type / kind;
3. prefecture and municipality when municipality-bounded, or an explicit broader geographic scope;
4. at least one official, official-organization, public-authority, or otherwise explicitly approved authoritative source;
5. source access / verification date;
6. deterministic duplicate / identity-conflict check;
7. machine-visible `coverage_tier: tier_a_index` and publication timestamp.

Tier A may additionally contain source-backed timing, venue, organizer, summary, or other fields when already available, but those are not required merely to enter the public Index layer.

Tier A is publicly visible and machine-readable. It may appear in browse/search pages, public JSON, sitemap, and search-engine discovery surfaces.

Tier A must be visibly labeled so users and machines can distinguish it from verified Tier B/C records. It must not claim unsupported Current State, organizer, Place, Relation, coordinate, Occurrence outcome, history, or officiality.

A reviewed name + location + authoritative public source is acceptable at Tier A. That is the purpose of the public Index layer.

## Tier A → Tier B target — 7 days

Tier A is expected to move quickly toward Tier B, but overdue Tier A records do **not** block unrelated public expansion.

Every newly published Tier A record must include:

```text
tier_a_published_at
tier_b_target_at = tier_a_published_at + 7 calendar days
```

Operational rules:

1. target every Tier A record for Tier B promotion within 7 calendar days;
2. report Tier A records due within 48 hours and overdue;
3. prioritize overdue Tier A in the B-promotion work queue;
4. continue publishing additional valid Tier A records while overdue work is being resolved;
5. never satisfy the target by inventing facts, filling unsupported unknowns, or weakening Evidence rules;
6. if Tier B cannot yet be established, keep the record public as Tier A with a machine-visible reason / missing-dimension report and continue research;
7. do not automatically withdraw a valid Tier A record merely because seven days elapsed;
8. do not create a repository-wide stop condition from one difficult subject.

The seven-day value is therefore a **service target and prioritization rule**, not a global release gate.

The intended operating rhythm is parallel:

```text
publish Tier A breadth continuously
+
run Tier B promotion continuously
+
report overdue / blocked reasons continuously
+
continue Tier C deepening independently
```

## Tier B — Public Verified

Tier B is the normal verified product layer.

A Matsuri Tier B record requires Tier A plus reviewed, Evidence-backed coverage for the applicable dimensions:

1. substantive Japanese summary / description;
2. approved Current State Snapshot with claim-linked Evidence;
3. Place, route, multi-place, or distributed-place treatment where supportable;
4. organizer / responsible organization when supportable;
5. relevant Shrine / Temple / Organization Relations when actually supported;
6. timing / recurrence where supportable;
7. direct profile / identity Evidence;
8. authoritative external links reviewed for officiality / publisher role;
9. at least one dated observation anchor, which may be an evidence-backed Occurrence or an evidence-backed Change Event.

Tier B does **not** require multi-year history before promotion. A current scheduled Occurrence may be the dated observation anchor when properly evidenced and then carries the normal freshness obligation.

Evidence ceilings must remain explicit. Tier B must never be achieved by fabricating or inferring unsupported facts.

## Tier C — Public History / Monitoring

Tier C adds longitudinal value beyond Tier B.

Tier C includes one or more of:

- multiple dated Occurrences across different years;
- evidence-backed cancellation / postponement / partial-held / revival history;
- meaningful Change Events explaining format, governance, venue, continuity, or state changes;
- active scheduled-Occurrence freshness monitoring;
- richer Relation history where supported;
- explicit monitoring obligations for current/future change.

Tier C is continuously deepened. The seven-day target applies only to A→B and does not require B→C completion on a fixed deadline.

## Existing corpus

The current reviewed Matsuri specialist-primary corpus must be classified under the same A/B/C model.

Existing records already contain substantial State / Occurrence / Change / Evidence depth, so many should classify as Tier B or Tier C once the machine classifier is aligned. Missing profile fields and source gaps remain repair work; they do not justify freezing national expansion.

## Public growth requirement

The project must not remain near the initial ~57 specialist-primary records while accumulating private candidates.

Successful expansion reports separately:

```text
private candidates discovered
Tier A public records
Tier A due within 48h
Tier A overdue
Tier B verified records
Tier C history/monitoring records
new Tier A published
Tier A promoted to B
Tier A blocked reasons
prefecture coverage
municipality coverage
source-family coverage
```

Candidate count alone is not a public-growth metric. Overdue Tier A count is a work-priority metric, not a reason to freeze unrelated valid Tier A publication.

## Automation boundary

Automation is required for national scale.

Automation may:

- discover subjects from authoritative structured / enumerated sources;
- normalize names and geography;
- classify source type and publisher;
- create reviewed Tier A drafts;
- calculate Tier A publication and Tier B target dates;
- extract candidate Place / timing / organizer / Relation facts;
- create draft Source / Evidence mappings;
- flag duplicate / identity conflicts;
- assemble Tier B review packets;
- generate A/B/C coverage, target-age, and backlog reports.

Automation must not:

- infer held/cancelled/not-held outcomes from elapsed dates or silence;
- infer Current State transitions without Evidence;
- fabricate descriptions, organizers, Places, Relations, coordinates, or links;
- silently promote A→B;
- hide overdue Tier A records;
- mark a record Tier C merely to improve metrics.

## Matsuri scaling sequence

```text
NCS-01  governing specification / schedule alignment
NCS-02  A/B/C classifier + current-corpus baseline
NCS-03  national authoritative-source inventory
NCS-04  deterministic candidate + Tier A importer / identity-dedupe pipeline
NCS-05  bulk dry run + Tier A publication-readiness audit
NCS-06  first bounded Tier A public wave + continuous A→B promotion
NCS-07  cumulative 500 public Matsuri primary records
NCS-08  cumulative 1,000 public Matsuri primary records
NCS-09  source-inventory-derived national target and continued A→B→C expansion
```

500 and 1,000 refer to **public** primary records across Tier A/B/C, not private candidates. They are scale checkpoints, not claims of nationwide completeness.

## Future-site rule

The same three-layer model applies to:

```text
神社のゆくえ
寺院のゆくえ
弔いのゆくえ
```

Each site defines its own Tier A fields and Tier B verification dimensions, but the operating principle is the same:

```text
public Tier A breadth
→ target Tier B within 7 days without global stop
→ Tier C longitudinal deepening
```

Matsuri Relation seeds or other cross-site reference records do **not** automatically become Tier A records on a future specialist site. When Jinja, Jiin, or Tomurai is separately activated, each record must pass that site's own Tier A identity/source/geography minimum before specialist-site publication.

The shared scale model does not authorize future-site application, hostname, Worker, or public publication work while Matsuri is the active implementation target.

No future site may launch as a tiny hand-curated database with no scale path.

## Change control

This document is a governing specification.

Any change that makes Tier A private, removes public Tier A breadth, weakens fail-closed Evidence semantics, treats candidate count as public coverage, auto-withdraws a valid Tier A because the seven-day target elapsed, or creates a global stop from one overdue Tier A requires an explicit new decision in `docs/decision-log.md` and corresponding schedule/status changes.
