"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"

/**
 * KanbanColumn — one titled column of a board with an optional count badge; you supply the cards as children.
 *
 * Use it to compose a custom board with your own cards (often IssueCard).
 * For a board rendered from data in one call use KanbanBoard.
 *
 * @example
 * <KanbanColumn title="In review" count={2}>
 *   <IssueCard id="LUM-397" title="Multi-currency totals" />
 * </KanbanColumn>
 */
type KanbanColumnProps = {
  /** Column heading, also the section's accessible name. */
  title: string
  /** Number shown in a badge beside the title. */
  count?: number
  /** The cards. */
  children?: React.ReactNode
  className?: string
}

function KanbanColumn({ title, count, children, className }: KanbanColumnProps) {
  const id = React.useId()
  return (
    <section
      data-slot="kanban-column"
      aria-labelledby={id}
      className={cn("flex w-72 flex-col gap-2 rounded-xl border border-border bg-sunken p-3 shadow-highlight", className)}
    >
      <div className="flex items-center justify-between gap-2 px-1">
        <h3 id={id} className="text-sm font-medium text-fg">{title}</h3>
        {typeof count === "number" ? (
          <Badge variant="outline" className="tabular-nums">
            {count}
            <span className="sr-only"> {count === 1 ? "item" : "items"}</span>
          </Badge>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  )
}
export { KanbanColumn }
export type { KanbanColumnProps }
