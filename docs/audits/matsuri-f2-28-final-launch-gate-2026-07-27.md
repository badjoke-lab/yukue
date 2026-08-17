# Matsuri F2-28 Final F2 Launch Gate — 2026-07-27

> **Correction notice — 2026-08-17:** The July F2-25/F2-27 Cloudflare Web Analytics evidence used by this evaluation was later retracted after the owner confirmed Analytics had not actually been configured at that time. Do not treat the July Analytics sub-gate claims below as independently valid historical proof. Cloudflare Web Analytics was newly configured and the F2-25 → F2-26 → F2-27 sequence was re-established with 2026-08-17 evidence. The non-Analytics launch-gate evidence remains part of the historical audit trail.

**Status:** Passed

## Evaluation basis

```text
Evaluated at        2026-07-27T11:45:20Z
F2-27 merge commit  6a0ef91dad62fb7f5d65135d846b1cf6b6301d25
Validation head     f8115c65e0f7a1fbdebd9339ec26a6bb0da18cbc
```

F2-28 was evaluated only after F2-27 production traffic verification passed and was merged to `main`.

## Required gates

```text
F2-15 repository readiness           passed
F2-M01 visual review                 passed
F2-M02 data freshness baseline       passed
F2-16 through F2-27                  completed
Canonical origin gate                passed
Canonical Search gate                passed
Crawler reachability gate            passed
F2-24 indexability preflight         passed
Analytics progression                passed
Repository baseline                  passed
Jinja guardrail                      passed
Privacy boundary                     passed
```

## Hosted verification

```text
Repository gate            30262887402 — success
Analytics progression      30262887410 — success
Repository baseline        30262887530 — success
Canonical origin           30262887395 — success
Canonical Search           30262887428 — success
Crawler reachability       30262887462 — success
Indexability preflight     30262887424 — success
Jinja start gate           30262887458 — success
```

## Release artifact

```text
Artifact ID      8651652059
Artifact digest  sha256:230ee6ab4f354d26e71d22a9c174d7dcc7f782f90bf5c9e0ff1278bbd401b5d8
```

## Privacy and claims review

```text
Private dashboard screenshot committed  false
Raw Analytics metrics committed          false
Account identity committed               false
Analytics token committed                false
Visitor-level data committed             false
Search-engine indexation claimed         false
Jinja start authorized                   false
```

F2-28 completion proves that the defined Matsuri launch gates passed. It does not prove that any URL is indexed and does not authorize implementation or publication of `神社のゆくえ`.

## Result

```text
F2-28 complete  true
Phase 9         completed
Phase 10        stabilization may begin
Jinja gate      blocked by remaining post-launch prerequisites
```
