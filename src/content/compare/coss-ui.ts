import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-coss-ui",
  other: "coss ui (formerly Origin UI)",
  otherUrl: "https://coss.com/ui",
  title: "MiniDev UI vs coss ui (formerly Origin UI): which should you use?",
  description:
    "MiniDev UI vs coss ui, the Base UI library that Origin UI became part of. Compare scope, primitives, theming, install and where each one fits best.",
  checked: "2026-09-30",
  summary:
    "Origin UI, the popular collection of copy and paste Tailwind and React components, became part of coss.com, and its work continues in coss ui: a component library built on Base UI that serves as the design system of Cal.com, with ready made compositions called particles. MiniDev UI is also built on Base UI and installs through the shadcn CLI, and it is free and MIT. coss ui is a strong pick for clean, well considered form controls and app components backed by a company that uses them in production. MiniDev UI adds full product screens, page blocks, motion pieces and a material theming system.",
  rows: [
    { feature: "Price", minidev: "Free", other: "Free" },
    { feature: "License", minidev: "MIT", other: "The cosscom/coss repository is AGPL-3.0, with some packages under MIT; check the license of the files you use" },
    {
      feature: "Scope",
      minidev: "548 items: 397 UI components, 108 motion components, 43 blocks and pages",
      other: "Core UI components plus particles (ready made compositions); the classic Origin UI collection is still browsable at coss.com/origin",
    },
    {
      feature: "Blocks",
      minidev: "Full pages: billing, settings, sign in, analytics, inbox, chat, admin consoles, marketing sections",
      other: "Particles: small, focused compositions such as input variants and form patterns",
    },
    {
      feature: "Templates",
      minidev: "8 landing page templates shown as live demos, with brand kits (not downloadable as whole apps)",
      other: "No full-site templates listed at the time of writing",
    },
    { feature: "Primitives", minidev: "Base UI (@base-ui/react)", other: "Base UI" },
    { feature: "Animation", minidev: "motion (the Framer Motion successor) for motion pieces; CSS for core components", other: "Not a motion-focused library; check the docs for per-component transitions" },
    { feature: "Tailwind version", minidev: "Tailwind CSS v4", other: "Tailwind CSS v4, per its shadcn-style setup; check the docs" },
    {
      feature: "Install",
      minidev: "`npx shadcn@latest add @minidev/<name>`, or npm `minidev-ui-kit`",
      other: "shadcn CLI or copy and paste, per its docs",
    },
    {
      feature: "Theming",
      minidev: "Semantic OKLCH tokens, materials (hairline, glass, metal, paper), one light source for shadows",
      other: "CSS variable tokens in the shadcn/ui style",
    },
    { feature: "Dark mode", minidev: "Yes, from the same token set", other: "Yes" },
    { feature: "Backing", minidev: "MiniDev, a studio that builds MVPs, apps and websites", other: "coss.com, the company behind Cal.com; it is Cal.com's design system" },
    {
      feature: "AI tooling",
      minidev: "Built for coding agents: `llms.txt`, `llms-full.txt`, a Markdown page per component (`/docs/<name>.md`), a JSON catalog, `AGENTS.md` and Cursor rules, a Claude Code skill and its own MCP server; the shadcn MCP server can install it too",
      other: "`llms.txt` with a Markdown file per docs page; installable through the shadcn CLI",
    },
  ],
  body: [
    { type: "h2", text: "What happened to Origin UI", id: "what-happened-to-origin-ui" },
    {
      type: "p",
      text: "Origin UI was a large, well loved collection of copy and paste components for application UI, built with Tailwind CSS and React. In October 2025 its creator announced that Origin UI was becoming part of [coss.com](https://coss.com), the company behind Cal.com. The work now continues in [coss ui](https://coss.com/ui), described as a modern component library built on top of Base UI and the official design system of Cal.com. The original collection is still available at [coss.com/origin](https://coss.com/origin).",
    },
    {
      type: "p",
      text: "MiniDev UI is a free, MIT licensed shadcn-compatible registry of 548 items, also built on Base UI, with Tailwind CSS v4 and motion. It covers core components and goes further into full product screens such as billing, settings, data tables and AI chat, plus page blocks and 108 motion components.",
    },
    { type: "h2", text: "Where coss ui shines", id: "where-coss-ui-shines" },
    {
      type: "list",
      items: [
        "**Production tested.** It is the design system of a real, widely used product, so components are shaped by day to day use.",
        "**Form and input craft.** Origin UI was known for many thoughtful variations of inputs, selects and other controls, and particles continue that idea.",
        "**Clean, neutral style.** Components look at home in most products without a strong visual signature to override.",
        "**Public roadmap.** The docs include a roadmap, so you can see what is planned.",
      ],
    },
    { type: "h2", text: "Where MiniDev UI shines", id: "where-minidev-ui-shines" },
    {
      type: "list",
      items: [
        "**Whole screens.** 43 blocks and pages, from a sign in page to an admin console and support inbox.",
        "**Product domains.** Billing, invoices, settings, notifications, command palettes, kanban boards and AI chat surfaces.",
        "**Motion.** 108 animated components for heroes, pricing, marquees and scroll stories, all free.",
        "**Material system.** One light source drives shadows across the page, and a `data-material` attribute switches between hairline, glass, metal and paper.",
      ],
    },
    { type: "component", name: "chat-page" },
    { type: "h2", text: "Using them together", id: "using-them-together" },
    {
      type: "p",
      text: "Because both libraries are built on Base UI and both install with the shadcn CLI, they share a primitive layer and a workflow. You could use coss ui particles for a specific form pattern and MiniDev UI for full pages, without adding a second headless library. Check for file name overlaps (for example, both may provide a `button` or `input`) and keep one version of each base component so styles stay consistent.",
    },
    {
      type: "p",
      text: "The MiniDev stylesheet maps the common shadcn/ui token names to its own tokens, which helps components from other shadcn-style libraries follow the MiniDev theme. One difference to review: MiniDev's `accent` is the brand violet rather than a subtle fill.",
    },
    { type: "h2", text: "Install and migration notes", id: "install-and-migration-notes" },
    { type: "code", lang: "bash", code: "npx shadcn@latest add @minidev/sign-in-page" },
    {
      type: "p",
      text: "Then import the tokens after Tailwind with `@import \"minidev-ui-kit/styles.css\";`. If you have older Origin UI components in your project that were built on Radix, they keep working as they are; moving to either coss ui or MiniDev UI means moving those pieces to Base UI, which you can do one component at a time.",
    },
    { type: "h2", text: "Which to pick", id: "which-to-pick" },
    {
      type: "list",
      items: [
        "**Choose coss ui** if you want a neutral, production tested set of core components and form patterns, and you like the idea of tracking the design system a real product ships with.",
        "**Choose MiniDev UI** if you want finished screens and page blocks, motion components and a theming system with materials, all under MIT.",
        "**Choose both** if you want coss ui form patterns inside MiniDev page layouts. The shared Base UI layer keeps that combination light.",
      ],
    },
  ],
  faq: [
    {
      q: "Does Origin UI still exist?",
      a: "Origin UI became part of coss.com. The original collection is still browsable at coss.com/origin, and new work continues in coss ui, a Base UI component library.",
    },
    {
      q: "Are coss ui and MiniDev UI both built on Base UI?",
      a: "Yes. Both use Base UI as their headless primitive layer and both can be installed with the shadcn CLI.",
    },
    {
      q: "Which should I pick for a SaaS app?",
      a: "coss ui if you want a clean, production tested component base. MiniDev UI if you also want finished screens like billing, settings and AI chat, plus motion and page blocks. Both are free.",
    },
    {
      q: "Which is better for AI coding agents, MiniDev UI or coss ui?",
      a: "Close. Both are on Base UI, both install through the shadcn CLI and both publish `llms.txt` with a Markdown file per docs page. MiniDev UI adds `AGENTS.md` and Cursor rules, a Claude Code skill and its own MCP server.",
    },
  ],
  sources: [
    { label: "coss ui", url: "https://coss.com/ui" },
    { label: "coss ui docs", url: "https://coss.com/ui/docs" },
    { label: "coss ui particles", url: "https://coss.com/ui/particles" },
    { label: "coss ui roadmap", url: "https://coss.com/ui/docs/roadmap" },
    { label: "coss.com origin", url: "https://coss.com/origin" },
    { label: "cosscom/coss on GitHub", url: "https://github.com/cosscom/coss" },
    { label: "Announcement: Origin UI becomes part of coss.com", url: "https://x.com/pacovitiello/status/1976672108139921707" },
    { label: "coss ui llms.txt", url: "https://coss.com/ui/llms.txt" },
  ],
}

export default comparison
