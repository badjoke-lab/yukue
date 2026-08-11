# Matsuri Batch 43 Production Verification — 2026-08-11

## Result

**Passed.** The exact Batch 43 release is verified on the canonical Matsuri production origin and completes reviewed primary-prefecture coverage at **47 / 47**.

## Release identity

```text
Implementation PR          #241
Release merge              3604d984c71bb71f3b66245b87fa869a64ec85b3
Corpus audit PR            #245
Corpus audit merge         14ba7c578346fec96109b627076344678fad9e2a
Production-baseline PR     #246
Production-baseline merge  09f5b7c0ff2ff4f1e3bd0d59af1782eb720486e7
Canonical workflow         31465702322
Canonical attempt          1 — success
Complete repository CI     31465702355 — success
Verified on                2026-08-11
```

## Canonical origin

```text
https://matsuri-yukue.badjoke-lab.com/
```

The canonical-origin workflow verified the root and shared navigation surfaces, machine-readable outputs, Pagefind asset, sitemap, and every required production route under the exact Batch 43 production baseline.

## Exact production contract

```text
Entities          120
Change Events     106
Relations          70
Occurrences       166
Sitemap entries   238
```

## Batch 43 required routes

The exact production contract includes:

```text
/festivals/miyazaki-jingu-grand-festival/
/references/shrines/miyazaki-jingu/
/places/miyazaki-jingu/
/places/miyazaki-jingu-shinko-route/
```

This verifies the Festival detail, State-free Shrine reference, Shrine Place, and distributed procession-route Place without inventing route point coordinates.

## Batch 43 occurrence assertions

The production baseline requires both:

```text
occ-miyazaki-jingu-grand-festival-2024
record_version 1
outcome held
scale modified
```

and:

```text
occ-miyazaki-jingu-grand-festival-2026
record_version 1
outcome scheduled
scale unknown
```

The 2024 assertion separates actual performance from the weather-related modification. The future 2026 edition remains scheduled and is not promoted to held before post-event Evidence exists.

## Repository checkpoint

The strict corpus and release audits established:

```text
Entities           120
Places             108
State Snapshots     56
Change Events      106
Occurrences        166
Relations           70
Designations        29
Sources            318
Evidence           699
Primary coverage 47 / 47 prefectures
Prefecture gaps      0
Sparse primary Entities 0
```

## Breadth boundary

Batch 43 closes the current prefecture-breadth target. All 47 prefectures now have at least one reviewed primary Matsuri record under the current corpus-coverage rule.

This does not mean the corpus is complete. Subsequent Matsuri expansion should be depth-first: Occurrence history, Change Events, Relation density, Evidence quality, freshness review, corrections, and dated maintenance.

## Jinja boundary

Batch 43 adds 宮﨑神宮 as a Relation-backed Shrine seed while keeping it State-free.

```text
Relation-backed seeds       26
Direct identity Evidence    30
Place references            26
Approved Shrine States       0
Official URLs               19
```

This does not activate Jinja. The Matsuri stabilization review remains incomplete, portal/Jinja order is undecided, the Jinja State specification is unapproved, and explicit start authorization is absent.

## Conclusion

Batch 43 is repository-verified and exact-canonical-production-verified. Reviewed primary-prefecture coverage is 47 / 47 with zero prefecture gaps and zero sparse primary Entities. The next Matsuri work should move from geographic breadth to depth-first maintenance and formal stabilization review, without changing the Jinja start boundary.
