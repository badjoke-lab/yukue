# Matsuri Batch 42 Production Verification — 2026-08-11

## Result

**Passed.** The exact Batch 42 release is verified on the canonical Matsuri production origin.

## Release identity

```text
Implementation PR          #239
Release merge              d36797b2980ef9d639bfa7ee0a152a287a223d3a
Corpus audit PR            #242
Corpus audit merge         e976cf62d8104b4a5fc75ffd68d79a075a395be8
Production-baseline PR     #243
Production-baseline merge  aeea121ed2908e8e83c90ad727f5d69b6c1c753f
Canonical workflow         31463272976
Canonical attempt          1 — success
Verified on                2026-08-11
```

## Canonical origin

```text
https://matsuri-yukue.badjoke-lab.com/
```

The canonical-origin workflow verified the root and shared navigation surfaces, machine-readable outputs, Pagefind asset, sitemap, and every required production route under the exact Batch 42 production baseline.

## Exact production contract

```text
Entities          118
Change Events     105
Relations          69
Occurrences       164
Sitemap entries   234
```

## Batch 42 required routes

All newly required routes are included in the exact canonical-production contract:

```text
/festivals/waka-matsuri/
/references/shrines/kishu-toshogu/
/places/kishu-toshogu/
/places/waka-matsuri-wakaura-route/
```

This verifies the Festival detail, State-free Shrine reference, Shrine Place, and distributed route Place without inventing route coordinates.

## Batch 42 occurrence assertion

The production baseline requires:

```text
occ-waka-matsuri-2026
record_version 1
outcome held
scale unknown
```

The 2026 edition is therefore part of the exact canonical-production contract using post-event Evidence for actual performance, with municipal material separately supporting the exact date and venue.

## Repository checkpoint

The strict corpus and release audits established:

```text
Entities           118
Places             106
State Snapshots     55
Change Events      105
Occurrences        164
Relations           69
Designations        29
Sources            311
Evidence           687
Primary coverage 46 / 47 prefectures
Sparse primary Entities 0
```

## Visual-review maintenance

The first full-page run exposed a transient Google Maps third-party `MapsJsInternalService/InitMapsJwt` RPC console message on an existing page. The capture classifier was narrowed to that exact Google Maps third-party message family; general application and first-party console errors remain strict failures. The rerun passed the complete full-page screenshot workflow.

## Jinja boundary

Batch 42 adds 紀州東照宮 as a Relation-backed Shrine seed while keeping it State-free.

```text
Relation-backed seeds       25
Direct identity Evidence    29
Place references            25
Approved Shrine States       0
Official URLs               18
```

This does not activate Jinja. The Matsuri stabilization review remains incomplete, portal/Jinja order is undecided, the Jinja State specification is unapproved, and explicit start authorization is absent.

## Conclusion

Batch 42 is repository-verified and exact-canonical-production-verified. 和歌山県 is covered by a reviewed primary Matsuri record. One prefecture, 宮崎県, remains outside the Batch 42 production checkpoint.
