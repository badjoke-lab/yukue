# Matsuri corpus expansion batch 11

**Date:** 2026-07-27  
**Status:** Passed  
**Track:** Phase 10B — Matsuri corpus expansion

## Decision

The first post-Detail-C corpus expansion batch combines breadth and depth rather than adding identity-only rows.

- Breadth: add `仙台七夕まつり` and its organizing body as the first approved primary Matsuri record for Miyagi Prefecture.
- Depth: add the 2020 interruption and 2021 reduced-format return to the existing `徳島市阿波おどり` record.
- Governance: add a repeatable corpus coverage audit so later batches are selected from measured regional and record-density gaps.

## Coverage audit before the batch

The initial audit reported:

```text
Public Entities             44
Prefectures with no primary record  33
Sparse primary Entities     15
```

The selection rule prefers an uncovered prefecture where official or public-authority Sources support Identity, Place, Current State, Occurrence, Change, Relation, and Evidence in one bounded bundle. It also prefers an existing record with missing Occurrence or Change history for the depth component.

## Added public records

### 仙台七夕まつり

The additive bundle records:

- Festival identity and official public slug,
- distributed Place covering the central and surrounding shopping-street areas,
- active Current State observed on 2026-07-27,
- annual August 6–8 recurrence,
- 2020 cancelled Occurrence and suspension Change Event,
- 2021 reduced Occurrence, suspension end, and format Change Event,
- 2026 scheduled Occurrence,
- organizing-body Entity for `仙台七夕まつり協賛会`,
- `organized_by` Relation,
- Source and Evidence records for every public claim above.

Primary official and public-authority Sources:

```text
https://www.sendaitanabata.com/about/outline/
https://www.sendaitanabata.com/
https://www.city.sendai.jp/sesakukoho/shise/gaiyo/profile/ayumi.html
https://www.sentia-sendai.jp/sentia-news/2816/
```

### 徳島市阿波おどり

The maintenance bundle records:

- 2020 cancelled Occurrence,
- 2020 suspension-start Change Event,
- 2021 reduced Occurrence,
- 2021 suspension-end Change Event,
- 2021 format-change Event for the reduced and distributed model,
- claim-specific Source and Evidence records.

Public-authority Sources:

```text
https://www.city.tokushima.tokushima.jp/smph/kankou/awaodori/kaisai/2020/2020tyuushi.html
https://www.city.tokushima.tokushima.jp/kankou/awaodori/2021awa.html
```

## Result after the batch

The machine-generated audit reports:

```text
Entities                 46
Places                   32
State Snapshots          24
Change Events            25
Occurrences              31
Occurrence Series        19
Recurrence Patterns      19
Relations                26
Designations              5
Sources                   60
Evidence                 165
Prefectures with no primary record  32
Sparse primary Entities  14
```

This is not a completion claim. The corpus remains geographically sparse and contains existing records without Occurrence or Change history. The audit is intended to keep that gap visible and to govern subsequent batches.

## Product behavior

The completed Detail C implementation means the new records automatically receive:

- Festival and Organization detail pages,
- Place detail and reverse links,
- Year-by-Year Occurrence history,
- Change history,
- bidirectional Relation navigation,
- claim-linked Evidence,
- direct individual JSON,
- Search indexing,
- sitemap inclusion.

The verified build contains:

```text
HTML routes                 97
Primary Entity details      41
Shrine/Temple references     5
Place details               32
Direct-detail Search records 46
Approved Relations          26
```

## Boundaries

- No Jinja, Jiin, portal, Worker, hostname, or future-site activation is included.
- No Shrine or Temple Current State is inferred.
- No image is published without an approved rights record.
- Scheduled 2026 Occurrences are not represented as already held.
- The public corpus remains review-driven rather than volume-driven.

## Validation

The data head `151c201d951d1e4a8eb1130b59e5020e4b8e64c0` passed:

```text
Complete CI and repository readiness  30286325427
Detail C navigation                   30286325463
Canonical Search                      30286325461
Canonical dataset                     30286325419
Corpus coverage                       30286325402
Data freshness                        30286325563
Relation coverage                     30286325416
External-link maintenance             30286325348
Bundle inventory and baseline         30286325632
```

## Machine evidence

```text
Corpus audit artifact   8660941636
Corpus audit digest     sha256:27de3ccb63a353775143dbdacbadcb17ac972396fa30f73da3d00d6232ef6534
Release artifact        8661002848
Release digest          sha256:40708f19e14fbb78c8947206dc785a8928f85c422e87c865db24a9cffc2133ea
Screenshot artifact     8661004702
Screenshot digest       sha256:0ac3ea941e5406207cb049ae0c9b5b446b29085bcb2b987cc53a363d2b361705
```
