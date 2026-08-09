# Matsuri Batch 35 Production Verification — 2026-08-09

## Status

Passed.

## Purpose

This audit closes exact canonical-production verification for Matsuri corpus expansion Batch 35.

The production baseline is pinned to the Batch 35 implementation release:

```text
532861f164e32847a1e6c84ce544430267ad83db
```

## Exact canonical result

Canonical-origin workflow run `31304578652` succeeded on attempt 1 against:

```text
https://matsuri-yukue.badjoke-lab.com
```

Verified exact counts:

| Production family | Count |
|---|---:|
| Entity | 104 |
| Change Event | 97 |
| Relation | 62 |
| Occurrence | 157 |
| Sitemap entry | 209 |

The verifier explicitly confirmed:

```text
canonical sitemap entries verified: 209
production baseline verified: 532861f164e32847a1e6c84ce544430267ad83db
```

## Batch 35 routes

The canonical verifier confirmed HTTP 200 for the new Osaka breadth routes:

- `/festivals/kishiwada-danjiri-matsuri/`;
- `/organizations/kishiwada-danjiri-kishiwada-nenban/`;
- `/places/kishiwada-danjiri-city-routes/`.

All retained required production routes also passed.

## Required Entity and Occurrence assertions

The production baseline requires:

- `fst-kishiwada-danjiri-matsuri`;
- `org-kishiwada-danjiri-kishiwada-nenban`;
- all retained required Entities from earlier baselines.

The new 2026 assertions are:

| Occurrence | Record version | Outcome | Scale |
|---|---:|---|---|
| `occ-kishiwada-danjiri-2026-september` | 1 | scheduled | unknown |
| `occ-kishiwada-danjiri-2026-october` | 1 | scheduled | unknown |

Both components remain future-dated at verification time. No held outcome or completion scale is inferred.

## Corpus position

Batch 35 adds 岸和田だんじり祭 as the first approved primary Matsuri record for 大阪府 and advances primary-record prefecture coverage to:

```text
39 / 47 prefectures
```

Eight prefectures remain uncovered:

```text
群馬県
新潟県
長野県
兵庫県
和歌山県
鳥取県
山口県
宮崎県
```

The verified repository corpus contains:

```text
Entities          104
Places             95
State Snapshots    48
Change Events      97
Occurrences       157
Relations          62
Designations       29
Sources           268
Evidence          613
```

No sparse primary Entity remains.

## Modeling boundary

The 2026 September and October festival periods are modeled as separate annual series and separate `festival_component` Occurrences rather than one artificial continuous range.

The evidence-backed `supported_by` Relation to 岸和田地区年番 is bounded to the district-level operational role documented by 岸和田市. It does not assert that one organization is the sole organizer of every September and October district.

The 1703 origin is recorded at year precision using the existing `other` Change Event type; no exact first-edition date is invented.

## Map contract

The distributed route Place remains municipality-level rather than fabricating point coordinates. The reviewed 岸和田市 official Danjiri Map is registered through the approved official-map mechanism.

Map-utility artifact:

```text
ID      9035455880
SHA256  cd1684fad45635926f1935c71970815e594140bcf16ec65035eb6c62006e614e
```

The map audit records:

```text
Place-bearing details   159
Useful anchored maps    129
Explicit location gaps   30
Entity anchors            72
Place anchors             57
```

All required Festival / Folk Performance records satisfy the map contract.

## Repository and visual verification

Implementation PR #212 passed complete repository CI in workflow run `31304258098` and Detail C navigation in `31304258151`.

The final public build generated:

```text
HTML routes       209
Pagefind records  104
```

Full-page screenshot workflow run `31304258091` passed:

```text
Desktop captures   109 / 109
Mobile captures    109 / 109
Failed captures      0
Desktop maps        67 / 67
Mobile maps         67 / 67
Visual failures      0
Visual warnings      0
```

Screenshot artifact:

```text
ID      9035555147
SHA256  41cc29d8457023892843695706358586411c2d08ea43ce536590591133189ebf
```

Release-candidate artifact:

```text
ID      9035501369
SHA256  e506867e1db4f596351d83168989ae41159ef55ab1f5ba97737295d083a0c6f2
```

## Production-baseline verification

Production-baseline PR #213 passed:

```text
Complete repository CI  31304578644
Canonical-origin gate   31304578652
Canonical attempt       1
```

The machine-checked production baseline is stored in `config/matsuri-production-baseline.json`.

## Merge record

- Batch 35 implementation PR: #212;
- implementation release: `532861f164e32847a1e6c84ce544430267ad83db`;
- production-baseline PR: #213;
- production-baseline merge: `d09e45363f607e54b948991574922863741efd71`;
- corpus-audit PR: #214;
- corpus-audit merge: `0803a89c9071eda9e471f11b3d6ee906ae47775c`.

## Boundaries

- this audit proves canonical route structure, exact feed counts, sitemap inventory, required Entities, and reviewed Occurrence assertions; it does not claim search-engine indexation;
- neither 2026 岸和田 component is claimed held;
- no all-district single-organizer claim is made;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- stabilization remains a separate gate and is not completed by this audit.

## Result

Batch 35 exact canonical-production verification is complete. Matsuri corpus expansion remains active, with Batch 36 next. Stabilization remains observing and is not eligible before 2026-08-10 or by elapsed time alone.
