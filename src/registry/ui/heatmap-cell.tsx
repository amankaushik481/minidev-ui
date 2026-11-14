"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * HeatmapCell — one square of a heatmap, tinted from sunken to accent by intensity.
 *
 * Use it to build custom grids (activity by hour, usage by day). For a ready
 * year of daily cells use StreakCalendar.
 *
 * @example
 * <HeatmapCell intensity={0.6} label="Tue 14:00, 42 runs" />
 */
type HeatmapCellProps = {
  /** Strength from 0 to 1; clamped. 0 is the sunken surface, 1 is full accent. */
  intensity?: number
  /** Accessible name and tooltip, for example the date and count. Defaults to the intensity as a percentage. */
  label?: string
  className?: string
}

function HeatmapCell({ intensity = 0, label, className }: HeatmapCellProps) {
  const pct = Math.round(Math.max(0, Math.min(1, intensity)) * 100)
  return (
    <div
      data-slot="heatmap-cell"
      role="img"
      title={label}
      aria-label={label ?? `Intensity ${pct}%`}
      className={cn("size-4 rounded-sm border border-border", className)}
      style={{ backgroundColor: `color-mix(in oklch, var(--accent) ${pct}%, var(--sunken))` }}
    />
  )
}
export { HeatmapCell }
export type { HeatmapCellProps }
