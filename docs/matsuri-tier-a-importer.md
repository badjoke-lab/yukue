# Matsuri Tier A Candidate Importer

**Status:** NCS-04 implementation / readiness-only / no public write

## Purpose

NCS-04 turns source-normalized candidate input into a deterministic Tier A publication-readiness result.

It consumes the NCS-03 source-family registry:

```text
config/matsuri-national-source-inventory.json
```

It does **not** publish candidates, write canonical public records, assign public IDs/slugs, or invent `tier_a_published_at`.

The sequence remains:

```text
NCS-03  source-family contract
→ NCS-04 candidate normalization / source resolution / identity-dedupe / Tier A readiness
→ NCS-05 bulk dry run + publication-readiness audit
→ NCS-06 actual bounded Tier A publication
```

## Public/private boundary

The public repository contains only the importer implementation, machine contract, and synthetic fixtures.

It does not contain a real private candidate queue.

Synthetic fixtures are explicitly marked:

```text
fixture_only: true
contains_real_candidates: false
```

A real operational candidate batch can be supplied to the CLI outside the repository, but NCS-04 artifacts remain readiness-only until a later publication step is explicitly authorized.

## Machine contract

```text
config/matsuri-tier-a-importer-contract.json
```

Key boundaries:

```text
mode                              readiness_only
writes canonical public data      false
publishes Tier A                  false
writes tier_a_published_at        false
assigns canonical ID              false
assigns public slug               false
NCS-05 completion authorized      false
NCS-06 publication authorized     false
future sites activated            false
```

## Candidate input

A candidate needs at least:

```text
candidate_id
entity_type
name_ja
geography.prefecture_code
geography.municipality_name_ja OR geography.broader_scope_ja
source.family_id
source.url
source.accessed_at
source.publisher_name
source.publisher_role_verified
```

Only Matsuri specialist-primary types are accepted in NCS-04:

```text
festival
folk_performance
```

The importer derives the canonical prefecture name from the fixed 47-prefecture NCS-03 control set and rejects mismatched supplied prefecture names.

A municipality is not invented. If the subject is not municipality-bounded, the candidate must provide an explicit broader geographic scope.

## Source-family resolution

The importer loads the NCS-03 registry at runtime.

### Direct Tier A source family

A direct source may proceed after:

```text
known NCS-03 source family
valid http/https URL
valid access date
publisher name
verified publisher role
family-specific source validation
```

For the Agency for Cultural Affairs national database, the source URL must remain on the configured national-database origin.

### Conditional Tier A source family

Conditional sources require verified publisher role.

For `shrine_or_temple_official`, the candidate must additionally confirm that the source actually supports the Matsuri subject relationship. The importer does not infer that relationship from a shrine/temple URL.

### Discovery-only family

Discovery-only sources such as Cultural Heritage Online and Japan Search cannot establish Tier A readiness by themselves.

They must provide `resolved_source` whose family is direct or conditional and whose own publisher/source checks pass.

The readiness draft retains both:

```text
discovery source provenance
+
resolved effective source provenance
```

This prevents the discovery aggregator from being silently rewritten as the authoritative publisher.

### Supporting-only family

Academic/institutional and credible-news source families cannot establish Tier A readiness alone under the current NCS-03 contract.

They remain usable for claim-specific Tier B/C research, Occurrence outcomes, Change Events, and history.

## Source provenance retained in a Tier A-ready draft

The readiness draft retains:

```text
effective source family
source-family role
canonical source_type mapping
publisher role
publisher name
exact URL
access date
stable provider/source record ID when available
text/image/bulk reuse policy
original discovery source when resolution was required
```

Authority and reuse permission remain separate.

## Deterministic identity and dedupe

NCS-04 creates a deterministic identity key from:

```text
entity_type
normalized Japanese preferred name
prefecture code
municipality name OR explicit broader scope
```

Normalization:

```text
NFKC
trim
remove whitespace
Japanese-locale lowercase
```

The importer checks three conflict classes.

### Existing public identity

If the key already matches a current public Festival/Folk Performance record, the candidate is blocked as `duplicate_existing`.

### Same-batch identity

The first candidate owning a new identity key may continue. A later candidate with the same key is blocked as `duplicate_in_batch`.

### Stable provider record conflict

If the same effective source-family + stable provider record ID appears against two different identity keys, the later candidate is blocked as `provider_identity_conflict`.

This is deliberately fail-closed. NCS-04 does not guess which identity is correct.

## Readiness values

```text
tier_a_ready
blocked_input
blocked_source
blocked_identity
```

A blocked result records reasons rather than silently dropping the candidate.

Examples:

```text
underlying_source_unresolved
source_publisher_role_unverified
source_family_supporting_only
municipality_or_broader_scope_required
duplicate_existing
duplicate_in_batch
provider_identity_conflict
publication_timestamp_not_allowed_in_ncs04
```

## Tier A-ready draft

A ready draft contains only Tier A publication preparation fields:

```text
coverage_tier: tier_a_index
publication_status: not_published
tier_a_published_at: null
identity key
entity type
preferred Japanese name
geographic scope
source provenance
```

It does not assign a canonical Entity ID or public slug.

It does not project candidate-only dimensions such as:

```text
Current State
Occurrence outcome
organizer
Place
Relations
coordinates
history
```

The importer may report that such candidate claims were present, but they do not enter the Tier A draft.

This preserves the governing rule that Tier A may be thin and unsupported Tier B/C dimensions remain absent.

## Publication-time boundary

NCS-04 rejects a candidate that supplies `tier_a_published_at`.

Every NCS-04 ready draft has:

```text
tier_a_published_at: null
```

The authentic publication timestamp is written only when the record is actually made public under NCS-06 or another separately authorized publication path.

Repository age, candidate discovery time, source access time, review time, and dry-run time must not be substituted for the real Tier A publication time.

## CLI

```text
node scripts/import-matsuri-tier-a-candidates.mjs \
  --input <candidate-batch.json> \
  --output <artifact-dir>
```

The CLI writes only artifacts:

```text
report.json
tier-a-ready-drafts.json
blocked-candidates.json
```

It does not mutate `data/public/matsuri`.

## Synthetic contract fixtures

```text
fixtures/matsuri-tier-a-importer/synthetic-candidates.json
```

The fixture covers:

```text
direct source ready
conditional source ready
discovery-only source resolved to direct source
discovery-only unresolved
conditional publisher role unverified
existing public duplicate
same-batch duplicate
stable provider record identity conflict
explicit broader regional scope
missing municipality/broader scope
supporting-only source
candidate-supplied publication timestamp
candidate Tier B/C claims that must not leak into Tier A draft
```

The fixture uses synthetic names and synthetic/example URLs except where an existing public identity is intentionally referenced solely to verify duplicate detection.

## NCS-05 handoff

NCS-04 completion does not mean national data has been published.

NCS-05 must run the importer against a bounded acquisition sample and audit:

```text
source-resolution success rate
Tier A-ready count
blocked-source reasons
blocked-identity reasons
prefecture coverage
municipality coverage
source-family distribution
provider-ID conflicts
partition completeness
rights/reuse handling
candidate count vs Tier A-ready count
absence of invented Tier B/C facts
absence of publication timestamps before actual publication
```

Only after NCS-05 exposes and fixes importer/source-quality problems may NCS-06 perform the first bounded public Tier A wave.

## Future-site boundary

This importer is Matsuri-only.

It accepts only Festival and Folk Performance candidates and does not create Shrine, Temple, or Tomurai records.

Matsuri source resolution involving shrine/temple official pages does not activate 神社のゆくえ or 寺院のゆくえ and does not create future-site Tier A records.
