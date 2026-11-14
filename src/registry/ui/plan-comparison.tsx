"use client"
import * as React from "react"
import { CheckIcon, MinusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * PlanComparison — a feature-by-plan table with check marks, dashes or short values in each cell.
 *
 * A real <table> with column and row headers; icon cells carry "Included" / "Not
 * included" for screen readers. Pass `plans` for the columns and `rows` with one
 * value per plan: true, false, or a string such as "10 seats". Scrolls sideways on
 * narrow screens. Pair it with PlanCard tiers above.
 *
 * @example
 * <PlanComparison
 *   plans={["Free", "Pro", "Business"]}
 *   rows={[
 *     { feature: "Seats", values: ["1", "10", "Unlimited"] },
 *     { feature: "SSO", values: [false, false, true] },
 *   ]}
 * />
 */
type PlanComparisonRow = {
  /** Feature name in the first column; also the row key. */
  feature: string
  /** One cell per plan, in `plans` order: true (check), false (dash) or text. */
  values: (boolean | string)[]
}

type PlanComparisonProps = {
  /** Column headings, one per plan. */
  plans?: string[]
  /** Feature rows. */
  rows?: PlanComparisonRow[]
  /** Accessible caption for the table. */
  caption?: string
  className?: string
}

const PLANS = ["Free", "Pro"]
const ROWS: PlanComparisonRow[] = [
  { feature: "Free UI primitives", values: [true, true] },
  { feature: "Gallery + docs", values: [true, true] },
  { feature: "Premium kinetic kits", values: [false, true] },
  { feature: "Client showcase", values: [false, true] },
  { feature: "Priority craft updates", values: [false, true] },
]

function Cell({ value }: { value: boolean | string | undefined }) {
  if (typeof value === "string") return <span className="text-fg tabular-nums">{value}</span>
  return value ? (
    <>
      <CheckIcon aria-hidden className="size-4 text-accent" />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <MinusIcon aria-hidden className="size-4 text-fg-subtle" />
      <span className="sr-only">Not included</span>
    </>
  )
}

function PlanComparison({ plans = PLANS, rows = ROWS, caption = "Plan comparison", className }: PlanComparisonProps) {
  return (
    <div data-slot="plan-comparison" className={cn("overflow-x-auto rounded-2xl border border-border bg-surface shadow-highlight", className)}>
      <table className="w-full text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border text-left">
            <th scope="col" className="px-4 py-3 font-medium text-fg">Feature</th>
            {plans.map((p) => (
              <th key={p} scope="col" className="px-4 py-3 font-medium text-fg">{p}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.feature} className="border-b border-border last:border-b-0">
              <th scope="row" className="px-4 py-2.5 text-left font-normal text-fg-muted">{r.feature}</th>
              {plans.map((p, i) => (
                <td key={p} className="px-4 py-2.5">
                  <Cell value={r.values[i]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export { PlanComparison }
export type { PlanComparisonProps, PlanComparisonRow }
