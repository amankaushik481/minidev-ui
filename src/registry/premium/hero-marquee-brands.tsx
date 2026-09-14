"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

const BRANDS = ["Northwind", "Acme", "Vercel-ish", "Linear-ish", "Stripe-ish", "Notion-ish", "Figma-ish", "Raycast"]

function HeroMarqueeBrands({ className }: { className?: string }) {
  const reduce = useReducedMotion()
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
          className="text-[clamp(1.75rem,3.5vw+1rem,3rem)] font-medium tracking-[-0.028em] text-fg"
        >
          Trusted by teams who ship
        </motion.h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-fg-muted">
          Brand marquee for social proof without the blur soup.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button className="w-full sm:w-auto">Get the kit</Button>
          <Button variant="outline" className="w-full sm:w-auto">Talk to us</Button>
        </div>
      </div>
      <div className="w-full min-w-0 max-w-full overflow-hidden border-t border-border bg-sunken py-4">
        <motion.div
          className="flex w-max gap-10 px-6 text-sm font-medium text-fg"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={`${b}-${i}`} className="whitespace-nowrap">{b}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
export { HeroMarqueeBrands }
