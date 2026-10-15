import type { Guide } from "../types"

const guide: Guide = {
  slug: "best-free-react-ui-libraries-2026",
  title: "Best free React UI libraries in 2026, compared honestly",
  description:
    "Nine free React UI libraries compared: shadcn/ui, Material UI, Mantine, Chakra UI, Ant Design, HeroUI, Radix, Base UI and MiniDev UI, with licenses and limits.",
  date: "2026-10-15",
  keywords: [
    "best free react ui libraries",
    "react component libraries 2026",
    "free react ui kit",
    "shadcn vs mui vs mantine",
    "react ui library comparison",
  ],
  related: ["button", "dialog", "data-table", "settings-page"],
  body: [
    {
      type: "p",
      text: "For most new React projects in 2026 the practical answer is shadcn/ui as the base, with Material UI, Mantine or Chakra UI if you would rather install a complete, styled package than own the source. The rest of this guide covers where each of nine free libraries fits, what its license actually says, what it costs once you leave the free tier, and the one limitation we would want to know before committing.",
    },
    {
      type: "callout",
      tone: "note",
      text: "Facts were checked on October 15, 2026 on each project's own site or GitHub repository. Licenses, versions and prices change, so confirm before you ship. MiniDev UI is on this list and this guide is written by its team, so we have described it in the same tone as everyone else and put it where it belongs, not at the top.",
    },
    { type: "h2", text: "How we chose", id: "how-we-chose" },
    {
      type: "list",
      items: [
        "**A real free tier.** Every library here is free for commercial work; where a paid tier sits next to it, we say what is in it.",
        "**Maintained in 2026.** Each has a current major version, an active repository and reliable documentation.",
        "**Different models.** Copy-the-source registries, npm packages and unstyled primitives are mixed on purpose, because that choice matters more than the component count.",
        "**Verified claims.** License, price, framework and foundations were read from the official source.",
      ],
    },
    { type: "h2", text: "At a glance", id: "at-a-glance" },
    {
      type: "table",
      head: ["Library", "Model", "License", "Paid tier"],
      rows: [
        ["shadcn/ui", "Copy the source, Tailwind CSS", "MIT", "None"],
        ["Material UI", "npm package, Emotion", "MIT core", "MUI X Pro, Premium, Enterprise"],
        ["Mantine", "npm package, native CSS", "MIT", "None"],
        ["Chakra UI", "npm package, Emotion", "MIT", "Chakra UI Pro blocks and templates"],
        ["Ant Design", "npm package, own design language", "MIT", "None for the library"],
        ["HeroUI", "npm package, React Aria and Tailwind v4", "Apache 2.0", "HeroUI Pro"],
        ["Radix Primitives and Themes", "npm package, unstyled or themed", "MIT", "None"],
        ["Base UI", "npm package, unstyled", "MIT", "None"],
        ["MiniDev UI", "Copy the source, Base UI and Tailwind v4", "MIT", "None"],
      ],
    },
    { type: "h2", text: "1. shadcn/ui", id: "shadcn-ui" },
    {
      type: "p",
      text: "[shadcn/ui](https://ui.shadcn.com) describes itself as not a component library but how you build your component library: a code distribution system where the CLI writes component source into your repo instead of installing a package. It covers the core set (buttons, dialogs, menus, forms, tables, charts), blocks for dashboards, sidebars and login pages, CSS variable theming and the registry format other registries plug into. It supports both Radix UI and Base UI primitives, with Base UI the default since July 2026, and the repository had 125,000 GitHub stars when we checked.",
    },
    {
      type: "p",
      text: "**Who it suits:** teams on Tailwind CSS that want to own and edit their components, and anyone planning to use other shadcn-compatible registries. **License and price:** MIT, free, with no paid tier. **Limitation:** ownership is also maintenance. Once a component is in your repo, upstream fixes do not arrive automatically; you diff and apply them yourself.",
    },
    { type: "h2", text: "2. Material UI", id: "material-ui" },
    {
      type: "p",
      text: "[Material UI](https://mui.com) is MUI's independent implementation of Google's Material Design, and the repository describes it as free forever. The Community plan covers MUI Core (Material UI, Base UI, Joy UI and MUI System) and the MIT parts of MUI X such as `@mui/x-data-grid`. The paid tiers are about MUI X: Pro at $299 per developer per year, Premium at $599 and Enterprise at $1,399, each adding features to the MUI X components, most visibly the data grid, under a commercial license.",
    },
    {
      type: "p",
      text: "**Who it suits:** product teams that want a mature, exhaustively documented package and are happy with, or can budget to restyle, the Material look. **License and price:** MIT for the core and the Community parts of MUI X; the Pro and Premium data grid features are commercial. **Limitation:** the advanced data grid features are the paid ones (`@mui/x-data-grid` is MIT, `@mui/x-data-grid-pro` is commercial), so price the Pro tier in early if a grid is central to your product.",
    },
    { type: "h2", text: "3. Mantine", id: "mantine" },
    {
      type: "p",
      text: "[Mantine](https://mantine.dev) is a fully featured React components library with more than 120 components and 70 hooks. Its components are built with native CSS and exposed as `.css` files, with a PostCSS preset for mixins, dark mode and responsive styles, and official templates for Next.js, Vite, React Router and TanStack Start. The premade compositions in Mantine UI are free for everyone.",
    },
    {
      type: "p",
      text: "**Who it suits:** teams that want one coherent package with forms, notifications, modals, dates and hooks included, without Tailwind. **License and price:** MIT, free, funded through Open Collective sponsorship. **Limitation:** it has its own styling model. If your design system lives in Tailwind utilities, you will maintain two ways of styling, and Mantine notes that certain styling features are no longer supported in Create React App from version 7.",
    },
    { type: "h2", text: "4. Chakra UI", id: "chakra-ui" },
    {
      type: "p",
      text: "[Chakra UI](https://chakra-ui.com) calls itself a component system for building products with speed. Version 3 (3.37 when we checked) ships a tokens API, guides for Next.js and Vite, and a snippets CLI (`npx @chakra-ui/cli snippet add`) that copies composed components into your project. Chakra UI Pro sells premade blocks and templates for application, marketing and ecommerce pages.",
    },
    {
      type: "p",
      text: "**Who it suits:** teams that like a styled props API and want a documented path from v2. **License and price:** MIT, free; Chakra UI Pro is paid and priced on its own site. **Limitation:** the docs state that Chakra UI uses Emotion at runtime today, with a zero-runtime model inspired by Panda CSS as the long term direction. That is a change in flight, and runtime CSS-in-JS is the part of a React stack that most often needs care with server components.",
    },
    { type: "h2", text: "5. Ant Design", id: "ant-design" },
    {
      type: "p",
      text: "[Ant Design](https://ant.design) is an enterprise-class UI design language and React UI library, made by Ant Group and the Ant Design community. Version 6 is current, the repository has close to 100,000 stars, and the component set is unusually complete for back office work: tables, trees, transfers, cascaders and date ranges that most libraries leave to you.",
    },
    {
      type: "p",
      text: "**Who it suits:** admin panels, internal tools and data heavy enterprise products where a dense, consistent look is a feature. **License and price:** MIT, free. **Limitation:** the design language is strong and recognisable. Making an Ant Design app look like your brand rather than like Ant Design is real work, and it is a poor fit for marketing pages.",
    },
    { type: "h2", text: "6. HeroUI", id: "heroui" },
    {
      type: "p",
      text: "[HeroUI](https://www.heroui.com), previously NextUI, is in its third major version: accessible React components that combine React Aria Components with Tailwind CSS v4. The migration guide lists what v3 requires (React 19 or newer, Tailwind CSS v4, and removing Framer Motion) and warns that v2 and v3 cannot coexist in one project without special setup. HeroUI Pro sells components, blocks and full page templates under Web Hero, Mobile Hero and Super Hero plans.",
    },
    {
      type: "p",
      text: "**Who it suits:** teams that want React Aria's accessibility work with a finished, modern look and Tailwind underneath. **License and price:** the repository is Apache 2.0; Pro prices were not shown on the plan page when we checked, so read them on the site. **Limitation:** the v2 to v3 jump is a rewrite of your dependencies, not an upgrade, so existing v2 projects plan a migration rather than bump a version.",
    },
    { type: "h2", text: "7. Radix Primitives and Radix Themes", id: "radix-ui" },
    {
      type: "p",
      text: "[Radix](https://www.radix-ui.com) is two things, both made by WorkOS and both MIT. Radix Primitives is an unstyled component library for building accessible design systems, and it is the headless layer shadcn/ui was built on. Radix Themes is an open source component library optimized for fast development, easy maintenance and accessibility; you import its stylesheet and components and it works without configuration.",
    },
    {
      type: "p",
      text: "**Who it suits:** design system teams that want to own every pixel (Primitives), or small teams that want an opinionated, well made default (Themes). **License and price:** MIT, free. **Limitation:** Primitives give you behaviour and accessibility but no styles, and Themes gives you its own look and tokens, so there is no option that is both styled and Tailwind native, and since shadcn/ui's default moved to Base UI the newest community examples increasingly target that.",
    },
    { type: "h2", text: "8. Base UI", id: "base-ui" },
    {
      type: "p",
      text: "[Base UI](https://base-ui.com) is a library of unstyled UI components for building accessible web apps and design systems, from the creators of Radix, Floating UI and Material UI, and it is MIT. It is now the default primitive layer in shadcn/ui and the foundation of coss ui and MiniDev UI, which is why it belongs here even though it ships no visual design of its own.",
    },
    {
      type: "p",
      text: "**Who it suits:** anyone building their own component library, or choosing a styled library and wanting to know what is underneath. **License and price:** MIT, free. **Limitation:** it is unstyled by design, so on its own it is a starting point rather than a UI. Pick it directly only if you will supply the design, or pick a library built on it.",
    },
    { type: "h2", text: "9. MiniDev UI", id: "minidev-ui" },
    {
      type: "p",
      text: "[MiniDev UI](https://ui.minidev.pro) is a shadcn-compatible registry of over 500 items built on Base UI, Tailwind CSS v4 and motion: around 400 UI components, over 100 motion components and more than 40 blocks and full pages. Its focus is the screens a product needs after launch, such as [data tables](/docs/data-table), [billing](/docs/billing-page), [settings](/docs/settings-page), dashboards, command palettes and AI chat, drawn from one set of semantic OKLCH tokens with a `data-material` switch between hairline, glass, metal and paper. Install one file with `npx shadcn@latest add @minidev/data-table`, or the kit from npm as `minidev-ui-kit`.",
    },
    {
      type: "p",
      text: "**Who it suits:** SaaS and internal tools that want finished product screens and one look across app and marketing site, on top of a shadcn/ui setup. **License and price:** MIT, free, with no paid tier. **Limitation:** it is React and Tailwind CSS v4 only, its landing page templates are live demos rather than downloadable apps, and it is maintained by a small studio, so breadth has come before a long release history.",
    },
    { type: "component", name: "settings-page" },
    { type: "h2", text: "How to choose", id: "how-to-choose" },
    {
      type: "p",
      text: "Three questions settle most of this. First, **styling model**: if your team writes Tailwind, shadcn/ui, HeroUI and MiniDev UI fit without a second system, while Material UI and Chakra UI bring Emotion and Mantine brings native CSS with a PostCSS preset. Second, **ownership**: copy-the-source registries (shadcn/ui, MiniDev UI) let you edit anything and make you responsible for updates, while packages (Material UI, Mantine, Chakra UI, Ant Design, HeroUI, Radix Themes) update with `npm install` and resist deep changes. Third, **look**: Ant Design and Material UI arrive with a strong identity that suits internal tools and costs effort to hide, and the Tailwind based options arrive closer to neutral.",
    },
    {
      type: "list",
      items: [
        "**A SaaS product on Tailwind:** shadcn/ui as the base, MiniDev UI for product screens, and Base UI underneath both.",
        "**An internal admin tool, fast:** Ant Design or Material UI, with the MUI X data grid if you can budget for Pro.",
        "**A React app without Tailwind:** Mantine for the most complete single package, or Chakra UI if you prefer its API.",
        "**Your own design system:** Radix Primitives or Base UI, styled your way.",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: "Whatever you pick, test keyboard navigation and dark mode on day one. Every library here supports both, but the defaults differ, and that is cheaper to learn before you have built fifty screens.",
    },
  ],
  faq: [
    {
      q: "Which free React UI library is best for a SaaS dashboard?",
      a: "If you use Tailwind CSS, start with shadcn/ui and add MiniDev UI for tables, billing and settings screens. If you do not, Mantine is the most complete free package, and Material UI is a strong choice when its Community data grid is enough. Ant Design is the quickest route for a dense internal admin tool.",
    },
    {
      q: "Are these libraries really free for commercial use?",
      a: "Yes. shadcn/ui, Material UI's core, Mantine, Chakra UI, Ant Design, Radix, Base UI and MiniDev UI are MIT, and HeroUI is Apache 2.0. The paid parts are optional extras: MUI X Pro and Premium features, Chakra UI Pro blocks and HeroUI Pro, each under its own commercial terms.",
    },
    {
      q: "Should I pick a Tailwind based library or a CSS-in-JS one?",
      a: "Pick the one that matches how your team already styles things. Mixing Tailwind utilities with Emotion based components works, but you end up maintaining two theming systems. If you are starting fresh in 2026 and use React Server Components, the Tailwind and native CSS options avoid runtime style injection altogether.",
    },
  ],
}

export default guide
