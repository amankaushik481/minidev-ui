"use client"
import * as React from "react"
import { RegionPicker } from "@/registry/ui/region-picker"
import type { Example } from "./types"

const REGIONS = [
  { id: "fra", label: "Frankfurt", latency: "eu-central · 24ms" },
  { id: "dub", label: "Dublin", latency: "eu-west · 31ms" },
  { id: "iad", label: "Virginia", latency: "us-east · 88ms" },
]

function ControlledDemo() {
  const [region, setRegion] = React.useState("dub")
  const picked = REGIONS.find((r) => r.id === region)
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <RegionPicker aria-label="Database region" regions={REGIONS} value={region} onChange={setRegion} />
      <p className="text-xs text-fg-muted">Your database will be created in {picked?.label}. This cannot be changed later.</p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Data residency",
    description: "The detail line takes any short text, such as a region code and a measured latency.",
    code: `const REGIONS = [
  { id: "fra", label: "Frankfurt", latency: "eu-central · 24ms" },
  { id: "dub", label: "Dublin", latency: "eu-west · 31ms" },
  { id: "iad", label: "Virginia", latency: "us-east · 88ms" },
]

<RegionPicker aria-label="Data region" regions={REGIONS} className="w-full max-w-xl" />`,
    node: <RegionPicker aria-label="Data region" regions={REGIONS} className="w-full max-w-xl" />,
  },
  {
    title: "Controlled",
    description: "Hold the id yourself to explain the consequence of the choice next to the picker.",
    code: `function ControlledDemo() {
  const [region, setRegion] = React.useState("dub")
  const picked = REGIONS.find((r) => r.id === region)
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <RegionPicker aria-label="Database region" regions={REGIONS} value={region} onChange={setRegion} />
      <p className="text-xs text-fg-muted">Your database will be created in {picked?.label}. This cannot be changed later.</p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
]
