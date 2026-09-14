"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

function ContextChip({
  children,
  className,
  active,
  ...props
}: React.ComponentProps<"button"> & { active?: boolean }) {
  return (
    <button
      type="button"
      data-slot="context-chip"
      data-active={active || undefined}
      className={cn(
        "inline-flex h-6 items-center rounded-md border px-2 text-xs outline-none transition-[border-color,background-color] duration-[70ms]",
        "focus-visible:ring-2 focus-visible:ring-accent",
        active
          ? "border-accent/40 bg-accent/10 text-fg"
          : "border-border bg-sunken text-fg-muted hover:border-fg-subtle hover:text-fg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
export { ContextChip }
