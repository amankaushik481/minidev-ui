import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-chakra-ui",
  other: "Chakra UI",
  otherUrl: "https://chakra-ui.com",
  title: "MiniDev UI vs Chakra UI: which should you use?",
  description:
    "MiniDev UI vs Chakra UI: a Tailwind CSS v4 registry on Base UI versus a style-prop React system on Ark UI. Compare theming, install, blocks, Pro and AI tools.",
  checked: "2026-09-30",
  summary:
    "Chakra UI is a long-standing, MIT licensed React component system. Version 3 is built on Ark UI and styled with its own engine through style props, tokens and recipes rather than Tailwind, and Chakra UI Pro sells premium blocks and templates. MiniDev UI is also free and MIT, but it is a shadcn-compatible registry built on Base UI and Tailwind CSS v4 that copies source into your repo, with product screens, motion components and full pages at no cost. Pick Chakra UI if your team likes style props and a typed token system, or already runs Chakra. Pick MiniDev UI if your project is on Tailwind and you want finished screens you can edit directly.",
  rows: [
    {
      feature: "Price",
      minidev: "Free, everything",
      other: "Free library; Chakra UI Pro blocks and templates are a paid one-time purchase, with a small set of free blocks",
    },
    { feature: "License", minidev: "MIT", other: "MIT for the library; Chakra UI Pro has its own terms" },
    {
      feature: "Scope",
      minidev: "Over 500 items: roughly 375 UI components, 86 motion components, 43 blocks and pages",
      other: "A broad set of accessible React components, plus CLI snippets: ready compositions copied into `components/ui`",
    },
    {
      feature: "Blocks and templates",
      minidev: "About 43 blocks and pages; 8 landing page templates shown as live demos, with brand kits",
      other: "Chakra UI Pro blocks for application, marketing and e-commerce, added with `chakra blocks add` and a Pro API key; templates also in Pro",
    },
    {
      feature: "Styling approach",
      minidev: "Source copied into your repo, styled with Tailwind utilities and semantic tokens",
      other: "Its own styling engine (built on Emotion) with style props, tokens, recipes and slot recipes",
    },
    { feature: "Primitives and accessibility", minidev: "Base UI (@base-ui/react)", other: "Ark UI, which is built on Zag.js state machines" },
    {
      feature: "Animation",
      minidev: "motion (the Framer Motion successor) for motion pieces; CSS for core components",
      other: "CSS animations keyed to `data-state`, through `_open` and `_closed` style props",
    },
    { feature: "Tailwind usage", minidev: "Tailwind CSS v4", other: "Not used; styling goes through Chakra's own system" },
    {
      feature: "Install",
      minidev: "`npx shadcn@latest add https://ui.minidev.pro/r/<name>.json`, or npm `minidev-ui-kit`",
      other: "`npm i @chakra-ui/react @emotion/react`, `npx @chakra-ui/cli snippet add`, then wrap the app in the generated `Provider`",
    },
    {
      feature: "Theming",
      minidev: "Semantic OKLCH tokens, materials (hairline, glass, metal, paper), one light source for shadows",
      other: "`defineConfig` and `createSystem` with tokens and semantic tokens output as CSS variables; `typegen` CLI for typed theme APIs",
    },
    {
      feature: "Dark mode",
      minidev: "Yes, from the same token set",
      other: "Yes, through next-themes in the generated `Provider`, with semantic tokens adapting per mode",
    },
    {
      feature: "AI tooling",
      minidev: "`llms.txt` and `llms-full.txt`; shadcn MCP compatible",
      other: "`llms.txt`, AI rules and skills, and the `@chakra-ui/react-mcp` MCP server (template tools need a Pro license)",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Chakra UI](https://chakra-ui.com) is one of the best known React component systems. Version 3 rebuilt it on [Ark UI](https://ark-ui.com), which uses Zag.js state machines for behavior, and styles components with Chakra's own engine: you pass style props such as `px` and `bg`, define tokens and semantic tokens with `defineConfig` and `createSystem`, and describe variants with recipes and slot recipes. The CLI also adds snippets, which are ready compositions copied into your `components/ui` folder, and generates types for your theme. The library is MIT, and [Chakra UI Pro](https://pro.chakra-ui.com) sells premium blocks and templates.",
    },
    {
      type: "p",
      text: "MiniDev UI is a free, MIT licensed shadcn-compatible registry of over 500 items built on Base UI, Tailwind CSS v4 and motion. You add items with the shadcn CLI and the source lands in your repo. Its focus is product screens: data tables, billing and invoice pages, settings, command palettes, notification centers and AI chat, plus about 43 full-page blocks and 86 motion components under one token system.",
    },
    { type: "h2", text: "Where Chakra UI shines", id: "where-chakra-ui-shines" },
    {
      type: "list",
      items: [
        "**Style props.** Many developers find it fast to style directly on components with typed props, with responsive values and pseudo props like `_hover` built in.",
        "**A typed design system.** Tokens, semantic tokens and recipes live in one config, and the `typegen` command keeps autocomplete in sync with your theme.",
        "**Solid primitives.** Ark UI and Zag.js give consistent, accessible behavior for complex components.",
        "**Mature ecosystem.** Chakra has a large community, years of answers, and a migration path with a v2 to v3 review tool in its MCP server.",
        "**AI support.** An official MCP server, `llms.txt`, AI rules and skills help coding assistants use the library.",
      ],
    },
    { type: "h2", text: "Where MiniDev UI shines", id: "where-minidev-ui-shines" },
    {
      type: "list",
      items: [
        "**Tailwind native.** If your codebase uses Tailwind CSS v4, MiniDev components share the same utilities and tokens as the rest of your UI.",
        "**No paid tier.** Full-page blocks such as billing, settings and admin consoles are free under MIT.",
        "**You own the code.** Every component is a file in your repo, styled with plain Tailwind classes and no runtime styling engine.",
        "**A visual system.** One light source drives shadows, and a `data-material` attribute switches between hairline, glass, metal and paper.",
        "**Motion included.** About 86 motion components built on motion share the same tokens as the UI.",
      ],
    },
    { type: "component", name: "data-table" },
    { type: "h2", text: "Using them together or migrating", id: "using-them-together-or-migrating" },
    {
      type: "p",
      text: "Chakra UI and MiniDev UI can run in the same React app, but that means two styling systems: Chakra's engine and Tailwind. Chakra layers its styles with CSS cascade layers, and Tailwind v4 also uses layers, so check how global resets interact before shipping. A cleaner split is Chakra in an existing app and MiniDev UI for a new Tailwind surface, such as a marketing site or a separate internal tool.",
    },
    {
      type: "p",
      text: "When migrating from Chakra to MiniDev UI, start by mapping your semantic tokens (colors, radii, shadows) to MiniDev's tokens so both look the same during the transition. Then move a route at a time. Style props become Tailwind classes, for example `px={4}` becomes `px-4`, and recipe variants map to component variants. Data-heavy screens are a good first step, since a MiniDev block often replaces a page assembled from many smaller parts.",
    },
    { type: "code", lang: "bash", code: "npx shadcn@latest add https://ui.minidev.pro/r/data-table.json" },
    {
      type: "callout",
      tone: "note",
      text: "Chakra UI Pro plans can change. Check [pro.chakra-ui.com](https://pro.chakra-ui.com) for current pricing and terms.",
    },
    { type: "h2", text: "Which to pick", id: "which-to-pick" },
    {
      type: "list",
      items: [
        "**Choose Chakra UI** if your team prefers style props and a typed token config over utility classes, or you already have a Chakra codebase.",
        "**Choose MiniDev UI** if you use Tailwind CSS v4 and want editable source, product screens and full-page blocks, all free.",
        "**Keep them separate** if you need both; one per app or surface avoids running two styling systems on the same page.",
      ],
    },
  ],
  faq: [
    {
      q: "Is Chakra UI free?",
      a: "Yes, the library is MIT licensed and free. Chakra UI Pro, which sells premium blocks and templates, is a paid one-time purchase, and a few blocks are offered free. MiniDev UI has no paid tier.",
    },
    {
      q: "Does Chakra UI use Tailwind CSS?",
      a: "No. Chakra UI v3 uses its own styling engine with style props, tokens and recipes. MiniDev UI is built on Tailwind CSS v4.",
    },
    {
      q: "What primitives do they use?",
      a: "Chakra UI v3 is built on Ark UI, which uses Zag.js state machines. MiniDev UI is built on Base UI. Both aim for accessible keyboard and focus behavior.",
    },
    {
      q: "Do I need a provider for either library?",
      a: "Chakra UI needs its `Provider` at the root of your app, which also sets up color mode. Most MiniDev UI components need only the token stylesheet; an optional `LightProvider` adds the moving light source that shadows follow.",
    },
  ],
  sources: [
    { label: "Chakra UI home", url: "https://chakra-ui.com/" },
    { label: "Chakra UI on GitHub", url: "https://github.com/chakra-ui/chakra-ui" },
    { label: "Chakra UI installation", url: "https://chakra-ui.com/docs/get-started/installation" },
    { label: "Chakra UI CLI", url: "https://chakra-ui.com/docs/get-started/cli" },
    { label: "Chakra UI theming overview", url: "https://chakra-ui.com/docs/theming/overview" },
    { label: "Chakra UI animation", url: "https://chakra-ui.com/docs/components/concepts/animation" },
    { label: "Chakra UI MCP server", url: "https://chakra-ui.com/docs/get-started/ai/mcp-server" },
    { label: "Chakra UI Pro", url: "https://pro.chakra-ui.com/" },
    { label: "Chakra UI Pro pricing", url: "https://pro.chakra-ui.com/pricing" },
    { label: "Chakra UI Pro free blocks", url: "https://pro.chakra-ui.com/blocks/free" },
    { label: "@chakra-ui/react on npm", url: "https://www.npmjs.com/package/@chakra-ui/react" },
  ],
}

export default comparison
