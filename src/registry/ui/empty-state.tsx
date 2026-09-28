"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className,
}: {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/50 px-6 py-16 text-center shadow-highlight",
        className
      )}
    >
      {icon ? <div className="mb-4 text-fg-muted">{icon}</div> : (
        <div className="mb-4 size-10 rounded-xl border border-border bg-sunken" aria-hidden />
      )}
      <h3 className="text-sm font-medium tracking-[0.005em] text-fg">{title}</h3>
      {description ? <p className="mt-1.5 max-w-sm text-xs leading-[1.55] text-fg-muted">{description}</p> : null}
      {actionLabel ? (
        <Button className="mt-5" size="sm" onClick={onAction}>{actionLabel}</Button>
      ) : null}
    </div>
  )
}
export { EmptyState }
