"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { smoothPath } from "@/registry/ui/area-chart"

/**
 * LineChart — several smooth series on a hairline grid, each in a chart colour with a dot at its latest value.
 *
 * Use it to compare a few series over the same periods (MRR, expansion,
 * churn). For one series with scrubbing use InteractiveAreaChart, for a filled
 * single series use AreaChart, and for a tiny trend use StatSparkline. Add a
 * ChartLegend to name the series visually; `seriesLabels` names them for
 * screen readers.
 *
 * @example
 * <LineChart label="MRR by month" seriesLabels={["Total", "Expansion"]} series={[[12, 14, 17, 19], [4, 5, 6, 8]]} />
 */

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]

// Lumen MRR by month ($k): total, expansion, churn.
const SAMPLE_SERIES: number[][] = [
  [12, 14, 13, 17, 19, 18, 23, 26, 25, 30, 33, 36],
  [4, 5, 6, 6, 8, 9, 9, 11, 12, 14, 15, 17],
  [6, 6, 5, 6, 5, 5, 4, 5, 4, 4, 3, 3],
]

type LineChartProps = {
  /** One array of values per series; all series share the x axis. */
  series?: number[][]
  /** Name of each series, in the same order; added to the accessible description with each series' latest value. */
  seriesLabels?: string[]
  className?: string
  /** Accessible name for the chart. */
  label?: string
  /** Draw the dashed horizontal grid. */
  grid?: boolean
}

function LineChart({
  series = SAMPLE_SERIES,
  seriesLabels,
  className,
  label = "Line chart",
  grid = true,
}: LineChartProps) {
  const flat = series.flat()
  const max = Math.max(...flat, 1)
  const min = Math.min(...flat, 0)
  const w = 320
  const h = 120
  const pad = 6
  const summary = seriesLabels?.length
    ? series.map((data, si) => `${seriesLabels[si] ?? `Series ${si + 1}`}: latest ${data.at(-1) ?? "none"}`).join("; ")
    : undefined
  const toPts = (data: number[]) =>
    data.map((v, i) => [(i / Math.max(data.length - 1, 1)) * w, h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)] as const)
  return (
    <div data-slot="line-chart" className={cn("relative h-32 w-full", className)}>
      <svg role="img" aria-label={summary ? `${label}. ${summary}` : label} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
        {grid
          ? [0, 0.25, 0.5, 0.75, 1].map((f) => (
              <line key={f} x1="0" x2={w} y1={pad + (h - pad * 2) * f} y2={pad + (h - pad * 2) * f} className="stroke-border" strokeWidth="1" strokeDasharray={f === 1 ? undefined : "2 3"} vectorEffect="non-scaling-stroke" />
            ))
          : null}
        {series.map((data, si) => (
          <path key={si} d={smoothPath(toPts(data))} fill="none" stroke={COLORS[si % COLORS.length]} strokeWidth={si === 0 ? 1.75 : 1.5} strokeOpacity={si === 0 ? 1 : 0.85} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {series.map((data, si) => {
        const p = toPts(data).at(-1)
        if (!p) return null
        return (
          <span
            key={si}
            aria-hidden
            className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-surface"
            style={{ left: `${(p[0] / w) * 100}%`, top: `${(p[1] / h) * 100}%`, background: COLORS[si % COLORS.length] }}
          />
        )
      })}
    </div>
  )
}
export { LineChart }
export type { LineChartProps }
