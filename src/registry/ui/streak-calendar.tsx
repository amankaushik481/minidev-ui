"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function StreakCalendar({
  active = [1, 2, 3, 5, 8, 9, 10, 12, 15, 16],
  className,
}: {
  active?: number[]
  className?: string
}) {
  const days = Array.from({ length: 28 }, (_, i) => i + 1)
  return (
    <div data-slot="streak-calendar" className={cn("space-y-2", className)}>
      <p className="text-xs font-medium text-fg">28-day streak</p>
      <div className="grid grid-cols-7 gap-1.5" role="img" aria-label="Activity streak calendar">
        {days.map((d) => (
          <div
            key={d}
            className={cn(
              "aspect-square rounded-md border border-border",
              active.includes(d) ? "bg-accent border-accent/40" : "bg-sunken"
            )}
            title={`Day ${d}`}
          />
        ))}
      </div>
    </div>
  )
}
export { StreakCalendar }
