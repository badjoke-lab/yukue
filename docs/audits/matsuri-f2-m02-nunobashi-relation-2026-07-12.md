# Matsuri F2-M02 布橋灌頂会 Relation Maintenance

**Audit date:** 2026-07-12  
**Status:** Maintenance batch 03 completed in repository candidate  
**Subject:** `fst-nunobashi-kanjoe` — 布橋灌頂会

## Finding

The Relation inventory identified 布橋灌頂会 as the final specialist Entity with no Relation.

The current 立山町 official page states that:

- 布橋灌頂会 was revived in 1996 after an approximately 130-year interruption,
- it is now held once every three years,
- displays and video at 富山県［立山博物館］ document the ceremony,
- the museum also preserves and presents 姥尊像 connected to the Tateyama faith,
- the English text explicitly describes the tradition as preserved at the museum through displays, video footage, and the statues.

Official source:

```text
src-tateyama-nunobashi
立山町「布橋灌頂会 Nunobashi Kanjoe Ceremony」
https://www.town.tateyama.toyama.jp/soshikikarasagasu/shokokankoka/kankokoryugakari/1/6/10784.html
```

## Added Entity

```text
org-toyama-tateyama-museum
富山県［立山博物館］
organization_kind: public_agency
```

The Entity is limited to the identity and preservation role stated by the municipal source. No separate organizer, ritual authority, or management role is asserted.

## Added Relation

```text
fst-nunobashi-kanjoe
  └─ supported_by
       └─ org-toyama-tateyama-museum
```

Relation ID:

```text
rel-nunobashi-supported-by-tateyama-museum
```

`maintained_by` was not used because the source establishes preservation, exhibition, and interpretation support rather than operational control of the recurring ceremony.

`organized_by` was not used because the reviewed source does not name the museum as organizer of any edition.

## Added Evidence

```text
evd-tateyama-museum-identity
evd-rel-nunobashi-tateyama-museum
```

The Evidence separately targets:

- the museum Entity identity,
- the conservative `supported_by` Relation.

## Relation coverage after batch 03

```text
Entities total                       44
Specialist Entities checked          25
Relations total                      25
Specialists with no Relation          0
Occurrence organizer Relation gaps    0
Place-context Relation gaps            0
Relations missing Evidence             0
```

All current Festival, Folk Performance, and Tradition Unit Entities now have at least one evidence-backed Relation.

## Boundary

This maintenance batch does not:

- claim that 富山県［立山博物館］ organizes 布橋灌頂会,
- claim that the museum controls the religious ceremony,
- infer a shrine or temple Relation from geographic proximity,
- add a 2026 Occurrence without an official schedule record,
- change any domain or canonical-origin setting,
- submit a sitemap,
- enable Analytics,
- advance F2-19 through F2-28.
