# F2-P04 Shrine Identity Evidence Audit

**Date:** 2026-07-16  
**Status:** Passed  
**Scope:** Public-safe Matsuri maintenance only

## Purpose

F2-P03 found five Relation-backed Jinja seeds with valid summary, geography, Place, Source, and Relation context, but no Evidence directly targeting the shrine Entity identity.

F2-P04 closes only that target mismatch. It does not create a shrine State Snapshot, change implementation priority, or activate the Jinja application.

## Data change

```text
data/public/matsuri/f2/maintenance-06.json
```

Added approved `entity_identity` Evidence for:

```text
shr-aso-jinja
shr-chichibu-jinja
shr-kushida-jinja
shr-dainichireiki-jinja
shr-sada-jinja
```

Each Evidence record reuses an approved Source already present in the Matsuri canonical dataset.

## Source mapping

| Shrine Entity | Source | Source authority |
|---|---|---|
| 阿蘇神社 | `src-aso-restoration` | 阿蘇神社公式 |
| 秩父神社 | `src-chichibu-yomatsuri` | 秩父神社公式 |
| 櫛田神社 | `src-hakata-schedule-2026` | 博多祇園山笠振興会公式 |
| 大日霊貴神社 | `src-dainichido-kazuno` | 鹿角市公式 |
| 佐太神社 | `src-sada-jinja` | 佐太神社公式 |

## Hosted verification

```text
Workflow
Audit Yukue future-site seed readiness

Run ID
29489701435

Conclusion
success

Artifact ID
8371871954

Artifact digest
sha256:478c27bd7049c17ac2f7d3623f839b28125c391f356a4bb6d6c87cf431f35445
```

## Result

```text
Direct identity Evidence present   0 → 5
Direct identity Evidence missing   5 → 0
Approved State Snapshot present    0
Official URL present               4
Official URL missing               1
```

The remaining gaps are deliberately unchanged:

- all five require a future shrine-specific State model and review,
- 大日霊貴神社 has a public-authority page but no attached shrine-official URL,
- none of the five is claimed publication-ready for Jinja.

## Boundary confirmation

F2-P04 did not:

- add a new Source,
- infer a shrine State,
- relabel a public-authority page as a shrine official URL,
- add a future-site route or application,
- change Cloudflare or F2-25 through F2-28,
- expose private research notes or ranking.
