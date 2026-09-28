"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type Stack = { label: string; values: number[] }

function StackedBarChart({
  data,
  seriesLabels,
  className,
  label = "Stacked bar chart",
}: {
  data: Stack[]
  seriesLabels: string[]
  className?: string
  label?: string
}) {
  const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-5)"]
  const max = Math.max(...data.map((d) => d.values.reduce((a, b) => a + b, 0)), 1)
  return (
    <div data-slot="stacked-bar-chart" role="img" aria-label={label} className={cn("space-y-3", className)}>
      <div className="flex h-40 items-stretch gap-2 border-b border-border">
        {data.map((d) => {
          const total = d.values.reduce((a, b) => a + b, 0)
          return (
            <div key={d.label} className="flex min-h-0 flex-1 flex-col items-center">
              <div className="flex min-h-0 w-full flex-1 flex-col justify-end gap-px overflow-hidden rounded-t-[5px]">
                {[...d.values].reverse().map((v, i) => {
                  const idx = d.values.length - 1 - i
                  return (
                    <div
                      key={idx}
                      title={`${seriesLabels[idx]}: ${v}`}
                      style={{ height: `${(v / max) * 100}%`, background: colors[idx % colors.length] }}
                      className="w-full"
                    />
                  )
                })}
              </div>
              </div>
          )
        })}
      </div>
      <div className="-mt-1 flex gap-2">
        {data.map((d) => (
          <span key={d.label} className="flex-1 text-center font-mono text-[10px] text-fg-subtle">{d.label}</span>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {seriesLabels.map((s, i) => (
          <span key={s} className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
            <span className="size-2 rounded-sm" style={{ background: colors[i % colors.length] }} aria-hidden />
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}
export { StackedBarChart }
