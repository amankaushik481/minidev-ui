"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { smoothPath } from "@/registry/ui/area-chart"

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]

/** LineChart — multiple smooth series on a hairline grid, with end-point dots. */
function LineChart({
  series,
  className,
  label = "Line chart",
  grid = true,
}: {
  series: number[][]
  className?: string
  label?: string
  grid?: boolean
}) {
  const flat = series.flat()
  const max = Math.max(...flat, 1)
  const min = Math.min(...flat, 0)
  const w = 320
  const h = 120
  const pad = 6
  const toPts = (data: number[]) =>
    data.map((v, i) => [(i / Math.max(data.length - 1, 1)) * w, h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)] as const)
  return (
    <div data-slot="line-chart" className={cn("relative h-32 w-full", className)}>
      <svg role="img" aria-label={label} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
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
