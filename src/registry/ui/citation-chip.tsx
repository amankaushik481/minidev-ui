"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function CitationChip({
  children,
  className,
  index,
  ...props
}: React.ComponentProps<"button"> & { index?: number }) {
  return (
    <button
      type="button"
      data-slot="citation-chip"
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-md border border-border bg-surface px-2 text-xs text-fg-muted",
        "outline-none transition-[border-color,color] duration-[70ms]",
        "hover:border-fg-subtle hover:text-fg focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      {...props}
    >
      {index != null ? <span className="font-mono tabular-nums text-accent">{index}</span> : null}
      {children}
    </button>
  )
}
export { CitationChip }
