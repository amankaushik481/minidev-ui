"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * InboxPage — a two-pane inbox: a message list with unread dots on the left, the open message on the right (stacked on mobile).
 *
 * Use for in-app messages, digests or system mail. Opening a message marks it read; "Mark all read" clears the rest
 * and the unread count is announced. For support tickets with SLA and status use SupportInbox; for short
 * notifications use NotificationCenter.
 *
 * @example
 * <InboxPage />
 */
type InboxPageProps = {
  className?: string
}

type Message = { id: string; from: string; subject: string; body: string; time: string }

const MESSAGES: Message[] = [
  { id: "m1", from: "Lumen digest", subject: "Your Monday numbers", body: "MRR $48,290, up 3.1% on last week. Churn held at 1.2%. Refunds spiked on Sunday (batch #4411) and are back to normal.", time: "08:00" },
  { id: "m2", from: "Billing", subject: "Invoice INV-2041 paid", body: "Northwind Traders paid $12,400.00 by bank transfer. Funds settle in two business days.", time: "Yesterday" },
  { id: "m3", from: "Priya Raman", subject: "Board pack review", body: "Revenue section looks good. Can you add the cohort chart before Friday?", time: "Mon" },
  { id: "m4", from: "Security", subject: "New sign-in from Lisbon", body: "Hana Ito signed in from a new device with SSO. If this was not her, revoke the session in Admin.", time: "Nov 9" },
]

function InboxPage({ className }: InboxPageProps) {
  const [openId, setOpenId] = React.useState("m1")
  const [unread, setUnread] = React.useState(() => new Set(["m2", "m3"]))
  const headingId = React.useId()
  const open = MESSAGES.find((m) => m.id === openId)
  return (
    <section data-slot="inbox-page" aria-labelledby={headingId} className={cn("overflow-hidden rounded-2xl border border-border bg-surface shadow-raised", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h2 id={headingId} className="text-sm font-medium text-fg">
          Inbox{" "}
          <span aria-live="polite" className="font-normal text-fg-muted tabular-nums">
            {unread.size ? `· ${unread.size} unread` : ""}
          </span>
        </h2>
        <Button size="sm" variant="outline" disabled={!unread.size} onClick={() => setUnread(new Set())}>
          Mark all read
        </Button>
      </div>
      <div className="grid md:grid-cols-[280px_1fr]">
        <ul aria-label="Messages" className="border-border md:border-r">
          {MESSAGES.map((m) => {
            const isUnread = unread.has(m.id)
            return (
              <li key={m.id} className="border-b border-border last:border-b-0 md:last:border-b">
                <button
                  type="button"
                  aria-current={m.id === openId ? "true" : undefined}
                  onClick={() => {
                    setOpenId(m.id)
                    setUnread((s) => {
                      const n = new Set(s)
                      n.delete(m.id)
                      return n
                    })
                  }}
                  className="flex w-full items-start gap-3 px-4 py-3 text-left outline-none transition-colors duration-[70ms] hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset aria-[current=true]:bg-sunken"
                >
                  <span aria-hidden className={cn("mt-1.5 size-2 shrink-0 rounded-full", isUnread ? "bg-accent" : "bg-transparent")} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className={cn("truncate text-sm text-fg", isUnread && "font-medium")}>{m.from}</span>
                      <span className="shrink-0 text-xs text-fg-muted tabular-nums">{m.time}</span>
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-fg-muted">{m.subject}</span>
                    {isUnread ? <span className="sr-only">, unread</span> : null}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
        {open ? (
          <article aria-labelledby={`${headingId}-open`} className="min-w-0 border-t border-border p-4 sm:p-6 md:border-t-0">
            <p className="text-xs text-fg-muted">
              {open.from} · {open.time}
            </p>
            <h3 id={`${headingId}-open`} className="mt-1 text-lg font-medium tracking-[-0.014em] text-fg">
              {open.subject}
            </h3>
            <p className="mt-3 max-w-prose text-sm leading-[1.65] text-pretty text-fg-muted">{open.body}</p>
          </article>
        ) : null}
      </div>
    </section>
  )
}

export { InboxPage }
export type { InboxPageProps }
