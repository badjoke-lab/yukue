# Project Status

**Last updated:** 2026-07-12

## Current phase

```text
Execution Stage F — Launch Preparation
```

## Current gate state

```text
F2-15 — Repository Launch Readiness Gate — completed
F2-M01 — Full-page screenshot visual-review workflow — completed
F2-16 — Cloudflare Workers Builds connection — active
F2-17–F2-28 — pending in fixed order
```

The external operational hold was removed on 2026-07-12.

`祭のゆくえ` has completed repository-side launch preparation and the first exhaustive screenshot visual-review baseline. The active task is now the first Cloudflare Workers Builds Git-integration setup using Workers Static Assets.

This does not mean that a public deployment URL, canonical origin, production Search, crawler reachability, indexability, Web Analytics, or production traffic has been verified.

## Completed implementation

### Foundation and reference layer

- Yukue Series monorepo,
- portal and Matsuri application foundations,
- shared package foundations,
- GitHub Actions baseline,
- public project reference documents,
- repository `AGENTS.md` hierarchy,
- Home H1 Search First Hybrid,
- Detail C Integrated Overview,
- Basic Profile + Observation product model,
- static-first architecture,
- real-image-only policy,
- map-ready Place model,
- Mincho-only public typography direction,
- four-site accent palette.

Palette:

```text
祭のゆくえ      #284B63
神社のゆくえ    #A33A32
寺院のゆくえ    #684B78
弔いのゆくえ    #486457
```

### Stages A through E

```text
Stage A  shared UI foundation
Stage B  Matsuri Home and representative Detail surfaces
Stage C  schemas and cross-record validation
Stage D  representative canonical data and Public Projection
Stage E  Browse, Pagefind Search, and machine-readable baseline
```

### F1 corpus expansion

F1 batches 01 through 10 are completed and validated.

The corpus covers Festivals, Folk Performances, Tradition Units, Organizations, Shrine context seeds, Current State Snapshots, Occurrences, Change Events, Relations, Designations, Sources, and Evidence.

Current State remains separate from annual Occurrence outcomes. Revival remains a Change Event and State transition rather than a normal `revived` Current State value.

