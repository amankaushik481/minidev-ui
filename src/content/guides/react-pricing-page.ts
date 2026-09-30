import type { Guide } from "../types"

const guide: Guide = {
  slug: "react-pricing-page",
  title: "Build a SaaS pricing page in React and Tailwind",
  description:
    "Build a React pricing page with Tailwind: plan data, a monthly and yearly toggle with animated prices, a featured plan, a comparison table, FAQ and a11y.",
  date: "2026-09-30",
  keywords: [
    "react pricing page",
    "tailwind pricing table",
    "monthly yearly toggle react",
    "saas pricing page component",
    "pricing cards tailwind",
  ],
  related: [
    "pricing-plans",
    "pricing-toggle",
    "pricing-table",
    "plan-card",
    "comparison-table",
    "plan-comparison",
    "number-roll",
    "segmented-control",
    "faq-section",
    "faq-list",
  ],
  body: [
    {
      type: "p",
      text: "A good SaaS pricing page in React is three to four plan cards driven by one data array, a monthly and yearly switch that changes the price in place, one visually featured plan, a comparison table for the details, and an FAQ that answers billing objections. With Tailwind CSS v4 and the free MiniDev UI blocks you can have all of it on screen in a few minutes, then spend your time on the numbers and the copy instead of the markup.",
    },
    {
      type: "p",
      text: "This guide builds the page from the real components: the [PricingPlans](/docs/pricing-plans) block, [PricingToggle](/docs/pricing-toggle), [NumberRoll](/docs/number-roll), [ComparisonTable](/docs/comparison-table) and [FaqSection](/docs/faq-section). Every prop shown below is the actual prop in the source you get when you install them.",
    },

    { type: "h2", text: "Install the pieces", id: "install" },
    {
      type: "p",
      text: "MiniDev UI is a shadcn-compatible registry, so each component is copied into `components/ui` in your project and you own the code. The `pricing-plans` block pulls in `button`, `number-roll` and `segmented-control` as registry dependencies.",
    },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/pricing-plans.json\nnpx shadcn@latest add https://ui.minidev.pro/r/comparison-table.json\nnpx shadcn@latest add https://ui.minidev.pro/r/faq-section.json",
    },
    {
      type: "p",
      text: "If you prefer a package, `npm i minidev-ui-kit` and import from `minidev-ui-kit/blocks/pricing-plans`. Either way, add the token stylesheet once (`@import \"minidev-ui-kit/styles.css\"` or a copy of [styles.css](https://ui.minidev.pro/r/styles.css)) so classes like `bg-ink` and `text-fg-muted` resolve. The rest of this guide assumes the copied files, imported from `@/components/ui/*`.",
    },

    { type: "h2", text: "Structure the plans as data", id: "plan-structure" },
    {
      type: "p",
      text: "Keep plans in one typed array and render everything from it. That way the cards, the comparison table and your checkout route all agree on names and prices. `PricingPlans` exports its `Plan` type:",
    },
    {
      type: "code",
      lang: "ts",
      filename: "lib/plans.ts",
      code: 'import type { Plan } from "@/components/ui/pricing-plans"\n\nexport const PLANS: Plan[] = [\n  {\n    name: "Hobby",\n    blurb: "For side projects and trying things out.",\n    monthly: 0,\n    yearly: 0,\n    cta: "Start free",\n    features: ["1 project", "Community support", { label: "Custom domains", included: false }],\n  },\n  {\n    name: "Pro",\n    blurb: "For small teams shipping every week.",\n    monthly: 24,\n    yearly: 19,\n    cta: "Start 14-day trial",\n    featured: true,\n    features: ["Unlimited projects", "Custom domains", "Email support", "Usage analytics"],\n  },\n  {\n    name: "Business",\n    blurb: "For companies with a security review.",\n    monthly: 79,\n    yearly: 64,\n    cta: "Talk to sales",\n    features: ["Everything in Pro", "SSO and audit log", "99.9% uptime SLA"],\n  },\n]',
    },
    {
      type: "p",
      text: "A few conventions that make the numbers read correctly:",
    },
    {
      type: "list",
      items: [
        "Store `yearly` as the **per month** price when billed yearly. The block shows it large and computes the annual total (`yearly * 12`) for the line underneath.",
        "A price of `0` renders the word **Free** and swaps the billing line for \"Free forever for one person\", so edit that string in your copy of the file if your free tier is different.",
        "Excluded features are objects: `{ label, included: false }`. They render with a minus icon, muted text and a visually hidden \"(not included)\" so screen readers do not read them as perks.",
        "Three plans is the default grid (`lg:grid-cols-3`). Four works if you change that class; five or more belongs in a comparison table instead.",
      ],
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/pricing/page.tsx",
      code: 'import { PricingPlans } from "@/components/ui/pricing-plans"\nimport { PLANS } from "@/lib/plans"\n\nexport default function PricingPage() {\n  return (\n    <PricingPlans\n      title="Simple pricing that scales with you."\n      description="Per seat, per month. Change plans any time."\n      plans={PLANS}\n      currency="USD"\n      yearlyBadge="-20%"\n      unit="/ seat / mo"\n      per="per seat"\n    />\n  )\n}',
    },
    {
      type: "callout",
      tone: "note",
      text: "`PricingPlans` is a client component because it holds the billing period in state. Your `page.tsx` can stay a server component and export `metadata`; it only passes plain data down.",
    },

    { type: "h2", text: "The monthly and yearly toggle", id: "monthly-yearly-toggle" },
    {
      type: "p",
      text: "The switch inside `PricingPlans` is a [SegmentedControl](/docs/segmented-control) with `role=\"radiogroup\"`, a roving tab index and arrow key, Home and End support. The yearly option carries a `badge`, which is where the `yearlyBadge` prop ends up. The block defaults to yearly, since that is usually the option you want people to see first.",
    },
    {
      type: "p",
      text: "If you are composing your own layout, [PricingToggle](/docs/pricing-toggle) is the same control as a standalone piece with a controlled `value` and `onChange` typed as `\"monthly\" | \"yearly\"`:",
    },
    {
      type: "code",
      lang: "tsx",
      code: '"use client"\nimport * as React from "react"\nimport { PricingToggle } from "@/components/ui/pricing-toggle"\n\nexport function BillingSwitch() {\n  const [period, setPeriod] = React.useState<"monthly" | "yearly">("yearly")\n  return <PricingToggle value={period} onChange={setPeriod} />\n}',
    },
    {
      type: "p",
      text: "`PricingToggle` prints a \"Save 20% with yearly\" hint under the control. Compute that figure from your plans rather than hard coding it, so the hint stays true when prices change: `Math.round((1 - pro.yearly / pro.monthly) * 100)`.",
    },

    { type: "h3", text: "Animate the price without hurting readability" },
    {
      type: "p",
      text: "When the period changes, the price should change in place so the eye can compare. [NumberRoll](/docs/number-roll) is an odometer: each digit is a strip of 0 to 9 that springs to its new position, and only the digits that changed move. It takes standard `Intl.NumberFormat` options, so currency, grouping and decimals come from the platform rather than string concatenation.",
    },
    {
      type: "code",
      lang: "tsx",
      code: 'import { NumberRoll } from "@/components/ui/number-roll"\n\nconst fmt = { style: "currency", currency: "USD", maximumFractionDigits: 0 } as Intl.NumberFormatOptions\n\n<span className="text-5xl font-medium tabular-nums">\n  <NumberRoll value={period === "yearly" ? plan.yearly : plan.monthly} format={fmt} />\n</span>',
    },
    {
      type: "p",
      text: "Two details matter here. The animated digits are `aria-hidden` and the formatted value is rendered once in an `sr-only` span, so assistive technology hears \"$19\", not a column of digits. And the animation reads `useReducedMotion()` from Motion, so users who ask for less motion get an instant swap. Use `tabular-nums` (NumberRoll already sets it) so a price going from 19 to 24 does not shift the layout.",
    },

    { type: "h2", text: "Highlight one plan", id: "highlight-a-plan" },
    {
      type: "p",
      text: "Set `featured: true` on exactly one plan. In `PricingPlans` the featured card switches to the ink surface (`bg-ink text-on-ink shadow-ink`), gets a thin accent line along its top edge, extends slightly above and below its neighbors on large screens (`lg:-my-4 lg:py-11`), shows a \"Most teams pick this\" pill and uses the accent button variant. Change the pill text in your copy of the file to something specific to your product.",
    },
    {
      type: "list",
      items: [
        "Feature the plan most customers should buy, not the most expensive one. Buyers read the featured card as a recommendation.",
        "Do not rely on color alone. The pill text and the larger card carry the meaning for people who cannot see the contrast difference.",
        "Keep the CTA verbs different per plan (\"Start free\", \"Start 14-day trial\", \"Talk to sales\") so each button says what happens next.",
      ],
    },
    {
      type: "p",
      text: "For a denser grid, for example inside account settings, [PricingTable](/docs/pricing-table) renders [PlanCard](/docs/plan-card) items. Each card takes a preformatted `price` string, a `period`, `features`, `cta`, `onCta` and a `highlighted` flag that adds an accent border.",
    },
    {
      type: "code",
      lang: "tsx",
      code: 'import { PricingTable } from "@/components/ui/pricing-table"\n\n<PricingTable\n  plans={[\n    { name: "Hobby", price: "$0", features: ["1 project"], cta: "Current plan" },\n    { name: "Pro", price: "$24", features: ["Unlimited projects", "Custom domains"], highlighted: true, onCta: () => upgrade("pro") },\n    { name: "Business", price: "$79", features: ["SSO", "Audit log"], cta: "Contact sales" },\n  ]}\n/>',
    },
    { type: "component", name: "pricing-plans" },

    { type: "h2", text: "Add a comparison table", id: "comparison-table" },
    {
      type: "p",
      text: "Cards should list the five or six features that decide the purchase. Everything else goes in a comparison table below them. [ComparisonTable](/docs/comparison-table) takes a list of `features` and, per plan, a `values` array aligned by index. A boolean renders a check or a minus icon; a string renders as text, which is what you want for limits.",
    },
    {
      type: "code",
      lang: "tsx",
      code: 'import { ComparisonTable } from "@/components/ui/comparison-table"\n\n<ComparisonTable\n  features={["Projects", "Team members", "Custom domains", "SSO", "Support"]}\n  plans={[\n    { name: "Hobby", values: ["1", "1", false, false, "Community"] },\n    { name: "Pro", values: ["Unlimited", "10", true, false, "Email"] },\n    { name: "Business", values: ["Unlimited", "Unlimited", true, true, "Priority"] },\n  ]}\n/>',
    },
    {
      type: "p",
      text: "The table scrolls horizontally inside its rounded frame on narrow screens, which keeps the page itself from overflowing. Lucide icons are hidden from screen readers by default, so give the boolean cells a text alternative. Because the component lives in your repo, it is a two-line change in the cell renderer:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "components/ui/comparison-table.tsx",
      code: '{typeof v === "boolean" ? (\n  <>\n    {v ? <CheckIcon className="size-4 text-success" /> : <MinusIcon className="size-4 text-fg-subtle" />}\n    <span className="sr-only">{v ? "Included" : "Not included"}</span>\n  </>\n) : v}',
    },
    {
      type: "p",
      text: "[PlanComparison](/docs/plan-comparison) is a smaller, fixed two-column Free versus Pro table. It is a good starting point to edit when you only sell one paid tier.",
    },

    { type: "h2", text: "Answer billing questions in an FAQ", id: "pricing-faq" },
    {
      type: "p",
      text: "Pricing FAQs exist to remove the last reasons not to click. Cover trials, what happens when a trial ends, proration, refunds, taxes and invoices, discounts, and data ownership. [FaqSection](/docs/faq-section) is a two-column block with a heading and an accordion; answers accept React nodes, so links work.",
    },
    {
      type: "code",
      lang: "tsx",
      code: 'import { FaqSection } from "@/components/ui/faq-section"\n\n<FaqSection\n  title="Billing questions"\n  description="Anything else? Email billing@yourapp.com."\n  items={[\n    { q: "What happens after the trial?", a: "You choose a plan or stay on Hobby. We never charge without asking." },\n    { q: "Can I switch plans later?", a: "Yes. Upgrades apply immediately and are prorated to the day." },\n    { q: "Do you offer invoices?", a: <>Yes, on every paid plan. See <a href="/help/billing">billing help</a>.</> },\n  ]}\n/>',
    },
    {
      type: "p",
      text: "Each question is a real `button` inside an `h3` with `aria-expanded` and `aria-controls`, answers are `role=\"region\"` labelled by their question, one item is open at a time, and Up and Down arrows move focus between questions. The answer opens by animating `grid-template-rows` from `0fr` to `1fr`, so there is no height measuring and no layout jump. For a plain list without the heading column, use [FaqList](/docs/faq-list), which takes `items` of `{ q, a }` strings.",
    },

    { type: "h2", text: "Connect the buttons to checkout", id: "checkout" },
    {
      type: "p",
      text: "`PricingPlans` calls `onSelect(planName, period)` when a plan button is pressed. Because it is a function prop, wire it from a small client wrapper and route to your checkout with both values:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/pricing/plans-client.tsx",
      code: '"use client"\nimport { useRouter } from "next/navigation"\nimport { PricingPlans } from "@/components/ui/pricing-plans"\nimport { PLANS } from "@/lib/plans"\n\nexport function PlansClient() {\n  const router = useRouter()\n  return (\n    <PricingPlans\n      plans={PLANS}\n      onSelect={(plan, period) => {\n        const q = new URLSearchParams({ plan: plan.toLowerCase(), period })\n        router.push("/checkout?" + q.toString())\n      }}\n    />\n  )\n}',
    },
    {
      type: "callout",
      tone: "warning",
      text: "Never trust the price from the client. The checkout route should look up the plan and period on the server and create the payment session from your own price IDs.",
    },

    { type: "h2", text: "Accessibility checklist", id: "accessibility" },
    {
      type: "list",
      items: [
        "The billing switch is a labelled radiogroup (`aria-label=\"Billing period\"`), operable with arrow keys, with a visible focus ring.",
        "Prices are announced once as formatted text; the animated digits are hidden from assistive technology.",
        "Motion respects `prefers-reduced-motion` in the price roll and the switch thumb.",
        "Excluded features say \"not included\" to screen readers, not only with an icon.",
        "Every CTA is a real button with a distinct label. Avoid three buttons that all say \"Get started\".",
        "Check contrast of muted text on the ink card in both themes. The tokens are tuned for it, but custom accent colors can break it.",
        "The page has one `h1`. The block renders its title as an `h2`, so put a page heading above it or pass the pricing title as the page `h1` in your own wrapper.",
      ],
    },

    { type: "h2", text: "Components used in this guide", id: "components" },
    {
      type: "p",
      text: "Everything here is free and MIT licensed. The full Lumen template at [/templates/lumen](/templates/lumen) shows `PricingPlans` and `FaqSection` in a complete landing page, and the [landing page guide](/guides/nextjs-landing-page) covers where pricing sits in that flow. If you would rather hand off the whole product, the [MiniDev studio](https://minidev.pro) builds complete SaaS products with this kit.",
    },
    { type: "component", name: "pricing-toggle" },
    { type: "component", name: "number-roll" },
    { type: "component", name: "comparison-table" },
    { type: "component", name: "faq-section" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json",
    },
  ],
  faq: [
    {
      q: "How do I make a monthly and yearly pricing toggle in React?",
      a: "Hold the period in state as `\"monthly\" | \"yearly\"`, render a radiogroup such as `PricingToggle` or `SegmentedControl` to change it, and derive each displayed price from that state. Store both prices on each plan so nothing is recalculated from a discount percentage.",
    },
    {
      q: "Should the yearly price show the monthly equivalent or the annual total?",
      a: "Show the monthly equivalent large, since that is what people compare, and the annual total in a smaller line underneath. `PricingPlans` does both: it displays `yearly` and writes \"Billed $X yearly\" using `yearly * 12`.",
    },
    {
      q: "How many plans should a SaaS pricing page have?",
      a: "Three is the common default: a free or entry plan, the plan you want most people on, and a plan for larger companies. Put extra detail in a comparison table instead of adding more cards.",
    },
    {
      q: "Is the MiniDev pricing block free to use in commercial projects?",
      a: "Yes. MiniDev UI is MIT licensed, and the shadcn install copies the source into your project so you can change anything.",
    },
  ],
}

export default guide
