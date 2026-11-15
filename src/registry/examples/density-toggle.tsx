"use client"
import * as React from "react"
import { DataTable } from "@/registry/ui/data-table"
import { DensityToggle, type Density } from "@/registry/ui/density-toggle"
import type { Example } from "./types"

function DensityTable() {
  const [density, setDensity] = React.useState<Density>("comfortable")
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-fg-muted">8 invoices</p>
        <DensityToggle value={density} onChange={setDensity} />
      </div>
      <DataTable density={density === "compact" ? "compact" : "default"} caption="Invoices" />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Driving DataTable row height",
    description: "Map comfortable to the DataTable default size so rows switch between 36 and 44px.",
    code: `function DensityTable() {
  const [density, setDensity] = React.useState<Density>("comfortable")
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-fg-muted">8 invoices</p>
        <DensityToggle value={density} onChange={setDensity} />
      </div>
      <DataTable density={density === "compact" ? "compact" : "default"} caption="Invoices" />
    </div>
  )
}`,
    node: <DensityTable />,
  },
  {
    title: "In a settings row",
    description: "Uncontrolled, starting on compact, for a display preferences page.",
    code: `<div className="flex w-full max-w-sm items-center justify-between gap-4 rounded-xl border border-border bg-surface p-3">
  <div>
    <p className="text-sm font-medium text-fg">Row density</p>
    <p className="text-xs text-fg-muted">Applies to every table in Lumen.</p>
  </div>
  <DensityToggle defaultValue="compact" />
</div>`,
    node: (
      <div className="flex w-full max-w-sm items-center justify-between gap-4 rounded-xl border border-border bg-surface p-3">
        <div>
          <p className="text-sm font-medium text-fg">Row density</p>
          <p className="text-xs text-fg-muted">Applies to every table in Lumen.</p>
        </div>
        <DensityToggle defaultValue="compact" />
      </div>
    ),
  },
]
