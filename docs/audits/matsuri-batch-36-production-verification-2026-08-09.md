# Matsuri Batch 36 Production Verification — 2026-08-09

## Status

Passed.

## Purpose

This audit closes exact canonical-production verification for Matsuri corpus expansion Batch 36.

The production baseline is pinned to the Batch 36 implementation release:

```text
440dddc53072d515cfa5cd0d33296add44dd1af2
```

## Exact canonical result

Canonical-origin workflow run `31306079445` succeeded on attempt 1 against:

```text
https://matsuri-yukue.badjoke-lab.com
```

Verified exact counts:

| Production family | Count |
|---|---:|
| Entity | 106 |
| Change Event | 98 |
| Relation | 63 |
| Occurrence | 158 |
| Sitemap entry | 213 |

The verifier explicitly confirmed:

```text
canonical sitemap entries verified: 213
production baseline verified: 440dddc53072d515cfa5cd0d33296add44dd1af2
```

## Batch 36 routes

The canonical verifier confirmed HTTP 200 for the new Tottori breadth routes:

- `/festivals/tottori-shanshan-matsuri/`;
- `/organizations/tottori-shanshan-shinkokai/`;
- `/places/tottori-fumon-hiroba/`;
- `/places/tottori-shanshan-central-route/`.

All retained required production routes also passed.

## Required Entity and Occurrence assertions

The production baseline requires:

- `fst-tottori-shanshan-matsuri`;
- `org-tottori-shanshan-shinkokai`;
- all retained required Entities from earlier baselines.

The new 2026 assertion is:

| Occurrence | Record version | Outcome | Scale |
|---|---:|---|---|
| `occ-tottori-shanshan-2026` | 1 | scheduled | unknown |

The August 13–15, 2026 edition remains future-dated at verification time. No held outcome or completion scale is inferred.

## Corpus position

Batch 36 adds 鳥取しゃんしゃん祭 as the first approved primary Matsuri record for 鳥取県 and advances primary-record prefecture coverage to:

```text
40 / 47 prefectures
```

Seven prefectures remain uncovered:

```text
群馬県
新潟県
長野県
兵庫県
和歌山県
山口県
宮崎県
```

The verified repository corpus contains:

```text
Entities          106
Places             97
State Snapshots    49
Change Events      98
Occurrences       158
Relations          63
Designations       29
Sources           273
Evidence          623
```

No sparse primary Entity remains.

## Modeling boundary

The 2026 edition is retained as `scheduled / unknown` because the audit predates August 13. The date range is not converted into a held outcome by calendar assumption.

The official annual recurrence is stored as August 13–15. The year-level 1965 transition to the current 鳥取しゃんしゃん祭 name is recorded using the existing `other` Change Event type; no exact first-edition day is invented.

The festival is linked to 鳥取しゃんしゃん祭振興会 through an evidence-backed `organized_by` Relation.

## Map contract

The route-based city-center Place does not receive invented point coordinates. The concrete JR鳥取駅前風紋広場 anchor is backed by the reviewed 鳥取市 page and approved official-map mechanism.

Map-utility artifact:

```text
ID      9035890974
SHA256  035eaba1bdb9d138b3e2f5303c0afc91632aa5049b70a0700428bdaa0a7fbc70
```

The map audit records:

```text
Place-bearing details   162
Useful anchored maps    131
Explicit location gaps   31
Entity anchors            73
Place anchors             58
```

All required Festival / Folk Performance records satisfy the map contract.

## Repository and visual verification

Implementation PR #216 passed complete repository CI in workflow run `31305710752` and Detail C navigation in `31305710750`.

The final public build generated:

```text
HTML routes       213
Pagefind records  106
```

Full-page screenshot workflow run `31305710755` passed:

```text
Desktop captures   109 / 109
Mobile captures    109 / 109
Failed captures      0
Desktop maps        67 / 67
Mobile maps         67 / 67
Visual failures      0
Visual warnings      0
```

Screenshot artifact:

```text
ID      9035984109
SHA256  2c359421598c028357165ec5d5c70fe7a8500df57131e862e9fae0a80c0f60fc
```

Release-candidate artifact:

```text
ID      9035942413
SHA256  bc8a8cc2713d5db2255a904db09ed82d352d61d8b6fdbcdc7e18df5fad4b76f9
```

## Production-baseline verification

Production-baseline PR #217 passed:

```text
Complete repository CI  31306079411
Canonical-origin gate   31306079445
Canonical attempt       1
```

The machine-checked production baseline is stored in `config/matsuri-production-baseline.json`.

## Merge record

- Batch 36 implementation PR: #216;
- implementation release: `440dddc53072d515cfa5cd0d33296add44dd1af2`;
- production-baseline PR: #217;
- production-baseline merge: `7f79bb3724832c54581dbf8d698ffc3f2aa23c53`;
- corpus-audit PR: #218;
- corpus-audit merge: `3dad38e4d220e886c99ed1a8cdcd91dab9774d97`.

## Boundaries

- this audit proves canonical route structure, exact feed counts, sitemap inventory, required Entities, and reviewed Occurrence assertions; it does not claim search-engine indexation;
- the August 13–15, 2026 edition is not claimed held before it occurs;
- no distributed-route coordinate is invented;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- stabilization remains a separate gate and is not completed by this audit.

## Result

Batch 36 exact canonical-production verification is complete. Matsuri corpus expansion remains active, with Batch 37 next. Stabilization remains observing and is not eligible before 2026-08-10 or by elapsed time alone.
