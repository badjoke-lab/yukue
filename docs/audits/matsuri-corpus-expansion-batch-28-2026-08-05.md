# Matsuri Corpus Expansion Batch 28 — 2026-08-05

## Status

Passed repository, canonical-dataset, corpus, Evidence, Relation, freshness, external-link, Detail C, map, and visual verification. Canonical-production verification remains a separate post-merge step.

## Scope

Batch 28 continues the reviewed Matsuri breadth-and-depth track:

1. adds 新居浜太鼓祭り as the first reviewed primary Matsuri record for 愛媛県;
2. adds 新居浜市太鼓祭り推進委員会 and an evidence-backed `supported_by` Relation;
3. separates the distributed citywide operating area from the concrete 新居浜市山根市民グラウンド venue;
4. records the cancelled 2020 edition, the all-unit non-holding position in 2021, the modified three-year return in 2022, and the held modified 2025 edition;
5. records the 2025 cancellation of the 住友化学愛媛工場前かきくらべ as a bounded format change rather than a whole-festival cancellation;
6. deepens 御田祭 with the 1982 national designation history of the broader 阿蘇の農耕祭事 group;
7. preserves Detail C, Evidence, map, future-site seed, stabilization, and blocked Jinja boundaries.

## Evidence boundaries

- The 2020 and 2021 records cover public 太鼓台運行. They do not infer disappearance of local rites or the broader cultural tradition.
- The 2022 edition remains `held / modified` because the official record explicitly describes infection-control measures.
- The 2025 edition remains `held / modified`: the festival was held, while one major factory-front かきくらべ was removed after a safety-related request and district decision.
- The citywide Place remains distributed and is not converted into a false point map.
- The 山根市民グラウンド remains a concrete venue independently navigable from the distributed area.
- The 1982 Change Event and Designation state that 御田祭 is one component of the nationally designated 阿蘇の農耕祭事 group. They do not claim a standalone designation for 御田祭.
- No Shrine Current State or legal-person State is inferred.

## New reviewed records

### 新居浜太鼓祭り

Added:

- Festival Entity `fst-niihama-taiko-matsuri`;
- support Organization `org-niihama-taiko-matsuri-promotion-committee`;
- distributed citywide Place `plc-niihama-taiko-citywide`;
- concrete venue Place `plc-yamane-civic-ground`;
- active Current State based on the latest reviewed municipal record;
- annual Series and Recurrence Pattern for the October cycle;
- cancelled 2020 edition;
- not-held 2021 edition;
- held modified 2022 edition;
- held modified 2025 edition;
- bounded 2020 interruption, 2022 return, and 2025 format-change Events;
- evidence-backed `supported_by` Relation;
- canonical detail routes, individual JSON, search, Relation navigation, Place navigation, and map behavior.

The Festival uses 山根市民グラウンド as its concrete primary map anchor. The citywide operating area remains an explicit distributed Place with a no-point-map explanation.

## Existing-record depth

### 御田祭

Added:

- a 1982-01-14 national Important Intangible Folk Cultural Property Change Event;
- a Designation record for the broader `阿蘇の農耕祭事` group;
- two claim-specific Evidence records based on the 阿蘇市 cultural-property source.

The public wording preserves the group-level designation boundary: 御田祭 is recorded as a component of 阿蘇の農耕祭事, not as an independently designated asset.

## Resulting canonical corpus

Implementation validation head: `692b96135833ae8a764aca3da76df16320fc6e9a`.

| Record family | Count |
|---|---:|
| Entity | 87 |
| Place | 84 |
| State Snapshot | 41 |
| Change Event | 87 |
| Occurrence | 143 |
| Occurrence Series | 41 |
| Recurrence Pattern | 41 |
| Relation | 52 |
| Designation | 24 |
| Source | 226 |
| Evidence | 521 |

The corpus covers 32 prefectures, leaving 15 uncovered. No sparse primary Entity remains under the current corpus-coverage rule.

