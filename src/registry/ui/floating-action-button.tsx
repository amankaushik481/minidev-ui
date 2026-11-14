"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * FloatingActionButton — a round, fixed-position primary button in the bottom-right corner of the viewport.
 *
 * Use for the one primary action of a mobile or canvas screen ("New
 * invoice"). Takes every `Button` prop. An icon-only FAB must have an
 * `aria-label`. For an inline primary action use `Button`; for a sticky
 * bottom action bar use `StickyBar`.
 *
 * @example
 * <FloatingActionButton aria-label="New invoice" onClick={create}>
 *   <PlusIcon />
 * </FloatingActionButton>
 */
function FloatingActionButton({ className, children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="floating-action-button"
      size="lg"
      className={cn("fixed right-6 bottom-6 z-50 rounded-full shadow-lg", className)}
      {...props}
    >
      {children}
    </Button>
  )
}
export { FloatingActionButton }
