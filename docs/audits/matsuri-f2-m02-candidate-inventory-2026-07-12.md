# Matsuri F2-M02 Data Freshness Candidate Inventory

**Audit date:** 2026-07-12  
**Status:** Candidate inventory completed; evidence review active  
**Dataset version:** `2026-07-10.d1`  
**Schema version:** `matsuri.v1`

## Scope

This audit inspected the generated approved Public Projection:

```text
apps/matsuri/dist/data/occurrences.json
apps/matsuri/dist/data/entities.json
```

The inventory is a review queue. It does not automatically change canonical records.

## Summary

```text
Occurrences total                  24
Resolved Occurrences               14
Closed-period unresolved            1
In-progress scheduled               2
Future scheduled                    7

Entities total                     41
Current State snapshots checked    23
Stale Current State candidates      0

External links checked             40
Stale external-link candidates      0
```

Current State and external-link staleness used a 180-day threshold. All projected `observed_at` and `last_checked_at` values were `2026-07-10`, so none were date-stale on the audit date.

## Closed-period unresolved candidate

| Occurrence | Subject | Period | Current outcome | Action |
|---|---|---:|---|---|
| `occ-soma-2026-schedule` | 相馬野馬追 | 2026-05-23–2026-05-25 | `unknown` | Continue evidence review; do not infer `held` from the schedule alone |

### Evidence review completed in this pass

Official site:

```text
https://soma-nomaoi.jp/
```

Official 2026 schedule:

```text
https://soma-nomaoi.jp/schedule/
```

The official schedule identifies the planned three-day program:

```text
2026-05-23  お繰り出し・宵乗り
2026-05-24  野馬追
2026-05-25  野馬懸
```

The official site also published 2026 ticket, poster, participant, and procession materials before the event. This supports that a concrete 2026 edition was organized and scheduled, but the pages reviewed in this pass do not by themselves establish the final outcome of the whole multi-day occurrence or whether all principal components were held as planned.

Decision for this pass:

```text
outcome remains unknown
scale remains unknown
canonical data change deferred
```

A later correction requires explicit post-event evidence, preferably from the organizing body, participating municipality, official results/report, or another authoritative record that supports the edition-level outcome.

## In-progress scheduled Occurrences

These are not overdue as of the audit date.

| Occurrence | Subject | Period | Outcome |
|---|---|---:|---|
| `occ-hakata-2026-schedule` | 博多祇園山笠 | 2026-07-01–2026-07-15 | `scheduled` |
| `occ-gujo-2026-schedule` | 郡上おどり | 2026-07-11–2026-09-05 | `scheduled` |

Review timing:

- Hakata: review after 2026-07-15 unless an authoritative cancellation or material change is published earlier.
- Gujo: review after 2026-09-05 unless an authoritative cancellation or material change is published earlier.

## Future scheduled Occurrences

| Occurrence | Subject | Period |
|---|---|---:|
| `occ-aso-onda-2026-schedule` | 阿蘇神社御田祭 | 2026-07-28 |
| `occ-aomori-nebuta-2026-schedule` | 青森ねぶた祭 | 2026-08-02–2026-08-07 |
| `occ-akita-kanto-2026-schedule` | 秋田竿燈まつり | 2026-08-03–2026-08-06 |
| `occ-awa-2026-schedule` | 徳島市阿波おどり | 2026-08-11–2026-08-15 |
| `occ-yamaga-sennin-odori-2026` | 千人灯籠踊り | 2026-08-16 |
| `occ-kawagoe-2026-schedule` | 川越まつり | 2026-10-17–2026-10-18 |
| `occ-suneori-2028-schedule` | 脚折雨乞 | 2028 |

No outcome change is appropriate before each occurrence period closes, unless authoritative evidence establishes cancellation, postponement, rescheduling, or another material change.

## Current State review

```text
Current State snapshots checked  23
Oldest observed_at               2026-07-10
Newest observed_at               2026-07-10
Stale candidates                 0
```

This only confirms date freshness. It does not prove every state claim is substantively correct; Source and Evidence review remains part of F2-M02.

## External-link review

```text
External links checked       40
Oldest last_checked_at       2026-07-10
Newest last_checked_at       2026-07-10
Stale candidates              0
```

This inventory checks recorded dates, not live HTTP availability. URL accessibility and replacement-source review remain separate evidence work.

## Automated command

```text
pnpm build:matsuri:pages
pnpm audit:matsuri:freshness -- --as-of 2026-07-12
```

JSON output:

```text
pnpm audit:matsuri:freshness -- --as-of 2026-07-12 --json
```

The audit command reports candidates but does not fail merely because candidates exist. It fails on missing generated feeds, malformed dates, invalid ranges, or unsupported temporal values.

## Next action

1. Continue authoritative post-event research for `occ-soma-2026-schedule`.
2. Review `occ-hakata-2026-schedule` after its period closes.
3. Keep the audit command in release verification so newly overdue records surface automatically.
4. Make canonical changes only in bounded evidence-backed batches.
