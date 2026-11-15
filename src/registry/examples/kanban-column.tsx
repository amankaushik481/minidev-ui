"use client"
import { IssueCard } from "@/registry/ui/issue-card"
import { KanbanColumn } from "@/registry/ui/kanban-column"
import type { Example } from "./types"

export const examples: Example[] = [
  {
    title: "A board from columns and cards",
    description: "Lay columns out in a scrolling row and fill them with IssueCards.",
    code: `<div className="flex w-full gap-3 overflow-x-auto pb-2">
  <KanbanColumn title="In progress" count={2}>
    <IssueCard id="LUM-401" title="Reminder emails for overdue invoices" status="" priority="High" meta="Maya Chen" />
    <IssueCard id="LUM-409" title="Reconcile payouts nightly" status="" priority="Medium" meta="Theo Okafor" />
  </KanbanColumn>
  <KanbanColumn title="In review" count={1}>
    <IssueCard id="LUM-412" title="VAT reverse charge for EU invoices" status="" priority="Urgent" meta="Priya Raman" />
  </KanbanColumn>
</div>`,
    node: (
      <div className="flex w-full gap-3 overflow-x-auto pb-2">
        <KanbanColumn title="In progress" count={2}>
          <IssueCard id="LUM-401" title="Reminder emails for overdue invoices" status="" priority="High" meta="Maya Chen" />
          <IssueCard id="LUM-409" title="Reconcile payouts nightly" status="" priority="Medium" meta="Theo Okafor" />
        </KanbanColumn>
        <KanbanColumn title="In review" count={1}>
          <IssueCard id="LUM-412" title="VAT reverse charge for EU invoices" status="" priority="Urgent" meta="Priya Raman" />
        </KanbanColumn>
      </div>
    ),
  },
  {
    title: "An empty column",
    description: "Pass count 0 and put your own placeholder in children.",
    code: `<KanbanColumn title="Blocked" count={0}>
  <p className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-xs text-fg-muted">
    Nothing is blocked right now.
  </p>
</KanbanColumn>`,
    node: (
      <KanbanColumn title="Blocked" count={0}>
        <p className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-xs text-fg-muted">
          Nothing is blocked right now.
        </p>
      </KanbanColumn>
    ),
  },
]
