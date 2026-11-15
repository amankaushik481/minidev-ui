"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * KanbanBoard — columns of cards in a horizontally scrolling board, each column headed by its title and card count.
 *
 * Use it to show work by stage from plain data. It is read-only; to compose
 * your own columns with custom cards use KanbanColumn and IssueCard, and for
 * reordering within one list use SortableList.
 *
 * @example
 * <KanbanBoard columns={[{ id: "todo", title: "To do", cards: [{ id: "1", title: "Export payouts", meta: "LUM-418" }] }]} />
 */
type KanbanCard = { id: string; title: string; meta?: string }
type KanbanColumn = { id: string; title: string; cards: KanbanCard[] }

const SAMPLE_COLUMNS: KanbanColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
    cards: [
      { id: "k1", title: "Add VAT reverse charge to EU invoices", meta: "LUM-412 · Priya Raman" },
      { id: "k2", title: "Export payouts as CSV", meta: "LUM-418 · Sam Lowe" },
      { id: "k3", title: "Customer portal dark mode", meta: "LUM-420" },
    ],
  },
  {
    id: "progress",
    title: "In progress",
    cards: [
      { id: "k4", title: "Reminder emails for overdue invoices", meta: "LUM-401 · Maya Chen" },
      { id: "k5", title: "Reconcile Stripe payouts nightly", meta: "LUM-409 · Theo Okafor" },
    ],
  },
  {
    id: "review",
    title: "In review",
    cards: [{ id: "k6", title: "Multi-currency totals on dashboard", meta: "LUM-397 · Ada Novak" }],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "k7", title: "Invoice PDF redesign", meta: "Shipped Oct 2" },
      { id: "k8", title: "Northwind SSO rollout", meta: "Shipped Sep 29" },
    ],
  },
]

type KanbanBoardProps = {
  /** Columns left to right, each with its cards. Defaults to a Lumen engineering board. */
  columns?: KanbanColumn[]
  /** Accessible name for the focusable, scrolling board. */
  "aria-label"?: string
  className?: string
}

function KanbanBoard({ columns = SAMPLE_COLUMNS, "aria-label": ariaLabel = "Board", className }: KanbanBoardProps) {
  const id = React.useId()
  return (
    <div
      data-slot="kanban-board"
      role="region"
      aria-label={ariaLabel}
      // focusable so keyboard users can scroll to off-screen columns; the cards are not focusable
      tabIndex={0}
      className={cn("flex w-full gap-3 overflow-x-auto rounded-xl pb-2 outline-none focus-visible:ring-2 focus-visible:ring-accent", className)}
    >
      {columns.map((col, ci) => (
        <section key={col.id} aria-labelledby={`${id}-c${ci}`} className="w-64 shrink-0 rounded-xl border border-border bg-sunken p-2">
          <div className="mb-2 flex items-center justify-between px-1">
            <h3 id={`${id}-c${ci}`} className="text-xs font-medium tracking-[0.01em] text-fg-muted">{col.title}</h3>
            <span className="text-xs tabular-nums text-fg-subtle">
              {col.cards.length}
              <span className="sr-only"> {col.cards.length === 1 ? "card" : "cards"}</span>
            </span>
          </div>
          <ul className="space-y-2">
            {col.cards.map((card) => (
              <li key={card.id} className="rounded-lg border border-border bg-surface p-3 shadow-highlight">
                <p className="text-sm text-fg">{card.title}</p>
                {card.meta ? <p className="mt-1 text-xs text-fg-muted">{card.meta}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
export { KanbanBoard }
export type { KanbanBoardProps, KanbanColumn, KanbanCard }
