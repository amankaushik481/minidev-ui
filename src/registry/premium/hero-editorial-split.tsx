"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { MagneticCta } from "@/registry/premium/magnetic-cta"
import { Button } from "@/registry/ui/button"
import { DeviceFrameStack } from "@/registry/premium/device-frame-stack"

function HeroEditorialSplit({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <section
      data-slot="hero-editorial-split"
      data-tier="premium"
      className={cn(
        "grid min-w-0 items-center gap-8 overflow-hidden rounded-2xl border border-border bg-bg px-4 py-12 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-12",
        className
      )}
    >
      <div className="min-w-0">
        <motion.p initial={reduce ? false : { y: 8 }} animate={{ y: 0 }} className="text-xs font-medium tracking-[0.01em] text-fg-muted uppercase">
          MiniDev Premium
        </motion.p>
        <h1 className="mt-3 text-[clamp(1.75rem,3.5vw+1rem,3rem)] font-medium tracking-[-0.028em] text-fg">
          <span className="block overflow-hidden">
            <motion.span className="block" initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              Local craft.
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block bg-[linear-gradient(100deg,oklch(0.30_0.14_285),oklch(0.36_0.12_300))] bg-clip-text text-transparent" initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
              Public-ready polish.
            </motion.span>
          </span>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-[1.55] text-fg-muted">
          Free MIT product UI. Premium kinetic moments. Audit-gated so screenshots stay honest when you ship.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
          <MagneticCta className="w-full sm:w-auto">Browse Premium</MagneticCta>
          <Button variant="outline" className="w-full sm:w-auto">Open docs</Button>
        </div>
      </div>
      <DeviceFrameStack />
    </section>
  )
}
export { HeroEditorialSplit }
