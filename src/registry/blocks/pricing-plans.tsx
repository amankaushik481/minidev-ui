"use client"
import * as React from "react"
import { CheckIcon, MinusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { NumberRoll } from "@/registry/ui/number-roll"
import { SegmentedControl } from "@/registry/ui/segmented-control"

/*
 * PricingPlans: plans with a period switch whose prices roll to the new
 * number, a featured plan in ink with a lit top edge, and feature rows that
 * say yes or no plainly. Seats slider optional.
 */

type Plan = {
  name: string
  blurb: string
  monthly: number
  yearly: number
  cta: string
  featured?: boolean
  features: (string | { label: string; included: false })[]
}

type PricingPlansProps = {
  eyebrow?: string
  title?: React.ReactNode
  description?: React.ReactNode
  plans?: Plan[]
  currency?: string
  /** Discount badge on the yearly option. */
  yearlyBadge?: string
  onSelect?: (plan: string, period: "monthly" | "yearly") => void
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
  className,
}: PricingPlansProps) {
  const [period, setPeriod] = React.useState<"monthly" | "yearly">("yearly")
  const fmt = { style: "currency", currency, maximumFractionDigits: 0 } as Intl.NumberFormatOptions
  return (
    <section data-slot="pricing-plans" className={cn("mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8", className)}>
      <div className="mx-auto max-w-2xl text-center">
        {eyebrow ? <p className="font-mono text-[11px] tracking-[0.08em] text-accent-fg uppercase">{eyebrow}</p> : null}
        <h2 className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance text-fg sm:text-5xl">{title}</h2>
        {description ? <p className="mt-4 text-[1.0625rem] leading-[1.65] text-fg-muted">{description}</p> : null}
        <div className="mt-8 flex justify-center">
          <SegmentedControl
            aria-label="Billing period"
            value={period}
            onChange={(v) => setPeriod(v as "monthly" | "yearly")}
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
                <span className="text-[52px] leading-[56px] font-medium tracking-[-0.045em]">
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
              <ul className={cn("mt-7 space-y-3 border-t pt-7 text-[13.5px]", p.featured ? "border-on-ink/15" : "border-border")}>
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
                        {inc ? <CheckIcon className="size-3" strokeWidth={3} /> : <MinusIcon className="size-3" />}
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
export type { PricingPlansProps, Plan }
