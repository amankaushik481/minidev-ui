"use client"
import * as React from "react"
import { Meter } from "@/registry/ui/meter"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Storage with units",
    description: "valueText is shown with showValue and is what screen readers hear instead of a bare percentage.",
    code: `<Meter label="Storage" value={42} max={50} valueText="42 of 50 GB" showValue className="w-full max-w-sm" />`,
    node: <Meter label="Storage" value={42} max={50} valueText="42 of 50 GB" showValue className="w-full max-w-sm" />,
  },
  {
    title: "Plan usage",
    description: "One meter per limit on a billing page, each with its own unit.",
    code: `<div className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-surface p-4">
  <Meter label="Seats" value={18} max={25} valueText="18 of 25 seats" showValue />
  <Meter label="API calls this month" value={8200} max={10000} valueText="8,200 of 10,000 calls" showValue />
  <Meter label="Invoices sent" value={312} max={1000} valueText="312 of 1,000" showValue />
</div>`,
    node: (
      <div className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-surface p-4">
        <Meter label="Seats" value={18} max={25} valueText="18 of 25 seats" showValue />
        <Meter label="API calls this month" value={8200} max={10000} valueText="8,200 of 10,000 calls" showValue />
        <Meter label="Invoices sent" value={312} max={1000} valueText="312 of 1,000" showValue />
      </div>
    ),
  },
  {
    title: "Over the limit",
    description: "The bar stops at 100%, so say the real amount in valueText and recolour the fill through its data-slot.",
    code: `<Meter
  label="Storage"
  value={60}
  max={50}
  valueText="60 of 50 GB, over limit"
  showValue
  className="w-full max-w-sm [&_[data-slot=meter-indicator]]:bg-danger"
/>`,
    node: (
      <Meter
        label="Storage"
        value={60}
        max={50}
        valueText="60 of 50 GB, over limit"
        showValue
        className="w-full max-w-sm [&_[data-slot=meter-indicator]]:bg-danger"
      />
    ),
  },
]
