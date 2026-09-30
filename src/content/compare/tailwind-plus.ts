import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-tailwind-plus",
  other: "Tailwind Plus",
  otherUrl: "https://tailwindcss.com/plus",
  title: "MiniDev UI vs Tailwind Plus: which should you use?",
  description:
    "MiniDev UI vs Tailwind Plus (formerly Tailwind UI): a free MIT registry versus the official paid Tailwind collection. Compare scope, license and install.",
  checked: "2026-09-30",
  summary:
    "Tailwind Plus, formerly Tailwind UI, is the official paid collection from the makers of Tailwind CSS: UI blocks in React, Vue and HTML, full site templates and the Catalyst application UI kit. It is carefully designed, framework flexible and a strong buy if you want downloadable, production ready site templates. MiniDev UI is free and MIT, React only, shadcn-compatible and focused on product screens with its own theming system. Pick Tailwind Plus for templates you can download and for Vue or plain HTML projects. Pick MiniDev UI for a free React kit you install one file at a time.",
  rows: [
    { feature: "Price", minidev: "Free, everything", other: "Paid, one-time purchase with lifetime access; check their site for current prices" },
    { feature: "License", minidev: "MIT", other: "Commercial license; see the Tailwind Plus license page for what it allows" },
    {
      feature: "Scope",
      minidev: "About 495 items: roughly 370 UI components, 82 motion components, 43 blocks and pages",
      other: "A large library of UI blocks for marketing, application UI and ecommerce",
    },
    {
      feature: "Blocks",
      minidev: "App and marketing pages: billing, settings, sign in, analytics, chat, pricing, heroes",
      other: "Section and page examples grouped as Marketing, Application UI and Ecommerce",
    },
    {
      feature: "Templates",
      minidev: "8 landing page templates shown as live demos, with brand kits (not downloadable as whole apps)",
      other: "Downloadable site templates (for example Salient, Spotlight, Studio, Protocol, Compass) plus the Catalyst UI kit",
    },
    {
      feature: "Primitives",
      minidev: "Base UI (@base-ui/react)",
      other: "Headless UI for React and Vue; Tailwind Plus Elements for plain HTML and JavaScript",
    },
    { feature: "Animation", minidev: "motion (the Framer Motion successor)", other: "Tailwind and Headless UI transitions; templates may add their own animation libraries" },
    { feature: "Tailwind version", minidev: "Tailwind CSS v4", other: "Tailwind CSS v4 at the time of writing; check docs for older versions" },
    {
      feature: "Install",
      minidev: "`npx shadcn@latest add https://ui.minidev.pro/r/<name>.json`, or npm `minidev-ui-kit`",
      other: "Copy code from the site after signing in, or download templates",
    },
    { feature: "Frameworks", minidev: "React", other: "React, Vue and HTML" },
    {
      feature: "Theming",
      minidev: "Semantic OKLCH tokens, materials (hairline, glass, metal, paper), one light source for shadows",
      other: "Tailwind utility classes using the default palette; you adjust colors in the markup or your theme",
    },
    { feature: "Dark mode", minidev: "Yes, from the same token set", other: "Many blocks include dark variants" },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Tailwind Plus](https://tailwindcss.com/plus) is the new name for Tailwind UI, the official component and template collection from Tailwind Labs. It includes a large library of UI blocks (marketing sections, application screens and ecommerce pages) available in React, Vue and HTML, full site templates built with Next.js, and Catalyst, an application UI kit for React. Interactive pieces use Headless UI, and plain HTML users get Tailwind Plus Elements, a set of vanilla JavaScript components.",
    },
    {
      type: "p",
      text: "MiniDev UI is a free, MIT licensed React library of about 495 items, published as a shadcn-compatible registry and as the npm package `minidev-ui-kit`. It is built on Base UI, Tailwind CSS v4 and motion, and it concentrates on product UI: data tables, billing, settings, dashboards, command palettes and AI chat, plus full-page blocks and motion components.",
    },
    { type: "h2", text: "Where Tailwind Plus shines", id: "where-tailwind-plus-shines" },
    {
      type: "list",
      items: [
        "**Made by the Tailwind team.** The markup is a reference for idiomatic Tailwind, and it tracks new Tailwind releases closely.",
        "**Framework choice.** React, Vue and plain HTML versions of the blocks make it useful well beyond React projects.",
        "**Downloadable templates.** Full sites such as a SaaS marketing page, a personal site, an agency site and API documentation are ready to download and deploy.",
        "**Breadth of layouts.** Many variations of each section type, so it is easy to find a close match to a design.",
      ],
    },
    { type: "h2", text: "Where MiniDev UI shines", id: "where-minidev-ui-shines" },
    {
      type: "list",
      items: [
        "**Free and MIT.** No purchase or seat count, and the license allows any use, including redistribution in your own open source work.",
        "**Components, not only markup.** Each item is a typed React component with state, accessibility and keyboard handling from Base UI.",
        "**Install from the CLI.** Add one file at a time with the shadcn CLI, with dependencies resolved for you.",
        "**Theming system.** Semantic tokens, materials and a shared light source make a whole app retheme from one place.",
      ],
    },
    { type: "component", name: "settings-page" },
    { type: "h2", text: "Using them together", id: "using-them-together" },
    {
      type: "p",
      text: "If you already own Tailwind Plus, you can use MiniDev UI for the parts it does not cover, such as AI chat surfaces, invoice screens or motion sections. Both are plain Tailwind classes in the end. The main adjustment is color: Tailwind Plus blocks typically use palette classes like `bg-white` and `text-gray-900`, while MiniDev uses semantic tokens like `bg-surface` and `text-fg`. Swapping palette classes for tokens in the blocks you use keeps light and dark mode consistent.",
    },
    { type: "h2", text: "Install and migration notes", id: "install-and-migration-notes" },
    { type: "code", lang: "bash", code: "npx shadcn@latest add https://ui.minidev.pro/r/pricing-plans.json" },
    {
      type: "p",
      text: "Then import the tokens after Tailwind with `@import \"minidev-ui-kit/styles.css\";`. If your project uses Headless UI components from Tailwind Plus, they can sit next to MiniDev's Base UI components; both are headless and style free, so the only cost is carrying two primitive libraries.",
    },
    {
      type: "callout",
      tone: "note",
      text: "Tailwind Plus pricing and license terms are set by Tailwind Labs and can change. Read the [license page](https://tailwindcss.com/plus/license) before using it in client or open source work.",
    },
    { type: "h2", text: "Which to pick", id: "which-to-pick" },
    {
      type: "list",
      items: [
        "**Choose Tailwind Plus** if you want official, downloadable site templates, if your stack is Vue or plain HTML, or if you value having many layout variations to pick from and are happy to pay for them.",
        "**Choose MiniDev UI** if you are building a React product, want typed components you install from the CLI, and need screens like billing, settings, data tables or AI chat at no cost.",
        "**Choose both** if you own Tailwind Plus already and want to fill gaps in product UI, while keeping its templates for the marketing site.",
      ],
    },
  ],
  faq: [
    {
      q: "Is Tailwind Plus the same as Tailwind UI?",
      a: "Yes. Tailwind UI was renamed Tailwind Plus by Tailwind Labs. It is the same official collection of blocks, templates and the Catalyst UI kit.",
    },
    {
      q: "Is there a free alternative to Tailwind Plus?",
      a: "MiniDev UI is one: free, MIT and React based. It does not offer downloadable site templates or Vue and HTML versions, so it is not a full replacement for every use.",
    },
    {
      q: "Can I use Tailwind Plus with Vue or plain HTML?",
      a: "Yes, its blocks come in React, Vue and HTML versions. MiniDev UI is React only.",
    },
  ],
  sources: [
    { label: "Tailwind Plus", url: "https://tailwindcss.com/plus" },
    { label: "Tailwind UI is now Tailwind Plus", url: "https://tailwindcss.com/blog/tailwind-plus" },
    { label: "Tailwind Plus UI blocks", url: "https://tailwindcss.com/plus/ui-blocks" },
    { label: "Tailwind Plus license", url: "https://tailwindcss.com/plus/license" },
    { label: "Vanilla JavaScript support for Tailwind Plus", url: "https://tailwindcss.com/blog/vanilla-js-support-for-tailwind-plus" },
    { label: "Tailwind Plus changelog", url: "https://tailwindcss.com/plus/changelog" },
    { label: "Salient template", url: "https://tailwindcss.com/plus/templates/salient" },
    { label: "Catalyst UI kit", url: "https://tailwindui.com/templates/catalyst" },
  ],
}

export default comparison
