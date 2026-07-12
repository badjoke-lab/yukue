# Decision Log

This file records public project decisions that affect implementation.

## 2026-07-09 — Monorepo and initial apps

```text
one monorepo
initial apps: portal + matsuri
future apps added after project gates
```

## 2026-07-09 — Static-first architecture

```text
Astro
TypeScript
Git-reviewed public canonical data
build-time validation
Public Projection
Pagefind
Cloudflare static-asset delivery
```

Dynamic infrastructure is deferred until justified. The exact Cloudflare delivery product changed during launch preparation; the static-first and no-runtime requirements did not.

## 2026-07-09 — Two-layer product model

```text
Basic Profile Layer
+
Observation Layer
```

Basic information is not sacrificed for uniqueness. Observation records are added on top.

## 2026-07-09 — Home IA

Decision: **H1 — Search First Hybrid**

```text
Hero + Search
Current Observation Snapshot
Recent Changes
Recent Occurrences
Explore
Methodology / Evidence
Data Access
```

## 2026-07-09 — Detail IA

Decision: **C — Integrated Overview**

The first Overview combines Current State, verification date, latest Occurrence, usual timing, recurrence, region, main places, and official information.

## 2026-07-09 — Real images only

- no AI-generated images,
- no generic illustrative replacement images,
- no placeholders,
- zero approved images means no image UI,
- multiple real images supported,
- credits and credit URLs supported,
- rights review required.

## 2026-07-09 — Map-ready Place model

Place and Geographic Scope are separate. Entity default places and Occurrence-specific venues remain separate. Map treatment must follow the actual spatial scope rather than forcing every subject into one-pin display.

## 2026-07-10 — Visual direction

```text
high-quality Japanese cultural reference work
+
formal shrine/temple website discipline
+
premium encyclopedia typography
+
modern observation data structure
```

The UI uses white backgrounds, black and gray typography, thin rules, controlled whitespace, minimal card chrome, minimal shadows, and one site accent color.

## 2026-07-10 — Typography

Use one Mincho family system throughout the public UI.

## 2026-07-10 — Series accent palette

```text
祭のゆくえ      #284B63
神社のゆくえ    #A33A32
寺院のゆくえ    #684B78
弔いのゆくえ    #486457
```

## 2026-07-10 — Repository-reference-driven development

Implementation work is governed by repository documentation and hierarchical `AGENTS.md` files.

```text
root AGENTS.md
→ nearest nested AGENTS.md
→ project-status.md
→ development-schedule.md
→ governing specifications
```

Decision changes go to `decision-log.md`; phase or gate changes go to `project-status.md`; material implementation-order changes go to `development-schedule.md`.

## 2026-07-11 — F2 repository readiness before external deployment

```text
F2-01–F2-05  completed repository launch baselines
F2-06–F2-15  repository-only launch readiness
F2-16–F2-28  external deployment and production verification
```

Repository Launch Readiness at F2-15 is distinct from the final F2 Launch Gate at F2-28.

## 2026-07-11 — F2-15 Repository Launch Readiness completed

```text
repository launch readiness  completed
external production launch   not completed
```

The repository gate is:

```text
pnpm gate:matsuri:repository
```

Repository readiness does not itself prove a Cloudflare deployment exists, a public URL has been issued, the canonical origin is active, production Search or crawler behavior works, Web Analytics is enabled, or production traffic exists.

## 2026-07-11 — Successful-render visual review before production

```text
F2-M01  local full-page screenshot and visual-review workflow
Cloudflare required  no
current coverage     all 20 public routes
capture devices      desktop + mobile
```

## 2026-07-12 — Workers Builds and Workers Static Assets adopted

```text
launch platform             Cloudflare Workers Builds
asset delivery              Cloudflare Workers Static Assets
Worker name                 matsuri-yukue
repository                  badjoke-lab/yukue
production branch           main
root directory              repository root
build command               pnpm build:matsuri:workers
deploy command              npx wrangler deploy
non-production command      npx wrangler versions upload
asset directory             ./apps/matsuri/dist
Worker main entry           none
```

This superseded the earlier same-day assumption that the legacy Cloudflare Pages Git-integration creation screen was still available.

