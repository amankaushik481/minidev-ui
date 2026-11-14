"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A day's events as a simple time and title list, with optional meta under each entry.
 *
 * Use in a sidebar or dashboard card for "Today". Prefer `EventCalendar` for a week or month view
 * with event blocks, and `CalendarMonth` to pick a date. Marked up as a list; times are `<time>`.
 *
 * @example
 * <CalendarAgenda items={[{ id: "1", time: "09:00", title: "Finance standup", meta: "15 min" }]} />
 */
type AgendaItem = {
  /** Stable key. */
  id: string
  /** Start time as shown, e.g. "09:00" or "2:30 PM". A 24h "HH:MM" also becomes the machine-readable datetime. */
  time: string
  title: string
  /** Second line: attendees, place or duration. */
  meta?: string
}

type CalendarAgendaProps = {
  /** Events in time order. Omit for sample data. */
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

function CalendarAgenda({ items = SAMPLE_ITEMS, className }: CalendarAgendaProps) {
  return (
    <ul data-slot="calendar-agenda" className={cn("w-full max-w-md divide-y divide-border rounded-xl border border-border", className)}>
      {items.length === 0 ? <li className="px-3 py-6 text-center text-sm text-fg-muted">Nothing scheduled.</li> : null}
      {items.map((item) => (
        <li key={item.id} className="flex gap-3 px-3 py-3">
          <time dateTime={/^\d{2}:\d{2}$/.test(item.time) ? item.time : undefined} className="w-16 shrink-0 text-xs tabular-nums text-fg-muted">{item.time}</time>
          <div className="min-w-0">
            <p className="text-sm font-medium text-fg">{item.title}</p>
            {item.meta ? <p className="text-xs text-fg-muted">{item.meta}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  )
}
export { CalendarAgenda }
export type { CalendarAgendaProps, AgendaItem }
