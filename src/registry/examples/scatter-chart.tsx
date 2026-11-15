"use client"
import * as React from "react"
import { ScatterChart, type ScatterSeries } from "@/registry/ui/scatter-chart"
import { ChartCard } from "@/registry/ui/chart-card"
import type { Example } from "./types"

const PIPELINE: ScatterSeries[] = [
  {
    name: "Inbound",
    points: [
      { x: 8400, y: 14, label: "Juniper Studio" }, { x: 15800, y: 24 }, { x: 26800, y: 33 },
      { x: 31200, y: 29 }, { x: 44200, y: 38 }, { x: 52800, y: 47, label: "Helix Biotech" },
    ],
  },
  {
    name: "Outbound",
    points: [
      { x: 18200, y: 46 }, { x: 33400, y: 61 }, { x: 41800, y: 58 },
      { x: 63800, y: 69, label: "Meridian Freight" }, { x: 72400, y: 88 }, { x: 86600, y: 96, label: "Cobalt Systems" },
    ],
  },
]

const PLANS: ScatterSeries[] = [
  {
    name: "Starter",
    color: "chart-3",
    points: [
      { x: 12, y: 31, size: 420, label: "Starter monthly" },
      { x: 10, y: 38, size: 610, label: "Starter yearly" },
    ],
  },
  {
    name: "Pro",
    color: "chart-1",
    points: [
      { x: 39, y: 46, size: 1280, label: "Pro monthly" },
      { x: 32, y: 52, size: 1760, label: "Pro yearly" },
    ],
  },
  {
    name: "Business",
    color: "chart-2",
    points: [
      { x: 89, y: 58, size: 240, label: "Business monthly" },
      { x: 74, y: 63, size: 390, label: "Business yearly" },
    ],
  },
]

// API latency against payload size for one day of Lumen sync requests.
const REQUESTS: ScatterSeries[] = [
  {
    name: "Sync requests",
    points: [
      [4, 82], [8, 96], [12, 104], [16, 121], [22, 118], [28, 142], [34, 151], [40, 166], [46, 158], [52, 189],
      [58, 204], [64, 198], [72, 231], [80, 246], [88, 262], [96, 410], [104, 288], [112, 301], [120, 322], [128, 344],
    ].map(([x, y]) => ({ x: x!, y: y! })),
  },
]

export const examples: Example[] = [
  {
    title: "Deal size against days to close",
    description: "Two series, a target line on the y axis and compact currency ticks. Hover a legend entry to dim the other series.",
    code: `const pipeline = [
  {
    name: "Inbound",
    points: [
      { x: 8400, y: 14, label: "Juniper Studio" }, { x: 15800, y: 24 }, { x: 26800, y: 33 },
      { x: 31200, y: 29 }, { x: 44200, y: 38 }, { x: 52800, y: 47, label: "Helix Biotech" },
    ],
  },
  {
    name: "Outbound",
    points: [
      { x: 18200, y: 46 }, { x: 33400, y: 61 }, { x: 41800, y: 58 },
      { x: 63800, y: 69, label: "Meridian Freight" }, { x: 72400, y: 88 }, { x: 86600, y: 96, label: "Cobalt Systems" },
    ],
  },
]

<ChartCard title="Pipeline" description="Closed deals, last two quarters">
  <ScatterChart
    label="Deal size against days to close"
    xLabel="Annual contract value"
    yLabel="Days to close"
    xFormat={{ style: "currency", currency: "USD", notation: "compact" }}
    referenceLines={[{ axis: "y", value: 45, label: "Target 45 days" }]}
    series={pipeline}
  />
</ChartCard>`,
    node: (
      <ChartCard title="Pipeline" description="Closed deals, last two quarters" className="w-full max-w-2xl">
        <ScatterChart
          label="Deal size against days to close"
          xLabel="Annual contract value"
          yLabel="Days to close"
          xFormat={{ style: "currency", currency: "USD", notation: "compact" }}
          referenceLines={[{ axis: "y", value: 45, label: "Target 45 days" }]}
          series={PIPELINE}
        />
      </ChartCard>
    ),
  },
  {
    title: "Bubble chart",
    description: "Give points a size and the chart switches to bubbles whose area tracks the value. sizeLabel names it in the tooltip.",
    code: `<ScatterChart
  label="Plan price against net promoter score"
  xLabel="Price per seat"
  yLabel="NPS"
  sizeLabel="Customers"
  xFormat={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
  sizeRange={[10, 48]}
  series={[
    { name: "Starter", color: "chart-3", points: [{ x: 12, y: 31, size: 420, label: "Starter monthly" }, { x: 10, y: 38, size: 610, label: "Starter yearly" }] },
    { name: "Pro", color: "chart-1", points: [{ x: 39, y: 46, size: 1280, label: "Pro monthly" }, { x: 32, y: 52, size: 1760, label: "Pro yearly" }] },
    { name: "Business", color: "chart-2", points: [{ x: 89, y: 58, size: 240, label: "Business monthly" }, { x: 74, y: 63, size: 390, label: "Business yearly" }] },
  ]}
/>`,
    node: (
      <div className="w-full max-w-2xl">
        <ScatterChart
          label="Plan price against net promoter score"
          xLabel="Price per seat"
          yLabel="NPS"
          sizeLabel="Customers"
          xFormat={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
          sizeRange={[10, 48]}
          series={PLANS}
        />
      </div>
    ),
  },
  {
    title: "Outliers against a budget",
    description: "One series with reference lines on both axes. Tab to the chart, then walk the points with the arrow keys to find the slow request.",
    code: `<ScatterChart
  label="Latency against payload size"
  xLabel="Payload"
  yLabel="Latency"
  xFormat={(n) => \`\${n} KB\`}
  yFormat={(n) => \`\${n} ms\`}
  height={220}
  referenceLines={[
    { axis: "y", value: 300, label: "Budget 300 ms" },
    { axis: "x", value: 100, label: "Batch limit" },
  ]}
  series={[{ name: "Sync requests", points: requests }]}
/>`,
    node: (
      <div className="w-full max-w-2xl">
        <ScatterChart
          label="Latency against payload size"
          xLabel="Payload"
          yLabel="Latency"
          xFormat={(n) => `${n} KB`}
          yFormat={(n) => `${n} ms`}
          height={220}
          referenceLines={[
            { axis: "y", value: 300, label: "Budget 300 ms" },
            { axis: "x", value: 100, label: "Batch limit" },
          ]}
          series={REQUESTS}
        />
      </div>
    ),
  },
]
