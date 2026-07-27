# F2-25 Matsuri Cloudflare Web Analytics

**Status:** Completed / F2-26 and F2-27 subsequently completed / F2-28 active

## Objective

Enable Cloudflare Web Analytics for the canonical Matsuri production hostname without adding a manual beacon, secret, visitor identifier, or second analytics provider.

```text
Canonical origin   https://matsuri-yukue.badjoke-lab.com
Delivery           Cloudflare Workers Static Assets
Provider           Cloudflare Web Analytics
Activation method  automatic setup
```

## F2-25 evidence

The owner dashboard review confirmed that the existing zone-level Automatic setup was enabled. The historical initial enablement instant was unavailable, so the first repository-verifiable enabled observation is used without inventing an older time.

```text
First verified observation  2026-07-27T09:37:29Z
Evidence                    docs/audits/matsuri-f2-25-analytics-activation-2026-07-27.md
F2-25 complete              true
```

F2-25 proves configuration activation only.

## Subsequent progression

```text
F2-26 post-activation deployment  completed at 2026-07-27T10:34:17Z
F2-27 production traffic          verified at 2026-07-27T11:26:58Z
F2-28 final F2 Launch Gate        active next gate
```

Evidence:

```text
docs/audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md
docs/audits/matsuri-f2-27-production-traffic-2026-07-27.md
```

The machine-readable progression record is:

```text
config/matsuri-analytics-activation.json
```

## Privacy boundary

Do not commit:

- Cloudflare account email or account identifier,
- Analytics site token or beacon token,
- manual beacon script,
- private dashboard export,
- visitor-level notes or identifiers,
- raw traffic counts,
- private screenshots.

Public-safe evidence may retain only provider name, public canonical hostname, automatic-setup state, UTC timestamps, sanitized gate results, deployment facts, representative public routes, and confirmation that traffic was observed without publishing private counts.

## Validation

```text
pnpm check:matsuri:analytics-activation-record
pnpm gate:matsuri:repository
```

The validator rejects false progression, manual-beacon activation, secret-like fields, email addresses, missing audit documents, unsupported timestamp provenance, and completion claims made before their evidence exists.
