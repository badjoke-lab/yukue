# Matsuri Corpus Expansion Batch 16 — 2026-07-29

## Status

Passed.

## Scope

Batch 16 continues the reviewed Matsuri breadth-and-depth track:

1. adds よさこい祭り in 高知県 as a modern civic-festival record with an evidence-backed organizer and representative venue model;
2. deepens the existing 東栄町の花祭 aggregate with a bounded interruption record and district-specific Occurrences;
3. preserves the active aggregate / suspended component distinction and keeps the Jinja start gate blocked.

## New reviewed records

### よさこい祭り

- Festival Entity: `fst-kochi-yosakoi-matsuri`
- Organization Entity: `org-yosakoi-shinkokai`
- reviewed representative Places: 東洋電化中央公園競演場 and 追手筋本部競演場
- Current State based on the official 2026 第73回 schedule
- annual Occurrence Series and Recurrence Pattern for August 9–12
- cancelled 2020 and 2021 editions
- modified 2022 special performance
- normal-format 2023 restoration
- scheduled 2026 edition
- Festival-to-Organization Relation with approved Evidence
- canonical detail routes, individual JSON, search entries, reverse Relation navigation, and embedded maps

No Shrine or Temple Entity is invented for this civic festival.

### 東栄町の花祭

The existing `fst-hana-matsuri-toei` aggregate remains active and the existing `fst-nunokawa-hana-matsuri` component remains separately suspended.

Added:

- one Change Event recording that many districts experienced two consecutive years of cancellation in 2020–2021;
- no claim that every district was cancelled;
- 2025 district Occurrences for 月、足込、河内;
- a 2026 district Occurrence for 古戸;
- concrete district Places for 月公民館、足込集会所、河内長峰神社境内、古戸会館;
- separate Evidence for each Place and Occurrence.

## Resulting canonical corpus

Validation basis head: `b5bf07202b19a7b6a7de4837f4f839851997d7d5`.

| Record family | Count |
|---|---:|
| Entity | 59 |
| Place | 50 |
| State Snapshot | 29 |
| Change Event | 43 |
| Occurrence | 65 |
| Occurrence Series | 24 |
| Recurrence Pattern | 24 |
| Relation | 35 |
| Designation | 6 |
| Source | 111 |
| Evidence | 276 |

The corpus now covers 20 prefectures. The uncovered-prefecture count decreased to 27. The sparse-primary-Entity count decreased to 10 because 東栄町の花祭 now has both Occurrence and Change Event coverage.

## Product projection

The new and deepened records are included in:

- canonical HTML detail routes;
- browse and search navigation;
- individual machine-readable JSON;
- bidirectional Relation rendering;
- Place detail pages;
- map-utility validation;
- exhaustive Chromium Detail C navigation;
- current-state, occurrence-history, change-history, and Evidence sections.

The build produces 123 public HTML routes. The representative visual contract contains 42 routes and produces 84 desktop/mobile full-page screenshots.

The screenshot audit passed with:

- 42 of 42 desktop routes captured;
- 42 of 42 mobile routes captured;
- 18 of 18 embedded maps loaded on each device;
- zero failures;
- zero warnings;
- zero recorded Google Maps iframe CORS noise.

## Validation

All 13 workflows triggered for the validation-basis head succeeded.

| Verification | Run |
|---|---:|
| Complete repository CI and release freeze | `30427045759` |
| Detail C, map utility, and exhaustive Chromium navigation | `30427045856` |
| Desktop/mobile visual capture and audit | `30427045875` |
| Corpus coverage audit | `30427045809` |
| Canonical dataset contract | `30427045831` |
| Relation coverage | `30427045791` |
| Data freshness | `30427045833` |
| External-link maintenance | `30427045873` |
| Jinja start-gate record | `30427045841` |

Artifacts:

- release candidate `8714049049`, digest `sha256:65cba355df05e8fdcd24642f6542490816ac6150ca53d3f92a2214a516869713`;
- corpus coverage `8713991735`, digest `sha256:2f8c2d6116d6e4ac58adafc70dbde7425d6a0783a48d5a98f18b086b1b803bf4`;
- map utility audit `8714015312`, digest `sha256:3f9a8f00bccaf24ea96d1766b53c4ab925ba85210fde884ebf01d05071e0c905`;
- screenshot review `8714056572`, digest `sha256:cfb807e28753c3f76de3de9c2b7c756f83efbf05e7a1a8da150a347d6a26bcaf`.

## Merge

- pull request: `#140`;
- merge commit: `1841d4cf78f951c071b07af77398493fa2a7a15b`;
- merged at: `2026-07-29T06:12:39Z`.

## Boundaries

- all public claims require approved Evidence;
- the Yosakoi record does not invent a Shrine or Temple Relation;
- the 2020–2021 Hana Matsuri interruption is explicitly limited to many districts rather than all districts;
- district Occurrences remain separate records with separate dates and Places;
- the existing active aggregate and suspended 布川 component States are unchanged;
- the Jinja site remains blocked and inactive;
- no Jinja application, Worker, hostname, publication, or invented Jinja State is created;
- the 2026 よさこい祭り record remains `scheduled` until its occurrence window closes and result Evidence is reviewed;
- dates use the repository UTC observation date, 2026-07-29;
- private analytics, candidate material, and internal project-policy information are absent.
