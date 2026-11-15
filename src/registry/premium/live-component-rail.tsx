"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Badge } from "@/registry/ui/badge"
import { Switch } from "@/registry/ui/switch"
import { Input } from "@/registry/ui/input"

/**
 * A horizontally scrolling rail of small cards, each holding a real, working kit primitive, that rise in one after another.
 * The rail is a keyboard-scrollable region (Tab to it, then arrow keys), and
 * the controls inside are live, not screenshots. Cards rise with the morph
 * spring as the rail scrolls into view; reduced motion shows them in place.
 *
 * Use it on a marketing page to prove the product kit underneath. Reach for
 * HorizontalProductRail for larger product screenshots and LogoWallMotion for
 * a looping logo strip.
 *
 * @example
 * <LiveComponentRail eyebrow="Live primitives" title="The same kit your product uses" />
 */
type LiveComponentRailProps = {
  /** Small label above the title. */
  eyebrow?: string
  /** Heading above the rail. */
  title?: string
  className?: string
}

const MORPH = { type: "spring", bounce: 0.16, duration: 0.5 } as const

function LiveComponentRail({
  eyebrow = "Live primitives",
  title = "Same free kit the Premium moments sit on",
  className,
}: LiveComponentRailProps) {
  const reduce = useReducedMotion()
  const cards = [
    { label: "Button", node: <Button>Primary</Button> },
    { label: "Badge", node: <Badge>Hairline</Badge> },
    { label: "Switch", node: <Switch defaultChecked aria-label="Demo switch" /> },
    { label: "Input", node: <Input aria-label="Search registry" placeholder="Search registry…" className="w-40" /> },
    { label: "Outline", node: <Button variant="outline">Secondary</Button> },
    { label: "Danger", node: <Button variant="destructive" size="sm">Delete</Button> },
  ]
  return (
    <section
      data-slot="live-component-rail"
      data-tier="premium"
      className={cn("min-w-0 max-w-full space-y-4 overflow-hidden", className)}
    >
      <div className="flex min-w-0 items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.01em] text-fg-muted">{eyebrow}</p>
          <h3 className="mt-1 text-xl font-medium tracking-[-0.014em] text-fg">{title}</h3>
        </div>
      </div>
      <div className="relative min-w-0 max-w-full overflow-hidden rounded-2xl border border-border bg-sunken p-4">
        <div
          role="region"
          aria-label={title}
          tabIndex={0}
          className="flex gap-4 overflow-x-auto overscroll-x-contain rounded-lg pb-2 outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={reduce ? false : { y: 12 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={reduce ? { duration: 0 } : { ...MORPH, delay: i * 0.04 }}
              className="flex w-[160px] shrink-0 flex-col gap-3 rounded-xl border border-border bg-surface p-4 shadow-highlight"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.01em] text-fg-muted">{c.label}</p>
              <div className="flex min-h-10 items-center">{c.node}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
export { LiveComponentRail }
export type { LiveComponentRailProps }
