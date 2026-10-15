import type { Guide } from "../types"

const guide: Guide = {
  slug: "best-shadcn-blocks-and-registries",
  title: "Best shadcn/ui blocks, registries and block collections",
  description:
    "Nine shadcn/ui block collections compared: official blocks, Tailark, Launch UI, Kibo UI, coss ui, MiniDev UI, Cult UI, blocks.so and 21st.dev, with licenses.",
  date: "2026-10-15",
  keywords: [
    "shadcn blocks",
    "shadcn registry",
    "shadcn ui block collections",
    "shadcn marketing blocks",
    "shadcn dashboard blocks free",
  ],
  related: ["dashboard-home", "marketing-landing", "sign-in-page", "pricing-plans"],
  body: [
    {
      type: "p",
      text: "Start with the official shadcn/ui blocks for dashboards, sidebars and login pages, then add one or two community registries for what they do not cover: marketing sections, product screens or advanced components. This guide covers nine block collections and registries that install with the shadcn CLI, with what each contains, who it suits, license, cost and one limitation apiece.",
    },
    {
      type: "callout",
      tone: "note",
      text: "Facts were checked on October 15, 2026 on each project's site or GitHub repository. Several registries sell paid tiers next to the free code; where a price was not published on a page we could read, we say so rather than guess. MiniDev UI is on this list and this guide is written by its team.",
    },
    { type: "h2", text: "Blocks, registries and the CLI", id: "blocks-registries-cli" },
    {
      type: "p",
      text: "A **block** is a composed section or page (a sidebar layout, a login screen, a pricing section) built from components. A **registry** is a JSON index that the shadcn CLI can read, so `npx shadcn add @registry/item` writes the block's source into your project along with its dependencies. The official [registry directory](https://ui.shadcn.com/docs/directory) lists community registries that work with no configuration and warns that they are maintained by third parties, so review the code on installation. Our [shadcn registry](/glossary/shadcn-registry) glossary entry and the [custom registry guide](/guides/shadcn-custom-registry) explain the format if you want to publish your own.",
    },
    { type: "h2", text: "At a glance", id: "at-a-glance" },
    {
      type: "table",
      head: ["Collection", "Focus", "Primitives", "License", "Paid tier"],
      rows: [
        ["shadcn/ui blocks", "Dashboards, sidebars, login", "Radix UI or Base UI", "MIT", "None"],
        ["Tailark", "Marketing sections and pages", "shadcn/ui", "MIT", "See site"],
        ["Launch UI", "Landing page sections", "shadcn/ui", "MIT", "Pro sections"],
        ["Kibo UI", "Advanced composable components", "shadcn/ui", "MIT", "None"],
        ["coss ui", "App components and Particles", "Base UI", "MIT for the UI apps", "None"],
        ["MiniDev UI", "Product screens and marketing pages", "Base UI", "MIT", "None"],
        ["Cult UI", "Design engineer components", "shadcn/ui", "MIT", "See site"],
        ["blocks.so", "App and marketing blocks", "shadcn/ui", "MIT", "None"],
        ["21st.dev", "Community marketplace", "Mixed", "MIT platform", "See site"],
      ],
    },
    { type: "h2", text: "1. shadcn/ui blocks", id: "shadcn-ui-blocks" },
    {
      type: "p",
      text: "The [official blocks](https://ui.shadcn.com/blocks) are clean, modern building blocks you copy and paste into your apps, free forever and installable with commands such as `npx shadcn add dashboard-01`. The current set covers a dashboard with sidebar, charts and data table, sidebars that collapse to icons or carry submenus, and login pages with and without an image panel, and the February 2026 changelog added blocks for both Radix UI and Base UI so you can pick the primitive your project uses.",
    },
    {
      type: "p",
      text: "**Who it suits:** every shadcn/ui project; the dashboard and sidebar blocks are the fastest honest start for an app shell. **License and price:** MIT, free. **Limitation:** the set is small and app focused. There are no marketing sections, pricing tables or settings screens, which is exactly what the rest of this list exists for.",
    },
    { type: "h2", text: "2. Tailark", id: "tailark" },
    {
      type: "p",
      text: "[Tailark](https://github.com/tailark/blocks) is an open source shadcn/ui registry of marketing blocks and pages, the sections a landing page is made of. The repository describes itself as shadcn marketing blocks and is released under the MIT License, and the blocks are browsed on tailark.com.",
    },
    {
      type: "p",
      text: "**Who it suits:** a product site that should look like it belongs with a shadcn/ui app. **License and price:** MIT for the open source registry; the site may offer more than the repository, and we could not read its pricing when we checked, so look before you plan around it. **Limitation:** it is marketing only, so you still need an app registry for the product screens behind the sign up button.",
    },
    { type: "h2", text: "3. Launch UI", id: "launch-ui" },
    {
      type: "p",
      text: "[Launch UI](https://github.com/launch-ui/launch-ui) is a landing page kit built with Next.js, shadcn/ui and Tailwind CSS that you copy and paste into your project. The README splits the sections in two: navbar, hero, items, logos, FAQ, stats, CTA and footer are included, while the bento grid, feature, social proof, tabs, carousel and testimonials sections belong to the Pro version.",
    },
    {
      type: "p",
      text: "**Who it suits:** a single polished landing page where the free sections are enough. **License and price:** the repository is MIT; Pro is paid and priced on its pricing page. **Limitation:** the sections that make a landing page feel complete, such as testimonials and feature grids, are the Pro ones, so budget for the upgrade or source those from another registry.",
    },
    { type: "h2", text: "4. Kibo UI", id: "kibo-ui" },
    {
      type: "p",
      text: "[Kibo UI](https://github.com/haydenbleasel/kibo) is a custom registry of composable, accessible and open source components designed for use with shadcn/ui, described by its maintainer as free and open source, forever. It fills gaps in the core set with more advanced, reusable building blocks that reduce boilerplate while keeping flexibility, and installs with the shadcn CLI.",
    },
    {
      type: "p",
      text: "**Who it suits:** adding a few hard components to a standard shadcn/ui project without adopting another library's look. **License and price:** MIT, free, no paid tier. **Limitation:** it is components rather than page blocks, so it answers the question of how to build a thing, not how to lay out a screen.",
    },
    { type: "h2", text: "5. coss ui", id: "coss-ui" },
    {
      type: "p",
      text: "[coss ui](https://github.com/cosscom/coss) is the official design system of Cal.com: beautifully designed, accessible and composable components for React apps, built on Base UI and styled with Tailwind CSS, with ready compositions called Particles. The repository also holds Origin UI, the pre-acquisition collection of Radix based, shadcn style components, which remains available with limited support while active development focuses on Particles.",
    },
    {
      type: "p",
      text: "**Who it suits:** a clean, neutral application base shaped by use in a real product, especially on Base UI. **License and price:** the `apps/ui` and `apps/origin` directories are MIT, while the rest of the repository is AGPLv3, so copy from the UI apps and not from elsewhere. **Limitation:** the mixed licensing needs attention, and the Origin UI collection many people know is now in maintenance mode.",
    },
    { type: "h2", text: "6. MiniDev UI", id: "minidev-ui" },
    {
      type: "p",
      text: "[MiniDev UI](https://ui.minidev.pro) is a shadcn-compatible registry of over 500 items built on Base UI, Tailwind CSS v4 and motion, and more than 40 of them are full blocks and pages: [dashboard home](/docs/dashboard-home), [billing](/docs/billing-page), [settings](/docs/settings-page), [sign in](/docs/sign-in-page), [analytics](/docs/analytics-page), [chat](/docs/chat-page), [pricing plans](/docs/pricing-plans), [marketing landing](/docs/marketing-landing), [status page](/docs/status-page) and more, all reading one set of semantic OKLCH tokens. Browse them by type at [blocks](/blocks), or install one with `npx shadcn@latest add @minidev/dashboard-home`.",
    },
    {
      type: "p",
      text: "**Who it suits:** SaaS teams that want the app screens and the marketing site from one registry so they share tokens, materials and motion. **License and price:** MIT, free, no paid tier. **Limitation:** it is built on Base UI, so a project that standardised on Radix will end up with both primitive layers if it mixes in these blocks, and it is React only.",
    },
    { type: "component", name: "dashboard-home" },
    { type: "h2", text: "7. Cult UI", id: "cult-ui" },
    {
      type: "p",
      text: "[Cult UI](https://github.com/nolly-studio/cult-ui) describes itself as components crafted for design engineers: pieces styled with Tailwind CSS that work with shadcn/ui and are added by copying and pasting. The repository is MIT.",
    },
    {
      type: "p",
      text: "**Who it suits:** teams that want distinctive components to lift a marketing page or onboarding flow above the shadcn/ui defaults. **License and price:** MIT for the open source components; the site lists more than the repository and we could not read its prices when we checked. **Limitation:** it leans toward expressive components rather than complete page blocks, so it is an addition to a base, not the base.",
    },
    { type: "h2", text: "8. blocks.so", id: "blocks-so" },
    {
      type: "p",
      text: "[blocks.so](https://github.com/ephraimduncan/blocks) is an open source library of UI blocks built with React, Tailwind and shadcn/ui: accessible, customisable blocks you copy and paste, free and open source. It serves a registry, so the CLI installs any block from `https://blocks.so/r/{name}.json`, and the repository is MIT.",
    },
    {
      type: "p",
      text: "**Who it suits:** quick sections in the plain shadcn/ui look, installed by URL without adopting another library's opinions. **License and price:** MIT, free, no paid tier. **Limitation:** it is a personal project with a smaller catalogue than the commercial collections, so check that the block you need exists before you plan around it.",
    },
    { type: "h2", text: "9. 21st.dev", id: "21st-dev" },
    {
      type: "p",
      text: "[21st.dev](https://github.com/serafimcloud/21st) calls itself an open source community registry for React UI components, and its repository description puts it as npm for design engineers: a marketplace of shadcn/ui based React and Tailwind components, blocks and hooks that anyone can publish to and that install with the `npx shadcn` command. The platform code is MIT.",
    },
    {
      type: "p",
      text: "**Who it suits:** finding a specific component someone has already built, and comparing several versions of the same idea. **License and price:** the platform is MIT; each published component carries its own author's terms, so read the listing. **Limitation:** quality varies with the author. Treat it like any package registry and review the code before it ships, which is the same warning shadcn/ui attaches to its own directory.",
    },
    { type: "h2", text: "How to choose", id: "how-to-choose" },
    {
      type: "p",
      text: "Pick one base and at most two specialists. The base is the official blocks for the app shell, or MiniDev UI or coss ui if you want finished product screens on Base UI. The specialists depend on the gap: Tailark or Launch UI for marketing sections, Kibo UI for advanced components, Cult UI for expressive pieces, blocks.so for quick app sections, and 21st.dev when you are hunting for one specific thing. Paid marketing collections such as Magic UI Pro ($199 one time) and Aceternity UI's blocks are worth it when a launch page needs more polish than the free sections give you, and Shadcn Studio pairs an MIT theme generator with free and premium templates if you want to retheme everything first.",
    },
    {
      type: "list",
      items: [
        "**Match primitives.** shadcn/ui now defaults to Base UI, and so do coss ui and MiniDev UI; Origin UI and many older registries are Radix based. Mixing works, but one layer keeps the bundle and your mental model smaller.",
        "**Check what the tokens are.** Blocks that read `--background`, `--primary` and the other shadcn/ui variables follow your theme; blocks with hard coded colors do not. Switch to dark mode right after installing.",
        "**Watch file collisions.** Several registries ship their own `button` or `card`. The CLI asks before overwriting; decide which version you keep.",
        "**Review third party code.** Every community registry is someone else's code going into your repo. Read it once, the way you would read a dependency's changelog.",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: "The install command is the same everywhere: `npx shadcn@latest add <url-or-namespace>`. If a registry publishes a namespace in the shadcn directory you can use `@name/item`; otherwise point the CLI at the item's JSON URL. Our [free shadcn component libraries](/guides/free-shadcn-component-libraries) roundup covers the component side of the same ecosystem.",
    },
  ],
  faq: [
    {
      q: "What is a shadcn registry?",
      a: "A JSON index of components, blocks and their dependencies that the shadcn CLI can read. Any site can publish one, and the CLI writes the source into your project with npx shadcn add. The official directory lists community registries that need no configuration.",
    },
    {
      q: "Can I mix Radix and Base UI blocks in one project?",
      a: "Yes, because each block's code is copied into your repo. You will ship both primitive libraries, so settle on one where you can. shadcn/ui offers its blocks for both, coss ui and MiniDev UI are Base UI, and Origin UI and many older registries are Radix.",
    },
    {
      q: "Are shadcn blocks free for commercial use?",
      a: "The official blocks are MIT, as are Tailark, Launch UI's included sections, Kibo UI, the coss ui apps, MiniDev UI, Cult UI's open source components and blocks.so. Pro tiers from Launch UI and others, and individual listings on 21st.dev, carry their own terms, so read them before client work.",
    },
  ],
}

export default guide
