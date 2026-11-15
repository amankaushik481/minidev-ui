"use client"
import { ChartLegend } from "@/registry/ui/chart-legend"
import { LineChart } from "@/registry/ui/line-chart"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Matching LineChart colours",
    description: "LineChart draws series in --chart-1, --chart-2 and so on, so pass the same tokens in the same order.",
    code: `<div className="w-full max-w-md space-y-3">
  <LineChart
    className="h-32"
    label="Weekly active teams"
    seriesLabels={["Web", "Mobile"]}
    series={[
      [220, 236, 241, 260, 274, 291, 305],
      [80, 92, 101, 118, 126, 140, 152],
    ]}
  />
  <ChartLegend
    items={[
      { label: "Web", color: "var(--chart-1)" },
      { label: "Mobile", color: "var(--chart-2)" },
    ]}
  />
</div>`,
    node: (
      <div className="w-full max-w-md space-y-3">
        <LineChart
          className="h-32"
          label="Weekly active teams"
          seriesLabels={["Web", "Mobile"]}
          series={[
            [220, 236, 241, 260, 274, 291, 305],
            [80, 92, 101, 118, 126, 140, 152],
          ]}
        />
        <ChartLegend
          items={[
            { label: "Web", color: "var(--chart-1)" },
            { label: "Mobile", color: "var(--chart-2)" },
          ]}
        />
      </div>
    ),
  },
  {
    title: "Default status colours",
    description: "Without color, items take accent, success, warning and danger in turn, which suits invoice states.",
    code: `<ChartLegend label="Invoice status" items={[{ label: "Sent" }, { label: "Paid" }, { label: "Due soon" }, { label: "Overdue" }]} />`,
    node: (
      <ChartLegend label="Invoice status" items={[{ label: "Sent" }, { label: "Paid" }, { label: "Due soon" }, { label: "Overdue" }]} />
    ),
  },
]
