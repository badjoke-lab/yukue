# Matsuri Data Freshness Audit

**Status:** F2-M02 completed / routine date-triggered maintenance continues

## Purpose

F2-M02 reviewed and improved the public Matsuri corpus while external launch work was in progress. The audit remains independent from deployment, crawler, sitemap-submission, and Analytics gates.

## Deployment references

Initial deployment reference:

```text
Permanent Workers origin
https://matsuri-yukue.badjoke-lab.workers.dev/

Verified deployment origin
https://f757f092-matsuri-yukue.badjoke-lab.workers.dev/

Deployed-origin verification
run 29182976642 — success
```

Current canonical reference:

```text
Canonical origin
https://matsuri-yukue.badjoke-lab.com/

Canonical HTTP verification
run 29191904624 — success

Canonical browser Search verification
run 29227617530 — success
```

F2-16 through F2-22 are complete. F2-23 through F2-28 remain the active launch sequence.

## Automated inventories

### Occurrence and freshness inventory

```text
pnpm audit:matsuri:freshness
pnpm audit:matsuri:freshness -- --as-of 2026-07-12
pnpm audit:matsuri:freshness -- --as-of 2026-07-12 --json
```

The command reads the approved Public Projection and reports review candidates without automatically changing canonical records.

### Relation coverage inventory

```text
pnpm audit:matsuri:relations
pnpm audit:matsuri:relations -- --json
```

The Relation inventory reports specialist Entities without Relations, Occurrence organizer gaps, Place-context review signals, and Relations without Evidence. These are review signals rather than automatic Relation inferences.

## Occurrence inventory result

Initial report:

```text
docs/audits/matsuri-f2-m02-candidate-inventory-2026-07-12.md
```

Initial summary:

```text
Occurrences total                  24
Resolved Occurrences               14
Closed-period unresolved            1
In-progress scheduled               2
Future scheduled                    7
Current State snapshots checked    23
Stale Current State candidates      0
External links checked             40
Stale external-link candidates      0
```

The one closed-period unresolved record was `occ-soma-2026-schedule` for 相馬野馬追 2026.

Resolution report:

```text
docs/audits/matsuri-f2-m02-soma-outcome-2026-07-12.md
```

Official post-event Evidence supported:

```text
outcome: held
scale: unknown
```

The Evidence established that the Occurrence was held but did not support a structured scale classification.

Final summary:

```text
Occurrences total                  24
Resolved Occurrences               15
Closed-period unresolved            0
In-progress scheduled               2
Future scheduled                    7
```

## Relation inventory result

Initial report:

```text
docs/audits/matsuri-f2-m02-relation-inventory-2026-07-12.md
```

Completed evidence-backed maintenance:

```text
郡上おどり
  └─ maintained_by
       └─ 郡上おどり保存会

脚折雨乞
  └─ organized_by
       └─ 脚折雨乞行事保存会

布橋灌頂会
  └─ supported_by
       └─ 富山県［立山博物館］
```

Supporting reports:

```text
docs/audits/matsuri-f2-m02-suneori-relation-2026-07-12.md
docs/audits/matsuri-f2-m02-nunobashi-relation-2026-07-12.md
```

Final Relation summary:

```text
Entities total                       44
Specialist Entities checked          25
Relations total                      25
Specialists with no Relation          0
Occurrence organizer Relation gaps    0
Place-context Relation gaps            0
Relations missing Evidence             0
```

## Review rules retained after completion

### Occurrence outcomes

When an approved Occurrence is no longer in the future and remains `scheduled` or unresolved `unknown`:

1. check official or authoritative post-event Evidence,
2. distinguish held, partially held, postponed, rescheduled, cancelled, not held, and unknown,
3. update only what the Evidence supports,
4. preserve the distinction between annual outcome and long-term Entity State,
5. avoid inferring scale from the fact of holding.

### Current State

A stale observation is an audit candidate, not proof that an Entity State changed. Review old observation dates, later official changes, weak Evidence, and conflicts with current public language.

### Sources and Evidence

Check URL accessibility, official replacement pages, titles and publishers, exact Evidence targets, stronger official alternatives, and archive requirements for unavailable historical pages.

### Relations

Each Relation must remain directed, evidence-backed, and time-bounded when supported. Shared Place IDs or geographic proximity alone do not establish an Entity-to-Entity Relation.

## Completion result

F2-M02 completed on 2026-07-12 after:

- all approved non-future scheduled and unresolved Occurrences were reviewed,
- the initial closed-period unresolved inventory reached zero,
- stale Current State candidates were confirmed at zero,
- stale external-link candidates were confirmed at zero,
- the initial zero-Relation specialist inventory reached zero,
- Relations missing Evidence were confirmed at zero,
- material Source, Evidence, and Relation findings were corrected or documented,
- the repository gate and screenshot workflow passed,
- future-date review points were recorded without treating them as current defects.

## Routine review points

```text
博多祇園山笠 2026  review after 2026-07-15
郡上おどり 2026    review after 2026-09-05
```

These are normal date-triggered maintenance checks and do not keep F2-M02 open.

## Boundary

Routine maintenance must not:

- treat the non-canonical workers.dev origin as canonical,
- replace the verified canonical origin without an explicit migration decision,
- submit the sitemap before F2-24,
- enable Cloudflare Web Analytics before F2-25,
- claim F2-23 through F2-28 completion without their evidence,
- add unrelated product scope.
