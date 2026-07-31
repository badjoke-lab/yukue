# Matsuri Corpus Expansion Batch 20 — 2026-07-31

## Status

Passed.

## Scope

Batch 20 continues the reviewed Matsuri breadth-and-depth track:

1. adds 山あげ祭 in 栃木県 with its ritual Shrine seed, concrete Shrine Place, distributed performance area, current State, annual Series, interruption/return history, and Designations;
2. deepens 大日堂舞楽 with a held 2026 annual performance Occurrence;
3. preserves the Detail C, Evidence, map, correction, and blocked Jinja boundaries.

## New reviewed records

### 山あげ祭

Added:

- Festival Entity `fst-yamaage-matsuri`;
- State-free Shrine seed `shr-karasuyama-yakumo-jinja`;
- concrete ritual anchor `plc-karasuyama-yakumo-jinja`;
- distributed public-performance area `plc-karasuyama-city-center`;
- active Current State based on the municipality's current 2026 schedule and operating information;
- annual three-day Series around the fourth Saturday of July;
- cancelled 2020 edition;
- held 2022 public return and held 2025 edition, both with unknown scale;
- bounded 2020 suspension and 2022 return Change Events;
- evidence-backed ritual Relation to 八雲神社;
- national important intangible folk-cultural-property and UNESCO Designations;
- canonical detail routes, individual JSON, search, Relation navigation, Place navigation, and embedded maps.

The 2026 source proves current activity and a published schedule, not the completed outcome. No 2026 Occurrence is published until post-event Evidence is reviewed. The city-center performance area remains distributed and is not represented by a false single point.

### 大日堂舞楽

Added to the existing Folk Performance Entity:

- held 2026 annual performance on January 2 at 大日霊貴神社;
- municipal post-event Source and claim-specific Evidence.

The held record retains `scale: unknown`. Existing Current State, annual Series, Shrine Relation, and Designations remain unchanged.

## Resulting canonical corpus

Validation basis head: `79db23f7fc11681395210db44cef4e1b781a28aa`.

| Record family | Count |
|---|---:|
| Entity | 68 |
| Place | 63 |
| State Snapshot | 33 |
| Change Event | 53 |
| Occurrence | 100 |
| Occurrence Series | 33 |
| Recurrence Pattern | 33 |
| Relation | 41 |
| Designation | 14 |
| Source | 148 |
| Evidence | 363 |

The corpus now covers 24 prefectures. The uncovered-prefecture count decreased to 23. The sparse-primary-Entity count decreased to 8.

## Detail C and map review

The exhaustive Detail C contract verified:

- 104 Place-bearing detail pages;
- 86 useful anchored detail pages;
- 18 explicit location-gap pages;
- 48 Entity anchors;
- 38 Place anchors;
- zero uncovered Festival or Folk Performance pages.

山あげ祭 uses 烏山八雲神社 as its concrete ritual anchor. The separate city-center performance Place remains an explicit distributed-area location gap rather than being collapsed into a misleading point map.

The initial map audit correctly rejected the new Festival because its Shrine Place used a non-project Place kind. The final correction records the Place as the canonical `shrine` kind through correction bundle 15. The map gate itself was not weakened.

## Visual review

The representative visual contract contains 58 routes and produced 116 desktop/mobile full-page screenshots.

The automated screenshot audit passed. Manual full-resolution review confirmed:

- 山あげ祭 renders Current State, interruption/return history, Shrine Relation, Designations, Evidence, and a useful 八雲神社 map;
- the State-free 八雲神社 seed page and concrete Shrine Place render without inferring a Shrine State;
- the city-center performance-area Place renders the distributed-area explanation and no false point map;
- 大日堂舞楽 renders the held 2026 Occurrence and existing Shrine map;
- desktop and mobile layouts remain readable without blank map frames or horizontal overflow.

## Validation

All 15 workflows on the final validation-basis head succeeded.

| Verification | Run |
|---|---:|
| Complete repository CI and release readiness | `30616409528` |
| Detail C, map utility, and exhaustive Chromium navigation | `30616409585` |
| Desktop/mobile visual capture and audit | `30616409575` |
| Corpus coverage audit | `30616409569` |
| Canonical dataset contract | `30616409534` |
| Correction contract | `30616409645` |
| Relation coverage | `30616409526` |
| Data freshness | `30616409536` |
| External-link maintenance | `30616409619` |
| Bundle inventory and repository baseline | `30616409527` |
| Future-site seed inventory | `30616409542` |
| Future-site seed readiness | `30616409601` |
| Jinja start-gate record | `30616409551` |
| F2-28 launch boundary | `30616409532` |
| Stabilization review | `30616409568` |

Artifacts:

- release candidate `8787621777`, digest `sha256:17c5ab6a4de6bea692f0b4fdead5596431969b63c56327852cf93dfc6f6f8a4c`;
- corpus coverage `8787546590`, digest `sha256:92fb6d75e292b26a5b6dc74636ed8086c3236a08cfe18a18653a714f766d233c`;
- map utility `8787575725`, digest `sha256:2415a25479c92ef05bf4eac44205b1c240197d9174d1d0486ff47216c2972965`;
- screenshot review `8787656468`, digest `sha256:b0ff91e8e32a161eac826a67f361ed5ff6c52140d810e41ed51593955894cf4e`.

## Merge

- pull request: `#150`;
- squash merge commit: `d2a99e4f59f14e297be309d51a558f5f4a4e6cb2`;
- merged at: `2026-07-31T08:36:20Z`.

## Boundaries

- all public claims require approved Evidence;
- no completed 2026 山あげ祭 outcome is claimed;
- 2022 and 2025 山あげ祭 scale remains unknown;
- the distributed performance area is not converted into a point map;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- private analytics, candidate material, and internal project-policy information are absent.
