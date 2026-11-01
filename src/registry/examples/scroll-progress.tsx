"use client"
import * as React from "react"
import { ScrollProgress } from "@/registry/premium/scroll-progress"
import type { Example } from "./types"

function OwnScrollerDemo() {
  const ref = React.useRef<HTMLDivElement>(null)
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface shadow-raised">
      <div ref={ref} className="h-64 overflow-y-auto p-5" tabIndex={0} aria-label="Activity">
        <p className="text-sm font-medium text-fg">Activity</p>
        <ul className="mt-3 space-y-3 text-sm text-fg-muted">
          <li>Maya Chen paid INV-2041, $1,840</li>
          <li>Reminder sent for INV-2038 to Theo Okafor</li>
          <li>Priya Raman approved a $4,200 payout</li>
          <li>Sam Lowe added Atlas Freight as a customer</li>
          <li>INV-2042 opened by Cadence Labs</li>
          <li>Bank feed matched 14 transactions</li>
          <li>Maya Chen exported the Q3 ledger</li>
          <li>Theo Okafor viewed INV-2038 again</li>
          <li>Payout batch of 40 scheduled for Friday</li>
          <li>Priya Raman changed the approval limit to 5,000</li>
          <li>INV-2043 sent to Forma Studio, $980</li>
          <li>Month end closed with nothing left to review</li>
        </ul>
      </div>
      <ScrollProgress container={ref} variant="both" height={3} size={32} />
    </div>
  )
}

