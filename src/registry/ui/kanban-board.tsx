"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type KanbanCard = { id: string; title: string; meta?: string }
type KanbanColumn = { id: string; title: string; cards: KanbanCard[] }

function KanbanBoard({ columns, className }: { columns: KanbanColumn[]; className?: string }) {
  return (
    <div data-slot="kanban-board" className={cn("flex gap-3 overflow-x-auto pb-2", className)}>
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
export type { KanbanColumn, KanbanCard }
