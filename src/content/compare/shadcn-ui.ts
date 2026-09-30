import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-shadcn-ui",
  other: "shadcn/ui",
  otherUrl: "https://ui.shadcn.com",
  title: "MiniDev UI vs shadcn/ui: which should you use?",
  description:
    "MiniDev UI vs shadcn/ui: both are free, MIT, open code React and Tailwind v4 components. See how they differ in scope, primitives, theming and blocks.",
  checked: "2026-09-30",
  summary:
    "shadcn/ui is the foundation: a small, carefully maintained set of core components, the CLI and the registry format that most of this ecosystem is built on. MiniDev UI is a shadcn-compatible registry that sits on top of that model and adds a much wider set of product screens (billing, settings, data tables, AI chat, dashboards), motion pieces, full-page blocks and a light-and-material theming system. Start with shadcn/ui if you want the smallest, most widely known base. Add MiniDev UI when you need finished product surfaces or its visual system. Many projects will use both.",
  rows: [
    { feature: "Price", minidev: "Free", other: "Free" },
    { feature: "License", minidev: "MIT", other: "MIT" },
    {
      feature: "Scope",
      minidev: "About 495 registry items: roughly 370 UI components, 82 motion components and 43 blocks and pages",
      other: "Core UI components, charts and a set of blocks; see the docs for the current list",
    },
    {
      feature: "Blocks",
      minidev: "Full pages: billing, settings, sign in, analytics, inbox, chat, admin consoles, marketing sections",
      other: "Blocks for dashboards, sidebars, login and more, offered for both Radix and Base UI",
    },
    {
      feature: "Templates",
      minidev: "8 landing page templates shown as live demos, with brand kits (not downloadable as whole apps)",
      other: "No official full-site templates; a large community template ecosystem",
    },
    {
      feature: "Primitives",
      minidev: "Base UI (@base-ui/react)",
      other: "Radix UI or Base UI; Base UI became the default in the July 2026 changelog",
    },
    { feature: "Animation", minidev: "motion (the Framer Motion successor) for motion pieces; CSS for core components", other: "Mostly CSS transitions; no motion library required by default" },
    { feature: "Tailwind version", minidev: "Tailwind CSS v4", other: "Tailwind CSS v4, with legacy docs for v3" },
    {
      feature: "Install",
      minidev: "`npx shadcn@latest add https://ui.minidev.pro/r/<name>.json`, or npm `minidev-ui-kit`",
      other: "`npx shadcn@latest add <name>` from the official registry",
    },
    {
      feature: "Theming",
      minidev: "Semantic OKLCH tokens plus materials (hairline, glass, metal, paper) and one shared light source for shadows",
      other: "CSS variable tokens (background, foreground, primary and so on) with theme presets",
    },
    { feature: "Dark mode", minidev: "Yes, from the same token set", other: "Yes" },
    {
      feature: "AI tooling",
      minidev: "`llms.txt` and `llms-full.txt`; works with the shadcn MCP server as a registry",
      other: "`llms.txt` and an official MCP server for browsing and installing from registries",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[shadcn/ui](https://ui.shadcn.com) is not a package you install and import. It is a set of components whose source you copy into your project with a CLI, then own and edit. Around that idea it built a registry format, so any site can publish components that the same CLI can install. It ships a core set of accessible components, charts, blocks and theming, and it is MIT licensed. Its docs now cover both Radix UI and Base UI, and its July 2026 changelog made Base UI the default.",
    },
    {
      type: "p",
      text: "MiniDev UI is one of those registries. Every item is a single file you can add with the shadcn CLI, or you can install the whole kit from npm as `minidev-ui-kit`. It is built on Base UI, Tailwind CSS v4 and motion, and it is also MIT. The difference is scope and look: about 495 items, most of them screens and parts of screens that product teams build over and over, drawn to one visual system.",
    },
    { type: "h2", text: "Where shadcn/ui shines", id: "where-shadcn-ui-shines" },
    {
      type: "list",
      items: [
        "**The default choice.** It is the most widely used base in this ecosystem, so tutorials, AI tools and hiring pools already know it.",
        "**A small, stable core.** The component set is deliberately focused, which keeps your codebase lean and easy to reason about.",
        "**The registry and CLI.** The registry format, the directory of community registries and the MCP server are what make libraries like MiniDev UI possible.",
        "**Primitive choice.** You can pick Radix UI or Base UI for your project.",
      ],
    },
    { type: "h2", text: "Where MiniDev UI shines", id: "where-minidev-ui-shines" },
    {
      type: "list",
      items: [
        "**Product surfaces, finished.** Billing pages, invoice lists, settings layouts, data tables, kanban boards, command palettes, AI chat threads and prompt inputs, each ready to drop in.",
        "**Full-page blocks.** Around 43 compositions such as a sign in page, analytics page, support inbox and admin console, so you start from a working screen instead of a blank route.",
        "**Motion pieces.** About 72 animated components (heroes, pricing, marquees, scroll stories) built on motion, all free.",
        "**Light and material.** One light source drives directional shadows across the page, and a `data-material` attribute switches between hairline, glass, metal and paper without touching component code.",
      ],
    },
    { type: "component", name: "billing-page" },
    { type: "h2", text: "Using them together", id: "using-them-together" },
    {
      type: "p",
      text: "Because MiniDev UI is a shadcn registry, the two mix in one project. A common setup is to keep your existing shadcn/ui primitives and add MiniDev pieces by URL where you need a full screen:",
    },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/data-table.json\nnpx shadcn@latest add https://ui.minidev.pro/r/settings-page.json",
    },
    {
      type: "p",
      text: "The MiniDev stylesheet includes a compatibility map that points the shadcn token names (`--background`, `--foreground`, `--card`, `--primary`, `--muted`, `--ring`, the sidebar and chart tokens) at MiniDev tokens, so your shadcn components pick up the same theme and dark mode.",
    },
    {
      type: "callout",
      tone: "warning",
      text: "Two things to watch. First, some items share names with shadcn/ui (`button`, `dialog` and others) and install to the same path, so the CLI will ask before overwriting; keep whichever version you prefer. Second, MiniDev's `accent` is the brand violet, while shadcn/ui uses `accent` as a subtle hover fill, so check menus and list hovers after adding the stylesheet.",
    },
    { type: "h2", text: "Install and migration notes", id: "install-and-migration-notes" },
    {
      type: "p",
      text: "If you start fresh, set up a project with shadcn/ui as usual, then add the MiniDev tokens after Tailwind in your global CSS: `@import \"tailwindcss\";` followed by `@import \"minidev-ui-kit/styles.css\";`. If you copy files instead of installing the npm package, copy `styles.css` from any component's docs page. Components import Base UI directly, so the CLI adds `@base-ui/react` as a dependency when needed.",
    },
    {
      type: "p",
      text: "If your project uses the Radix flavor of shadcn/ui, you can still add MiniDev components; they bring their own Base UI imports and do not replace your Radix ones. Over time you may want to settle on one primitive library to keep the bundle and the mental model small, and the shadcn/ui move to Base UI as default makes that easier.",
    },
    {
      type: "p",
      text: "Either way, the code lives in your repo. There is no runtime dependency on either site after install, and you can edit any file freely.",
    },
  ],
  faq: [
    {
      q: "Is MiniDev UI a fork of shadcn/ui?",
      a: "No. It is a separate set of components that uses the shadcn registry format, so the shadcn CLI can install it. The code and design system are its own.",
    },
    {
      q: "Can I use MiniDev UI and shadcn/ui in the same project?",
      a: "Yes. Install shadcn/ui as usual and add MiniDev items by URL. The MiniDev stylesheet maps shadcn token names to its own tokens, so both follow one theme. Watch for components with the same file name, such as `button`.",
    },
    {
      q: "Do both use Base UI?",
      a: "MiniDev UI is built on Base UI. shadcn/ui supports both Radix UI and Base UI, and its July 2026 changelog made Base UI the default for new projects.",
    },
    {
      q: "Are both free for commercial projects?",
      a: "Yes. Both are MIT licensed, so you can use them in commercial and client work.",
    },
  ],
  sources: [
    { label: "shadcn/ui docs", url: "https://ui.shadcn.com/docs" },
    { label: "shadcn/ui changelog: Base UI as the default (July 2026)", url: "https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default" },
    { label: "shadcn/ui changelog: Blocks for Radix and Base UI (February 2026)", url: "https://ui.shadcn.com/docs/changelog/2026-02-blocks" },
    { label: "shadcn/ui Tailwind v4 docs", url: "https://ui.shadcn.com/docs/tailwind-v4" },
    { label: "shadcn/ui MCP server", url: "https://ui.shadcn.com/docs/registry/mcp" },
    { label: "shadcn/ui registry directory", url: "https://ui.shadcn.com/docs/directory" },
    { label: "shadcn/ui llms.txt", url: "https://ui.shadcn.com/llms.txt" },
    { label: "shadcn-ui/ui on GitHub", url: "https://github.com/shadcn-ui/ui" },
  ],
}

export default comparison
