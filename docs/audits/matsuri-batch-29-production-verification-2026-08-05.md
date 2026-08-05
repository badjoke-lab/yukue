# Matsuri Batch 29 Production Verification — 2026-08-05

## Status

Passed.

## Purpose

This audit closes exact canonical-production verification for Matsuri corpus expansion Batch 29.

The production baseline is pinned to implementation release:

```text
19990018ff19f07132c2b5f1fdf86608a00c9384
```

## Exact canonical result

Workflow run `30977619250` succeeded on attempt 1 against:

```text
https://matsuri-yukue.badjoke-lab.com
```

Verified exact counts:

| Production family | Count |
|---|---:|
| Entity | 89 |
| Change Event | 89 |
| Relation | 53 |
| Occurrence | 149 |
| Sitemap entry | 185 |

The deployed manifest counts and feed lengths matched the same values.

## Batch 29 routes

The canonical verifier confirmed HTTP 200, `text/html`, real `html`, `main`, and `h1` structure, a usable title, no robots `noindex` directive, and canonical-sitemap inclusion for:

- `/festivals/hamamatsu-matsuri/`;
- `/organizations/hamamatsu-matsuri-committee/`;
- `/places/hamamatsu-nakatajima-kite-ground/`;
- `/places/hamamatsu-central-city-area/`;
- `/festivals/nunobashi-kanjoe/`.

All retained Batch 22 through Batch 28 regression routes also passed.

## Required Entity and Occurrence assertions

The deployed Entity feed contains:

- `fst-hamamatsu-matsuri`;
- `org-hamamatsu-matsuri-committee`;
- all retained required Batch 22 through Batch 28 Entities.

The production verifier confirmed:

| Occurrence | Outcome | Scale |
|---|---|---|
| `occ-hamamatsu-matsuri-2020` | cancelled | unknown |
| `occ-hamamatsu-matsuri-2021` | held | modified |
| `occ-hamamatsu-matsuri-2022` | held | modified |
| `occ-hamamatsu-matsuri-2026` | held | unknown |
| `occ-nunobashi-2022` | held | modified |
| `occ-nunobashi-2026` | scheduled | unknown |

The 2021 Hamamatsu assertion represents the no-spectator kite-only return. The 2022 assertion remains modified because general spectators returned while the central night action remained cancelled. The held 2026 record does not infer normal completion of every published component.

The 2026 Nunobashi record remains scheduled because the September 27 occurrence window has not closed. Production verification does not convert a published schedule into a held result.

## Place boundaries

The canonical site keeps:

- 中田島凧揚げ会場 as a concrete mapped Place;
- the central-city 御殿屋台 operating area as a distributed Place with an explicit no-map explanation.

The production verifier proves both routes without collapsing the distributed area into a false point.

## Repository verification

Pull request `#183` also passed complete repository CI in workflow run `30977619245`.

The final production baseline is stored in:

```text
config/matsuri-production-baseline.json
```

## Deployment record

The implementation merge deployed successfully through the Cloudflare Workers build for `matsuri-yukue` with production Version ID:

```text
86a1d182-3e3d-4388-8793-66a10e731d8e
```

## Merge record

- implementation PR: `#181`;
- implementation merge commit: `19990018ff19f07132c2b5f1fdf86608a00c9384`;
- corpus audit PR: `#182`;
- corpus audit merge commit: `37f00213b83a5112e51bbe080954ce6aeaab4ff0`;
- production baseline PR: `#183`;
- production baseline merge commit: `fdb16951cbbd8fb43429ceb0750fa0bcf56807dc`.

## Boundaries

- this audit proves deployment, route structure, feed counts, sitemap inventory, required Entities, and Occurrence values; it does not claim search-engine indexation;
- concrete and distributed Hamamatsu Places remain distinct;
- the 2020 cancellation and 2021–2022 modified returns are edition-bounded;
- the held 2026 Hamamatsu edition does not imply normal completion of every component;
- the 2026 Nunobashi edition remains scheduled until result Evidence is reviewed;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- no private Cloudflare account data or visitor-level analytics is stored.
