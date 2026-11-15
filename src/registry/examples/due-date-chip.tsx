"use client"
import { DueDateChip } from "@/registry/ui/due-date-chip"
import type { Example } from "./types"

const today = new Date("2026-11-15T00:00:00Z")
const bills = [
  { id: "INV-2039", due: "2026-11-08" },
  { id: "INV-2040", due: "2026-11-22" },
  { id: "INV-2041", due: "2026-12-01" },
]
const shortDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })

function InvoiceDueDates() {
  return (
    <div className="flex flex-col gap-2">
      {bills.map((b) => (
        <div key={b.id} className="flex items-center gap-3">
          <span className="w-20 font-mono text-xs text-fg-muted">{b.id}</span>
          <DueDateChip date={shortDate(b.due)} overdue={new Date(b.due + "T00:00:00Z") < today} />
        </div>
      ))}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "In a task list",
    description: "Mark past-due tasks with overdue; screen readers hear Overdue, due Oct 31.",
    code: `<ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface text-sm">
  <li className="flex items-center justify-between gap-3 px-3 py-2">
    <span className="text-fg">File Q3 VAT return</span>
    <DueDateChip date="Oct 31" overdue />
  </li>
  <li className="flex items-center justify-between gap-3 px-3 py-2">
    <span className="text-fg">Renew Halcyon contract</span>
    <DueDateChip date="Nov 30" />
  </li>
  <li className="flex items-center justify-between gap-3 px-3 py-2">
    <span className="text-fg">Year-end payroll check</span>
    <DueDateChip date="Dec 19" />
  </li>
</ul>`,
    node: (
      <ul className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-surface text-sm">
        <li className="flex items-center justify-between gap-3 px-3 py-2">
          <span className="text-fg">File Q3 VAT return</span>
          <DueDateChip date="Oct 31" overdue />
        </li>
        <li className="flex items-center justify-between gap-3 px-3 py-2">
          <span className="text-fg">Renew Halcyon contract</span>
          <DueDateChip date="Nov 30" />
        </li>
        <li className="flex items-center justify-between gap-3 px-3 py-2">
          <span className="text-fg">Year-end payroll check</span>
          <DueDateChip date="Dec 19" />
        </li>
      </ul>
    ),
  },
  {
    title: "Working out overdue from dates",
    description: "Format the date and compare it with today yourself; the chip only displays.",
    code: `const today = new Date("2026-11-15T00:00:00Z")
const bills = [
  { id: "INV-2039", due: "2026-11-08" },
  { id: "INV-2040", due: "2026-11-22" },
  { id: "INV-2041", due: "2026-12-01" },
]
const shortDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })

function InvoiceDueDates() {
  return (
    <div className="flex flex-col gap-2">
      {bills.map((b) => (
        <div key={b.id} className="flex items-center gap-3">
          <span className="w-20 font-mono text-xs text-fg-muted">{b.id}</span>
          <DueDateChip date={shortDate(b.due)} overdue={new Date(b.due + "T00:00:00Z") < today} />
        </div>
      ))}
    </div>
  )
}`,
    node: <InvoiceDueDates />,
  },
]
