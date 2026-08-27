# Jinja Start Gate

**Updated:** 2026-08-27

**Status:** repository implementation authorized / workers.dev preview deployed / canonical-custom-domain activation blocked on Matsuri stabilization

## Purpose

Jinja now has separate gates for three different scopes. Do not collapse them into a single `blocked` state.

```text
1. repository/local implementation
2. noncanonical workers.dev preview
3. canonical/custom-domain activation
```

The first two are authorized. The third remains blocked.

## Machine records and validators

```text
config/jinja-start-gate.json
config/jinja-implementation-gate.json
config/jinja-preview-deployment-gate.json
config/matsuri-stabilization-review.json
pnpm check:matsuri:stabilization-review
pnpm check:yukue:jinja-start-gate
pnpm check:jinja:preview-deployment
```

The machine records are the governing boundary. This document explains their current state.

## Current prerequisite state

From `config/jinja-start-gate.json`:

```text
Matsuri F2-28 complete                  true
Matsuri stabilization review complete  false
Portal/Jinja order decided             true
Jinja State specification approved     true
Explicit start authorization           true
```

Therefore exactly one canonical prerequisite remains incomplete: Matsuri stabilization.

## Current authorization state

```text
Jinja application creation authorized          true
Jinja local/CI implementation authorized        true
Jinja preview Worker creation authorized        true
Jinja workers.dev preview publication allowed   true
Jinja custom-domain activation allowed          false
Jinja canonical publication allowed             false
Jinja Search submission allowed                 false
Jinja preview indexable                         false
```

The canonical start-gate claim remains false because not all canonical prerequisites are complete.

## Repository/local implementation boundary

Governed by:

```text
config/jinja-implementation-gate.json
```

Current status:

```text
implementation-and-preview-authorized
```

`apps/jinja` is now expected to exist. The repository validator explicitly requires it after implementation authorization.

The implementation uses Astro and the shared Yukue UI package. Missing State, Event, Relation, history, or specialist profile facts remain absent unless Jinja-specific Evidence supports them.

## workers.dev preview boundary

Governed by:

```text
config/jinja-preview-deployment-gate.json
```

Current authorized preview:

```text
Worker             jinja-yukue
Origin             https://jinja-yukue.badjoke-lab.workers.dev
Canonical          false
Indexable          false
Robots             noindex,nofollow
Custom domain      false
```

PR #325 rebuilt the preview on the Matsuri/shared Astro architecture and merged as:

```text
aafec2e8a790cce3f0346fac6e7f21e299f011ed
```

The main deployment completed successfully in Actions run:

```text
33031665150
```

PR #327 then added live visual-parity regression checks against the canonical Matsuri site and merged as:

```text
8e5eecbc51729c55e66f5f8ef31012eb501dcda7
```

The final live audit covered 20 paired route/device combinations and reported zero contract failures.

## Canonical/custom-domain boundary

The later canonical start gate remains blocked because:

```text
Matsuri stabilization review complete = false
```

Do not activate while that remains false:

```text
jinja-yukue.badjoke-lab.com or another custom route
canonical publication claim
Search Console submission
indexability
```

The existing workers.dev preview does not satisfy or bypass this later gate.

## Stabilization dependency

Matsuri stabilization cannot be marked complete from elapsed time alone. Required private operational observations must be actually recorded when owner access is available.

Current deferred private operations include:

```text
Cloudflare Web Analytics current observation
Google Search Console current observation
```

They are never inferred or fabricated.

These deferred observations block canonical/custom-domain activation through the stabilization contract, but they do not block repository Jinja implementation, workers.dev preview operation, source research, reviewed data expansion, or preview regression work.

## Seed and publication boundary

Matsuri Relation-backed shrine records are research seeds only. They never auto-promote into Jinja.

The current Matsuri seed baseline recorded by the machine gate is:

```text
Relation-backed shrine seeds          26
Direct identity Evidence              30
Place references                      26
Approved shrine State Snapshots        0
Seeds with official URLs              19
```

Every Jinja record still requires specialist identity/dedupe review and a Jinja-acceptable authoritative Source.

Tier A may publish in the authorized noncanonical preview with reviewed identity/geography/source minimums. State/Event/Relation/history are not invented to make a record look complete.

## Current implementation rules

Allowed now:

```text
apps/jinja development
Jinja schemas/projections/routes
reviewed Tier A preview records
Evidence-backed A→B deepening
Evidence-backed Event/Relation/history work
workers.dev preview deployment
live visual-regression auditing
```

Still prohibited now:

```text
custom-domain Jinja route
canonical Jinja publication
Search submission/indexability
unsupported State inference
unsupported Event/Relation/history inference
Jiin or Tomurai activation through Jinja work
```

## Gate completion

When the actual Matsuri stabilization review becomes complete, update the stabilization machine record from real observations, rerun the full repository/Jinja validators, and only then reevaluate the canonical/custom-domain activation decision.
