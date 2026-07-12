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

Repository readiness does not itself prove a Cloudflare project exists, a public URL has been issued, the canonical origin is selected, production Search or crawler behavior works, Web Analytics is enabled, or production traffic exists.

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

## 2026-07-12 — Subdomain public topology

```text
parent domain root  Yukue Series portal
Matsuri subdomain   祭のゆくえ
Jinja subdomain     神社のゆくえ
Jiin subdomain      寺院のゆくえ
Tomurai subdomain   弔いのゆくえ
```

The specialist sites remain separate public sites while sharing the monorepo, canonical data, schemas, validation, Relations, Evidence, and common packages.

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

The verified Workers origin is deployment evidence. It is not automatically the canonical public origin.

## 2026-07-12 — Domain-dependent launch work paused at F2-19

```text
F2-19 through F2-28  operational hold
MATSURI_PUBLIC_ORIGIN  unset
custom domain           not attached
canonical origin        not declared
sitemap submission      not performed
Web Analytics           not enabled
```

The hold does not reverse the completed deployment. It prevents domain-dependent canonical, indexing, Analytics, and final-launch claims until custom-domain operations can resume.

## 2026-07-12 — F2-M02 data freshness audit activated

```text
active maintenance package  F2-M02
scope                       Occurrence outcomes
                            Current State freshness
                            Source and Evidence quality
                            cross-site reusable Relations
                            deployed-origin maintenance checks
```

F2-M02 may proceed while F2-19 through F2-28 are on hold. It must not attach a domain, set `MATSURI_PUBLIC_ORIGIN`, declare the Workers origin canonical, submit a sitemap, enable Analytics, or claim final launch completion.

## Open decisions

- exact canonical parent domain and Matsuri subdomain,
- final map component implementation,
- exact image storage and optimization pipeline,
- ULID versus UUIDv7,
- slug policy,
- JSON partition threshold,
- whether Stats enters MVP,
- whether Compare enters MVP.
