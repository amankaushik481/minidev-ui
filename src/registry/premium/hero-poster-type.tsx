"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { MagneticCta } from "@/registry/premium/magnetic-cta"
import { Button } from "@/registry/ui/button"

function HeroPosterType({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <section
      data-slot="hero-poster-type"
      data-tier="premium"
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-bg px-4 py-14 sm:px-12 sm:py-24",
        className
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-1/3 w-px bg-border" />
        <div className="absolute inset-y-0 left-2/3 w-px bg-border" />
        <div className="absolute inset-x-0 top-1/3 h-px bg-border" />
        <div className="absolute inset-x-0 top-2/3 h-px bg-border" />
        <div className="absolute right-4 bottom-4 size-28 rounded-full bg-[radial-gradient(circle,oklch(0.48_0.17_285/0.25),transparent_70%)] sm:right-8 sm:bottom-8 sm:size-40" />
      </div>
      <div className="relative mx-auto max-w-5xl min-w-0">
        <motion.p
          initial={reduce ? false : { y: 10 }}
          animate={{ y: 0 }}
          className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase"
        >
          Editorial Premium
        </motion.p>
        <h1 className="mt-4 max-w-4xl text-[clamp(2rem,5vw+1rem,4.5rem)] font-medium leading-[1.05] tracking-[-0.030em] text-fg sm:leading-[1.02] sm:tracking-[-0.034em]">
          <span className="block overflow-hidden">
            <motion.span className="block" initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
              Make the first
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block" initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
              screen feel
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block bg-[linear-gradient(100deg,oklch(0.28_0.12_285),oklch(0.34_0.14_300))] bg-clip-text text-transparent"
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              inevitable.
            </motion.span>
          </span>
        </h1>
        <motion.p
          initial={reduce ? false : { y: 12 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-5 max-w-md text-sm leading-[1.55] text-fg-muted sm:mt-6 sm:text-base"
        >
          Poster-scale type, Hairline grid, magnetic CTA. Built for launches that refuse to look generic.
        </motion.p>
        <motion.div
          initial={reduce ? false : { y: 10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap"
        >
          <MagneticCta className="w-full sm:w-auto">Browse Premium</MagneticCta>
          <Button variant="outline" className="w-full sm:w-auto">Stay free</Button>
        </motion.div>
      </div>
    </section>
  )
}
export { HeroPosterType }