Repository position:

```text
F1 batches                    13
F2 maintenance bundles        57
F2 correction bundles         17
Additive application slots    70
Correction application slots  17
Public Entities               87
Jinja State Snapshots          0
```

## Detail C and map review

The exhaustive Detail C and map contracts verified:

- 181 generated HTML routes;
- 87 Pagefind-indexed records with direct detail URLs;
- 66 primary Entity details;
- 20 State-free Shrine or Temple reference pages;
- 75 Place details;
- 52 approved Relations;
- individual JSON for every generated record;
- 138 Place-bearing detail pages;
- 113 useful anchored details;
- 25 explicit location-gap pages;
- zero uncovered Festival or Folk Performance pages.

The exhaustive Chromium test passed for every generated Entity detail and seed-reference page. The new Festival, Organization, distributed Place, and concrete venue routes passed reverse navigation, JSON, map utility, and browser checks.

## Visual review

The representative visual contract contains 96 routes and produced 192 desktop/mobile full-page screenshots.

The automated screenshot audit passed with:

- 96 of 96 desktop routes captured;
- 96 of 96 mobile routes captured;
- 59 of 59 embedded maps loaded on each device;
- zero failures;
- zero warnings;
- two recorded Google Maps iframe CORS noise events on desktop and zero on mobile.

Manual full-resolution review confirmed:

- 新居浜太鼓祭り renders the Current State, four Occurrences, three Change Events, support Relation, Evidence, distributed-area boundary, and useful 山根市民グラウンド map;
- 新居浜市太鼓祭り推進委員会 remains a support-organization record without unsupported Place or State claims;
- the distributed citywide Place preserves an explicit no-point-map explanation;
- the 山根市民グラウンド Place renders its address, reverse Festival link, Evidence, individual JSON, and loaded map;
- 御田祭 displays the group-level national designation history without disturbing its Current State or Occurrence history;
- no reviewed page contains horizontal overflow or a blank map frame.

## Validation

| Verification | Run |
|---|---:|
| Complete repository CI and release readiness | `30969683261` |
| Detail C, map utility, and exhaustive Chromium navigation | `30969683197` |
| Desktop/mobile visual capture and audit | `30969683213` |
| Corpus coverage audit | `30969683201` |
| Canonical dataset contract | `30969683212` |
| Correction contract | `30969683217` |
| Relation coverage | `30969683225` |
| Data freshness | `30969683185` |
| External-link maintenance | `30969683233` |
| Bundle inventory and repository baseline | `30969683223` |
| Future-site seed inventory | `30969683222` |
| Future-site seed readiness | `30969683184` |
| Jinja start-gate record | `30969683245` |

Artifacts:

- release candidate `8916169778`, digest `sha256:304be83a91b6530a3d6f0c2c7a4cf1ca64a44e0c080df049fb014b25ada2cb69`;
- corpus coverage `8916081117`, digest `sha256:0b8dd3d5f2cb1fe76dcf5b2fd4114e9dd602974ace378851fed34b6c1b629ef6`;
- map utility `8916094111`, digest `sha256:d2bb9b366b8c2e059a4fc7dcdf33be8595cf47194f2a909edd4ae2dea4651187`;
- screenshot review `8916196428`, digest `sha256:4d2e5483d6e27068e9703d9d9e14820abdbffd5731ff58cdca9f7d1a5f3b518b`.

## Merge

- pull request: `#177`;
- squash merge commit: `a61091fd0d335e5dc77b79835ef40f57dbb3c964`;
- merged on: `2026-08-05`.

## Boundaries

- all public claims require approved Evidence;
- annual non-holding does not automatically establish permanent Entity suspension;
- distributed and concrete Places remain distinguishable;
- group-level designation history does not replace Current State;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- private analytics, candidate material, and internal project-policy information are absent;
- canonical production remains pinned to the separately verified Batch 27 release until a dedicated post-merge production-baseline change proves Batch 28 deployment.
