"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { QuotaBar } from "@/registry/ui/quota-bar"

/**
 * A responsive grid of quota cards, one bar per metered resource, for plan and usage pages.
 *
 * Use on a plan or usage page to show every metered limit at once: seats, API calls, storage.
 * Each card is a QuotaBar, so bars turn warning at `warnAt` (90% by default) and danger at the
 * limit. Two columns from `sm`. For a single meter use QuotaBar directly.
 *
 * @example
 * <ResourceQuotaGrid items={[{ label: "Seats", used: 18, max: 25 }, { label: "Storage", used: 38, max: 50, format: (n) => `${n} GB` }]} />
 */
type Quota = {
  /** Resource name, also the meter's accessible name. */
  label: string
  used: number
  max: number
  /** Formats `used` and `max` for display, e.g. `(n) => \`${n} GB\``. Defaults to QuotaBar's en-US grouping. */
  format?: (n: number) => string
  /** Percent at which the fill turns to the warning tone. Defaults to QuotaBar's 90. */
  warnAt?: number
}

type ResourceQuotaGridProps = {
  /** Metered resources to show. Defaults to a Lumen workspace on the Scale plan. */
  items?: Quota[]
  className?: string
}

const SAMPLE_QUOTAS: Quota[] = [
  { label: "API requests", used: 84200, max: 100000 },
  { label: "Seats", used: 18, max: 25 },
  { label: "Storage (GB)", used: 38, max: 50 },
  { label: "Build minutes", used: 2340, max: 3000 },
  { label: "Webhook endpoints", used: 142, max: 500 },
  { label: "Environments", used: 3, max: 5 },
]

function ResourceQuotaGrid({ items = SAMPLE_QUOTAS, className }: ResourceQuotaGridProps) {
  return (
    <div data-slot="resource-quota-grid" className={cn("grid w-full gap-4 sm:grid-cols-2", className)}>
      {items.map((q) => (
        <div key={q.label} className="rounded-xl border border-border bg-surface p-4">
          <QuotaBar label={q.label} used={q.used} max={q.max} format={q.format} warnAt={q.warnAt} />
        </div>
      ))}
    </div>
  )
}
export { ResourceQuotaGrid }
export type { ResourceQuotaGridProps, Quota }
