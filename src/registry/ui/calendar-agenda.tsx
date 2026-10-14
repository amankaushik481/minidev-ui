"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type AgendaItem = { id: string; time: string; title: string; meta?: string }

type CalendarAgendaProps = {
  items?: AgendaItem[]
  className?: string
}

const SAMPLE_ITEMS: AgendaItem[] = [
  { id: "e1", time: "09:00", title: "Finance standup", meta: "Lumen team · 15 min" },
  { id: "e2", time: "10:30", title: "Northwind renewal review", meta: "Maya Chen, Theo Okafor" },
  { id: "e3", time: "12:00", title: "Lunch with Priya Raman", meta: "Juniper Café" },
  { id: "e4", time: "14:00", title: "Invoice run: INV-2041 to INV-2058", meta: "Automated · needs approval" },
  { id: "e5", time: "16:30", title: "Deploy lumen-web v2.4.0", meta: "Sam Lowe · staging first" },
]

/** A day's events as a simple time and title list, with optional meta under each entry. */
function CalendarAgenda({ items = SAMPLE_ITEMS, className }: CalendarAgendaProps) {
  return (
    <div data-slot="calendar-agenda" className={cn("w-full max-w-md divide-y divide-border rounded-xl border border-border", className)}>
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
export type { CalendarAgendaProps, AgendaItem }
