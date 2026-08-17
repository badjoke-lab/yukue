# Matsuri F2-27 Production Traffic Verification — 2026-08-17

**Status:** Passed

## Verified public-safe facts

The canonical production site was opened in Chrome after the corrected post-activation deployment. DevTools Network inspection showed both parts of the Cloudflare Web Analytics collection path:

```text
Cloudflare beacon script request   HTTP 200
/cdn-cgi/rum request               XHR / HTTP 204
Canonical hostname                 matsuri-yukue.badjoke-lab.com
Verification recorded              2026-08-17T05:25:16Z
```

A successful beacon load followed by an HTTP 204 response from `/cdn-cgi/rum` demonstrates that the browser executed the Cloudflare RUM beacon and delivered the collection request to Cloudflare's endpoint.

This corrected verification does **not** claim that the Cloudflare dashboard had already rendered page-view or visitor totals at that moment. Dashboard display latency is separate from browser collection-path verification.

## Privacy boundary

Not committed:

- private dashboard screenshots,
- raw page-view or visitor counts,
- geography or referrer data,
- Cloudflare account identity or account ID,
- Analytics/beacon tokens,
- visitor-level data.

## Result

```text
F2-25 newly verified   true
F2-26 corrected deploy true
F2-27 RUM receipt      true
Search indexation      not claimed
```

The July 2026 F2-27 dashboard-verification claim is not reused as evidence for this result; the corrected result is based on the 2026-08-17 browser collection-path observation above.
