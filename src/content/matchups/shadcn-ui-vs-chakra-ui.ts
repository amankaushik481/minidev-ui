import type { Matchup } from "../types"

const matchup: Matchup = {
  slug: "shadcn-ui-vs-chakra-ui",
  title: "shadcn/ui vs Chakra UI: which to use?",
  description:
    "shadcn/ui vs Chakra UI: Tailwind source you copy into your repo against style props on Ark UI and Emotion. Compare install, theming, blocks and paid tiers.",
  a: "shadcn-ui",
  b: "chakra-ui",
  checked: "2026-09-30",
  verdict:
    "Both are free, MIT licensed React libraries with a CLI that puts code in your project, but they style in different ways. shadcn/ui is Tailwind CSS v4 source you own. Chakra UI v3 is an npm package with its own styling engine, style props and a typed token system, built on Ark UI.",
  pickA:
    "your project uses Tailwind CSS, you want every component as editable source, and you want access to the shadcn registry ecosystem.",
  pickB:
    "your team prefers style props and a typed theme config over utility classes, or you already run a Chakra UI codebase.",
  rows: [
    {
      feature: "Price",
      a: "Free",
      b: "Free library; Chakra UI Pro blocks and templates are a paid one-time purchase, with a small set of free blocks",
    },
    { feature: "License", a: "MIT", b: "MIT for the library; Chakra UI Pro has its own terms" },
    {
      feature: "Install model",
      a: "Source copied into your project with `npx shadcn@latest add <name>`",
      b: "`npm i @chakra-ui/react @emotion/react`, then `npx @chakra-ui/cli snippet add` and the generated `Provider` at the root",
    },
    {
      feature: "Styling",
      a: "Tailwind CSS v4 utilities and CSS variable tokens",
      b: "Its own styling engine (built on Emotion) with style props, tokens, recipes and slot recipes; Tailwind is not used",
    },
    {
      feature: "Primitives",
      a: "Radix UI or Base UI; Base UI became the default in the July 2026 changelog",
      b: "Ark UI, which is built on Zag.js state machines",
    },
    {
      feature: "Theming",
      a: "CSS variable tokens (background, foreground, primary and so on) with theme presets",
      b: "`defineConfig` and `createSystem` with tokens and semantic tokens output as CSS variables; `typegen` CLI for typed theme APIs",
    },
    { feature: "Dark mode", a: "Yes", b: "Yes, through next-themes in the generated `Provider`" },
    {
      feature: "Animation",
      a: "Mostly CSS transitions; no motion library required by default",
      b: "CSS animations keyed to `data-state`, through `_open` and `_closed` style props",
    },
    {
      feature: "Blocks and templates",
      a: "Blocks for dashboards, sidebars, login and more; no official full-site templates",
      b: "Chakra UI Pro blocks for application, marketing and e-commerce, added with `chakra blocks add` and a Pro API key; templates also in Pro",
    },
    {
      feature: "AI tooling",
      a: "`llms.txt` and an official MCP server for browsing and installing from registries",
      b: "`llms.txt`, AI rules and skills, and the `@chakra-ui/react-mcp` MCP server (template tools need a Pro license)",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[shadcn/ui](https://ui.shadcn.com) is a set of React components whose source you copy into your project with a CLI, then own and edit. Around that idea it built a registry format, so other sites can publish components that the same CLI installs. Components are styled with Tailwind CSS v4 and CSS variable tokens and run on Radix UI or Base UI, with Base UI the default since July 2026.",
    },
    {
      type: "p",
      text: "[Chakra UI](https://chakra-ui.com) is a long-standing, MIT licensed React component system. Version 3 is built on [Ark UI](https://ark-ui.com), which uses Zag.js state machines, and styles components with Chakra's own engine: style props such as `px` and `bg`, tokens and semantic tokens defined with `defineConfig` and `createSystem`, and variants described as recipes. Its CLI adds snippets (ready compositions copied into `components/ui`) and generates types for your theme, and Chakra UI Pro sells premium blocks and templates.",
    },
    { type: "h2", text: "Where shadcn/ui shines", id: "where-shadcn-ui-shines" },
    {
      type: "list",
      items: [
        "**Tailwind native.** If your codebase is on Tailwind CSS v4, the components use the same utilities and tokens as the rest of your UI.",
        "**You own the code.** The full source of each component lives in your repo.",
        "**The registry.** Community registries and the official MCP server work through the same CLI.",
        "**Free blocks.** Blocks for dashboards, sidebars and login pages come with the library at no cost.",
        "**Primitive choice.** A project can run on Radix UI or Base UI.",
      ],
    },
    { type: "h2", text: "Where Chakra UI shines", id: "where-chakra-ui-shines" },
    {
      type: "list",
      items: [
        "**Style props.** Typed props for styling directly on components, with responsive values and pseudo props like `_hover` built in.",
        "**A typed design system.** Tokens, semantic tokens and recipes live in one config, and the `typegen` command keeps autocomplete in sync with your theme.",
        "**Ark UI underneath.** Zag.js state machines give consistent, accessible behavior for complex components.",
        "**A mature ecosystem.** A large community, years of answers, and a v2 to v3 review tool in its MCP server for teams upgrading.",
        "**AI support.** An official MCP server, `llms.txt`, AI rules and skills help coding assistants use the library.",
      ],
    },
    { type: "h2", text: "The trade-offs", id: "the-trade-offs" },
    {
      type: "list",
      items: [
        "**Utilities or style props.** shadcn/ui puts Tailwind classes in your files. Chakra UI puts typed style props on components and moves variants into recipes.",
        "**Setup.** Chakra UI needs `@emotion/react` and its `Provider` at the root of the app. shadcn/ui needs Tailwind CSS and its CSS variables, and nothing from the shadcn/ui site at runtime.",
        "**Paid extras.** shadcn/ui is free, blocks included. Chakra UI's premium blocks and templates are in Chakra UI Pro, a one-time purchase, with a small set of free blocks.",
        "**Both in one app.** Possible, but that means two styling systems. Chakra layers its styles with CSS cascade layers and Tailwind v4 also uses layers, so check how global resets interact before shipping.",
      ],
    },
  ],
  minidev: [
    "MiniDev UI is a shadcn-compatible registry on Base UI and Tailwind CSS v4, so it extends the shadcn/ui side rather than offering a third model: same CLI, source in your repo, and a stylesheet that maps the shadcn token names to its own tokens. It adds product screens such as billing, settings, data tables and AI chat, plus full-page blocks and motion components, free under MIT. See [MiniDev UI vs shadcn/ui](/compare/minidev-ui-vs-shadcn-ui).",
    "If your team prefers Chakra's style props, MiniDev UI is not a fit, since it is styled with Tailwind utilities. A Chakra app can still use it for a separate Tailwind surface such as a marketing site, which [MiniDev UI vs Chakra UI](/compare/minidev-ui-vs-chakra-ui) covers.",
  ],
  faq: [
    {
      q: "Does Chakra UI use Tailwind CSS?",
      a: "No. Chakra UI v3 styles components with its own engine, built on Emotion, through style props, tokens and recipes. shadcn/ui is built on Tailwind CSS v4.",
    },
    {
      q: "Is Chakra UI free like shadcn/ui?",
      a: "Yes. The Chakra UI library is MIT licensed and free, as is shadcn/ui. Chakra UI Pro, which sells premium blocks and templates, is a paid one-time purchase.",
    },
    {
      q: "Do both CLIs copy code into my project?",
      a: "Yes, in different amounts. The shadcn CLI copies the full source of each component. The Chakra CLI adds snippets, ready compositions copied into `components/ui`, while the core components come from the `@chakra-ui/react` package.",
    },
    {
      q: "What primitives do they use?",
      a: "Chakra UI v3 is built on Ark UI, which uses Zag.js state machines. shadcn/ui runs on Radix UI or Base UI, with Base UI the default since its July 2026 changelog.",
    },
    {
      q: "Do they have MCP servers for AI coding tools?",
      a: "Yes. shadcn/ui has an official MCP server for browsing and installing from registries, and Chakra UI publishes `@chakra-ui/react-mcp`, whose template tools need a Pro license.",
    },
  ],
  sources: [
    { label: "shadcn/ui docs", url: "https://ui.shadcn.com/docs" },
    { label: "shadcn/ui changelog: Base UI as the default (July 2026)", url: "https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default" },
    { label: "shadcn/ui changelog: Blocks for Radix and Base UI (February 2026)", url: "https://ui.shadcn.com/docs/changelog/2026-02-blocks" },
    { label: "shadcn/ui MCP server", url: "https://ui.shadcn.com/docs/registry/mcp" },
    { label: "shadcn/ui llms.txt", url: "https://ui.shadcn.com/llms.txt" },
    { label: "Chakra UI home", url: "https://chakra-ui.com/" },
    { label: "Chakra UI installation", url: "https://chakra-ui.com/docs/get-started/installation" },
    { label: "Chakra UI CLI", url: "https://chakra-ui.com/docs/get-started/cli" },
    { label: "Chakra UI theming overview", url: "https://chakra-ui.com/docs/theming/overview" },
    { label: "Chakra UI animation", url: "https://chakra-ui.com/docs/components/concepts/animation" },
    { label: "Chakra UI MCP server", url: "https://chakra-ui.com/docs/get-started/ai/mcp-server" },
    { label: "Chakra UI Pro pricing", url: "https://pro.chakra-ui.com/pricing" },
    { label: "Chakra UI Pro free blocks", url: "https://pro.chakra-ui.com/blocks/free" },
  ],
}

export default matchup
