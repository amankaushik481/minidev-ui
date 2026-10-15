import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-park-ui",
  other: "Park UI",
  otherUrl: "https://park-ui.com",
  title: "MiniDev UI vs Park UI: which should you use?",
  description:
    "MiniDev UI vs Park UI: two free, MIT systems that copy source into your repo: Base UI plus Tailwind v4, or Ark UI plus Panda CSS for React and Solid.",
  checked: "2026-10-15",
  summary:
    "Park UI is a components system and code distribution platform built on Ark UI for behavior and Panda CSS for styling, now part of the Chakra UI organization on GitHub. Components are distributed as source through the `@park-ui/cli` or copied from the docs, with React and Solid tabs in the install guide, and theming is one accent color (26 palettes) plus one gray (6 scales) with radius tokens. It is MIT and free. MiniDev UI is also free, MIT and copied into your repo, but it is a shadcn-compatible registry on Base UI, Tailwind CSS v4 and motion, with 548 items including full product screens. Pick Park UI if you use Panda CSS or Solid, or you want to grow your own design system from a smaller, systematic base. Pick MiniDev UI if you use Tailwind and shadcn tooling and want finished screens, blocks, motion and templates.",
  rows: [
    { feature: "Price", minidev: "Free, everything", other: "Free" },
    { feature: "License", minidev: "MIT", other: "MIT" },
    {
      feature: "Scope",
      minidev: "548 items: 397 UI components, 108 motion components, 43 blocks and pages",
      other: "59 components listed in the docs sidebar, two of them marked work in progress (Color Picker, Date Picker)",
    },
    {
      feature: "Install model",
      minidev: "Source copied into your repo with `npx shadcn@latest add @minidev/<name>`, or npm `minidev-ui-kit`",
      other: "Source, not an npm package: `npx @park-ui/cli init`, then `npx @park-ui/cli add button`, imported from `@/components/ui`; or copy from the docs",
    },
    { feature: "Styling", minidev: "Tailwind CSS v4 utilities with semantic OKLCH tokens", other: "Panda CSS, extending the default Panda preset" },
    { feature: "Primitives", minidev: "Base UI (`@base-ui/react`)", other: "Ark UI (`@ark-ui/react`), a headless component library" },
    {
      feature: "Frameworks",
      minidev: "React, with install guides for Next.js, Vite, Astro, React Router and TanStack Start",
      other: "React and Solid tabs in the install docs; quickstart examples for Next.js and Solid Start",
    },
    {
      feature: "Theming",
      minidev: "Semantic tokens plus materials (hairline, glass, metal, paper) and one light source for shadows",
      other: "One accent color from 26 palettes and one gray from 6, each with 12 shades per light and dark mode; radius tokens from none to 2xl",
    },
    { feature: "Icons", minidev: "lucide-react", other: "Lucide Icons by default, replaceable" },
    {
      feature: "Design assets",
      minidev: "15 block types, 8 landing page templates and 19 free design tools",
      other: "A Figma kit documented in the sidebar",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Park UI](https://park-ui.com) calls itself an accessible components system and code distribution platform. All of its components are built on Ark UI, a headless component library, and styled with Panda CSS. Instead of shipping an npm package it distributes source: `npx @park-ui/cli init` sets up configuration, `npx @park-ui/cli add button` drops a component into `@/components/ui`, and extra color palettes are added the same way. The install guide shows React and Solid, and the theming model is one accent color and one gray chosen at init, with 26 accent palettes, 6 grays and radius tokens. Park UI joined the Chakra UI organization on GitHub in November 2025 and is MIT licensed. MiniDev UI shares the copy-the-source philosophy but sits in the shadcn ecosystem: 548 MIT licensed items built on Base UI, Tailwind CSS v4 and motion, installed with `npx shadcn@latest add @minidev/<name>` or from npm as `minidev-ui-kit`, with 43 full page blocks and 108 motion components alongside the UI components.",
    },
    { type: "h2", text: "Where each one is the better pick", id: "where-each-one-is-the-better-pick" },
    {
      type: "list",
      items: [
        "**Pick Park UI if you use Panda CSS.** Its components and tokens are built for Panda and extend the default Panda preset, so they fit a Panda project without translation.",
        "**Pick Park UI for Solid.** The install docs cover Solid alongside React, with a Solid Start quickstart. MiniDev UI is React only.",
        "**Pick Park UI to build your own design system.** A systematic base of about 59 components with one accent and one gray is a clean starting point when you intend to own the whole system.",
        "**Pick MiniDev UI if you use Tailwind and shadcn tooling.** It installs with the shadcn CLI, maps the standard shadcn token names, and works with the shadcn MCP server.",
        "**Pick MiniDev UI for finished screens and motion.** Billing, settings, sign in, analytics and admin pages, 15 block types, 8 landing page templates and 108 motion components are included, where Park UI focuses on the component layer.",
      ],
    },
    { type: "component", name: "sign-in-page" },
    {
      type: "callout",
      tone: "note",
      text: "Mixing the two means two styling engines (Panda CSS and Tailwind CSS) and two headless layers (Ark UI and Base UI) in one build, so pick one per project. Park UI's repository now lives at github.com/chakra-ui/park-ui while the docs stay at park-ui.com; the installation and introduction pages we checked describe Panda CSS only and do not mention Tailwind.",
    },
  ],
  faq: [
    {
      q: "Is Park UI free?",
      a: "Yes. Park UI is MIT licensed and distributed as source through its CLI and docs. MiniDev UI is also MIT with no paid tier.",
    },
    {
      q: "Does Park UI support Tailwind CSS?",
      a: "The installation and introduction pages we checked describe Panda CSS only and do not mention Tailwind. MiniDev UI is built for Tailwind CSS v4.",
    },
    {
      q: "Can I use Park UI and MiniDev UI together?",
      a: "They use different styling engines and different headless libraries, so combining them means two build pipelines and two sets of tokens. Choose one per project, or keep each to a separate app.",
    },
  ],
  sources: [
    { label: "Park UI home", url: "https://park-ui.com" },
    { label: "Park UI introduction", url: "https://park-ui.com/docs/introduction" },
    { label: "Park UI installation", url: "https://park-ui.com/docs/installation" },
    { label: "Park UI theming", url: "https://park-ui.com/docs/theming" },
    { label: "Park UI blog: joining the Chakra UI organization", url: "https://park-ui.com/blog" },
    { label: "chakra-ui/park-ui on GitHub", url: "https://github.com/chakra-ui/park-ui" },
  ],
}

export default comparison
