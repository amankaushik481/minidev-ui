"use client"
import { StatSparkline } from "@/registry/ui/stat-sparkline"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Growth metric",
    description: "Points are oldest first; the last one is highlighted as the current value.",
    code: `<StatSparkline label="Active customers" value="1,284" delta="+3.1%" points={[920, 948, 970, 1004, 1012, 1060, 1088, 1120, 1150, 1210, 1246, 1284]} />`,
    node: <StatSparkline label="Active customers" value="1,284" delta="+3.1%" points={[920, 948, 970, 1004, 1012, 1060, 1088, 1120, 1150, 1210, 1246, 1284]} />,
  },
  {
    title: "A falling metric",
    description: "A leading minus turns the delta and the line red.",
    code: `<StatSparkline label="Trial signups" value="212" delta="−8.4%" points={[260, 248, 255, 240, 236, 231, 224, 229, 220, 215, 218, 212]} />`,
    node: <StatSparkline label="Trial signups" value="212" delta="−8.4%" points={[260, 248, 255, 240, 236, 231, 224, 229, 220, 215, 218, 212]} />,
  },
  {
    title: "Down is good",
    description: "Set `invert` for latency, churn or cost: a leading minus then shows green and a rise red.",
    code: `<StatSparkline label="p95 latency" value="182 ms" delta="−12%" invert points={[240, 236, 228, 231, 219, 214, 207, 203, 198, 191, 186, 182]} />`,
    node: <StatSparkline label="p95 latency" value="182 ms" delta="−12%" invert points={[240, 236, 228, 231, 219, 214, 207, 203, 198, 191, 186, 182]} />,
  },
  {
    title: "Row of cards",
    description: "Lay several out in a grid; each card is max-w-xs, so let the grid set the width.",
    code: `<div className="grid w-full max-w-3xl gap-3 sm:grid-cols-3">
  <StatSparkline className="max-w-none" label="MRR" value="$48,290" delta="+3.1%" points={[39, 41, 40, 43, 44, 46, 48]} />
  <StatSparkline className="max-w-none" label="Paid invoices" value="212" delta="+5%" points={[170, 182, 176, 190, 201, 205, 212]} />
  <StatSparkline className="max-w-none" label="Seats" value="1,184" delta="−1%" points={[1210, 1204, 1198, 1201, 1190, 1188, 1184]} />
</div>`,
    node: (
      <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-3">
        <StatSparkline className="max-w-none" label="MRR" value="$48,290" delta="+3.1%" points={[39, 41, 40, 43, 44, 46, 48]} />
        <StatSparkline className="max-w-none" label="Paid invoices" value="212" delta="+5%" points={[170, 182, 176, 190, 201, 205, 212]} />
        <StatSparkline className="max-w-none" label="Seats" value="1,184" delta="−1%" points={[1210, 1204, 1198, 1201, 1190, 1188, 1184]} />
      </div>
    ),
  },
]
