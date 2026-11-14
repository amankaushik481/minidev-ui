"use client"
import * as React from "react"
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"
import { cn } from "@/lib/utils"

/**
 * HoverCard — a rich preview that opens when the pointer rests on, or focus lands in, its trigger.
 *
 * Built on Base UI Preview Card: it waits before opening, stays open while the
 * pointer moves onto the card, flips to stay on screen and closes on Escape.
 * Use it for supplementary detail (a person, a record, a link). Anything the
 * user must act on belongs in a Popover; a short text hint belongs in a Tooltip.
 * The trigger should be a link or button so keyboard users can reach it.
 *
 * @example
 * <HoverCard trigger={<a href="/people/maya">Maya Chen</a>}>
 *   <p className="font-medium text-fg">Maya Chen</p>
 *   <p className="text-xs text-fg-muted">Finance lead</p>
 * </HoverCard>
 */
type HoverCardProps = {
  /** The element that opens the card, ideally a link or button. */
  trigger: React.ReactNode
  /** Card content. */
  children: React.ReactNode
  /** Which side of the trigger the card opens on. It flips if there is no room. */
  side?: "top" | "bottom" | "left" | "right"
  /** Alignment along that side. */
  align?: "start" | "center" | "end"
  /** Milliseconds to wait before opening. */
  delay?: number
  /** Milliseconds to wait before closing once the pointer leaves. */
  closeDelay?: number
  /** Controlled open state. */
  open?: boolean
  /** Called when the card opens or closes. */
  onOpenChange?: (open: boolean) => void
  /** Classes for the card panel. */
  className?: string
}

function HoverCard({
  trigger,
  children,
  side = "bottom",
  align = "start",
  delay = 400,
  closeDelay = 200,
  open,
  onOpenChange,
  className,
}: HoverCardProps) {
  return (
    <PreviewCardPrimitive.Root open={open} onOpenChange={onOpenChange ? (o) => onOpenChange(o) : undefined}>
      <PreviewCardPrimitive.Trigger
        data-slot="hover-card"
        delay={delay}
        closeDelay={closeDelay}
        render={<span className="inline-flex" />}
      >
        {trigger}
      </PreviewCardPrimitive.Trigger>
      <PreviewCardPrimitive.Portal>
        <PreviewCardPrimitive.Positioner side={side} align={align} sideOffset={8} className="isolate z-50">
          <PreviewCardPrimitive.Popup
            data-slot="hover-card-content"
            className={cn(
              "w-64 origin-(--transform-origin) rounded-xl border border-border bg-raised p-3 text-sm text-fg shadow-overlay outline-hidden",
              "duration-200 ease-hairline data-closed:duration-150 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
              "motion-reduce:animate-none",
              className
            )}
          >
            {children}
          </PreviewCardPrimitive.Popup>
        </PreviewCardPrimitive.Positioner>
      </PreviewCardPrimitive.Portal>
    </PreviewCardPrimitive.Root>
  )
}
export { HoverCard }
export type { HoverCardProps }
