"use client"
import { IssueCard } from "@/registry/ui/issue-card"
import { IssueKey } from "@/registry/ui/issue-key"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "Linked issues",
    description: "A stack of related issues; an empty priority hides that badge.",
    code: `<div className="flex w-full max-w-sm flex-col gap-2">
  <IssueCard id="LUM-412" title="Add VAT reverse charge to EU invoices" status="In review" priority="Urgent" meta="Priya Raman · updated 2h ago" />
  <IssueCard id="LUM-409" title="Reconcile payouts nightly" status="In progress" priority="Medium" meta="Theo Okafor · updated yesterday" />
  <IssueCard id="LUM-397" title="Multi-currency totals on the dashboard" status="Done" priority="" meta="Shipped Nov 2" />
</div>`,
    node: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <IssueCard id="LUM-412" title="Add VAT reverse charge to EU invoices" status="In review" priority="Urgent" meta="Priya Raman · updated 2h ago" />
        <IssueCard id="LUM-409" title="Reconcile payouts nightly" status="In progress" priority="Medium" meta="Theo Okafor · updated yesterday" />
        <IssueCard id="LUM-397" title="Multi-currency totals on the dashboard" status="Done" priority="" meta="Shipped Nov 2" />
      </div>
    ),
  },
  {
    title: "Opening the issue",
    description: "Wrap the card in a link, or put an IssueKey with href in meta.",
    code: `<div className="flex w-full max-w-sm flex-col gap-2">
  <a href="#LUM-418" className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent">
    <IssueCard id="LUM-418" title="Export payouts as CSV" status="Backlog" priority="Low" meta="Unassigned" />
  </a>
  <IssueCard
    id="LUM-420"
    title="Customer portal dark mode"
    status="Backlog"
    priority="Medium"
    meta={<>Blocked by <IssueKey value="LUM-412" href="#LUM-412" /></>}
  />
</div>`,
    node: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <a href="#LUM-418" className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <IssueCard id="LUM-418" title="Export payouts as CSV" status="Backlog" priority="Low" meta="Unassigned" />
        </a>
        <IssueCard
          id="LUM-420"
          title="Customer portal dark mode"
          status="Backlog"
          priority="Medium"
          meta={<>Blocked by <IssueKey value="LUM-412" href="#LUM-412" /></>}
        />
      </div>
    ),
  },
]
