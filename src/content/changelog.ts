/** Release notes, newest first. Each entry is a real change people can use. */
export type Release = { version: string; date: string; title: string; items: { text: string; href?: string }[] }

export const CHANGELOG: Release[] = [
  {
    version: "0.5",
    date: "2026-10-02",
    title: "Open source, 14 components, cropper and event calendar",
    items: [
      { text: "The source is now public on GitHub under MIT, with contributing guides and issue templates.", href: "https://github.com/amankaushik481/minidev-ui" },
      { text: "New form and data components: image cropper, credit card input, masked input, floating label input, avatar group, file tree, event calendar, pie chart, radial chart.", href: "/docs/event-calendar" },
      { text: "New backgrounds: meteors, retro grid, ripple, particles, flickering grid.", href: "/components/animation" },
      { text: "Component pages now lead with React, Tailwind and shadcn/ui in their titles, and every registry item carries a description." },
    ],
  },
  {
    version: "0.4",
    date: "2026-09-30",
    title: "API tables, 11 components, 6 tools, glossary",
    items: [
      { text: "Every component page now has an API reference table generated from its TypeScript props, with defaults and variants.", href: "/docs/button#api" },
      { text: "New components: password strength, signature pad, masonry grid, bento grid, back to top, sortable list, infinite scroll, animated tabs, confetti button, sparkles text, text reveal.", href: "/components/animation" },
      { text: "Six new free tools: shadcn theme generator, hex to OKLCH converter, contrast checker, fluid type calculator, mesh gradient generator, noise texture generator.", href: "/tools" },
      { text: "A glossary of 42 UI and front-end terms, from combobox to hydration.", href: "/glossary" },
      { text: "Installation guides for Next.js, Vite, React Router, Astro and TanStack Start.", href: "/docs/installation" },
      { text: "Ten new guides, including TanStack data tables, a Stripe billing page, Cmd+K palettes and Tailwind v4 migration.", href: "/guides" },
      { text: "Five more comparisons: HeroUI, Mantine, daisyUI, Flowbite and Chakra UI.", href: "/compare" },
    ],
  },
  {
    version: "0.3",
    date: "2026-09-30",
    title: "Category hubs, guides and ten motion components",
    items: [
      { text: "Components grouped into 20 category hubs with notes and install commands.", href: "/components" },
      { text: "Eleven long-form guides and five library comparisons.", href: "/guides" },
      { text: "Free tools: box shadow generator with a light source, glassmorphism generator, OKLCH palette generator, brand kit generator.", href: "/tools" },
      { text: "New motion components: shimmer button, border beam, gradient text, word rotate, dock, orbiting circles, animated beam, typing text, dot pattern, animated list.", href: "/components/animation" },
      { text: "Social cards for every page and llms.txt with categories and guides." },
    ],
  },
  {
    version: "0.2.3",
    date: "2026-09-29",
    title: "Brand kits and the split-flap board",
    items: [
      { text: "A brand kit for every template: logo, live color tokens, type, voice, mockups and downloadable CSS.", href: "/brand" },
      { text: "SplitFlap, a departure board display, and LightField, a WebGL background that follows the pointer.", href: "/docs/split-flap" },
      { text: "The Kura template's hero became a live departure board.", href: "/templates/kura" },
    ],
  },
  {
    version: "0.2.2",
    date: "2026-09-29",
    title: "Eight complete templates",
    items: [
      { text: "Templates for AI SaaS, fintech, healthcare, AI agents, property, coaching, agencies and e-commerce, each with working product UI.", href: "/templates" },
      { text: "Eight landing page blocks: hero, bento, social proof, scroll story, pricing, FAQ, CTA band, floating nav.", href: "/components/marketing" },
    ],
  },
  {
    version: "0.2.1",
    date: "2026-09-28",
    title: "Light and material",
    items: [
      { text: "One light source drives directional shadows across every component.", href: "/guides/css-shadows-light-source" },
      { text: "Four materials, hairline, glass, metal and paper, switchable with one attribute.", href: "/guides/glassmorphism-tailwind-css" },
      { text: "Blueprint mode: hold Option to see the spec of any element." },
    ],
  },
  {
    version: "0.2",
    date: "2026-09-28",
    title: "The hairline redesign",
    items: [
      { text: "A new foundation with semantic OKLCH tokens, a new landing page, gallery and docs.", href: "/docs" },
      { text: "Theme playground and the showcase app.", href: "/playground" },
    ],
  },
  {
    version: "0.1",
    date: "2026-09-14",
    title: "First public registry",
    items: [{ text: "MiniDev UI ships as a shadcn-compatible registry and the minidev-ui-kit npm package.", href: "/docs/installation" }],
  },
]
