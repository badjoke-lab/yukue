# Matsuri Corpus Expansion Batch 36 — 2026-08-09

## Status

Passed repository, corpus, freshness, Detail C, map-utility, full-page visual, seed-boundary, and deployment verification.

Exact canonical-production verification is a separate gate and is recorded separately from this corpus audit.

## Scope

Batch 36 adds 鳥取しゃんしゃん祭 as the first approved primary Matsuri record for 鳥取県.

Implementation was merged through PR #216 as:

```text
440dddc53072d515cfa5cd0d33296add44dd1af2
```

The reviewed public corpus adds:

- `fst-tottori-shanshan-matsuri` — 鳥取しゃんしゃん祭 Festival;
- `org-tottori-shanshan-shinkokai` — 鳥取しゃんしゃん祭振興会 Organization;
- `plc-tottori-fumon-hiroba` — JR鳥取駅前風紋広場 Place;
- `plc-tottori-shanshan-central-route` — 鳥取市中心市街地一斉傘踊りコース Place;
- Current State `active` from current official/public-authority information;
- one annual August 13–15 recurrence series;
- the August 13–15, 2026 edition as `scheduled / unknown`;
- the year-level 1965 start of the current 鳥取しゃんしゃん祭 name as an `other` Change Event;
- an `organized_by` Relation to 鳥取しゃんしゃん祭振興会;
- five reviewed Sources and ten claim-linked Evidence records.

The 2026 edition remains future-dated at this audit date. No held outcome or completion scale is inferred.

## Exact repository corpus

Corpus-coverage workflow run `31305710763` records:

| Family | Count |
|---|---:|
| Entities | 106 |
| Places | 97 |
| State Snapshots | 49 |
| Change Events | 98 |
| Occurrences | 158 |
| Occurrence Series | 50 |
| Recurrence Patterns | 50 |
| Relations | 63 |
| Designations | 29 |
| Sources | 273 |
| Evidence | 623 |

Entity types are:

```text
Festival          42
Folk Performance   8
Organization      32
Shrine reference  23
Tradition Unit     1
```

Current approved Festival / Folk Performance states are:

```text
active      48
suspended    1
```

No sparse primary Entity remains under the current corpus-coverage rule.

Repository maintenance baseline:

```text
F1 batches                    13
Maintenance bundles           80
Correction bundles            21
Additive application slots    93
Correction application slots  21
Correction records            35
Corrected logical IDs         32
Public Entities              106
Entities without external links 0
```

Corpus artifact:

```text
ID      9035878349
SHA256  1621705e7041b90ca2f10a8cfd0597faca2dc2897d341ad6c5896e33a7f67cb5
```

## Geographic coverage

Batch 36 moves primary-record prefecture coverage from 39 to 40 prefectures.

鳥取県 is now covered through 鳥取しゃんしゃん祭.

Seven prefectures remain without an approved primary Matsuri record:

```text
群馬県
新潟県
長野県
兵庫県
和歌山県
山口県
宮崎県
```

## Detail C and map contract

The final implementation build generated:

```text
Entities          106
Change Events      98
Relations          63
Occurrences       158
HTML routes       213
Pagefind records  106
```

Required new Detail C routes are:

```text
/festivals/tottori-shanshan-matsuri/
/organizations/tottori-shanshan-shinkokai/
/places/tottori-fumon-hiroba/
/places/tottori-shanshan-central-route/
```

Detail C navigation workflow `31305710750` passed, including exhaustive Chromium navigation.

The distributed central-city route deliberately remains non-point geometry rather than fabricating a coordinate. Reviewed official/public-authority location information is used through the existing map contract, including the concrete 風紋広場 anchor.

Map-utility artifact `9035890974` records:

```text
Place-bearing details   162
Useful anchored maps    131
Explicit location gaps   31
Entity anchors            73
Place anchors             58
```

All required Festival / Folk Performance records satisfy the map contract. The remaining location gaps are non-primary-detail research items and do not authorize invented coordinates.

Map artifact:

```text
ID      9035890974
SHA256  035eaba1bdb9d138b3e2f5303c0afc91632aa5049b70a0700428bdaa0a7fbc70
```

## Full-page visual verification

Full-page screenshot workflow run `31305710755` passed.

Both device profiles covered the same 213 generated HTML routes and selected 109 representative routes.

Desktop:

```text
Representative routes       109
Captured routes             109
Failed captures               0
Embedded maps                67
Loaded embedded maps         67
PNG bytes             56,045,240
Maximum document height  14,264
```

Mobile:

```text
Representative routes       109
Captured routes             109
Failed captures               0
Embedded maps                67
Loaded embedded maps         67
PNG bytes             45,537,414
Maximum document height  17,676
```

Automated visual audit:

```text
ok        true
failures  0
warnings  0
```

Screenshot artifact:

```text
ID      9035984109
Name    matsuri-full-page-screenshots-all-31305710755
SHA256  2c359421598c028357165ec5d5c70fe7a8500df57131e862e9fae0a80c0f60fc
Size    196982676 bytes
```

## Repository verification

The implementation head `d2a4866be15af1dc0bb9b5fa04c70d03617ef9b4` passed the repository verification chain, including:

```text
Complete repository verification  31305710752
Corpus coverage                    31305710763
Detail C navigation                31305710750
Full-page screenshot review        31305710755
```

The complete repository CI generated release-candidate artifact:

```text
ID      9035942413
SHA256  bc8a8cc2713d5db2255a904db09ed82d352d61d8b6fdbcdc7e18df5fad4b76f9
```

Canonical dataset, data freshness, Relation coverage, external-link maintenance, bundle inventory, correction contract, future-site seed checks, and the Jinja guard also passed on the same implementation head.

## Deployment observation

Cloudflare Workers reported a successful `matsuri-yukue` deployment for implementation head:

```text
d2a4866be15af1dc0bb9b5fa04c70d03617ef9b4
```

The release subsequently squash-merged as `440dddc53072d515cfa5cd0d33296add44dd1af2`.

## Future-site boundary

Batch 36 adds no Shrine or Temple seed.

```text
Relation-backed Shrine seeds   23
Approved Jinja State Snapshots  0
```

Jinja remains blocked. This audit does not authorize `apps/jinja`, a Jinja Worker, hostname activation, publication, or any inferred Shrine Current State.

## Result

Batch 36 repository work is accepted for corpus quality:

- 鳥取県 is represented by a non-sparse primary Festival record with a bounded Organization Relation, two Places, Current State, annual recurrence, one future-dated 2026 edition, year-level start history, Sources, and claim-level Evidence;
- public Entity count is 106;
- primary prefecture coverage is 40 / 47;
- no sparse primary Entity remains;
- canonical dataset, freshness, Relations, Detail C, map utility, visual review, repository baseline, deployment, and complete repository CI pass;
- Jinja remains explicitly blocked.

Next gate: exact canonical-production verification for release `440dddc53072d515cfa5cd0d33296add44dd1af2`.
