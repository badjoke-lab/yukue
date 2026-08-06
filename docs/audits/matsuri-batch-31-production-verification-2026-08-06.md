# Matsuri Batch 31 Production Verification — 2026-08-06

## Status

Passed.

## Purpose

This audit closes exact canonical-production verification for Matsuri corpus expansion Batch 31.

The production baseline is pinned to implementation release:

```text
db42b01620f7a4d183c22a7a0088e899df7f54d7
```

## Exact canonical result

Workflow run `31069415726` succeeded on attempt 1 against:

```text
https://matsuri-yukue.badjoke-lab.com
```

Verified exact counts:

| Production family | Count |
|---|---:|
| Entity | 94 |
| Change Event | 93 |
| Relation | 56 |
| Occurrence | 152 |
| Sitemap entry | 193 |

The deployed manifest counts and feed lengths matched the same values.

## Batch 31 routes

The canonical verifier confirmed HTTP 200, `text/html`, real `html`, `main`, and `h1` structure, usable titles, no robots `noindex` directive, and canonical-sitemap inclusion for:

- `/festivals/mikuni-matsuri/`;
- `/organizations/mikuni-matsuri-hozon-shinkokai/`;
- `/references/shrines/mikuni-jinja/`;
- `/places/mikuni-jinja/`;
- `/places/mikuni-matsuri-route/`;
- `/festivals/nunokawa-hana-matsuri/`.

All retained Batch 22 through Batch 30 regression routes also passed.

## Required Entity and Occurrence assertions

The deployed Entity feed contains:

- `fst-mikuni-matsuri`;
- `org-mikuni-matsuri-hozon-shinkokai`;
- `shr-mikuni-jinja`;
- `fst-nunokawa-hana-matsuri`;
- all retained required Batch 22 through Batch 30 Entities.

The production verifier confirmed:

| Occurrence | Outcome | Scale |
|---|---|---|
| `occ-mikuni-matsuri-2026` | held | unknown |

The 2026 result combines the official May 19–21 schedule with official post-event photo-contest results. It does not infer normal completion or normal scale for every component.

## Change and designation boundaries

Production contains:

- the April 25, 2006 福井県指定無形民俗文化財 designation for 三国祭;
- the May 4, 1976 national Important Intangible Folk Cultural Property designation linked to 布川地区花祭 through the national database naming 布川花祭保存会 among the protection groups.

## Place and seed boundaries

- 三國神社 remains a State-free Shrine reference seed;
- the concrete 三國神社 Place renders a useful embedded map;
- 三国祭山車巡行区域 remains a distributed route with an explicit no-map explanation rather than a false point.

## Repository verification

Pull request `#191` also passed complete repository CI in workflow run `31069415723`.

The final production baseline is stored in:

```text
config/matsuri-production-baseline.json
```

## Deployment record

The implementation merge deployed successfully through the Cloudflare Workers build for `matsuri-yukue` with production Version ID:

```text
c93454fd-2980-4eff-9bf3-7f71ea767926
```

## Merge record

- implementation PR: `#189`;
- implementation merge commit: `db42b01620f7a4d183c22a7a0088e899df7f54d7`;
- corpus audit PR: `#190`;
- corpus audit merge commit: `21491430b79582e9a11b1d5af12411a6a2662cbf`;
- production baseline PR: `#191`;
- production baseline merge commit: `04ee5eada3c155ca128ca02fcf420afc194ba760`.

## Boundaries

- this audit proves deployment, route structure, feed counts, sitemap inventory, required Entities, and Occurrence values; it does not claim search-engine indexation;
- a held edition does not imply normal completion of every published component;
- 山あげ祭2026 remains unresolved without reviewed official post-event Evidence;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- no private Cloudflare account data or visitor-level analytics is stored.
