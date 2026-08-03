# Matsuri Corpus Expansion Batch 26 — 2026-08-03

## Status

Passed.

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

## Resulting canonical corpus

Validation head: `fab6e061d51b6e34aa22834284e5a152a4e199d9`.

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

The corpus now covers 30 prefectures, leaving 17 uncovered. Sparse primary Entities decreased to 3: 岳神楽, 御田祭, and 大償神楽.

Repository position:

```text
F1 batches                    13
F2 maintenance bundles        51
F2 correction bundles         16
Additive application slots    64
Correction application slots  16
Public Entities               83
Jinja State Snapshots          0
```

## Detail C and map review

The exhaustive Detail C contract verified:

- 171 generated HTML routes;
- 83 Pagefind-indexed records with direct detail URLs;
- 63 primary Entity details;
- 20 State-free Shrine or Temple reference pages;
- 69 Place details;
- 50 approved Relations;
- individual JSON for every generated record.

The exhaustive map-utility contract verified:

- 130 Place-bearing detail pages;
- 106 useful anchored details, comprising 93 concrete anchors and 13 approved official maps;
- 24 explicit location-gap pages;
- zero uncovered Festival or Folk Performance pages.

The exhaustive Chromium navigation test passed for every generated Entity detail and State-free seed-reference page.

## Visual review

The representative visual contract contains 86 routes and produced 172 desktop/mobile full-page screenshots.

The automated screenshot audit passed with:

- 86 of 86 desktop routes captured;
- 86 of 86 mobile routes captured;
- 52 of 52 embedded maps loaded on each device;
- zero failures;
- zero warnings;
- zero recorded Google Maps iframe CORS noise.

Manual full-resolution review confirmed:

- 長浜曳山祭 renders Current State, Occurrences, bounded Change Events, Shrine and preservation Relations, designations, Evidence, and a useful Shrine map;
- the State-free 長濱八幡宮 page preserves the seed boundary without inferring Shrine State;
- the concrete 長濱八幡宮 Place renders a useful map and reverse record links;
- the route-based city-center Place renders the explicit no-point-map explanation without a blank map frame;
- 公益財団法人長浜曳山文化協会 is presented as a protection and continuity organization rather than an unsupported yearly organizer;
- the deepened 佐陀神能 page renders the annual and special-public-performance histories without conflation, including the reviewed off-site venue;
- desktop and mobile pages remain readable with no horizontal overflow.

## Validation

All final-head workflows succeeded.

| Verification | Run |
|---|---:|
| Complete repository CI and release readiness | `30781671668` |
| Detail C, map utility, and exhaustive Chromium navigation | `30781671643` |
| Desktop/mobile visual capture and audit | `30781671633` |
| Corpus coverage audit | `30781671692` |
| Canonical dataset contract | `30781671669` |
| Correction contract | `30781671655` |
| Relation coverage | `30781671704` |
| Data freshness | `30781671607` |
| External-link maintenance | `30781671703` |
| Bundle inventory and repository baseline | `30781671637` |
| Future-site seed inventory | `30781671621` |
| Future-site seed readiness | `30781671657` |
| Jinja start-gate record | `30781671630` |
| F2-28 launch boundary | `30781671708` |
| Stabilization review | `30781671665` |

Artifacts:

- release candidate `8843929227`, digest `sha256:648a48401374787083bf342add7740da350b394ae742185642dad1363c513c97`;
- corpus coverage `8843874888`, digest `sha256:242dc710cf5450bc31a1b6f8b812cecc1df8984b88528efa9b42d84694d3005d`;
- map utility `8843902566`, digest `sha256:535dea46fba81499528e91541e3189c9ed2a23200b7ae7068236195bd9b3b08b`;
- screenshot review `8843967996`, digest `sha256:9ae8025e7df7b1fbfe06b44e8812ed0cca300d8e182a955fb94d308c7dcb67bf`.

## Merge

- pull request: `#167`;
- squash merge commit: `066e269aef170d9b32d6ad44808b06fadefcb954`;
- merged at: `2026-08-03T03:35:31Z`.

## Boundaries

- all public claims require approved Evidence;
- no Shrine Current State or legal-person State is inferred;
- protection responsibility is not silently expanded into yearly organizer responsibility;
- special public performances are not collapsed into annual ritual series;
- route-based Places are not converted into point maps;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- private analytics, candidate material, and internal project-policy information are absent.
