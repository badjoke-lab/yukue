# Matsuri corpus expansion batch 12

**Date:** 2026-07-27  
**Status:** Implemented; final repository validation pending  
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

## Expected corpus result

Before final machine validation, the expected bounded changes are:

```text
Entities                    46 -> 48
F1 batch files              12 -> 13
F2 maintenance bundles      14 -> 15
Additive application slots  26 -> 28
Uncovered prefectures       32 -> 31
Sparse primary Entities     14 -> 13 or fewer
```

The final totals are taken from the machine-generated corpus coverage artifact, not from this expectation block.

## Product behavior

The completed Detail C implementation means the new and deepened records must expose:

- Festival and Organization detail pages,
- Place details and reverse links,
- Year-by-Year Occurrences,
- Change history,
- bidirectional Relation navigation,
- claim-linked Evidence and Sources,
- direct individual JSON,
- Search indexing,
- sitemap inclusion.

## Boundaries

- The 2026 Okinawa occurrence remains `scheduled`, not `held`.
- The 2021 Okinawa record preserves the announced reduced venue plan while recording the final outcome as `cancelled`.
- No image is published without an approved rights record.
- No Shrine or Temple Current State is inferred.
- No Jinja, Jiin, portal, Worker, hostname, or future-site activation is included.
- Jinja remains blocked.

## Machine evidence

```text
Corpus audit command    pnpm audit:matsuri:corpus
Detail C gate           pnpm check:matsuri:detail-navigation
Repository gate         pnpm gate:matsuri:repository
PR                      recorded after validation
Artifacts               recorded after validation
```
