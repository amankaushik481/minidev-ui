"use client"
import * as React from "react"
import { PricingToggle, type BillingCadence } from "@/registry/ui/pricing-toggle"
import { PlanCard } from "@/registry/ui/plan-card"
import type { Example } from "./types"

function PriceDemo() {
  const [cadence, setCadence] = React.useState<BillingCadence>("monthly")
  const yearly = cadence === "yearly"
  return (
    <div className="flex flex-col items-center gap-5">
      <PricingToggle value={cadence} onChange={setCadence} note="Two months free on yearly" />
      <PlanCard
        name="Pro"
        price={yearly ? "$490" : "$49"}
        period={yearly ? "yr" : "mo"}
        features={["Unlimited invoices", "Up to 10 seats", "Bank sync"]}
        highlighted
        className="w-72"
      />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Driving a price",
    description: "Controlled with value and onChange; the card reads the same state to pick its price and period.",
    code: `function PriceDemo() {
  const [cadence, setCadence] = React.useState<BillingCadence>("monthly")
  const yearly = cadence === "yearly"
  return (
    <div className="flex flex-col items-center gap-5">
      <PricingToggle value={cadence} onChange={setCadence} note="Two months free on yearly" />
      <PlanCard
        name="Pro"
        price={yearly ? "$490" : "$49"}
        period={yearly ? "yr" : "mo"}
        features={["Unlimited invoices", "Up to 10 seats", "Bank sync"]}
        highlighted
        className="w-72"
      />
    </div>
  )
}`,
    node: <PriceDemo />,
  },
  {
    title: "In a section header, no note",
    description: "Uncontrolled from defaultValue; note={null} hides the line when the header already states the discount.",
    code: `<div className="flex w-full max-w-xl items-center justify-between gap-4">
  <div>
    <h3 className="text-sm font-medium text-fg">Plans</h3>
    <p className="text-xs text-fg-muted">Yearly plans include two free months.</p>
  </div>
  <PricingToggle defaultValue="yearly" note={null} />
</div>`,
    node: (
      <div className="flex w-full max-w-xl items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-medium text-fg">Plans</h3>
          <p className="text-xs text-fg-muted">Yearly plans include two free months.</p>
        </div>
        <PricingToggle defaultValue="yearly" note={null} />
      </div>
    ),
  },
]
