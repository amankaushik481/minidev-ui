import { ChartLegend } from "@/registry/ui/chart-legend"
import { LineChart } from "@/registry/ui/line-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Single series",
    description: "One array inside series draws a single line in the first chart colour with an end dot.",
    code: `<LineChart
  series={[[42, 48, 45, 53, 58, 56, 64, 71, 69, 78]]}
  label="Active customers"
  className="w-full max-w-md"
/>`,
    node: (
      <LineChart
        series={[[42, 48, 45, 53, 58, 56, 64, 71, 69, 78]]}
        label="Active customers"
        className="w-full max-w-md"
      />
    ),
  },
  {
    title: "With a legend",
    description: "Series take chart-1 to chart-5 in order, so ChartLegend can name them with the same tokens.",
    code: `<div className="w-full max-w-md">
  <ChartLegend
    className="mb-3"
    items={[
      { label: "Total MRR", color: "var(--chart-1)" },
      { label: "Expansion", color: "var(--chart-2)" },
      { label: "Churn", color: "var(--chart-3)" },
    ]}
  />
  <LineChart label="MRR by month" />
</div>`,
    node: (
      <div className="w-full max-w-md">
        <ChartLegend
          className="mb-3"
          items={[
            { label: "Total MRR", color: "var(--chart-1)" },
            { label: "Expansion", color: "var(--chart-2)" },
            { label: "Churn", color: "var(--chart-3)" },
          ]}
        />
        <LineChart label="MRR by month" />
      </div>
    ),
  },
  {
    title: "Compact without grid",
    description: "Drop the grid and shrink the height for a trend line inside a stat card.",
    code: `<Card size="sm" className="w-56">
  <CardHeader>
    <CardDescription>Open invoices</CardDescription>
    <CardTitle className="text-xl tracking-[-0.02em] tabular-nums">128</CardTitle>
  </CardHeader>
  <CardContent>
    <LineChart grid={false} series={[[96, 104, 101, 112, 118, 115, 124, 128]]} label="Open invoices, eight weeks" className="h-12" />
  </CardContent>
</Card>`,
    node: (
      <Card size="sm" className="w-56">
        <CardHeader>
          <CardDescription>Open invoices</CardDescription>
          <CardTitle className="text-xl tracking-[-0.02em] tabular-nums">128</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart grid={false} series={[[96, 104, 101, 112, 118, 115, 124, 128]]} label="Open invoices, eight weeks" className="h-12" />
        </CardContent>
      </Card>
    ),
  },
]
