# Nationwide Corpus Scaling and Public-Record Quality Contract

**Status:** Accepted direction / pre-implementation governing specification

This document governs nationwide corpus expansion for the Yukue Series and must be read for Matsuri corpus expansion, future-site seed work, and any bulk-ingestion design.

## Purpose

The Yukue Series must scale beyond a small demonstration corpus without turning into a shallow directory.

The required model is:

```text
large candidate discovery capacity
+
strict public-record minimum
+
continuous historical / observation deepening
```

National breadth and record depth are separate metrics. Neither may be used to substitute for the other.

47 / 47 prefecture presence is a geographic seed baseline. It is not nationwide corpus completion.

## Non-public candidate layer

Bulk discovery may create private or unpublished candidates containing only enough information for identity and source review, such as:

```text
candidate name
candidate type
prefecture / municipality
source URL
source classification
possible duplicate keys
```

These candidates are research inputs only.

They:

- do not enter the approved Public Projection;
- do not receive public specialist detail pages;
- do not count toward public national-coverage metrics;
- must not be represented as completed records;
- may remain thin because they are not public product records.

A name + location + link shell is therefore a candidate, not a public record.

## Public primary-record rule

Every newly published primary specialist record must satisfy a substantive public-record contract. Existing reviewed records are not a privileged high-quality legacy tier surrounded by permanently shallow new records.

For Matsuri, a new primary Festival or Folk Performance must have reviewed, evidence-bounded coverage for at least:

1. canonical identity and entity boundary;
2. substantive Japanese summary and description rather than generated filler or a rewritten source title;
3. type / kind and geographic scope;
4. prefecture and municipality when the subject is municipality-bounded, or an explicitly modeled distributed scope when it is not;
5. usual timing / recurrence when supportable, or an explicitly evidenced unknown rather than inference;
6. an appropriate Place, route, multi-place, or distributed-place model when the evidence supports one;
7. official or authoritative public information link(s), with reviewed absence recorded when no such link can responsibly be established;
8. an approved Current State Snapshot with claim-linked Evidence; `unknown` must not be used as a shortcut around research;
9. at least one evidence-backed dated completed Occurrence with a non-`scheduled` outcome, or an evidence-backed Change Event when a completed Occurrence cannot responsibly be established;
10. Source / Evidence coverage across both identity/profile and observation dimensions;
11. deterministic identity / duplicate checks before approval.

Missing optional data is allowed when the source record genuinely does not support it. Missing required dimensions are not filled with invented facts and do not become public merely to increase counts.

## Public depth classes

Depth classes are quality measurements over approved records, not permission to publish thin shells.

Planned derived classes:

```text
public_core
history_enriched
monitored
```

`public_core` already satisfies the substantive minimum above.

`history_enriched` adds meaningful historical density beyond the minimum, such as multiple dated Occurrences across different years, one or more evidence-backed Change Events, or similarly strong longitudinal context appropriate to the subject.

`monitored` adds an active freshness / due-review obligation for current or future change.

The exact machine classifier and thresholds must be implemented and measured against the existing corpus before the first bulk public release.

## Depth-preservation guard

Nationwide expansion must not create thousands of `public_core` records while only the initial corpus receives historical work.

Before bulk public publication is allowed, the repository must implement machine-readable quality metrics and a release gate that enforces all of the following:

- corpus-wide depth distribution is measured before and after each expansion wave;
- a release cannot materially degrade the accepted depth distribution;
- no expansion wave may consist only of net-new breadth work;
- the number of distinct substantive depth upgrades in an expansion release train must be at least the number of newly published primary Entities in that release train;
- a public record that remains below the accepted history-enriched target enters a bounded promotion backlog;
- net-new breadth is blocked when the promotion backlog exceeds its accepted bound;
- exceptions caused by genuine source ceilings must be explicit and machine-visible rather than silently treated as complete.

This prevents a permanent two-class corpus in which old records are rich and new records remain directory entries.

## Automation boundary

Automation is required for scale, but approval remains fail-closed.

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
- publish index-only shells as primary records.

## Nationwide coverage metrics

Coverage reporting must distinguish at least:

```text
candidate subjects discovered
approved public primary records
public_core records
history_enriched records
monitored records
prefecture coverage
municipality coverage
source-family coverage
records with completed Occurrence history
records with Change Events
records with current State Evidence
```

Raw Entity count is not sufficient by itself.

## Matsuri scaling sequence

Nationwide Matsuri expansion must proceed through the following gates:

```text
NCS-01  governing specification and schedule alignment
NCS-02  machine quality/depth classifier over existing corpus
NCS-03  national authoritative-source inventory
NCS-04  deterministic candidate importer + identity/dedupe pipeline
NCS-05  non-public bulk dry run and error audit
NCS-06  first public-quality expansion pilot under the new gate
NCS-07  cumulative 500 public-quality primary Matsuri records
NCS-08  cumulative 1,000 public-quality primary Matsuri records
NCS-09  source-inventory-derived national coverage target and continued expansion
```

500 and 1,000 are scaling checkpoints, not claims of nationwide completeness.

The final national target must be derived from the documented source inventory and domain coverage rather than invented from a convenient round number.

## Future-site rule

The same anti-thin-record rule applies to:

```text
神社のゆくえ
寺院のゆくえ
弔いのゆくえ
```

State-free Shrine and Temple references used inside Matsuri may remain minimal cross-site seeds because their purpose is Relation / identity support for Matsuri.

They must not be promoted unchanged into the public primary corpus of the future specialist sites.

Before a future specialist site activates, it requires:

1. a site-specific State / observation specification;
2. a site-specific substantive public-record minimum;
3. an authoritative source inventory;
4. a candidate ingestion and dedupe path;
5. machine-readable quality/depth metrics;
6. a public quality gate;
7. an initial corpus that satisfies that quality gate.

Candidate acquisition for later sites may begin before public activation when it does not violate the site-start boundary. Public specialist-site implementation and publication remain separately gated.

## Existing corpus preservation

Existing approved Matsuri data remains valid and must not be downgraded to fit a bulk importer.

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

Any change that weakens the public minimum, allows index-only public primary records, removes the depth-preservation guard, or treats future-site seeds as specialist-site launch records requires an explicit new decision in `docs/decision-log.md` and corresponding schedule / status changes.
