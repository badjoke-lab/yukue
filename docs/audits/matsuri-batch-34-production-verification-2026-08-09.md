# Matsuri Batch 34 Production Verification — 2026-08-09

## Status

Passed.

## Purpose

This audit closes exact canonical-production verification for Matsuri corpus expansion Batch 34.

The production baseline is pinned to the Batch 34 implementation release:

```text
7ff68b011aa37e980e8281b30a9fbc1dfc8c6802
```

## Exact canonical result

Canonical-origin workflow run `31303223524` succeeded on attempt 1 against:

```text
https://matsuri-yukue.badjoke-lab.com
```

Verified exact counts:

| Production family | Count |
|---|---:|
| Entity | 102 |
| Change Event | 96 |
| Relation | 61 |
| Occurrence | 155 |
| Sitemap entry | 206 |

The verifier confirmed the deployed production baseline release and all 206 sitemap entries.

## Batch 34 routes

The canonical verifier confirmed HTTP 200 for the new Kagoshima breadth routes:

- `/festivals/kagoshima-ohara-matsuri/`;
- `/organizations/ohara-matsuri-shinkokai/`;
- `/places/kagoshima-ohara-tenmonkan-route/`.

All retained required production routes from earlier baselines also passed.

## Required Entity and Occurrence assertions

The production baseline now requires:

- `fst-kagoshima-ohara-matsuri`;
- `org-ohara-matsuri-shinkokai`;
- all retained required Entities from earlier production baselines.

The new Batch 34 occurrence assertion is:

| Occurrence | Record version | Outcome | Scale |
|---|---:|---|---|
| `occ-kagoshima-ohara-2026-schedule` | 1 | scheduled | unknown |

The November 2–3, 2026 edition is still future-dated at verification time. This audit does not infer that it has been held and does not assign a completion scale.

## Corpus position

Batch 34 adds おはら祭 as the first approved primary Matsuri record for 鹿児島県 and advances primary-record prefecture coverage to:

```text
38 / 47 prefectures
```

Nine prefectures remain uncovered:

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

The verified repository corpus contains:

```text
Entities          102
Places             94
State Snapshots    47
Change Events      96
Occurrences       155
Relations          61
Designations       29
Sources           264
Evidence          603
```

No sparse primary Entity remains under the current corpus-coverage rule.

## Map-contract maintenance

The first Batch 34 Detail C run correctly rejected the new おはら祭 route Place because municipality-level coordinate precision does not qualify as a concrete map anchor.

The gate was not weakened and no coordinates were invented. The final implementation registers the reviewed official 2026 tourism venue-map context through the existing approved official-map registry.

The corrected map contract passed with:

```text
Place-bearing details              157
Concrete anchors                   112
Approved official maps              15
Uncovered Festival/Folk Performance  0
```

This maintenance case is retained as stabilization evidence because the implementation was corrected to satisfy the existing public-map contract rather than changing the contract to fit the new data.

## Repository and visual verification

The final implementation head `569259a09a296c15f42a1a9c79ff44b244150b8c` passed complete repository CI in workflow run `31302891956`.

Key implementation verification includes:

```text
Canonical dataset             31302891927
Corpus coverage               31302891964
Data freshness                31302891933
Relation coverage             31302891955
External-link maintenance     31302891925
Detail C navigation           31302891977
Full-page screenshot review   31302891959
Bundle inventory / baseline   31302891941
Correction contract           31302891972
Future-site seed inventory    31302891953
Future-site seed readiness    31302891957
Jinja start gate              31302891966
```

The final full-page visual workflow passed on both desktop and mobile:

```text
Generated HTML routes   206
Representative routes   109
Desktop captures        109 / 109
Mobile captures         109 / 109
Failed captures           0
Desktop maps             67 / 67
Mobile maps              67 / 67
Visual failures           0
Visual warnings           0
```

Screenshot artifact:

```text
ID      9035148935
SHA256  3d3c6e8c446e8fcd5ad4c8a5381026f7ff8ca1586cba1e4ffc80359d6012da1a
```

## Production-baseline verification

Production-baseline PR #208 passed:

```text
Complete repository CI     31303223519
Canonical-origin gate      31303223524
Canonical attempt          1
```

The canonical verifier explicitly reported:

```text
canonical sitemap entries verified: 206
production baseline verified: 7ff68b011aa37e980e8281b30a9fbc1dfc8c6802
```

The machine-checked production baseline is stored in:

```text
config/matsuri-production-baseline.json
```

## Merge record

- Batch 34 implementation PR: #207;
- implementation merge: `7ff68b011aa37e980e8281b30a9fbc1dfc8c6802`;
- superseded audit PR: #209, closed unmerged because its pre-squash branch lineage re-listed implementation changes;
- final docs-only corpus audit PR: #210;
- corpus-audit merge: `ddc166b6e4cc74e6c4c81a056f9657597716225d`;
- production-baseline PR: #208;
- production-baseline merge: `ad142b77c15f5a4b7d20818102eb4d9843f057ce`.

## Boundaries

- this audit proves the canonical route structure, exact feed counts, sitemap inventory, required Entities, and reviewed Occurrence assertions; it does not claim search-engine indexation;
- no held result is inferred for おはら祭2026;
- the 1949 start history remains year-level only; no exact first-edition date is invented;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- stabilization remains a separate gate and is not completed by this production audit.

## Result

Batch 34 exact canonical-production verification is complete. Matsuri corpus expansion remains active. The next corpus target is Batch 35, while the stabilization review remains observing and is not eligible before 2026-08-10 or by elapsed time alone.
