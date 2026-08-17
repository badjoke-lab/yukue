# Development Schedule

**Status:** F2-28 completed / Detail C completed / Matsuri prefecture seed baseline 47 / 47 completed / nationwide corpus scaling active / stabilization reviewing / Jinja blocked

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
Corpus batches 11-43          completed
Stabilization review          reviewing
Formal review eligible        true
Formal review complete        false
Actual Jinja start gate       blocked
```

## Completed F2 launch sequence

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  deployed-origin smoke verification — completed
F2-19  exact canonical Matsuri hostname decision — completed
F2-20  Custom Domain activation and HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  browser Pagefind Search verification — completed
F2-23  crawler-reachability review — completed
F2-24  Search Console sitemap submission and indexability check — completed
F2-25  Cloudflare Web Analytics Automatic setup observed enabled — completed
F2-26  post-activation main production deployment — completed
F2-27  production traffic verification — completed
F2-28  final F2 Launch Gate — completed
```

F2-28 does not claim search-engine indexation and does not authorize Jinja.

## Phase 10A — Detail C product contract

Status: **Completed and continuously enforced**

```text
real Festival / Performance / Organization detail pages
State-free Shrine and Temple seed references
Place pages with reverse links
bidirectional Relations
claim-linked Evidence and Sources
individual public JSON
Pagefind direct details
complete sitemap coverage
concrete map anchors or approved official maps
static + Chromium + representative screenshot checks
```

## Phase 10B — Prefecture seed baseline

Status: **Completed, but not nationwide corpus completion**

The 47 / 47 checkpoint proves that every prefecture has at least one reviewed primary Matsuri record under the original breadth rule. It is now classified only as a geographic seed baseline.

```text
Primary prefecture presence  47 / 47
Public Entities              120
Places                       108
State Snapshots               56
Change Events                106
Relations                     70
Occurrences                  166
Sitemap entries              238
Sources                      318
Evidence                     699
```

The previous instruction that geographic breadth was complete and Entity-count growth was no longer a target is superseded for nationwide-corpus planning. Quantity alone is still not a quality metric, but national public coverage is an explicit requirement.

## Phase 10C — Matsuri maintenance and stabilization

Status: **Active in parallel**

Priority maintenance remains:

```text
1. due 2026 Occurrence reviews with explicit post-event Evidence
2. historical Occurrence gaps
3. real Change Events that explain state or format transitions
4. Relation density and provenance improvements
5. claim-specific Evidence and Source quality
6. stale-State / stale-link review and corrections
7. Detail C / map / Search / machine-readable regression maintenance
```

Maintenance is no longer the sole primary product track. It runs in parallel with nationwide corpus scaling.

Do not infer `held`, Current State changes, coordinates, Relations, or official links merely to close a maintenance or scaling gate.

## Phase 10D — Nationwide Matsuri corpus scaling

Status: **Active**

Governing specification:

```text
docs/nationwide-corpus-scaling.md
```

The objective is national-scale public coverage without creating a shallow directory.

### NCS sequence

```text
NCS-01  specification / schedule / status alignment
NCS-02  machine quality and depth classifier over existing corpus
NCS-03  national authoritative-source inventory
NCS-04  deterministic candidate importer + identity/dedupe pipeline
NCS-05  non-public bulk dry run and error audit
NCS-06  first public-quality expansion pilot under the new gate
NCS-07  cumulative 500 public-quality primary Matsuri records
NCS-08  cumulative 1,000 public-quality primary Matsuri records
NCS-09  source-inventory-derived national target and continued expansion
```

NCS-07 and NCS-08 are scaling checkpoints, not completion claims.

### Publication boundary

Index-only records are allowed only as non-public candidates.

A new public primary Matsuri record must satisfy the substantive minimum in `docs/nationwide-corpus-scaling.md`, including Basic Profile, evidence-bounded Current State, and at least one completed dated Occurrence or evidence-backed Change Event.

A public release must not consist only of breadth work. Before bulk publication, the machine quality gate must measure depth distribution and promotion backlog and must prevent expansion from producing a permanent shallow second class of records.

### Automation objective

Use automation for candidate discovery, source normalization, draft generation, Evidence packet assembly, duplicate detection, and quality metrics. Keep public approval fail-closed and reviewed.

The design target is to process hundreds or thousands of candidates per ingestion run without approving hundreds or thousands of unsupported public claims.

## Parallel stabilization review

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Status                reviewing
Review eligible       true
Review complete       false
Machine record        config/matsuri-stabilization-review.json
```

The state model is `observing -> reviewing -> complete`. Elapsed time alone does not complete the gate.

The remaining formal-review work requires current private observation for Cloudflare Web Analytics traffic and Search Console. Those owner-private observations do not block NCS-02 through NCS-05 repository work.

Dated Occurrence reviews continue in parallel with NCS work and must remain fail-closed until post-event Evidence supports an outcome.

## Immediate execution order

```text
1. merge NCS-01 governing documentation and use it as source of truth
2. implement NCS-02 machine classifier for public_core / history_enriched / monitored depth
3. measure current corpus quality distribution before setting the first bulk-release threshold
4. build NCS-03 national authoritative-source inventory with source-family and geographic coverage
5. implement NCS-04 importer, provenance capture, identity keys, and duplicate/conflict queue
6. run NCS-05 at bulk scale without publishing candidate shells
7. audit dry-run false positives, duplicates, missing fields, Source/Evidence mapping, and description quality
8. only then run NCS-06 public-quality pilot through the substantive public-record gate
9. keep due Matsuri Occurrence freshness and existing production regressions green in parallel
10. do not activate Jinja until its existing gate plus the future-site quality prerequisites are satisfied
```

## Future-site boundary

```text
Matsuri F2-28 complete                 true
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
```

Current State-free Shrine seeds remain candidate/reference material only. They are not acceptable as the public primary corpus of 神社のゆくえ.

Before Jinja, Jiin, or Tomurai public activation, each site must have its own substantive public-record contract, authoritative source inventory, candidate ingestion/dedupe path, machine quality metrics, and public quality gate as required by `docs/nationwide-corpus-scaling.md`.

## Work not activated

```text
portal production deployment
future specialist-site implementation
Jinja State specification approval
apps/jinja
Jinja Worker or hostname activation
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
