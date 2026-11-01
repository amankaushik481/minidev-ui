import type { Matchup } from "../types"

const matchup: Matchup = {
  slug: "heroui-vs-shadcn-ui",
  title: "HeroUI (NextUI) vs shadcn/ui: which to use?",
  description:
    "HeroUI (formerly NextUI) vs shadcn/ui: a React Aria npm package for Tailwind v4 against source you copy into your repo. Compare install, theming and paid tiers.",
  a: "heroui",
  b: "shadcn-ui",
  checked: "2026-09-30",
  verdict:
    "Both are free, open source React libraries for Tailwind CSS v4 (HeroUI under Apache 2.0, shadcn/ui under MIT), so the real difference is how the code reaches you. HeroUI is an npm package built on React Aria Components that you update with a version bump. shadcn/ui copies component source into your repo, where you own and edit it.",
  pickA:
    "you want a maintained package with a finished look, React Aria accessibility (including date, time and color fields), or a React Native sibling in HeroUI Native.",
  pickB:
    "you want every component as editable source, a choice of Radix UI or Base UI underneath, and access to the shadcn registry ecosystem.",
  rows: [
    {
      feature: "Price",
      a: "Free; HeroUI Pro (extra components, blocks, templates and design systems) is paid",
      b: "Free",
    },
    { feature: "License", a: "Apache 2.0 for the open source library (version 3; version 2 was MIT); HeroUI Pro is sold under its own license terms", b: "MIT" },
    {
      feature: "Install model",
      a: "npm: `npm i @heroui/styles @heroui/react`, then `@import \"@heroui/styles\";` after Tailwind in your CSS",
      b: "Source copied into your project with `npx shadcn@latest add <name>`",
    },
    {
      feature: "Primitives",
      a: "React Aria Components from Adobe",
      b: "Radix UI or Base UI; Base UI became the default in the July 2026 changelog",
    },
    { feature: "Requirements", a: "Tailwind CSS v4 and React 19", b: "Tailwind CSS v4, with legacy docs for v3" },
    {
      feature: "Styling",
      a: "CSS in `@heroui/styles` using BEM classes, customized with Tailwind utilities and CSS variables",
      b: "Tailwind utilities in your own files, with CSS variable tokens",
    },
    {
      feature: "Theming",
      a: "OKLCH CSS variables in background and `-foreground` pairs; several prebuilt themes",
      b: "CSS variable tokens (background, foreground, primary and so on) with theme presets",
    },
    {
      feature: "Dark mode",
      a: "Set `class=\"dark\"` or `data-theme=\"dark\"` on the html element; next-themes suggested for Next.js",
      b: "Yes",
    },
    {
      feature: "Blocks and templates",
      a: "Full-page templates (dashboards, CRM, mail, chat, finance) and installable blocks in HeroUI Pro (paid)",
      b: "Blocks for dashboards, sidebars, login and more, for Radix and Base UI; no official full-site templates",
    },
    {
      feature: "AI tooling",
      a: "`llms.txt`, the `@heroui/react-mcp` MCP server and agent skills; HeroUI Pro adds its own",
      b: "`llms.txt` and an official MCP server for browsing and installing from registries",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[HeroUI](https://www.heroui.com) is the library previously known as NextUI. Version 3 combines React Aria Components for behavior and accessibility with Tailwind CSS v4 for styling. You install `@heroui/react` and `@heroui/styles` from npm, import the styles after Tailwind, and use components with a compound API such as `Card.Header` and `Card.Content`, with no provider wrapper required. The open source library is MIT; HeroUI Pro sells more components, blocks, full-page templates and design systems, and HeroUI Native covers React Native.",
    },
    {
      type: "p",
      text: "[shadcn/ui](https://ui.shadcn.com) takes the opposite delivery model: its CLI copies component source into your project, where you own and edit it. It ships a core set of accessible components, charts and blocks for Tailwind CSS v4, runs on Radix UI or Base UI (Base UI is the default since July 2026), and defines the registry format that other component libraries publish into.",
    },
    { type: "h2", text: "Where HeroUI shines", id: "where-heroui-shines" },
    {
      type: "list",
      items: [
        "**Accessibility depth.** React Aria is one of the most thorough accessibility foundations in React, with careful keyboard, focus and screen reader behavior, including for date, time and color fields.",
        "**A versioned package.** Fixes reach your app with a version bump instead of a manual merge.",
        "**Web and native.** HeroUI Native gives React Native projects a related component set, which helps teams shipping both.",
        "**A finished default look.** Components look complete out of the box, and several prebuilt themes are available.",
        "**AI support.** An official MCP server, `llms.txt` indexes and agent skills help coding assistants use the library.",
      ],
    },
    { type: "h2", text: "Where shadcn/ui shines", id: "where-shadcn-ui-shines" },
    {
      type: "list",
      items: [
        "**You own the code.** Changing markup or behavior is an edit in your repo, not an override.",
        "**Primitive choice.** A project can run on Radix UI or Base UI.",
        "**The registry.** Community registries and the official MCP server work through the same CLI, so you can pull components from many sources.",
        "**Free blocks.** Blocks for dashboards, sidebars and login pages are part of the free library.",
        "**Older projects.** The docs keep a legacy track for Tailwind CSS v3, while HeroUI v3 requires Tailwind v4 and React 19.",
      ],
    },
    { type: "h2", text: "The trade-offs", id: "the-trade-offs" },
    {
      type: "list",
      items: [
        "**Updates or control.** HeroUI fixes arrive through npm. shadcn/ui code lives in your repo, so changes are yours to make, and so is pulling in upstream fixes.",
        "**API conventions.** HeroUI follows React Aria conventions, such as `onPress` on buttons, and uses compound components like `Card.Header`. Expect to adjust props and imports when you move screens between the two.",
        "**Paid extras.** HeroUI Pro sells more components, blocks, full-page templates and design systems. shadcn/ui is free, blocks included.",
        "**Shared variable names.** Both themes use an `--accent` CSS variable. If you run both in one project, whichever stylesheet loads later wins for that name, so check light and dark mode.",
      ],
    },
  ],
  minidev: [
    "MiniDev UI follows the shadcn/ui model: a free, MIT shadcn-compatible registry on Base UI and Tailwind CSS v4 that copies source into your repo. If you prefer that model but want the kind of full pages HeroUI sells in Pro, such as dashboards and chat, MiniDev UI includes billing, settings, sign in, admin and chat pages and motion components at no cost.",
    "If React Aria and a package you update with a version bump are what you want, HeroUI remains the better fit. See [MiniDev UI vs HeroUI](/compare/minidev-ui-vs-heroui) and [MiniDev UI vs shadcn/ui](/compare/minidev-ui-vs-shadcn-ui).",
  ],
  faq: [
    {
      q: "Is HeroUI the same as NextUI?",
      a: "Yes. HeroUI is the new name for NextUI. Its current major version, HeroUI v3, is built on React Aria Components and Tailwind CSS v4.",
    },
    {
      q: "Can I copy HeroUI components into my repo like shadcn/ui?",
      a: "Not in the same way. HeroUI is installed as npm packages, so its source stays in `node_modules` and you customize it through classes and CSS variables. shadcn/ui copies the source into your project.",
    },
    {
      q: "Are HeroUI and shadcn/ui free?",
      a: "Yes. HeroUI is Apache 2.0 licensed and shadcn/ui is MIT licensed, and both allow commercial use. HeroUI Pro, which adds components, blocks, templates and design systems, is paid.",
    },
    {
      q: "Which is better for accessibility?",
      a: "Both build on accessible headless primitives: HeroUI on React Aria, shadcn/ui on Base UI or Radix UI. React Aria is especially strong for complex inputs such as date, time and color fields. Test the screens you ship either way.",
    },
    {
      q: "Does either support React Native?",
      a: "HeroUI does, through a separate library called HeroUI Native, which gives React Native projects a related component set.",
    },
  ],
  sources: [
    { label: "HeroUI home", url: "https://www.heroui.com/" },
    { label: "HeroUI license (version 3, Apache 2.0, checked November 1, 2026)", url: "https://github.com/heroui-inc/heroui/blob/v3/LICENSE" },
    { label: "HeroUI quick start", url: "https://www.heroui.com/docs/react/getting-started/quick-start" },
    { label: "HeroUI theming", url: "https://www.heroui.com/docs/react/getting-started/theming" },
    { label: "HeroUI MCP server", url: "https://www.heroui.com/docs/react/getting-started/mcp-server" },
    { label: "HeroUI Pro", url: "https://heroui.pro/" },
    { label: "shadcn/ui docs", url: "https://ui.shadcn.com/docs" },
    { label: "shadcn/ui changelog: Base UI as the default (July 2026)", url: "https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default" },
    { label: "shadcn/ui changelog: Blocks for Radix and Base UI (February 2026)", url: "https://ui.shadcn.com/docs/changelog/2026-02-blocks" },
    { label: "shadcn/ui Tailwind v4 docs", url: "https://ui.shadcn.com/docs/tailwind-v4" },
    { label: "shadcn/ui MCP server", url: "https://ui.shadcn.com/docs/registry/mcp" },
  ],
}

export default matchup
