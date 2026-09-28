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
