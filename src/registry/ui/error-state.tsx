"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * ErrorState — a centred failure message for a panel or page that could not load, with an optional retry.
 *
 * It is a role="alert" region, so screen readers announce it when it appears.
 * Use when a fetch fails. For a 5xx page use `ServerErrorState`; for a 404
 * use `NotFoundState`; for an inline form error use `InlineAlert`; for "no
 * data yet" use `EmptyState`.
 *
 * @example
 * <ErrorState description="We couldn't load invoices." onRetry={() => refetch()} />
 */
type ErrorStateProps = {
  /** One short line saying what failed. */
  title?: string
  /** What happened and what to try. */
  description?: string
  /** When set, shows a retry button that calls it. */
  onRetry?: () => void
  /** Label of the retry button. */
  retryLabel?: string
  className?: string
}

function ErrorState({
  title = "Something went wrong",
  description = "Try again in a moment.",
  onRetry,
  retryLabel = "Try again",
  className,
}: ErrorStateProps) {
  return (
    <div
      data-slot="error-state"
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-border bg-surface px-6 py-10 text-center shadow-highlight",
        className
      )}
    >
      <h3 className="text-base font-medium text-balance text-fg">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-[1.55] text-pretty text-fg-muted">{description}</p>
      {onRetry ? (
        <Button type="button" className="mt-5" size="sm" onClick={onRetry}>
          {retryLabel}
        </Button>
      ) : null}
    </div>
  )
}
export { ErrorState }
export type { ErrorStateProps }
