"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

/**
 * A social-proof hero: a centred headline and two buttons above an endless marquee of customer names.
 *
 * The marquee scrolls on transform only, pauses while hovered (WCAG
 * 2.2.2), stops for reduced motion, and is read once as a list by screen
 * readers (the looping copy is hidden). The sample names are
 * fictional; pass `brands` with customers you actually have permission to
 * name. For a grid of logos use a logo wall.
 *
 * @example
 * <HeroMarqueeBrands title="Trusted by teams who ship" brands={["Northwind", "Acme", "Globex"]} />
 */
type HeroMarqueeBrandsProps = {
  /** Headline (rendered as h1). */
  title?: string
  description?: string
  /** Customer names for the marquee. Real customers only, with permission. */
  brands?: string[]
  /** Seconds for one full loop. */
  duration?: number
  className?: string
}

// Fictional companies, so the demo never implies a real endorsement.
const BRANDS = ["Northwind", "Acme", "Globex", "Initech", "Umbrella", "Hooli", "Contoso", "Soylent"]

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function HeroMarqueeBrands({
  title = "Trusted by teams who ship",
  description = "Finance, product and ops teams close their books on Lumen.",
  brands = BRANDS,
  duration = 28,
  className,
}: HeroMarqueeBrandsProps) {
  const reduce = useReducedMotion()
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined} aria-label={hidden ? undefined : "Customers"} className="flex shrink-0 gap-10 pr-10">
      {brands.map((b, i) => (
        <li key={`${b}-${i}`} className="whitespace-nowrap">
          {b}
        </li>
      ))}
    </ul>
  )
  return (
    <section
      data-slot="hero-marquee-brands"
      data-tier="premium"
      className={cn("overflow-hidden rounded-2xl border border-border bg-surface", className)}
    >
      <div className="mx-auto max-w-3xl px-4 pt-14 pb-8 text-center sm:px-6 sm:pt-20 sm:pb-10">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : MORPH}
          className="text-[clamp(1.75rem,3.5vw+1rem,3rem)] font-medium tracking-[-0.028em] text-balance text-fg"
        >
          {title}
        </motion.h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-pretty text-fg-muted">{description}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button className="w-full sm:w-auto">Get the kit</Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Talk to us
          </Button>
        </div>
      </div>
      <div data-slot="hero-marquee-brands-track" className="group w-full max-w-full min-w-0 overflow-hidden border-t border-border bg-sunken py-4">
        {/* Two identical rows with trailing padding, so -50% lands exactly on the seam. */}
        <div
          className="flex w-max text-sm font-medium text-fg group-hover:[animation-play-state:paused]"
          style={{ animation: reduce ? undefined : `hero-marquee ${duration}s linear infinite` }}
        >
          {row()}
          {row(true)}
        </div>
      </div>
      <style>{`@keyframes hero-marquee{to{transform:translateX(-50%)}}`}</style>
    </section>
  )
}
export { HeroMarqueeBrands }
export type { HeroMarqueeBrandsProps }
