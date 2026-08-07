# Matsuri Corpus Expansion Batch 32 — 2026-08-07

## Status

Passed repository, corpus, freshness, Detail C, map, visual, seed-boundary, and deployment verification.

Canonical-production verification remains a separate gate and is not claimed by this audit.

## Scope

Batch 32 combines one due maintenance cycle with one breadth expansion:

1. close the due 2026 弘前ねぷたまつり and 秋田竿燈まつり Occurrences from reviewed official Evidence without inferring normal completion or scale;
2. add 唐津くんち as the first approved primary Matsuri record for 佐賀県, with organization, Shrine-reference, Place, annual Occurrence, designation, Relation, and claim-specific Evidence depth.

Implementation was merged through:

```text
Due occurrence reviews   PR #194  808344e877bb982396f0a27388320735eef41449
Karatsu breadth          PR #195  f51eb0308233faa5d2177b654cd582e0bd6136ae
```

## Due 2026 Occurrence maintenance

The scheduled 2026 records for 弘前ねぷたまつり and 秋田竿燈まつり reached their dated review boundary.

The correction contract was used rather than mutating earlier maintenance bundles.

```text
弘前ねぷたまつり  occ-hirosaki-neputa-2026-schedule  version 2  held / unknown
秋田竿燈まつり    occ-akita-kanto-2026-schedule       version 2  held / unknown
```

The original schedule Evidence remains attached. New official post-schedule or in-period operational Evidence was added in `maintenance-67.json` and `maintenance-68.json`; the complete replacement Occurrences are in `corrections-18.json` and `corrections-19.json`.

The Evidence establishes that the 2026 editions occurred. It does not establish that every published component completed normally, and both records therefore retain `scale: unknown`.

After the corrections, the dedicated Matsuri freshness workflow passed with zero closed unresolved Occurrences.

## Karatsu Kunchi breadth expansion

Batch 32 adds 唐津くんち as the first approved primary Matsuri record for 佐賀県.

The reviewed public corpus adds:

- `fst-karatsu-kunchi` — 唐津くんち Festival;
- `org-karatsu-hikiyama-torishimarikai` — 唐津曳山取締会 Organization;
- `shr-karatsu-jinja` — 唐津神社 State-free Shrine reference seed;
- `plc-karatsu-jinja` — concrete ritual Place;
- `plc-karatsu-kunchi-route` — distributed procession-route Place;
- `occ-karatsu-kunchi-2025` — held 2025 edition with `scale: unknown`;
- `chg-karatsu-kunchi-national-designation-1980` — January 28, 1980 national designation Change Event;
- `des-karatsu-kunchi-national` — national Important Intangible Folk Cultural Property Designation;
- `maintained_by` Relation to 唐津曳山取締会;
- `ritually_associated_with` Relation to 唐津神社.

The distributed procession route intentionally carries area-level Place semantics rather than an invented single map point.

No 2026 唐津くんち Occurrence is inferred. No Shrine Current State, legal-person State, or Jinja publication claim is created.

## Exact repository corpus

The Batch 32 corpus-coverage artifact records:

| Family | Count |
|---|---:|
| Entities | 97 |
| Places | 91 |
| State Snapshots | 45 |
| Change Events | 94 |
| Occurrences | 153 |
| Occurrence Series | 45 |
| Recurrence Patterns | 45 |
| Relations | 58 |
| Designations | 28 |
| Sources | 253 |
| Evidence | 580 |

Entity types are:

| Entity type | Count |
|---|---:|
| Festival | 38 |
| Folk Performance | 8 |
| Organization | 28 |
| Shrine reference | 22 |
| Tradition Unit | 1 |

Current approved Festival / Folk Performance state distribution remains:

```text
active      44
suspended    1
```

No sparse primary Entity remains under the current corpus-coverage rule.

## Geographic coverage

Batch 32 moves primary-record prefecture coverage from 35 to 36 prefectures.

佐賀県 is now covered through 唐津くんち.

Eleven prefectures remain without an approved primary Matsuri record:

