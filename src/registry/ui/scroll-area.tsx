"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"
import { cn } from "@/lib/utils"

/**
 * ScrollArea — a scroll container with thin, themed scrollbars on Base UI; native scrolling underneath.
 *
 * Give it a fixed height (or max height) and put long content inside. Set `orientation` to
 * "horizontal" or "both" for sideways overflow. The viewport is keyboard focusable so arrow keys
 * scroll it. For a whole page let the body scroll instead.
 *
 * @example
 * <ScrollArea className="h-72 rounded-xl border border-border">
 *   <div className="p-4">{longList}</div>
 * </ScrollArea>
 */
function ScrollArea({
  className,
  children,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Root.Props & {
  /** Which scrollbars to render. */
  orientation?: "vertical" | "horizontal" | "both"
}) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {orientation !== "horizontal" ? <ScrollBar /> : null}
      {orientation !== "vertical" ? <ScrollBar orientation="horizontal" /> : null}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border transition-[background-color] duration-[70ms] hover:bg-border-strong"
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