### F2 repository launch preparation

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
F2-M01 full-page screenshot visual-review workflow — completed
```

## Active package: F2-16

### Goal

Create and connect the Cloudflare Worker `matsuri-yukue` through Workers Builds Git integration and deploy the Matsuri static artifact through Workers Static Assets.

### Governing documents

```text
docs/cloudflare-pages-launch-runbook.md
docs/deployment.md
docs/technical-architecture.md
wrangler.jsonc
```

The runbook file name is retained temporarily for compatibility; its contents now govern Workers Builds rather than legacy Pages creation.

### Required Workers settings

```text
Worker name                    matsuri-yukue
Repository                     badjoke-lab/yukue
Production branch              main
Root directory                 repository root / blank
Build command                  pnpm build:matsuri:workers
Deploy command                 npx wrangler@latest deploy
Non-production deploy command  npx wrangler@latest versions upload
NODE_VERSION                   24
PNPM_VERSION                   11.10.0 when the dashboard exposes that build variable
```

The committed Wrangler contract is:

```text
name              matsuri-yukue
assets.directory  ./apps/matsuri/dist
main              absent
```

Do not set `MATSURI_PUBLIC_ORIGIN` during F2-16 or the first deployment.

Do not add the Cloudflare Astro SSR adapter, Worker runtime code, runtime bindings, a custom domain, or Web Analytics.

### F2-16 completion condition

```text
GitHub repository connected
Cloudflare Worker created with matching name
production branch recorded
build and deploy settings recorded
first production build started
```

The dashboard's `Save and Deploy` action may start F2-17 immediately after F2-16 setup.

## Next pending package

### F2-17 — First deployment and reachable URL

Completion requires:

```text
Cloudflare build success
production workers.dev URL issued
URL reachable
source commit recorded
build environment recorded
```

Do not assume the exact hostname until Cloudflare displays and serves it. A Workers URL includes the account's `workers.dev` subdomain.

## Deployed-origin verification capability

A manual GitHub Actions workflow is available:

```text
Verify Matsuri deployed origin
```

For F2-18 use:

```text
origin     exact issued workers.dev origin
canonical  false
```

Canonical mode remains disabled until the accepted custom Matsuri subdomain is configured.

## Repository gate command

```text
pnpm gate:matsuri:repository
```

The verified repository contract includes:

- Workers Static Assets configuration validation,
- workspace build,
- shared checks and typechecks,
- exact Matsuri static build,
- route and internal-link checks,
- sitemap inventory checks,
- HTML / JSON / Search consistency,
- corpus semantic audit,
- Source and Evidence audit,
- Current State freshness checks,
- public-content and image-boundary audit,
- 20 public routes across desktop, tablet, and mobile Chromium,
- automated WCAG A/AA checks on desktop and mobile,
- release-candidate freeze,
- per-file and aggregate SHA-256 verification.

A green repository gate is required before and during external activation, but it does not prove deployed behavior.

## Current public artifact shape

The repository-ready static candidate contains:

```text
20 public HTML routes
Pagefind static Search artifact
9 machine-readable baseline files
version and manifest metadata
public Entity, Event, Relation, and Occurrence feeds
llms.txt
ai.txt
sitemap.xml
```

The exact file count, byte count, route list, record counts, and SHA-256 values are generated for each candidate in:

```text
.release-candidate/release-candidate.json
```

Current repository release status:

```text
repository-verified-external-activation-active
```

## Current external state

```text
Cloudflare Worker              not yet verified as created
public deployment URL          not issued or recorded
canonical production origin    not configured
production Search              not browser-verified
crawler reachability           not verified
search-engine indexability     not verified
Web Analytics                  not enabled
production traffic             not verified
```

## Accepted public URL topology

The series will use subdomains rather than placing the four specialist sites under parent-domain subdirectories.

```text
parent domain root  series portal
Matsuri subdomain   祭のゆくえ
Jinja subdomain     神社のゆくえ
Jiin subdomain      寺院のゆくえ
Tomurai subdomain   弔いのゆくえ
```

The exact parent domain and final Matsuri hostname remain pending at F2-19. The first `workers.dev` URL is a deployment-verification origin, not an automatic canonical decision.

## Remaining external sequence

```text
F2-16  Workers Builds connection — active
F2-17  first Workers deployment and reachable URL — pending
F2-18  deployed-origin smoke verification — pending
F2-19  exact canonical Matsuri subdomain decision — pending
F2-20  attach custom domain, configure MATSURI_PUBLIC_ORIGIN, and redeploy — pending
F2-21  canonical manifest and sitemap verification — pending
F2-22  production browser Pagefind Search verification — pending
F2-23  robots, canonical, sitemap, and crawler-reachability review — pending
F2-24  sitemap submission and indexability check — pending
F2-25  enable Cloudflare Web Analytics — pending
F2-26  deploy after Analytics activation — pending
F2-27  verify production traffic — pending
F2-28  final F2 Launch Gate — pending
```

## Work allowed during activation

- Workers Builds setup according to the runbook,
- first-deployment diagnosis,
- deployed-origin verification,
- approved factual corrections,
- Current State freshness updates,
- Occurrence outcome corrections after scheduled dates pass,
- Source and Evidence maintenance,
- security or dependency maintenance,
- repairs required to keep the repository gate green,
- screenshot capture and human visual review for non-trivial UI changes.

Do not invent additional prelaunch product scope.

## Not committed to the MVP

- Stats,
- Compare,
- dynamic API,
- MCP,
- paid API,
- x402 billing,
- D1 canonical database,
- real-time ingestion,
- complex graph visualization.

## Immediate next action

Merge the Workers Static Assets activation changes into `main`, then use the current Cloudflare `Import a repository / Continue with GitHub` flow to connect `badjoke-lab/yukue` as Worker `matsuri-yukue` with the exact settings above.
