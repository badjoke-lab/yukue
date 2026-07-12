# Development Schedule

**Status:** F2-16 active / Workers Static Assets external sequence

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
F2-16                         active
F2-17 through F2-28          pending
```

The external operational hold was removed on 2026-07-12.

---

## Foundation

### Foundation 1 — Monorepo and application skeletons

Status: **Completed**

- pnpm workspace,
- portal and Matsuri application skeletons,
- shared package skeletons,
- baseline CI.

### Foundation 2 — Public project reference set

Status: **Completed**

- project concept,
- product and MVP specifications,
- public data model,
- information architecture,
- technical architecture,
- verification, Source, Evidence, image, versioning, and machine-readable policies,
- roadmap, schedule, status, and decision log.

### Foundation 3 — Accepted UI direction

Status: **Completed**

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

## Stage B — Matsuri Static Surfaces

```text
B1  Matsuri Home H1 static implementation — completed
B2  Festival Detail C static implementation — completed
B3  responsive and accessibility corrections — completed
```

## Stage C — Data Core

```text
C1  common record contracts — completed
C2  Matsuri extensions and vocabularies — completed
C3  cross-record validation — completed
```

## Stage D — Canonical Data and Public Projection

```text
D1  representative canonical sample — completed
D2  Public Projection pipeline — completed
D3  Home and Detail integration — completed
```

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

---

## Stage F — Corpus Expansion and Launch Preparation

### F1 — Corpus expansion

Status: **Completed through validated batches 01–10**

Expansion covered Festivals, Folk Performances, Tradition Units, Organizations, Shrine context seeds, Occurrence history, Change Events, Relations, Designations, Sources, and Evidence.

### F2 — Launch preparation

F2 is divided into:

```text
Block A  repository baselines and launch-readiness work
Block M  repository visual-review maintenance
Block B  external deployment and production verification
```

#### Block A — Repository work

```text
F2-01  static build and artifact contract — completed
F2-02  public reference and secondary browse surfaces — completed
F2-03  deployed and canonical verification tooling — completed
F2-04  deployment verifier hardening — completed
F2-05  analytics policy baseline — completed
F2-06  schedule and status realignment — completed
F2-07  unified release verification — completed
F2-08  static route and internal-link integrity — completed
F2-09  HTML, JSON, Search, and sitemap consistency — completed
F2-10  public data semantic audit — completed
F2-11  Source and Evidence audit — completed
F2-12  responsive and accessibility browser audit — completed
F2-13  public content, empty-state, and image-boundary audit — completed
F2-14  release-candidate artifact freeze — completed
F2-15  Repository Launch Readiness Gate — completed
```

Repository gate command:

```text
pnpm gate:matsuri:repository
```

The gate now includes `wrangler.jsonc` validation for the static Workers deployment contract.

#### Block M — Repository visual review

```text
F2-M01  full-page screenshot visual-review workflow — completed
```

The workflow remains available for non-trivial UI maintenance.

#### Block B — External deployment and production verification

The external operational hold was removed on 2026-07-12.

##### F2-16 — Cloudflare Workers Builds connection

Status: **Active**

Governing runbook:

```text
docs/cloudflare-pages-launch-runbook.md
```

The historical filename is retained temporarily, but the document now governs Workers Builds and Workers Static Assets.

Implementation order:

```text
1. merge the Workers Static Assets activation PR into main
2. open Cloudflare Workers & Pages
3. select Create application
4. select Import a repository / Continue with GitHub
5. select badjoke-lab/yukue
6. set Worker name matsuri-yukue
7. set production branch main
8. keep root directory at repository root / blank
9. set build command pnpm build:matsuri:workers
10. set deploy command npx wrangler@latest deploy
11. keep non-production deploy command npx wrangler@latest versions upload
12. set NODE_VERSION=24
13. set PNPM_VERSION=11.10.0 when offered as a build variable
14. leave MATSURI_PUBLIC_ORIGIN unset
15. confirm Cloudflare recognizes the committed wrangler.jsonc
16. select Save and Deploy
17. record Worker name, branch, build settings, deploy settings, and first build start
```

F2-16 completion condition:

```text
GitHub repository connected
Cloudflare Worker created
Worker name matches wrangler.jsonc
production branch recorded
build and deploy settings recorded
first production build started
```

Do not:

- select `apps/matsuri` as the root directory,
- allow Cloudflare autoconfiguration to replace the committed Wrangler contract,
- add the Cloudflare Astro SSR adapter,
- add Worker runtime code or a `main` entry,
- add runtime bindings,
- set `MATSURI_PUBLIC_ORIGIN`,
- attach a custom domain,
- enable Web Analytics.

##### F2-17 — First deployment and reachable URL acquisition

Status: **Pending; may begin in the same dashboard session as F2-16**

Completion condition:

```text
Cloudflare build succeeded
production workers.dev URL issued
URL reachable
source commit recorded
Node and pnpm versions recorded
```

Do not record or assume the exact `workers.dev` hostname until Cloudflare issues and serves it.

##### F2-18 — Deployed-origin smoke verification

Status: **Pending**

Use the manual workflow:

```text
Verify Matsuri deployed origin
```

Inputs:

```text
origin     exact issued workers.dev production origin
canonical  false
```

Completion condition:

- required public routes return successful responses,
- Pagefind assets are reachable,
- public JSON and discovery files are reachable,
- Matsuri site markers match,
- the representative Entity is present,
- sitemap structure is valid.

##### F2-19 — Exact canonical Matsuri subdomain decision

Status: **Pending**

The topology decision is already fixed as subdomains:

```text
parent domain root  series portal
Matsuri subdomain   祭のゆくえ
Jinja subdomain     神社のゆくえ
Jiin subdomain      寺院のゆくえ
Tomurai subdomain   弔いのゆくえ
```

F2-19 resolves and records the exact parent domain and Matsuri hostname. Do not use a preview URL.

##### F2-20 — Attach custom domain, configure `MATSURI_PUBLIC_ORIGIN`, and redeploy

Status: **Pending**

Attach the exact accepted Matsuri subdomain, set the Production build variable to that origin, and trigger a new deployment.

##### F2-21 — Canonical manifest and sitemap verification

Status: **Pending**

Require:

```text
manifest.site_origin == checked origin
all sitemap <loc> values use the checked origin
```

##### F2-22 — Browser Pagefind Search verification

Status: **Pending**

Verify in a real browser that a known Matsuri record can be found on the production origin.

##### F2-23 — Robots, canonical, sitemap, and crawler-reachability review

Status: **Pending**

Confirm public accessibility, canonical markup, sitemap reachability, and absence of accidental crawler blocking.

##### F2-24 — Search-engine sitemap submission and indexability check

Status: **Pending**

Submit only after F2-21 through F2-23 pass. Record indexability without claiming guaranteed indexing.

##### F2-25 — Enable Cloudflare Web Analytics

Status: **Pending**

Enable only after canonical and crawler verification.

##### F2-26 — Deploy after Analytics activation

Status: **Pending**

Trigger a new production deployment after Analytics is enabled.

##### F2-27 — Verify production traffic

Status: **Pending**

Confirm real production requests appear in the private Analytics dashboard.

##### F2-28 — Final F2 Launch Gate

Status: **Pending**

Required result:

```text
public build reachable
canonical subdomain configured and validated
sitemap validated
browser Search verified
crawler and indexability checks completed
Web Analytics enabled
production traffic observed
public Status updated to verified production state
```

---

## Work allowed during external activation

- Workers Builds setup according to the runbook,
- first-deployment diagnosis,
- deployed-origin verification,
- reviewed factual corrections,
- Current State freshness maintenance,
- Occurrence outcome maintenance,
- Source and Evidence maintenance,
- security and dependency maintenance,
- fixes required to keep the repository gate green,
- screenshot-based visual review for non-trivial UI changes.

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
