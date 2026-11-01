import type { Matchup } from "../types"

const matchup: Matchup = {
  slug: "chakra-ui-vs-material-ui",
  title: "Chakra UI vs Material UI (MUI): which to use?",
  description:
    "Chakra UI vs Material UI (MUI): style props on Ark UI against Material Design with paid MUI X. Both are MIT npm libraries on Emotion; compare theming and scope.",
  a: "chakra-ui",
  b: "material-ui",
  checked: "2026-09-30",
  verdict:
    "Both are MIT licensed React libraries installed from npm, and both style through Emotion, so the difference is the API and the design. Chakra UI v3 is built around style props, a typed token config and Ark UI. Material UI implements Google's Material Design and adds MUI X for heavy data components.",
  pickA: "you want typed style props, tokens and recipes in one config, and you do not need Material Design.",
  pickB:
    "you want Material Design, or you need MUI X for a data grid with row grouping, aggregation and pivoting, date and time pickers, charts and a tree view.",
  rows: [
    {
      feature: "Price",
      a: "Free library; Chakra UI Pro blocks and templates are a paid one-time purchase",
      b: "Free; MUI X Pro is $299 and Premium $599 per developer per year, Enterprise $1,399 per developer per year",
    },
    {
      feature: "License",
      a: "MIT; Chakra UI Pro has its own terms",
      b: "MIT for Material UI and MUI X Community; commercial license for MUI X Pro and Premium",
    },
    {
      feature: "Install",
      a: "`npm i @chakra-ui/react @emotion/react`, snippets with `npx @chakra-ui/cli snippet add`, and the generated `Provider` at the root",
      b: "`npm install @mui/material @emotion/react @emotion/styled`",
    },
    {
      feature: "Styling",
      a: "Its own engine, built on Emotion: style props, tokens, recipes and slot recipes",
      b: "Emotion (CSS-in-JS) by default; styled-components is supported, but the docs say it is not compatible with server rendered projects",
    },
    {
      feature: "Theming",
      a: "`defineConfig` and `createSystem` with tokens and semantic tokens output as CSS variables; `typegen` for typed theme APIs",
      b: "A JavaScript theme object for Material Design; the docs state support for Material Design 2",
    },
    { feature: "Primitives", a: "Ark UI, built on Zag.js state machines", b: "Its own internals; the MUI organization also publishes the unstyled Base UI" },
    {
      feature: "Scope",
      a: "A broad set of accessible React components, plus CLI snippets copied into `components/ui`",
      b: "About 57 components, plus Lab (Masonry, Timeline) and MUI X (Data Grid, Date and Time Pickers, Charts, Tree View)",
    },
    {
      feature: "Blocks and templates",
      a: "Chakra UI Pro blocks for application, marketing and e-commerce, and templates; a small set of free blocks",
      b: "A templates page that links to the MUI Store, plus design kits for design tools",
    },
    {
      feature: "Animation",
      a: "CSS animations keyed to `data-state`, through `_open` and `_closed` style props",
      b: "Transition utilities ship with the core library",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Chakra UI](https://chakra-ui.com) is one of the best known React component systems. Version 3 rebuilt it on [Ark UI](https://ark-ui.com), which uses Zag.js state machines for behavior, and styles components with Chakra's own engine, built on Emotion: you pass style props such as `px` and `bg`, define tokens and semantic tokens with `defineConfig` and `createSystem`, and describe variants with recipes. The library is MIT, and Chakra UI Pro sells premium blocks and templates as a one-time purchase.",
    },
    {
      type: "p",
      text: "[Material UI](https://mui.com) implements Google's Material Design in React. You install `@mui/material` with Emotion, its default styling engine, and theme it through a JavaScript theme object. The core is MIT and free, with about 57 components on its all components page, and MUI X sells a data grid, date and time pickers, charts and a tree view in Pro and Premium tiers above a free MIT Community tier.",
    },
    { type: "h2", text: "Where Chakra UI shines", id: "where-chakra-ui-shines" },
    {
      type: "list",
      items: [
        "**Style props.** Many developers find it fast to style directly on components with typed props, including responsive values and pseudo props like `_hover`.",
        "**A typed design system.** Tokens, semantic tokens and recipes live in one config, and the `typegen` command keeps autocomplete in sync with the theme.",
        "**Ark UI underneath.** Zag.js state machines give consistent, accessible behavior for complex components.",
        "**Snippets.** The CLI copies ready compositions into `components/ui`, so common patterns start as code you can edit.",
        "**AI support.** An official MCP server, `llms.txt`, AI rules and skills help coding assistants use the library.",
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
        "**Design kits and templates.** Design kits for design tools and a curated templates page that links to the MUI Store.",
      ],
    },
    { type: "h2", text: "The trade-offs", id: "the-trade-offs" },
    {
      type: "list",
      items: [
        "**Same engine, different APIs.** Material UI's default engine is Emotion and Chakra UI's engine is built on it, so neither saves you a CSS-in-JS runtime. The difference is how you write styles: typed style props and recipes in Chakra UI, a theme object and Material components in Material UI.",
        "**Paid tiers sell different things.** Chakra UI Pro is a one-time purchase for blocks and templates. MUI X Pro and Premium are yearly, per developer licenses for advanced components.",
        "**Design.** Material UI's defaults follow Material Design. In Chakra UI, the look is shaped by the tokens, semantic tokens and recipes in your config.",
        "**Upgrading Chakra.** Version 3 rebuilt Chakra UI on Ark UI, and its MCP server includes a v2 to v3 review tool, which helps if you are on an older codebase.",
      ],
    },
  ],
  minidev: [
    "MiniDev UI is neither a style prop system nor a Material Design library. It is a free, MIT licensed shadcn-compatible registry on Base UI and Tailwind CSS v4 that copies source into your repo. If you are choosing between these two because you want a complete, themed package without Tailwind, MiniDev UI is probably not your pick.",
    "If you are open to Tailwind and want finished product screens you can edit, such as billing, settings and admin pages, compare it with [Chakra UI](/compare/minidev-ui-vs-chakra-ui) and with [Material UI](/compare/minidev-ui-vs-material-ui).",
  ],
  faq: [
    {
      q: "Do Chakra UI and Material UI both use Emotion?",
      a: "Yes. Material UI uses Emotion as its default styling engine, and Chakra UI's own styling engine is built on Emotion. Neither uses Tailwind CSS.",
    },
    {
      q: "How do you theme each one?",
      a: "Chakra UI uses `defineConfig` and `createSystem` with tokens and semantic tokens output as CSS variables, plus a `typegen` command for typed theme APIs. Material UI uses a JavaScript theme object.",
    },
    {
      q: "Are Chakra UI and Material UI free?",
      a: "Yes, both libraries are MIT licensed and free. Chakra UI Pro (blocks and templates, a one-time purchase) and MUI X Pro and Premium (advanced components, per developer per year) are paid.",
    },
    {
      q: "Which is better for complex data grids?",
      a: "Material UI, through MUI X: its data grid covers row grouping, aggregation and pivoting, sold per developer. Chakra UI focuses on accessible core components and style props.",
    },
    {
      q: "What primitives do they use?",
      a: "Chakra UI v3 is built on Ark UI, which uses Zag.js state machines. Material UI uses its own internals; the MUI organization separately publishes Base UI, an unstyled library.",
    },
  ],
  sources: [
    { label: "Chakra UI home", url: "https://chakra-ui.com/" },
    { label: "Chakra UI installation", url: "https://chakra-ui.com/docs/get-started/installation" },
    { label: "Chakra UI CLI", url: "https://chakra-ui.com/docs/get-started/cli" },
    { label: "Chakra UI theming overview", url: "https://chakra-ui.com/docs/theming/overview" },
    { label: "Chakra UI animation", url: "https://chakra-ui.com/docs/components/concepts/animation" },
    { label: "Chakra UI MCP server", url: "https://chakra-ui.com/docs/get-started/ai/mcp-server" },
    { label: "Chakra UI Pro pricing", url: "https://pro.chakra-ui.com/pricing" },
    { label: "MUI pricing", url: "https://mui.com/pricing/" },
    { label: "Material UI overview", url: "https://mui.com/material-ui/getting-started/" },
    { label: "Material UI installation", url: "https://mui.com/material-ui/getting-started/installation/" },
    { label: "Material UI all components", url: "https://mui.com/material-ui/all-components/" },
    { label: "MUI templates", url: "https://mui.com/templates/" },
    { label: "Base UI", url: "https://base-ui.com/" },
  ],
}

export default matchup
