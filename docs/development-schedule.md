# Development Schedule

**Status:** Repository-ready maintenance state / F2-M01 completed / external sequence held

This document defines the stable implementation order. It complements:

- `roadmap.md` — long-range phases and gates,
- `project-status.md` — current position,
- this file — concrete work-package sequence.

The project is gate-driven rather than deadline-driven. Stable work-package IDs are independent from GitHub PR numbers.

## Current position

```text
Foundation through Stage E  completed
F1 corpus expansion          completed
F2-01 through F2-15          completed
F2-M01                       completed
F2-16 through F2-28          Operational hold
```

There is no active implementation package.

The screenshot workflow remains available for relevant UI maintenance. F2-16 remains inactive and begins only after an explicit governing-document update removes the external hold.

---

## Foundation

### Foundation 1 — Monorepo and application skeletons

Completed:

- pnpm workspace,
- portal and Matsuri application skeletons,
- shared package skeletons,
- baseline CI.

### Foundation 2 — Public project reference set

Completed:

- project concept,
- product and MVP specifications,
- public data model,
- information architecture,
- technical architecture,
- verification, Source, Evidence, image, versioning, and machine-readable policies,
- roadmap, schedule, status, and decision log.

### Foundation 3 — Accepted UI direction

Completed:

- Home H1 Search First Hybrid,
- Detail C Integrated Overview,
- white / black / gray visual base,
- Mincho-only typography direction,
- four-site accent palette,
- shared UI foundation specification.

---

## Stage A — Shared UI Foundation

```text
A1  design tokens and layout primitives — completed
A2  navigation and reference patterns — completed
A3  history, relation, evidence, place, and image patterns — completed
```

Gate completed:

- reusable site accents,
- responsive shared shell,
- keyboard focus baseline,
- no dashboard-style drift,
- zero-image-safe components,
- route-aware place treatment.

---

## Stage B — Matsuri Static Surfaces

```text
B1  Matsuri Home H1 static implementation — completed
B2  Festival Detail C static implementation — completed
B3  responsive and accessibility corrections — completed
```

Gate completed:

- accepted section order,
- desktop and mobile reading baseline,
- State and Occurrence visually distinct,
- no placeholder images,
- route-based Place presentation preserved.

---

## Stage C — Data Core

```text
C1  common record contracts — completed
C2  Matsuri extensions and vocabularies — completed
C3  cross-record validation — completed
```

Gate completed:

- schema and record-version contracts,
- stable ID and slug separation,
- reference integrity,
- Evidence target integrity,
- Current State derivation rules,
- image rights gate,
- Public Projection safety checks.

---

## Stage D — Canonical Data and Public Projection

```text
D1  representative canonical sample — completed
D2  Public Projection pipeline — completed
D3  Home and Detail integration — completed
```

Gate completed:

- approved-only Public Projection,
- deterministic output,
- no private-field leakage,
- HTML-facing and JSON-facing views from the same reviewed dataset.

---

## Stage E — Browse, Search, and Machine-readable Layer

```text
E1  Projection-backed Browse surfaces — completed
E2  Pagefind Search and initial filters — completed
E3  machine-readable baseline — completed
```

Public baseline:

```text
/version.json
/data/manifest.json
/data/entities.json
/data/events.json
/data/relations.json
/data/occurrences.json
/llms.txt
/ai.txt
/sitemap.xml
```

Gate completed:

- public Browse routes,
- full-text Search,
- Entity Type, Prefecture, and Current State filters,
- manifest and feed counts,
- approved-projection-only public output.

---

## Stage F — Corpus Expansion and Launch Preparation

### F1 — Corpus expansion

Status: **Completed through validated batches 01–10**

Expansion covered:

- Festival records,
- Folk Performance records,
- Tradition Units,
- Organization records,
- Shrine context seeds,
- Occurrence history,
- Change Events,
- Relations,
- Designations,
- Source and Evidence coverage.

The F1 gate required observation depth rather than shallow Entity-count growth.

### F2 — Launch preparation

F2 is divided into:

```text
Block A  repository baselines and launch-readiness work
Block M  repository maintenance while external work is held
Block B  external deployment and production verification
```

