# Matsuri Corpus Expansion Batch 18 — 2026-07-29

## Status

Passed.

## Scope

Batch 18 continues the reviewed Matsuri breadth-and-depth track:

1. adds 日田祇園 in 大分県 with distinct main-festival and group-viewing Series;
2. deepens 岳神楽 and 大償神楽 with bounded cancellation and component-specific 2026 performance history;
3. preserves the collective 早池峰神楽 model, State boundaries, and blocked Jinja start gate.

## New reviewed records

### 日田祇園

- Festival Entity: `fst-hita-gion`
- preservation Organization: `org-hita-gion-yamahoko-shinkokai`
- concrete Places for 隈・竹田地区、豆田地区、JR日田駅前
- Current State based on current official 2026 information
- separate annual Series and Recurrence Patterns for the main festival and 日田祇園山鉾集団顔見世
- cancelled 2020 main-festival and group-viewing Occurrences
- cancelled 2021 main-festival Occurrence
- held 2022 main-festival return with unknown scale
- cancelled 2022 group-viewing Occurrence
- held 2023 group-viewing return with unknown scale
- held 2026 group-viewing and main-festival Occurrences with unknown scale
- national important intangible folk-cultural-property and UNESCO Designations
- evidence-backed `maintained_by` Relation based on 日田市 identifying 日田祇園山鉾振興会 as the protection body
- canonical detail routes, individual JSON, search entries, Place navigation, and embedded maps

No Shrine Entity, single-shrine anchor, or Jinja State is inferred for the three-shrine umbrella festival.

### 岳神楽・大償神楽

Added to the component Entities only:

- cancelled 2020 岳神楽 and 大償神楽 舞納め contexts;
- cancelled 2021 岳神楽 and 大償神楽 舞初め Occurrences;
- held 2026 岳神楽 and 大償神楽 舞初め Occurrences;
- held 2026 岳神楽「桜の舞」 and 大償神楽「春の舞」 Occurrences;
- separate component-specific annual 舞初め Series and Recurrence Patterns;
- concrete 早池峰神社参集殿 and 早池峯岳神楽伝承館 Places.

The same performances are not duplicated on `fpf-hayachine-kagura`. Existing active States, collective Relations, and collective national/UNESCO Designations remain unchanged. The 2020–2021 records are bounded performance-context cancellations and do not claim complete suspension of either component or the collective tradition.

## Resulting canonical corpus

Validation basis head: `cbfc2fd0da6dfbeb5f05809dcdfae79f287c9503`.

| Record family | Count |
|---|---:|
| Entity | 64 |
| Place | 59 |
| State Snapshot | 31 |
| Change Event | 49 |
| Occurrence | 92 |
| Occurrence Series | 30 |
| Recurrence Pattern | 30 |
| Relation | 38 |
| Designation | 10 |
| Source | 135 |
| Evidence | 335 |

The corpus now covers 22 prefectures. The uncovered-prefecture count decreased to 25. The sparse-primary-Entity count remains 9; 岳神楽 and 大償神楽 each now have four reviewed Occurrences, while the collective 早池峰神楽 remains intentionally free of duplicated component Occurrences.

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

The build produces 135 public HTML routes. The representative visual contract contains 50 routes and produces 100 desktop/mobile full-page screenshots.

The screenshot audit passed with:

- 50 of 50 desktop routes captured;
- 50 of 50 mobile routes captured;
- 26 of 26 embedded maps loaded on each device;
- zero failures;
- zero warnings;
- zero recorded Google Maps iframe CORS noise.

Manual visual review confirmed:

- 日田祇園 renders separate main-festival and group-viewing history, the preservation Relation, Designations, Evidence, and useful map context;
- 岳神楽 and 大償神楽 each render four component-specific Occurrences without duplication on the collective Entity;
- JR日田駅前 renders the related 日田祇園 record and a useful station-area map;
- desktop and mobile layouts remain readable without horizontal overflow or blank map frames.

## Validation

All 13 workflows triggered for the final validation-basis head succeeded.

The initial implementation failed the strict Relation audit because the new Festival had no approved Relation. The fix did not invent a shrine or organizer. It added 日田祇園山鉾振興会 and a `maintained_by` Relation using the municipality's explicit identification of the association as the protection body.

| Verification | Run |
|---|---:|
| Complete repository CI and release freeze | `30453012289` |
| Detail C, map utility, and exhaustive Chromium navigation | `30453012262` |
| Desktop/mobile visual capture and audit | `30453012317` |
| Corpus coverage audit | `30453012286` |
| Canonical dataset contract | `30453012319` |
| Relation coverage | `30453012353` |
| Data freshness | `30453012315` |
| External-link maintenance | `30453012327` |
| Bundle inventory and repository baseline | `30453012272` |
| Correction contract | `30453012336` |
| Future-site seed inventory | `30453012417` |
| Future-site seed readiness | `30453012264` |
| Jinja start-gate record | `30453012307` |

Artifacts:

- release candidate `8724582491`, digest `sha256:547460cf4bbada742fe133905e4386bd2822626986ae1883345d7ad7e23565d7`;
- corpus coverage `8724511711`, digest `sha256:9634629879e97aa618ff7e30270707a2a696feed3b6d587a6605d6cdff014913`;
- map utility audit `8724565320`, digest `sha256:5efb18ae6b8c76f504ea78a278eccd6208930d18d02def8aa41a201b7a6b09ea`;
- screenshot review `8724618923`, digest `sha256:9907ef5fd2760f50d3e201d496d62855be3476cb431adf0ac56afad1b3c58d4a`.

## Merge

- pull request: `#146`;
- merge commit: `312122a17fd86a8276fd13b91a4fc568666c39ba`;
- merged at: `2026-07-29T13:00:32Z`.

## Boundaries

- all public claims require approved Evidence;
- the main 日田祇園 and the group-viewing context remain separate recurring Series;
- the 2022 and 2026 日田 records remain `scale: unknown` where reviewed sources do not prove a separately classified normal scale;
- the preservation Relation does not assert event organization;
- no Shrine Entity or Jinja State is inferred for 日田祇園;
- Hayachine component performances are not duplicated on the collective Entity;
- bounded performance cancellations do not replace current active component States;
- the Jinja site remains blocked and inactive;
- no Jinja application, Worker, hostname, publication, or invented State Snapshot is created;
- dates use the repository UTC observation date, 2026-07-29;
- private analytics, candidate material, and internal project-policy information are absent.
