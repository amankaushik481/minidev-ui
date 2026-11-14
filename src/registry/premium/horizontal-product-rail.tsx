"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * A horizontal, snap-scrolling rail of product cards with a title above, whose cards slide in as they scroll into view.
 *
 * The rail is a labelled, focusable region, so keyboard users can scroll it
 * with the arrow keys; touch and trackpads swipe natively. Cards lift a
 * little on hover. Reduced motion shows the cards in place. Use it for a
 * "explore the product" strip; for a grid that fits on screen use
 * FeatureBentoMotion.
 *
 * @example
 * <HorizontalProductRail title="Explore Lumen" items={[{ title: "Billing", blurb: "Plans, invoices, seats.", tag: "Commerce" }]} />
 */
type Item = {
  /** Card heading (rendered as h3). Must be unique. */
  title: string
  /** One line under the heading. */
  blurb: string
  /** Small label above the heading. */
  tag?: string
}

type HorizontalProductRailProps = {
  items?: Item[]
  /** Visible heading above the rail. */
  title?: string
  /** Accessible name of the scrolling region. Defaults to the title. */
  ariaLabel?: string
  className?: string
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const
const SNAPPY = { type: "spring", bounce: 0.18, duration: 0.42 } as const

function HorizontalProductRail({
  items = [
    { title: "AI Studio", blurb: "Composer, tools, notebook cells.", tag: "Product" },
    { title: "Billing", blurb: "Plans, invoices, seat maps.", tag: "Commerce" },
    { title: "Admin", blurb: "SSO, quotas, impersonation.", tag: "Ops" },
    { title: "Charts", blurb: "Area, radar, sparklines.", tag: "Data" },
    { title: "Email", blurb: "Welcome + receipt kits.", tag: "Marketing" },
  ],
  title = "Product surfaces",
  ariaLabel,
  className,
}: HorizontalProductRailProps) {
  const reduce = useReducedMotion()
  return (
    <div data-slot="horizontal-product-rail" data-tier="premium" className={cn("space-y-3", className)}>
      <div className="flex items-end justify-between gap-3 px-1">
        <h2 className="text-lg font-medium tracking-[-0.008em] text-fg">{title}</h2>
        <p aria-hidden className="text-xs text-fg-muted">
          Scroll sideways
        </p>
      </div>
      <div
        role="region"
        aria-label={ariaLabel ?? title}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 outline-none focus-visible:ring-2 focus-visible:ring-accent [scrollbar-width:thin]"
      >
        {items.map((item, i) => (
          <motion.article
            key={item.title}
            initial={reduce ? false : { x: 24 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={reduce ? { duration: 0 } : { ...MORPH, delay: i * 0.05 }}
            whileHover={reduce ? undefined : { y: -4, transition: SNAPPY }}
            className="w-64 shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-surface shadow-raised"
          >
            <div className="aspect-[16/10] border-b border-border bg-[radial-gradient(circle_at_70%_30%,color-mix(in_oklch,var(--accent)_20%,transparent),transparent_60%)] bg-sunken" />
            <div className="space-y-1 p-4">
              {item.tag ? <p className="text-[10px] font-medium tracking-[0.01em] text-fg-muted uppercase">{item.tag}</p> : null}
              <h3 className="text-sm font-medium text-fg">{item.title}</h3>
              <p className="text-xs leading-[1.55] text-fg-muted">{item.blurb}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
export { HorizontalProductRail }
export type { HorizontalProductRailProps, Item as ProductRailItem }
