import type { Guide } from "../types"

const guide: Guide = {
  slug: "nextjs-billing-page-stripe",
  title: "Build a billing page in Next.js with Stripe",
  description:
    "Build a SaaS billing page in Next.js with Stripe: plans, usage, invoices, payment methods and cancellation, loaded on the server and kept in sync by webhooks.",
  date: "2026-09-30",
  keywords: [
    "stripe billing page nextjs",
    "saas billing ui",
    "stripe customer portal alternative",
    "nextjs stripe subscription",
    "react billing page",
  ],
  related: [
    "billing-page",
    "plan-card",
    "usage-meter",
    "invoice-list",
    "payment-method-card",
    "credit-balance",
    "cancel-flow",
    "downgrade-warning",
  ],
  body: [
    {
      type: "p",
      text: "A billing page in Next.js with Stripe is a server component that reads the customer's subscription from your database, fetches invoices and payment methods with the Stripe Node SDK, and renders them with a few presentational components. Plan changes go through Stripe Checkout or a subscription update in a server action, card updates can hand off to the Stripe Customer Portal, and webhooks keep your database in step with Stripe. MiniDev UI provides the billing components as free, shadcn-compatible React files, so the work left is the data wiring this guide covers.",
    },

    { type: "h2", text: "What a billing page has to answer", id: "what-to-show" },
    {
      type: "p",
      text: "People open the billing page with a question, usually one of these. Design the page so each answer is visible without clicking:",
    },
    {
      type: "list",
      items: [
        "**What am I paying for, and when is the next charge?** Current plan, price, and renewal or cancellation date.",
        "**How close am I to my limits?** Seats, projects, API calls or credits, against the plan's allowance.",
        "**Which card is on file?** Brand, last four digits, expiry, and a way to change it.",
        "**What did I pay?** A list of invoices with status and a link to the PDF.",
        "**How do I change or cancel?** Upgrade, downgrade and cancel, each with its consequences stated up front.",
      ],
    },

    { type: "h2", text: "Customer Portal or your own page", id: "portal-vs-custom" },
    {
      type: "p",
      text: "Stripe's hosted [Customer Portal](https://docs.stripe.com/customer-management) already handles card updates, invoice history, plan switching and cancellation, including authentication challenges on card changes. It is the fastest route and a fine default. A custom page is worth it when billing should look like the rest of your product, when usage and entitlements live in your database, or when you want a considered cancel flow. The practical answer for most SaaS apps is a hybrid:",
    },
    {
      type: "table",
      head: ["Task", "Custom page", "Hand off to Stripe"],
      rows: [
        ["Show plan, usage, credits", "Yes, from your database", "No"],
        ["List invoices", "Yes, `stripe.invoices.list`", "PDF and hosted invoice links"],
        ["New subscription", "Plan cards", "Checkout Session"],
        ["Change plan", "Server action with `subscriptions.update`", "Optional"],
        ["Update card", "Show the current card", "Portal session with `payment_method_update` flow"],
        ["Cancel", "Your cancel flow", "Optional portal `subscription_cancel` flow"],
      ],
    },

    { type: "h2", text: "Install the components", id: "install" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/plan-card.json https://ui.minidev.pro/r/usage-meter.json https://ui.minidev.pro/r/invoice-list.json\nnpx shadcn@latest add https://ui.minidev.pro/r/payment-method-card.json https://ui.minidev.pro/r/credit-balance.json https://ui.minidev.pro/r/cancel-flow.json https://ui.minidev.pro/r/downgrade-warning.json\nnpm i stripe",
    },
    {
      type: "p",
      text: "Add the [token stylesheet](https://ui.minidev.pro/r/styles.css) once so classes like `bg-surface` and `text-fg-muted` resolve. Know what you are installing: [PlanCard](/docs/plan-card), [UsageMeter](/docs/usage-meter), [InvoiceList](/docs/invoice-list), [PaymentMethodCard](/docs/payment-method-card) and [CreditBalance](/docs/credit-balance) take data as props. [CancelFlow](/docs/cancel-flow) and [DowngradeWarning](/docs/downgrade-warning) are designed layouts with sample copy and unwired buttons, and the [BillingPage](/docs/billing-page) block takes no props at all. The registry copies source into your project, so you edit those files to add your text and handlers.",
    },
    { type: "component", name: "billing-page" },

    { type: "h2", text: "Stripe is the source of truth, your database is the cache", id: "data-model" },
    {
      type: "p",
      text: "Do not call Stripe on every request to decide what a user may do. Store the few fields your app checks (subscription id, status, price id, period end, `cancel_at_period_end`) on the account row, write them from webhooks, and read them like any other data. Keep the Stripe client in a server-only module so the secret key can never be bundled for the browser:",
    },
    {
      type: "code",
      lang: "ts",
      filename: "lib/stripe.ts",
      code: 'import "server-only"\nimport Stripe from "stripe"\n\nexport const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)\n\nexport async function syncSubscription(customerId: string) {\n  const { data } = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 1 })\n  const sub = data[0]\n  const item = sub?.items.data[0]\n  await db.account.update({\n    where: { stripeCustomerId: customerId },\n    data: sub\n      ? {\n          subscriptionId: sub.id,\n          status: sub.status,\n          priceId: item?.price.id ?? null,\n          periodEnd: item ? new Date(item.current_period_end * 1000) : null,\n          cancelAtPeriodEnd: sub.cancel_at_period_end,\n        }\n      : { subscriptionId: null, status: "none", priceId: null, periodEnd: null, cancelAtPeriodEnd: false },\n  })\n}',
    },
    {
      type: "p",
      text: "Pin an API version in the Stripe Dashboard and upgrade deliberately. On recent API versions the billing period fields (`current_period_start`, `current_period_end`) live on each subscription item rather than on the subscription, which is why the code reads them from `items.data[0]`.",
    },

    { type: "h2", text: "Webhooks keep state in sync", id: "webhooks" },
    {
      type: "p",
      text: "A route handler receives events, verifies the signature against the raw body, and re-syncs the customer. Re-fetching the subscription instead of trusting the event payload makes the handler safe against events that arrive out of order or more than once.",
    },
    {
      type: "code",
      lang: "ts",
      filename: "app/api/stripe/webhook/route.ts",
      code: 'import type Stripe from "stripe"\nimport { stripe, syncSubscription } from "@/lib/stripe"\n\nconst RELEVANT = new Set<string>([\n  "checkout.session.completed",\n  "customer.subscription.created",\n  "customer.subscription.updated",\n  "customer.subscription.deleted",\n  "invoice.paid",\n  "invoice.payment_failed",\n])\n\nexport async function POST(req: Request) {\n  const body = await req.text()\n  const signature = req.headers.get("stripe-signature")\n  if (!signature) return new Response("Missing signature", { status: 400 })\n\n  let event: Stripe.Event\n  try {\n    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)\n  } catch {\n    return new Response("Invalid signature", { status: 400 })\n  }\n\n  if (RELEVANT.has(event.type)) {\n    const obj = event.data.object as { customer?: string | { id: string } | null }\n    const customerId = typeof obj.customer === "string" ? obj.customer : obj.customer?.id\n    if (customerId) await syncSubscription(customerId)\n  }\n  return new Response(null, { status: 200 })\n}',
    },
    {
      type: "callout",
      tone: "warning",
      text: "Read the body with `req.text()` and pass that exact string to `constructEvent`. Parsing JSON first changes the bytes and every signature check fails. Return a 2xx quickly; Stripe retries failed deliveries, so slow work belongs in a queue. Locally, `stripe listen --forward-to localhost:3000/api/stripe/webhook` prints a signing secret for testing.",
    },

    { type: "h2", text: "Load billing data on the server", id: "server-data" },
    {
      type: "p",
      text: "The page is an async server component. Plan state and usage come from your database; invoices, cards and the credit balance come from Stripe in parallel. Map everything to the plain strings the components expect before it crosses into client components.",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(app)/billing/page.tsx",
      code: 'import { stripe } from "@/lib/stripe"\nimport { UsageMeter } from "@/components/ui/usage-meter"\nimport { InvoiceList } from "@/components/ui/invoice-list"\nimport { PaymentMethodCard } from "@/components/ui/payment-method-card"\nimport { CreditBalance } from "@/components/ui/credit-balance"\nimport { PlanGrid } from "./plan-grid"\n\nconst date = (s: number) => new Date(s * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })\nconst money = (cents: number, currency: string) =>\n  new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100)\n\nexport default async function BillingRoute() {\n  const account = await requireAccount()\n  const customer = account.stripeCustomerId\n  const [usage, invoices, cards, stripeCustomer] = await Promise.all([\n    getUsage(account.id),\n    stripe.invoices.list({ customer, limit: 12 }),\n    stripe.paymentMethods.list({ customer, type: "card" }),\n    stripe.customers.retrieve(customer),\n  ])\n\n  const rows = invoices.data\n    .filter((i) => i.status !== "draft")\n    .map((i) => ({\n      id: i.number ?? i.id,\n      date: date(i.created),\n      amount: money(i.total, i.currency),\n      status: i.status === "paid" ? ("paid" as const) : i.status === "void" ? ("void" as const) : ("open" as const),\n    }))\n  const card = cards.data[0]?.card\n  const credit = stripeCustomer.deleted ? 0 : -stripeCustomer.balance\n  const currency = stripeCustomer.deleted ? "usd" : stripeCustomer.currency ?? "usd"\n\n  return (\n    <div className="space-y-8">\n      <PlanGrid currentPriceId={account.priceId} />\n      <div className="grid gap-4 rounded-xl border border-border bg-surface p-4 sm:grid-cols-2">\n        <UsageMeter label="Seats" used={usage.seats} limit={usage.seatLimit} />\n        <UsageMeter label="Projects" used={usage.projects} limit={usage.projectLimit} />\n      </div>\n      {credit > 0 ? <CreditBalance label="Account credit" balance={money(credit, currency)} /> : null}\n      {card ? (\n        <PaymentMethodCard\n          brand={card.brand.charAt(0).toUpperCase() + card.brand.slice(1)}\n          last4={card.last4}\n          exp={String(card.exp_month).padStart(2, "0") + "/" + String(card.exp_year).slice(-2)}\n        />\n      ) : null}\n      <InvoiceList items={rows} />\n    </div>\n  )\n}',
    },
    {
      type: "list",
      items: [
        "Stripe amounts are integers in the smallest currency unit. Dividing by 100 is right for USD and EUR but not for zero-decimal currencies such as JPY, so use a helper that knows the difference if you bill in several currencies.",
        "A negative `customer.balance` is credit that Stripe applies to the next invoice. Flip the sign before showing it in `CreditBalance`.",
        "`InvoiceList` accepts three statuses: `paid`, `open` and `void`. Map `uncollectible` to `open` (it renders with the warning tone) and skip drafts, which customers should not see.",
        "`InvoiceList` renders the invoice number as plain text. Edit your copy to wrap it in a link to `hosted_invoice_url` or `invoice_pdf`, which Stripe returns on each invoice.",
        "`UsageMeter` shows the raw `used/limit` numbers and caps the bar at 100%. Show an over-limit state yourself if you allow overage.",
      ],
    },

    { type: "h2", text: "Plans and upgrades", id: "change-plan" },
    {
      type: "p",
      text: "A customer without a subscription goes to Checkout. A customer with one gets their existing subscription updated; creating a second subscription is the classic double-billing bug. Both paths live in one server action. Server action arguments come from the client, so check the price id against your own list:",
    },
    {
      type: "code",
      lang: "ts",
      filename: "app/(app)/billing/actions.ts",
      code: '"use server"\nimport { redirect } from "next/navigation"\nimport { revalidatePath } from "next/cache"\nimport { stripe, syncSubscription } from "@/lib/stripe"\nimport { PLANS } from "@/lib/plans"\n\nexport async function changePlan(priceId: string) {\n  const account = await requireAccount()\n  if (!PLANS.some((p) => p.priceId === priceId)) throw new Error("Unknown plan")\n\n  if (!account.subscriptionId || account.status === "canceled") {\n    const session = await stripe.checkout.sessions.create({\n      mode: "subscription",\n      customer: account.stripeCustomerId,\n      line_items: [{ price: priceId, quantity: 1 }],\n      success_url: process.env.APP_URL + "/billing?checkout=success",\n      cancel_url: process.env.APP_URL + "/billing",\n    })\n    redirect(session.url!)\n  }\n\n  const sub = await stripe.subscriptions.retrieve(account.subscriptionId)\n  await stripe.subscriptions.update(sub.id, {\n    items: [{ id: sub.items.data[0].id, price: priceId }],\n    proration_behavior: "create_prorations",\n  })\n  await syncSubscription(account.stripeCustomerId)\n  revalidatePath("/billing")\n}',
    },
    {
      type: "p",
      text: "`PlanCard` is a client component with an `onCta` callback, so render the grid from a small client wrapper and call the action inside a transition. The card has no `disabled` prop, so guard the current plan in the handler and say so in the `cta` text:",
    },
    {
      type: "code",
      lang: "tsx",
      filename: "app/(app)/billing/plan-grid.tsx",
      code: '"use client"\nimport { useTransition } from "react"\nimport { PlanCard } from "@/components/ui/plan-card"\nimport { PLANS } from "@/lib/plans"\nimport { changePlan } from "./actions"\n\nexport function PlanGrid({ currentPriceId }: { currentPriceId: string | null }) {\n  const [pending, startTransition] = useTransition()\n  return (\n    <div className="grid gap-4 lg:grid-cols-3" aria-busy={pending}>\n      {PLANS.map((p) => {\n        const current = p.priceId === currentPriceId\n        return (\n          <PlanCard\n            key={p.priceId}\n            name={p.name}\n            price={p.price}\n            features={p.features}\n            highlighted={current}\n            cta={current ? "Current plan" : "Switch to " + p.name}\n            onCta={() => {\n              if (current || pending) return\n              startTransition(() => changePlan(p.priceId))\n            }}\n          />\n        )\n      })}\n    </div>\n  )\n}',
    },
    {
      type: "p",
      text: "Downgrades deserve a pause. Show [DowngradeWarning](/docs/downgrade-warning) first, rewritten in your copy to name what the customer will lose with real numbers (\"You have 18 seats; Free includes 3\"). If a downgrade should take effect at renewal rather than immediately, use a subscription schedule, or set `proration_behavior: \"none\"` when you do not want to credit the unused time. The [pricing page guide](/guides/react-pricing-page) covers the public plan grid that feeds the same `PLANS` list.",
    },

    { type: "h2", text: "Card updates through the Customer Portal", id: "payment-methods" },
    {
      type: "p",
      text: "Collecting card details yourself means Stripe Elements, SetupIntents and authentication challenges. A portal session with a flow skips all of it: the customer lands directly on the update-card screen and returns to your page when done.",
    },
    {
      type: "code",
      lang: "ts",
      code: 'export async function updateCard() {\n  const account = await requireAccount()\n  const session = await stripe.billingPortal.sessions.create({\n    customer: account.stripeCustomerId,\n    return_url: process.env.APP_URL + "/billing",\n    flow_data: { type: "payment_method_update" },\n  })\n  redirect(session.url)\n}',
    },
    {
      type: "p",
      text: "`PaymentMethodCard` renders an Edit button with no handler, so add an `action` or `onEdit` prop to your copy, or wrap the card in `<form action={updateCard}>` and change the button to `type=\"submit\"`. Enable the payment method update feature in the portal settings in the Stripe Dashboard first.",
    },

    { type: "h2", text: "A cancel flow that keeps trust", id: "cancel" },
    {
      type: "p",
      text: "[CancelFlow](/docs/cancel-flow) is two steps: a reason, then a confirmation that states what happens and when. Wire the reason radios to Stripe's `cancellation_details.feedback` values and cancel at the period end, so the customer keeps what they paid for:",
    },
    {
      type: "code",
      lang: "ts",
      code: 'type Feedback = "too_expensive" | "unused" | "switched_service" | "missing_features" | "other"\n\nexport async function cancelSubscription(feedback: Feedback, comment?: string) {\n  const account = await requireAccount()\n  await stripe.subscriptions.update(account.subscriptionId!, {\n    cancel_at_period_end: true,\n    cancellation_details: { feedback, comment },\n  })\n  await syncSubscription(account.stripeCustomerId)\n  revalidatePath("/billing")\n}\n\nexport async function resumeSubscription() {\n  const account = await requireAccount()\n  await stripe.subscriptions.update(account.subscriptionId!, { cancel_at_period_end: false })\n  await syncSubscription(account.stripeCustomerId)\n  revalidatePath("/billing")\n}',
    },
    {
      type: "list",
      items: [
        "Put the cancel entry point on the billing page where people look for it, and make it as easy as upgrading. Hidden or multi-screen cancellation generates chargebacks and support tickets.",
        "After canceling, show \"Your plan ends on Oct 31\" with a Resume button that calls `resumeSubscription`. A [Banner](/docs/banner) at the top of the app works well for this.",
        "One optional offer (a pause or a discount) is fine. A maze of offers is not.",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      text: "Confirm the result with a toast after the action returns, and show errors inline next to the button that failed. The [toast notifications guide](/guides/nextjs-toast-notifications) covers the pattern for server actions.",
    },

    { type: "h2", text: "Components used", id: "components" },
    {
      type: "p",
      text: "Everything here is free under MIT and lives in the [billing category](/components/billing): billing-page, plan-card, usage-meter, invoice-list, payment-method-card, credit-balance, cancel-flow and downgrade-warning. For the page around them, the [SaaS dashboard guide](/guides/nextjs-saas-dashboard) covers the app shell and the [settings page guide](/guides/saas-settings-page) covers account and team settings. If you would rather have the whole billing system built and tested, the [MiniDev studio](https://minidev.pro) builds complete products on this kit.",
    },
    { type: "component", name: "plan-card" },
    { type: "component", name: "invoice-list" },
    { type: "component", name: "cancel-flow" },
    {
      type: "code",
      lang: "bash",
      code: "npx shadcn@latest add https://ui.minidev.pro/r/<name>.json",
    },
  ],
  faq: [
    {
      q: "Should I use the Stripe Customer Portal or build my own billing page?",
      a: "Start with the portal if you need billing working this week. Build your own page when billing should match your product or show usage from your database, and keep handing sensitive steps such as card updates to a portal session with `flow_data`.",
    },
    {
      q: "Where should a Next.js app call the Stripe API?",
      a: "Only on the server: in server components, server actions and route handlers, through a module marked `server-only` that holds the secret key. Client components receive plain props and call server actions.",
    },
    {
      q: "Do I still need webhooks if I update the subscription in a server action?",
      a: "Yes. Renewals, failed payments, portal changes and Checkout completions happen outside your action. Webhooks are the only reliable way to hear about them, and a re-sync on each event keeps your database correct.",
    },
    {
      q: "How do I show the next billing date with the latest Stripe API?",
      a: "Read `current_period_end` from the subscription item (`subscription.items.data[0].current_period_end`) on recent API versions, store it as a date when you sync, and render it from your database.",
    },
  ],
}

export default guide
