# Matsuri Corpus Expansion Batch 22 — 2026-08-02

## Status

Passed.

## Scope

Batch 22 continues the reviewed Matsuri breadth-and-depth track:

1. adds 吉田の火祭 in 山梨県 with two State-free Shrine seeds, a concrete ritual anchor, a route-based public area, current State, annual Series, interruption/return history, Relations, and a national Designation;
2. deepens 阿蘇神社御田祭 with reviewed held Occurrences for 2024 and 2025;
3. resolves the closed 2026 祇園祭 Occurrence as held with unknown scale from reviewed Kyoto City result Evidence;
4. preserves the Detail C, Evidence, map, future-site seed, and blocked Jinja boundaries.

## New reviewed records

### 吉田の火祭

Added:

- Festival Entity `fst-yoshida-fire-festival`;
- State-free Shrine seeds `shr-kitaguchi-hongu-fuji-sengen` and `shr-kitaguchi-suwa-jinja`;
- concrete ritual anchor `plc-kitaguchi-hongu-fuji-sengen`;
- route-based public area `plc-yoshida-fire-route`;
- active Current State based on the published 2026 annual schedule;
- annual August 26–27 Series and Recurrence Pattern;
- cancelled 2020 edition;
- modified 2021 return;
- held 2022 edition with unknown scale;
- held normal-format 2023 edition;
- held 2024 edition with unknown scale;
- scheduled 2026 edition;
- bounded pandemic suspension, modified return, and normal-format restoration Change Events;
- evidence-backed ritual Relations to 北口本宮冨士浅間神社 and 諏訪神社;
- national important intangible folk-cultural-property Designation;
- canonical detail routes, individual JSON, search, Relation navigation, Place navigation, and embedded maps.

The 2026 edition remains `scheduled` until the occurrence window closes and result Evidence is reviewed. The 2021 edition remains `scale: modified`. The 2022 and 2024 editions remain `scale: unknown`. The 2023 normal classification is bounded to the reviewed official statement that pre-pandemic activity had returned.

The Shrine compound is the concrete map anchor. The separate public route remains route-based and is not converted into a false single-point map.

### 阿蘇神社御田祭

Added to the existing Festival:

- held 2024 Occurrence with unknown scale;
- held 2025 Occurrence with unknown scale;
- municipality Sources and claim-specific Evidence.

The reviewed records establish that each edition occurred. They do not infer attendance, full route completion beyond the stated record, or a permanent scale classification.

## Due occurrence correction

The 2026 祇園祭 Occurrence had reached the end of its recorded July window while still classified as `scheduled`.

Batch 22 adds reviewed Kyoto City result Evidence for the July 17 前祭山鉾巡行 and 神幸祭 and the July 24 後祭山鉾巡行 and 還幸祭, then replaces the existing Occurrence with:

```text
outcome  held
scale    unknown
```

The correction confirms the major reviewed processions and shrine rites. It does not infer an overall attendance or permanent scale classification.

## Resulting canonical corpus

Validation basis head: `24d334d07d1b8598df5a305ac55f8bca1b115797`.

| Record family | Count |
|---|---:|
| Entity | 73 |
| Place | 67 |
| State Snapshot | 35 |
| Change Event | 61 |
| Occurrence | 115 |
| Occurrence Series | 35 |
| Recurrence Pattern | 35 |
| Relation | 44 |
| Designation | 17 |
| Source | 169 |
| Evidence | 407 |

The corpus now covers 26 prefectures. The uncovered-prefecture count decreased to 21. The sparse-primary-Entity count remains 7.

Repository position:

```text
F1 batches                    13
F2 maintenance bundles        39
F2 correction bundles         16
Additive application slots    52
Correction application slots  16
Correction records            30
Corrected logical IDs         27
Public Entities               73
Jinja State Snapshots          0
```

## Detail C and map review

The exhaustive Detail C contract verified:

