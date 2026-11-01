import type { Matchup } from "../types"

const matchup: Matchup = {
  slug: "daisyui-vs-flowbite",
  title: "daisyUI vs Flowbite: which to use?",
  description:
    "daisyUI vs Flowbite: a CSS-only Tailwind plugin with 35 themes against Tailwind components with a JavaScript layer, a React library and a Pro tier. Both MIT.",
  a: "daisyui",
  b: "flowbite",
  checked: "2026-09-30",
  verdict:
    "Both are free, MIT licensed Tailwind CSS libraries that work outside React. daisyUI is CSS only: semantic class names like `btn` and 35 built-in themes, with no JavaScript. Flowbite is Tailwind markup plus a script that wires interactivity through data attributes, with an official React library and a paid Pro tier.",
  pickA:
    "you want the lightest setup, short class names and many switchable themes, and native HTML behavior (or your own code) is enough for interactive parts.",
  pickB:
    "you want dropdowns, modals and tabs to work without writing JavaScript, an official React version, or a Figma design system and a large library of sections.",
  rows: [
    {
      feature: "Price",
      a: "Free; templates and a Figma library in the daisyUI store and the Blueprint MCP server are paid",
      b: "Free; Flowbite Pro (Figma design system, all blocks, admin dashboard) is paid",
    },
    { feature: "License", a: "MIT", b: "MIT for code (docs under CC BY 3.0); Flowbite Pro under its own EULA" },
    {
      feature: "Format",
      a: "Tailwind plugin that adds component class names (`btn`, `card`, `modal`)",
      b: "Tailwind utility classes in your markup, a Tailwind plugin, and a JavaScript file that wires behavior through data attributes",
    },
    {
      feature: "JavaScript",
      a: "None; interactive parts use native HTML such as `<dialog>`, popover or checkbox patterns",
      b: "Flowbite's own vanilla JavaScript with a programmatic API; Flowbite React uses React components with Floating UI for positioning",
    },
    {
      feature: "Scope",
      a: "68 components as CSS class names, 35 built-in themes and a theme generator",
      b: "60+ UI components in the core library; Flowbite React provides React versions of the core components",
    },
    {
      feature: "Frameworks",
      a: "Any: plain HTML, React, Vue, Svelte, Astro and others",
      b: "Integration guides for React, Next.js, Vue, Nuxt, Svelte, Angular, Laravel, Rails, Django, Flask and more",
    },
    {
      feature: "Install",
      a: "Install the `daisyui` npm package, then add `@plugin \"daisyui\";` after `@import \"tailwindcss\";`",
      b: "`npm install flowbite`, then `@plugin \"flowbite/plugin\";` and a `@source` line; React: `npx flowbite-react@latest init`",
    },
    {
      feature: "Theming",
      a: "Themes as OKLCH CSS variables, applied with `data-theme` on any element",
      b: "Native Tailwind v4 theme variables in `@theme`, with prebuilt themes (default, minimal, enterprise, playful, mono)",
    },
    {
      feature: "Dark mode",
      a: "Mark a theme with `--prefersdark` to follow the system setting, or switch themes with `data-theme`",
      b: "Class based: a `dark` class on the html element and `dark:` variants in component classes",
    },
    {
      feature: "Blocks and templates",
      a: "Official templates (dashboards, landing pages, auth) sold in the daisyUI store; component examples in the free docs",
      b: "Flowbite Blocks for application, marketing and e-commerce sections, with full access in Flowbite Pro",
    },
    {
      feature: "AI tooling",
      a: "`llms.txt`, setup guides for many editors, a daisyUI skill and the paid Blueprint MCP server",
      b: "Official MIT licensed Flowbite MCP server for Figma to code, theme generation and component context",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[daisyUI](https://daisyui.com) describes itself as a CSS library for Tailwind CSS 4 that supplies class names for common UI components, semantic colors and themes. Instead of a long list of utilities for a button, you write `btn btn-primary` and add utilities where you need them. Version 5 installs as a Tailwind plugin, has zero dependencies and ships no JavaScript, which is why it works the same in plain HTML, React, Vue, Svelte or a server rendered template.",
    },
    {
      type: "p",
      text: "[Flowbite](https://flowbite.com) is an open source library of UI components based on Tailwind CSS. The core is HTML with Tailwind classes, a Tailwind plugin and a JavaScript file that makes dropdowns, modals, tabs and other interactive parts work through data attributes. [Flowbite React](https://flowbite-react.com) offers official React components, components are designed in Figma first, and Flowbite Pro sells the Figma design system, the full blocks collection and an admin dashboard.",
    },
    { type: "h2", text: "Where daisyUI shines", id: "where-daisyui-shines" },
    {
      type: "list",
      items: [
        "**Framework agnostic.** The same class names work in any stack, which suits multi-framework teams, server rendered apps and prototypes.",
        "**Very light setup.** One plugin line in your CSS, no runtime JavaScript and no dependencies.",
        "**Themes.** 35 built-in themes, a theme generator and `data-theme` switching on any element make it easy to try looks or offer user themes.",
        "**Short markup.** Semantic class names keep templates readable compared with long utility strings.",
      ],
    },
    { type: "h2", text: "Where Flowbite shines", id: "where-flowbite-shines" },
    {
      type: "list",
      items: [
        "**Behavior included.** The script wires dropdowns, modals, tabs and other interactive parts through data attributes, with a programmatic API if you prefer.",
        "**Works almost anywhere.** The data attribute approach fits server rendered apps in Laravel, Rails or Django as well as JavaScript frameworks.",
        "**Figma to code.** A Figma design system mirrors the components, and the official MCP server can turn Figma layers into Flowbite code with an AI assistant.",
        "**An official React library.** Flowbite React gives React apps components instead of a script scanning the DOM.",
        "**Section library.** Flowbite Blocks cover marketing, application and e-commerce sections.",
      ],
    },
    { type: "h2", text: "The trade-offs", id: "the-trade-offs" },
    {
      type: "list",
      items: [
        "**Behavior.** daisyUI ships no JavaScript, so any behavior beyond what native HTML gives you is yours to add. Flowbite's script handles dropdowns, modals and tabs for you, at the cost of a JavaScript file.",
        "**Markup style.** daisyUI keeps templates short with semantic class names. Flowbite components are plain Tailwind utility classes: longer, but familiar to anyone who knows Tailwind.",
        "**Themes.** daisyUI's 35 themes switch per element with `data-theme`. Flowbite's prebuilt themes use native Tailwind v4 theme variables, so a brand color change flows through utility classes.",
        "**What costs money.** daisyUI sells templates, a Figma library and the Blueprint MCP server separately. Flowbite Pro sells the Figma design system, the full blocks collection and an admin dashboard.",
        "**In React.** Avoid running the Flowbite script and React components against the same elements; Flowbite React exists for that case. daisyUI class names work in JSX as they are.",
      ],
    },
  ],
  minidev: [
    "MiniDev UI is React only, so it is not an alternative for a Laravel, Rails or plain HTML project; daisyUI or Flowbite is the better tool there. In a React app, MiniDev UI components carry their behavior through Base UI rather than a script or native HTML, and the free MIT registry adds product screens such as billing, settings and admin pages, built for Tailwind CSS v4.",
    "If you are on React and comparing these two, see [MiniDev UI vs daisyUI](/compare/minidev-ui-vs-daisyui) and [MiniDev UI vs Flowbite](/compare/minidev-ui-vs-flowbite).",
  ],
  faq: [
    {
      q: "Is daisyUI or Flowbite better for plain HTML?",
      a: "Both work in plain HTML. daisyUI is the lighter choice when native HTML behavior is enough, since it ships no JavaScript. Flowbite is the better choice when you want dropdowns, modals and tabs to work through its data attribute script.",
    },
    {
      q: "Do daisyUI and Flowbite support Tailwind CSS v4?",
      a: "Yes. daisyUI 5 installs with `@plugin \"daisyui\";` in your CSS, and the Flowbite quickstart is written for Tailwind v4 and uses `@plugin \"flowbite/plugin\";`. Flowbite React accepts Tailwind v3 or v4.",
    },
    {
      q: "Are daisyUI and Flowbite free?",
      a: "Yes, both libraries are MIT licensed and free. daisyUI sells templates, a Figma library and the Blueprint MCP server; Flowbite sells Flowbite Pro, with the Figma design system, all blocks and an admin dashboard.",
    },
    {
      q: "Which one has a React version?",
      a: "Flowbite, through the official Flowbite React library. daisyUI does not need one, because its class names work in JSX as they are.",
    },
    {
      q: "Which has more themes?",
      a: "daisyUI, with 35 built-in themes and a theme generator. Flowbite offers prebuilt themes (default, minimal, enterprise, playful, mono) built on Tailwind v4 theme variables.",
    },
  ],
  sources: [
    { label: "daisyUI home", url: "https://daisyui.com/" },
    { label: "daisyUI 5 release notes", url: "https://daisyui.com/docs/v5/" },
    { label: "daisyUI themes", url: "https://daisyui.com/docs/themes/" },
    { label: "daisyUI components", url: "https://daisyui.com/components/" },
    { label: "daisyUI modal", url: "https://daisyui.com/components/modal/" },
    { label: "daisyUI editor and LLM setup", url: "https://daisyui.com/docs/editor/" },
    { label: "daisyUI Blueprint", url: "https://daisyui.com/blueprint/" },
    { label: "daisyUI store", url: "https://daisyui.com/store/" },
    { label: "Flowbite introduction", url: "https://flowbite.com/docs/getting-started/introduction/" },
    { label: "Flowbite license", url: "https://flowbite.com/docs/getting-started/license/" },
    { label: "Flowbite theming", url: "https://flowbite.com/docs/customize/theming/" },
    { label: "Flowbite dark mode", url: "https://flowbite.com/docs/customize/dark-mode/" },
    { label: "Flowbite MCP server", url: "https://flowbite.com/docs/getting-started/mcp/" },
    { label: "Flowbite Pro", url: "https://flowbite.com/pro/" },
    { label: "Flowbite React quickstart", url: "https://flowbite-react.com/docs/getting-started/quickstart" },
  ],
}

export default matchup
