"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Marquee — a strip that scrolls its children sideways in a seamless loop.
 *
 * Use it for logo strips, release notes or "trusted by" rows. It pauses on hover
 * and while anything inside has keyboard focus (WCAG 2.2.2), stops under
 * prefers-reduced-motion, and the duplicate copy is hidden from screen readers.
 * For a static row of logos use LogoCloud.
 *
 * @example
 * <Marquee duration={40}>
 *   <span>Changelog 0.6</span>
 *   <span>Base UI 1.8</span>
 * </Marquee>
 */
type MarqueeProps = {
  /** Items to loop. They are rendered twice; the second copy is aria-hidden. */
  children: React.ReactNode
  /** Seconds for one full loop. Larger is slower. */
  duration?: number
  /** Classes for the outer strip. */
  className?: string
}

function Marquee({ children, duration = 30, className }: MarqueeProps) {
  return (
    <div
      data-slot="marquee"
      className={cn("group/marquee overflow-hidden border-y border-border bg-sunken py-3", className)}
    >
      {/* Each copy carries its own trailing gap, so -50% lands exactly on the seam. */}
      <div
        className="flex w-max text-sm text-fg-muted [animation:marquee_var(--marquee-duration)_linear_infinite] group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] motion-reduce:[animation:none]"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 gap-8 pr-8">{children}</div>
        <div className="flex shrink-0 gap-8 pr-8" aria-hidden inert>
          {children}
        </div>
      </div>
    </div>
  )
}
export { Marquee }
export type { MarqueeProps }
