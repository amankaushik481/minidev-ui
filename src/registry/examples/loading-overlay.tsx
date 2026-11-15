"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { LoadingOverlay } from "@/registry/ui/loading-overlay"
import type { Example } from "./types"

const ROWS = [
  { id: "INV-2041", customer: "Northwind", amount: "$12,400.00" },
  { id: "INV-2042", customer: "Halcyon Labs", amount: "$3,150.00" },
  { id: "INV-2043", customer: "Acme Corp", amount: "$840.00" },
]

function RefreshingList() {
  const [loading, setLoading] = React.useState(false)
  const refresh = () => {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 1500)
  }
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Button variant="outline" size="sm" className="self-start" onClick={refresh} disabled={loading}>Refresh</Button>
      <div className="relative rounded-xl border border-border bg-surface" aria-busy={loading}>
        <ul inert={loading} className="divide-y divide-border text-sm">
          {ROWS.map((r) => (
            <li key={r.id} className="flex justify-between px-4 py-2.5">
              <span className="text-fg">{r.id} · {r.customer}</span>
              <span className="text-fg-muted tabular-nums">{r.amount}</span>
            </li>
          ))}
        </ul>
        {loading ? <LoadingOverlay label="Refreshing invoices" /> : null}
      </div>
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Refreshing a list",
    description: "The parent is relative so the overlay covers only the list; inert keeps keyboard focus out of the stale rows.",
    code: `const ROWS = [
  { id: "INV-2041", customer: "Northwind", amount: "$12,400.00" },
  { id: "INV-2042", customer: "Halcyon Labs", amount: "$3,150.00" },
  { id: "INV-2043", customer: "Acme Corp", amount: "$840.00" },
]

function RefreshingList() {
  const [loading, setLoading] = React.useState(false)
  const refresh = () => {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 1500)
  }
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Button variant="outline" size="sm" className="self-start" onClick={refresh} disabled={loading}>Refresh</Button>
      <div className="relative rounded-xl border border-border bg-surface" aria-busy={loading}>
        <ul inert={loading} className="divide-y divide-border text-sm">
          {ROWS.map((r) => (
            <li key={r.id} className="flex justify-between px-4 py-2.5">
              <span className="text-fg">{r.id} · {r.customer}</span>
              <span className="text-fg-muted tabular-nums">{r.amount}</span>
            </li>
          ))}
        </ul>
        {loading ? <LoadingOverlay label="Refreshing invoices" /> : null}
      </div>
    </div>
  )
}`,
    node: <RefreshingList />,
  },
  {
    title: "Over a stat card",
    description: "rounded-[inherit] picks up the card's radius; the label says what is being recalculated.",
    code: `<div className="relative w-full max-w-xs rounded-xl border border-border bg-surface p-4">
  <p className="text-xs text-fg-muted">Revenue this month</p>
  <p className="mt-1 text-2xl font-medium text-fg tabular-nums">$48,290</p>
  <LoadingOverlay label="Recalculating" />
</div>`,
    node: (
      <div className="relative w-full max-w-xs rounded-xl border border-border bg-surface p-4">
        <p className="text-xs text-fg-muted">Revenue this month</p>
        <p className="mt-1 text-2xl font-medium text-fg tabular-nums">$48,290</p>
        <LoadingOverlay label="Recalculating" />
      </div>
    ),
  },
]
