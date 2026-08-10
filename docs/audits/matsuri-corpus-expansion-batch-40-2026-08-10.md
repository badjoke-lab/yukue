# Matsuri Corpus Expansion Batch 40 — 2026-08-10

## Status

Passed repository, corpus, freshness, Relation, Detail C, full-page visual, future-site seed, Jinja-boundary, and repository-baseline verification.

Exact canonical-production verification remains a separate gate and must be recorded after the production baseline is advanced to the merged Batch 40 release.

## Scope

Batch 40 adds 新潟まつり as the first approved primary Matsuri record for 新潟県.

Implementation was merged through PR #232 as:

```text
3e483cbb05f1416398ccefc56576116af4e9b126
```

The final reviewed implementation head was:

```text
7436763de3fa85fa6102a520da55da9732bc26b0
```

The reviewed public corpus adds:

- `fst-niigata-matsuri` — 新潟まつり Festival;
- `org-niigata-matsuri-jikkoiinkai` — 新潟まつり実行委員会 Organization;
- `plc-niigata-matsuri-central-area` — 新潟市中心市街地の分散会場 Place;
- Current State `active`;
- annual early-August Friday/Saturday/Sunday recurrence;
- the 2025 edition as `held / modified`;
- a year-level 1955 first-edition/start Change Event;
- an `organized_by` Relation to 新潟まつり実行委員会;
- eight reviewed Sources and eleven claim-linked Evidence records.

The 2025 `held` outcome is supported by reviewed official material confirming major scheduled procession/mikoshi activity proceeded. `modified` is separately supported by the official cancellation of the August 10 fireworks without postponement. No attendance is inferred.

The 2026 official and municipal material supports the current active State, schedule, venue context, and current operating-organization context. Batch 40 deliberately does **not** infer a 2026 held outcome merely because August 7–9 has elapsed; no 2026 Occurrence is added without explicit post-event Evidence.

## Corrective verification loop

The first complete repository-CI attempt found one newly added public Source that was not referenced by any public Evidence record. The source was removed rather than retained as unused material. The final implementation head reran the full verification chain and passed.

This preserves the public contract that published Sources exist to support reviewed public claims rather than acting as an unbounded research queue.

## Exact repository corpus

The final Batch 40 corpus-coverage workflow passed on implementation head `7436763de3fa85fa6102a520da55da9732bc26b0` as run `31394183090`.

Batch 40 advances the canonical corpus to:

| Family | Count |
|---|---:|
| Entities | 114 |
| Places | 102 |
| State Snapshots | 53 |
| Change Events | 103 |
| Occurrences | 162 |
| Occurrence Series | 54 |
| Recurrence Patterns | 54 |
| Relations | 67 |
| Designations | 29 |
| Sources | 299 |
| Evidence | 665 |

The Batch 40 increment from the Batch 39 checkpoint is:

```text
Entities          +2
Places            +1
State Snapshots   +1
Change Events     +1
Occurrences       +1
Occurrence Series +1
Recurrence        +1
Relations         +1
Sources           +8
Evidence          +11
```

No sparse primary Entity is introduced by this batch.

Repository maintenance baseline after Batch 40:

```text
F1 batches                    13
Maintenance bundles           88
Correction bundles            21
Additive application slots   101
Correction application slots  21
Correction records            35
Corrected logical IDs         32
Public Entities              114
Entities without external links 0
```

Corpus artifact:

```text
ID      9064911317
Name    matsuri-corpus-coverage-41d2740c14de36ec1c68127709d3a2c728fe26b5
SHA256  588ddccd1a164ba577f2812f82cb0e433a7831bc2a5211955b4efdf3adc8cfe9
```

## Geographic coverage

Batch 40 moves primary-record prefecture coverage from 43 to 44 prefectures.

新潟県 is now covered through 新潟まつり.

Three prefectures remain without an approved primary Matsuri record:

```text
和歌山県
山口県
宮崎県
```

## Detail C and map contract

Required new public routes are:

```text
/festivals/niigata-matsuri/
/organizations/niigata-matsuri-jikkoiinkai/
/places/niigata-matsuri-central-area/
```

