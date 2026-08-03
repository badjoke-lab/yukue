# Matsuri Batch 27 Production Verification — 2026-08-03

## Status

Passed.

## Purpose

This audit closes exact canonical-production verification for Matsuri corpus expansion Batch 27.

The production baseline is pinned to implementation release:

```text
43b8d7a6ee800bb1e9ab7333698ea4be2ccbfd88
```

## Exact canonical result

Workflow run `30836041342` succeeded on attempt 1 against:

```text
https://matsuri-yukue.badjoke-lab.com
```

Verified exact counts:

| Production family | Count |
|---|---:|
| Entity | 85 |
| Change Event | 83 |
| Relation | 51 |
| Occurrence | 139 |
| Sitemap entry | 177 |

The deployed manifest counts and feed lengths matched the same values.

## Batch 27 routes

The canonical verifier confirmed HTTP 200, `text/html`, real `html`, `main`, and `h1` structure, a usable title, no robots `noindex` directive, and canonical-sitemap inclusion for:

- `/festivals/sanuki-takamatsu-matsuri/`;
- `/organizations/takamatsu-matsuri-shinkokai/`;
- `/places/takamatsu-chuo-koen/`;
- `/places/anabuki-arena-kagawa/`;
- `/places/sanport-takamatsu-multipurpose-square/`;
- `/performances/take-kagura/`;
- `/performances/ootsugunai-kagura/`.

All retained Batch 22 through Batch 26 regression routes also passed.

## Required Entity and Occurrence assertions

The deployed Entity feed contains:

- `fst-sanuki-takamatsu-matsuri`;
- `org-takamatsu-matsuri-shinkokai`;
- all retained required Batch 22 through Batch 26 Entities.

The production verifier confirmed:

| Occurrence | Outcome | Scale |
|---|---|---|
| `occ-sanuki-takamatsu-2022` | held | unknown |
| `occ-sanuki-takamatsu-2025` | held | modified |
| `occ-sanuki-takamatsu-2026` | scheduled | modified |

The 2026 record remains scheduled because the August 12–14 occurrence window has not closed. Production verification does not convert a published schedule into a held result.

## Repository verification

Pull request `#175` also passed complete repository CI in workflow run `30836041391`.

The final production baseline is stored in:

```text
config/matsuri-production-baseline.json
```

The canonical-origin workflow now directly includes this baseline file in its pull-request path trigger. Future baseline changes cannot bypass exact production verification merely because the verifier script itself is unchanged.

## Merge record

- implementation PR: `#173`;
- implementation merge commit: `43b8d7a6ee800bb1e9ab7333698ea4be2ccbfd88`;
- corpus audit PR: `#174`;
- corpus audit merge commit: `66496d508db74d1981d6c4fef7122cd2015b8213`;
- production baseline PR: `#175`;
- production baseline merge commit: `cd7a496c2d842761280da668c33f757452c2540c`.

## Boundaries

- this audit proves deployment, route structure, feed counts, sitemap inventory, required Entities, and Occurrence values; it does not claim search-engine indexation;
- the 2026 Takamatsu edition remains `scheduled / modified` until result Evidence is reviewed;
- historical and current Takamatsu venues remain separate Place records;
- the Hayachine additions remain designation-history Events rather than new Current State claims;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- no private Cloudflare account data or visitor-level analytics is stored.
