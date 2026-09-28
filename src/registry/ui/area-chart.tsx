"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** Monotone cubic interpolation — smooth without overshooting the data. */
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

const TONES = {
  accent: "text-accent",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
  neutral: "text-fg-muted",
} as const

/**
 * AreaChart — smooth line, hairline grid, gradient wash. Strokes stay 1.5px at
 * any size (non-scaling), and an optional highlight pins a value.
 */
function AreaChart({
  data,
  className,
  label = "Area chart",
  grid = true,
  smooth = true,
  highlight,
  tone = "accent",
}: {
  data: number[]
  className?: string
  label?: string
  grid?: boolean
  smooth?: boolean
  /** Index of a point to mark with a dot and a hairline crosshair. */
  highlight?: number
  tone?: keyof typeof TONES
}) {
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
  const line = smooth ? smoothPath(pts) : pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ")
  const area = `${line} L${w},${h} L0,${h} Z`
  const hp = highlight != null ? pts[Math.max(0, Math.min(pts.length - 1, highlight))] : null
  return (
    <div data-slot="area-chart" className={cn("relative h-32 w-full", TONES[tone], className)}>
      <svg role="img" aria-label={label} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
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
        <path d={area} fill={`url(#ag-${id})`} />
        <path d={line} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        {hp ? <line x1={hp[0]} x2={hp[0]} y1="0" y2={h} stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" vectorEffect="non-scaling-stroke" /> : null}
      </svg>
      {hp ? (
        <span
          aria-hidden
          className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-current shadow-[0_0_0_4px_color-mix(in_oklch,currentColor_18%,transparent)]"
          style={{ left: `${(hp[0] / w) * 100}%`, top: `${(hp[1] / h) * 100}%` }}
        />
      ) : null}
    </div>
  )
}
export { AreaChart, smoothPath }
