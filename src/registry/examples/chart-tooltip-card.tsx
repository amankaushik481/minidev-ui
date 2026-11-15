"use client"
import * as React from "react"
import { ChartTooltipCard } from "@/registry/ui/chart-tooltip-card"
import type { Example } from "./types"

function WeeklyRevenueBars() {
  const weeks = [
    { label: "Week 1", revenue: 41200, refunds: 900 },
    { label: "Week 2", revenue: 44800, refunds: 1400 },
    { label: "Week 3", revenue: 39600, refunds: 700 },
    { label: "Week 4", revenue: 49100, refunds: 1200 },
  ]
  const [hover, setHover] = React.useState<number | null>(null)
  const active = hover ?? weeks.length - 1
  const w = weeks[active]
  return (
    <div className="w-full max-w-sm pt-28">
      <div className="relative flex h-32 items-end gap-3 border-b border-border" onMouseLeave={() => setHover(null)}>
        {weeks.map((week, i) => (
          <div key={week.label} className="flex h-full flex-1 items-end" onMouseEnter={() => setHover(i)}>
            <div
              className={i === active ? "w-full rounded-t-md bg-accent" : "w-full rounded-t-md bg-accent/35"}
              style={{ height: `${(week.revenue / 49100) * 100}%` }}
            />
          </div>
        ))}
        <div className="absolute bottom-full mb-2 -translate-x-1/2" style={{ left: `${((active + 0.5) / weeks.length) * 100}%` }}>
          <ChartTooltipCard
            title={w.label}
            rows={[
              { label: "Revenue", value: `$${w.revenue.toLocaleString("en-US")}` },
              { label: "Refunds", value: `$${w.refunds.toLocaleString("en-US")}` },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "On a hover layer",
    description: "Keep one card mounted and change its rows as the pointer moves, so the live region announces each new point.",
    code: `function WeeklyRevenueBars() {
  const weeks = [
    { label: "Week 1", revenue: 41200, refunds: 900 },
    { label: "Week 2", revenue: 44800, refunds: 1400 },
    { label: "Week 3", revenue: 39600, refunds: 700 },
    { label: "Week 4", revenue: 49100, refunds: 1200 },
  ]
  const [hover, setHover] = React.useState<number | null>(null)
  const active = hover ?? weeks.length - 1
  const w = weeks[active]
  return (
    <div className="w-full max-w-sm pt-28">
      <div className="relative flex h-32 items-end gap-3 border-b border-border" onMouseLeave={() => setHover(null)}>
        {weeks.map((week, i) => (
          <div key={week.label} className="flex h-full flex-1 items-end" onMouseEnter={() => setHover(i)}>
            <div
              className={i === active ? "w-full rounded-t-md bg-accent" : "w-full rounded-t-md bg-accent/35"}
              style={{ height: \`\${(week.revenue / 49100) * 100}%\` }}
            />
          </div>
        ))}
        <div className="absolute bottom-full mb-2 -translate-x-1/2" style={{ left: \`\${((active + 0.5) / weeks.length) * 100}%\` }}>
          <ChartTooltipCard
            title={w.label}
            rows={[
              { label: "Revenue", value: \`$\${w.revenue.toLocaleString("en-US")}\` },
              { label: "Refunds", value: \`$\${w.refunds.toLocaleString("en-US")}\` },
            ]}
          />
        </div>
      </div>
    </div>
  )
}`,
    node: <WeeklyRevenueBars />,
  },
  {
    title: "Static card",
    description: "Rows take pre-formatted strings, and values line up with tabular numbers.",
    code: `<ChartTooltipCard
  title="Thu 12 Nov"
  rows={[
    { label: "Signups", value: "184" },
    { label: "Trials started", value: "61" },
    { label: "Conversion", value: "33.2%" },
  ]}
/>`,
    node: (
      <ChartTooltipCard
        title="Thu 12 Nov"
        rows={[
          { label: "Signups", value: "184" },
          { label: "Trials started", value: "61" },
          { label: "Conversion", value: "33.2%" },
        ]}
      />
    ),
  },
]
