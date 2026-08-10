# Matsuri Batch 38 Production Verification — 2026-08-10

## Status

Passed.

## Purpose

This audit closes exact canonical-production verification for Matsuri corpus expansion Batch 38.

The production baseline is pinned to the Batch 38 implementation release:

```text
03a6bcb8b58d3bc37e200c2eb4f7d6e41c7923d7
```

## Exact canonical result

Canonical-origin workflow run `31367603570` succeeded on attempt 1 against:

```text
https://matsuri-yukue.badjoke-lab.com
```

Verified exact counts:

| Production family | Count |
|---|---:|
| Entity | 110 |
| Change Event | 101 |
| Relation | 65 |
| Occurrence | 160 |
| Sitemap entry | 220 |

The canonical verifier passed against the Batch 38 machine baseline without relaxing any expected count, route, Entity, or Occurrence assertion.

## Batch 38 routes

The canonical baseline requires the new Gunma breadth routes:

- `/festivals/kiryu-yagibushi-matsuri/`;
- `/organizations/kiryu-yagibushi-matsuri-kyosankai/`;
- `/places/kiryu-yagibushi-center-route/`.

All retained required production routes from earlier baselines remain part of the same verification contract.

## Required Entity and Occurrence assertions

The Batch 38 production baseline adds:

- `fst-kiryu-yagibushi-matsuri`;
- `org-kiryu-yagibushi-matsuri-kyosankai`.

The new historical occurrence assertion is:

| Occurrence | Record version | Outcome | Scale |
|---|---:|---|---|
| `occ-kiryu-yagibushi-2024` | 1 | held | unknown |

The held outcome is supported by the three municipal day pages for August 2–4, 2024, each explicitly marked ended. No attendance or scale is inferred.

No 2026 held assertion is added. The current 2026 municipal material supports active State, schedule, and venue context, but elapsed dates alone are not treated as post-event Evidence.

## Corpus position

Batch 38 adds 桐生八木節まつり as the first approved primary Matsuri record for 群馬県 and advances primary-record prefecture coverage to:

```text
42 / 47 prefectures
```

Five prefectures remain uncovered:

```text
新潟県
長野県
和歌山県
山口県
宮崎県
```

The verified repository corpus contains:

```text
Entities          110
Places            100
State Snapshots    51
Change Events     101
Occurrences       160
Relations          65
Designations       29
Sources           285
Evidence          645
```

No sparse primary Entity remains under the current corpus-coverage rule.

## Modeling boundary

桐生八木節まつり is modeled with one distributed center-city route Place covering the reviewed 本町通り・末広通り・錦町通り context. The route does not receive fabricated coordinates.

The 1964 start of the annual predecessor `桐生まつり` and the 1988 rename to `桐生八木節まつり` are each stored at year precision using the existing `other` Change Event type. The annual recurrence records the reviewed first-week-of-August Friday/Saturday/Sunday pattern. The organizer is linked through an evidence-backed `organized_by` Relation to 桐生八木節まつり協賛会.

## Map contract

The center-city route remains non-point geometry. The approved map target is the reviewed 桐生市 第63回公式チラシ PDF containing the center-city venue and traffic-regulation map.

No coordinate is invented to satisfy the map contract.

## Repository and visual verification

Implementation PR #224 passed the repository verification chain on implementation head:

```text
b41632cce8696dcfba53c00505ef7a89ee26d174
```

Key workflow runs include:

```text
Complete repository CI                 31366245785
Corpus coverage                        31366245685
Relation coverage                      31366245735
Data freshness                         31366245771
Canonical dataset contract             31366245701
Correction contract                    31366245734
External-link maintenance              31366245722
Detail C navigation                    31366245714
Bundle inventory / repository baseline 31366245746
Future-site seed inventory             31366245742
Future-site seed readiness             31366245696
Jinja start-gate                       31366245837
Full-page screenshot review            31366245708
```

Corpus artifact:

```text
ID      9054240975
SHA256  ab2c5042b404a76f3ff60df77e6b3f63a984acc3aa0f0a46736d19722efb130d
```

Release-candidate artifact:

```text
ID      9054387006
SHA256  d92e7dd76215c4eb12ec9b5755e9e82532a25c0c1d66f49698263000027917bf
```

The verified release candidate contains 220 sitemap entries and all three new Kiryu routes.

Full-page screenshot artifact:

```text
ID      9054483208
Name    matsuri-full-page-screenshots-all-31366245708
SHA256  8b2bbe8230b6745ad48c0153c3f96f278e51b37ed8c4d91b36af40ead8499511
Size    198300706 bytes
```

## Production-baseline verification

Production-baseline PR #226 passed:

```text
Complete repository CI  31367603560
Canonical-origin gate   31367603570
Canonical attempt       1
```

The machine-checked production baseline is stored in `config/matsuri-production-baseline.json`.

## Merge record

- Batch 38 implementation PR: #224;
- implementation release: `03a6bcb8b58d3bc37e200c2eb4f7d6e41c7923d7`;
- corpus-audit PR: #225;
- corpus-audit merge: `94bfca60d3ccece75bff9e9e7805c66fbf66e5b4`;
- production-baseline PR: #226;
- production-baseline merge: `b84c83cf85096fb3215a4645d8e6e52f6eabe8fc`.

## Boundaries

- this audit proves canonical route structure, exact feed counts, sitemap inventory, required Entities, and reviewed Occurrence assertions; it does not claim search-engine indexation;
- no distributed-route coordinate is invented;
- no 2026 held outcome is inferred from elapsed dates;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- stabilization remains a separate gate and is not completed by this audit;
- 2026-08-10 makes the stabilization review eligible to occur, but elapsed time alone does not complete it.

## Result

Batch 38 exact canonical-production verification is complete.

Matsuri corpus expansion remains active. The next corpus batch is Batch 39, using the five remaining uncovered prefectures as the breadth pool while continuing evidence-backed depth and dated maintenance work.

The formal Matsuri stabilization review is eligible, but remains `observing` until every required review item and public-safe evidence record is completed. Jinja remains blocked.