The root `wrangler.jsonc` is the deployment contract. It has no `main` field because Matsuri is fully pre-rendered and requires no Worker runtime code or Astro Cloudflare SSR adapter.

## 2026-07-12 — Separate-site public topology

```text
series portal       separate public site
Matsuri             separate public site
Jinja               future separate public site
Jiin                future separate public site
Tomurai             future separate public site
```

The specialist sites remain separate public sites while sharing the monorepo, canonical data, schemas, validation, Relations, Evidence, and common packages.

The portal is a series entrance and cross-site guide. It is not a runtime path parent for the specialist sites.

## 2026-07-12 — F2-16 through F2-18 completed

Decision and evidence:

```text
F2-16  Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  deployed-origin smoke verification — completed

Worker
matsuri-yukue

Permanent Workers origin
https://matsuri-yukue.badjoke-lab.workers.dev/

Verified deployment origin
https://f757f092-matsuri-yukue.badjoke-lab.workers.dev/

GitHub Actions verification
run 29182976642 — success

Verified source commit
f6fdd5055c2712838ef30ed54048abf7f0674b4c
```

The verified Workers origin is deployment evidence. It is not the canonical public origin.

## 2026-07-12 — F2-M02 data freshness audit completed

```text
closed-period unresolved Occurrences  0
specialist Entities with no Relation  0
stale Current State candidates        0
stale external-link candidates        0
Relations missing Evidence            0
```

Future-dated Occurrences continue as normal date-triggered maintenance.

## 2026-07-12 — F2-19 exact canonical topology accepted

```text
Portal Worker             yukue-portal
Portal hostname           yukue.badjoke-lab.com

Matsuri Worker            matsuri-yukue
Matsuri hostname          matsuri-yukue.badjoke-lab.com
Matsuri origin decision   https://matsuri-yukue.badjoke-lab.com
```

The portal and Matsuri remain separate applications and separate Workers.

Rejected path topology:

```text
yukue.badjoke-lab.com/matsuri/
```

Accepted topology:

```text
yukue.badjoke-lab.com
matsuri-yukue.badjoke-lab.com
```

Deploying the portal later must not replace, rename, or repurpose Worker `matsuri-yukue`.

The future hostname convention is reserved but does not activate future sites:

```text
jinja-yukue.badjoke-lab.com
jiin-yukue.badjoke-lab.com
tomurai-yukue.badjoke-lab.com
```

The machine-readable decision is stored in:

```text
config/yukue-deployment-topology.json
```

## 2026-07-12 — Hostname decision is separate from canonical activation

```text
F2-19  hostname decision                     completed
F2-20  custom-domain attachment and deploy   pending
```

Current state before F2-20 production deployment:

```text
custom domain          not externally verified
active canonical       not externally verified
workers.dev canonical  false
```

Canonical, indexing, and Analytics work remains blocked until F2-20 production deployment and verification succeed.

## 2026-07-12 — F2-20 activation is repository-managed

Decision:

```text
Custom Domain source of truth  wrangler.jsonc
canonical origin source        config/yukue-deployment-topology.json
production build wrapper       scripts/build-matsuri-workers.mjs
dashboard-only origin value    not used
```

`wrangler.jsonc` defines:

```text
pattern        matsuri-yukue.badjoke-lab.com
custom_domain  true
```

The Workers production build reads the accepted canonical origin and passes:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

to the static build child process.

The origin is public configuration rather than a secret. Keeping the hostname and origin in one accepted topology avoids dashboard drift and duplicate configuration.

The repository gate verifies both:

```text
canonical Workers production artifact
+
pre-completion repository release candidate
```

Configuration committed to Git does not itself complete F2-20. Completion still requires a successful production deployment, DNS and certificate availability, HTTPS reachability, canonical manifest and sitemap checks, and deployed-origin verification.

The portal hostname remains excluded from the Matsuri Wrangler configuration.

## Open decisions

- final map component implementation,
- exact image storage and optimization pipeline,
- ULID versus UUIDv7,
- slug policy,
- JSON partition threshold,
- whether Stats enters MVP,
- whether Compare enters MVP.
