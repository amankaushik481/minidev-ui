"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A large headline filled with an ink-to-violet gradient that wipes in from left to right as it scrolls into view.
 * The wipe is a clip-path reveal that plays once; the text is a real heading
 * from the first paint, so search engines and screen readers read it
 * normally. Reduced motion shows it fully revealed.
 *
 * Use it for one section headline on a marketing page. Reach for GradientText
 * for an inline gradient phrase without the reveal, and TextReveal for a
 * paragraph that lights up word by word.
 *
 * @example
 * <MaskedGradientHeadline as="h1">Invoices that close themselves.</MaskedGradientHeadline>
 */
type MaskedGradientHeadlineProps = {
  children?: React.ReactNode
  /** Heading level to render, so it fits your page outline. */
  as?: "h1" | "h2" | "h3"
  className?: string
}

const EASE_HAIRLINE = [0.2, 0, 0, 1] as const

function MaskedGradientHeadline({
  children = "Details that make it feel inevitable.",
  as = "h2",
  className,
}: MaskedGradientHeadlineProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      data-slot="masked-gradient-headline"
      data-tier="premium"
      initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, amount: 0.6 }}
      transition={reduce ? { duration: 0 } : { duration: 0.8, ease: EASE_HAIRLINE }}
      className={cn(
        "text-4xl font-medium tracking-[-0.030em] text-balance sm:text-5xl",
        "bg-[linear-gradient(100deg,var(--fg)_0%,var(--accent)_60%,var(--accent-2)_100%)]",
        "bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </Tag>
  )
}
export { MaskedGradientHeadline }
export type { MaskedGradientHeadlineProps }
