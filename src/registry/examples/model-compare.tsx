"use client"
import * as React from "react"
import { ModelCompare } from "@/registry/ui/model-compare"
import { ModelPicker } from "@/registry/ui/model-picker"
import type { Example } from "./types"

const ROWS = [
  { name: "Orbit Mini", latencyMs: 72, cost: "$0.20 / 1M", quality: "Good" },
  { name: "Orbit Pro", latencyMs: 280, cost: "$3.00 / 1M", quality: "Great" },
  { name: "Orbit Max", latencyMs: 1150, cost: "$15.00 / 1M", quality: "Best" },
]

function DefaultModelSetting() {
  const [model, setModel] = React.useState("Orbit Pro")
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-fg">Default model</p>
        <ModelPicker value={model} onChange={setModel} models={ROWS.map((r) => ({ id: r.name, label: r.name }))} aria-label="Default model" />
      </div>
      <ModelCompare rows={ROWS} />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Your models",
    description: "Pass rows with cost already formatted; latency is coloured by LatencyBadge.",
    code: `<ModelCompare
  className="w-full max-w-lg"
  rows={[
    { name: "Orbit Mini", latencyMs: 72, cost: "$0.20 / 1M", quality: "Good" },
    { name: "Orbit Pro", latencyMs: 280, cost: "$3.00 / 1M", quality: "Great" },
    { name: "Orbit Max", latencyMs: 1150, cost: "$15.00 / 1M", quality: "Best" },
  ]}
/>`,
    node: (
      <ModelCompare
        className="w-full max-w-lg"
        rows={[
          { name: "Orbit Mini", latencyMs: 72, cost: "$0.20 / 1M", quality: "Good" },
          { name: "Orbit Pro", latencyMs: 280, cost: "$3.00 / 1M", quality: "Great" },
          { name: "Orbit Max", latencyMs: 1150, cost: "$15.00 / 1M", quality: "Best" },
        ]}
      />
    ),
  },
  {
    title: "Beside the picker",
    description: "On a settings page, show the table under the ModelPicker so the choice comes with its trade-offs.",
    code: `const ROWS = [
  { name: "Orbit Mini", latencyMs: 72, cost: "$0.20 / 1M", quality: "Good" },
  { name: "Orbit Pro", latencyMs: 280, cost: "$3.00 / 1M", quality: "Great" },
  { name: "Orbit Max", latencyMs: 1150, cost: "$15.00 / 1M", quality: "Best" },
]

function DefaultModelSetting() {
  const [model, setModel] = React.useState("Orbit Pro")
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-fg">Default model</p>
        <ModelPicker value={model} onChange={setModel} models={ROWS.map((r) => ({ id: r.name, label: r.name }))} aria-label="Default model" />
      </div>
      <ModelCompare rows={ROWS} />
    </div>
  )
}`,
    node: <DefaultModelSetting />,
  },
]
