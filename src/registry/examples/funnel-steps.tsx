"use client"
import { FunnelSteps } from "@/registry/ui/funnel-steps"
import { ChartCard } from "@/registry/ui/chart-card"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Trial funnel in a card",
    description: "Bars are sized against the largest step; counts are formatted with en-US separators.",
    code: `<ChartCard className="w-full max-w-sm" title="Trial to paid" description="Last 30 days">
  <FunnelSteps
    steps={[
      { label: "Started trial", value: 3210 },
      { label: "Sent first invoice", value: 1880 },
      { label: "Connected bank", value: 1120 },
      { label: "Upgraded", value: 464 },
    ]}
  />
</ChartCard>`,
    node: (
      <ChartCard className="w-full max-w-sm" title="Trial to paid" description="Last 30 days">
        <FunnelSteps
          steps={[
            { label: "Started trial", value: 3210 },
            { label: "Sent first invoice", value: 1880 },
            { label: "Connected bank", value: 1120 },
            { label: "Upgraded", value: 464 },
          ]}
        />
      </ChartCard>
    ),
  },
  {
    title: "Checkout steps",
    description: "A short funnel works in a sidebar or a report email preview.",
    code: `<FunnelSteps
  className="max-w-xs"
  steps={[
    { label: "Viewed cart", value: 8420 },
    { label: "Entered shipping", value: 5130 },
    { label: "Entered payment", value: 3960 },
    { label: "Order placed", value: 3410 },
  ]}
/>`,
    node: (
      <FunnelSteps
        className="max-w-xs"
        steps={[
          { label: "Viewed cart", value: 8420 },
          { label: "Entered shipping", value: 5130 },
          { label: "Entered payment", value: 3960 },
          { label: "Order placed", value: 3410 },
        ]}
      />
    ),
  },
]
