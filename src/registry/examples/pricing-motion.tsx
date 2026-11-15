"use client"
import * as React from "react"
import { PricingMotion } from "@/registry/premium/pricing-motion"
import { PricingToggle, type BillingCadence } from "@/registry/ui/pricing-toggle"
import type { Example } from "./types"

function SelectDemo() {
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-4xl flex-col gap-3">
      <PricingMotion
        plans={[
          { name: "Solo", price: "$12", period: "/ month", blurb: "For one person shipping side projects", features: ["3 sites", "Custom domain", "Email support"] },
          { name: "Studio", price: "$39", period: "/ month", blurb: "For small teams with client work", featured: true, features: ["25 sites", "5 editors", "Client handoff links"] },
          { name: "Agency", price: "$99", period: "/ month", blurb: "For agencies running many clients", features: ["Unlimited sites", "Unlimited editors", "White-label dashboard"] },
        ]}
        onSelect={(plan) => setPicked(plan.name)}
      />
      <p className="text-center text-xs text-fg-muted" aria-live="polite">{picked ? picked + " selected." : "No plan selected."}</p>
    </div>
  )
}

function CadenceDemo() {
  const [cadence, setCadence] = React.useState<BillingCadence>("yearly")
  const yearly = cadence === "yearly"
  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-6">
      <PricingToggle value={cadence} onChange={setCadence} note="Two months free on yearly" />
      <PricingMotion
        className="w-full md:grid-cols-2"
        plans={[
          { name: "Team", price: yearly ? "$40" : "$48", period: yearly ? "/ month, billed yearly" : "/ month", blurb: "For teams up to 25", featured: true, features: ["Unlimited projects", "Shared templates"] },
          { name: "Scale", price: yearly ? "$100" : "$120", period: yearly ? "/ month, billed yearly" : "/ month", blurb: "For companies with a security review", features: ["SSO and SCIM", "Audit log"] },
        ]}
      />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Your plans with a select handler",
    description: "onSelect receives the whole plan object; the button label defaults to Choose plus the plan name.",
    code: `function SelectDemo() {
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-4xl flex-col gap-3">
      <PricingMotion
        plans={[
          { name: "Solo", price: "$12", period: "/ month", blurb: "For one person shipping side projects", features: ["3 sites", "Custom domain", "Email support"] },
          { name: "Studio", price: "$39", period: "/ month", blurb: "For small teams with client work", featured: true, features: ["25 sites", "5 editors", "Client handoff links"] },
          { name: "Agency", price: "$99", period: "/ month", blurb: "For agencies running many clients", features: ["Unlimited sites", "Unlimited editors", "White-label dashboard"] },
        ]}
        onSelect={(plan) => setPicked(plan.name)}
      />
      <p className="text-center text-xs text-fg-muted" aria-live="polite">{picked ? picked + " selected." : "No plan selected."}</p>
    </div>
  )
}`,
    node: <SelectDemo />,
  },
  {
    title: "With a monthly / yearly switch",
    description: "Hold the cadence in state and pass new price strings; className=\"md:grid-cols-2\" fits two plans.",
    code: `function CadenceDemo() {
  const [cadence, setCadence] = React.useState<BillingCadence>("yearly")
  const yearly = cadence === "yearly"
  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-6">
      <PricingToggle value={cadence} onChange={setCadence} note="Two months free on yearly" />
      <PricingMotion
        className="w-full md:grid-cols-2"
        plans={[
          { name: "Team", price: yearly ? "$40" : "$48", period: yearly ? "/ month, billed yearly" : "/ month", blurb: "For teams up to 25", featured: true, features: ["Unlimited projects", "Shared templates"] },
          { name: "Scale", price: yearly ? "$100" : "$120", period: yearly ? "/ month, billed yearly" : "/ month", blurb: "For companies with a security review", features: ["SSO and SCIM", "Audit log"] },
        ]}
      />
    </div>
  )
}`,
    node: <CadenceDemo />,
  },
]
