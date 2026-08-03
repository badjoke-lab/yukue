# Matsuri Batch 26 Production Verification — 2026-08-03

## Status

Passed.

## Purpose

This audit closes the canonical-production verification for Matsuri corpus expansion Batch 26 and the follow-up 佐陀神能 Place-route correction.

The production baseline is pinned to correction release:

```text
c0e1ba0b2a7d928f75257084f7261c05bdfacd1f
```

## Root issue closed

Batch 26 added `plc-shimane-art-museum-hall` and referenced it from the held 2026 佐陀神能 special-public-performance Occurrence. The parent Entity initially retained only 佐太神社 in `default_place_ids`, so the Place existed in machine-readable data but no Place detail route was generated.

Pull request `#169` added ordered correction `corrections-17.json`, retained 佐太神社 as the primary ritual and transmission anchor, represented reviewed special performances as multi-site, and generated the missing Place detail, map, reverse link, individual JSON, and sitemap entry.

## Exact canonical result

Workflow run `30784595416` succeeded on attempt 1 against:

```text
https://matsuri-yukue.badjoke-lab.com
```

Verified exact counts:

| Production family | Count |
|---|---:|
| Entity | 83 |
| Change Event | 78 |
| Relation | 50 |
| Occurrence | 136 |
| Sitemap entry | 172 |

The deployed manifest counts and feed lengths matched the same values.

## Corrected route

The canonical verifier confirmed:

```text
/places/shimane-art-museum-hall/  HTTP 200  text/html
```

The route also passed the required HTML contract:

- real `html` element;
- one generated `main` surface;
- generated `h1`;
- usable document title;
- no robots `noindex` directive;
- inclusion in the canonical sitemap;
- point-map rendering and reverse navigation verified separately by the Detail C and visual workflows.

## Retained Batch 26 routes

The exact production run also reverified the retained Batch 26 surfaces:

- 長浜曳山祭 Festival detail;
- State-free 長濱八幡宮 reference page;
- 公益財団法人長浜曳山文化協会 Organization detail;
- 長濱八幡宮 Place detail;
- route-based 長浜市街地巡行区域 Place detail;
- 佐陀神能 Folk Performance detail.

All returned HTTP 200 with the required HTML structure and no robots `noindex` directive.

## Required Entity and Occurrence assertions

The deployed feed contains all required Batch 22 through Batch 26 Entities, including:

- `fst-nagahama-hikiyama-matsuri`;
- `shr-nagahama-hachimangu`;
- `org-nagahama-hikiyama-cultural-association`.

The production verifier rechecked the reviewed Batch 26 Occurrences:

| Occurrence | Outcome | Scale |
|---|---|---|
| `occ-nagahama-hikiyama-2022` | held | modified |
| `occ-nagahama-hikiyama-2024` | held | normal |
| `occ-nagahama-hikiyama-2026` | held | unknown |
| `occ-sada-shin-noh-special-2022` | held | modified |
| `occ-sada-shin-noh-special-2026` | held | unknown |

## Repository verification

Pull request `#171` also passed complete repository CI in workflow run `30784595452`.

The final production baseline is stored in:

```text
config/matsuri-production-baseline.json
```

The baseline requires release `c0e1ba0b2a7d928f75257084f7261c05bdfacd1f`, exact counts `83 / 78 / 50 / 136 / 172`, the corrected museum-hall route, all retained regression routes, required Entities, and reviewed Occurrence outcomes.

## Merge record

- correction PR: `#169`;
- correction merge commit: `c0e1ba0b2a7d928f75257084f7261c05bdfacd1f`;
- audit amendment PR: `#170`;
- production baseline PR: `#171`;
- production baseline merge commit: `3a1760a2fee3760305139c20b69868f93c474bd1`.

## Boundaries

- this audit proves deployment and route correctness, not search-engine indexation;
- 佐太神社 remains the primary ritual and transmission anchor;
- special public performances remain distinct from the annual 御座替祭 series;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- no private Cloudflare account data or visitor-level analytics is stored.
