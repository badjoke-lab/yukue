# Matsuri Batch 39 Production Verification — 2026-08-10

## Status

Passed.

## Purpose

This audit closes exact canonical-production verification for Matsuri corpus expansion Batch 39.

The production baseline is pinned to the Batch 39 implementation release:

```text
76ab0b37294870e3fb372405672867053a7b7936
```

## Exact canonical result

Canonical-origin workflow run `31391829497` succeeded on attempt 1 against:

```text
https://matsuri-yukue.badjoke-lab.com
```

Verified exact counts:

| Production family | Count |
|---|---:|
| Entity | 112 |
| Change Event | 102 |
| Relation | 66 |
| Occurrence | 161 |
| Sitemap entry | 223 |

The canonical verifier passed against the Batch 39 machine baseline without relaxing any expected count, route, Entity, or Occurrence assertion.

## Batch 39 routes

The canonical baseline requires the new Nagano breadth routes:

- `/festivals/nagano-binzuru/`;
- `/organizations/nagano-binzuru-jikkoiinkai/`;
- `/places/nagano-binzuru-central-route/`.

All retained required production routes from earlier baselines remain part of the same verification contract.

## Required Entity and Occurrence assertions

The Batch 39 production baseline adds:

- `fst-nagano-binzuru`;
- `org-nagano-binzuru-jikkoiinkai`.

The new historical occurrence assertion is:

| Occurrence | Record version | Outcome | Scale |
|---|---:|---|---|
| `occ-nagano-binzuru-2025` | 1 | held | unknown |

The held outcome is supported by reviewed Nagano City post-event material. No attendance or scale is inferred.

No 2026 held assertion is added. The current 2026 municipal material supports active State, schedule, venue, and organizer context, but elapsed dates alone are not treated as post-event Evidence.

## Corpus position

Batch 39 adds 長野びんずる as the first approved primary Matsuri record for 長野県 and advances primary-record prefecture coverage to:

```text
43 / 47 prefectures
```

Four prefectures remain uncovered:

```text
新潟県
和歌山県
山口県
宮崎県
```

The verified repository corpus contains:

```text
Entities          112
Places            101
State Snapshots    52
Change Events     102
Occurrences       161
Relations          66
Designations       29
Sources           291
Evidence          654
```

No sparse primary Entity remains under the current corpus-coverage rule.

## Modeling boundary

長野びんずる is modeled with a center-city route Place rather than a fabricated point coordinate. The annual recurrence records the reviewed first-Saturday-of-August pattern. The 1971 first edition/start is stored at year precision, and the Festival is linked through an evidence-backed `organized_by` Relation to 長野びんずる実行委員会.

The 2026 schedule is retained as Current State and schedule context only. A past calendar date is not itself Evidence that an Occurrence was held.

## Map contract

The center-city route remains non-point geometry. The approved map target is the reviewed official Nagano Binzuru venue/route guidance.

No coordinate is invented to satisfy the map contract.

## Repository and visual verification

Implementation PR #228 passed the repository verification chain on implementation head:

```text
9a28e656cfde7df7dc35a5e19992899b6adab10d
```

Key workflow runs:

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

Corpus artifact:

```text
ID      9055471333
SHA256  40bc7dc7504377dba0e3ec60d6ee44177eca92ee4643a07b32ca27848b8ac738
```

Release-candidate artifact:

```text
ID      9055587863
SHA256  218453c4ce4e687e56a66d4bea72c7e16fe838a244c8416ba20e4e4c2823550d
```

The verified release candidate contains 223 sitemap entries and all three new Nagano routes.

Full-page screenshot artifact:

```text
ID      9055729799
Name    matsuri-full-page-screenshots-all-31369521278
SHA256  fab3388808936d62cbb12de4a57064ba7c7d5db95e1d142be32bc3fac3f1d1a4
Size    198222710 bytes
```

## Production-baseline verification

Production-baseline PR #230 passed:

```text
Complete repository CI  31391832796
Canonical-origin gate   31391829497
Canonical attempt       1
```

The machine-checked production baseline is stored in `config/matsuri-production-baseline.json`.

## Merge record

- Batch 39 implementation PR: #228;
- implementation release: `76ab0b37294870e3fb372405672867053a7b7936`;
- corpus-audit PR: #229;
- corpus-audit merge: `3e33431293e2847c6a4fdcb8a293e50e57f1e856`;
- production-baseline PR: #230;
- production-baseline merge: `c8c82e15d200ba36cdf5d7e984d303c519894a7f`.

## Boundaries

- this audit proves canonical route structure, exact feed counts, sitemap inventory, required Entities, and reviewed Occurrence assertions; it does not claim search-engine indexation;
- no distributed-route coordinate is invented;
- no 2026 held outcome is inferred from elapsed dates;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- stabilization remains a separate gate and is not completed by this audit;
- 2026-08-10 makes the stabilization review eligible to occur, but elapsed time alone does not complete it.

## Result

Batch 39 exact canonical-production verification is complete.

Matsuri corpus expansion remains active. The next corpus batch is Batch 40, using the four remaining uncovered prefectures as the breadth pool while continuing evidence-backed depth and dated maintenance work.

The formal Matsuri stabilization review is eligible, but remains `observing` until every required review item and public-safe evidence record is completed. Jinja remains blocked.
