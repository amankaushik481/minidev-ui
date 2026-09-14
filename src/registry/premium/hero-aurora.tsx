"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function HeroAurora({
  eyebrow = "Premium",
  title = "Interfaces that feel composed",
  description = "Motion, Hairline structure, and semantic tokens — a registry built for product teams who care.",
  primaryLabel = "Browse Premium",
  secondaryLabel = "View free kit",
  onPrimary,
  onSecondary,
  className,
}: {
  eyebrow?: string
  title?: string
  description?: string
  primaryLabel?: string
  secondaryLabel?: string
  onPrimary?: () => void
  onSecondary?: () => void
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <section
      data-slot="hero-aurora"
      data-tier="premium"
      className={cn("relative overflow-hidden rounded-2xl border border-border bg-sunken", className)}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute -top-24 left-1/4 size-[min(28rem,90vw)] rounded-full bg-[radial-gradient(circle,oklch(0.48_0.17_285/0.28),transparent_70%)]"
          animate={reduce ? undefined : { x: [0, 40, -20, 0], y: [0, 20, -10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-32 right-0 size-[min(24rem,80vw)] rounded-full bg-[radial-gradient(circle,oklch(0.48_0.17_285/0.18),transparent_70%)]"
          animate={reduce ? undefined : { x: [0, -30, 10, 0], y: [0, -25, 15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,oklch(1_0_0/0.02),transparent_40%)]" />
      </div>
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-32">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 text-[clamp(1.75rem,3.5vw+1rem,3rem)] font-medium tracking-[-0.028em] text-fg"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 max-w-xl text-sm leading-[1.55] text-fg-muted sm:text-base"
        >
          {description}
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
        >
          <Button className="w-full sm:w-auto" onClick={onPrimary}>{primaryLabel}</Button>
          <Button variant="outline" className="w-full sm:w-auto" onClick={onSecondary}>{secondaryLabel}</Button>
        </motion.div>
      </div>
    </section>
  )
}
export { HeroAurora }
