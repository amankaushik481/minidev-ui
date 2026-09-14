"use client"
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

function Banner({
  children,
  tone = "accent",
  className,
  action,
  onDismiss,
}: {
  children: React.ReactNode
  tone?: "accent" | "warning" | "danger"
  className?: string
  action?: React.ReactNode
  onDismiss?: () => void
}) {
  return (
    <div
      data-slot="banner"
      role="status"
      className={cn(
        "flex items-center justify-between gap-3 border px-4 py-2.5 text-sm shadow-[inset_0_1px_0_oklch(1_0_0/0.4)]",
        tone === "accent" && "border-accent/30 bg-accent/10 text-fg",
        tone === "warning" && "border-warning/40 bg-warning/15 text-fg",
        tone === "danger" && "border-danger/40 bg-danger/10 text-fg",
        className
      )}
    >
      <div className="min-w-0 flex-1">{children}</div>
      <div className="flex shrink-0 items-center gap-2">
        {action}
        {onDismiss ? (
          <IconButton type="button" size="icon-sm" variant="ghost" aria-label="Dismiss" onClick={onDismiss}>
            <XIcon />
          </IconButton>
        ) : null}
      </div>
    </div>
  )
}
export { Banner }
