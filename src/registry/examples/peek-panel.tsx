"use client"
import * as React from "react"
import { PeekPanel } from "@/registry/ui/peek-panel"
import type { Example } from "./types"

const TICKETS = [
  { id: "T-418", title: "Export fails for invoices over 500 lines", body: "Reported by Northwind. The CSV stops at line 500 with no error. Reproduced on the staging workspace." },
  { id: "T-421", title: "Reminder emails sent twice", body: "Two customers got the 7-day reminder twice on Nov 3. Both invoices were edited after sending." },
  { id: "T-425", title: "Tax line rounds the wrong way", body: "8.25% on $1,121.40 shows $92.51 instead of $92.52. Only in the PDF, not the web view." },
]

function ListDemo() {
  const [openId, setOpenId] = React.useState<string | null>("T-418")
  const ticket = TICKETS.find((t) => t.id === openId)
  return (
    <div className="flex h-72 w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-bg">
      <ul className="min-w-0 flex-1 divide-y divide-border">
        {TICKETS.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => setOpenId(t.id)}
              aria-pressed={t.id === openId}
              className="w-full px-4 py-3 text-left text-sm text-fg outline-none hover:bg-sunken focus-visible:bg-sunken aria-pressed:bg-sunken"
            >
              <span className="block font-mono text-xs text-fg-muted">{t.id}</span>
              <span className="block truncate">{t.title}</span>
            </button>
          </li>
        ))}
      </ul>
      {ticket ? (
        <PeekPanel title={ticket.title} onClose={() => setOpenId(null)} className="max-w-xs">
          <p className="text-sm leading-[1.55] text-fg-muted">{ticket.body}</p>
        </PeekPanel>
      ) : null}
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Preview beside a list",
    description: "Pick a row to swap the panel's content; the close button and Escape inside the panel call onClose.",
    code: `const TICKETS = [
  { id: "T-418", title: "Export fails for invoices over 500 lines", body: "Reported by Northwind. The CSV stops at line 500 with no error. Reproduced on the staging workspace." },
  { id: "T-421", title: "Reminder emails sent twice", body: "Two customers got the 7-day reminder twice on Nov 3. Both invoices were edited after sending." },
  { id: "T-425", title: "Tax line rounds the wrong way", body: "8.25% on $1,121.40 shows $92.51 instead of $92.52. Only in the PDF, not the web view." },
]

function ListDemo() {
  const [openId, setOpenId] = React.useState<string | null>("T-418")
  const ticket = TICKETS.find((t) => t.id === openId)
  return (
    <div className="flex h-72 w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-bg">
      <ul className="min-w-0 flex-1 divide-y divide-border">
        {TICKETS.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => setOpenId(t.id)}
              aria-pressed={t.id === openId}
              className="w-full px-4 py-3 text-left text-sm text-fg outline-none hover:bg-sunken focus-visible:bg-sunken aria-pressed:bg-sunken"
            >
              <span className="block font-mono text-xs text-fg-muted">{t.id}</span>
              <span className="block truncate">{t.title}</span>
            </button>
          </li>
        ))}
      </ul>
      {ticket ? (
        <PeekPanel title={ticket.title} onClose={() => setOpenId(null)} className="max-w-xs">
          <p className="text-sm leading-[1.55] text-fg-muted">{ticket.body}</p>
        </PeekPanel>
      ) : null}
    </div>
  )
}`,
    node: <ListDemo />,
  },
  {
    title: "Always-on details column",
    description: "Leave out onClose for a fixed side column; there is then no close button and Escape does nothing.",
    code: `<div className="flex h-56 w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-bg">
  <div className="flex-1 p-4 text-sm text-fg-muted">Invoice editor</div>
  <PeekPanel title="Customer" className="max-w-xs">
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between gap-3"><dt className="text-fg-muted">Name</dt><dd className="text-fg">Northwind Traders</dd></div>
      <div className="flex justify-between gap-3"><dt className="text-fg-muted">Terms</dt><dd className="text-fg">Net 14</dd></div>
      <div className="flex justify-between gap-3"><dt className="text-fg-muted">Open balance</dt><dd className="tabular-nums text-fg">$12,400.00</dd></div>
    </dl>
  </PeekPanel>
</div>`,
    node: (
      <div className="flex h-56 w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-bg">
        <div className="flex-1 p-4 text-sm text-fg-muted">Invoice editor</div>
        <PeekPanel title="Customer" className="max-w-xs">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-3"><dt className="text-fg-muted">Name</dt><dd className="text-fg">Northwind Traders</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-fg-muted">Terms</dt><dd className="text-fg">Net 14</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-fg-muted">Open balance</dt><dd className="tabular-nums text-fg">$12,400.00</dd></div>
          </dl>
        </PeekPanel>
      </div>
    ),
  },
]
