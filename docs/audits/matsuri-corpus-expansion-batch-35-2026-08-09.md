# Matsuri Corpus Expansion Batch 35 — 2026-08-09

## Status

Passed repository, corpus, freshness, Detail C, map-utility, full-page visual, seed-boundary, and deployment verification.

Exact canonical-production verification is a separate gate and is recorded separately from this corpus audit.

## Scope

Batch 35 adds 岸和田だんじり祭 as the first approved primary Matsuri record for 大阪府.

Implementation was merged through PR #212 as:

```text
532861f164e32847a1e6c84ce544430267ad83db
```

The reviewed public corpus adds:

- `fst-kishiwada-danjiri-matsuri` — 岸和田だんじり祭 Festival;
- `org-kishiwada-danjiri-kishiwada-nenban` — 岸和田地区年番 Organization;
- `plc-kishiwada-danjiri-city-routes` — 岸和田市内各地区曳行区域 Place;
- Current State `active` from the current 2026 岸和田市 festival page;
- separate annual September and October recurrence series;
- the September 19–20, 2026 component as `scheduled / unknown`;
- the October 10–11, 2026 component as `scheduled / unknown`;
- the year-level 1703 origin as an `other` Change Event;
- a bounded `supported_by` Relation to 岸和田地区年番;
- four reviewed municipal Sources and ten claim-linked Evidence records.

The two 2026 components remain future-dated. No held outcome or completion scale is inferred. The 岸和田地区年番 Relation records the district role documented by 岸和田市 and does not claim that one organization operates every September and October district.

## Exact repository corpus

Corpus-coverage workflow run `31304258104` records:

| Family | Count |
|---|---:|
| Entities | 104 |
| Places | 95 |
| State Snapshots | 48 |
| Change Events | 97 |
| Occurrences | 157 |
| Occurrence Series | 49 |
| Recurrence Patterns | 49 |
| Relations | 62 |
| Designations | 29 |
| Sources | 268 |
| Evidence | 613 |

Entity types are:

```text
Festival          41
Folk Performance   8
Organization      31
Shrine reference  23
Tradition Unit     1
```

Current approved Festival / Folk Performance states are:

```text
active      47
suspended    1
```

No sparse primary Entity remains under the current corpus-coverage rule.

Repository maintenance baseline:

```text
F1 batches                    13
Maintenance bundles           78
Correction bundles            21
Additive application slots    91
Correction application slots  21
Correction records            35
Corrected logical IDs         32
Public Entities              104
Entities without external links 0
```

Corpus artifact:

```text
ID      9035442951
SHA256  580529ee8807e39b319a47c6a34f942b618c895b420773f61d75fa74c7366c37
```

## Geographic coverage

Batch 35 moves primary-record prefecture coverage from 38 to 39 prefectures.

大阪府 is now covered through 岸和田だんじり祭.

Eight prefectures remain without an approved primary Matsuri record:

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

## Detail C and map contract

The final implementation build generated:

```text
Entities          104
Change Events      97
Relations          62
Occurrences       157
HTML routes       209
Pagefind records  104
```

Required new Detail C routes are:

```text
/festivals/kishiwada-danjiri-matsuri/
/organizations/kishiwada-danjiri-kishiwada-nenban/
/places/kishiwada-danjiri-city-routes/
```

Detail C navigation workflow `31304258151` passed, including exhaustive Chromium navigation.

The distributed route Place deliberately remains municipality-level rather than fabricating a point coordinate. The reviewed 岸和田市 Danjiri Map is registered through the existing approved official-map mechanism.

Map-utility artifact `9035455880` records:

```text
Place-bearing details   159
Useful anchored maps    129
Explicit location gaps   30
Entity anchors            72
Place anchors             57
```

All required Festival / Folk Performance records satisfy the map contract. The remaining location gaps are non-primary-detail research items and do not authorize invented coordinates.

Map artifact:

```text
ID      9035455880
SHA256  cd1684fad45635926f1935c71970815e594140bcf16ec65035eb6c62006e614e
```

## Full-page visual verification

Full-page screenshot workflow run `31304258091` passed.

Both device profiles covered the same 209 generated HTML routes and selected 109 representative routes.

Desktop:

```text
Representative routes       109
Captured routes             109
Failed captures               0
Embedded maps                67
Loaded embedded maps         67
PNG bytes             56,338,043
Maximum document height  13,704
```

Mobile:

```text
Representative routes       109
Captured routes             109
Failed captures               0
Embedded maps                67
Loaded embedded maps         67
PNG bytes             45,846,522
Maximum document height  16,937
```

Automated visual audit:

```text
ok        true
failures  0
warnings  0
```

Screenshot artifact:

```text
ID      9035555147
Name    matsuri-full-page-screenshots-all-31304258091
SHA256  41cc29d8457023892843695706358586411c2d08ea43ce536590591133189ebf
Size    197312567 bytes
```

## Repository verification

The implementation head `e706a257484efaf5ea66ce5efc258ff21d7f08e2` passed the repository verification chain, including:

```text
Complete repository verification  31304258098
Corpus coverage                    31304258104
Detail C navigation                31304258151
Full-page screenshot review        31304258091
```

The complete repository CI generated release-candidate artifact:

```text
ID      9035501369
SHA256  e506867e1db4f596351d83168989ae41159ef55ab1f5ba97737295d083a0c6f2
```

Canonical dataset, data freshness, Relation coverage, external-link maintenance, bundle inventory, correction contract, future-site seed checks, and the Jinja guard also passed on the same implementation head.

## Deployment observation

Cloudflare Workers reported a successful `matsuri-yukue` deployment for implementation head:

```text
e706a257484efaf5ea66ce5efc258ff21d7f08e2
```

The release subsequently squash-merged as `532861f164e32847a1e6c84ce544430267ad83db`.

## Future-site boundary

Batch 35 adds no Shrine or Temple seed.

```text
Relation-backed Shrine seeds   23
Approved Jinja State Snapshots  0
```

Jinja remains blocked. This audit does not authorize `apps/jinja`, a Jinja Worker, hostname activation, publication, or any inferred Shrine Current State.

## Result

Batch 35 repository work is accepted for corpus quality:

- 大阪府 is represented by a non-sparse primary Festival record with a bounded Organization Relation, distributed route Place, Current State, two annual recurrence series, two future-dated 2026 components, year-level origin history, Sources, and claim-level Evidence;
- public Entity count is 104;
- primary prefecture coverage is 39 / 47;
- no sparse primary Entity remains;
- canonical dataset, freshness, Relations, Detail C, official-map utility, visual review, repository baseline, and complete repository CI pass;
- Jinja remains explicitly blocked.

Next gate: exact canonical-production verification for release `532861f164e32847a1e6c84ce544430267ad83db`.
