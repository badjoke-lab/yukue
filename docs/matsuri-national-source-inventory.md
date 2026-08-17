# Matsuri National Authoritative-Source Inventory

**Status:** NCS-03 accepted inventory / NCS-04 importer not yet activated

## Purpose

This document defines the nationwide source families that Matsuri may use to discover, review, and publish public Tier A records at national scale.

It implements NCS-03 from `docs/nationwide-corpus-scaling.md`.

The output of NCS-03 is a source contract, not an importer and not a publication wave.

```text
NCS-03  source inventory
→ NCS-04 candidate + Tier A importer / identity-dedupe / publication-time pipeline
→ NCS-05 dry run
→ NCS-06 first bounded public Tier A wave
```

No Jinja, Jiin, or Tomurai implementation, hostname, Worker, or publication is activated by this inventory.

Machine-readable source-of-truth:

```text
config/matsuri-national-source-inventory.json
```

## Why this inventory is necessary

The current 57 specialist-primary Matsuri records are a reviewed seed corpus, not a plausible national endpoint.

The latest Agency for Cultural Affairs local-designation statistics available during NCS-03 report, as of 2025-05-01:

```text
locally designated intangible folk cultural properties
prefectural designations   1,732
municipal designations     6,523
total                      8,255
```

Official source:

```text
https://www.bunka.go.jp/seisaku/bunkazai/shokai/chiho_shitei/kensu.html
```

This is **not** a count of Japanese festivals. It includes intangible folk cultural properties outside Matsuri scope, may contain subject/granularity differences, and requires filtering and deduplication. It is used only to establish the order of magnitude of the source universe.

The Agency's national designation count page also reports 342 Important Intangible Folk Cultural Properties as of 2026-08-01:

```text
https://www.bunka.go.jp/seisaku/bunkazai/shokai/shitei.html
```

That national-designation stratum is high-authority but far too small to define national Matsuri coverage on its own.

## Source hierarchy

National scaling uses four source roles rather than treating every discovered URL as equivalent.

### 1. Direct Tier A identity sources

These may directly support Tier A identity/geography when the individual record actually supports the claim:

```text
Agency for Cultural Affairs national cultural-property database
prefectural cultural-property registries
municipal cultural-property registries
municipality official culture / festival / education-board pages
official festival / preservation / responsible-organization sources
```

Tier A still requires claim-specific review, source access date, and identity/dedupe checks.

### 2. Conditional Tier A identity sources

These can directly support Tier A only after publisher role and subject relationship are verified:

```text
official / public tourism bodies
shrine or temple official sources directly documenting the Matsuri subject
```

A commercial tourism page is not upgraded to `official_tourism_body` merely because it is popular or polished.

A shrine/temple source used by Matsuri does not activate a future specialist site and does not make the shrine/temple itself a future-site Tier A record.

### 3. Discovery-only aggregators

These are valuable for national enumeration and source discovery but must be resolved to the underlying authoritative provider before Tier A approval:

```text
Cultural Heritage Online
Japan Search
```

### 4. Supporting sources

These are useful for history, Change Events, Occurrence outcomes, and cross-checking, but are not the default first-publication identity source when a direct official/public source exists:

```text
academic / museum / institutional research
credible news reporting
```

## National structured source — Agency for Cultural Affairs

### Database

```text
Database of Nationally Designated Cultural Properties
https://kunishitei.bunka.go.jp/bsys/index
```

The Agency describes this as a unified search system for cultural properties designated, registered, or selected by the national government.

About page:

```text
https://kunishitei.bunka.go.jp/bsys/about
```

Important Matsuri-relevant strata include:

```text
Important Intangible Folk Cultural Properties
Registered Intangible Folk Cultural Properties
Intangible Folk Cultural Properties selected for recording measures
```

The classification interface includes Matsuri-relevant categories such as annual events, religious festivals, kagura, dengaku, furyu, and other folk performing arts.

### CSV acquisition ceiling

The database's 2026-05-07 notice states that, because of a system-maintenance issue, all-record CSV export is not currently available and users should export **2,000 records or fewer** at a time.

Notice:

