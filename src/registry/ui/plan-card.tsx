"use client"
import * as React from "react"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * PlanCard — a pricing tier with price per period, feature list and a call to action; highlighted tiers get the accent ring.
 *
 * Lay several side by side for a pricing page; mark the recommended one `highlighted`
 * and give it a `badge`. Prices are preformatted strings. For a full feature matrix
 * use PlanComparison, for a monthly/yearly switch use PricingToggle.
 *
 * @example
 * <PlanCard name="Pro" price="$49" period="mo" features={["10 seats", "Bank sync"]} highlighted badge="Most popular" onCta={() => checkout("pro")} />
 */

// The Lumen Pro tier.
const SAMPLE_FEATURES = ["Unlimited invoices", "Up to 10 seats", "Bank sync and reconciliation", "Priority support"]

type PlanCardProps = {
  /** Tier name. */
  name?: string
  /** Preformatted price, e.g. "$49". */
  price?: string
  /** Billing period after the slash, e.g. "mo" or "yr". */
  period?: string
  /** What the tier includes, one line each. */
  features?: string[]
  /** Button label. */
  cta?: string
  /** Recommended tier: accent ring and a solid button. */
  highlighted?: boolean
  /** Small label beside the name, e.g. "Most popular". */
  badge?: string
  className?: string
  /** Called by the button. */
  onCta?: () => void
}

function PlanCard({ name = "Pro", price = "$49", period = "mo", features = SAMPLE_FEATURES, cta = "Choose plan", highlighted, badge, className, onCta }: PlanCardProps) {
  const headingId = React.useId()
  return (
    <section
      data-slot="plan-card"
      data-highlighted={highlighted || undefined}
      aria-labelledby={headingId}
      className={cn(
        "flex flex-col rounded-xl border border-border bg-surface p-5 shadow-highlight",
        highlighted && "border-accent ring-1 ring-accent",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 id={headingId} className="text-sm font-medium text-fg">{name}</h3>
        {badge ? <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent-fg">{badge}</span> : null}
      </div>
      <p className="mt-3 text-3xl font-medium tracking-[-0.022em] tabular-nums text-fg">
        {price}
        <span className="text-sm font-normal tracking-normal text-fg-muted">
          <span aria-hidden>/</span>
          <span className="sr-only"> per </span>
          {period}
        </span>
      </p>
      <ul className="mt-4 flex-1 space-y-2 text-sm text-fg-muted">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <CheckIcon aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
            {f}
          </li>
        ))}
      </ul>
      <Button className="mt-6 w-full" variant={highlighted ? "default" : "outline"} onClick={onCta}>
        {cta}
      </Button>
    </section>
  )
}
export { PlanCard }
export type { PlanCardProps }
