"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/registry/ui/status-badge"

/** A compact list of invoices: number and date on the left, amount and status badge on the right. */
type InvoiceItem = { id: string; date: string; amount: string; status: "paid" | "open" | "void" }

const SAMPLE_ITEMS: InvoiceItem[] = [
  { id: "INV-2041", date: "Sep 24, 2026", amount: "$12,400.00", status: "open" },
  { id: "INV-2040", date: "Sep 22, 2026", amount: "$3,890.00", status: "open" },
  { id: "INV-2039", date: "Sep 12, 2026", amount: "$890.00", status: "void" },
  { id: "INV-2038", date: "Sep 10, 2026", amount: "$5,200.00", status: "paid" },
  { id: "INV-2037", date: "Sep 8, 2026", amount: "$21,750.00", status: "paid" },
  { id: "INV-2036", date: "Sep 3, 2026", amount: "$1,450.00", status: "paid" },
]

type InvoiceListProps = {
  /** Invoices, newest first. Defaults to recent Lumen invoices. */
  items?: InvoiceItem[]
  className?: string
}

function InvoiceList({ items = SAMPLE_ITEMS, className }: InvoiceListProps) {
  return (
    <div data-slot="invoice-list" className={cn("w-full max-w-md divide-y divide-border rounded-xl border border-border", className)}>
      {items.map(i => (
        <div key={i.id} className="flex items-center justify-between gap-3 px-3 py-3 text-sm">
          <div><p className="font-medium text-fg">{i.id}</p><p className="text-xs text-fg-muted">{i.date}</p></div>
          <div className="flex items-center gap-3"><span className="tabular-nums">{i.amount}</span><StatusBadge tone={i.status==="paid"?"success":i.status==="void"?"neutral":"warning"}>{i.status}</StatusBadge></div>
        </div>
      ))}
    </div>
  )
}
export { InvoiceList }
export type { InvoiceListProps, InvoiceItem }
