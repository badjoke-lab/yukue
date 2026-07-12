# Matsuri F2-M02 相馬野馬追 2026 Outcome Review

**Audit date:** 2026-07-12  
**Status:** Closed-period unresolved Occurrence resolved  
**Subject:** `occ-soma-2026-schedule` — 相馬野馬追 2026

## Previous state

The first F2-M02 pass retained:

```text
outcome: unknown
scale: unknown
```

The official event schedule established the planned period from 2026-05-23 through 2026-05-25, but it did not establish the post-event result.

## Post-event evidence

南相馬市 publishes an official `みなみそうまトピックス` entry titled:

```text
〖令和8年5月23,24,25日〗相馬野馬追
```

Source:

```text
src-minamisoma-soma-nomaoi-2026-topics
https://www.city.minamisoma.lg.jp/portal/admin/koho_kocho/1/minamisomatopics/31294.html
```

The municipality's topic archive lists the event across all three scheduled dates. This is post-event public-authority evidence that the 2026 multi-day occurrence was held.

The record does not provide enough structured evidence to classify whether the full edition was normal, reduced, expanded, or modified in scale.

## Correction

`occ-soma-2026-schedule` is upgraded to record version 3:

```text
outcome: held
scale: unknown
```

Preserved fields:

- scheduled period,
- four recorded venue Places,
- organizer Entity,
- annual series membership,
- schedule Evidence.

Added Evidence:

```text
evd-soma-occ-2026-held
```

## Resulting freshness inventory

```text
Occurrences total                  24
Resolved Occurrences               15
Closed-period unresolved            0
In-progress scheduled               2
Future scheduled                    7
```

The initial closed-period unresolved inventory is now empty.

## Boundary

This correction does not:

- infer a normal scale from the fact of holding,
- alter the long-term active Entity State,
- create separate component Occurrences without component-level post-event Evidence,
- change any domain or canonical-origin setting,
- submit a sitemap,
- enable Analytics,
- advance F2-19 through F2-28.
