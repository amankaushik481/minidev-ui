import type { Comparison } from "../types"

const comparison: Comparison = {
  slug: "minidev-ui-vs-preline-ui",
  other: "Preline UI",
  otherUrl: "https://preline.co",
  title: "MiniDev UI vs Preline UI: which should you use?",
  description:
    "MiniDev UI vs Preline UI: a free React registry on Base UI and Tailwind v4 against Preline's HTML-first Tailwind components, JS plugins and paid Pro blocks.",
  checked: "2026-10-15",
  summary:
    "Preline UI is an open source Tailwind CSS component library of HTML markup plus a JavaScript file for the interactive parts, installed as the `preline` npm package and wired into Tailwind with an `@source` line and a variants stylesheet. It lists 640+ free components, 27 headless plugins and framework guides from React and Vue to Laravel and Rails, under MIT and a Preline UI Fair Use License, with paid Pro, Team and Enterprise licenses for 780+ blocks and 21 premium templates. MiniDev UI is a free, MIT, shadcn-compatible React registry of 548 items built on Base UI, Tailwind CSS v4 and motion. Pick Preline UI if you work in plain HTML, a server rendered stack or a framework other than React and want a very large catalogue of Tailwind markup. Pick MiniDev UI if you build React applications and want typed components on accessible primitives, finished product screens and motion with no paid tier.",
  rows: [
    {
      feature: "Price",
      minidev: "Free, everything",
      other: "Free open source library; Pro $249 (single developer), Team $459 (up to 15 developers) and Enterprise at custom pricing for Pro blocks and templates",
    },
    {
      feature: "License",
      minidev: "MIT",
      other: "MIT and the Preline UI Fair Use License for the open source library; Pro content under its own terms",
    },
    {
      feature: "Scope",
      minidev: "548 items: 397 UI components, 108 motion components, 43 blocks and pages",
      other: "640+ free components and 27 headless plugins; 204 free blocks and 5 free templates, rising to 780+ blocks and 21 templates with Pro",
    },
    {
      feature: "Format",
      minidev: "React components in TypeScript, copied into your repo",
      other: "HTML markup styled with Tailwind classes, plus a JavaScript file for interactive components",
    },
    {
      feature: "Frameworks",
      minidev: "React, with install guides for Next.js, Vite, Astro, React Router and TanStack Start",
      other: "Any stack where Tailwind runs; guides for HTML, React, Next.js, Vue, Nuxt, Angular, Astro, Svelte, Laravel, Rails, Django and many more",
    },
    {
      feature: "Install",
      minidev: "`npx shadcn@latest add @minidev/<name>`, or npm `minidev-ui-kit`",
      other: "`npm i preline`, then `@source \"./node_modules/preline/dist/*.js\"` and `@import \"./node_modules/preline/variants.css\"` after Tailwind, plus a script tag before `</body>`",
    },
    {
      feature: "Primitives and accessibility",
      minidev: "Base UI (`@base-ui/react`)",
      other: "Its own JavaScript plugins, described as accessible and headless",
    },
    {
      feature: "Design assets",
      minidev: "19 free design tools and brand kit generation on the same site",
      other: "A free Figma design system with components, styles, tokens and variants",
    },
    {
      feature: "Tailwind version",
      minidev: "Tailwind CSS v4",
      other: "The install docs use Tailwind v4 syntax (`@import \"tailwindcss\"`, `@source`, `@custom-variant`)",
    },
  ],
  body: [
    { type: "h2", text: "What each one is", id: "what-each-one-is" },
    {
      type: "p",
      text: "[Preline UI](https://preline.co) is an open source Tailwind CSS UI component library for building websites and apps. Its components are HTML snippets styled with Tailwind classes, and interactive pieces such as modals and other overlays use Preline's JavaScript, which you add with `npm i preline`, an `@source` line so Tailwind scans it, a variants stylesheet and a script tag. Because it is markup first, the site publishes framework guides for a long list of stacks, from React, Next.js, Vue and Angular to Laravel, Rails and Django. The free library lists 640+ components and 27 headless plugins under MIT and a Preline UI Fair Use License; Preline Pro ($249 for one developer, $459 for a team of up to 15) adds 780+ blocks and 21 templates with hundreds of pages. MiniDev UI is a free, MIT licensed shadcn-compatible registry of 548 React components, motion pieces and full pages built on Base UI, Tailwind CSS v4 and motion, installed as source into your repo with the shadcn CLI or from npm as `minidev-ui-kit`.",
    },
    { type: "h2", text: "Where each one is the better pick", id: "where-each-one-is-the-better-pick" },
    {
      type: "list",
      items: [
        "**Pick Preline UI outside React.** If the project is plain HTML, Laravel, Rails, Django, Vue or Angular, Preline's markup and JavaScript drop in where a React registry cannot.",
        "**Pick Preline UI for sheer catalogue size.** Hundreds of free components and blocks, and far more with Pro, plus a free Figma design system to match.",
        "**Pick MiniDev UI for React applications.** Components are typed React with props and composition, behavior comes from Base UI, and screens such as billing, settings, admin consoles and AI chat arrive as working pages.",
        "**Pick MiniDev UI when you want everything free.** All 548 items, 15 block types, 8 landing page templates and 19 design tools are MIT with no Pro tier.",
        "**Pick MiniDev UI for motion.** 108 animated components built on motion share the same tokens as the rest of the registry.",
      ],
    },
    { type: "component", name: "pricing-plans" },
    {
      type: "callout",
      tone: "note",
      text: "Preline Pro prices were $249 and $459 when we checked and the pricing page notes that taxes may apply; see [preline.co/pro](https://preline.co/pro/) for current terms. If you already use Preline markup in a React project, MiniDev blocks can be added route by route, since both are Tailwind CSS v4; watch for duplicate behaviors such as two dropdown implementations on one page.",
    },
  ],
  faq: [
    {
      q: "Is Preline UI free?",
      a: "The open source library is free under MIT and the Preline UI Fair Use License, including 640+ components, 204 blocks and 5 templates. Pro, Team and Enterprise licenses unlock more blocks and templates. MiniDev UI has no paid tier.",
    },
    {
      q: "Does Preline UI work with React?",
      a: "Yes. Preline publishes React and Next.js framework guides, and its components are HTML markup with a JavaScript layer rather than React components with props. MiniDev UI items are typed React components built on Base UI.",
    },
    {
      q: "Which should I use for a marketing site?",
      a: "Either. Preline has a large set of free marketing blocks in plain HTML that fits any stack, with more in Pro. MiniDev UI's 15 block types, 8 landing page templates and 108 motion components are React, so pick it if the site runs on Next.js or another React framework and you want animation.",
    },
  ],
  sources: [
    { label: "Preline UI home", url: "https://preline.co" },
    { label: "Preline UI docs and installation", url: "https://preline.co/docs/" },
    { label: "Preline UI components", url: "https://preline.co/docs/components.html" },
    { label: "Preline UI pricing", url: "https://preline.co/pricing/" },
    { label: "Preline Pro", url: "https://preline.co/pro/" },
    { label: "htmlstreamofficial/preline on GitHub", url: "https://github.com/htmlstreamofficial/preline" },
  ],
}

export default comparison
