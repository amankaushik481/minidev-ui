# MiniDev UI · DESIGN.md

The load-bearing spec. Every component derives from it and invents nothing.
Tokens live in `src/styles/minidev.css` (shipped as `minidev-ui-kit/styles.css`).

## Decisions

| Decision | Choice |
|---|---|
| Type | **Geist Sans** for UI and headings, **Geist Mono** for data and code. Never Inter. |
| Primary action | **Ink**: near-black in light, near-white in dark (`bg-ink text-on-ink shadow-ink`). |
| Brand colour | **Violet, hue 283**. Spent like punctuation: focus, selection, links, charts, one accent button. |
| Signature | **Light and material**: one light source crosses the page; four materials (hairline, glass, metal, paper) from one token set. Hairline is the quiet default. |

## Light and material

One light source, set by `<LightProvider />` from the pointer (a slow drift on touch and idle), writes `--lx --ly --sx --sy --la` on `<html>`. The shadow set, raised edges and sheens all read it, so every shadow falls away from the same light.

Materials are an attribute: `data-material="hairline | glass | metal | paper"` on `<html>` or any element; they nest. A material redefines the tokens and sets `--mat-*` hooks that decorate `bg-surface`, `bg-raised`, `bg-ink`, `bg-accent`, `bg-bg` and `*-thumb` slots:

| Material | Character |
|---|---|
| hairline | Unlit. 1px lines, quiet depth. The default for products. |
| glass | Translucent surfaces, 22px frost, sheen under the light, colour behind. |
| metal | Brushed aluminium (black anodised in dark), bevels that turn with the light, machined knobs. |
| paper | Warm stock, grain, long soft shadows; ink-blue primary. |

## Colour tokens (semantic only)

Surfaces, lightness rises with elevation: `bg` → `surface` / `raised` ; `sunken` below.
Lines: `border`, `border-strong`, `grid` (the dot and grid textures).
Text: `fg`, `fg-muted` (≥ 7:1), `fg-subtle` (≥ 4.5:1).
Ink: `ink`, `ink-hover`, `on-ink`.
Brand: `accent`, `accent-hover`, `accent-fg` (accent text), `accent-soft` (tint fill), `accent-line` (tint border), `on-accent`, `accent-2` (gradient partner only).
Status: `success`, `warning`, `danger`, `info`, at equal perceptual weight.

No hex, no palette steps (`blue-500`) in components. Dark mode redefines tokens, never components.

### Token table (for agents)

Use the class, never the raw value. Values are the hairline defaults; glass, metal and paper redefine the same names.
"Worst" is the measured WCAG contrast on the hardest surface (bg, surface, raised or sunken) across all eight looks (4 materials × light/dark; glass measured over its darkest or brightest backdrop).

| Token | Class | Use for | Light | Dark | Worst |
|---|---|---|---|---|---|
| `--bg` | `bg-bg` | Page | `oklch(0.985 0.0015 264)` | `oklch(0.145 0.004 270)` | |
| `--surface` | `bg-surface` | Cards, panels, inputs | `oklch(1 0 0)` | `oklch(0.172 0.005 270)` | |
| `--raised` | `bg-raised` | Menus, popovers, dialogs | `oklch(1 0 0)` | `oklch(0.2 0.006 270)` | |
| `--sunken` | `bg-sunken` | Wells, tracks, code, hover fill | `oklch(0.967 0.0025 264)` | `oklch(0.125 0.004 270)` | |
| `--overlay-scrim` | `bg-scrim` | Behind modals | `oklch(0.2 0.01 264 / 0.28)` | `oklch(0.05 0.005 270 / 0.6)` | |
| `--border` | `border-border` | Default 1px line | `oklch(0.917 0.004 264)` | `oklch(0.262 0.006 270)` | |
| `--border-strong` | `border-border-strong` | Inputs, emphasis, dividers | `oklch(0.862 0.006 264)` | `oklch(0.33 0.008 270)` | |
| `--grid-line` | `bg-grid`, `bg-dots` | Textures only | `oklch(0.2 0.02 264 / 0.055)` | `oklch(1 0 0 / 0.045)` | |
| `--fg` | `text-fg` | Body text, headings | `oklch(0.185 0.012 268)` | `oklch(0.965 0.003 270)` | 11.7 (≥ 7) |
| `--fg-muted` | `text-fg-muted` | Secondary text, labels | `oklch(0.44 0.012 266)` | `oklch(0.73 0.01 270)` | 7.0 (≥ 7) |
| `--fg-subtle` | `text-fg-subtle` | Hints, placeholders, meta | `oklch(0.54 0.01 266)` | `oklch(0.63 0.01 270)` | 4.5 (≥ 4.5) |
| `--ink` | `bg-ink` | Primary button fill | `oklch(0.205 0.013 268)` | `oklch(0.965 0.003 270)` | |
| `--ink-hover` | `hover:bg-ink-hover` | Primary button hover | `oklch(0.29 0.014 268)` | `oklch(0.88 0.004 270)` | |
| `--on-ink` | `text-on-ink` | Text on ink | `oklch(0.99 0.002 264)` | `oklch(0.17 0.006 270)` | 13.7 on ink |
| `--accent` | `bg-accent`, `ring-accent` | Accent button, focus ring, selection | `oklch(0.53 0.215 283)` | `oklch(0.7 0.165 285)` | 3.8 (≥ 3, focus) |
| `--accent-hover` | `hover:bg-accent-hover` | Accent hover | `oklch(0.48 0.215 283)` | `oklch(0.76 0.15 285)` | |
| `--accent-fg` | `text-accent-fg` | Links, accent text | `oklch(0.47 0.2 283)` | `oklch(0.78 0.13 285)` | 4.9 (≥ 4.5) |
| `--accent-soft` | `bg-accent-soft` | Selected row, tint fill, field focus halo | `oklch(0.53 0.215 283 / 0.09)` | `oklch(0.7 0.165 285 / 0.13)` | |
| `--accent-line` | `border-accent-line` | Tint border | `oklch(0.53 0.215 283 / 0.28)` | `oklch(0.7 0.165 285 / 0.35)` | |
| `--on-accent` | `text-on-accent` | Text on accent | `oklch(0.99 0.004 283)` | `oklch(0.16 0.02 285)` | 5.6 on accent |
| `--accent-2` | `to-accent-2` | Gradient partner only | `oklch(0.62 0.19 318)` | `oklch(0.76 0.14 325)` | |
| `--success` | `text-success`, `bg-success` | Status | `oklch(0.53 0.13 155)` | `oklch(0.72 0.14 155)` | 3.2 (≥ 3) |
| `--warning` | `text-warning`, `bg-warning` | Status | `oklch(0.64 0.14 72)` | `oklch(0.8 0.13 78)` | 3.1 (≥ 3) |
| `--danger` | `text-danger`, `bg-danger` | Status, destructive | `oklch(0.54 0.2 25)` | `oklch(0.7 0.17 25)` | 3.7 (≥ 3) |
| `--info` | `text-info`, `bg-info` | Status | `oklch(0.55 0.13 240)` | `oklch(0.72 0.12 240)` | 3.1 (≥ 3) |

