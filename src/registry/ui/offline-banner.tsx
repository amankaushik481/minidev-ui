"use client"
import * as React from "react"
import { WifiOffIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function OfflineBanner({
  className,
  onRetry,
}: {
  className?: string
  onRetry?: () => void
}) {
  return (
    <div
      data-slot="offline-banner"
      role="status"
      className={cn(
        "flex flex-wrap items-center justify-center gap-3 border-b border-warning/40 bg-warning/10 px-4 py-2.5 text-sm text-fg",
        className
      )}
    >
      <span className="inline-flex items-center gap-2">
        <WifiOffIcon className="size-4" aria-hidden />
        You are offline. Changes will sync when you reconnect.
      </span>
      {onRetry ? (
        <Button type="button" size="sm" variant="outline" onClick={onRetry}>Retry</Button>
      ) : null}
    </div>
  )
}
export { OfflineBanner }
