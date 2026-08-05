# Matsuri Batch 28 Production Verification — 2026-08-05

## Status

Passed.

## Purpose

This audit closes exact canonical-production verification for Matsuri corpus expansion Batch 28.

The production baseline is pinned to implementation release:

```text
a61091fd0d335e5dc77b79835ef40f57dbb3c964
```

## Exact canonical result

Workflow run `30970730701` succeeded on attempt 1 against:

```text
https://matsuri-yukue.badjoke-lab.com
```

Verified exact counts:

| Production family | Count |
|---|---:|
| Entity | 87 |
| Change Event | 87 |
| Relation | 52 |
| Occurrence | 143 |
| Sitemap entry | 181 |

The deployed manifest counts and feed lengths matched the same values.

## Batch 28 routes

The canonical verifier confirmed HTTP 200, `text/html`, real `html`, `main`, and `h1` structure, a usable title, no robots `noindex` directive, and canonical-sitemap inclusion for:

- `/festivals/niihama-taiko-matsuri/`;
- `/organizations/niihama-taiko-matsuri-promotion-committee/`;
- `/places/niihama-taiko-citywide/`;
- `/places/yamane-civic-ground/`;
- `/festivals/aso-onda-matsuri/`.

All retained Batch 22 through Batch 27 regression routes also passed.

## Required Entity and Occurrence assertions

The deployed Entity feed contains:

- `fst-niihama-taiko-matsuri`;
- `org-niihama-taiko-matsuri-promotion-committee`;
- all retained required Batch 22 through Batch 27 Entities.

The production verifier confirmed:

| Occurrence | Outcome | Scale |
|---|---|---|
| `occ-niihama-taiko-2020` | cancelled | unknown |
| `occ-niihama-taiko-2021` | not_held | unknown |
| `occ-niihama-taiko-2022` | held | modified |
| `occ-niihama-taiko-2025` | held | modified |

The 2020 and 2021 assertions cover public 太鼓台運行 and do not imply disappearance of local rites or the broader cultural tradition. The 2025 assertion remains modified because the festival was held while one major factory-front かきくらべ was removed.

## Aso designation boundary

The retained `/festivals/aso-onda-matsuri/` route is present in the deployed canonical site together with the new 1982 designation-history Change Event and Designation record.

The public record states that 御田祭 is a component of the nationally designated 阿蘇の農耕祭事 group. It does not claim a standalone designation for 御田祭.

## Repository verification

Pull request `#179` also passed complete repository CI in workflow run `30970730689`.

The final production baseline is stored in:

```text
config/matsuri-production-baseline.json
```

## Merge record

- implementation PR: `#177`;
- implementation merge commit: `a61091fd0d335e5dc77b79835ef40f57dbb3c964`;
- corpus audit PR: `#178`;
- corpus audit merge commit: `06b54e8da7b5b627a00b898db5994c79fdf2c6be`;
- production baseline PR: `#179`;
- production baseline merge commit: `c72d42f76c78588074b70fe02ac59c67389648b5`.

## Boundaries

- this audit proves deployment, route structure, feed counts, sitemap inventory, required Entities, and Occurrence values; it does not claim search-engine indexation;
- distributed and concrete 新居浜 Places remain distinct;
- the 2020–2022 interruption and return apply to public 太鼓台運行;
- the 2025 format change does not become a whole-festival cancellation;
- the Aso addition remains group-level designation history rather than a new Current State claim;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- no private Cloudflare account data or visitor-level analytics is stored.
