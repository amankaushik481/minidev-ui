"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * An always-dark launch hero with an accent and info gradient mesh behind a centred headline, a line of copy and two buttons.
 *
 * It scopes the dark theme with the `dark` class, so every colour is still a
 * token and the buttons are the kit's own ink and outline buttons; it stays
 * dark inside a light page. Reduced motion shows the headline in place. Use
 * it when a launch needs a dark, high-contrast moment; for a hero that
 * follows the page theme use HeroAurora.
 *
 * @example
 * <HeroGradientMesh title="Dark-mode first. Accent that sings." primaryLabel="Launch" secondaryLabel="Docs" />
 */
type HeroGradientMeshProps = {
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

function HeroGradientMesh({
  title = "Dark-mode first. Accent that sings.",
  description = "A launch hero with depth. Motion is optional and respects reduced-motion settings.",
  primaryLabel = "Launch",
  secondaryLabel = "Docs",
  onPrimary,
  onSecondary,
  className,
}: HeroGradientMeshProps) {
  const reduce = useReducedMotion()
  return (
    <section
      data-slot="hero-gradient-mesh"
      data-tier="premium"
      className={cn("dark relative overflow-hidden rounded-2xl border border-border bg-bg text-fg", className)}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, color-mix(in oklch, var(--accent) 45%, transparent), transparent 55%), radial-gradient(ellipse at bottom right, color-mix(in oklch, var(--info) 30%, transparent), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative px-4 py-16 text-center sm:px-6 sm:py-28">
        <motion.h1
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.2, 0, 0, 1] }}
          className="text-[clamp(1.75rem,3.5vw+1rem,3rem)] font-medium tracking-[-0.028em] text-balance text-fg"
        >
          {title}
        </motion.h1>
        <p className="mx-auto mt-4 max-w-lg text-sm text-pretty text-fg-muted">{description}</p>
        <div className="mx-auto mt-7 flex w-full max-w-sm flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center">
          <Button className="w-full sm:w-auto" onClick={onPrimary}>
            {primaryLabel}
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
export { HeroGradientMesh }
export type { HeroGradientMeshProps }
