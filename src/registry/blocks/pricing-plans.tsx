"use client"
import * as React from "react"
import { CheckIcon, MinusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { NumberRoll } from "@/registry/ui/number-roll"
import { SegmentedControl } from "@/registry/ui/segmented-control"

/**
 * PricingPlans — a public pricing section: a monthly/yearly switch whose prices roll digit by digit, a featured plan in ink, and plain yes/no feature rows.
 *
 * Use on a marketing or /pricing page with two to four plans. Prices are numbers per month; the yearly figure is the
 * monthly-equivalent price and the "Billed $X yearly" line is derived. A price of 0 reads "Free". For an existing
 * customer's plan and invoices use BillingPage; for a premium animated variant use PricingMotion. Period is
 * uncontrolled by default; pass `period` + `onPeriodChange` to control it.
 *
 * @example
 * <PricingPlans
 *   plans={[{ name: "Team", blurb: "For finance teams", monthly: 49, yearly: 39, cta: "Start trial", featured: true, features: ["Unlimited workspaces"] }]}
 *   onSelect={(plan, period) => router.push(`/signup?plan=${plan}&period=${period}`)}
 * />
 */
type BillingPeriod = "monthly" | "yearly"

type Plan = {
  /** Plan name; also the React key, so keep it unique. */
  name: string
  /** One line on who the plan is for. */
  blurb: string
  /** Price per unit per month on monthly billing. 0 renders "Free". */
  monthly: number
  /** Monthly-equivalent price on yearly billing. */
  yearly: number
  /** Button label. */
  cta: string
  /** Render in ink with the "Most teams pick this" badge. Use on one plan at most. */
  featured?: boolean
  /** A string is an included feature; `{ label, included: false }` renders as not included. */
  features: (string | { label: string; included: false })[]
}

type PricingPlansProps = {
  /** Small mono label above the title. Empty string hides it. */
  eyebrow?: string
  /** Section heading (rendered as h2). */
  title?: React.ReactNode
  description?: React.ReactNode
  /** Plans in display order. Defaults to Lumen's Starter, Team and Scale. */
  plans?: Plan[]
  /** ISO 4217 code used to format prices, e.g. "USD", "EUR". */
  currency?: string
  /** Discount badge on the yearly option. */
  yearlyBadge?: string
  /** Called with the plan name and the selected period when a plan's button is pressed. */
  onSelect?: (plan: string, period: BillingPeriod) => void
  /** Controlled billing period. */
  period?: BillingPeriod
  /** Initial billing period when uncontrolled. */
  defaultPeriod?: BillingPeriod
  /** Called when the period switch changes. */
  onPeriodChange?: (period: BillingPeriod) => void
  /** Price suffix, e.g. "/ seat / mo" or "/ mo". */
  unit?: string
  /** Used in "Billed $X per seat yearly". Empty string drops it. */
  per?: string
  className?: string
}

const DEFAULT_PLANS: Plan[] = [
  { name: "Starter", blurb: "For a founder watching their own numbers.", monthly: 0, yearly: 0, cta: "Start free", features: ["1 workspace", "3 data sources", "Weekly digest", { label: "Ask Lumen", included: false }, { label: "Alerts", included: false }] },
  { name: "Team", blurb: "For finance and ops teams up to 25.", monthly: 49, yearly: 39, cta: "Start 14-day trial", featured: true, features: ["Unlimited workspaces", "All 40+ data sources", "Ask Lumen, unlimited", "Real-time alerts", "Slack and email delivery"] },
  { name: "Scale", blurb: "For companies with a security review.", monthly: 129, yearly: 99, cta: "Talk to sales", features: ["Everything in Team", "SSO, SCIM, audit log", "EU or US residency", "Dedicated analyst", "99.9% uptime SLA"] },
]

function PricingPlans({
  eyebrow = "Pricing",
  title = "Priced like a tool, not a hire.",
  description = "Per seat, per month. Change plans any time; we prorate to the day.",
  plans = DEFAULT_PLANS,
  currency = "USD",
  yearlyBadge = "-20%",
  onSelect,
  unit = "/ seat / mo",
  per = "per seat",
  period: periodProp,
  defaultPeriod = "yearly",
  onPeriodChange,
  className,
}: PricingPlansProps) {
  const [inner, setInner] = React.useState<BillingPeriod>(defaultPeriod)
  const period = periodProp ?? inner
  const setPeriod = (p: BillingPeriod) => {
    if (periodProp === undefined) setInner(p)
    onPeriodChange?.(p)
  }
  const titleId = React.useId()
  const fmt = { style: "currency", currency, maximumFractionDigits: 0 } as Intl.NumberFormatOptions
  return (
    <section data-slot="pricing-plans" aria-labelledby={titleId} className={cn("mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8", className)}>
      <div className="mx-auto max-w-2xl text-center">
        {eyebrow ? <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">{eyebrow}</p> : null}
        <h2 id={titleId} className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance text-fg sm:text-5xl">{title}</h2>
        {description ? <p className="mt-4 text-[1.0625rem] leading-[1.65] text-fg-muted">{description}</p> : null}
        <div className="mt-8 flex justify-center">
          <SegmentedControl
            aria-label="Billing period"
            value={period}
            onChange={(v) => setPeriod(v as BillingPeriod)}
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly", badge: yearlyBadge },
            ]}
          />
        </div>
      </div>
      <div className="mx-auto mt-12 grid max-w-6xl gap-4 lg:grid-cols-3 lg:items-stretch">
        {plans.map((p) => {
          const price = period === "yearly" ? p.yearly : p.monthly
          return (
            <article
              key={p.name}
              data-featured={p.featured || undefined}
              className={cn(
                "relative flex flex-col rounded-3xl p-7",
                p.featured
                  ? "bg-ink text-on-ink shadow-ink lg:-my-4 lg:py-11"
                  : "border border-border bg-surface text-fg shadow-raised"
              )}
            >
              {p.featured ? (
                <>
                  <span aria-hidden className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]" />
                  <span className="absolute top-6 right-6 rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-on-accent">Most teams pick this</span>
                </>
              ) : null}
              <h3 className="text-[15px] font-medium">{p.name}</h3>
              <p className={cn("mt-1 text-[13.5px] leading-[1.5]", p.featured ? "opacity-70" : "text-fg-muted")}>{p.blurb}</p>
              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="text-[52px] leading-[56px] font-medium tracking-[-0.045em] tabular-nums">
                  {price === 0 ? "Free" : <NumberRoll value={price} format={fmt} />}
                </span>
                {price > 0 ? <span className={cn("text-[13px]", p.featured ? "opacity-60" : "text-fg-subtle")}>{unit}</span> : null}
              </p>
              <p className={cn("mt-1 h-5 text-[12.5px]", p.featured ? "opacity-60" : "text-fg-subtle")}>
                {price > 0 && period === "yearly" ? (
                  <>
                    Billed <NumberRoll value={price * 12} format={fmt} /> {per} yearly
                  </>
                ) : price > 0 ? (
                  "Billed monthly, cancel any time"
                ) : (
                  "Free forever for one person"
                )}
              </p>
              <Button
                size="lg"
                variant={p.featured ? "accent" : "outline"}
                className="mt-7 w-full"
                onClick={() => onSelect?.(p.name, period)}
              >
                {p.cta}
              </Button>
              <ul aria-label={`${p.name} features`} className={cn("mt-7 space-y-3 border-t pt-7 text-[13.5px]", p.featured ? "border-on-ink/15" : "border-border")}>
                {p.features.map((f) => {
                  const inc = typeof f === "string"
                  const label = inc ? f : f.label
                  return (
                    <li key={label} className={cn("flex items-center gap-2.5", !inc && (p.featured ? "opacity-45" : "text-fg-subtle"))}>
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-full",
                          inc ? (p.featured ? "bg-accent text-on-accent" : "bg-accent-soft text-accent-fg") : "bg-fg/5"
                        )}
                      >
                        {inc ? <CheckIcon aria-hidden className="size-3" strokeWidth={3} /> : <MinusIcon aria-hidden className="size-3" />}
                      </span>
                      {label}
                      {!inc ? <span className="sr-only">(not included)</span> : null}
                    </li>
                  )
                })}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export { PricingPlans }
export type { PricingPlansProps, Plan, BillingPeriod }