- 152 generated HTML routes;
- 73 Pagefind-indexed records with direct detail URLs;
- 57 primary Entity details;
- 16 State-free Shrine or Temple reference pages;
- 60 Place details;
- 44 approved Relations;
- individual JSON for every generated record.

The exhaustive map-utility contract verified:

- 113 Place-bearing detail pages;
- 93 useful anchored detail pages;
- 20 explicit location-gap pages;
- zero uncovered Festival or Folk Performance pages.

吉田の火祭, 北口本宮冨士浅間神社, 諏訪神社, and the Shrine compound use the concrete Shrine Place as the useful anchor. The separate 上吉田本町通り・御旅所巡行区域 page preserves an explicit route-area explanation and no false point map.

The exhaustive Chromium navigation test passed for every generated Entity detail and State-free seed-reference page.

## Visual review

The representative visual contract contains 67 routes and produced 134 desktop/mobile full-page screenshots.

The automated screenshot audit passed with:

- 67 of 67 desktop routes captured;
- 67 of 67 mobile routes captured;
- 39 of 39 embedded maps loaded on each device;
- zero failures;
- zero warnings;
- zero recorded Google Maps iframe CORS noise.

Manual full-resolution review confirmed:

- 吉田の火祭 renders Current State, six annual Occurrences, three Change Events, two Shrine Relations, its national Designation, Evidence, and a useful Shrine map;
- the State-free 北口本宮冨士浅間神社 and 諏訪神社 pages render the reference boundary without inferring a Shrine State;
- the concrete Shrine Place renders its map and reverse record links;
- the route-based Place renders the explicit no-point-map explanation;
- desktop and mobile layouts remain readable without blank map frames or horizontal overflow.

## Validation

All 15 workflows on the final validation-basis head succeeded.

| Verification | Run |
|---|---:|
| Complete repository CI and release readiness | `30734187023` |
| Detail C, map utility, and exhaustive Chromium navigation | `30734187040` |
| Desktop/mobile visual capture and audit | `30734187027` |
| Corpus coverage audit | `30734187024` |
| Canonical dataset contract | `30734187017` |
| Correction contract | `30734187045` |
| Relation coverage | `30734187013` |
| Data freshness | `30734187020` |
| External-link maintenance | `30734187022` |
| Bundle inventory and repository baseline | `30734187044` |
| Future-site seed inventory | `30734187042` |
| Future-site seed readiness | `30734187021` |
| Jinja start-gate record | `30734187063` |
| F2-28 launch boundary | `30734187019` |
| Stabilization review | `30734187032` |

Artifacts:

- release candidate `8828990670`, digest `sha256:2c547bd3d00486b2efef6e7a69f62e8221da086da417f43d5ac4fbda778f6547`;
- corpus coverage `8828961186`, digest `sha256:ca7e72dd098e10850f30a251c3130a164b54688270df3adacd5e51eb6b8b5855`;
- map utility `8828970628`, digest `sha256:2c69428ec81112399b3d338186df1864bf144879768fcac33edc8deab5f6c749`;
- screenshot review `8829020168`, digest `sha256:bfd9b670c8e6b49761aad4599ad125afec766c8bf958bf836869d24b4bbfc395`.

## Merge

- pull request: `#155`;
- squash merge commit: `708d5781bcd4dc446e9c41641356fa26f21dfbc6`;
- merged at: `2026-08-02T05:37:13Z`.

## Boundaries

- all public claims require approved Evidence;
- the 2026 吉田の火祭 remains scheduled until result Evidence is reviewed;
- the 2021 吉田の火祭 remains modified;
- the 2022 and 2024 吉田の火祭 scales remain unknown;
- the 2023 normal classification is bounded to the reviewed official statement;
- the 2026 祇園祭 result remains held with unknown scale;
- route-based Places are not converted into point maps;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- private analytics, candidate material, and internal project-policy information are absent.
