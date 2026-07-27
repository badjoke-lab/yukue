# Matsuri F2-25 Cloudflare Web Analytics Activation

**Status:** Passed / Automatic setup observed enabled

## Scope

This audit records the public-safe F2-25 result for the canonical Matsuri production hostname.

```text
Canonical hostname
matsuri-yukue.badjoke-lab.com

Provider
Cloudflare Web Analytics

Activation method
automatic setup

Observation time
2026-07-27T09:37:29Z
```

## Verified configuration

The Cloudflare account-level Web Analytics configuration for the `badjoke-lab.com` zone was reviewed through the owner dashboard.

The configuration showed:

- Real User Measurements enabled through automatic JavaScript insertion,
- the privacy mode excluding visitors within the European Union,
- no manual JavaScript snippet installation selected,
- no custom Web Analytics rules available or configured on the current plan,
- the canonical Matsuri hostname operating below the configured proxied zone.

The exact historical activation time was not available from the reviewed screen. For the machine record, `activated_at` and `activation_observed_at` use the first repository-verifiable enabled observation time above. This means activation is proven to have occurred at or before that timestamp; it does not claim that the setting was first enabled at that instant.

## Privacy review

The private dashboard screenshots were reviewed but are not committed.

The public repository does not contain:

- Cloudflare account email or account identifier,
- Zone ID or account ID,
- Analytics site token or beacon token,
- JavaScript beacon source,
- dashboard screenshots,
- page-view or visitor counts,
- geography, referrer, device, or visitor-level data.

## Gate result

```text
F2-25 complete                    true
F2-26 post-activation deployment false
F2-27 production traffic         false
```

F2-25 proves that Automatic setup was observed enabled. It does not prove a production deployment after this recorded observation and does not prove receipt of production traffic in the private dashboard.

The next accepted action is to merge this F2-25 evidence change and use the resulting `main` deployment as the F2-26 candidate. A deployment of the pull-request head is not accepted as F2-26 evidence.
