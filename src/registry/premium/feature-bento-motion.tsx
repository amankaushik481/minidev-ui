"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A bento grid of feature tiles in mixed widths that rise in as they scroll into view and lift slightly on hover.
 *
 * Wide tiles span two of three columns from `sm` up. Tiles settle on the
 * morph spring once; reduced motion shows them in place with no hover lift.
 * Use it for a features overview with one or two hero features; for equal
 * cards in a row use AnimatedFeatureRow.
 *
 * @example
 * <FeatureBentoMotion items={[{ title: "Realtime", body: "Syncs in under 100ms.", wide: true }, { title: "Secure", body: "SSO and audit logs." }]} />
 */
type BentoItem = {
  /** Tile heading (rendered as h3). Must be unique. */
  title: string
  body: string
  /** Span two columns from the sm breakpoint. */
  wide?: boolean
}

type FeatureBentoMotionProps = {
  items?: BentoItem[]
  className?: string
}

const SAMPLE: BentoItem[] = [
  { title: "Realtime", body: "Every change syncs across devices in under 100ms.", wide: true },
  { title: "Secure", body: "SSO, audit logs and encryption by default." },
  { title: "Motion", body: "Reduced-motion first." },
  { title: "Open", body: "A typed API and webhooks for everything you see.", wide: true },
]

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const
const SNAPPY = { type: "spring", bounce: 0.18, duration: 0.42 } as const

function FeatureBentoMotion({ items = SAMPLE, className }: FeatureBentoMotionProps) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="feature-bento-motion" data-tier="premium" className={cn("grid gap-3 sm:grid-cols-3", className)}>
      {items.map((c, i) => (
        <motion.div
          key={c.title}
          initial={reduce ? false : { y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={reduce ? { duration: 0 } : { ...MORPH, delay: i * 0.05 }}
          whileHover={reduce ? undefined : { y: -2, transition: SNAPPY }}
          className={cn("rounded-xl border border-border bg-surface p-5 shadow-raised", c.wide && "sm:col-span-2")}
        >
          <div className="mb-3 h-px w-8 bg-accent" aria-hidden />
          <h3 className="text-sm font-medium text-fg">{c.title}</h3>
          <p className="mt-1.5 text-xs leading-[1.55] text-fg-muted">{c.body}</p>
        </motion.div>
      ))}
    </div>
  )
}
export { FeatureBentoMotion }
export type { FeatureBentoMotionProps, BentoItem as FeatureBentoItem }
