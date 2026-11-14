"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A row of feature cards that rise into view one after another as the row scrolls on screen.
 *
 * Cards settle on the morph spring with a short stagger, once; reduced
 * motion shows them in place. Three features read best (one row on desktop,
 * stacked on mobile). Use it for a "why us" strip on a landing page; for
 * mixed-size tiles use FeatureBentoMotion, for icons with a blur reveal use
 * BlurFade.
 *
 * @example
 * <AnimatedFeatureRow features={[{ title: "Invoices that chase themselves", description: "Reminders on your schedule." }]} />
 */
type Feature = {
  /** Card heading (rendered as h3). Must be unique. */
  title: string
  /** One or two sentences under the heading. */
  description: string
}

type AnimatedFeatureRowProps = {
  features?: Feature[]
  className?: string
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

const SAMPLE_FEATURES: Feature[] = [
  {
    title: "Invoices that chase themselves",
    description: "Lumen sends reminders on a schedule you set, pauses them the moment a payment lands, and logs every touch.",
  },
  {
    title: "One ledger, every currency",
    description: "Bill Northwind in euros and report in dollars. Rates lock at issue time, so month end always reconciles.",
  },
  {
    title: "Approvals in the flow",
    description: "Refunds and credits route to the right person automatically, with a full audit trail on each decision.",
  },
]

function AnimatedFeatureRow({ features = SAMPLE_FEATURES, className }: AnimatedFeatureRowProps) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="animated-feature-row" data-tier="premium" className={cn("grid w-full gap-4 md:grid-cols-3", className)}>
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={reduce ? false : { y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={reduce ? { duration: 0 } : { ...MORPH, delay: i * 0.06 }}
          className="rounded-xl border border-border bg-surface p-5 shadow-raised"
        >
          <div className="mb-3 h-px w-8 bg-accent" aria-hidden />
          <h3 className="text-sm font-medium text-fg">{f.title}</h3>
          <p className="mt-2 text-sm leading-[1.55] text-fg-muted">{f.description}</p>
        </motion.div>
      ))}
    </div>
  )
}
export { AnimatedFeatureRow }
export type { AnimatedFeatureRowProps, Feature as AnimatedFeature }
