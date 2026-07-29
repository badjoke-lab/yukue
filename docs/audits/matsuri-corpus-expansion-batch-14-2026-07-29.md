# Matsuri Corpus Expansion Batch 14 — 2026-07-29

## Status

Passed.

## Scope

Batch 14 expands the reviewed Matsuri corpus in two directions and closes one due freshness item:

1. adds 三社祭 in 東京都 with 浅草神社 as its reviewed ritual anchor;
2. deepens 秋田竿燈まつり with the 2020–2023 interruption and restoration sequence;
3. resolves the closed 2026 御田祭 schedule with official public-authority Evidence.

## New reviewed records

### 三社祭

- Festival Entity: `fst-sanja-matsuri`
- Shrine seed Entity: `shr-asakusa-jinja`
- reviewed ritual anchor and Place: 浅草神社
- Current State based on the 2026 official schedule
- annual Occurrence Series and Recurrence Pattern
- confirmed 2025 edition
- Festival-to-Shrine Relation with approved Evidence
- canonical detail route, individual JSON, search entry, reverse Relation navigation, and embedded shrine map

### 秋田竿燈まつり

- 2020 cancellation
- 2021 cancellation
- 2022 held return
- 2023 normal-format restoration
- Change Events for the two-year suspension, return, and restored format
- the existing annual Occurrence Series and Recurrence Pattern are reused rather than duplicated

### 御田祭 freshness closure

- the 2026 scheduled Occurrence ended on 2026-07-28;
- 阿蘇市の公的な市長日程 records attendance at 阿蘇神社 御田祭 on that date;
- the Occurrence is corrected from `scheduled` to `held` while retaining both the original schedule Evidence and the result Evidence;
- no outcome is inferred from social media or an unreviewed source.

## Resulting canonical corpus

Validation basis head: `49c876c479f202d17ed88c32a6d13f2ffe43e05f`.

| Record family | Count |
|---|---:|
| Entity | 55 |
| Place | 43 |
| State Snapshot | 27 |
| Change Event | 38 |
| Occurrence | 50 |
| Occurrence Series | 22 |
| Recurrence Pattern | 22 |
| Relation | 33 |
| Designation | 5 |
| Source | 95 |
| Evidence | 238 |

The corpus now covers 18 prefectures. The uncovered-prefecture count decreased to 29. The sparse-primary-Entity count remains 12 because 三社祭 enters as a new, evidence-complete but intentionally bounded record; 秋田竿燈まつり is no longer classified as sparse.

## Product projection

The new and corrected records are included in:

- canonical HTML detail routes;
- browse and search navigation;
- individual machine-readable JSON;
- bidirectional Relation rendering;
- Place detail pages;
- map-utility validation;
- exhaustive Chromium Detail C navigation;
- current-state, occurrence-history, and change-history sections.

The build produces 116 public HTML routes and 55 direct-detail Pagefind records. The representative visual contract contains 35 routes and produces 70 desktop/mobile full-page screenshots. 三社祭 and the State-free 浅草神社 seed page are permanent representative routes.

The complete map-utility audit checked 80 Place-bearing details:

- 56 concrete-anchor maps;
- 13 approved official maps;
- 11 supporting non-specialist Place gaps;
- zero uncovered Festival or Folk Performance pages.

三社祭 uses 浅草神社 as its reviewed ritual anchor. The Shrine seed page remains State-free.

## Validation

All 15 workflows triggered for the validation-basis head succeeded.

| Verification | Run |
|---|---:|
| Complete repository CI and release freeze | `30419037163` |
| Detail C, map utility, and exhaustive Chromium navigation | `30419037174` |
| Desktop/mobile visual capture and audit | `30419037231` |
| Corpus coverage audit | `30419037192` |
| Canonical dataset contract | `30419037225` |
| Relation coverage | `30419037158` |
| Data freshness | `30419037171` |
| External-link maintenance | `30419037204` |
| Jinja start-gate record | `30419037219` |

Artifacts:

- release candidate `8711251991`, digest `sha256:308ba821aa3a4f6e15df85beff42736ffc0525c676020212883c676bae7bd105`;
- corpus coverage `8711210501`, digest `sha256:5d36d1e2a107e831235599c37ddda588503ebbedae2c92e33592f1636f5ab53e`;
- map utility audit `8711232060`, digest `sha256:ec04e797762c05babef6adabb3b7b7c7b1c774b16ad8b90807bb5aae405b87f3`;
- screenshot review `8711256564`, digest `sha256:9b5e236d4480852778f5f2b79e024cf754c09e16cabcf76adfa26e1fd5e326fe`.

## Boundaries

- all public claims require approved Evidence;
- no current State is inferred for 浅草神社;
- the Jinja site remains blocked and inactive;
- no Jinja application, Worker, hostname, or publication is created;
- the 2026 御田祭 outcome is recorded from a public-authority source, not inferred;
- dates use the repository UTC observation date, 2026-07-29;
- temporary diagnostic workflows are absent from the final change set.