#### Block A — Repository work

##### F2-01 — Pages build and artifact contract

Status: **Completed**

- repository-root Pages build,
- output directory contract,
- Node.js and pnpm pins,
- static artifact checks.

##### F2-02 — Public reference and secondary browse surfaces

Status: **Completed**

- About,
- Methodology,
- Data Access,
- public Status,
- Organization Browse,
- Current State Browse.

##### F2-03 — Deployed and canonical verification tooling

Status: **Completed**

- deployed-origin HTTP verifier,
- canonical-origin strict mode,
- manifest and sitemap origin rules.

##### F2-04 — Deployment verifier hardening

Status: **Completed**

- representative record assertion,
- Search asset assertion,
- sitemap structure assertion,
- stale or incomplete deployment detection.

##### F2-05 — Analytics policy baseline

Status: **Completed**

- bounded launch questions,
- Pages project-level activation model,
- private dashboard boundary,
- account-level traffic verification gate.

##### F2-06 — Schedule and status realignment

Status: **Completed**

- stable F2 work-package IDs,
- repository work separated from external work,
- operational hold recorded without private details.

##### F2-07 — Unified release verification

Status: **Completed**

- one release-verification command,
- workspace script preflight,
- build, check, typecheck, Pages artifact, and verifier syntax stages,
- CI and local contract alignment.

##### F2-08 — Static route and internal-link integrity

Status: **Completed**

- required routes,
- generated route discovery,
- sitemap parity,
- local link resolution,
- no invented Shrine or Temple detail routes.

##### F2-09 — HTML, JSON, Search, and sitemap consistency

Status: **Completed**

- version and manifest parity,
- feed counts,
- Status counts,
- State-page membership,
- Pagefind input parity,
- development sitemap-origin boundary.

##### F2-10 — Public data semantic audit

Status: **Completed**

- State / Occurrence / Change Event separation,
- revival modeling,
- stale scheduled-Occurrence tripwire,
- Relation specificity,
- duplicate-identity checks,
- versioned public correction layer.

##### F2-11 — Source and Evidence audit

Status: **Completed**

- Source metadata,
- Evidence target symmetry,
- assertion-code checks,
- Current State freshness,
- non-social-only Current State rule.

##### F2-12 — Responsive and accessibility browser audit

Status: **Completed**

- all 20 public routes,
- desktop, tablet, and mobile Chromium,
- keyboard, overflow, structure, label, table, target-size, and console checks,
- automated WCAG A/AA checks on desktop and mobile.

##### F2-13 — Public content, empty-state, and image-boundary audit

Status: **Completed**

- Data and Methodology alignment,
- explicit held infrastructure status,
- honest Current State empty states,
- zero-image behavior,
- image rights boundary,
- route-based map treatment,
- external-link presentation.

##### F2-14 — Release-candidate artifact freeze

Status: **Completed**

- exact verified static artifact copied,
- route, record, and machine-readable inventories,
- per-file and aggregate SHA-256,
- 30-day CI artifact,
- external-only limits recorded.

##### F2-15 — Repository Launch Readiness Gate

Status: **Completed**

Command:

```text
pnpm gate:matsuri:repository
```

Required result:

```text
build green
shared checks green
shared typechecks green
static routes complete
internal links valid
Public Projection safe
HTML / JSON / Search consistent
semantic audit passed
Source / Evidence audit passed
responsive browser audit passed
accessibility audit passed
public-content boundary passed
image rights boundary passed
release candidate frozen
file and aggregate hashes verified
external hold preserved
```

After F2-15, do not invent additional prelaunch product scope solely because external deployment is held.

#### Block M — Repository maintenance while external work is held

##### F2-M01 — Full-page screenshot visual-review workflow

Status: **Completed**

Governing specification:

```text
docs/visual-review-workflow.md
```

Completed implementation sequence:

```text
1. defined the shared route and device contract
2. made the existing browser audit consume the shared route contract
3. captured all current public routes on desktop and mobile
4. recorded route-level screenshot metrics and SHA-256 values
5. audited screenshot completeness and rendered integrity
6. generated desktop and mobile contact sheets
7. generated desktop and mobile ZIP archives
8. added manual and UI-path-triggered GitHub Actions execution
9. uploaded the complete artifact for 14 days
10. ran the first complete 40-image capture
11. inspected both contact sheets and representative full-page PNG regions
12. corrected concrete UI defects found by the images
13. recaptured and recorded the post-fix result
14. returned the project to repository-ready maintenance state
```

