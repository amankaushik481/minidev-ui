import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-headless-ui",
  other: "Headless UI",
  otherUrl: "https://headlessui.com",
  title: "MiniDev UI vs Headless UI: which should you use?",
  description:
    "MiniDev UI vs Headless UI: Tailwind Labs' unstyled React and Vue primitives against a free, styled shadcn-compatible registry on Base UI and Tailwind v4.",
  checked: "2026-10-15",
  summary:
    "Headless UI is a set of completely unstyled, fully accessible components from Tailwind Labs, published as `@headlessui/react` (v2.1 on the site) and `@headlessui/vue` (documented at v1.7), MIT licensed and free. The React docs list 16 components: Dropdown Menu, Disclosure, Dialog, Popover, Tabs and Transition, plus form pieces such as Combobox, Listbox, Switch and Radio Group, all styled by you through data attributes and render props. MiniDev UI is a styled layer: 548 free, MIT, shadcn-compatible items built on Base UI, Tailwind CSS v4 and motion, copied into your repo. Pick Headless UI if you want a small, dependable set of primitives for a design system of your own, or you work in Vue. Pick MiniDev UI if you want finished components and screens that already look like a product, built on Base UI rather than Headless UI.",
  rows: [
    { feature: "Price", minidev: "Free, everything", other: "Free" },
    { feature: "License", minidev: "MIT", other: "MIT" },
    {
      feature: "What it is",
      minidev: "Styled components, full page blocks, motion pieces and templates",
      other: "Unstyled, accessible primitives designed to integrate with Tailwind CSS",
    },
    {
      feature: "Scope",
      minidev: "548 items: 397 UI components, 108 motion components, 43 blocks and pages",
      other: "16 React components (Dropdown Menu, Disclosure, Dialog, Popover, Tabs, Transition, Button, Checkbox, Combobox, Fieldset, Input, Listbox, Radio Group, Select, Switch, Textarea); 10 for Vue",
    },
    {
      feature: "Install",
      minidev: "`npx shadcn@latest add @minidev/<name>`, or npm `minidev-ui-kit`",
      other: "`npm install @headlessui/react` or `npm install @headlessui/vue`",
    },
    { feature: "Frameworks", minidev: "React", other: "React and Vue" },
    {
      feature: "Styling",
      minidev: "Tailwind CSS v4 utilities with semantic OKLCH tokens, already applied",
      other: "None shipped; you style states through `data-open`, `data-focus`, `data-active` and similar attributes or render props, for example `data-focus:bg-blue-100`",
    },
    {
      feature: "Primitives",
      minidev: "Base UI (`@base-ui/react`)",
      other: "Headless UI is itself the primitive layer; the Menu docs show a built in `transition` prop and `anchor` positioning",
    },
    { feature: "Maintainer", minidev: "MiniDev", other: "Tailwind Labs" },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Headless UI](https://headlessui.com) is Tailwind Labs' set of completely unstyled, fully accessible UI components, designed to integrate with Tailwind CSS. The React package, `@headlessui/react`, is at v2.1 on the site and covers 16 components: six interaction pieces (Dropdown Menu, Disclosure, Dialog, Popover, Tabs, Transition) and ten form pieces (Button, Checkbox, Combobox, Fieldset, Input, Listbox, Radio Group, Select, Switch, Textarea). You bring every visual decision, usually as Tailwind classes keyed to state attributes such as `data-open` and `data-focus`, and the Menu docs show a built in `transition` prop and `anchor` positioning for the dropdown. A Vue package, `@headlessui/vue`, is documented at v1.7 with ten components. It is MIT licensed and free. MiniDev UI lives one layer up: a free, MIT licensed shadcn-compatible registry of 548 items built on Base UI, Tailwind CSS v4 and motion, where buttons, dialogs, menus, data tables, billing pages and AI chat screens arrive styled and ready, as source in your repo.",
    },
    { type: "h2", text: "Where each one is the better pick", id: "where-each-one-is-the-better-pick" },
    {
      type: "list",
      items: [
        "**Pick Headless UI to build your own design system.** A small, stable set of primitives with no visual opinions is the right base when every pixel is yours to decide.",
        "**Pick Headless UI for Vue.** `@headlessui/vue` gives Vue projects the same unstyled, accessible components. MiniDev UI is React only.",
        "**Pick Headless UI if you already use Tailwind Labs' tooling.** It is made by the Tailwind CSS team and its examples use Tailwind variants directly.",
        "**Pick MiniDev UI when you want finished components.** Dialogs, menus, comboboxes, command palettes, data tables and 43 full pages are styled with one token set and dark mode, so there is nothing to design before you ship.",
        "**Pick MiniDev UI for the shadcn ecosystem.** It installs with the shadcn CLI, maps shadcn token names, works with the shadcn MCP server, and sits on Base UI, a headless library many shadcn projects already use.",
      ],
    },
    { type: "component", name: "command-palette" },
    {
      type: "callout",
      tone: "note",
      text: "MiniDev UI is not built on Headless UI; its behavior comes from Base UI. If you already use Headless UI with Tailwind, you can add MiniDev blocks route by route, since both are Tailwind. Overlay components such as Dialog and Menu will then exist twice (Headless UI and Base UI), so decide which library owns overlays to keep focus management and the bundle simple.",
    },
  ],
  faq: [
    {
      q: "Is MiniDev UI built on Headless UI?",
      a: "No. MiniDev UI uses Base UI for behavior and accessibility. Headless UI is a separate primitive library from Tailwind Labs.",
    },
    {
      q: "Does Headless UI include styles?",
      a: "No. It is completely unstyled by design; you add classes, often Tailwind utilities keyed to its data attributes such as `data-open` and `data-focus`. MiniDev UI ships styled components with a token system and dark mode.",
    },
    {
      q: "Which should I use with Vue?",
      a: "Headless UI, which publishes `@headlessui/vue`. MiniDev UI is React only.",
    },
  ],
  sources: [
    { label: "Headless UI home", url: "https://headlessui.com" },
    { label: "Headless UI Menu docs (React)", url: "https://headlessui.com/react/menu" },
    { label: "Headless UI for Vue (v1)", url: "https://headlessui.com/v1/vue" },
    { label: "tailwindlabs/headlessui on GitHub", url: "https://github.com/tailwindlabs/headlessui" },
  ],
}

export default comparison
