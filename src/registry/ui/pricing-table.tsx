"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { PlanCard } from "@/registry/ui/plan-card"

/** PricingTable — three PlanCards in a responsive grid, one of them highlighted. */

type Plan = React.ComponentProps<typeof PlanCard>

// Lumen pricing tiers.
const SAMPLE_PLANS: Plan[] = [
  { name: "Starter", price: "$0", features: ["5 invoices a month", "1 seat", "Email support"], cta: "Start free" },
  { name: "Pro", price: "$49", features: ["Unlimited invoices", "Up to 10 seats", "Bank sync and reconciliation", "Priority support"], highlighted: true },
  { name: "Business", price: "$149", features: ["Everything in Pro", "Unlimited seats", "SSO and audit log", "Dedicated manager"] },
]

type PricingTableProps = {
  /** One entry per tier, each taking PlanCard props. */
  plans?: Plan[]
  className?: string
}

function PricingTable({
  plans = SAMPLE_PLANS,
  className,
}: PricingTableProps) {
  return (
    <div
      data-slot="pricing-table"
      className={cn("grid gap-4 md:grid-cols-3", className)}
    >
      {plans.map((p, i) => (
        <PlanCard key={p.name ?? i} {...p} />
      ))}
    </div>
  )
}
export { PricingTable }
export type { PricingTableProps }