Final coverage:

```text
20 generated public routes
× desktop 1440 × 900
× mobile 390 × 844
= 40 full-page PNGs
```

Final outputs:

```text
artifacts/matsuri-screenshots/desktop/*.png
artifacts/matsuri-screenshots/mobile/*.png
artifacts/matsuri-screenshots/manifest.desktop.json
artifacts/matsuri-screenshots/manifest.mobile.json
artifacts/matsuri-screenshots/visual-audit.json
artifacts/matsuri-screenshots/visual-audit.md
artifacts/matsuri-screenshots/contact-sheet.desktop.png
artifacts/matsuri-screenshots/contact-sheet.mobile.png
artifacts/matsuri-screenshots/screenshots-desktop.zip
artifacts/matsuri-screenshots/screenshots-mobile.zip
```

Final evidence:

```text
Screenshot workflow run  29152930338
Artifact                 matsuri-full-page-screenshots-all-29152930338
Artifact ID              8248671759
Artifact digest          sha256:d1b6eaeca9c276ac65dc66e63261028817c9b3a27dea7018a89dd331d96866ba
Desktop                  20 / 20
Mobile                   20 / 20
Automated failures       0
Automated warnings       0
Repository CI run        29152930340
```

The first review found and corrected:

- nested `main` landmarks on Browse and Reference surfaces,
- raw internal Change Event codes on public surfaces,
- an orphaned final character in the mobile Home headline.

The detailed audit is recorded in:

```text
docs/audits/matsuri-f2-m01-visual-review-2026-07-11.md
```

F2-M01 uses the GitHub Actions local build. It did not wait for Cloudflare and does not claim production review.

The workflow remains active as a maintenance capability. A successful automated screenshot audit is not human visual approval. Future UI-change pull requests must record the workflow run, artifact, reviewed images, findings, corrections, remaining limitations, and post-fix result.

#### Block B — External deployment and production verification

Status for F2-16 through F2-28: **Operational hold**

These items remain ordered and inactive.

##### F2-16 — Create or connect the Cloudflare Pages project

##### F2-17 — First Pages deployment and reachable URL acquisition

##### F2-18 — Deployed-origin smoke verification

##### F2-19 — Canonical public origin and domain decision

##### F2-20 — Configure `MATSURI_PUBLIC_ORIGIN` and redeploy

##### F2-21 — Canonical manifest and sitemap verification

##### F2-22 — Browser Pagefind Search verification on production

##### F2-23 — Robots, canonical, sitemap, and crawler-reachability review

##### F2-24 — Search-engine sitemap submission and indexability check

##### F2-25 — Enable Cloudflare Web Analytics

##### F2-26 — Deploy after Analytics activation

##### F2-27 — Verify production traffic

##### F2-28 — Final F2 Launch Gate

Required result after the hold is removed:

```text
deployed public build reachable
canonical origin configured and validated
sitemap validated against canonical origin
browser Search verified
crawler and indexability checks completed
Web Analytics enabled
production traffic observed
public Status updated to verified production state
```

---

## Maintenance while external work is held

Allowed:

- reviewed factual corrections,
- Current State freshness maintenance,
- Occurrence outcome maintenance,
- Source and Evidence maintenance,
- security and dependency maintenance,
- fixes required to keep the repository gate green,
- regeneration of the release candidate after accepted changes,
- screenshot-based visual review,
- bounded UI corrections derived from reviewed screenshot artifacts.

Not automatically activated:

```text
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

---

## Documentation rule

Before implementation:

1. read root `AGENTS.md`,
2. read the nearest nested `AGENTS.md`,
3. read `docs/project-status.md`,
4. read this schedule,
5. read the governing specifications.

Update:

- the governing document when public behavior changes,
- `decision-log.md` when a decision changes,
- `project-status.md` when current position changes,
- this schedule when implementation order changes.
