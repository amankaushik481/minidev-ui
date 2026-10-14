"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** A left-hand tab list with the active panel beside it, for settings pages. */
type VerticalTab = { id: string; label: string; content: React.ReactNode }

type VerticalTabsProps = {
  /** Tabs in order; the first is selected by default. Defaults to Lumen's workspace settings. */
  tabs?: VerticalTab[]
  /** Controlled selected tab id. */
  value?: string
  onChange?: (id: string) => void
  className?: string
}

function Panel({ title, rows, note }: { title: string; rows: [string, string][]; note: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <h3 className="text-sm font-medium text-fg">{title}</h3>
      <dl className="mt-3 divide-y divide-border text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 py-2">
            <dt className="text-fg-muted">{k}</dt>
            <dd className="font-medium tabular-nums text-fg">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs leading-[1.6] text-fg-muted">{note}</p>
    </div>
  )
}

const SAMPLE_TABS: VerticalTab[] = [
  {
    id: "general",
    label: "General",
    content: (
      <Panel
        title="Workspace"
        rows={[
          ["Name", "Northwind"],
          ["URL", "lumen.app/northwind"],
          ["Time zone", "America/Los_Angeles"],
          ["Fiscal year starts", "January"],
        ]}
        note="Changing the URL redirects old links for 90 days."
      />
    ),
  },
  {
    id: "billing",
    label: "Billing",
    content: (
      <Panel
        title="Plan and invoices"
        rows={[
          ["Plan", "Scale"],
          ["Price", "$490 / month"],
          ["Next invoice", "Apr 1, 2026"],
          ["Payment method", "Visa ending 4421"],
        ]}
        note="Invoices are emailed to billing@northwind.com and kept here for seven years."
      />
    ),
  },
  {
    id: "members",
    label: "Members",
    content: (
      <Panel
        title="People"
        rows={[
          ["Seats used", "18 of 25"],
          ["Owners", "Maya Chen"],
          ["Admins", "Priya Raman, Sam Lowe"],
          ["Pending invites", "2"],
        ]}
        note="Members can see every invoice; only admins can send or void them."
      />
    ),
  },
  {
    id: "api",
    label: "API keys",
    content: (
      <Panel
        title="Keys"
        rows={[
          ["Production", "lum_live_…8f21"],
          ["Last used", "2 minutes ago"],
          ["Sandbox", "lum_test_…c04d"],
          ["Rate limit", "1,000 requests / min"],
        ]}
        note="Rotate a key and the old one keeps working for 24 hours."
      />
    ),
  },
]

function VerticalTabs({ tabs = SAMPLE_TABS, value, onChange, className }: VerticalTabsProps) {
  const [internal, setInternal] = React.useState(tabs[0]?.id)
  const current = value ?? internal
  const active = tabs.find((t) => t.id === current) ?? tabs[0]
  return (
    <div data-slot="vertical-tabs" className={cn("grid w-full gap-4 md:grid-cols-[180px_1fr]", className)}>
      <div role="tablist" aria-orientation="vertical" className="flex flex-col gap-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === current}
            className={cn(
              "h-9 rounded-lg px-3 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent",
              t.id === current ? "bg-sunken text-fg" : "text-fg-muted hover:text-fg"
            )}
            onClick={() => {
              if (value === undefined) setInternal(t.id)
              onChange?.(t.id)
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="min-w-0">{active?.content}</div>
    </div>
  )
}
export { VerticalTabs }
export type { VerticalTabsProps, VerticalTab }
