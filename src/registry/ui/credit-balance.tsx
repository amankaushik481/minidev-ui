"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function CreditBalance({
  balance,
  label = "Credits",
  className,
}: {
  balance: string
  label?: string
  className?: string
}) {
  return (
    <div
      data-slot="credit-balance"
      className={cn(
        "inline-flex items-baseline gap-2 rounded-xl border border-border bg-sunken px-3 py-2",
        className
      )}
    >
      <span className="text-xs text-fg-muted">{label}</span>
      <span className="text-lg font-medium tracking-[-0.008em] tabular-nums text-fg">{balance}</span>
    </div>
  )
}
export { CreditBalance }
