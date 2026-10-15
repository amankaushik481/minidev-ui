"use client"
import * as React from "react"
import { NumberInput } from "@/registry/ui/number-input"
import { FormField } from "@/registry/ui/form-field"
import type { Example } from "./types"

function ControlledDemo() {
  const [seats, setSeats] = React.useState(3)
  return (
    <div className="flex flex-wrap items-center gap-4">
      <NumberInput value={seats} onChange={setSeats} min={1} max={25} aria-label="Seats" />
      <p className="text-xs text-fg-muted tabular-nums">
        {seats} × $49 = <span className="font-medium text-fg">${seats * 49} per month</span>
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Min, max and step",
    description: "Values are clamped to min and max, and the buttons move by step, including decimals.",
    code: `<NumberInput defaultValue={10} min={0} max={100} step={10} aria-label="Discount percent" />
<NumberInput defaultValue={0.5} min={0} max={8} step={0.25} aria-label="Hours" />`,
    node: (
      <div className="flex flex-col items-start gap-3">
        <NumberInput defaultValue={10} min={0} max={100} step={10} aria-label="Discount percent" />
        <NumberInput defaultValue={0.5} min={0} max={8} step={0.25} aria-label="Hours" />
      </div>
    ),
  },
  {
    title: "Controlled value",
    description: "onChange gives you a clamped number, so you can price it without parsing.",
    code: `function ControlledDemo() {
  const [seats, setSeats] = React.useState(3)
  return (
    <div className="flex flex-wrap items-center gap-4">
      <NumberInput value={seats} onChange={setSeats} min={1} max={25} aria-label="Seats" />
      <p className="text-xs text-fg-muted tabular-nums">
        {seats} × $49 = <span className="font-medium text-fg">\${seats * 49} per month</span>
      </p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "With form field",
    description: "Share an id with FormField so the label focuses the number field.",
    code: `<FormField id="seat-count" label="Seats" description="Northwind is billed per seat, $12 each.">
  <NumberInput id="seat-count" defaultValue={5} min={1} max={50} />
</FormField>`,
    node: (
      <div className="w-56">
        <FormField id="seat-count" label="Seats" description="Northwind is billed per seat, $12 each.">
          <NumberInput id="seat-count" defaultValue={5} min={1} max={50} />
        </FormField>
      </div>
    ),
  },
  {
    title: "Disabled",
    description: "Disabled locks the field and both buttons together.",
    code: `<NumberInput disabled defaultValue={2} aria-label="Quantity" />`,
    node: <NumberInput disabled defaultValue={2} aria-label="Quantity" />,
  },
]
