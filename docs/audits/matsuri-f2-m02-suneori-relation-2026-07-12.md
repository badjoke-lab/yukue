# Matsuri F2-M02 脚折雨乞 Relation Maintenance

**Audit date:** 2026-07-12  
**Status:** Maintenance batch 02 completed in repository candidate  
**Subject:** `fst-suneori-amagoi` — 脚折雨乞

## Finding

The initial Relation inventory identified 脚折雨乞 as a specialist Entity with no Relation.

An official 鶴ヶ島市 page records that:

- 脚折雨乞 was held on 2024-08-04,
- the event followed an eight-year interval caused by the COVID-19 postponement,
- `脚折雨乞行事保存会` was the organizer,
- the preservation association prepared the dragon-serpent materials and produced the documentary record.

Official source:

```text
src-tsurugashima-suneori-record-2024
鶴ヶ島市「『脚折雨乞』令和6年度記録映像が完成しました」
https://www.city.tsurugashima.lg.jp/bunka-sports-kankou/bunkazai/ashioriamagoi/page011157.html
```

## Added Entity

```text
org-suneori-amagoi-hozonkai
脚折雨乞行事保存会
organization_kind: preservation_group
```

The municipal page is used as the public authority source. No unsupported independent organization website is claimed.

## Added Relation

```text
fst-suneori-amagoi
  └─ organized_by
       └─ org-suneori-amagoi-hozonkai
```

Relation ID:

```text
rel-suneori-organized-by-hozonkai
```

## Occurrence correction

The existing 2024 Occurrence already records:

```text
occ-suneori-2024
2024-08-04
outcome: held
scale: normal
```

Record version 2 adds:

```text
organizer_entity_ids:
- org-suneori-amagoi-hozonkai
```

It preserves the existing outcome, date, scale, venues, and prior Evidence while adding the new organizer Evidence.

## Added Evidence

```text
evd-suneori-hozonkai-identity
evd-rel-suneori-organized-by-hozonkai
evd-suneori-occ-organizer-2024
```

The Evidence separately targets:

- organization identity,
- the directed `organized_by` Relation,
- the 2024 Occurrence organizer assertion.

## Relation coverage after batch 02

```text
Entities total                       43
Specialist Entities checked          25
Relations total                      24
Specialists with no Relation          1
Occurrence organizer Relation gaps    0
Place-context Relation gaps            0
Relations missing Evidence             0
```

Remaining zero-Relation specialist:

```text
fst-nunobashi-kanjoe  布橋灌頂会
```

## Boundary

This maintenance batch does not:

- add a Relation from shared Place data alone,
- infer that 白鬚神社 is an organizer Entity,
- alter the established 2024 outcome,
- change any domain or canonical-origin setting,
- submit a sitemap,
- enable Analytics,
- advance F2-19 through F2-28.
