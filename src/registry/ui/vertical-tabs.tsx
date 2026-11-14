"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A left-hand tab list with the active panel beside it, for settings pages; stacks above the panel on small screens.
 *
 * Follows the WAI-ARIA tabs pattern: one tab stop, Up/Down (and Left/Right) move and select, Home/End jump. Use `Tabs` for horizontal tabs, `SettingsLayout` for a full settings page with routes, and `SegmentedControl` for switching a view in place.
 *
 * @example
 * <VerticalTabs defaultValue="billing" tabs={[{ id: "general", label: "General", content: <GeneralForm /> }, { id: "billing", label: "Billing", content: <BillingForm /> }]} />
 */
type VerticalTab = {
  /** Unique id; used as the value. */
  id: string
  label: string
  /** The panel shown while this tab is selected. */
  content: React.ReactNode
}

type VerticalTabsProps = {
  /** Tabs in order. Defaults to Lumen's workspace settings. */
  tabs?: VerticalTab[]
  /** Controlled selected tab id. Pair with `onChange`. */
  value?: string
  /** Initially selected tab id for the uncontrolled tabs. Defaults to the first tab. */
  defaultValue?: string
  /** Called with the id of the newly selected tab. */
  onChange?: (id: string) => void
  /** Accessible name for the tab list. */
  "aria-label"?: string
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

function VerticalTabs({ tabs = SAMPLE_TABS, value, defaultValue, onChange, "aria-label": ariaLabel = "Settings sections", className }: VerticalTabsProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? tabs[0]?.id)
  const active = tabs.find((t) => t.id === (value ?? internal)) ?? tabs[0]
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const uid = React.useId()

  const select = (i: number) => {
    const t = tabs[i]
    if (!t) return
    refs.current[i]?.focus()
    if (value === undefined) setInternal(t.id)
    onChange?.(t.id)
  }

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = tabs.length
    const to = {
      ArrowDown: (i + 1) % n,
      ArrowRight: (i + 1) % n,
      ArrowUp: (i - 1 + n) % n,
      ArrowLeft: (i - 1 + n) % n,
      Home: 0,
      End: n - 1,
    }[e.key]
    if (to === undefined) return
    e.preventDefault()
    select(to)
  }

  return (
    <div data-slot="vertical-tabs" className={cn("grid w-full gap-4 md:grid-cols-[180px_1fr]", className)}>
      <div role="tablist" aria-orientation="vertical" aria-label={ariaLabel} className="flex flex-col gap-1">
        {tabs.map((t, i) => {
          const selected = t.id === active?.id
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              id={`${uid}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              className={cn(
                "h-9 rounded-lg px-3 text-left text-sm outline-none transition-colors duration-[70ms] focus-visible:ring-2 focus-visible:ring-accent",
                selected ? "bg-sunken font-medium text-fg" : "text-fg-muted hover:text-fg"
              )}
              onClick={() => select(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {t.label}
            </button>
          )
        })}
      </div>
      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={active ? `${uid}-tab-${tabs.indexOf(active)}` : undefined}
        tabIndex={0}
        className="min-w-0 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        {active?.content}
      </div>
    </div>
  )
}
export { VerticalTabs }
export type { VerticalTabsProps, VerticalTab }
