"use client"
import { GaugeChart } from "@/registry/ui/gauge-chart"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Service health row",
    description: "One bounded score per gauge; the caption under each dial is also its accessible name.",
    code: `<div className="flex flex-wrap justify-center gap-6">
  <GaugeChart value={99} label="API uptime" />
  <GaugeChart value={86} label="Sync success" />
  <GaugeChart value={64} label="Webhook delivery" />
</div>`,
    node: (
      <div className="flex flex-wrap justify-center gap-6">
        <GaugeChart value={99} label="API uptime" />
        <GaugeChart value={86} label="Sync success" />
        <GaugeChart value={64} label="Webhook delivery" />
      </div>
    ),
  },
  {
    title: "Out of a limit",
    description: "Pass max when the scale is not 100; the dial shows the percentage, so print the raw numbers beside it.",
    code: `<div className="flex flex-col items-center gap-1">
  <GaugeChart value={41} max={50} label="Seats used" />
  <p className="text-xs text-fg-muted tabular-nums">41 of 50 seats on the Growth plan</p>
</div>`,
    node: (
      <div className="flex flex-col items-center gap-1">
        <GaugeChart value={41} max={50} label="Seats used" />
        <p className="text-xs text-fg-muted tabular-nums">41 of 50 seats on the Growth plan</p>
      </div>
    ),
  },
]
