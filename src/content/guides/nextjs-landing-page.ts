import type { Guide } from "../types"

const guide: Guide = {
  slug: "nextjs-landing-page",
  title: "Build a landing page in Next.js with shadcn-compatible blocks",
  description:
    "Build a Next.js landing page from free shadcn-compatible blocks: section order, copy that converts, performance, and metadata and structured data for SEO.",
  date: "2026-09-30",
  keywords: [
    "nextjs landing page",
    "shadcn landing page",
    "tailwind landing page sections",
    "saas landing page react",
    "nextjs landing page template",
  ],
  related: [
    "floating-nav",
    "hero-spotlight",
    "bento-live",
    "scroll-story",
    "social-proof-wall",
    "pricing-plans",
    "faq-section",
    "cta-band",
    "light-provider",
  ],
  body: [
    {
      type: "p",
      text: "To build a landing page in Next.js quickly, keep `app/page.tsx` a server component that exports `metadata`, and compose it from eight client blocks in a fixed order: navigation, hero, product, how it works, social proof, pricing, FAQ and a final call to action. MiniDev UI ships each of those as a free shadcn-compatible block with real props, so the work left is your copy, your product visuals and your numbers. This guide covers the order, the props that matter, copy, performance and the SEO basics.",
    },

    { type: "h2", text: "The section order and why", id: "section-order" },
    {
      type: "p",
      text: "Visitors arrive with one question (\"is this for me?\") and leave with another (\"is it worth it?\"). The order answers them in sequence:",
    },
    {
      type: "table",
      head: ["Section", "Block", "Its one job"],
      rows: [
        ["Navigation", "`floating-nav`", "Orient, and keep the primary CTA one click away"],
        ["Hero", "`hero-spotlight`", "Say what it is, who it is for and what to do next"],
        ["Product", "`bento-live`", "Show the product doing the three to six things people buy it for"],
        ["How it works", "`scroll-story`", "Remove the fear of setup with three concrete steps"],
        ["Social proof", "`social-proof-wall`", "Show that people like the visitor already use it"],
        ["Pricing", "`pricing-plans`", "Make the cost and the right plan obvious"],
        ["FAQ", "`faq-section`", "Answer the objections that stop the click"],
        ["Final CTA", "`cta-band`", "Ask once more, with the lowest friction form possible"],
      ],
    },
    {
      type: "p",
      text: "Social proof can move up directly under the hero when you have recognizable logos. Pricing can move down or out entirely for sales-led products; keep the FAQ either way.",
    },

    { type: "h2", text: "Install the blocks and tokens", id: "install" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/floating-nav.json https://ui.minidev.pro/r/hero-spotlight.json https://ui.minidev.pro/r/bento-live.json https://ui.minidev.pro/r/scroll-story.json\nnpx shadcn@latest add https://ui.minidev.pro/r/social-proof-wall.json https://ui.minidev.pro/r/pricing-plans.json https://ui.minidev.pro/r/faq-section.json https://ui.minidev.pro/r/cta-band.json https://ui.minidev.pro/r/light-provider.json",
    },
    {
      type: "p",
      text: "The blocks use MiniDev's semantic tokens (`bg-surface`, `text-fg-muted`, `shadow-raised`) and a few utilities such as `light-spot` and `text-lit`. Add the token stylesheet once, either from the package (`npm i minidev-ui-kit`) or by copying [styles.css](https://ui.minidev.pro/r/styles.css) into your project:",
    },
    {
      type: "code",
      lang: "css",
      filename: "app/globals.css",
      code: '@import "tailwindcss";\n@import "minidev-ui-kit/styles.css";\n@source "../node_modules/minidev-ui-kit";',
    },
    {
      type: "p",
      text: "Render [LightProvider](/docs/light-provider) once in your root layout. It writes the light position to CSS variables from the pointer, which is what makes the hero headline and the CTA panel catch the light. Its `idle` prop, on by default, lets the light drift slowly on touch devices and when the pointer is still; pass `idle={false}` to keep it pinned to the pointer.",
    },

    { type: "h2", text: "Compose the page", id: "compose" },
    {
      type: "p",
      text: "Every block is a client component, but your page does not need to be. Keep `app/page.tsx` a server component so it can export `metadata`, and pass only serializable props: strings, arrays, `href`s and React elements. Function props such as `onSubmit` go through a small client wrapper.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/page.tsx",
      code: 'import Image from "next/image"\nimport { FloatingNav } from "@/components/ui/floating-nav"\nimport { HeroSpotlight } from "@/components/ui/hero-spotlight"\nimport { BentoLive } from "@/components/ui/bento-live"\nimport { ScrollStory } from "@/components/ui/scroll-story"\nimport { SocialProofWall } from "@/components/ui/social-proof-wall"\nimport { PricingPlans } from "@/components/ui/pricing-plans"\nimport { FaqSection } from "@/components/ui/faq-section"\nimport { Signup } from "./signup"\nimport { FEATURES, STEPS, QUOTES, PLANS, FAQS } from "./content"\n\nexport default function Home() {\n  return (\n    <>\n      <FloatingNav\n        brand={<span className="font-semibold">Acme</span>}\n        links={[\n          { label: "Product", href: "#product" },\n          { label: "How it works", href: "#how" },\n          { label: "Pricing", href: "#pricing" },\n          { label: "FAQ", href: "#faq" },\n        ]}\n        cta={{ label: "Start free", href: "/signup" }}\n        secondary={{ label: "Sign in", href: "/login" }}\n      />\n      <main>\n        <HeroSpotlight\n          eyebrow="New: Slack alerts"\n          title="Revenue answers,"\n          highlight="before Monday."\n          description="Acme watches Stripe and your CRM and tells finance what changed and why."\n          primary={{ label: "Start free", href: "/signup" }}\n          secondary={{ label: "See a 2 minute demo", href: "#how" }}\n          proof="Free for 14 days. No card required."\n          visual={<Image src="/app.png" alt="Acme dashboard showing MRR and alerts" width={2400} height={1500} preload sizes="(min-width: 1280px) 1152px, 100vw" className="rounded-2xl border border-border shadow-overlay" />}\n        />\n        <div id="product" className="scroll-mt-24"><BentoLive title="Everything finance checks, checked for you." items={FEATURES} /></div>\n        <div id="how" className="scroll-mt-24"><ScrollStory title="Live in an afternoon." steps={STEPS} /></div>\n        <div id="customers" className="scroll-mt-24"><SocialProofWall logos={["Northwind", "Halcyon"]} quotes={QUOTES} /></div>\n        <div id="pricing" className="scroll-mt-24"><PricingPlans plans={PLANS} /></div>\n        <div id="faq" className="scroll-mt-24"><FaqSection items={FAQS} /></div>\n        <Signup />\n      </main>\n    </>\n  )\n}',
    },
    {
      type: "p",
      text: "`scroll-mt-24` on each anchor target keeps section headings clear of the sticky nav when a link jumps to them. The same structure, with the default content, is the [Lumen template](/templates/lumen), which is a good reference for spacing and rhythm between the blocks.",
    },

    { type: "h2", text: "Notes on each block", id: "blocks" },
    { type: "h3", text: "FloatingNav" },
    {
      type: "p",
      text: "[FloatingNav](/docs/floating-nav) starts as a full-width bar and, after 40px of scroll, tucks into a floating pill with a raised surface. The hover highlight glides between links, and on mobile a menu sheet drops from the pill. Props: `brand`, `links` (`{ label, href }[]`), `cta` (`{ label, href?, onClick? }`) and `secondary` (pass `null` to hide it). Keep it to four or five links.",
    },
    { type: "h3", text: "HeroSpotlight" },
    {
      type: "p",
      text: "[HeroSpotlight](/docs/hero-spotlight) renders the page `h1` from `title` plus a second, lit line from `highlight`. It also takes `eyebrow`, `description`, `primary` and `secondary` actions, a small `proof` line, an optional `visual` that rises in last, and `align` (`\"center\"` or `\"left\"`). Put your strongest real product visual in `visual`. The entrance animation is skipped when the visitor prefers reduced motion.",
    },
    { type: "h3", text: "BentoLive" },
    {
      type: "p",
      text: "[BentoLive](/docs/bento-live) is a six-column grid on large screens. Each item has `title`, `body`, an optional `visual` and a `span` of 2, 3, 4 or 6 columns, plus `tall` to span two rows. Make each row add up to six. The idea is that tiles show a small working piece of the product (a live number, a streaming answer, a list of alerts) instead of static screenshots.",
    },
    { type: "h3", text: "ScrollStory" },
    {
      type: "p",
      text: "[ScrollStory](/docs/scroll-story) lists `steps` (`{ kicker, title, body, visual }`) on the left and pins the active step's visual on the right, switching as each step crosses the middle of the viewport. A rail fills with progress. On small screens each step shows its visual inline, so nothing is lost on mobile. Three steps is the sweet spot.",
    },
    { type: "h3", text: "SocialProofWall" },
    {
      type: "p",
      text: "[SocialProofWall](/docs/social-proof-wall) combines a logo marquee that pauses on hover with a three-column wall of quotes. Quotes are `{ quote, name, role, metric? }`; the optional `metric` renders as a pill above the quote and is the most persuasive part, so use it. The sample content is fictional. Replace it with real customers before you ship.",
    },
    { type: "h3", text: "PricingPlans and FaqSection" },
    {
      type: "p",
      text: "Both are covered in depth in the [React pricing page guide](/guides/react-pricing-page): plan data, the yearly toggle with rolling prices, the featured plan, and an accessible accordion FAQ where one answer is open at a time.",
    },
    { type: "h3", text: "CtaBand" },
    {
      type: "p",
      text: "[CtaBand](/docs/cta-band) is a lit panel with a headline and an email form. `onSubmit(email)` may return a promise: the button shows a busy state while it runs, morphs into the `success` message when it resolves, and returns to idle if it throws, so errors are handled by throwing.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/signup.tsx",
      code: '"use client"\nimport { CtaBand } from "@/components/ui/cta-band"\n\nexport function Signup() {\n  return (\n    <CtaBand\n      button="Get early access"\n      success="Check your inbox"\n      note="No card. Unsubscribe in one click."\n      onSubmit={async (email) => {\n        const res = await fetch("/api/waitlist", { method: "POST", body: JSON.stringify({ email }) })\n        if (!res.ok) throw new Error("Signup failed")\n      }}\n    />\n  )\n}',
    },
    { type: "component", name: "hero-spotlight" },
    { type: "component", name: "bento-live" },

    { type: "h2", text: "Copy that does the work", id: "copy" },
    {
      type: "list",
      items: [
        "Hero title: the outcome, not the category. \"Revenue answers before Monday\" beats \"AI-powered analytics platform\".",
        "Hero description: who it is for and how it works, in one sentence under 25 words.",
        "One primary action, repeated with the same label in the nav, hero, pricing and final CTA.",
        "Feature tiles: a verb and a result in the title, a specific detail in the body. Numbers beat adjectives.",
        "Steps: start each with a verb (\"Connect\", \"Learn\", \"Tell\") and state the time each takes.",
        "Quotes: pick ones that name a before and after. Put the measurable part in `metric`.",
        "FAQ: answer the questions sales hears, especially security, data, contracts and switching cost.",
      ],
    },

    { type: "h2", text: "Performance", id: "performance" },
    {
      type: "p",
      text: "Client components still render to HTML on the server, so all copy is in the first response and crawlable. What you pay for on the client is JavaScript for the interactive parts and the Motion library that drives the animations. Keep that cost in check:",
    },
    {
      type: "list",
      items: [
        "Your hero visual is usually the Largest Contentful Paint element. Serve it with `next/image`, give it `sizes`, and mark it `preload` (`priority` before Next.js 16).",
        "The hero headline animates in with a short fade. If LCP is your headline and you measure a delay, shorten the delay or drop the `initial` animation on the `h1` in your copy of the block.",
        "Use `next/font` for fonts so they are self-hosted and do not shift layout. MiniDev UI uses Geist via the `geist` package.",
        "Keep below-the-fold visuals light. Live tiles built from HTML and CSS are cheaper than autoplaying video.",
        "Every animated block respects `prefers-reduced-motion`, and marquees stop entirely with `motion-reduce:animate-none`.",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: "Test on a mid-range phone with network throttling, not only on your laptop. Landing page traffic from ads and social is mostly mobile.",
    },

    { type: "h2", text: "Metadata and SEO basics", id: "seo" },
    {
      type: "p",
      text: "Set `metadataBase` in the root layout, then give the home page a specific title, a description of 140 to 160 characters, a canonical URL and Open Graph data. Add an `opengraph-image.tsx` next to the page to generate the social image with `ImageResponse` from `next/og`.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/page.tsx",
      code: 'import type { Metadata } from "next"\n\nexport const metadata: Metadata = {\n  title: "Acme: revenue alerts for finance teams",\n  description: "Acme watches Stripe, your CRM and your warehouse, and tells finance what changed, why, and what to do next. Free for 14 days.",\n  alternates: { canonical: "/" },\n  openGraph: { type: "website", url: "/", siteName: "Acme", title: "Acme: revenue alerts for finance teams" },\n  twitter: { card: "summary_large_image" },\n}',
    },
    {
      type: "p",
      text: "Add structured data for the product as JSON-LD in the page. Escape `<` so the JSON can never close the script tag:",
    },
    {
      type: "code",
      lang: "tsx",
      code: 'const jsonLd = {\n  "@context": "https://schema.org",\n  "@type": "SoftwareApplication",\n  name: "Acme",\n  applicationCategory: "BusinessApplication",\n  operatingSystem: "Web",\n  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },\n}\n\n<script\n  type="application/ld+json"\n  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\\\u003c") }}\n/>',
    },
    {
      type: "list",
      items: [
        "One `h1` per page. `HeroSpotlight` renders it; every other block renders its title as an `h2`, which gives the page a clean outline.",
        "Add `app/sitemap.ts` and `app/robots.ts` so crawlers find the page and its siblings.",
        "Give the hero image real `alt` text that describes the product screen.",
        "Link to deeper pages (docs, pricing, use cases) with descriptive anchor text, not \"learn more\".",
      ],
    },

    { type: "h2", text: "Templates to start from", id: "templates" },
    {
      type: "p",
      text: "The [templates](/templates) page has complete landing pages built from these blocks. [Lumen](/templates/lumen) uses exactly the stack in this guide on the glass material. Open one next to your page and compare section spacing and headline length. If you want the page, the product behind it and the launch handled end to end, the [MiniDev studio](https://minidev.pro) builds complete products with this kit.",
    },

    { type: "h2", text: "Components used", id: "components" },
    {
      type: "p",
      text: "All free and MIT licensed. For a matching dark theme without a flash on load, see [dark mode in Next.js](/guides/nextjs-dark-mode-no-flash).",
    },
    { type: "component", name: "floating-nav" },
    { type: "component", name: "scroll-story" },
    { type: "component", name: "social-proof-wall" },
    { type: "component", name: "cta-band" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json",
    },
  ],
  faq: [
    {
      q: "What sections should a SaaS landing page have?",
      a: "Navigation, a hero with one clear action, a product section, how it works, social proof, pricing, an FAQ and a final call to action. Move social proof up if you have well-known customer logos.",
    },
    {
      q: "Can a Next.js page export metadata if it uses client components?",
      a: "Yes, as long as `page.tsx` itself is not marked `\"use client\"`. A server component page can render client blocks and still export `metadata` or `generateMetadata`.",
    },
    {
      q: "Are shadcn landing page blocks good for SEO?",
      a: "They can be. Client components still render to HTML on the server, so the copy is crawlable. What matters is one `h1`, a sensible heading outline, real alt text, fast LCP and proper metadata.",
    },
    {
      q: "Is there a free Next.js landing page template?",
      a: "Yes. MiniDev UI's templates, such as Lumen, are built entirely from free MIT blocks you can install with the shadcn CLI and edit in your own repo.",
    },
  ],
}

export default guide
