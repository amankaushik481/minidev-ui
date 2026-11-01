import type { Matchup } from "../types"

const matchup: Matchup = {
  slug: "aceternity-ui-vs-magic-ui",
  title: "Aceternity UI vs Magic UI: which to use?",
  description:
    "Aceternity UI vs Magic UI: two animated React component libraries for landing pages. Compare effects, price, license, install, theming and paid templates.",
  a: "aceternity-ui",
  b: "magic-ui",
  checked: "2026-09-30",
  verdict:
    "Both are animated React component collections built with Tailwind CSS and Framer Motion (now motion), both install with the shadcn CLI, and both sell premium blocks and templates. Aceternity UI is known for effects designed to be noticed. Magic UI is MIT licensed, follows shadcn/ui conventions closely and leans toward smaller details.",
  pickA:
    "one memorable effect is the point of the page, such as a spotlight or beam background, a 3D card or a scroll driven section, or you want premium landing page templates and are happy to pay.",
  pickB:
    "you want animated details (text effects, number tickers, marquees, borders) that sit inside an existing shadcn/ui project and follow its theme, under the MIT license.",
  rows: [
    {
      feature: "Price",
      a: "Free components; paid annual or one-time lifetime plans for premium blocks and templates",
      b: "Free components; Magic UI Pro (templates and sections) is paid",
    },
    {
      feature: "License",
      a: "Paid plans allow commercial use; see their license page for the free and paid terms",
      b: "MIT (LICENSE.md in the repository); Magic UI Pro has its own terms",
    },
    {
      feature: "Free scope",
      a: "Animated components and effects: backgrounds, cards, text, 3D and scroll effects",
      b: "150+ free animated components and effects: text animations, backgrounds, marquees, device mockups, buttons and more",
    },
    { feature: "Paid scope", a: "200+ premium blocks and 12+ templates", b: "50+ blocks and templates for landing pages in Magic UI Pro" },
    { feature: "Animation", a: "Framer Motion / motion", b: "motion (Framer Motion) and CSS animations" },
    { feature: "Install", a: "Copy and paste, or the shadcn CLI", b: "shadcn CLI, or copy and paste" },
    {
      feature: "Primitives",
      a: "Mostly custom components; check each component for its dependencies",
      b: "Designed to sit next to shadcn/ui, which supplies the primitives",
    },
    {
      feature: "Theming",
      a: "Per-component Tailwind classes; many effects use their own colors and gradients",
      b: "Uses the shadcn/ui CSS variables plus per-component props for colors and timing",
    },
    { feature: "Dark mode", a: "Yes, on components that support it", b: "Yes, through the shadcn/ui theme" },
    { feature: "AI tooling", a: "Installable through the shadcn CLI", b: "Official Magic UI MCP server for AI editors" },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Aceternity UI](https://ui.aceternity.com) is a collection of animated React components built with Tailwind CSS and Framer Motion. It became popular for effects that make a page feel alive: spotlight and beam backgrounds, 3D cards, animated text and scroll driven sections. The free components can be copied or installed with the shadcn CLI, and paid annual or lifetime plans add 200+ premium blocks and 12+ landing page templates for Next.js and React.",
    },
    {
      type: "p",
      text: "[Magic UI](https://magicui.design) describes itself as a UI library for design engineers: 150+ free animated components and effects built with React, TypeScript, Tailwind CSS and motion, released under the MIT license. It is designed as a companion to shadcn/ui, so you install pieces with the shadcn CLI and they read the shadcn/ui theme. A separate paid product, [Magic UI Pro](https://pro.magicui.design), sells 50+ blocks and templates.",
    },
    { type: "h2", text: "Where Aceternity UI shines", id: "where-aceternity-ui-shines" },
    {
      type: "list",
      items: [
        "**Visual impact.** Its effects are designed to be noticed, which is what a launch page or portfolio often needs.",
        "**Range of effects for one hero.** Backgrounds, card interactions, text animations and scroll effects give you many options for a single section.",
        "**Premium marketing templates.** If you want a finished landing page and are happy to pay, the paid templates save time.",
        "**A familiar stack.** Tailwind plus Framer Motion is easy to read and edit for most React developers.",
      ],
    },
    { type: "h2", text: "Where Magic UI shines", id: "where-magic-ui-shines" },
    {
      type: "list",
      items: [
        "**Small details.** Animated text, number tickers, marquees, borders and backgrounds that add polish without taking over the page.",
        "**Easy to adopt.** It follows the shadcn/ui conventions closely, so it slots into an existing shadcn project with little friction.",
        "**A clear license.** The repository is MIT licensed.",
        "**AI editor support.** An official MCP server lets tools like Cursor and Claude search and install Magic UI components directly.",
      ],
    },
    { type: "h2", text: "The trade-offs", id: "the-trade-offs" },
    {
      type: "list",
      items: [
        "**Theme fit.** Magic UI reads the standard shadcn/ui CSS variables, so its pieces follow your theme and dark mode. Many Aceternity effects set colors and gradients in their own classes, so expect to swap hard coded colors for your tokens.",
        "**License terms.** Magic UI's repository is MIT. Aceternity UI's free and paid terms are on its license page, and its paid plans allow commercial use, so read it before using Pro content in client work.",
        "**What you pay for.** Aceternity UI sells 200+ premium blocks and 12+ templates on annual or lifetime plans. Magic UI Pro sells 50+ blocks and templates.",
        "**Using both.** Both install with the shadcn CLI and share the Framer Motion lineage. Check that Framer Motion and motion resolve to compatible versions so you do not ship two animation runtimes.",
      ],
    },
  ],
  minidev: [
    "MiniDev UI overlaps with both on motion: it includes over 100 motion components built on motion (heroes, pricing, marquees, scroll stories), free under MIT, next to its UI components and full pages. Its center of gravity is product UI, though, so when a single signature effect is the point of the page, Aceternity UI and Magic UI are built for exactly that.",
    "Where it helps is the app behind the landing page: billing, settings, dashboards and chat that share one token system with its motion sections. See [MiniDev UI vs Aceternity UI](/compare/minidev-ui-vs-aceternity-ui) and [MiniDev UI vs Magic UI](/compare/minidev-ui-vs-magic-ui).",
  ],
  faq: [
    {
      q: "Is Magic UI free?",
      a: "Yes. Magic UI's components are free and MIT licensed. Magic UI Pro, with 50+ blocks and templates, is a separate paid product.",
    },
    {
      q: "Is Aceternity UI free?",
      a: "Its component collection is free to use, and paid annual or lifetime plans add 200+ premium blocks and 12+ templates. Check its license page for the free and paid terms.",
    },
    {
      q: "Which is better for a SaaS landing page?",
      a: "Aceternity UI if you want one standout animated effect as the centerpiece, or a paid landing page template. Magic UI if you want lighter animated details inside a shadcn/ui design.",
    },
    {
      q: "Can I use Aceternity UI and Magic UI together?",
      a: "Yes. Both install with the shadcn CLI and use Tailwind CSS. Make sure Framer Motion and motion resolve to compatible versions, and replace hard coded colors in Aceternity effects with your theme tokens.",
    },
    {
      q: "Do they work with AI coding tools?",
      a: "Magic UI has an official MCP server that tools like Cursor and Claude can use to search and install components. Aceternity UI installs through the shadcn CLI, which AI tools can run as well.",
    },
  ],
  sources: [
    { label: "Aceternity UI home", url: "https://ui.aceternity.com/" },
    { label: "Aceternity UI components", url: "https://ui.aceternity.com/components" },
    { label: "Aceternity UI blocks", url: "https://ui.aceternity.com/blocks" },
    { label: "Aceternity UI templates", url: "https://ui.aceternity.com/templates" },
    { label: "Aceternity UI pricing", url: "https://ui.aceternity.com/pricing" },
    { label: "Aceternity UI license", url: "https://ui.aceternity.com/licence" },
    { label: "Aceternity UI CLI docs", url: "https://ui.aceternity.com/docs/cli" },
    { label: "Magic UI home", url: "https://magicui.design/" },
    { label: "Magic UI on GitHub", url: "https://github.com/magicuidesign/magicui" },
    { label: "Magic UI license (MIT, checked November 1, 2026)", url: "https://github.com/magicuidesign/magicui/blob/main/LICENSE.md" },
    { label: "Magic UI Pro", url: "https://pro.magicui.design/" },
    { label: "Magic UI MCP server", url: "https://github.com/magicuidesign/mcp" },
  ],
}

export default matchup
