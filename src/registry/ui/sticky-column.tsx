"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A cell wrapper that stays pinned to the left or right edge while a wide table or board scrolls horizontally.
 *
 * Opaque so scrolled content passes underneath, with a hairline on the inner edge. The scroll
 * container needs `overflow-x-auto`. For a sticky header row use `sticky top-0` on the thead.
 *
 * @example
 * <div className="flex overflow-x-auto">
 *   <StickyColumn className="w-40 p-3">Customer</StickyColumn>
 *   <div className="min-w-[800px]">…</div>
 * </div>
 */
type StickyColumnProps = {
  children: React.ReactNode
  /** Edge to pin to. */
  side?: "left" | "right"
  className?: string
}

function StickyColumn({ children, side = "left", className }: StickyColumnProps) {
  return (
    <div
      data-slot="sticky-column"
      data-side={side}
      className={cn(
        "sticky z-10 bg-surface",
        side === "left" ? "left-0 border-r border-border" : "right-0 border-l border-border",
        className
      )}
    >
      {children}
    </div>
  )
}
export { StickyColumn }
export type { StickyColumnProps }
