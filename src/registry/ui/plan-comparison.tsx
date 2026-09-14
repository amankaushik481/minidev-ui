"use client"
import { cn } from "@/lib/utils"
import { CheckIcon, MinusIcon } from "lucide-react"

const ROWS = [
  { feature: "Free UI primitives", free: true, pro: true },
  { feature: "Gallery + docs", free: true, pro: true },
  { feature: "Premium kinetic kits", free: false, pro: true },
  { feature: "Client showcase", free: false, pro: true },
  { feature: "Priority craft updates", free: false, pro: true },
]

function PlanComparison({ className }: { className?: string }) {
  return (
    <div data-slot="plan-comparison" className={cn("overflow-hidden rounded-2xl border border-border bg-surface shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="px-4 py-3 font-medium text-fg">Feature</th>
            <th className="px-4 py-3 font-medium text-fg">Free</th>
            <th className="px-4 py-3 font-medium text-fg">Pro</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.feature} className="border-b border-border last:border-b-0">
              <td className="px-4 py-2.5 text-fg-muted">{r.feature}</td>
              <td className="px-4 py-2.5">{r.free ? <CheckIcon className="size-4 text-accent" /> : <MinusIcon className="size-4 text-fg-subtle" />}</td>
              <td className="px-4 py-2.5">{r.pro ? <CheckIcon className="size-4 text-accent" /> : <MinusIcon className="size-4 text-fg-subtle" />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export { PlanComparison }
