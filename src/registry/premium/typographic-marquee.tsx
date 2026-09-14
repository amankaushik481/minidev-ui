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
  const base = phrases ?? (text ? [text] : ["Hairline craft", "Hue 285", "Geist Sans", "Audit-gated", "Free forever", "Premium moments"])
  const row = [...base, ...base]
  return (
    <section
      data-slot="typographic-marquee"
      data-tier="premium"
      className={cn("overflow-hidden rounded-2xl border border-border bg-bg py-8", className)}
      aria-label="Marquee phrases"
    >
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap px-6"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={reduce ? undefined : { duration: 28, ease: "linear", repeat: Infinity }}
      >
        {row.map((p, i) => (
          <span
            key={p + i}
            className="text-4xl font-medium tracking-[-0.026em] text-fg/90 sm:text-5xl sm:tracking-[-0.030em]"
          >
            {p}
            <span className="mx-6 text-accent">·</span>
          </span>
        ))}
      </motion.div>
    </section>
  )
}
export { TypographicMarquee }