Detail C navigation workflow `31394183264` passed on the final implementation head, including real-browser verification.

The center-city footprint is retained as distributed venue/route context rather than fabricating a single point coordinate. The approved map target is the official 新潟まつり traffic/venue guidance. No coordinate is invented.

Canonical dataset, Relation coverage, data freshness, correction contract, external-link maintenance, bundle inventory, future-site seed inventory/readiness, and Jinja start-gate checks also passed on the same final implementation head.

## Full-page visual verification

Full-page screenshot workflow run `31394183144` passed on the final implementation head.

Screenshot artifact:

```text
ID      9065244321
Name    matsuri-full-page-screenshots-all-31394183144
SHA256  6299988147d627131c1238ee60619e138523fef74801bd39bf2fde3f97362e21
Size    199487839 bytes
```

The successful workflow confirms the full-page visual-review gate completed for the Batch 40 implementation.

## Repository verification

The final implementation head `7436763de3fa85fa6102a520da55da9732bc26b0` passed the required verification chain, including:

```text
Complete repository CI                 31394183190
Corpus coverage                        31394183090
Relation coverage                      31394183116
Data freshness                         31394183245
Canonical dataset contract             31394183291
Correction contract                    31394183059
External-link maintenance              31394183127
Detail C navigation                    31394183264
Bundle inventory / repository baseline 31394183188
Future-site seed inventory             31394183231
Future-site seed readiness             31394183219
Jinja start-gate                       31394183196
Full-page screenshot review            31394183144
```

The implementation subsequently merged to main as `3e483cbb05f1416398ccefc56576116af4e9b126`.

## Release-candidate verification

Complete repository CI produced release-candidate artifact:

```text
ID      9065093096
Name    matsuri-release-candidate-41d2740c14de36ec1c68127709d3a2c728fe26b5
SHA256  89d0b938cd38ad7399743979bc775c50628462392a8e4a3fdecbe1e102d4793a
```

The unpacked release candidate verifies:

```text
Entities          114
Change Events     103
Relations          67
Occurrences       162
Sitemap entries   226
```

The sitemap and built artifact contain all three new public routes listed above.

## Production boundary

At the time this corpus audit is recorded, `config/matsuri-production-baseline.json` still points to the Batch 39 release `76ab0b37294870e3fb372405672867053a7b7936`.

Therefore this document accepts Batch 40 repository/corpus quality but does **not** claim exact canonical production parity yet.

The next production gate must advance the baseline to the exact Batch 40 implementation merge and verify the canonical hostname against:

```text
Entities          114
Change Events     103
Relations          67
Occurrences       162
Sitemap entries   226
```

The production assertion should add `occ-niigata-matsuri-2025` as record version 1 `held / modified`. No 2026 held assertion should be added without separate post-event Evidence.

## Future-site boundary

Batch 40 adds no Shrine or Temple seed.

```text
Relation-backed Shrine seeds    23
Approved Jinja State Snapshots   0
```

Jinja remains blocked. This audit does not authorize `apps/jinja`, a Jinja Worker, hostname activation, publication, or any inferred Shrine Current State.

## Stabilization boundary

The Matsuri stabilization review remains `observing`. The formal review is eligible as of 2026-08-10, but minimum-duration completion is not automatic. Batch 40 contributes two maintenance observations: unused public Sources are rejected by the release gate, and an elapsed scheduled date is not converted to `held` without explicit post-event Evidence.

## Result

Batch 40 repository work is accepted for corpus quality:

- 新潟県 is represented by a non-sparse primary Festival record with an Organization Relation, distributed center-city Place, Current State, annual recurrence, a verified 2025 `held / modified` occurrence, and a historical start Change Event;
- public Entity count is 114;
- primary prefecture coverage is 44 / 47;
- no sparse primary Entity is introduced;
- canonical dataset, freshness, Relations, Detail C, visual review, repository baseline, future-site seed gates, Jinja guard, and complete repository CI pass;
- Jinja remains explicitly blocked;
- stabilization remains observing.

Next gate: advance `config/matsuri-production-baseline.json` to release `3e483cbb05f1416398ccefc56576116af4e9b126` and require exact canonical-production verification before Batch 40 is closed.
