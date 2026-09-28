"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function CookieBanner({
  onAccept,
  onReject,
  className,
}: {
  onAccept?: () => void
  onReject?: () => void
  className?: string
}) {
  return (
    <div
      data-slot="cookie-banner"
      role="dialog"
      aria-label="Cookie consent"
      className={cn(
        "fixed right-4 bottom-4 z-50 max-w-sm rounded-xl border border-border bg-raised p-4",
        "shadow-lg",
        className
      )}
    >
      <p className="text-sm text-fg-muted">
        We use cookies for analytics and preferences. You can accept or reject non-essential cookies.
      </p>
      <div className="mt-3 flex justify-end gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={onReject}>Reject</Button>
        <Button type="button" size="sm" onClick={onAccept}>Accept</Button>
      </div>
    </div>
  )
}
export { CookieBanner }
