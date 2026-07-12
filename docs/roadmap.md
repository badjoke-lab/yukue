# Project Roadmap

**Status:** Current phase-and-gate roadmap

This roadmap uses phases and gates rather than fixed daily deadlines. Detailed implementation order is defined in `development-schedule.md`; current position is defined in `project-status.md`.

## Phase 0 — Foundation

Goal: monorepo, portal skeleton, Matsuri skeleton, shared packages, and CI baseline.

Status: **Completed**

## Phase 1 — Project Reference Documents

Goal: public-safe implementation references, policies, roadmap, schedule, status, and decision log.

Status: **Completed**

## Phase 2 — UI Direction Review

Goal: accepted Home H1, Detail C, visual direction, typography, palette, tokens, and UI foundation.

Status: **Completed**

## Phase 3 — Data Core

Goal: common and Matsuri schemas, cross-record validation, Place and Image contracts, and representative canonical data.

Status: **Completed**

## Phase 4 — Public Projection

Goal: approved-only deterministic HTML-facing and JSON-facing projection with private-field leak prevention.

Status: **Completed**

## Phase 5 — UI Foundation

Goal: shared responsive shell, navigation, state, history, relation, evidence, place, and image patterns.

Status: **Completed**

## Phase 6 — Matsuri MVP Surfaces

Goal: Projection-backed Home, Detail, Browse, Search, Reference, Data, Methodology, and Status surfaces.

Status: **Completed**

## Phase 7 — Search, Browse, and Machine-readable Layer

Goal: Pagefind Search, initial filters, public JSON feeds, manifest, version, discovery text, and sitemap.

Status: **Completed**

## Phase 8 — Initial Corpus Expansion

Goal: balanced reviewed coverage across identity, Current State, Occurrence history, Change Events, Relations, Designations, Sources, and Evidence.

Status: **Completed through F1 batches 01–10**

## Phase 9 — Launch Preparation

Phase 9 is implemented as F2 work packages.

### Repository baselines

```text
F2-01 through F2-06
```

Status: **Completed**

### Repository launch readiness

```text
F2-07 through F2-15
```

Repository Launch Readiness: **Completed**

The repository-ready candidate is reproducible, content-addressed, and verified. The intended canonical hostname is now decided, but canonical activation remains pending.

### Repository visual and data maintenance

```text
F2-M01  exhaustive desktop/mobile full-page screenshot workflow
F2-M02  Matsuri data freshness audit
```

Status:

```text
F2-M01  completed
F2-M02  completed
```

F2-M02 completed its initial maintenance gate with:

```text
closed-period unresolved Occurrences  0
specialist Entities with no Relation  0
stale Current State candidates        0
stale external-link candidates        0
Relations missing Evidence            0
```

The audit added evidence-backed Relation coverage for 郡上おどり, 脚折雨乞, and 布橋灌頂会 and resolved the 2026 相馬野馬追 outcome as `held` while retaining `scale: unknown`.

Future-dated Occurrences continue through normal date-triggered maintenance rather than keeping F2-M02 open.

### External deployment and production verification

```text
F2-16  Cloudflare Workers Builds connection
F2-17  first Workers Static Assets deployment and reachable URL
F2-18  deployed-origin smoke verification
F2-19  exact canonical Matsuri hostname decision
F2-20  custom-domain attachment, canonical-origin configuration, redeployment
F2-21  canonical manifest and sitemap verification
F2-22  browser Search verification on canonical origin
F2-23  crawler-reachability review
F2-24  sitemap submission and indexability check
F2-25  Web Analytics activation
F2-26  post-activation deployment
F2-27  production traffic verification
F2-28  final F2 Launch Gate
```

External deployment through F2-19: **Completed**

Domain attachment and canonical activation: **Operational hold at F2-20**

Verified external baseline and accepted decisions:

```text
Worker                  matsuri-yukue
Permanent origin        https://matsuri-yukue.badjoke-lab.workers.dev/
Verified deployment     https://f757f092-matsuri-yukue.badjoke-lab.workers.dev/
Verification workflow   GitHub Actions run 29182976642 — success
Verified source commit  f6fdd5055c2712838ef30ed54048abf7f0674b4c
Portal hostname         yukue.badjoke-lab.com
Matsuri hostname        matsuri-yukue.badjoke-lab.com
```

The portal and Matsuri are separate applications and separate Workers. Matsuri is not nested below a portal path.

The Workers origin is verified for deployment reachability but is not canonical. F2-20 must attach `matsuri-yukue.badjoke-lab.com`, set `MATSURI_PUBLIC_ORIGIN`, and redeploy before canonical verification begins.

## Phase 10 — Stabilization

After F2-28, observe:

- indexation,
- search impressions and organic clicks,
- Search queries and zero-result searches,
- corrections and Source access,
- AI referral signs,
- public JSON access,
- research and media inquiries,
- API interest,
- maintenance burden.

Status: **Not started — requires F2-28**

## Phase 11 — Next-site Gate

Review Matsuri maintenance burden, shared-package reuse, cross-site seed quality, Relation value, update pace, and external demand before adding the next public site application.

Status: **Deferred until stabilization evidence exists and an explicit gate review is completed**
