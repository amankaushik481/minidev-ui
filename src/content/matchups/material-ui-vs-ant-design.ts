import type { Matchup } from "../types"

const matchup: Matchup = {
  slug: "material-ui-vs-ant-design",
  title: "Material UI (MUI) vs Ant Design: which to use?",
  description:
    "Material UI vs Ant Design (antd): two MIT React libraries from npm. Material Design on Emotion with paid MUI X, or an enterprise system themed with CSS-in-JS.",
  a: "material-ui",
  b: "ant-design",
  checked: "2026-10-15",
  verdict:
    "Both are MIT licensed React libraries you install from npm and theme with CSS-in-JS, so the choice comes down to design language and the kind of software you build. Material UI implements Google's Material Design. Ant Design is an enterprise design language with unusually deep data entry components.",
  pickA:
    "you want Material Design, or you need MUI X for a data grid with row grouping, aggregation and pivoting, date and time pickers, charts and a tree view.",
  pickB:
    "you build dense internal tools and admin software, where Cascader, Transfer, TreeSelect and Upload, plus Ant Design Pro and ProComponents, do much of the work.",
  rows: [
    {
      feature: "Price",
      a: "Free; MUI X Pro is $299 and Premium $599 per developer per year, Enterprise $1,399 per developer per year",
      b: "Free; the library is open source",
    },
    { feature: "License", a: "MIT for Material UI and MUI X Community; commercial license for MUI X Pro and Premium", b: "MIT" },
    { feature: "Install", a: "`npm install @mui/material @emotion/react @emotion/styled`", b: "`npm install antd`" },
    {
      feature: "Styling",
      a: "Emotion (CSS-in-JS) by default, themed through a JavaScript theme object",
      b: "CSS-in-JS for dynamic and mixed themes, with a Theme Editor on the site",
    },
    {
      feature: "Design language",
      a: "Google's Material Design; the docs state support for Material Design 2",
      b: "Ant Design's enterprise design language, with published design guidelines",
    },
    {
      feature: "Scope",
      a: "About 57 components, plus Lab (Masonry, Timeline) and MUI X (Data Grid, Date and Time Pickers, Charts, Tree View)",
      b: "About 73 components across General, Layout, Navigation, Data Entry, Data Display, Feedback and Other",
    },
    {
      feature: "Ecosystem",
      a: "MUI X, the unstyled Base UI, a curated templates page linking to the MUI Store, and design kits",
      b: "Ant Design Pro, ProComponents, Ant Design Charts, Ant Design Mobile, Ant Design Mini, Ant Design Web3 and Ant Design X",
    },
    {
      feature: "Frameworks",
      a: "React, with `^17.0.0 || ^18.0.0 || ^19.0.0` as peer dependencies",
      b: "React, written in TypeScript; the home page also lists Angular and Vue versions",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Material UI](https://mui.com) is an open source React library that implements Google's Material Design. You install `@mui/material` from npm with Emotion, the default styling engine, and theme it through a JavaScript theme object. The core library is MIT and free, and its all components page lists about 57 components plus Lab and MUI X. MUI X adds a data grid, date and time pickers, charts and a tree view, with a free MIT Community tier and paid Pro and Premium tiers. The same organization publishes [Base UI](https://base-ui.com), an unstyled component library.",
    },
    {
      type: "p",
      text: "[Ant Design](https://ant.design) is an enterprise class UI design language and React library from Ant Group and the Ant Design community. You install `antd` from npm; theming is done with CSS-in-JS, and the site offers a Theme Editor. The components overview lists about 73 components, with deep data entry pieces such as Cascader, Transfer, TreeSelect, Mentions and Upload, and the ecosystem adds Ant Design Pro, ProComponents, Charts, Mobile and Ant Design X. It is MIT licensed, and it was at version 6.6.6 when we checked.",
    },
    { type: "h2", text: "Where Material UI shines", id: "where-material-ui-shines" },
    {
      type: "list",
      items: [
        "**Material Design.** It is the direct implementation of Google's guidelines, which helps when the design team works from them.",
        "**MUI X.** A data grid with row grouping, aggregation and pivoting, plus date and time pickers, charts and a tree view, with paid tiers sold per developer.",
        "**A long track record.** The library has years of history, and updates arrive through npm.",
        "**Wide React support.** The peer dependencies accept React 17, 18 and 19.",
        "**An unstyled sibling.** The MUI organization also publishes Base UI, for teams that want the behavior without Material styling.",
      ],
    },
    { type: "h2", text: "Where Ant Design shines", id: "where-ant-design-shines" },
    {
      type: "list",
      items: [
        "**Data entry depth.** Cascader, Transfer, TreeSelect, Mentions and Upload are part of the free library and are made for dense enterprise screens.",
        "**Scaffolding.** Ant Design Pro and ProComponents add structure on top of the components for internal tools and admin software.",
        "**A wide ecosystem.** Related libraries include Ant Design Charts, Mobile, Mini, Web3 and Ant Design X for AI interfaces.",
        "**Theme Editor.** CSS-in-JS theming supports dynamic and mixed themes, and the site offers a Theme Editor.",
        "**Docs for coding agents.** The home page links to a docs page written for coding agents.",
      ],
    },
    { type: "h2", text: "The trade-offs", id: "the-trade-offs" },
    {
      type: "list",
      items: [
        "**Where the advanced parts live.** Ant Design's deep data entry components are in the free MIT library. Material UI's core is free too, but its most advanced data components are in MUI X, with Pro and Premium tiers priced per developer per year.",
        "**Design language.** Both ship a complete visual language, so your product will look like Material Design or like Ant Design until you theme it. Pick the one closer to where your design is going.",
        "**Upgrades.** Both update through npm. Ant Design moves through major versions with their own styling changes, so read its changelog before upgrading an older antd codebase.",
        "**Framework reach.** Material UI is a React library. Ant Design's home page also lists Angular and Vue versions, which matters for organizations with more than one frontend stack.",
      ],
    },
  ],
  minidev: [
    "MiniDev UI takes a different route from both: a free, MIT licensed shadcn-compatible registry that copies source into your repo, styled with Tailwind CSS v4 instead of CSS-in-JS and built on Base UI, the unstyled library from the MUI organization. It fits teams that want to own the code and start from finished product and marketing screens, such as an admin console, a users table and analytics and settings pages.",
    "It is not a replacement for MUI X's data grid or for Ant Design's deepest data entry components; for large internal systems those two remain the stronger tools. See [MiniDev UI vs Material UI](/compare/minidev-ui-vs-material-ui) and [MiniDev UI vs Ant Design](/compare/minidev-ui-vs-ant-design).",
  ],
  faq: [
    {
      q: "Is Ant Design or Material UI better for admin dashboards?",
      a: "Ant Design leans further toward dense internal tools: its free library includes deep data entry components such as Cascader, Transfer and TreeSelect, and Ant Design Pro adds a scaffold. Material UI is the better pick when you need MUI X's data grid features or Material Design.",
    },
    {
      q: "Are Material UI and Ant Design free for commercial use?",
      a: "Yes. Both are published under the MIT license. Material UI's companion MUI X adds paid Pro and Premium tiers under a commercial license; its Community tier is MIT.",
    },
    {
      q: "Do Material UI or Ant Design use Tailwind CSS?",
      a: "No. Material UI uses Emotion by default, and Ant Design uses its own CSS-in-JS, themed through its token system and Theme Editor.",
    },
    {
      q: "How many components does each one have?",
      a: "Material UI's all components page lists about 57, plus Lab and MUI X. Ant Design's components overview lists about 73 across seven groups.",
    },
    {
      q: "Is there an Angular or Vue version?",
      a: "Ant Design's home page lists Angular and Vue versions under its component libraries. Material UI is a React library.",
    },
  ],
  sources: [
    { label: "MUI home", url: "https://mui.com" },
    { label: "MUI pricing", url: "https://mui.com/pricing/" },
    { label: "Material UI overview", url: "https://mui.com/material-ui/getting-started/" },
    { label: "Material UI installation", url: "https://mui.com/material-ui/getting-started/installation/" },
    { label: "Material UI all components", url: "https://mui.com/material-ui/all-components/" },
    { label: "MUI templates", url: "https://mui.com/templates/" },
    { label: "Base UI", url: "https://base-ui.com/" },
    { label: "Ant Design home", url: "https://ant.design" },
    { label: "Ant Design introduction", url: "https://ant.design/docs/react/introduce" },
    { label: "Ant Design components overview", url: "https://ant.design/components/overview/" },
    { label: "Ant Design changelog", url: "https://ant.design/changelog" },
    { label: "Ant Design license", url: "https://github.com/ant-design/ant-design/blob/master/LICENSE" },
  ],
}

export default matchup
