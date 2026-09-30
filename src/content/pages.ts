/** Titles and descriptions for the hand-built routes. One place to edit them. */

export const TEMPLATE_SEO: Record<string, { title: string; description: string; keywords: string[]; kind: string }> = {
  lumen: {
    title: "Lumen: AI SaaS Landing Page Template for React",
    description: "An AI analytics SaaS landing page in React and Tailwind: live product hero, animated bento, scroll story, pricing with a yearly toggle and FAQ. Glass material.",
    keywords: ["ai saas landing page template", "saas landing page react", "tailwind saas template"],
    kind: "AI SaaS",
  },
  ponte: {
    title: "Ponte: Fintech App Landing Page Template",
    description: "A fintech and money transfer landing page with a working transfer app in a phone frame, live rates and an honest fee calculator. React, Tailwind, metal material.",
    keywords: ["fintech landing page template", "money transfer app ui", "banking app landing page"],
    kind: "Fintech app",
  },
  kura: {
    title: "Kura: Healthcare Marketplace Website Template",
    description: "A doctor booking marketplace template with a live split-flap departure board, clinic status, slot booking and a printed token. React, Tailwind, paper material.",
    keywords: ["healthcare website template", "doctor booking app ui", "clinic marketplace template"],
    kind: "Healthcare marketplace",
  },
  relay: {
    title: "Relay: AI Agent Startup Landing Page Template",
    description: "An AI support agent landing page with a live agent run that refunds a charge, an editable policy file, approvals and pricing. React and Tailwind, hairline style.",
    keywords: ["ai agent landing page", "ai startup website template", "b2b ai saas template"],
    kind: "AI agents",
  },
  atlas: {
    title: "Atlas: Property Management Software Template",
    description: "A property management SaaS template: portfolio map with rent and repairs per building, owner dashboard and a tenant app that pays rent in one tap. React, Tailwind.",
    keywords: ["property management software ui", "proptech landing page", "real estate saas template"],
    kind: "Property management",
  },
  cadence: {
    title: "Cadence: Coaching and Booking Platform Template",
    description: "A booking site template for coaches and therapists with a real scheduling widget, packages, payments, courses and reminders. Built with React and Tailwind CSS.",
    keywords: ["coaching website template", "booking page template react", "calendly style booking ui"],
    kind: "Coaching platform",
  },
  forma: {
    title: "Forma: Agency and Studio Website Template",
    description: "A design and development agency website template with oversized type, generative case study covers, marquee headlines and a conversational brief form.",
    keywords: ["agency website template", "studio portfolio template", "creative agency landing page"],
    kind: "Agency / studio",
  },
  hale: {
    title: "Hale: DTC Product Page Template for React",
    description: "A direct to consumer product page with a bottle that turns with the light, color and size pickers, reviews and a swipe to close cart. React and Tailwind CSS.",
    keywords: ["product page template", "dtc ecommerce template", "shopify style product page react"],
    kind: "DTC product",
  },
}

export const PAGE_SEO = {
  home: {
    title: "MiniDev UI: Free React + Tailwind Components, Blocks and Templates",
    description: "490+ free React and Tailwind CSS v4 components, landing page blocks and templates. shadcn-compatible, copy and own the code, light and dark, MIT licensed.",
  },
  docs: {
    title: "Docs: Install Free React Components with the shadcn CLI",
    description: "Get started with MiniDev UI: install any component with the shadcn CLI or npm, add the design tokens, and browse every component, block and motion effect.",
  },
  gallery: {
    title: "Component Gallery: Every React Component in Every State",
    description: "Browse 490+ free React and Tailwind components by category, rendered live with sample data in every state. Tables, billing, AI chat, auth, charts and more.",
  },
  templates: {
    title: "Free Website Templates for React and Tailwind: Live Demos",
    description: "Eight complete landing page templates for SaaS, fintech, healthcare, AI agents, property, coaching, agencies and e-commerce, built with React and Tailwind CSS.",
  },
  studio: {
    title: "Hire MiniDev: MVP, App and Website Development Studio",
    description: "MiniDev designs and builds MVPs, web apps, mobile apps and websites for founders. Start with a free 48 hour prototype, then ship the real product in weeks.",
  },
  showcase: {
    title: "Showcase: Product UI Built with MiniDev UI",
    description: "Product interfaces built with MiniDev UI components: dashboards, AI tools, billing flows and marketing sites, drawn to the same hairline standard.",
  },
  playground: {
    title: "Theme Playground: Customize Tailwind Design Tokens",
    description: "Try MiniDev UI themes live: switch materials, light and dark, accent colors and radii, then copy the Tailwind CSS v4 tokens into your project.",
  },
  brand: {
    title: "MiniDev UI Brand Kit: Logo, Colors, Type and Voice",
    description: "The MiniDev UI brand kit: logo usage, live color tokens, typography, voice and downloadable CSS tokens. See how every template gets a brand kit of its own.",
  },
  components: {
    title: "React Components by Category: Free, Tailwind, shadcn-Compatible",
    description: "Find the React component you need by category: forms, tables, charts, AI chat, auth, billing, dashboards, landing pages and more. All free, Tailwind CSS v4.",
  },
  guides: {
    title: "Guides: Build Better React and Tailwind Interfaces",
    description: "Practical guides for React, Next.js and Tailwind CSS v4: shadcn registries, pricing pages, AI chat UI, dashboards, dark mode, OKLCH colors and glassmorphism.",
  },
  compare: {
    title: "Compare MiniDev UI with Other React Component Libraries",
    description: "Honest comparisons of MiniDev UI with shadcn/ui, Aceternity UI, Magic UI, Tailwind Plus and coss ui: price, license, components, blocks and how to use them together.",
  },
  tools: {
    title: "Free CSS and Tailwind Tools for Designers and Developers",
    description: "Free browser tools: a light source box shadow generator, glassmorphism generator, OKLCH palette generator for Tailwind v4 and an instant brand kit generator.",
  },
} as const

/** Shown on /studio and emitted as FAQPage data. */
export const STUDIO_FAQ = [
  { q: "Is the prototype really free?", a: "Yes. You get a clickable prototype of your idea within 48 hours and you keep the link, whether or not we work together." },
  { q: "How do payments work?", a: "A small deposit to start, then the rest in milestones tied to demos you can click. You never pay for work you have not seen." },
  { q: "Who owns the code?", a: "You do, from the first commit. The repository, hosting and domain are set up in your accounts." },
  { q: "Can you take over an app someone else started?", a: "Yes. That is the Rescue package. We review the code in 48 hours and tell you honestly whether to fix it or rebuild parts of it." },
  { q: "What happens after launch?", a: "30 days of free fixes, then an optional monthly retainer for new features, updates and support." },
]
