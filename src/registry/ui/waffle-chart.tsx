"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function WaffleChart({
  value = 42,
  total = 100,
  label = "Adoption",
  className,
}: {
  value?: number
  total?: number
  label?: string
  className?: string
}) {
  const cells = Array.from({ length: total }, (_, i) => i < value)
  return (
    <div data-slot="waffle-chart" className={cn("space-y-2", className)}>
      <div className="flex justify-between text-xs">
        <span className="font-medium text-fg">{label}</span>
        <span className="tabular-nums text-fg-muted">{value}/{total}</span>
      </div>
      <div className="grid grid-cols-10 gap-1" role="img" aria-label={`${label}: ${value} of ${total}`}>
        {cells.map((on, i) => (
          <div key={i} className={cn("aspect-square rounded-[2px]", on ? "bg-accent" : "bg-sunken")} />
        ))}
      </div>
    </div>
  )
}
export { WaffleChart }
