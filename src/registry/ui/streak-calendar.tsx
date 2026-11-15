"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A 7-column grid of day tiles, filled in accent on active days, for habit and contribution streaks.
 *
 * Use on a profile or dashboard card for a month of habit or activity days. Days are numbered
 * from 1 and fill rows of seven with no weekday labels. Screen readers hear a summary
 * ("17 of 28 days active"). For a year-long contribution graph build rows of HeatmapCell.
 *
 * @example
 * <StreakCalendar active={[1, 2, 3, 5, 8]} days={28} />
 */
type StreakCalendarProps = {
  /** Active day numbers, 1-based. */
  active?: number[]
  /** How many days to show, in rows of seven. */
  days?: number
  /** Heading above the grid. Defaults to "{days}-day streak". */
  title?: string
  className?: string
}

function StreakCalendar({ active = [1, 2, 3, 5, 8, 9, 10, 12, 15, 16], days = 28, title, className }: StreakCalendarProps) {
  const on = new Set(active)
  const count = active.filter((d) => d >= 1 && d <= days).length
  return (
    <div data-slot="streak-calendar" className={cn("space-y-2", className)}>
      <p className="text-xs font-medium text-fg">{title ?? `${days}-day streak`}</p>
      <div className="grid grid-cols-7 gap-1.5" role="img" aria-label={`${count} of ${days} days active`}>
        {Array.from({ length: days }, (_, i) => i + 1).map((d) => (
          <div
            key={d}
            data-active={on.has(d) || undefined}
            className={cn("aspect-square rounded-md border", on.has(d) ? "border-accent/40 bg-accent" : "border-border bg-sunken")}
          />
        ))}
      </div>
    </div>
  )
}
export { StreakCalendar }
export type { StreakCalendarProps }
