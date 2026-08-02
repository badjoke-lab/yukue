# Matsuri Corpus Expansion Batch 23 — 2026-08-02

## Status

Passed.

## Scope

Batch 23 continues the reviewed Matsuri breadth-and-depth track:

1. adds 上野天神祭 in 三重県 with a State-free Shrine seed, preservation Organization, concrete ritual anchor, route-based public area, current State, annual Series, public-procession interruption and return history, Relations, and Designations;
2. deepens 三社祭 with reviewed 2020–2023 Occurrences and bounded format-change history while preserving the distinction between continued rites and altered public mikoshi processions;
3. preserves the Detail C, Evidence, map, future-site seed, and blocked Jinja boundaries.

## New reviewed records

### 上野天神祭

Added:

- Festival Entity `fst-ueno-tenjin-matsuri`;
- State-free Shrine seed `shr-iga-sugawara-jinja`;
- preservation Organization `org-ueno-bunka-bijutsu-hozonkai`;
- concrete ritual anchor `plc-iga-sugawara-jinja`;
- route-based public area `plc-ueno-tenjin-route`;
- active Current State based on the published 2026 schedule;
- annual three-day Series and Recurrence Pattern;
- modified held 2022 edition;
- scheduled 2026 edition;
- bounded 2020–2021 public-danjiri interruption and modified 2022 return Change Events;
- evidence-backed ritual Relation to 菅原神社;
- evidence-backed preservation Relation to 上野文化美術保存会;
- national important intangible folk-cultural-property and UNESCO Designations;
- canonical detail routes, individual JSON, search, Relation navigation, Place navigation, and embedded maps.

The 2020–2021 Change Event applies to the public danjiri procession. It does not infer that the underlying Shrine rites disappeared. The 2022 edition remains `scale: modified`, and the 2026 edition remains `scheduled` until result Evidence is reviewed.

菅原神社 is the concrete ritual anchor. The separate city-center procession area remains route-based and is not converted into a false single-point map.

## Existing-record depth

### 三社祭

Added to the existing Festival:

- held modified 2020 edition after postponement from May to October;
- held modified 2021 edition with rites retained and ordinary public mikoshi processions cancelled;
- held modified 2022 edition with limited participants and carrying sections;
- held modified 2023 edition with the reviewed exception for the parishioner shrine departure;
- bounded 2020–2021 pandemic-format Change Event;
- bounded 2022 mikoshi return Change Event;
- bounded 2023 near-normal restoration Change Event;
- official Organization and tourism Sources with claim-specific Evidence.

The records do not classify 2020 or 2021 as cancelled annual Festivals because the reviewed Sources document continued rites. They also do not classify 2023 as fully normal because the reviewed Source retains a specific exception.

## Resulting canonical corpus

Validation basis head: `8881f8f597258641e8cab0f3d5c80527c10d9fcc`.

| Record family | Count |
|---|---:|
| Entity | 76 |
| Place | 69 |
| State Snapshot | 36 |
| Change Event | 66 |
| Occurrence | 121 |
| Occurrence Series | 36 |
| Recurrence Pattern | 36 |
| Relation | 46 |
| Designation | 19 |
| Source | 179 |
| Evidence | 429 |

The corpus now covers 27 prefectures. The uncovered-prefecture count decreased to 20. The sparse-primary-Entity count decreased to 6.

Repository position:

```text
F1 batches                    13
F2 maintenance bundles        42
F2 correction bundles         16
Additive application slots    55
Correction application slots  16
Public Entities               76
Jinja State Snapshots          0
```

## Detail C and map review

The exhaustive Detail C contract verified:

- 157 generated HTML routes;
- 76 Pagefind-indexed records with direct detail URLs;
- 59 primary Entity details;
- 17 State-free Shrine or Temple reference pages;
- 62 Place details;
- 46 approved Relations;
- individual JSON for every generated record.

The exhaustive map-utility contract verified:

- 117 Place-bearing detail pages;
- 96 useful anchored detail pages;
- 21 explicit location-gap pages;
- zero uncovered Festival or Folk Performance pages.

上野天神祭, 菅原神社, and the Shrine Place use the concrete Shrine Place as the useful anchor. The separate 伊賀上野城下町巡行区域 page preserves an explicit route-area explanation and no false point map.

The exhaustive Chromium navigation test passed for every generated Entity detail and State-free seed-reference page.

## Visual review

The representative visual contract contains 72 routes and produced 144 desktop/mobile full-page screenshots.

The automated screenshot audit passed with:

- 72 of 72 desktop routes captured;
- 72 of 72 mobile routes captured;
- 42 of 42 embedded maps loaded on each device;
- zero failures;
- zero warnings;
- zero recorded Google Maps iframe CORS noise.

Manual full-resolution review confirmed:

- 上野天神祭 renders Current State, Occurrences, Change Events, Shrine and preservation Relations, Designations, Evidence, and a useful Shrine map;
- the State-free 菅原神社 page renders the reference boundary without inferring a Shrine State;
- 上野文化美術保存会 renders as a separate Organization with its preservation Relation;
- the concrete Shrine Place renders its map and reverse record links;
- the route-based Place renders the explicit no-point-map explanation;
- the deepened 三社祭 history remains readable on desktop and mobile;
- no reviewed page contains a blank map frame or horizontal overflow.

## Validation

All 15 workflows on the final validation-basis head succeeded.

| Verification | Run |
|---|---:|
| Complete repository CI and release readiness | `30735090473` |
| Detail C, map utility, and exhaustive Chromium navigation | `30735090447` |
| Desktop/mobile visual capture and audit | `30735090460` |
| Corpus coverage audit | `30735090535` |
| Canonical dataset contract | `30735090474` |
| Correction contract | `30735090516` |
| Relation coverage | `30735090495` |
| Data freshness | `30735090534` |
| External-link maintenance | `30735090449` |
| Bundle inventory and repository baseline | `30735090497` |
| Future-site seed inventory | `30735090433` |
| Future-site seed readiness | `30735090522` |
| Jinja start-gate record | `30735090489` |
| F2-28 launch boundary | `30735090503` |
| Stabilization review | `30735090458` |

Artifacts:

- release candidate `8829319220`, digest `sha256:98ba900b11c19aca9a23fa6e2a67585a58373935047eb2436099a48ca57fe153`;
- corpus coverage `8829277928`, digest `sha256:ff9dbc3f030b4d8e2d198b1166295b1681506d53893d0ee0a678a9c93aa9e515`;
- map utility `8829293467`, digest `sha256:24967a6d310a9d2b3b32bee49d79721c96d46894b2978985afa0f43cc0ff3d6b`;
- screenshot review `8829343799`, digest `sha256:917a91beb2c1d642b76a255bf4a92b0a130a9d9b2a74645113d0232b86d3f23d`.

## Merge

- pull request: `#158`;
- squash merge commit: `0ccf81fa149d7050dc6f88a708563323d27a93f9`;
- merged at: `2026-08-02T06:10:23Z`.

## Boundaries

- all public claims require approved Evidence;
- the 2020–2021 上野天神祭 interruption is bounded to the public danjiri procession;
- the 2022 上野天神祭 remains modified;
- the 2026 上野天神祭 remains scheduled;
- the 2020–2021 三社祭 records preserve continued rites;
- the 2022–2023 三社祭 records retain the reviewed format limitations;
- route-based Places are not converted into point maps;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- private analytics, candidate material, and internal project-policy information are absent.
