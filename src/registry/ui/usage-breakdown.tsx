"use client"
import { cn } from "@/lib/utils"

/** A stack of labelled usage bars, each showing used against limit, for plan and billing pages. */
type UsageItem = { label: string; used: number; limit: number }

type UsageBreakdownProps = {
  /** One bar per metered resource. Defaults to a Lumen workspace's monthly usage. */
  items?: UsageItem[]
  className?: string
}

const SAMPLE_ITEMS: UsageItem[] = [
  { label: "API requests (K)", used: 84.2, limit: 100 },
  { label: "Seats", used: 18, limit: 25 },
  { label: "Storage (GB)", used: 38, limit: 50 },
  { label: "Build minutes", used: 2340, limit: 3000 },
  { label: "Environments", used: 3, limit: 5 },
]

function UsageBreakdown({ items = SAMPLE_ITEMS, className }: UsageBreakdownProps) {
  return (
    <div data-slot="usage-breakdown" className={cn("w-full max-w-sm space-y-3", className)}>
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
            <div
              className="h-1.5 overflow-hidden rounded-full bg-sunken"
              role="progressbar"
              aria-label={item.label}
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
export { UsageBreakdown }
export type { UsageBreakdownProps, UsageItem }
