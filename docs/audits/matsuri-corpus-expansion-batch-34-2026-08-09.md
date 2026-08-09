# Matsuri Corpus Expansion Batch 34 — 2026-08-09

## Status

Passed repository, corpus, freshness, Detail C, map-utility, full-page visual, seed-boundary, and deployment verification.

Canonical-production verification remains a separate gate and is not claimed by this audit.

## Scope

Batch 34 adds おはら祭 as the first approved primary Matsuri record for 鹿児島県.

Implementation was merged through PR #207 as:

```text
7ff68b011aa37e980e8281b30a9fbc1dfc8c6802
```

The reviewed public corpus adds:

- `fst-kagoshima-ohara-matsuri` — おはら祭 Festival;
- `org-ohara-matsuri-shinkokai` — おはら祭振興会 Organization;
- `plc-kagoshima-ohara-tenmonkan-route` — 天文館電車通り会場 Place;
- Current State `active` from the current 2026 鹿児島市 announcement;
- an annual recurrence for the November 2 night festival and November 3 main festival;
- the 2026 edition as `scheduled / unknown` because it remains future-dated;
- an evidence-backed `organized_by` Relation;
- the documented 1949 start as a Change Event using the existing `other` event type;
- five reviewed Sources and nine claim-linked Evidence records.

The 1949 record is year-level only. No exact first-edition date is invented. The 2026 edition is not treated as held and no completion scale is inferred.

## Exact repository corpus

Corpus-coverage workflow run `31302891964` records:

| Family | Count |
|---|---:|
| Entities | 102 |
| Places | 94 |
| State Snapshots | 47 |
| Change Events | 96 |
| Occurrences | 155 |
| Occurrence Series | 47 |
| Recurrence Patterns | 47 |
| Relations | 61 |
| Designations | 29 |
| Sources | 264 |
| Evidence | 603 |

Entity types are:

| Entity type | Count |
|---|---:|
| Festival | 40 |
| Folk Performance | 8 |
| Organization | 30 |
| Shrine reference | 23 |
| Tradition Unit | 1 |

Current approved Festival / Folk Performance state distribution is:

```text
active      46
suspended    1
```

No sparse primary Entity remains under the current corpus-coverage rule.

Repository maintenance baseline:

```text
F1 batches                    13
Maintenance bundles           76
Correction bundles            21
Additive application slots    89
Correction application slots  21
Correction records            35
Corrected logical IDs         32
Public Entities              102
Entities without external links 0
```

Corpus artifact:

```text
ID      9034993316
SHA256  8dbfc029da31880a16b801fa6eaaae165ab2a3db42d77d5f62c0c20966b4515b
```

## Geographic coverage

Batch 34 moves primary-record prefecture coverage from 37 to 38 prefectures.

鹿児島県 is now covered through おはら祭.

Nine prefectures remain without an approved primary Matsuri record:

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
```

## Detail C and generated public surface

The final Batch 34 implementation build records:

```text
Entities          102
Change Events      96
Relations          61
Occurrences       155
HTML routes       206
```

Pagefind indexed 102 Matsuri records with direct detail URLs, and the machine-readable build generated 10 public files with sitemap coverage for all 206 HTML routes.

Required new Detail C routes are:

```text
/festivals/kagoshima-ohara-matsuri/
/organizations/ohara-matsuri-shinkokai/
/places/kagoshima-ohara-tenmonkan-route/
```

Detail C navigation workflow `31302891977` passed and verified:

```text
Primary Entity details          79
Shrine/Temple seed references   23
Place details                   85
Approved Relations              61
```

Individual JSON is generated for every public record and the exhaustive Chromium navigation test passed.

## Map-contract correction

The first Detail C run correctly rejected the new おはら祭 record because the route Place had municipality-level coordinate precision and therefore did not qualify as a concrete map anchor.

The gate was not weakened and no point coordinate was invented.

The reviewed 2026 official tourism page describes the approximately 1,480 m dance zone and exposes the official venue-map context, so the final implementation registers that Source through the existing approved official-map mechanism in `config/matsuri-official-map-links.json`.

The corrected map-utility verification records:

```text
Place-bearing details              157
Concrete anchors                   112
Approved official maps              15
Remaining non-specialist gaps       30
Uncovered Festival/Folk Performance  0
```

All negative fixtures were rejected. Municipality-only maps still cannot substitute for either a concrete anchor or an approved official map.

Map-utility audit artifact:

```text
ID      9035041830
SHA256  62871035d9f9ab19da7a4712a912b5cd2cedd521c2a1a399f236260f29e6bf29
```

## Full-page visual verification

Full-page screenshot workflow run `31302891959` passed after the final official-map correction.

The build contained 206 generated HTML routes and the representative visual contract selected 109 routes on each device.

Desktop:

```text
Representative routes       109
Captured routes             109
Failed captures               0
Embedded maps                67
Loaded embedded maps         67
PNG bytes             55,680,370
Maximum document height  13,704
```

Mobile:

```text
Representative routes       109
Captured routes             109
Failed captures               0
Embedded maps                67
Loaded embedded maps         67
PNG bytes             45,251,408
Maximum document height  16,937
```

The automated screenshot audit returned:

```text
ok        true
failures  0
warnings  0
```

Screenshot artifact:

```text
ID      9035148935
Name    matsuri-full-page-screenshots-all-31302891959
SHA256  3d3c6e8c446e8fcd5ad4c8a5381026f7ff8ca1586cba1e4ffc80359d6012da1a
Size    195796218 bytes
```

This establishes the mechanical visual contract for the representative desktop and mobile surface. It is not a claim of subjective visual perfection.

## Repository verification

The final implementation head `569259a09a296c15f42a1a9c79ff44b244150b8c` passed the repository contracts including:

```text
Complete repository verification       31302891956
Canonical dataset                       31302891927
Corpus coverage                         31302891964
Data freshness                          31302891933
Relation coverage                       31302891955
External-link maintenance               31302891925
Detail C navigation                     31302891977
Full-page screenshot review             31302891959
Bundle inventory / baseline             31302891941
Correction contract                     31302891972
Future-site seed inventory              31302891953
Future-site seed readiness              31302891957
Jinja start gate                        31302891966
```

Release-candidate artifact:

```text
ID      9035091094
SHA256  4598be0db4cfb82ee17ad786debb52b137811a4babb57c49a5d83e9f491e1c73
```

## Deployment observation

Cloudflare Workers reported a successful `matsuri-yukue` deployment for final implementation head:

```text
569259a09a296c15f42a1a9c79ff44b244150b8c
```

This deployment observation does not replace exact canonical-production verification. The production baseline is advanced and checked separately.

## Future-site boundary

Batch 34 adds no Shrine or Temple seed.

The blocked Jinja boundary therefore remains:

```text
Relation-backed Shrine seeds   23
Approved Jinja State Snapshots  0
```

Jinja remains blocked. This audit does not authorize `apps/jinja`, a Jinja Worker, hostname activation, publication, or any inferred Shrine Current State.

## Result

Batch 34 repository work is accepted for corpus quality:

- 鹿児島県 is represented by a non-sparse primary Festival record with organizer, route Place, Current State, annual recurrence, a future-dated 2026 Occurrence, 1949 history, Sources, and claim-level Evidence;
- public Entity count is 102;
- primary prefecture coverage is 38 / 47;
- no sparse primary Entity remains;
- canonical dataset, freshness, Relations, Detail C, map utility, full-page visual review, repository baseline, and complete repository CI pass;
- Jinja remains explicitly blocked.

Next gate: exact canonical-production verification for release `7ff68b011aa37e980e8281b30a9fbc1dfc8c6802`.
