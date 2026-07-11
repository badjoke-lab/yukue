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

External deployment and production verification are placed under an operational hold.

The hold does not stop repository-only readiness work. F2-06 through F2-15 proceed before any Cloudflare Pages project creation, public deployment URL acquisition, canonical production-origin decision, production Search verification, indexability work, or Web Analytics activation.

The external sequence remains ordered and documented so that it can resume without redesign:

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

The hold is removed only through an explicit update to the governing documents. Do not record a placeholder public URL or claim production-only checks are complete while the hold remains active.

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

A successful repository gate permits only maintenance, reviewed corrections, freshness updates, security or dependency work, and changes required to keep the gate green while external deployment remains held.

Repository readiness does not authorize:

- Cloudflare project creation,
- public URL issuance,
- canonical-origin selection,
- production Search or crawler claims,
- Web Analytics activation,
- production-traffic claims,
- new prelaunch product scope.

## Open decisions

- final map component implementation,
- exact image storage and optimization pipeline,
- ULID versus UUIDv7,
- slug policy,
- JSON partition threshold,
- final domain,
- whether Stats enters MVP,
- whether Compare enters MVP.