```text
群馬県
神奈川県
新潟県
長野県
大阪府
兵庫県
和歌山県
鳥取県
山口県
宮崎県
鹿児島県
```

## Detail C and generated public surface

The release-candidate artifact records:

```text
Entities          97
Change Events     94
Relations         58
Occurrences       153
Sitemap entries   198
```

The build generated 198 HTML routes and Pagefind indexed 97 Matsuri records with direct detail URLs.

Required new Detail C routes include:

```text
/festivals/karatsu-kunchi/
/organizations/karatsu-hikiyama-torishimarikai/
/references/shrines/karatsu-jinja/
/places/karatsu-jinja/
/places/karatsu-kunchi-route/
```

The dedicated Detail C Chromium and map-utility workflow passed for the new and retained public surface.

## Visual verification

Full-page screenshot workflow run `31198044621` passed.

For both desktop and mobile:

```text
Generated HTML routes       198
Representative routes       109
Captured routes             109
Failed captures             0
Embedded maps               67
Loaded embedded maps        67
```

The automated screenshot audit returned:

```text
ok        true
failures  0
warnings  0
```

Artifact:

```text
ID      9001943861
Name    matsuri-full-page-screenshots-all-31198044621
SHA256  23cae2f5de16ffbf55c5d6e319d5b06847cb362b5dd56afaab30499061bd2cf8
```

The workflow generated desktop and mobile contact sheets. This automated record establishes complete capture and mechanical visual-contract checks; it is not a claim of subjective visual perfection.

## Verification workflows

The Batch 32 breadth PR passed the repository verification set, including:

```text
Complete repository verification       31198044360
Canonical dataset                       31198043955
Corpus coverage                         31198044105
Data freshness                          31198044620
Relation coverage                       31198044237
Detail C Chromium and map utility       31198044791
Bundle inventory / baseline             31198044181
Future-site seed inventory              31198044317
Future-site seed readiness              31198044612
Jinja start gate                        31198044099
Full-page screenshot review             31198044621
```

Release-candidate artifact:

```text
ID      9001778574
SHA256  6c208643d6304427b8dd7c11df12dfb753dbb70da0f7044f2084b262ff7578fc
```

Corpus-coverage artifact:

```text
ID      9001636561
SHA256  950983be8b9f90a6b22484cd7618c63f82a22138b311f20dc9157521190bb240
```

Detail C map-utility artifact:

```text
ID      9001686207
SHA256  c1ea792e21718e60f74e894b2cad2537c33530bf3d82ed88a009b4c87b617f96
```

## Deployment observation

The Cloudflare Workers integration reported a successful `matsuri-yukue` deployment for implementation head:

```text
ecbe8280fb6b20157297a7c3235fad8b1e9374dd
```

The implementation was then merged to `main` as:

```text
f51eb0308233faa5d2177b654cd582e0bd6136ae
```

This deployment observation does not replace exact canonical-production verification. The production baseline must be advanced and checked separately before Batch 32 production is declared verified.

## Future-site boundary

The new 唐津神社 reference advances the blocked Jinja seed baseline to:

```text
Relation-backed Shrine seeds   22
Direct identity Evidence       26
Place references               22
Approved Jinja State Snapshots 0
```

Jinja remains blocked. This audit does not authorize `apps/jinja`, a Jinja Worker, hostname activation, publication, or any inferred Shrine Current State.

## Result

Batch 32 repository work is accepted for corpus and maintenance quality:

- both due August Occurrences are no longer stale `scheduled` records;
- freshness has returned to a clean state;
- 佐賀県 is represented by a non-sparse primary record with history, Occurrence, designation, organization, Shrine Relation, Places, Sources, and Evidence;
- public Entity count is 97;
- primary prefecture coverage is 36 / 47;
- no sparse primary Entity remains;
- Detail C, maps, machine-readable output, and visual artifacts pass;
- Jinja remains explicitly blocked.

Next gate: exact canonical-production verification for the Batch 32 release.
