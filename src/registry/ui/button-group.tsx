"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Joins adjacent `Button`s into one segmented control with shared borders (Day | Week | Month, Copy | ▾).
 *
 * Use for a few related actions that belong together. Prefer `SegmentedControl` or `ToggleGroup`
 * when exactly one option is selected.
 * Works best with `variant="outline"` buttons. Give the group an `aria-label` so screen readers
 * announce what the buttons are for.
 *
 * @example
 * <ButtonGroup aria-label="Invoice actions">
 *   <Button variant="outline">Send</Button>
 *   <Button variant="outline">Download</Button>
 *   <Button variant="outline">Void</Button>
 * </ButtonGroup>
 */
type ButtonGroupProps = React.ComponentProps<"div"> & {
  /** Lay the buttons out in a row (default) or a column. */
  orientation?: "horizontal" | "vertical"
}

function ButtonGroup({ className, orientation = "horizontal", ...props }: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "inline-flex [&>[data-slot]]:rounded-none [&>[data-slot=button]]:border-border",
        // Raise the focused or hovered button so its ring and border sit above its neighbours.
        "[&>[data-slot]:focus-visible]:z-10 [&>[data-slot]:hover]:z-10",
        orientation === "horizontal"
          ? "items-stretch [&>[data-slot]:first-child]:rounded-l-lg [&>[data-slot]:last-child]:rounded-r-lg [&>[data-slot]:not(:first-child)]:-ml-px"
          : "flex-col [&>[data-slot]:first-child]:rounded-t-lg [&>[data-slot]:last-child]:rounded-b-lg [&>[data-slot]:not(:first-child)]:-mt-px",
        className
      )}
      {...props}
    />
  )
}

export { ButtonGroup }
export type { ButtonGroupProps }
