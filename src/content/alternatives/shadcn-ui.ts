import type { AlternativesPage } from "../types"

const page: AlternativesPage = {
  slug: "shadcn-ui",
  title: "shadcn/ui alternatives: 9 options compared",
  description:
    "The best shadcn/ui alternatives: HeroUI, Mantine, Radix Themes, Chakra UI, Material UI, daisyUI and more, with price, license, styling and who each one suits.",
  checked: "2026-09-30",
  intro:
    "The best alternative to shadcn/ui depends on what you want to change. To keep Tailwind CSS but install a versioned package instead of copying source, HeroUI is the closest match. To leave Tailwind for one complete, free library, Mantine covers components, hooks, forms, dates and charts. For a pre-styled system from the team behind Radix Primitives, use Radix Themes. And if shadcn/ui suits you but feels too small, a shadcn-compatible registry such as coss ui or MiniDev UI adds components without leaving its workflow.",
  items: [
    {
      id: "heroui",
      what: "Previously NextUI. A React library built on React Aria Components and Tailwind CSS v4, installed from npm as `@heroui/react` and `@heroui/styles`, with a separate HeroUI Native for React Native.",
      price: "Free, Apache 2.0; HeroUI Pro is paid",
      styling: "Tailwind CSS v4: styles ship as CSS with BEM classes, customized with Tailwind utilities and CSS variables",
      bestFor: "Staying on Tailwind CSS v4 but installing a versioned package with React Aria accessibility instead of copying source",
    },
    {
      id: "mantine",
      what: "A fully featured React library: 100+ components, 70+ hooks and packages for forms, dates, charts, notifications and more, from one maintainer.",
      price: "Free, MIT, no paid tier",
      styling: "Plain CSS files; CSS modules, the Styles API and style props. Tailwind is not required",
      bestFor: "One complete library without Tailwind, especially for form heavy apps",
    },
    {
      id: "radix-themes",
      what: "A pre-styled React library from WorkOS, the team behind Radix Primitives. You wrap the app in `Theme` and set accent color, gray color, radius and scaling as props.",
      price: "Free, MIT",
      styling: "Vanilla CSS with its own CSS variables; the docs say Tailwind may not mix well with its closed component model",
      bestFor: "A coherent, pre-styled system with strong color scales and no utility CSS",
    },
    {
      id: "chakra-ui",
      what: "A long-standing React component system. Version 3 is built on Ark UI and installs from npm, with CLI snippets copied into `components/ui`.",
      price: "Free, MIT; Chakra UI Pro blocks and templates are a paid one-time purchase",
      styling: "Its own engine, built on Emotion: style props, tokens, recipes and slot recipes",
      bestFor: "Teams that prefer typed style props and a token config over utility classes",
    },
    {
      id: "material-ui",
      what: "The React implementation of Google's Material Design, installed from npm, with MUI X for a data grid, date and time pickers, charts and a tree view.",
      price: "Free, MIT; MUI X Pro $299 and Premium $599 per developer per year",
      styling: "Emotion (CSS-in-JS) by default, themed with a JavaScript theme object",
      bestFor: "Material Design products, and data heavy apps that need MUI X",
    },
    {
      id: "daisyui",
      what: "A Tailwind CSS plugin that adds component class names such as `btn` and `card`, with 68 components, 35 built-in themes and no JavaScript.",
      price: "Free, MIT; templates, a Figma library and the Blueprint MCP server are paid",
      styling: "Semantic class names on top of Tailwind CSS v4 utilities, themed with OKLCH CSS variables",
      bestFor: "Projects outside React, or short markup and switchable themes with no JavaScript",
    },
    {
      id: "tailwind-plus",
      what: "The paid collection from the makers of Tailwind CSS: UI blocks in React, Vue and HTML, downloadable site templates and the Catalyst UI kit.",
      price: "Paid, one-time purchase with lifetime access; commercial license",
      styling: "Tailwind utility classes with the default palette; Headless UI for behavior",
      bestFor: "Downloadable site templates and many layout variations, in React, Vue or HTML",
    },
    {
      id: "coss-ui",
      what: "Where Origin UI's work continues at coss.com: a component library built on Base UI that serves as Cal.com's design system, with ready made compositions called particles.",
      price: "Free; the cosscom/coss repository is AGPL-3.0 with some packages under MIT, so check the license of the files you use",
      styling: "Tailwind CSS v4 with CSS variable tokens in the shadcn/ui style; installs with the shadcn CLI",
      bestFor: "Staying in the shadcn workflow with a neutral, production tested set of form controls and app components",
    },
    {
      id: "minidev-ui",
      what: "A shadcn-compatible registry of over 500 items built on Base UI, Tailwind CSS v4 and motion: UI components, motion components and full-page blocks such as billing, settings, sign in and AI chat.",
      price: "Free, MIT, no paid tier",
      styling: "Tailwind CSS v4 utilities with semantic OKLCH tokens, copied into your repo",
      bestFor: "Keeping shadcn/ui and adding finished product screens and motion, rather than replacing it",
    },
  ],
  body: [
    { type: "h2", text: "How to choose", id: "how-to-choose" },
    {
      type: "list",
      items: [
        "**Keep Tailwind, get a package:** HeroUI.",
        "**Leave Tailwind:** Mantine for breadth, Chakra UI for style props, Material UI for Material Design, Radix Themes for a pre-styled system.",
        "**Not on React:** daisyUI, which is CSS only, or Tailwind Plus, which has Vue and HTML versions.",
        "**Pay for templates:** Tailwind Plus.",
        "**Stay in the shadcn workflow:** coss ui or MiniDev UI, both built on Base UI and installed with the shadcn CLI.",
      ],
    },
  ],
  faq: [
    {
      q: "What is the best alternative to shadcn/ui?",
      a: "HeroUI, if you want Tailwind CSS v4 components as a versioned npm package with React Aria underneath. Mantine, if you would rather drop Tailwind for one complete, free library. Mantine is MIT licensed and HeroUI is Apache 2.0, and both are free for commercial use.",
    },
    {
      q: "Is there a shadcn/ui alternative you install from npm?",
      a: "Yes. HeroUI, Mantine, Chakra UI, Material UI and Radix Themes are npm packages you update with a version bump. MiniDev UI is also published on npm as `minidev-ui-kit`, alongside its shadcn registry.",
    },
    {
      q: "Which shadcn/ui alternatives are free?",
      a: "All of these except Tailwind Plus, which is a paid one-time purchase. Several have paid add-ons: HeroUI Pro, Chakra UI Pro, MUI X Pro and Premium, and the daisyUI store.",
    },
    {
      q: "Is there a shadcn/ui alternative that does not use Tailwind?",
      a: "Yes. Mantine ships plain CSS, Chakra UI uses its own engine built on Emotion, Material UI uses Emotion, and Radix Themes uses vanilla CSS.",
    },
    {
      q: "Can I keep shadcn/ui and add another library?",
      a: "Yes. shadcn-compatible registries such as MiniDev UI and coss ui install with the same CLI, so their components can join an existing shadcn/ui project. Watch for components with the same file name, such as `button`; the CLI asks before overwriting.",
    },
  ],
  sources: [
    { label: "shadcn/ui docs", url: "https://ui.shadcn.com/docs" },
    { label: "HeroUI home", url: "https://www.heroui.com/" },
    { label: "HeroUI license (version 3, Apache 2.0)", url: "https://github.com/heroui-inc/heroui/blob/v3/LICENSE" },
    { label: "Mantine home", url: "https://mantine.dev/" },
    { label: "Radix Themes home", url: "https://www.radix-ui.com/themes" },
    { label: "Radix Themes styling", url: "https://www.radix-ui.com/themes/docs/overview/styling" },
    { label: "Chakra UI home", url: "https://chakra-ui.com/" },
    { label: "Chakra UI Pro pricing", url: "https://pro.chakra-ui.com/pricing" },
    { label: "MUI pricing", url: "https://mui.com/pricing/" },
    { label: "Material UI overview", url: "https://mui.com/material-ui/getting-started/" },
    { label: "daisyUI home", url: "https://daisyui.com/" },
    { label: "daisyUI store", url: "https://daisyui.com/store/" },
    { label: "Tailwind Plus", url: "https://tailwindcss.com/plus" },
    { label: "Tailwind Plus license", url: "https://tailwindcss.com/plus/license" },
    { label: "coss ui", url: "https://coss.com/ui" },
    { label: "cosscom/coss on GitHub (AGPL-3.0 repository license, checked November 1, 2026)", url: "https://github.com/cosscom/coss" },
  ],
}

export default page
