# Matsuri Batch 32 Production Verification — 2026-08-08

## Status

Passed.

## Purpose

This audit closes exact canonical-production verification for Matsuri corpus expansion Batch 32 after the dated Aomori Nebuta 2026 maintenance rollover discovered by the repository freshness gate.

The final production baseline is pinned to the post-maintenance data release:

```text
15da1b287724a415042610c64852670cda6a7da8
```

## Exact canonical result

Workflow run `31259211574` succeeded on attempt 1 against:

```text
https://matsuri-yukue.badjoke-lab.com
```

Verified exact counts:

| Production family | Count |
|---|---:|
| Entity | 97 |
| Change Event | 94 |
| Relation | 58 |
| Occurrence | 153 |
| Sitemap entry | 198 |

The deployed manifest counts and feed lengths matched the same baseline.

## Batch 32 routes

The canonical verifier confirmed the required HTML, title, indexability-preflight, and sitemap contract for the new Saga breadth routes:

- `/festivals/karatsu-kunchi/`;
- `/organizations/karatsu-hikiyama-torishimarikai/`;
- `/references/shrines/karatsu-jinja/`;
- `/places/karatsu-jinja/`;
- `/places/karatsu-kunchi-route/`.

All retained regression routes from earlier production baselines also passed.

## Required Entity and Occurrence assertions

The deployed Entity feed contains:

- `fst-karatsu-kunchi`;
- `org-karatsu-hikiyama-torishimarikai`;
- `shr-karatsu-jinja`;
- all retained required Entities from earlier production baselines.

The production verifier confirmed:

| Occurrence | Record version | Outcome | Scale |
|---|---:|---|---|
| `occ-hirosaki-neputa-2026-schedule` | 2 | held | unknown |
| `occ-akita-kanto-2026-schedule` | 2 | held | unknown |
| `occ-aomori-nebuta-2026-schedule` | 2 | held | unknown |
| `occ-karatsu-kunchi-2025` | 1 | held | unknown |

The three 2026 rollover records retain their original schedule Evidence and add reviewed official operational or post-schedule Evidence. `held` does not imply that every published component completed normally, and `scale: unknown` is retained where normal scale is not established by the reviewed Evidence.

## Aomori dated-maintenance correction

The first Batch 32 production-baseline attempt was intentionally not merged. Repository launch-readiness correctly detected `occ-aomori-nebuta-2026-schedule` as past its published end date while still marked `scheduled` on August 8.

PR `#198` then:

- added reviewed official final-day operational Evidence;
- replaced the Occurrence with record version 2;
- changed the result to `held / unknown`;
- registered the new maintenance and correction bundles in both canonical-dataset loaders;
- refreshed the repository maintenance baseline.

The correction does not infer normal scale or complete execution of every August 2–7 component.

The stale production-baseline PR `#197` was closed unmerged and superseded by `#199`.

## Batch 32 corpus position

Batch 32 adds 唐津くんち as the first approved primary Matsuri record for 佐賀県 and advances primary-record prefecture coverage to:

```text
36 / 47 prefectures
```

Eleven prefectures remain uncovered:

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

No sparse primary Entity remains under the current corpus-coverage rule.

## Repository verification

The final production-baseline PR `#199` passed complete repository CI in workflow run `31259211560`.

The post-Aomori implementation release on `main` also passed repository launch-readiness in workflow run `31259086179`.

The final machine-checked production baseline is stored in:

```text
config/matsuri-production-baseline.json
```

## Deployment record

The post-Aomori implementation release deployed successfully through the Cloudflare Workers build for `matsuri-yukue` with production Version ID:

```text
41288ff6-c21f-41f2-932e-89b09369df61
```

## Merge record

- due-occurrence maintenance PR: `#194`;
- due-occurrence merge commit: `808344e877bb982396f0a27388320735eef41449`;
- Karatsu breadth PR: `#195`;
- Karatsu implementation merge commit: `f51eb0308233faa5d2177b654cd582e0bd6136ae`;
- corpus audit PR: `#196`;
- corpus audit merge commit: `f73f190d9ffff7149972f9857b8eb16310fcbe55`;
- Aomori dated-maintenance PR: `#198`;
- post-maintenance implementation merge commit: `15da1b287724a415042610c64852670cda6a7da8`;
- production baseline PR: `#199`;
- production baseline merge commit: `e57de2d9bb1ab223846148d9686addafab6e7322`.

## Boundaries

- this audit proves deployment, route structure, feed counts, sitemap inventory, required Entities, and reviewed Occurrence values; it does not claim search-engine indexation;
- held editions do not imply normal completion of every published component;
- no 2026 唐津くんち Occurrence is inferred;
- no Shrine Current State or legal-person State is inferred;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- no private Cloudflare account data or visitor-level analytics is stored.

## Result

Batch 32 exact canonical-production verification is complete. The next product track is Matsuri corpus expansion Batch 33 while stabilization remains in observation until its separate review gate becomes eligible and all required evidence is recorded.
