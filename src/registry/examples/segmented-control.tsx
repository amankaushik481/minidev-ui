"use client"
import * as React from "react"
import { LayoutGridIcon, ListIcon, SquareKanbanIcon } from "lucide-react"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import type { Example } from "./types"

function ControlledDemo() {
  const [period, setPeriod] = React.useState("monthly")
  return (
    <div className="flex flex-col items-center gap-3">
      <SegmentedControl
        aria-label="Billing period"
        value={period}
        onChange={setPeriod}
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly", badge: "-20%" },
        ]}
      />
      <p className="text-sm text-fg-muted tabular-nums">
        Lumen Pro: {period === "yearly" ? "$230 per year" : "$24 per month"}
      </p>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Sizes",
    description: "Three sizes with the same thumb and spacing scale; default fits a 36px toolbar row.",
    code: `<SegmentedControl size="sm" items={["Day", "Week", "Month"]} aria-label="Range" />
<SegmentedControl items={["Day", "Week", "Month"]} aria-label="Range" />
<SegmentedControl size="lg" items={["Day", "Week", "Month"]} aria-label="Range" />`,
    node: (
      <div className="flex flex-col items-center gap-4">
        <SegmentedControl size="sm" items={["Day", "Week", "Month"]} aria-label="Range" />
        <SegmentedControl items={["Day", "Week", "Month"]} aria-label="Range" />
        <SegmentedControl size="lg" items={["Day", "Week", "Month"]} aria-label="Range" />
      </div>
    ),
  },
  {
    title: "Controlled value",
    description: "Hold the value in state and pass onChange; the badge marks the option you want to push.",
    code: `function ControlledDemo() {
  const [period, setPeriod] = React.useState("monthly")
  return (
    <div className="flex flex-col items-center gap-3">
      <SegmentedControl
        aria-label="Billing period"
        value={period}
        onChange={setPeriod}
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly", badge: "-20%" },
        ]}
      />
      <p className="text-sm text-fg-muted tabular-nums">
        Lumen Pro: {period === "yearly" ? "$230 per year" : "$24 per month"}
      </p>
    </div>
  )
}`,
    node: <ControlledDemo />,
  },
  {
    title: "Icons and counts",
    description: "Options take an icon and a trailing badge, useful for view switchers with item counts.",
    code: `<SegmentedControl
  aria-label="View"
  defaultValue="board"
  options={[
    { value: "list", label: "List", icon: <ListIcon />, badge: 24 },
    { value: "board", label: "Board", icon: <SquareKanbanIcon />, badge: 24 },
    { value: "grid", label: "Grid", icon: <LayoutGridIcon /> },
  ]}
/>`,
    node: (
      <SegmentedControl
        aria-label="View"
        defaultValue="board"
        options={[
          { value: "list", label: "List", icon: <ListIcon />, badge: 24 },
          { value: "board", label: "Board", icon: <SquareKanbanIcon />, badge: 24 },
          { value: "grid", label: "Grid", icon: <LayoutGridIcon /> },
        ]}
      />
    ),
  },
  {
    title: "Full width and disabled",
    description: "fullWidth splits the container evenly; disable one option or the whole control.",
    code: `<div className="w-full max-w-xs">
  <SegmentedControl
    fullWidth
    aria-label="Invoice status"
    options={[
      { value: "all", label: "All" },
      { value: "paid", label: "Paid" },
      { value: "overdue", label: "Overdue", disabled: true },
    ]}
  />
</div>
<SegmentedControl disabled items={["Monthly", "Yearly"]} aria-label="Billing period" />`,
    node: (
      <div className="flex w-full max-w-xs flex-col items-center gap-4">
        <div className="w-full max-w-xs">
          <SegmentedControl
            fullWidth
            aria-label="Invoice status"
            options={[
              { value: "all", label: "All" },
              { value: "paid", label: "Paid" },
              { value: "overdue", label: "Overdue", disabled: true },
            ]}
          />
        </div>
        <SegmentedControl disabled items={["Monthly", "Yearly"]} aria-label="Billing period" />
      </div>
    ),
  },
]
