"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function DonutChart({
  value,
  max = 100,
  className,
  label = "Donut",
}: {
  value: number
  max?: number
  className?: string
  label?: string
}) {
  const pct = Math.max(0, Math.min(1, value / max))
  const r = 36
  const c = 2 * Math.PI * r
  const dash = pct * c
  return (
    <svg data-slot="donut-chart" role="img" aria-label={`${label}: ${Math.round(pct * 100)}%`} viewBox="0 0 96 96" className={cn("size-24", className)}>
      <circle cx="48" cy="48" r={r} fill="none" stroke="var(--sunken)" strokeWidth="10" />
      <circle
        cx="48"
        cy="48"
        r={r}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c - dash}`}
        transform="rotate(-90 48 48)"
      />
      <text x="48" y="52" textAnchor="middle" className="fill-fg text-[14px] font-medium" style={{ fontSize: 14 }}>
        {Math.round(pct * 100)}%
      </text>
    </svg>
  )
}
export { DonutChart }
