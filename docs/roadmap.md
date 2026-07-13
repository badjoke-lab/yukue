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

### Repository baselines

```text
F2-01 through F2-15 — completed
```

The repository candidate is reproducible, content-addressed, and verified. Active deployment evidence remains separate from the origin-neutral artifact.

### Repository visual and data maintenance

```text
F2-M01  exhaustive desktop/mobile full-page screenshot workflow — completed
F2-M02  Matsuri data freshness audit — completed
```

F2-M02 completion result:

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
F2-20  Custom Domain activation, canonical build, HTTPS verification
F2-21  canonical manifest and sitemap verification
F2-22  browser Search verification on canonical origin
F2-23  crawler-reachability review
F2-24  sitemap submission and indexability check
F2-25  Web Analytics activation
F2-26  post-activation deployment
F2-27  production traffic verification
F2-28  final F2 Launch Gate
```

External deployment through F2-22: **Completed**

Crawler reachability review: **Next gate at F2-23**

Verified production baseline:

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com
Origin verification run   29191904624 — success
Search verification run   29227591583 — success
Search artifact ID        8270324780
Browser                    Chromium
```

F2-22 confirmed:

- exact Pagefind results for `脚折雨乞` and `相馬野馬追`,
- result navigation to the `脚折雨乞` detail surface,
- the documented zero-result state,
- zero page and console errors.

The portal and Matsuri remain separate applications and Workers. The portal hostname remains planned and is not attached to the Matsuri Worker.

Pending:

```text
F2-23 through F2-28
```

F2-23 reviews robots, canonical, sitemap discovery, and crawler-facing responses. Sitemap submission remains F2-24 and Analytics remains F2-25.

## Phase 10 — Stabilization

After F2-28, observe indexation, search impressions, Search queries, corrections, public JSON access, referral signs, inquiries, API interest, and maintenance burden.

Status: **Not started — requires F2-28**

## Phase 11 — Next-site Gate

Review Matsuri maintenance burden, shared-package reuse, cross-site seed quality, Relation value, update pace, and external demand before adding the next public site application.

Status: **Deferred until stabilization evidence exists and an explicit gate review is completed**
