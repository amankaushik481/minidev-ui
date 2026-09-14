"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
function MobileActionSheet({
  open,
  onClose,
  actions,
  className,
}: {
  open: boolean
  onClose: () => void
  actions: { id: string; label: string; destructive?: boolean; onSelect?: () => void }[]
  className?: string
}) {
  if (!open) return null
  return (
    <div data-slot="mobile-action-sheet" className="fixed inset-0 z-50 flex items-end justify-center bg-fg/40 p-3">
      <button type="button" className="absolute inset-0" aria-label="Dismiss" onClick={onClose} />
      <div className={cn("relative z-10 w-full max-w-md overflow-hidden rounded-xl border border-border bg-raised", className)}>
        {actions.map((a) => (
          <button
            key={a.id}
            type="button"
            className={cn(
              "flex h-12 w-full items-center justify-center border-b border-border text-sm last:border-b-0",
              a.destructive ? "text-danger" : "text-fg"
            )}
            onClick={() => {
              a.onSelect?.()
              onClose()
            }}
          >
            {a.label}
          </button>
        ))}
        <button type="button" className="flex h-12 w-full items-center justify-center text-sm text-fg-muted" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}
export { MobileActionSheet }
