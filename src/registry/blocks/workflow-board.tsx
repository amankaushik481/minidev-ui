"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ApprovalCard } from "@/registry/ui/approval-card"
import { DueDateChip } from "@/registry/ui/due-date-chip"
import { IssueKey } from "@/registry/ui/issue-key"
import { PageHeader } from "@/registry/ui/page-header"
import { PriorityPicker } from "@/registry/ui/priority-picker"
import { StatusBadge } from "@/registry/ui/status-badge"

/**
 * WorkflowBoard — an approvals page: the request in focus with key, due date and priority, its approval card, and the queue behind it.
 *
 * Use for finance or ops sign-off flows (refunds, credits, price changes). Approving or rejecting moves the queue on.
 * For a kanban of many tasks use a board of Cards; for a one-off confirmation use AlertDialog.
 * Composes IssueKey, DueDateChip, PriorityPicker and ApprovalCard.
 *
 * @example
 * <WorkflowBoard onDecision={(key, approved) => api.approvals.decide(key, approved)} />
 */
type WorkflowBoardProps = {
  /** Called with the request key and the decision when Approve or Reject is pressed. */
  onDecision?: (key: string, approved: boolean) => void
  className?: string
}

const QUEUE = [
  { key: "FIN-214", title: "Refund $1,240 on INV-2041", requester: "Theo Okafor", summary: "Northwind was double-billed for 24 seats in October.", due: "Nov 18" },
  { key: "FIN-217", title: "Credit $380 to Halcyon", requester: "Hana Ito", summary: "Goodwill credit after the Sunday sync outage.", due: "Nov 20" },
  { key: "FIN-219", title: "Raise Team plan to $52 per seat", requester: "Leo Brandt", summary: "New price for signups from Jan 1; existing customers keep $49.", due: "Nov 29" },
]

function WorkflowBoard({ onDecision, className }: WorkflowBoardProps) {
  const [index, setIndex] = React.useState(0)
  const [priority, setPriority] = React.useState("high")
  const id = React.useId()
  const current = QUEUE[index]
  const decide = (approved: boolean) => {
    if (!current) return
    onDecision?.(current.key, approved)
    setIndex((i) => i + 1)
  }
  return (
    <div data-slot="workflow-board" className={cn("space-y-6", className)}>
      <PageHeader title="Approvals" description="Refunds, credits and price changes waiting on finance." />
      {current ? (
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <IssueKey value={current.key} />
              <DueDateChip date={current.due} />
              <PriorityPicker value={priority} onChange={setPriority} />
            </div>
            <ApprovalCard
              key={current.key}
              title={current.title}
              requester={current.requester}
              summary={current.summary}
              onApprove={() => decide(true)}
              onReject={() => decide(false)}
            />
          </div>
          <section aria-labelledby={`${id}-queue`} className="min-w-0 rounded-xl border border-border bg-surface p-4">
            <h2 id={`${id}-queue`} className="text-sm font-medium text-fg">
              Queue <span className="text-fg-muted tabular-nums">· {QUEUE.length - index} left</span>
            </h2>
            <ol className="mt-3 space-y-2">
              {QUEUE.map((q, i) => (
                <li key={q.key} className="flex items-center justify-between gap-3 text-sm">
                  <span className={cn("min-w-0 truncate", i === index ? "font-medium text-fg" : "text-fg-muted")}>{q.title}</span>
                  {i < index ? <StatusBadge tone="success">Decided</StatusBadge> : i === index ? <StatusBadge tone="accent">Now</StatusBadge> : null}
                </li>
              ))}
            </ol>
          </section>
        </div>
      ) : (
        <p role="status" className="rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-fg-muted">
          Queue clear. Nothing waiting on you.
        </p>
      )}
    </div>
  )
}

export { WorkflowBoard }
export type { WorkflowBoardProps }
