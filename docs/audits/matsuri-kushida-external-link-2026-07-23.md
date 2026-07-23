# Matsuri 櫛田神社 External-link Maintenance — 2026-07-23

**Status:** Passed source review / hosted verification pending

## Scope

This bounded maintenance change corrects the primary external link of the existing Matsuri Entity `shr-kushida-jinja`.

Included:

- replace the festival-wide homepage link with the dedicated 櫛田神社 page on the same official-organization site,
- add `corrections-09.json` as a complete-record Entity correction,
- increase `shr-kushida-jinja` from record version 2 to 3,
- retain the existing canonical name, summary, geography, Place references, lifecycle, Source references, and Evidence records,
- register correction 09 in both canonical dataset consumers,
- refresh the machine repository baseline.

Intentionally excluded:

- no new Entity, Source, Evidence, Relation, State, Occurrence, or lifecycle record,
- no change to the 博多祇園山笠 Entity or 博多祇園山笠振興会 Entity,
- no Analytics activation or F2-25 through F2-28 completion claim,
- no Jinja State specification, application, Worker, hostname, or publication authorization.

## Reviewed URLs

Previous primary external link:

```text
https://www.hakatayamakasa.com/
```

Corrected primary external link:

```text
https://www.hakatayamakasa.com/61866.html
```

The previous URL is the official 博多祇園山笠 homepage and remains appropriate for the festival and promotion-association records. It is not the most specific destination for the shrine Entity.

The dedicated page is titled `櫛田神社` and directly describes the shrine, its enshrined deities, history, buildings, rites, and shrine leadership. It is already represented by the approved Source `src-kushida-jinja-official-page` and supports the existing canonical-name provenance.

## Complete-record correction

```text
Entity ID        shr-kushida-jinja
Previous version 2
Corrected version 3
Correction file  data/public/matsuri/f2/corrections-09.json
Updated on       2026-07-23
```

Only the external-link destination and link check date change:

```text
from  https://www.hakatayamakasa.com/
to    https://www.hakatayamakasa.com/61866.html
```

The correction preserves the complete-record replacement rule rather than applying a partial patch.

## Repository baseline effect

```text
Maintenance bundles              13 -> 13
Correction bundles                8 -> 9
Additive application slots       24 -> 24
Correction application slots      8 -> 9
Correction records               16 -> 17
Corrected logical IDs            14 -> 14
Public Entities                  44 -> 44
Entities without external links   0 -> 0
```

`corrected_logical_ids` remains unchanged because `shr-kushida-jinja` was already corrected in an earlier bundle.

## Boundary interpretation

This maintenance improves destination specificity for an existing public link. It does not alter the launch sequence, activate Analytics, complete F2-25 through F2-28, infer a shrine State, or authorize Jinja implementation.
