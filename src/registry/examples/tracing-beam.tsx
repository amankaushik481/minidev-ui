import { TracingBeam } from "@/registry/premium/tracing-beam"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Custom entries",
    description: "items take a version, a date, a title and a body; each entry gets a node that lights as the beam passes.",
    code: `<TracingBeam
  items={[
    { version: "v2.4", date: "10 Oct 2026", title: "Payout schedules", body: "Pay suppliers on the day you choose. Northwind batches 40 payouts every Friday and Lumen files the remittance advice for each one." },
    { version: "v2.3", date: "18 Sep 2026", title: "Approvals by amount", body: "Anything under 5,000 routes to Priya Raman and larger spends wait for Sam Lowe. Every decision is logged with who, when and why." },
    { version: "v2.2", date: "02 Sep 2026", title: "Bank feeds for 1,200 banks", body: "Transactions land within minutes and match to open invoices by amount, reference and payer. Misses go to a review queue." },
  ]}
/>`,
    node: (
      <TracingBeam
        items={[
          { version: "v2.4", date: "10 Oct 2026", title: "Payout schedules", body: "Pay suppliers on the day you choose. Northwind batches 40 payouts every Friday and Lumen files the remittance advice for each one." },
          { version: "v2.3", date: "18 Sep 2026", title: "Approvals by amount", body: "Anything under 5,000 routes to Priya Raman and larger spends wait for Sam Lowe. Every decision is logged with who, when and why." },
          { version: "v2.2", date: "02 Sep 2026", title: "Bank feeds for 1,200 banks", body: "Transactions land within minutes and match to open invoices by amount, reference and payer. Misses go to a review queue." },
        ]}
      />
    ),
  },
  {
    title: "Your own content",
    description: "Pass children instead of items and each direct child gets a node, so cards, quotes or steps all work.",
    code: `<TracingBeam>
  <div className="rounded-xl border border-border bg-surface p-4 shadow-raised">
    <p className="text-sm font-medium text-fg">Invoice sent</p>
    <p className="mt-1 text-xs text-fg-muted">INV-2041 to Northwind Traders, $1,840, 3 October</p>
  </div>
  <div className="rounded-xl border border-border bg-surface p-4 shadow-raised">
    <p className="text-sm font-medium text-fg">Opened</p>
    <p className="mt-1 text-xs text-fg-muted">Maya Chen viewed it twice, 4 October</p>
  </div>
  <div className="rounded-xl border border-border bg-surface p-4 shadow-raised">
    <p className="text-sm font-medium text-fg">Reminder sent</p>
    <p className="mt-1 text-xs text-fg-muted">In your voice, 11 October</p>
  </div>
  <div className="rounded-xl border border-border bg-surface p-4 shadow-raised">
    <p className="text-sm font-medium text-fg">Paid in full</p>
    <p className="mt-1 text-xs text-fg-muted">Matched to the bank line, 12 October</p>
  </div>
</TracingBeam>`,
    node: (
      <TracingBeam>
        <div className="rounded-xl border border-border bg-surface p-4 shadow-raised">
          <p className="text-sm font-medium text-fg">Invoice sent</p>
          <p className="mt-1 text-xs text-fg-muted">INV-2041 to Northwind Traders, $1,840, 3 October</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 shadow-raised">
          <p className="text-sm font-medium text-fg">Opened</p>
          <p className="mt-1 text-xs text-fg-muted">Maya Chen viewed it twice, 4 October</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 shadow-raised">
          <p className="text-sm font-medium text-fg">Reminder sent</p>
          <p className="mt-1 text-xs text-fg-muted">In your voice, 11 October</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 shadow-raised">
          <p className="text-sm font-medium text-fg">Paid in full</p>
          <p className="mt-1 text-xs text-fg-muted">Matched to the bank line, 12 October</p>
        </div>
      </TracingBeam>
    ),
  },
  {
    title: "Colour and rail width",
    description: "color takes any CSS colour or token for the beam and nodes; rail widens the gutter the beam runs in.",
    code: `<TracingBeam
  color="var(--success)"
  rail={64}
  items={[
    { version: "v3.0", date: "02 Aug 2026", title: "Workspaces and roles", body: "Every company gets its own workspace with owners, approvers and viewers. Audit history records who changed what and when." },
    { version: "v2.9", date: "14 Jul 2026", title: "Statements on a schedule", body: "Monthly statements go out to every customer with an open balance, and stop once the balance is cleared." },
  ]}
/>`,
    node: (
      <TracingBeam
        color="var(--success)"
        rail={64}
        items={[
          { version: "v3.0", date: "02 Aug 2026", title: "Workspaces and roles", body: "Every company gets its own workspace with owners, approvers and viewers. Audit history records who changed what and when." },
          { version: "v2.9", date: "14 Jul 2026", title: "Statements on a schedule", body: "Monthly statements go out to every customer with an open balance, and stop once the balance is cleared." },
        ]}
      />
    ),
  },
]
