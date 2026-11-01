import type { Matchup } from "../types"

const matchup: Matchup = {
  slug: "mantine-vs-material-ui",
  title: "Mantine vs Material UI (MUI): which to use?",
  description:
    "Mantine vs Material UI (MUI): plain CSS, 100+ components and 70+ hooks with no paid tier, against Material Design on Emotion with paid MUI X. When each fits.",
  a: "mantine",
  b: "material-ui",
  checked: "2026-09-30",
  verdict:
    "Both are MIT licensed React libraries you install from npm, and neither needs Tailwind. Mantine ships plain CSS files, 100+ components, 70+ hooks and packages for forms, dates and charts, with no paid tier. Material UI implements Material Design on Emotion and sells MUI X for its most advanced data components.",
  pickA:
    "you want one free package family for components, hooks, forms, dates and charts, with styles as plain CSS and no runtime styling cost.",
  pickB:
    "you want Material Design, or the MUI X data grid with row grouping, aggregation and pivoting, and a per developer license fits your budget.",
  rows: [
    {
      feature: "Price",
      a: "Free; no paid tier, and the Mantine UI collection is free too",
      b: "Free; MUI X Pro is $299 and Premium $599 per developer per year, Enterprise $1,399 per developer per year",
    },
    { feature: "License", a: "MIT", b: "MIT for Material UI and MUI X Community; commercial license for MUI X Pro and Premium" },
    {
      feature: "Install",
      a: "`npm i @mantine/core @mantine/hooks`, import `@mantine/core/styles.css`, wrap the app in `MantineProvider`",
      b: "`npm install @mui/material @emotion/react @emotion/styled`",
    },
    {
      feature: "Styling",
      a: "Plain CSS files shipped with the packages; CSS modules, the Styles API and style props for customization",
      b: "Emotion (CSS-in-JS) by default, themed through a JavaScript theme object",
    },
    {
      feature: "Scope",
      a: "100+ components and 70+ hooks, plus packages for forms, dates, charts, notifications, spotlight, rich text, carousel, dropzone and modals",
      b: "About 57 components, plus Lab (Masonry, Timeline) and MUI X (Data Grid, Date and Time Pickers, Charts, Tree View)",
    },
    {
      feature: "Forms and dates",
      a: "A form library for state and validation, and a dates package with date and time pickers",
      b: "Date and Time Pickers are part of MUI X, which has a free Community tier and paid tiers",
    },
    { feature: "Charts", a: "A charts package built on Recharts", b: "MUI X Charts" },
    {
      feature: "Theming",
      a: "`createTheme` passed to `MantineProvider`; colors as arrays of 10 shades; theme values exposed as CSS variables",
      b: "A JavaScript theme object; the docs state support for Material Design 2",
    },
    {
      feature: "Blocks and templates",
      a: "Mantine UI: 123 free, MIT prebuilt components; starter templates for Next.js and Vite",
      b: "A templates page that links to the MUI Store, plus design kits for design tools",
    },
    {
      feature: "Animation",
      a: "CSS transitions, with a Transition component and premade transitions such as fade and scale",
      b: "Transition utilities ship with the core library",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Mantine](https://mantine.dev) is a fully featured React component library maintained by Vitaly Rtishchev and hundreds of contributors. The core package covers inputs, overlays, navigation, layout and data display, and separate packages add a form library, date pickers, charts built on Recharts, notifications, a spotlight command center, a rich text editor based on Tiptap and more. Styles ship as regular CSS files, so there is no runtime styling cost, and everything is MIT and free.",
    },
    {
      type: "p",
      text: "[Material UI](https://mui.com) is the React implementation of Google's Material Design. You install `@mui/material` with Emotion, the default styling engine, and theme it through a JavaScript theme object. The core library is MIT and free, and MUI X adds a data grid, date and time pickers, charts and a tree view, with a free MIT Community tier and paid Pro and Premium tiers priced per developer.",
    },
    { type: "h2", text: "Where Mantine shines", id: "where-mantine-shines" },
    {
      type: "list",
      items: [
        "**Breadth in one family.** Components, 70+ hooks, forms, dates and charts come from one maintainer with one API style, so the pieces fit together.",
        "**Forms and dates.** The form package handles form state and validation, and the dates package provides date and time pickers, both designed to work with the core inputs.",
        "**No runtime styling cost.** Styles are plain CSS files, customized with CSS modules, the Styles API or style props.",
        "**Stable releases.** Mantine documents a regular cadence of patch, minor and major versions and keeps docs for previous versions online.",
        "**Free extras.** The Mantine UI site offers 123 free prebuilt components, and the docs publish `llms.txt` files and an experimental MCP server for AI tools.",
      ],
    },
    { type: "h2", text: "Where Material UI shines", id: "where-material-ui-shines" },
    {
      type: "list",
      items: [
        "**Material Design.** If the product should follow Material guidelines, Material UI is the direct implementation.",
        "**MUI X.** A data grid with row grouping, aggregation and pivoting, plus date and time pickers, charts and a tree view.",
        "**A long track record.** The library has years of history, and updates arrive through npm.",
        "**Wide React support.** The peer dependencies accept React 17, 18 and 19.",
        "**An unstyled sibling.** The MUI organization also publishes Base UI, an unstyled component library.",
      ],
    },
    { type: "h2", text: "The trade-offs", id: "the-trade-offs" },
    {
      type: "list",
      items: [
        "**Plain CSS or CSS-in-JS.** Mantine's styles are regular CSS files with no runtime styling cost. Material UI's default engine is Emotion, a CSS-in-JS library.",
        "**What costs money.** Mantine has no paid tier. Material UI's core is free, and MUI X Pro and Premium are priced per developer per year.",
        "**Design.** Material UI follows Material Design. Mantine's look is customized through CSS modules, the Styles API and style props, with theme colors defined as arrays of 10 shades.",
        "**Tailwind.** Neither requires it. Mantine can run alongside Tailwind, usually with Tailwind's preflight disabled, according to its help center.",
      ],
    },
  ],
  minidev: [
    "MiniDev UI answers a different brief: a free, MIT licensed shadcn-compatible registry on Base UI and Tailwind CSS v4 that copies source into your repo. If you are weighing Mantine and Material UI because you want to stay off Tailwind, it is not the right tool. If your project is on Tailwind and you want finished screens such as billing, settings and admin pages, read [MiniDev UI vs Mantine](/compare/minidev-ui-vs-mantine) and [MiniDev UI vs Material UI](/compare/minidev-ui-vs-material-ui).",
    "Two links between them are worth knowing. Base UI, the headless layer under MiniDev UI, is published by the MUI organization, and `@mantine/hooks` is a standalone package, so its hooks can live in a MiniDev UI project.",
  ],
  faq: [
    {
      q: "Is Mantine completely free?",
      a: "Yes. Mantine and the Mantine UI collection are MIT licensed with no paid tier. Material UI is free too, but MUI X Pro and Premium are paid.",
    },
    {
      q: "Which is better for forms?",
      a: "Mantine, for form heavy apps: its form package handles form state and validation, and its dates package provides date and time pickers, both free. Material UI's date and time pickers are part of MUI X.",
    },
    {
      q: "Does Mantine or Material UI work with Tailwind CSS?",
      a: "Neither needs it. Mantine can run alongside Tailwind, usually with Tailwind's preflight disabled, according to its help center. Material UI styles with Emotion by default.",
    },
    {
      q: "Which has more components?",
      a: "Mantine lists 100+ components and 70+ hooks across its packages. Material UI's all components page lists about 57, and MUI X adds a data grid, date and time pickers, charts and a tree view.",
    },
    {
      q: "Can I keep Mantine hooks with another component library?",
      a: "Yes. `@mantine/hooks` is a separate package, so you can keep its hooks while using other components.",
    },
  ],
  sources: [
    { label: "Mantine home", url: "https://mantine.dev/" },
    { label: "Mantine getting started", url: "https://mantine.dev/getting-started/" },
    { label: "Mantine styles overview", url: "https://mantine.dev/styles/styles-overview/" },
    { label: "Mantine theme object", url: "https://mantine.dev/theming/theme-object/" },
    { label: "Mantine Transition", url: "https://mantine.dev/core/transition/" },
    { label: "Mantine with Tailwind CSS (help center)", url: "https://help.mantine.dev/q/third-party-styles" },
    { label: "Mantine with LLMs", url: "https://mantine.dev/guides/llms/" },
    { label: "Mantine about", url: "https://mantine.dev/about/" },
    { label: "Mantine UI", url: "https://ui.mantine.dev/" },
    { label: "MUI pricing", url: "https://mui.com/pricing/" },
    { label: "Material UI overview", url: "https://mui.com/material-ui/getting-started/" },
    { label: "Material UI installation", url: "https://mui.com/material-ui/getting-started/installation/" },
    { label: "Material UI all components", url: "https://mui.com/material-ui/all-components/" },
    { label: "Base UI", url: "https://base-ui.com/" },
  ],
}

export default matchup
