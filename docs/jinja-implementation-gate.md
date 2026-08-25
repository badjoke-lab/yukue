# Jinja implementation gate

Status: repository implementation and noncanonical workers.dev preview authorized; canonical/custom-domain activation blocked

The Jinja application must not be held indefinitely when the owner cannot access Cloudflare Web Analytics or Google Search Console for an extended period.

This gate separates three concerns that were previously coupled:

1. **repository/local implementation readiness** — whether `apps/jinja` may be created and developed in GitHub/CI;
2. **workers.dev preview readiness** — whether the explicitly authorized noncanonical, `noindex,nofollow` preview may be deployed;
3. **canonical/custom-domain activation readiness** — whether a custom hostname, canonical publication, Search submission, or indexability may be activated.

## Decision

Current private Matsuri stabilization observations remain genuinely pending and must not be inferred:

- current Cloudflare Web Analytics traffic receipt;
- current Google Search Console observation.

They continue to block Matsuri stabilization completion and therefore continue to block Jinja canonical/custom-domain activation.

They do **not** block repository/local implementation of Jinja or the separately authorized workers.dev preview.

## What is authorized now

- develop `apps/jinja` in GitHub/CI;
- implement Jinja routes, layouts, schemas/projections and local data adapters;
- add bounded Jinja-specific reviewed seed data;
- run local/CI build, type, content, relation and detail-page validation;
- develop search/browse/detail/machine-readable surfaces against the approved specialist contract;
- create/update Worker `jinja-yukue` at the governed workers.dev preview origin;
- publish only the noncanonical `noindex,nofollow` workers.dev preview under `config/jinja-preview-deployment-gate.json`.

## What remains prohibited

Until the private observations are actually recorded and the existing Jinja canonical start/publication gate is separately passed:

- no Jinja custom hostname/domain/route activation;
- no canonical publication claim;
- no Search Console submission or indexability;
- no claim that Matsuri stabilization is complete;
- no inference that Cloudflare/GSC checks passed;
- no automatic promotion of Matsuri shrine Relations into Jinja records.

## Deployment credential boundary

The authorized workers.dev preview still requires valid Cloudflare deployment credentials. GitHub Actions expects:

```text
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
```

These values must be stored as GitHub Actions repository/environment secrets and must never be committed to the repository or printed in logs. Missing credentials mean deployment remains operationally pending; they do not revoke Jinja implementation authorization and must not be replaced with fabricated success evidence.

Deployment result tracking is recorded in Issue #311.

## Long owner absence

If owner access is unavailable for days or months, development continues under this implementation gate and the workers.dev preview remains separately authorized. Issue #297 remains an owner-action checkpoint for later canonical activation rather than a development blocker. When access returns, record the two current observations, close Matsuri stabilization, then evaluate custom-domain/canonical activation using the existing governed gates.

Machine-readable sources:

- `config/jinja-implementation-gate.json`
- `config/jinja-preview-deployment-gate.json`
- `config/jinja-start-gate.json`
