# Matsuri Corpus Expansion Batch 21 — 2026-07-31

## Status

Passed.

## Scope

Batch 21 continues the reviewed Matsuri breadth-and-depth track:

1. adds 青柏祭 in 石川県 with its ritual Shrine seed, concrete Shrine Place, distributed city-center route, current State, annual Series, interruption/return history, and Designations;
2. deepens 布川地区花祭 with its final 2019 held edition and suspension-start history;
3. preserves the Detail C, Evidence, map, future-site seed, and blocked Jinja boundaries.

## New reviewed records

### 青柏祭

Added:

- Festival Entity `fst-seihakusai`;
- State-free Shrine seed `shr-nanao-oyama-jinja`;
- concrete ritual anchor `plc-nanao-oyama-jinja`;
- distributed city-center route `plc-nanao-seihakusai-route`;
- active Current State based on the municipality's held 2026 record;
- annual May 3–5 Series and Recurrence Pattern;
- cancelled 2020 and 2021 editions;
- modified 2022 return with limited puller numbers and a shortened route;
- cancelled 2024 edition after the Noto Peninsula earthquake;
- held 2025 public return with unknown scale;
- held normal-format 2026 edition;
- bounded pandemic suspension, modified return, earthquake suspension, and public-return Change Events;
- evidence-backed ritual Relation to 大地主神社;
- national important intangible folk-cultural-property and UNESCO Designations;
- canonical detail routes, individual JSON, search, Relation navigation, Place navigation, and embedded maps.

The 2021 display of one assembled float is not treated as a held annual procession. The 2025 scale remains unknown; only the reviewed 2026 municipality record explicitly supports a normal edition. The city-center route remains distributed and is not converted into a false point map.

### 布川地区花祭

Added to the existing suspended component Festival:

- held 2019 final edition with year precision;
- suspension-start Change Event beginning in 2019;
- official prefectural-tourism Source and claim-specific Evidence.

The source states that the last edition occurred in March 2019. The public Occurrence uses year precision because the reviewed page does not establish an exact day range.

## Resulting canonical corpus

Validation basis head: `3c50129639c9de67c159732087a41858fad001a4`.

| Record family | Count |
|---|---:|
| Entity | 70 |
| Place | 65 |
| State Snapshot | 34 |
| Change Event | 58 |
| Occurrence | 107 |
| Occurrence Series | 34 |
| Recurrence Pattern | 34 |
| Relation | 42 |
| Designation | 16 |
| Source | 158 |
| Evidence | 385 |

The corpus now covers 25 prefectures. The uncovered-prefecture count decreased to 22. The sparse-primary-Entity count decreased to 7 because 布川地区花祭 now has both Occurrence and Change Event history.

## Detail C and map review

The exhaustive Detail C contract verified:

- 108 Place-bearing detail pages;
- 89 useful anchored detail pages;
- 19 explicit location-gap pages;
- 50 Entity anchors;
- 39 Place anchors;
- zero uncovered Festival or Folk Performance pages.

青柏祭 uses 大地主神社 as its concrete ritual anchor. The separate city-center procession Place remains an explicit distributed-area location gap rather than being collapsed into a misleading point map.

The exhaustive Chromium navigation test passed for all generated Entity details and State-free seed-reference pages.

## Visual review

The representative visual contract contains 62 routes and produced 124 desktop/mobile full-page screenshots.

The automated screenshot audit passed with:

- 62 of 62 desktop routes captured;
- 62 of 62 mobile routes captured;
- 35 of 35 embedded maps loaded on each device;
- zero failures;
- zero warnings;
- zero recorded Google Maps iframe CORS noise.

Manual full-resolution review confirmed:

- 青柏祭 renders Current State, six annual Occurrences, four Change Events, Shrine Relation, Designations, Evidence, and a useful 大地主神社 map;
- the State-free 大地主神社 seed page and concrete Shrine Place render without inferring a Shrine State;
- the city-center route Place renders the distributed-area explanation and no false point map;
- 布川地区花祭 renders the final 2019 held edition and suspension-start history;
- desktop and mobile layouts remain readable without blank map frames or horizontal overflow.

## Validation

All 15 workflows on the final validation-basis head succeeded.

| Verification | Run |
|---|---:|
| Complete repository CI and release readiness | `30624848789` |
| Detail C, map utility, and exhaustive Chromium navigation | `30624848188` |
| Desktop/mobile visual capture and audit | `30624848017` |
| Corpus coverage audit | `30624848387` |
| Canonical dataset contract | `30624848237` |
| Correction contract | `30624848191` |
| Relation coverage | `30624848081` |
| Data freshness | `30624848181` |
| External-link maintenance | `30624848229` |
| Bundle inventory and repository baseline | `30624848157` |
| Future-site seed inventory | `30624848232` |
| Future-site seed readiness | `30624848257` |
| Jinja start-gate record | `30624848010` |
| F2-28 launch boundary | `30624848086` |
| Stabilization review | `30624848118` |

Artifacts:

- release candidate `8790979632`, digest `sha256:a0316f3a78104538ec355229fe8e67561cd45125ee12949a90c322340cc0a890`;
- corpus coverage `8790903350`, digest `sha256:cf11e847e1aec33c69cb08cbf13faed7ed3f749f6a26c01dcde59d22c405b714`;
- map utility `8790934172`, digest `sha256:adecbd4f958ad2dcd236b9e8dbccef38ac833ec4435cc12f977d870876589ddc`;
- screenshot review `8791026423`, digest `sha256:c55cbba70999db4beb905636044e3dedf221485bfd813a6a024ea026b6d23769`.

## Merge

- pull request: `#152`;
- squash merge commit: `dc41632f666920815343e62f6685bf16409ca121`;
- merged at: `2026-07-31T10:57:38Z`.

## Boundaries

- all public claims require approved Evidence;
- the 2021 assembled-float display is not classified as a held annual procession;
- the 2022 return remains modified;
- the 2025 scale remains unknown;
- the 2024 cancellation is bounded to that earthquake-affected annual edition;
- the distributed city-center route is not converted into a point map;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- private analytics, candidate material, and internal project-policy information are absent.
