# Jinja Start Gate

**Status:** F2-P06 repository guardrail completed / actual start gate not passed

## Purpose

The Matsuri corpus now provides five approved Relation-backed shrine seeds with direct identity Evidence, Place references, Source provenance, and Relation Evidence. That preparation does not authorize creation or publication of `神社のゆくえ`.

This document defines the machine-enforced boundary between reusable seed preparation and actual Jinja implementation.

## Machine record

```text
config/jinja-start-gate.json
```

Validator:

```text
pnpm check:yukue:jinja-start-gate
```

Dedicated workflow:

```text
Verify Jinja start-gate record
```

The validator also runs inside:

```text
pnpm gate:matsuri:repository
```

## Hosted verification

```text
Workflow     Verify Jinja start-gate record
Run          29491745147
Conclusion   success
```

The initial implementation head also passed repository CI, Analytics-state validation, seed extraction, seed readiness, canonical Search, full-page screenshots, and F2-24 indexability preflight. The first indexability job was runner-cancelled and was rerun successfully before F2-P06 was recorded complete.

## Current state

```text
Status                               blocked-by-matsuri-launch-closure
Relation-backed Jinja seeds          5
Direct identity Evidence             5
Place references                     5
Approved shrine State Snapshots      0
Seeds with official URLs             4
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

Seed count, Evidence coverage, or available source material cannot substitute for any prerequisite.

## Enforced inactive boundary

While the record remains blocked:

- `apps/jinja` must not exist,
- no Jinja Worker deployment configuration may exist,
- no `jinja-yukue` hostname may be activated in deployment configuration,
- no Jinja public routes may be created,
- no Jinja publication claim may be made,
- no Shrine State may be invented,
- F2-P02 through F2-P05 remain preparation evidence only.

The validator fails if the repository contains an early application directory, deployment configuration, activation claim, missing prerequisite, inconsistent seed baseline, private account identifier, token, or email address.

## Current seed baseline

```text
阿蘇神社
櫛田神社
佐太神社
大日霊貴神社
秩父神社
```

All five have direct identity Evidence and Place provenance. All five still require a future Jinja-specific identity, State, Source, Evidence, and maintenance review before publication. 大日霊貴神社 also retains an explicit missing shrine-official URL gap; its public-authority source is not reclassified as a shrine-official URL.

## Cloudflare boundary

F2-P06 requires no Cloudflare access and does not change F2-25 through F2-28.

When Cloudflare access resumes, F2-25 through F2-28 are inserted first. Passing F2-28 alone still does not pass the Jinja start gate; the remaining stabilization, order, State-specification, and explicit-authorization prerequisites must also be completed.
