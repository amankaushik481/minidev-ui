"use client"
import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Headline text filled with a slowly drifting gradient built from the accent tokens, so it follows your theme.
 *
 * Stays a real text node for SEO and screen readers, and holds still for
 * reduced motion. Marketing only: the design law bans gradient text in
 * product UI. Use it for one hero word or line; for a scramble-in effect use
 * HyperText.
 *
 * String children get the display size (text-4xl, 5xl from sm); pass a
 * `className` text size to override it.
 *
 * @example
 * <GradientText as="h2" duration={12}>Every pixel, accounted for</GradientText>
 */
type GradientTextProps = {
  children?: React.ReactNode
  /** Element to render. Use a heading tag when the text is the heading itself. */
  as?: "span" | "h1" | "h2" | "h3" | "p"
  /** Seconds per drift, one way. */
  duration?: number
  /** Extra colour stops; defaults to accent, accent-2 and back. */
  colors?: string[]
  className?: string
}

function GradientText({ children = "Ship the whole product", as: Tag = "span", duration = 8, colors, className }: GradientTextProps) {
  const reduce = useReducedMotion()
  const stops = colors ?? ["var(--accent)", "var(--accent-2)", "color-mix(in oklch, var(--accent) 60%, var(--fg))", "var(--accent)"]
  return (
    <>
      <Tag
        data-slot="gradient-text"
        className={cn("inline-block bg-clip-text font-semibold tracking-[-0.04em] text-transparent", !children || typeof children === "string" ? "text-4xl sm:text-5xl" : "", className)}
        style={{
          backgroundImage: `linear-gradient(100deg, ${stops.join(", ")})`,
          backgroundSize: "300% 100%",
          WebkitBackgroundClip: "text",
          animation: reduce ? undefined : `gradient-text-drift ${duration}s ease-in-out infinite alternate`,
        }}
      >
        {children}
      </Tag>
      {/* Outside the text element, so the CSS never ends up in the heading's text content. */}
      <style>{`@keyframes gradient-text-drift{from{background-position:0% 50%}to{background-position:100% 50%}}`}</style>
    </>
  )
}

export { GradientText }
export type { GradientTextProps }
