import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-ant-design",
  other: "Ant Design",
  otherUrl: "https://ant.design",
  title: "MiniDev UI vs Ant Design: which should you use?",
  description:
    "MiniDev UI vs Ant Design (antd): a free shadcn-compatible Tailwind v4 registry on Base UI compared with the enterprise React library that themes with CSS-in-JS.",
  checked: "2026-10-15",
  summary:
    "Ant Design is an enterprise class UI design language and React library from Ant Group and the Ant Design community, installed from npm as `antd`, MIT licensed, with about 73 components, CSS-in-JS theming and a wide ecosystem (Ant Design Pro, ProComponents, Charts, Mobile, Ant Design X). MiniDev UI is a free, MIT, shadcn-compatible registry of 548 items built on Base UI, Tailwind CSS v4 and motion that copies source into your repo. Pick Ant Design for data heavy internal tools where its tables, forms, trees and transfer lists do most of the work and a versioned package suits the team. Pick MiniDev UI if you build in Tailwind, want to own the component code, and want finished product and marketing screens drawn to one visual system.",
  rows: [
    { feature: "Price", minidev: "Free, everything", other: "Free; the library is open source" },
    { feature: "License", minidev: "MIT", other: "MIT (LICENSE file in the GitHub repository)" },
    {
      feature: "Scope",
      minidev: "548 items: 397 UI components, 108 motion components, 43 blocks and pages",
      other: "About 73 components across General, Layout, Navigation, Data Entry, Data Display, Feedback and Other on the components overview",
    },
    {
      feature: "Install model",
      minidev: "Source copied into your repo with `npx shadcn@latest add @minidev/<name>`, or npm `minidev-ui-kit`",
      other: "npm package: `npm install antd`",
    },
    {
      feature: "Styling",
      minidev: "Tailwind CSS v4 utilities with semantic OKLCH tokens",
      other: "CSS-in-JS; the site says it uses CSS-in-JS technology to provide dynamic and mixed themes, with a Theme Editor",
    },
    {
      feature: "Design language",
      minidev: "Its own system with materials (hairline, glass, metal, paper) and one light source for shadows",
      other: "Ant Design's enterprise design language, with published design guidelines",
    },
    {
      feature: "Frameworks",
      minidev: "React, with install guides for Next.js, Vite, Astro, React Router and TanStack Start",
      other: "React, written in TypeScript; the home page also lists Angular and Vue versions under its component libraries",
    },
    {
      feature: "Ecosystem",
      minidev: "15 block types, 8 landing page templates and 19 free design tools on the same site",
      other: "Ant Design Pro, ProComponents, Ant Design Charts, Ant Design Mobile, Ant Design Mini, Ant Design Web3 and Ant Design X",
    },
    {
      feature: "AI tooling",
      minidev: "`llms.txt` and `llms-full.txt`; works with the shadcn MCP server as a registry",
      other: "A docs page written for coding agents, linked from the home page",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Ant Design](https://ant.design) is an enterprise class UI design language and React UI library made by Ant Group and the Ant Design community. You install `antd` from npm; theming is done with CSS-in-JS, and the site offers a Theme Editor. The components overview lists about 73 components, with unusually deep data entry pieces such as Cascader, Transfer, TreeSelect, Mentions and Upload, and the ecosystem adds Ant Design Pro, ProComponents, Charts, Mobile and Ant Design X. It is MIT licensed and free, and version 6 was current when we checked. MiniDev UI is a free, MIT licensed shadcn-compatible registry of 548 items: 397 UI components, 108 motion components and 43 blocks and pages, built on Base UI, Tailwind CSS v4 and motion. You add items with the shadcn CLI and the source lands in your repo, or you install the kit from npm as `minidev-ui-kit`.",
    },
    { type: "h2", text: "Where each one is the better pick", id: "where-each-one-is-the-better-pick" },
    {
      type: "list",
      items: [
        "**Pick Ant Design for internal tools and admin software.** Its forms, tables, trees, transfer lists and cascaders are made for dense enterprise screens, and ProComponents and Ant Design Pro add scaffolding on top.",
        "**Pick Ant Design for a versioned package with a large ecosystem.** Updates arrive through npm, the documentation is extensive, and there are related libraries for charts, mobile and AI interfaces.",
        "**Pick MiniDev UI if you build in Tailwind and want to own the code.** Each item is a file in your repo styled with utilities and semantic tokens, with no CSS-in-JS runtime.",
        "**Pick MiniDev UI for product and marketing surfaces together.** Billing, settings, sign in and analytics pages sit next to heroes, pricing sections and 108 motion components, so a SaaS app and its marketing site can share one token set.",
        "**Mixing them takes care.** Both are React, but Ant Design's CSS-in-JS and MiniDev's Tailwind tokens are separate systems. If you combine them, keep each to its own routes and check both light and dark mode.",
      ],
    },
    { type: "component", name: "data-table" },
    {
      type: "callout",
      tone: "note",
      text: "Ant Design moves through major versions with their own styling changes; it was at version 6.6.6 when we checked, so read its [changelog](https://ant.design/changelog) before upgrading an older antd codebase. MiniDev UI items are plain files in your repo, so an upgrade is a diff you review.",
    },
  ],
  faq: [
    {
      q: "Is Ant Design free for commercial use?",
      a: "Yes. Ant Design is published under the MIT license, so it can be used in commercial products. MiniDev UI is also MIT.",
    },
    {
      q: "Does Ant Design use Tailwind CSS?",
      a: "No. Ant Design styles its components with CSS-in-JS and themes them through its token system and Theme Editor. MiniDev UI is built for Tailwind CSS v4.",
    },
    {
      q: "Which is better for admin dashboards?",
      a: "Ant Design has deeper data entry and data display components and the Ant Design Pro scaffold, which suits large internal systems. MiniDev UI offers an admin console, users table, analytics and settings pages as ready blocks and is the lighter choice when you want Tailwind and your own look.",
    },
  ],
  sources: [
    { label: "Ant Design home", url: "https://ant.design" },
    { label: "Ant Design introduction", url: "https://ant.design/docs/react/introduce" },
    { label: "Ant Design components overview", url: "https://ant.design/components/overview/" },
    { label: "Ant Design FAQ", url: "https://ant.design/docs/react/faq" },
    { label: "ant-design/ant-design on GitHub", url: "https://github.com/ant-design/ant-design" },
    { label: "Ant Design license", url: "https://github.com/ant-design/ant-design/blob/master/LICENSE" },
  ],
}

export default comparison
