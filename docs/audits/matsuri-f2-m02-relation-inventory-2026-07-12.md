# Matsuri F2-M02 Relation Coverage Inventory

**Audit date:** 2026-07-12  
**Status:** Initial Relation inventory completed; two evidence candidates remain  
**Dataset version:** `2026-07-10.d1`  
**Schema version:** `matsuri.v1`

## Purpose

This inventory reviews whether the Matsuri specialist Entities are connected to the organizations, shrines, temples, performances, and tradition units needed for evidence-backed cross-site reuse.

The inventory identifies review candidates. A missing Relation is not added from geographic proximity, a shared place, or an assumed organizational role alone.

## Automated command

```text
pnpm audit:matsuri:relations
```

JSON output:

```text
pnpm audit:matsuri:relations -- --json
```

## Summary after maintenance batch 01

```text
Entities total                       42
Specialist Entities checked          25
Relations total                      23
Specialists with no Relation          2
Occurrence organizer Relation gaps    0
Place-context Relation gaps            0
Relations missing Evidence             0
```

Specialist types checked:

```text
festival
folk_performance
tradition_unit
```

The automated audit also reports:

- an Occurrence that names an organizer without a matching `organized_by` Relation,
- a specialist Entity and shrine or temple Entity that share a canonical place without an explicit Relation,
- a Relation with no Evidence IDs.

These are review signals. Shared place or organizer fields do not by themselves authorize automatic Relation creation.

## Resolved in maintenance batch 01

### 郡上おどり → 郡上おどり保存会

Added Entity:

```text
org-gujo-odori-hozonkai
郡上おどり保存会
organization_kind: preservation_group
```

Added Relation:

```text
fpf-gujo-odori
  └─ maintained_by
       └─ org-gujo-odori-hozonkai
```

Evidence source:

```text
src-gujo-about
郡上八幡観光協会「郡上おどり」
https://www.gujohachiman.com/kanko/odori.html
```

The official tourism page names the preservation association and explains that association members judge dancers at the venues and issue formal licenses. This supports both the organization identity and its maintenance role in the dance tradition.

Added Evidence:

```text
evd-gujo-hozonkai-identity
evd-rel-gujo-odori-hozonkai
```

## Remaining specialist Entities with no Relation

| Entity | Name | Current finding | Required next evidence |
|---|---|---|---|
| `fst-nunobashi-kanjoe` | 布橋灌頂会 | The official municipal page establishes the ritual, route, revival, and triennial recurrence, but the reviewed passage does not yet establish a separate organizer or maintenance organization Entity | An official source explicitly naming the organizer, preservation body, temple, shrine, or other institution and its role |
| `fst-suneori-amagoi` | 脚折雨乞 | The municipal page establishes the ritual and route from 白鬚神社 to 雷電池, but the first pass has not yet established a separately modelled organization or an evidence-safe Entity-to-Entity Relation | An official source explicitly naming the preservation or execution body, or explicitly establishing the ritual relationship to a modelled shrine Entity |

No guessed Relation was added for either candidate.

## Known limitations

The audit can detect structural gaps already visible in canonical data, such as organizer fields or shared Place IDs. It cannot determine the real-world relationship by itself.

A candidate is resolved only after:

1. an authoritative source states the relevant relationship,
2. the target is modelled as an Entity rather than only a Place,
3. the Relation direction and type match the source,
4. Evidence targets the exact Relation assertion,
5. normal schema, semantic, Evidence, projection, browser, and repository-gate checks pass.

## Next work

```text
1. inspect the official 脚折雨乞 subpages for a named preservation or execution body
2. inspect official 布橋灌頂会 material for a named organizer or institutional relationship
3. add only evidence-backed Entities and Relations in bounded maintenance batches
4. rerun the Relation audit after each batch
```
