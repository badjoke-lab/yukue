# Project Roadmap

**Status:** Current phase-and-gate roadmap

This roadmap uses phases and gates rather than fixed daily deadlines. Detailed implementation order is defined in `development-schedule.md`; current position is defined in `project-status.md`.

## Phase 0 — Foundation

Status: **Completed**

## Phase 1 — Project Reference Documents

Status: **Completed**

## Phase 2 — UI Direction Review

Status: **Completed**

## Phase 3 — Data Core

Status: **Completed**

## Phase 4 — Public Projection

Status: **Completed**

## Phase 5 — UI Foundation

Status: **Completed**

## Phase 6 — Matsuri MVP Surfaces

Status: **Completed**

## Phase 7 — Search, Browse, and Machine-readable Layer

Status: **Completed**

## Phase 8 — Initial Corpus Expansion

Status: **Completed through F1 batches 01–10**

## Phase 9 — Launch Preparation

Phase 9 is implemented as F2 work packages.

### Repository baselines

```text
F2-01 through F2-15
```

Status: **Completed**

The repository-ready candidate is reproducible, content-addressed, and verified.

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

F2-M02 completed with:

```text
closed-period unresolved Occurrences  0
specialist Entities with no Relation  0
stale Current State candidates        0
stale external-link candidates        0
Relations missing Evidence            0
```

### External deployment and production verification

```text
F2-16  Cloudflare Workers Builds connection
F2-17  first Workers Static Assets deployment and reachable URL
F2-18  deployed-origin smoke verification
F2-19  exact canonical Matsuri hostname decision
F2-20  Custom Domain activation and canonical-origin verification
F2-21  canonical manifest and sitemap verification as a recorded gate
F2-22  browser Search verification on canonical origin
F2-23  crawler-reachability review
F2-24  sitemap submission and indexability check
F2-25  Web Analytics activation
F2-26  post-activation deployment
F2-27  production traffic verification
F2-28  final F2 Launch Gate
```

External deployment through F2-20: **Completed**

Canonical verification record: **Operational hold at F2-21**

Verified external evidence:

```text
Worker                         matsuri-yukue
Workers origin                 https://matsuri-yukue.badjoke-lab.workers.dev/
Active canonical origin        https://matsuri-yukue.badjoke-lab.com/
Initial verification workflow  GitHub Actions run 29182976642 — success
Canonical verification gate    GitHub Actions run 29191904624 — success
Portal hostname                yukue.badjoke-lab.com — reserved
```

The portal and Matsuri are separate applications and separate Workers. Matsuri is not nested below a portal path.

The canonical gate confirmed HTTPS reachability, correct Matsuri content, Pagefind assets, public JSON, `manifest.site_origin`, and canonical sitemap locations. F2-21 now formalizes that evidence as the next recorded gate.

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
