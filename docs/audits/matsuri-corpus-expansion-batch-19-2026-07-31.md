# Matsuri Corpus Expansion Batch 19 — 2026-07-31

## Status

Passed.

## Scope

Batch 19 continues the reviewed Matsuri breadth-and-depth track:

1. adds 壬生の花田植 in 広島県 with its preservation Organization, public-performance Places, current State, annual Series, interruption/return history, and Designations;
2. deepens 佐陀神能 with its annual 御座替祭 performance Series and a scheduled 2026 Occurrence;
3. preserves the existing Detail C, Evidence, map, correction, and blocked Jinja boundaries.

## New reviewed records

### 壬生の花田植

Added:

- Festival Entity `fst-mibu-hanadaue`;
- preservation Organization `org-mibu-hanadaue-hozonkai`;
- representative Places for 壬生商店街 and the 壬生の花田植会場;
- active Current State based on the completed 2026 public edition;
- annual first-Sunday-in-June Series and Recurrence Pattern;
- cancelled 2020 public edition;
- held 2025 and 2026 editions with unknown scale;
- a bounded 2020 public-suspension Change Event;
- a bounded post-cancellation return position confirmed by the reviewed 2025 edition;
- evidence-backed `maintained_by` and `organized_by` Relations to the preservation Organization;
- national important intangible folk-cultural-property and UNESCO Designations;
- canonical detail routes, individual JSON, search entries, Relation navigation, Place navigation, and embedded maps.

The 2020 record describes cancellation of the public flower-rice-planting presentation. It does not infer disappearance of the underlying tradition. The 2025 return Change Event is bounded to the first reviewed post-cancellation edition currently established by the corpus. The 2025 and 2026 editions remain `scale: unknown` because the reviewed public records do not establish a reusable normal-scale classification.

### 佐陀神能

Added to the existing Folk Performance Entity:

- annual 御座替祭・佐陀神能 Series;
- annual September 24–25 Recurrence Pattern;
- scheduled 2026 Occurrence at 佐太神社;
- official Shrine calendar Source and claim-specific Evidence.

The 2026 record remains `scheduled` until the September 24–25 occurrence window closes and result Evidence is reviewed. No Shrine Current State, legal-person State, or future-site activation is inferred.

## Resulting canonical corpus

Validation basis head: `a8661092d3c36f8a4ed2c6c7ebd7b7835b69d819`.

| Record family | Count |
|---|---:|
| Entity | 66 |
| Place | 61 |
| State Snapshot | 32 |
| Change Event | 51 |
| Occurrence | 96 |
| Occurrence Series | 32 |
| Recurrence Pattern | 32 |
| Relation | 40 |
| Designation | 12 |
| Source | 140 |
| Evidence | 350 |
| Image | 19 |

The corpus now covers 23 prefectures. The uncovered-prefecture count decreased to 24. The sparse-primary-Entity count remains 9. The generated site contains 139 public HTML routes and 66 direct-detail Pagefind records.

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

The exhaustive Detail C contract verified:

- 54 primary Entity details;
- 12 State-free Shrine or Temple seed-reference pages;
- 54 Place details;
- 40 approved Relations;
- 139 public HTML routes;
- 100 Place-bearing detail pages;
- 70 concrete anchor maps;
- 13 approved official-map cases;
- 17 non-specialist supporting Place location gaps;
- zero uncovered Festival or Folk Performance pages.

## Visual review

The representative visual contract contains 54 routes and produced 108 desktop/mobile full-page screenshots.

The screenshot audit passed with:

- 54 of 54 desktop routes captured;
- 54 of 54 mobile routes captured;
- 29 of 29 embedded maps loaded on each device;
- zero failures;
- zero warnings;
- zero recorded third-party map console errors;
- no document-level horizontal-overflow failure.

Manual full-resolution review confirmed:

- 壬生の花田植 renders its active State, 2020 cancellation, 2025–2026 held records, preservation and organizer Relations, Designations, Evidence, and useful venue map context;
- 佐陀神能 renders the scheduled 2026 performance and annual September 24–25 pattern without replacing its current State;
- 壬生の花田植保存会 and the flower-rice-planting Place render as navigable supporting records;
- desktop and mobile layouts remain readable without blank map frames or broken section hierarchy.

## Validation

All 13 workflows on the final validation-basis head succeeded.

The first complete CI run identified one Evidence-scope mismatch: the 2025 return Change Event also referenced an Occurrence-targeted 2026 Evidence record. The final correction keeps only the Change Event-targeted 2025 return Evidence and records the corrected Change Event through the canonical correction contract.

| Verification | Run |
|---|---:|
| Complete repository CI and release readiness | `30613354616` |
| Detail C, map utility, and exhaustive Chromium navigation | `30613354634` |
| Desktop/mobile visual capture and audit | `30613354527` |
| Corpus coverage audit | `30613354620` |
| Canonical dataset contract | `30613354566` |
| Correction contract | `30613354622` |
| Relation coverage | `30613354626` |
| Data freshness | `30613354543` |
| External-link maintenance | `30613354570` |
| Bundle inventory and repository baseline | `30613354558` |
| Future-site seed inventory | `30613354576` |
| Future-site seed readiness | `30613354628` |
| Jinja start-gate record | `30613354611` |

Artifacts:

- release candidate `8786416449`, digest `sha256:9a4bc480657856a4637055f2ad4573fcf8b9d19fa4faa0221d50771d08d14120`;
- corpus coverage `8786345296`, digest `sha256:7ff0bfa7c73c37e342c0134ac2bb400eacd7de39c6b668b2370d0f19e8b4a4c6`;
- map utility audit `8786586856`, digest `sha256:d0a2fa8afe23f254a7dda081c611aa16024169598915312b0b7fd5e64c765c3b`;
- screenshot review `8786440538`, digest `sha256:8a6016433e88ec285c8e228b083ffbdff9d910d7a6640afb137f24b9c57cec6e`.

## Merge

- pull request: `#148`;
- squash merge commit: `aa620deb4fd339c1030a290bece5389937b87849`;
- merged at: `2026-07-31T07:45:02Z`.

## Boundaries

- all public claims require approved Evidence;
- the 2020 壬生 record is a public-performance cancellation, not a complete-tradition discontinuation claim;
- the post-cancellation return is bounded to the reviewed 2025 record;
- the 2025 and 2026 壬生 editions remain `scale: unknown`;
- the 2026 佐陀神能 record remains scheduled until post-window review;
- no Shrine or Temple Current State is inferred;
- the Jinja site remains blocked and inactive;
- no Jinja application, Worker, hostname, publication, or invented State Snapshot is created;
- dates use the repository UTC observation date, 2026-07-31;
- private analytics, candidate material, and internal project-policy information are absent.
