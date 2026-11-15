"use client"
import { KpiRow } from "@/registry/ui/kpi-row"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Mixed good directions",
    description: "Set invert on metrics where a fall is good, so lower churn and faster responses show green.",
    code: `<KpiRow
  items={[
    { label: "MRR", value: "$48,290", delta: 3.1 },
    { label: "Churn", value: "1.2%", delta: -0.3, invert: true },
    { label: "First response", value: "14 min", delta: -22, invert: true },
    { label: "Refunds", value: "$1,190", delta: 9, invert: true },
  ]}
/>`,
    node: (
      <KpiRow
        items={[
          { label: "MRR", value: "$48,290", delta: 3.1 },
          { label: "Churn", value: "1.2%", delta: -0.3, invert: true },
          { label: "First response", value: "14 min", delta: -22, invert: true },
          { label: "Refunds", value: "$1,190", delta: 9, invert: true },
        ]}
      />
    ),
  },
  {
    title: "Text instead of a percent",
    description: "A string delta renders as muted context, for counts and comparisons that aren't percentages.",
    code: `<KpiRow
  className="lg:grid-cols-3"
  items={[
    { label: "Open invoices", value: "$18,640", delta: "14 invoices" },
    { label: "Overdue", value: "$3,180", delta: "2 customers" },
    { label: "Next payout", value: "$9,420", delta: "Nov 18" },
  ]}
/>`,
    node: (
      <KpiRow
        className="lg:grid-cols-3"
        items={[
          { label: "Open invoices", value: "$18,640", delta: "14 invoices" },
          { label: "Overdue", value: "$3,180", delta: "2 customers" },
          { label: "Next payout", value: "$9,420", delta: "Nov 18" },
        ]}
      />
    ),
  },
]
