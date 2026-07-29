# Matsuri Corpus Expansion Batch 17 — 2026-07-29

## Status

Passed.

## Scope

Batch 17 continues the reviewed Matsuri breadth-and-depth track:

1. adds 佐原の大祭 in 千葉県 as an umbrella Festival with separate summer and autumn shrine-festival Series;
2. deepens the existing 山鹿灯籠まつり Festival with interruption, return, and annual Occurrence history;
3. preserves State-free future-site seeds and keeps the Jinja start gate blocked.

## New reviewed records

### 佐原の大祭

- Festival Entity: `fst-sawara-grand-festival`
- Shrine seed Entities: `shr-sawara-yasaka-jinja`, `shr-sawara-suwa-jinja`
- concrete Shrine Places and representative 本宿 / 新宿 Places
- Current State based on the official 2026 autumn schedule
- separate summer and autumn Occurrence Series and Recurrence Patterns
- cancelled summer and autumn editions for 2020 and 2021
- held 2022 summer return
- held 2023 autumn edition
- scheduled 2026 autumn edition
- Festival-to-Shrine Relations preserving the 八坂神社祇園祭 / 諏訪神社秋祭り distinction
- national important intangible folk-cultural-property and UNESCO Designations
- canonical detail routes, individual JSON, search entries, reverse Relation navigation, and embedded maps

No current Shrine State is inferred.

### 山鹿灯籠まつり

The existing Festival Series and Recurrence Pattern are reused rather than duplicated.

Added:

- cancelled 2020 Festival edition;
- cancelled 2021 Festival edition;
- held 2022 Festival return;
- scheduled 2026 Festival edition;
- interruption and return Change Events.

The existing Festival → 山鹿灯籠踊り → 保存会 Relation chain remains unchanged. The scheduled 2026 Festival edition remains distinct from the scheduled 2026 千人灯籠踊り performance Occurrence.

## Resulting canonical corpus

Validation basis head: `cb66634f40384ae4edcbbb6fe20c32db194c949c`.

| Record family | Count |
|---|---:|
| Entity | 62 |
| Place | 54 |
| State Snapshot | 30 |
| Change Event | 47 |
| Occurrence | 76 |
| Occurrence Series | 26 |
| Recurrence Pattern | 26 |
| Relation | 37 |
| Designation | 8 |
| Source | 122 |
| Evidence | 305 |

The corpus now covers 21 prefectures. The uncovered-prefecture count decreased to 26. The sparse-primary-Entity count decreased to 9 because 山鹿灯籠まつり now has Festival Occurrence and Change Event coverage.

## Product projection

The new and deepened records are included in:

- canonical HTML detail routes;
- browse and search navigation;
- individual machine-readable JSON;
- bidirectional Relation rendering;
- Place detail pages;
- map-utility validation;
- exhaustive Chromium Detail C navigation;
- current-state, occurrence-history, change-history, designation, and Evidence sections.

The build produces 130 public HTML routes. The representative visual contract contains 46 routes and produces 92 desktop/mobile full-page screenshots.

The screenshot audit passed with:

- 46 of 46 desktop routes captured;
- 46 of 46 mobile routes captured;
- 22 of 22 embedded maps loaded on each device;
- zero failures;
- zero warnings;
- zero recorded Google Maps iframe CORS noise.

## Validation

All 15 workflows triggered for the validation-basis head succeeded after correcting the Jinja seed machine-record `official_urls` value from 12 to the measured value 10.

| Verification | Run |
|---|---:|
| Complete repository CI and release freeze | `30428437895` |
| Detail C, map utility, and exhaustive Chromium navigation | `30428437573` |
| Desktop/mobile visual capture and audit | `30428437563` |
| Corpus coverage audit | `30428437513` |
| Canonical dataset contract | `30428437522` |
| Relation coverage | `30428437555` |
| Data freshness | `30428437486` |
| External-link maintenance | `30428437580` |
| Jinja start-gate record | `30428437644` |

Artifacts:

- release candidate `8714567430`, digest `sha256:512881ba5c055bc247241bff2e3e4af080ffbde4b718503213a5124f73eb4c36`;
- corpus coverage `8714507311`, digest `sha256:9e4e5d6c7e6ccba2dcfe350c6b89ec06ec29ea02ecbf862923889e15af7ff1f4`;
- map utility audit `8714529276`, digest `sha256:ca5201bf18ce3794edf5e4eb977b0cfef9619803888fa92af60dde9fdb3250e5`;
- screenshot review `8714584393`, digest `sha256:cdd730026ece82d8ac8a400e517350f3c02056359439c2d780756954c60c999b`.

## Merge

- pull request: `#143`;
- merge commit: `8073c718dee12b009d428bd8ecb668f7031eb061`;
- merged at: `2026-07-29T06:37:48Z`.

## Boundaries

- all public claims require approved Evidence;
- summer and autumn 佐原 records remain separate recurring Series;
- no current State is inferred for either new Shrine seed;
- the 2022 Sawara and Yamaga return scales remain `unknown` where reviewed sources do not prove a complete normal format;
- the 2026 Sawara autumn and Yamaga records remain `scheduled` until their occurrence windows close and result Evidence is reviewed;
- cancelled editions do not replace current active Festival States;
- the Jinja site remains blocked and inactive;
- no Jinja application, Worker, hostname, publication, or invented State Snapshot is created;
- dates use the repository UTC observation date, 2026-07-29;
- private analytics, candidate material, and internal project-policy information are absent.
