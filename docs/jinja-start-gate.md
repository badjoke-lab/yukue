# Jinja Start Gate

**Status:** F2-P08 repository guardrail completed / F2-P09 seed provenance refreshed / actual start gate not passed

## Purpose

The Matsuri corpus provides five approved Relation-backed shrine seeds with direct identity Evidence, Place references, Source provenance, Relation Evidence, a self-contained provenance bundle, and artifact contract v1. None of that authorizes creation or publication of `神社のゆくえ`.

This document defines the machine-enforced boundary between reusable seed preparation and actual Jinja implementation.

## Machine record and validator

```text
config/jinja-start-gate.json
pnpm check:yukue:jinja-start-gate
Verify Jinja start-gate record
```

The validator also runs inside:

```text
pnpm gate:matsuri:repository
```

## Hosted verification

```text
Head         c4067e1f5b6dad3173ea9ba142f038c03604768e
Run          29493210854
Conclusion   success
```

The initial implementation head also passed repository CI, seed inventory and artifact contract, seed readiness, Analytics pending-state validation, canonical Search, full-page screenshots, and F2-24 indexability preflight.

F2-P09 refresh verification is recorded in `docs/audits/yukue-f2-p09-dainichireiki-official-provenance-2026-07-17.md`.

## Current state

```text
Status                               blocked-by-matsuri-launch-closure
Relation-backed Jinja seeds          5
Direct identity Evidence             6
Place references                     5
Approved shrine State Snapshots      0
Seeds with official URLs             5
Jinja start gate passed              false
Application creation authorized      false
Worker creation authorized           false
Publication authorized               false
```

The missing State Snapshot count is explicit. Matsuri defines Shrine records only as cross-site seed Entities and does not define the Jinja State vocabulary. No Shrine State is inferred from `record_lifecycle`, a festival Relation, an official URL, or the continued existence of a source page.

## Required prerequisites

Every prerequisite is mandatory before the start gate can pass:

1. Matsuri F2-28 final Launch Gate is complete.
2. A Matsuri stabilization review is complete.
3. The implementation order between the series portal and Jinja is explicitly decided.
4. A Jinja-specific State specification and vocabulary are approved.
5. Explicit start authorization is recorded.

Seed count, provenance closure, artifact-contract compliance, Evidence coverage, or available source material cannot substitute for any prerequisite.

## Enforced inactive boundary

While the record remains blocked:

- `apps/jinja` must not exist,
- no Jinja Worker deployment configuration may exist,
- no `jinja-yukue` hostname may be activated in deployment configuration,
- no Jinja public routes may be created,
- no Jinja publication claim may be made,
- no Shrine State may be invented,
- F2-P02 through F2-P09 remain preparation evidence only.

The validator fails if the repository contains an early application directory, deployment configuration, activation claim, missing prerequisite, inconsistent seed baseline, private account identifier, token, or email address.

## Current seed baseline

```text
阿蘇神社
櫛田神社
佐太神社
大日霊貴神社
秩父神社
```

All five have direct identity Evidence, Place provenance, and at least one official URL. 大日霊貴神社 now carries both the existing 鹿角市 public-authority Source and the shrine-operated `dainichido.org` Source without conflating their authority classes. All five still require a future Jinja-specific identity, State, Source, Evidence, and maintenance review before publication.

## Cloudflare boundary

F2-P08 and F2-P09 require no Cloudflare access and do not change F2-25 through F2-28.

When Cloudflare access resumes, F2-25 through F2-28 are inserted first. Passing F2-28 alone still does not pass the Jinja start gate; stabilization, order, State-specification, and explicit-authorization prerequisites must also be completed.
