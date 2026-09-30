import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-daisyui",
  other: "daisyUI",
  otherUrl: "https://daisyui.com",
  title: "MiniDev UI vs daisyUI: which should you use?",
  description:
    "MiniDev UI vs daisyUI: a React component registry versus a CSS-only Tailwind plugin of class names and themes. Both free and MIT, built for Tailwind CSS v4.",
  checked: "2026-09-30",
  summary:
    "daisyUI is a free, MIT licensed Tailwind CSS plugin that adds semantic class names like `btn` and `card` plus 35 built-in themes, with no JavaScript and no dependencies, so it works in any framework or plain HTML. Paid extras include templates in the daisyUI store and the Blueprint MCP server. MiniDev UI is also free and MIT, but it is a React registry built on Base UI and Tailwind CSS v4: components come with behavior, keyboard handling and state, along with product screens, motion components and full pages. Pick daisyUI for fast, framework-agnostic styling and easy theme switching. Pick MiniDev UI for React apps that need interactive, accessible components and finished screens.",
  rows: [
    {
      feature: "Price",
      minidev: "Free, everything",
      other: "Free library; paid templates and Figma library in the daisyUI store, and a paid Blueprint MCP server",
    },
    { feature: "License", minidev: "MIT", other: "MIT" },
    {
      feature: "Scope",
      minidev: "Over 500 items: roughly 375 UI components, 86 motion components, 43 blocks and pages",
      other: "68 components as CSS class names, 35 built-in themes and a theme generator",
    },
    {
      feature: "Blocks and templates",
      minidev: "About 43 blocks and pages; 8 landing page templates shown as live demos, with brand kits",
      other: "Official templates (dashboards, landing pages, auth) sold in the daisyUI store; component examples in the free docs",
    },
    {
      feature: "Styling approach",
      minidev: "React components with source in your repo, styled with Tailwind utilities and semantic tokens",
      other: "Tailwind plugin that adds component class names (`btn`, `card`, `modal`), combined with Tailwind utilities",
    },
    {
      feature: "Primitives and accessibility",
      minidev: "Base UI (@base-ui/react) for focus, keyboard and ARIA behavior",
      other: "No JavaScript; interactive parts use native HTML such as `<dialog>`, popover or checkbox patterns, and any extra behavior is yours to add",
    },
    {
      feature: "Framework",
      minidev: "React",
      other: "Any: plain HTML, React, Vue, Svelte, Astro and others",
    },
    {
      feature: "Tailwind usage",
      minidev: "Tailwind CSS v4",
      other: "Tailwind CSS v4 plugin, added with `@plugin \"daisyui\";`, zero dependencies",
    },
    {
      feature: "Install",
      minidev: "`npx shadcn@latest add https://ui.minidev.pro/r/<name>.json`, or npm `minidev-ui-kit`",
      other: "Install the `daisyui` npm package, then add `@plugin \"daisyui\";` after `@import \"tailwindcss\";`",
    },
    {
      feature: "Theming",
      minidev: "Semantic OKLCH tokens, materials (hairline, glass, metal, paper), one light source for shadows",
      other: "Themes as OKLCH CSS variables (`--color-primary` and others), applied with `data-theme` on any element",
    },
    {
      feature: "Dark mode",
      minidev: "Yes, from the same token set",
      other: "Yes: mark a theme with `--prefersdark` to follow the system setting, or switch themes with `data-theme`",
    },
    {
      feature: "AI tooling",
      minidev: "`llms.txt` and `llms-full.txt`; shadcn MCP compatible",
      other: "`llms.txt`, setup guides for many editors, a daisyUI skill, and the paid Blueprint MCP server",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[daisyUI](https://daisyui.com) describes itself as a CSS library for Tailwind CSS 4 that supplies class names for common UI components, semantic colors and themes. Instead of writing a long list of utilities for a button, you write `btn btn-primary` and add utilities where you need them. Version 5 installs as a Tailwind plugin in your CSS file, has zero dependencies, and uses OKLCH CSS variables for its 35 built-in themes. It ships no JavaScript, which is why it works the same in plain HTML, React, Vue, Svelte or a server-rendered template.",
    },
    {
      type: "p",
      text: "MiniDev UI is a free, MIT licensed shadcn-compatible registry of over 500 React items built on Base UI, Tailwind CSS v4 and motion. Each item is a component with behavior: a combobox filters and handles the keyboard, a dialog traps focus, a data table sorts its columns. You add items with the shadcn CLI and the source lands in your repo, along with about 43 full-page blocks and 86 motion components.",
    },
    { type: "h2", text: "Where daisyUI shines", id: "where-daisyui-shines" },
    {
      type: "list",
      items: [
        "**Framework agnostic.** The same class names work in any stack, which suits multi-framework teams, server-rendered apps and prototypes.",
        "**Very light setup.** One plugin line in your CSS, no runtime JavaScript and no dependencies.",
        "**Themes.** 35 built-in themes, a theme generator, and `data-theme` switching on any element make it easy to try looks or offer user themes.",
        "**Short markup.** Semantic class names keep templates readable compared with long utility strings.",
        "**Large community.** It is one of the most popular Tailwind component libraries, so examples are easy to find.",
      ],
    },
    { type: "h2", text: "Where MiniDev UI shines", id: "where-minidev-ui-shines" },
    {
      type: "list",
      items: [
        "**Behavior included.** Menus, comboboxes, date pickers, dialogs and command palettes come with keyboard support and ARIA from Base UI, so you do not wire it yourself.",
        "**Product screens.** Billing, settings, sign in, admin consoles and AI chat are ready to adapt, free under MIT.",
        "**A visual system.** One light source drives shadows, and a `data-material` attribute switches between hairline, glass, metal and paper.",
        "**Motion included.** About 86 motion components built on motion share the same tokens as the UI.",
      ],
    },
    { type: "component", name: "command-palette" },
    { type: "h2", text: "Using them together or migrating", id: "using-them-together-or-migrating" },
    {
      type: "p",
      text: "Because daisyUI is a Tailwind plugin and MiniDev UI uses Tailwind utilities, both can be installed in one Tailwind CSS v4 project. The practical issue is theming: daisyUI themes set their own color variables, and MiniDev components read MiniDev tokens, so the two will not share a theme automatically. If you mix them, map your daisyUI brand colors to MiniDev's semantic tokens (or the reverse) and test light and dark modes. A cleaner split is daisyUI for simple, mostly static pages and MiniDev UI for the interactive app.",
    },
    {
      type: "p",
      text: "Moving a React app from daisyUI to MiniDev UI usually starts with the interactive parts. Replace hand-wired modals, dropdowns and tabs with MiniDev components, since those gain the most from Base UI behavior. Static pieces such as badges, cards and alerts can move later, or stay on daisyUI classes for a while.",
    },
    { type: "code", lang: "bash", code: "npx shadcn@latest add https://ui.minidev.pro/r/command-palette.json" },
    {
      type: "callout",
      tone: "note",
      text: "daisyUI store items and Blueprint plans can change. Check [daisyui.com/store](https://daisyui.com/store/) and [daisyui.com/blueprint](https://daisyui.com/blueprint/) for current details.",
    },
    { type: "h2", text: "Which to pick", id: "which-to-pick" },
    {
      type: "list",
      items: [
        "**Choose daisyUI** if you are not on React, want the lightest possible setup, or want many switchable themes with minimal effort.",
        "**Choose MiniDev UI** if you are building a React app and want accessible interactive components and product screens without writing the behavior yourself.",
        "**Use both** only with a plan for shared colors; otherwise pick one per surface.",
      ],
    },
  ],
  faq: [
    {
      q: "Is daisyUI free?",
      a: "Yes. The library is MIT licensed and free. Official templates, a Figma library and the Blueprint MCP server are sold separately. MiniDev UI has no paid tier.",
    },
    {
      q: "Does daisyUI include JavaScript?",
      a: "No. daisyUI is CSS only. Interactive components rely on native HTML, such as the `<dialog>` element for modals, or on your own code. MiniDev UI components include their behavior through Base UI.",
    },
    {
      q: "Can daisyUI and MiniDev UI run in the same Tailwind project?",
      a: "Yes, both work with Tailwind CSS v4. They use different color variables, so plan how your brand colors map across both before mixing them on one page.",
    },
    {
      q: "Which is better for a non-React project?",
      a: "daisyUI, since its class names work in any framework or plain HTML. MiniDev UI is React only.",
    },
  ],
  sources: [
    { label: "daisyUI home", url: "https://daisyui.com/" },
    { label: "daisyUI on GitHub", url: "https://github.com/saadeghi/daisyui" },
    { label: "daisyUI 5 release notes", url: "https://daisyui.com/docs/v5/" },
    { label: "daisyUI themes", url: "https://daisyui.com/docs/themes/" },
    { label: "daisyUI components", url: "https://daisyui.com/components/" },
    { label: "daisyUI modal", url: "https://daisyui.com/components/modal/" },
    { label: "daisyUI llms.txt", url: "https://daisyui.com/llms.txt" },
    { label: "daisyUI editor and LLM setup", url: "https://daisyui.com/docs/editor/" },
    { label: "daisyUI Blueprint", url: "https://daisyui.com/blueprint/" },
    { label: "daisyUI store", url: "https://daisyui.com/store/" },
  ],
}

export default comparison
