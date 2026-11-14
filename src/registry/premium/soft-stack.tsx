"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A small stack of cards that fan up into a tidy, receding pile on a spring when it scrolls into view.
 * Each card sits a little lower and smaller than the one in front, so the
 * pile reads as depth without blurred shadows. It plays once; reduced motion
 * shows the settled pile.
 *
 * Use it as a light visual beside feature copy ("your workspaces", "every
 * account"). Reach for StackRevealStory for readable stacked cards with body
 * text, and DeviceFrameStack for stacked screenshots.
 *
 * @example
 * <SoftStack items={["Payroll", "Invoices", "Expenses"]} />
 */
type SoftStackProps = {
  /** Card titles, front to back. Three or four read best. */
  items?: string[]
  className?: string
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function SoftStack({ items = ["Inbox", "Board", "Billing"], className }: SoftStackProps) {
  const reduce = useReducedMotion()
  return (
    <ul data-slot="soft-stack" data-tier="premium" className={cn("relative mx-auto h-64 w-full max-w-sm", className)}>
      {items.map((c, i) => (
        <motion.li
          key={i}
          initial={reduce ? false : { y: 40 + i * 8, scale: 0.94 }}
          whileInView={{ y: i * 18, scale: 1 - i * 0.03 }}
          viewport={{ once: true }}
          transition={reduce ? { duration: 0 } : { ...MORPH, delay: i * 0.08 }}
          style={{ zIndex: items.length - i }}
          className="absolute inset-x-0 top-0 rounded-2xl border border-border bg-surface p-5 shadow-highlight"
        >
          <p className="text-sm font-medium text-fg">{c}</p>
          <div aria-hidden className="mt-4 space-y-2">
            <div className="h-2 w-2/3 rounded bg-border" />
            <div className="h-2 w-1/2 rounded bg-sunken" />
          </div>
        </motion.li>
      ))}
    </ul>
  )
}
export { SoftStack }
export type { SoftStackProps }
