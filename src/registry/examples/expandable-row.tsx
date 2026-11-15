"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { ExpandableRow } from "@/registry/ui/expandable-row"
import type { Example } from "./types"

const orderLines = [
  { id: "l1", title: "Team plan · 24 seats", detail: "$49 per seat, billed monthly. Prorated from Nov 3." },
  { id: "l2", title: "Extra storage · 200 GB", detail: "$20 per 100 GB. Usage is checked daily." },
  { id: "l3", title: "Onboarding session", detail: "One 90 minute call, scheduled after payment." },
]

function OrderLines() {
  const [open, setOpen] = React.useState<Set<string>>(new Set())
  const setOne = (id: string, next: boolean) =>
    setOpen((prev) => {
      const s = new Set(prev)
      if (next) s.add(id)
      else s.delete(id)
      return s
    })
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setOpen(new Set(orderLines.map((l) => l.id)))}>Expand all</Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen(new Set())}>Collapse all</Button>
      </div>
      {orderLines.map((l) => (
        <ExpandableRow key={l.id} title={l.title} open={open.has(l.id)} onOpenChange={(next) => setOne(l.id, next)}>
          {l.detail}
        </ExpandableRow>
      ))}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Webhook deliveries",
    description: "Each delivery opens to its details; the first starts open with defaultOpen.",
    code: `<div className="flex w-full max-w-lg flex-col gap-2">
  <ExpandableRow title="invoice.paid · 200 OK" defaultOpen>
    <dl className="grid grid-cols-[96px_1fr] gap-y-1 text-xs">
      <dt className="text-fg-muted">Event</dt>
      <dd className="font-mono">evt_8812</dd>
      <dt className="text-fg-muted">Endpoint</dt>
      <dd className="font-mono">https://api.northwind.dev/hooks</dd>
      <dt className="text-fg-muted">Duration</dt>
      <dd className="tabular-nums">182 ms</dd>
    </dl>
  </ExpandableRow>
  <ExpandableRow title="invoice.overdue · 500 error">
    <p className="text-xs text-fg-muted">The endpoint returned 500 three times. Lumen will retry in 1 hour.</p>
  </ExpandableRow>
</div>`,
    node: (
      <div className="flex w-full max-w-lg flex-col gap-2">
        <ExpandableRow title="invoice.paid · 200 OK" defaultOpen>
          <dl className="grid grid-cols-[96px_1fr] gap-y-1 text-xs">
            <dt className="text-fg-muted">Event</dt>
            <dd className="font-mono">evt_8812</dd>
            <dt className="text-fg-muted">Endpoint</dt>
            <dd className="font-mono">https://api.northwind.dev/hooks</dd>
            <dt className="text-fg-muted">Duration</dt>
            <dd className="tabular-nums">182 ms</dd>
          </dl>
        </ExpandableRow>
        <ExpandableRow title="invoice.overdue · 500 error">
          <p className="text-xs text-fg-muted">The endpoint returned 500 three times. Lumen will retry in 1 hour.</p>
        </ExpandableRow>
      </div>
    ),
  },
  {
    title: "Expand all",
    description: "Control each row from one Set of open ids to add Expand all and Collapse all.",
    code: `const orderLines = [
  { id: "l1", title: "Team plan · 24 seats", detail: "$49 per seat, billed monthly. Prorated from Nov 3." },
  { id: "l2", title: "Extra storage · 200 GB", detail: "$20 per 100 GB. Usage is checked daily." },
  { id: "l3", title: "Onboarding session", detail: "One 90 minute call, scheduled after payment." },
]

function OrderLines() {
  const [open, setOpen] = React.useState<Set<string>>(new Set())
  const setOne = (id: string, next: boolean) =>
    setOpen((prev) => {
      const s = new Set(prev)
      if (next) s.add(id)
      else s.delete(id)
      return s
    })
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setOpen(new Set(orderLines.map((l) => l.id)))}>Expand all</Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen(new Set())}>Collapse all</Button>
      </div>
      {orderLines.map((l) => (
        <ExpandableRow key={l.id} title={l.title} open={open.has(l.id)} onOpenChange={(next) => setOne(l.id, next)}>
          {l.detail}
        </ExpandableRow>
      ))}
    </div>
  )
}`,
    node: <OrderLines />,
  },
]
