# Development Schedule

**Status:** F2-28 completed / Detail C completed / Matsuri prefecture seed baseline 47 / 47 completed / NCS-02 A/B/C baseline completed / NCS-03 national source inventory completed / NCS-04 importer completed / NCS-05 dry run completed / NCS-06 active / nationwide public corpus scaling active / stabilization reviewing / Jinja blocked

This project is gate-driven rather than deadline-driven.

## Current position

```text
Foundation through Stage E   completed
F1 corpus expansion           completed
F2-01 through F2-28           completed
F2-M01                        completed
F2-M02                        completed
F2-P01 through F2-P13         completed
Phase 9 Launch Preparation    completed
Phase 10 Stabilization        active
Phase 10A Detail C repair     completed
Phase 10B Prefecture seed     completed 47 / 47
Phase 10C Maintenance         active
Phase 10D Nationwide scaling  active
NCS-01                        completed
NCS-02                        completed
NCS-03                        completed
NCS-04                        completed
NCS-05                        completed
NCS-06                        active
Corpus batches 11-43          completed
Stabilization review          reviewing
Formal review complete        false
Actual Jinja start gate       blocked
```

## Phase 10B — Prefecture seed baseline

Status: **Completed, but not nationwide corpus completion**

The 47 / 47 checkpoint proves only that every prefecture has at least one reviewed primary Matsuri record under the initial breadth rule.

```text
Public Entities              120
Specialist primary records    57
Primary prefecture presence   47 / 47
```

The public corpus must now grow from dozens to hundreds and then thousands where source inventory supports it. Private candidate discovery alone is not completion.

## Phase 10C — Matsuri maintenance and stabilization

Status: **Active in parallel**

Priority maintenance remains due Occurrence review, historical gaps, Change Events, Relation/provenance improvement, Source/Evidence quality, stale-State/link correction, and public-product regression maintenance.

Evidence boundaries remain strict: elapsed dates do not prove `held`; absence of cancellation evidence does not prove completion; unsupported organizer, Place, Relation, coordinate, or Current State claims are not added.

Maintenance and nationwide scaling run in parallel. A difficult freshness case does not redefine the nationwide A/B/C publication model.

## Phase 10D — Nationwide Matsuri public corpus scaling

Status: **Active**

Governing specification:

```text
docs/nationwide-corpus-scaling.md
```

The operating model is:

```text
Tier A  Public Index
  ↓ target: about 7 calendar days
Tier B  Public Verified
  ↓ continuous deepening
Tier C  Public History / Monitoring
```

Tier A creates national public discovery breadth. Tier B adds verified profile/current-observation depth. Tier C adds longitudinal history and monitoring.

### NCS sequence

```text
NCS-01  governing specification / schedule alignment                    completed
NCS-02  A/B/C classifier + current-corpus baseline                       completed
NCS-03  national authoritative-source inventory                          completed
NCS-04  deterministic candidate + Tier A importer / identity-dedupe      completed
NCS-05  bulk dry run + Tier A publication-readiness audit                completed
NCS-06  first bounded Tier A public wave + continuous A→B promotion      active
NCS-07  cumulative 500 public primary Matsuri records                    checkpoint
NCS-08  cumulative 1,000 public primary Matsuri records                  checkpoint
NCS-09  source-inventory-derived national target + A→B→C expansion       future
```

500 and 1,000 mean public specialist-primary records across Tier A/B/C. They do not mean private candidates and are not claims of nationwide completeness.

### Tier A — Public Index rule

A reviewed Tier A record may be intentionally thin.

Minimum direction:

```text
reviewed canonical identity + type
prefecture + municipality or appropriate broader regional scope
approved authoritative source
source verification/access date
identity / duplicate check
machine-visible Tier A classification
real Tier A publication timestamp for newly published records
```

Tier A is public and may enter detail/browse/search, public JSON, sitemap, and search-engine discovery.

Tier A does **not** require Current State, completed Occurrence, Change Event, multi-year history, organizer, Place, Relation, or coordinates before publication. Unsupported values in those dimensions remain absent rather than inferred.

### Tier A → B target

Every newly published Tier A record should be promoted toward Tier B in about seven calendar days.

