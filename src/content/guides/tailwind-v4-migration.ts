import type { Guide } from "../types"

const guide: Guide = {
  slug: "tailwind-v4-migration",
  title: "Migrating a component library to Tailwind CSS v4",
  description:
    "Migrate a component library to Tailwind CSS v4: CSS-first config with @theme, the upgrade tool, renamed utilities, border and ring defaults, and OKLCH tokens.",
  date: "2026-09-30",
  keywords: [
    "tailwind v4 migration",
    "tailwind 4 upgrade guide",
    "tailwind config to css",
    "tailwind v4 theme inline",
    "tailwind v4 dark mode custom variant",
  ],
  related: ["button", "input", "theme-picker"],
  body: [
    {
      type: "p",
      text: "Migrating to Tailwind CSS v4 means moving your configuration from `tailwind.config.js` into CSS (`@import \"tailwindcss\"` plus an `@theme` block), running the official `npx @tailwindcss/upgrade` tool to rename utilities in your templates, and then checking the defaults that changed silently, mainly border and ring colors. For a component library, the extra work is exposing design tokens as CSS variables and telling consumers' builds where to find your class names. This guide walks through it with MiniDev UI's real stylesheet as the example.",
    },

    { type: "h2", text: "What changed in v4", id: "what-changed" },
    {
      type: "list",
      items: [
        "**Configuration lives in CSS.** Theme values are CSS variables declared in `@theme`; there is no JavaScript config by default.",
        "**One import.** `@import \"tailwindcss\";` replaces the three `@tailwind` directives.",
        "**Automatic content detection.** No `content` array. Tailwind scans your project and skips files ignored by `.gitignore`, which includes `node_modules`.",
        "**New build integrations.** `@tailwindcss/postcss`, `@tailwindcss/vite` and `@tailwindcss/cli` replace the old `tailwindcss` PostCSS plugin. Import handling and vendor prefixing are built in.",
        "**A rebuilt default palette** in [OKLCH](/glossary/oklch), and every theme value exposed as a CSS variable such as `var(--color-blue-500)`.",
        "**Modern browsers only:** Safari 16.4+, Chrome 111+ and Firefox 128+, because it relies on cascade layers, `@property` and `color-mix()`.",
      ],
    },

    { type: "h2", text: "Run the upgrade tool first", id: "upgrade-tool" },
    {
      type: "code",
      lang: "bash",
      code: "git switch -c tailwind-v4\nnpx @tailwindcss/upgrade",
    },
    {
      type: "p",
      text: "The tool needs Node.js 20 or later. It updates dependencies, converts your JavaScript config into CSS where it can, rewrites your stylesheet entry, and renames utilities across your templates. Run it on a clean branch and read the diff; it handles the mechanical part well, but it cannot know which of your custom CSS relied on an old default. For a library, run it on the library and on one consuming app separately.",
    },

    { type: "h2", text: "Install: PostCSS or Vite", id: "install" },
    {
      type: "code",
      lang: "ts",
      filename: "postcss.config.mjs",
      code: 'const config = {\n  plugins: {\n    "@tailwindcss/postcss": {},\n  },\n}\n\nexport default config',
    },
    {
      type: "p",
      text: "That is MiniDev UI's entire PostCSS config, used by Next.js. You can remove `autoprefixer` and `postcss-import`, which v4 handles itself. With Vite, skip PostCSS and use the dedicated plugin, which is faster:",
    },
    {
      type: "code",
      lang: "ts",
      filename: "vite.config.ts",
      code: 'import { defineConfig } from "vite"\nimport react from "@vitejs/plugin-react"\nimport tailwindcss from "@tailwindcss/vite"\n\nexport default defineConfig({\n  plugins: [react(), tailwindcss()],\n})',
    },

    { type: "h2", text: "From tailwind.config.js to CSS", id: "css-first-config" },
    {
      type: "p",
      text: "Here is a typical v3 library config with semantic colors, a radius, a shadow and a font:",
    },
    {
      type: "code",
      lang: "ts",
      filename: "tailwind.config.js (v3)",
      code: 'module.exports = {\n  darkMode: "class",\n  content: ["./src/**/*.{ts,tsx}"],\n  theme: {\n    extend: {\n      colors: {\n        surface: "var(--surface)",\n        fg: { DEFAULT: "var(--fg)", muted: "var(--fg-muted)" },\n      },\n      borderRadius: { xl: "0.75rem" },\n      boxShadow: { raised: "var(--sh-raised)" },\n      fontFamily: { sans: ["var(--font-geist-sans)"] },\n    },\n  },\n  plugins: [require("tailwindcss-animate")],\n}',
    },
    {
      type: "p",
      text: "In v4 each theme key becomes a variable in a namespace: `--color-*` makes `bg-*`, `text-*` and `border-*` utilities, `--radius-*` makes `rounded-*`, `--shadow-*` makes `shadow-*`, `--font-*` makes `font-*`, and `--text-*` makes font sizes. Here is the same theme, taken from MiniDev UI's `minidev.css`:",
    },
    {
      type: "code",
      lang: "css",
      filename: "src/styles/minidev.css (excerpt)",
      code: '@custom-variant dark (&:is(.dark *));\n\n:root {\n  --surface: oklch(1 0 0);\n  --fg: oklch(0.185 0.012 268);\n  --fg-muted: oklch(0.45 0.012 266);\n  --sh-raised: inset 0 1px 0 0 var(--highlight), 0 1px 2px 0 oklch(0.22 0.025 264 / 0.05);\n}\n.dark {\n  --surface: oklch(0.172 0.005 270);\n  --fg: oklch(0.965 0.003 270);\n  --fg-muted: oklch(0.73 0.01 270);\n}\n\n@theme inline {\n  --color-surface: var(--surface);\n  --color-fg: var(--fg);\n  --color-fg-muted: var(--fg-muted);\n  --shadow-raised: var(--sh-raised);\n  --font-sans: var(--font-geist-sans);\n  --text-sm: 0.8125rem;\n  --text-sm--line-height: 1.55;\n  --text-sm--letter-spacing: 0.005em;\n}\n\n@theme {\n  --radius-xl: 0.75rem;\n}',
    },
    {
      type: "p",
      text: "Font sizes can carry their own line height and letter spacing through the `--text-sm--line-height` and `--text-sm--letter-spacing` sub-variables, which MiniDev uses for every size from `text-2xs` to `text-8xl`. If you cannot migrate a JavaScript config yet, `@config \"./tailwind.config.js\";` loads it from CSS, and v3-style plugins load with `@plugin`. For animations, shadcn projects replace `tailwindcss-animate` with `tw-animate-css`, a plain CSS import.",
    },
    { type: "h3", text: "@theme or @theme inline" },
    {
      type: "p",
      text: "This is the distinction that trips up token-based libraries. With plain `@theme`, a utility references the theme variable: `rounded-xl` emits `border-radius: var(--radius-xl)`, and `--radius-xl` is defined on `:root`. With `@theme inline`, the utility gets the value itself: `bg-surface` emits `background-color: var(--surface)`.",
    },
    {
      type: "p",
      text: "Why it matters: a CSS variable that references another variable is resolved on the element where it is declared, and descendants inherit the resolved value. If `--color-surface: var(--surface)` were declared on `:root` without `inline`, a `.dark` subtree or a `[data-material]` scope that redefines `--surface` would not change `bg-surface`, because `--color-surface` was already resolved at the root. Inlining puts `var(--surface)` in the utility, so it resolves on each element, and scoped themes work. MiniDev inlines every color and shadow for this reason, and keeps radii in a plain `@theme` block so a scope can retheme them directly, for example `style=\"--radius-lg: 12px\"` on a container.",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Rule of thumb: if a theme variable points at another variable that changes per theme or per scope, use `@theme inline`. If it holds a literal value you may want to override on a subtree, use `@theme`.",
    },

    { type: "h2", text: "Dark mode with @custom-variant", id: "dark-mode" },
    {
      type: "p",
      text: "The `darkMode: \"class\"` setting becomes a custom variant in CSS. MiniDev UI uses `@custom-variant dark (&:is(.dark *));`, the form shadcn/ui ships, which matches elements inside an element with the `dark` class. Tailwind's documentation uses `(&:where(.dark, .dark *))`, which also matches the `.dark` element itself and adds no specificity. Either works when the class is on `html`. Because MiniDev's dark theme redefines tokens rather than adding `dark:` classes to components, most components never use the variant at all. The [dark mode guide](/guides/nextjs-dark-mode-no-flash) covers setting the class without a flash on first paint.",
    },

    { type: "h2", text: "Custom utilities with @utility", id: "custom-utilities" },
    {
      type: "p",
      text: "In v3, custom classes went in `@layer utilities`. In v4, declare them with `@utility` so they behave like built-in utilities: they sort correctly and work with variants such as `hover:` and `md:`.",
    },
    {
      type: "code",
      lang: "css",
      code: "/* v3 */\n@layer utilities {\n  .bg-grid { background-image: linear-gradient(...); }\n}\n\n/* v4, from minidev.css */\n@utility bg-grid {\n  background-image:\n    linear-gradient(to right, var(--grid-line) 1px, transparent 1px),\n    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);\n  background-size: var(--grid-size, 48px) var(--grid-size, 48px);\n}",
    },
    {
      type: "p",
      text: "Component classes that used to live in `@layer components` can also become `@utility` blocks, or stay as plain CSS. Keyframes that should produce `animate-*` utilities go inside `@theme` with a matching `--animate-*` variable; MiniDev keeps its keyframes at the top level and references them with arbitrary values such as `animate-[rise-in_260ms_var(--ease-hairline)_both]`.",
    },

    { type: "h2", text: "Renamed utilities", id: "renamed-utilities" },
    {
      type: "p",
      text: "Several scales gained an `xs` step, so the bare and `sm` names moved down one. The upgrade tool renames these for you; this table is for reviewing the diff and for code the tool cannot see, such as class names built in strings.",
    },
    {
      type: "table",
      head: ["v3", "v4"],
      rows: [
        ["`shadow-sm`", "`shadow-xs`"],
        ["`shadow`", "`shadow-sm`"],
        ["`rounded-sm`", "`rounded-xs`"],
        ["`rounded`", "`rounded-sm`"],
        ["`blur-sm`", "`blur-xs`"],
        ["`blur`", "`blur-sm`"],
        ["`drop-shadow-sm`", "`drop-shadow-xs`"],
        ["`backdrop-blur-sm`", "`backdrop-blur-xs`"],
        ["`outline-none`", "`outline-hidden`"],
        ["`ring`", "`ring-3`"],
        ["`bg-opacity-50`", "`bg-black/50` (opacity modifier)"],
        ["`flex-shrink-0`, `flex-grow`", "`shrink-0`, `grow`"],
        ["`bg-[--brand]`", "`bg-(--brand)`"],
        ["`!mt-0`", "`mt-0!`"],
      ],
    },
    {
      type: "p",
      text: "`outline-hidden` keeps the old behavior (a transparent outline that still shows in forced colors mode), while `outline-none` in v4 really sets `outline-style: none`. The shorthand for CSS variables in arbitrary values is now parentheses: `bg-(--brand)` instead of `bg-[--brand]`.",
    },

    { type: "h2", text: "Defaults that changed silently", id: "changed-defaults" },
    {
      type: "list",
      items: [
        "**Border color** defaults to `currentColor` instead of `gray-200`. Every bare `border` without a color class now matches the text color.",
        "**Ring** defaults to 1px and `currentColor`, not 3px blue. Use `ring-3` and an explicit color for the old look.",
        "**Placeholder text** uses the current text color at 50% opacity instead of `gray-400`.",
        "**Buttons** use `cursor: default`, matching the browser, instead of `pointer`.",
        "**Hover** styles apply only on devices that support hover (`@media (hover: hover)`), so taps on phones no longer leave sticky hover states.",
        "**Variants stack left to right.** v3's `first:*:pt-0` is `*:first:pt-0` in v4.",
        "**`space-y-*` and `divide-*`** use a different selector, which can change results when children are hidden or inline.",
      ],
    },
    {
      type: "callout",
      tone: "warning",
      text: "The border change is the one that surfaces in review as \"everything has dark outlines\". MiniDev's base layer restores a token default with `* { @apply border-border outline-ring/50; }`, so a bare `border` uses the theme's hairline color. Add an equivalent rule to your library's base styles.",
    },

    { type: "h2", text: "OKLCH colors and semantic tokens", id: "oklch" },
    {
      type: "p",
      text: "The default palette is now defined in OKLCH, which gives more even steps and wider-gamut color on capable displays. For a library, the palette matters less than the layer on top of it: [semantic tokens](/glossary/semantic-tokens) such as `surface`, `fg-muted` and `accent` that components use, and that dark mode and themes redefine. Opacity modifiers work on variable-based colors because v4 implements them with `color-mix()`, so `bg-accent/10` works even though `--accent` is a variable. The [OKLCH guide](/guides/oklch-colors-tailwind-v4) covers building a palette, and [design tokens](/glossary/design-tokens) explains the layering. To drop the default palette entirely and ship only your tokens, add `--color-*: initial;` at the top of your `@theme` block.",
    },

    { type: "h2", text: "Shipping the library to consumers", id: "library" },
    {
      type: "p",
      text: "Automatic detection skips `node_modules`, so a consuming app will not generate the classes your package uses unless it is told where to look. MiniDev UI's package ships its tokens as a stylesheet and documents one `@source` line:",
    },
    {
      type: "code",
      lang: "css",
      filename: "app/globals.css (consumer)",
      code: '@import "tailwindcss";\n@import "minidev-ui-kit/styles.css";\n@source "../node_modules/minidev-ui-kit";',
    },
    {
      type: "list",
      items: [
        "The `@source` path is relative to the stylesheet that contains it.",
        "Registry installs (`npx shadcn@latest add`) copy source into the app, so detection finds the classes without `@source`.",
        "Stylesheets processed separately, such as CSS modules or Vue and Svelte `<style>` blocks, need `@reference \"../app.css\";` before they can use `@apply` with your theme.",
        "Publish the token stylesheet at a stable URL too; MiniDev's is at [ui.minidev.pro/r/styles.css](https://ui.minidev.pro/r/styles.css).",
      ],
    },

    { type: "h2", text: "A migration checklist", id: "checklist" },
    {
      type: "list",
      ordered: true,
      items: [
        "Create a branch and run `npx @tailwindcss/upgrade`.",
        "Switch to `@tailwindcss/postcss` or `@tailwindcss/vite`; remove `autoprefixer` and `postcss-import`.",
        "Move tokens to `:root` and `.dark`, and map them in `@theme inline`.",
        "Replace `darkMode` with `@custom-variant dark`.",
        "Convert `@layer utilities` classes to `@utility`.",
        "Add a base rule for border and outline colors.",
        "Search for class names built in strings and rename them by hand.",
        "Check focus rings, borders, placeholders and hover states in both themes.",
        "Document the `@source` line for package consumers.",
      ],
    },

    { type: "h2", text: "Components built on v4", id: "components" },
    {
      type: "p",
      text: "Every MiniDev UI component is written for [Tailwind CSS v4](/glossary/tailwind-css-v4) with the token setup above, so installing one is also a working reference for the patterns in this guide. Start with the primitives in [buttons](/components/buttons) and [forms](/components/forms). The [MiniDev studio](https://minidev.pro) uses the same kit to build complete products.",
    },
    { type: "component", name: "button" },
    { type: "component", name: "input" },
    { type: "component", name: "theme-picker" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/button.json\nnpm i minidev-ui-kit",
    },
  ],
  faq: [
    {
      q: "Do I still need tailwind.config.js in Tailwind CSS v4?",
      a: "No. Configuration lives in CSS through `@theme`, `@custom-variant`, `@utility`, `@source` and `@plugin`. A JavaScript config still works if you load it with `@config`, which helps during a gradual migration.",
    },
    {
      q: "What is the difference between @theme and @theme inline?",
      a: "`@theme` makes utilities reference the theme variable; `@theme inline` puts the variable's value into the utility. Use `inline` when a theme variable points at another variable that changes per theme or scope, so the reference resolves on each element.",
    },
    {
      q: "Why do all my borders look dark after upgrading to Tailwind v4?",
      a: "The default border color changed from `gray-200` to `currentColor`. Add explicit border colors, or a base rule such as `* { @apply border-border; }` that sets a token default.",
    },
    {
      q: "How do I run the Tailwind v4 upgrade tool?",
      a: "Run `npx @tailwindcss/upgrade` in the project root on a clean branch, with Node.js 20 or later. Review the diff, then check class names built dynamically in strings, which the tool cannot rewrite.",
    },
    {
      q: "Why are my component library's classes missing in the consuming app?",
      a: "Tailwind v4 skips `node_modules` during automatic detection. Add `@source` with the path to the package in the app's main stylesheet.",
    },
  ],
}

export default guide
