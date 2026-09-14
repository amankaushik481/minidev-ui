"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function GoalRing({
  value = 72,
  label = "Weekly goal",
  className,
}: {
  value?: number
  label?: string
  className?: string
}) {
  const r = 36
  const c = 2 * Math.PI * r
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c
  return (
    <div data-slot="goal-ring" className={cn("inline-flex flex-col items-center gap-2", className)}>
      <svg width="96" height="96" viewBox="0 0 96 96" aria-label={`${label}: ${value}%`}>
        <circle cx="48" cy="48" r={r} fill="none" className="stroke-sunken" strokeWidth="8" />
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          className="stroke-accent"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 48 48)"
        />
        <text x="48" y="52" textAnchor="middle" className="fill-fg text-sm font-medium" style={{ fontSize: 16 }}>{value}%</text>
      </svg>
      <p className="text-xs text-fg-muted">{label}</p>
    </div>
  )
}
export { GoalRing }
