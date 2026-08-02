# Matsuri Corpus Expansion Batch 24 — 2026-08-02

## Status

Passed.

## Scope

Batch 24 continues the reviewed Matsuri breadth-and-depth track:

1. adds 石岡のおまつり in 茨城県 with a State-free Shrine seed, concrete ritual anchor, route-based public area, current State, annual Series, ritual Relation, public-event interruption and return history, and current schedule;
2. deepens the parent 早池峰神楽 record with reviewed 2019 and 2024 joint performances, a bounded five-year return event, and 2026 component New Year performances;
3. preserves the Detail C, Evidence, map, future-site seed, and blocked Jinja boundaries.

## New reviewed records

### 石岡のおまつり

Added:

- Festival Entity `fst-ishioka-matsuri`;
- State-free Shrine seed `shr-hitachi-sosogu-jinja`;
- concrete ritual anchor `plc-hitachi-sosogu-jinja`;
- route-based public area `plc-ishioka-matsuri-route`;
- active Current State based on the published 2026 schedule;
- annual Series and Recurrence Pattern;
- held modified 2020 edition;
- held normal 2022 public-event return;
- scheduled 2026 edition;
- bounded 2020–2021 public 神賑行事 interruption and 2022 return Change Events;
- evidence-backed ritual Relation to 常陸國總社宮;
- canonical detail routes, individual JSON, search, Relation navigation, Place navigation, and embedded maps.

The 2020–2021 Change Event applies to public 神賑行事 such as the 神輿, 山車, 獅子, and related city-center program. It does not infer cancellation of the underlying 例祭神事. The 2020 edition therefore remains `outcome: held` and `scale: modified`. The 2026 edition remains `scheduled` until result Evidence is reviewed.

常陸國總社宮 is the concrete ritual anchor. The separate city-center procession area remains route-based and is not converted into a false single-point map.

## Existing-record depth

### 早池峰神楽

Added to the existing parent Folk Performance:

- held 2019 岳神楽・大償神楽 joint performance associated with the UNESCO registration tenth anniversary;
- held 2024 岳神楽・大償神楽 joint performance associated with the UNESCO registration fifteenth anniversary;
- a bounded 2024 Change Event recording the five-year return of the joint-performance format;
- held 2026 New Year component performances by 大償神楽 and 岳神楽;
- official Municipality, Tourism, and Prefectural Sources with claim-specific Evidence;
- two performance-venue Places.

The five-year return applies to the joint-performance format. It does not classify the parent 早池峰神楽 tradition as suspended, dormant, or revived. 岳神楽 and 大償神楽 remain distinguishable component Entities and their individual performances are not collapsed into an invented parent-wide annual edition.

## Resulting canonical corpus

Validation basis implementation head: `397e98e298f1c18baf06305d7f5252bf362390e2`.

| Record family | Count |
|---|---:|
| Entity | 78 |
| Place | 73 |
| State Snapshot | 37 |
| Change Event | 69 |
| Occurrence | 127 |
| Occurrence Series | 37 |
| Recurrence Pattern | 37 |
| Relation | 47 |
| Designation | 19 |
| Source | 187 |
| Evidence | 447 |

The corpus now covers 28 prefectures. The uncovered-prefecture count decreased to 19. The sparse-primary-Entity count decreased to 5, and the parent 早池峰神楽 record is no longer classified as sparse.

Repository position:

```text
F1 batches                    13
F2 maintenance bundles        45
F2 correction bundles         16
Additive application slots    58
Correction application slots  16
Public Entities               78
Jinja State Snapshots          0
```

## Detail C and map review

The exhaustive Detail C contract verified:

- 161 generated HTML routes;
- 78 Pagefind-indexed records with direct detail URLs;
- 60 primary Entity details;
- 18 State-free Shrine or Temple reference pages;
- 64 Place details;
- 47 approved Relations;
- individual JSON for every generated record.

The exhaustive map-utility contract verified:

