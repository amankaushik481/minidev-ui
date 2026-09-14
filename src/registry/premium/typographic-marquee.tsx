"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

function TypographicMarquee({
  phrases,
  text,
  className,
}: {
  phrases?: string[]
  /** @deprecated use phrases */
  text?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const items =
    phrases ??
    (text
      ? [text]
      : ["Hairline craft", "Hue 285", "Geist Sans", "Audit-gated", "Free forever", "Premium moments"])
  const loop = [...items, ...items]
  return (
    <section
      data-slot="typographic-marquee"
      data-tier="premium"
      className={cn(
        "w-full max-w-full overflow-hidden rounded-2xl border border-border bg-bg py-6 sm:py-8",
        className
      )}
      aria-label="Marquee phrases"
    >
      <div className="w-full max-w-full overflow-hidden">
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap px-6"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={
            reduce
              ? undefined
              : { duration: 28, ease: "linear", repeat: Number.POSITIVE_INFINITY }
          }
        >
          {loop.map((phrase, i) => (
            <span
              key={phrase + String(i)}
              className="text-3xl font-medium tracking-[-0.026em] text-fg/90 sm:text-5xl sm:tracking-[-0.030em]"
            >
              {phrase}
              <span className="mx-5 text-accent sm:mx-6">·</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
export { TypographicMarquee }
