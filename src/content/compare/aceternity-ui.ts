import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-aceternity-ui",
  other: "Aceternity UI",
  otherUrl: "https://ui.aceternity.com",
  title: "MiniDev UI vs Aceternity UI: which should you use?",
  description:
    "MiniDev UI vs Aceternity UI: product screens and a theming system versus eye-catching animated effects. Compare pricing, license, scope and install.",
  checked: "2026-09-30",
  summary:
    "Aceternity UI is known for striking, animated marketing effects built with Tailwind CSS and Framer Motion, with a free component set and paid annual and lifetime plans for 200+ premium blocks and 12+ templates. MiniDev UI is fully free and MIT, and its center of gravity is product UI: forms, tables, billing, settings, dashboards and AI chat, plus a smaller set of motion pieces. Pick Aceternity UI when the landing page needs a memorable visual effect. Pick MiniDev UI when you need the app behind the landing page, or one consistent system across both.",
  rows: [
    { feature: "Price", minidev: "Free, everything", other: "Free components; paid annual or one-time lifetime plans for premium blocks and templates (see their pricing page for current prices)" },
    { feature: "License", minidev: "MIT", other: "Paid plans allow commercial use; see their license page for the free and paid terms" },
    {
      feature: "Scope",
      minidev: "About 495 items: roughly 370 UI components, 82 motion components, 43 blocks and pages",
      other: "Animated components and effects (backgrounds, cards, text, 3D and scroll effects), plus premium blocks",
    },
    {
      feature: "Blocks",
      minidev: "App and marketing pages: billing, settings, sign in, analytics, chat, pricing, heroes",
      other: "Marketing sections such as heroes, pricing, footers and illustrations, mostly in the paid tier",
    },
    {
      feature: "Templates",
      minidev: "8 landing page templates shown as live demos, with brand kits (not downloadable as whole apps)",
      other: "Next.js and React landing page templates, part of the paid offering",
    },
    { feature: "Primitives", minidev: "Base UI (@base-ui/react)", other: "Mostly custom components; check each component for its dependencies" },
    { feature: "Animation", minidev: "motion (the Framer Motion successor)", other: "Framer Motion / motion" },
    { feature: "Tailwind version", minidev: "Tailwind CSS v4", other: "Tailwind CSS; check each component's setup notes for version specifics" },
    {
      feature: "Install",
      minidev: "`npx shadcn@latest add https://ui.minidev.pro/r/<name>.json`, or npm `minidev-ui-kit`",
      other: "Copy and paste, or the shadcn CLI (see their CLI docs)",
    },
    {
      feature: "Theming",
      minidev: "Semantic OKLCH tokens, materials (hairline, glass, metal, paper), one light source for shadows",
      other: "Per-component Tailwind classes; many effects use their own colors and gradients",
    },
    { feature: "Dark mode", minidev: "Yes, every component, from one token set", other: "Yes, on components that support it" },
    { feature: "AI tooling", minidev: "`llms.txt` and `llms-full.txt`; shadcn MCP compatible", other: "Installable through the shadcn CLI; check their docs for AI tooling" },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Aceternity UI](https://ui.aceternity.com) is a collection of animated React components built with Tailwind CSS and Framer Motion. It became popular for effects that make a page feel alive: spotlight and beam backgrounds, 3D cards, animated text and scroll driven sections. The free components can be copied or installed with the shadcn CLI, and paid annual or lifetime plans add 200+ premium blocks and full landing page templates.",
    },
    {
      type: "p",
      text: "MiniDev UI is a free, MIT licensed shadcn-compatible registry of about 495 items. Most of them are the screens a product team builds after launch: data tables, invoice lists, billing and settings pages, command palettes, notification centers, AI chat threads and prompt inputs. About 82 motion components cover the marketing side, and everything shares one set of semantic tokens so the app and the site match.",
    },
    { type: "h2", text: "Where Aceternity UI shines", id: "where-aceternity-ui-shines" },
    {
      type: "list",
      items: [
        "**Visual impact.** Its effects are designed to be noticed, which is exactly what a launch page or portfolio often needs.",
        "**Range of effects.** Backgrounds, card interactions, text animations and scroll effects give you many options for a single hero.",
        "**Premium marketing templates.** If you want a finished, polished landing page and are happy to pay, the Pro templates save real time.",
        "**Familiar stack.** Tailwind plus Framer Motion is easy to read and edit for most React developers.",
      ],
    },
    { type: "h2", text: "Where MiniDev UI shines", id: "where-minidev-ui-shines" },
    {
      type: "list",
      items: [
        "**Everything is free.** Blocks, motion pieces and pages are all MIT, with no paid tier.",
        "**Product UI depth.** Forms, overlays, tables, charts, billing, auth, settings and AI surfaces, all built on accessible Base UI primitives.",
        "**One system.** Components read the same tokens, so a pricing section, a settings page and a dialog look like they belong together, in light and dark.",
        "**Materials.** Switch a scope to glass, metal or paper with a `data-material` attribute instead of restyling each component.",
      ],
    },
    { type: "component", name: "hero-aurora" },
    { type: "h2", text: "Using them together", id: "using-them-together" },
    {
      type: "p",
      text: "Both can be installed with the shadcn CLI and both use Tailwind classes and a Framer Motion lineage, so they can live in the same repo. A practical split is Aceternity UI for one or two signature effects on the marketing site, and MiniDev UI for the rest of the site and the product itself.",
    },
    {
      type: "p",
      text: "Note that the libraries use different color approaches. MiniDev components use semantic tokens such as `bg-surface`, `text-fg` and `border-border`, while many Aceternity effects set colors directly in their classes. When you drop an effect into a MiniDev themed page, swap its hard coded colors for tokens where you can, so it follows dark mode and your brand color.",
    },
    { type: "h2", text: "Install notes", id: "install-notes" },
    {
      type: "p",
      text: "Add MiniDev items one file at a time:",
    },
    { type: "code", lang: "bash", code: "npx shadcn@latest add https://ui.minidev.pro/r/pricing-page.json" },
    {
      type: "p",
      text: "Then import the tokens after Tailwind in your global CSS with `@import \"minidev-ui-kit/styles.css\";`, or copy `styles.css` from any docs page if you are not using the npm package. MiniDev motion pieces depend on the `motion` package; if you already use Framer Motion for Aceternity effects, check that both resolve to compatible versions so you do not ship two animation runtimes.",
    },
    {
      type: "callout",
      tone: "note",
      text: "Aceternity UI's pricing and license terms change from time to time. Check their [pricing](https://ui.aceternity.com/pricing) and [license](https://ui.aceternity.com/licence) pages before using Pro content in client work.",
    },
    { type: "h2", text: "Which to pick", id: "which-to-pick" },
    {
      type: "list",
      items: [
        "**Choose Aceternity UI** if a single, memorable animated effect is the point of the page, or if you want premium landing page templates and are happy to pay.",
        "**Choose MiniDev UI** if you need the product itself (forms, tables, billing, settings, chat) and marketing sections that share one theme, all free.",
      ],
    },
  ],
  faq: [
    {
      q: "Is Aceternity UI free?",
      a: "Its component collection is free to use, and paid annual or lifetime plans unlock premium blocks and templates. Check its pricing page for current terms. MiniDev UI has no paid tier.",
    },
    {
      q: "Which is better for a SaaS landing page?",
      a: "Aceternity UI if you want a standout animated effect as the centerpiece. MiniDev UI if you want the landing page, pricing, auth and product screens to share one visual system at no cost.",
    },
    {
      q: "Can I use Aceternity UI effects inside a MiniDev UI project?",
      a: "Yes. Both install through the shadcn CLI and use Tailwind. Replace hard coded colors in the effect with MiniDev tokens so it follows your theme and dark mode.",
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
    { label: "Aceternity UI: Tailwind CSS and Framer Motion components", url: "https://ui.aceternity.com/amazing-tailwindcss-and-framer-motion-components" },
  ],
}

export default comparison
