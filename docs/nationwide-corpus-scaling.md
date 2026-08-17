# Nationwide Corpus Scaling and Public-Record Quality Contract

**Status:** Accepted governing specification / public A→B→C model

This document governs nationwide corpus expansion for the Yukue Series and must be read before Matsuri corpus expansion, future-site corpus work, or bulk-ingestion changes.

## Purpose

The Yukue Series must scale from dozens of records to national coverage without waiting for every subject to have deep history before it can appear publicly.

The governing model is:

```text
Tier A  Public Index
  ↓ within 7 calendar days
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

Tier A must be publicly visible and machine-readable. It may appear in browse/search pages, public JSON, sitemap, and search-engine discovery surfaces.

Tier A must be visibly labeled so users and machines can distinguish it from verified Tier B/C records. It must not claim:

- that an occurrence was held merely because a date elapsed;
- a Current State that has not been evidence-verified;
- an organizer, Place, Relation, coordinate, history, or official link that has not been supported;
- that Tier A is equivalent to a completed verified record.

A name + location + public source is acceptable at Tier A when those fields themselves are reviewed and source-backed. That is the purpose of the public Index layer.

## Tier A promotion SLA — 7 days

Tier A is a temporary public state, not a permanent shallow class.

Every newly published Tier A record must include:

```text
tier_a_published_at
tier_b_due_at = tier_a_published_at + 7 calendar days
```

Rules:

1. every Tier A record must be promoted to Tier B no later than its `tier_b_due_at`;
2. the repository must expose the number and IDs of Tier A records due within 48 hours and overdue;
3. if **any Tier A record is overdue**, publication of the next Tier A expansion wave is blocked;
4. overdue Tier A records must be worked before new breadth publication;
5. the SLA may not be satisfied by filling unknowns, inferring outcomes, or fabricating Evidence;
6. if a record cannot responsibly satisfy Tier B by the deadline because the required evidence cannot be established, it must be withdrawn from the Public Projection back to candidate/research state rather than remain a permanent shallow public record;
7. a withdrawn record may return as Tier A in a later wave only when there is a credible path to Tier B inside the same 7-day SLA.

The intended operating rhythm is therefore:

```text
publish bounded Tier A wave
→ complete every record to Tier B within 7 days
→ clear overdue count to zero
→ publish next Tier A wave
```

This gives national breadth immediately while preventing a growing graveyard of permanently thin records.

## Tier B — Public Verified

Tier B is the normal verified product layer.

A Matsuri Tier B record requires Tier A plus reviewed, Evidence-backed coverage for the applicable dimensions:

1. substantive Japanese summary / description;
2. approved Current State Snapshot with claim-linked Evidence;
3. Place, route, multi-place, or distributed-place treatment where supportable;
4. organizer / responsible organization when supportable, with explicit unknown/source ceiling when not responsibly establishable;
5. relevant Shrine / Temple / Organization Relations when the relationship is actually supported;
6. timing / recurrence where supportable;
7. direct profile / identity Evidence;
8. authoritative external links reviewed for officiality / publisher role;
9. at least one dated observation anchor, which may be an evidence-backed Occurrence or an evidence-backed Change Event.

Tier B does **not** require multi-year history before promotion. A current scheduled Occurrence may be the dated observation anchor when properly evidenced; it then carries the normal freshness obligation.

Evidence ceilings must remain explicit. Tier B must never be achieved by converting unsupported facts to `unknown` merely to pass a gate.

## Tier C — Public History / Monitoring

Tier C adds longitudinal value beyond Tier B.

Tier C includes one or more of:

- multiple dated Occurrences across different years;
- evidence-backed cancellation / postponement / partial-held / revival history;
- meaningful Change Events explaining format, governance, venue, continuity, or state changes;
- active scheduled-Occurrence freshness monitoring;
- richer Relation history where supported;
- explicit monitoring obligations for current/future change.

Tier C is continuously deepened. Not every Tier B record must become Tier C within seven days; the seven-day SLA applies only to A→B.

## Existing corpus

The current reviewed Matsuri specialist-primary corpus is not a special permanent class. It must be classified under the same A/B/C model.

Existing records already contain substantial State / Occurrence / Change / Evidence depth, so many should classify as Tier B or Tier C once the machine classifier is aligned with this contract. Missing profile fields and source gaps remain repair work; they do not justify freezing national expansion.

## Public growth requirement

The project must not remain near the initial ~57 specialist-primary records while accumulating private candidates.

Successful expansion must report separately:

```text
private candidates discovered
Tier A public records
Tier A due within 48h
Tier A overdue
Tier B verified records
Tier C history/monitoring records
new Tier A published in current wave
Tier A promoted to B in current wave
records withdrawn for failure to reach B safely
prefecture coverage
municipality coverage
source-family coverage
```

Candidate count alone is not a public-growth metric.

## Wave sizing

Tier A expansion is wave-based so the seven-day promotion promise remains credible.

Before each new Tier A wave, the system must confirm:

```text
overdue Tier A = 0
previous-wave Tier A→B completion = 100% or explicitly withdrawn
no unresolved identity conflicts in the proposed wave
source provenance captured for every proposed Tier A record
```

Initial wave size is established by NCS-06 throughput measurement. Later waves may grow only when the preceding wave met the seven-day Tier B SLA without quality-gate bypasses.

## Automation boundary

Automation is required for national scale.

Automation may:

- discover subjects from authoritative structured / enumerated sources;
- normalize names and geography;
- classify source type and publisher;
- create reviewed Tier A drafts;
- calculate Tier A publication and Tier B due dates;
- extract candidate Place / timing / organizer / Relation facts;
- create draft Source / Evidence mappings;
- flag duplicate / identity conflicts;
- assemble Tier B review packets;
- generate A/B/C coverage, SLA, and backlog reports.

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
NCS-06  first bounded Tier A public wave + full A→B completion within 7 days
NCS-07  cumulative 500 public Matsuri primary records with Tier A overdue = 0
NCS-08  cumulative 1,000 public Matsuri primary records with Tier A overdue = 0
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

Each site must define its own Tier A fields and Tier B verification dimensions, but the operating principle is the same:

```text
public Tier A breadth
→ Tier B within 7 days
→ Tier C longitudinal deepening
```

Matsuri Relation seeds for Shrine / Temple do not automatically become future-site Tier A records; they must pass that site's Tier A identity/source requirements first.

No future site may launch as a tiny hand-curated database with no scale path.

## Change control

This document is a governing specification.

Any change that makes Tier A private, removes the seven-day A→B SLA, allows overdue Tier A backlog to grow while publishing new waves, weakens fail-closed Evidence semantics, or treats candidate count as public coverage requires an explicit new decision in `docs/decision-log.md` and corresponding schedule/status changes.
