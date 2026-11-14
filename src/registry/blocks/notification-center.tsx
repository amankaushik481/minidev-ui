"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { NotificationItem } from "@/registry/ui/notification-item"

/**
 * NotificationCenter — a notifications panel: a titled header with an unread count and "Mark all read", then the latest rows.
 *
 * Use as the body of a bell popover or a side panel in an app shell. For one row use NotificationItem;
 * for a bell button that opens its own popover use NotificationInbox; for a team audit trail use ActivityFeed.
 * Ships with Lumen sample notifications; copy the block and swap `SAMPLE` for your data.
 *
 * @example
 * <NotificationCenter className="max-w-md" />
 */
type NotificationCenterProps = {
  className?: string
}

// Floored to the minute so server and client compute the same instant.
const minutesAgo = (m: number) => new Date(Math.floor(Date.now() / 60000) * 60000 - m * 60000)

const SAMPLE = [
  { id: "n1", title: "Invoice INV-2041 paid", body: "Northwind paid $12,400.00 by bank transfer.", minutes: 4 },
  { id: "n2", title: "Refunds up 220% vs last Sunday", body: "Batch #4411 refunded 38 orders. Lumen flagged it in #finance.", minutes: 52 },
  { id: "n3", title: "Trial ending for Halcyon", body: "3 days left on 12 seats. Owner: Priya Raman.", minutes: 180 },
  { id: "n4", title: "Weekly digest is ready", body: "MRR $48,290, up 3.1%. Churn flat at 1.2%.", minutes: 1440 },
]

function NotificationCenter({ className }: NotificationCenterProps) {
  const [unread, setUnread] = React.useState(() => new Set(["n1", "n2"]))
  const dates = React.useMemo(() => SAMPLE.map((n) => minutesAgo(n.minutes)), [])
  const headingId = React.useId()
  return (
    <section
      data-slot="notification-center"
      aria-labelledby={headingId}
      className={cn("w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface shadow-raised", className)}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 id={headingId} className="text-sm font-medium text-fg">
            Notifications
          </h2>
          <span aria-live="polite" className="text-xs text-fg-muted tabular-nums">
            {unread.size ? `${unread.size} new` : ""}
          </span>
        </div>
        <Button size="sm" variant="ghost" disabled={!unread.size} onClick={() => setUnread(new Set())}>
          Mark all read
        </Button>
      </div>
      <ul className="[&>li:last-child>*]:border-b-0">
        {SAMPLE.map((n, i) => (
          <li key={n.id}>
            <NotificationItem title={n.title} body={n.body} date={dates[i]} unread={unread.has(n.id)} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export { NotificationCenter }
export type { NotificationCenterProps }
