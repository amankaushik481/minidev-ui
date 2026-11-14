"use client"
import { cn } from "@/lib/utils"

/**
 * A stack of labelled usage bars, each showing used against limit, for plan and billing pages. Bars turn amber at 90% and red at the limit.
 *
 * Use it to show several metered resources at once. Use `UsageMeter` for a single bar, `QuotaBar` for one quota with a legend, and `ResourceQuotaGrid` for many quotas as cards.
 *
 * @example
 * <UsageBreakdown items={[{ label: "Seats", used: 18, limit: 25 }, { label: "Storage (GB)", used: 38, limit: 50 }]} />
 */
type UsageItem = {
  /** Resource name, with the unit if helpful, e.g. "Storage (GB)". */
  label: string
  used: number
  limit: number
}

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

// Fixed locale so the server and the browser render the same digits.
const fmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 })

function UsageBreakdown({ items = SAMPLE_ITEMS, className }: UsageBreakdownProps) {
  return (
    <div data-slot="usage-breakdown" className={cn("w-full max-w-sm space-y-3", className)}>
      {items.map((item) => {
        const pct = item.limit > 0 ? Math.min(100, Math.round((item.used / item.limit) * 100)) : 0
        return (
          <div key={item.label}>
            <div className="mb-1 flex justify-between gap-3 text-xs">
              <span className="text-fg">{item.label}</span>
              <span className="tabular-nums text-fg-muted">
                {fmt.format(item.used)}/{fmt.format(item.limit)}
              </span>
            </div>
            <div
              className="h-1.5 overflow-hidden rounded-full bg-sunken"
              role="progressbar"
              aria-label={item.label}
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuetext={`${fmt.format(item.used)} of ${fmt.format(item.limit)}, ${pct}%`}
            >
              <div
                className={cn("h-full rounded-full", pct >= 100 ? "bg-danger" : pct >= 90 ? "bg-warning" : "bg-accent")}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
export { UsageBreakdown }
export type { UsageBreakdownProps, UsageItem }
