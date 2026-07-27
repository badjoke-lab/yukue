# F2-25 Matsuri Cloudflare Web Analytics

**Status:** Completed / F2-26 post-activation deployment next

## Objective

Enable Cloudflare Web Analytics for the canonical Matsuri production hostname without adding a manual beacon, secret, visitor identifier, or second analytics provider.

```text
Canonical origin
https://matsuri-yukue.badjoke-lab.com

Delivery
Cloudflare Workers Static Assets

Provider
Cloudflare Web Analytics

Activation method
automatic setup
```

The current deployment is a Worker, not a legacy Pages project. F2-25 is an account-level Cloudflare Web Analytics configuration check for the canonical proxied hostname.

## Completed state

The machine-readable record is:

```text
config/matsuri-analytics-activation.json
```

The public-safe evidence is:

```text
docs/audits/matsuri-f2-25-analytics-activation-2026-07-27.md
```

The owner dashboard review confirmed that the existing `badjoke-lab.com` zone-level Automatic setup was enabled with the EU-visitor exclusion mode and no custom rules. The canonical Matsuri hostname is served below that proxied zone.

The reviewed screen did not expose the historical instant when the pre-existing setting was first enabled. The machine record therefore uses the first repository-verifiable enabled observation:

```text
2026-07-27T09:37:29Z
```

For `activation_time_basis: pre-existing-automatic-setup-observed`, `activated_at` and `activation_observed_at` intentionally use the same first verified observation. This proves activation occurred at or before that timestamp and does not invent an older exact activation time.

## F2-25 completion result

```text
status                         analytics-enabled
provider                       cloudflare-web-analytics
activation_method              automatic-setup
activation_time_basis          pre-existing-automatic-setup-observed
analytics_enabled              true
activated_at                   2026-07-27T09:37:29Z
activation_observed_at         2026-07-27T09:37:29Z
activation_evidence_document   existing F2-25 audit
f2_25_complete                 true
f2_26_complete                 false
f2_27_complete                 false
```

F2-25 proves configuration activation only. It does not prove that a deployment occurred after the recorded observation or that production traffic reached the private analytics dashboard.

## Next gate

F2-26 begins only after this F2-25 evidence change is merged.

Accepted sequence:

1. merge the F2-25 evidence and machine-state change,
2. allow the resulting `main` commit to deploy through the existing Cloudflare Git integration,
3. record that exact source commit and deployment time,
4. verify the canonical origin and repository gates,
5. create the public-safe F2-26 audit.

A pull-request-head deployment and any deployment before the recorded F2-25 observation are not accepted as F2-26 evidence.

## Privacy boundary

Do not commit:

- Cloudflare account email or account identifier,
- Analytics site token or beacon token,
- manual beacon script,
- private dashboard export,
- visitor-level notes or identifiers,
- raw traffic counts,
- private screenshots.

Public-safe evidence may retain only:

- provider name,
- public canonical hostname,
- automatic-setup state,
- UTC timestamps,
- sanitized enabled/disabled result,
- later deployment commit and public deployment facts,
- confirmation that traffic was observed without publishing private counts.

## Validation

```text
pnpm check:matsuri:analytics-activation-record
pnpm gate:matsuri:repository
```

The validator rejects false progression, manual-beacon activation, secret-like fields, email addresses, missing audit documents, unsupported timestamp provenance, and F2-26 or F2-27 claims made before their evidence exists.
