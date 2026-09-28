"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function BulkActionsBar({
  count,
  children,
  onClear,
  className,
}: {
  count: number
  children?: React.ReactNode
  onClear?: () => void
  className?: string
}) {
  if (count <= 0) return null
  return (
    <div
      data-slot="bulk-actions-bar"
      role="status"
      className={cn(
        "sticky bottom-4 z-40 mx-auto flex w-fit items-center gap-3 rounded-xl border border-border bg-raised px-3 py-2",
        "shadow-lg",
        className
      )}
    >
      <span className="text-sm font-medium text-fg tabular-nums">{count} selected</span>
      <div className="flex items-center gap-1.5">{children}</div>
      {onClear ? (
        <Button type="button" variant="ghost" size="sm" onClick={onClear}>
          Clear
        </Button>
      ) : null}
    </div>
  )
}
export { BulkActionsBar }
