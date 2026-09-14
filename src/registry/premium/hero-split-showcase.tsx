"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/ui/card"

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
        <span className="mb-4 inline-flex h-5 items-center rounded-md border border-border bg-sunken px-2 text-[11px] font-medium text-fg">Premium block</span>
        <motion.h1
          initial={reduce ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
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
        transition={{ delay: 0.1, duration: 0.5 }}
        className="relative min-w-0"
      >
        <div className="absolute -inset-2 rounded-2xl bg-accent/10 sm:-inset-3" aria-hidden />
        <Card className="relative overflow-hidden shadow-[0_8px_24px_oklch(0.35_0.02_250/0.10)]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate">Revenue</span>
              <span className="shrink-0 text-xs font-normal text-success">+18.2%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-28 items-end gap-1.5">
              {[40, 55, 48, 70, 62, 88, 76].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm bg-accent/80"
                  initial={reduce ? false : { height: 8 }}
                  animate={{ height: h }}
                  transition={{ delay: 0.15 + i * 0.04, duration: 0.45 }}
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
