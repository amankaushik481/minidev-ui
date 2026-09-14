"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { PlanCard } from "@/registry/ui/plan-card"

function PricingTable({
  plans,
  className,
}: {
  plans: React.ComponentProps<typeof PlanCard>[]
  className?: string
}) {
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
