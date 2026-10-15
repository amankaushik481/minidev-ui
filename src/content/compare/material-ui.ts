import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-material-ui",
  other: "Material UI",
  otherUrl: "https://mui.com",
  title: "MiniDev UI vs Material UI: which should you use?",
  description:
    "MiniDev UI vs Material UI (MUI): a free shadcn-compatible registry on Base UI and Tailwind v4 against the Material Design npm library and its paid MUI X tiers.",
  checked: "2026-10-15",
  summary:
    "Material UI is the React implementation of Google's Material Design, installed from npm as `@mui/material` with Emotion as the default styling engine. It is MIT licensed and free, and the same company sells MUI X Pro and Premium for its advanced data grid, pickers, charts and tree view. MiniDev UI is a free, MIT, shadcn-compatible registry that copies source into your repo, built on Base UI, Tailwind CSS v4 and motion, with 548 items including finished product screens. Pick Material UI if you want Material Design, a versioned package and a large ecosystem. Pick MiniDev UI if you work in Tailwind, want to own the code, and want to start from complete screens. One connection worth knowing: Base UI, the headless layer under MiniDev UI, is published by the MUI organization.",
  rows: [
    {
      feature: "Price",
      minidev: "Free, everything",
      other: "Material UI is free. MUI X Pro is $299 and Premium $599 per developer per year; Enterprise is $1,399 per developer per year",
    },
    {
      feature: "License",
      minidev: "MIT",
      other: "MIT for Material UI and MUI X Community; MUI X Pro and Premium use a commercial license",
    },
    {
      feature: "Scope",
      minidev: "548 items: 397 UI components, 108 motion components, 43 blocks and pages",
      other: "About 57 components on the all components page, plus Lab (Masonry, Timeline) and MUI X (Data Grid, Date and Time Pickers, Charts, Tree View)",
    },
    {
      feature: "Design language",
      minidev: "Its own system: semantic OKLCH tokens, materials (hairline, glass, metal, paper) and one light source for shadows",
      other: "Google's Material Design; the docs state support for Material Design 2",
    },
    {
      feature: "Install model",
      minidev: "Source copied into your repo with `npx shadcn@latest add @minidev/<name>`, or npm `minidev-ui-kit`",
      other: "npm packages: `npm install @mui/material @emotion/react @emotion/styled`",
    },
    {
      feature: "Styling",
      minidev: "Tailwind CSS v4 utilities and CSS variables, edited in your own files",
      other: "Emotion (CSS-in-JS) by default; styled-components is supported but the docs say it is not compatible with server rendered projects",
    },
    {
      feature: "Primitives",
      minidev: "Base UI (`@base-ui/react`), published by the MUI organization",
      other: "Its own internals; MUI also publishes Base UI as a separate unstyled library",
    },
    {
      feature: "React versions",
      minidev: "React; the docs site and examples run on React 19",
      other: "`^17.0.0 || ^18.0.0 || ^19.0.0` as peer dependencies",
    },
    {
      feature: "Blocks and templates",
      minidev: "15 block types, 43 full page blocks and 8 landing page templates shown as live demos, all free",
      other: "A templates page curated by the maintainers that links to the MUI Store, plus design kits for design tools",
    },
    {
      feature: "Animation",
      minidev: "motion (the Framer Motion successor) for the 108 motion components; CSS for core components",
      other: "Transition utilities ship with the core library",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Material UI](https://mui.com) is an open source React component library that implements Google's Material Design. You install `@mui/material` from npm together with Emotion, the default styling engine, and theme it through a JavaScript theme object. The core library is MIT and free, and its all components page lists about 57 components plus Lab and MUI X. MUI X adds a data grid, date and time pickers, charts and a tree view with a free MIT Community tier and paid Pro and Premium tiers priced per developer. The MUI organization also publishes [Base UI](https://base-ui.com), an unstyled component library, which is the headless layer MiniDev UI builds on. MiniDev UI is a free, MIT licensed shadcn-compatible registry of 548 items: 397 UI components, 108 motion components and 43 blocks and pages, built on Base UI, Tailwind CSS v4 and motion. You add items with the shadcn CLI and the source lands in your repo, or you install the whole kit from npm as `minidev-ui-kit`.",
    },
    { type: "h2", text: "Where each one is the better pick", id: "where-each-one-is-the-better-pick" },
    {
      type: "list",
      items: [
        "**Pick Material UI for Material Design.** If the product should look and behave like Material Design, or the design team works from Material guidelines, Material UI is the direct implementation.",
        "**Pick Material UI for a versioned package and a deep ecosystem.** Updates arrive through npm, the library has years of history, and MUI X covers hard components such as a data grid with row grouping, aggregation and pivoting, sold per developer.",
        "**Pick MiniDev UI if you work in Tailwind and want to own the code.** Components are files in your repo styled with Tailwind utilities and semantic tokens, so there is no theme object or CSS-in-JS runtime to learn.",
        "**Pick MiniDev UI for finished product screens.** Billing, settings, sign in, analytics, admin consoles, support inboxes and AI chat are full pages in the registry, with 15 block types and 8 landing page templates, all free.",
        "**Mixing them is possible but rarely worth it.** Both run in one React app, but you would carry two styling systems (Emotion and Tailwind) and two token sets. If you must combine them, keep each to its own area, for example Material UI in an existing app and MiniDev UI blocks on new routes.",
      ],
    },
    { type: "component", name: "admin-console" },
    {
      type: "callout",
      tone: "note",
      text: "MUI X pricing is per developer per year and the tiers change over time, so check [mui.com/pricing](https://mui.com/pricing/) for current terms. MiniDev UI's data table covers sorting, selection and bulk actions; it is not a virtualized grid with row grouping or pivoting, which is what MUI X is built for. For a data heavy product, look at both before choosing.",
    },
  ],
  faq: [
    {
      q: "Is Material UI free?",
      a: "Yes. Material UI is MIT licensed and free. MUI X, the companion set of advanced components, has a free MIT Community tier and paid Pro and Premium tiers priced per developer per year.",
    },
    {
      q: "Can I use MiniDev UI with Material UI?",
      a: "Technically yes, since both are React, but you would run Emotion and Tailwind side by side with two token systems. It works best when each library owns separate screens.",
    },
    {
      q: "What is the link between Base UI and Material UI?",
      a: "Base UI is an unstyled component library published by the MUI organization; its site describes it as from the creators of Radix, Floating UI and Material UI. MiniDev UI uses Base UI for behavior and accessibility and adds its own styling on top.",
    },
  ],
  sources: [
    { label: "MUI home", url: "https://mui.com" },
    { label: "MUI pricing", url: "https://mui.com/pricing/" },
    { label: "Material UI overview", url: "https://mui.com/material-ui/getting-started/" },
    { label: "Material UI installation", url: "https://mui.com/material-ui/getting-started/installation/" },
    { label: "Material UI all components", url: "https://mui.com/material-ui/all-components/" },
    { label: "MUI templates", url: "https://mui.com/templates/" },
    { label: "MUI on GitHub", url: "https://github.com/mui" },
    { label: "Base UI", url: "https://base-ui.com/" },
  ],
}

export default comparison
