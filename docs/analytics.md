# Analytics Baseline

**Status:** Initial baseline

## Purpose

The launch analytics baseline for `祭のゆくえ` is intentionally small.

The purpose is to confirm that the public site is being reached and that the production pages are loading successfully. It is not a user-profile system, advertising stack, recommendation system, or behavioral personalization layer.

Initial launch questions are limited to:

```text
is the public site receiving visits?
which public pages are being viewed?
are page loads and Core Web Vitals healthy enough for launch monitoring?
is Search being reached as an entry or navigation surface?
```

Do not expand analytics scope merely because the provider makes additional capabilities available.

## Provider and activation model

Use Cloudflare Web Analytics through the Cloudflare Pages project.

Activation is a Pages project-level operation:

```text
Cloudflare dashboard
→ Workers & Pages
→ Matsuri Pages project
→ Metrics
→ Web Analytics
→ Enable
→ next deployment
```

The Pages project injects the Web Analytics script after activation and a subsequent deployment.

Do not commit:

```text
analytics tokens
site-specific beacon credentials
private dashboard exports
visitor-level operational notes
private traffic analysis
```

No manual Web Analytics beacon is part of the repository baseline.

## Activation gate

The analytics baseline is complete only after all of the following are true:

```text
1. the Cloudflare Pages project exists
2. the production deployment is reachable
3. Web Analytics is enabled in the Pages project
4. a deployment occurs after enablement
5. the analytics dashboard begins receiving production traffic
```

Repository build success alone does not complete this gate.

## Verification

After Web Analytics activation and redeployment:

1. open the canonical production origin in a normal browser,
2. visit at least the Home, one Browse surface, Search, and one Detail page,
3. confirm the Pages project remains healthy,
4. confirm Web Analytics begins receiving production traffic,
5. record only the gate completion in `docs/project-status.md`.

Do not commit raw visitor analytics or screenshots of private dashboards to the public repository.

## Relationship to deployment verification

Analytics verification is separate from the deployed-site verifier.

The repository commands:

```text
MATSURI_CHECK_ORIGIN=https://<deployment-host> pnpm check:matsuri:deployed
MATSURI_CHECK_ORIGIN=https://<canonical-origin> pnpm check:matsuri:canonical
```

verify public HTTP surfaces, machine-readable files, Search assets, manifest origin, and sitemap origin rules.

They do not prove that the private Cloudflare Web Analytics dashboard is receiving traffic. That remains an account-level operational verification step.

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

Adding another analytics provider or a custom event pipeline requires an explicit product and privacy decision before implementation.

## Public Status wording

The public Status page should describe analytics architecture without exposing private metrics.

Before project-level activation:

```text
Web Analytics — Pages project-level activation required
```

After activation and traffic verification:

```text
Web Analytics — enabled
```

Do not publish private traffic counts on the Status page as part of the launch baseline.
