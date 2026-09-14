"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function BarChart({
  data,
  className,
  label = "Bar chart",
}: {
  data: { label: string; value: number }[]
  className?: string
  label?: string
}) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div data-slot="bar-chart" role="img" aria-label={label} className={cn("flex h-36 items-end gap-2", className)}>
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
          <div className="flex w-full flex-1 items-end">
            <div className="w-full rounded-t-md bg-accent" style={{ height: `${(d.value / max) * 100}%` }} title={`${d.label}: ${d.value}`} />
          </div>
          <span className="text-[10px] text-fg-muted">{d.label}</span>
        </div>
      ))}
    </div>
  )
}
export { BarChart }
