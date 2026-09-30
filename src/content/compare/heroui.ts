import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-heroui",
  other: "HeroUI",
  otherUrl: "https://www.heroui.com",
  title: "MiniDev UI vs HeroUI: which should you use?",
  description:
    "MiniDev UI vs HeroUI (formerly NextUI): two free React and Tailwind CSS v4 libraries. Compare primitives, install model, theming, blocks and paid tiers.",
  checked: "2026-09-30",
  summary:
    "HeroUI, previously NextUI, is a polished, MIT licensed React component library built on React Aria and Tailwind CSS v4, installed as npm packages, with a paid HeroUI Pro tier for extra components, templates and design systems. MiniDev UI is also free and MIT, but it is a shadcn-compatible registry that copies source into your repo, built on Base UI, with a wide set of product screens, motion components and full pages at no cost. Pick HeroUI if you want a versioned package with strong accessibility and a React Native sibling. Pick MiniDev UI if you want to own the code and start from finished application screens.",
  rows: [
    { feature: "Price", minidev: "Free, everything", other: "Free open source library; paid HeroUI Pro for extra components, blocks, templates and design systems" },
    { feature: "License", minidev: "MIT", other: "MIT for the open source library; HeroUI Pro is sold under its own license terms" },
    {
      feature: "Scope",
      minidev: "Over 500 items: roughly 375 UI components, 86 motion components, 43 blocks and pages",
      other: "Core components for buttons, forms, date and time, color, overlays, navigation and data display; a separate HeroUI Native library for React Native",
    },
    {
      feature: "Blocks and templates",
      minidev: "About 43 blocks and pages; 8 landing page templates shown as live demos, with brand kits",
      other: "Full-page templates (dashboards, CRM, mail, chat, finance) and installable blocks in HeroUI Pro (paid)",
    },
    {
      feature: "Styling approach",
      minidev: "Source copied into your repo, styled with Tailwind utilities and semantic tokens",
      other: "Components ship in `@heroui/react`; styles ship as CSS in `@heroui/styles` using BEM classes, customized with Tailwind utilities and CSS variables",
    },
    { feature: "Primitives and accessibility", minidev: "Base UI (@base-ui/react)", other: "React Aria Components from Adobe" },
    {
      feature: "Animation",
      minidev: "motion (the Framer Motion successor) for motion pieces; CSS for core components",
      other: "CSS transitions driven by state data attributes; documented to work with Framer Motion for custom effects",
    },
    { feature: "Tailwind usage", minidev: "Tailwind CSS v4", other: "Tailwind CSS v4 is required (React 19 as well)" },
    {
      feature: "Install",
      minidev: "`npx shadcn@latest add https://ui.minidev.pro/r/<name>.json`, or npm `minidev-ui-kit`",
      other: "`npm i @heroui/styles @heroui/react`, then `@import \"@heroui/styles\";` after Tailwind in your CSS",
    },
    {
      feature: "Theming",
      minidev: "Semantic OKLCH tokens, materials (hairline, glass, metal, paper), one light source for shadows",
      other: "OKLCH CSS variables in background and `-foreground` pairs; several prebuilt themes shown on the site",
    },
    {
      feature: "Dark mode",
      minidev: "Yes, from the same token set",
      other: "Yes, by setting `class=\"dark\"` or `data-theme=\"dark\"` on the html element; next-themes suggested for Next.js",
    },
    {
      feature: "AI tooling",
      minidev: "`llms.txt` and `llms-full.txt`; shadcn MCP compatible",
      other: "`llms.txt`, the `@heroui/react-mcp` MCP server and agent skills; HeroUI Pro adds its own AI skills and MCPs",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[HeroUI](https://www.heroui.com) is the library previously known as NextUI. Version 3 combines React Aria Components for behavior and accessibility with Tailwind CSS v4 for styling. You install it from npm as `@heroui/react` plus `@heroui/styles`, import the styles after Tailwind, and use components with a compound API such as `Card.Header` and `Card.Content`. No provider wrapper is required. The open source library is MIT. A separate paid product, [HeroUI Pro](https://heroui.pro), adds more components and blocks, full-page templates, design systems and AI tooling, and there is also HeroUI Native for React Native apps.",
    },
    {
      type: "p",
      text: "MiniDev UI is a free, MIT licensed shadcn-compatible registry of over 500 items built on Base UI, Tailwind CSS v4 and motion. Instead of importing from a package, you add items with the shadcn CLI and the source lands in your project. The focus is product work: data tables, billing and invoice screens, settings layouts, command palettes, notification centers and AI chat, plus about 43 full-page blocks and 86 motion components, all drawing from one set of semantic tokens.",
    },
    { type: "h2", text: "Where HeroUI shines", id: "where-heroui-shines" },
    {
      type: "list",
      items: [
        "**Accessibility depth.** React Aria is one of the most thorough accessibility foundations in React, with careful keyboard, focus and screen reader behavior, including for date, time and color fields.",
        "**A versioned package.** Updates arrive through npm, so fixes reach your app with a version bump instead of a manual merge.",
        "**Web and native.** HeroUI Native gives React Native projects a related component set, which helps teams shipping both.",
        "**A consistent, attractive default look.** Components look finished out of the box, and several prebuilt themes are available.",
        "**AI support.** An official MCP server, `llms.txt` indexes and agent skills help coding assistants use the library correctly.",
      ],
    },
    { type: "h2", text: "Where MiniDev UI shines", id: "where-minidev-ui-shines" },
    {
      type: "list",
      items: [
        "**You own the code.** Every component is a file in your repo, so changing markup or behavior is an edit, not an override.",
        "**Finished product screens for free.** Billing, settings, sign in, admin consoles and chat pages are part of the MIT registry, with no paid tier.",
        "**A visual system.** One light source drives shadows across the page, and a `data-material` attribute switches between hairline, glass, metal and paper.",
        "**Motion included.** About 86 motion components built on motion sit next to the UI components and share the same tokens.",
      ],
    },
    { type: "component", name: "billing-page" },
    { type: "h2", text: "Using them together or migrating", id: "using-them-together-or-migrating" },
    {
      type: "p",
      text: "Both target Tailwind CSS v4, so they can live in one project. The main thing to watch is CSS variables: HeroUI's theme uses short names such as `--accent`, and MiniDev also defines `--accent` (its brand violet) along with the standard shadcn names. Whichever stylesheet loads later wins for overlapping names, so check both light and dark mode after adding the second library. Keeping each library to its own area, for example HeroUI in an existing app and MiniDev UI blocks for new pages, avoids most surprises.",
    },
    {
      type: "p",
      text: "If you are moving screens from HeroUI to MiniDev UI, go one route at a time. Event props differ because HeroUI follows React Aria conventions (for example `onPress` on buttons) while MiniDev components use standard DOM props such as `onClick`. Compound components like `Card.Header` map to named exports in MiniDev, such as `CardHeader` and `CardContent`. Data-heavy screens are the easiest place to start, since a MiniDev block often replaces a hand-assembled page.",
    },
    { type: "code", lang: "bash", code: "npx shadcn@latest add https://ui.minidev.pro/r/billing-page.json" },
    {
      type: "callout",
      tone: "note",
      text: "HeroUI Pro plans and terms can change. Check [heroui.pro](https://heroui.pro) for current details.",
    },
    { type: "h2", text: "Which to pick", id: "which-to-pick" },
    {
      type: "list",
      items: [
        "**Choose HeroUI** if you prefer a maintained npm package, want React Aria accessibility, or also build for React Native.",
        "**Choose MiniDev UI** if you want the source in your repo, need application screens and page blocks, and want all of it free under MIT.",
        "**Choose both carefully** if you already run HeroUI and want MiniDev blocks for new areas; plan the shared CSS variable names up front.",
      ],
    },
  ],
  faq: [
    {
      q: "Is HeroUI the same as NextUI?",
      a: "Yes. HeroUI is the new name for NextUI. The current major version, HeroUI v3, is built on React Aria Components and Tailwind CSS v4.",
    },
    {
      q: "Is HeroUI free?",
      a: "The open source library is free and MIT licensed. HeroUI Pro, which adds components, blocks, templates and design systems, is paid. MiniDev UI has no paid tier.",
    },
    {
      q: "Which is better for accessibility?",
      a: "Both build on accessible headless primitives: HeroUI on React Aria, MiniDev UI on Base UI. React Aria is especially strong for complex inputs such as date, time and color fields. Test the screens you ship either way.",
    },
    {
      q: "Can I copy HeroUI components into my repo like shadcn/ui?",
      a: "HeroUI is installed as npm packages, so the component source stays in `node_modules` and you customize it through classes and CSS variables. MiniDev UI copies source into your project through the shadcn CLI.",
    },
  ],
  sources: [
    { label: "HeroUI home", url: "https://www.heroui.com/" },
    { label: "HeroUI on GitHub", url: "https://github.com/heroui-inc/heroui" },
    { label: "HeroUI license", url: "https://github.com/heroui-inc/heroui/blob/main/LICENSE" },
    { label: "HeroUI quick start", url: "https://www.heroui.com/docs/react/getting-started/quick-start" },
    { label: "HeroUI theming", url: "https://www.heroui.com/docs/react/getting-started/theming" },
    { label: "HeroUI animation", url: "https://www.heroui.com/docs/react/getting-started/animation" },
    { label: "HeroUI MCP server", url: "https://www.heroui.com/docs/react/getting-started/mcp-server" },
    { label: "HeroUI Pro", url: "https://heroui.pro/" },
    { label: "@heroui/react on npm", url: "https://www.npmjs.com/package/@heroui/react" },
  ],
}

export default comparison
