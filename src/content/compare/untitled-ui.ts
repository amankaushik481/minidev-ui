import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-untitled-ui",
  other: "Untitled UI React",
  otherUrl: "https://www.untitledui.com",
  title: "MiniDev UI vs Untitled UI React: which should you use?",
  description:
    "MiniDev UI vs Untitled UI React: both copy React and Tailwind v4 source into your repo. Compare Base UI with React Aria, free scope and one-time PRO pricing.",
  checked: "2026-10-15",
  summary:
    "Untitled UI React is a collection of React components built with Tailwind CSS v4 and React Aria, kept in sync with the Untitled UI Figma kit. The open source components are MIT and free, installed with `npx untitledui@latest add` or copied from the docs, while PRO is a one-time purchase (from $349 for a single user to $8,999 for an enterprise license) that unlocks 5k+ components and sections and 250+ page examples. MiniDev UI is a free, MIT, shadcn-compatible registry of 548 items on Base UI, Tailwind CSS v4 and motion, with product screens, blocks, motion and templates all included. Pick Untitled UI React if your design team works in the Untitled UI Figma kit, you want React Aria accessibility, or you are willing to pay once for a very large catalogue of sections and pages. Pick MiniDev UI if you want everything free, prefer shadcn tooling and Base UI, and need motion and dashboard screens.",
  rows: [
    {
      feature: "Price",
      minidev: "Free, everything",
      other: "Free open source components; PRO is a one-time purchase: Solo $349, Studio $999 (up to 8 users), Business $2,499 (up to 20), Enterprise $8,999 (unlimited)",
    },
    {
      feature: "License",
      minidev: "MIT",
      other: "MIT for the open source components; a Standard License for PRO and an Enterprise EULA for PRO Enterprise",
    },
    {
      feature: "Scope",
      minidev: "548 items: 397 UI components, 108 motion components, 43 blocks and pages",
      other: "Free base components and core application UI components; PRO lists 5k+ components and sections and 250+ page examples",
    },
    {
      feature: "Install model",
      minidev: "Source copied into your repo with `npx shadcn@latest add @minidev/<name>`, or npm `minidev-ui-kit`",
      other: "`npx untitledui@latest init --nextjs` for a new project, `npx untitledui@latest add [component-name]` for one component, or copy from the docs; manual setup for any React plus Tailwind stack",
    },
    { feature: "Primitives", minidev: "Base UI (`@base-ui/react`)", other: "React Aria Components" },
    {
      feature: "Tailwind",
      minidev: "Tailwind CSS v4, with tokens in `styles.css` and a compatibility map for shadcn token names",
      other: "Tailwind CSS v4, with tokens in a `theme.css` using `@theme` plus the `tailwindcss-animate` and `tailwindcss-react-aria-components` plugins",
    },
    {
      feature: "Design source",
      minidev: "19 free design tools and brand kit generation on the same site",
      other: "Synced with the Untitled UI Figma kit (a separate product); an icon set of 4,600+ icons sold separately with a free subset",
    },
    {
      feature: "Frameworks",
      minidev: "React, with install guides for Next.js, Vite, Astro, React Router and TanStack Start",
      other: "React; starter kits for Next.js, Vite and TanStack Start, and setup guides for Bolt, Claude, v0 and Lovable",
    },
    { feature: "Dark mode", minidev: "Yes, from the same token set", other: "Yes, through design tokens and CSS variables" },
    {
      feature: "AI tooling",
      minidev: "`llms.txt` and `llms-full.txt`; works with the shadcn MCP server as a registry",
      other: "Bolt.new integration and setup guides for AI builders",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Untitled UI React](https://www.untitledui.com) is the code counterpart of the Untitled UI Figma kit: React components built with Tailwind CSS v4, TypeScript and React Aria Components, with native dark mode through design tokens. When you select a component its code is added to your project, either through the CLI (`npx untitledui@latest add [component-name]`) or by copying from the docs, and a manual setup installs `react-aria-components`, `tailwindcss-react-aria-components`, `tailwind-merge`, `tailwindcss-animate` and `@untitledui/icons`. The open source components are MIT and free, including base components and core application pieces such as tables, tabs, date pickers, charts, pagination, modals and navigation. PRO is a one-time purchase, from $349 for one user to $8,999 for an enterprise license, and adds 5k+ components and sections, 250+ page examples and Figma sync. MiniDev UI is a free, MIT licensed shadcn-compatible registry of 548 items built on Base UI, Tailwind CSS v4 and motion, with 43 full page blocks, 108 motion components, 15 block types and 8 landing page templates, installed with the shadcn CLI or from npm as `minidev-ui-kit`.",
    },
    { type: "h2", text: "Where each one is the better pick", id: "where-each-one-is-the-better-pick" },
    {
      type: "list",
      items: [
        "**Pick Untitled UI React if design lives in the Untitled UI Figma kit.** PRO components are synced with the kit, so handoff from design to code stays close.",
        "**Pick Untitled UI React for React Aria.** React Aria Components are a thorough accessibility foundation with WAI-ARIA keyboard and screen reader behavior, and Untitled UI builds on them directly.",
        "**Pick Untitled UI React if you want the largest catalogue and can pay once.** 5k+ components and sections and 250+ page examples in PRO is more surface than any free library offers.",
        "**Pick MiniDev UI if you want everything free.** All 548 items, including dashboards, billing, settings, admin and chat pages, are MIT with no PRO tier.",
        "**Pick MiniDev UI for shadcn tooling and motion.** It installs with the shadcn CLI, maps shadcn token names, works with the shadcn MCP server, and includes 108 motion components built on motion.",
      ],
    },
    { type: "component", name: "dashboard-home" },
    {
      type: "callout",
      tone: "note",
      text: "Untitled UI PRO prices were shown as discounts from higher list prices when we checked ($349 from $499 for Solo, for example); see [untitledui.com/pricing](https://www.untitledui.com/pricing) for current terms. Both libraries are Tailwind CSS v4 React source you own, so they can share a project; you would carry both React Aria and Base UI, and both define their own CSS tokens, so load order matters.",
    },
  ],
  faq: [
    {
      q: "Is Untitled UI React free?",
      a: "The open source components are free and MIT licensed. PRO is a one-time purchase that adds more components, sections and page examples. MiniDev UI has no paid tier.",
    },
    {
      q: "React Aria or Base UI: which is better?",
      a: "Both are accessible headless foundations. Untitled UI React builds on React Aria Components and MiniDev UI builds on Base UI, which comes from the MUI organization. Test the screens you ship either way.",
    },
    {
      q: "Can I use both in one project?",
      a: "Yes. Both are Tailwind CSS v4 React components copied into your repo. You would carry React Aria and Base UI together, and Untitled UI defines its theme in `theme.css` while MiniDev UI ships `styles.css`, so check which tokens win in light and dark mode.",
    },
  ],
  sources: [
    { label: "Untitled UI home", url: "https://www.untitledui.com" },
    { label: "Untitled UI React introduction", url: "https://www.untitledui.com/react/docs/introduction" },
    { label: "Untitled UI React installation", url: "https://www.untitledui.com/react/docs/installation" },
    { label: "Untitled UI React components", url: "https://www.untitledui.com/react/components" },
    { label: "Untitled UI pricing", url: "https://www.untitledui.com/pricing" },
    { label: "untitleduico on GitHub", url: "https://github.com/untitleduico" },
  ],
}

export default comparison
