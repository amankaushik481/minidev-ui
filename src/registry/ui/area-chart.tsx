"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function AreaChart({
  data,
  className,
  label = "Area chart",
}: {
  data: number[]
  className?: string
  label?: string
}) {
  const max = Math.max(...data, 1)
  const w = 320
  const h = 120
  const pts = data.map((v, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * w
    const y = h - (v / max) * (h - 8) - 4
    return [x, y] as const
  })
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ")
  const area = `${line} L${w},${h} L0,${h} Z`
  return (
    <svg data-slot="area-chart" role="img" aria-label={label} viewBox={`0 0 ${w} ${h}`} className={cn("h-32 w-full text-accent", className)}>
      <path d={area} fill="currentColor" opacity={0.15} />
      <path d={line} fill="none" stroke="currentColor" strokeWidth={2} />
    </svg>
  )
}
export { AreaChart }
