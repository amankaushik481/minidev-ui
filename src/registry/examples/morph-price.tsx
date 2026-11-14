"use client"
import * as React from "react"
import { CheckIcon } from "lucide-react"
import { MorphPrice } from "@/registry/premium/morph-price"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import type { Example } from "./types"

function PlanCardDemo() {
  const [cadence, setCadence] = React.useState<"monthly" | "yearly">("yearly")
  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-raised">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-fg">Lumen Pro</p>
        <Badge variant="accent">Most popular</Badge>
      </div>
      <MorphPrice monthly={49} yearly={39} onCadenceChange={setCadence} className="mt-4 border-0 bg-transparent p-0" />
      <ul className="mt-6 space-y-2 text-sm text-fg">
        <li className="flex items-center gap-2"><CheckIcon aria-hidden className="size-4 text-accent-fg" /> Unlimited invoices</li>
        <li className="flex items-center gap-2"><CheckIcon aria-hidden className="size-4 text-accent-fg" /> Automatic reminders</li>
        <li className="flex items-center gap-2"><CheckIcon aria-hidden className="size-4 text-accent-fg" /> Bank reconciliation</li>
      </ul>
      <Button className="mt-6 w-full">{cadence === "yearly" ? "Choose Pro yearly" : "Choose Pro monthly"}</Button>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Your prices",
    description: "monthly and yearly are per-unit amounts; the saving line is worked out from the two, and only the digits that differ roll.",
    code: `<MorphPrice monthly={24} yearly={19} currency="EUR" unit="/ month" defaultCadence="monthly" className="w-full max-w-md" />`,
    node: <MorphPrice monthly={24} yearly={19} currency="EUR" unit="/ month" defaultCadence="monthly" className="w-full max-w-md" />,
  },
  {
    title: "Inside a plan card",
    description: "Strip the frame with className and read the cadence back with onCadenceChange so the call to action matches the price.",
    code: `function PlanCardDemo() {
  const [cadence, setCadence] = React.useState<"monthly" | "yearly">("yearly")
  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-raised">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-fg">Lumen Pro</p>
        <Badge variant="accent">Most popular</Badge>
      </div>
      <MorphPrice monthly={49} yearly={39} onCadenceChange={setCadence} className="mt-4 border-0 bg-transparent p-0" />
      <ul className="mt-6 space-y-2 text-sm text-fg">
        <li className="flex items-center gap-2"><CheckIcon aria-hidden className="size-4 text-accent-fg" /> Unlimited invoices</li>
        <li className="flex items-center gap-2"><CheckIcon aria-hidden className="size-4 text-accent-fg" /> Automatic reminders</li>
        <li className="flex items-center gap-2"><CheckIcon aria-hidden className="size-4 text-accent-fg" /> Bank reconciliation</li>
      </ul>
      <Button className="mt-6 w-full">{cadence === "yearly" ? "Choose Pro yearly" : "Choose Pro monthly"}</Button>
    </div>
  )
}`,
    node: <PlanCardDemo />,
  },
  {
    title: "Per workspace, no saving",
    description: "When yearly equals monthly the saving note drops out and the line just says how it is billed.",
    code: `<MorphPrice monthly={12} yearly={12} unit="/ workspace" defaultCadence="monthly" className="w-full max-w-xs" />`,
    node: <MorphPrice monthly={12} yearly={12} unit="/ workspace" defaultCadence="monthly" className="w-full max-w-xs" />,
  },
]
