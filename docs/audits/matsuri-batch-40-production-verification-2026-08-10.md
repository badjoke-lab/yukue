# Matsuri Batch 40 Production Verification — 2026-08-10

## Status

Passed.

## Purpose

This audit closes exact canonical-production verification for Matsuri corpus expansion Batch 40.

The production baseline is pinned to the Batch 40 implementation release:

```text
3e483cbb05f1416398ccefc56576116af4e9b126
```

## Exact canonical result

Canonical-origin workflow run `31396246157` succeeded on attempt 1 against:

```text
https://matsuri-yukue.badjoke-lab.com
```

Verified exact counts:

| Production family | Count |
|---|---:|
| Entity | 114 |
| Change Event | 103 |
| Relation | 67 |
| Occurrence | 162 |
| Sitemap entry | 226 |

The canonical verifier passed against the Batch 40 machine baseline without relaxing any expected count, route, Entity, or Occurrence assertion.

## Batch 40 routes

The canonical baseline requires the new Niigata breadth routes:

- `/festivals/niigata-matsuri/`;
- `/organizations/niigata-matsuri-jikkoiinkai/`;
- `/places/niigata-matsuri-central-area/`.

All retained required production routes from earlier baselines remain part of the same verification contract.

## Required Entity and Occurrence assertions

The Batch 40 production baseline adds:

- `fst-niigata-matsuri`;
- `org-niigata-matsuri-jikkoiinkai`.

The new historical occurrence assertion is:

| Occurrence | Record version | Outcome | Scale |
|---|---:|---|---|
| `occ-niigata-matsuri-2025` | 1 | held | modified |

The held outcome is supported by reviewed official material confirming major scheduled procession and mikoshi activity proceeded. The modified scale is separately supported by the official cancellation of the August 10 fireworks without postponement. No attendance is inferred.

No 2026 held assertion is added. The current 2026 official and municipal material supports active State, schedule, venue context, and operating-organization context, but elapsed dates alone are not treated as post-event Evidence.

## Corpus position

Batch 40 adds 新潟まつり as the first approved primary Matsuri record for 新潟県 and advances primary-record prefecture coverage to:

```text
44 / 47 prefectures
```

Three prefectures remain uncovered:

```text
和歌山県
山口県
宮崎県
```

The verified repository corpus contains:

```text
Entities          114
Places            102
State Snapshots    53
Change Events     103
Occurrences       162
Relations          67
Designations       29
Sources           299
Evidence          665
```

No sparse primary Entity remains under the current corpus-coverage rule.

## Modeling boundary

新潟まつり is modeled with distributed center-city venue context rather than a fabricated point coordinate. The annual recurrence records the reviewed early-August Friday/Saturday/Sunday pattern. The 1955 first edition/start is stored at year precision, and the Festival is linked through an evidence-backed `organized_by` Relation to 新潟まつり実行委員会.

The 2026 schedule is retained as Current State and schedule context only. A past calendar date is not itself Evidence that an Occurrence was held.

## Map contract

The center-city footprint remains distributed venue/route context. The approved map target is the reviewed official 新潟まつり traffic/venue guidance.

No coordinate is invented to satisfy the map contract.

## Repository and visual verification

Implementation PR #232 passed the final repository verification chain on implementation head:

```text
7436763de3fa85fa6102a520da55da9732bc26b0
```

Key workflow runs:

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

Corpus artifact:

```text
ID      9064911317
SHA256  588ddccd1a164ba577f2812f82cb0e433a7831bc2a5211955b4efdf3adc8cfe9
```

Release-candidate artifact:

```text
ID      9065093096
SHA256  89d0b938cd38ad7399743979bc775c50628462392a8e4a3fdecbe1e102d4793a
```

The verified release candidate contains 226 sitemap entries and all three new Niigata routes.

Full-page screenshot artifact:

```text
ID      9065244321
Name    matsuri-full-page-screenshots-all-31394183144
SHA256  6299988147d627131c1238ee60619e138523fef74801bd39bf2fde3f97362e21
Size    199487839 bytes
```

The first complete-CI attempt exposed one newly added public Source that was not referenced by public Evidence. That Source was removed rather than retained as an unused research artifact. The final implementation head then passed the full verification chain.

## Production-baseline verification

Production-baseline PR #234 passed:

```text
Complete repository CI  31396246242
Canonical-origin gate   31396246157
Canonical attempt       1
```

The machine-checked production baseline is stored in `config/matsuri-production-baseline.json`.

## Merge record

- Batch 40 implementation PR: #232;
- implementation release: `3e483cbb05f1416398ccefc56576116af4e9b126`;
- corpus-audit PR: #233;
- corpus-audit merge: `386c033ce5c1e1f5d744f5f9467476d59c2a9f7e`;
- production-baseline PR: #234;
- production-baseline merge: `05768177bb98ec4d623e3f2ab29862f2faf38eca`.

## Boundaries

- this audit proves canonical route structure, exact feed counts, sitemap inventory, required Entities, and reviewed Occurrence assertions; it does not claim search-engine indexation;
- no distributed-area coordinate is invented;
- no 2026 held outcome is inferred from elapsed dates;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- stabilization remains a separate gate and is not completed by this audit;
- 2026-08-10 makes the stabilization review eligible to occur, but elapsed time alone does not complete it.

## Result

Batch 40 exact canonical-production verification is complete.

Matsuri corpus expansion remains active. The next corpus batch is Batch 41, using the three remaining uncovered prefectures as the breadth pool while continuing evidence-backed depth and dated maintenance work.

The formal Matsuri stabilization review is eligible, but remains `observing` until every required review item and public-safe evidence record is completed. Jinja remains blocked.
