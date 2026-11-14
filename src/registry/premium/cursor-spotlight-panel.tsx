"use client"
import * as React from "react"
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A sunken panel with a soft accent spotlight that follows the pointer across it.
 *
 * The spotlight runs on motion values over the panel's own surface, so it
 * never re-renders React and the material still reaches the background.
 * Touch and reduced motion get a still glow. Pass `children` for your own
 * content, or `title` and `body` for the built-in layout. Use it for an
 * "ask", a quote or a feature callout on marketing pages; for a card that
 * tilts in 3D use CardTilt.
 *
 * @example
 * <CursorSpotlightPanel title="Ask" body="We are raising a seed round. Reply if you want the deck." />
 */
type CursorSpotlightPanelProps = {
  /** Heading of the built-in layout (rendered as h3). Ignored when children are passed. */
  title?: string
  /** Body text of the built-in layout. Ignored when children are passed. */
  body?: string
  /** Replaces the built-in title and body. */
  children?: React.ReactNode
  className?: string
}

function CursorSpotlightPanel({
  title = "Craft under the cursor",
  body = "Hairline panels that respond without blur shadows: the spotlight runs on motion values only.",
  children,
  className,
}: CursorSpotlightPanelProps) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(50)
  const my = useMotionValue(40)
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, color-mix(in oklch, var(--accent) 18%, transparent), transparent 55%)`

  return (
    <div
      data-slot="cursor-spotlight-panel"
      data-tier="premium"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width) * 100)
        my.set(((e.clientY - r.top) / r.height) * 100)
      }}
      className={cn("relative isolate overflow-hidden rounded-2xl border border-border bg-sunken p-8 shadow-highlight", className)}
    >
      {/* An overlay, not the panel's background, so bg-sunken (and the material) stays underneath. */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: spotlight }} />
      {children ?? (
        <>
          <h3 className="text-2xl font-medium tracking-[-0.018em] text-balance text-fg">{title}</h3>
          <p className="mt-2 max-w-md text-sm leading-[1.55] text-pretty text-fg-muted">{body}</p>
        </>
      )}
    </div>
  )
}
export { CursorSpotlightPanel }
export type { CursorSpotlightPanelProps }
