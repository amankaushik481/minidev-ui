import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-flowbite",
  other: "Flowbite",
  otherUrl: "https://flowbite.com",
  title: "MiniDev UI vs Flowbite: which should you use?",
  description:
    "MiniDev UI vs Flowbite: two Tailwind CSS component libraries. Compare scope, framework support, blocks, theming, dark mode, AI tooling and Flowbite Pro.",
  checked: "2026-09-30",
  summary:
    "Flowbite is an open source, MIT licensed Tailwind CSS component library with a small script that adds interactivity through data attributes, official React components in Flowbite React, integration guides for many frameworks, a Figma design system and a paid Flowbite Pro tier for the full blocks collection and an admin dashboard. MiniDev UI is also free and MIT, but it is React only, built on Base UI and Tailwind CSS v4, and ships product screens, motion components and full pages at no cost. Pick Flowbite if you work across several frameworks or start from Figma. Pick MiniDev UI for React apps that need finished, accessible product screens with source in your repo.",
  rows: [
    {
      feature: "Price",
      minidev: "Free, everything",
      other: "Free open source library; paid Flowbite Pro for the Figma design system, all blocks and a dashboard UI",
    },
    {
      feature: "License",
      minidev: "MIT",
      other: "MIT for code (docs under CC BY 3.0); Flowbite Pro under its own EULA",
    },
    {
      feature: "Scope",
      minidev: "Over 500 items: roughly 375 UI components, 86 motion components, 43 blocks and pages",
      other: "60+ UI components in the core library; Flowbite React provides React versions of the core components",
    },
    {
      feature: "Blocks and templates",
      minidev: "About 43 blocks and pages; 8 landing page templates shown as live demos, with brand kits",
      other: "Flowbite Blocks for application, marketing and e-commerce sections, with full access in Flowbite Pro; project starters via `create-flowbite-react`",
    },
    {
      feature: "Styling approach",
      minidev: "React components with source in your repo, styled with Tailwind utilities and semantic tokens",
      other: "Tailwind utility classes in your markup, a Tailwind plugin, and a JavaScript file that wires behavior through data attributes",
    },
    {
      feature: "Primitives and accessibility",
      minidev: "Base UI (@base-ui/react)",
      other: "Flowbite's own vanilla JavaScript for the core library; Flowbite React uses its own React components with Floating UI for positioning",
    },
    {
      feature: "Framework",
      minidev: "React",
      other: "Integration guides for React, Next.js, Vue, Nuxt, Svelte, Angular, Laravel, Rails, Django, Flask and more",
    },
    {
      feature: "Tailwind usage",
      minidev: "Tailwind CSS v4",
      other: "Tailwind CSS v4 supported; Flowbite React lists Tailwind v3 or v4 as a peer dependency",
    },
    {
      feature: "Install",
      minidev: "`npx shadcn@latest add https://ui.minidev.pro/r/<name>.json`, or npm `minidev-ui-kit`",
      other: "`npm install flowbite`, then `@plugin \"flowbite/plugin\";` and a `@source` line; React: `npx flowbite-react@latest init`",
    },
    {
      feature: "Theming",
      minidev: "Semantic OKLCH tokens, materials (hairline, glass, metal, paper), one light source for shadows",
      other: "Native Tailwind v4 theme variables in `@theme`, with prebuilt themes (default, minimal, enterprise, playful, mono)",
    },
    {
      feature: "Dark mode",
      minidev: "Yes, from the same token set",
      other: "Yes, class based: a `dark` class on the html element and `dark:` variants in component classes",
    },
    {
      feature: "AI tooling",
      minidev: "`llms.txt` and `llms-full.txt`; shadcn MCP compatible",
      other: "Official MIT licensed Flowbite MCP server for Figma to code, theme generation and component context",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Flowbite](https://flowbite.com) is an open source library of UI components based on Tailwind CSS. The core library is HTML with Tailwind classes, a Tailwind plugin, and a JavaScript file that makes dropdowns, modals, tabs and other interactive parts work through data attributes, with a programmatic API if you prefer. Because the core is framework agnostic, Flowbite publishes integration guides for a long list of stacks, and [Flowbite React](https://flowbite-react.com) offers official React components. Components are designed in Figma first, and Flowbite Pro sells the Figma design system, the full blocks collection and an admin dashboard.",
    },
    {
      type: "p",
      text: "MiniDev UI is a free, MIT licensed shadcn-compatible registry of over 500 React items built on Base UI, Tailwind CSS v4 and motion. You add items with the shadcn CLI and the source lands in your repo. The focus is product screens: data tables, billing and invoice pages, settings, command palettes, notification centers and AI chat, plus about 43 full-page blocks and 86 motion components under one token system.",
    },
    { type: "h2", text: "Where Flowbite shines", id: "where-flowbite-shines" },
    {
      type: "list",
      items: [
        "**Works almost anywhere.** The data attribute approach fits server-rendered apps in Laravel, Rails or Django as well as JavaScript frameworks.",
        "**Figma to code.** A Figma design system mirrors the components, and the official MCP server can turn Figma layers into Flowbite code with an AI assistant.",
        "**Section library.** Flowbite Blocks cover a wide range of marketing, application and e-commerce sections.",
        "**Familiar Tailwind markup.** Components are plain Tailwind classes, easy to read and adjust for anyone who knows Tailwind.",
        "**Theme presets.** Several prebuilt themes use native Tailwind v4 theme variables, so a brand color change flows through utility classes.",
      ],
    },
    { type: "h2", text: "Where MiniDev UI shines", id: "where-minidev-ui-shines" },
    {
      type: "list",
      items: [
        "**React first.** Components are React code with Base UI handling focus, keyboard and ARIA behavior, not a script scanning the DOM.",
        "**No paid tier.** Blocks, full pages and motion components are all MIT.",
        "**Product depth.** Billing, invoices, settings, admin consoles and AI chat surfaces are ready to adapt.",
        "**A visual system.** One light source drives shadows, and a `data-material` attribute switches between hairline, glass, metal and paper.",
      ],
    },
    { type: "component", name: "admin-console" },
    { type: "h2", text: "Using them together or migrating", id: "using-them-together-or-migrating" },
    {
      type: "p",
      text: "Both are Tailwind CSS v4 libraries, so they can share a project. Flowbite themes define their own Tailwind theme variables (for example the brand color behind `bg-brand`), while MiniDev components read MiniDev tokens, so set your brand color in both places. Dark mode lines up well: both libraries switch on a `dark` class, so one toggle drives both. Each setup guide declares a `dark` custom variant, so keep a single declaration in your CSS and check both modes.",
    },
    {
      type: "p",
      text: "In a React app, avoid running the Flowbite script and React components against the same elements. Moving from Flowbite to MiniDev UI works best one route at a time: replace interactive pieces such as dropdowns, modals and date pickers first, since those move from data attribute wiring to React state, then swap static sections for MiniDev blocks where one fits.",
    },
    { type: "code", lang: "bash", code: "npx shadcn@latest add https://ui.minidev.pro/r/admin-console.json" },
    {
      type: "callout",
      tone: "note",
      text: "Flowbite Pro plans and terms can change. Check [flowbite.com/pro](https://flowbite.com/pro/) for current details.",
    },
    { type: "h2", text: "Which to pick", id: "which-to-pick" },
    {
      type: "list",
      items: [
        "**Choose Flowbite** if you work outside React, your team designs in Figma, or you want a large library of marketing sections.",
        "**Choose MiniDev UI** if you are building a React product and want accessible interactive components and full application screens, free.",
        "**Use both** when a React app and a server-rendered marketing site need to share a Tailwind setup; keep each library to its own surface.",
      ],
    },
  ],
  faq: [
    {
      q: "Is Flowbite free?",
      a: "The core library and Flowbite React are open source under MIT. Flowbite Pro, with the Figma design system, all blocks and an admin dashboard, is paid. MiniDev UI has no paid tier.",
    },
    {
      q: "Does Flowbite support Tailwind CSS v4?",
      a: "Yes. The Flowbite quickstart is written for Tailwind v4 and uses `@plugin \"flowbite/plugin\";`. Flowbite React accepts Tailwind v3 or v4.",
    },
    {
      q: "Which is better for a Laravel or Rails app?",
      a: "Flowbite, since its data attribute script works with server-rendered HTML. MiniDev UI is a React library.",
    },
    {
      q: "Do Flowbite and MiniDev UI both have MCP servers?",
      a: "Flowbite has an official MCP server. MiniDev UI publishes `llms.txt` and a shadcn registry that the shadcn MCP server and CLI can read.",
    },
  ],
  sources: [
    { label: "Flowbite introduction", url: "https://flowbite.com/docs/getting-started/introduction/" },
    { label: "Flowbite on GitHub", url: "https://github.com/themesberg/flowbite" },
    { label: "Flowbite license", url: "https://flowbite.com/docs/getting-started/license/" },
    { label: "Flowbite theming", url: "https://flowbite.com/docs/customize/theming/" },
    { label: "Flowbite dark mode", url: "https://flowbite.com/docs/customize/dark-mode/" },
    { label: "Flowbite MCP server", url: "https://flowbite.com/docs/getting-started/mcp/" },
    { label: "Flowbite Pro", url: "https://flowbite.com/pro/" },
    { label: "Flowbite React", url: "https://flowbite-react.com/docs/getting-started/introduction" },
    { label: "Flowbite React quickstart", url: "https://flowbite-react.com/docs/getting-started/quickstart" },
    { label: "flowbite-react on npm", url: "https://www.npmjs.com/package/flowbite-react" },
  ],
}

export default comparison
