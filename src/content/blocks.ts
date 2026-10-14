import type { CategoryId } from "./types"

/**
 * Block hubs: /blocks/<slug>. Each groups registry items that make one kind of page section,
 * for searches like "tailwind hero section" or "react pricing section". Names must exist in the registry.
 */
export type BlockType = {
  slug: string
  /** Short name for links and breadcrumbs. */
  name: string
  /** <title> before the brand suffix. */
  title: string
  h1: string
  description: string
  keywords: string[]
  /** Two or three short paragraphs. */
  intro: string[]
  /** Registry names, best first. */
  items: string[]
  /** Category hub to cross-link. */
  category: CategoryId
  faq: { q: string; a: string }[]
}

export const BLOCK_TYPES: BlockType[] = [
  {
    slug: "hero-sections",
    name: "Hero sections",
    title: "Tailwind Hero Sections for React: 14 Free Blocks",
    h1: "Hero sections for React and Tailwind CSS",
    description: "14 free hero section blocks for React and Tailwind CSS v4: split layouts, kinetic type, aurora and gradient mesh backgrounds, product mockups and waitlist heroes. Copy the code, MIT.",
    keywords: ["tailwind hero section", "react hero section component", "hero section template", "nextjs hero component", "landing page hero react"],
    intro: [
      "A hero is the first screen of a landing page: headline, one supporting sentence, a primary action and proof that the product is real. These blocks cover the layouts that keep showing up in good SaaS sites, from a plain editorial split to heroes with animated type, live product mockups and glowing backgrounds.",
      "Every block is one file that lands in your project through the shadcn CLI. They share MiniDev's semantic tokens, so a hero, a pricing section and a footer from this kit match without any tuning, and the dark theme comes for free.",
    ],
    items: ["hero-split-showcase", "hero-editorial-split", "hero-kinetic-type", "hero-aurora", "hero-gradient-mesh", "hero-bento", "hero-typed-headline", "hero-poster-type", "hero-marquee-brands", "hero-client-pitch", "hero-spotlight", "waitlist-hero", "waveform-hero", "hero"],
    category: "marketing",
    faq: [
      { q: "How do I use one of these hero sections in Next.js?", a: "Run the install command shown on the block page, for example npx shadcn@latest add https://ui.minidev.pro/r/hero-split-showcase.json. The file lands in components/ui, you import it in app/page.tsx and replace the sample copy with yours." },
      { q: "Do the animated heroes hurt page speed?", a: "The motion heroes use CSS and the motion library, pause when they leave the viewport and go still with prefers-reduced-motion. Keep one animated hero per page and lazy load heavy sections below it." },
      { q: "Can I change the colors?", a: "Yes. Every block reads semantic tokens such as --accent and --surface from your CSS, so changing the theme in globals.css restyles all of them. The shadcn theme generator in Tools builds a palette for you." },
    ],
  },
  {
    slug: "pricing-sections",
    name: "Pricing sections",
    title: "React Pricing Section Components: Tables, Plans, Toggles",
    h1: "Pricing sections and pricing tables for React",
    description: "Free React pricing section components for Tailwind CSS: three-tier pricing tables, plan cards, monthly and yearly toggles, feature comparison tables and animated pricing pages. MIT.",
    keywords: ["react pricing section", "tailwind pricing table", "pricing page component react", "pricing cards tailwind", "saas pricing table"],
    intro: [
      "Pricing sections carry the most expensive words on a site, so they need to be exact: three plans with the middle one highlighted, a billing toggle that updates every price, and a comparison table for the people who read everything before they buy.",
      "These blocks go from a single plan card to a full pricing page with motion. The plan data is plain objects, so you can feed them from your billing system or a CMS.",
    ],
    items: ["pricing-table", "pricing-plans", "pricing-page", "pricing-motion", "pricing-kinetic", "plan-card", "plan-comparison", "comparison-table", "pricing-toggle", "feature-comparison"],
    category: "billing",
    faq: [
      { q: "How do I add a monthly and yearly toggle?", a: "PricingToggle and PricingTable work together: keep the billing period in state, pass it to the table and show the yearly price with the discount. The pricing page guide walks through it with Stripe price ids." },
      { q: "Which pricing layout converts best?", a: "Three plans with the recommended one visually raised, one line of who each plan is for, and the full comparison table below the fold. Hide nothing people need to decide, and make the free or trial action obvious." },
    ],
  },
  {
    slug: "feature-sections",
    name: "Feature sections",
    title: "Feature Section Components for React and Tailwind",
    h1: "Feature sections: grids, bento layouts and feature rows",
    description: "Free feature section blocks for React and Tailwind CSS v4: icon feature grids, bento grids, alternating feature rows with motion and sticky scroll stories. Copy the code, MIT.",
    keywords: ["tailwind feature section", "react feature grid component", "bento grid react", "feature section template", "features section tailwind"],
    intro: [
      "Feature sections explain what the product does in a way people actually read: a grid of short benefits with icons, a bento layout that gives the main feature more room, or alternating rows that pair a sentence with a screenshot.",
      "Pick the density that matches your product. Three to six features fit a grid; one hero feature plus a few supporting ones suit a bento; a product with a story reads better as rows or a sticky scroll section.",
    ],
    items: ["feature-grid", "bento-grid", "feature-bento-motion", "bento-live", "animated-feature-row", "sticky-feature-story", "section-header"],
    category: "marketing",
    faq: [
      { q: "What is a bento grid?", a: "A bento grid is a layout of cards in different sizes on one grid, named after Japanese lunch boxes. One or two large cards hold the main feature and smaller cards hold the rest. The glossary entry explains when it works." },
      { q: "Can I use my own icons?", a: "Yes. The feature grid takes any React node as the icon, so lucide icons, your own SVGs or small screenshots all work." },
    ],
  },
  {
    slug: "testimonials",
    name: "Testimonials",
    title: "React Testimonial Components: Cards, Carousels, Walls",
    h1: "Testimonial sections for React and Tailwind",
    description: "Free testimonial components for React and Tailwind CSS: quote cards, a testimonial carousel, a social proof wall, press quotes and avatar rows. One file each, MIT.",
    keywords: ["react testimonial component", "tailwind testimonial section", "testimonial carousel react", "social proof section", "customer quotes component"],
    intro: [
      "Testimonials work when they are specific: a real name, a role, a company and one sentence about a result. The components here give that content a shape, from a single quote card to a wall of cards and an auto-playing carousel.",
      "Each one takes plain data, so the same quotes can appear in a hero, on the pricing page and in a case study without being retyped.",
    ],
    items: ["testimonial", "testimonial-carousel", "social-proof-wall", "social-proof", "press-quote", "marquee-quotes", "avatar-group", "animated-tooltip"],
    category: "marketing",
    faq: [
      { q: "Should testimonials auto-rotate?", a: "Only with a pause on hover and focus, a visible way to move by hand, and stillness under prefers-reduced-motion. The carousel here does all three. A static grid is often the safer choice." },
    ],
  },
  {
    slug: "faq-sections",
    name: "FAQ sections",
    title: "FAQ Section Components for React and Tailwind",
    h1: "FAQ sections and accordions for React",
    description: "Free FAQ section blocks for React and Tailwind CSS v4: accessible accordions, two-column FAQ layouts and an animated FAQ with motion, ready for FAQPage structured data. MIT.",
    keywords: ["react faq component", "tailwind faq section", "faq accordion react", "faq section template", "accordion faq tailwind"],
    intro: [
      "An FAQ section answers the objections that stop a signup, so it belongs near the pricing and the final call to action. The accordion keeps the page short; the two-column layout works when the answers are short enough to show at once.",
      "The accordion is built on Base UI, so headings, buttons, expanded state and keyboard navigation follow the WAI-ARIA pattern without extra work.",
    ],
    items: ["faq-section", "faq-list", "faq-accordion-motion", "accordion"],
    category: "marketing",
    faq: [
      { q: "Does an FAQ section help SEO?", a: "It helps when the questions are the ones people actually search for. Add FAQPage structured data (the JSON-LD helper in this site does it) so search engines and AI assistants can read the pairs directly." },
    ],
  },
  {
    slug: "cta-sections",
    name: "CTA sections",
    title: "Call to Action Section Components for React",
    h1: "Call to action sections for React and Tailwind",
    description: "Free call to action blocks for React and Tailwind CSS: CTA bands, glowing CTA panels, sticky CTA bars, magnetic buttons, contact sales and waitlist forms. MIT.",
    keywords: ["react cta section", "tailwind cta component", "call to action section template", "sticky cta bar react", "newsletter signup component"],
    intro: [
      "A call to action section is the last thing on a landing page and the one with the clearest job. These blocks cover the common shapes: a full-width band, a glowing panel, a sticky bar that follows the reader, a waitlist form and a contact sales panel for enterprise pages.",
    ],
    items: ["cta-band", "cta-glow", "cta-banner", "sticky-cta-bar", "magnetic-cta", "contact-sales", "newsletter-signup", "command-waitlist", "product-launch"],
    category: "marketing",
    faq: [
      { q: "How many CTAs should a landing page have?", a: "One primary action, repeated: in the hero, after the features and at the end. The text should be the same each time so people recognise it." },
    ],
  },
  {
    slug: "footers",
    name: "Footers",
    title: "Footer Components for React and Tailwind CSS",
    h1: "Footer components for React and Tailwind",
    description: "Free footer components for React and Tailwind CSS v4: a mega footer with link columns, a compact footer with nav links, and matching email footers. Accessible, responsive, MIT.",
    keywords: ["tailwind footer component", "react footer component", "footer template tailwind", "nextjs footer", "mega footer react"],
    intro: [
      "Footers hold the links people look for when the rest of the page did not answer their question: product, docs, pricing, legal, contact. A mega footer suits a site with many pages; a one-line footer suits a landing page or an app.",
    ],
    items: ["footer-mega", "footer-nav", "email-footer"],
    category: "navigation",
    faq: [
      { q: "What should a SaaS footer contain?", a: "Product and pricing links, docs and changelog, company and contact, legal pages (privacy, terms), a status page link if you have one, and social links. Keep it to what people actually look for." },
    ],
  },
  {
    slug: "navbars",
    name: "Navbars and headers",
    title: "Navbar and Header Components for React and Tailwind",
    h1: "Navbars, headers and navigation menus for React",
    description: "Free navbar and header components for React and Tailwind CSS v4: a marketing nav with mega menu, a floating nav, a mobile nav drawer, a navigation menu built on Base UI and page headers. MIT.",
    keywords: ["tailwind navbar component", "react navbar component", "responsive navbar react", "nextjs header component", "navigation menu react"],
    intro: [
      "The navbar is on every page, so it has to be right on every screen size: a menu that works with keyboard and screen readers on desktop, and a drawer that is easy to reach with a thumb on phones. These components cover marketing sites and product apps.",
    ],
    items: ["nav-marketing", "floating-nav", "navigation-menu", "mobile-nav-drawer", "page-header", "announcement-bar", "sidebar", "collapsible-sidebar"],
    category: "navigation",
    faq: [
      { q: "How do I build a responsive navbar in React?", a: "Use one component for the desktop menu and a drawer for small screens, switch with a Tailwind breakpoint, and keep both lists in one data array so they never drift. The sidebar layout guide covers the app version." },
    ],
  },
  {
    slug: "logo-clouds",
    name: "Logo clouds",
    title: "Logo Cloud and Brand Marquee Components for React",
    h1: "Logo clouds and brand marquees for React",
    description: "Free logo cloud components for React and Tailwind CSS: static logo grids, an animated logo wall, a brand marquee hero and an orbiting logo cluster. Social proof with no plugins, MIT.",
    keywords: ["react logo cloud", "tailwind logo cloud", "logo marquee react", "trusted by section", "client logos component"],
    intro: [
      "A logo cloud says \"companies like yours use this\" in one glance. Use a static row when you have six or fewer logos, and a marquee when you have more than fit on one line.",
    ],
    items: ["logo-cloud", "logo-wall-motion", "hero-marquee-brands", "orbit-logo-cluster", "marquee", "typographic-marquee"],
    category: "marketing",
    faq: [
      { q: "Should a logo marquee loop forever?", a: "A slow loop is fine on marketing pages, but pause it on hover and under prefers-reduced-motion, and keep the logos in the DOM once so screen readers do not read them twice." },
    ],
  },
  {
    slug: "stats-sections",
    name: "Stats sections",
    title: "Stats and Metrics Section Components for React",
    h1: "Stats sections and animated counters for React",
    description: "Free stats section components for React and Tailwind CSS: headline number strips, animated counters, metric tiles with deltas, a split-flap stat board and a metric ticker. MIT.",
    keywords: ["react stats section", "animated counter react", "tailwind stats component", "metrics section template", "number counter animation react"],
    intro: [
      "Stats sections turn traction into a sentence: customers, revenue processed, uptime, countries. The counter versions animate the numbers in when they scroll into view and stay still with reduced motion.",
    ],
    items: ["stats-strip", "stats-counter", "admin-stat-strip", "metric-ticker-board", "flip-stat-board", "stat-card", "metric-delta", "number-roll"],
    category: "marketing",
    faq: [
      { q: "How do I animate a number counting up in React?", a: "NumberRoll rolls each digit with a spring and announces the final value to screen readers. StatsCounter wraps it for a whole section and triggers when the block scrolls into view." },
    ],
  },
  {
    slug: "login-pages",
    name: "Login and signup",
    title: "Login and Signup Page Components for React",
    h1: "Login, signup and auth pages for React",
    description: "Free login and signup components for React and Tailwind CSS v4: sign in page, sign up form, social auth buttons, magic link, password reset, two-factor setup and verification. MIT.",
    keywords: ["react login page component", "tailwind login form", "signup page react", "auth page template", "two factor authentication ui"],
    intro: [
      "Auth pages are the same on every product and still get built from scratch every time. These blocks cover the full set: sign in, sign up, social buttons, magic link, forgot and reset password, and two-factor setup and verification, all on one AuthCard shell.",
    ],
    items: ["sign-in-page", "auth-card", "sign-up-form", "social-auth-row", "magic-link-form", "forgot-password-form", "reset-password-form", "two-factor-setup", "two-factor-verify", "otp-input", "password-strength"],
    category: "auth",
    faq: [
      { q: "Do these work with Clerk, Auth.js or Supabase?", a: "Yes. They are forms and layouts with no auth logic inside, so you wire the submit handlers to whichever provider you use." },
    ],
  },
  {
    slug: "dashboards",
    name: "Dashboards",
    title: "React Dashboard Page Templates and Layouts",
    h1: "Dashboard pages and admin layouts for React",
    description: "Free dashboard page blocks for React and Tailwind CSS v4: a SaaS dashboard home, admin overview, analytics page, engineering console, status page and report builder with live charts. MIT.",
    keywords: ["react dashboard template", "tailwind dashboard layout", "admin dashboard react free", "nextjs dashboard page", "analytics dashboard component"],
    intro: [
      "A dashboard is a layout problem first: a sidebar, a header, a grid of stat cards and charts, and a table. These full-page blocks give you working versions of the common ones, with real chart and table components inside that you can swap one at a time.",
    ],
    items: ["dashboard-home", "admin-overview", "analytics-page", "admin-console", "engineering-console", "command-center", "report-builder", "status-page", "project-list", "users-table-page"],
    category: "dashboard",
    faq: [
      { q: "Is there a full dashboard template?", a: "Yes. The Lumen template is a complete finance app built only from the kit, with a dashboard, invoices, customers and settings. The templates page links it." },
    ],
  },
  {
    slug: "settings-pages",
    name: "Settings pages",
    title: "Settings Page Components for React and Tailwind",
    h1: "Settings and billing pages for React",
    description: "Free settings page blocks for React and Tailwind CSS v4: a settings layout with sections, profile form, billing page, feature flags, API keys and team management. MIT.",
    keywords: ["react settings page", "tailwind settings layout", "saas settings page template", "billing page component", "account settings ui"],
    intro: [
      "Settings pages are where SaaS products live after the first week. These blocks cover the layout, the profile form, billing with invoices and payment methods, feature flags and the team page, each built from smaller components you can rearrange.",
    ],
    items: ["settings-page", "settings-layout", "profile-form", "billing-page", "feature-flags", "api-key-list", "team-member-row", "danger-zone", "notification-preferences"],
    category: "settings",
    faq: [
      { q: "How should a settings page be structured?", a: "Group by what people come for: profile, workspace, members, billing, notifications, integrations, danger zone. Keep each group on its own route or anchored section and save per form, not per field." },
    ],
  },
  {
    slug: "landing-pages",
    name: "Landing pages",
    title: "Free Landing Page Templates for React and Tailwind",
    h1: "Landing page blocks and full pages for React",
    description: "Free landing page blocks for React and Tailwind CSS v4: complete SaaS marketing pages, a scroll story, a premium landing page with motion and section blocks you can mix. MIT.",
    keywords: ["react landing page template", "tailwind landing page", "nextjs landing page free", "saas landing page template", "landing page blocks"],
    intro: [
      "These are whole pages assembled from the section blocks on this site: hero, logos, features, testimonials, pricing, FAQ and a final call to action. Start from one and swap sections rather than starting from a blank file.",
    ],
    items: ["saas-marketing-page", "marketing-landing", "premium-landing", "saas-landing", "scroll-story", "docs-marketing", "changelog-marketing", "status-marketing"],
    category: "marketing",
    faq: [
      { q: "Where are the full templates?", a: "Eight complete templates (AI SaaS, fintech, healthcare, agents, property, coaching, agency, commerce) live on the templates page, each with a brand kit." },
    ],
  },
  {
    slug: "empty-states",
    name: "Empty and error states",
    title: "Empty State and Error Page Components for React",
    h1: "Empty states, 404 pages and error states for React",
    description: "Free empty state and error components for React and Tailwind CSS: empty workspace, empty table and search results, 404 not found, server error, offline state and retry patterns. MIT.",
    keywords: ["react empty state component", "404 page react", "empty state design", "error state component", "not found page tailwind"],
    intro: [
      "Empty states are the first thing a new user sees and error states are the thing they remember. Each one here says what happened, what to do next and gives one clear action.",
    ],
    items: ["empty-state", "empty-workspace", "empty-table", "empty-search", "not-found-state", "server-error-state", "error-state", "offline-state", "skeleton"],
    category: "feedback",
    faq: [
      { q: "What makes a good empty state?", a: "A one-line explanation, the primary action to fill it, and nothing else. Illustrations are optional; a clear sentence and a button do the job." },
    ],
  },
]

export const blockTypeBySlug = (slug: string) => BLOCK_TYPES.find((b) => b.slug === slug)
