# Matsuri Batch 30 Production Verification — 2026-08-05

## Status

Passed.

## Purpose

This audit closes exact canonical-production verification for Matsuri corpus expansion Batch 30.

The production baseline is pinned to implementation release:

```text
fa9324fa433b56699c368f31cfd0943cc678bfe5
```

## Exact canonical result

Workflow run `30986772281` succeeded on attempt 1 against:

```text
https://matsuri-yukue.badjoke-lab.com
```

Verified exact counts:

| Production family | Count |
|---|---:|
| Entity | 91 |
| Change Event | 91 |
| Relation | 54 |
| Occurrence | 151 |
| Sitemap entry | 188 |

The deployed manifest counts and feed lengths matched the same values.

## Batch 30 routes

The canonical verifier confirmed HTTP 200, `text/html`, real `html`, `main`, and `h1` structure, a usable title, no robots `noindex` directive, and canonical-sitemap inclusion for:

- `/festivals/saidaiji-eyo/`;
- `/organizations/saidaiji-eyo-hosankai/`;
- `/places/saidaiji-kannonin/`;
- `/festivals/soma-nomaoi/`.

All retained Batch 22 through Batch 29 regression routes also passed.

## Required Entity and Occurrence assertions

The deployed Entity feed contains:

- `fst-saidaiji-eyo`;
- `org-saidaiji-eyo-hosankai`;
- `fst-soma-nomaoi`;
- all retained required Batch 22 through Batch 29 Entities.

The production verifier confirmed:

| Occurrence | Outcome | Scale |
|---|---|---|
| `occ-saidaiji-eyo-2026` | held | unknown |
| `occ-soma-2025` | held | unknown |

The 西大寺会陽 result is based on the municipal page marking the 2026 edition as ended. It does not infer normal completion of every published component.

The 相馬野馬追 result proves the May 24–26, 2025 edition occurred. Rider and audience counts are not used to infer normal scale.

## Change and designation boundaries

Production contains:

- the 2016 national Important Intangible Folk Cultural Property designation for 西大寺の会陽;
- the bounded 2025 相馬野馬追 format Change Event recording removal of the former women-rider condition limiting participation to unmarried riders under twenty.

The participation-rule record does not generalize beyond the published condition.

## Place boundary

The canonical site keeps 西大寺観音院 as a concrete ritual and main-venue Place with a useful embedded map. No distributed area or invented point is introduced.

## Repository verification

Pull request `#187` also passed complete repository CI in workflow run `30986772286`.

The final production baseline is stored in:

```text
config/matsuri-production-baseline.json
```

## Deployment record

The implementation merge deployed successfully through the Cloudflare Workers build for `matsuri-yukue` with production Version ID:

```text
51b6a491-95de-410a-819f-e289d4fd32d3
```

## Merge record

- implementation PR: `#185`;
- implementation merge commit: `fa9324fa433b56699c368f31cfd0943cc678bfe5`;
- corpus audit PR: `#186`;
- corpus audit merge commit: `f7ffd7c1ec7db312125c54d33e686c80969d5bee`;
- production baseline PR: `#187`;
- production baseline merge commit: `600cce53bef57ee732bfa1dd68a9f1cdcc6b2ea7`.

## Boundaries

- this audit proves deployment, route structure, feed counts, sitemap inventory, required Entities, and Occurrence values; it does not claim search-engine indexation;
- a held edition does not imply normal completion of every published component;
- 山あげ祭2026 remains unresolved without reviewed official post-event Evidence;
- the participation-rule Change Event remains bounded to the published women-rider condition;
- no Temple Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- no private Cloudflare account data or visitor-level analytics is stored.