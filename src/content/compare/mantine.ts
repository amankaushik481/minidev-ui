import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-mantine",
  other: "Mantine",
  otherUrl: "https://mantine.dev",
  title: "MiniDev UI vs Mantine: which should you use?",
  description:
    "MiniDev UI vs Mantine: a Tailwind CSS v4 registry you copy into your repo versus a full React library with its own CSS, hooks and packages. Both free and MIT.",
  checked: "2026-09-30",
  summary:
    "Mantine is a mature, fully featured React library: 100+ components, dozens of hooks and packages for forms, dates, charts, notifications and more, styled with its own plain CSS files rather than Tailwind, and entirely free under MIT. MiniDev UI is also free and MIT, but it is a shadcn-compatible registry built on Base UI and Tailwind CSS v4 that copies source into your repo, with finished product screens, motion components and full pages. Pick Mantine if you want one dependable package that covers almost everything, including a strong form library and date pickers, without Tailwind. Pick MiniDev UI if your project runs on Tailwind and you want to own and restyle the code.",
  rows: [
    { feature: "Price", minidev: "Free, everything", other: "Free; no paid tier for the library, and the Mantine UI collection is free too" },
    { feature: "License", minidev: "MIT", other: "MIT" },
    {
      feature: "Scope",
      minidev: "Over 500 items: roughly 375 UI components, 86 motion components, 43 blocks and pages",
      other: "100+ components and 70+ hooks, plus packages for forms, dates, charts, notifications, spotlight, rich text, carousel, dropzone and modals",
    },
    {
      feature: "Blocks and templates",
      minidev: "About 43 blocks and pages; 8 landing page templates shown as live demos, with brand kits",
      other: "Mantine UI: 123 free, MIT prebuilt components for application UI, page sections and blogs; starter templates for Next.js and Vite",
    },
    {
      feature: "Styling approach",
      minidev: "Source copied into your repo, styled with Tailwind utilities and semantic tokens",
      other: "Plain CSS files shipped with the packages; CSS modules recommended for customization, plus the Styles API and style props",
    },
    {
      feature: "Primitives and accessibility",
      minidev: "Base UI (@base-ui/react)",
      other: "Mantine's own components (Floating UI for positioning); accessibility is a stated core focus",
    },
    {
      feature: "Animation",
      minidev: "motion (the Framer Motion successor) for motion pieces; CSS for core components",
      other: "CSS transitions, with a Transition component and premade transitions such as fade and scale",
    },
    {
      feature: "Tailwind usage",
      minidev: "Tailwind CSS v4",
      other: "Not required; can be combined with Tailwind, usually by disabling Tailwind's preflight",
    },
    {
      feature: "Install",
      minidev: "`npx shadcn@latest add https://ui.minidev.pro/r/<name>.json`, or npm `minidev-ui-kit`",
      other: "`npm i @mantine/core @mantine/hooks`, import `@mantine/core/styles.css`, wrap the app in `MantineProvider`; PostCSS preset recommended",
    },
    {
      feature: "Theming",
      minidev: "Semantic OKLCH tokens, materials (hairline, glass, metal, paper), one light source for shadows",
      other: "`createTheme` object passed to `MantineProvider`; colors as arrays of 10 shades; theme values exposed as CSS variables",
    },
    {
      feature: "Dark mode",
      minidev: "Yes, from the same token set",
      other: "Yes: light, dark or auto via `defaultColorScheme`, stored in local storage, with `ColorSchemeScript` for server rendering",
    },
    {
      feature: "AI tooling",
      minidev: "`llms.txt` and `llms-full.txt`; shadcn MCP compatible",
      other: "`llms.txt`, `llms-full.txt`, an experimental `@mantine/mcp-server` and agent skills",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Mantine](https://mantine.dev) is a fully featured React component library maintained by Vitaly Rtishchev and hundreds of contributors. The core package covers inputs, overlays, navigation, layout and data display, and a family of separate packages adds a form library, date pickers, charts built on Recharts, a notifications system, a spotlight command center, a rich text editor based on Tiptap, a carousel and more. Styles ship as regular CSS files, so there is no runtime styling cost, and you customize components with CSS modules, the Styles API or style props. Everything is MIT and free.",
    },
    {
      type: "p",
      text: "MiniDev UI is a free, MIT licensed shadcn-compatible registry of over 500 items built on Base UI, Tailwind CSS v4 and motion. You add items with the shadcn CLI and the source lands in your repo. Its focus is product screens: data tables, billing and invoice pages, settings layouts, command palettes, notification centers and AI chat, plus about 43 full-page blocks and 86 motion components under one token system.",
    },
    { type: "h2", text: "Where Mantine shines", id: "where-mantine-shines" },
    {
      type: "list",
      items: [
        "**Breadth in one dependency.** Components, 70+ hooks, forms, dates and charts come from one maintainer with one API style, so pieces fit together.",
        "**Forms and dates.** `@mantine/form` handles form state and validation, and `@mantine/dates` provides date and time pickers, both designed to work with the core inputs.",
        "**No Tailwind required.** Teams that prefer CSS modules or plain CSS get a complete system without adopting utility classes.",
        "**Stable releases.** Mantine documents a regular cadence of patch, minor and major versions and keeps docs for previous versions online.",
        "**Free extras.** The Mantine UI site offers 123 free prebuilt components, and the docs publish `llms.txt` files and an MCP server for AI tools.",
      ],
    },
    { type: "h2", text: "Where MiniDev UI shines", id: "where-minidev-ui-shines" },
    {
      type: "list",
      items: [
        "**Tailwind native.** If your codebase is already on Tailwind CSS v4, MiniDev components use the same utilities and tokens as the rest of your UI.",
        "**You own the code.** Every component is a file in your repo, so changes are edits rather than overrides through a styles API.",
        "**Finished screens.** About 43 blocks and pages, from sign in to an admin console, give you a working screen to adapt.",
        "**A visual system.** One light source drives shadows, and a `data-material` attribute switches between hairline, glass, metal and paper.",
        "**Motion included.** About 86 motion components built on motion share the same tokens as the UI.",
      ],
    },
    { type: "component", name: "settings-page" },
    { type: "h2", text: "Using them together or migrating", id: "using-them-together-or-migrating" },
    {
      type: "p",
      text: "Running both in one app is possible but means two styling systems. Mantine's help center says that disabling Tailwind's preflight is usually enough to keep global styles from affecting Mantine components; if you need preflight, see the guides linked from their help page. MiniDev UI expects Tailwind's base styles, so a mixed app needs some care. In practice, a clean split works better: keep Mantine in an existing app and use MiniDev UI for a new Tailwind surface, such as a marketing site or a separate dashboard.",
    },
    {
      type: "p",
      text: "When moving from Mantine to MiniDev UI, migrate a route at a time. Mantine's `MantineProvider`, theme object and hooks do not carry over, so map your theme colors to MiniDev's semantic tokens first. Mantine hooks are standalone, so `@mantine/hooks` can stay in the project while you replace components. Form and date logic usually needs the most attention, since MiniDev UI provides the input components and a form wizard but not a separate form state library.",
    },
    { type: "code", lang: "bash", code: "npx shadcn@latest add https://ui.minidev.pro/r/settings-page.json" },
    { type: "h2", text: "Which to pick", id: "which-to-pick" },
    {
      type: "list",
      items: [
        "**Choose Mantine** if you want one well documented package for nearly everything, especially forms and dates, and you do not want Tailwind.",
        "**Choose MiniDev UI** if your project uses Tailwind CSS v4 and you want editable source, product screens and full-page blocks.",
        "**Keep them separate** if you need both: one per app or surface is simpler than mixing two styling systems on the same page.",
      ],
    },
  ],
  faq: [
    {
      q: "Is Mantine free for commercial use?",
      a: "Yes. Mantine and the Mantine UI collection are MIT licensed and free, including in commercial projects. MiniDev UI is also MIT with no paid tier.",
    },
    {
      q: "Does Mantine use Tailwind CSS?",
      a: "No. Mantine ships its own CSS files and recommends CSS modules for customization. It can run alongside Tailwind, usually with Tailwind's preflight disabled. MiniDev UI is built on Tailwind CSS v4.",
    },
    {
      q: "Which is better for complex forms?",
      a: "Mantine has a dedicated form library and date packages, which makes it strong for form-heavy apps. MiniDev UI provides form fields and a form wizard and pairs with any form state library you already use.",
    },
    {
      q: "Can I keep Mantine hooks after switching components?",
      a: "Yes. `@mantine/hooks` is a separate package, so you can keep using its hooks while replacing Mantine components with MiniDev UI.",
    },
  ],
  sources: [
    { label: "Mantine home", url: "https://mantine.dev/" },
    { label: "Mantine on GitHub", url: "https://github.com/mantinedev/mantine" },
    { label: "Mantine getting started", url: "https://mantine.dev/getting-started/" },
    { label: "Mantine styles overview", url: "https://mantine.dev/styles/styles-overview/" },
    { label: "Mantine theme object", url: "https://mantine.dev/theming/theme-object/" },
    { label: "Mantine color schemes", url: "https://mantine.dev/theming/color-schemes/" },
    { label: "Mantine Transition", url: "https://mantine.dev/core/transition/" },
    { label: "Mantine with Tailwind CSS (help center)", url: "https://help.mantine.dev/q/third-party-styles" },
    { label: "Mantine with LLMs", url: "https://mantine.dev/guides/llms/" },
    { label: "Mantine about", url: "https://mantine.dev/about/" },
    { label: "Mantine UI", url: "https://ui.mantine.dev/" },
  ],
}

export default comparison
