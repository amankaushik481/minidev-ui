"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function ErrorState({
  title = "Something went wrong",
  description = "Try again in a moment.",
  onRetry,
  className,
}: {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}) {
  return (
    <div
      data-slot="error-state"
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-border bg-surface px-6 py-10 text-center shadow-[inset_0_1px_0_oklch(1_0_0/0.55)]",
        className
      )}
    >
      <h3 className="text-base font-medium text-fg">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-[1.55] text-fg">{description}</p>
      {onRetry ? (
        <Button className="mt-5" size="sm" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  )
}
export { ErrorState }
