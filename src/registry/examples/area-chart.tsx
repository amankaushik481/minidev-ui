import { AreaChart } from "@/registry/ui/area-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Tones",
    description: "The stroke and wash take the tone colour; data is a plain array of numbers, left to right.",
    code: `<AreaChart data={[12, 18, 16, 24, 30, 28, 36, 41]} label="Signups" />
<AreaChart tone="success" data={[48, 52, 51, 58, 61, 66, 70, 74]} label="Paid on time" />
<AreaChart tone="danger" data={[9, 8, 11, 7, 6, 8, 5, 4]} label="Churn" />`,
    node: (
      <div className="grid w-full gap-6 sm:grid-cols-3">
        <AreaChart data={[12, 18, 16, 24, 30, 28, 36, 41]} label="Signups" />
        <AreaChart tone="success" data={[48, 52, 51, 58, 61, 66, 70, 74]} label="Paid on time" />
        <AreaChart tone="danger" data={[9, 8, 11, 7, 6, 8, 5, 4]} label="Churn" />
      </div>
    ),
  },
  {
    title: "Highlighted point",
    description: "highlight takes an index and pins a dot with a hairline crosshair on that value.",
    code: `<div className="w-full max-w-md">
  <div className="mb-2 flex items-baseline justify-between text-sm">
    <span className="text-fg-muted">Week 10</span>
    <span className="font-medium text-fg tabular-nums">$45,000</span>
  </div>
  <AreaChart highlight={9} label="Weekly revenue" />
</div>`,
    node: (
      <div className="w-full max-w-md">
        <div className="mb-2 flex items-baseline justify-between text-sm">
          <span className="text-fg-muted">Week 10</span>
          <span className="font-medium text-fg tabular-nums">$45,000</span>
        </div>
        <AreaChart highlight={9} label="Weekly revenue" />
      </div>
    ),
  },
  {
    title: "Straight and bare",
    description: "Turn off smoothing and the grid for a sparkline that fits a table cell or a stat tile.",
    code: `<AreaChart
  smooth={false}
  grid={false}
  data={[3, 5, 4, 7, 6, 9, 8, 12, 11, 14]}
  label="Deploys per day"
  className="h-16 w-48"
/>`,
    node: (
      <AreaChart
        smooth={false}
        grid={false}
        data={[3, 5, 4, 7, 6, 9, 8, 12, 11, 14]}
        label="Deploys per day"
        className="h-16 w-48"
      />
    ),
  },
  {
    title: "In a stat card",
    description: "Put the number in the card header and let the chart fill the content width underneath.",
    code: `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardDescription>Monthly recurring revenue</CardDescription>
    <CardTitle className="text-2xl tracking-[-0.025em] tabular-nums">$49,200</CardTitle>
  </CardHeader>
  <CardContent>
    <AreaChart label="MRR, last twelve weeks" className="h-24" />
  </CardContent>
</Card>`,
    node: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardDescription>Monthly recurring revenue</CardDescription>
          <CardTitle className="text-2xl tracking-[-0.025em] tabular-nums">$49,200</CardTitle>
        </CardHeader>
        <CardContent>
          <AreaChart label="MRR, last twelve weeks" className="h-24" />
        </CardContent>
      </Card>
    ),
  },
]
