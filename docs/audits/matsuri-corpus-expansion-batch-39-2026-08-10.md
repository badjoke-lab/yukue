# Matsuri Corpus Expansion Batch 39 — 2026-08-10

## Status

Passed repository, corpus, freshness, Relation, Detail C, full-page visual, future-site seed, Jinja-boundary, and repository-baseline verification.

Exact canonical-production verification remains a separate gate and must be recorded after the production baseline is advanced to the merged Batch 39 release.

## Scope

Batch 39 adds 長野びんずる as the first approved primary Matsuri record for 長野県.

Implementation was merged through PR #228 as:

```text
76ab0b37294870e3fb372405672867053a7b7936
```

The reviewed implementation head was:

```text
9a28e656cfde7df7dc35a5e19992899b6adab10d
```

The reviewed public corpus adds:

- `fst-nagano-binzuru` — 長野びんずる Festival;
- `org-nagano-binzuru-jikkoiinkai` — 長野びんずる実行委員会 Organization;
- `plc-nagano-binzuru-central-route` — 長野市中心市街地の公式祭礼ルート Place;
- Current State `active`;
- annual first-Saturday-of-August recurrence;
- the 2025 edition as `held / unknown`;
- a year-level 1971 first-edition/start Change Event;
- an `organized_by` Relation to 長野びんずる実行委員会;
- six reviewed official/municipal Sources and nine claim-linked Evidence records.

The 2025 held outcome is supported by Nagano City post-event material. No attendance or scale is inferred.

The 2026 municipal page supports the current active State, schedule, venue, and organizer context. Batch 39 deliberately does **not** infer a 2026 held outcome merely because August 1 has elapsed; no 2026 Occurrence is added without explicit post-event Evidence.

## Exact repository corpus

The Batch 39 corpus-coverage workflow passed on implementation head `9a28e656cfde7df7dc35a5e19992899b6adab10d` as run `31369521292`.

Batch 39 advances the canonical corpus to:

| Family | Count |
|---|---:|
| Entities | 112 |
| Places | 101 |
| State Snapshots | 52 |
| Change Events | 102 |
| Occurrences | 161 |
| Occurrence Series | 53 |
| Recurrence Patterns | 53 |
| Relations | 66 |
| Designations | 29 |
| Sources | 291 |
| Evidence | 654 |

The Batch 39 increment from the Batch 38 checkpoint is:

```text
Entities          +2
Places            +1
State Snapshots   +1
Change Events     +1
Occurrences       +1
Occurrence Series +1
Recurrence        +1
Relations         +1
Sources           +6
Evidence          +9
```

No sparse primary Entity is introduced by this batch.

Repository maintenance baseline after Batch 39:

```text
F1 batches                    13
Maintenance bundles           86
Correction bundles            21
Additive application slots    99
Correction application slots  21
Correction records            35
Corrected logical IDs         32
Public Entities              112
Entities without external links 0
```

Corpus artifact:

```text
ID      9055471333
Name    matsuri-corpus-coverage-4cbb9d1aa26069cc55c5a4e290dcf84bb7f20e09
SHA256  40bc7dc7504377dba0e3ec60d6ee44177eca92ee4643a07b32ca27848b8ac738
```

## Geographic coverage

Batch 39 moves primary-record prefecture coverage from 42 to 43 prefectures.

長野県 is now covered through 長野びんずる.

Four prefectures remain without an approved primary Matsuri record:

```text
新潟県
和歌山県
山口県
宮崎県
```

## Detail C and map contract

Required new public routes are:

```text
/festivals/nagano-binzuru/
/organizations/nagano-binzuru-jikkoiinkai/
/places/nagano-binzuru-central-route/
```

Detail C navigation workflow `31369521225` passed on the implementation head, including real-browser verification.

The festival route is kept as route geometry rather than fabricating a point coordinate. The approved map target is the official Nagano Binzuru venue/route guidance. No coordinate is invented.

