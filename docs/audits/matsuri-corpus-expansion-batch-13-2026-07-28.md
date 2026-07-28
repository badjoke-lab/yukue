# Matsuri Corpus Expansion Batch 13 — 2026-07-28

## Status

Passed.

## Scope

Batch 13 expands the reviewed Matsuri corpus in two directions:

1. adds a new prefectural record, 新庄まつり in 山形県;
2. deepens the existing 秩父夜祭 record with historical Occurrence and Change Event records.

## New reviewed records

### 新庄まつり

- Festival Entity: `fst-shinjo-matsuri`
- Organization Entity: `org-shinjo-matsuri-committee`
- Shrine seed Entity: `shr-shinjo-tenmangu`
- reviewed ritual anchor: 新庄天満神社
- reviewed main venue: 新庄駅前ふれあい広場 アビエス
- Current State observed from the 2026 official program
- 2020 cancellation
- 2021 reduced return
- 2022 restoration toward the normal format
- 2026 scheduled edition
- Organization and shrine Relations with approved Evidence

### 秩父夜祭

- 2020 reduced edition
- 2021 reduced edition
- 2025 normal edition
- Change Events recording the 2020 and 2021 format changes
- the existing annual Occurrence Series and Recurrence Pattern are reused rather than duplicated

## Resulting canonical corpus

Validation basis head: `f4df7fe86d972b616302a5869d55233fd5ea47f6`.

| Record family | Count |
|---|---:|
| Entity | 53 |
| Place | 42 |
| State Snapshot | 26 |
| Change Event | 35 |
| Occurrence | 45 |
| Occurrence Series | 21 |
| Recurrence Pattern | 21 |
| Relation | 32 |
| Designation | 5 |
| Source | 88 |
| Evidence | 223 |

The corpus now covers 17 prefectures. The uncovered-prefecture count decreased to 30. The sparse-primary-Entity count decreased to 12, and 秩父夜祭 is no longer classified as sparse.

## Product projection

The new records are included in:

- canonical HTML detail routes;
- browse and search navigation;
- individual machine-readable JSON;
- bidirectional Relation rendering;
- Place detail pages;
- map-utility validation;
- exhaustive Chromium Detail C navigation.

The representative visual contract now includes 33 routes and produces 66 desktop/mobile full-page screenshots. 新庄まつり and the State-free 新庄天満神社 seed page are permanent representative routes.

The complete map-utility audit checked 77 Place-bearing details:

- 66 useful map-covered details;
- 36 Entity or seed-reference map anchors;
- 30 Place-detail map anchors;
- 11 supporting Place location gaps;
- zero uncovered Festival or Folk Performance pages.

新庄まつり uses 新庄天満神社 as its reviewed ritual anchor and retains 新庄駅前ふれあい広場 アビエス as an additional reviewed main venue.

## Validation

All 15 workflows triggered for the validation-basis head succeeded.

| Verification | Run |
|---|---:|
| Complete repository CI and release freeze | `30384693799` |
| Detail C, map utility, and exhaustive Chromium navigation | `30384693833` |
| Desktop/mobile visual capture and audit | `30384693820` |
| Corpus coverage audit | `30384693698` |
| Canonical dataset contract | `30384693869` |
| Relation coverage | `30384693883` |
| Data freshness | `30384693800` |
| External-link maintenance | `30384693741` |
| Jinja start-gate record | `30384693781` |

Artifacts:

- release candidate `8698524226`, digest `sha256:f6e80135a1948bcae33d3cb8a6b55f59f41a876fc1c45446a83c4a8544fcca7c`;
- corpus coverage `8698447380`, digest `sha256:55ffb58f69fc4d0de30881931988e00f47d623c6bac3752d6856ad7f28d17f7e`;
- map utility audit `8698482239`, digest `sha256:1e5126fc24418b102627e11a53ac0d0f8dc89b3d57b2e53866cdfbe12901e740`;
- screenshot review `8698530797`, digest `sha256:181a5e9531ff97eae1d0fe800b928b465bb2664ff12d6de189f42e81210d598f`.

## Boundaries

- all public claims require approved Evidence;
- no current State is inferred for 新庄天満神社;
- the Jinja site remains blocked and inactive;
- no Jinja application, Worker, hostname, or publication is created;
- dates use the repository UTC observation date, 2026-07-28;
- temporary diagnostic and one-time correction workflows are absent from the final change set.
