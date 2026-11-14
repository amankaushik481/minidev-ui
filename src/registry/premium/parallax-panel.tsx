"use client"
import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A sunken panel whose text and soft accent glow drift at different speeds as the page scrolls, giving the section depth.
 * Both layers move with transforms tied straight to scroll position, so
 * nothing lays out again and nothing lags. Reduced motion holds both still.
 *
 * Use it for a quiet feature or manifesto section between busier ones. Reach
 * for ScrollReveal to bring any block in once, StickyFeatureStory for a
 * pinned multi-step story, and TiltCard for depth under the pointer instead.
 *
 * @example
 * <ParallaxPanel eyebrow="Reconciliation" title="Every payment, matched" body="Lumen pairs deposits with invoices as they land." />
 */
type ParallaxPanelProps = {
  /** Small label above the title. */
  eyebrow?: string
  title?: string
  body?: string
  /** Pixels the text travels across the full scroll through the panel. */
  depth?: number
  className?: string
}

function ParallaxPanel({
  eyebrow = "Parallax",
  title = "Depth without blur shadows",
  body = "Scroll-linked motion stays Hairline-legal: transforms only.",
  depth = 36,
  className,
}: ParallaxPanelProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth])
  const y2 = useTransform(scrollYProgress, [0, 1], [-depth * 0.55, depth * 0.55])
  return (
    <div ref={ref} data-slot="parallax-panel" data-tier="premium" className={cn("relative overflow-hidden rounded-2xl border border-border bg-sunken p-10", className)}>
      <motion.div style={reduce ? undefined : { y: y2 }} aria-hidden className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--accent)_22%,transparent),transparent_70%)]" />
      <motion.div style={reduce ? undefined : { y }} className="relative max-w-lg">
        {eyebrow ? <p className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">{eyebrow}</p> : null}
        <h3 className="mt-2 text-3xl font-medium tracking-[-0.022em] text-fg">{title}</h3>
        <p className="mt-3 text-sm leading-[1.55] text-fg-muted">{body}</p>
      </motion.div>
    </div>
  )
}
export { ParallaxPanel }
export type { ParallaxPanelProps }
