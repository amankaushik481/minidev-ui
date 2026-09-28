"use client"
import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function ContextPill({
  children,
  className,
  onRemove,
}: {
  children: React.ReactNode
  className?: string
  onRemove?: () => void
}) {
  return (
    <span
      data-slot="context-pill"
      className={cn(
        "inline-flex h-7 max-w-full items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 text-xs text-fg shadow-highlight",
        className
      )}
    >
      <span className="truncate">{children}</span>
      {onRemove ? (
        <button
          type="button"
          aria-label="Remove"
          className="rounded-full p-0.5 text-fg-muted outline-none hover:bg-sunken hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
          onClick={onRemove}
        >
          <XIcon className="size-3" />
        </button>
      ) : null}
    </span>
  )
}
export { ContextPill }
