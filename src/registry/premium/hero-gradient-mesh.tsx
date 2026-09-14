"use client"
import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

function HeroGradientMesh({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <section
      data-slot="hero-gradient-mesh"
      data-tier="premium"
      className={cn("relative overflow-hidden rounded-2xl border border-border", className)}
      style={{ backgroundColor: "oklch(0.14 0.02 285)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, oklch(0.48 0.17 285 / 0.45), transparent 55%), radial-gradient(ellipse at bottom right, oklch(0.55 0.12 250 / 0.3), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative px-4 py-16 text-center sm:px-6 sm:py-28" style={{ color: "oklch(0.98 0.005 250)" }}>
        <motion.h1
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[clamp(1.75rem,3.5vw+1rem,3rem)] font-medium tracking-[-0.028em]"
          style={{ color: "oklch(0.99 0.002 250)" }}
        >
          Dark-mode first. Accent that sings.
        </motion.h1>
        <p
          className="mx-auto mt-4 max-w-lg text-sm"
          style={{ color: "oklch(0.90 0.01 250)" }}
        >
          Premium mesh hero for launches. Respects reduced motion.
        </p>
        <div className="mx-auto mt-7 flex w-full max-w-sm flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center">
          <Button
            className="w-full border-transparent sm:w-auto"
            style={{ backgroundColor: "oklch(0.98 0.005 250)", color: "oklch(0.18 0.01 250)" }}
          >
            Launch
          </Button>
          <Button
            variant="outline"
            className="w-full hover:bg-white/10 sm:w-auto"
            style={{ borderColor: "oklch(0.85 0.01 250)", color: "oklch(0.98 0.005 250)", backgroundColor: "transparent" }}
          >
            Docs
          </Button>
        </div>
      </div>
    </section>
  )
}
export { HeroGradientMesh }
