# Matsuri Data Freshness Audit

**Status:** F2-M02 completed / routine date-triggered maintenance continues

## Purpose

F2-M02 reviewed the public Matsuri corpus independently from deployment, Search, crawler, sitemap-submission, and Analytics gates. Its completed results remain the maintenance baseline after F2-23.

## Current production reference

```text
Canonical origin
https://matsuri-yukue.badjoke-lab.com/

Canonical origin run
29191904624 — success

Canonical Search run
29193201911 — success

Crawler reachability run
29230475619 — success
```

F2-16 through F2-23 are complete. F2-24 through F2-28 remain the active launch sequence.

## Completed fixed-date result

```text
Occurrences total                  24
Resolved Occurrences               15
Closed-period unresolved            0
In-progress scheduled               2
Future scheduled                    7

Stale Current State candidates      0
Stale external-link candidates      0

Entities total                       44
Specialist Entities checked          25
Relations total                      25
Specialists with no Relation          0
Occurrence organizer Relation gaps    0
Place-context Relation gaps            0
Relations missing Evidence             0
```

## Completed evidence-backed corrections

```text
郡上おどり
  └─ maintained_by → 郡上おどり保存会

脚折雨乞
  └─ organized_by → 脚折雨乞行事保存会

布橋灌頂会
  └─ supported_by → 富山県［立山博物館］

相馬野馬追 2026
  └─ outcome: held
     scale: unknown
```

The corrections remain conservative: no Relation, state, scale, or outcome is inferred beyond approved Evidence.

## Audit commands

```text
pnpm audit:matsuri:freshness
pnpm audit:matsuri:freshness -- --json
pnpm audit:matsuri:relations
pnpm audit:matsuri:relations -- --json
```

These commands report review candidates. They do not change canonical records automatically.

## Routine review points

```text
博多祇園山笠 2026  review after 2026-07-15
郡上おどり 2026    review after 2026-09-05
```

New official changes, broken Sources, corrections, and security or dependency repairs may be handled as normal bounded maintenance without reopening F2-M02.

## Evidence records

```text
docs/audits/matsuri-f2-m02-candidate-inventory-2026-07-12.md
docs/audits/matsuri-f2-m02-soma-outcome-2026-07-12.md
docs/audits/matsuri-f2-m02-relation-inventory-2026-07-12.md
docs/audits/matsuri-f2-m02-suneori-relation-2026-07-12.md
docs/audits/matsuri-f2-m02-nunobashi-relation-2026-07-12.md
```
