"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * OrderSummary — label and value lines above a separator and a bold total, for checkout and invoices.
 *
 * Marked up as a description list (dt/dd) so each amount is read with its label.
 * Values are preformatted strings: format money with Intl.NumberFormat before passing
 * it in. Use it beside a checkout form; for a full price table use PricingTable.
 *
 * @example
 * <OrderSummary
 *   lines={[{ label: "Subtotal", value: "$120.00" }, { label: "Tax", value: "$9.60" }]}
 *   total="$129.60"
 * />
 */

type Line = {
  /** Row name, e.g. "Subtotal". Also the row key, so keep it unique. */
  label: string
  /** Preformatted amount, e.g. "$12,400.00" or "Free". */
  value: string
}

// Lumen checkout for a Northwind annual plan.
const SAMPLE_LINES: Line[] = [
  { label: "Subtotal", value: "$12,400.00" },
  { label: "Discount (NW-10)", value: "−$1,240.00" },
  { label: "Tax (8%)", value: "$892.80" },
  { label: "Shipping", value: "Free" },
]
const SAMPLE_TOTAL = "$12,052.80"

type OrderSummaryProps = {
  /** Rows above the total, in order. */
  lines?: Line[]
  /** Preformatted grand total. */
  total?: string
  /** Label for the total row. */
  totalLabel?: string
  className?: string
}

function OrderSummary({
  lines = SAMPLE_LINES,
  total = SAMPLE_TOTAL,
  totalLabel = "Total",
  className,
}: OrderSummaryProps) {
  return (
    <dl data-slot="order-summary" className={cn("min-w-72 space-y-3 rounded-xl border border-border bg-surface p-4", className)}>
      {lines.map((l) => (
        <div key={l.label} className="flex justify-between gap-4 text-sm">
          <dt className="text-fg-muted">{l.label}</dt>
          <dd className="tabular-nums text-fg">{l.value}</dd>
        </div>
      ))}
      {/* A border, not <Separator />: a <dl> may only hold dt/dd groups. */}
      <div className="flex justify-between gap-4 border-t border-border pt-3 text-sm font-medium">
        <dt className="text-fg">{totalLabel}</dt>
        <dd className="tabular-nums text-fg">{total}</dd>
      </div>
    </dl>
  )
}
export { OrderSummary }
export type { OrderSummaryProps, Line as OrderSummaryLine }
