"use client"
import * as React from "react"
import { CheckIcon, MinusIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A free versus premium feature table whose rows fade in as they scroll into view, with a pair of plan buttons below.
 *
 * Exposed to assistive tech as a real table (role table, row, columnheader,
 * rowheader, cell), so each check is read with its feature and plan. A
 * boolean renders a check or a dash, a string renders as text. Scrolls
 * sideways on narrow screens. Use it under pricing cards; for the cards
 * themselves use FreePremiumCompare or a pricing table.
 *
 * @example
 * <FeatureComparison rows={[{ feature: "Team seats", free: "2", premium: "Unlimited" }, { feature: "SSO", free: false, premium: true }]} />
 */
type Row = {
  /** Feature name. Must be unique. */
  feature: string
  /** Free plan value: true for a check, false for a dash, or text. */
  free: boolean | string
  /** Premium plan value: true for a check, false for a dash, or text. */
  premium: boolean | string
}

const SAMPLE_ROWS: Row[] = [
  { feature: "Invoices per month", free: "50", premium: "Unlimited" },
  { feature: "Team seats", free: "2", premium: "Unlimited" },
  { feature: "Multi-currency billing", free: false, premium: true },
  { feature: "Automated payment reminders", free: true, premium: true },
  { feature: "Custom invoice domains", free: false, premium: true },
  { feature: "Audit log and SSO", free: false, premium: true },
  { feature: "API access", free: false, premium: true },
  { feature: "Support", free: "Community", premium: "Priority, 4h" },
]

type FeatureComparisonProps = {
  /** One row per feature. A boolean renders a check or a dash, a string renders as text. */
  rows?: Row[]
  /** Accessible name of the table. */
  label?: string
  className?: string
}

function FeatureComparison({
  rows = SAMPLE_ROWS,
  label = "Free and Premium features compared",
  className,
}: FeatureComparisonProps) {
  const reduce = useReducedMotion()
  const cell = (v: boolean | string) => {
    if (typeof v === "string") return <span className="text-sm text-fg">{v}</span>
    return v ? <CheckIcon role="img" className="size-4 text-success" aria-label="Included" /> : <MinusIcon role="img" className="size-4 text-fg-subtle" aria-label="Not included" />
  }
  return (
    <div data-slot="feature-comparison" data-tier="premium" className={cn("overflow-hidden rounded-2xl border border-border", className)}>
      <div className="overflow-x-auto">
        <div role="table" aria-label={label} className="min-w-[28rem]">
          <div role="row" className="grid grid-cols-3 border-b border-border bg-sunken px-3 py-3 text-[10px] font-medium tracking-[0.01em] text-fg-muted uppercase sm:px-4 sm:text-xs">
            <span role="columnheader">Feature</span>
            <span role="columnheader" className="text-center">Free</span>
            <span role="columnheader" className="text-center text-accent-fg">Premium</span>
          </div>
          {rows.map((r, i) => (
            <motion.div
              key={r.feature}
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={reduce ? { duration: 0 } : { delay: i * 0.03, duration: 0.2, ease: [0.2, 0, 0, 1] }}
              role="row"
              className="grid grid-cols-3 items-center border-b border-border px-3 py-3 last:border-b-0 sm:px-4"
            >
              <span role="rowheader" className="pr-2 text-sm text-fg">{r.feature}</span>
              <span role="cell" className="flex justify-center">{cell(r.free)}</span>
              <span role="cell" className="flex justify-center">{cell(r.premium)}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-surface px-4 py-4 sm:flex-row sm:justify-end">
        <Button variant="outline" className="w-full sm:w-auto">Stay free</Button>
        <Button className="w-full sm:w-auto">Get started</Button>
      </div>
    </div>
  )
}
export { FeatureComparison }
export type { FeatureComparisonProps, Row as FeatureComparisonRow }
