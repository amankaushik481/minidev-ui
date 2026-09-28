"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"

function KanbanColumn({
  title,
  count,
  children,
  className,
}: {
  title: string
  count?: number
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="kanban-column"
      className={cn(
        "flex w-72 flex-col gap-2 rounded-xl border border-border bg-sunken p-3 shadow-highlight",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 px-1">
        <h3 className="text-sm font-medium text-fg">{title}</h3>
        {typeof count === "number" ? <Badge variant="outline">{count}</Badge> : null}
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}
export { KanbanColumn }
