import type { AlternativesPage } from "../types"

const page: AlternativesPage = {
  slug: "chakra-ui",
  title: "Chakra UI alternatives: 8 options compared",
  description:
    "The best Chakra UI alternatives: Mantine, Park UI, Material UI, shadcn/ui, Radix Themes, HeroUI, Ant Design and MiniDev UI, with price, license and styling.",
  checked: "2026-09-30",
  intro:
    "The best alternative to Chakra UI depends on whether you want to keep its way of working. Mantine is the closest overall: a complete, free library that also offers style props, with plain CSS instead of a runtime styling engine. Park UI keeps Chakra v3's Ark UI foundation but gives you the source, styled with Panda CSS. To move to Tailwind CSS, shadcn/ui and HeroUI are the main options, and Material UI fits if you need Material Design or MUI X.",
  items: [
    {
      id: "mantine",
      what: "A fully featured React library: 100+ components, 70+ hooks and packages for forms, dates and charts, with style props among its customization options.",
      price: "Free, MIT, no paid tier",
      styling: "Plain CSS files; CSS modules, the Styles API and style props",
      bestFor: "Keeping a complete npm library with style props while dropping the runtime styling engine",
    },
    {
      id: "park-ui",
      what: "A components system built on Ark UI, the same headless library as Chakra UI v3, styled with Panda CSS and distributed as source through `@park-ui/cli`. It joined the Chakra UI organization on GitHub in November 2025.",
      price: "Free, MIT",
      styling: "Panda CSS, extending the default Panda preset",
      bestFor: "Keeping Ark UI behavior while owning the component source, in React or Solid",
    },
    {
      id: "material-ui",
      what: "The React implementation of Google's Material Design, installed from npm, with MUI X for a data grid, date and time pickers, charts and a tree view.",
      price: "Free, MIT; MUI X Pro $299 and Premium $599 per developer per year",
      styling: "Emotion (CSS-in-JS) by default, themed with a JavaScript theme object",
      bestFor: "Material Design, or MUI X's data grid with row grouping, aggregation and pivoting",
    },
    {
      id: "shadcn-ui",
      what: "Free React components you copy into your repo with a CLI, on Radix UI or Base UI and Tailwind CSS v4.",
      price: "Free, MIT",
      styling: "Tailwind CSS v4 utilities with CSS variable tokens",
      bestFor: "Moving to Tailwind CSS with source you own; style props become utility classes",
    },
    {
      id: "radix-themes",
      what: "A pre-styled React library from WorkOS, configured with accent color, gray color, radius and scaling props on a `Theme` component.",
      price: "Free, MIT",
      styling: "Vanilla CSS with its own CSS variables and no built in styling system",
      bestFor: "A pre-styled system you configure with a few props",
    },
    {
      id: "heroui",
      what: "Previously NextUI: React components on React Aria Components and Tailwind CSS v4, installed from npm, with no provider wrapper required.",
      price: "Free, Apache 2.0; HeroUI Pro is paid",
      styling: "Tailwind CSS v4 with CSS variables and BEM classes from `@heroui/styles`",
      bestFor: "Tailwind CSS v4 in an npm package, with React Aria accessibility",
    },
    {
      id: "ant-design",
      what: "An enterprise class design language and React library from Ant Group and the Ant Design community, with about 73 components.",
      price: "Free, MIT",
      styling: "CSS-in-JS with dynamic and mixed themes, plus a Theme Editor",
      bestFor: "Enterprise and admin apps with dense forms, trees and tables",
    },
    {
      id: "minidev-ui",
      what: "A free shadcn-compatible registry of over 500 items on Base UI, Tailwind CSS v4 and motion, with full-page blocks such as billing, settings and admin consoles.",
      price: "Free, MIT, no paid tier",
      styling: "Tailwind CSS v4 utilities with semantic OKLCH tokens",
      bestFor: "Tailwind projects that want product screens and full pages for free; not a fit if your team wants to keep style props",
    },
  ],
  body: [
    { type: "h2", text: "How to choose", id: "how-to-choose" },
    {
      type: "list",
      items: [
        "**Keep a complete npm library:** Mantine, or Material UI if you want Material Design.",
        "**Keep Ark UI:** Park UI.",
        "**Move to Tailwind CSS:** shadcn/ui for source you own, HeroUI for a package, MiniDev UI for finished screens.",
        "**Enterprise screens:** Ant Design.",
        "**A pre-styled system without a styling engine:** Radix Themes.",
      ],
    },
  ],
  faq: [
    {
      q: "What is the best alternative to Chakra UI?",
      a: "Mantine is the closest overall: it also offers style props, ships 100+ components and 70+ hooks, and styles with plain CSS instead of a runtime engine, all free under MIT.",
    },
    {
      q: "Is Park UI related to Chakra UI?",
      a: "Yes. Park UI is built on Ark UI, the same headless library Chakra UI v3 uses, and it joined the Chakra UI organization on GitHub in November 2025. It styles components with Panda CSS and distributes them as source.",
    },
    {
      q: "Which Chakra UI alternatives use Tailwind CSS?",
      a: "shadcn/ui, HeroUI and MiniDev UI are built for Tailwind CSS v4. Mantine, Park UI, Material UI, Radix Themes and Ant Design do not use Tailwind.",
    },
    {
      q: "Is there a free alternative to Chakra UI Pro blocks?",
      a: "Yes. Mantine UI offers 123 free MIT prebuilt components, shadcn/ui includes free blocks for dashboards, sidebars and login, and MiniDev UI's full-page blocks are free under MIT.",
    },
    {
      q: "Do I have to rewrite my styles to leave Chakra UI?",
      a: "For the Tailwind based options, yes: style props become utility classes, for example `px={4}` becomes `px-4`, and recipe variants map to component variants. Mantine also has style props, though with its own API.",
    },
  ],
  sources: [
    { label: "Chakra UI home", url: "https://chakra-ui.com/" },
    { label: "Chakra UI Pro pricing", url: "https://pro.chakra-ui.com/pricing" },
    { label: "Mantine home", url: "https://mantine.dev/" },
    { label: "Mantine styles overview", url: "https://mantine.dev/styles/styles-overview/" },
    { label: "Mantine UI", url: "https://ui.mantine.dev/" },
    { label: "Park UI home", url: "https://park-ui.com" },
    { label: "Park UI introduction", url: "https://park-ui.com/docs/introduction" },
    { label: "Park UI blog: joining the Chakra UI organization", url: "https://park-ui.com/blog" },
    { label: "Material UI overview", url: "https://mui.com/material-ui/getting-started/" },
    { label: "MUI pricing", url: "https://mui.com/pricing/" },
    { label: "shadcn/ui docs", url: "https://ui.shadcn.com/docs" },
    { label: "shadcn/ui changelog: Blocks for Radix and Base UI (February 2026)", url: "https://ui.shadcn.com/docs/changelog/2026-02-blocks" },
    { label: "Radix Themes home", url: "https://www.radix-ui.com/themes" },
    { label: "Radix Themes getting started", url: "https://www.radix-ui.com/themes/docs/overview/getting-started" },
    { label: "HeroUI home", url: "https://www.heroui.com/" },
    { label: "Ant Design home", url: "https://ant.design" },
  ],
}

export default page
