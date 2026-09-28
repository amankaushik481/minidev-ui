"use client"
import { cn } from "@/lib/utils"
import { Spinner } from "@/registry/ui/spinner"

function LoadingOverlay({
  label = "Loading",
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <div
      data-slot="loading-overlay"
      role="status"
      aria-label={label}
      className={cn(
        "absolute inset-0 z-10 flex items-center justify-center rounded-[inherit] bg-bg/70",
        className
      )}
    >
      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg shadow-highlight">
        <Spinner size="sm" />
        {label}
      </div>
    </div>
  )
}
export { LoadingOverlay }
