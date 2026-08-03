# Matsuri Corpus Expansion Batch 26 — 2026-08-03

## Status

Passed, including the post-merge Place-route correction.

## Scope

Batch 26 continues the reviewed Matsuri breadth-and-depth track:

1. adds 長浜曳山祭 as the first reviewed primary Matsuri record for 滋賀県;
2. adds the State-free 長濱八幡宮 seed, concrete Shrine Place, route-based city-center procession area, and 公益財団法人長浜曳山文化協会;
3. records the bounded 2020 public-festival pause, the 2022 countermeasure return, the 2024 restoration of the usual public format, and the held 2026 edition;
4. adds national and UNESCO designations and evidence-backed Shrine and preservation Relations;
5. deepens 佐陀神能 with held 2022 and 2026 special-public-performance cycles, the 2026 off-site museum-hall format, and the national designation;
6. preserves Detail C, Evidence, map, future-site seed, and blocked Jinja boundaries.

## Evidence boundaries

- 長濱八幡宮 remains a State-free Shrine seed; no Shrine Current State or legal-person State is inferred.
- The 2020 長浜 record is bounded to the public festival pause. It does not infer disappearance of the underlying ritual tradition.
- The 2022 長浜 edition is `held / modified` because reviewed public Evidence records countermeasures and operational adaptations.
- The 2024 長浜 edition is `held / normal` because 長浜市 explicitly records all events returning to their original form.
- The 2026 長浜 edition is `held / unknown`: execution is proven, but the reviewed Source does not support a reusable scale classification.
- 公益財団法人長浜曳山文化協会 is recorded as the protection and continuity organization. It is not inferred as the organizer of each yearly edition.
- The 長浜 city-center Place remains route-based and is not converted into a false single-point map.
- The 2022 and 2026 佐陀神能 records cover special public performances. They do not replace or redefine the annual 御座替祭 series.
- The scheduled September 2026 御座替祭 Occurrence remains unchanged until post-window Evidence is reviewed.

## New reviewed records

### 長浜曳山祭

Added:

- Festival Entity `fst-nagahama-hikiyama-matsuri`;
- State-free Shrine seed `shr-nagahama-hachimangu`;
- preservation Organization `org-nagahama-hikiyama-cultural-association`;
- concrete ritual anchor `plc-nagahama-hachimangu`;
- route-based city-center Place `plc-nagahama-hikiyama-route`;
- active Current State based on reviewed 2026 execution Evidence;
- annual Series and Recurrence Pattern;
- held modified 2022 edition;
- held normal 2024 edition;
- held unknown-scale 2026 edition;
- bounded 2020 pause, 2022 return, and 2024 usual-format return Change Events;
- evidence-backed `dedicated_at` and `maintained_by` Relations;
- national Important Intangible Folk Cultural Property and UNESCO designations;
- canonical detail routes, individual JSON, search, Relation navigation, Place navigation, and embedded-map behavior.

The concrete Shrine Place is the honest point anchor. The separate city-center procession area remains a route-based Place with an explicit no-point-map explanation.

## Existing-record depth

### 佐陀神能

Added:

- held modified 2022 special-public-performance cycle at 佐太神社;
- held 2026 special-public-performance cycle across 佐太神社 and 島根県立美術館ホール;
- a bounded 2026 Change Event recording the off-site museum-hall component of the special-public-performance format;
- the concrete performance venue Place `plc-shimane-art-museum-hall`;
- the national Important Intangible Folk Cultural Property designation;
- public-authority and official-tourism Sources with claim-specific Evidence.

These records deepen public-performance history without collapsing special performances into the annual 御座替祭 series. 佐陀神能 is no longer classified as a sparse primary Entity.

## Post-merge Place-route correction

The Batch 26 implementation initially referenced `plc-shimane-art-museum-hall` from the 2026 special-performance Occurrence but retained only 佐太神社 in the parent Entity's `default_place_ids`. The Place therefore existed in the public data feed but had no generated Place detail route.

Exact canonical-production verification exposed the gap as a persistent HTTP 404. Pull request `#169` corrected it rather than weakening the production baseline:

- added ordered correction bundle `corrections-17.json`;
- advanced `fpf-sada-shin-noh` to record version 2;
- retained 佐太神社 as the primary ritual and transmission anchor;
- represented reviewed special performances as multi-site;
- connected 島根県立美術館ホール through `default_place_ids`;
- generated the missing public Place detail, map, reverse Entity link, individual JSON, and sitemap entry;
- expanded the representative visual contract from 86 to 87 routes;
- strengthened required production-route checks to require real `html`, `main`, and `h1` structure.

The correction changes no canonical record-family totals. It changes the public HTML route count from 171 to 172 and the generated Place-detail count from 69 to 70.

## Resulting canonical corpus

Implementation validation head: `fab6e061d51b6e34aa22834284e5a152a4e199d9`.

Post-merge correction validation head: `1595ef16081f0aa9faf56ecd577d0d744c98f5b4`.

| Record family | Count |
|---|---:|
| Entity | 83 |
| Place | 79 |
| State Snapshot | 39 |
| Change Event | 78 |
| Occurrence | 136 |
| Occurrence Series | 39 |
| Recurrence Pattern | 39 |
| Relation | 50 |
| Designation | 23 |
| Source | 211 |
| Evidence | 488 |

