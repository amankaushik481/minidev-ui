"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function HeroKineticType({
  lines = ["Ship interfaces", "that feel", "composed."],
  description = "Kinetic type, Hairline structure, and motion that yields to prefers-reduced-motion.",
  className,
}: {
  lines?: string[]
  description?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <section
      data-slot="hero-kinetic-type"
      data-tier="premium"
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-bg px-4 py-14 sm:px-12 sm:py-28",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--accent)_50%,transparent),transparent)]"
      />
      <div className="relative mx-auto max-w-4xl min-w-0">
        <h1 className="text-[clamp(1.75rem,4vw+1rem,3.75rem)] font-medium leading-[1.08] tracking-[-0.028em] text-fg sm:leading-[1.05] sm:tracking-[-0.034em]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden py-0.5">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {i === lines.length - 1 ? (
                  <span className="bg-[linear-gradient(100deg,var(--fg)_0%,var(--accent)_60%,var(--accent-2)_100%)] bg-clip-text text-transparent">
                    {line}
                  </span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={reduce ? false : { y: 12 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.45, duration: 0.45 }}
          className="mt-5 max-w-lg text-sm leading-[1.55] text-fg-muted sm:mt-6 sm:text-base"
        >
          {description}
        </motion.p>
        <motion.div
          initial={reduce ? false : { y: 10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap"
        >
          <Button className="w-full sm:w-auto">Browse Premium</Button>
          <Button variant="outline" className="w-full sm:w-auto">Free kit</Button>
        </motion.div>
      </div>
    </section>
  )
}
export { HeroKineticType }
