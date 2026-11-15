"use client"
import { InteractiveAreaChart } from "@/registry/ui/interactive-area-chart"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Against last year",
    description: "Give every point a compare value to draw the dashed line and the change badge. Pass a format with a fixed locale.",
    code: `<InteractiveAreaChart
  label="Signups"
  compareLabel="Last year"
  format={(n) => n.toLocaleString("en-US")}
  data={[
    { label: "Jun", value: 1840, compare: 1420 },
    { label: "Jul", value: 2010, compare: 1510 },
    { label: "Aug", value: 1960, compare: 1630 },
    { label: "Sep", value: 2380, compare: 1700 },
    { label: "Oct", value: 2610, compare: 1880 },
    { label: "Nov", value: 2890, compare: 2050 },
  ]}
/>`,
    node: (
      <InteractiveAreaChart
        label="Signups"
        compareLabel="Last year"
        format={(n) => n.toLocaleString("en-US")}
        data={[
          { label: "Jun", value: 1840, compare: 1420 },
          { label: "Jul", value: 2010, compare: 1510 },
          { label: "Aug", value: 1960, compare: 1630 },
          { label: "Sep", value: 2380, compare: 1700 },
          { label: "Oct", value: 2610, compare: 1880 },
          { label: "Nov", value: 2890, compare: 2050 },
        ]}
      />
    ),
  },
  {
    title: "Single series",
    description: "Leave out compare and only the main line and its value show. Focus the plot and use the arrow keys to read each point.",
    code: `<InteractiveAreaChart
  label="Payouts"
  format={(n) => \`$\${n.toLocaleString("en-US")}\`}
  data={[
    { label: "Mon", value: 12400 },
    { label: "Tue", value: 9800 },
    { label: "Wed", value: 14100 },
    { label: "Thu", value: 13200 },
    { label: "Fri", value: 18600 },
  ]}
/>`,
    node: (
      <InteractiveAreaChart
        label="Payouts"
        format={(n) => `$${n.toLocaleString("en-US")}`}
        data={[
          { label: "Mon", value: 12400 },
          { label: "Tue", value: 9800 },
          { label: "Wed", value: 14100 },
          { label: "Thu", value: 13200 },
          { label: "Fri", value: 18600 },
        ]}
      />
    ),
  },
]
