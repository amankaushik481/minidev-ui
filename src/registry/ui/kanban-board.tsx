"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** Columns of cards in a horizontally scrolling board, each column headed by its title and card count. */
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
  className?: string
}

function KanbanBoard({ columns = SAMPLE_COLUMNS, className }: KanbanBoardProps) {
  return (
    <div data-slot="kanban-board" className={cn("flex w-full gap-3 overflow-x-auto pb-2", className)}>
      {columns.map((col) => (
        <div key={col.id} className="w-64 shrink-0 rounded-xl border border-border bg-sunken p-2">
          <div className="mb-2 flex items-center justify-between px-1">
            <h3 className="text-xs font-medium tracking-[0.01em] text-fg-muted">{col.title}</h3>
            <span className="text-xs tabular-nums text-fg-subtle">{col.cards.length}</span>
          </div>
          <div className="space-y-2">
            {col.cards.map((card) => (
              <div key={card.id} className="rounded-lg border border-border bg-surface p-3 shadow-highlight">
                <p className="text-sm text-fg">{card.title}</p>
                {card.meta ? <p className="mt-1 text-xs text-fg-muted">{card.meta}</p> : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
export { KanbanBoard }
export type { KanbanBoardProps, KanbanColumn, KanbanCard }
