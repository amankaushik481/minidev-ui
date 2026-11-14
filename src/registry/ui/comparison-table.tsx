"use client"
import * as React from "react"
import { CheckIcon, MinusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A feature-by-plan matrix: one row per feature, a check, a dash or a value per plan.
 *
 * Use under pricing cards to compare plans in detail. For the plan cards themselves use PricingTable or PlanCard;
 * for comparing AI models use ModelCompare. Checks and dashes carry screen-reader text ("Included" / "Not included").
 *
 * @example
 * <ComparisonTable
 *   features={["Seats", "Audit log"]}
 *   plans={[{ name: "Starter", values: ["2", false] }, { name: "Scale", values: ["Unlimited", true] }]}
 * />
 */
type Plan = {
  /** Column heading; also the React key, so keep names unique. */
  name: string
  /** One value per feature, by index: true = check, false = dash, string = text. */
  values: (boolean | string)[]
}

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
  /** Visible heading of the first column. Defaults to "Feature". */
  featureLabel?: string
  /** Table caption for screen readers, e.g. "Plan comparison". */
  caption?: string
  className?: string
}

function ComparisonTable({ features = SAMPLE_FEATURES, plans = SAMPLE_PLANS, featureLabel = "Feature", caption = "Plan comparison", className }: ComparisonTableProps) {
  return (
    <div data-slot="comparison-table" className={cn("overflow-x-auto rounded-xl border border-border", className)}>
      <table className="w-full text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border bg-sunken text-left">
            <th scope="col" className="px-3 py-2 text-xs font-medium text-fg-muted">{featureLabel}</th>
            {plans.map((p) => <th key={p.name} scope="col" className="px-3 py-2 text-xs font-medium text-fg">{p.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={f} className="border-b border-border last:border-b-0">
              <th scope="row" className="px-3 py-2 text-left font-normal text-fg-muted">{f}</th>
              {plans.map((p) => {
                const v = p.values[i]
                return (
                  <td key={p.name} className="px-3 py-2 text-fg tabular-nums">
                    {typeof v === "boolean" ? (
                      <>
                        {v ? <CheckIcon aria-hidden className="size-4 text-success" /> : <MinusIcon aria-hidden className="size-4 text-fg-subtle" />}
                        <span className="sr-only">{v ? "Included" : "Not included"}</span>
                      </>
                    ) : (
                      v
                    )}
                  </td>
                )
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
