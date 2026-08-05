# Matsuri Corpus Expansion Batch 29 — 2026-08-05

## Status

Passed repository, data, Detail C, map, and visual verification. Canonical-production verification is the next separate step.

## Scope

Batch 29 continues the reviewed Matsuri breadth-and-depth track:

1. adds 浜松まつり as the first reviewed primary Matsuri record for 静岡県;
2. adds 浜松まつり組織委員会 and an evidence-backed `organized_by` Relation;
3. models 中田島凧揚げ会場 as a concrete main venue and the central-city 御殿屋台 area as a separate distributed Place;
4. records the cancelled 2020 edition, the held modified 2021 and 2022 editions, and the held unknown-scale 2026 edition;
5. deepens 布橋灌頂会 with the held modified 2022 edition and scheduled unknown-scale 2026 edition;
6. preserves Detail C, Evidence, map, future-site seed, stabilization, and blocked Jinja boundaries.

## Evidence boundaries

- The 2020 Hamamatsu record is bounded to that edition and does not imply disappearance of the broader civic tradition.
- The 2021 edition combines the municipal no-spectator kite-only plan with a later municipal record that the festival was carried out.
- The 2022 edition remains `held / modified`: general spectators returned to the kite event while the central night action remained cancelled.
- The 2026 Hamamatsu edition is `held / unknown`: municipal activity records prove the edition took place, but the complete scale of every component is not inferred.
- The city-center Place remains distributed and is not converted into a false point map.
- The 2022 Nunobashi record remains `held / modified` because the reviewed prefectural record explicitly notes pandemic constraints.
- The 2026 Nunobashi record remains `scheduled / unknown` until the September 27 occurrence window closes and result Evidence is reviewed.
- No Shrine Current State or legal-person State is inferred.

## New reviewed records

### 浜松まつり

Added:

- Festival Entity `fst-hamamatsu-matsuri`;
- organizer Organization `org-hamamatsu-matsuri-committee`;
- concrete kite venue `plc-hamamatsu-nakatajima-kite-ground`;
- distributed night-float area `plc-hamamatsu-central-city-area`;
- active Current State based on the held 2026 municipal record;
- annual Series and Recurrence Pattern for May 3–5;
- cancelled 2020 edition;
- held modified 2021 edition;
- held modified 2022 edition;
- held unknown-scale 2026 edition;
- bounded 2020 suspension and 2021 modified-return Events;
- evidence-backed `organized_by` Relation;
- canonical detail routes, individual JSON, search, Relation navigation, Place navigation, and embedded-map behavior.

The concrete Nakatajima venue is the primary map anchor. The central-city operating area remains an explicit location-gap page because the reviewed source defines a distributed activity area rather than one approved point.

## Existing-record depth

### 布橋灌頂会

Added:

- held modified 2022 Occurrence on September 25;
- scheduled unknown-scale 2026 Occurrence on September 27;
- claim-specific Evidence based on 富山県 and 立山町 public-authority records.

The 2026 record remains scheduled and does not assert a held result before post-window review.

## Resulting canonical corpus

Implementation validation head: `369017e56ae657a39dfede42b923eca6bef50bca`.

| Record family | Count |
|---|---:|
| Entity | 89 |
| Place | 86 |
| State Snapshot | 42 |
| Change Event | 89 |
| Occurrence | 149 |
| Occurrence Series | 42 |
| Recurrence Pattern | 42 |
| Relation | 53 |
| Designation | 24 |
| Source | 235 |
| Evidence | 540 |

The corpus covers 33 prefectures, leaving 14 uncovered. No sparse primary Entity remains under the current coverage rule.

Repository position:

```text
F1 batches                    13
F2 maintenance bundles        60
F2 correction bundles         17
Additive application slots    73
Correction application slots  17
Public Entities               89
Jinja State Snapshots          0
```

## Detail C and map review

The exhaustive Detail C and map contracts verified:

- 185 generated HTML routes;
- 89 Pagefind-indexed records with direct detail URLs;
- 141 Place-bearing detail pages;
- 115 useful anchored maps;
- 26 explicit location-gap pages;
- the Hamamatsu Festival and concrete Place use the Nakatajima anchor;
- the central-city distributed Place renders an explicit no-map boundary;
- the Nunobashi page retains its museum anchor and distributed ceremonial-area boundary.

The exhaustive Chromium test passed for every generated Entity detail and seed-reference page. The new Festival, Organization, and Place routes passed reverse navigation, JSON, map utility, and browser checks.

## Visual review

The representative visual contract contains 101 routes and produced 202 desktop/mobile full-page screenshots.

The automated screenshot audit passed with:

- 101 of 101 desktop routes captured;
- 101 of 101 mobile routes captured;
- 62 of 62 embedded maps loaded on each device;
- zero failures;
- zero warnings;
- zero recorded Google Maps iframe CORS noise.

Manual full-resolution review confirmed:

- 浜松まつり renders Current State, four Occurrences, two Change Events, two Places, organizer Relation, Evidence, and the useful Nakatajima map;
- 浜松まつり組織委員会 remains an organizer record without unsupported Place or State claims;
- 中田島凧揚げ会場 renders a useful map and reverse Festival navigation;
- the city-center Place renders the deliberate distributed-area no-map explanation rather than a false point;
- 布橋灌頂会 displays held modified 2022 and scheduled unknown-scale 2026 without disturbing its existing State, relation, and map boundaries;
- no reviewed page contains horizontal overflow or a blank map frame.

## Validation

| Verification | Run |
|---|---:|
| Complete repository CI and release readiness | `30976407172` |
| Detail C, map utility, and exhaustive Chromium navigation | `30976407188` |
| Desktop/mobile visual capture and audit | `30976407199` |
| Corpus coverage audit | `30976407185` |
| Canonical dataset contract | `30976407171` |
| Correction contract | `30976407217` |
| Relation coverage | `30976407184` |
| Data freshness | `30976407529` |
| External-link maintenance | `30976407203` |
| Bundle inventory and repository baseline | `30976407180` |
| Future-site seed inventory | `30976407194` |
| Future-site seed readiness | `30976407210` |
| Jinja start-gate record | `30976407181` |

Artifacts:

- release candidate `8918497227`, digest `sha256:e10fc9879ec6ced09b7a4b7625372a74bbc8ce885611fab4997740172570d404`;
- map utility `8918450819`, digest `sha256:efcca93f884c4794b2e5435b92f7c98cf5f73d7194ba5a680256c4f9daec2c47`;
- screenshot review `8918596748`, digest `sha256:5eea8368ac85f04ad184bdd84ef0a75f77eb239e4793b60e9636487e0b37272d`;
- corpus coverage `8918425867`, digest `sha256:a953a58e7783ac7212655d49cc11a9f6bd8ffa46e1f6936ce1d0899066295f8b`.

## Merge

- pull request: `#181`;
- squash merge commit: `19990018ff19f07132c2b5f1fdf86608a00c9384`;
- merged on: `2026-08-05`.

## Boundaries

- all public claims require approved Evidence;
- a scheduled edition is not converted into a held result before post-window review;
- concrete and distributed Hamamatsu Places remain distinguishable;
- a held edition does not imply normal completion of every published component;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- private analytics, candidate material, and internal project-policy information are absent.
