import { Badge } from "@/registry/ui/badge"
import { CalendarAgenda, type AgendaItem } from "@/registry/ui/calendar-agenda"
import type { Example } from "./types"

const THURSDAY: AgendaItem[] = [
  { id: "t1", time: "08:30", title: "Northwind onboarding call", meta: "Theo Okafor · Zoom" },
  { id: "t2", time: "11:00", title: "Review INV-2041 dispute", meta: "Maya Chen · 30 min" },
  { id: "t3", time: "13:30", title: "Lumen pricing page copy", meta: "Priya Raman · Draft due" },
  { id: "t4", time: "17:00", title: "Weekly deploy window", meta: "Sam Lowe · lumen-api" },
]

const SHORT_DAY: AgendaItem[] = [
  { id: "s1", time: "10:00", title: "Board update" },
  { id: "s2", time: "15:00", title: "Customer interview: Helix Biotech" },
]

export const examples: Example[] = [
  {
    title: "Custom items",
    description: "Pass your own items with a time, a title and an optional meta line; order them yourself.",
    code: `const THURSDAY: AgendaItem[] = [
  { id: "t1", time: "08:30", title: "Northwind onboarding call", meta: "Theo Okafor · Zoom" },
  { id: "t2", time: "11:00", title: "Review INV-2041 dispute", meta: "Maya Chen · 30 min" },
  { id: "t3", time: "13:30", title: "Lumen pricing page copy", meta: "Priya Raman · Draft due" },
  { id: "t4", time: "17:00", title: "Weekly deploy window", meta: "Sam Lowe · lumen-api" },
]

<CalendarAgenda items={THURSDAY} className="bg-surface" />`,
    node: <CalendarAgenda items={THURSDAY} className="bg-surface" />,
  },
  {
    title: "With a day header",
    description: "Put the date above the list and remove the top radius so the two read as one card.",
    code: `const SHORT_DAY: AgendaItem[] = [
  { id: "s1", time: "10:00", title: "Board update" },
  { id: "s2", time: "15:00", title: "Customer interview: Helix Biotech" },
]

<div className="w-full max-w-md">
  <div className="flex items-center justify-between rounded-t-xl border border-b-0 border-border bg-sunken px-3 py-2">
    <p className="text-sm font-medium text-fg">Thursday, Oct 16</p>
    <Badge variant="secondary">2 events</Badge>
  </div>
  <CalendarAgenda items={SHORT_DAY} className="rounded-t-none bg-surface" />
</div>`,
    node: (
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between rounded-t-xl border border-b-0 border-border bg-sunken px-3 py-2">
          <p className="text-sm font-medium text-fg">Thursday, Oct 16</p>
          <Badge variant="secondary">2 events</Badge>
        </div>
        <CalendarAgenda items={SHORT_DAY} className="rounded-t-none bg-surface" />
      </div>
    ),
  },
]
