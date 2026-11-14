"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * PricingMotion — pricing tiers that rise into view one after another as they scroll in.
 * Each card rises on the morph spring with a short stagger, once. The
 * featured plan gets the accent border, a "Most popular" badge and the solid
 * button. Reduced motion shows every card in place.
 *
 * Use it for two to four plans on a marketing page. Reach for MorphPrice for
 * one plan with a Monthly / Yearly roll, PricingKinetic or PricingPage for a
 * full section, and the free PricingTable or PlanCard inside billing screens.
 *
 * @example
 * <PricingMotion
 *   plans={[{ name: "Pro", price: "$49", period: "/ month", blurb: "For finance teams", featured: true, features: ["Unlimited invoices"] }]}
 *   onSelect={(plan) => router.push(`/signup?plan=${plan.name}`)}
 * />
 */

type Plan = {
  /** Plan name, also used as the key and in the button label. */
  name: string
  /** Formatted price, e.g. "$49". */
  price: string
  /** Text after the price, e.g. "/ month". */
  period?: string
  /** One line on who the plan is for. */
  blurb: string
  /** Highlight this plan. Use on one plan at most. */
  featured?: boolean
  features: string[]
  /** Button label. Defaults to "Choose <name>". */
  cta?: string
}

// Lumen pricing tiers.
const SAMPLE_PLANS: Plan[] = [
  { name: "Starter", price: "$0", blurb: "For a founder sending the first invoices", features: ["5 invoices a month", "1 seat", "Email support"] },
  { name: "Pro", price: "$49", blurb: "For finance teams that close every month", featured: true, features: ["Unlimited invoices", "Up to 10 seats", "Bank sync and reconciliation", "Priority support"] },
  { name: "Business", price: "$149", blurb: "For companies with audit requirements", features: ["Everything in Pro", "Unlimited seats", "SSO and audit log", "Dedicated manager"] },
]

type PricingMotionProps = {
  /** Plans in display order. */
  plans?: Plan[]
  /** Called with the plan whose button was pressed. */
  onSelect?: (plan: Plan) => void
  className?: string
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function PricingMotion({ plans = SAMPLE_PLANS, onSelect, className }: PricingMotionProps) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="pricing-motion" data-tier="premium" className={cn("grid gap-4 md:grid-cols-3", className)}>
      {plans.map((p, i) => (
        <motion.div
          key={p.name}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduce ? { duration: 0 } : { ...MORPH, delay: i * 0.08 }}
          className={cn(
            "flex flex-col rounded-xl border bg-surface p-6",
            p.featured ? "border-accent shadow-lg" : "border-border"
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-medium text-fg">{p.name}</h3>
            {p.featured ? (
              <span className="rounded-full border border-accent-line bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent-fg">Most popular</span>
            ) : null}
          </div>
          <p className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-medium tracking-[-0.022em] tabular-nums text-fg">{p.price}</span>
            {p.period ? <span className="text-sm text-fg-muted">{p.period}</span> : null}
          </p>
          <p className="mt-1 text-xs text-fg-muted">{p.blurb}</p>
          <ul className="mt-4 flex-1 space-y-2 text-sm text-fg-muted">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden className="text-accent-fg">•</span>
                {f}
              </li>
            ))}
          </ul>
          <Button className="mt-6 w-full" variant={p.featured ? "default" : "outline"} onClick={() => onSelect?.(p)}>
            {p.cta ?? `Choose ${p.name}`}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
export { PricingMotion }
export type { PricingMotionProps, Plan as PricingMotionPlan }
