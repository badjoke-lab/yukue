# Matsuri Corpus Expansion Batch 33 — 2026-08-09

## Status

Passed repository, corpus, freshness, Detail C, visual, seed-boundary, and deployment verification.

Canonical-production verification remains a separate gate and is not claimed by this audit.

## Scope

Batch 33 adds 茅ヶ崎海岸浜降祭 as the first approved primary Matsuri record for 神奈川県.

Implementation was merged through PR #201 as:

```text
83f6bc77d6e22e7086ea12de47391356e82a1776
```

The reviewed public corpus adds:

- `fst-chigasaki-kaigan-hamaori-sai` — 茅ヶ崎海岸浜降祭 Festival;
- `org-chigasaki-hamaori-jikkoiinkai` — 茅ヶ崎海岸浜降祭実行委員会 Organization;
- `shr-samukawa-jinja` — 寒川神社 State-free Shrine reference seed;
- `plc-chigasaki-nishihama-kaigan` — 茅ヶ崎西浜海岸 festival-ground Place;
- `plc-samukawa-jinja` — official-address-backed 寒川神社 Place;
- an annual recurrence rule for the third Monday of July;
- the 2025 edition as `held / unknown` from reviewed post-event public-authority Evidence;
- evidence-backed `organized_by` and `ritually_associated_with` Relations;
- the June 23, 1978 Kanagawa Prefectural Intangible Folk Cultural Property Change Event and Designation.

The current Festival State is `active`. The 2026 official page is used for identity, current-state, organizer, and Place context only. This batch does not infer that the 2026 edition completed normally and does not create a 2026 Occurrence outcome.

No Shrine Current State or Jinja publication claim is created.

## Exact repository corpus

The Batch 33 corpus-coverage artifact records:

| Family | Count |
|---|---:|
| Entities | 100 |
| Places | 93 |
| State Snapshots | 46 |
| Change Events | 95 |
| Occurrences | 154 |
| Occurrence Series | 46 |
| Recurrence Patterns | 46 |
| Relations | 60 |
| Designations | 29 |
| Sources | 258 |
| Evidence | 593 |

Entity types are:

| Entity type | Count |
|---|---:|
| Festival | 39 |
| Folk Performance | 8 |
| Organization | 29 |
| Shrine reference | 23 |
| Tradition Unit | 1 |

Current approved Festival / Folk Performance state distribution is:

```text
active      45
suspended    1
```

No sparse primary Entity remains under the current corpus-coverage rule.

Repository maintenance baseline:

```text
F1 batches                    13
Maintenance bundles           73
Correction bundles            20
Additive application slots    86
Correction application slots  20
Correction records            34
Corrected logical IDs         31
Public Entities              100
Entities without external links 0
```

## Geographic coverage

Batch 33 moves primary-record prefecture coverage from 36 to 37 prefectures.

神奈川県 is now covered through 茅ヶ崎海岸浜降祭.

Ten prefectures remain without an approved primary Matsuri record:

```text
群馬県
新潟県
長野県
大阪府
兵庫県
和歌山県
鳥取県
山口県
宮崎県
鹿児島県
```

## Detail C and generated public surface

The Batch 33 build records:

```text
Entities          100
Change Events      95
Relations          60
Occurrences       154
Sitemap entries   203
```

The build generated 203 HTML routes, Pagefind indexed 100 Matsuri records with direct detail URLs, and the machine-readable build generated 10 public files with sitemap coverage for all 203 HTML routes.

Required new Detail C routes include:

```text
/festivals/chigasaki-kaigan-hamaori-sai/
/organizations/chigasaki-hamaori-jikkoiinkai/
/references/shrines/samukawa-jinja/
/places/chigasaki-nishihama-kaigan/
/places/samukawa-jinja/
```

The dedicated Detail C navigation workflow passed with the new and retained public surface.

## Visual verification

Full-page screenshot workflow run `31260474276` passed.

For both desktop and mobile:

```text
Generated HTML routes       203
Representative routes       109
Captured routes             109
Failed captures               0
Embedded maps                67
Loaded embedded maps         67
```

The automated screenshot audit returned:

```text
ok        true
failures  0
warnings  0
```

Artifact:

```text
ID      9022731114
Name    matsuri-full-page-screenshots-all-31260474276
SHA256  cb1400ce050a51df7a2cd0c99f242b30e8803759226c939a0429f9ecf347c56a
```

This automated record establishes complete representative capture and mechanical visual-contract checks; it is not a claim of subjective visual perfection.

## Verification workflows

The Batch 33 implementation passed the repository verification set, including:

```text
Complete repository verification       31260474257
Canonical dataset                       31260474272
Corpus coverage                         31260474250
Data freshness                          31260474281
Relation coverage                       31260474265
External-link maintenance               31260474236
Detail C navigation                     31260474251
Bundle inventory / baseline             31260474259
Correction contract                     31260474255
Future-site seed inventory              31260474248
Future-site seed readiness              31260474310
Jinja start gate                        31260474241
Stabilization review                    31260474261
F2-28 final launch gate                 31260474270
Full-page screenshot review             31260474276
```

Release-candidate artifact:

```text
ID      9022687750
SHA256  cba0ffb5915f0e77f5cdccb8087a66110c9031269173c0010d831ed1bc8b5e04
```

Corpus-coverage artifact:

```text
ID      9022631408
SHA256  3c106ddffd93af1d07db619416aecb003d7a5dd1267652e750ab1f5ea66b8c7c
```

The pull-request workflows evaluated GitHub's merge ref for PR #201 while the accepted implementation was subsequently squash-merged to `main` as `83f6bc77d6e22e7086ea12de47391356e82a1776`.

## Deployment observation

The Cloudflare Workers integration reported a successful `matsuri-yukue` deployment for implementation head:

```text
609e3ac61e6a8869174eac277d08e44aeea294f9
```

This deployment observation does not replace exact canonical-production verification. The production baseline must be advanced and checked separately before Batch 33 production is declared verified.

## Future-site boundary

The new 寒川神社 reference advances the blocked Jinja seed baseline to:

```text
Relation-backed Shrine seeds   23
Direct identity Evidence       27
Place references               23
Approved Jinja State Snapshots  0
Seeds with official URLs       17
```

Jinja remains blocked. This audit does not authorize `apps/jinja`, a Jinja Worker, hostname activation, publication, or any inferred Shrine Current State.

## Result

Batch 33 repository work is accepted for corpus quality:

- 神奈川県 is represented by a non-sparse primary Festival record with an annual recurrence, a reviewed held 2025 Occurrence, designation history, organizer, Shrine Relation, Places, Sources, and Evidence;
- public Entity count is 100;
- primary prefecture coverage is 37 / 47;
- no sparse primary Entity remains;
- Detail C, machine-readable output, sitemap coverage, screenshots, and embedded-map checks pass;
- Jinja remains explicitly blocked.

Next gate: exact canonical-production verification for the Batch 33 release.
