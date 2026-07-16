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
F2-P01 Analytics and launch-closure preparation — completed
```

The repository candidate is reproducible, content-addressed, and origin-neutral. Active production evidence is recorded separately. The Analytics progression now has a machine-readable pending state, validator, workflow, public-safe evidence template, and fixed F2-26 through F2-28 runbook.

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

The post-2026-07-15 review of 博多祇園山笠 2026 was completed from the official 追い山笠 result record. The next dated review point is 郡上おどり 2026 after 2026-09-05.

### External deployment and production verification

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment and reachable URL — completed
F2-18  deployed-origin smoke verification — completed
F2-19  exact canonical Matsuri hostname decision — completed
F2-20  Custom Domain activation, canonical build, HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  browser Search verification on canonical origin — completed
F2-23  crawler-reachability review — completed
F2-24  sitemap submission and indexability check — completed
F2-25  Web Analytics activation — next external gate; owner access pending
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

External deployment through F2-24: **Completed**

Verified production baseline:

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com
Canonical origin run      29191904624 — success
Canonical Search run      29193201911 — success
Canonical Search artifact 8260207484
Crawler reachability run  29230233384 — success
Crawler evidence artifact 8271238535
F2-24 preflight run        29232294960 — success
F2-24 preflight artifact   8271994696
Search Console sitemap     success
Discovered pages           20
Representative live test  indexable
Indexing requests          3 submitted
```

F2-24 confirmed Search Console access for the canonical URL-prefix property, successful canonical sitemap submission, all-route technical preflight coverage, representative Google live-test indexability, and indexing requests for the three required representative URLs. Submission and registration requests are not treated as proof of indexation.

F2-25 remains the active external gate. Its owner-account action may be inserted later without changing the accepted sequence because the machine record and F2-25 through F2-28 evidence requirements are already prepared.

The portal and Matsuri remain separate applications and Workers. The portal hostname remains planned and is not attached to the Matsuri Worker.

Pending:

```text
F2-25 through F2-28 external execution
```

Allowed parallel work:

```text
Matsuri factual and date-triggered maintenance
Source, Evidence, and Relation maintenance
security and dependency repairs
repository and production gate maintenance
future-site seed collection through approved Relations
```

## Phase 10 — Stabilization

After F2-28, observe indexation, search impressions, Search queries, corrections, public JSON access, referral signs, inquiries, API interest, and maintenance burden.

Status: **Not started — requires F2-28**

Repository maintenance performed during the F2-25 access hold does not count as Phase 10 stabilization evidence.

## Phase 11 — Portal and next-site gates

Review Matsuri maintenance burden, shared-package reuse, cross-site seed quality, Relation value, update pace, and external demand before formal portal deployment or adding the next public specialist application.

Status: **Deferred until stabilization evidence exists and an explicit gate review is completed**
