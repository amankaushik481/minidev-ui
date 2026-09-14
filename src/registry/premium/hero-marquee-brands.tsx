"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

const BRANDS = ["Northwind", "Acme", "Vercel-ish", "Linear-ish", "Stripe-ish", "Notion-ish", "Figma-ish", "Raycast"]

function HeroMarqueeBrands({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <section data-slot="hero-marquee-brands" data-tier="premium" className={cn("overflow-hidden rounded-2xl border border-border bg-surface", className)}>
      <div className="mx-auto max-w-3xl px-6 pt-20 pb-10 text-center">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-medium tracking-[-0.026em] text-fg"
        >
          Trusted by teams who obsess over craft
        </motion.h1>
        <p className="mt-3 text-sm text-fg-muted">Hairline surfaces. Premium motion. Zero generic Inter vibes.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button>Get the kit</Button>
          <Button variant="outline">Talk to us</Button>
        </div>
      </div>
      <div className="border-t border-border bg-sunken py-4">
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
