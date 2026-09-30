import type { Guide } from "../types"

const guide: Guide = {
  slug: "free-shadcn-component-libraries",
  title: "The best free shadcn/ui component libraries in 2026",
  description:
    "Ten free shadcn/ui compatible component libraries compared: what each is best at, license notes, primitives and links, so you can pick the right mix.",
  date: "2026-09-30",
  keywords: [
    "free shadcn component libraries",
    "shadcn ui alternatives",
    "shadcn registry",
    "animated shadcn components",
    "free react tailwind components",
  ],
  related: ["data-table", "billing-page", "chat-thread", "pricing-plans"],
  body: [
    {
      type: "p",
      text: "shadcn/ui changed how React teams get components. Instead of installing a package and fighting its styles, you copy the source into your repo and own it. Its registry format then let anyone publish components that the same CLI can install, and an ecosystem grew around it. This guide covers ten free libraries that work in that model, what each is genuinely best at, and how to combine them. It is written by the team behind MiniDev UI, which is on the list, so we have tried to be fair and to point you to the right tool even when it is not ours.",
    },
    {
      type: "callout",
      tone: "note",
      text: "Facts were checked on September 30, 2026. Licenses and pricing change, so confirm on each project's site before you ship. Where a library also sells a paid tier, we say so.",
    },
    { type: "h2", text: "How we chose", id: "how-we-chose" },
    {
      type: "list",
      items: [
        "**Free to use.** Every library here has a free, usable core. Some also sell paid extras.",
        "**Fits the shadcn model.** The code ends up in your repo, usually through the shadcn CLI or copy and paste.",
        "**Actively used.** Each project is well known in the ecosystem and has a public site with docs.",
        "**Different strengths.** We picked libraries that cover different needs: foundations, animation, product screens, data and dashboards.",
      ],
    },
    { type: "h2", text: "At a glance", id: "at-a-glance" },
    {
      type: "table",
      head: ["Library", "Best for", "Cost", "Primitives"],
      rows: [
        ["shadcn/ui", "The foundation for everything else", "Free, MIT", "Radix UI or Base UI"],
        ["Magic UI", "Animated details for marketing pages", "Free; paid Pro templates", "Built to sit next to shadcn/ui"],
        ["Aceternity UI", "Standout visual effects", "Free components; paid Pro plans", "Mostly custom"],
        ["coss ui (formerly Origin UI)", "Clean, production tested app components", "Free", "Base UI"],
        ["MiniDev UI", "Product screens and full pages", "Free, MIT", "Base UI"],
        ["Kibo UI", "Advanced, composable components", "Free", "Builds on shadcn/ui"],
        ["ReUI", "A large set of patterns and a data grid", "Free core", "Base UI and Radix versions"],
        ["Animate UI", "Animated versions of familiar components", "Free", "Built with the shadcn CLI and Motion"],
        ["Motion Primitives", "Composable animation building blocks", "Free", "Motion"],
        ["Tremor", "Charts and dashboards", "Free", "Tailwind, copy and paste"],
      ],
    },
    { type: "h2", text: "1. shadcn/ui", id: "shadcn-ui" },
    {
      type: "p",
      text: "[shadcn/ui](https://ui.shadcn.com) is the starting point. It provides a focused set of accessible core components (buttons, dialogs, menus, forms, tables, charts and more), blocks for common layouts like dashboards, sidebars and login screens, a theming system based on CSS variables, the CLI and the registry format. It supports both Radix UI and Base UI, and its July 2026 changelog made Base UI the default. It also publishes an `llms.txt` and an MCP server, so AI coding tools can browse and install from it and from other registries.",
    },
    {
      type: "p",
      text: "**Best for:** every project in this ecosystem. Even if most of your UI comes from another library, shadcn/ui is usually what sets up your project, tokens and CLI. **License:** MIT.",
    },
    { type: "h2", text: "2. Magic UI", id: "magic-ui" },
    {
      type: "p",
      text: "[Magic UI](https://magicui.design) is a free, open source library of animated components and effects for design engineers: animated text, number tickers, marquees, backgrounds, borders and device mockups. It follows shadcn/ui conventions closely and installs with the shadcn CLI, and it has an official MCP server for AI editors. A separate paid product, Magic UI Pro, sells sections and templates.",
    },
    {
      type: "p",
      text: "**Best for:** adding polished motion to a marketing page without redesigning it. **License:** open source; see [LICENSE.md](https://github.com/magicuidesign/magicui/blob/main/LICENSE.md) in the repo. Pro content has its own terms.",
    },
    { type: "h2", text: "3. Aceternity UI", id: "aceternity-ui" },
    {
      type: "p",
      text: "[Aceternity UI](https://ui.aceternity.com) is known for effects that make people stop scrolling: spotlight and beam backgrounds, 3D cards, animated text and scroll driven sections, built with Tailwind CSS and Framer Motion. The component collection is free to use and installable through the shadcn CLI, and paid annual or lifetime plans add premium blocks and full landing page templates.",
    },
    {
      type: "p",
      text: "**Best for:** a launch page, portfolio or hero that needs one memorable visual moment. **License:** its own terms; read the [license page](https://ui.aceternity.com/licence) before using Pro content in client work.",
    },
    { type: "h2", text: "4. coss ui (formerly Origin UI)", id: "coss-ui" },
    {
      type: "p",
      text: "Origin UI was a much loved collection of copy and paste application components. In October 2025 it became part of coss.com, the company behind Cal.com, and the work continues in [coss ui](https://coss.com/ui), a component library built on Base UI that serves as Cal.com's design system. Ready made compositions are called particles, and the classic Origin UI collection is still browsable at [coss.com/origin](https://coss.com/origin).",
    },
    {
      type: "p",
      text: "**Best for:** a clean, neutral component base with careful form controls, shaped by use in a real product. **License:** open source; check the [cosscom/coss](https://github.com/cosscom/coss) repository for current terms.",
    },
    { type: "h2", text: "5. MiniDev UI", id: "minidev-ui" },
    {
      type: "p",
      text: "[MiniDev UI](https://ui.minidev.pro) is a shadcn-compatible registry of over 500 items: roughly 375 UI components, 86 motion components and 43 blocks and pages. Its focus is the screens products live in after launch: data tables, billing and invoices, settings, dashboards, command palettes, notification centers and AI chat surfaces. It is built on Base UI, Tailwind CSS v4 and motion, with semantic OKLCH tokens and a light-and-material system where one light source drives shadows and a `data-material` attribute switches between hairline, glass, metal and paper. Install one file with `npx shadcn@latest add https://ui.minidev.pro/r/<name>.json`, or the whole kit from npm as `minidev-ui-kit`. It also publishes `llms.txt` for AI tools.",
    },
    {
      type: "p",
      text: "**Best for:** SaaS and internal tools that need finished product screens and one consistent look across app and site. It is React only and its eight landing page templates are live demos, not downloadable apps. **License:** MIT, with no paid tier.",
    },
    { type: "component", name: "billing-page" },
    { type: "h2", text: "6. Kibo UI", id: "kibo-ui" },
    {
      type: "p",
      text: "[Kibo UI](https://www.kibo-ui.com) is a custom registry of composable, accessible and extensible components designed for use with shadcn/ui. It fills gaps in the core set with more advanced pieces, the kind of components that take real effort to build well yourself, and installs through the shadcn CLI.",
    },
    {
      type: "p",
      text: "**Best for:** adding a few advanced, well engineered components to a standard shadcn/ui project. **License:** described by its maintainers as free and open source, forever; see the [GitHub repo](https://github.com/haydenbleasel/kibo).",
    },
    { type: "h2", text: "7. ReUI", id: "reui" },
    {
      type: "p",
      text: "[ReUI](https://reui.io) is a design-forward shadcn kit with a very large set of free patterns, a notable data grid component, and documentation for both Base UI and Radix versions of its components. It also offers an MCP integration for AI tools.",
    },
    {
      type: "p",
      text: "**Best for:** teams that want many ready variations of common patterns, or a capable data grid, while keeping a choice of primitives. **License:** open source; see the [keenthemes/reui](https://github.com/keenthemes/reui) repository, and check the site for any paid extras.",
    },
    { type: "h2", text: "8. Animate UI", id: "animate-ui" },
    {
      type: "p",
      text: "[Animate UI](https://animate-ui.com) is a fully animated, open source component distribution built with React, TypeScript, Tailwind CSS, Motion and the shadcn CLI. Its angle is animated versions of components you already know, so tabs, accordions, dialogs and similar pieces get fluid motion without you writing it.",
    },
    {
      type: "p",
      text: "**Best for:** products that want motion in everyday controls, not only on the marketing site. **License:** open source; see [LICENSE.md](https://github.com/imskyleen/animate-ui/blob/main/LICENSE.md) in the repo.",
    },
    { type: "h2", text: "9. Motion Primitives", id: "motion-primitives" },
    {
      type: "p",
      text: "[Motion Primitives](https://motion-primitives.com) is an open source UI kit for building animated interfaces faster. Rather than finished sections, it offers small, customizable building blocks (text effects, transitions, reveal and morphing patterns) that you compose into your own designs, built on Motion and Tailwind CSS.",
    },
    {
      type: "p",
      text: "**Best for:** developers who want animation building blocks to combine, rather than ready made effects. **License:** open source; see the [ibelick/motion-primitives](https://github.com/ibelick/motion-primitives) repository.",
    },
    { type: "h2", text: "10. Tremor", id: "tremor" },
    {
      type: "p",
      text: "[Tremor](https://www.tremor.so) provides copy and paste Tailwind CSS and React components for charts and dashboards. Vercel acquired Tremor in January 2025 to invest in open source React components. It is not a shadcn registry in the strict sense, but it fits the same copy the source workflow and pairs well with shadcn/ui projects. Tremor Blocks offers dashboard templates.",
    },
    {
      type: "p",
      text: "**Best for:** analytics dashboards and chart heavy screens. **License:** open source; check the site and repository for current terms, including for Tremor Blocks.",
    },
    { type: "h2", text: "How to choose", id: "how-to-choose" },
    {
      type: "p",
      text: "Most teams do not pick one library. They pick a base and add one or two specialists. A few common combinations:",
    },
    {
      type: "list",
      items: [
        "**A marketing site with some flair:** shadcn/ui as the base, plus Magic UI or Aceternity UI for the hero and a couple of animated sections.",
        "**A SaaS app:** shadcn/ui or coss ui for core components, plus MiniDev UI for billing, settings, tables and AI chat screens, or Kibo UI and ReUI for specific advanced components.",
        "**A dashboard:** Tremor or the shadcn/ui charts for data, with MiniDev UI or ReUI for tables and layout.",
        "**A product that should feel alive:** Animate UI for animated controls, with Motion Primitives for custom transitions.",
      ],
    },
    {
      type: "p",
      text: "Two technical details are worth checking before you mix libraries. First, **primitives**: shadcn/ui now defaults to Base UI, and coss ui and MiniDev UI are built on it, while other libraries may use Radix UI or no headless layer. Mixing works, but settling on one keeps your bundle and your mental model smaller. Second, **tokens**: most libraries read the shadcn/ui CSS variables such as `--background`, `--foreground` and `--primary`, but some define their own or hard code colors. After adding a component, switch to dark mode and change your brand color once to see what follows the theme and what does not.",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Watch for file name collisions. Many registries ship a `button`, `input` or `dialog` that installs to the same path. The shadcn CLI asks before overwriting, so decide which version you want to keep.",
    },
    { type: "h2", text: "Installing from any registry", id: "installing-from-any-registry" },
    {
      type: "p",
      text: "Every shadcn-compatible registry can be installed the same way: point the CLI at an item's JSON URL. The CLI writes the source file into your project and installs any npm dependencies it lists.",
    },
    {
      type: "code",
      lang: "bash",
      code: "# from the official registry\nnpx shadcn@latest add dialog\n\n# from any other registry, by URL\nnpx shadcn@latest add https://ui.minidev.pro/r/data-table.json",
    },
    {
      type: "p",
      text: "Some libraries also document a namespace syntax or their own CLI wrapper; each project's docs show the exact command. The shadcn/ui [registry directory](https://ui.shadcn.com/docs/directory) lists many more registries if none of the ten above fits.",
    },
  ],
  faq: [
    {
      q: "What is the best free alternative to shadcn/ui?",
      a: "Most libraries here are not alternatives so much as additions: they install through the shadcn CLI and sit next to shadcn/ui. If you want a different base, coss ui is a strong Base UI option. For animation, look at Magic UI, Aceternity UI or Animate UI. For product screens, look at MiniDev UI.",
    },
    {
      q: "Can I use several shadcn component libraries in one project?",
      a: "Yes. Because the code is copied into your repo, you can mix libraries freely. Watch for components with the same file name and for libraries that use different primitive layers or hard coded colors.",
    },
    {
      q: "Are these libraries free for commercial projects?",
      a: "shadcn/ui and MiniDev UI are MIT. The others have free, open source cores, and some sell paid tiers with their own terms. Check each project's license before shipping client work.",
    },
    {
      q: "Should I use Radix UI or Base UI?",
      a: "For a new project, Base UI is now the shadcn/ui default and is what coss ui and MiniDev UI are built on. Existing Radix projects keep working, and you can migrate one component at a time.",
    },
  ],
}

export default guide
