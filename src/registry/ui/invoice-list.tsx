"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/registry/ui/status-badge"
function InvoiceList({ items, className }: { items: { id: string; date: string; amount: string; status: "paid"|"open"|"void" }[]; className?: string }) {
  return (
    <div data-slot="invoice-list" className={cn("divide-y divide-border rounded-xl border border-border", className)}>
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
