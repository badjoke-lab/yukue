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

## Open decisions

- final map component implementation,
- exact image storage and optimization pipeline,
- ULID versus UUIDv7,
- slug policy,
- JSON partition threshold,
- final domain,
- whether Stats enters MVP,
- whether Compare enters MVP.