Canonical dataset, Relation coverage, data freshness, correction contract, external-link maintenance, bundle inventory, future-site seed inventory/readiness, and Jinja start-gate checks also passed on the same implementation head.

## Full-page visual verification

Full-page screenshot workflow run `31369521278` passed on the implementation head.

Screenshot artifact:

```text
ID      9055729799
Name    matsuri-full-page-screenshots-all-31369521278
SHA256  fab3388808936d62cbb12de4a57064ba7c7d5db95e1d142be32bc3fac3f1d1a4
Size    198222710 bytes
```

The successful workflow confirms the full-page visual-review gate completed for the Batch 39 implementation.

## Repository verification

The implementation head `9a28e656cfde7df7dc35a5e19992899b6adab10d` passed the PR verification chain, including:

```text
Complete repository CI                 31369521263
Corpus coverage                        31369521292
Relation coverage                      31369521298
Data freshness                         31369521280
Canonical dataset contract             31369521388
Correction contract                    31369521231
External-link maintenance              31369521261
Detail C navigation                    31369521225
Bundle inventory / repository baseline 31369521234
Future-site seed inventory             31369521265
Future-site seed readiness             31369521240
Jinja start-gate                       31369521252
Full-page screenshot review            31369521278
```

The implementation subsequently merged to main as `76ab0b37294870e3fb372405672867053a7b7936`.

## Release-candidate verification

Complete repository CI produced release-candidate artifact:

```text
ID      9055587863
Name    matsuri-release-candidate-4cbb9d1aa26069cc55c5a4e290dcf84bb7f20e09
SHA256  218453c4ce4e687e56a66d4bea72c7e16fe838a244c8416ba20e4e4c2823550d
```

The unpacked release candidate verifies:

```text
Entities          112
Change Events     102
Relations          66
Occurrences       161
Sitemap entries   223
```

The sitemap contains all three new public routes listed above.

## Production boundary

At the time this corpus audit is recorded, `config/matsuri-production-baseline.json` still points to the Batch 38 release `03a6bcb8b58d3bc37e200c2eb4f7d6e41c7923d7`.

Therefore this document accepts Batch 39 repository/corpus quality but does **not** claim exact canonical production parity yet.

The next production gate must advance the baseline to the exact Batch 39 merge commit and verify the canonical hostname against:

```text
Entities          112
Change Events     102
Relations          66
Occurrences       161
Sitemap entries   223
```

The production assertion should add `occ-nagano-binzuru-2025` as record version 1 `held / unknown`. No 2026 held assertion should be added without separate post-event Evidence.

## Future-site boundary

Batch 39 adds no Shrine or Temple seed.

```text
Relation-backed Shrine seeds    23
Approved Jinja State Snapshots   0
```

Jinja remains blocked. This audit does not authorize `apps/jinja`, a Jinja Worker, hostname activation, publication, or any inferred Shrine Current State.

## Stabilization boundary

The Matsuri stabilization review remains `observing`. The formal review is eligible as of 2026-08-10, but minimum-duration completion is not automatic. Batch 39 contributes another evidence/modeling observation: an elapsed scheduled date is not converted to `held` without explicit post-event Evidence.

## Result

Batch 39 repository work is accepted for corpus quality:

- 長野県 is represented by a non-sparse primary Festival record with an Organization Relation, route Place, Current State, annual recurrence, a verified 2025 held occurrence, and a historical start Change Event;
- public Entity count is 112;
- primary prefecture coverage is 43 / 47;
- no sparse primary Entity is introduced;
- canonical dataset, freshness, Relations, Detail C, visual review, repository baseline, future-site seed gates, Jinja guard, and complete repository CI pass;
- Jinja remains explicitly blocked;
- stabilization remains observing.

Next gate: advance `config/matsuri-production-baseline.json` to release `76ab0b37294870e3fb372405672867053a7b7936` and require exact canonical-production verification before Batch 39 is closed.
