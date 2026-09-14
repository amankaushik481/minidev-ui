"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function LineChart({
  series,
  className,
  label = "Line chart",
}: {
  series: number[][]
  className?: string
  label?: string
}) {
  const flat = series.flat()
  const max = Math.max(...flat, 1)
  const w = 320
  const h = 120
  const colors = ["var(--accent)", "var(--success)", "var(--warning)"]
  return (
    <svg data-slot="line-chart" role="img" aria-label={label} viewBox={`0 0 ${w} ${h}`} className={cn("h-32 w-full", className)}>
      {series.map((data, si) => {
        const pts = data.map((v, i) => {
          const x = (i / Math.max(data.length - 1, 1)) * w
          const y = h - (v / max) * (h - 8) - 4
          return `${i === 0 ? "M" : "L"}${x},${y}`
        }).join(" ")
        return <path key={si} d={pts} fill="none" stroke={colors[si % colors.length]} strokeWidth={2} />
      })}
    </svg>
  )
}
export { LineChart }
