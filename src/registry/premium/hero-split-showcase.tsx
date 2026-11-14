"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/ui/card"

/**
 * A split hero: headline, copy and two buttons on the left, a revenue card whose bars grow in on the right.
 *
 * Bars grow with a transform (scaleY) on the data spring, so nothing
 * reflows; the chart is one image to screen readers. Reduced motion shows
 * the final chart. Use it when the hero should show a live-looking product
 * surface; for a framed screenshot use BrowserMockup inside your own hero.
 *
 * @example
 * <HeroSplitShowcase />
 */
const BARS = [40, 55, 48, 70, 62, 88, 76]
const DATA = { type: "spring", bounce: 0.12, duration: 0.7 } as const

function HeroSplitShowcase({
  className,
}: {
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <section
      data-slot="hero-split-showcase"
      data-tier="premium"
      className={cn(
        "grid min-w-0 items-center gap-8 overflow-hidden rounded-2xl border border-border bg-surface p-4 sm:gap-10 sm:p-8 lg:grid-cols-2 lg:p-12",
        className
      )}
    >
      <div className="min-w-0">
        <span className="mb-4 inline-flex h-5 items-center rounded-md border border-border bg-sunken px-2 text-[11px] font-medium text-fg">New</span>
        <motion.h1
          initial={reduce ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.16, duration: 0.5 }}
          className="text-[clamp(1.75rem,3vw+1rem,2.5rem)] font-medium tracking-[-0.026em] text-fg"
        >
          Product UI with a pulse
        </motion.h1>
        <p className="mt-4 text-sm leading-[1.55] text-fg-muted">
          Pair a Hairline narrative with live chrome. Perfect for launch pages and docs homes.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button className="w-full sm:w-auto">Start building</Button>
          <Button variant="outline" className="w-full sm:w-auto">See examples</Button>
        </div>
      </div>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { delay: 0.1, duration: 0.5, ease: [0.2, 0, 0, 1] }}
        className="relative min-w-0"
      >
        <div className="absolute -inset-2 rounded-2xl bg-accent-soft sm:-inset-3" aria-hidden />
        <Card className="relative overflow-hidden shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate">Revenue</span>
              <span className="shrink-0 text-xs font-normal text-success">+18.2%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div role="img" aria-label="Weekly revenue, rising 18.2% over seven weeks" className="flex h-28 items-end gap-1.5">
              {BARS.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 origin-bottom rounded-sm bg-accent"
                  style={{ height: h }}
                  initial={reduce ? false : { scaleY: 8 / h }}
                  animate={{ scaleY: 1 }}
                  transition={reduce ? { duration: 0 } : { ...DATA, delay: 0.15 + i * 0.04 }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
export { HeroSplitShowcase }
