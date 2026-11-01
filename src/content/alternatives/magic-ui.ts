import type { AlternativesPage } from "../types"

const page: AlternativesPage = {
  slug: "magic-ui",
  title: "Magic UI alternatives: 7 options compared",
  description:
    "The best Magic UI alternatives for animated React components and landing pages: Aceternity UI, MiniDev UI, shadcn/ui, Tailwind Plus and more, with prices.",
  checked: "2026-09-30",
  intro:
    "The closest alternative to Magic UI is Aceternity UI, another animated component library built with Tailwind CSS and Framer Motion that installs with the shadcn CLI; it leans toward effects designed to be noticed and sells 200+ premium blocks. MiniDev UI is the free option if you also need product screens, with over 100 motion components on a stylesheet that maps the shadcn token names. For landing page templates instead of effects, compare Tailwind Plus, Preline UI, Flowbite and Untitled UI React.",
  items: [
    {
      id: "aceternity-ui",
      what: "Animated React components built with Tailwind CSS and Framer Motion, known for striking effects: spotlight and beam backgrounds, 3D cards, animated text and scroll driven sections.",
      price: "Free components; paid annual or lifetime plans for 200+ premium blocks and 12+ templates",
      styling: "Tailwind classes per component; many effects set their own colors and gradients",
      bestFor: "A single, memorable effect as the centerpiece of a landing page",
    },
    {
      id: "minidev-ui",
      what: "A free shadcn-compatible registry with over 100 motion components built on motion, plus UI components and full product pages, all on one token system.",
      price: "Free, MIT, no paid tier",
      styling: "Tailwind CSS v4 with semantic OKLCH tokens; its stylesheet maps the shadcn/ui token names, so Magic UI pieces can follow the same theme",
      bestFor: "Product screens and marketing motion that share one theme; it pairs with Magic UI rather than replacing every effect",
    },
    {
      id: "shadcn-ui",
      what: "The component base Magic UI is designed to sit next to: free React components, blocks and the CLI.",
      price: "Free, MIT",
      styling: "Tailwind CSS v4 with CSS variable tokens; mostly CSS transitions",
      bestFor: "The forms, dialogs and blocks around your animated details",
    },
    {
      id: "tailwind-plus",
      what: "The paid collection from the makers of Tailwind CSS, with marketing blocks in React, Vue and HTML, downloadable site templates and the Catalyst UI kit.",
      price: "Paid, one-time purchase with lifetime access; commercial license",
      styling: "Tailwind utility classes; Headless UI for behavior",
      bestFor: "Downloadable landing page and site templates, in place of Magic UI Pro templates",
    },
    {
      id: "preline-ui",
      what: "Open source Tailwind CSS components in HTML with JavaScript plugins, including 204 free blocks and 5 free templates.",
      price: "Free under MIT and the Preline UI Fair Use License; Pro $249, Team $459",
      styling: "HTML with Tailwind classes, plus Preline's JavaScript",
      bestFor: "Free marketing blocks and templates in HTML, for any stack",
    },
    {
      id: "flowbite",
      what: "Open source Tailwind components with a data attribute script and Flowbite React, plus Flowbite Blocks for marketing, application and e-commerce sections.",
      price: "Free, MIT; Flowbite Pro is paid",
      styling: "Tailwind utility classes with native Tailwind v4 theme variables",
      bestFor: "Marketing sections across many frameworks, with a Figma design system in Pro",
    },
    {
      id: "untitled-ui",
      what: "React components built with Tailwind CSS v4 and React Aria, kept in sync with the Untitled UI Figma kit.",
      price: "Free MIT components; PRO is a one-time purchase from $349",
      styling: "Tailwind CSS v4 with tokens in a `theme.css`",
      bestFor: "A very large paid catalogue of sections and page examples, synced with a Figma kit",
    },
  ],
  body: [
    { type: "h2", text: "How to choose", id: "how-to-choose" },
    {
      type: "list",
      items: [
        "**Bigger animated effects:** Aceternity UI.",
        "**Motion plus product screens, free:** MiniDev UI.",
        "**The base under your effects:** shadcn/ui.",
        "**Templates instead of effects:** Tailwind Plus, Preline UI, Flowbite or Untitled UI React.",
      ],
    },
  ],
  faq: [
    {
      q: "What is the best alternative to Magic UI?",
      a: "Aceternity UI, if you want animated effects with more visual weight and are open to paid blocks and templates. MiniDev UI, if you want free motion components plus the product UI around them.",
    },
    {
      q: "Is Magic UI open source?",
      a: "Yes. Magic UI is MIT licensed, per the LICENSE.md in its repository. Magic UI Pro, which sells templates and sections, is a separate paid product.",
    },
    {
      q: "Do these alternatives work with shadcn/ui?",
      a: "Aceternity UI and MiniDev UI install through the shadcn CLI, and MiniDev UI maps the standard shadcn token names to its own. Tailwind Plus, Preline UI, Flowbite and Untitled UI React have their own setups.",
    },
    {
      q: "Which Magic UI alternatives are free?",
      a: "Aceternity UI's components, MiniDev UI, shadcn/ui, and the free tiers of Preline UI, Flowbite and Untitled UI React. Tailwind Plus is paid.",
    },
    {
      q: "Can I use Magic UI and Aceternity UI together?",
      a: "Yes. Both install with the shadcn CLI and use Tailwind CSS. Check that Framer Motion and motion resolve to compatible versions, and swap hard coded colors in Aceternity effects for your theme tokens.",
    },
  ],
  sources: [
    { label: "Magic UI home", url: "https://magicui.design/" },
    { label: "Magic UI license (MIT, checked November 1, 2026)", url: "https://github.com/magicuidesign/magicui/blob/main/LICENSE.md" },
    { label: "Magic UI Pro", url: "https://pro.magicui.design/" },
    { label: "Aceternity UI home", url: "https://ui.aceternity.com/" },
    { label: "Aceternity UI pricing", url: "https://ui.aceternity.com/pricing" },
    { label: "Aceternity UI license", url: "https://ui.aceternity.com/licence" },
    { label: "shadcn/ui docs", url: "https://ui.shadcn.com/docs" },
    { label: "Tailwind Plus", url: "https://tailwindcss.com/plus" },
    { label: "Tailwind Plus license", url: "https://tailwindcss.com/plus/license" },
    { label: "Preline UI home", url: "https://preline.co" },
    { label: "Preline UI pricing", url: "https://preline.co/pricing/" },
    { label: "Flowbite introduction", url: "https://flowbite.com/docs/getting-started/introduction/" },
    { label: "Flowbite Pro", url: "https://flowbite.com/pro/" },
    { label: "Untitled UI React introduction", url: "https://www.untitledui.com/react/docs/introduction" },
    { label: "Untitled UI pricing", url: "https://www.untitledui.com/pricing" },
  ],
}

export default page
