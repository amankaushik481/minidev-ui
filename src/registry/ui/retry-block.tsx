"use client"
import * as React from "react"
import { RefreshCwIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { InlineAlert } from "@/registry/ui/inline-alert"
import { cn } from "@/lib/utils"

/**
 * RetryBlock — a danger alert explaining what failed, with a Try again button under it.
 *
 * Use it where a fetch, upload or AI request failed and retrying might work. The alert is a live
 * region, so the failure is announced. For a whole empty page use an error state or EmptyState.
 *
 * @example
 * <RetryBlock title="Could not load invoices" description="The server did not answer." onRetry={refetch} retrying={isFetching} />
 */
function RetryBlock({
  title = "Request failed",
  description = "Check your connection and try again.",
  onRetry,
  retrying = false,
  className,
}: {
  /** Bold first line of the alert. */
  title?: string
  /** What happened and what to do. */
  description?: React.ReactNode
  /** Fires when Try again is pressed. */
  onRetry?: () => void
  /** True while the retry runs: the button is disabled and its icon spins. */
  retrying?: boolean
  className?: string
}) {
  return (
    <div data-slot="retry-block" className={cn("space-y-3", className)}>
      <InlineAlert title={title} tone="danger">{description}</InlineAlert>
      <Button type="button" variant="outline" size="sm" onClick={onRetry} disabled={retrying} aria-busy={retrying || undefined}>
        <RefreshCwIcon aria-hidden className={cn(retrying && "animate-spin")} />
        {retrying ? "Retrying…" : "Try again"}
      </Button>
    </div>
  )
}
export { RetryBlock }
