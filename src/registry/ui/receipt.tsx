"use client"
import { cn } from "@/lib/utils"

/**
 * Receipt — a monospaced receipt card with an id, itemised lines and a ruled total.
 *
 * Use it in order confirmations, billing history and chat answers that show a charge. Amounts
 * are display strings, so format money before passing it. For an editable bill use an invoice
 * table instead.
 *
 * @example
 * <Receipt id="RCP-1042" lines={[{ label: "Pro plan", amount: "$49.00" }, { label: "Tax", amount: "$3.92" }]} total="$52.92" />
 */

type ReceiptLine = {
  label: string
  /** Formatted amount, e.g. "$49.00". */
  amount: string
}

// A Lumen receipt for Northwind's Pro plan.
const SAMPLE_LINES: ReceiptLine[] = [
  { label: "Pro plan, Oct 2026", amount: "$49.00" },
  { label: "Extra seats × 4", amount: "$36.00" },
  { label: "Bank sync add-on", amount: "$12.00" },
  { label: "Tax (8%)", amount: "$7.76" },
]

type ReceiptProps = {
  /** Receipt number shown in the header. */
  id?: string
  /** Itemised lines, in order. */
  lines?: ReceiptLine[]
  /** Formatted grand total. */
  total?: string
  className?: string
}

function Receipt({
  id = "RCP-2041",
  lines = SAMPLE_LINES,
  total = "$104.76",
  className,
}: ReceiptProps) {
  return (
    <div data-slot="receipt" className={cn("min-w-64 rounded-xl border border-border bg-surface p-4 font-mono text-xs", className)}>
      <p className="text-sm font-medium text-fg">Receipt {id}</p>
      <ul className="mt-3 space-y-1">
        {lines.map((l, i) => (
          <li key={`${l.label}-${i}`} className="flex justify-between gap-4 text-fg-muted">
            <span>{l.label}</span>
            <span className="tabular-nums">{l.amount}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex justify-between border-t border-border pt-2 font-medium text-fg">
        <span>Total</span>
        <span className="tabular-nums">{total}</span>
      </div>
    </div>
  )
}
export { Receipt }
export type { ReceiptProps, ReceiptLine }