The corpus covers 30 prefectures, leaving 17 uncovered. Sparse primary Entities decreased to 3: 岳神楽, 御田祭, and 大償神楽.

Repository position after the correction:

```text
F1 batches                    13
F2 maintenance bundles        51
F2 correction bundles         17
Additive application slots    64
Correction application slots  17
Public Entities               83
Jinja State Snapshots          0
```

## Detail C and map review

The final exhaustive Detail C contract verified:

- 172 generated HTML routes;
- 83 Pagefind-indexed records with direct detail URLs;
- 63 primary Entity details;
- 20 State-free Shrine or Temple reference pages;
- 70 Place details;
- 50 approved Relations;
- individual JSON for every generated record.

The final exhaustive map-utility contract verified:

- 131 Place-bearing detail pages;
- 107 useful anchored details, comprising 94 concrete anchors and 13 approved official maps;
- 24 explicit location-gap pages;
- zero uncovered Festival or Folk Performance pages.

The exhaustive Chromium navigation test passed for every generated Entity detail and State-free seed-reference page. The corrected 島根県立美術館ホール Place route passed point-map, reverse-link, individual-JSON, and real-browser checks.

## Visual review

The final representative visual contract contains 87 routes and produced 174 desktop/mobile full-page screenshots.

The automated screenshot audit passed with:

- 87 of 87 desktop routes captured;
- 87 of 87 mobile routes captured;
- 53 of 53 embedded maps loaded on each device;
- zero failures;
- zero warnings;
- zero recorded Google Maps iframe CORS noise.

Manual full-resolution review confirmed:

- 長浜曳山祭 renders Current State, Occurrences, bounded Change Events, Shrine and preservation Relations, designations, Evidence, and a useful Shrine map;
- the State-free 長濱八幡宮 page preserves the seed boundary without inferring Shrine State;
- the concrete 長濱八幡宮 Place renders a useful map and reverse record links;
- the route-based city-center Place renders the explicit no-point-map explanation without a blank map frame;
- 公益財団法人長浜曳山文化協会 is presented as a protection and continuity organization rather than an unsupported yearly organizer;
- the deepened 佐陀神能 page keeps the annual and special-public-performance histories separate and links the reviewed off-site venue;
- the corrected 島根県立美術館ホール page renders its point map, Evidence, reverse 佐陀神能 link, and machine-readable route on desktop and mobile;
- no reviewed page contains horizontal overflow or a blank map frame.

## Validation

All Batch 26 implementation workflows succeeded. The post-merge correction also succeeded in every triggered repository, data, route, visual, seed, Jinja, and production check.

| Correction verification | Run |
|---|---:|
| Complete repository CI and release readiness | `30783551781` |
| Detail C, map utility, and exhaustive Chromium navigation | `30783551845` |
| Desktop/mobile visual capture and audit | `30783551808` |
| Corpus coverage audit | `30783551783` |
| Canonical dataset contract | `30783551794` |
| Correction contract | `30783551761` |
| Relation coverage | `30783551766` |
| Data freshness | `30783551828` |
| External-link maintenance | `30783551800` |
| Bundle inventory and repository baseline | `30783551792` |
| Future-site seed inventory | `30783551793` |
| Future-site seed readiness | `30783551757` |
| Jinja start-gate record | `30783551833` |
| Canonical production baseline before correction deployment | `30783551768` |

The canonical production run succeeded on its first attempt and verified the deployed pre-correction Batch 26 baseline exactly: 83 Entities, 78 Change Events, 50 Relations, 136 Occurrences, 171 sitemap entries, and all required Batch 26 routes then present in production.

Final correction artifacts:

- release candidate `8844525556`, digest `sha256:87b5ce8d8b22bd585fd54668b8a287bed31a9ab6b0a42d365646dd42e29b75db`;
- corpus coverage `8844476917`, digest `sha256:d7cd9dcb3a6529bf907ca047cc0a062576c779b8b600443a34e080f268381cb7`;
- map utility `8844487911`, digest `sha256:be2f7e3f92f3138c85259abd4790a1759d0a6d1509b2f42bee543a7cb4fb4db0`;
- screenshot review `8844594395`, digest `sha256:cc1b0688bc4cd6275f7e50c2b29402c049404a699c721e97bb49c20dd7d4eb6d`.

## Merge

Batch 26 implementation:

- pull request: `#167`;
- squash merge commit: `066e269aef170d9b32d6ad44808b06fadefcb954`;
- merged at: `2026-08-03T03:35:31Z`.

Batch 26 audit:

- pull request: `#168`;
- squash merge commit: `52e8bfecc2beddc1539d4dad478ba1553d3eb502`.

Post-merge Place-route correction:

- pull request: `#169`;
- squash merge commit: `c0e1ba0b2a7d928f75257084f7261c05bdfacd1f`.

## Boundaries

- all public claims require approved Evidence;
- no Shrine Current State or legal-person State is inferred;
- protection responsibility is not silently expanded into yearly organizer responsibility;
- special public performances are not collapsed into annual ritual series;
- 佐太神社 remains the primary ritual and transmission anchor;
- route-based Places are not converted into point maps;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- private analytics, candidate material, and internal project-policy information are absent.
