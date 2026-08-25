# Jinja activation work plan

Issue: #284

Jinja is the next specialist site. Matsuri nationwide expansion to 500/1,000 records is not a Jinja start prerequisite.

## Three separate stages

Jinja now separates **repository/local implementation**, **noncanonical workers.dev preview**, and **canonical/custom-domain activation**.

- `config/jinja-implementation-gate.json` controls repository/local implementation and records the currently authorized preview boundary.
- `config/jinja-preview-deployment-gate.json` controls the noncanonical, `noindex,nofollow` workers.dev preview.
- `config/jinja-start-gate.json` continues to control the later canonical/custom-domain activation path together with Matsuri stabilization completion.

Private owner-only observations such as current Cloudflare Web Analytics and Google Search Console checks must never be inferred. If owner access is unavailable for an extended period, those checks remain pending but do not freeze repository/local Jinja development or the separately authorized workers.dev preview.

## Ordered execution

1. Refresh the generated Jinja seed inventory from current main and reconcile historical start-gate counts.
2. Validate the specialist contract in `docs/jinja-specialist-contract.md` and `config/jinja-specialist-contract.json` against the shared observation core.
3. Confirm repository-visible Matsuri stabilization inputs; keep private owner-only observations pending when access is unavailable and never fabricate them.
4. Record Portal as non-blocking unless a concrete dependency is found.
5. Use `config/jinja-implementation-gate.json` to authorize repository/local implementation independently of pending private observations.
6. Build `apps/jinja` and validate schemas, projections, routes, detail/search/browse and machine-readable surfaces in local/CI.
7. Seed a bounded Jinja-specific A/B/C corpus; never auto-promote Matsuri shrine Relations.
8. Use `config/jinja-preview-deployment-gate.json` for the explicitly authorized noncanonical workers.dev preview. Keep it `noindex,nofollow`; do not attach a custom domain or declare it canonical.
9. Verify the workers.dev deployment and public-preview route separately from the canonical gate. GitHub Actions deployment currently requires repository/environment secrets `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`; missing credentials are an operational blocker, not a reason to invent deployment success.
10. When owner access returns, record the current Cloudflare Web Analytics and Search Console observations, complete Matsuri stabilization, and then evaluate `config/jinja-start-gate.json` for later custom-domain/canonical activation.

## Not gated on for repository/local implementation or workers.dev preview

- Matsuri reaching 500 public entities
- Matsuri reaching 1,000 public entities
- completion of continuous Matsuri Tier C deepening
- search-engine indexation itself
- Portal completion absent a demonstrated dependency
- owner access to Cloudflare Web Analytics
- owner access to Google Search Console
- formal Matsuri stabilization completion when the only remaining items are those private owner-only observations

## Still gated before repository/local implementation

- current seed/readiness review
- approved Jinja specialist contract
- Jinja State specification approval
- Portal/Jinja ordering decision
- explicit Jinja implementation authorization
- repository-visible Matsuri stabilization inputs reviewed

## workers.dev preview boundary

Authorized:

- Worker `jinja-yukue` on workers.dev;
- noncanonical public preview;
- `noindex,nofollow`;
- reviewed Jinja-specific preview records and machine-readable output.

Still prohibited at this stage:

- `jinja-yukue.badjoke-lab.com` or another custom-domain route;
- canonical publication claim;
- Search Console submission or indexability;
- treating the preview as proof that the canonical start gate passed.

## Still gated before canonical/custom-domain activation

- actual required private operational observations;
- formal Matsuri stabilization completion;
- the existing Jinja canonical start/publication gate;
- separate custom-domain/canonical authorization.

Jiin and Tomurai are not activated by this plan.
