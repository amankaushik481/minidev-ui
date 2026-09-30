import type { Guide } from "../types"

const guide: Guide = {
  slug: "glassmorphism-tailwind-css",
  title: "Glassmorphism in Tailwind CSS v4: frosted glass that stays readable",
  description:
    "Build frosted glass in Tailwind CSS v4 with backdrop-blur and translucent fills, keep text readable, control the cost of backdrop-filter and add fallbacks.",
  date: "2026-09-30",
  keywords: ["glassmorphism tailwind", "frosted glass css", "backdrop-filter blur tailwind", "tailwind v4 glass effect", "backdrop blur not working"],
  related: ["light-provider", "popover", "dialog", "dropdown-menu"],
  body: [
    {
      type: "p",
      text: "Glassmorphism in Tailwind CSS v4 is a translucent fill plus a backdrop blur: `bg-white/50 backdrop-blur-xl`. It only looks like frosted glass when there is color behind the panel, and it only stays readable when the fill is opaque enough and the blur strong enough that nothing behind the text can be made out. This guide covers the CSS, the readability rules, what `backdrop-filter` costs, fallbacks, and how MiniDev UI ships glass as a theme.",
    },

    { type: "h2", text: "The four parts of a glass surface", id: "four-parts" },
    {
      type: "list",
      ordered: true,
      items: [
        "**A backdrop with color and shape.** Blur has nothing to work on over a flat gray page. Soft gradients or a photo behind the panel are what make it read as glass.",
        "**A translucent fill.** White at 40 to 70 percent in light mode, a dark tint at 40 to 60 percent in dark mode.",
        "**A backdrop filter.** `blur()` frosts what is behind; `saturate()` above 1 restores the color that blurring washes out.",
        "**An edge.** A light 1px border and an inset top highlight separate the pane from the backdrop, the way light catches the rim of real glass.",
      ],
    },
    {
      type: "p",
      text: "In plain CSS, with values taken from MiniDev's glass theme:",
    },
    {
      type: "code",
      lang: "css",
      code: `.backdrop {
  background:
    radial-gradient(60vw 50vh at 12% 8%, oklch(0.82 0.13 300), transparent 70%),
    radial-gradient(55vw 55vh at 92% 18%, oklch(0.85 0.11 220), transparent 70%),
    radial-gradient(60vw 60vh at 70% 88%, oklch(0.87 0.11 350), transparent 70%),
    oklch(0.94 0.025 283);
}

.glass {
  background-color: oklch(1 0 0 / 0.5);
  -webkit-backdrop-filter: blur(22px) saturate(1.8);
  backdrop-filter: blur(22px) saturate(1.8);
  border: 1px solid oklch(1 0 0 / 0.62);
  box-shadow:
    inset 0 1px 0 0 oklch(1 0 0 / 0.95),
    0 12px 32px -8px oklch(0.3 0.12 283 / 0.22);
}`,
    },
    { type: "h3", text: "The same panel in Tailwind classes" },
    {
      type: "code",
      lang: "tsx",
      code: `<div className="rounded-2xl border border-white/60 bg-white/50 p-6 backdrop-blur-[22px] backdrop-saturate-[1.8] shadow-[inset_0_1px_0_0_oklch(1_0_0/0.95),0_12px_32px_-8px_oklch(0.3_0.12_283/0.22)]">
  <h2 className="text-lg font-medium text-slate-950">Usage this month</h2>
  <p className="mt-1 text-sm text-slate-700">2,184 of 5,000 requests</p>
</div>`,
    },
    {
      type: "p",
      text: "The v4 blur scale is `backdrop-blur-xs` (4px), `sm` (8px), `md` (12px), `lg` (16px), `xl` (24px), `2xl` (40px) and `3xl` (64px), and Tailwind emits both the prefixed and unprefixed property for you. For glass that holds text, stay between `lg` and `xl`.",
    },

    { type: "h2", text: "Readability rules", id: "readability" },
    {
      type: "p",
      text: "Contrast on glass is not one number. The color under the text is the fill mixed with whatever passes behind it, so you have to design for the worst case: the lightest and the busiest thing that can scroll under the panel.",
    },
    {
      type: "list",
      items: [
        "**Fill at 50 percent or more for text.** MiniDev's light glass uses `oklch(1 0 0 / 0.5)` for surfaces and `/ 0.66` for menus and dialogs, which carry denser text. Below about 40 percent, backdrop color dominates and contrast swings as you scroll.",
        "**Blur until shapes disappear.** At 4 to 8px, text behind the panel is still legible and reads as a double image under your own text. From 16px up, it turns into color fields.",
        "**Push text contrast further than on solid surfaces.** MiniDev darkens body text to lightness 0.17 and muted text to 0.38 in glass, against 0.185 and 0.45 in the solid theme. Muted text is where glass usually fails.",
        "**Saturate rather than darken.** `saturate(1.8)` keeps the backdrop vivid after blurring, so you do not need a heavy tint to make the pane visible.",
        "**Keep the edge.** Without a border and highlight, a translucent panel on a similar backdrop has no visible boundary.",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: "To check contrast, put the brightest content you expect behind the panel, sample the composited color under the text with the devtools color picker, and run the ratio against your text color. Aim for 4.5:1 for body text and 3:1 for icons and large headings.",
    },
    { type: "h3", text: "Glass in dark mode" },
    {
      type: "p",
      text: "Dark glass is not light glass with the colors inverted. A white border at 60 percent glows on a dark page, so MiniDev drops borders to 10 percent white and the top highlight to 22 percent. The fill becomes a dark violet tint, `oklch(0.24 0.025 283 / 0.42)` for surfaces and `/ 0.6` for overlays, and text moves up to lightness 0.98 for body and 0.8 for muted copy. The backdrop gradients darken too, to around lightness 0.3 to 0.36, because a bright backdrop behind a dark pane shows through as gray haze rather than color. Check contrast in both themes separately; a pane that passes in light mode tells you nothing about dark.",
    },
    { type: "h3", text: "Respect user settings" },
    {
      type: "p",
      text: "Some users turn transparency off at the OS level, and some need more contrast. Give both a near solid panel. `prefers-contrast` is supported everywhere; `prefers-reduced-transparency` is not yet, so it simply does nothing where unsupported.",
    },
    {
      type: "code",
      lang: "css",
      code: `@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
  .glass {
    background-color: oklch(1 0 0 / 0.94);
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
}`,
    },
    {
      type: "p",
      text: "In Tailwind, the contrast half is a variant: `contrast-more:bg-white/95 contrast-more:backdrop-filter-none`.",
    },

    { type: "h2", text: "What backdrop-filter costs", id: "performance" },
    {
      type: "p",
      text: "For every glass element, the browser renders what is behind it into a separate buffer, blurs that buffer, and composites the result. The cost grows with the element's area and the blur radius, and it is paid again whenever the content behind changes. A sticky glass header over a scrolling page re-blurs on every scroll frame.",
    },
    {
      type: "list",
      items: [
        "Use glass on bounded surfaces: nav bars, cards, menus, dialogs. A full screen glass layer is the most expensive case.",
        "Do not animate the blur radius. Fade the opacity of an already blurred layer instead.",
        "Avoid stacking many glass layers on top of each other. Each one samples the layers below.",
        "Test on a mid range Android phone, not only on a laptop. That is where dropped frames show up first.",
      ],
    },
    { type: "h3", text: "Two layout side effects" },
    {
      type: "p",
      text: "A `backdrop-filter` other than `none` makes the element a containing block for `position: fixed` and `absolute` descendants. A fixed dropdown inside a glass header is positioned relative to the header and clipped by its overflow. Render overlays in a portal, as MiniDev's [popover](/docs/popover), [dialog](/docs/dialog) and [dropdown menu](/docs/dropdown-menu) do.",
    },
    {
      type: "p",
      text: "The element also becomes a backdrop root. A glass element nested inside another glass element only blurs the parent's content, not the page behind both. Nested panes therefore look flatter than you expect; give the inner one a higher fill instead of a second blur.",
    },

    { type: "h2", text: "Fallbacks", id: "fallbacks" },
    {
      type: "p",
      text: "Every current engine supports `backdrop-filter`. Safari before version 18 needs the `-webkit-` prefix, which Tailwind adds. For older browsers, make the solid version the default and switch to translucent only when the filter is available, so text never ends up on an unblurred, half transparent panel.",
    },
    {
      type: "code",
      lang: "css",
      code: `.glass {
  background-color: oklch(1 0 0 / 0.9);
}

@supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
  .glass {
    background-color: oklch(1 0 0 / 0.5);
    -webkit-backdrop-filter: blur(22px) saturate(1.8);
    backdrop-filter: blur(22px) saturate(1.8);
  }
}`,
    },
    {
      type: "code",
      lang: "tsx",
      code: `<nav className="bg-white/90 supports-[backdrop-filter]:bg-white/50 backdrop-blur-xl backdrop-saturate-150">
  ...
</nav>`,
    },

    { type: "h2", text: "How MiniDev's data-material=\"glass\" works", id: "minidev-glass" },
    {
      type: "p",
      text: "MiniDev UI treats glass as a material, not a component variant. Put `data-material=\"glass\"` on `<html>` or on any element and everything inside turns to glass, because components only use semantic tokens like `bg-surface`, `bg-raised` and `shadow-raised`. The material redefines those tokens (excerpt from `minidev.css`):",
    },
    {
      type: "code",
      lang: "css",
      filename: "minidev.css",
      code: `[data-material="glass"] {
  --surface: oklch(1 0 0 / 0.5);
  --raised: oklch(1 0 0 / 0.66);
  --border: oklch(1 0 0 / 0.62);
  --fg: oklch(0.17 0.02 283);
  --fg-muted: oklch(0.38 0.025 283);
  --highlight: oklch(1 0 0 / 0.95);
  --mat-sheen: radial-gradient(520px circle at var(--lx) var(--ly), oklch(1 0 0 / 0.55), oklch(1 0 0 / 0) 70%);
  --mat-surface-bg: var(--mat-sheen);
  --mat-surface-attach: fixed;
  --mat-blur: blur(22px) saturate(1.8);
}

:is(.dark[data-material="glass"], .dark [data-material="glass"]) {
  --surface: oklch(0.24 0.025 283 / 0.42);
  --raised: oklch(0.27 0.03 283 / 0.6);
  --border: oklch(1 0 0 / 0.1);
  --fg: oklch(0.98 0.005 283);
  --fg-muted: oklch(0.8 0.02 283);
}`,
    },
    {
      type: "p",
      text: "One shared rule reads the `--mat-*` hooks. In the default hairline material they are `none`, so the rule does nothing until a material sets them:",
    },
    {
      type: "code",
      lang: "css",
      filename: "minidev.css",
      code: `:is(.bg-surface, .bg-raised):not([class*="bg-["], [class*="bg-linear"], [class*="backdrop-"] /* ... */) {
  background-image: var(--mat-surface-bg);
  background-attachment: var(--mat-surface-attach);
  -webkit-backdrop-filter: var(--mat-blur);
  backdrop-filter: var(--mat-blur);
}`,
    },
    {
      type: "list",
      items: [
        "**Opt outs are automatic.** The `:not()` list skips elements that set their own background image or backdrop classes, so custom panels keep what you gave them.",
        "**The sheen follows the light.** `--lx` and `--ly` are the light position in viewport pixels, written by [LightProvider](/docs/light-provider). The gradient is attached as `fixed` so its coordinates line up with the viewport, and every glass surface shows the highlight in the same place, as one light would.",
        "**Shadows move with it too.** Glass redefines the `--sh-*` shadow tokens with offsets derived from the light direction. See [realistic CSS shadows that follow a light source](/guides/css-shadows-light-source).",
        "**The page provides the color.** `html[data-material=\"glass\"]` paints the gradient backdrop shown earlier, plus a soft glow at the light position.",
      ],
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/layout.tsx",
      code: `import { LightProvider } from "@/components/ui/light-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-material="glass">
      <body>
        <LightProvider />
        {children}
      </body>
    </html>
  )
}`,
    },
    {
      type: "callout",
      tone: "note",
      text: "Popovers, menus and dialogs render in a portal at the end of `<body>`. If you scope glass to a subtree, overlays opened from it render outside that subtree and stay hairline. Put the attribute on `<html>` when overlays should match.",
    },

    { type: "h2", text: "Components to start with", id: "components" },
    {
      type: "p",
      text: "Install the light source and an overlay that uses `bg-raised`, then switch the material on `<html>`. The same files render as hairline, glass, metal or paper. `MaterialSwitcher`, exported from the same file as `LightProvider`, lets users pick.",
    },
    { type: "component", name: "light-provider" },
    { type: "component", name: "popover" },
    { type: "component", name: "dialog" },
    {
      type: "code",
      lang: "bash",
      code: `npx shadcn@latest add https://ui.minidev.pro/r/light-provider.json
npx shadcn@latest add https://ui.minidev.pro/r/popover.json`,
    },
  ],
  faq: [
    {
      q: "How do I make a frosted glass effect in Tailwind CSS?",
      a: "Combine a translucent background with a backdrop blur, for example `bg-white/50 backdrop-blur-xl backdrop-saturate-150`, add a light border, and place it over a colorful background. The blur needs something behind it to work on.",
    },
    {
      q: "Why is backdrop-blur not working?",
      a: "Usually the element's own background is opaque, or there is nothing but a flat color behind it. Also check that no ancestor already has a backdrop filter, since nested glass only blurs the parent's content.",
    },
    {
      q: "Is backdrop-filter bad for performance?",
      a: "It costs more than a plain background because the browser blurs the content behind the element and redoes it when that content changes. Keep glass areas small, avoid animating the blur, and test on low end phones.",
    },
    {
      q: "Is glassmorphism accessible?",
      a: "It can be if the fill is at least half opaque, the blur hides detail behind the panel, and text contrast holds against the brightest possible backdrop. Offer a solid fallback for `prefers-contrast: more` and reduced transparency.",
    },
  ],
}

export default guide
