"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/** Kbd — a physical keycap: surface, hairline, 1px key edge. */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center gap-0.5 rounded-[5px] border border-border bg-surface px-1.5",
        "font-sans text-[11px] font-medium leading-none text-fg-muted",
        "shadow-key",
        "[&_svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
