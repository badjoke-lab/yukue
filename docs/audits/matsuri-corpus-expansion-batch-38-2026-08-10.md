# Matsuri Corpus Expansion Batch 38 — 2026-08-10

## Status

Passed repository, corpus, freshness, Relation, Detail C, full-page visual, future-site seed, Jinja-boundary, and repository-baseline verification.

Exact canonical-production verification remains a separate gate and must be recorded after the production baseline is advanced to the merged Batch 38 release.

## Scope

Batch 38 adds 桐生八木節まつり as the first approved primary Matsuri record for 群馬県.

Implementation was merged through PR #224 as:

```text
03a6bcb8b58d3bc37e200c2eb4f7d6e41c7923d7
```

The reviewed implementation head was:

```text
b41632cce8696dcfba53c00505ef7a89ee26d174
```

The reviewed public corpus adds:

- `fst-kiryu-yagibushi-matsuri` — 桐生八木節まつり Festival;
- `org-kiryu-yagibushi-matsuri-kyosankai` — 桐生八木節まつり協賛会 Organization;
- `plc-kiryu-yagibushi-center-route` — 本町通り・末広通り・錦町通りを中心とする distributed route Place;
- Current State `active`;
- annual first-week-of-August Friday/Saturday/Sunday recurrence;
- the August 2–4, 2024 edition as `held / unknown`;
- a year-level 1964 start Change Event;
- a year-level 1988 rename Change Event;
- an `organized_by` Relation to 桐生八木節まつり協賛会;
- seven reviewed municipal Sources and twelve claim-linked Evidence records.

The 2024 held outcome is supported by three municipal day pages, each explicitly marked ended. No attendance or scale is inferred.

The 2026 municipal page supports the current active State, schedule, and venue context. Batch 38 deliberately does **not** infer a 2026 held outcome merely because August 7–9 have elapsed; no 2026 Occurrence is added without explicit post-event Evidence.

## Exact repository corpus

The Batch 38 corpus-coverage workflow passed on implementation head `b41632cce8696dcfba53c00505ef7a89ee26d174` as run `31366245685`.

Batch 38 advances the canonical corpus to:

| Family | Count |
|---|---:|
| Entities | 110 |
| Places | 100 |
| State Snapshots | 51 |
| Change Events | 101 |
| Occurrences | 160 |
| Occurrence Series | 52 |
| Recurrence Patterns | 52 |
| Relations | 65 |
| Designations | 29 |
| Sources | 285 |
| Evidence | 645 |

The Batch 38 increment from the Batch 37 checkpoint is:

```text
Entities          +2
Places            +1
State Snapshots   +1
Change Events     +2
Occurrences       +1
Occurrence Series +1
Recurrence        +1
Relations         +1
Sources           +7
Evidence         +12
```

No sparse primary Entity is introduced by this batch.

Repository maintenance baseline after Batch 38:

```text
F1 batches                    13
Maintenance bundles           84
Correction bundles            21
Additive application slots    97
Correction application slots  21
Correction records            35
Corrected logical IDs         32
Public Entities              110
Entities without external links 0
```

Corpus artifact:

```text
ID      9054240975
Name    matsuri-corpus-coverage-d1f4dbbb4f6f8fd543a27a3b75e6f6b1f5b9227e
SHA256  ab2c5042b404a76f3ff60df77e6b3f63a984acc3aa0f0a46736d19722efb130d
```

## Geographic coverage

Batch 38 moves primary-record prefecture coverage from 41 to 42 prefectures.

群馬県 is now covered through 桐生八木節まつり.

Five prefectures remain without an approved primary Matsuri record:

```text
新潟県
長野県
和歌山県
山口県
宮崎県
```

## Detail C and map contract

Required new public routes are:

```text
/festivals/kiryu-yagibushi-matsuri/
/organizations/kiryu-yagibushi-matsuri-kyosankai/
/places/kiryu-yagibushi-center-route/
```

Detail C navigation workflow `31366245714` passed on the implementation head.

The center-city festival area is kept as route geometry rather than fabricating a point coordinate. The approved official-map target is the 桐生市第63回公式チラシ PDF, which contains the center-city venue and traffic-regulation map.

Canonical dataset, Relation coverage, data freshness, correction contract, external-link maintenance, bundle inventory, future-site seed inventory/readiness, and Jinja start-gate checks also passed on the same implementation head.

## Full-page visual verification

Full-page screenshot workflow run `31366245708` passed on the implementation head.

Screenshot artifact:

```text
ID      9054483208
Name    matsuri-full-page-screenshots-all-31366245708
SHA256  8b2bbe8230b6745ad48c0153c3f96f278e51b37ed8c4d91b36af40ead8499511
Size    198300706 bytes
```

The successful workflow confirms the full-page visual-review gate completed for the Batch 38 implementation.

## Repository verification

The implementation head `b41632cce8696dcfba53c00505ef7a89ee26d174` passed the PR verification chain, including:

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

The implementation subsequently squash-merged to main as `03a6bcb8b58d3bc37e200c2eb4f7d6e41c7923d7`.

## Release-candidate verification

Complete repository CI produced release-candidate artifact:

```text
ID      9054387006
Name    matsuri-release-candidate-d1f4dbbb4f6f8fd543a27a3b75e6f6b1f5b9227e
SHA256  d92e7dd76215c4eb12ec9b5755e9e82532a25c0c1d66f49698263000027917bf
```

The unpacked release candidate verifies:

```text
Entities          110
Change Events     101
Relations          65
Occurrences       160
Sitemap entries   220
```

The sitemap contains all three new public routes listed above.

## Production boundary

At the time this corpus audit is recorded, `config/matsuri-production-baseline.json` still points to the Batch 37 release `a0f1dfc3a241479c419e745cf8f04fbe33be9aae`.

Therefore this document accepts Batch 38 repository/corpus quality but does **not** claim exact canonical production parity yet.

The next production gate must advance the baseline to the exact Batch 38 merge commit and verify the canonical hostname against:

```text
Entities          110
Change Events     101
Relations          65
Occurrences       160
Sitemap entries   220
```

The production assertion should add `occ-kiryu-yagibushi-2024` as record version 1 `held / unknown`. No 2026 held assertion should be added unless separate post-event Evidence exists.

## Future-site boundary

Batch 38 adds no Shrine or Temple seed.

```text
Relation-backed Shrine seeds   23
Approved Jinja State Snapshots  0
```

Jinja remains blocked. This audit does not authorize `apps/jinja`, a Jinja Worker, hostname activation, publication, or any inferred Shrine Current State.

## Stabilization boundary

The Matsuri stabilization review remains `observing`. The formal review is eligible as of 2026-08-10, but minimum-duration completion is not automatic. Batch 38 contributes another real evidence/modeling observation: a recently elapsed 2026 schedule is not converted to `held` without explicit post-event Evidence.

## Result

Batch 38 repository work is accepted for corpus quality:

- 群馬県 is represented by a non-sparse primary Festival record with an Organization Relation, route Place, Current State, annual recurrence, a verified 2024 held occurrence, and two historical Change Events;
- public Entity count is 110;
- primary prefecture coverage is 42 / 47;
- no sparse primary Entity is introduced;
- canonical dataset, freshness, Relations, Detail C, visual review, repository baseline, future-site seed gates, Jinja guard, and complete repository CI pass;
- Jinja remains explicitly blocked;
- stabilization remains observing.

Next gate: advance `config/matsuri-production-baseline.json` to release `03a6bcb8b58d3bc37e200c2eb4f7d6e41c7923d7` and require exact canonical-production verification before Batch 38 is closed.