```text
https://kunishitei.bunka.go.jp/bsys/news
```

Therefore NCS-04 must not depend on one all-record export.

Required partition strategy:

```text
1. partition by designation/register class
2. partition further by prefecture where needed
3. partition further by Matsuri-relevant classification where needed
4. keep every requested partition <= 2,000 rows
5. verify partition completeness and overlap before dedupe
6. preserve original source record identifiers / URLs
```

The exact partition keys used by the importer must be tested in NCS-05. NCS-03 establishes the requirement, not the implementation.

### Rights / reuse

The database terms state that **text information may be used freely with source attribution**.

Terms:

```text
https://kunishitei.bunka.go.jp/top/policy
```

Images are different: third parties may hold rights, and the database instructs users to obtain permission as applicable from the listed owner/manager/responsible body.

Therefore:

```text
text fields      reusable with attribution, subject to the stated terms
images           never assumed reusable
image URL        not a license
Tier A identity  may use the database directly
Current State    not inferred from designation status
held outcome     not inferred from designation status
```

The database also warns that displayed records may differ from actual designation/registration counts while records are being prepared. NCS-04/NCS-05 must therefore distinguish source enumeration from completeness claims.

## Local designated cultural properties

The 8,255 local-designation figure makes prefectural and municipal source families essential.

### Prefectural registries

Expected role:

```text
publisher             prefectural government
Tier A suitability    direct for supported identity/geography/designation facts
format                 heterogeneous
bulk capability        varies by prefecture
rights                 prefecture-specific
```

Possible forms include official cultural-property databases, official lists, spreadsheets, PDFs, and cultural-policy pages.

NCS-04 must treat the source as authoritative only for claims that the prefecture actually publishes. A prefectural designation does not by itself prove present activity or a 2026 Occurrence outcome.

### Municipal registries

Expected role:

```text
publisher             municipal government / board of education
Tier A suitability    direct for supported identity/geography/designation facts
format                 highly heterogeneous
bulk capability        varies by municipality
rights                 municipality-specific
```

Municipal sources are necessary because the Agency's latest local-designation statistics attribute 6,523 of the 8,255 locally designated intangible folk cultural properties to municipalities.

Municipal cultural-property databases/lists are especially important for the long tail that is absent from national designation data.

## Official municipality pages

Not every Matsuri subject is a designated cultural property.

Municipality official pages therefore form another direct Tier A source family for:

```text
festival / performance identity
municipality / locality
usual timing when explicitly stated
current official schedule when explicitly stated
official local history when explicitly stated
```

They are not automatically enumerated datasets and will often be used after discovery from search/index pages or other inventories.

Pre-event pages remain pre-event Evidence. They do not prove that a past event was actually held.

## Official tourism bodies

Official/public tourism bodies can be strong sources when the publisher role is clear.

They may support:

```text
identity
region / venue description
usual timing
visitor-facing official links
current schedule announcements
```

They must not be treated as a blanket authority for governance, long-term Current State, historical continuity, or Occurrence outcome.

The importer must preserve publisher-role verification rather than classifying any tourism-domain page as official automatically.

## Official festival / preservation / responsible organizations

Direct subject organizations are important for both the long tail and A→B promotion.

They may support:

```text
canonical/common subject identity
organizer / responsible organization when explicit
usual timing
current scheduled occurrence
format changes
official links
preservation-group identity
```

An official organization source may be a direct Tier A identity source.

Official social posts may be used as limited claim-specific Evidence, but should not automatically establish long-term State when stronger durable sources are available.

## Shrine / temple official sources

A shrine or temple official source can support a Matsuri subject when it directly documents the festival, ritual, place, or timing.

This family is conditional because the relationship itself must be established.

Rules:

```text
Matsuri claim use                       allowed when directly supported
Relation inference                     prohibited
Place inference                        prohibited
future Jinja/Jiin Tier A promotion     prohibited
future-site activation                 prohibited
```

## Cultural Heritage Online

```text
https://online.bunka.go.jp/
```

The portal is operated by the Agency for Cultural Affairs and exposes both national and local cultural-property records from multiple providers. It is useful for discovering local-designation records and identifying the underlying provider.

