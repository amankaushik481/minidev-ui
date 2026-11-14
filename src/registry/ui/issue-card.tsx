"use client"
import * as React from "react"
import { Badge } from "@/registry/ui/badge"
import { cn } from "@/lib/utils"

/**
 * IssueCard — a tracker issue as a card: key, status and priority badges, title and a meta line.
 *
 * Use it in kanban columns, search results and linked-issue lists. For just the
 * key use IssueKey, and for a full board use KanbanBoard.
 *
 * @example
 * <IssueCard id="LUM-412" title="Add VAT reverse charge" status="In review" priority="Urgent" meta="Priya Raman · updated 2h ago" />
 */
type IssueCardProps = {
  /** Issue key, for example "LUM-412". */
  id?: string
  title?: string
  /** Workflow state, shown as a badge. */
  status?: string
  /** Priority, shown as a badge. */
  priority?: string
  /** Line under the title: assignee, update time or labels. */
  meta?: React.ReactNode
  className?: string
}

function IssueCard({
  id = "MD-241",
  title = "Raise Premium craft for client demos",
  status = "In progress",
  priority = "High",
  meta = "Assigned to Design Eng · updated 12m ago",
  className,
}: IssueCardProps) {
  return (
    <article data-slot="issue-card" aria-label={`${id}: ${title}`} className={cn("rounded-xl border border-border bg-surface p-4 shadow-highlight", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-fg-muted">{id}</span>
        {status ? <Badge variant="outline">{status}</Badge> : null}
        {priority ? (
          <Badge variant="outline">
            <span className="sr-only">Priority: </span>
            {priority}
          </Badge>
        ) : null}
      </div>
      <h3 className="mt-2 text-sm font-medium text-pretty text-fg">{title}</h3>
      {meta ? <p className="mt-1 text-xs text-fg-muted">{meta}</p> : null}
    </article>
  )
}
export { IssueCard }
export type { IssueCardProps }
