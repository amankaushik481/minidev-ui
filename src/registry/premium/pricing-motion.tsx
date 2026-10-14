"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/** PricingMotion — pricing tiers that rise into view one after another as they scroll in. */

type Plan = { name: string; price: string; blurb: string; featured?: boolean; features: string[] }

// Lumen pricing tiers.
const SAMPLE_PLANS: Plan[] = [
  { name: "Starter", price: "$0", blurb: "For a founder sending the first invoices", features: ["5 invoices a month", "1 seat", "Email support"] },
  { name: "Pro", price: "$49", blurb: "For finance teams that close every month", featured: true, features: ["Unlimited invoices", "Up to 10 seats", "Bank sync and reconciliation", "Priority support"] },
  { name: "Business", price: "$149", blurb: "For companies with audit requirements", features: ["Everything in Pro", "Unlimited seats", "SSO and audit log", "Dedicated manager"] },
]

type PricingMotionProps = {
  plans?: Plan[]
  className?: string
}

function PricingMotion({ plans = SAMPLE_PLANS, className }: PricingMotionProps) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="pricing-motion" data-tier="premium" className={cn("grid gap-4 md:grid-cols-3", className)}>
      {plans.map((p, i) => (
        <motion.div
          key={p.name}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className={cn(
            "flex flex-col rounded-xl border bg-surface p-6",
            p.featured ? "border-accent shadow-lg" : "border-border"
          )}
        >
          <h3 className="text-sm font-medium text-fg">{p.name}</h3>
          <p className="mt-2 text-3xl font-medium tracking-[-0.022em] tabular-nums text-fg">{p.price}</p>
          <p className="mt-1 text-xs text-fg-muted">{p.blurb}</p>
          <ul className="mt-4 flex-1 space-y-2 text-sm text-fg-muted">
            {p.features.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
          <Button className="mt-6 w-full" variant={p.featured ? "default" : "outline"}>
            Choose {p.name}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
export { PricingMotion }
export type { PricingMotionProps, Plan as PricingMotionPlan }
