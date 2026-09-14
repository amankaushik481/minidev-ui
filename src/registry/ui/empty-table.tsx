"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function EmptyTable({ title="No data yet", description="Create your first row to get started.", actionLabel, onAction, className }: {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}) {
  return (
    <div data-slot="empty-table" className={cn("flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-sunken px-6 py-16 text-center", className)}>
      <h3 className="text-sm font-medium text-fg">{title}</h3>
      <p className="mt-1 max-w-sm text-xs text-fg-muted">{description}</p>
      {actionLabel ? <Button className="mt-4" onClick={onAction}>{actionLabel}</Button> : null}
    </div>
  )
}
export { EmptyTable }
