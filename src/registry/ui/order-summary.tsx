"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/registry/ui/separator"

type Line = { label: string; value: string }

function OrderSummary({
  lines,
  total,
  className,
}: {
  lines: Line[]
  total: string
  className?: string
}) {
  return (
    <div data-slot="order-summary" className={cn("space-y-3 rounded-xl border border-border bg-surface p-4", className)}>
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
