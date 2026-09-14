"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function HeatmapCell({
  intensity = 0,
  label,
  className,
}: {
  intensity?: number
  label?: string
  className?: string
}) {
  const clamped = Math.max(0, Math.min(1, intensity))
  return (
    <div
      data-slot="heatmap-cell"
      role="img"
      title={label}
      aria-label={label ?? `Intensity ${Math.round(clamped * 100)}%`}
      className={cn("size-4 rounded-sm border border-border", className)}
      style={{ backgroundColor: `color-mix(in oklch, var(--accent) ${Math.round(clamped * 100)}%, var(--sunken))` }}
    />
  )
}
export { HeatmapCell }
