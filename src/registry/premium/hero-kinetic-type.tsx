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
      className={cn("relative overflow-hidden rounded-2xl border border-border bg-bg px-6 py-20 sm:px-12 sm:py-28", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,oklch(0.48_0.17_285/0.5),transparent)]"
      />
      <div className="relative mx-auto max-w-4xl">
        <h1 className="text-4xl font-medium leading-[1.05] tracking-[-0.030em] text-fg sm:text-6xl sm:tracking-[-0.034em]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden py-0.5">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {i === lines.length - 1 ? (
                  <span className="bg-[linear-gradient(105deg,oklch(0.30_0.15_285),oklch(0.34_0.12_300))] bg-clip-text text-transparent">
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
          className="mt-6 max-w-lg text-base leading-[1.55] text-fg-muted"
        >
          {description}
        </motion.p>
        <motion.div
          initial={reduce ? false : { y: 10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-8 flex gap-3"
        >
          <Button>Browse Premium</Button>
          <Button variant="outline">Free kit</Button>
        </motion.div>
      </div>
    </section>
  )
}
export { HeroKineticType }