export const examples: Example[] = [
  {
    title: "Bar only",
    description: "variant=\"bar\" drops the ring; height is the bar thickness and children are the content the panel scrolls.",
    code: `<ScrollProgress variant="bar" height={4} title="Northwind onboarding handbook" subtitle="Internal · 6 min read">
  <div className="max-w-prose space-y-4 text-sm leading-[1.7] text-fg-muted">
    <p className="text-fg">Welcome to Northwind. This handbook covers your first two weeks: who to meet, which tools to set up, and how we run finance on Lumen.</p>
    <p>Day one is accounts. Maya Chen will invite you to the Lumen workspace, the shared inbox and the payouts calendar. Accept all three before lunch so approvals can route to you from day two.</p>
    <p>Invoices go out from Lumen only. Never send a PDF by hand; the reminders, the bank matching and the audit trail all depend on the invoice living in one place.</p>
    <p>Approvals are by amount. Anything under 5,000 routes to Priya Raman, larger spends wait for Sam Lowe. If you are unsure, add a note and let it route; nobody minds a question in the thread.</p>
    <p>Payouts run on Fridays. The batch is reviewed on Thursday afternoon, so get supplier details in by Wednesday. Lumen files the remittance advice for you.</p>
    <p>Month end should feel uneventful. If you find yourself exporting to a spreadsheet, stop and ask Theo Okafor; there is almost always a report for it already.</p>
  </div>
</ScrollProgress>`,
    node: (
      <ScrollProgress variant="bar" height={4} title="Northwind onboarding handbook" subtitle="Internal · 6 min read">
        <div className="max-w-prose space-y-4 text-sm leading-[1.7] text-fg-muted">
          <p className="text-fg">Welcome to Northwind. This handbook covers your first two weeks: who to meet, which tools to set up, and how we run finance on Lumen.</p>
          <p>Day one is accounts. Maya Chen will invite you to the Lumen workspace, the shared inbox and the payouts calendar. Accept all three before lunch so approvals can route to you from day two.</p>
          <p>Invoices go out from Lumen only. Never send a PDF by hand; the reminders, the bank matching and the audit trail all depend on the invoice living in one place.</p>
          <p>Approvals are by amount. Anything under 5,000 routes to Priya Raman, larger spends wait for Sam Lowe. If you are unsure, add a note and let it route; nobody minds a question in the thread.</p>
          <p>Payouts run on Fridays. The batch is reviewed on Thursday afternoon, so get supplier details in by Wednesday. Lumen files the remittance advice for you.</p>
          <p>Month end should feel uneventful. If you find yourself exporting to a spreadsheet, stop and ask Theo Okafor; there is almost always a report for it already.</p>
        </div>
      </ScrollProgress>
    ),
  },
  {
    title: "Ring only",
    description: "variant=\"circle\" keeps just the ring in the header; size is its diameter and the percent text scales with it.",
    code: `<ScrollProgress variant="circle" size={48} title="Terms of service" subtitle="Updated 1 October 2026">
  <div className="max-w-prose space-y-4 text-sm leading-[1.7] text-fg-muted">
    <p className="text-fg">These terms govern your use of Lumen. By creating a workspace you agree to them on behalf of your company.</p>
    <p>Your data stays yours. Lumen stores invoices, customers and bank transactions to provide the service and never sells or shares them with third parties for marketing.</p>
    <p>Payments are processed by regulated partners. Lumen never holds your funds; payouts move directly between your bank and your supplier.</p>
    <p>Plans are billed monthly or yearly per seat. You can cancel at any time and keep read access to your records for twelve months after the last invoice.</p>
    <p>Uptime is targeted at 99.95 percent each month. Planned maintenance is announced seven days ahead on the status page.</p>
    <p>Questions about these terms go to legal@lumen.app. We answer within two working days.</p>
  </div>
</ScrollProgress>`,
    node: (
      <ScrollProgress variant="circle" size={48} title="Terms of service" subtitle="Updated 1 October 2026">
        <div className="max-w-prose space-y-4 text-sm leading-[1.7] text-fg-muted">
          <p className="text-fg">These terms govern your use of Lumen. By creating a workspace you agree to them on behalf of your company.</p>
          <p>Your data stays yours. Lumen stores invoices, customers and bank transactions to provide the service and never sells or shares them with third parties for marketing.</p>
          <p>Payments are processed by regulated partners. Lumen never holds your funds; payouts move directly between your bank and your supplier.</p>
          <p>Plans are billed monthly or yearly per seat. You can cancel at any time and keep read access to your records for twelve months after the last invoice.</p>
          <p>Uptime is targeted at 99.95 percent each month. Planned maintenance is announced seven days ahead on the status page.</p>
          <p>Questions about these terms go to legal@lumen.app. We answer within two working days.</p>
        </div>
      </ScrollProgress>
    ),
  },
  {
    title: "Tracking your own scroller",
    description: "Pass a ref to any scrollable element as container; the indicators render inside a relative wrapper of your own.",
    code: `function OwnScrollerDemo() {
  const ref = React.useRef<HTMLDivElement>(null)
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface shadow-raised">
      <div ref={ref} className="h-64 overflow-y-auto p-5" tabIndex={0} aria-label="Activity">
        <p className="text-sm font-medium text-fg">Activity</p>
        <ul className="mt-3 space-y-3 text-sm text-fg-muted">
          <li>Maya Chen paid INV-2041, $1,840</li>
          <li>Reminder sent for INV-2038 to Theo Okafor</li>
          <li>Priya Raman approved a $4,200 payout</li>
          <li>Sam Lowe added Atlas Freight as a customer</li>
          <li>INV-2042 opened by Cadence Labs</li>
          <li>Bank feed matched 14 transactions</li>
          <li>Maya Chen exported the Q3 ledger</li>
          <li>Theo Okafor viewed INV-2038 again</li>
          <li>Payout batch of 40 scheduled for Friday</li>
          <li>Priya Raman changed the approval limit to 5,000</li>
          <li>INV-2043 sent to Forma Studio, $980</li>
          <li>Month end closed with nothing left to review</li>
        </ul>
      </div>
      <ScrollProgress container={ref} variant="both" height={3} size={32} />
    </div>
  )
}`,
    node: <OwnScrollerDemo />,
  },
]
