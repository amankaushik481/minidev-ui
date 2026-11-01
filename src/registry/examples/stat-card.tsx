import { ActivityIcon, CreditCardIcon, UsersIcon } from "lucide-react"
import { StatCard } from "@/registry/ui/stat-card"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Metrics row",
    description: "Three cards in a grid; a delta starting with + or − colours itself green or red.",
    code: `<div className="grid w-full max-w-2xl gap-3 sm:grid-cols-3">
  <StatCard label="Monthly revenue" value="$48,210" delta="+12.4%" icon={<CreditCardIcon />} />
  <StatCard label="Active customers" value="1,284" delta="+38" icon={<UsersIcon />} />
  <StatCard label="Invoices sent" value="312" delta="+24" icon={<ActivityIcon />} />
</div>`,
    node: (
      <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-3">
        <StatCard label="Monthly revenue" value="$48,210" delta="+12.4%" icon={<CreditCardIcon />} />
        <StatCard label="Active customers" value="1,284" delta="+38" icon={<UsersIcon />} />
        <StatCard label="Invoices sent" value="312" delta="+24" icon={<ActivityIcon />} />
      </div>
    ),
  },
  {
    title: "Inverted delta",
    description: "For churn, latency or errors, invertDelta makes a drop green and a rise red.",
    code: `<div className="grid w-full max-w-xl gap-3 sm:grid-cols-2">
  <StatCard label="Churn" value="1.8%" delta="−0.4 pts" invertDelta footnote="vs. August" />
  <StatCard label="p95 latency" value="212 ms" delta="+18 ms" invertDelta footnote="lumen-api, last 7 days" />
</div>`,
    node: (
      <div className="grid w-full max-w-xl gap-3 sm:grid-cols-2">
        <StatCard label="Churn" value="1.8%" delta="−0.4 pts" invertDelta footnote="vs. August" />
        <StatCard label="p95 latency" value="212 ms" delta="+18 ms" invertDelta footnote="lumen-api, last 7 days" />
      </div>
    ),
  },
  {
    title: "Footnote and neutral delta",
    description: "A delta that does not start with a sign stays grey; the footnote explains the comparison window.",
    code: `<StatCard
  className="w-64"
  label="Open invoices"
  value="42"
  delta="No change"
  footnote="Compared with the previous 30 days"
/>`,
    node: (
      <StatCard
        className="w-64"
        label="Open invoices"
        value="42"
        delta="No change"
        footnote="Compared with the previous 30 days"
      />
    ),
  },
]
