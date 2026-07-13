# Project Roadmap

**Status:** Current phase-and-gate roadmap

## Phases 0–8

```text
Phase 0  Foundation — completed
Phase 1  Project reference documents — completed
Phase 2  UI direction — completed
Phase 3  Data core — completed
Phase 4  Public Projection — completed
Phase 5  UI foundation — completed
Phase 6  Matsuri MVP surfaces — completed
Phase 7  Search, Browse, and machine-readable layer — completed
Phase 8  F1 corpus expansion batches 01–10 — completed
```

## Phase 9 — Launch Preparation

### Repository baselines

```text
F2-01 through F2-15 — completed
F2-M01  full-page screenshot workflow — completed
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

### External deployment and verification

```text
F2-16  Workers Builds connection — completed
F2-17  first static deployment — completed
F2-18  deployed-origin verification — completed
F2-19  canonical hostname decision — completed
F2-20  Custom Domain and HTTPS — completed
F2-21  canonical manifest and sitemap — completed
F2-22  browser Search verification — completed
F2-23  crawler reachability — completed
F2-24  sitemap submission and indexability check — next
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

External deployment through F2-23: **Completed**

Sitemap submission: **Next gate at F2-24**

Verified production baseline:

```text
Worker                     matsuri-yukue
Canonical origin           https://matsuri-yukue.badjoke-lab.com
Canonical origin run       29191904624 — success
Canonical Search run       29193201911 — success
Crawler reachability run   29230475619 — success
Sitemap routes             20 / 20
Representative UA checks   28 / 28
Discovery checks           12 / 12
```

The portal and Matsuri remain separate applications and Workers. The portal hostname remains planned and is not attached to the Matsuri Worker.

Pending:

```text
F2-24 through F2-28
```

F2-24 submits the exact canonical sitemap through an accepted search-engine owner account and records the submission result. Submission does not itself prove page indexation.

## Phase 10 — Stabilization

After F2-28, observe indexation, search impressions, Search queries, corrections, public JSON access, referrals, inquiries, and maintenance burden.

Status: **Not started — requires F2-28**

## Phase 11 — Portal and next-site gates

Review Matsuri operations, shared-package reuse, cross-site seed quality, Relation value, update pace, and external demand before formal portal deployment or adding the next public specialist application.

Status: **Deferred until stabilization evidence exists and an explicit gate review is completed**
