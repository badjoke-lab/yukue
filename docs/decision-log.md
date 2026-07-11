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
Cloudflare Workers Static Assets
```

Dynamic infrastructure is deferred until justified.

This original deployment label is superseded for the first Matsuri launch by the 2026-07-12 Cloudflare Pages Git-integration decision below. The static-first and no-dynamic-infrastructure parts remain unchanged.

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

External deployment and production verification were placed under an operational hold.

The hold did not stop repository-only readiness work. F2-06 through F2-15 proceeded before any Cloudflare Pages project creation, public deployment URL acquisition, canonical production-origin decision, production Search verification, indexability work, or Web Analytics activation.

The external sequence remained ordered and documented so that it could resume without redesign:

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

F2-15 requires the static artifact, internal links, Public Projection safety, HTML/JSON/Search consistency, Source and Evidence quality, responsive and accessibility review, content and image boundaries, and release-candidate verification to pass without external deployment.

F2-28 additionally requires a reachable public build, validated canonical origin and sitemap, browser Search, crawler and indexability checks, Web Analytics activation, and verified production traffic.

## 2026-07-11 — F2-15 Repository Launch Readiness completed

Decision:

```text
repository launch readiness  completed
external production launch   not completed
F2-16 through F2-28           Operational hold
```

The repository gate is represented by:

```text
pnpm gate:matsuri:repository
```

The command must:

1. run the complete unified release verification,
2. freeze the exact verified static candidate,
3. verify every frozen file and aggregate artifact digest,
4. confirm repository documentation records F2-15 completion,
5. confirm F2-16 through F2-28 remain pending external work.

Repository readiness does not itself prove:

- a Cloudflare project exists,
- a public URL has been issued,
- the canonical origin is selected,
- production Search or crawler behavior works,
- Web Analytics is enabled,
- production traffic exists.

## 2026-07-11 — Successful-render visual review before production

Decision:

```text
F2-M01  local full-page screenshot and visual-review workflow
Cloudflare required  no
current coverage     all 20 public routes
capture devices      desktop + mobile
```

The repository browser audit remains the measurable rendering and accessibility gate. A separate GitHub Actions workflow preserves successful full-page PNGs for human review of hierarchy, whitespace, density, page length, and mobile reading rhythm.

The workflow builds and serves the site inside GitHub Actions. It does not require a Cloudflare Pages project, public URL, canonical origin, or production deployment.

While the route count remains 20, screenshot review is exhaustive:

```text
20 desktop PNGs
20 mobile PNGs
40 full-page PNGs total
```

The workflow also produces capture manifests, an automated screenshot audit, desktop and mobile ZIP files, and device contact sheets.

A green automated screenshot audit is not visual approval. Non-trivial UI changes require the pull request to identify the screenshot run and artifact and record what desktop and mobile images were reviewed, what problems were found, what was changed, and what limitations intentionally remain.

## 2026-07-12 — External hold removed and F2-16 activated

Decision:

```text
external operational hold  removed
active work package         F2-16
launch platform             Cloudflare Pages Git integration
Pages project name          matsuri-yukue
repository                  badjoke-lab/yukue
production branch           main
```

The first Matsuri deployment uses Cloudflare Pages Git integration with a static Astro artifact.

Accepted build contract:

```text
root directory     repository root
build command      pnpm build:matsuri:pages
output directory   apps/matsuri/dist
Node.js             24
pnpm                11.10.0
```

GitHub Actions remains the repository verification system. Cloudflare Pages performs the external build and deployment.

The project remains static. Do not add the Cloudflare Astro SSR adapter, Pages Functions, D1, or other runtime infrastructure for the first launch.

Git integration is accepted despite the fact that Cloudflare does not permit later conversion of that project into a Direct Upload project. Automatic Git deployments may be disabled later, and Wrangler may deploy to the existing Git-integrated project if the operating model changes.

The first deployment intentionally leaves `MATSURI_PUBLIC_ORIGIN` unset. After Cloudflare issues a reachable production URL, the project must complete F2-18 smoke verification before choosing the canonical origin at F2-19.

Do not enable Web Analytics, add a custom domain, or claim production readiness during F2-16 or F2-17.

The governing operational document is:

```text
docs/cloudflare-pages-launch-runbook.md
```

## Open decisions

- final map component implementation,
- exact image storage and optimization pipeline,
- ULID versus UUIDv7,
- slug policy,
- JSON partition threshold,
- final canonical domain,
- whether Stats enters MVP,
- whether Compare enters MVP.
