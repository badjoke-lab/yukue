# UI Direction

**Status:** Accepted direction

## Product character

The Yukue Series should feel like a high-quality Japanese cultural reference work: part formal shrine or temple website, part premium encyclopedia, with modern search and observation data underneath.

The visual direction is not a tourism portal, SaaS dashboard, social product, or decorative pseudo-Japanese theme.

## Core principles

```text
white background
black and gray typography
thin rules
large, controlled whitespace
Mincho type family as the primary type system
one accent color per site
real images only
no placeholder imagery
minimal card chrome
minimal shadow
```

## Typography

Use one Mincho family system throughout the public sites.

Priority use cases:

- site name,
- entity name,
- section headings,
- article and description text,
- overview labels and values,
- evidence and source text,
- navigation.

The goal is typographic consistency rather than mixing Mincho and textbook styles.

Implementation should prioritize Japanese readability, stable fallback behavior, and appropriate line height before decorative display effects.

## Color system

Neutral base:

```text
background: white
primary text: near black
secondary text: medium gray
rules: light gray
```

Series accent palette:

```text
祭のゆくえ      #284B63  indigo / iron blue
神社のゆくえ    #A33A32  muted vermilion
寺院のゆくえ    #684B78  deep traditional purple
弔いのゆくえ    #486457  deep green
```

Accent colors should be used sparingly for links, state emphasis, small section markers, thin rules, focus states, and selected navigation.

Do not use the accent as a large page background by default.

## Layout character

Prefer editorial and reference-book structure:

```text
section heading
thin rule
content rows
text blocks
reference tables
chronology / timeline
source list
```

Avoid excessive rounded cards, floating panels, large shadow systems, and dashboard tiles.

## Home H1 visual behavior

The accepted Home IA remains:

```text
Hero + Search
Current Observation Snapshot
Recent Changes
Recent Occurrences
Explore
Methodology / Evidence
Data Access
```

Visual treatment should remain editorial:

- Search is prominent but not app-like.
- Snapshot uses restrained numeric presentation and rules.
- Changes use chronological rows.
- Occurrences use a reference-table pattern.
- Explore uses structured text navigation rather than image cards when images are unavailable.

## Detail C visual behavior

The accepted Detail IA remains:

```text
Identity
Primary Image [optional]
Integrated Overview
About
Places & Map
Occurrence History
Change History
Relations
Gallery [optional]
Designations
Evidence & Sources
Machine-readable Data
```

The Integrated Overview should resemble a premium reference table rather than a dashboard card cluster.

Occurrence History should favor readable tabular chronology.

Change History should use a restrained timeline.

Evidence should look like a source apparatus, not an alert panel.

## Image behavior

The project uses approved real images only.

When no approved image exists:

```text
no hero image block
no placeholder
no empty gallery
no generic replacement image
```

When images exist, they should support the reference work rather than dominate every surface.

## Responsive behavior

Desktop may use side-by-side overview columns and map/place layouts.

Mobile should collapse into a single reading column while preserving information order and clear rule-based grouping.

The mobile page should feel like a well-typeset reference article, not a stack of app cards.

## Accessibility

Accent color must not carry meaning alone.

State, Occurrence outcome, and Change Event type require textual labels.

Focus states should use the site accent plus non-color cues where practical.

Typography and line length should favor sustained reading.

## Design boundary

The accepted direction fixes:

- white background,
- monochrome base,
- one Mincho family system,
- series accent palette,
- restrained rules and whitespace,
- editorial reference structure,
- no placeholder imagery,
- Home H1 and Detail C visual interpretation.

Exact spacing scale, font-size scale, container widths, breakpoints, and component dimensions are defined in `design-tokens.md` and may be tuned during implementation without changing the design direction.
