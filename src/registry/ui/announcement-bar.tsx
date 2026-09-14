"use client"
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function AnnouncementBar({
  children,
  onDismiss,
  className,
}: {
  children: React.ReactNode
  onDismiss?: () => void
  className?: string
}) {
  return (
    <div
      data-slot="announcement-bar"
      role="status"
      className={cn(
        "flex items-center justify-center gap-3 border-b border-border bg-sunken px-4 py-2 text-sm text-fg",
        className
      )}
    >
      <div className="min-w-0 flex-1 text-center sm:flex-none">{children}</div>
      {onDismiss ? (
        <button type="button" aria-label="Dismiss" className="text-fg-muted hover:text-fg" onClick={onDismiss}>
          <XIcon className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
export { AnnouncementBar }
