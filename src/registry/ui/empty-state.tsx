"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * EmptyState — a centred placeholder for a page or panel with nothing in it yet: icon, title, hint and one action.
 *
 * Use for first-run screens ("No invoices yet"). For an empty table body use
 * `EmptyTable`; for zero search results use `EmptySearch`; for a failure use
 * `ErrorState`; for a missing page use `NotFoundState`.
 *
 * @example
 * <EmptyState
 *   icon={<ReceiptIcon className="size-6" />}
 *   title="No invoices yet"
 *   description="Create your first invoice to start getting paid."
 *   actionLabel="New invoice"
 *   onAction={() => router.push("/invoices/new")}
 * />
 */
type EmptyStateProps = {
  /** One short line saying what is empty. */
  title: string
  /** What to do next. */
  description?: string
  /** Label of the primary button. The button only renders when this is set. */
  actionLabel?: string
  /** Called by the primary button. */
  onAction?: () => void
  /** Decorative icon above the title. A quiet placeholder tile renders when omitted. */
  icon?: React.ReactNode
  className?: string
}

function EmptyState({ title, description, actionLabel, onAction, icon, className }: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center shadow-highlight",
        className
      )}
    >
      {icon ? (
        <div aria-hidden className="mb-4 text-fg-muted">
          {icon}
        </div>
      ) : (
        <div className="mb-4 size-10 rounded-xl border border-border bg-sunken" aria-hidden />
      )}
      <h3 className="text-sm font-medium tracking-[0.005em] text-balance text-fg">{title}</h3>
      {description ? <p className="mt-1.5 max-w-sm text-xs leading-[1.55] text-pretty text-fg-muted">{description}</p> : null}
      {actionLabel ? (
        <Button type="button" className="mt-5" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
export { EmptyState }
export type { EmptyStateProps }
