# Project Roadmap

**Status:** Current phase-and-gate roadmap

## Phase 0 through Phase 8

Foundation, reference documents, UI direction, data core, Public Projection, UI foundation, Matsuri MVP surfaces, Search/Browse/machine-readable layer, and the initial corpus expansion are completed.

## Phase 9 — Launch Preparation

### Repository baselines

```text
F2-01 through F2-15 — completed
F2-P01 through F2-P13 — completed
F2-M01 and F2-M02 — completed
```

The repository candidate is reproducible, content-addressed, and origin-neutral. Active production evidence is recorded separately.

### External deployment and production verification

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  deployed-origin smoke verification — completed
F2-19  exact canonical Matsuri hostname decision — completed
F2-20  Custom Domain activation and HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  browser Search verification — completed
F2-23  crawler-reachability review — completed
F2-24  sitemap submission and indexability check — completed
F2-25  Cloudflare Web Analytics activation — completed
F2-26  post-activation production deployment — completed
F2-27  production traffic verification — completed
F2-28  final F2 Launch Gate — next
```

External deployment through F2-27: **Completed**

F2-27 accepted private-dashboard confirmation that the representative canonical-route visits produced traffic for `matsuri-yukue.badjoke-lab.com` at `2026-07-27T11:26:58Z`. Public evidence contains no raw traffic counts or private dashboard material.

F2-28 is the active external gate. It must verify the complete launch chain and privacy boundary without treating Search Console submission or technical indexability as proof of actual indexation.

Verified production baseline:

```text
Worker                    matsuri-yukue
Canonical origin          https://matsuri-yukue.badjoke-lab.com
F2-26 source commit       108ac4e88407e1263229eb40bc88d76855e90131
F2-26 Cloudflare build    7026144e-1ce0-4927-9060-64919c3a4002
F2-27 verified at         2026-07-27T11:26:58Z
F2-27 traffic observed    yes
```

Pending:

```text
F2-28 final F2 Launch Gate
```

Allowed parallel work remains factual and date-triggered Matsuri maintenance, Source/Evidence/Relation maintenance, security and dependency repairs, repository and production gate maintenance, and candidate-only future-site seed preservation.

## Phase 10 — Stabilization

After F2-28, observe indexation, search impressions, Search queries, corrections, public JSON access, referral signs, inquiries, API interest, and maintenance burden.

Status: **Not started — requires F2-28**

## Phase 11 — Portal and next-site gates

Review Matsuri maintenance burden, shared-package reuse, cross-site seed quality, Relation value, update pace, and external demand before formal portal deployment or adding the next public specialist application.

Status: **Deferred until stabilization evidence exists and an explicit gate review is completed**
