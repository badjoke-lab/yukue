# Matsuri Corpus Expansion Batch 41 — 2026-08-10

## Status

Passed repository, corpus, freshness, Relation, Detail C, full-page visual, future-site seed, Jinja-boundary, stabilization, and repository-baseline verification.

Exact canonical-production verification remains a separate gate and must be recorded after the production baseline is advanced to the merged Batch 41 release.

## Scope

Batch 41 adds 山口祇園祭 as the first approved primary Matsuri record for 山口県 and adds 八坂神社 as a State-free Shrine seed reference.

Implementation was merged through PR #236 as:

```text
69d350e9e55ae93c829f8ab535b22bc8df5f3772
```

The final reviewed implementation head was:

```text
e7dec2af8937523b5964e56888ee53f8c2b1601e
```

The reviewed public corpus adds:

- `fst-yamaguchi-gion-matsuri` — 山口祇園祭 Festival;
- `shr-yamaguchi-yasaka-jinja` — 八坂神社 State-free Shrine seed reference;
- `plc-yamaguchi-yasaka-jinja` — 八坂神社 Place;
- `plc-yamaguchi-gion-route` — 御神幸・御還幸 route Place;
- Current State `active` for the Festival only;
- annual July 20–27 recurrence;
- the 2023 edition as `held / unknown`;
- a year-level 1459 first-edition/start Change Event;
- an evidence-backed `ritually_associated_with` Relation from the Festival to 八坂神社;
- six reviewed Sources and eleven claim-linked Evidence records.

The 2023 held outcome is supported by a municipal post-event tourism survey stating that traditional festivals including 山口祇園祭 returned to full-scale holding, while the municipal 2023 calendar supports the July 20–27 period boundary. Scale remains `unknown` because the project does not convert the survey's broad phrase into a record-level scale assertion without narrower Evidence.

The 2026 municipal material supports the current active State, dates, route context, and ritual connection to 八坂神社. Batch 41 deliberately does **not** infer a 2026 held outcome merely because July 20–27 has elapsed; no 2026 Occurrence is added without explicit post-event Evidence.

## Jinja-boundary correction

The first Jinja start-gate run correctly failed after the new 八坂神社 seed increased the candidate baseline. The machine record was updated from 23 to 24 Relation-backed Shrine seeds while preserving every start prerequisite as false and keeping approved Jinja State Snapshots at zero.

Final seed baseline:

```text
Relation-backed Shrine seeds   24
Direct identity Evidence       28
Place references               24
Approved State Snapshots        0
Official URLs                  18
Jinja start                     blocked
```

This was a baseline-alignment change only; it does not authorize Jinja implementation or publication.

## Exact repository corpus

The final Batch 41 corpus-coverage workflow passed on implementation head `e7dec2af8937523b5964e56888ee53f8c2b1601e` as run `31398523561`.

Batch 41 advances the canonical corpus to:

| Family | Count |
|---|---:|
| Entities | 116 |
| Places | 104 |
| State Snapshots | 54 |
| Change Events | 104 |
| Occurrences | 163 |
| Occurrence Series | 55 |
| Recurrence Patterns | 55 |
| Relations | 68 |
| Designations | 29 |
| Sources | 305 |
| Evidence | 676 |

The Batch 41 increment from the Batch 40 checkpoint is:

```text
Entities          +2
Places            +2
State Snapshots   +1
Change Events     +1
Occurrences       +1
Occurrence Series +1
Recurrence        +1
Relations         +1
Sources           +6
Evidence         +11
```

No sparse primary Entity is introduced by this batch.

Repository maintenance baseline after Batch 41:

```text
F1 batches                    13
Maintenance bundles           90
Correction bundles            21
Additive application slots   103
Correction application slots  21
Correction records            35
Corrected logical IDs         32
Public Entities              116
Entities without external links 0
```

Corpus artifact:

```text
ID      9066628557
Name    matsuri-corpus-coverage-e7ace95c656e055754a2ee2d790e757fcd7a66d5
```

## Geographic coverage

Batch 41 moves primary-record prefecture coverage from 44 to 45 prefectures.

山口県 is now covered through 山口祇園祭.

Two prefectures remain without an approved primary Matsuri record:

```text
和歌山県
宮崎県
```

## Detail C and map contract

Required new public routes are:

```text
/festivals/yamaguchi-gion-matsuri/
/references/shrines/yamaguchi-yasaka-jinja/
/places/yamaguchi-yasaka-jinja/
/places/yamaguchi-gion-route/
```

Detail C navigation workflow `31398523640` passed on the final implementation head, including real-browser verification.

八坂神社 has an authoritative address-backed map target. The distributed 御神幸・御還幸 route remains route geometry; no point coordinate is invented for it.

## Full-page visual verification

Full-page screenshot workflow run `31398523783` passed on the final implementation head.

Screenshot artifact:

```text
ID      9066977924
Name    matsuri-full-page-screenshots-all-31398523783
SHA256  e748d010087dd6e491de0517ad1bd10b0ca78395569455b889b2cd5a0abf055d
Size    200011912 bytes
```

## Repository verification

The final implementation head passed the required verification chain:

```text
Complete repository CI                 31398523580
Corpus coverage                        31398523561
Relation coverage                      31398523739
Data freshness                         31398523734
Canonical dataset contract             31398523631
Correction contract                    31398523686
External-link maintenance              31398523636
Detail C navigation                    31398523640
Bundle inventory / repository baseline 31398523671
Future-site seed inventory             31398523554
Future-site seed readiness             31398524231
Jinja start-gate                       31398523753
Stabilization review                   31398523678
Full-page screenshot review            31398523783
```

## Release-candidate verification

Complete repository CI produced release-candidate artifact:

```text
ID      9066818344
Name    matsuri-release-candidate-e7ace95c656e055754a2ee2d790e757fcd7a66d5
SHA256  e882c8b6df14090235239aec602e8343f9af20b43524a35af22de6fbf9858935
```

The unpacked release candidate verifies:

```text
Entities          116
Change Events     104
Relations          68
Occurrences       163
Sitemap entries   230
```

All four new public routes are present in the built artifact and sitemap.

## Production boundary

At the time this corpus audit is recorded, `config/matsuri-production-baseline.json` still points to the Batch 40 release `3e483cbb05f1416398ccefc56576116af4e9b126`.

Therefore this document accepts Batch 41 repository/corpus quality but does **not** claim exact canonical production parity yet.

The next production gate must advance the baseline to the exact Batch 41 merge commit and verify the canonical hostname against:

```text
Entities          116
Change Events     104
Relations          68
Occurrences       163
Sitemap entries   230
```

The production assertion should add `occ-yamaguchi-gion-2023` as record version 1 `held / unknown`. No 2026 held assertion should be added without separate post-event Evidence.

## Result

Batch 41 repository work is accepted for corpus quality. Primary prefecture coverage is 45 / 47, Jinja remains blocked with zero approved State Snapshots, and stabilization remains observing.

Next gate: advance `config/matsuri-production-baseline.json` to release `69d350e9e55ae93c829f8ab535b22bc8df5f3772` and require exact canonical-production verification before Batch 41 is closed.
