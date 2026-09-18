# Jiin Data Acquisition and Review Lane

**Status:** active repository implementation / noncanonical preview only

This document governs the first data-expansion lane for 寺院のゆくえ after the Jiin Astro application and workers.dev review preview were activated.

The specialist contract remains `docs/jiin-specialist-contract.md`. This document defines how candidates reach the Jiin canonical dataset without weakening that contract.

## Canonical path

```text
candidate discovery
  -> Jiin review queue
  -> temple-specific authoritative identity verification
  -> geography verification
  -> entity-boundary / duplicate review
  -> Tier A canonical record
  -> optional evidence-backed State / Event / Relation deepening
```

No discovery source bypasses the review queue.

## JIIN-D01 — Tier A identity expansion

A Tier A temple record requires all of the following:

```text
canonical temple identity
reviewed entity boundary
current geography
Jiin-acceptable authoritative temple-identifying Source
approved direct identity Evidence
verification/access date
deterministic stable ID / dedupe decision
machine-visible Tier A
```

The Jiin canonical validator enforces direct identity Evidence and an accepted `authority_scope` before a temple Entity can exist in `apps/jiin/data/canonical.json`.

Accepted identity authority scopes are initially:

```text
temple_identity
public_authority_temple_identity
```

A future source adapter may add a more specific scope only through an explicit schema/checker change.

## Discovery seeds are not publication evidence

The existing cross-site future-seed inventory can identify temple candidates from approved Matsuri Relations. These records preserve useful names, Place references, Relation Evidence, and occasionally official URLs.

They remain discovery material only.

`apps/jiin/scripts/build-matsuri-seed-queue.mjs` converts those records into a Jiin review queue and explicitly sets:

```text
review_status = pending_jiin_specialist_review
canonical_promotion_authorized = false
```

Every generated candidate retains at least these blockers:

```text
jiin_authoritative_identity_source_required
jiin_entity_boundary_and_dedupe_review_required
```

Missing geography or an absent official URL adds further blockers.

A Matsuri or Jinja relation, cemetery/columbarium association, third-party directory entry, map listing, or search result must never be interpreted as sufficient Tier A evidence by itself.

## Data model

The Jiin canonical dataset separates these collections:

```text
entities            temples
organizations       sects, schools, lineages, districts, corporations, comprehensive organizations
facilities          cemeteries, columbaria, memorial facilities
external_subjects   reviewed links to Matsuri/Jinja/Jiin or another external subject
places              geography
states              current temple continuity state
events              dated/reviewed changes
relations           evidence-backed relationships
evidence            target-specific claims
sources             source identity and authority scope
```

This avoids forcing sect, corporation, cemetery, columbarium, shrine, and festival records into the temple Entity collection.

## State and history boundary

Tier A does not require a State, Event, Relation, sect affiliation, principal object, corporation, cemetery, columbarium, or historical narrative.

Those records are added only where direct Evidence supports them.

The current continuity vocabulary is:

```text
operating
rebuilding
relocated
merged
dissolved
reestablished
unknown
```

State must not be inferred from the existence of an official website, a map listing, a Matsuri relation, or historical prose that does not establish current continuity.

## Privacy boundary

Facility-level temple/cemetery/columbarium relationships may be recorded when supported by public Evidence.

Do not create records for:

```text
private burial locations
individual grave users
family relationships
personal religious attributes
private memorial information
plot identifiers
```

## Preview publication

The current canonical dataset may be projected into the noncanonical workers.dev preview only.

```text
https://jiin-yukue.badjoke-lab.workers.dev/
```

The preview remains `noindex,nofollow`; custom-domain/canonical publication and Search Console submission remain separately blocked.

## Immediate implementation sequence

```text
1. keep canonical schema/checker green
2. generate the Matsuri-backed Jiin review queue
3. measure candidate count and geographic distribution
4. add authority-source adapters capable of temple-specific identity verification
5. promote reviewed Tier A records in bounded, reproducible batches
6. expose approved records through the existing canonical-driven home/list/region/detail/JSON projection
7. deepen State/Event/Relation only from direct Evidence
```
