# Decision Log

This file records public project decisions that affect implementation.

## 2026-07-09 — Monorepo and initial apps

Decision:

```text
one monorepo
initial apps: portal + matsuri
future apps added after project gates
```

## 2026-07-09 — Static-first architecture

Decision:

```text
Astro
TypeScript
Git-reviewed public canonical data
build-time validation
Public Projection
Pagefind
Cloudflare static-asset delivery
```

Dynamic infrastructure is deferred until justified.

The exact Cloudflare delivery product changed during launch preparation. The static-first and no-runtime requirements did not change.

## 2026-07-09 — Two-layer product model

Decision:

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

Decision:

- no AI-generated images,
- no generic illustrative replacement images,
- no placeholders,
- zero approved images means no image UI,
- multiple real images supported,
- credits and credit URLs supported,
- rights review required.

## 2026-07-09 — Map-ready Place model

Decision: Place and Geographic Scope are separate concepts. Entity default places and Occurrence-specific venues remain separate.

Map treatment must follow single-site, multi-site, route-based, or distributed scope rather than forcing all subjects into one-pin display.

## 2026-07-10 — Visual direction

Decision:

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

Decision: use one Mincho family system throughout the public UI.

Do not use a separate textbook-style family as a second primary typography system.

## 2026-07-10 — Series accent palette

Decision:

```text
祭のゆくえ      #284B63  indigo / iron blue
神社のゆくえ    #A33A32  muted vermilion
寺院のゆくえ    #684B78  deep traditional purple
弔いのゆくえ    #486457  deep green
```

Accent colors are used sparingly for links, selected navigation, state emphasis, timeline markers, focus treatment, and thin structural accents.

## 2026-07-10 — Repository-reference-driven development

Decision: implementation work is governed by repository documentation and hierarchical `AGENTS.md` files.

Required reading flow:

```text
root AGENTS.md
→ nearest nested AGENTS.md
→ project-status.md
→ development-schedule.md
→ governing specifications
```

Schedule responsibilities are separated:

```text
roadmap.md
= long-range phases and gates

development-schedule.md
= concrete implementation and PR sequence

project-status.md
= current position and next gate
```

When implementation changes public behavior, the governing document should be updated in the same bounded PR where practical. Decision changes go to `decision-log.md`; phase or gate changes go to `project-status.md`; material implementation-order changes go to `development-schedule.md`.

## 2026-07-11 — F2 repository readiness before external deployment

Decision:

```text
F2-01–F2-05  completed repository launch baselines
F2-06–F2-15  repository-only launch readiness
F2-16–F2-28  external deployment and production verification
```

The external sequence remains ordered:

```text
Cloudflare project
→ first reachable deployment
→ deployed smoke check
→ canonical origin decision
→ canonical redeployment
→ canonical and sitemap verification
→ browser Search verification
→ crawler and indexability checks
→ Web Analytics activation
→ post-activation deployment
→ production traffic verification
→ final F2 Launch Gate
```

Repository Launch Readiness at F2-15 is distinct from the final F2 Launch Gate at F2-28.

## 2026-07-11 — F2-15 Repository Launch Readiness completed

Decision:

```text
repository launch readiness  completed
external production launch   not completed
F2-16 through F2-28           external work
```

The repository gate is represented by:

```text
pnpm gate:matsuri:repository
```

Repository readiness does not itself prove a Cloudflare project exists, a public URL has been issued, the canonical origin is selected, production Search or crawler behavior works, Web Analytics is enabled, or production traffic exists.

## 2026-07-11 — Successful-render visual review before production

Decision:

```text
F2-M01  local full-page screenshot and visual-review workflow
Cloudflare required  no
current coverage     all 20 public routes
capture devices      desktop + mobile
```

The repository browser audit remains the measurable rendering and accessibility gate. A separate GitHub Actions workflow preserves successful full-page PNGs for human review.

## 2026-07-12 — External hold removed and F2-16 activated

Decision:

```text
external operational hold  removed
active work package         F2-16
repository                  badjoke-lab/yukue
production branch           main
```

The first attempt assumed the legacy Cloudflare Pages Git-integration screen was still the current creation path. That assumption was invalidated by the current dashboard, which routes new Git repository imports through Workers Builds.

## 2026-07-12 — Workers Builds and Workers Static Assets adopted

Decision:

```text
launch platform             Cloudflare Workers Builds
asset delivery              Cloudflare Workers Static Assets
Worker name                 matsuri-yukue
repository                  badjoke-lab/yukue
production branch           main
root directory              repository root
build command               pnpm build:matsuri:workers
deploy command              npx wrangler@latest deploy
non-production command      npx wrangler@latest versions upload
asset directory             ./apps/matsuri/dist
Worker main entry           none
```

This decision supersedes the earlier same-day Cloudflare Pages project-creation decision.

The committed root `wrangler.jsonc` is the external deployment contract. It has no `main` field because Matsuri is fully pre-rendered and requires no Worker runtime code or Astro Cloudflare SSR adapter.

Cloudflare autoconfiguration must not replace this contract or create an SSR-oriented pull request.

GitHub Actions remains the repository verification system. Workers Builds performs the external build and deployment.

The first deployment intentionally leaves `MATSURI_PUBLIC_ORIGIN` unset. After Cloudflare issues a reachable `workers.dev` URL, the project completes F2-18 smoke verification before attaching the accepted custom domain.

## 2026-07-12 — Subdomain public topology

Decision:

```text
parent domain root  Yukue Series portal
Matsuri subdomain   祭のゆくえ
Jinja subdomain     神社のゆくえ
Jiin subdomain      寺院のゆくえ
Tomurai subdomain   弔いのゆくえ
```

The four specialist sites remain separate public sites while sharing the monorepo, canonical data, schemas, validation, Relations, Evidence, and common packages.

The exact parent domain and final Matsuri hostname remain unresolved until F2-19. The initial `workers.dev` URL is a deployment-verification origin and is not automatically canonical.

## Open decisions

- exact canonical parent domain and Matsuri subdomain,
- final map component implementation,
- exact image storage and optimization pipeline,
- ULID versus UUIDv7,
- slug policy,
- JSON partition threshold,
- whether Stats enters MVP,
- whether Compare enters MVP.
