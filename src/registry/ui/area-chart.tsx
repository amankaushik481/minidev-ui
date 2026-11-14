"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A smooth area chart with a hairline grid and gradient wash; strokes stay 1.5px at any size and a highlight can pin one value.
 *
 * Use for a single trend over time in a card or KPI tile (no axes, no tooltip). Prefer
 * `InteractiveAreaChart` for hover tooltips and axes, `LineChart` for several series, and `BarChart`
 * for discrete periods. Screen readers get `label` plus a summary (count, first, last, peak).
 * It fills its container: size it with `className` (default `h-32 w-full`).
 *
 * @example
 * <AreaChart data={[18, 22, 27, 31, 36, 45, 52]} label="Weekly revenue, $k" tone="success" highlight={6} />
 */

// Monotone cubic interpolation: smooth without overshooting the data.
function smoothPath(pts: readonly (readonly [number, number])[]) {
  if (pts.length < 2) return pts.length ? `M${pts[0][0]},${pts[0][1]}` : ""
  const n = pts.length
  const dx: number[] = [], m: number[] = [], t: number[] = []
  for (let i = 0; i < n - 1; i++) {
    dx[i] = pts[i + 1][0] - pts[i][0]
    m[i] = (pts[i + 1][1] - pts[i][1]) / (dx[i] || 1)
  }
  t[0] = m[0]
  t[n - 1] = m[n - 2]
  for (let i = 1; i < n - 1; i++) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3
    d += ` C${pts[i][0] + h},${pts[i][1] + t[i] * h} ${pts[i + 1][0] - h},${pts[i + 1][1] - t[i + 1] * h} ${pts[i + 1][0]},${pts[i + 1][1]}`
  }
  return d
}

const TONES: Record<AreaChartTone, string> = {
  accent: "text-accent",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
  neutral: "text-fg-muted",
}

// Twelve weeks of Lumen revenue, in thousands.
const SAMPLE_DATA = [18, 22, 21, 27, 31, 29, 36, 40, 38, 45, 52, 49]

type AreaChartTone = "accent" | "success" | "warning" | "danger" | "info" | "neutral"

type AreaChartProps = {
  /** Series values, left to right. Omit for sample data. */
  data?: number[]
  className?: string
  /** Accessible name; a short data summary is appended for screen readers. */
  label?: string
  /** Three dashed hairlines at 25/50/75%. */
  grid?: boolean
  /** Monotone curve (never overshoots the data) instead of straight segments. */
  smooth?: boolean
  /** Index of a point to mark with a dot and a hairline crosshair. */
  highlight?: number
  /** Stroke and wash colour, from the status tokens. */
  tone?: AreaChartTone
}

function AreaChart({
  data = SAMPLE_DATA,
  className,
  label = "Area chart",
  grid = true,
  smooth = true,
  highlight,
  tone = "accent",
}: AreaChartProps) {
  const id = React.useId().replace(/:/g, "")
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const w = 320
  const h = 120
  const pad = 6
  const pts = data.map((v, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * w
    const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)
    return [x, y] as const
  })
  const summary = data.length ? `${label}. ${data.length} values, from ${data[0].toLocaleString("en-US")} to ${data[data.length - 1].toLocaleString("en-US")}, peak ${Math.max(...data).toLocaleString("en-US")}.` : `${label}. No data.`
  const line = smooth ? smoothPath(pts) : pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ")
  const area = pts.length ? `${line} L${pts[pts.length - 1][0]},${h} L0,${h} Z` : ""
  const hp = highlight != null && pts.length ? pts[Math.max(0, Math.min(pts.length - 1, highlight))] : null
  return (
    <div data-slot="area-chart" className={cn("relative h-32 w-full", TONES[tone], className)}>
      <svg role="img" aria-label={summary} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <linearGradient id={`ag-${id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        {grid
          ? [0.25, 0.5, 0.75].map((f) => (
              <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} className="stroke-border" strokeWidth="1" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
            ))
          : null}
        {area ? <path d={area} fill={`url(#ag-${id})`} /> : null}
        {line ? <path d={line} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" /> : null}
        {hp ? <line x1={hp[0]} x2={hp[0]} y1="0" y2={h} stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" vectorEffect="non-scaling-stroke" /> : null}
      </svg>
      {hp ? (
        <span
          aria-hidden
          className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-current ring-4 ring-current/20"
          style={{ left: `${(hp[0] / w) * 100}%`, top: `${(hp[1] / h) * 100}%` }}
        />
      ) : null}
    </div>
  )
}
export { AreaChart, smoothPath }
export type { AreaChartProps, AreaChartTone }
