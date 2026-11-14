"use client"
import { cn } from "@/lib/utils"
import { Spinner } from "@/registry/ui/spinner"

/**
 * LoadingOverlay — a translucent layer with a spinner and label that covers its positioned parent while it refreshes.
 *
 * Put it inside a relative container (a card, a table) while data reloads, so
 * the stale content stays visible underneath. For a first load with no content
 * yet use Skeleton or LoadingTable; for an inline wait use Spinner.
 *
 * @example
 * <div className="relative">
 *   <InvoiceList items={items} />
 *   {isFetching ? <LoadingOverlay label="Refreshing" /> : null}
 * </div>
 */
type LoadingOverlayProps = {
  /** Visible text and the status message read by screen readers. */
  label?: string
  className?: string
}

function LoadingOverlay({ label = "Loading", className }: LoadingOverlayProps) {
  return (
    <div
      data-slot="loading-overlay"
      role="status"
      aria-live="polite"
      className={cn("absolute inset-0 z-10 flex items-center justify-center rounded-[inherit] bg-bg/70", className)}
    >
      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg shadow-highlight">
        {/* The overlay is the status; hide the spinner's own one so it is not announced twice. */}
        <span aria-hidden className="inline-flex">
          <Spinner size="sm" />
        </span>
        {label}
      </div>
    </div>
  )
}
export { LoadingOverlay }
export type { LoadingOverlayProps }
