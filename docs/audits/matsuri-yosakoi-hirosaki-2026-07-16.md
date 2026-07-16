# Matsuri 2026 YOSAKOI and Hirosaki Maintenance Audit

**Date:** 2026-07-16  
**Status:** Maintenance batch 07 / passed

## Scope

This maintenance batch adds two approved 2026 Occurrence records that were missing from the current Matsuri corpus:

```text
YOSAKOIソーラン祭り 2026   held      2026-06-10 through 2026-06-14
弘前ねぷたまつり 2026      scheduled 2026-08-01 through 2026-08-07
```

## YOSAKOIソーラン 2026

The official organization published the 第35回開催結果 on 2026-06-16. It states that the festival was held over five days from 2026-06-10 through 2026-06-14 and concluded safely.

Recorded values:

```text
Occurrence ID  occ-yosakoi-soran-2026
Outcome        held
Scale          unknown
```

The source supports the occurrence dates and held outcome. It does not provide a value mapped to the repository's structured scale vocabulary, so `unknown` is retained rather than inferring `normal` or `expanded`.

## 弘前ねぷた 2026

The official tourism page publishes the 令和8年度 schedule and the annual August 1 through August 7 program.

Recorded values:

```text
Occurrence ID  occ-hirosaki-neputa-2026-schedule
Outcome        scheduled
Scale          unknown
```

The event has not yet occurred as of the review date. No organizer is inferred from the schedule page, and no structured scale category is inferred.

## Projection consistency finding

The first hosted CI run found that the HTML Public Projection and machine-readable feed used different additive and correction bundle inventories:

```text
Status HTML occurrences count mismatch: 24 !== 26
```

The machine-readable loader already included maintenance batches 05 and 06 and correction 04, while `apps/matsuri/src/data/matsuri-projection.ts` stopped at maintenance 04 and correction 03. The projection input list was aligned with the canonical loader and extended through maintenance 07 and correction 04.

This repair ensures that:

- Status HTML counts match the occurrence feed,
- maintenance 05 through 07 reach public HTML,
- correction 04 reaches public HTML,
- approved machine-readable and HTML projections use the same current bundle inventory.

## Resulting fixed-date inventory

As of 2026-07-16:

```text
Occurrences total                  26
Resolved Occurrences               17
Closed-period unresolved            0
In-progress scheduled               1
Future scheduled                    8
```

The in-progress record remains 郡上おどり 2026. Its outcome review remains scheduled after 2026-09-05.

## Hosted verification

```text
Verified head                     52712cf9d2fcba64b49086ddd66691a8b4421115
CI                                29497967212 — success
Seed inventory and contract       29497967267 — success
Seed readiness                    29497967251 — success
Jinja start-gate                  29497967186 — success
Canonical origin                  29497967183 — success
Canonical Search                  29497967386 — success
Crawler reachability              29497967277 — success
F2-24 indexability                29497967207 — success
Full-page screenshots             29497967198 — success
```

## Boundaries

This maintenance does not change Entity State, add a Change Event, activate Jinja or the series portal, alter Cloudflare configuration, or claim F2-25 through F2-28 completion.
