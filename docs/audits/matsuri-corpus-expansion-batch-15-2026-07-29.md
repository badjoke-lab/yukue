# Matsuri Corpus Expansion Batch 15 — 2026-07-29

## Status

Passed.

## Scope

Batch 15 continues the reviewed Matsuri breadth-and-depth track:

1. adds 長崎くんち in 長崎県 with 鎮西大社 諏訪神社 as its reviewed ritual anchor;
2. deepens the existing 祇園祭 record with annual Occurrence history for 2020, 2021, 2022, and 2026;
3. preserves the State-free future-site seed boundary and keeps the Jinja start gate blocked.

## New reviewed records

### 長崎くんち

- Festival Entity: `fst-nagasaki-kunchi`
- Shrine seed Entity: `shr-nagasaki-suwa-jinja`
- reviewed ritual anchor and Place: 鎮西大社 諏訪神社
- Current State based on the official 2026 programme
- annual Occurrence Series and Recurrence Pattern for October 7–9
- confirmed 2023 normal-format return
- scheduled 2026 edition
- Festival-to-Shrine Relation with approved Evidence
- national important intangible folk-cultural-property Designation
- canonical detail route, individual JSON, search entry, reverse Relation navigation, and embedded shrine map

### 祇園祭

The existing annual Series and Recurrence Pattern are reused rather than duplicated.

Added:

- 2020 modified and partially held edition, distinguishing the cancelled procession from retained ritual activity;
- 2021 modified and partially held edition, distinguishing the cancelled procession from partial float construction and related activity;
- 2022 held edition with scale left `unknown` rather than inferring a complete normal-format restoration;
- scheduled 2026 edition based on the official 山鉾行事 programme.

The existing 応仁の乱 interruption, 1500 revival, and 鷹山 unit records remain separate and unchanged.

## Resulting canonical corpus

Validation basis head: `ef6a1119d31b03db8cdfe2b9bb86d53a887f2679`.

| Record family | Count |
|---|---:|
| Entity | 57 |
| Place | 44 |
| State Snapshot | 28 |
| Change Event | 39 |
| Occurrence | 56 |
| Occurrence Series | 23 |
| Recurrence Pattern | 23 |
| Relation | 34 |
| Designation | 6 |
| Source | 102 |
| Evidence | 252 |

The corpus now covers 19 prefectures. The uncovered-prefecture count decreased to 28. The addition also removes 祇園祭 from the zero-Occurrence subset while retaining the existing umbrella/component distinction.

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

The build produces 119 public HTML routes. The representative visual contract contains 38 routes and produces 76 desktop/mobile full-page screenshots.

The screenshot audit passed with:

- 38 of 38 desktop routes captured;
- 38 of 38 mobile routes captured;
- 16 of 16 embedded maps loaded on each device;
- zero failures;
- zero warnings;
- zero recorded Google Maps iframe CORS noise.

## Validation

All 15 workflows triggered for the validation-basis head succeeded after correcting one assertion-code contract mismatch before merge.

| Verification | Run |
|---|---:|
| Complete repository CI and release freeze | `30424138095` |
| Detail C, map utility, and exhaustive Chromium navigation | `30424138105` |
| Desktop/mobile visual capture and audit | `30424138077` |
| Corpus coverage audit | `30424138087` |
| Canonical dataset contract | `30424138092` |
| Relation coverage | `30424138065` |
| Data freshness | `30424138066` |
| External-link maintenance | `30424138190` |
| Jinja start-gate record | `30424138136` |

Artifacts:

- release candidate `8712988636`, digest `sha256:2b0cb9463935187d315013a24a54b1be67013c0db48d89aec92450251c7cda68`;
- corpus coverage `8712945367`, digest `sha256:4364e67091927674b81441caa468d85a167383f6b87a0816faf92a6881c61bd5`;
- map utility audit `8712962845`, digest `sha256:f07786f5cf29d4cc5ed9d803dc3f63c4d4a30262de9569e05411a2c9add73893`;
- screenshot review `8712999208`, digest `sha256:737c050916e20661e052e34b31e1c57e3b953ff5286cfb176097ffd525388856`.

## Merge

- pull request: `#137`;
- merge commit: `e45a1742696817f1de54ca5d4299063c79dc6768`;
- merged at: `2026-07-29T05:15:06Z`.

## Boundaries

- all public claims require approved Evidence;
- no current State is inferred for 鎮西大社 諏訪神社;
- the Jinja site remains blocked and inactive;
- no Jinja application, Worker, hostname, or publication is created;
- 2020 and 2021 祇園祭 records do not collapse procession cancellation into total festival cancellation;
- the 2022 祇園祭 scale remains `unknown` because the reviewed source does not prove complete normal-format restoration;
- the 2026 長崎くんち and 祇園祭 records remain `scheduled` until their occurrence windows close and result Evidence is reviewed;
- dates use the repository UTC observation date, 2026-07-29;
- private analytics, candidate material, and internal project-policy information are absent.
