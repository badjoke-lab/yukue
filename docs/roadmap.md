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
F2-P01 through F2-P13 — completed
F2-M01 and F2-M02 — completed
```

The repository candidate is reproducible, content-addressed, and origin-neutral. Active production evidence is recorded separately. The Analytics progression has a machine-readable state, validator, privacy-safe evidence, and fixed F2-26 through F2-28 sequence.

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
F2-25  Cloudflare Web Analytics activation — completed
F2-26  post-activation production deployment — next
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

External deployment through F2-25: **Completed**

F2-25 verified that the existing Cloudflare Web Analytics Automatic setup was enabled for the proxied zone containing the canonical Matsuri hostname. The first repository-verifiable enabled observation is `2026-07-27T09:37:29Z`. The exact older activation instant was unavailable and is not inferred.

F2-26 is the active external gate. It must use the production deployment generated after the F2-25 evidence change is merged to `main`. A pull-request-head deployment and a deployment predating the recorded observation are not accepted.

Verified production baseline remains:

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com
Canonical origin run      29191904624 — success
Canonical Search run      29193201911 — success
Crawler reachability run  29230233384 — success
F2-24 preflight run        29232294960 — success
Search Console sitemap     success
Representative live test  indexable
```

Search Console submission and registration requests are not treated as proof of indexation.

The portal and Matsuri remain separate applications and Workers. The portal hostname remains planned and is not attached to the Matsuri Worker.

Pending:

```text
F2-26 through F2-28 external execution
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

Repository maintenance performed before F2-28 does not count as Phase 10 stabilization evidence.

## Phase 11 — Portal and next-site gates

Review Matsuri maintenance burden, shared-package reuse, cross-site seed quality, Relation value, update pace, and external demand before formal portal deployment or adding the next public specialist application.

Status: **Deferred until stabilization evidence exists and an explicit gate review is completed**