The seven-day value is a service target / prioritization rule, not a release blocker:

```text
report due and overdue Tier A
prioritize overdue Tier A for verification
continue unrelated valid Tier A publication
never invent facts to satisfy the target
never auto-withdraw a valid Tier A only because seven days elapsed
keep evidence-blocked records public as Tier A with missing dimensions reported
```

One difficult or overdue Tier A record must not stop national expansion globally.

### Tier B — Public Verified rule

Tier B requires Tier A plus the applicable reviewed verification dimensions, including substantive profile text, evidence-backed Current State, supportable Place/timing/organizer/Relation information, direct profile Evidence, reviewed authoritative links, and at least one dated evidence-backed observation anchor.

Tier B does **not** require multi-year history.

### Tier C — Public History / Monitoring rule

Tier C adds longitudinal value such as multiple-year Occurrences, cancellation/postponement/partial-held/revival history, meaningful Change Events, governance or venue changes, freshness monitoring, or richer Relation history.

Tier C deepening continues while Tier A breadth and Tier B verification continue.

### NCS-02 completed baseline

NCS-02 was merged by PR #270 at main commit `031b5de385330d9ef1eb3db728a8b11a3d04807c`.

```text
Specialist primary subjects                  57
Tier A — Public Index                        19
Tier B — Public Verified                      8
Tier C — Public History / Monitoring         30
Below Tier A                                  0
Public specialist-primary total              57
Prefectures represented                      47
Municipality scopes represented              55
```

Historical measurements remain descriptive only:

```text
Completed Occurrence history                52 / 57
Multi-year completed Occurrence history     37 / 57
Evidence-backed Change Events               57 / 57
Current State Evidence                      56 / 57
Direct profile Evidence                     39 / 57
```

The 37 / 57 value is not a Tier A/B publication floor.

The current 19 Tier A records lack authentic Tier A publication timestamps in the legacy model, so the classifier reports their age as metadata-missing rather than inventing an overdue age.

### NCS-03 — National authoritative-source inventory

Status: **Completed**

Source of truth:

```text
config/matsuri-national-source-inventory.json
docs/matsuri-national-source-inventory.md
```

NCS-03 established:

```text
11 source families
47 / 47 prefecture control set
direct / conditional / discovery-only / supporting-only source roles
Agency national DB current 2,000-record CSV export ceiling
partition-completeness requirement for national structured acquisition
text / image / bulk reuse boundaries per source family
8,255 local intangible-folk designation scale reference
342 national Important Intangible Folk designation scale reference
NCS-04 source-resolution / provenance / rights / no-inference handoff contract
```

The 8,255 value is not a Japanese-festival count and is not a corpus target.

NCS-03 does not authorize a public bulk release or activate a future specialist site.

### NCS-04 — Candidate + Tier A importer / identity-dedupe pipeline

Status: **Completed**

Merged by PR #273 at main commit:

```text
0047a7853c45c561e14c7119e05c9556cd4ca5ad
```

Source of truth:

```text
config/matsuri-tier-a-importer-contract.json
docs/matsuri-tier-a-importer.md
scripts/lib/matsuri-tier-a-importer.mjs
scripts/import-matsuri-tier-a-candidates.mjs
scripts/check-matsuri-tier-a-importer.mjs
```

Implemented boundaries:

```text
consume the NCS-03 source-family registry
resolve discovery-only sources to an acceptable underlying publisher before readiness
capture source-family role / publisher role / exact URL / access date / provider identifier when available
retain source-family-specific rights/reuse metadata
normalize name / type / geography without inventing facts
perform deterministic existing-public / same-batch / provider-record identity checks
emit explicit blocked_input / blocked_source / blocked_identity results
create readiness-only Tier A drafts only after source-family and identity minimums pass
keep Current State / Occurrence outcome / organizer / Place / Relation / coordinates / history absent when unsupported
reject candidate-supplied tier_a_published_at
never write tier_a_published_at during candidate generation or dry run
write no canonical public data
publish no Tier A records
assign no canonical ID or public slug
```

The importer fails closed when a discovery-only aggregator cannot be resolved to an acceptable underlying source.

