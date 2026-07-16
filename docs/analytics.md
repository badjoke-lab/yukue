# Analytics Baseline

**Status:** Workers Web Analytics baseline / owner activation pending

## Purpose

The launch analytics baseline for `祭のゆくえ` is intentionally small.

The purpose is to confirm that the public site is being reached and that production pages are loading successfully. It is not a user-profile system, advertising stack, recommendation system, or behavioral-personalization layer.

Initial launch questions are limited to:

```text
is the public site receiving visits?
which public pages are being viewed?
are page loads and Core Web Vitals healthy enough for launch monitoring?
is Search being reached as an entry or navigation surface?
```

Do not expand analytics scope merely because the provider makes additional capabilities available.

## Provider and delivery model

Use Cloudflare Web Analytics for the canonical Matsuri hostname delivered through Cloudflare Workers Static Assets.

```text
Cloudflare Worker
matsuri-yukue

Canonical hostname
matsuri-yukue.badjoke-lab.com

Analytics provider
Cloudflare Web Analytics

Activation method
automatic setup
```

The current production application is not a legacy Pages project. The earlier Pages-project activation assumption is superseded.

F2-25 is an account-level Cloudflare Web Analytics operation for the canonical proxied hostname. No manual Web Analytics beacon is part of the repository baseline.

Do not commit:

```text
analytics tokens
site-specific beacon credentials
manual beacon scripts
private dashboard exports
visitor-level operational notes
private traffic analysis
```

## Gate separation

Analytics activation, deployment, and traffic receipt are separate facts.

```text
F2-25  enable Cloudflare Web Analytics automatic setup
F2-26  deploy production after activation
F2-27  verify production traffic in the private dashboard
F2-28  run the final F2 Launch Gate
```

F2-25 does not complete F2-26 or F2-27. A pre-activation deployment cannot be reused as F2-26 evidence. An enabled configuration does not prove that traffic has been received.

The machine-readable progression record is:

```text
config/matsuri-analytics-activation.json
```

Validate it with:

```text
pnpm check:matsuri:analytics-activation-record
```

## Owner-access pending state

When Cloudflare account access is unavailable, the valid state is:

```text
status             pending-owner-access
analytics_enabled  false
F2-25              incomplete
F2-26              incomplete
F2-27              incomplete
```

This state does not block reviewed factual maintenance, date-triggered festival updates, Source/Evidence/Relation work, security or dependency repairs, or repository preparation for the remaining launch gates.

## F2-25 verification

After Automatic setup is enabled:

1. record the public canonical hostname,
2. record that Cloudflare Web Analytics is enabled,
3. record that Automatic setup is used,
4. record exact UTC activation and observation times,
5. create a sanitized public audit,
6. update the machine record to `analytics-enabled`,
7. run the Analytics validator and repository gate.

Do not commit private dashboard screenshots. The audit should retain sanitized facts only.

## F2-26 verification

After F2-25:

1. merge the bounded activation-evidence change,
2. allow the production branch deployment to complete,
3. record the exact source commit and deployment time,
4. verify the canonical origin and public gates,
5. create a sanitized F2-26 audit,
6. update the machine record to `post-activation-deployed`.

## F2-27 verification

After F2-26:

1. open the canonical production origin in a normal browser,
2. visit at least Home, one Browse surface, Search, and one Detail page,
3. confirm Web Analytics receives production traffic,
4. create a sanitized F2-27 audit,
5. update the machine record to `traffic-verified`.

Do not publish raw page-view counts, visitor counts, geography, referrers, device detail, account identity, or private dashboard screenshots.

## Relationship to deployment verification

The repository commands:

```text
MATSURI_CHECK_ORIGIN=https://<deployment-host> pnpm check:matsuri:deployed
MATSURI_CHECK_ORIGIN=https://<canonical-origin> pnpm check:matsuri:canonical
```

verify public HTTP surfaces, machine-readable files, Search assets, manifest origin, and sitemap-origin rules. They do not prove Analytics activation or private dashboard traffic receipt.

## Privacy and scope boundary

The launch baseline does not add:

```text
advertising trackers
cross-site advertising identifiers
custom user accounts
session replay
heatmap tooling
personalized recommendations
marketing automation
client-side event taxonomy beyond the provider baseline
```

Adding another analytics provider, a manual beacon, or a custom event pipeline requires an explicit product and privacy decision before implementation.

## Public status wording

Before activation:

```text
Web Analytics — owner activation pending
```

After F2-25 only:

```text
Web Analytics — enabled; production verification pending
```

After F2-27:

```text
Web Analytics — enabled and production traffic verified
```

Do not publish private traffic counts on the Status page as part of the launch baseline.
