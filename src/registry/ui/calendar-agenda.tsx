"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
function CalendarAgenda({
  items,
  className,
}: {
  items: { id: string; time: string; title: string; meta?: string }[]
  className?: string
}) {
  return (
    <div data-slot="calendar-agenda" className={cn("divide-y divide-border rounded-xl border border-border", className)}>
      {items.map((item) => (
        <div key={item.id} className="flex gap-3 px-3 py-3">
          <time className="w-16 shrink-0 text-xs tabular-nums text-fg-muted">{item.time}</time>
          <div className="min-w-0">
            <p className="text-sm font-medium text-fg">{item.title}</p>
            {item.meta ? <p className="text-xs text-fg-muted">{item.meta}</p> : null}
          </div>
        </div>
      ))}
    </div>
  )
}
export { CalendarAgenda }
