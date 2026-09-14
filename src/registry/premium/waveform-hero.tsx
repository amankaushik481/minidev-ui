"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { MagneticCta } from "@/registry/premium/magnetic-cta"

function WaveformHero({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const bars = Array.from({ length: 48 }, (_, i) => 20 + Math.abs(Math.sin(i * 0.45)) * 70)
  return (
    <section data-slot="waveform-hero" data-tier="premium" className={cn("overflow-hidden rounded-2xl border border-border bg-bg px-4 py-12 sm:px-6 sm:py-16", className)}>
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-[clamp(1.75rem,3.5vw+1rem,3rem)] font-medium tracking-[-0.028em] text-fg">Sound without the noise</h2>
        <p className="mt-3 max-w-md text-sm leading-[1.55] text-fg-muted">A kinetic waveform built from Hairline bars — no blur shadows, full reduced-motion respect.</p>
        <div className="mt-8 flex h-20 w-full max-w-full items-end justify-center gap-0.5 overflow-hidden sm:mt-10 sm:h-24 sm:gap-1" role="img" aria-label="Decorative audio waveform">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="w-1.5 rounded-full bg-accent/80"
              style={{ height: `${h}%` }}
              animate={reduce ? undefined : { scaleY: [0.55, 1, 0.7, 1] }}
              transition={reduce ? undefined : { duration: 1.6 + (i % 5) * 0.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.02 }}
            />
          ))}
        </div>
        <div className="mt-8"><MagneticCta>Start free</MagneticCta></div>
      </div>
    </section>
  )
}
export { WaveformHero }
