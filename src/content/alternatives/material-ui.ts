import type { AlternativesPage } from "../types"

const page: AlternativesPage = {
  slug: "material-ui",
  title: "Material UI alternatives: 7 options compared",
  description:
    "The best Material UI (MUI) alternatives: Ant Design, Mantine, Chakra UI, shadcn/ui, Radix Themes, HeroUI and MiniDev UI, with price, license and styling.",
  checked: "2026-09-30",
  intro:
    "The best alternative to Material UI depends on why you are leaving it. For data heavy internal tools, Ant Design is the closest match, with deep data entry components in a free MIT library. To drop CSS-in-JS but keep a complete library, Mantine ships plain CSS, 100+ components, 70+ hooks and free form and date packages. Chakra UI keeps an npm package with style props instead of Material Design, and shadcn/ui is the pick if you want Tailwind CSS and source you own.",
  items: [
    {
      id: "ant-design",
      what: "An enterprise class design language and React library from Ant Group and the Ant Design community, with about 73 components and an ecosystem that includes Ant Design Pro, ProComponents, Charts, Mobile and Ant Design X.",
      price: "Free, MIT",
      styling: "CSS-in-JS with dynamic and mixed themes, plus a Theme Editor",
      bestFor: "Data heavy internal tools that need deep data entry components such as Cascader, Transfer and TreeSelect",
    },
    {
      id: "mantine",
      what: "A fully featured React library with 100+ components, 70+ hooks and packages for forms, dates, charts and notifications.",
      price: "Free, MIT, no paid tier",
      styling: "Plain CSS files with no runtime styling cost; CSS modules, the Styles API and style props",
      bestFor: "A complete free library without CSS-in-JS, especially for forms and dates",
    },
    {
      id: "chakra-ui",
      what: "A React component system built on Ark UI in version 3, styled through style props, tokens and recipes, with CLI snippets copied into your project.",
      price: "Free, MIT; Chakra UI Pro is a paid one-time purchase",
      styling: "Its own engine, built on Emotion: style props, tokens, recipes and slot recipes",
      bestFor: "Teams that want a typed token system and style props instead of Material Design",
    },
    {
      id: "shadcn-ui",
      what: "Free React components you copy into your repo with a CLI, built on Radix UI or Base UI (the default since July 2026) and Tailwind CSS v4.",
      price: "Free, MIT",
      styling: "Tailwind CSS v4 utilities with CSS variable tokens",
      bestFor: "Moving to Tailwind CSS and owning the source of every component",
    },
    {
      id: "radix-themes",
      what: "A pre-styled React library from WorkOS with 56 components in its docs, configured with props on a `Theme` component.",
      price: "Free, MIT",
      styling: "Vanilla CSS with its own variables; colors from Radix Colors, with almost 30 scales",
      bestFor: "A coherent system you configure in one place, without CSS-in-JS or Tailwind",
    },
    {
      id: "heroui",
      what: "Previously NextUI: React components on React Aria Components and Tailwind CSS v4, installed from npm.",
      price: "Free, Apache 2.0; HeroUI Pro is paid",
      styling: "Tailwind CSS v4 with CSS variables",
      bestFor: "A versioned package like Material UI, but on Tailwind CSS and React Aria",
    },
    {
      id: "minidev-ui",
      what: "A free shadcn-compatible registry of over 500 items on Base UI, Tailwind CSS v4 and motion, with full product screens such as billing, settings, admin consoles and AI chat.",
      price: "Free, MIT, no paid tier",
      styling: "Tailwind CSS v4 utilities with semantic OKLCH tokens, copied into your repo",
      bestFor: "Tailwind teams that want finished screens they own; its data table is not a virtualized grid, so it does not replace MUI X",
    },
  ],
  body: [
    { type: "h2", text: "How to choose", id: "how-to-choose" },
    {
      type: "list",
      items: [
        "**Enterprise and admin software:** Ant Design.",
        "**A complete library without CSS-in-JS:** Mantine.",
        "**Style props and a typed theme:** Chakra UI.",
        "**Tailwind and source you own:** shadcn/ui, with MiniDev UI for finished screens.",
        "**Tailwind as a versioned package:** HeroUI.",
        "**A pre-styled system with strong color scales:** Radix Themes.",
      ],
    },
  ],
  faq: [
    {
      q: "What is the best alternative to Material UI?",
      a: "Ant Design for enterprise and admin software, Mantine for a complete free library without CSS-in-JS, and shadcn/ui if you want Tailwind CSS and source you own. All three are MIT licensed.",
    },
    {
      q: "Which Material UI alternatives do not use CSS-in-JS?",
      a: "Mantine (plain CSS files), Radix Themes (vanilla CSS), and the Tailwind based options: shadcn/ui, HeroUI and MiniDev UI. Ant Design and Chakra UI use CSS-in-JS, like Material UI.",
    },
    {
      q: "Are these alternatives free for commercial use?",
      a: "Yes. All seven can be used for free in commercial projects: six are MIT licensed and HeroUI is Apache 2.0. Chakra UI and HeroUI sell paid Pro products alongside, as Material UI does with MUI X Pro and Premium.",
    },
    {
      q: "Which alternative works most like Material UI?",
      a: "Chakra UI, Mantine and Ant Design: each is an npm package with its own theme or token system that you update with a version bump. shadcn/ui and MiniDev UI copy source into your repo instead.",
    },
    {
      q: "How is Base UI related to Material UI?",
      a: "Base UI is an unstyled component library published by the MUI organization. shadcn/ui made it the default primitive layer in July 2026, and MiniDev UI is built on it.",
    },
  ],
  sources: [
    { label: "MUI pricing", url: "https://mui.com/pricing/" },
    { label: "Material UI overview", url: "https://mui.com/material-ui/getting-started/" },
    { label: "Base UI", url: "https://base-ui.com/" },
    { label: "Ant Design home", url: "https://ant.design" },
    { label: "Ant Design components overview", url: "https://ant.design/components/overview/" },
    { label: "Mantine home", url: "https://mantine.dev/" },
    { label: "Mantine styles overview", url: "https://mantine.dev/styles/styles-overview/" },
    { label: "Chakra UI home", url: "https://chakra-ui.com/" },
    { label: "Chakra UI Pro pricing", url: "https://pro.chakra-ui.com/pricing" },
    { label: "shadcn/ui docs", url: "https://ui.shadcn.com/docs" },
    { label: "shadcn/ui changelog: Base UI as the default (July 2026)", url: "https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default" },
    { label: "Radix Themes home", url: "https://www.radix-ui.com/themes" },
    { label: "Radix Themes getting started", url: "https://www.radix-ui.com/themes/docs/overview/getting-started" },
    { label: "HeroUI home", url: "https://www.heroui.com/" },
    { label: "HeroUI Pro", url: "https://heroui.pro/" },
  ],
}

export default page
