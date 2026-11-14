"use client"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/registry/ui/status-badge"

/**
 * InvoiceDetail — one invoice as a card: number, dates and status on top, line items below, total at the foot.
 *
 * Use it on an invoice page or in a side panel. For many invoices use
 * InvoiceList, for a payment confirmation use Receipt, and for a cart before
 * payment use OrderSummary or CheckoutSummary. Amounts are preformatted
 * strings so you control currency and locale.
 *
 * @example
 * <InvoiceDetail id="INV-2041" status="paid" amount="$1,246.00" lines={[{ label: "Growth plan", amount: "$1,246.00" }]} />
 */
type InvoiceLine = { label: string; amount: string }
type InvoiceStatus = "paid" | "open" | "void"

const SAMPLE_LINES: InvoiceLine[] = [
  { label: "Growth plan, 10 seats × $89", amount: "$890.00" },
  { label: "Additional seats (4)", amount: "$356.00" },
  { label: "Payments processing, September", amount: "$11,034.00" },
  { label: "Multi-currency add-on", amount: "$120.00" },
  { label: "Tax (VAT 0%, reverse charge)", amount: "$0.00" },
]

type InvoiceDetailProps = {
  /** Invoice number. */
  id?: string
  /** Issue date, already formatted. */
  date?: string
  /** Invoice total, already formatted. */
  amount?: string
  /** paid is success, open is warning, void is neutral. */
  status?: InvoiceStatus
  /** Line items. Defaults to a Northwind invoice from Lumen. */
  lines?: InvoiceLine[]
  className?: string
}

function InvoiceDetail({
  id = "INV-2041",
  date = "Issued Sep 24, 2026 · Due Oct 8, 2026",
  amount = "$12,400.00",
  status = "open",
  lines = SAMPLE_LINES,
  className,
}: InvoiceDetailProps) {
  return (
    <div data-slot="invoice-detail" className={cn("w-full max-w-md rounded-xl border border-border bg-surface p-4 text-fg", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-fg">{id}</h3>
          <p className="text-xs text-fg-muted">{date}</p>
        </div>
        <StatusBadge className="capitalize" tone={status === "paid" ? "success" : status === "void" ? "neutral" : "warning"}>{status}</StatusBadge>
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {lines.map((l, i) => (
          <li key={`${l.label}-${i}`} className="flex justify-between gap-4">
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
export type { InvoiceDetailProps, InvoiceLine, InvoiceStatus }
