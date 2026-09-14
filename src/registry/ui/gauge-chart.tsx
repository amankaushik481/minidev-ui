"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function GaugeChart({
  value,
  max = 100,
  label = "Gauge",
  className,
}: {
  value: number
  max?: number
  label?: string
  className?: string
}) {
  const pct = Math.max(0, Math.min(1, value / max))
  const r = 40
  const c = Math.PI * r
  const dash = pct * c
  return (
    <div data-slot="gauge-chart" className={cn("inline-flex flex-col items-center", className)}>
      <svg role="img" aria-label={`${label}: ${Math.round(pct * 100)}%`} viewBox="0 0 100 60" className="h-20 w-36">
        <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="var(--sunken)" strokeWidth="8" strokeLinecap="round" />
        <path
          d="M10 50 A40 40 0 0 1 90 50"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
        />
        <text x="50" y="48" textAnchor="middle" className="fill-fg" style={{ fontSize: 14, fontWeight: 500 }}>
          {Math.round(pct * 100)}%
        </text>
      </svg>
      <span className="text-xs text-fg-muted">{label}</span>
    </div>
  )
}
export { GaugeChart }
