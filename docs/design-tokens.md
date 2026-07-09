# Design Tokens

**Status:** Initial implementation baseline

These tokens translate the accepted UI direction into a shared implementation starting point. Values may be tuned through implementation review without changing the overall design direction.

## Typography

Primary font stack:

```css
font-family:
  "Yu Mincho",
  "YuMincho",
  "Hiragino Mincho ProN",
  "Hiragino Mincho Pro",
  "Noto Serif JP",
  serif;
```

Do not mix a separate textbook-style font family into the primary public UI.

Suggested type scale:

```text
xs       12px
sm       14px
base     16px
lead     18px
h3       20px
h2       28px
h1       44px desktop / 34px mobile
entity   56px desktop / 40px mobile
hero     64px desktop / 42px mobile
```

Suggested line height:

```text
metadata       1.5
labels         1.5
body           1.9
lead           1.8
headings       1.35–1.5
```

Recommended body measure:

```text
long prose: 42–48 Japanese characters per line as a visual target
```

## Neutral colors

```text
--color-bg:          #FFFFFF
--color-text:        #171717
--color-text-soft:   #3F3F3F
--color-muted:       #6B6B6B
--color-rule:        #D9D9D4
--color-rule-strong: #242424
--color-surface-soft:#F7F7F5
```

## Site accent colors

```text
--accent-matsuri:  #284B63
--accent-jinja:    #A33A32
--accent-jiin:     #684B78
--accent-tomurai:  #486457
```

The active application exposes one site accent as:

```text
--color-accent
```

Accent use:

- selected navigation,
- links,
- small section markers,
- state emphasis,
- timeline markers,
- focus treatment,
- thin top rule or equivalent small brand mark.

Avoid large accent backgrounds by default.

## Spacing scale

```text
--space-1:   4px
--space-2:   8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-14: 56px
--space-16: 64px
--space-20: 80px
```

Section rhythm baseline:

```text
desktop: 56–72px vertical section padding
mobile:  40–48px vertical section padding
```

## Layout widths

```text
--container-wide:   1180px
--container-page:   1040px
--container-prose:   760px
--container-narrow:  620px
```

Page gutter baseline:

```text
desktop: 24px minimum
mobile:  14–18px
```

## Rules

Primary structural language uses borders rather than shadows.

```text
standard rule: 1px solid var(--color-rule)
strong rule:   1px solid var(--color-rule-strong)
accent rule:   1–2px solid var(--color-accent)
```

## Radius and shadow

Default:

```text
border radius: 0–2px
box shadow: none
```

Use larger radius or shadow only when required by a functional component, not as the default visual language.

## Component baselines

### Header

```text
white background
one thin divider
site name left
austere horizontal navigation on desktop
collapsed navigation on mobile
selected item marked by accent text and/or thin accent rule
```

### Search

```text
editorial horizontal form
strong top/bottom rule or single contained rule system
minimal button chrome
accent used for action emphasis
```

### Observation Snapshot

```text
no colored dashboard cards
numeric values aligned in a restrained grid or reference table
labels always visible
accent optional for selected emphasis only
```

### Overview

```text
two-column reference table on desktop
single-column grouped rows on mobile
labels muted
values dark
current state may use accent text
```

### Occurrence History

```text
reference-table treatment
strong header rule
light row rules
text labels for outcome and scale
```

### Change History

```text
thin monochrome timeline rule
small accent markers
plain text year/date
no large colored event cards
```

### Evidence

```text
source-apparatus treatment
rows separated by rules
claim target + source + access action
no alert-box styling unless an actual warning is present
```

### Images

```text
no placeholder state
primary image optional
gallery only when multiple approved images exist
credit always adjacent or directly reachable
lightbox preserves caption, credit, and license access
```

## Responsive baseline

Suggested initial breakpoints:

```text
small:   640px
medium:  900px
wide:   1180px
```

Breakpoints are implementation baselines, not public contracts.

## Motion

Keep motion minimal.

Permitted examples:

- focus and hover transitions,
- lightbox open/close,
- gallery navigation,
- mobile navigation reveal.

Avoid decorative scroll animation as a core visual dependency.
