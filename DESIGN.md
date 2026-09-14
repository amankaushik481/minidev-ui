# MiniDev UI — DESIGN.md

Load-bearing spec. Every component derives from this and invents nothing.
Cursor must read this before any component work.

## Decisions

| Decision | Choice |
|---|---|
| Typeface (UI + headings) | **Geist Sans** (self-hosted via `geist` package — no Google Fonts CDN) |
| Typeface (data + code) | **Geist Mono** |
| Accent hue | **285** (violet) |
| Signature move | **Hairline** — structure via 1px lines and top highlights; zero blur shadows outside overlays |

**Not Inter.** Inter is the sound of every AI-generated dashboard.

## Color (Tailwind v4 `@theme`, OKLCH)

Semantic names only. No `blue-500` (or any palette step) in components.

```css
@theme {
  --color-bg:        oklch(0.985 0.002 250);
  --color-surface:   oklch(1    0     0);
  --color-raised:    oklch(1    0     0);
  --color-sunken:    oklch(0.965 0.003 250);
  --color-border:    oklch(0.905 0.004 250);
  --color-fg:        oklch(0.19  0.008 250);
  --color-fg-muted:  oklch(0.42  0.01  250);
  --color-fg-subtle: oklch(0.45  0.008 250);
  --color-accent:    oklch(0.48  0.17  285);
  --color-success:   oklch(0.52  0.12  150);
  --color-warning:   oklch(0.62  0.13  75);
  --color-danger:    oklch(0.55  0.19  25);
}
```

Dark mode redefines only these tokens.

Rules:
- Elevation changes **lightness**, not just shadow. In dark mode shadow alone does not read.
- Borders are the surface darkened, never a separate gray.
- Semantic colors share the same perceptual lightness so a row of badges reads as a set.
- Map shadcn CSS variables onto these semantic tokens — components still use semantic names only.

## Geometry

- Spacing: 4px base. Scale: `2 4 6 8 12 16 20 24 32 40 48 64 80 96`
- Radius: control **8px**, card **12px**, overlay **14px**
- **Nested radius = outer − padding**, floor **4px**. Concentric radii are the #1 amateur tell.
- Controls: **36px** default height, **32px** small, **44px** large. Any tap target **44px** minimum.

## Type scale with paired tracking (non-negotiable)

Tracking tightens as size grows. A size is never used without its tracking.

| Size | px | tracking |
|---|---|---|
| xs | 12 | +0.01em |
| sm | 13 | +0.005em |
| base | 14 | 0 |
| lg | 16 | −0.008em |
| xl | 18 | −0.014em |
| 2xl | 22 | −0.018em |
| 3xl | 28 | −0.022em |
| 4xl | 36 | −0.026em |
| 5xl | 48 | −0.030em |

- Body line-height **1.55**, headings **1.15**, display **1.05**
- Numbers always `tabular-nums`

## Depth (Hairline signature)

- Structure is drawn with **1px lines** and **top highlights**
- **Zero blur shadows outside overlays**
- Overlays may use two-layer shadows: contact (`0 1px 2px`) + ambient (`0 Npx 2Npx`), ambient 2–3× more transparent
- Shadow color is hue-tinted dark (hue ~250), never `rgba(0,0,0,x)`
- Raised surfaces get `inset 0 1px 0` highlight
- Flat at rest. Depth on overlay and interaction only

## Motion

- **70ms** color, **140ms** transform/opacity, **200ms** enter, **160ms** exit. Exit faster than enter.
- Enter `cubic-bezier(0.2,0,0,1)`, exit `cubic-bezier(0.3,0,0.8,0.15)`
- Never `transition: all`. Never `ease`. Never 300ms default.
- Hover changes one property. Press is `translateY(0.5px)`, never scale.
- **Zero layout shift on any state change.** Borders that appear on hover exist at rest as transparent.
- Everything respects `prefers-reduced-motion`.

## States (every interactive component ships all of these)

rest, hover, active, focus-visible, disabled, loading, selected, invalid, read-only, empty, and the dark variant of each.

Focus is a **2px** ring at **2px** offset in the accent, with an inner contrast ring so it survives on both grounds.

## Signature move — Hairline

If a cropped screenshot of MiniDev UI is indistinguishable from cropped shadcn, this failed.


## Free vs Premium

- **Free (`src/registry/ui`, `src/registry/blocks`)**: MIT product primitives. Hairline, tokens only.
- **Premium (`src/registry/premium`)**: Motion-forward launch/marketing blocks (heroes, pricing motion, glow CTAs). Same tokens. Marked `data-tier="premium"`. Soft-gated commercially; still compose from free primitives.
- Motion uses the `motion` package and must respect `prefers-reduced-motion` / `useReducedMotion()`.
