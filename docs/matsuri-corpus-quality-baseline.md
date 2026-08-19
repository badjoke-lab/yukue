# Matsuri Corpus A/B/C Quality Baseline

**Status:** NCS-06 release-ready measurement / A/B/C classifier aligned

## Governing contract

This baseline is measured under:

```text
docs/nationwide-corpus-scaling.md
```

The public model is:

```text
Tier A  Public Index
  ↓ target: about 7 calendar days
Tier B  Public Verified
  ↓ continuous deepening
Tier C  Public History / Monitoring
```

Tier A is intentionally public. Completed Occurrence history, Change Events, multi-year history, Current State, organizer, Place, Relation, and coordinates are not Tier A publication prerequisites. Unsupported dimensions remain absent rather than being inferred.

The seven-day A→B value is a work target and prioritization rule, not a global release blocker or automatic withdrawal rule.

## Exact NCS-06 release-ready measurement

Observed from GitHub Actions workflow run `32161043573`, job `95789744900`, at `2026-08-18T16:35:24.944Z` (`2026-08-19` JST), after the authentic release timestamp was assigned to the three NCS-06 wave records.

```text
All public Entities                         123
Legacy primary subjects                      61
Specialist primary subjects                  60
  Festival                                   50
  Folk Performance                           10

Tier A — Public Index                        22
Tier B — Public Verified                      8
Tier C — Public History / Monitoring         30
Below Tier A                                  0
Public specialist-primary total              60
```

Compared with the pre-wave 57-record baseline, NCS-06 adds three actual public Tier A records. Candidate counts are not counted as public growth.

## Historical / observation depth

```text
At least 1 completed Occurrence year        52 / 60
At least 2 completed Occurrence years       37 / 60
Evidence-backed Change Events               57 / 60
Current State Evidence                      56 / 60
Direct profile Evidence                     42 / 60
```

These values describe depth. They are not Tier A publication floors.

## Tier A interpretation

All 60 current specialist-primary public records satisfy the machine-checkable Tier A identity/geography/source baseline. None is below Tier A.

The three NCS-06 records are:

```text
久多の花笠踊            Tier A
平戸のジャンガラ        Tier A
間々田のじゃがまいた    Tier A
```

Their Tier A release timestamp is `2026-08-18T16:33:34Z` (`2026-08-19 01:33:34 JST`). The A→B target clock starts from that authentic release time.

The 19 legacy Tier A records still do not have authentic Tier A publication timestamps. Their age remains unknown rather than being guessed.

```text
Tier A due within 48 hours                    0
Tier A overdue                                0
Tier A publication metadata missing          19
```

## Tier A → B work dimensions

Measured missing Tier B dimensions among the 22 current Tier A records:

```text
direct profile Evidence missing             18
approved Current State missing                4
Current State Evidence missing                4
timing / recurrence signal missing            4
dated observation anchor missing              3
Place model missing                           2
```

For the three new records, these missing dimensions are expected Tier A omissions. They are promotion work, not evidence defects and not reasons to suppress the records.

No missing dimension may be repaired by inference. If evidence does not support promotion, the record remains public at Tier A while research continues.

## Tier B and Tier C

Eight records classify as Tier B. Thirty classify as Tier C. NCS-06 does not demote or rewrite those existing records.

Tier C signals include longitudinal Occurrence history, evidence-backed Change Events, and active freshness-monitoring obligations. Tier C remains a depth layer rather than a prerequisite for Tier A or Tier B publication.

## Geographic and source-family coverage

```text
Prefectures represented                       47
Municipality scopes represented               57
```

Identity/profile source-family Entity coverage:

```text
municipal_official                             1
municipality                                  24
national_cultural_database                     1
official_organization                         23
official_tourism                               2
official_tourism_body                          4
preservation_group_official                    1
public_authority                               3
public_tourism_body                            1
shrine_official                                5
```

The three NCS-06 records use Culture Agency public-authority Sources and approved entity-identity Evidence.

## Publication boundary

The quality classifier measures the canonical public corpus; it does not auto-approve records or invent missing facts.

NCS-06 preserves these rules:

- Tier A is public.
- A→B target age is seven days.
- overdue Tier A does not globally stop unrelated valid Tier A publication.
- valid Tier A is not auto-withdrawn only because seven days elapsed.
- completed Occurrence is not a Tier A requirement.
- Change Event is not a Tier A requirement.
- multi-year history is not a Tier A or Tier B publication requirement.
- Relation and Entity external-link presence are not Tier A requirements when authoritative Source/Evidence requirements are satisfied.
- machine classification does not auto-approve A→B promotion.
- Jinja, Jiin, and Tomurai remain inactive.

## Next checkpoint

After NCS-06 production verification, NCS-07 advances the public specialist-primary corpus from 60 toward 500 while A→B work on newly published Tier A records proceeds in parallel.

Independent Matsuri freshness failures remain fail-closed. They are not repaired by inference and do not redefine the nationwide A/B/C publication model.
