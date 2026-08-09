# Matsuri Batch 33 Production Verification — 2026-08-09

## Status

Passed.

## Purpose

This audit closes exact canonical-production verification for Matsuri corpus expansion Batch 33 after the dated Sendai Tanabata 2026 maintenance rollover discovered by the August 9 repository freshness gate.

The final production baseline is pinned to the post-maintenance data release:

```text
239ac16067b9bc279d3a460dcbeae961244a0e88
```

## Exact canonical result

Canonical-origin workflow run `31300301978` succeeded on attempt 1 against:

```text
https://matsuri-yukue.badjoke-lab.com
```

Verified exact counts:

| Production family | Count |
|---|---:|
| Entity | 100 |
| Change Event | 95 |
| Relation | 60 |
| Occurrence | 154 |
| Sitemap entry | 203 |

The verifier confirmed the production baseline release `239ac16067b9bc279d3a460dcbeae961244a0e88` and all 203 sitemap entries.

## Batch 33 routes

The canonical verifier confirmed HTTP 200 and the retained production contract for the new Kanagawa breadth routes:

- `/festivals/chigasaki-kaigan-hamaori-sai/`;
- `/organizations/chigasaki-hamaori-jikkoiinkai/`;
- `/references/shrines/samukawa-jinja/`;
- `/places/chigasaki-nishihama-kaigan/`;
- `/places/samukawa-jinja/`.

All retained required routes from earlier production baselines also passed.

## Required Entity and Occurrence assertions

The production baseline requires the Batch 33 Entities:

- `fst-chigasaki-kaigan-hamaori-sai`;
- `org-chigasaki-hamaori-jikkoiinkai`;
- `shr-samukawa-jinja`;
- all retained required Entities from earlier production baselines.

The production verifier also evaluates the retained occurrence assertions plus the new Batch 33 assertions:

| Occurrence | Record version | Outcome | Scale |
|---|---:|---|---|
| `occ-chigasaki-hamaori-2025` | 1 | held | unknown |
| `occ-sendai-tanabata-2026-schedule` | 2 | held | unknown |

Retained dated rollover assertions include 弘前ねぷた2026, 秋田竿燈まつり2026, and 青森ねぶた2026 at record version 2 `held / unknown`, plus 唐津くんち2025 as `held / unknown`.

A `held` result does not imply normal scale or complete execution of every published component.

## Sendai dated-maintenance correction

The first Batch 33 corpus-audit PR, #202, was intentionally closed unmerged after repository launch-readiness detected `occ-sendai-tanabata-2026-schedule` as past its published end date while still marked `scheduled` on August 9.

PR #203 then:

- added reviewed official post-event Evidence from 仙台七夕まつり協賛会;
- added maintenance bundle 74;
- replaced the Occurrence through correction bundle 21 with record version 2;
- changed the result to `held / unknown`;
- retained the original schedule Evidence;
- registered the new maintenance and correction bundles in both canonical loaders;
- advanced the repository maintenance baseline;
- passed the data freshness, correction, canonical dataset, Detail C, full repository, and full-page screenshot verification workflows.

The correction does not infer that every August 6–8 component completed normally.

## Batch 33 corpus position

Batch 33 adds 茅ヶ崎海岸浜降祭 as the first approved primary Matsuri record for 神奈川県 and advances primary-record prefecture coverage to:

```text
37 / 47 prefectures
```

Ten prefectures remain uncovered:

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

The final post-maintenance repository corpus contains:

```text
Entities          100
Places             93
State Snapshots    46
Change Events      95
Occurrences       154
Relations          60
Designations       29
Sources           259
Evidence          594
```

No sparse primary Entity remains under the current corpus-coverage rule.

## Repository verification

The final production-baseline PR #205 passed complete repository CI in workflow run `31300301974`.

The exact canonical-origin gate passed in workflow run `31300301978` on attempt 1.

The post-maintenance implementation PR #203 passed complete repository CI in workflow run `31299835536`, data freshness in `31299835580`, Detail C navigation in `31299835519`, and full-page screenshot verification in `31299835570`.

Post-maintenance screenshot artifact:

```text
ID      9034250589
SHA256  256281a100210f7b99cc619c9e661d58d7ef47519fd9dc48b7ed23496ec0135c
```

The machine-checked production baseline is stored in:

```text
config/matsuri-production-baseline.json
```

## Merge record

- Batch 33 implementation PR: #201;
- implementation merge: `83f6bc77d6e22e7086ea12de47391356e82a1776`;
- superseded first corpus-audit PR: #202, closed unmerged;
- Sendai dated-maintenance PR: #203;
- post-maintenance release: `239ac16067b9bc279d3a460dcbeae961244a0e88`;
- final corpus-audit PR: #204;
- final corpus-audit merge: `d6d9b4dc791262a7db21d5961e13904d0101aa02`;
- production-baseline PR: #205;
- production-baseline merge: `2bfeaf2145a102659895960b4f24b476e782b894`.

## Boundaries

- this audit proves the canonical route structure, exact feed counts, sitemap inventory, required Entities, and reviewed Occurrence assertions; it does not claim search-engine indexation;
- no 2026 茅ヶ崎海岸浜降祭 outcome is inferred;
- the 2026 仙台七夕まつり `held` result does not imply normal scale or complete execution of every component;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- stabilization remains a separate gate and is not completed by this production audit.

## Result

Batch 33 exact canonical-production verification is complete. Matsuri corpus expansion remains active while stabilization remains under observation until its separate review becomes eligible on or after 2026-08-10 and the required maintenance evidence is evaluated.