- 121 Place-bearing detail pages;
- 99 useful anchored detail pages;
- 22 explicit location-gap pages;
- zero uncovered Festival or Folk Performance pages.

石岡のおまつり, 常陸國總社宮, and the Shrine Place use the concrete Shrine Place as the useful anchor. The separate 石岡市中心部巡行区域 page preserves an explicit route-area explanation and no false point map.

The exhaustive Chromium navigation test passed for every generated Entity detail and State-free seed-reference page.

## Visual review

The representative visual contract contains 76 routes and produced 152 desktop/mobile full-page screenshots.

The automated screenshot audit passed with:

- 76 of 76 desktop routes captured;
- 76 of 76 mobile routes captured;
- 45 of 45 embedded maps loaded on each device;
- zero failures;
- zero warnings;
- zero recorded Google Maps iframe CORS noise.

Manual full-resolution review confirmed:

- 石岡のおまつり renders Current State, Occurrences, Change Events, Shrine Relation, Evidence, and a useful Shrine map;
- the State-free 常陸國總社宮 page renders the reference boundary without inferring a Shrine State;
- the concrete Shrine Place renders its map and reverse record links;
- the route-based Place renders the explicit no-point-map explanation;
- the deepened 早池峰神楽 history remains readable on desktop and mobile;
- no reviewed page contains a blank map frame or horizontal overflow.

## Validation

The final implementation and visual-review head succeeded in 13 workflows.

| Verification | Run |
|---|---:|
| Complete repository CI and release readiness | `30736457879` |
| Detail C, map utility, and exhaustive Chromium navigation | `30736457886` |
| Desktop/mobile visual capture and audit | `30736457859` |
| Corpus coverage audit | `30736457872` |
| Correction contract | `30736457871` |
| Relation coverage | `30736457874` |
| Data freshness | `30736457856` |
| External-link maintenance | `30736457869` |
| Bundle inventory and repository baseline | `30736457865` |
| Future-site seed inventory | `30736457870` |
| Jinja start-gate record | `30736457867` |
| F2-28 launch boundary | `30736457860` |
| Stabilization review | `30736457868` |

Two GitHub-hosted jobs remained queued on the final head. Both succeeded on the immediately preceding data-identical head `f6676b507944c5e5a4876c6f3580107a553ee469`; the only subsequent change was the visual-review documentation update.

| Verification | Run |
|---|---:|
| Canonical dataset contract | `30736380168` |
| Future-site seed readiness | `30736380176` |

Artifacts:

- release candidate `8829843794`, digest `sha256:8553d19eca09756d638b57d79382975ce2f5fa9f8fec8baf11bbfa08cdb4c595`;
- corpus coverage `8829877885`, digest `sha256:5635ee6ae5a4e5a34c30cbe8c178a0820c1520154780abd31eca3491b7dc1c92`;
- map utility `8829785650`, digest `sha256:32f9156c7a9e9ba06bb145b8e5a3404f2ccb630ca20445a5e033ee7ec1a0c5e8`;
- screenshot review `8829830147`, digest `sha256:2ef30ab27f11fdb915eb91e89037578a4f6abc14443e2e622253eab28ba5d86f`.

## Merge

- pull request: `#161`;
- squash merge commit: `2cf81ad040a729275cedd3967cef84f393b6d929`;
- merged at: `2026-08-02T07:01:53Z`.

## Boundaries

- all public claims require approved Evidence;
- the 2020–2021 石岡 interruption is bounded to public 神賑行事;
- the 2020 石岡 edition preserves the continued 例祭神事 and remains held modified;
- the 2022 石岡 edition records the public-event return;
- the 2026 石岡 edition remains scheduled;
- the 2024 早池峰 Change Event applies to the joint-performance format only;
- component performances are not collapsed into an invented parent-wide annual edition;
- route-based Places are not converted into point maps;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- private analytics, candidate material, and internal project-policy information are absent.
