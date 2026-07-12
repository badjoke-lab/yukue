# Matsuri Data Freshness Audit

**Status:** F2-M02 completed / routine date-triggered maintenance continues

## Purpose

F2-M02 reviewed and improved the public Matsuri corpus while domain-dependent launch work was paused.

The audit was independent from the custom-domain, canonical-origin, sitemap-submission, and Analytics sequence. It used the verified Workers deployment only as a maintenance reference and did not treat that hostname as canonical.

## Verified deployment baseline

```text
Permanent Workers origin
https://matsuri-yukue.badjoke-lab.workers.dev/

Verified deployment origin
https://f757f092-matsuri-yukue.badjoke-lab.workers.dev/

GitHub Actions deployed-origin verification
run 29182976642 — success

Verified source commit
f6fdd5055c2712838ef30ed54048abf7f0674b4c
```

F2-16 through F2-19 are complete. F2-20 through F2-28 remain on operational hold until custom-domain attachment can proceed.

## Automated inventories

### Occurrence and freshness inventory

```text
pnpm audit:matsuri:freshness
pnpm audit:matsuri:freshness -- --as-of 2026-07-12
pnpm audit:matsuri:freshness -- --as-of 2026-07-12 --json
```

The command reads the generated approved Public Projection under `apps/matsuri/dist/data`. It reports review candidates without automatically changing canonical records. It fails on missing feeds, malformed dates, unsupported temporal values, or invalid ranges.

### Relation coverage inventory

```text
pnpm audit:matsuri:relations
pnpm audit:matsuri:relations -- --json
```

The Relation command reads the complete canonical dataset and reports:

- specialist Entities with no Relation,
- Occurrences that name an organizer without a matching `organized_by` Relation,
- specialist and shrine or temple Entities that share a canonical Place but have no explicit Relation,
- Relations with no Evidence IDs.

These outputs are review signals, not permission to infer a Relation automatically.

## Occurrence inventory

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

The single closed-period unresolved candidate was `occ-soma-2026-schedule` for 相馬野馬追 2026.

Resolution report:

```text
docs/audits/matsuri-f2-m02-soma-outcome-2026-07-12.md
```

A 南相馬市 official post-event topic covers 2026-05-23, 24, and 25. The Occurrence was corrected to:

```text
outcome: held
scale: unknown
```

The municipality record establishes that the multi-day occurrence was held. It does not establish a structured scale classification, so `unknown` was retained rather than inferring `normal`.

Final fixed-date summary:

```text
Occurrences total                  24
Resolved Occurrences               15
Closed-period unresolved            0
In-progress scheduled               2
Future scheduled                    7
```

## Relation inventory

Initial report:

```text
docs/audits/matsuri-f2-m02-relation-inventory-2026-07-12.md
```

The initial zero-Relation specialists were resolved in bounded evidence-backed batches.

### Maintenance batch 01

```text
郡上おどり
  └─ maintained_by
       └─ 郡上おどり保存会
```

The official tourism source identifies the preservation association and explains its venue judging and formal-license role.

### Maintenance batch 02

Report:

```text
docs/audits/matsuri-f2-m02-suneori-relation-2026-07-12.md
```

```text
脚折雨乞
  └─ organized_by
       └─ 脚折雨乞行事保存会
```

The 鶴ヶ島市 record identifies the association as organizer of the 2024 edition. `occ-suneori-2024` was also updated to record the organizer.

### Maintenance batch 03

Report:

```text
docs/audits/matsuri-f2-m02-nunobashi-relation-2026-07-12.md
```

```text
布橋灌頂会
  └─ supported_by
       └─ 富山県［立山博物館］
```

The 立山町 page states that the tradition is preserved and presented at the museum through displays, video footage, and 姥尊像. The conservative `supported_by` Relation records preservation and interpretation support without claiming organization or ritual control.

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

A stale observation is an audit candidate, not proof that an Entity State changed. Review old `observed_at` values, later official changes, weak Evidence, and conflicts with current public language.

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
- the full repository gate and screenshot workflow passed,
- known future-date review points were recorded without overstating current completeness.

## Routine review points

```text
博多祇園山笠 2026  review after 2026-07-15
郡上おどり 2026    review after 2026-09-05
```

These are normal date-triggered maintenance checks and do not keep F2-M02 open.

## Boundary

Routine maintenance must not:

- attach the decided custom domain outside F2-20,
- set `MATSURI_PUBLIC_ORIGIN` before the matching custom domain is attached,
- declare the Workers origin canonical,
- submit a sitemap,
- enable Cloudflare Web Analytics,
- claim F2-20 through F2-28 completion,
- add unrelated product scope.
