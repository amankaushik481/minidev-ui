"use client"
import { cn } from "@/lib/utils"
import { CheckIcon, MinusIcon } from "lucide-react"

/** A feature-by-plan matrix: one row per feature, a check, a dash or a value per plan. */
type Plan = { name: string; values: (boolean | string)[] }

const SAMPLE_FEATURES: string[] = [
  "Invoices per month",
  "Team seats",
  "Multi-currency billing",
  "Automated reminders",
  "Custom domains",
  "Audit log",
  "API access",
  "Priority support",
]

const SAMPLE_PLANS: Plan[] = [
  { name: "Starter", values: ["50", "2", false, true, false, false, false, false] },
  { name: "Growth", values: ["500", "10", true, true, true, false, true, false] },
  { name: "Scale", values: ["Unlimited", "Unlimited", true, true, true, true, true, true] },
]

type ComparisonTableProps = {
  /** Row labels, in order. Each plan's `values` line up with them by index. */
  features?: string[]
  /** Columns. A boolean renders a check or a dash, a string renders as text. */
  plans?: Plan[]
  className?: string
}

function ComparisonTable({ features = SAMPLE_FEATURES, plans = SAMPLE_PLANS, className }: ComparisonTableProps) {
  return (
    <div data-slot="comparison-table" className={cn("overflow-x-auto rounded-xl border border-border", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-sunken text-left">
            <th className="px-3 py-2 text-xs font-medium text-fg-muted">Feature</th>
            {plans.map((p) => <th key={p.name} className="px-3 py-2 text-xs font-medium text-fg">{p.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={f} className="border-b border-border last:border-b-0">
              <td className="px-3 py-2 text-fg-muted">{f}</td>
              {plans.map((p) => {
                const v = p.values[i]
                return <td key={p.name} className="px-3 py-2">{typeof v === "boolean" ? (v ? <CheckIcon className="size-4 text-success" aria-label="Included" /> : <MinusIcon className="size-4 text-fg-subtle" aria-label="Not included" />) : v}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export { ComparisonTable }
export type { ComparisonTableProps, Plan as ComparisonTablePlan }
