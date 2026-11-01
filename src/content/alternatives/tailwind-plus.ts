import type { AlternativesPage } from "../types"

const page: AlternativesPage = {
  slug: "tailwind-plus",
  title: "Tailwind Plus alternatives: 8 options compared",
  description:
    "Free and paid alternatives to Tailwind Plus (formerly Tailwind UI): Preline UI, Flowbite, shadcn/ui, Untitled UI React, daisyUI and more, compared on price.",
  checked: "2026-09-30",
  intro:
    "The best alternative to Tailwind Plus depends on which part of it you use. For Tailwind sections and templates in plain HTML or across several frameworks, Preline UI and Flowbite are the closest matches, each with a free tier and a paid Pro. For React components you own, shadcn/ui is the free default. Untitled UI React sells a very large catalogue of sections and pages as a one-time purchase, and Headless UI, free from Tailwind Labs, is the primitive layer Tailwind Plus uses in React and Vue.",
  items: [
    {
      id: "preline-ui",
      what: "An open source Tailwind CSS library of HTML components with JavaScript plugins: 640+ free components, 27 headless plugins, 204 free blocks and 5 free templates, with framework guides from React and Vue to Laravel and Rails.",
      price: "Free under MIT and the Preline UI Fair Use License; Pro $249, Team $459",
      styling: "HTML with Tailwind classes, plus Preline's JavaScript for interactive parts",
      bestFor: "A very large catalogue of Tailwind sections and templates for any stack, free to start",
    },
    {
      id: "flowbite",
      what: "An open source Tailwind CSS library: markup with Tailwind classes, a plugin and a script that wires behavior through data attributes, plus Flowbite React and guides for many frameworks.",
      price: "Free, MIT (docs CC BY 3.0); Flowbite Pro is paid",
      styling: "Tailwind utility classes in your markup, with native Tailwind v4 theme variables and prebuilt themes",
      bestFor: "Server rendered and multi-framework projects, and teams that design in Figma",
    },
    {
      id: "shadcn-ui",
      what: "Free React components whose source you copy into your project with a CLI, plus the registry format other libraries publish into. It includes blocks for dashboards, sidebars and login pages.",
      price: "Free, MIT",
      styling: "Tailwind CSS v4 utilities with CSS variable tokens; Radix UI or Base UI underneath",
      bestFor: "React apps that want a free, editable component base instead of paid blocks",
    },
    {
      id: "untitled-ui",
      what: "React components built with Tailwind CSS v4 and React Aria, kept in sync with the Untitled UI Figma kit and added with a CLI or copied from the docs.",
      price: "Open source components free, MIT; PRO is a one-time purchase from $349",
      styling: "Tailwind CSS v4 with tokens in a `theme.css`",
      bestFor: "Design teams on the Untitled UI Figma kit who want a very large catalogue: PRO lists 5k+ components and sections",
    },
    {
      id: "daisyui",
      what: "A Tailwind CSS plugin that adds component class names and 35 built-in themes, with no JavaScript.",
      price: "Free, MIT; templates and a Figma library are sold in its store",
      styling: "Semantic class names (`btn`, `card`) on top of Tailwind utilities",
      bestFor: "Short, framework agnostic markup and theme switching on a zero budget",
    },
    {
      id: "heroui",
      what: "A React library on React Aria Components and Tailwind CSS v4, installed from npm, with paid full-page templates in HeroUI Pro.",
      price: "Free, Apache 2.0; HeroUI Pro is paid",
      styling: "Tailwind CSS v4 with CSS variables and BEM classes from `@heroui/styles`",
      bestFor: "React apps that want polished components as a package, with templates available to buy",
    },
    {
      id: "minidev-ui",
      what: "A free shadcn-compatible registry of over 500 React items on Base UI, Tailwind CSS v4 and motion, with product screens, full-page blocks and 8 landing page templates shown as live demos.",
      price: "Free, MIT, no paid tier",
      styling: "Tailwind CSS v4 utilities with semantic OKLCH tokens",
      bestFor: "React product screens such as billing, settings, dashboards and AI chat; it has no downloadable site templates and no Vue or HTML versions",
    },
    {
      id: "headless-ui",
      what: "Tailwind Labs' completely unstyled, accessible components for React and Vue, the same primitives Tailwind Plus uses for its interactive pieces in those frameworks.",
      price: "Free, MIT",
      styling: "None shipped; you style states with Tailwind classes keyed to data attributes such as `data-open`",
      bestFor: "Building your own Tailwind components on the primitives behind Tailwind Plus",
    },
  ],
  body: [
    { type: "h2", text: "How to choose", id: "how-to-choose" },
    {
      type: "list",
      items: [
        "**HTML in any stack:** Preline UI or Flowbite, or daisyUI for class names and themes.",
        "**React components you own:** shadcn/ui, with MiniDev UI for product screens.",
        "**A React package with paid templates:** HeroUI.",
        "**A large paid catalogue synced with Figma:** Untitled UI React.",
        "**Your own components on Tailwind Labs' primitives:** Headless UI.",
      ],
    },
  ],
  faq: [
    {
      q: "What is the best free alternative to Tailwind Plus?",
      a: "For HTML sections and templates in any stack, Preline UI and Flowbite, which both have free tiers with many components and blocks. For React, shadcn/ui is free and MIT. None of them includes Tailwind Plus's own templates or the Catalyst kit.",
    },
    {
      q: "Is Tailwind UI the same as Tailwind Plus?",
      a: "Yes. Tailwind UI was renamed Tailwind Plus by Tailwind Labs. It is a paid, one-time purchase with lifetime access, under a commercial license.",
    },
    {
      q: "Which alternatives work with Vue or plain HTML?",
      a: "daisyUI, Flowbite and Preline UI work in plain HTML and many frameworks, and Headless UI has a Vue package. shadcn/ui, HeroUI, Untitled UI React and MiniDev UI are React.",
    },
    {
      q: "Which alternatives sell large catalogues of sections?",
      a: "Untitled UI React PRO lists 5k+ components and sections and 250+ page examples as a one-time purchase, and Preline Pro lists 780+ blocks and 21 templates. Flowbite Pro and HeroUI Pro also sell blocks and templates.",
    },
    {
      q: "Is there a free option from the Tailwind team?",
      a: "Yes, Headless UI. It is MIT licensed, made by Tailwind Labs, and provides the unstyled, accessible components that Tailwind Plus uses for behavior in React and Vue.",
    },
  ],
  sources: [
    { label: "Tailwind Plus", url: "https://tailwindcss.com/plus" },
    { label: "Tailwind Plus license", url: "https://tailwindcss.com/plus/license" },
    { label: "Tailwind UI is now Tailwind Plus", url: "https://tailwindcss.com/blog/tailwind-plus" },
    { label: "Preline UI home", url: "https://preline.co" },
    { label: "Preline UI pricing", url: "https://preline.co/pricing/" },
    { label: "Flowbite introduction", url: "https://flowbite.com/docs/getting-started/introduction/" },
    { label: "Flowbite Pro", url: "https://flowbite.com/pro/" },
    { label: "shadcn/ui docs", url: "https://ui.shadcn.com/docs" },
    { label: "Untitled UI React introduction", url: "https://www.untitledui.com/react/docs/introduction" },
    { label: "Untitled UI pricing", url: "https://www.untitledui.com/pricing" },
    { label: "daisyUI home", url: "https://daisyui.com/" },
    { label: "daisyUI store", url: "https://daisyui.com/store/" },
    { label: "HeroUI home", url: "https://www.heroui.com/" },
    { label: "HeroUI Pro", url: "https://heroui.pro/" },
    { label: "Headless UI home", url: "https://headlessui.com" },
  ],
}

export default page
