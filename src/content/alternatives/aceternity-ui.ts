import type { AlternativesPage } from "../types"

const page: AlternativesPage = {
  slug: "aceternity-ui",
  title: "Aceternity UI alternatives: 7 options compared",
  description:
    "The best Aceternity UI alternatives for animated React components and landing pages: Magic UI, MiniDev UI, Tailwind Plus, Preline UI and more, with prices.",
  checked: "2026-09-30",
  intro:
    "The closest alternative to Aceternity UI is Magic UI: another library of animated React components built with Tailwind CSS and motion, installed with the shadcn CLI, free and MIT licensed. MiniDev UI is the other free option here with a large set of motion components, next to product UI. If what you want from Aceternity is its paid landing page templates rather than its effects, Tailwind Plus, Preline UI, Untitled UI React and Flowbite sell or give away sections and templates without the animation focus.",
  items: [
    {
      id: "magic-ui",
      what: "A free library of 150+ animated components and effects (text animations, backgrounds, marquees, device mockups), built with Tailwind CSS and motion and installed with the shadcn CLI.",
      price: "Free, MIT; Magic UI Pro is paid",
      styling: "Tailwind CSS; reads the shadcn/ui CSS variables, with per-component props for colors and timing",
      bestFor: "Animated details that follow your shadcn/ui theme, with an official MCP server for AI editors",
    },
    {
      id: "minidev-ui",
      what: "A free shadcn-compatible registry with over 100 motion components built on motion (heroes, pricing, marquees, scroll stories), next to UI components and full product pages.",
      price: "Free, MIT, no paid tier",
      styling: "Tailwind CSS v4 utilities with semantic OKLCH tokens, so motion pieces follow the theme and dark mode",
      bestFor: "Marketing motion and the product behind it under one token system; its focus is product UI rather than signature effects",
    },
    {
      id: "tailwind-plus",
      what: "The paid collection from the makers of Tailwind CSS, with marketing blocks, downloadable site templates built with Next.js and the Catalyst UI kit.",
      price: "Paid, one-time purchase with lifetime access; commercial license",
      styling: "Tailwind utility classes; Tailwind and Headless UI transitions",
      bestFor: "Downloadable landing page and site templates from the Tailwind team, when animation is not the point",
    },
    {
      id: "preline-ui",
      what: "Open source Tailwind CSS components in HTML with JavaScript plugins: 640+ free components, 204 free blocks and 5 free templates, with more in Pro.",
      price: "Free under MIT and the Preline UI Fair Use License; Pro $249, Team $459",
      styling: "HTML with Tailwind classes, plus Preline's JavaScript",
      bestFor: "A large free catalogue of marketing sections for any stack",
    },
    {
      id: "untitled-ui",
      what: "React components built with Tailwind CSS v4 and React Aria, kept in sync with the Untitled UI Figma kit.",
      price: "Free MIT components; PRO is a one-time purchase from $349",
      styling: "Tailwind CSS v4 with tokens in a `theme.css`",
      bestFor: "Design led teams that want a very large paid catalogue: PRO lists 5k+ components and sections and 250+ page examples",
    },
    {
      id: "flowbite",
      what: "Open source Tailwind components with a data attribute script and Flowbite React, plus Flowbite Blocks for marketing, application and e-commerce sections.",
      price: "Free, MIT; Flowbite Pro is paid",
      styling: "Tailwind utility classes with native Tailwind v4 theme variables",
      bestFor: "Marketing sections across many frameworks, designed in Figma first",
    },
    {
      id: "shadcn-ui",
      what: "Free React components, blocks and the CLI that both Aceternity UI and Magic UI install through. It is not an animation library.",
      price: "Free, MIT",
      styling: "Tailwind CSS v4 with CSS variable tokens; mostly CSS transitions",
      bestFor: "The component base around a few effects, when you need forms, dialogs and blocks more than motion",
    },
  ],
  body: [
    { type: "h2", text: "How to choose", id: "how-to-choose" },
    {
      type: "list",
      items: [
        "**Animated effects, free:** Magic UI, then MiniDev UI.",
        "**Paid landing page templates:** Tailwind Plus, Untitled UI React PRO or Preline Pro.",
        "**Marketing sections in any stack:** Preline UI or Flowbite.",
        "**A component base for the rest of the page:** shadcn/ui.",
      ],
    },
  ],
  faq: [
    {
      q: "What is the best free alternative to Aceternity UI?",
      a: "Magic UI: 150+ free, MIT licensed animated components that install with the shadcn CLI. MiniDev UI is the other free option here, with over 100 motion components next to product screens.",
    },
    {
      q: "Is Aceternity UI free?",
      a: "Its component collection is free to use. Paid annual or lifetime plans add 200+ premium blocks and 12+ templates, and its license page sets out the free and paid terms.",
    },
    {
      q: "Which alternatives are built for animation?",
      a: "Magic UI and MiniDev UI, which both use motion, the successor to Framer Motion, as Aceternity UI does. The other options here are component and template libraries rather than animation libraries.",
    },
    {
      q: "Can I use Aceternity UI effects with these libraries?",
      a: "Yes, most easily in shadcn based setups: Aceternity UI installs through the shadcn CLI, as do Magic UI, shadcn/ui and MiniDev UI. Replace hard coded colors in its effects with your theme tokens so they follow dark mode.",
    },
    {
      q: "Which alternatives include landing page templates?",
      a: "Tailwind Plus sells downloadable site templates, Preline UI has 5 free templates and 21 with Pro, Magic UI Pro sells templates, and MiniDev UI shows 8 landing page templates as live demos, which are not downloadable as whole apps.",
    },
  ],
  sources: [
    { label: "Aceternity UI home", url: "https://ui.aceternity.com/" },
    { label: "Aceternity UI pricing", url: "https://ui.aceternity.com/pricing" },
    { label: "Aceternity UI license", url: "https://ui.aceternity.com/licence" },
    { label: "Magic UI home", url: "https://magicui.design/" },
    { label: "Magic UI license (MIT, checked November 1, 2026)", url: "https://github.com/magicuidesign/magicui/blob/main/LICENSE.md" },
    { label: "Magic UI Pro", url: "https://pro.magicui.design/" },
    { label: "Magic UI MCP server", url: "https://github.com/magicuidesign/mcp" },
    { label: "Tailwind Plus", url: "https://tailwindcss.com/plus" },
    { label: "Tailwind Plus license", url: "https://tailwindcss.com/plus/license" },
    { label: "Preline UI home", url: "https://preline.co" },
    { label: "Preline UI pricing", url: "https://preline.co/pricing/" },
    { label: "Untitled UI React introduction", url: "https://www.untitledui.com/react/docs/introduction" },
    { label: "Untitled UI pricing", url: "https://www.untitledui.com/pricing" },
    { label: "Flowbite introduction", url: "https://flowbite.com/docs/getting-started/introduction/" },
    { label: "Flowbite Pro", url: "https://flowbite.com/pro/" },
    { label: "shadcn/ui docs", url: "https://ui.shadcn.com/docs" },
  ],
}

export default page
