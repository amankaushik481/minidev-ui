"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A vertical list of dated events on a hairline, for activity feeds and audit logs.
 *
 * Renders an ordered list, newest first. Use `ActivityFeed` when each event needs an avatar, and `AuditTrail` for who-did-what logs.
 *
 * @example
 * <Timeline items={[{ title: "Invoice INV-2041 paid", description: "$12,400 from Northwind", time: "09:41", dateTime: "2026-03-12T09:41" }]} />
 */
type TimelineItem = {
  title: React.ReactNode
  description?: React.ReactNode
  /** Display time, e.g. "09:41" or "Yesterday". */
  time?: React.ReactNode
  /** Machine-readable ISO date for the `<time>` element. */
  dateTime?: string
}

type TimelineProps = {
  /** Events, newest first. Defaults to a day of Lumen workspace activity. */
  items?: TimelineItem[]
  className?: string
}

const SAMPLE_ITEMS: TimelineItem[] = [
  { title: "Invoice INV-2041 paid", description: "$12,400 from Northwind Traders via bank transfer", time: "09:41" },
  { title: "Deploy #412 is live", description: "lumen-web · production · by Theo Okafor", time: "08:15" },
  { title: "Maya Chen joined Finance", description: "Invited by Priya Raman as an Admin", time: "Yesterday" },
  { title: "Reminder sent for INV-2038", description: "Fabrikam · $3,180 · 3 days overdue", time: "Mar 10" },
  { title: "Plan upgraded to Scale", description: "Billing changed by Sam Lowe", time: "Mar 8" },
]

function Timeline({ items = SAMPLE_ITEMS, className }: TimelineProps) {
  return (
    <ol data-slot="timeline" className={cn("relative w-full max-w-md space-y-4 border-l border-border pl-6", className)}>
      {items.map((item, i) => (
        <li key={i} className="relative">
          {/* Centred on the 1px rail: 24px padding plus half the rail. */}
          <span aria-hidden className="absolute top-1.5 left-[-24.5px] size-2.5 -translate-x-1/2 rounded-full border border-border bg-surface" />
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm font-medium text-fg">{item.title}</p>
            {item.time ? (
              <time dateTime={item.dateTime} className="shrink-0 text-xs tabular-nums text-fg-muted">
                {item.time}
              </time>
            ) : null}
          </div>
          {item.description ? <p className="mt-1 text-xs text-fg-muted">{item.description}</p> : null}
        </li>
      ))}
    </ol>
  )
}
export { Timeline }
export type { TimelineProps, TimelineItem }
