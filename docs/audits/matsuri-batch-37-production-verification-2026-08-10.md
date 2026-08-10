# Matsuri Batch 37 Production Verification — 2026-08-10

## Status

Passed.

## Purpose

This audit closes exact canonical-production verification for Matsuri corpus expansion Batch 37.

The production baseline is pinned to the Batch 37 implementation release:

```text
a0f1dfc3a241479c419e745cf8f04fbe33be9aae
```

## Exact canonical result

Canonical-origin workflow run `31363791720` succeeded on attempt 1 against:

```text
https://matsuri-yukue.badjoke-lab.com
```

Verified exact counts:

| Production family | Count |
|---|---:|
| Entity | 108 |
| Change Event | 99 |
| Relation | 64 |
| Occurrence | 159 |
| Sitemap entry | 217 |

The canonical verifier passed against the Batch 37 machine baseline without relaxing any expected count, route, Entity, or Occurrence assertion.

## Batch 37 routes

The canonical baseline requires the new Hyogo breadth routes:

- `/festivals/kobe-matsuri/`;
- `/organizations/kobe-shiminsai-kyokai/`;
- `/places/kobe-higashi-yuenchi/`;
- `/places/kobe-matsuri-parade-route/`.

All retained required production routes from earlier baselines remain part of the same verification contract.

## Required Entity and Occurrence assertions

The Batch 37 production baseline adds:

- `fst-kobe-matsuri`;
- `org-kobe-shiminsai-kyokai`.

The new 2026 assertion is:

| Occurrence | Record version | Outcome | Scale |
|---|---:|---|---|
| `occ-kobe-matsuri-2026` | 1 | held | unknown |

The held outcome is supported by reviewed official day-of information. No attendance or completion scale is inferred.

## Corpus position

Batch 37 adds 神戸まつり as the first approved primary Matsuri record for 兵庫県 and advances primary-record prefecture coverage to:

```text
41 / 47 prefectures
```

Six prefectures remain uncovered:

```text
群馬県
新潟県
長野県
和歌山県
山口県
宮崎県
```

The verified repository corpus contains:

```text
Entities          108
Places             99
State Snapshots    50
Change Events      99
Occurrences       159
Relations          64
Designations       29
Sources           278
Evidence          633
```

No sparse primary Entity remains under the current corpus-coverage rule.

## Modeling boundary

神戸まつり is modeled with a concrete 東遊園地 Place and a separate distributed parade-route Place. The route does not receive fabricated coordinates.

The year-level 1971 start is stored through the existing `other` Change Event type. The annual recurrence is the reviewed May-third-Sunday pattern. The organizer is linked through an evidence-backed `organized_by` Relation to 神戸市民祭協会.

## Map contract

The distributed parade route remains non-point geometry. The approved concrete map target is the reviewed 神戸市 東遊園地 page registered through the existing official-map mechanism.

No coordinate is invented to satisfy the map contract.

## Repository and visual verification

Implementation PR #219 passed the repository verification chain on implementation head:

```text
b776afb7d33cfb722c5546ffb43d40df64af85d0
```

Key workflow runs include:

```text
Complete repository CI                31315298373
Corpus coverage                       31315298369
Relation coverage                     31315298383
Data freshness                        31315298393
Canonical dataset contract            31315298386
Correction contract                   31315298376
External-link maintenance             31315298415
Detail C navigation                   31315298399
Bundle inventory / repository baseline 31315298418
Full-page screenshot review           31315298419
```

Corpus artifact:

```text
ID      9038562142
SHA256  a43a25440ca740d65eb4f13b529df21562f29c41c0a7c0443eb598126bd7dc14
```

Release-candidate artifact:

```text
ID      9038619854
SHA256  ed469226417d266d8e5e7f9834a01388ddaddf70d26ff5d13a72fa69320a344a
```

The verified release-candidate artifact contains 217 sitemap entries and the four new Kobe routes.

Full-page screenshot artifact:

```text
ID      9038686801
Name    matsuri-full-page-screenshots-all-31315298419
SHA256  21da7582e186f7bd20c4295e36693d821784909e07087f8b813d84bdd760ebd5
Size    197591060 bytes
```

## Production-baseline verification

Production-baseline PR #222 passed:

```text
Complete repository CI  31363791736
Canonical-origin gate   31363791720
Canonical attempt       1
```

The machine-checked production baseline is stored in `config/matsuri-production-baseline.json`.

## Merge record

- Batch 37 implementation PR: #219;
- implementation release: `a0f1dfc3a241479c419e745cf8f04fbe33be9aae`;
- corpus-audit PR: #221;
- corpus-audit merge: `005fe75d0ee5290e305e4b4257cd14c0f7f86e9d`;
- production-baseline PR: #222;
- production-baseline merge: `016136a4a0b806aa1b17780df78dad7dbce622e5`.

## Boundaries

- this audit proves canonical route structure, exact feed counts, sitemap inventory, required Entities, and reviewed Occurrence assertions; it does not claim search-engine indexation;
- no distributed-route coordinate is invented;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- stabilization remains a separate gate and is not completed by this audit;
- 2026-08-10 makes the stabilization review eligible to occur, but elapsed time alone does not complete it.

## Result

Batch 37 exact canonical-production verification is complete.

Matsuri corpus expansion remains active. The next corpus batch is Batch 38, using the six remaining uncovered prefectures as the breadth pool while continuing evidence-backed depth and dated maintenance work.

The formal Matsuri stabilization review is now eligible, but remains `observing` until every required review item and public-safe evidence record is completed. Jinja remains blocked.
