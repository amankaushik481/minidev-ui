"use client"
import * as React from "react"
import { RangeSlider } from "@/registry/ui/range-slider"
import type { Example } from "./types"

function PriceFilter() {
  const [price, setPrice] = React.useState([40, 160])
  return (
    <div className="flex w-full max-w-xs flex-col gap-6 pt-8">
      <RangeSlider
        aria-label="Price"
        defaultValue={price}
        min={0}
        max={250}
        step={5}
        minStepsBetweenValues={2}
        format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
        onValueCommitted={setPrice}
        className="w-full"
      />
      <p className="text-xs text-fg-muted tabular-nums">Showing desks from ${price[0]} to ${price[1]}</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Price filter",
    description: "Query in onValueCommitted, which fires once on release, and keep the thumbs 10 apart.",
    code: `function PriceFilter() {
  const [price, setPrice] = React.useState([40, 160])
  return (
    <div className="flex w-full max-w-xs flex-col gap-6 pt-8">
      <RangeSlider
        aria-label="Price"
        defaultValue={price}
        min={0}
        max={250}
        step={5}
        minStepsBetweenValues={2}
        format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
        onValueCommitted={setPrice}
        className="w-full"
      />
      <p className="text-xs text-fg-muted tabular-nums">Showing desks from \${price[0]} to \${price[1]}</p>
    </div>
  )
}`,
    node: <PriceFilter />,
  },
  {
    title: "Support hours",
    description: "A format function turns hours into times, and marks label the rail.",
    code: `<RangeSlider
  aria-label="Support hours"
  defaultValue={[9, 17]}
  min={0}
  max={24}
  format={(h) => String(h).padStart(2, "0") + ":00"}
  marks={[{ value: 0, label: "00:00" }, { value: 12, label: "12:00" }, { value: 24, label: "24:00" }]}
  className="w-72 pt-8"
/>`,
    node: (
      <RangeSlider
        aria-label="Support hours"
        defaultValue={[9, 17]}
        min={0}
        max={24}
        format={(h) => String(h).padStart(2, "0") + ":00"}
        marks={[{ value: 0, label: "00:00" }, { value: 12, label: "12:00" }, { value: 24, label: "24:00" }]}
        className="w-72 pt-8"
      />
    ),
  },
]
