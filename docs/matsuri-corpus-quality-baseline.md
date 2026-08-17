# Matsuri Corpus A/B/C Quality Baseline

**Status:** NCS-02 measured baseline / A/B/C classifier aligned / NCS-06 bulk publication not yet authorized

## Governing contract

This baseline implements the measurement step required by:

```text
docs/nationwide-corpus-scaling.md
```

The governing public model is:

```text
Tier A  Public Index
  ↓ target: about 7 calendar days
Tier B  Public Verified
  ↓ continuous deepening
Tier C  Public History / Monitoring
```

Tier A is a valid public product layer. A completed Occurrence, Change Event, or multi-year history is not required merely to publish a source-backed Tier A record.

The seven-day A→B value is a work target and prioritization rule. An overdue Tier A record does not block unrelated valid Tier A publication and is not automatically withdrawn.

This NCS-02 baseline measures the current corpus. It does not by itself authorize the first NCS-06 bulk public wave.

## Exact measured baseline

Observed from GitHub Actions workflow run `32080250053`, job `95541708043`, at `2026-08-17T23:24:40.123Z` (`2026-08-18` JST).

```text
All public Entities                         120
Legacy primary subjects                      58
Specialist primary subjects                  57
  Festival                                   49
  Folk Performance                            8

Tier A — Public Index                        19
Tier B — Public Verified                      8
Tier C — Public History / Monitoring         30
Below Tier A                                  0
Public specialist-primary total              57
```

Current historical/observation depth remains useful as a descriptive baseline:

```text
At least 1 completed Occurrence year        52 / 57
At least 2 completed Occurrence years       37 / 57
Evidence-backed Change Events               57 / 57
Current State Evidence                      56 / 57
Direct profile Evidence                     39 / 57
```

The `37 / 57` multi-year value is **not** a release floor for new Tier A or Tier B records. It is only a measurement of the current corpus.

## Tier A interpretation

All 57 current specialist-primary public records satisfy the machine-checkable Tier A identity/geography/source baseline. None is classified below Tier A.

Tier A requires the public Index minimum: reviewed identity, geographic scope, reviewed source-backed identity provenance, source verification/access date, and a deterministic duplicate-clear identity check.

Tier A does **not** require:

- an approved Current State;
- a completed Occurrence;
- a Change Event;
- multi-year history;
- a Place or coordinate;
- an organizer;
- a Relation;
- a substantive long description.

Those fields may be present when supported, but missing Tier B/C dimensions do not make a valid Tier A non-public.

## Tier A → B work dimensions

The 19 current Tier A records are public records that need additional verified dimensions before Tier B classification.

Measured missing Tier B dimensions among those 19 records:

```text
direct profile Evidence missing             18
approved Current State missing                1
Current State Evidence missing                1
timing / recurrence signal missing            1
```

These are promotion priorities, not global release blockers.

No missing dimension may be repaired by inference. If Evidence cannot yet support the field, the record remains public as Tier A and the missing reason remains visible to the machine report.

## Tier A publication age

The current legacy data model does not contain an authentic `tier_a_published_at` timestamp for the 19 records that now classify as Tier A.

Therefore the classifier reports:

```text
Tier A due within 48 hours                    0
Tier A overdue                                0
Tier A publication metadata missing          19
```

The first two values do **not** mean that all 19 records are known to be within target. Their publication age is unknown. The classifier deliberately does not backfill a guessed publication date from repository age, Git history, or another unrelated timestamp.

NCS-04/NCS-06 publication plumbing must write the real Tier A publication timestamp for newly published Tier A records so later reports can calculate the seven-day target honestly.

## Tier B and Tier C interpretation

Eight current records classify as Tier B. They satisfy the Tier B verification dimensions but do not yet have one of the configured Tier C depth/monitoring signals.

Thirty current records classify as Tier C because they satisfy Tier B and carry longitudinal depth or an active freshness-monitoring obligation.

Tier C signals currently measured include:

- completed Occurrences across multiple years;
- multiple completed evidenced Occurrences;
- multiple evidence-backed Change Events;
- an evidence-backed scheduled/unknown Occurrence that creates an active freshness-monitoring obligation.

Tier C is not a publication prerequisite for Tier A or Tier B.

## Geographic and source-family baseline

Current specialist-primary coverage:

```text
Prefectures represented                       47
Municipality scopes represented               55
```

Identity/profile source-family entity coverage in the current reviewed canonical corpus:

```text
municipal_official                             1
municipality                                  24
national_cultural_database                     1
official_organization                         23
official_tourism                               2
official_tourism_body                          4
preservation_group_official                    1
public_tourism_body                            1
shrine_official                                5
```

These values are a baseline for NCS-03 source-inventory work, not a claim that the source inventory is already nationally complete.

## Growth metrics

This NCS-02 run is a current-corpus baseline, so it does not fabricate growth values that are not derivable from the public canonical dataset.

The report therefore keeps:

```text
candidate_count       unavailable from public canonical dataset
new_public_growth     unavailable for first A/B/C baseline checkpoint
```

Future NCS work must report private candidate discovery separately from public A/B/C growth. Candidate count alone is never a public-coverage result.

## Publication and automation boundaries

NCS-02 records the classification model and baseline only.

It preserves these boundaries:

- Tier A is public.
- Tier B target age is seven days.
- overdue Tier A does not stop unrelated valid Tier A publication.
- valid Tier A is not auto-withdrawn only because seven days elapsed.
- completed Occurrence is not a Tier A requirement.
- Change Event is not a Tier A requirement.
- multi-year history is not a Tier A or Tier B publication requirement.
- machine classification does not auto-approve publication or A→B promotion.
- private candidate records are not public until the Tier A minimum is actually satisfied.
- NCS-02 itself does not authorize the first bulk public wave.
- NCS-02 does not authorize Jinja, Jiin, or Tomurai activation.

## Next sequence

After NCS-02:

```text
NCS-03  national authoritative-source inventory
NCS-04  deterministic candidate + Tier A importer / identity-dedupe pipeline
NCS-05  bulk dry run + Tier A publication-readiness audit
NCS-06  first bounded Tier A public wave + continuous A→B promotion
NCS-07  cumulative 500 public Matsuri primary records
NCS-08  cumulative 1,000 public Matsuri primary records
NCS-09  source-inventory-derived national target + continued A→B→C expansion
```

Matsuri freshness maintenance continues in parallel. An unresolved post-event outcome must not be guessed to make a gate green, but those independent maintenance cases do not redefine Tier A or stop nationwide corpus work.
