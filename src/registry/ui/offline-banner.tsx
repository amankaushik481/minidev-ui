"use client"
import * as React from "react"
import { WifiOffIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * OfflineBanner — a full-width warning strip saying the app is offline, with an optional Retry button.
 *
 * It is a polite live region (role="status"), so mounting it announces the message.
 * Render it at the top of the page while `navigator.onLine` is false; for a whole
 * empty panel use OfflineState.
 *
 * @example
 * {!online ? <OfflineBanner onRetry={reconnect} /> : null}
 */
type OfflineBannerProps = {
  /** Message text. */
  message?: React.ReactNode
  /** Shows a Retry button that calls this. */
  onRetry?: () => void
  className?: string
}

function OfflineBanner({ message = "You are offline. Changes will sync when you reconnect.", onRetry, className }: OfflineBannerProps) {
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
        <WifiOffIcon className="size-4 shrink-0" aria-hidden />
        {message}
      </span>
      {onRetry ? (
        <Button type="button" size="sm" variant="outline" onClick={onRetry}>Retry</Button>
      ) : null}
    </div>
  )
}
export { OfflineBanner }
export type { OfflineBannerProps }
