# Matsuri corpus expansion batch 12

**Date:** 2026-07-27  
**Status:** Passed  
**Track:** Phase 10B — Matsuri corpus expansion

## Decision

Batch 12 continues the breadth-and-depth rule established by batch 11.

- Breadth: add `沖縄全島エイサーまつり` and its organizing body as the first approved primary Matsuri record for Okinawa Prefecture.
- Depth: add the 2020 and 2021 cancellations and the 2022 return to the existing `青森ねぶた祭` record.
- Selection: prefer an uncovered prefecture and an existing sparse primary Entity where official or public-authority Sources support Current State, Occurrence, Change, Relation, Place, and claim-level Evidence.

## Added public records

### 沖縄全島エイサーまつり

The additive bundle records:

- Festival identity and official public slug,
- organizing-body Entity for `沖縄全島エイサーまつり実行委員会`,
- ordinary venue Places for the 胡屋十字路周辺・ゲート通り route and 沖縄市コザ運動公園陸上競技場,
- the 2021 planned venue Place `沖縄アリーナ`,
- active Current State observed on 2026-07-27,
- annual recurrence after the lunar-obon period,
- 2020 cancelled Occurrence and suspension-start Change Event,
- 2021 cancelled reduced-format Occurrence,
- 2023 held Occurrence and suspension-end Change Event,
- 2026 scheduled Occurrence for September 4–6,
- `organized_by` Relation,
- Source and Evidence records for every public claim above.

Primary official and public-authority Sources:

```text
https://www.zentoeisa.com/
https://www.zentoeisa.com/news/n171.html
https://www.zentoeisa.com/area-guide.html
https://www.kozaweb.jp/news/show/186
https://www.kozaweb.jp/events/show/23148
https://www.city.okinawa.okinawa.jp/k003/shiseijouhou/kouhoukouchou/kouhou/kouhou/2023/kouhou_202310.html
```

### 青森ねぶた祭

The maintenance bundle records:

- 2020 cancelled Occurrence,
- 2021 cancelled Occurrence,
- 2022 held Occurrence,
- 2020 suspension-start Change Event,
- 2022 suspension-end Change Event,
- official archive Sources and claim-specific Evidence.

Official Sources:

```text
https://www.nebuta.jp/archive/tokubetsunebuta.html
https://www.nebuta.jp/archive/nebuta/2021/
```

## Corpus result

The machine-generated coverage audit reports:

```text
Entities                 48
Places                   35
State Snapshots          25
Change Events            29
Occurrences              38
Occurrence Series        20
Recurrence Patterns      20
Relations                27
Designations              5
Sources                   68
Evidence                 184
Uncovered prefectures    31
Sparse primary Entities  13
```

Bounded movement from batch 11:

```text
Entities                    46 -> 48
F1 batch files              12 -> 13
F2 maintenance bundles      14 -> 15
Additive application slots  26 -> 28
Uncovered prefectures       32 -> 31
Sparse primary Entities     14 -> 13
```

This is not a corpus-completion claim. Thirty-one prefectures still have no primary public record, and thirteen existing primary Entities remain sparse under the published audit rule.

## Product behavior

The completed Detail C implementation exposes the new and deepened records through:

- Festival and Organization detail pages,
- Place details and reverse links,
- Year-by-Year Occurrences,
- Change history,
- bidirectional Relation navigation,
- claim-linked Evidence and Sources,
- direct individual JSON,
- Search indexing,
- sitemap inclusion.

Static route validation and real-Chromium navigation both passed on the validated implementation head.

## Validation

Validated implementation head:

```text
1c5f571ede9bcfbc491de00a7c44ed3cadf6dd53
```

Successful workflows:

```text
Complete CI / repository readiness  30289445538
Detail C navigation                 30289445451
Corpus coverage audit               30289445506
Canonical dataset contract          30289445442
Data freshness                      30289445456
Relation coverage                   30289445480
External-link maintenance           30289445444
Bundle inventory / baseline         30289445439
Correction contract                 30289445440
Screenshot capture and audit        30289445468
Jinja start gate                    30289445445
Future-site seed inventory          30289445443
Future-site seed readiness          30289445515
```

Artifacts:

```text
Corpus audit
ID      8662175060
Digest  sha256:beb1d0f2e687ac1e4d323c11bcc064a1e42ab6477ef799f6474b6bedbb672f44

Release candidate
ID      8662222706
Digest  sha256:848bf7779b83ccc77847c45aa854e7fecc583503f709204411c21753c28e8e57

Representative desktop/mobile screenshots
ID      8662205621
Digest  sha256:09b52df5973c8f110a095f25a83e3cf54300d349f925f8e69e827e388dbf0a50
```

## Boundaries

- The 2026 Okinawa occurrence remains `scheduled`, not `held`.
- The 2021 Okinawa record preserves the announced reduced venue plan while recording the final outcome as `cancelled`.
- No image is published without an approved rights record.
- No Shrine or Temple Current State is inferred.
- No Jinja, Jiin, portal, Worker, hostname, or future-site activation is included.
- Jinja remains blocked.
