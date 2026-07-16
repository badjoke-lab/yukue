# F2-25 Matsuri Cloudflare Web Analytics

**Status:** Owner Cloudflare access pending / repository preparation complete

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

The current deployment is a Worker, not a legacy Pages project. F2-25 is therefore an account-level Cloudflare Web Analytics action for the canonical proxied hostname.

## Current pending state

The machine-readable record is:

```text
config/matsuri-analytics-activation.json
```

Until owner Cloudflare access is available it must remain:

```text
status                 pending-owner-access
analytics_enabled      false
f2_25_complete         false
f2_26_complete         false
f2_27_complete         false
```

The pending state is valid and does not block reviewed data maintenance, Source/Evidence/Relation maintenance, dependency or security repairs, or repository preparation for F2-26 through F2-28.

## Owner action when access resumes

1. Open the Cloudflare dashboard.
2. Open `Analytics & Logs` and then `Web Analytics`.
3. Add or select the site for:

   ```text
   matsuri-yukue.badjoke-lab.com
   ```

4. Enable Automatic setup for the proxied hostname.
5. Do not choose manual JavaScript snippet installation.
6. Confirm the site shows Web Analytics enabled.
7. Record the exact UTC activation or observation time available from the dashboard.
8. Create a sanitized audit from `docs/templates/matsuri-f2-25-analytics-evidence.md`.
9. Update `config/matsuri-analytics-activation.json` to `analytics-enabled`.
10. Run `pnpm check:matsuri:analytics-activation-record` and the repository gate.

## F2-25 completion requirements

```text
status                         analytics-enabled
provider                       cloudflare-web-analytics
activation_method              automatic-setup
analytics_enabled              true
activated_at                   valid UTC timestamp
activation_observed_at         valid UTC timestamp
activation_evidence_document   existing F2-25 audit
f2_25_complete                 true
f2_26_complete                 false
f2_27_complete                 false
```

F2-25 proves configuration activation only. It does not prove that a deployment occurred after activation or that production traffic reached the private analytics dashboard.

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

The validator rejects false progression, manual-beacon activation, secret-like fields, email addresses, missing audit documents, and F2-26 or F2-27 claims made before their evidence exists.
