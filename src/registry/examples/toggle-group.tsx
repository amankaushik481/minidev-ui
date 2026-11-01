"use client"
import * as React from "react"
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"
import { ToggleGroup } from "@/registry/ui/toggle-group"
import type { Example } from "./types"

const PRICES: Record<string, string> = { monthly: "$24 per month", yearly: "$240 per year" }

function BillingDemo() {
  const [period, setPeriod] = React.useState(["monthly"])
  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleGroup value={period} onValueChange={(v) => v.length && setPeriod(v)} aria-label="Billing period">
        <Toggle value="monthly" size="sm">Monthly</Toggle>
        <Toggle value="yearly" size="sm">Yearly</Toggle>
      </ToggleGroup>
      <p className="text-sm text-fg-muted">
        Lumen Pro costs <span className="font-medium text-fg">{PRICES[period[0]]}</span>
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Single selection",
    description: "One item pressed at a time; defaultValue takes an array even for single mode.",
    code: `<ToggleGroup defaultValue={["left"]} aria-label="Text alignment">
  <Toggle value="left" size="sm" aria-label="Align left"><AlignLeftIcon className="size-4" /></Toggle>
  <Toggle value="center" size="sm" aria-label="Align center"><AlignCenterIcon className="size-4" /></Toggle>
  <Toggle value="right" size="sm" aria-label="Align right"><AlignRightIcon className="size-4" /></Toggle>
</ToggleGroup>`,
    node: (
      <ToggleGroup defaultValue={["left"]} aria-label="Text alignment">
        <Toggle value="left" size="sm" aria-label="Align left"><AlignLeftIcon className="size-4" /></Toggle>
        <Toggle value="center" size="sm" aria-label="Align center"><AlignCenterIcon className="size-4" /></Toggle>
        <Toggle value="right" size="sm" aria-label="Align right"><AlignRightIcon className="size-4" /></Toggle>
      </ToggleGroup>
    ),
  },
  {
    title: "Multiple selection",
    description: "With multiple, any number of items can be pressed, which suits formatting toolbars.",
    code: `<ToggleGroup multiple defaultValue={["bold"]} aria-label="Formatting">
  <Toggle value="bold" size="sm" aria-label="Bold"><BoldIcon className="size-4" /></Toggle>
  <Toggle value="italic" size="sm" aria-label="Italic"><ItalicIcon className="size-4" /></Toggle>
  <Toggle value="underline" size="sm" aria-label="Underline"><UnderlineIcon className="size-4" /></Toggle>
</ToggleGroup>`,
    node: (
      <ToggleGroup multiple defaultValue={["bold"]} aria-label="Formatting">
        <Toggle value="bold" size="sm" aria-label="Bold"><BoldIcon className="size-4" /></Toggle>
        <Toggle value="italic" size="sm" aria-label="Italic"><ItalicIcon className="size-4" /></Toggle>
        <Toggle value="underline" size="sm" aria-label="Underline"><UnderlineIcon className="size-4" /></Toggle>
      </ToggleGroup>
    ),
  },
  {
    title: "Controlled with text",
    description: "Ignore empty changes to keep one option always pressed, then read the first value.",
    code: `const PRICES: Record<string, string> = { monthly: "$24 per month", yearly: "$240 per year" }

function BillingDemo() {
  const [period, setPeriod] = React.useState(["monthly"])
  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleGroup value={period} onValueChange={(v) => v.length && setPeriod(v)} aria-label="Billing period">
        <Toggle value="monthly" size="sm">Monthly</Toggle>
        <Toggle value="yearly" size="sm">Yearly</Toggle>
      </ToggleGroup>
      <p className="text-sm text-fg-muted">
        Lumen Pro costs <span className="font-medium text-fg">{PRICES[period[0]]}</span>
      </p>
    </div>
  )
}`,
    node: <BillingDemo />,
  },
]