The site/about page states that individual text, photographs, video, illustrations, and the edited site as a whole are copyright-protected, and prohibits unauthorized reuse outside legally permitted uses.

```text
https://online.bunka.go.jp/about
```

Therefore NCS-03 classifies Cultural Heritage Online as:

```text
national discovery portal          yes
Tier A source without resolution   no
bulk prose reuse source            no
provider/source discovery          yes
linking                            allowed under the site's stated link policy
```

The importer should resolve the provider shown by the portal and use the underlying official/public source when possible.

## Japan Search

```text
https://jpsearch.go.jp/
```

Japan Search exposes a Web API for metadata across linked databases and currently identifies Cultural Heritage Online as API-retrievable.

API overview:

```text
https://jpsearch.go.jp/static/developer/webapi/ch1_intro.html
```

Linked-database inventory:

```text
https://jpsearch.go.jp/stats
```

For Matsuri, Japan Search is a **discovery/transport layer**, not a direct authority upgrade.

Required behavior:

```text
use API to discover provider records where useful
retain linked database/provider identity
resolve the underlying record/source
apply the underlying provider's rights and authority rules
never call a record Tier A only because Japan Search contains it
```

## Supporting academic / institutional sources

Academic publications, museums, archives, and institutional reports are valuable for:

```text
historical identity
historical location
continuity / discontinuity evidence
classification
historical Relations
Change Events
```

They are supporting sources by default for Tier A, but may be strong Tier B/C Evidence for specific historical claims.

Publication-specific copyright/reuse rules apply.

## Credible news

Credible news is useful for dated Change Events and Occurrence outcomes such as:

```text
cancellation
postponement
partial holding
revival
format change
disaster interruption
governance change
```

News is not the default Tier A identity source when an official/public identity source exists.

News text and images are not bulk-reuse inputs.

## 47-prefecture coverage contract

The machine inventory contains all 47 prefecture codes as the geographic control set.

NCS-04/NCS-05 must be able to report discovery and public-readiness by that fixed set.

This does **not** mean one source URL is hard-coded for each prefecture in NCS-03. Source systems are heterogeneous and may be replaced or reorganized. The stable NCS-03 contract is the source-family role and the requirement that ingestion/reporting be prefecture-complete.

For a broad ingestion run, the importer must report:

```text
prefectures queried
prefectures with discovered candidates
prefectures with direct authoritative source resolution
prefectures with unresolved discovery-only records
municipality coverage
source-family coverage
```

A missing local database is a source-ceiling result to report, not a reason to invent a source or silently substitute a commercial page.

## NCS-04 input contract

The machine inventory separates source families into:

### Direct Tier A

```text
national_cultural_database
prefectural_cultural_property_registry
municipal_cultural_property_registry
municipality_official
official_organization
```

### Conditional Tier A

```text
official_tourism_body
shrine_or_temple_official
```

### Discovery only

```text
cultural_heritage_online
japan_search
```

### Supporting only

```text
academic_or_institutional
credible_news
```

Before a candidate can become Tier A, NCS-04 must:

1. resolve discovery-only records to an acceptable underlying publisher;
2. capture publisher role and exact source URL;
3. capture source access/verification date;
4. preserve stable provider/source identifiers where available;
5. normalize name/type/geography without inventing facts;
6. run deterministic identity/dedupe checks;
7. apply source-family-specific rights/reuse behavior;
8. keep unsupported Current State, Occurrence outcome, organizer, Place, Relation, coordinates, and officiality absent;
9. record `tier_a_published_at` only at actual public publication.

## NCS-03 completion boundary

NCS-03 is complete when:

```text
machine-readable source-family inventory exists
47-prefecture geographic control set exists
national structured-source partition constraint is recorded
Tier A direct / conditional / discovery / supporting roles are explicit
rights/reuse boundary is explicit per source family
local-designation scale references are recorded as scale references, not corpus targets
NCS-04 inputs are explicit
no importer is activated
no bulk public release is authorized
no future specialist site is activated
```

NCS-04 may then implement the deterministic candidate + Tier A importer against this contract.
