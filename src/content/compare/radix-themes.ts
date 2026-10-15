import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-radix-themes",
  other: "Radix Themes",
  otherUrl: "https://www.radix-ui.com/themes",
  title: "MiniDev UI vs Radix Themes: which should you use?",
  description:
    "MiniDev UI vs Radix Themes: a free shadcn-compatible Tailwind v4 registry on Base UI compared with WorkOS's pre-styled, vanilla CSS React component library.",
  checked: "2026-10-15",
  summary:
    "Radix Themes is an open source, MIT licensed, pre-styled React component library made by WorkOS. You install `@radix-ui/themes` from npm, import its stylesheet, wrap the app in a `Theme` component and set accent color, gray color, radius and scaling with props. It is built with vanilla CSS and does not depend on Tailwind. MiniDev UI is a free, MIT, shadcn-compatible registry that copies source into your repo, built on Base UI, Tailwind CSS v4 and motion, with 548 items. Pick Radix Themes if you want a coherent, closed component system with strong color scales and no utility CSS. Pick MiniDev UI if you want Tailwind, editable source, and finished product screens, blocks and motion.",
  rows: [
    { feature: "Price", minidev: "Free, everything", other: "Free" },
    { feature: "License", minidev: "MIT", other: "MIT" },
    {
      feature: "Scope",
      minidev: "548 items: 397 UI components, 108 motion components, 43 blocks and pages",
      other: "36 components plus 5 layout, 9 typography and 6 utility components in the docs sidebar (56 in all)",
    },
    {
      feature: "Install model",
      minidev: "Source copied into your repo with `npx shadcn@latest add @minidev/<name>`, or npm `minidev-ui-kit`",
      other: "npm package `@radix-ui/themes`; import `@radix-ui/themes/styles.css` and wrap the app in `<Theme>`",
    },
    {
      feature: "Styling",
      minidev: "Tailwind CSS v4 utilities with semantic OKLCH tokens",
      other: "Vanilla CSS under the hood with its own CSS variables and no built in styling system; the docs say Tailwind may not mix well with its closed component model",
    },
    {
      feature: "Theming",
      minidev: "Semantic tokens plus materials (hairline, glass, metal, paper) and one light source for shadows",
      other: "`accentColor`, `grayColor`, `radius` and `scaling` props on `Theme`, a `ThemePanel` for live preview, dark mode through appearances; colors powered by Radix Colors with almost 30 scales",
    },
    {
      feature: "Primitives",
      minidev: "Base UI (`@base-ui/react`)",
      other: "Radix Primitives are the unstyled sibling; the docs point to them for custom components, and Tab Nav is built on the Navigation Menu primitive",
    },
    {
      feature: "Customization",
      minidev: "Edit the file in your repo",
      other: "Components are described as relatively closed, customized through props and theme configuration; most accept `className` and `style`",
    },
    {
      feature: "Blocks and templates",
      minidev: "15 block types, 43 full page blocks and 8 landing page templates as live demos",
      other: "Components, layout, typography and utilities, plus a playground on the site",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Radix Themes](https://www.radix-ui.com/themes) is described by its makers at WorkOS as an open source component library optimized for fast development, easy maintenance and accessibility. It is pre-styled: you install `@radix-ui/themes`, import `styles.css`, wrap the root in `Theme`, and set `accentColor`, `grayColor`, `radius` and `scaling` as props. Under the hood it is built with vanilla CSS and exposes the same CSS variables that power its components, with colors from Radix Colors. The docs are candid that components are relatively closed and are meant to be customized within their props and theme configuration, and that Tailwind may not mix well with that model. MiniDev UI takes the opposite approach: 548 items that land as source in your repo, styled with Tailwind CSS v4 utilities and semantic OKLCH tokens, with behavior from Base UI and 108 motion components built on motion. Both are MIT.",
    },
    { type: "h2", text: "Where each one is the better pick", id: "where-each-one-is-the-better-pick" },
    {
      type: "list",
      items: [
        "**Pick Radix Themes for a closed, coherent system.** If you want components that look right together without writing utility classes, and a theme you configure in one place with props, it is designed for exactly that.",
        "**Pick Radix Themes for its color system.** Almost 30 color scales from Radix Colors, each with light, dark and alpha variants, plus a custom palette tool.",
        "**Pick Radix Themes if you do not use Tailwind.** It needs no utility framework, and its layout components (Box, Flex, Grid, Container, Section) handle spacing and layout through props.",
        "**Pick MiniDev UI if Tailwind is your styling language.** Every component is utilities and tokens you can read and edit, which also fits projects already on shadcn/ui.",
        "**Pick MiniDev UI for screens, blocks and motion.** Billing, settings, sign in, analytics and admin pages, 15 block types, 8 templates and 108 motion components come with the registry; Radix Themes focuses on components, layout and typography.",
      ],
    },
    { type: "component", name: "settings-page" },
    {
      type: "callout",
      tone: "warning",
      text: "Running both in one app is awkward. Radix Themes ships its own base styles and tokens, and its styling docs describe a conflict between Tailwind's button reset and Themes buttons, with workarounds. If you want Radix behavior with Tailwind styling, the usual pairing is Radix Primitives (or Base UI) under a Tailwind registry such as shadcn/ui or MiniDev UI, not Radix Themes.",
    },
  ],
  faq: [
    {
      q: "Is Radix Themes the same as Radix Primitives?",
      a: "No. Radix Primitives are unstyled components. Radix Themes is a pre-styled library from the same team at WorkOS, configured through a Theme component; its docs point to Primitives when you need a custom component.",
    },
    {
      q: "Does Radix Themes work with Tailwind CSS?",
      a: "It can, with care. The styling docs say Tailwind is a different paradigm that may not mix well with a closed component system, and they describe a base style conflict with workarounds. MiniDev UI is built for Tailwind CSS v4.",
    },
    {
      q: "Are both free?",
      a: "Yes. Radix Themes is MIT licensed and free, and MiniDev UI is MIT with no paid tier.",
    },
  ],
  sources: [
    { label: "Radix Themes home", url: "https://www.radix-ui.com/themes" },
    { label: "Radix Themes getting started", url: "https://www.radix-ui.com/themes/docs/overview/getting-started" },
    { label: "Radix Themes styling", url: "https://www.radix-ui.com/themes/docs/overview/styling" },
    { label: "Radix Themes 3.0 announcement", url: "https://www.radix-ui.com/blog/themes-3" },
    { label: "radix-ui/themes on GitHub", url: "https://github.com/radix-ui/themes" },
  ],
}

export default comparison
