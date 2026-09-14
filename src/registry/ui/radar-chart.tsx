"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function RadarChart({
  labels,
  values,
  className,
  label = "Radar chart",
}: {
  labels: string[]
  values: number[]
  className?: string
  label?: string
}) {
  const n = labels.length
  const cx = 80
  const cy = 80
  const r = 56
  const pts = values.map((v, i) => {
    const a = (-Math.PI / 2) + (i / n) * Math.PI * 2
    const rr = r * Math.max(0, Math.min(1, v))
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr] as const
  })
  const poly = pts.map(([x, y]) => `${x},${y}`).join(" ")
  const rings = [0.25, 0.5, 0.75, 1]
  return (
    <svg data-slot="radar-chart" role="img" aria-label={label} viewBox="0 0 160 160" className={cn("size-48 text-accent", className)}>
      {rings.map((ring) => (
        <polygon
          key={ring}
          fill="none"
          stroke="var(--border)"
          points={labels.map((_, i) => {
            const a = (-Math.PI / 2) + (i / n) * Math.PI * 2
            return `${cx + Math.cos(a) * r * ring},${cy + Math.sin(a) * r * ring}`
          }).join(" ")}
        />
      ))}
      {labels.map((lab, i) => {
        const a = (-Math.PI / 2) + (i / n) * Math.PI * 2
        const x = cx + Math.cos(a) * (r + 14)
        const y = cy + Math.sin(a) * (r + 14)
        return <text key={lab} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-fg-muted" style={{ fontSize: 8 }}>{lab}</text>
      })}
      <polygon points={poly} fill="currentColor" opacity={0.2} stroke="currentColor" strokeWidth={1.5} />
    </svg>
  )
}
export { RadarChart }
