"use client"
import * as React from "react"
import { PricingTable } from "@/registry/ui/pricing-table"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import type { Example } from "./types"

function BillingToggleDemo() {
  const [period, setPeriod] = React.useState("Monthly")
  const yearly = period === "Yearly"
  const plans = [
    { name: "Starter", price: "$0", period: yearly ? "yr" : "mo", features: ["5 invoices a month", "1 seat", "Email support"], cta: "Start free" },
    { name: "Pro", price: yearly ? "$490" : "$49", period: yearly ? "yr" : "mo", features: ["Unlimited invoices", "Up to 10 seats", "Bank sync and reconciliation", "Priority support"], highlighted: true },
    { name: "Business", price: yearly ? "$1,490" : "$149", period: yearly ? "yr" : "mo", features: ["Everything in Pro", "Unlimited seats", "SSO and audit log", "Dedicated manager"] },
  ]
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <SegmentedControl
        aria-label="Billing period"
        options={[
          { value: "Monthly", label: "Monthly" },
          { value: "Yearly", label: "Yearly", badge: "2 months free" },
        ]}
        value={period}
        onChange={setPeriod}
      />
      <PricingTable plans={plans} className="w-full" />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Billing toggle",
    description: "Rebuild the plans array from the selected period and the table re-renders with yearly prices; the highlighted tier stays put.",
    code: `function BillingToggleDemo() {
  const [period, setPeriod] = React.useState("Monthly")
  const yearly = period === "Yearly"
  const plans = [
    { name: "Starter", price: "$0", period: yearly ? "yr" : "mo", features: ["5 invoices a month", "1 seat", "Email support"], cta: "Start free" },
    { name: "Pro", price: yearly ? "$490" : "$49", period: yearly ? "yr" : "mo", features: ["Unlimited invoices", "Up to 10 seats", "Bank sync and reconciliation", "Priority support"], highlighted: true },
    { name: "Business", price: yearly ? "$1,490" : "$149", period: yearly ? "yr" : "mo", features: ["Everything in Pro", "Unlimited seats", "SSO and audit log", "Dedicated manager"] },
  ]
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <SegmentedControl
        aria-label="Billing period"
        options={[
          { value: "Monthly", label: "Monthly" },
          { value: "Yearly", label: "Yearly", badge: "2 months free" },
        ]}
        value={period}
        onChange={setPeriod}
      />
      <PricingTable plans={plans} className="w-full" />
    </div>
  )
}`,
    node: <BillingToggleDemo />,
  },
  {
    title: "Two tiers",
    description: "Override the grid through className when you sell fewer plans; each entry still takes every PlanCard prop, including onCta.",
    code: `<PricingTable
  className="w-full max-w-2xl md:grid-cols-2"
  plans={[
    { name: "Team", price: "$79", features: ["Up to 25 seats", "Shared inboxes", "Approval flows"], cta: "Start trial" },
    { name: "Enterprise", price: "$299", features: ["Unlimited seats", "SAML SSO", "Audit log and data residency", "Named support engineer"], cta: "Talk to sales", highlighted: true },
  ]}
/>`,
    node: (
      <PricingTable
        className="w-full max-w-2xl md:grid-cols-2"
        plans={[
          { name: "Team", price: "$79", features: ["Up to 25 seats", "Shared inboxes", "Approval flows"], cta: "Start trial" },
          { name: "Enterprise", price: "$299", features: ["Unlimited seats", "SAML SSO", "Audit log and data residency", "Named support engineer"], cta: "Talk to sales", highlighted: true },
        ]}
      />
    ),
  },
]
