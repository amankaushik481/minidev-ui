"use client"
import * as React from "react"
import { QuantityStepper } from "@/registry/ui/quantity-stepper"
import type { Example } from "./types"

function Tickets() {
  const [qty, setQty] = React.useState(2)
  return (
    <div className="flex items-center gap-4">
      <QuantityStepper value={qty} onChange={setQty} min={1} max={8} aria-label="Tickets" name="tickets" />
      <span className="text-sm text-fg tabular-nums">${qty * 35}.00</span>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Tickets with a total",
    description: "aria-label names the group and the buttons: \"Decrease tickets\", \"Increase tickets\". Pass name to submit the value with a form.",
    code: `function Tickets() {
  const [qty, setQty] = React.useState(2)
  return (
    <div className="flex items-center gap-4">
      <QuantityStepper value={qty} onChange={setQty} min={1} max={8} aria-label="Tickets" name="tickets" />
      <span className="text-sm text-fg tabular-nums">\${qty * 35}.00</span>
    </div>
  )
}`,
    node: <Tickets />,
  },
  {
    title: "Seats in packs of five",
    description: "step changes how much each press adds; the buttons disable at min and max.",
    code: `<QuantityStepper defaultValue={10} min={5} max={50} step={5} aria-label="Seats" />`,
    node: <QuantityStepper defaultValue={10} min={5} max={50} step={5} aria-label="Seats" />,
  },
]
