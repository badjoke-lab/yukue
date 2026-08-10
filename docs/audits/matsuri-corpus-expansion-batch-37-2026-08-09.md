# Matsuri Corpus Expansion Batch 37 — 2026-08-09

## Status

Passed repository, corpus, freshness, Detail C, full-page visual, seed-boundary, and repository-baseline verification.

Exact canonical-production verification remains a separate gate and must be recorded after the production baseline is advanced to the merged Batch 37 release.

## Scope

Batch 37 adds 神戸まつり as the first approved primary Matsuri record for 兵庫県.

Implementation was merged through PR #219 as:

```text
a0f1dfc3a241479c419e745cf8f04fbe33be9aae
```

The reviewed implementation head was:

```text
b776afb7d33cfb722c5546ffb43d40df64af85d0
```

The reviewed public corpus adds:

- `fst-kobe-matsuri` — 神戸まつり Festival;
- `org-kobe-shiminsai-kyokai` — 神戸市民祭協会 Organization;
- `plc-kobe-higashi-yuenchi` — 東遊園地 Place;
- `plc-kobe-matsuri-parade-route` — 京町筋から三宮中央通りを通るパレード route Place;
- Current State `active`;
- one annual May-third-Sunday recurrence series;
- the May 17, 2026 edition as `held / unknown`;
- the year-level 1971 start as an `other` Change Event;
- an `organized_by` Relation to 神戸市民祭協会;
- five reviewed official/public-authority Sources and ten claim-linked Evidence records.

The held outcome is supported by the official 2026 day-of information. No attendance or completion scale is inferred, so scale remains `unknown`.

## Exact repository corpus

The Batch 37 corpus-coverage workflow passed on implementation head `b776afb7d33cfb722c5546ffb43d40df64af85d0` as run `31315298369`.

Batch 37 advances the canonical corpus to:

| Family | Count |
|---|---:|
| Entities | 108 |
| Places | 99 |
| State Snapshots | 50 |
| Change Events | 99 |
| Occurrences | 159 |
| Occurrence Series | 51 |
| Recurrence Patterns | 51 |
| Relations | 64 |
| Designations | 29 |
| Sources | 278 |
| Evidence | 633 |

The Batch 37 increment from the Batch 36 checkpoint is:

```text
Entities          +2
Places            +2
State Snapshots   +1
Change Events     +1
Occurrences       +1
Occurrence Series +1
Recurrence        +1
Relations         +1
Sources           +5
Evidence         +10
```

No sparse primary Entity is introduced by this batch.

Repository maintenance baseline after Batch 37:

```text
F1 batches                    13
Maintenance bundles           82
Correction bundles            21
Additive application slots    95
Correction application slots  21
Correction records            35
Corrected logical IDs         32
Public Entities              108
Entities without external links 0
```

Corpus artifact:

```text
ID      9038562142
Name    matsuri-corpus-coverage-1061e1681bb693c0df230ee0b26ed109c14778fe
SHA256  a43a25440ca740d65eb4f13b529df21562f29c41c0a7c0443eb598126bd7dc14
```

## Geographic coverage

Batch 37 moves primary-record prefecture coverage from 40 to 41 prefectures.

兵庫県 is now covered through 神戸まつり.

Six prefectures remain without an approved primary Matsuri record:

```text
群馬県
新潟県
長野県
和歌山県
山口県
宮崎県
```

## Detail C and map contract

Required new public routes are:

```text
/festivals/kobe-matsuri/
/organizations/kobe-shiminsai-kyokai/
/places/kobe-higashi-yuenchi/
/places/kobe-matsuri-parade-route/
```

Detail C navigation workflow `31315298399` passed on the implementation head.

The distributed parade route is kept as route geometry rather than fabricating a point coordinate. The approved concrete map anchor is the reviewed 神戸市 東遊園地 page registered through the existing official-map contract.

Canonical dataset, Relation coverage, data freshness, correction contract, external-link maintenance, bundle inventory, future-site seed readiness, and Jinja start-gate checks also passed on the same implementation head.

## Full-page visual verification

Full-page screenshot workflow run `31315298419` passed on the implementation head.

Screenshot artifact:

```text
ID      9038686801
Name    matsuri-full-page-screenshots-all-31315298419
SHA256  21da7582e186f7bd20c4295e36693d821784909e07087f8b813d84bdd760ebd5
Size    197591060 bytes
```

The successful workflow confirms the full-page visual-review gate completed for the Batch 37 implementation. This audit does not fabricate screenshot metrics that are not persisted in the repository record.

## Repository verification

The implementation head `b776afb7d33cfb722c5546ffb43d40df64af85d0` passed the PR verification chain, including:

```text
Complete repository CI               31315298373
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

The implementation subsequently squash-merged to main as `a0f1dfc3a241479c419e745cf8f04fbe33be9aae`.

## Production boundary

At the time this corpus audit is recorded, `config/matsuri-production-baseline.json` still points to the Batch 36 release `440dddc53072d515cfa5cd0d33296add44dd1af2`.

Therefore this document accepts Batch 37 repository/corpus quality but does **not** claim exact canonical production parity yet.

The next production gate must advance the baseline to the exact Batch 37 merge commit and verify the canonical hostname against:

```text
Entities          108
Change Events      99
Relations          64
Occurrences       159
```

The exact sitemap count and every required route must be confirmed by the canonical production verifier rather than assumed by this corpus audit.

## Future-site boundary

Batch 37 adds no Shrine or Temple seed.

```text
Relation-backed Shrine seeds   23
Approved Jinja State Snapshots  0
```

Jinja remains blocked. This audit does not authorize `apps/jinja`, a Jinja Worker, hostname activation, publication, or any inferred Shrine Current State.

## Stabilization boundary

The Matsuri stabilization review remains `observing`. The minimum-duration date does not complete the review automatically. Batch 37 contributes another real maintenance/expansion observation but does not itself close the stabilization gate.

## Result

Batch 37 repository work is accepted for corpus quality:

- 兵庫県 is represented by a non-sparse primary Festival record with an Organization Relation, a concrete Place, a distributed route Place, Current State, annual recurrence, a reviewed 2026 held occurrence, year-level start history, Sources, and claim-level Evidence;
- public Entity count is 108;
- primary prefecture coverage is 41 / 47;
- no sparse primary Entity is introduced;
- canonical dataset, freshness, Relations, Detail C, visual review, repository baseline, and complete repository CI pass;
- Jinja remains explicitly blocked;
- stabilization remains observing.

Next gate: advance `config/matsuri-production-baseline.json` to release `a0f1dfc3a241479c419e745cf8f04fbe33be9aae` and require exact canonical-production verification before Batch 37 is closed.
