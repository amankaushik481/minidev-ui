"use client"
import { cn } from "@/lib/utils"
function UsageBreakdown({
  items,
  className,
}: {
  items: { label: string; used: number; limit: number }[]
  className?: string
}) {
  return (
    <div data-slot="usage-breakdown" className={cn("space-y-3", className)}>
      {items.map((item) => {
        const pct = Math.min(100, Math.round((item.used / item.limit) * 100))
        return (
          <div key={item.label}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-fg">{item.label}</span>
              <span className="tabular-nums text-fg-muted">
                {item.used}/{item.limit}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-sunken">
              <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
export { UsageBreakdown }
