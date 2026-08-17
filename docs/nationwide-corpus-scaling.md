# Nationwide Corpus Scaling and Public-Record Quality Contract

**Status:** Accepted governing specification / revised after NCS-02 scale review

This document governs nationwide corpus expansion for the Yukue Series and must be read for Matsuri corpus expansion, future-site seed work, and any bulk-ingestion design.

## Purpose

The Yukue Series must scale far beyond the initial reviewed corpus without turning into a shallow directory.

The required model is:

```text
large candidate discovery capacity
+
useful public standard records at national scale
+
continuous historical / observation deepening
```

National breadth and record depth are separate metrics. Public usefulness must not be confused with maximum historical depth.

47 / 47 prefecture presence is a geographic seed baseline. It is not nationwide corpus completion.

## Candidate layer

Bulk discovery may create private or unpublished candidates containing only enough information for identity and source review, such as:

```text
candidate name
candidate type
prefecture / municipality
source URL
source classification
possible duplicate keys
```

These are ingestion-stage research inputs, not the intended steady-state product.

A candidate is promoted as soon as the substantive public standard can be satisfied. The project must not accumulate a large private candidate inventory while leaving the public corpus near the initial ~57 specialist-primary records.

A raw name + location + link shell is therefore not a public record, but the existence of the candidate layer must never be used as an excuse to avoid public corpus growth.

## Public standard record

Every newly published primary Festival or Folk Performance must be useful as a standalone public page. It does **not** need to be history-rich before publication.

A new public standard record requires reviewed, evidence-bounded coverage for at least:

1. canonical identity and entity boundary;
2. a substantive Japanese summary and description, not generated filler or a rewritten source title;
3. type / kind and geographic scope;
4. prefecture and municipality when municipality-bounded, or an explicitly modeled distributed scope when not;
5. usual timing / recurrence when supportable, or an explicitly evidenced unknown rather than inference;
6. an appropriate Place, route, multi-place, or distributed-place model when evidence supports one;
7. at least one official, official-organization, or public-authority information link, or an explicit reviewed source-ceiling marker when none can responsibly be established;
8. an approved Current State Snapshot with claim-linked Evidence;
9. direct profile / identity Evidence supporting the subject itself;
10. at least one **dated observation anchor**: an evidence-backed Occurrence of any legitimate current outcome, or an evidence-backed Change Event;
11. deterministic identity / duplicate checks before approval.

The dated observation anchor is not required to be a completed historical Occurrence. A currently scheduled occurrence may qualify when it is evidence-backed and carries the normal freshness obligation. A Change Event may also qualify when it is the stronger observation for that subject.

This public standard is intentionally stronger than a directory shell but lighter than a multi-year archive entry. It is the primary vehicle for scaling from dozens to hundreds and then thousands of public records.

Missing optional data is allowed when sources genuinely do not support it. Missing required dimensions are not filled with invented facts.

## Public depth classes

Depth classes measure how far a public record has been deepened after it satisfies the public standard.

Derived classes:

```text
public_core
history_enriched
monitored
```

`public_core` means the record satisfies the substantive public standard above.

`history_enriched` means the record has meaningful longitudinal depth beyond `public_core`, normally including evidence-backed completed Occurrences in at least two distinct years, and/or multiple substantive evidence-backed Change Events. Exact scoring may be refined by NCS-02/NCS-06 measurement, but history enrichment is **not** a prerequisite for first publication.

`monitored` means the record carries an active freshness / due-review obligation for current or future change.

The NCS-02 measured baseline is recorded in:

```text
config/matsuri-corpus-quality-baseline.json
docs/matsuri-corpus-quality-baseline.md
```

The existing corpus already contains substantial observation depth, but the new standard also exposes profile gaps such as missing entity-level descriptions. Existing records are not exempt from those repairs.

## Scale rule: public growth is mandatory

The project must not interpret quality protection as permission to remain at roughly the initial 57 specialist-primary records.

Nationwide scaling requires all of the following in parallel:

```text
net-new public_core growth
existing-record profile repair
history enrichment
freshness maintenance
```

Candidate discovery without promotion is not a successful scaling milestone.

NCS reporting must therefore publish separate counts for:

```text
candidate subjects discovered
candidates ready for public review
new public_core records promoted
existing public_core records repaired
history-enriched records
monitored records
```

A release or milestone that only increases candidates does not count as public corpus expansion.

## Depth-preservation guard

Depth preservation must prevent a permanent shallow second class **without requiring every new public record to match the historical depth of the oldest records before publication**.

Before high-volume bulk publication, the repository must implement a release guard that enforces:

- 100% of newly published primary records satisfy `public_core`;
- no index-only shell can enter the Public Projection;
- every expansion release train includes both net-new public records and substantive deepening/repair work;
- records below the accepted history target remain in a machine-visible promotion backlog;
- the backlog has a bounded growth rule established from measured NCS-06 pilot throughput rather than an arbitrary pre-pilot ratio;
- breadth pauses only when the measured backlog bound is exceeded, not merely because a new record lacks multi-year history at first publication;
- genuine source ceilings are explicit and machine-visible.

