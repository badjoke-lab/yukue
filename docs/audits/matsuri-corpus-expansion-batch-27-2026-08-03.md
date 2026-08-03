# Matsuri Corpus Expansion Batch 27 — 2026-08-03

## Status

Passed repository, data, Detail C, map, and visual verification. Canonical-production verification is the next separate step.

## Scope

Batch 27 continues the reviewed Matsuri breadth-and-depth track:

1. adds さぬき高松まつり as the first reviewed primary Matsuri record for 香川県;
2. adds 高松まつり振興会 and an evidence-backed `organized_by` Relation;
3. records 高松市中央公園 as the historical main venue and the reviewed 2026 move to あなぶきアリーナ香川 and サンポート高松多目的広場 石のステージ;
4. records the 2022 three-year public return, the held modified 2025 edition, and the scheduled modified 2026 edition;
5. deepens 岳神楽 and 大償神楽 with claim-specific 1976 national-designation and 2009 UNESCO-inscription Change Events;
6. preserves Detail C, Evidence, map, future-site seed, stabilization, and blocked Jinja boundaries.

## Evidence boundaries

- The 2022 Takamatsu record proves a three-year public return. It does not infer a permanent Entity suspension before that return.
- The 2025 edition remains `held / modified`: reviewed municipal Evidence records a near-conventional three-day restoration together with a deliberate shopping-street trial.
- The 2026 edition remains `scheduled / modified` until the August 12–14 occurrence window closes and result Evidence is reviewed.
- The three Takamatsu Places preserve the historical-to-current venue transition instead of collapsing the Festival into one permanent point.
- The 1976 and 2009 Hayachine records are designation-history Change Events. They do not replace Current State or infer a new legal status for any organization.
- No Shrine Current State or legal-person State is inferred.

## New reviewed records

### さぬき高松まつり

Added:

- Festival Entity `fst-sanuki-takamatsu-matsuri`;
- organizer Organization `org-takamatsu-matsuri-shinkokai`;
- historical main venue `plc-takamatsu-chuo-koen`;
- reviewed 2026 venues `plc-anabuki-arena-kagawa` and `plc-sanport-takamatsu-multipurpose-square`;
- active Current State based on the current official edition page;
- annual Series and Recurrence Pattern for August 12–14;
- held unknown-scale 2022 edition;
- held modified 2025 edition;
- scheduled modified 2026 edition;
- bounded 2022 return, 2025 format-change, and 2026 venue-change Events;
- evidence-backed `organized_by` Relation;
- canonical detail routes, individual JSON, search, Relation navigation, Place navigation, and embedded-map behavior.

The current primary anchor is the reviewed サンポート高松多目的広場 石のステージ. The historical Central Park venue and the 2026 arena venue remain independently navigable Place records.

## Existing-record depth

### 岳神楽 and 大償神楽

Added:

- a 1976-05-04 national Important Intangible Folk Cultural Property Change Event on 早池峰神楽, 岳神楽, and 大償神楽;
- a 2009-09-30 UNESCO Representative List inscription Change Event on the same parent-and-component set;
- two claim-specific Evidence records based on the existing 花巻市 Source.

These records make the component pages carry their own reviewed designation history while preserving the parent-to-component Relation model. 岳神楽 and 大償神楽 are no longer classified as sparse primary Entities.

## Resulting canonical corpus

Implementation validation head: `1ab92c39e12e670d9f0ab1c3416d100d5cf54836`.

| Record family | Count |
|---|---:|
| Entity | 85 |
| Place | 82 |
| State Snapshot | 40 |
| Change Event | 83 |
| Occurrence | 139 |
| Occurrence Series | 40 |
| Recurrence Pattern | 40 |
| Relation | 51 |
| Designation | 23 |
| Source | 217 |
| Evidence | 504 |

The corpus covers 31 prefectures, leaving 16 uncovered. The only remaining sparse primary Entity is 御田祭.

Repository position:

```text
F1 batches                    13
F2 maintenance bundles        54
F2 correction bundles         17
Additive application slots    67
Correction application slots  17
Public Entities               85
Jinja State Snapshots          0
```

## Detail C and map review

The exhaustive Detail C and map contracts verified:

- 177 generated HTML routes;
- 85 Pagefind-indexed records with direct detail URLs;
- 65 primary Entity details;
- 20 State-free Shrine or Temple reference pages;
- 73 Place details;
- 51 approved Relations;
- individual JSON for every generated record;
- 135 Place-bearing detail pages;
- 111 useful anchored details;
- 24 explicit location-gap pages;
- zero uncovered Festival or Folk Performance pages.

The exhaustive Chromium test passed for every generated Entity detail and seed-reference page. The new Takamatsu Festival, Organization, and Place routes passed reverse navigation, JSON, map utility, and browser checks.

## Visual review

The representative visual contract contains 92 routes and produced 184 desktop/mobile full-page screenshots.

The automated screenshot audit passed with:

- 92 of 92 desktop routes captured;
- 92 of 92 mobile routes captured;
- 57 of 57 embedded maps loaded on each device;
- zero failures;
- zero warnings;
- zero recorded Google Maps iframe CORS noise.

Manual full-resolution review confirmed:

- さぬき高松まつり renders the scheduled 2026 boundary, three-place transition, Occurrences, Change Events, organizer Relation, Evidence, and useful current map;
- 高松まつり振興会 remains an organizer record without unsupported Place or State claims;
- all three Takamatsu Place pages render maps, reverse Festival links, Evidence, and individual JSON;
- 岳神楽 and 大償神楽 display the two new designation-history Events without disturbing their existing Current State and Occurrence histories;
- no reviewed page contains horizontal overflow or a blank map frame.

## Validation

| Verification | Run |
|---|---:|
| Complete repository CI and release readiness | `30833823472` |
| Detail C, map utility, and exhaustive Chromium navigation | `30833823064` |
| Desktop/mobile visual capture and audit | `30833823796` |
| Corpus coverage audit | `30833823049` |
| Canonical dataset contract | `30833823006` |
| Correction contract | `30833823378` |
| Relation coverage | `30833822944` |
| Data freshness | `30833822967` |
| External-link maintenance | `30833823587` |
| Bundle inventory and repository baseline | `30833822912` |
| Future-site seed inventory | `30833822903` |
| Future-site seed readiness | `30833823044` |
| Jinja start-gate record | `30833823066` |

Artifacts:

- release candidate `8864148827`, digest `sha256:cd2cde420e1152577432f55ac7b35df38a05173af37b089c7f40d753cbac4566`;
- map utility `8864030441`, digest `sha256:2b66ea6697b39abe019a93593c6eb291c3e2687b470df20db472061e76b6cbc8`;
- screenshot review `8864237334`, digest `sha256:caafbafded661bf2ab8a5a90e625aa705130d18f4dadf994b8ead32b9aefdb4b`.

## Merge

- pull request: `#173`;
- squash merge commit: `43b8d7a6ee800bb1e9ab7333698ea4be2ccbfd88`;
- merged on: `2026-08-03`.

## Boundaries

- all public claims require approved Evidence;
- a scheduled edition is not converted into a held result before post-window review;
- historical and current venues remain distinguishable;
- designation history does not replace Current State;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- private analytics, candidate material, and internal project-policy information are absent.
