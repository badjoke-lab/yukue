# Matsuri Corpus Expansion Batch 33 — 2026-08-09

## Status

Passed repository, corpus, freshness, Detail C, seed-boundary, deployment, and implementation visual verification after required dated maintenance.

Canonical-production verification remains a separate gate and is not claimed by this audit.

## Scope

Batch 33 adds 茅ヶ崎海岸浜降祭 as the first approved primary Matsuri record for 神奈川県.

The implementation was merged through PR #201 as:

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

The current Festival State is `active`. No 2026 茅ヶ崎海岸浜降祭 outcome is inferred. No Shrine Current State or Jinja publication claim is created.

## Dated maintenance discovered during audit

The first Batch 33 audit PR, #202, was intentionally closed unmerged after the August 9 repository launch-readiness gate detected:

```text
PAST_OCCURRENCE_STILL_SCHEDULED
occ-sendai-tanabata-2026-schedule
```

The 2026 仙台七夕まつり had ended on August 8 while its approved Occurrence still carried the pre-event `scheduled` result.

PR #203 resolved the underlying data rather than weakening the audit:

- added reviewed official post-event Evidence from 仙台七夕まつり協賛会;
- added `maintenance-74.json`;
- replaced `occ-sendai-tanabata-2026-schedule` through `corrections-21.json` with record version 2;
- changed the outcome to `held / unknown`;
- retained the original official schedule Evidence alongside the new outcome Evidence;
- registered both new bundles in the canonical Node and Astro loaders;
- advanced the repository maintenance baseline.

The correction does not infer normal scale or complete execution of every August 6–8 component.

The post-maintenance release was merged to `main` as:

```text
239ac16067b9bc279d3a460dcbeae961244a0e88
```

## Exact post-maintenance repository corpus

Corpus-coverage workflow run `31299835586` records:

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
| Sources | 259 |
| Evidence | 594 |

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

Repository maintenance baseline after the Sendai rollover:

```text
F1 batches                    13
Maintenance bundles           74
Correction bundles            21
Additive application slots    87
Correction application slots  21
Correction records            35
Corrected logical IDs         32
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

The implementation build generated 203 HTML routes, Pagefind indexed 100 Matsuri records with direct detail URLs, and the machine-readable build generated 10 public files with sitemap coverage for all 203 HTML routes.

Required new Detail C routes include:

```text
/festivals/chigasaki-kaigan-hamaori-sai/
/organizations/chigasaki-hamaori-jikkoiinkai/
/references/shrines/samukawa-jinja/
/places/chigasaki-nishihama-kaigan/
/places/samukawa-jinja/
```

Post-maintenance Detail C navigation workflow `31299835519` passed.

## Visual verification

The Batch 33 implementation full-page screenshot workflow run `31260474276` passed before the dated Sendai outcome rollover.

For both desktop and mobile:

```text
Generated HTML routes       203
Representative routes       109
Captured routes             109
Failed captures               0
Embedded maps                67
Loaded embedded maps         67
```

The automated screenshot audit returned zero failures and zero warnings.

Artifact:

```text
ID      9022731114
SHA256  cb1400ce050a51df7a2cd0c99f242b30e8803759226c939a0429f9ecf347c56a
```

The subsequent Sendai maintenance changes canonical data outcome and Evidence only; it adds no route, layout, map, or UI component. Its independent screenshot workflow is tracked separately and is not substituted for repository CI.

## Verification workflows

The post-maintenance PR #203 passed the repository contracts that govern this release, including:

```text
Complete repository verification       31299835536
Canonical dataset                       31299835546
Corpus coverage                         31299835586
Data freshness                          31299835580
Relation coverage                       31299835521
External-link maintenance               31299835555
Detail C navigation                     31299835519
Bundle inventory / baseline             31299835571
Correction contract                     31299835626
Future-site seed inventory              31299835568
Future-site seed readiness              31299835585
Jinja start gate                        31299835557
```

Post-maintenance corpus artifact:

```text
ID      9034147982
SHA256  f6f58ea140d291a55ce9b92d10e85a14d6d2480a9513c637f31b5cb8157b5aae
```

## Deployment observation

Cloudflare Workers reported successful `matsuri-yukue` deployments for the Batch 33 implementation and the subsequent Sendai maintenance head.

These deployment observations do not replace exact canonical-production verification. The production baseline must be advanced and checked separately before Batch 33 production is declared verified.

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

## Merge record

- Batch 33 implementation PR: #201;
- Batch 33 implementation merge: `83f6bc77d6e22e7086ea12de47391356e82a1776`;
- superseded first audit PR: #202, closed unmerged after the dated-maintenance gate fired;
- Sendai dated-maintenance PR: #203;
- post-maintenance merge: `239ac16067b9bc279d3a460dcbeae961244a0e88`.

## Result

Batch 33 repository work is accepted for corpus quality after the required dated maintenance:

- 神奈川県 is represented by a non-sparse primary Festival record with annual recurrence, reviewed held 2025 Occurrence, designation history, organizer, Shrine Relation, Places, Sources, and Evidence;
- 仙台七夕まつり2026 is no longer stale and is reviewed as `held / unknown` with record version 2;
- public Entity count is 100;
- primary prefecture coverage is 37 / 47;
- no sparse primary Entity remains;
- canonical dataset, freshness, corrections, Relations, Detail C, repository baseline, seed boundaries, and complete repository CI pass;
- Jinja remains explicitly blocked.

Next gate: exact canonical-production verification for the final post-maintenance Batch 33 release.
