"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A grid of numbered label tiles that rise into place one after another as the grid scrolls into view.
 *
 * Tiles settle on the morph spring with a short stagger, once. Reduced
 * motion shows them in place. Use it for a quick "what's inside" index of
 * categories or modules on a marketing page; for cards with a title and
 * description use AnimatedFeatureRow or FeatureBentoMotion.
 *
 * @example
 * <GridReveal items={["Invoices", "Payments", "Reports", "Approvals"]} />
 */
type GridRevealProps = {
  /** Tile labels, in order. Each is numbered 01, 02 … Labels must be unique. */
  items?: string[]
  className?: string
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function GridReveal({
  items = ["Buttons", "Tables", "AI chat", "Billing", "Admin", "Heroes", "Pricing", "Showcase"],
  className,
}: GridRevealProps) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="grid-reveal" data-tier="premium" className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
      {items.map((item, i) => (
        <motion.div
          key={item}
          initial={reduce ? false : { y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={reduce ? { duration: 0 } : { ...MORPH, delay: i * 0.04 }}
          className="rounded-xl border border-border bg-surface px-4 py-6 text-center shadow-raised"
        >
          <p className="text-sm font-medium text-fg">{item}</p>
          <p className="mt-1 font-mono text-[10px] text-fg-muted tabular-nums">{String(i + 1).padStart(2, "0")}</p>
        </motion.div>
      ))}
    </div>
  )
}
export { GridReveal }
export type { GridRevealProps }
