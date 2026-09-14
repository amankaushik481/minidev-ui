"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function ImpersonationBanner({
  user,
  onExit,
  className,
}: {
  user: string
  onExit?: () => void
  className?: string
}) {
  return (
    <div
      data-slot="impersonation-banner"
      role="status"
      className={cn(
        "flex flex-wrap items-center justify-center gap-3 border-b border-border bg-surface px-4 py-2 text-sm text-fg shadow-[inset_0_1px_0_oklch(1_0_0/0.5)]",
        className
      )}
    >
      <span>You are viewing as <strong className="font-medium">{user}</strong></span>
      <Button type="button" size="sm" variant="outline" onClick={onExit}>Exit</Button>
    </div>
  )
}
export { ImpersonationBanner }
