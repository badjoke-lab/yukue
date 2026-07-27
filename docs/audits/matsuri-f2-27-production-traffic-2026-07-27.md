# Matsuri F2-27 Production Traffic Verification — 2026-07-27

**Status:** Passed

## Verified public facts

```text
Canonical hostname
matsuri-yukue.badjoke-lab.com

Provider
Cloudflare Web Analytics

Verification time
2026-07-27T11:26:58Z

Traffic observed
yes
```

## Representative routes visited

```text
/
/festivals/
/search/
/festivals/suneori-amagoi/
```

The four canonical production routes were opened in a normal browser after the accepted F2-26 post-activation deployment. A private owner-dashboard review then confirmed that Cloudflare Web Analytics had received production traffic for the canonical Matsuri hostname.

## Privacy review

```text
Raw page-view counts published      false
Raw visitor counts published        false
Geography published                 false
Referrers published                 false
Device detail published             false
Account identity published          false
Analytics token published           false
Visitor-level data published        false
Private dashboard screenshot stored false
```

The private dashboard screenshot used for the review is not committed. This audit records only the minimum public-safe facts needed to prove the gate.

## Gate result

```text
F2-25 complete  true
F2-26 complete  true
F2-27 complete  true
F2-28 complete  false
```

F2-27 proves production traffic receipt for the canonical hostname. It does not prove search-engine indexation and does not by itself complete the final F2 Launch Gate.