### NCS-05 — Bulk dry run + Tier A publication-readiness audit

Status: **Completed**

Merged by PR #275 at main commit:

```text
4f8afbd0dd429e84c92988e5ba0d6089d28785aa
```

Sources of truth:

```text
config/matsuri-tier-a-publication-readiness-contract.json
config/matsuri-tier-a-dry-run-baseline.json
docs/matsuri-tier-a-dry-run.md
scripts/lib/matsuri-tier-a-publication-readiness.mjs
scripts/check-matsuri-tier-a-publication-readiness.mjs
scripts/check-matsuri-tier-a-dry-run.mjs
```

The bounded real-source run produced only a public-safe aggregate:

```text
real-source candidates                   6
source-resolution success                6
Tier A publication-ready                 2
blocked_review                           3
blocked_input                            1
blocked_source                           0
blocked_identity                         0
published                                0
```

NCS-05 added a separate explicit review gate on top of the NCS-04 deterministic source/identity checks. It requires reviewed identity, subject type, geography, source role, and name variants, forbids automation self-approval, and requires an explicit source-supported basis for broader geographic scope when municipality is absent.

The operational candidate queue, candidate identifiers, provider identifiers, and exact candidate URLs remain outside the public repository. NCS-05 published no public record and wrote no `tier_a_published_at`.

### NCS-06 — First bounded Tier A public wave

Status: **Active**

NCS-06 must select only records that pass both NCS-04 and NCS-05. The public wave must add actual canonical Matsuri primary records rather than candidate artifacts.

Required publication verification:

```text
reviewed identity / type / geography
approved authoritative Source
identity Evidence
machine-visible Tier A classification
authentic Tier A publication timestamp
no unsupported Tier B/C dimensions
detail HTML generated
public JSON generated
search/browse inclusion
sitemap inclusion
exact corpus-quality baseline refreshed
production detail / JSON / sitemap verified after deployment
```

A→B work starts from the real publication timestamp. Tier A validity does not depend on immediate Tier B completion.

### Public-growth guard

The nationwide track must report public growth and verification depth separately:

```text
private candidate count
Tier A public count
Tier A due / overdue / blocked dimensions
Tier B public count
Tier C public count
new Tier A publication
A→B promotion
prefecture coverage
municipality coverage
source-family coverage
```

Candidate count alone is never public growth.

High-volume publication must not bypass Tier A identity/source/dedupe review. However, no global backlog stop is created merely because one Tier A record is overdue.

### Immediate execution order

```text
1. select a bounded NCS-06 wave only from NCS-04 + NCS-05 reviewed-ready records
2. re-check authoritative sources before publication and repeat exact identity/dedupe checks against current main
3. write only canonical Tier A minimum data and authentic publication metadata; do not invent Tier B/C facts
4. build detail HTML / public JSON / search-browse / sitemap and add a dedicated publication-wave checker
5. refresh corpus-quality baseline from the exact classifier output, not from estimates
6. merge the bounded public wave after exact-head verification
7. verify production detail / JSON / sitemap after deployment
8. begin A→B work from actual publication timestamps while unrelated valid Tier A waves may continue
9. advance public primary records toward 500 then 1,000 while B→C history deepening and independent freshness maintenance continue
```

## Parallel stabilization review

Stabilization remains active and independent. Owner-private Analytics / Search Console observations do not block NCS-06 repository work.

Dated Occurrence reviews remain fail-closed; elapsed dates do not justify `held`.

## Future-site boundary

Jinja, Jiin, and Tomurai remain separately gated for activation.

The public A→B→C operating principle is reusable across the four specialist sites, but each future site must define and satisfy its own Tier A identity/source minimum and Tier B verification dimensions before activation.

State-free Shrine / Temple relation seeds may support Matsuri research but do not automatically become public Tier A records on another site.

## Work not activated

```text
portal production deployment
future specialist-site implementation
apps/jinja
apps/jiin
apps/tomurai
Jinja/Jiin/Tomurai Worker or hostname activation
Stats
Compare
dynamic API
MCP
paid API
x402 billing
D1 canonical database
real-time ingestion
complex graph visualization
```
