"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { SearchInput } from "@/registry/ui/search-input"
import { StatusBadge } from "@/registry/ui/status-badge"

/**
 * SupportInbox — a ticket queue: open count and SLA risk in the header, search, then linked tickets with status and time left.
 *
 * Use for a helpdesk or customer-success queue. Tickets under two hours to SLA are flagged. Search matches subject,
 * id or sender. For personal messages use InboxPage; for in-app notifications use NotificationCenter.
 *
 * @example
 * <SupportInbox onCompose={() => setComposeOpen(true)} />
 */
type SupportInboxProps = {
  /** Called by the Compose button. */
  onCompose?: () => void
  className?: string
}

type Ticket = { id: string; subject: string; from: string; status: "open" | "pending" | "solved"; slaMinutes: number }

const TICKETS: Ticket[] = [
  { id: "T-4821", subject: "Seat upgrade stuck on invoice INV-2041", from: "sam@northwind.com", status: "open", slaMinutes: 45 },
  { id: "T-4819", subject: "Refund batch #4411 showing twice", from: "lee@halcyon.co", status: "pending", slaMinutes: 360 },
  { id: "T-4810", subject: "Can we add SSO to the Team plan?", from: "ava@kestrel.io", status: "open", slaMinutes: 110 },
  { id: "T-4797", subject: "HubSpot sync rate limited", from: "marcus@parallel.dev", status: "solved", slaMinutes: 0 },
]

const TONE = { open: "accent", pending: "warning", solved: "success" } as const
const left = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h ${m % 60 ? `${m % 60}m` : ""}`.trim() : `${m}m`)

function SupportInbox({ onCompose, className }: SupportInboxProps) {
  const [q, setQ] = React.useState("")
  const headingId = React.useId()
  const needle = q.trim().toLowerCase()
  const rows = needle ? TICKETS.filter((t) => `${t.id} ${t.subject} ${t.from}`.toLowerCase().includes(needle)) : TICKETS
  const open = TICKETS.filter((t) => t.status !== "solved")
  const atRisk = open.filter((t) => t.slaMinutes < 120).length
  return (
    <section data-slot="support-inbox" aria-labelledby={headingId} className={cn("overflow-hidden rounded-2xl border border-border bg-surface shadow-raised", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <h2 id={headingId} className="text-sm font-medium text-fg">
            Support inbox
          </h2>
          <p className="text-xs text-fg-muted tabular-nums">
            {open.length} open · {atRisk} SLA risk
          </p>
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
          <SearchInput size="sm" aria-label="Search tickets" placeholder="Search tickets" value={q} onChange={(e) => setQ(e.target.value)} containerClassName="min-w-0 flex-1 sm:w-48" />
          <Button size="sm" onClick={onCompose}>
            Compose
          </Button>
        </div>
      </div>
      <p aria-live="polite" className="sr-only">
        {rows.length} tickets shown
      </p>
      <ul>
        {rows.map((t) => {
          const risk = t.status !== "solved" && t.slaMinutes < 120
          return (
            <li key={t.id} className="border-b border-border last:border-b-0">
              <a
                href={`#${t.id}`}
                className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3 outline-none transition-colors duration-[70ms] hover:bg-sunken focus-visible:bg-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[11px] text-fg-muted">{t.id}</span>
                  <span className="block truncate text-sm font-medium text-fg">{t.subject}</span>
                  <span className="block truncate text-xs text-fg-muted">{t.from}</span>
                </span>
                <span className="flex items-center gap-2">
                  <StatusBadge tone={TONE[t.status]} className="capitalize">
                    {t.status}
                  </StatusBadge>
                  {t.status !== "solved" ? (
                    <span className={cn("font-mono text-xs tabular-nums", risk ? "text-danger" : "text-fg-muted")}>
                      {risk ? <span className="sr-only">At risk: </span> : null}
                      {left(t.slaMinutes)} left
                    </span>
                  ) : null}
                </span>
              </a>
            </li>
          )
        })}
        {rows.length === 0 ? <li className="px-4 py-8 text-center text-sm text-fg-muted">No tickets match.</li> : null}
      </ul>
    </section>
  )
}

export { SupportInbox }
export type { SupportInboxProps }
