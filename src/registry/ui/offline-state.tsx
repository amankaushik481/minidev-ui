"use client"
import * as React from "react"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

/**
 * OfflineState — a card that says the app is offline, explains what still works, and offers a retry.
 *
 * Use it in place of content that needs the network. For a thin page-wide strip
 * use OfflineBanner; for a generic empty list use EmptyState.
 *
 * @example
 * <OfflineState onRetry={() => refetch()} description="Your drafts are saved on this device." />
 */
type OfflineStateProps = {
  /** Heading text. */
  title?: React.ReactNode
  /** What still works and what is paused. */
  description?: React.ReactNode
  /** Called by the retry button. */
  onRetry?: () => void
  /** Retry button label. */
  retryLabel?: string
  className?: string
}

function OfflineState({
  title = "You are offline",
  description = "Cached registry pages still work. Mutations pause until you reconnect.",
  onRetry,
  retryLabel = "Retry connection",
  className,
}: OfflineStateProps) {
  return (
    <div data-slot="offline-state" className={cn("rounded-2xl border border-border bg-surface p-6 shadow-highlight", className)}>
      <div className="flex items-start gap-3">
        <span className="mt-1 size-2.5 shrink-0 rounded-full bg-warning" aria-hidden />
        <div>
          <h3 className="text-sm font-medium text-fg">{title}</h3>
          <p className="mt-1 text-sm text-pretty text-fg-muted">{description}</p>
          <Button className="mt-4" size="sm" variant="outline" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
export { OfflineState }
export type { OfflineStateProps }
