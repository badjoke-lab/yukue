# Matsuri Canonical Name Provenance Closure — 2026-07-20

**Status:** Passed maintenance audit

## Scope

This bounded maintenance closes a provenance gap between dedicated Entity-identity Sources and the canonical names that those Sources directly support.

Three shrine records already carried dedicated identity Evidence, but their preferred canonical names still referenced only an older restoration, festival schedule, or festival-specific page. The 博多祇園山笠振興会 organization record likewise depended on the 2026 festival schedule even though the official site publishes a dedicated organization page.

## Added Source and Evidence

```text
Source    src-hakata-yamakasa-shinkokai-official
Evidence  evd-hakata-yamakasa-shinkokai-official-identity
Target    org-hakata-yamakasa-shinkokai
URL       https://www.hakatayamakasa.com/175270.html
Class     official_organization
```

The dedicated official page describes the association's formation, operating structure, current officers, and organizational purpose.

## Complete-record corrections

`corrections-07.json` updates four stable Entity records from `record_version: 1` to `record_version: 2` without changing names, summaries, geography, lifecycle, or external links.

### 阿蘇神社

```text
Old canonical-name Source  src-aso-restoration
Added identity Source      src-aso-jinja-about
```

### 櫛田神社

```text
Old canonical-name Source  src-hakata-schedule-2026
Added identity Source      src-kushida-jinja-official-page
```

### 秩父神社

```text
Old canonical-name Source  src-chichibu-yomatsuri
Added identity Source      src-chichibu-jinja-saijin
```

### 博多祇園山笠振興会

```text
Old canonical-name Source  src-hakata-schedule-2026
Added identity Source      src-hakata-yamakasa-shinkokai-official
```

The previous context Sources are retained. The correction adds the dedicated identity Source rather than erasing the historical provenance chain.

## Generated result

Artifact inspection confirmed:

```text
Public Entities                         44
Entities without external links          0
Target record versions               2 / 2 / 2 / 2
Target canonical names with old Source    4 / 4
Target canonical names with identity Source 4 / 4
Maintenance bundles                     12
Correction bundles                       7
Correction records                      13
Corrected logical IDs                   12
```

## Initial hosted verification

Implementation head:

```text
d0e0db0a6546e0ac0fa0558ec74e1c23d15101f7
```

```text
Repository CI                       29740822315 — success
Full-page screenshots               29740822240 — success
Bundle inventory                    29740822246 — success
Canonical dataset contract          29740822214 — success
Correction contract                 29740822223 — success
Future-site seed inventory          29740822212 — success
Future-site seed readiness          29740822239 — success
Jinja start-gate record             29740822231 — success
```

Artifacts:

```text
Release artifact ID       8460336948
Release artifact digest   sha256:860ae91aa2b455203f6b25e4ab94ff7652d29c91835c6fc3305af747ed8b0347
Screenshot artifact ID    8460315691
Screenshot digest         sha256:ef23b735aeb2503034399d1d29de143070f1dba413b0256cde8bf75651c1e30d
Seed artifact ID          8460285787
Seed artifact digest      sha256:565ba5e48b687eddd24ca726874f04060723a3d1a6df670760d00ef92ad40b67
```

## Boundaries

This maintenance does not:

- add or remove an Entity,
- infer or modify State,
- change a Relation or Occurrence,
- change lifecycle, summary, geography, or external links,
- activate Cloudflare Analytics,
- complete F2-25 through F2-28,
- create or authorize a Jinja application, Worker, hostname, State vocabulary, or publication.
