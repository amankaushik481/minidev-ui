"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A wrapper that lifts any block into place on a spring the first time it scrolls into view.
 * Only transform moves, so the content is visible and readable from the first
 * paint (no hidden text for search engines or screen readers) and nothing
 * lays out again. It plays once; reduced motion shows the block in place.
 *
 * Use it on marketing sections that should arrive as you reach them; stagger
 * siblings with `delay`. Reach for BlurFade for a blur-and-fade entrance,
 * TextReveal for word-by-word paragraphs, and nothing at all inside product
 * UI, where content should simply be there.
 *
 * @example
 * <ScrollReveal delay={0.08}>
 *   <FeatureCard />
 * </ScrollReveal>
 */
type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  /** Pixels the block rises from. */
  y?: number
  /** Seconds to wait after it enters view. Use small steps (0.06 to 0.1) to stagger siblings. */
  delay?: number
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function ScrollReveal({ children, className, y = 18, delay = 0 }: ScrollRevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      data-slot="scroll-reveal"
      data-tier="premium"
      initial={reduce ? false : { y }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={reduce ? { duration: 0 } : { ...MORPH, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
export { ScrollReveal }
export type { ScrollRevealProps }
