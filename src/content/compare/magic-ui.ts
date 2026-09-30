import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-magic-ui",
  other: "Magic UI",
  otherUrl: "https://magicui.design",
  title: "MiniDev UI vs Magic UI: which should you use?",
  description:
    "MiniDev UI vs Magic UI: two free, open source shadcn registries. Magic UI focuses on animated effects; MiniDev UI on product screens and a theming system.",
  checked: "2026-09-30",
  summary:
    "Magic UI is a free, open source library of animated components and effects for design engineers, installable with the shadcn CLI, with a paid Magic UI Pro for templates and sections. MiniDev UI is also free and MIT, and covers the product side in depth (tables, billing, settings, dashboards, AI chat) plus a set of motion components and full pages under one token system. Pick Magic UI for polished animated details on a marketing site. Pick MiniDev UI for application screens and a consistent look across site and app. They combine well.",
  rows: [
    { feature: "Price", minidev: "Free, everything", other: "Free open source components; paid Magic UI Pro for templates and sections" },
    { feature: "License", minidev: "MIT", other: "Open source (see LICENSE.md in the repo); Pro has its own terms" },
    {
      feature: "Scope",
      minidev: "Over 500 items: roughly 375 UI components, 86 motion components, 43 blocks and pages",
      other: "150+ free animated components and effects: text animations, backgrounds, marquees, device mockups, buttons and more",
    },
    {
      feature: "Blocks",
      minidev: "App and marketing pages: billing, settings, sign in, analytics, chat, pricing, heroes",
      other: "50+ blocks and templates for landing pages in Magic UI Pro (paid)",
    },
    {
      feature: "Templates",
      minidev: "8 landing page templates shown as live demos, with brand kits (not downloadable as whole apps)",
      other: "Landing page and site templates, offered through Magic UI Pro",
    },
    { feature: "Primitives", minidev: "Base UI (@base-ui/react)", other: "Designed to sit next to shadcn/ui, which supplies the primitives" },
    { feature: "Animation", minidev: "motion (the Framer Motion successor)", other: "motion (Framer Motion) and CSS animations" },
    { feature: "Tailwind version", minidev: "Tailwind CSS v4", other: "Tailwind CSS; follows the shadcn/ui setup, check docs for version notes" },
    {
      feature: "Install",
      minidev: "`npx shadcn@latest add https://ui.minidev.pro/r/<name>.json`, or npm `minidev-ui-kit`",
      other: "shadcn CLI, or copy and paste",
    },
    {
      feature: "Theming",
      minidev: "Semantic OKLCH tokens, materials (hairline, glass, metal, paper), one light source for shadows",
      other: "Uses the shadcn/ui CSS variables plus per-component props for colors and timing",
    },
    { feature: "Dark mode", minidev: "Yes, from the same token set", other: "Yes, through the shadcn/ui theme" },
    { feature: "AI tooling", minidev: "`llms.txt` and `llms-full.txt`; shadcn MCP compatible", other: "Official Magic UI MCP server for AI editors" },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Magic UI](https://magicui.design) describes itself as a UI library for design engineers: animated components and effects you copy and paste into your app, free and open source. It is built with React, TypeScript, Tailwind CSS and motion, and it is designed as a companion to shadcn/ui, so you install pieces with the shadcn CLI. A separate paid product, [Magic UI Pro](https://pro.magicui.design), sells ready made sections and templates.",
    },
    {
      type: "p",
      text: "MiniDev UI is a free, MIT licensed shadcn-compatible registry of over 500 items built on Base UI, Tailwind CSS v4 and motion. Its focus is the product: data tables, billing and invoice screens, settings layouts, command palettes, notification centers and AI chat surfaces, along with full-page blocks and about 86 motion components. All of it draws from one set of semantic tokens.",
    },
    { type: "h2", text: "Where Magic UI shines", id: "where-magic-ui-shines" },
    {
      type: "list",
      items: [
        "**Small, delightful details.** Animated text, number tickers, marquees, borders and backgrounds that add polish without taking over the page.",
        "**Easy to adopt.** It follows the shadcn/ui conventions closely, so it slots into an existing shadcn project with little friction.",
        "**AI editor support.** An official MCP server lets tools like Cursor and Claude search and install Magic UI components directly.",
        "**Large community.** It is widely used alongside shadcn/ui, so examples and answers are easy to find.",
      ],
    },
    { type: "h2", text: "Where MiniDev UI shines", id: "where-minidev-ui-shines" },
    {
      type: "list",
      items: [
        "**Application screens.** Tables, forms, overlays, charts, billing, auth, settings and AI chat, built on accessible Base UI primitives.",
        "**No paid tier.** Blocks, motion pieces and full pages are all MIT.",
        "**A visual system.** One light source drives shadows across the page, and a `data-material` attribute switches between hairline, glass, metal and paper.",
        "**Full pages.** About 43 blocks, from a sign in page to an admin console, so you start with a working screen.",
      ],
    },
    { type: "component", name: "data-table" },
    { type: "h2", text: "Using them together", id: "using-them-together" },
    {
      type: "p",
      text: "Both are shadcn registries and both use motion, so they fit in one project without a second animation runtime. A useful split is MiniDev UI for the app shell, forms and data, and Magic UI for a few animated details on the marketing pages, such as a text effect in the hero or a logo marquee.",
    },
    {
      type: "p",
      text: "Magic UI components read the standard shadcn/ui variables. The MiniDev stylesheet maps those names (`--background`, `--foreground`, `--primary`, `--muted` and others) to MiniDev tokens, so Magic UI pieces generally pick up your MiniDev theme and dark mode. One name differs in meaning: MiniDev's `accent` is the brand violet, where shadcn/ui treats `accent` as a subtle fill, so review any component that uses it.",
    },
    { type: "h2", text: "Install notes", id: "install-notes" },
    { type: "code", lang: "bash", code: "npx shadcn@latest add https://ui.minidev.pro/r/settings-page.json" },
    {
      type: "p",
      text: "After adding MiniDev items, import the tokens after Tailwind in your global CSS with `@import \"minidev-ui-kit/styles.css\";`, or copy `styles.css` from any component's docs page. Magic UI components are added with the shadcn CLI as described in [their docs](https://magicui.design). Both libraries put the source in your repo, so you can edit anything after install.",
    },
    {
      type: "callout",
      tone: "note",
      text: "Magic UI Pro pricing can change. Check [pro.magicui.design](https://pro.magicui.design) for current plans.",
    },
    { type: "h2", text: "Which to pick", id: "which-to-pick" },
    {
      type: "list",
      items: [
        "**Choose Magic UI** if your project already runs on shadcn/ui and you want a few animated touches, such as a shimmering button, an animated headline or a logo marquee, with minimal setup.",
        "**Choose MiniDev UI** if you need application screens (tables, billing, settings, chat) and page blocks that share one visual system, with no paid tier to consider.",
        "**Choose both** if you are building a product and its marketing site at the same time. They share the shadcn CLI and the motion dependency, so the cost of combining them is low.",
      ],
    },
  ],
  faq: [
    {
      q: "Is Magic UI free?",
      a: "Yes, the component library is free and open source. Magic UI Pro, a separate product with templates and sections, is paid. MiniDev UI has no paid tier.",
    },
    {
      q: "Do Magic UI and MiniDev UI use the same animation library?",
      a: "Both use motion, the successor to Framer Motion, so they can share one dependency in the same project.",
    },
    {
      q: "Which one should I use for a dashboard?",
      a: "MiniDev UI, since it includes data tables, charts, settings and dashboard blocks. Magic UI can add animated details, such as number tickers, on top.",
    },
    {
      q: "Can AI coding tools install both?",
      a: "Yes. Magic UI has an official MCP server. MiniDev UI publishes `llms.txt` and a shadcn registry that the shadcn MCP server and CLI can read.",
    },
  ],
  sources: [
    { label: "Magic UI home", url: "https://magicui.design/" },
    { label: "Magic UI on GitHub", url: "https://github.com/magicuidesign/magicui" },
    { label: "Magic UI license", url: "https://github.com/magicuidesign/magicui/blob/main/LICENSE.md" },
    { label: "Magic UI Pro", url: "https://pro.magicui.design/" },
    { label: "Magic UI MCP server", url: "https://github.com/magicuidesign/mcp" },
  ],
}

export default comparison
