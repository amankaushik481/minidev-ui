"use client"
import * as React from "react"
import { BackToTop } from "@/registry/ui/back-to-top"
import type { Example } from "./types"

const ROWS = Array.from({ length: 30 }, (_, i) => "INV-" + (2041 - i) + " · " + ["Northwind Traders", "Helix Biotech", "Blue Harbor Co.", "Meridian Freight", "Summit Dental Group"][i % 5])

const PARAGRAPHS = [
  "Lumen reconciles bank transfers against open invoices every hour. A transfer is matched when the amount and the reference line up, and the invoice is marked as paid without anyone touching it.",
  "When a payment arrives without a reference, it lands in the unmatched queue. From there you can attach it to an invoice by hand or split it across several invoices for the same customer.",
  "Partial payments keep the invoice open and show the remaining balance. Reminders only go out for the balance, so customers who paid most of a bill are not asked for the full amount again.",
  "Refunds reverse the match. The invoice goes back to open, the payment returns to the queue, and the audit log records who did it and why.",
  "Every match, split and refund is exported nightly to your accounting system as a journal entry, so the books and the dashboard never drift apart.",
  "Multi currency accounts are matched in the account's own currency. The invoice keeps its original amount and the exchange difference is posted as a separate line, so nothing is rounded away.",
  "If a bank connection drops, Lumen keeps the last successful sync and shows a banner on the invoices page. Reconnecting replays the missed days, and no transfer is matched twice.",
  "Everything here also works for card payments through the customer portal, which arrive already referenced and are matched on the spot.",
]

function PanelDemo() {
  const ref = React.useRef<HTMLDivElement>(null)
  return (
    <div className="relative w-80">
      <div ref={ref} className="h-64 overflow-y-auto rounded-2xl border border-border bg-surface">
        <ul className="divide-y divide-border text-sm">
          {ROWS.map((row) => <li key={row} className="px-4 py-2 text-fg">{row}</li>)}
        </ul>
      </div>
      <BackToTop target={ref} threshold={120} className="absolute right-3 bottom-3" />
    </div>
  )
}

function ArticleDemo() {
  const ref = React.useRef<HTMLElement>(null)
  return (
    <div className="relative w-full max-w-md">
      <article ref={ref} className="h-72 overflow-y-auto rounded-2xl border border-border bg-surface p-5">
        <h3 className="text-base font-medium text-fg">How bank sync matches payments</h3>
        {PARAGRAPHS.map((p) => <p key={p} className="mt-3 text-sm leading-[1.6] text-fg-muted">{p}</p>)}
      </article>
      <BackToTop target={ref} threshold={200} className="absolute right-4 bottom-4 size-9" />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Scrollable panel",
    description: "Point target at a scroll container and make the button absolute inside the same wrapper; scroll the list to see it appear.",
    code: `const ROWS = Array.from({ length: 30 }, (_, i) => "INV-" + (2041 - i) + " · " + ["Northwind Traders", "Helix Biotech", "Blue Harbor Co.", "Meridian Freight", "Summit Dental Group"][i % 5])

function PanelDemo() {
  const ref = React.useRef<HTMLDivElement>(null)
  return (
    <div className="relative w-80">
      <div ref={ref} className="h-64 overflow-y-auto rounded-2xl border border-border bg-surface">
        <ul className="divide-y divide-border text-sm">
          {ROWS.map((row) => <li key={row} className="px-4 py-2 text-fg">{row}</li>)}
        </ul>
      </div>
      <BackToTop target={ref} threshold={120} className="absolute right-3 bottom-3" />
    </div>
  )
}`,
    node: <PanelDemo />,
  },
  {
    title: "Reading pane",
    description: "A higher threshold waits until the reader is well into the text, and the ring shows how far through they are.",
    code: `const PARAGRAPHS = [
  "Lumen reconciles bank transfers against open invoices every hour. A transfer is matched when the amount and the reference line up, and the invoice is marked as paid without anyone touching it.",
  "When a payment arrives without a reference, it lands in the unmatched queue. From there you can attach it to an invoice by hand or split it across several invoices for the same customer.",
  "Partial payments keep the invoice open and show the remaining balance. Reminders only go out for the balance, so customers who paid most of a bill are not asked for the full amount again.",
  "Refunds reverse the match. The invoice goes back to open, the payment returns to the queue, and the audit log records who did it and why.",
  "Every match, split and refund is exported nightly to your accounting system as a journal entry, so the books and the dashboard never drift apart.",
  "Multi currency accounts are matched in the account's own currency. The invoice keeps its original amount and the exchange difference is posted as a separate line, so nothing is rounded away.",
  "If a bank connection drops, Lumen keeps the last successful sync and shows a banner on the invoices page. Reconnecting replays the missed days, and no transfer is matched twice.",
  "Everything here also works for card payments through the customer portal, which arrive already referenced and are matched on the spot.",
]

function ArticleDemo() {
  const ref = React.useRef<HTMLElement>(null)
  return (
    <div className="relative w-full max-w-md">
      <article ref={ref} className="h-72 overflow-y-auto rounded-2xl border border-border bg-surface p-5">
        <h3 className="text-base font-medium text-fg">How bank sync matches payments</h3>
        {PARAGRAPHS.map((p) => <p key={p} className="mt-3 text-sm leading-[1.6] text-fg-muted">{p}</p>)}
      </article>
      <BackToTop target={ref} threshold={200} className="absolute right-4 bottom-4 size-9" />
    </div>
  )
}`,
    node: <ArticleDemo />,
  },
]
