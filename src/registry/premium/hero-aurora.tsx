"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A centred hero with two slow-drifting accent glows behind an eyebrow, headline, description and two buttons that rise in on load.
 *
 * Every string and both click handlers are props, so it works without
 * editing the file. The glows drift on transform only and stop for reduced
 * motion, which also shows the copy in place. Use it for a calm product
 * launch hero; for the full northern-lights effect behind any content use
 * AuroraBackground, for an always-dark hero use HeroGradientMesh.
 *
 * @example
 * <HeroAurora title="Close your books every day" primaryLabel="Start free" onPrimary={() => router.push("/signup")} />
 */
type HeroAuroraProps = {
  /** Small line above the headline. */
  eyebrow?: string
  /** Headline (rendered as h1). */
  title?: string
  description?: string
  /** Text of the solid button. */
  primaryLabel?: string
  /** Text of the outline button. */
  secondaryLabel?: string
  onPrimary?: () => void
  onSecondary?: () => void
  className?: string
}

const ENTER = { duration: 0.5, ease: [0.2, 0, 0, 1] } as const

function HeroAurora({
  eyebrow = "Now in public beta",
  title = "Interfaces that feel composed",
  description = "Plan, ship and measure in one calm workspace, built for teams who care about the details.",
  primaryLabel = "Start free trial",
  secondaryLabel = "View free kit",
  onPrimary,
  onSecondary,
  className,
}: HeroAuroraProps) {
  const reduce = useReducedMotion()
  return (
    <section
      data-slot="hero-aurora"
      data-tier="premium"
      className={cn("relative overflow-hidden rounded-2xl border border-border bg-sunken", className)}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute -top-24 left-1/4 size-[min(28rem,90vw)] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--accent)_28%,transparent),transparent_70%)]"
          animate={reduce ? undefined : { x: [0, 40, -20, 0], y: [0, 20, -10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-32 right-0 size-[min(24rem,80vw)] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--accent)_18%,transparent),transparent_70%)]"
          animate={reduce ? undefined : { x: [0, -30, 10, 0], y: [0, -25, 15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--highlight),transparent_40%)]" />
      </div>
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-32">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { ...ENTER, duration: 0.4 }}
          className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { ...ENTER, delay: 0.05 }}
          className="mt-3 text-[clamp(1.75rem,3.5vw+1rem,3rem)] font-medium tracking-[-0.028em] text-balance text-fg"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { ...ENTER, delay: 0.1 }}
          className="mt-4 max-w-xl text-sm leading-[1.55] text-fg-muted sm:text-base"
        >
          {description}
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { ...ENTER, delay: 0.16 }}
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
export type { HeroAuroraProps }
