# Matsuri Batch 41 Production Verification — 2026-08-11

## Result

**Passed.** The exact Batch 41 release is verified on the canonical Matsuri production origin.

## Release identity

```text
Implementation PR        #236
Release merge            69d350e9e55ae93c829f8ab535b22bc8df5f3772
Corpus audit PR          #237
Corpus audit merge       5608b71908e63000fe3873b27b9b9e37540ed594
Production-baseline PR   #238
Production-baseline merge b3049454625a25a37ce130b12dbb648aae3bd375
Canonical workflow       31460920223
Canonical attempt        1 — success
Verified on              2026-08-11
```

## Canonical origin

```text
https://matsuri-yukue.badjoke-lab.com/
```

The canonical-origin workflow verified the root and shared navigation surfaces, machine-readable outputs, Pagefind asset, sitemap, and every required production route under the exact production baseline.

## Exact production contract

```text
Entities          116
Change Events     104
Relations          68
Occurrences       163
Sitemap entries   230
```

The deployed verifier reported:

```text
canonical origin verified: https://matsuri-yukue.badjoke-lab.com
canonical sitemap entries verified: 230
production baseline verified: 69d350e9e55ae93c829f8ab535b22bc8df5f3772
```

## Batch 41 required routes

All four newly required routes returned HTTP 200 in canonical verification:

```text
/festivals/yamaguchi-gion-matsuri/
/references/shrines/yamaguchi-yasaka-jinja/
/places/yamaguchi-yasaka-jinja/
/places/yamaguchi-gion-route/
```

This verifies the Festival detail, State-free Shrine reference, concrete Shrine Place, and distributed procession-route Place without inventing route coordinates.

## Batch 41 occurrence assertion

The production baseline requires:

```text
occ-yamaguchi-gion-2023
record_version 1
outcome held
scale unknown
```

The 2023 edition is therefore part of the exact canonical-production contract. The elapsed 2026 dates are not promoted to a held Occurrence without explicit post-event Evidence.

## Repository and release verification

The implementation head passed the strict corpus, freshness, Relation, external-link, canonical-dataset, correction, bundle-inventory, Detail C, map, future-site seed, Jinja guard, F2-28, stabilization, complete repository CI, and full-page screenshot workflows before merge.

The release artifact established the Batch 41 repository checkpoint:

```text
Entities           116
Places             104
State Snapshots     54
Change Events      104
Occurrences        163
Relations           68
Designations        29
Sources            305
Evidence           676
Primary coverage 45 / 47 prefectures
Sparse primary Entities 0
```

## Jinja boundary

Batch 41 adds 八坂神社 as a Relation-backed Shrine seed. The Jinja seed bookkeeping is aligned at:

```text
Relation-backed seeds       24
Direct identity Evidence    28
Place references            24
Approved Shrine States       0
Official URLs               18
```

This does not activate Jinja. The Matsuri stabilization review remains incomplete, portal/Jinja order is undecided, the Jinja State specification is unapproved, and explicit start authorization is absent.

## Conclusion

Batch 41 is repository-verified and exact-canonical-production-verified. 山口県 is now covered by a reviewed primary Matsuri record, with claim-specific Evidence, a reviewed historical Change Event, a verified historical Occurrence, an evidence-backed Shrine Relation, and production-reachable Detail C routes.
