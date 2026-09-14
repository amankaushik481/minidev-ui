"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function StatCard({ label, value, delta, className }: {
  label: React.ReactNode
  value: React.ReactNode
  delta?: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="stat-card" className={cn("rounded-xl border border-border bg-surface p-4 shadow-[inset_0_1px_0_oklch(1_0_0/0.6)]", className)}>
      <p className="text-xs font-medium tracking-[0.01em] text-fg-muted">{label}</p>
      <p className="mt-2 text-2xl font-medium tracking-[-0.018em] tabular-nums text-fg">{value}</p>
      {delta ? <p className="mt-1 text-xs text-fg-muted">{delta}</p> : null}
    </div>
  )
}
export { StatCard }
