import type { Matchup } from "../types"

const matchup: Matchup = {
  slug: "shadcn-ui-vs-material-ui",
  title: "shadcn/ui vs Material UI (MUI): which to use?",
  description:
    "shadcn/ui vs Material UI (MUI): Tailwind source you own against a Material Design npm package on Emotion with paid MUI X tiers. When to pick each one.",
  a: "shadcn-ui",
  b: "material-ui",
  checked: "2026-09-30",
  verdict:
    "Both are free and MIT licensed, but they are built differently. shadcn/ui copies component source into your repo and styles it with Tailwind CSS v4. Material UI is an npm package that implements Google's Material Design and styles it with Emotion.",
  pickA:
    "you work in Tailwind CSS, want to own and edit every component, and want the registry ecosystem that other libraries publish into.",
  pickB:
    "you want Material Design and a versioned package that updates through npm, or you need MUI X for a data grid with row grouping, aggregation and pivoting.",
  rows: [
    {
      feature: "Price",
      a: "Free",
      b: "Material UI is free. MUI X Pro is $299 and Premium $599 per developer per year; Enterprise is $1,399 per developer per year",
    },
    { feature: "License", a: "MIT", b: "MIT for Material UI and MUI X Community; MUI X Pro and Premium use a commercial license" },
    {
      feature: "Install model",
      a: "Source copied into your project with `npx shadcn@latest add <name>`",
      b: "npm packages: `npm install @mui/material @emotion/react @emotion/styled`",
    },
    {
      feature: "Styling",
      a: "Tailwind CSS v4 utilities and CSS variable tokens, in your own files",
      b: "Emotion (CSS-in-JS) by default; styled-components is supported, but the docs say it is not compatible with server rendered projects",
    },
    {
      feature: "Theming",
      a: "CSS variable tokens (background, foreground, primary and so on) with theme presets",
      b: "A JavaScript theme object for Google's Material Design; the docs state support for Material Design 2",
    },
    {
      feature: "Primitives",
      a: "Radix UI or Base UI; Base UI became the default in the July 2026 changelog",
      b: "Its own internals; the MUI organization also publishes Base UI as a separate unstyled library",
    },
    {
      feature: "Scope",
      a: "Core UI components, charts and blocks for dashboards, sidebars, login and more",
      b: "About 57 components on the all components page, plus Lab (Masonry, Timeline) and MUI X (Data Grid, Date and Time Pickers, Charts, Tree View)",
    },
    {
      feature: "Templates",
      a: "No official full-site templates; a large community template ecosystem",
      b: "A templates page curated by the maintainers that links to the MUI Store, plus design kits for design tools",
    },
    { feature: "Animation", a: "Mostly CSS transitions; no motion library required by default", b: "Transition utilities ship with the core library" },
    {
      feature: "Updates",
      a: "The code lives in your repo, with no runtime dependency on the shadcn/ui site after install",
      b: "New versions arrive through npm",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[shadcn/ui](https://ui.shadcn.com) is not a package you import. Its CLI copies component source into your project, where you own and edit it, and its registry format lets any site publish components that the same CLI can install. It ships a core set of accessible components, charts, blocks and theming for Tailwind CSS v4, and it runs on Radix UI or Base UI; its July 2026 changelog made Base UI the default.",
    },
    {
      type: "p",
      text: "[Material UI](https://mui.com) is the React implementation of Google's Material Design. You install `@mui/material` from npm together with Emotion, the default styling engine, and theme it through a JavaScript theme object. Its all components page lists about 57 components, and MUI X adds a data grid, date and time pickers, charts and a tree view, with a free MIT Community tier and paid Pro and Premium tiers priced per developer.",
    },
    { type: "h2", text: "Where shadcn/ui shines", id: "where-shadcn-ui-shines" },
    {
      type: "list",
      items: [
        "**You own the code.** Every component is a file in your repo, so a change is an edit, not a theme override.",
        "**Tailwind native.** Components use Tailwind CSS v4 utilities and CSS variable tokens, the same language as the rest of a Tailwind codebase.",
        "**The registry.** The registry format, the directory of community registries and the official MCP server let one CLI install components from many sources.",
        "**A small core.** The component set is deliberately focused, which keeps your codebase lean.",
        "**Primitive choice.** A project can run on Radix UI or Base UI.",
      ],
    },
    { type: "h2", text: "Where Material UI shines", id: "where-material-ui-shines" },
    {
      type: "list",
      items: [
        "**Material Design.** If the product should look and behave like Material Design, or the design team works from Material guidelines, Material UI is the direct implementation.",
        "**A versioned package.** Updates arrive through npm, and the library has years of history.",
        "**Hard components, ready made.** MUI X covers a data grid with row grouping, aggregation and pivoting, date and time pickers, charts and a tree view, sold per developer above the free Community tier.",
        "**Wide React support.** The peer dependencies accept React 17, 18 and 19.",
        "**Design kits.** MUI offers design kits for design tools and a templates page curated by its maintainers.",
      ],
    },
    { type: "h2", text: "The trade-offs", id: "the-trade-offs" },
    {
      type: "list",
      items: [
        "**Control or upgrades.** shadcn/ui code is yours after install, so you can change anything, and you apply upstream changes yourself. Material UI updates with a version bump, and you customize it through its theme object and styling engine.",
        "**Styling runtime.** shadcn/ui means Tailwind CSS. Material UI means Emotion, a CSS-in-JS library; it also supports styled-components, but its docs say that option is not compatible with server rendered projects.",
        "**What costs money.** Both core libraries are free. MUI X adds a data grid with row grouping, aggregation and pivoting, sold per developer per year in its Pro and Premium tiers.",
        "**Mixing them.** Both run in one React app, but you would carry two styling systems (Tailwind and Emotion) and two token sets. If you must combine them, keep each to its own screens.",
      ],
    },
  ],
  minidev: [
    "MiniDev UI sits on the shadcn/ui side of this choice. It is a free, MIT licensed shadcn-compatible registry built on Base UI and Tailwind CSS v4, so you add items with the same CLI and the source lands in your repo. It adds finished product screens on top of the shadcn/ui model: billing, settings, analytics and admin pages, data tables, AI chat and motion components, under one token system. See [MiniDev UI vs shadcn/ui](/compare/minidev-ui-vs-shadcn-ui).",
    "It does not replace MUI X. Its data table covers sorting, selection and bulk actions, not a virtualized grid with row grouping or pivoting. If Material Design or that grid is why you are looking at Material UI, start there; [MiniDev UI vs Material UI](/compare/minidev-ui-vs-material-ui) has the details.",
  ],
  faq: [
    {
      q: "Is shadcn/ui better than Material UI?",
      a: "Neither is better across the board. shadcn/ui is the better fit for Tailwind projects that want to own component source. Material UI is the better fit for Material Design and for teams that want a versioned npm package, with MUI X for advanced data components.",
    },
    {
      q: "Are shadcn/ui and Material UI free?",
      a: "Yes. Both are MIT licensed. MUI X, the companion set of advanced components, has a free MIT Community tier and paid Pro, Premium and Enterprise tiers priced per developer per year.",
    },
    {
      q: "Can I use shadcn/ui and Material UI in the same app?",
      a: "Yes, but you would run Tailwind and Emotion side by side with two token sets. It works best when each library owns separate screens, for example Material UI in an existing app and shadcn/ui on new routes.",
    },
    {
      q: "What connects shadcn/ui and MUI?",
      a: "Base UI. The MUI organization publishes Base UI, an unstyled component library, and shadcn/ui made it the default primitive layer in its July 2026 changelog. Material UI itself is built on its own internals.",
    },
    {
      q: "Which is better for a data heavy admin app?",
      a: "Material UI, if you need MUI X features such as a data grid with row grouping, aggregation and pivoting, sold per developer. shadcn/ui gives you core components, charts and dashboard blocks to build on, for free.",
    },
  ],
  sources: [
    { label: "shadcn/ui docs", url: "https://ui.shadcn.com/docs" },
    { label: "shadcn/ui changelog: Base UI as the default (July 2026)", url: "https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default" },
    { label: "shadcn/ui changelog: Blocks for Radix and Base UI (February 2026)", url: "https://ui.shadcn.com/docs/changelog/2026-02-blocks" },
    { label: "shadcn/ui MCP server", url: "https://ui.shadcn.com/docs/registry/mcp" },
    { label: "shadcn/ui registry directory", url: "https://ui.shadcn.com/docs/directory" },
    { label: "MUI pricing", url: "https://mui.com/pricing/" },
    { label: "Material UI overview", url: "https://mui.com/material-ui/getting-started/" },
    { label: "Material UI installation", url: "https://mui.com/material-ui/getting-started/installation/" },
    { label: "Material UI all components", url: "https://mui.com/material-ui/all-components/" },
    { label: "MUI templates", url: "https://mui.com/templates/" },
    { label: "Base UI", url: "https://base-ui.com/" },
  ],
}

export default matchup