The previously proposed requirement that every new record have both a completed Occurrence and a Change Event, and that 64.9% of each new release already have multi-year Occurrence history, is rejected as too restrictive for national-scale publication.

## Automation boundary

Automation is required for scale, while public approval remains fail-closed.

Automation may:

- discover candidates from authoritative enumerated or structured sources;
- normalize names and geography;
- classify sources;
- draft Basic Profile fields;
- extract candidate Place / timing / recurrence facts;
- create candidate Source and Evidence mappings;
- flag likely duplicates or identity conflicts;
- assemble review packets;
- generate deterministic coverage and quality reports.

Automation must not:

- approve public records without review;
- infer `held`, `cancelled`, `not_held`, or other Occurrence outcomes from elapsed dates or silence;
- infer Current State transitions without Evidence;
- fabricate descriptions, coordinates, Relations, or official links;
- use `unknown` as a shortcut to pass a publication gate;
- publish name/location/link shells as primary records;
- classify a one-observation record as history-rich merely to improve metrics.

## Nationwide coverage metrics

Coverage reporting must distinguish at least:

```text
candidate subjects discovered
candidates ready for review
approved public primary records
public_core records
history_enriched records
monitored records
prefecture coverage
municipality coverage
source-family coverage
records with dated observation anchors
records with completed Occurrence history
records with multi-year completed Occurrence history
records with Change Events
records with current State Evidence
```

Raw Entity count is not sufficient by itself, but public primary Entity growth is an explicit product objective.

## Matsuri scaling sequence

Nationwide Matsuri expansion proceeds through:

```text
NCS-01  governing specification and schedule alignment
NCS-02  machine quality/depth classifier over existing corpus
NCS-03  national authoritative-source inventory
NCS-04  deterministic candidate importer + identity/dedupe pipeline
NCS-05  bulk candidate dry run and error audit
NCS-06  first bounded public-standard expansion pilot
NCS-07  cumulative 500 public_core primary Matsuri records
NCS-08  cumulative 1,000 public_core primary Matsuri records
NCS-09  source-inventory-derived national target and continued expansion
```

500 and 1,000 are explicit public-corpus scale checkpoints. They are not claims of nationwide completeness.

The final national target must be derived from documented source inventory and domain coverage rather than invented from a convenient round number.

## NCS-06 pilot purpose

NCS-06 is not a private-only exercise. It must actually promote a bounded set of new records into the Public Projection under the public standard.

The pilot measures:

- researcher/reviewer throughput per promoted public record;
- description/profile Evidence cost;
- duplicate/conflict rate;
- source-ceiling frequency;
- post-publication history-enrichment cost;
- how quickly the promotion backlog grows and is reduced.

Those measurements, not the initial corpus's accidental historical distribution, define the first high-volume backlog bound for NCS-07.

## Future-site rule

The same anti-shell / pro-public-growth rule applies to:

```text
神社のゆくえ
寺院のゆくえ
弔いのゆくえ
```

State-free Shrine and Temple references used inside Matsuri may remain minimal cross-site seeds because their purpose is Relation / identity support for Matsuri.

They must not be promoted unchanged into the specialist-site Public Projection. But future specialist sites must also avoid the opposite failure mode of remaining at a tiny hand-curated corpus indefinitely.

Before a future specialist site activates, it requires:

1. a site-specific State / observation specification;
2. a site-specific substantive public-standard record contract;
3. an authoritative source inventory;
4. a candidate ingestion and dedupe path;
5. machine-readable quality/depth metrics;
6. a public quality gate;
7. an initial corpus that satisfies the gate;
8. an explicit scale path from the initial corpus to hundreds / thousands of useful public records where the domain supports it.

Exact depth dimensions may differ because Shrine, Temple, and Tomurai subjects do not share Matsuri Occurrence semantics.

## Existing corpus preservation and repair

Existing approved Matsuri data remains valid and must not be downgraded to fit a bulk importer.

Existing records are also not exempt from the new public-standard direction. Measured missing descriptions, profile Evidence, links, State, timing, and other gaps form a repair backlog to be addressed in parallel with national expansion.

Importers and quality classifiers must adapt to the current evidence model rather than weakening:

- Source / Evidence separation;
- Current State / Occurrence separation;
- Place / geographic-scope separation;
- Change Event semantics;
- Relation specificity;
- freshness fail-close behavior;
- correction and supersession contracts.

## Change control

This document is a governing specification.

Any change that allows name/location/link shells into the Public Projection, removes evidence-bounded State/profile requirements, abandons public corpus growth, or treats future-site seeds as finished specialist-site records requires an explicit new decision in `docs/decision-log.md` and corresponding schedule / status changes.
