"use client"
import * as React from "react"
import { Slider } from "@/registry/ui/slider"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function ControlledDemo() {
  const [seats, setSeats] = React.useState(12)
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3">
        <span id="seats-label" className="text-[0.8125rem] font-medium text-fg">Seats</span>
        <span className="text-xs text-fg-muted tabular-nums">
          {seats} × $12 = <span className="font-medium text-fg">${seats * 12} per month</span>
        </span>
      </div>
      <Slider
        aria-labelledby="seats-label"
        value={seats}
        onValueChange={(v) => setSeats(v as number)}
        min={1}
        max={50}
        format={(n) => n + (n === 1 ? " seat" : " seats")}
      />
      <Button size="sm" variant="outline" className="self-start" disabled={seats === 12} onClick={() => setSeats(12)}>
        Reset to 12
      </Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Currency format",
    description: "Pass Intl.NumberFormat options to format and the bubble and screen reader text use them.",
    code: `<div className="w-64">
  <Slider
    defaultValue={[250]}
    min={0}
    max={1000}
    step={50}
    aria-label="Monthly budget"
    format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
  />
</div>`,
    node: (
      <div className="w-64">
        <Slider
          defaultValue={[250]}
          min={0}
          max={1000}
          step={50}
          aria-label="Monthly budget"
          format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
        />
      </div>
    ),
  },
  {
    title: "Marks with labels",
    description: "marks draws ticks under the rail; give each one a label to caption it.",
    code: `<div className="w-64">
  <Slider
    defaultValue={[30]}
    min={7}
    max={90}
    aria-label="Log retention"
    format={(n) => n + " days"}
    marks={[
      { value: 7, label: "7d" },
      { value: 30, label: "30d" },
      { value: 60, label: "60d" },
      { value: 90, label: "90d" },
    ]}
  />
</div>`,
    node: (
      <div className="w-64">
        <Slider
          defaultValue={[30]}
          min={7}
          max={90}
          aria-label="Log retention"
          format={(n) => n + " days"}
          marks={[
            { value: 7, label: "7d" },
            { value: 30, label: "30d" },
            { value: 60, label: "60d" },
            { value: 90, label: "90d" },
          ]}
        />
      </div>
    ),
  },
  {
    title: "Controlled value",
    description: "Hold a single number in state, label the slider with aria-labelledby and derive the price from it.",
    code: `function ControlledDemo() {
  const [seats, setSeats] = React.useState(12)
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3">
        <span id="seats-label" className="text-[0.8125rem] font-medium text-fg">Seats</span>
        <span className="text-xs text-fg-muted tabular-nums">
          {seats} × $12 = <span className="font-medium text-fg">\${seats * 12} per month</span>
        </span>
      </div>
      <Slider
        aria-labelledby="seats-label"
        value={seats}
        onValueChange={(v) => setSeats(v as number)}
        min={1}
        max={50}
        format={(n) => n + (n === 1 ? " seat" : " seats")}
      />
      <Button size="sm" variant="outline" className="self-start" disabled={seats === 12} onClick={() => setSeats(12)}>
        Reset to 12
      </Button>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Range and disabled",
    description: "Two values give two thumbs with the fill between them; disabled fades the whole control.",
    code: `<div className="flex w-64 flex-col gap-8">
  <Slider defaultValue={[20, 80]} minStepsBetweenValues={5} aria-label="Alert band" format={(n) => n + "%"} />
  <Slider defaultValue={[40]} disabled aria-label="Disabled" />
</div>`,
    node: (
      <div className="flex w-64 flex-col gap-8">
        <Slider defaultValue={[20, 80]} minStepsBetweenValues={5} aria-label="Alert band" format={(n) => n + "%"} />
        <Slider defaultValue={[40]} disabled aria-label="Disabled" />
      </div>
    ),
  },
]
