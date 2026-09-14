"use client"
import { cn } from "@/lib/utils"
function Receipt({
  id,
  lines,
  total,
  className,
}: {
  id: string
  lines: { label: string; amount: string }[]
  total: string
  className?: string
}) {
  return (
    <div data-slot="receipt" className={cn("rounded-xl border border-border bg-surface p-4 font-mono text-xs", className)}>
      <p className="text-sm font-medium text-fg">Receipt {id}</p>
      <ul className="mt-3 space-y-1">
        {lines.map((l) => (
          <li key={l.label} className="flex justify-between text-fg-muted">
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
