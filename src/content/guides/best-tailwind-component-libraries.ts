import type { Guide } from "../types"

const guide: Guide = {
  slug: "best-tailwind-component-libraries",
  title: "Best Tailwind CSS component libraries, free and paid",
  description:
    "Nine Tailwind CSS component libraries compared, free and paid: Tailwind Plus, shadcn/ui, daisyUI, Flowbite, Preline, HeroUI, HyperUI and MiniDev UI, with costs.",
  date: "2026-10-15",
  keywords: [
    "best tailwind component libraries",
    "tailwind css ui library",
    "tailwind components free",
    "tailwind plus alternatives",
    "tailwind react components",
  ],
  related: ["button", "card", "pricing-table", "hero"],
  body: [
    {
      type: "p",
      text: "If you can pay, Tailwind Plus from Tailwind Labs is the most complete single purchase for Tailwind CSS components, and if you want free, shadcn/ui, daisyUI and Flowbite cover most needs between them. Below are nine libraries, free and paid, with what each actually is, who it suits, what it costs, its license and one limitation we would want to know first.",
    },
    {
      type: "callout",
      tone: "note",
      text: "Facts were checked on October 15, 2026 on each project's site or GitHub repository. Prices are in US dollars as listed and exclude tax. MiniDev UI is on this list and this guide is written by its team, so it gets the same treatment as the others, including a limitation.",
    },
    { type: "h2", text: "How we chose", id: "how-we-chose" },
    {
      type: "list",
      items: [
        "**Built for Tailwind CSS.** Every item styles with Tailwind utilities, extends Tailwind as a plugin, or is built to be styled with it.",
        "**Current.** Each one is actively published, and most state Tailwind CSS v4 support on their own pages; where a project does not say, we say so.",
        "**Different shapes.** Copy and paste HTML, React registries, CSS plugins and unstyled primitives are different tools, and the list includes one of each.",
        "**Checked.** License, price, frameworks and foundations come from the official pages, not from memory.",
      ],
    },
    { type: "h2", text: "At a glance", id: "at-a-glance" },
    {
      type: "table",
      head: ["Library", "Format", "Free tier", "Paid tier"],
      rows: [
        ["Tailwind Plus", "HTML, React and Vue blocks, templates, Catalyst kit", "No", "$299 one time, personal"],
        ["shadcn/ui", "React source via CLI", "Everything", "None"],
        ["daisyUI", "Tailwind plugin, CSS class names", "Everything", "Separate templates, charts, Figma"],
        ["Flowbite", "HTML plus vanilla JS; Flowbite React", "Components", "Flowbite Pro pages and sections"],
        ["Preline UI", "HTML plus plugins; React and Vue guides", "Components", "Pro from $249"],
        ["HeroUI", "React, React Aria, Tailwind v4", "Components", "HeroUI Pro"],
        ["HyperUI", "Copy and paste HTML", "Everything", "None"],
        ["MiniDev UI", "React source via shadcn CLI", "Everything", "None"],
        ["Headless UI", "Unstyled React and Vue components", "Everything", "None"],
      ],
    },
    { type: "h2", text: "1. Tailwind Plus", id: "tailwind-plus" },
    {
      type: "p",
      text: "[Tailwind Plus](https://tailwindcss.com/plus), formerly Tailwind UI, is the paid component collection from the team that makes Tailwind CSS. It bundles the marketing, application UI and ecommerce UI blocks, thirteen site templates built with React and Next.js, and Catalyst, an application UI kit built with Tailwind CSS, Headless UI and React that you download as a ZIP and keep alongside your own code. The components are designed for the latest Tailwind, currently v4.2.",
    },
    {
      type: "p",
      text: "**Who it suits:** agencies and product teams who want the reference implementation of Tailwind design and will build many projects from it. **License and price:** $299 as a one time payment for lifetime personal access, with a team license available; Catalyst alone is $149 and each template is $99 or included. The license allows unlimited end products, including open source ones, but forbids redistributing the components themselves or building page builders and kits from them. **Limitation:** it is proprietary and licensed per person or per team (the team license covers up to 25 employees and contractors), so you cannot publish a component repo built from it, and only the people covered by your license may use the source.",
    },
    { type: "h2", text: "2. shadcn/ui", id: "shadcn-ui" },
    {
      type: "p",
      text: "[shadcn/ui](https://ui.shadcn.com) is the Tailwind library that is not a library: a CLI and registry format that copies component source into your project, built on Radix UI or Base UI primitives with Base UI the default since July 2026. It added Tailwind v4 support in February 2025, publishes blocks for dashboards, sidebars and login pages, and has a directory of community registries that install with the same command.",
    },
    {
      type: "p",
      text: "**Who it suits:** React teams who want to own their components and theme them with CSS variables. **License and price:** MIT, free. **Limitation:** React only, and it needs a project setup. If you want to paste a snippet into a Rails or Laravel view, the HTML libraries below are a better fit.",
    },
    { type: "h2", text: "3. daisyUI", id: "daisyui" },
    {
      type: "p",
      text: "[daisyUI](https://daisyui.com) is a Tailwind CSS plugin that adds component class names such as `btn` and `card` on top of the utilities, so the HTML stays short. It claims 68 components and ships dozens of named themes plus a theme builder, and version 5 is built for Tailwind CSS 4 (you add `@plugin \"daisyui\"` after `@import \"tailwindcss\"`). The repository is MIT with over 42,000 stars, and the paid extras (templates, a charts collection, a Figma library) are sold separately.",
    },
    {
      type: "p",
      text: "**Who it suits:** any framework or no framework, and developers who find utility-only HTML too verbose. **License and price:** MIT, free; the add-ons are paid. **Limitation:** it provides pure CSS components, so behaviour such as focus trapping in a modal or keyboard navigation in a menu is left to your framework or your own JavaScript.",
    },
    { type: "h2", text: "4. Flowbite", id: "flowbite" },
    {
      type: "p",
      text: "[Flowbite](https://flowbite.com) is an open source library of UI components built with Tailwind utility classes and vanilla JavaScript for interactivity, with integration guides for React, Next.js, Vue, Nuxt, Svelte, Angular, Laravel, Rails, Django and Flask. It works with Tailwind v3 and v4. A separate project, Flowbite React, wraps the components for React under MIT. Flowbite Pro adds fully coded pages and layouts for application, marketing and ecommerce interfaces, described as over 450 sections.",
    },
    {
      type: "p",
      text: "**Who it suits:** server rendered stacks and teams working across several frameworks who want one visual language. **License and price:** MIT for the component library (docs CC BY 3.0); Pro is licensed under an EULA and priced on its site. **Limitation:** the free tier is components, and the finished pages and sections are in Pro, so a complete marketing site or admin layout is a purchase rather than a copy.",
    },
    { type: "h2", text: "5. Preline UI", id: "preline-ui" },
    {
      type: "p",
      text: "[Preline UI](https://preline.co) is an open source Tailwind CSS component library that claims over 640 components, 972 blocks, 22 templates and 27 headless plugins for behaviour, and documents use with React, Vue, Next.js, Laravel, Ruby and Django. Preline Pro adds over 520 pages and examples across dashboard, shop and ecommerce admin collections.",
    },
    {
      type: "p",
      text: "**Who it suits:** teams that want a very large catalogue of ready sections in plain HTML. **License and price:** free for personal and commercial projects under the MIT License and the Preline UI Fair Use License, both linked from the repository; Pro is $249 for one developer or $459 for a team of up to 15, with no redistribution, and an Enterprise tier is custom. **Limitation:** the dual license means reading two documents, and interactivity comes from Preline's own plugin scripts rather than your framework's components.",
    },
    { type: "h2", text: "6. HeroUI", id: "heroui" },
    {
      type: "p",
      text: "[HeroUI](https://www.heroui.com), previously NextUI, builds accessible React components on React Aria Components and Tailwind CSS v4. The current major version is v3, which requires React 19 and Tailwind v4 and drops Framer Motion, and HeroUI Pro sells components, blocks and templates for web and React Native.",
    },
    {
      type: "p",
      text: "**Who it suits:** React teams that want a finished, polished look with React Aria's accessibility underneath. **License and price:** the repository is Apache 2.0; Pro prices were not listed on its plan page when we checked. **Limitation:** v2 and v3 cannot coexist in one project without special setup, so existing NextUI projects face a migration rather than an upgrade.",
    },
    { type: "h2", text: "7. HyperUI", id: "hyperui" },
    {
      type: "p",
      text: "[HyperUI](https://www.hyperui.dev) is a collection of free, open source Tailwind CSS v4 components you copy and paste as HTML, organised by category (its charts category alone lists 22 components). It is released under the MIT License and asks for nothing.",
    },
    {
      type: "p",
      text: "**Who it suits:** quick marketing pages, prototypes and any stack that can render HTML. **License and price:** MIT, free. **Limitation:** HTML only. There are no props, no state and no behaviour, so dropdowns and dialogs need your own JavaScript or a framework component around them.",
    },
    { type: "h2", text: "8. MiniDev UI", id: "minidev-ui" },
    {
      type: "p",
      text: "[MiniDev UI](https://ui.minidev.pro) is a shadcn-compatible registry of over 500 React items built on Tailwind CSS v4, Base UI and motion: UI components, motion components and full page blocks for billing, settings, dashboards, sign in, AI chat and marketing. Everything reads from one set of semantic OKLCH tokens, so changing the accent or switching to dark mode flows through every component, and you install a single file with `npx shadcn@latest add @minidev/pricing-table` or the whole kit from npm as `minidev-ui-kit`. See the [installation docs](/docs/installation/nextjs) for the setup.",
    },
    {
      type: "p",
      text: "**Who it suits:** SaaS teams on Next.js, Vite or another React framework who already use shadcn/ui and want product screens that match. **License and price:** MIT, free, no paid tier. **Limitation:** React and Tailwind v4 only, so it does not help a Vue, Laravel or plain HTML project, and it assumes the shadcn/ui CLI workflow.",
    },
    { type: "component", name: "pricing-table" },
    { type: "h2", text: "9. Headless UI", id: "headless-ui" },
    {
      type: "p",
      text: "[Headless UI](https://headlessui.com) from Tailwind Labs is a set of completely unstyled, fully accessible UI components designed to integrate with Tailwind CSS. The current v2 docs are for React, with the Vue package documented on the v1 line, and the repository is MIT.",
    },
    {
      type: "p",
      text: "**Who it suits:** teams building their own styled components who want menus, dialogs, listboxes and similar behaviour handled correctly. **License and price:** MIT, free. **Limitation:** it ships no styles at all, so it is a foundation rather than a library, and Vue users are on the older line.",
    },
    { type: "h2", text: "How to choose", id: "how-to-choose" },
    {
      type: "p",
      text: "Start from the format your stack can use. Plain HTML stacks (Rails, Laravel, Django, static sites) get the most from daisyUI, Flowbite, Preline UI and HyperUI, because there is nothing to compile. React stacks are better served by shadcn/ui, HeroUI and MiniDev UI, where components carry behaviour and props, with Headless UI as the unstyled floor. Then decide whether finished pages are worth paying for: Tailwind Plus, Flowbite Pro and Preline Pro all sell complete sections and templates, while the free registries expect you to compose pages from components and blocks.",
    },
    {
      type: "list",
      items: [
        "**A marketing site in any stack:** HyperUI or daisyUI free, Tailwind Plus if the budget allows and the designs match your taste.",
        "**A React SaaS app:** shadcn/ui as the base with MiniDev UI for product screens, or HeroUI if you prefer an npm package.",
        "**A Laravel, Rails or Django app:** Flowbite or Preline UI, which both document those integrations and ship their own interactivity.",
        "**Your own component library:** Headless UI or Base UI underneath, your Tailwind on top.",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: "Check the Tailwind version before you copy anything. Tailwind v4 changed the configuration model (CSS first, `@theme`, `@plugin`), and snippets written for v3 need small edits. Our [Tailwind v4 migration guide](/guides/tailwind-v4-migration) covers the common ones.",
    },
  ],
  faq: [
    {
      q: "Is Tailwind Plus worth it compared to free Tailwind component libraries?",
      a: "It is the most complete and consistent single purchase, with lifetime access for $299, and the license covers unlimited client projects. It is not worth it if you need to publish components publicly, if your team is large (each person needs access), or if a free registry such as shadcn/ui plus a blocks collection already covers your pages.",
    },
    {
      q: "What is the best free Tailwind component library for React?",
      a: "shadcn/ui, because it is the foundation most other React registries build on, and you own the code. Add MiniDev UI for product screens or HeroUI if you would rather install a styled package than copy source.",
    },
    {
      q: "Do these libraries work with Tailwind CSS v4?",
      a: "Most do, and say so. Tailwind Plus targets the latest release (v4.2 when we checked), daisyUI 5 is built for Tailwind 4, Flowbite supports v3 and v4, HyperUI publishes v4 components, HeroUI v3 requires v4, and shadcn/ui and MiniDev UI are v4 based. Headless UI is unstyled and does not depend on a Tailwind version. Preline's pages did not state a Tailwind version when we checked, so read its install guide before you copy.",
    },
  ],
}

export default guide
