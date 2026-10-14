"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** Vertical bars stacked by series, with a legend, for comparing revenue mix across periods. */
type Stack = { label: string; values: number[] }

type StackedBarChartProps = {
  /** One stack per period; `values` line up with `seriesLabels`. Defaults to eight months of Lumen revenue. */
  data?: Stack[]
  /** Names of the stacked series, bottom to top. */
  seriesLabels?: string[]
  className?: string
  label?: string
}

const SAMPLE_SERIES = ["Subscriptions", "Usage", "Services"]

const SAMPLE_DATA: Stack[] = [
  { label: "Jan", values: [48, 14, 6] },
  { label: "Feb", values: [52, 16, 8] },
  { label: "Mar", values: [55, 19, 7] },
  { label: "Apr", values: [61, 18, 10] },
  { label: "May", values: [64, 23, 9] },
  { label: "Jun", values: [70, 24, 12] },
  { label: "Jul", values: [74, 29, 11] },
  { label: "Aug", values: [81, 31, 14] },
]

function StackedBarChart({
  data = SAMPLE_DATA,
  seriesLabels = SAMPLE_SERIES,
  className,
  label = "Stacked bar chart",
}: StackedBarChartProps) {
  const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-5)"]
  const max = Math.max(...data.map((d) => d.values.reduce((a, b) => a + b, 0)), 1)
  return (
    <div data-slot="stacked-bar-chart" role="img" aria-label={label} className={cn("w-full max-w-lg space-y-3", className)}>
      <div className="flex h-40 items-stretch gap-2 border-b border-border">
        {data.map((d) => {
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
export type { StackedBarChartProps, Stack }
