# UI Foundation Specification

**Status:** Implementation specification

This document translates the accepted IA and UI direction into reusable UI primitives for the Yukue Series.

## 1. Shared shell

All site applications should share a common structural shell:

```text
site accent rule or equivalent small brand mark
header
primary navigation
main content
footer
```

The shell accepts the active site identity and accent color.

Initial site accents:

```text
matsuri  #284B63
jinja    #A33A32
jiin     #684B78
tomurai  #486457
```

## 2. Header

Desktop:

```text
site name left
optional small Roman label
horizontal navigation right
active item indicated with accent text and/or thin accent rule
```

Mobile:

```text
site name
menu control
single-column navigation reveal
```

Requirements:

- white background,
- thin bottom rule,
- no shadow by default,
- keyboard-accessible navigation,
- visible focus state,
- active navigation text remains understandable without color alone.

## 3. Typography

Use the primary Mincho family stack defined in `design-tokens.md`.

Content hierarchy:

```text
site name
hero title
entity name
section heading
subheading
body
metadata
labels
```

Long-form description text should use generous line height and restrained line length.

UI labels may use smaller size and tighter line height but remain in the same family system.

## 4. Section primitive

Base structure:

```text
section kicker [optional]
section title
section action [optional]
content
```

Visual language:

- white background,
- vertical spacing,
- section separation by thin rules,
- no default card background,
- no default shadow.

## 5. Search form

Home search should be visually prominent without resembling a SaaS command palette.

Recommended structure:

```text
text input
search action
```

Treatment:

- horizontal rule structure,
- minimal button chrome,
- clear keyboard focus,
- accessible label,
- empty query behavior defined,
- zero-result state defined.

## 6. Observation Snapshot

Purpose: summarize current State distribution.

Desktop:

```text
restrained five-column or responsive metric grid
```

Mobile:

```text
2-column or single-column flow depending available width
```

Each metric includes:

```text
number
text label
optional link target
```

Do not use colored status cards as the default.

## 7. Editorial change list

Recent Changes should use chronological rows.

Row fields:

```text
date or effective period
change type label
entity name
one-line summary
link action
```

Desktop may use columns.

Mobile collapses into stacked text while preserving date and change type.

## 8. Occurrence table

Core columns may include:

```text
year or date
entity name [browse contexts]
region [browse contexts]
outcome
scale
```

Requirements:

- clear header rule,
- light row rules,
- text outcome labels,
- horizontal overflow only when unavoidable,
- lower-priority columns may collapse on narrow screens,
- do not communicate outcome by color alone.

## 9. Integrated Overview

The Detail C Overview is a key shared pattern.

Potential fields:

```text
Current State
Verified at
Latest Occurrence
Usual Timing
Recurrence
Region
Main Place(s)
Official Information
```

Desktop:

```text
two reference-table columns
```

Mobile:

```text
single-column grouped rows
```

Labels are visually quieter than values.

Current State may use accent emphasis but always includes text.

## 10. Prose block

Used for About and explanatory text.

Requirements:

- limited line measure,
- generous line height,
- standard link treatment,
- heading hierarchy,
- support for Japanese punctuation and long names,
- no decorative drop caps or pseudo-traditional ornament by default.

## 11. Place and Map pattern

### single-site

```text
place information
address
map embed
open-in-map link
```

### multi-site

```text
place list
representative or multi-place map treatment
```

### route-based

```text
route context
key place list
map treatment that does not imply one point represents the entire tradition
```

### distributed

```text
area explanation
area-level map when appropriate
```

Map embeds should be lazy-loaded where practical.

A text address and external map link remain available even if embed loading fails.

## 12. Change timeline

Structure:

```text
date or period
event type
summary
optional resulting state
Evidence link
```

Visual treatment:

- thin monochrome vertical rule,
- small accent markers,
- Mincho typography,
- no large colored event cards,
- chronological direction clearly indicated.

## 13. Relation list

Relation display should prioritize understandable language.

Possible row structure:

```text
relation label
target entity name
optional validity period
link action
```

Examples:

```text
奉納先        ○○神社
継承組織      ○○保存会
構成芸能      ○○神楽
```

Internal relation codes should not be exposed as primary UI labels.

## 14. Designation list

Display:

```text
designation name
level or system
authority
effective period when relevant
source access
```

Keep designation separate from Entity State.

## 15. Evidence and Source apparatus

This is a core trust surface.

Recommended row structure:

```text
claim target
source title or publisher
what it supports [optional concise summary]
access action
```

Visual treatment:

- strong initial rule,
- light row separators,
- no alert styling unless the content is actually a warning,
- access to Source and Evidence context,
- archived links supported when appropriate.

## 16. Image primitive

### zero images

Render nothing.

### one image

```text
primary image
caption [optional]
credit
license access where required
```

### multiple images

```text
primary image
gallery thumbnails
lightbox
```

Lightbox requirements:

- close,
- previous/next,
- keyboard navigation,
- image count,
- caption,
- credit,
- credit URL,
- license information access,
- practical touch navigation.

## 17. Empty states

Empty states should be textual and honest.

Do not invent illustrative filler.

Examples:

```text
No reviewed Occurrence records are available yet.
No approved images are available for this record.
```

For images specifically, the preferred default is to omit the image section entirely rather than show an empty-state graphic.

## 18. Loading and failure states

The static-first site should render core content without client-side loading states.

Progressive or external elements such as map embeds may define:

```text
loading
embed failure
external-link fallback
```

## 19. Accessibility baseline

Required:

- semantic landmarks,
- visible keyboard focus,
- keyboard-accessible navigation,
- table headers for tabular data,
- sufficient contrast,
- textual State and outcome labels,
- meaningful alt text for documentary images,
- reduced-motion respect for optional motion,
- lightbox focus management.

## 20. Shared implementation order

```text
1. design tokens
2. page container and section primitive
3. site header and footer
4. search form
5. overview reference table
6. observation snapshot
7. editorial change list
8. occurrence table
9. timeline
10. relation list
11. evidence apparatus
12. place/map container
13. image/gallery/lightbox
```

## 21. First implementation surfaces

After shared primitives exist:

```text
Matsuri Home H1 static implementation
Matsuri Festival Detail C static implementation
mobile responsive pass
accessibility baseline
visual review
```

Use static fixture data first. Do not wait for final schema integration to validate layout and typography.

After the visual implementation passes, proceed to schema implementation, sample canonical data, and Public Projection integration.
