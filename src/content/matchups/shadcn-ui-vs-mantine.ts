import type { Matchup } from "../types"

const matchup: Matchup = {
  slug: "shadcn-ui-vs-mantine",
  title: "shadcn/ui vs Mantine: which to use?",
  description:
    "shadcn/ui vs Mantine: Tailwind components you copy into your repo against a full React library with plain CSS, 70+ hooks, forms and dates. Both MIT and free.",
  a: "shadcn-ui",
  b: "mantine",
  checked: "2026-09-30",
  verdict:
    "Both are free and MIT licensed. shadcn/ui gives you a focused set of Tailwind CSS v4 components as source in your repo. Mantine gives you a complete npm library, with 100+ components, 70+ hooks and packages for forms, dates and charts, styled with plain CSS.",
  pickA:
    "your project runs on Tailwind CSS and you want to own and edit each component, or pull from the wider shadcn registry ecosystem.",
  pickB:
    "you want one dependable package family that covers nearly everything, especially forms and dates, without adopting Tailwind.",
  rows: [
    { feature: "Price", a: "Free", b: "Free; no paid tier, and the Mantine UI collection is free too" },
    { feature: "License", a: "MIT", b: "MIT" },
    {
      feature: "Install model",
      a: "Source copied into your project with `npx shadcn@latest add <name>`",
      b: "`npm i @mantine/core @mantine/hooks`, import `@mantine/core/styles.css`, wrap the app in `MantineProvider`",
    },
    {
      feature: "Styling",
      a: "Tailwind CSS v4 utilities and CSS variable tokens",
      b: "Plain CSS files; CSS modules, the Styles API and style props for customization",
    },
    {
      feature: "Primitives",
      a: "Radix UI or Base UI; Base UI became the default in the July 2026 changelog",
      b: "Mantine's own components, with Floating UI for positioning",
    },
    {
      feature: "Scope",
      a: "Core UI components, charts and blocks",
      b: "100+ components and 70+ hooks, plus packages for forms, dates, charts, notifications, spotlight, rich text and more",
    },
    {
      feature: "Blocks and templates",
      a: "Blocks for dashboards, sidebars, login and more; no official full-site templates",
      b: "Mantine UI: 123 free, MIT prebuilt components; starter templates for Next.js and Vite",
    },
    {
      feature: "Tailwind",
      a: "Built for Tailwind CSS v4, with legacy docs for v3",
      b: "Not required; can be combined with Tailwind, usually by disabling Tailwind's preflight",
    },
    {
      feature: "Dark mode",
      a: "Yes",
      b: "Light, dark or auto through `defaultColorScheme`, with `ColorSchemeScript` for server rendering",
    },
    {
      feature: "AI tooling",
      a: "`llms.txt` and an official MCP server for browsing and installing from registries",
      b: "`llms.txt`, `llms-full.txt`, an experimental `@mantine/mcp-server` and agent skills",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[shadcn/ui](https://ui.shadcn.com) copies component source into your project with a CLI, so you own and edit every file. It ships a deliberately focused core of accessible components, charts and blocks for Tailwind CSS v4, a registry format that other sites publish into, and a choice of Radix UI or Base UI underneath.",
    },
    {
      type: "p",
      text: "[Mantine](https://mantine.dev) is a fully featured React library maintained by Vitaly Rtishchev and hundreds of contributors. The core covers inputs, overlays, navigation, layout and data display, and separate packages add a form library, date pickers, charts built on Recharts, notifications, a spotlight command center and a rich text editor based on Tiptap. Styles ship as regular CSS files, and customization goes through CSS modules, the Styles API or style props.",
    },
    { type: "h2", text: "Where shadcn/ui shines", id: "where-shadcn-ui-shines" },
    {
      type: "list",
      items: [
        "**You own the code.** Every component is a file in your repo, so a change is an edit rather than an override.",
        "**Tailwind native.** Components use Tailwind CSS v4 utilities and CSS variable tokens, the same as the rest of a Tailwind codebase.",
        "**The registry.** One CLI installs from the official registry and from community registries, and an official MCP server helps AI tools browse them.",
        "**A small core.** The set is deliberately focused, which keeps the codebase lean and easy to reason about.",
      ],
    },
    { type: "h2", text: "Where Mantine shines", id: "where-mantine-shines" },
    {
      type: "list",
      items: [
        "**Breadth in one family.** Components, 70+ hooks, forms, dates and charts come from one maintainer with one API style.",
        "**Forms and dates.** The form package handles state and validation, and the dates package provides date and time pickers, both designed to work with the core inputs.",
        "**No Tailwind required.** Teams that prefer CSS modules or plain CSS get a complete system without utility classes.",
        "**Stable releases.** A documented cadence of patch, minor and major versions, with docs for previous versions kept online.",
        "**Free extras.** Mantine UI offers 123 free prebuilt components, and `@mantine/hooks` works on its own.",
      ],
    },
    { type: "h2", text: "The trade-offs", id: "the-trade-offs" },
    {
      type: "list",
      items: [
        "**Ownership or breadth.** shadcn/ui keeps its core small and puts every line in your repo. Mantine gives you far more out of the box, maintained upstream, and you customize it through its styling APIs.",
        "**Updates.** Mantine releases arrive through npm on a documented cadence. shadcn/ui components live in your repo, so you apply upstream changes yourself.",
        "**Forms and dates.** Mantine has dedicated packages for both, designed to work with its inputs.",
        "**Mixing them.** One app with both means two styling systems. Mantine's help center says disabling Tailwind's preflight is usually enough to keep global styles from affecting Mantine components, so plan the split before mixing them on one page.",
      ],
    },
  ],
  minidev: [
    "MiniDev UI sits on the shadcn/ui side: a free, MIT shadcn-compatible registry on Base UI and Tailwind CSS v4 that installs with the same CLI. It is a way to get closer to Mantine's breadth without leaving Tailwind, with over 500 items including data tables, billing and settings pages, command palettes, notification centers and AI chat.",
    "It does not include a separate form state library like `@mantine/form`; it provides the input components and a form wizard. Compare it with [shadcn/ui](/compare/minidev-ui-vs-shadcn-ui) and with [Mantine](/compare/minidev-ui-vs-mantine).",
  ],
  faq: [
    {
      q: "Is Mantine better than shadcn/ui?",
      a: "For breadth, yes: Mantine covers components, hooks, forms, dates and charts in one package family. For control, shadcn/ui is ahead, because the component source lives in your repo.",
    },
    {
      q: "Does Mantine use Tailwind CSS?",
      a: "No. Mantine ships its own CSS files and recommends CSS modules. It can run alongside Tailwind, usually with Tailwind's preflight disabled. shadcn/ui is built on Tailwind CSS v4.",
    },
    {
      q: "Are both free for commercial projects?",
      a: "Yes. Both are MIT licensed. Mantine has no paid tier, and its Mantine UI collection of 123 prebuilt components is MIT too.",
    },
    {
      q: "Can I use Mantine hooks in a shadcn/ui project?",
      a: "Yes. `@mantine/hooks` is a separate package, so you can use its hooks without Mantine's components.",
    },
    {
      q: "Do both support AI coding tools?",
      a: "Yes. Both publish `llms.txt`. shadcn/ui has an official MCP server for browsing and installing from registries; Mantine has an experimental `@mantine/mcp-server`, `llms-full.txt` and agent skills.",
    },
  ],
  sources: [
    { label: "shadcn/ui docs", url: "https://ui.shadcn.com/docs" },
    { label: "shadcn/ui changelog: Base UI as the default (July 2026)", url: "https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default" },
    { label: "shadcn/ui Tailwind v4 docs", url: "https://ui.shadcn.com/docs/tailwind-v4" },
    { label: "shadcn/ui MCP server", url: "https://ui.shadcn.com/docs/registry/mcp" },
    { label: "shadcn/ui llms.txt", url: "https://ui.shadcn.com/llms.txt" },
    { label: "Mantine home", url: "https://mantine.dev/" },
    { label: "Mantine getting started", url: "https://mantine.dev/getting-started/" },
    { label: "Mantine styles overview", url: "https://mantine.dev/styles/styles-overview/" },
    { label: "Mantine color schemes", url: "https://mantine.dev/theming/color-schemes/" },
    { label: "Mantine with Tailwind CSS (help center)", url: "https://help.mantine.dev/q/third-party-styles" },
    { label: "Mantine with LLMs", url: "https://mantine.dev/guides/llms/" },
    { label: "Mantine about", url: "https://mantine.dev/about/" },
    { label: "Mantine UI", url: "https://ui.mantine.dev/" },
  ],
}

export default matchup
