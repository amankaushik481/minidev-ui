import type { Guide } from "../types"

const guide: Guide = {
  slug: "oklch-colors-tailwind-v4",
  title: "OKLCH colors in Tailwind CSS v4: a theme that works in light and dark",
  description:
    "Build a Tailwind CSS v4 color theme in OKLCH: semantic tokens with @theme inline, dark mode by redefining variables, and contrast checks you can run in code.",
  date: "2026-09-30",
  keywords: ["oklch tailwind", "tailwind v4 theme colors", "tailwind @theme inline", "tailwind v4 dark mode tokens", "oklch color palette"],
  related: ["theme-picker", "button", "badge"],
  body: [
    {
      type: "p",
      text: "In Tailwind CSS v4, define your colors as OKLCH values in CSS variables on `:root` and `.dark`, then expose them to utilities with `@theme inline { --color-surface: var(--surface); }`. Classes like `bg-surface` and `text-fg-muted` then switch automatically when the `.dark` class changes. OKLCH is what makes this easy to get right, because its lightness channel matches perceived lightness, so equal numbers look equally light across hues.",
    },

    { type: "h2", text: "Why OKLCH instead of hex or HSL", id: "why-oklch" },
    {
      type: "p",
      text: "HSL looks convenient, but its lightness is not what you see. `hsl(60 100% 50%)` (yellow) and `hsl(240 100% 50%)` (blue) share a lightness of 50%, yet their relative luminance is 0.93 and 0.07. Any system that relies on HSL lightness for contrast or hierarchy breaks the moment you change hue.",
    },
    {
      type: "p",
      text: "In OKLCH, lightness is perceptual. At `L 0.6` and `C 0.15`, the relative luminance of red, amber, green, blue and violet stays between 0.20 and 0.24. That is why a set of status colors defined at similar lightness and chroma has equal visual weight, and why swapping a brand hue does not wreck your contrast.",
    },
    {
      type: "list",
      items: [
        "**Predictable edits.** Lower `L` by 0.05 for a hover state and it looks 0.05 darker, whatever the hue.",
        "**Wide gamut.** OKLCH can describe Display P3 colors. On P3 screens they render fully; on sRGB screens the browser maps them into range.",
        "**It is Tailwind's native format.** The v4 default palette is defined in OKLCH, so your tokens sit next to `blue-500` without conversion.",
        "**Supported everywhere current.** `oklch()` works in Chrome and Edge 111+, Safari 15.4+ and Firefox 113+.",
      ],
    },

    { type: "h2", text: "Lightness, chroma and hue", id: "lightness-chroma-hue" },
    {
      type: "table",
      head: ["Channel", "Range", "What it controls"],
      rows: [
        ["L (lightness)", "0 to 1 (or 0% to 100%)", "Perceived lightness. 0 is black, 1 is white."],
        ["C (chroma)", "0 to about 0.37", "Colorfulness. 0 is gray. The usable maximum depends on L and H."],
        ["H (hue)", "0 to 360 degrees", "Roughly 25 red, 72 amber, 155 green, 240 blue, 283 violet."],
        ["alpha", "after a slash", "`oklch(0.53 0.215 283 / 0.09)` is the brand violet at 9% opacity."],
      ],
    },
    {
      type: "p",
      text: "Chroma is the channel that bites. Every hue has a different ceiling at each lightness, and past it the color leaves sRGB. MiniDev's violet holds `C 0.215` at `L 0.53` inside sRGB, while blue at the same lightness and chroma is already outside it. When you change hue, check the gamut and lower chroma if needed; tools like [oklch.com](https://oklch.com) show the boundary as you drag.",
    },
    {
      type: "p",
      text: "For neutrals, a small chroma with a fixed hue gives tinted grays. MiniDev's grays use chroma between 0.0015 and 0.014 at hue 264 to 270, which reads as a clean cool gray that sits well next to the violet accent.",
    },

    { type: "h2", text: "Semantic tokens with @theme inline", id: "semantic-tokens" },
    {
      type: "p",
      text: "Name tokens by role, not by color: `surface`, `fg-muted`, `accent`, `danger`. Components use only those names, and the theme decides what they look like. It takes three steps.",
    },
    { type: "h3", text: "1. Raw values on :root" },
    {
      type: "code",
      lang: "css",
      filename: "minidev.css (excerpt)",
      code: `:root,
[data-material="hairline"] {
  --bg: oklch(0.985 0.0015 264);
  --surface: oklch(1 0 0);
  --sunken: oklch(0.967 0.0025 264);
  --border: oklch(0.917 0.004 264);

  --fg: oklch(0.185 0.012 268);
  --fg-muted: oklch(0.45 0.012 266);
  --fg-subtle: oklch(0.54 0.01 266);

  --accent: oklch(0.53 0.215 283);
  --accent-hover: oklch(0.48 0.215 283);
  --accent-fg: oklch(0.47 0.2 283);
  --accent-soft: oklch(0.53 0.215 283 / 0.09);
  --on-accent: oklch(0.99 0.004 283);

  --success: oklch(0.53 0.13 155);
  --warning: oklch(0.64 0.14 72);
  --danger: oklch(0.54 0.2 25);
  --info: oklch(0.55 0.13 240);

  color-scheme: light;
}`,
    },
    { type: "h3", text: "2. Map them to Tailwind colors" },
    {
      type: "code",
      lang: "css",
      code: `@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-sunken: var(--sunken);
  --color-border: var(--border);
  --color-fg: var(--fg);
  --color-fg-muted: var(--fg-muted);
  --color-fg-subtle: var(--fg-subtle);
  --color-accent: var(--accent);
  --color-accent-fg: var(--accent-fg);
  --color-accent-soft: var(--accent-soft);
  --color-on-accent: var(--on-accent);
  --color-danger: var(--danger);
}`,
    },
    { type: "h3", text: "3. Use the names" },
    {
      type: "code",
      lang: "tsx",
      code: `<div className="rounded-xl border border-border bg-surface p-5">
  <p className="text-fg">Invoice #1042</p>
  <p className="text-sm text-fg-muted">Due in 3 days</p>
  <button className="mt-4 rounded-lg bg-accent px-3.5 py-2 text-on-accent hover:bg-accent-hover">
    Pay now
  </button>
</div>`,
    },
    { type: "h3", text: "Why inline matters" },
    {
      type: "p",
      text: "Without `inline`, Tailwind declares `--color-surface: var(--surface)` on `:root` and the utility reads `var(--color-surface)`. A custom property that contains `var()` is resolved where it is declared, so `--color-surface` is fixed to the root's `--surface` and inherited as that value. If a nested element redefines `--surface`, `bg-surface` inside it does not follow.",
    },
    {
      type: "p",
      text: "With `inline`, the utility gets the value directly: `.bg-surface { background-color: var(--surface) }`. It resolves on the element that uses it, so any scope can redefine the tokens. If you only ever toggle `.dark` on `<html>`, both forms work. MiniDev needs `inline` because its materials (`data-material=\"glass\"` and others) redefine tokens on arbitrary subtrees.",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Use plain `@theme` for literal values you want scopes to override. MiniDev defines radii that way, so `rounded-lg` compiles to `var(--radius-lg)` and a wrapper with `style=\"--radius-lg: 12px\"` rounds everything inside it. With `inline`, the utility would contain the literal `0.5rem` and ignore the override.",
    },

    { type: "h2", text: "Dark mode: redefine tokens, never components", id: "dark-mode" },
    {
      type: "p",
      text: "Dark mode is a second block of the same variables. No component carries `dark:` classes for color; they keep saying `bg-surface` and the values change underneath. MiniDev declares the class based variant and the dark tokens like this:",
    },
    {
      type: "code",
      lang: "css",
      filename: "minidev.css (excerpt)",
      code: `@custom-variant dark (&:is(.dark *));

.dark,
.dark [data-material="hairline"] {
  --bg: oklch(0.145 0.004 270);
  --surface: oklch(0.172 0.005 270);
  --raised: oklch(0.2 0.006 270);
  --sunken: oklch(0.125 0.004 270);
  --border: oklch(0.262 0.006 270);

  --fg: oklch(0.965 0.003 270);
  --fg-muted: oklch(0.73 0.01 270);
  --fg-subtle: oklch(0.63 0.01 270);

  --accent: oklch(0.7 0.165 285);
  --accent-fg: oklch(0.78 0.13 285);
  --on-accent: oklch(0.16 0.02 285);

  --success: oklch(0.72 0.14 155);
  --warning: oklch(0.8 0.13 78);
  --danger: oklch(0.7 0.17 25);
  --info: oklch(0.72 0.12 240);

  color-scheme: dark;
}`,
    },
    { type: "p", text: "The values follow a few rules that you can reuse for any palette:" },
    {
      type: "list",
      items: [
        "**Elevation raises lightness.** In light mode, raised surfaces are white on an off white page. In dark mode there is no white to reach for, so `bg` (0.145), `surface` (0.172) and `raised` (0.2) step up in lightness instead, and `sunken` goes below the page.",
        "**The accent gets lighter and calmer.** Violet moves from `L 0.53, C 0.215` to `L 0.7, C 0.165`. A saturated mid tone on near black vibrates and fails contrast; more lightness with less chroma reads as the same brand.",
        "**Status colors move up together.** They go from about 0.53 to 0.64 lightness in light mode to 0.7 to 0.8 in dark mode, so they keep equal weight against the new background.",
        "**Shadows change character.** Light mode uses tinted, low opacity shadows. Dark mode switches to black at higher opacity plus a faint white top highlight, because a tinted shadow is invisible on a dark page.",
        "**Set `color-scheme`.** It makes native scrollbars, form controls and the default canvas match each theme.",
      ],
    },
    {
      type: "p",
      text: "Note that `&:is(.dark *)` matches descendants of `.dark`, not the element carrying the class, so put the class on `<html>`. To apply it before first paint and avoid a flash, see [dark mode in Next.js without the flash](/guides/nextjs-dark-mode-no-flash).",
    },

    { type: "h2", text: "Check contrast with numbers", id: "contrast-checks" },
    {
      type: "p",
      text: "OKLCH lightness correlates with WCAG luminance but is not the same thing, so compute the ratio rather than eyeballing `L`. The function below converts OKLCH to linear sRGB and returns the WCAG 2 contrast ratio. It clamps to sRGB, which is what a standard display shows.",
    },
    {
      type: "code",
      lang: "ts",
      filename: "contrast.ts",
      code: `type Oklch = [l: number, c: number, h: number]

function luminance([l, c, h]: Oklch) {
  const a = c * Math.cos((h * Math.PI) / 180)
  const b = c * Math.sin((h * Math.PI) / 180)
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3
  const clamp = (x: number) => Math.min(1, Math.max(0, x))
  const r = clamp(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_)
  const g = clamp(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_)
  const bl = clamp(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_)
  return 0.2126 * r + 0.7152 * g + 0.0722 * bl
}

export function contrast(fg: Oklch, bg: Oklch) {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

contrast([0.45, 0.012, 266], [0.985, 0.0015, 264]) // 7.13, fg-muted on bg`,
    },
    { type: "p", text: "Running it over the MiniDev tokens gives:" },
    {
      type: "table",
      head: ["Pair", "Light", "Dark"],
      rows: [
        ["`fg-muted` on `bg`", "7.13", "8.27"],
        ["`fg-subtle` on `bg`", "4.85", "5.65"],
        ["`accent-fg` on `bg`", "7.12", "9.50"],
        ["`on-accent` on `accent`", "5.60", "6.94"],
        ["`warning` on `bg`", "3.31", "10.45"],
      ],
    },
    {
      type: "p",
      text: "Two useful rules of thumb fall out of this. On a near white page, low chroma text at `L 0.54` or below clears 4.5:1 and `L 0.45` or below clears 7:1. On a page at `L 0.145`, text at `L 0.63` or above clears 4.5:1. The light warning color, at 3.31:1, passes the 3:1 bar for icons and large text but not for small body text, so pair it with an `fg` label rather than using it as text.",
    },

    { type: "h2", text: "Tints and color-mix", id: "tints" },
    {
      type: "p",
      text: "Derived colors do not need their own palette steps. MiniDev's `accent-soft` is the accent at 9% alpha and `accent-line` at 28%, which stay correct on any surface because they are transparent. Tailwind's opacity modifier does the same on the fly: `bg-accent/15` compiles to a `color-mix()` with transparent. For mixes in stylesheets, name the space:",
    },
    {
      type: "code",
      lang: "css",
      code: `::selection {
  background: color-mix(in oklch, var(--accent) 22%, transparent);
}

/* Relative color syntax: a hover state 0.05 darker, same chroma and hue */
.btn:hover {
  background: oklch(from var(--accent) calc(l - 0.05) c h);
}`,
    },
    {
      type: "p",
      text: "Relative color syntax is supported in current Chrome, Safari and Firefox. MiniDev writes its hover values out explicitly (`--accent-hover` is the accent 0.05 darker) so the tokens also work in older browsers and read clearly in devtools.",
    },

    { type: "h2", text: "Retheme MiniDev with one hue", id: "retheme" },
    {
      type: "p",
      text: "Because components only use tokens, a new brand color is a short override after the import. This moves the accent to blue at hue 250. Chroma drops from 0.215 to 0.15 because blue at `L 0.53` cannot hold as much inside sRGB.",
    },
    {
      type: "code",
      lang: "css",
      filename: "app/globals.css",
      code: `@import "tailwindcss";
@import "minidev-ui-kit/styles.css";

:root {
  --accent: oklch(0.53 0.15 250);
  --accent-hover: oklch(0.48 0.13 250);
  --accent-fg: oklch(0.45 0.12 250);
  --accent-soft: oklch(0.53 0.15 250 / 0.09);
  --accent-line: oklch(0.53 0.15 250 / 0.28);
  --on-accent: oklch(0.99 0.004 250);
  --sh-glow: 0 0 0 1px var(--accent-line), 0 10px 36px -10px oklch(0.53 0.15 250 / 0.55);
}

.dark {
  --accent: oklch(0.72 0.14 250);
  --accent-hover: oklch(0.78 0.12 250);
  --accent-fg: oklch(0.78 0.11 250);
  --accent-soft: oklch(0.72 0.14 250 / 0.13);
  --accent-line: oklch(0.72 0.14 250 / 0.35);
  --on-accent: oklch(0.16 0.02 250);
  --sh-glow: 0 0 0 1px var(--accent-line), 0 10px 36px -10px oklch(0.72 0.14 250 / 0.5);
}`,
    },
    {
      type: "p",
      text: "The new pairs check out: `accent-fg` at 7.13:1 on the light page, `on-accent` on `accent` at 5.14:1 in light and 7.86:1 in dark. `--sh-glow` is included because it holds a literal violet, not a reference to `--accent`.",
    },

    { type: "h2", text: "Components to start with", id: "components" },
    {
      type: "p",
      text: "Every MiniDev component is written against these tokens, so any of them shows the theme at work. [ThemePicker](/docs/theme-picker) toggles the `.dark` class, and [Button](/docs/button) and [Badge](/docs/badge) show the accent tints (`accent-soft`, `accent-line`, `accent-fg`) and `danger` in both modes.",
    },
    { type: "component", name: "theme-picker" },
    { type: "component", name: "button" },
    { type: "component", name: "badge" },
    {
      type: "code",
      lang: "bash",
      code: `npx shadcn@latest add https://ui.minidev.pro/r/theme-picker.json
npx shadcn@latest add https://ui.minidev.pro/r/button.json`,
    },
  ],
  faq: [
    {
      q: "Does Tailwind CSS v4 use OKLCH?",
      a: "Yes. The v4 default color palette is defined in OKLCH, and any OKLCH value works in `@theme` and in arbitrary values like `bg-[oklch(0.6_0.15_250)]`.",
    },
    {
      q: "What does @theme inline do in Tailwind v4?",
      a: "It makes utilities use the variable's value directly instead of referencing the theme variable. That matters when your theme values point at other CSS variables that you redefine in nested scopes or in dark mode.",
    },
    {
      q: "How do I set up dark mode with CSS variables in Tailwind v4?",
      a: "Declare `@custom-variant dark (&:is(.dark *));`, define your tokens on `:root`, redefine the same variables in a `.dark` block, and map them with `@theme inline`. Toggle the `dark` class on `<html>`.",
    },
    {
      q: "How do I convert hex colors to OKLCH?",
      a: "Paste them into a converter such as oklch.com, or let the browser do it with `oklch(from #7c3aed l c h)`. Then round the values and check contrast, since a converted palette keeps the old palette's uneven lightness.",
    },
  ],
}

export default guide
