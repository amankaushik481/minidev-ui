"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { MagneticCta } from "@/registry/premium/magnetic-cta"
import { Button } from "@/registry/ui/button"

/**
 * A closing call-to-action panel with a soft accent glow, a heading, a line of copy and two buttons, rising in as it scrolls into view.
 *
 * Pass `children` to replace the default buttons (a magnetic "Get started"
 * and an outline "Stay free") with your own actions. Use it as the last
 * section of a landing or pricing page; for a full-width hero use one of the
 * Hero* components.
 *
 * @example
 * <CtaGlow title="Close your books today" description="Start free, no card needed.">
 *   <Button render={<a href="/signup" />}>Start free</Button>
 * </CtaGlow>
 */
type CtaGlowProps = {
  /** Panel heading (rendered as h2). */
  title: string
  description?: string
  /** Actions; defaults to a magnetic Get started and an outline Stay free button. */
  children?: React.ReactNode
  className?: string
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function CtaGlow({ title, description, children, className }: CtaGlowProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      data-slot="cta-glow"
      data-tier="premium"
      initial={reduce ? false : { y: 12 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={reduce ? { duration: 0 } : MORPH}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-sunken p-5 text-center shadow-highlight sm:p-8",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--accent)_22%,transparent),transparent_60%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--accent)_55%,transparent),transparent)]"
        aria-hidden
      />
      <h2 className="relative text-2xl font-medium tracking-[-0.018em] text-balance text-fg">{title}</h2>
      {description ? (
        <p className="relative mx-auto mt-2 max-w-md text-sm text-fg-muted">{description}</p>
      ) : null}
      <div className="relative mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {children ?? (
          <>
            <MagneticCta>Get started</MagneticCta>
            <Button variant="outline">Stay free</Button>
          </>
        )}
      </div>
    </motion.div>
  )
}
export { CtaGlow }
export type { CtaGlowProps }
