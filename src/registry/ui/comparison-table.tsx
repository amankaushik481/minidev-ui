"use client"
import { cn } from "@/lib/utils"
import { CheckIcon, MinusIcon } from "lucide-react"
function ComparisonTable({ features, plans, className }: { features: string[]; plans: { name: string; values: (boolean|string)[] }[]; className?: string }) {
  return (
    <div data-slot="comparison-table" className={cn("overflow-x-auto rounded-xl border border-border", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-sunken text-left">
            <th className="px-3 py-2 text-xs font-medium text-fg-muted">Feature</th>
            {plans.map((p) => <th key={p.name} className="px-3 py-2 text-xs font-medium text-fg">{p.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={f} className="border-b border-border last:border-b-0">
              <td className="px-3 py-2 text-fg-muted">{f}</td>
              {plans.map((p) => {
                const v = p.values[i]
                return <td key={p.name} className="px-3 py-2">{typeof v === "boolean" ? (v ? <CheckIcon className="size-4 text-success" /> : <MinusIcon className="size-4 text-fg-subtle" />) : v}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export { ComparisonTable }
