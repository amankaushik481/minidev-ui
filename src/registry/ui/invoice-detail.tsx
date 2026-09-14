"use client"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/registry/ui/status-badge"
function InvoiceDetail({
  id,
  date,
  amount,
  status,
  lines,
  className,
}: {
  id: string
  date: string
  amount: string
  status: "paid" | "open" | "void"
  lines: { label: string; amount: string }[]
  className?: string
}) {
  return (
    <div data-slot="invoice-detail" className={cn("rounded-xl border border-border p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-fg">{id}</h3>
          <p className="text-xs text-fg-muted">{date}</p>
        </div>
        <StatusBadge tone={status === "paid" ? "success" : status === "void" ? "neutral" : "warning"}>{status}</StatusBadge>
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {lines.map((l) => (
          <li key={l.label} className="flex justify-between">
            <span className="text-fg-muted">{l.label}</span>
            <span className="tabular-nums">{l.amount}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex justify-between border-t border-border pt-3 text-sm font-medium">
        <span>Total</span>
        <span className="tabular-nums">{amount}</span>
      </div>
    </div>
  )
}
export { InvoiceDetail }
