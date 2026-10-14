"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/registry/ui/separator"

/** OrderSummary — label and value lines above a separator and a bold total, for checkout and invoices. */

type Line = { label: string; value: string }

// Lumen checkout for a Northwind annual plan.
const SAMPLE_LINES: Line[] = [
  { label: "Subtotal", value: "$12,400.00" },
  { label: "Discount (NW-10)", value: "−$1,240.00" },
  { label: "Tax (8%)", value: "$892.80" },
  { label: "Shipping", value: "Free" },
]
const SAMPLE_TOTAL = "$12,052.80"

type OrderSummaryProps = {
  lines?: Line[]
  total?: string
  className?: string
}

function OrderSummary({
  lines = SAMPLE_LINES,
  total = SAMPLE_TOTAL,
  className,
}: OrderSummaryProps) {
  return (
    <div data-slot="order-summary" className={cn("min-w-72 space-y-3 rounded-xl border border-border bg-surface p-4", className)}>
      {lines.map((l) => (
        <div key={l.label} className="flex justify-between text-sm">
          <span className="text-fg-muted">{l.label}</span>
          <span className="tabular-nums text-fg">{l.value}</span>
        </div>
      ))}
      <Separator />
      <div className="flex justify-between text-sm font-medium">
        <span className="text-fg">Total</span>
        <span className="tabular-nums text-fg">{total}</span>
      </div>
    </div>
  )
}
export { OrderSummary }
export type { OrderSummaryProps, Line as OrderSummaryLine }
