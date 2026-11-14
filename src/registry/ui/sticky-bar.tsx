"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A bar pinned to the bottom of its scroll container for page-level actions: "3 selected · Delete", "Unsaved changes · Save".
 *
 * Opaque surface with a hairline top edge, no blur. Put it last inside the scrolling element.
 * Give it `role="region"` and an `aria-label` when it holds important actions. For one floating
 * action use FloatingActionButton.
 *
 * @example
 * <StickyBar aria-label="Unsaved changes">
 *   <span className="text-sm text-fg-muted">Unsaved changes</span>
 *   <Button size="sm">Save</Button>
 * </StickyBar>
 */
function StickyBar({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sticky-bar"
      className={cn(
        "sticky bottom-0 z-30 flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface px-4 py-3 shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
export { StickyBar }
