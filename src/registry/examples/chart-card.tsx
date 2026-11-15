"use client"
import * as React from "react"
import { ChartCard } from "@/registry/ui/chart-card"
import { AreaChart } from "@/registry/ui/area-chart"
import { LineChart } from "@/registry/ui/line-chart"
import { ChartLegend } from "@/registry/ui/chart-legend"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import type { Example } from "./types"

function RevenueCard() {
  const [range, setRange] = React.useState("12w")
  const data = range === "4w" ? [41, 44, 47, 52] : [18, 22, 21, 27, 31, 29, 36, 40, 38, 45, 52, 49]
  return (
    <ChartCard
      className="w-full max-w-md"
      title="Revenue"
      description={range === "4w" ? "Last 4 weeks, $k" : "Last 12 weeks, $k"}
      action={<SegmentedControl size="sm" aria-label="Range" items={["4w", "12w"]} value={range} onChange={setRange} />}
    >
      <AreaChart data={data} label="Weekly revenue, $k" className="h-40" />
    </ChartCard>
  )
}

export const examples: Example[] = [
  {
    title: "Range switch in the header",
    description: "Put a small control in action; the card frames the chart and names the region after its title.",
    code: `function RevenueCard() {
  const [range, setRange] = React.useState("12w")
  const data = range === "4w" ? [41, 44, 47, 52] : [18, 22, 21, 27, 31, 29, 36, 40, 38, 45, 52, 49]
  return (
    <ChartCard
      className="w-full max-w-md"
      title="Revenue"
      description={range === "4w" ? "Last 4 weeks, $k" : "Last 12 weeks, $k"}
      action={<SegmentedControl size="sm" aria-label="Range" items={["4w", "12w"]} value={range} onChange={setRange} />}
    >
      <AreaChart data={data} label="Weekly revenue, $k" className="h-40" />
    </ChartCard>
  )
}`,
    node: <RevenueCard />,
  },
  {
    title: "Chart with a legend",
    description: "Children can hold the chart and a ChartLegend that uses the same colour tokens.",
    code: `<ChartCard className="w-full max-w-md" title="MRR by month" description="Total, expansion and churn, $k">
  <LineChart
    className="h-40"
    label="MRR by month"
    seriesLabels={["Total", "Expansion", "Churn"]}
    series={[
      [12, 14, 13, 17, 19, 18, 23, 26, 25, 30, 33, 36],
      [4, 5, 6, 6, 8, 9, 9, 11, 12, 14, 15, 17],
      [6, 6, 5, 6, 5, 5, 4, 5, 4, 4, 3, 3],
    ]}
  />
  <ChartLegend
    className="mt-4"
    items={[
      { label: "Total", color: "var(--chart-1)" },
      { label: "Expansion", color: "var(--chart-2)" },
      { label: "Churn", color: "var(--chart-3)" },
    ]}
  />
</ChartCard>`,
    node: (
      <ChartCard className="w-full max-w-md" title="MRR by month" description="Total, expansion and churn, $k">
        <LineChart
          className="h-40"
          label="MRR by month"
          seriesLabels={["Total", "Expansion", "Churn"]}
          series={[
            [12, 14, 13, 17, 19, 18, 23, 26, 25, 30, 33, 36],
            [4, 5, 6, 6, 8, 9, 9, 11, 12, 14, 15, 17],
            [6, 6, 5, 6, 5, 5, 4, 5, 4, 4, 3, 3],
          ]}
        />
        <ChartLegend
          className="mt-4"
          items={[
            { label: "Total", color: "var(--chart-1)" },
            { label: "Expansion", color: "var(--chart-2)" },
            { label: "Churn", color: "var(--chart-3)" },
          ]}
        />
      </ChartCard>
    ),
  },
]