Status colours meet 3:1 (icons, dots, badges, large text). For small status text, pair the icon in the status colour with `text-fg` words.
shadcn names (`bg-background`, `text-muted-foreground`, `bg-primary`, `bg-card`, `bg-popover`, `ring-ring`, `--chart-1..5`) are aliases of the tokens above, so shadcn code works unchanged.

## User preferences

All in `minidev.css`, no component work needed:

- `prefers-reduced-motion`: animations and transitions are instant; the light stops drifting.
- `prefers-reduced-transparency`: glass turns solid (tinted, no blur).
- `prefers-contrast: more`: `fg-subtle` becomes `fg-muted`, `border` becomes `border-strong`.
- `forced-colors`: focus draws a system `Highlight` outline; slider ranges, progress fills, switch and slider thumbs and radio dots stay visible. Keep the slot names (`slider-range`, `progress-indicator`, `*-thumb`, `radio-group-dot`) on those parts.
- Print: every look prints as light hairline ink on white, without materials or shadows.

## Depth

| Token | Use |
|---|---|
| `shadow-highlight` | Inner 1px top light on raised things |
| `shadow-xs` / `shadow-sm` | Inputs, small controls |
| `shadow-raised` | Cards and panels (highlight + contact) |
| `shadow-key` | Outline buttons, keycaps: highlight + 1px bottom key edge |
| `shadow-ink` | Solid buttons: top light, bottom edge, contact |
| `shadow-md` / `shadow-lg` | Floating non-modal elements |
| `shadow-overlay` | Menus, popovers, dialogs, toasts |
| `shadow-glow` | Rare brand moments |

Each theme tunes its own shadow strength (`--sh-*`).

## Geometry

- Spacing on a 4px base.
- Radius: controls `rounded-lg` (8px), cards `rounded-xl` (12px), overlays `rounded-2xl` (14px). Radii are CSS variables, so a scope can retheme them.
- Nested radius = outer − padding, floor 4px.
- Controls: 28 (xs), 32 (sm), 36 (default), 44 (lg), 48 (xl). Tap targets ≥ 44px via hit areas.

## Type

Every size ships with its tracking and line height (`text-xs` … `text-8xl`). Tracking tightens as size grows: +0.01em at 12px, 0 at 14px, −0.03em at 48px, −0.048em at 96px. Numbers are `tabular-nums`. Headings `text-wrap: balance`, paragraphs `pretty`.

## Motion

- 70ms colour, 140ms transform/shadow, 200ms enter, 160ms exit. Exit is faster than entry.
- `ease-hairline` (0.2, 0, 0, 1) for entering, `ease-exit` (0.3, 0, 0.8, 0.15) for leaving, `ease-spring` for thumbs and dots.
- Never `transition: all`. Hover changes one property. Press sinks 0.5px, never scales.
- Zero layout shift between states. Everything respects `prefers-reduced-motion`.

## States

Rest, hover, active, focus-visible, disabled, loading, selected, invalid, read-only and empty are all designed, in both themes.
Focus: buttons get a 2px accent ring with 2px offset; fields get the accent border plus a 3px `accent-soft` halo.

## Registry

`npm run registry` (runs automatically before `dev` and `build`) generates from `src/registry/**`:
`public/r/*.json` (shadcn items), `public/r/registry.json`, `src/lib/component-index.ts`, `src/lib/registry-loaders.ts`, `public/llms.txt`, `public/llms-full.txt`.
Add a file to `src/registry/ui`, run the script, and it appears in docs, search, the registry and llms.txt.
