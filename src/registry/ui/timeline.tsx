"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** A vertical list of dated events on a hairline, for activity feeds and audit logs. */
type TimelineItem = { title: React.ReactNode; description?: React.ReactNode; time?: React.ReactNode }

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
          <span className="absolute top-1.5 -left-[1.625rem] size-2.5 rounded-full border border-border bg-surface" />
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm font-medium text-fg">{item.title}</p>
            {item.time ? <time className="text-xs tabular-nums text-fg-muted">{item.time}</time> : null}
          </div>
          {item.description ? <p className="mt-1 text-xs text-fg-muted">{item.description}</p> : null}
        </li>
      ))}
    </ol>
  )
}
export { Timeline }
export type { TimelineProps, TimelineItem }
