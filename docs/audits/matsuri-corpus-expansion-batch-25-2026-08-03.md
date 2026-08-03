# Matsuri Corpus Expansion Batch 25 — 2026-08-03

## Status

Passed.

## Scope

Batch 25 continues the reviewed Matsuri breadth-and-depth track:

1. adds 春日若宮おん祭 as the first reviewed primary Matsuri record for 奈良県;
2. adds the State-free 春日若宮 seed, concrete Shrine Place, 御旅所, and route-based 御渡り式 area;
3. records the 1136 origin, modified 2021 edition, 2022 return toward usual scale with same-day rain cancellation of 御渡り式, and scheduled 2026 edition;
4. deepens 脚折雨乞 with the cancelled 2020 edition and the 8-year return in 2024;
5. preserves Detail C, Evidence, map, future-site seed, and blocked Jinja boundaries.

## Evidence boundaries

- 春日若宮 remains a State-free Shrine seed; no Shrine Current State or legal-person State is inferred.
- The 2022 edition is `held / modified`: pandemic-scale restrictions were removed, but 御渡り式 was cancelled by rain.
- The 2026 edition remains `scheduled` until result Evidence is reviewed.
- The 御渡り式 Place remains route-based and is not converted into a false single-point map.
- The 2020 脚折雨乞 edition is cancelled; the 2024 Change Event is limited to the return after the missed four-year cycle.

## Resulting canonical corpus

Validation head: `7bf698e390c2ab5ab7cc6e6971519b3d1876370e`.

| Record family | Count |
|---|---:|
| Entity | 80 |
| Place | 76 |
| State Snapshot | 38 |
| Change Event | 74 |
| Occurrence | 131 |
| Occurrence Series | 38 |
| Recurrence Pattern | 38 |
| Relation | 48 |
| Designation | 20 |
| Source | 198 |
| Evidence | 465 |

The corpus covers 29 prefectures, leaving 18 uncovered. Sparse primary Entities decreased to 4; 脚折雨乞 is no longer classified as sparse.

## Detail C and map review

Verified:

- 166 generated HTML routes;
- 80 Pagefind-indexed records with direct detail URLs;
- 61 primary Entity details;
- 19 State-free Shrine or Temple reference pages;
- 67 Place details;
- 48 approved Relations;
- 126 Place-bearing details;
- 103 useful anchored details;
- 23 explicit location-gap pages;
- zero uncovered Festival or Folk Performance pages.

The exhaustive Chromium navigation contract passed. 春日若宮 and 御旅所 use concrete anchors. The 御渡り式 route preserves an explicit route-area explanation without a false point map.

## Visual review

The representative contract contains 81 routes and 162 desktop/mobile full-page screenshots. Manual review of the implementation-head artifact confirmed readable desktop/mobile rendering for the Festival, Shrine reference, concrete Shrine Place, 御旅所, route Place, and deepened 脚折雨乞 page, with no blank map frame or horizontal overflow. The final head changes only the two-character Source title `若宮` to the validator-compliant `春日若宮`; the full screenshot workflow was re-run on that head.

## Validation

Successful final-head workflows:

| Verification | Run |
|---|---:|
| Complete repository CI and release readiness | `30779877999` |
| Detail C, map utility, and exhaustive Chromium navigation | `30779877982` |
| Corpus coverage audit | `30779877975` |
| Canonical dataset contract | `30779877990` |
| Correction contract | `30779877993` |
| Relation coverage | `30779877976` |
| Data freshness | `30779878000` |
| External-link maintenance | `30779878104` |
| Bundle inventory and repository baseline | `30779878020` |
| Future-site seed inventory | `30779878014` |
| Future-site seed readiness | `30779878009` |
| Jinja start-gate record | `30779878013` |
| F2-28 launch boundary | `30779877991` |
| Stabilization review | `30779877994` |
| Desktop/mobile visual capture and audit | `30779878025` |

## Merge

- pull request: `#164`;
- squash merge commit: `e458480152130dc0067bf9cfd5f1f87cb665ccb7`;
- merged on: `2026-08-03`.

## Boundaries

- all public claims require approved Evidence;
- no Shrine Current State or legal-person State is inferred;
- route-based Places are not converted into point maps;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- private analytics, candidate material, and internal project-policy information are absent.
