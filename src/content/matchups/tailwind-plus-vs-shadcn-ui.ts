import type { Matchup } from "../types"

const matchup: Matchup = {
  slug: "tailwind-plus-vs-shadcn-ui",
  title: "Tailwind Plus vs shadcn/ui: which to use?",
  description:
    "Tailwind Plus (formerly Tailwind UI) vs shadcn/ui: paid official blocks and templates for React, Vue and HTML against free MIT React components you own.",
  a: "tailwind-plus",
  b: "shadcn-ui",
  checked: "2026-09-30",
  verdict:
    "They solve different problems. Tailwind Plus, formerly Tailwind UI, is the paid collection from the makers of Tailwind CSS: UI blocks in React, Vue and HTML, downloadable site templates and the Catalyst UI kit. shadcn/ui is a free, MIT licensed set of React components, plus the CLI and registry format that install them as source in your project.",
  pickA:
    "you want official, downloadable site templates and many layout variations per section, or you work in Vue or plain HTML, and you are happy to pay once.",
  pickB:
    "you are building a React app and want a free, accessible component base on Radix UI or Base UI, as source in your repo.",
  rows: [
    { feature: "Price", a: "Paid, one-time purchase with lifetime access; check their site for current prices", b: "Free" },
    { feature: "License", a: "Commercial license; see the Tailwind Plus license page for what it allows", b: "MIT" },
    {
      feature: "What you get",
      a: "UI blocks for marketing, application UI and ecommerce, downloadable site templates and the Catalyst UI kit for React",
      b: "Core UI components, charts and blocks for dashboards, sidebars, login and more",
    },
    { feature: "Frameworks", a: "React, Vue and HTML", b: "React" },
    {
      feature: "Primitives",
      a: "Headless UI for React and Vue; Tailwind Plus Elements for plain HTML and JavaScript",
      b: "Radix UI or Base UI; Base UI became the default in the July 2026 changelog",
    },
    {
      feature: "Templates",
      a: "Downloadable site templates, for example Salient, Spotlight, Studio, Protocol and Compass",
      b: "No official full-site templates; a large community template ecosystem",
    },
    {
      feature: "Install",
      a: "Copy code from the site after signing in, or download templates",
      b: "`npx shadcn@latest add <name>` from the official registry",
    },
    {
      feature: "Theming",
      a: "Tailwind utility classes using the default palette; you adjust colors in the markup or your theme",
      b: "CSS variable tokens (background, foreground, primary and so on) with theme presets",
    },
    { feature: "Dark mode", a: "Many blocks include dark variants", b: "Yes" },
    { feature: "Tailwind version", a: "Tailwind CSS v4 at the time of writing", b: "Tailwind CSS v4, with legacy docs for v3" },
    {
      feature: "Animation",
      a: "Tailwind and Headless UI transitions; templates may add their own animation libraries",
      b: "Mostly CSS transitions; no motion library required by default",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Tailwind Plus](https://tailwindcss.com/plus) is the new name for Tailwind UI, the official component and template collection from Tailwind Labs. It includes a large library of UI blocks (marketing sections, application screens and ecommerce pages) in React, Vue and HTML, full site templates built with Next.js, and Catalyst, an application UI kit for React. Interactive pieces use Headless UI, and plain HTML users get Tailwind Plus Elements, a set of vanilla JavaScript components. It is a paid, one-time purchase.",
    },
    {
      type: "p",
      text: "[shadcn/ui](https://ui.shadcn.com) is a free, MIT licensed set of React components whose source you copy into your project with a CLI and then own. It ships core components, charts, blocks and theming for Tailwind CSS v4, runs on Radix UI or Base UI, and defines the registry format that lets other sites publish components the same CLI can install.",
    },
    { type: "h2", text: "Where Tailwind Plus shines", id: "where-tailwind-plus-shines" },
    {
      type: "list",
      items: [
        "**Made by the Tailwind team.** The markup is a reference for idiomatic Tailwind, and it tracks new Tailwind releases closely.",
        "**Framework choice.** React, Vue and plain HTML versions of the blocks make it useful well beyond React projects.",
        "**Downloadable templates.** Full sites such as a SaaS marketing page, a personal site, an agency site and API documentation are ready to download and deploy.",
        "**Breadth of layouts.** Many variations of each section type make it easy to find a close match to a design.",
        "**Catalyst.** An application UI kit for React from the same team.",
      ],
    },
    { type: "h2", text: "Where shadcn/ui shines", id: "where-shadcn-ui-shines" },
    {
      type: "list",
      items: [
        "**Free and MIT.** No purchase, and the license allows any use.",
        "**Components with behavior.** Accessible components on Radix UI or Base UI, not only markup.",
        "**Install from the CLI.** Add one component at a time with `npx shadcn@latest add`, from the official registry or any community registry.",
        "**Theme tokens.** CSS variable tokens and theme presets let a whole app change look from one place.",
      ],
    },
    { type: "h2", text: "The trade-offs", id: "the-trade-offs" },
    {
      type: "list",
      items: [
        "**Pages or parts.** Tailwind Plus gives you finished sections and whole site templates. shadcn/ui gives you components and blocks to compose pages from.",
        "**Colors.** Tailwind Plus blocks typically use palette classes like `bg-white` and `text-gray-900`, while shadcn/ui components read CSS variable tokens. If you mix them, swapping palette classes for tokens keeps light and dark mode consistent.",
        "**License.** shadcn/ui is MIT. Tailwind Plus is sold under a commercial license, so read the license page before using it in client or open source work.",
        "**Two primitive libraries.** Tailwind Plus uses Headless UI and shadcn/ui uses Radix UI or Base UI. Both are headless and style free, so they can sit side by side, at the cost of carrying two primitive libraries.",
      ],
    },
  ],
  minidev: [
    "MiniDev UI is a free, MIT licensed shadcn-compatible registry, so it sits next to shadcn/ui and installs with the same CLI. For teams weighing Tailwind Plus for its application screens, it covers some of the same ground at no cost: billing, settings, sign in, analytics and admin pages, plus motion components and 8 landing page templates shown as live demos.",
    "It does not offer downloadable site templates or Vue and HTML versions, so it is not a full replacement for Tailwind Plus. See [MiniDev UI vs Tailwind Plus](/compare/minidev-ui-vs-tailwind-plus) and [MiniDev UI vs shadcn/ui](/compare/minidev-ui-vs-shadcn-ui).",
  ],
  faq: [
    {
      q: "Is Tailwind Plus the same as Tailwind UI?",
      a: "Yes. Tailwind Labs renamed Tailwind UI to Tailwind Plus. It is the same official collection of blocks, templates and the Catalyst UI kit.",
    },
    {
      q: "Is shadcn/ui a free alternative to Tailwind Plus?",
      a: "Partly. shadcn/ui is free and MIT and covers React components and blocks, but it has no official full-site templates and no Vue or HTML versions. Tailwind Plus is the one to buy for downloadable templates.",
    },
    {
      q: "Can I use Tailwind Plus blocks with shadcn/ui?",
      a: "Yes. Both come down to Tailwind classes. Swap the palette classes in Tailwind Plus blocks for shadcn/ui tokens so light and dark mode stay consistent, and expect to carry Headless UI next to Radix UI or Base UI.",
    },
    {
      q: "Does Tailwind Plus work with Vue or plain HTML?",
      a: "Yes. Its blocks come in React, Vue and HTML versions, and Tailwind Plus Elements adds vanilla JavaScript components for plain HTML. shadcn/ui components are React.",
    },
    {
      q: "Is Tailwind Plus a subscription?",
      a: "No. It is a one-time purchase with lifetime access, under a commercial license. Check the Tailwind Plus site for current prices.",
    },
  ],
  sources: [
    { label: "Tailwind Plus", url: "https://tailwindcss.com/plus" },
    { label: "Tailwind UI is now Tailwind Plus", url: "https://tailwindcss.com/blog/tailwind-plus" },
    { label: "Tailwind Plus UI blocks", url: "https://tailwindcss.com/plus/ui-blocks" },
    { label: "Tailwind Plus license", url: "https://tailwindcss.com/plus/license" },
    { label: "Vanilla JavaScript support for Tailwind Plus", url: "https://tailwindcss.com/blog/vanilla-js-support-for-tailwind-plus" },
    { label: "Salient template", url: "https://tailwindcss.com/plus/templates/salient" },
    { label: "Catalyst UI kit", url: "https://tailwindui.com/templates/catalyst" },
    { label: "shadcn/ui docs", url: "https://ui.shadcn.com/docs" },
    { label: "shadcn/ui changelog: Base UI as the default (July 2026)", url: "https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default" },
    { label: "shadcn/ui changelog: Blocks for Radix and Base UI (February 2026)", url: "https://ui.shadcn.com/docs/changelog/2026-02-blocks" },
    { label: "shadcn/ui Tailwind v4 docs", url: "https://ui.shadcn.com/docs/tailwind-v4" },
    { label: "shadcn/ui registry directory", url: "https://ui.shadcn.com/docs/directory" },
  ],
}

export default matchup
